import React from 'react';
import {
  nakshatra, wholeSignHouse, vimshottariDasha, jdToDate, ayanamsa,
} from '../engines/astronomy.js';
import { NAKSHATRA_INFO, RASHI_INFO, DASHA_THEME } from '../data/astrology/nakshatras.js';

const RASHI_SYM = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
const RASHI_COL = ["#f44336","#43a047","#fbc02d","#90caf9","#ff9800","#a1887f","#ec407a","#7e57c2","#7986cb","#5d4037","#26c6da","#26a69a"];

const P_SYM = { Sun:"☉", Moon:"☽", Mercury:"☿", Venus:"♀", Mars:"♂", Jupiter:"♃", Saturn:"♄", Uranus:"♅", Neptune:"♆", Pluto:"♇", Rahu:"☊", Ketu:"☋", Node:"☊" };
const RASHI_NAMES = ["Mesha","Vrishabha","Mithuna","Karka","Simha","Kanya","Tula","Vrishchika","Dhanu","Makara","Kumbha","Meena"];

function rashiIdx(lon) { return Math.floor(((lon % 360) + 360) % 360 / 30); }
function degWithinSign(lon) { const n = ((lon % 360) + 360) % 360; return n - rashiIdx(n) * 30; }
function fmtDeg(deg) { const d = Math.floor(deg); const m = Math.floor((deg - d) * 60); return `${d}°${String(m).padStart(2,'0')}'`; }
function fmtDate(d) {
  if (!d) return '—';
  return d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
}

export function VedicTab({ ctx }) {
  const { M3, res, Card } = ctx;
  if (!res || !res.sid) return <Card title="Vedic"><div style={{ padding:16, color:M3.onSurfaceVariant }}>No chart loaded.</div></Card>;

  // Bodies in sidereal — supplemented with Rahu/Ketu (Ketu = Node + 180)
  const sid = res.sid;
  const rahu = sid.Node ?? 0;
  const ketu = ((rahu + 180) % 360 + 360) % 360;
  const allSid = {
    Sun: sid.Sun, Moon: sid.Moon,
    Mars: sid.Mars, Mercury: sid.Mercury, Jupiter: sid.Jupiter, Venus: sid.Venus, Saturn: sid.Saturn,
    Rahu: rahu, Ketu: ketu,
  };

  // Ascendant sidereal (from sidHouses if available, else compute from houses - ayanamsa)
  const ascSid = res.sidHouses?.ASC ?? (((res.houses?.ASC ?? 0) - ayanamsa(res.jd) + 360) % 360);
  const mcSid  = res.sidHouses?.MC  ?? (((res.houses?.MC  ?? 0) - ayanamsa(res.jd) + 360) % 360);

  // Moon nakshatra (your "birth star" — the central Vedic identifier)
  const moonNak = nakshatra(sid.Moon ?? 0);
  const moonNakInfo = NAKSHATRA_INFO[moonNak.idx];

  // Ascendant nakshatra
  const ascNak = nakshatra(ascSid);
  const ascNakInfo = NAKSHATRA_INFO[ascNak.idx];

  // Rahu / Ketu nakshatras
  const rahuNak = nakshatra(rahu);
  const ketuNak = nakshatra(ketu);

  // Dasha
  const dasha = vimshottariDasha(sid.Moon ?? 0, res.jd);
  const ascRashi = rashiIdx(ascSid);

  // ────────── styles ──────────
  const S = {
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 14 },
    pill: (col) => ({
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700,
      background: `${col}1a`, color: col, border: `1px solid ${col}55`,
      fontFamily: M3.fontMono, letterSpacing: ".04em",
    }),
    table: { width: "100%", borderCollapse: "collapse", fontSize: 13.5, fontFamily: M3.fontMono },
    th: { textAlign: "left", padding: "8px 10px", borderBottom: `1px solid ${M3.outline}33`, color: M3.onSurfaceVariant, fontWeight: 600, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase" },
    td: { padding: "9px 10px", borderBottom: `1px solid ${M3.outline}1a`, color: M3.onSurface },
    sectionLabel: { fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: M3.onSurfaceVariant, marginBottom: 8 },
    detailRow: { display: "flex", gap: 12, padding: "6px 0", borderBottom: `1px solid ${M3.outline}11`, fontSize: 13.5 },
    detailKey: { color: M3.onSurfaceVariant, minWidth: 110, fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase" },
    detailVal: { color: M3.onSurface, flex: 1 },
  };

  // ────────── render ──────────
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* ═════════ HERO ═════════ */}
      <Card title={`🪔 Vedic Chart (Sidereal · Lahiri Ayanamsa ${ayanamsa(res.jd).toFixed(2)}°)`}>
        <div style={{ padding: "8px 0 4px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 14 }}>
          <div>
            <div style={S.sectionLabel}>Sun Rashi</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: RASHI_COL[rashiIdx(sid.Sun)] }}>{RASHI_SYM[rashiIdx(sid.Sun)]} {RASHI_NAMES[rashiIdx(sid.Sun)]}</div>
            <div style={{ color: M3.onSurfaceVariant, fontSize: 12, marginTop: 2, fontFamily: M3.fontMono }}>{fmtDeg(degWithinSign(sid.Sun))}</div>
          </div>
          <div>
            <div style={S.sectionLabel}>Moon Rashi (Janma Rashi)</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: RASHI_COL[rashiIdx(sid.Moon)] }}>{RASHI_SYM[rashiIdx(sid.Moon)]} {RASHI_NAMES[rashiIdx(sid.Moon)]}</div>
            <div style={{ color: M3.onSurfaceVariant, fontSize: 12, marginTop: 2, fontFamily: M3.fontMono }}>{fmtDeg(degWithinSign(sid.Moon))} · {moonNakInfo.name} pada {moonNak.pada}</div>
          </div>
          <div>
            <div style={S.sectionLabel}>Ascendant (Lagna)</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: RASHI_COL[ascRashi] }}>{RASHI_SYM[ascRashi]} {RASHI_NAMES[ascRashi]}</div>
            <div style={{ color: M3.onSurfaceVariant, fontSize: 12, marginTop: 2, fontFamily: M3.fontMono }}>{fmtDeg(degWithinSign(ascSid))} · {ascNakInfo.name} pada {ascNak.pada}</div>
          </div>
        </div>
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${M3.outline}22`, fontSize: 13, color: M3.onSurfaceVariant, lineHeight: 1.6 }}>
          The Vedic system uses the <strong>sidereal zodiac</strong> — fixed to the stars rather than the seasons — and reads identity from the <strong>Moon's position</strong> rather than the Sun's.
          Your <em>Janma Rashi</em> (Moon sign) is <strong style={{ color: M3.onSurface }}>{RASHI_NAMES[rashiIdx(sid.Moon)]}</strong> and your <em>Janma Nakshatra</em> (birth star) is <strong style={{ color: M3.onSurface }}>{moonNakInfo.name}</strong>.
        </div>
      </Card>

      {/* ═════════ SIDEREAL POSITIONS TABLE ═════════ */}
      <Card title="◐ Sidereal Positions">
        <div style={{ overflowX: "auto" }}>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Body</th>
                <th style={S.th}>Rashi</th>
                <th style={S.th}>Degree</th>
                <th style={S.th}>Nakshatra · Pada</th>
                <th style={S.th}>Nakshatra Lord</th>
                <th style={S.th}>House (Whole Sign)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(allSid).map(([name, lon]) => {
                const nak = nakshatra(lon);
                const ri = rashiIdx(lon);
                const house = wholeSignHouse(lon, ascSid);
                return (
                  <tr key={name}>
                    <td style={{ ...S.td, fontWeight: 600 }}>{P_SYM[name] || ""} {name}</td>
                    <td style={{ ...S.td, color: RASHI_COL[ri] }}>{RASHI_SYM[ri]} {RASHI_NAMES[ri]}</td>
                    <td style={S.td}>{fmtDeg(degWithinSign(lon))}</td>
                    <td style={S.td}>{NAKSHATRA_INFO[nak.idx].name} <span style={{ color: M3.onSurfaceVariant }}>· {nak.pada}</span></td>
                    <td style={S.td}><span style={S.pill(M3.tertiary || "#a78bfa")}>{nak.lord}</span></td>
                    <td style={S.td}>{house}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ═════════ MOON NAKSHATRA DETAIL ═════════ */}
      <Card title={`☽ Janma Nakshatra — ${moonNakInfo.name}`}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 20 }}>
          <div>
            <p style={{ color: M3.onSurface, lineHeight: 1.65, fontSize: 14.5, margin: "4px 0 16px" }}>{moonNakInfo.nature}</p>
            <div style={S.detailRow}><div style={S.detailKey}>Deity</div><div style={S.detailVal}>{moonNakInfo.deity}</div></div>
            <div style={S.detailRow}><div style={S.detailKey}>Symbol</div><div style={S.detailVal}>{moonNakInfo.symbol}</div></div>
            <div style={S.detailRow}><div style={S.detailKey}>Gana</div><div style={S.detailVal}>{moonNakInfo.gana} (temperament)</div></div>
            <div style={S.detailRow}><div style={S.detailKey}>Varga</div><div style={S.detailVal}>{moonNakInfo.varga}</div></div>
            <div style={S.detailRow}><div style={S.detailKey}>Pada</div><div style={S.detailVal}>{moonNak.pada} of 4</div></div>
          </div>
          <div>
            <div style={S.sectionLabel}>Ruling Planet (Dasha Lord)</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: M3.primary, marginBottom: 6 }}>{P_SYM[moonNakInfo.lord] || ""} {moonNakInfo.lord}</div>
            <div style={{ color: M3.onSurfaceVariant, fontSize: 13.5, lineHeight: 1.6 }}>{DASHA_THEME[moonNakInfo.lord]?.theme}</div>
            <div style={{ marginTop: 16, padding: 12, background: `${M3.primary}0a`, borderRadius: 8, border: `1px solid ${M3.primary}22`, fontSize: 12.5, color: M3.onSurfaceVariant, lineHeight: 1.55 }}>
              In Vimshottari Dasha, every Vedic life is divided into 9 planetary periods totalling 120 years. Your birth nakshatra's lord determines which period you start in — yours starts with <strong style={{ color: M3.onSurface }}>{moonNakInfo.lord}</strong>.
            </div>
          </div>
        </div>
      </Card>

      {/* ═════════ ASCENDANT NAKSHATRA DETAIL ═════════ */}
      <Card title={`↑ Lagna Nakshatra — ${ascNakInfo.name}`}>
        <p style={{ color: M3.onSurface, lineHeight: 1.65, fontSize: 14.5, margin: "4px 0 14px" }}>{ascNakInfo.nature}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 10, fontSize: 13 }}>
          <div><span style={{ color: M3.onSurfaceVariant }}>Deity:</span> <span style={{ color: M3.onSurface }}>{ascNakInfo.deity}</span></div>
          <div><span style={{ color: M3.onSurfaceVariant }}>Symbol:</span> <span style={{ color: M3.onSurface }}>{ascNakInfo.symbol}</span></div>
          <div><span style={{ color: M3.onSurfaceVariant }}>Lord:</span> <span style={S.pill(M3.tertiary || "#a78bfa")}>{ascNakInfo.lord}</span></div>
          <div><span style={{ color: M3.onSurfaceVariant }}>Pada:</span> <span style={{ color: M3.onSurface }}>{ascNak.pada} of 4</span></div>
        </div>
        <div style={{ marginTop: 14, fontSize: 12.5, color: M3.onSurfaceVariant, lineHeight: 1.6 }}>
          The Lagna nakshatra colours how your physical presence and instinctive responses show up — the rising imprint that precedes thought.
        </div>
      </Card>

      {/* ═════════ RAHU / KETU AXIS ═════════ */}
      <Card title="☊ ☋ The Karmic Axis — Rahu & Ketu">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 14 }}>
          <div style={{ padding: 14, background: `${M3.surface}66`, borderRadius: 10, border: `1px solid ${M3.outline}33`, borderLeft: `3px solid #ab47bc` }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: "#ce93d8" }}>☊ Rahu — North Node</div>
            <div style={{ fontSize: 13, color: M3.onSurfaceVariant, marginBottom: 8, fontFamily: M3.fontMono }}>
              {RASHI_SYM[rashiIdx(rahu)]} {RASHI_NAMES[rashiIdx(rahu)]} {fmtDeg(degWithinSign(rahu))} · {NAKSHATRA_INFO[rahuNak.idx].name} pada {rahuNak.pada}
            </div>
            <div style={{ fontSize: 13, color: M3.onSurface, lineHeight: 1.6 }}>The hunger of this life. Where you reach forward, often clumsily, into unfamiliar territory.</div>
          </div>
          <div style={{ padding: 14, background: `${M3.surface}66`, borderRadius: 10, border: `1px solid ${M3.outline}33`, borderLeft: `3px solid #ff9800` }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: "#ffb74d" }}>☋ Ketu — South Node</div>
            <div style={{ fontSize: 13, color: M3.onSurfaceVariant, marginBottom: 8, fontFamily: M3.fontMono }}>
              {RASHI_SYM[rashiIdx(ketu)]} {RASHI_NAMES[rashiIdx(ketu)]} {fmtDeg(degWithinSign(ketu))} · {NAKSHATRA_INFO[ketuNak.idx].name} pada {ketuNak.pada}
            </div>
            <div style={{ fontSize: 13, color: M3.onSurface, lineHeight: 1.6 }}>The mastery of past lives. What feels effortless and old, and what you may need to put down.</div>
          </div>
        </div>
      </Card>

      {/* ═════════ WHOLE SIGN HOUSES ═════════ */}
      <Card title="🏠 Bhavas — Whole Sign Houses">
        <div style={{ fontSize: 12.5, color: M3.onSurfaceVariant, marginBottom: 12, lineHeight: 1.6 }}>
          Vedic uses Whole Sign houses — each house IS one complete rashi, starting from the rashi of your Lagna ({RASHI_NAMES[ascRashi]}). Below: every house with its rashi and any bodies currently sitting in it.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: 8 }}>
          {Array.from({ length: 12 }, (_, h) => {
            const houseNum = h + 1;
            const houseRashi = (ascRashi + h) % 12;
            const inHouse = Object.entries(allSid).filter(([n, l]) => rashiIdx(l) === houseRashi);
            return (
              <div key={h} style={{
                padding: 10, background: `${M3.surface}77`, border: `1px solid ${M3.outline}22`, borderRadius: 8,
                borderLeft: `3px solid ${RASHI_COL[houseRashi]}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: M3.onSurfaceVariant, letterSpacing: ".1em" }}>H{houseNum}</span>
                  <span style={{ fontSize: 12, color: RASHI_COL[houseRashi], fontWeight: 600 }}>{RASHI_SYM[houseRashi]} {RASHI_NAMES[houseRashi]}</span>
                </div>
                <div style={{ minHeight: 22, fontSize: 13, color: M3.onSurface }}>
                  {inHouse.length === 0
                    ? <span style={{ color: M3.onSurfaceVariant, opacity:.5 }}>—</span>
                    : inHouse.map(([n]) => <span key={n} style={{ marginRight: 8, fontSize: 14 }}>{P_SYM[n] || ""} <span style={{ fontSize: 11, color: M3.onSurfaceVariant }}>{n}</span></span>)
                  }
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ═════════ VIMSHOTTARI DASHA ═════════ */}
      <Card title="⏳ Vimshottari Dasha — Active Period">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 14, marginBottom: 18 }}>
          <div style={{ padding: 16, background: `${M3.primary}10`, border: `1px solid ${M3.primary}33`, borderRadius: 10 }}>
            <div style={S.sectionLabel}>Mahadasha (Major Period)</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: M3.primary, margin: "4px 0 6px" }}>{P_SYM[dasha.mahadasha.lord] || ""} {dasha.mahadasha.lord}</div>
            <div style={{ fontSize: 12, color: M3.onSurfaceVariant, fontFamily: M3.fontMono, marginBottom: 8 }}>
              {fmtDate(jdToDate(dasha.mahadasha.startJD))} → {fmtDate(jdToDate(dasha.mahadasha.endJD))} · {dasha.mahadasha.years} years
            </div>
            <div style={{ fontSize: 13, color: M3.onSurface, lineHeight: 1.6 }}>{DASHA_THEME[dasha.mahadasha.lord]?.theme}</div>
          </div>
          <div style={{ padding: 16, background: `${M3.tertiary || "#a78bfa"}10`, border: `1px solid ${M3.tertiary || "#a78bfa"}33`, borderRadius: 10 }}>
            <div style={S.sectionLabel}>Antardasha (Sub-Period)</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: M3.tertiary || "#ce93d8", margin: "4px 0 6px" }}>{P_SYM[dasha.antardasha.lord] || ""} {dasha.antardasha.lord}</div>
            <div style={{ fontSize: 12, color: M3.onSurfaceVariant, fontFamily: M3.fontMono, marginBottom: 8 }}>
              {fmtDate(jdToDate(dasha.antardasha.startJD))} → {fmtDate(jdToDate(dasha.antardasha.endJD))} · {dasha.antardasha.years.toFixed(2)} years
            </div>
            <div style={{ fontSize: 13, color: M3.onSurface, lineHeight: 1.6 }}>
              The {dasha.antardasha.lord} sub-current within the {dasha.mahadasha.lord} period — {DASHA_THEME[dasha.antardasha.lord]?.theme?.toLowerCase()}
            </div>
          </div>
        </div>

        <details style={{ background: `${M3.surface}55`, padding: "10px 14px", borderRadius: 8, border: `1px solid ${M3.outline}22` }}>
          <summary style={{ cursor: "pointer", fontSize: 12, fontWeight: 700, color: M3.onSurfaceVariant, letterSpacing: ".1em", textTransform: "uppercase" }}>Full Mahadasha sequence (next 120 years from birth)</summary>
          <table style={{ ...S.table, marginTop: 12 }}>
            <thead><tr>
              <th style={S.th}>Lord</th>
              <th style={S.th}>From</th>
              <th style={S.th}>To</th>
              <th style={S.th}>Years</th>
            </tr></thead>
            <tbody>
              {dasha.allMahadashas.map((p, i) => {
                const isCurrent = p === dasha.mahadasha;
                return (
                  <tr key={i} style={{ background: isCurrent ? `${M3.primary}14` : "transparent" }}>
                    <td style={{ ...S.td, fontWeight: isCurrent ? 700 : 500, color: isCurrent ? M3.primary : M3.onSurface }}>{P_SYM[p.lord] || ""} {p.lord}{isCurrent ? " ← now" : ""}</td>
                    <td style={S.td}>{fmtDate(jdToDate(p.startJD))}</td>
                    <td style={S.td}>{fmtDate(jdToDate(p.endJD))}</td>
                    <td style={S.td}>{p.years}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </details>
      </Card>

      {/* ═════════ EDUCATIONAL FOOTER ═════════ */}
      <Card title="ℹ How this differs from the Western (Tropical) chart">
        <div style={{ fontSize: 13.5, color: M3.onSurface, lineHeight: 1.7 }}>
          <p style={{ marginBottom: 12 }}>
            <strong>The zodiac is star-anchored.</strong> Vedic uses the sidereal zodiac (fixed to the constellations), while Western uses tropical (fixed to the equinoxes). The two drift apart at about 50 arcseconds per year — the offset is currently around <strong>{ayanamsa(res.jd).toFixed(1)}°</strong>. Most of your tropical positions slide one whole sign earlier in Vedic.
          </p>
          <p style={{ marginBottom: 12 }}>
            <strong>The Moon is the centre.</strong> Where Western prioritises Sun-sign identity, Vedic reads the <em>Moon</em> as the primary indicator of mind, mood and karmic flavour. Your Janma Rashi (Moon sign) and Janma Nakshatra (Moon's lunar mansion) are the two most personal pieces of a Vedic chart.
          </p>
          <p style={{ marginBottom: 12 }}>
            <strong>Houses are whole signs.</strong> Each house spans an entire rashi rather than being mathematically subdivided. This makes house assignment unambiguous: if your Lagna is in {RASHI_NAMES[ascRashi]}, then the whole of {RASHI_NAMES[ascRashi]} is your 1st house.
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Time unfolds through Dashas.</strong> The 120-year Vimshottari cycle marks which planet is "active" at any moment — Mahadasha for the major chapter, Antardasha for the sub-chapter inside it. Vedic timing predictions are read primarily through which lord is running.
          </p>
        </div>
      </Card>

    </div>
  );
}

export default VedicTab;
