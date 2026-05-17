import React, { useState, useMemo } from 'react';
import {
  nakshatra, wholeSignHouse, vimshottariDasha, jdToDate, ayanamsa,
  navamsa, dignity, isCombust, detectYogas, detectDoshas,
} from '../engines/astronomy.js';
import {
  NAKSHATRA_INFO, RASHI_INFO, DASHA_THEME, BHAVA_INFO,
  DIGNITY, KARAKAS, COMBUSTION_ORB, YOGA_DEFS, DOSHA_DEFS,
} from '../data/astrology/nakshatras.js';
import SouthIndianChart from '../components/charts/SouthIndianChart.jsx';

// ── shared symbols & helpers ─────────────────────────────────────────
const RASHI_SYM = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
const RASHI_COL = ["#f44336","#43a047","#fbc02d","#90caf9","#ff9800","#a1887f","#ec407a","#7e57c2","#7986cb","#5d4037","#26c6da","#26a69a"];
const RASHI_NAMES = ["Mesha","Vrishabha","Mithuna","Karka","Simha","Kanya","Tula","Vrishchika","Dhanu","Makara","Kumbha","Meena"];

const P_SYM = {
  Sun:"☉", Moon:"☽", Mercury:"☿", Venus:"♀", Mars:"♂", Jupiter:"♃",
  Saturn:"♄", Rahu:"☊", Ketu:"☋", Node:"☊",
};

const DIGNITY_COL = {
  Exalted:    "#66bb6a",
  Mooltrikona:"#9ccc65",
  Own:        "#81c784",
  Friend:     "#90caf9",
  Neutral:    "#9e9e9e",
  Enemy:      "#ffb74d",
  Debilitated:"#ef5350",
};

function norm(x) { return ((x % 360) + 360) % 360; }
function rashiIdx(lon) { return Math.floor(norm(lon) / 30); }
function degWithinSign(lon) { const n = norm(lon); return n - rashiIdx(n) * 30; }
function fmtDeg(deg) { const d = Math.floor(deg); const m = Math.floor((deg - d) * 60); return `${d}°${String(m).padStart(2,'0')}'`; }
function fmtDate(d) { return d ? d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' }) : '—'; }

// ─────────────────────────────────────────────────────────────────────
//  MAIN COMPONENT — orchestrates sub-tab pattern + shared computations
// ─────────────────────────────────────────────────────────────────────
export function VedicTab({ ctx }) {
  const { M3, res, Card } = ctx;
  const [sub, setSub] = useState("overview");

  if (!res || !res.sid) {
    return <Card title="🪔 Vedic"><div style={{ padding:16, color:M3.onSurfaceVariant }}>No chart loaded.</div></Card>;
  }

  // Shared computations
  const computed = useMemo(() => {
    const sid = { ...res.sid };
    const rahu = sid.Node ?? 0;
    sid.Rahu = rahu;
    sid.Ketu = norm(rahu + 180);
    const ascSid = res.sidHouses?.ASC ?? norm((res.houses?.ASC ?? 0) - ayanamsa(res.jd));
    const mcSid  = res.sidHouses?.MC  ?? norm((res.houses?.MC  ?? 0) - ayanamsa(res.jd));
    const yogas   = detectYogas(sid, ascSid, DIGNITY);
    const doshas  = detectDoshas(sid, ascSid, null);
    const dasha   = vimshottariDasha(sid.Moon, res.jd);
    return { sid, ascSid, mcSid, yogas, doshas, dasha };
  }, [res]);

  const SUBS = [
    { id: "overview",  label: "🪔 Overview"        },
    { id: "grahas",    label: "☿ Grahas"          },
    { id: "bhavas",    label: "🏛 Bhavas"          },
    { id: "nakshatras",label: "★ Nakshatras"      },
    { id: "vargas",    label: "◇ Vargas"          },
    { id: "dasha",     label: "⏳ Dasha"          },
    { id: "yogas",     label: "⚡ Yogas & Doshas"  },
  ];

  // Sub-tab nav (pill bar)
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{
        display:"flex", gap:6, overflowX:"auto", overflowY:"hidden",
        padding:"6px 8px", background:M3.glass, borderRadius:M3.radius.lg,
        border:`1px solid ${M3.glassBorder}`, backdropFilter:"blur(12px)",
        WebkitOverflowScrolling:"touch", scrollSnapType:"x proximity",
      }}>
        {SUBS.map(s => {
          const active = s.id === sub;
          return (
            <button key={s.id} onClick={() => setSub(s.id)} style={{
              padding:"9px 14px", border:"none", cursor:"pointer",
              background: active ? M3.primaryContainer : "transparent",
              borderRadius:M3.radius.sm,
              color: active ? M3.onPrimaryContainer : M3.onSurfaceVariant,
              fontFamily:M3.fontMono, fontSize:"0.74rem",
              fontWeight: active ? 700 : 500,
              whiteSpace:"nowrap", flexShrink:0, scrollSnapAlign:"center",
              WebkitTapHighlightColor:"transparent", minHeight:40,
              transition:"background 0.2s, color 0.2s",
            }}>{s.label}</button>
          );
        })}
      </div>

      {sub === "overview"   && <OverviewSub   ctx={ctx} c={computed} />}
      {sub === "grahas"     && <GrahasSub     ctx={ctx} c={computed} />}
      {sub === "bhavas"     && <BhavasSub     ctx={ctx} c={computed} />}
      {sub === "nakshatras" && <NakshatrasSub ctx={ctx} c={computed} />}
      {sub === "vargas"     && <VargasSub     ctx={ctx} c={computed} />}
      {sub === "dasha"      && <DashaSub      ctx={ctx} c={computed} />}
      {sub === "yogas"      && <YogasSub      ctx={ctx} c={computed} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
//  OVERVIEW
// ─────────────────────────────────────────────────────────────────────
function OverviewSub({ ctx, c }) {
  const { M3, Card, res } = ctx;
  const { sid, ascSid } = c;
  const moonNak = nakshatra(sid.Moon);
  const moonNakInfo = NAKSHATRA_INFO[moonNak.idx];
  const ascNak = nakshatra(ascSid);
  const ascNakInfo = NAKSHATRA_INFO[ascNak.idx];
  const ascRashi = rashiIdx(ascSid);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <Card title={`🪔 Vedic Birth Chart (Sidereal · Ayanamsa ${ayanamsa(res.jd).toFixed(2)}°)`}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap:14, marginBottom:14 }}>
          <KeyStat M3={M3} label="Sun Rashi (Surya)"     col={RASHI_COL[rashiIdx(sid.Sun)]}  big={`${RASHI_SYM[rashiIdx(sid.Sun)]} ${RASHI_NAMES[rashiIdx(sid.Sun)]}`}  sub={`${fmtDeg(degWithinSign(sid.Sun))} · ${NAKSHATRA_INFO[nakshatra(sid.Sun).idx].name}`} />
          <KeyStat M3={M3} label="Moon Rashi (Janma)"    col={RASHI_COL[rashiIdx(sid.Moon)]} big={`${RASHI_SYM[rashiIdx(sid.Moon)]} ${RASHI_NAMES[rashiIdx(sid.Moon)]}`} sub={`${fmtDeg(degWithinSign(sid.Moon))} · ${moonNakInfo.name} pada ${moonNak.pada}`} />
          <KeyStat M3={M3} label="Ascendant (Lagna)"     col={RASHI_COL[ascRashi]}           big={`${RASHI_SYM[ascRashi]} ${RASHI_NAMES[ascRashi]}`}                  sub={`${fmtDeg(degWithinSign(ascSid))} · ${ascNakInfo.name} pada ${ascNak.pada}`} />
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap:14, marginTop:10 }}>
          <div>
            <SouthIndianChart
              positions={sid}
              ascSidereal={ascSid}
              size={360}
              title="Rashi (D1)"
              theme={{ bg:M3.surfaceDim, surface:M3.surface, border:`${M3.outline}33`, text:M3.onSurface, muted:M3.onSurfaceVariant, accent:M3.primary }}
            />
          </div>
          <div style={{ fontSize:13.5, color:M3.onSurface, lineHeight:1.7 }}>
            <p style={{ margin:"4px 0 12px" }}>
              <strong style={{ color:M3.primary }}>{moonNakInfo.name}</strong> — your <em>Janma Nakshatra</em>.
              {" "}{moonNakInfo.nature}
            </p>
            <p style={{ margin:"4px 0 12px" }}>
              <strong style={{ color:M3.primary }}>Spirit-animal (Yoni)</strong>: {moonNakInfo.yoni} ({moonNakInfo.yoniSex}).
              Each nakshatra carries an animal symbology used in Vedic compatibility (Yoni Kuta).
            </p>
            <p style={{ margin:"4px 0 12px" }}>
              <strong style={{ color:M3.primary }}>Dasha lord at birth</strong>: {P_SYM[moonNakInfo.lord]} {moonNakInfo.lord}.
              You start life in the {moonNakInfo.lord} Mahadasha period — {DASHA_THEME[moonNakInfo.lord]?.theme.toLowerCase()}
            </p>
            <p style={{ margin:"4px 0", color:M3.onSurfaceVariant, fontSize:12.5 }}>
              The wheel above is a <strong>South Indian style chart</strong> — fixed sign positions, planets placed in the cell of the rashi they occupy. Your Lagna (Ascendant) is highlighted.
            </p>
          </div>
        </div>
      </Card>

      <Card title="ℹ Vedic in one paragraph">
        <p style={{ color:M3.onSurface, lineHeight:1.7, fontSize:13.5, margin:0 }}>
          Vedic (Jyotish) reads the sky from the <strong>sidereal zodiac</strong> — anchored to the stars rather than the seasons. It centres the <strong>Moon</strong> rather than the Sun for identity. It works through <strong>9 planets</strong> (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, plus Rahu & Ketu — the lunar nodes), <strong>12 houses (Bhavas)</strong>, <strong>27 lunar mansions (Nakshatras)</strong>, and a <strong>120-year planetary timing system (Vimshottari Dasha)</strong>. Each sub-tab above goes deeper.
        </p>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
//  GRAHAS — planet detail with dignity, combustion, retrograde, karakas
// ─────────────────────────────────────────────────────────────────────
function GrahasSub({ ctx, c }) {
  const { M3, Card } = ctx;
  const { sid, ascSid } = c;
  const order = ["Sun","Moon","Mars","Mercury","Jupiter","Venus","Saturn","Rahu","Ketu"];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <Card title="☿ Grahas (9 Planets) — full Vedic detail">
        <div style={{ overflowX:"auto" }}>
          <table style={tblStyle(M3)}>
            <thead>
              <tr>
                <th style={thStyle(M3)}>Planet</th>
                <th style={thStyle(M3)}>Rashi</th>
                <th style={thStyle(M3)}>Degree</th>
                <th style={thStyle(M3)}>Nakshatra · Pada</th>
                <th style={thStyle(M3)}>Nak Lord</th>
                <th style={thStyle(M3)}>Bhava</th>
                <th style={thStyle(M3)}>Dignity</th>
                <th style={thStyle(M3)}>State</th>
              </tr>
            </thead>
            <tbody>
              {order.map(name => {
                const lon = sid[name];
                if (lon == null) return null;
                const nak = nakshatra(lon);
                const dig = dignity(name, lon, DIGNITY);
                const combust = isCombust(name, lon, sid.Sun, COMBUSTION_ORB);
                const ri = rashiIdx(lon);
                return (
                  <tr key={name}>
                    <td style={{...tdStyle(M3), fontWeight:700}}>{P_SYM[name] || ""} {name}</td>
                    <td style={{...tdStyle(M3), color:RASHI_COL[ri]}}>{RASHI_SYM[ri]} {RASHI_NAMES[ri]}</td>
                    <td style={tdStyle(M3)}>{fmtDeg(degWithinSign(lon))}</td>
                    <td style={tdStyle(M3)}>{NAKSHATRA_INFO[nak.idx].name} · {nak.pada}</td>
                    <td style={tdStyle(M3)}>{nak.lord}</td>
                    <td style={tdStyle(M3)}>{wholeSignHouse(lon, ascSid)}</td>
                    <td style={tdStyle(M3)}><span style={pillStyle(DIGNITY_COL[dig] || M3.onSurfaceVariant, M3)}>{dig}</span></td>
                    <td style={tdStyle(M3)}>{combust ? <span style={pillStyle("#ef5350", M3)}>Combust</span> : <span style={{ color:M3.onSurfaceVariant, opacity:.5 }}>—</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="🪞 Karakas (natural significators)">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap:10 }}>
          {Object.entries(KARAKAS).map(([planet, sigs]) => (
            <div key={planet} style={cardBoxStyle(M3)}>
              <div style={{ fontWeight:700, fontSize:14, marginBottom:6 }}>{P_SYM[planet]} {planet}</div>
              <div style={{ fontSize:12.5, color:M3.onSurfaceVariant, lineHeight:1.65 }}>{sigs.join(" · ")}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize:12, color:M3.onSurfaceVariant, marginTop:14, lineHeight:1.6 }}>
          Each planet is the natural <em>karaka</em> (significator) of certain life themes — these meanings layer onto whichever house/sign the planet occupies in your chart.
        </p>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
//  BHAVAS — 12 houses with significations
// ─────────────────────────────────────────────────────────────────────
function BhavasSub({ ctx, c }) {
  const { M3, Card } = ctx;
  const { sid, ascSid } = c;
  const ascRashi = rashiIdx(ascSid);
  const planetsInHouse = (h) => Object.entries(sid)
    .filter(([n, l]) => l != null && wholeSignHouse(l, ascSid) === h && ["Sun","Moon","Mars","Mercury","Jupiter","Venus","Saturn","Rahu","Ketu"].includes(n))
    .map(([n]) => n);

  const groupCol = (g) => {
    if (g.includes("Trikona")) return "#9ccc65";
    if (g.includes("Trika"))   return "#ef5350";
    if (g.includes("Kendra"))  return "#7dd3fc";
    if (g.includes("Upachaya"))return "#ffb74d";
    return M3.onSurfaceVariant;
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <Card title="🏛 Bhavas — The 12 Houses">
        <p style={{ fontSize:12.5, color:M3.onSurfaceVariant, lineHeight:1.6, marginBottom:12 }}>
          Each Bhava is one whole rashi starting from your Lagna ({RASHI_NAMES[ascRashi]}). Special groupings: <strong style={{ color:"#7dd3fc" }}>Kendra</strong> (1/4/7/10 — angular, structural strength), <strong style={{ color:"#9ccc65" }}>Trikona</strong> (1/5/9 — fortune, dharma), <strong style={{ color:"#ef5350" }}>Trika</strong> (6/8/12 — difficult/transformative), <strong style={{ color:"#ffb74d" }}>Upachaya</strong> (3/6/10/11 — grow with time).
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap:10 }}>
          {BHAVA_INFO.map(b => {
            const houseRashi = (ascRashi + b.n - 1) % 12;
            const planets = planetsInHouse(b.n);
            return (
              <div key={b.n} style={{...cardBoxStyle(M3), borderLeft:`3px solid ${RASHI_COL[houseRashi]}`}}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:4 }}>
                  <span style={{ fontSize:11, fontWeight:700, letterSpacing:".1em", color:M3.onSurfaceVariant }}>H{b.n} · {b.name}</span>
                  <span style={{ fontSize:11, color:groupCol(b.group), fontWeight:700 }}>{b.group}</span>
                </div>
                <div style={{ fontSize:14, fontWeight:600, marginBottom:6, color:M3.onSurface }}>{b.theme}</div>
                <div style={{ fontSize:12.5, color:M3.onSurfaceVariant, lineHeight:1.55, marginBottom:8 }}>{b.desc}</div>
                <div style={{ paddingTop:8, borderTop:`1px solid ${M3.outline}22` }}>
                  <div style={{ fontSize:11, color:M3.onSurfaceVariant, marginBottom:4 }}>{RASHI_SYM[houseRashi]} {RASHI_NAMES[houseRashi]}</div>
                  <div style={{ minHeight:18 }}>
                    {planets.length === 0
                      ? <span style={{ color:M3.onSurfaceVariant, opacity:.4, fontSize:13 }}>empty</span>
                      : planets.map(p => <span key={p} style={{ marginRight:8, fontSize:14, fontWeight:600 }}>{P_SYM[p]} <span style={{ fontSize:11, color:M3.onSurfaceVariant, fontWeight:400 }}>{p}</span></span>)
                    }
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
//  NAKSHATRAS — Janma + Lagna deep, plus full table
// ─────────────────────────────────────────────────────────────────────
function NakshatrasSub({ ctx, c }) {
  const { M3, Card } = ctx;
  const { sid, ascSid } = c;
  const moonNak = nakshatra(sid.Moon);
  const moonNakInfo = NAKSHATRA_INFO[moonNak.idx];
  const ascNak = nakshatra(ascSid);
  const ascNakInfo = NAKSHATRA_INFO[ascNak.idx];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <NakshatraDeepCard ctx={ctx} title={`☽ Janma Nakshatra — ${moonNakInfo.name}`} subtitle="The Moon's nakshatra — the central Vedic identifier." nak={moonNak} info={moonNakInfo} />
      <NakshatraDeepCard ctx={ctx} title={`↑ Lagna Nakshatra — ${ascNakInfo.name}`} subtitle="The rising nakshatra — your physical/instinctive imprint." nak={ascNak} info={ascNakInfo} />

      <Card title="🌌 All Bodies — Nakshatra Map">
        <div style={{ overflowX:"auto" }}>
          <table style={tblStyle(M3)}>
            <thead>
              <tr>
                <th style={thStyle(M3)}>Body</th>
                <th style={thStyle(M3)}>Nakshatra</th>
                <th style={thStyle(M3)}>Pada</th>
                <th style={thStyle(M3)}>Lord</th>
                <th style={thStyle(M3)}>Deity</th>
                <th style={thStyle(M3)}>Yoni (Spirit Animal)</th>
                <th style={thStyle(M3)}>Gana</th>
              </tr>
            </thead>
            <tbody>
              {["Sun","Moon","Mars","Mercury","Jupiter","Venus","Saturn","Rahu","Ketu"].map(name => {
                const lon = sid[name]; if (lon == null) return null;
                const n = nakshatra(lon); const info = NAKSHATRA_INFO[n.idx];
                return (
                  <tr key={name}>
                    <td style={{...tdStyle(M3), fontWeight:700}}>{P_SYM[name]} {name}</td>
                    <td style={tdStyle(M3)}>{info.name}</td>
                    <td style={tdStyle(M3)}>{n.pada}</td>
                    <td style={tdStyle(M3)}>{info.lord}</td>
                    <td style={tdStyle(M3)}>{info.deity}</td>
                    <td style={tdStyle(M3)}>{info.yoni} <span style={{ color:M3.onSurfaceVariant, fontSize:11 }}>({info.yoniSex[0]})</span></td>
                    <td style={tdStyle(M3)}>{info.gana}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="ℹ How nakshatras work">
        <p style={{ color:M3.onSurface, lineHeight:1.7, fontSize:13.5, margin:0 }}>
          The sidereal zodiac is divided into <strong>27 nakshatras</strong> of 13°20' each. Each is ruled by one of 9 planets, has a presiding deity, a symbol, a <em>gana</em> (temperament: Deva/divine, Manushya/human, Rakshasa/fierce), and a <em>yoni</em> (sacred animal). The <strong>yoni</strong> system pairs the 27 nakshatras with 14 animals — used in Vedic compatibility (Yoni Kuta) to test instinctive resonance between people. Each nakshatra is further split into <strong>4 padas</strong> of 3°20' which add finer flavour (Aries/Taurus/Gemini/Cancer-like, repeating).
        </p>
      </Card>
    </div>
  );
}

function NakshatraDeepCard({ ctx, title, subtitle, nak, info }) {
  const { M3, Card } = ctx;
  return (
    <Card title={title}>
      {subtitle && <p style={{ fontSize:12.5, color:M3.onSurfaceVariant, marginBottom:12, lineHeight:1.5 }}>{subtitle}</p>}
      <p style={{ color:M3.onSurface, lineHeight:1.7, fontSize:14.5, margin:"4px 0 16px", fontStyle:"italic" }}>{info.nature}</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap:8, fontSize:13 }}>
        <Detail M3={M3} k="Ruling planet" v={`${P_SYM[info.lord]} ${info.lord}`}/>
        <Detail M3={M3} k="Deity"         v={info.deity}/>
        <Detail M3={M3} k="Symbol"        v={info.symbol}/>
        <Detail M3={M3} k="Yoni"          v={`${info.yoni} (${info.yoniSex})`}/>
        <Detail M3={M3} k="Gana"          v={`${info.gana} temperament`}/>
        <Detail M3={M3} k="Varga"         v={info.varga}/>
        <Detail M3={M3} k="Pada"          v={`${nak.pada} of 4`}/>
        <Detail M3={M3} k="Dasha theme"   v={DASHA_THEME[info.lord]?.theme}/>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────
//  VARGAS — D1 + D9 side by side
// ─────────────────────────────────────────────────────────────────────
function VargasSub({ ctx, c }) {
  const { M3, Card } = ctx;
  const { sid, ascSid } = c;

  // Compute D9 positions for each body
  const d9Positions = {};
  for (const [name, lon] of Object.entries(sid)) {
    if (lon == null) continue;
    if (!["Sun","Moon","Mars","Mercury","Jupiter","Venus","Saturn","Rahu","Ketu"].includes(name)) continue;
    d9Positions[name] = navamsa(lon).deg;
  }
  const ascD9 = navamsa(ascSid).deg;

  const chartTheme = { bg:M3.surfaceDim, surface:M3.surface, border:`${M3.outline}33`, text:M3.onSurface, muted:M3.onSurfaceVariant, accent:M3.primary };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <Card title="◇ Divisional Charts (Vargas)">
        <p style={{ fontSize:13, color:M3.onSurfaceVariant, lineHeight:1.65, marginBottom:14 }}>
          Vedic divides each sign into smaller arcs to produce <strong>divisional charts (vargas)</strong> — each one zooms in on a life-area. The two most important are D1 (the main Rashi chart) and <strong>D9 Navamsa</strong> (marriage, spiritual path, hidden potential). A planet's strength is read across the vargas combined.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap:20 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:M3.onSurfaceVariant, marginBottom:10 }}>D1 — Rashi Chart</div>
            <SouthIndianChart positions={sid} ascSidereal={ascSid} size={340} title="Rashi (D1)" theme={chartTheme} />
            <p style={{ fontSize:12.5, color:M3.onSurfaceVariant, marginTop:10, lineHeight:1.6 }}>
              The birth chart. Body / appearance / general life, sign-by-sign.
            </p>
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:M3.onSurfaceVariant, marginBottom:10 }}>D9 — Navamsa</div>
            <SouthIndianChart positions={d9Positions} ascSidereal={ascD9} size={340} title="Navamsa (D9)" theme={chartTheme} />
            <p style={{ fontSize:12.5, color:M3.onSurfaceVariant, marginTop:10, lineHeight:1.6 }}>
              Marriage, spiritual dharma, the hidden chart. A planet weak in D1 but strong in D9 ripens later in life.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
//  DASHA — Vimshottari with Mahadasha + Antardasha + Pratyantar
// ─────────────────────────────────────────────────────────────────────
function DashaSub({ ctx, c }) {
  const { M3, Card } = ctx;
  const { dasha } = c;

  // Pratyantar — split the current Antardasha by the 9 lords (same formula recursively)
  const aIdx = ["Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"].indexOf(dasha.antardasha.lord);
  const DASHA_SEQUENCE = ["Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"];
  const DASHA_YEARS    = { Ketu:7, Venus:20, Sun:6, Moon:10, Mars:7, Rahu:18, Jupiter:16, Saturn:19, Mercury:17 };
  const pratyantars = [];
  let pCursor = dasha.antardasha.startJD;
  for (let i = 0; i < 9; i++) {
    const pLord = DASHA_SEQUENCE[(aIdx + i) % 9];
    const pYrs = (dasha.antardasha.years * DASHA_YEARS[pLord]) / 120;
    pratyantars.push({ lord:pLord, startJD:pCursor, endJD:pCursor + pYrs*365.25, years:pYrs });
    pCursor += pYrs * 365.25;
  }
  const nowJD = dasha.nowJD;
  const currentPratyantar = pratyantars.find(p => nowJD >= p.startJD && nowJD < p.endJD) || pratyantars[0];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <Card title="⏳ Vimshottari Dasha — 120-Year Planetary Cycle">
        <p style={{ fontSize:13, color:M3.onSurfaceVariant, lineHeight:1.6, marginBottom:14 }}>
          Anchored to your Moon's nakshatra at birth. The 9 planets cycle through the 120-year span in a fixed sequence. Each major period (Mahadasha) is sub-divided into Antardashas, and those again into Pratyantars — three nested levels show what's active right now.
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap:12 }}>
          <DashaBox M3={M3} label="Mahadasha" lord={dasha.mahadasha.lord} years={dasha.mahadasha.years} start={dasha.mahadasha.startJD} end={dasha.mahadasha.endJD} colour={M3.primary}/>
          <DashaBox M3={M3} label="Antardasha" lord={dasha.antardasha.lord} years={dasha.antardasha.years} start={dasha.antardasha.startJD} end={dasha.antardasha.endJD} colour={M3.tertiary || "#a78bfa"}/>
          <DashaBox M3={M3} label="Pratyantar" lord={currentPratyantar.lord} years={currentPratyantar.years} start={currentPratyantar.startJD} end={currentPratyantar.endJD} colour={"#f48fb1"}/>
        </div>

        <details style={{ background:`${M3.surface}55`, padding:"10px 14px", borderRadius:8, border:`1px solid ${M3.outline}22`, marginTop:14 }}>
          <summary style={{ cursor:"pointer", fontSize:12, fontWeight:700, color:M3.onSurfaceVariant, letterSpacing:".1em", textTransform:"uppercase" }}>Full 120-year Mahadasha timeline</summary>
          <table style={{...tblStyle(M3), marginTop:12}}>
            <thead><tr><th style={thStyle(M3)}>Lord</th><th style={thStyle(M3)}>From</th><th style={thStyle(M3)}>To</th><th style={thStyle(M3)}>Years</th><th style={thStyle(M3)}>Theme</th></tr></thead>
            <tbody>
              {dasha.allMahadashas.map((p, i) => {
                const isCurrent = p === dasha.mahadasha;
                return (
                  <tr key={i} style={{ background: isCurrent ? `${M3.primary}14` : "transparent" }}>
                    <td style={{...tdStyle(M3), fontWeight:isCurrent?700:500, color:isCurrent?M3.primary:M3.onSurface}}>{P_SYM[p.lord]} {p.lord}{isCurrent?" ← now":""}</td>
                    <td style={tdStyle(M3)}>{fmtDate(jdToDate(p.startJD))}</td>
                    <td style={tdStyle(M3)}>{fmtDate(jdToDate(p.endJD))}</td>
                    <td style={tdStyle(M3)}>{p.years}</td>
                    <td style={{...tdStyle(M3), color:M3.onSurfaceVariant, fontSize:12}}>{DASHA_THEME[p.lord]?.theme}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </details>

        <details style={{ background:`${M3.surface}55`, padding:"10px 14px", borderRadius:8, border:`1px solid ${M3.outline}22`, marginTop:8 }}>
          <summary style={{ cursor:"pointer", fontSize:12, fontWeight:700, color:M3.onSurfaceVariant, letterSpacing:".1em", textTransform:"uppercase" }}>Antardashas within current {dasha.mahadasha.lord} Mahadasha</summary>
          <table style={{...tblStyle(M3), marginTop:12}}>
            <thead><tr><th style={thStyle(M3)}>Lord</th><th style={thStyle(M3)}>From</th><th style={thStyle(M3)}>To</th><th style={thStyle(M3)}>Years</th></tr></thead>
            <tbody>
              {dasha.allAntardashas.map((a, i) => {
                const isCurrent = a === dasha.antardasha;
                return (
                  <tr key={i} style={{ background: isCurrent ? `${M3.tertiary || "#a78bfa"}14` : "transparent" }}>
                    <td style={{...tdStyle(M3), fontWeight:isCurrent?700:500, color:isCurrent?(M3.tertiary || "#ce93d8"):M3.onSurface}}>{P_SYM[a.lord]} {a.lord}{isCurrent?" ← now":""}</td>
                    <td style={tdStyle(M3)}>{fmtDate(jdToDate(a.startJD))}</td>
                    <td style={tdStyle(M3)}>{fmtDate(jdToDate(a.endJD))}</td>
                    <td style={tdStyle(M3)}>{a.years.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </details>
      </Card>
    </div>
  );
}

function DashaBox({ M3, label, lord, years, start, end, colour }) {
  return (
    <div style={{ padding:14, background:`${colour}10`, border:`1px solid ${colour}33`, borderRadius:10 }}>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:M3.onSurfaceVariant, marginBottom:6 }}>{label}</div>
      <div style={{ fontSize:22, fontWeight:700, color:colour, marginBottom:4 }}>{P_SYM[lord]} {lord}</div>
      <div style={{ fontSize:11.5, color:M3.onSurfaceVariant, fontFamily:M3.fontMono, marginBottom:8 }}>
        {fmtDate(jdToDate(start))} → {fmtDate(jdToDate(end))} · {years.toFixed(2)} yr
      </div>
      <div style={{ fontSize:12.5, color:M3.onSurface, lineHeight:1.55 }}>{DASHA_THEME[lord]?.theme}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
//  YOGAS & DOSHAS
// ─────────────────────────────────────────────────────────────────────
function YogasSub({ ctx, c }) {
  const { M3, Card } = ctx;
  const { yogas, doshas } = c;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <Card title={`⚡ Detected Yogas (${yogas.length})`}>
        <p style={{ fontSize:12.5, color:M3.onSurfaceVariant, lineHeight:1.6, marginBottom:14 }}>
          Yogas are special planetary combinations that intensify particular life outcomes. Below are the ones detected in your chart. Many more exist — this is the curated essentials.
        </p>
        {yogas.length === 0
          ? <div style={{ padding:16, textAlign:"center", color:M3.onSurfaceVariant, fontStyle:"italic" }}>None of the curated yogas detected in this chart.</div>
          : <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap:10 }}>
              {yogas.map(yId => {
                const y = YOGA_DEFS.find(d => d.id === yId); if (!y) return null;
                return (
                  <div key={yId} style={{...cardBoxStyle(M3), borderLeft:`3px solid ${M3.primary}`}}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:4 }}>
                      <span style={{ fontWeight:700, fontSize:14 }}>{y.name}</span>
                      <span style={pillStyle(M3.tertiary || "#a78bfa", M3)}>{y.tag}</span>
                    </div>
                    <div style={{ fontSize:13, color:M3.onSurfaceVariant, lineHeight:1.6 }}>{y.desc}</div>
                  </div>
                );
              })}
            </div>
        }
        <p style={{ fontSize:11.5, color:M3.onSurfaceVariant, marginTop:14, opacity:.7 }}>
          Detected here: Raja Yoga (lagna lord in Trikona), Dhana Yoga (benefics in 2/5/11), Gajakesari (Jupiter in Kendra from Moon), Budha-Aditya (Sun + Mercury conjunct), Pancha Mahapurusha (any of Mars/Mercury/Jupiter/Venus/Saturn in own/exalted AND Kendra), Kemadruma (Moon isolated).
        </p>
      </Card>

      <Card title={`⚠ Detected Doshas (${doshas.length})`}>
        <p style={{ fontSize:12.5, color:M3.onSurfaceVariant, lineHeight:1.6, marginBottom:14 }}>
          Doshas are afflictions — places where the chart asks for skillful navigation. Most have classical cancellations or remedies. Their detection is a starting point, not a verdict.
        </p>
        {doshas.length === 0
          ? <div style={{ padding:16, textAlign:"center", color:M3.onSurfaceVariant, fontStyle:"italic" }}>None of the curated doshas detected in this chart.</div>
          : <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap:10 }}>
              {doshas.map(dId => {
                const d = DOSHA_DEFS.find(x => x.id === dId); if (!d) return null;
                return (
                  <div key={dId} style={{...cardBoxStyle(M3), borderLeft:"3px solid #ef5350"}}>
                    <div style={{ fontWeight:700, fontSize:14, marginBottom:4, color:"#ef9a9a" }}>{d.name}</div>
                    <div style={{ fontSize:13, color:M3.onSurfaceVariant, lineHeight:1.6 }}>{d.desc}</div>
                  </div>
                );
              })}
            </div>
        }
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
//  Shared UI atoms
// ─────────────────────────────────────────────────────────────────────
function KeyStat({ M3, label, col, big, sub }) {
  return (
    <div>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:M3.onSurfaceVariant, marginBottom:6 }}>{label}</div>
      <div style={{ fontSize:20, fontWeight:700, color:col }}>{big}</div>
      <div style={{ fontSize:12, color:M3.onSurfaceVariant, marginTop:2, fontFamily:M3.fontMono }}>{sub}</div>
    </div>
  );
}
function Detail({ M3, k, v }) {
  return (
    <div style={{ padding:"6px 0", borderBottom:`1px solid ${M3.outline}11` }}>
      <div style={{ fontSize:11, color:M3.onSurfaceVariant, letterSpacing:".06em", textTransform:"uppercase", marginBottom:2 }}>{k}</div>
      <div style={{ fontSize:13.5, color:M3.onSurface }}>{v}</div>
    </div>
  );
}
const tblStyle = (M3) => ({ width:"100%", borderCollapse:"collapse", fontSize:13, fontFamily:M3.fontMono });
const thStyle  = (M3) => ({ textAlign:"left", padding:"8px 10px", borderBottom:`1px solid ${M3.outline}33`, color:M3.onSurfaceVariant, fontWeight:600, fontSize:11, letterSpacing:".1em", textTransform:"uppercase" });
const tdStyle  = (M3) => ({ padding:"9px 10px", borderBottom:`1px solid ${M3.outline}1a`, color:M3.onSurface });
const cardBoxStyle = (M3) => ({ padding:14, background:`${M3.surface}77`, border:`1px solid ${M3.outline}22`, borderRadius:10 });
const pillStyle = (col, M3) => ({
  display:"inline-flex", alignItems:"center", padding:"2px 9px", borderRadius:999,
  fontSize:11, fontWeight:700, background:`${col}1a`, color:col, border:`1px solid ${col}55`,
  fontFamily:M3.fontMono, letterSpacing:".04em",
});

export default VedicTab;
