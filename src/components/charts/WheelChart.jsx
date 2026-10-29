import { useState, useRef, useEffect, useCallback } from 'react';
import { M3 } from '../../theme/m3.js';
import { norm, RAD } from '../../utils/helpers.js';
import { SIGNS, SIGN_SYM, SIGN_COL, SIGN_INFO } from '../../data/astrology/signs.js';
import { P_SYM, P_COL, P_ROLE, PLANET_INFO } from '../../data/astrology/planets.js';
import { ASPECTS, ASP_SHORT, ASPECT_MEANINGS } from '../../data/astrology/aspects.js';
import { HOUSE_INFO } from '../../data/astrology/houses.js';
import { AXIS_INFO } from '../../data/astrology/axes.js';
import Tooltip from '../ui/Tooltip.jsx';

function calcAspects(pos) {
  const ks  = Object.keys(pos);
  const out = [];
  for (let i=0;i<ks.length;i++) for (let j=i+1;j<ks.length;j++) {
    const d = Math.abs(pos[ks[i]]-pos[ks[j]]);
    const a = d>180?360-d:d;
    for (const def of ASPECTS) {
      const orb = Math.abs(a-def.angle);
      if (orb<=def.orb) out.push({ p1:ks[i], p2:ks[j], ...def, orb:orb.toFixed(2), strength:1-orb/def.orb });
    }
  }
  return out.sort((a,b)=>b.strength-a.strength);
}

const zodSign = lon => SIGNS[Math.floor(((lon%360+360)%360)/30)];
const zodDeg = lon => (((lon%360+360)%360)%30).toFixed(1);

/* ── Wheel themes ──
   One instrument for every frame: night ground, gold rules, element-coloured
   signs. Each frame changes only its accent, which marks the MC-IC axis and
   the centre, so a glance tells which zodiac is on screen. */
const BASE_THEME = {
  bg0: "#0F0A1A", bg1: "#050309",
  ci0: "#0A0612", ci1: "#050309",
  ring: "#C9A84C",
  center0: "#0A0612",
};
const ACCENT = {
  western: "#B9A9F0", solar: "#E9C766", lunar: "#A9C3DA",
  vedic: "#E2B48A", transit: "#93B89A", chinese: "#D07262",
};
const WHEEL_THEMES = Object.fromEntries(Object.entries(ACCENT).map(([k, a]) =>
  [k, { ...BASE_THEME, center1: a, axisAccent: a }]));

export const exportWheelAsSvg = (id) => {
  const svg = document.getElementById(id);
  if (!svg) return;
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svg);
  if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if (!source.match(/^<svg[^>]+xmlns\:xlink="http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }
  const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
  const link = document.createElement("a");
  link.href = url;
  link.download = `sge_chart_${id}_${new Date().getTime()}.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function WheelChart({ positions, houses, size = 480, id = "w", onTooltip, onReading, mode = "default", theme = "western" }) {
  const TH = WHEEL_THEMES[theme] || WHEEL_THEMES.western;
  const svgRef = useRef(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  const showTip = (e, info) => {
    if (onTooltip) onTooltip({ info, x: e.clientX, y: e.clientY, visible:true });
  };
  const hideTip = () => { if (onTooltip) onTooltip({ visible:false }); };

  const S  = size;
  const cx = S / 2, cy = S / 2;
  const R  = S * 0.46;

  /* ── Band radii ── */
  const rBezel      = R;
  const rSignOuter  = R * 0.95;
  const rSignInner  = R * 0.82;
  const rPlanetRing = R * 0.80;
  const rPlanetTier2= R * 0.74;
  const rPlanetTier3= R * 0.68;
  const rHouseOuter = R * 0.66;
  const rHouseInner = R * 0.56;
  const rAspectRing = R * 0.54;

  const ascLon = houses?.ASC ?? 0;
  const lon2a  = lon => Math.PI - norm(lon - ascLon) * RAD;
  const pt = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];

  /* ── Sign wedges ── */
  const signWedges = SIGNS.map((sign, i) => {
    const a0  = lon2a(i * 30);
    const a1  = lon2a(i * 30 + 30);
    const [ox0,oy0] = pt(rSignOuter, a0);
    const [ox1,oy1] = pt(rSignOuter, a1);
    const [ix1,iy1] = pt(rSignInner, a1);
    const [ix0,iy0] = pt(rSignInner, a0);
    // Longitude runs counter-clockwise on screen, so the outer arc sweeps with flag 0.
    const path = `M${ox0},${oy0} A${rSignOuter},${rSignOuter} 0 0,0 ${ox1},${oy1} L${ix1},${iy1} A${rSignInner},${rSignInner} 0 0,1 ${ix0},${iy0} Z`;
    const [gx,gy] = pt((rSignInner+rSignOuter)/2, lon2a(i*30+15));
    return { sign, path, gx, gy, idx:i };
  });

  /* ── House cusps ── */
  const houseCusps = Array.from({length:12},(_,i)=>({
    n: i+1, lon: houses?.[i+1] ?? ascLon+i*30,
    axis: [1,4,7,10].includes(i+1),
  }));

  /* ── Aspects ── */
  const aspects = calcAspects(positions);
  const isAspectsMode = mode === "aspects";
  const baseAspects = isAspectsMode ? aspects.slice(0, 30) : aspects.slice(0, 12);
  // A body in focus shows every aspect it makes, not only the strongest dozen.
  const visibleAspects = hoveredPlanet
    ? [...baseAspects, ...aspects.filter(x => !baseAspects.includes(x) && (x.p1 === hoveredPlanet || x.p2 === hoveredPlanet))]
    : baseAspects;

  /* ── Planet placement: circumferential collision avoidance on tiered rings ── */
  const PLANET_WEIGHT = { Sun:10, Moon:9, Mercury:5, Venus:6, Mars:7, Jupiter:8, Saturn:7, Uranus:4, Neptune:3, Pluto:3, Chiron:2, Node:2, Lilith:2 };
  const entries = Object.entries(positions).sort(([,a],[,b])=>a-b);
  const planetPts = (()=>{
    const tiers = [rPlanetRing, rPlanetTier2, rPlanetTier3];
    const raw = entries.map(([planet, lon])=>({
      planet, lon, a: lon2a(lon), tier: 0,
      weight: PLANET_WEIGHT[planet]||3,
    }));
    raw.sort((a,b) => b.weight - a.weight);
    const minAngSep = 14 * RAD;
    for (let i = 0; i < raw.length; i++) {
      let placed = false;
      for (let t = 0; t < tiers.length && !placed; t++) {
        const sameTier = raw.filter((p,j) => j < i && p.tier === t);
        const conflict = sameTier.some(p => {
          let diff = Math.abs(raw[i].a - p.a);
          if (diff > Math.PI) diff = 2*Math.PI - diff;
          return diff < minAngSep;
        });
        if (!conflict) { raw[i].tier = t; placed = true; }
      }
      if (!placed) raw[i].tier = tiers.length - 1;
    }
    return raw.map(p => ({ ...p, r: tiers[p.tier] }));
  })();

  /* ── Axis data (pairs for full-diameter waves) ── */
  const axisAC  = houses?.ASC ?? 0;
  const axisDC  = norm(axisAC + 180);
  const axisMC  = houses?.MC ?? 90;
  const axisIC  = norm(axisMC + 180);
  const axisPairs = [
    { a1:lon2a(axisAC), a2:lon2a(axisDC), lbl1:"AC", lbl2:"DC", col:"#E9C766" },
    { a1:lon2a(axisMC), a2:lon2a(axisIC), lbl1:"MC", lbl2:"IC", col:TH.axisAccent },
  ];
  const axisLabels = [
    { lon:axisAC, lbl:"AC", col:"#E9C766" }, { lon:axisDC, lbl:"DC", col:"#E9C766" },
    { lon:axisMC, lbl:"MC", col:TH.axisAccent }, { lon:axisIC, lbl:"IC", col:TH.axisAccent },
  ];

  const reduceMotion = typeof window !== "undefined"
    && window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── The body in focus: its sign, its house and its aspects ──
     Hover, tap or keyboard focus on a body lights the sign it stands in and
     the house it falls in, and names them under the wheel. */
  const houseOf = (lon) => {
    if (!houses) return null;
    for (let n = 1; n <= 12; n++) {
      const a = houses[n], b = houses[(n % 12) + 1];
      if (a == null || b == null) return null;
      if (norm(lon - a) < norm(b - a)) return n;
    }
    return null;
  };
  const focus = hoveredPlanet && positions[hoveredPlanet] != null ? (() => {
    const lon = positions[hoveredPlanet];
    const house = houseOf(lon);
    const asps = aspects.filter(a => a.p1 === hoveredPlanet || a.p2 === hoveredPlanet)
      .map(a => ({ name: a.name, other: a.p1 === hoveredPlanet ? a.p2 : a.p1, orb: a.orb, col: a.col, sym: a.sym }));
    return { planet: hoveredPlanet, lon, sign: zodSign(lon), deg: zodDeg(lon), house, aspects: asps };
  })() : null;

  useEffect(() => { if (onReading) onReading(focus); },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hoveredPlanet, positions]);

  const houseSector = focus?.house ? (() => {
    const n = focus.house;
    const l0 = houses[n], l1 = houses[(n % 12) + 1];
    const a0 = lon2a(l0), a1 = lon2a(l1);
    const big = norm(l1 - l0) > 180 ? 1 : 0;
    const [o0x,o0y] = pt(rHouseOuter, a0), [o1x,o1y] = pt(rHouseOuter, a1);
    const [i1x,i1y] = pt(rHouseInner, a1), [i0x,i0y] = pt(rHouseInner, a0);
    return `M${o0x},${o0y} A${rHouseOuter},${rHouseOuter} 0 ${big},0 ${o1x},${o1y} L${i1x},${i1y} A${rHouseInner},${rHouseInner} 0 ${big},1 ${i0x},${i0y} Z`;
  })() : null;

  /* ── Casting: the figure assembles in the order it is read ──
     Rings, then the signs from 0° Aries round the zodiac, then the cusps,
     then each body travels from 0° Aries to its longitude, so the arc it
     covers is its place in the zodiac. Aspects draw last. About two seconds,
     once per chart, and skipped under prefers-reduced-motion. */
  useEffect(() => {
    const el = svgRef.current;
    if (!el || reduceMotion || typeof el.animate !== "function") return;
    const ease = "cubic-bezier(.16,1,.3,1)";
    const anims = [];
    const fade = (nodes, start, step, duration = 380) => nodes.forEach((n, i) =>
      anims.push(n.animate([{ opacity: 0 }, { opacity: 1 }], { duration, delay: start + i * step, easing: ease, fill: "backwards" })));
    fade([...el.querySelectorAll(".wh-ring")], 0, 40);
    fade([...el.querySelectorAll(".sw[data-sign]")].sort((a, b) => a.dataset.sign - b.dataset.sign), 80, 35);
    fade([...el.querySelectorAll(".hc")], 480, 25);
    fade([...el.querySelectorAll(".ax-wave, .sw[data-axis]")], 560, 0, 500);
    const bodies = [...el.querySelectorAll(".pg")].sort((a, b) => a.dataset.lon - b.dataset.lon);
    bodies.forEach((g, i) => {
      const lon = Number(g.dataset.lon);
      const timing = { duration: 700 + lon * 2, delay: 700 + i * 70, easing: ease, fill: "backwards" };
      anims.push(g.animate([{ transform: `rotate(${lon}deg)`, opacity: 0 }, { transform: `rotate(${lon * 0.15}deg)`, opacity: 1, offset: 0.85 }, { transform: "rotate(0deg)", opacity: 1 }], timing));
      // keep the glyph and its degree upright while the body travels
      g.querySelectorAll("text").forEach(t =>
        anims.push(t.animate([{ transform: `rotate(${-lon}deg)` }, { transform: `rotate(${-lon * 0.15}deg)`, offset: 0.85 }, { transform: "rotate(0deg)" }], timing)));
    });
    const asp0 = 700 + bodies.length * 70 + 600;
    el.querySelectorAll(".al").forEach((l, i) => {
      const L = Math.hypot(l.x2.baseVal.value - l.x1.baseVal.value, l.y2.baseVal.value - l.y1.baseVal.value);
      anims.push(l.animate([{ strokeDasharray: `${L}`, strokeDashoffset: L }, { strokeDasharray: `${L}`, strokeDashoffset: 0 }],
        { duration: 500, delay: asp0 + i * 30, easing: ease, fill: "backwards" }));
    });
    return () => anims.forEach(a => a.cancel());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions, houses]);

  return (
    <svg ref={svgRef} id={id} viewBox={`0 0 ${S} ${S}`}
      style={{ display:"block", width:"100%", maxWidth: S, height: "auto", aspectRatio: "1 / 1",
      }}>
      <defs>
        <radialGradient id={`bg${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor={TH.bg0}/>
          <stop offset="100%" stopColor={TH.bg1}/>
        </radialGradient>
        <radialGradient id={`ci${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor={TH.ci0} stopOpacity="0.7"/>
          <stop offset="100%" stopColor={TH.ci1} stopOpacity="0.95"/>
        </radialGradient>
      </defs>

      {/* ── BACKGROUND ── */}
      <circle cx={cx} cy={cy} r={rBezel+2} fill={`url(#bg${id})`}/>
      {/* ── STRUCTURAL RINGS ── */}
      <circle className="wh-ring" cx={cx} cy={cy} r={rBezel} fill="none"
        stroke={TH.ring} strokeWidth="1.5" opacity="0.2"/>
      <circle className="wh-ring" cx={cx} cy={cy} r={rSignInner} fill="none"
        stroke={TH.ring} strokeWidth="1" opacity="0.12"/>
      <circle className="wh-ring" cx={cx} cy={cy} r={rPlanetRing} fill="none"
        stroke={TH.ring} strokeWidth="0.3" opacity="0.06" strokeDasharray="2 6"/>
      <circle className="wh-ring" cx={cx} cy={cy} r={rHouseOuter} fill="none"
        stroke={TH.ring} strokeWidth="0.6" opacity="0.08"/>
      <circle className="wh-ring" cx={cx} cy={cy} r={rHouseInner} fill="none"
        stroke={TH.ring} strokeWidth="0.8" opacity="0.12"/>
      <circle cx={cx} cy={cy} r={rHouseInner} fill={`url(#ci${id})`}/>

      {/* ── SIGN WEDGES with 12 boundary ticks ── */}
      {signWedges.map(({ sign, path, gx, gy, idx }) => {
        const si = SIGN_INFO[sign];
        const tipInfo = { title:sign,
          plain:si.plain + (si.hebrew ? `\n\nLetter: ${si.letterName} (${si.hebrew}) ${si.hiero} ${si.phoenician} — ${si.letterMeaning.split("—")[1]?.trim()||""}` : ""),
          tags:[si.element, si.mode, "Ruler: "+si.ruler, ...(si.hebrew?[`${si.hebrew} ${si.letterName}`]:[]) ] };
        const bndA = lon2a(idx * 30);
        const [bx1,by1] = pt(rSignOuter, bndA);
        const [bx2,by2] = pt(rSignInner, bndA);
        
        // Degree ticks (1, 5, 10 degrees)
        const ticks = [];
        for (let d = 1; d < 30; d++) {
          const tickA = lon2a(idx * 30 + d);
          let tickLen = 0.015 * R;
          let op = 0.15;
          if (d % 10 === 0) { tickLen = 0.035 * R; op = 0.35; }
          else if (d % 5 === 0) { tickLen = 0.025 * R; op = 0.25; }
          const [tx1, ty1] = pt(rSignInner, tickA);
          const [tx2, ty2] = pt(rSignInner + tickLen, tickA);
          ticks.push(<line key={d} x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke={SIGN_COL[sign]} strokeWidth="0.5" opacity={op} />);
        }

        return (
          <g key={sign} className="sw" data-sign={idx} style={{cursor:"pointer"}}
            onMouseMove={e=>showTip(e,tipInfo)} onMouseLeave={hideTip}>
            <path d={path} fill={SIGN_COL[sign]+(focus?.sign === sign ? "2e" : "0c")}
              stroke={SIGN_COL[sign]+(focus?.sign === sign ? "88" : "28")} strokeWidth="0.5"
              style={{ transition:"fill .25s, stroke .25s" }}/>
            <line x1={bx1} y1={by1} x2={bx2} y2={by2}
              stroke={SIGN_COL[sign]} strokeWidth="0.6" opacity="0.25"/>
            {ticks}
            <text x={gx} y={gy} textAnchor="middle" dominantBaseline="middle"
              fill={SIGN_COL[sign]} fontSize={R*0.082} fontFamily="serif"
              style={{userSelect:"none"}}>{SIGN_SYM[idx]}</text>
          </g>
        );
      })}

      {/* ── HOUSE CUSPS ── */}
      {houseCusps.map(({ n, lon, axis }) => {
        const hi = HOUSE_INFO[n-1];
        const tipInfo = { title:hi.name, emoji:hi.emoji, plain:hi.plain };
        const a   = lon2a(lon);
        const [x1,y1] = pt(rHouseInner, a);
        const [x2,y2] = pt(rHouseOuter, a);
        const nextCusp = houses?.[(n%12)+1] ?? ascLon + n*30;
        const midLon = lon + norm(nextCusp - lon) / 2;
        const aMid = lon2a(midLon);
        const [lx,ly] = pt((rHouseInner + rHouseOuter) * 0.5, aMid);
        return (
          <g key={n} className="hc" style={{cursor:"pointer"}}
            onMouseMove={e=>showTip(e,tipInfo)} onMouseLeave={hideTip}>
            <line x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={TH.ring} strokeWidth={axis ? 0.7 : 0.35}
              opacity={axis ? 0.18 : 0.08}/>
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
              fill={TH.ring} fontSize={R*0.044}
              fontFamily="'JetBrains Mono', monospace" fontWeight="600"
              opacity={axis ? 0.5 : 0.25}
              style={{userSelect:"none"}}>{n}</text>
          </g>
        );
      })}

      {/* ── HOUSE OF THE BODY IN FOCUS ── */}
      {houseSector && <path d={houseSector} fill="#E9C766" opacity="0.09" stroke="#E9C766" strokeOpacity="0.35" strokeWidth="0.6" style={{pointerEvents:"none"}}/>}

      {/* ── AXES: AC-DC in gold, MC-IC in the frame's accent ── */}
      {axisPairs.map((pair, pi) => {
        const [x1, y1] = pt(rSignInner, pair.a1);
        const [x2, y2] = pt(rSignInner, pair.a2);
        return <line key={pi} className="ax-wave" x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={pair.col} strokeWidth="1" opacity="0.7"/>;
      })}

      {/* ── AXIS LABELS ── */}
      {axisLabels.map(({ lon, lbl, col }) => {
        const ai = AXIS_INFO[lbl];
        const a = lon2a(lon);
        const [labX,labY] = pt(rSignOuter + R*0.055, a);
        const [dotX,dotY] = pt(rSignInner, a);
        return (
          <g key={lbl} className="sw" data-axis={lbl} style={{cursor:"pointer"}}
            onMouseMove={e=>showTip(e,{title:ai.title,emoji:ai.emoji,plain:ai.plain})}
            onMouseLeave={hideTip}>
            <circle cx={dotX} cy={dotY} r={R*0.014} fill={col} opacity="0.7"/>
            <circle cx={dotX} cy={dotY} r={R*0.006} fill="#fff" opacity="0.9"/>
            <text x={labX} y={labY}
              textAnchor="middle" dominantBaseline="middle"
              fill={col} fontSize={R*0.054} fontFamily="'JetBrains Mono', monospace"
              fontWeight="700" opacity="0.95"
              style={{userSelect:"none"}}>{lbl}</text>
          </g>
        );
      })}

      {/* ── ASPECT GEOMETRY — faint lines between planets, highlight on hover ── */}
      {visibleAspects.map((asp, i) => {
        const p1Data = planetPts.find(p=>p.planet===asp.p1);
        const p2Data = planetPts.find(p=>p.planet===asp.p2);
        if (!p1Data || !p2Data) return null;
        const [x1,y1] = pt(p1Data.r, p1Data.a);
        const [x2,y2] = pt(p2Data.r, p2Data.a);
        const isActive = hoveredPlanet && (asp.p1 === hoveredPlanet || asp.p2 === hoveredPlanet);
        const isFaded = hoveredPlanet && !isActive;
        const baseW = isAspectsMode ? (0.8 + asp.strength * 1.6) : (0.4 + asp.strength * 0.8);
        const baseO = isAspectsMode ? (0.18 + asp.strength * 0.34) : (0.06 + asp.strength * 0.1);
        const activeW = isAspectsMode ? (2.4 + asp.strength * 2.8) : (1.4 + asp.strength * 2.4);
        const activeO = isAspectsMode ? (0.65 + asp.strength * 0.3) : (0.5 + asp.strength * 0.42);
        const w = isActive ? activeW : (isFaded ? baseW * 0.4 : baseW);
        const o = isActive ? activeO : (isFaded ? baseO * 0.3 : baseO);
        const tipInfo = {
          title:`${asp.sym} ${asp.p1} ${asp.name} ${asp.p2}`,
          emoji: asp.name==="Trine"?"✨":asp.name==="Square"?"⚡":asp.name==="Opposition"?"⚖️":asp.name==="Conjunction"?"🔗":"🔀",
          plain: ASPECT_MEANINGS[asp.name]||"A planetary relationship shaping how these two energies interact.",
          tags: [asp.name, `Orb ${asp.orb}°`, `${(asp.strength*100).toFixed(0)}% strength`],
        };
        return (
          <g key={`asp-${i}`} style={{ transition:"opacity 0.3s, stroke-width 0.3s" }}>
            <line className="al" x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={asp.col} strokeWidth={w} opacity={o} strokeLinecap="round"
              style={{cursor:"pointer", transition:"opacity 0.3s ease, stroke-width 0.3s ease"}}
              onMouseMove={e=>showTip(e,tipInfo)} onMouseLeave={hideTip}/>
            {(isActive || (isAspectsMode && asp.strength > 0.72)) && (()=>{
              const mx = (x1+x2)/2, my = (y1+y2)/2;
              return <text x={mx} y={my} textAnchor="middle" dominantBaseline="middle"
                fill={asp.col} fontSize={R*0.04} fontFamily="serif" opacity="0.8"
                style={{userSelect:"none", pointerEvents:"none"}}>{asp.sym}</text>;
            })()}
          </g>
        );
      })}

      {/* ── CENTER DOT ── */}
      <circle cx={cx} cy={cy} r={R*0.025} fill={TH.center0} stroke={TH.center1+"33"} strokeWidth="0.8"/>
      <circle cx={cx} cy={cy} r={R*0.008} fill={TH.center1} opacity="0.4"/>

      {/* ── PLANETS (bubbles — hover to reveal aspect geometry) ── */}
      {planetPts.map(({ planet, lon, a, r, weight }) => {
        const [px,py] = pt(r, a);
        const bubbleR = R * (weight > 7 ? 0.048 : 0.040);
        const symSize = R * (weight > 7 ? 0.058 : 0.050);
        const degSize = R * 0.026;
        const pi = PLANET_INFO[planet];
        const sign = zodSign(lon);
        const tipInfo = pi ? {
          title: pi.title, emoji: pi.emoji,
          plain: pi.plain + (pi.hebrew ? `\n\nHebrew letter: ${pi.letterName} (${pi.hebrew}) ${pi.hiero}` : ""),
          detail: `Currently in ${sign} at ${zodDeg(lon)}°. ${pi.detail}`,
          tags: [sign, `${zodDeg(lon)}°`, SIGN_INFO[sign]?.element, ...(pi.hebrew?[`${pi.hebrew} ${pi.letterName}`]:[])],
        } : null;
        const [edgeX, edgeY] = pt(rSignInner, a);
        const col = P_COL[planet];
        const isHovered = hoveredPlanet === planet;
        const isConnected = hoveredPlanet && aspects.some(asp =>
          (asp.p1===hoveredPlanet||asp.p2===hoveredPlanet) && (asp.p1===planet||asp.p2===planet));
        const dimmed = hoveredPlanet && !isHovered && !isConnected;
        return (
          <g key={planet} className="pg" data-lon={norm(lon)}
            tabIndex={0} role="button" aria-label={`${planet}, ${zodDeg(lon)}° ${sign}`}
            style={{ transformOrigin:`${cx}px ${cy}px`, cursor:"pointer", outline:"none",
              transition:"opacity 0.3s ease" , opacity: dimmed ? 0.3 : 1 }}
            onMouseEnter={() => setHoveredPlanet(planet)}
            onMouseLeave={() => { setHoveredPlanet(null); hideTip(); }}
            onFocus={() => setHoveredPlanet(planet)}
            onBlur={() => setHoveredPlanet(null)}
            onClick={() => setHoveredPlanet(planet)}
            onMouseMove={e=>tipInfo&&showTip(e,tipInfo)}>
            <line x1={edgeX} y1={edgeY} x2={px} y2={py}
              stroke={col} strokeWidth="0.7" opacity="0.25" strokeDasharray="2 3"/>
            {isHovered && <circle cx={px} cy={py} r={bubbleR + 4} fill="none" stroke={col} strokeWidth="0.8" opacity="0.6"/>}
            <circle cx={px} cy={py} r={bubbleR}
              fill={TH.center0} stroke={col}
              strokeWidth={isHovered ? 2 : 1.2} opacity="0.9"/>
            <text x={px} y={py+0.5} textAnchor="middle" dominantBaseline="central"
              fill={col} fontSize={symSize} fontFamily="serif"
              style={{userSelect:"none", transformBox:"fill-box", transformOrigin:"center"}}>{P_SYM[planet]}</text>
            <text x={px} y={py + bubbleR + degSize*0.9} textAnchor="middle"
              fill={col} fontSize={degSize} opacity={isHovered ? 0.8 : 0.5}
              fontFamily="'JetBrains Mono', monospace" style={{userSelect:"none", transformBox:"fill-box", transformOrigin:"center"}}>
              {zodDeg(lon)}°
            </text>
          </g>
        );
      })}
    </svg>
  );
}
