import { useState, useRef, useEffect, useCallback } from 'react';
import { useAnime } from '../../hooks/useAnime.js';
import { M3 } from '../../theme/m3.js';
import { norm, RAD } from '../../utils/helpers.js';
import { SIGNS, SIGN_SYM, SIGN_COL, SIGN_INFO } from '../../data/astrology/signs.js';
import { P_SYM, P_COL, P_ROLE, PLANET_INFO } from '../../data/astrology/planets.js';
import { ASPECTS, ASP_SHORT, ASPECT_MEANINGS } from '../../data/astrology/aspects.js';
import { HOUSE_INFO } from '../../data/astrology/houses.js';
import { AXIS_INFO } from '../../data/astrology/axes.js';
import Tooltip from '../ui/Tooltip.jsx';

function waveAxisPath(a1, a2, R, cx, cy, amp, freq, phase) {
  const [x1,y1] = [cx + R*Math.cos(a1), cy + R*Math.sin(a1)];
  const [x2,y2] = [cx + R*Math.cos(a2), cy + R*Math.sin(a2)];
  const dx = x2-x1, dy = y2-y1;
  const len = Math.hypot(dx, dy);
  if (len === 0) return `M${x1},${y1}`;
  const nx = -dy/len, ny = dx/len;
  const steps = 40;
  let d = `M${x1},${y1}`;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const bx = x1 + dx*t, by = y1 + dy*t;
    const envelope = Math.sin(t * Math.PI);
    const offset = amp * envelope * Math.sin(freq * t * Math.PI * 2 + phase);
    d += ` L${(bx + nx*offset).toFixed(2)},${(by + ny*offset).toFixed(2)}`;
  }
  return d;
}

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

export default function WheelChart({ positions, houses, size = 480, id = "w", onTooltip, mode = "default" }) {
  const svgRef = useRef(null);
  const waveRefs = useRef([null,null,null,null,null,null]);
  const anime  = useAnime();
  const phaseRef = useRef(0);
  const rafRef = useRef(null);
  const lastFrameTsRef = useRef(0);
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
  const waveAmp     = R * 0.018;

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
    const path = `M${ox0},${oy0} A${rSignOuter},${rSignOuter} 0 0,1 ${ox1},${oy1} L${ix1},${iy1} A${rSignInner},${rSignInner} 0 0,0 ${ix0},${iy0} Z`;
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
  const visibleAspects = isAspectsMode ? aspects.slice(0, 30) : aspects.slice(0, 12);

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
    { a1:lon2a(axisAC), a2:lon2a(axisDC), lbl1:"AC", lbl2:"DC", col:"#f6c840" },
    { a1:lon2a(axisMC), a2:lon2a(axisIC), lbl1:"MC", lbl2:"IC", col:"#bb86fc" },
  ];
  const axisLabels = [
    { lon:axisAC, lbl:"AC", col:"#f6c840" }, { lon:axisDC, lbl:"DC", col:"#f6c840" },
    { lon:axisMC, lbl:"MC", col:"#bb86fc" }, { lon:axisIC, lbl:"IC", col:"#bb86fc" },
  ];

  const reduceMotion = typeof window !== "undefined"
    && window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Animated wave RAF loop ── */
  useEffect(() => {
    if (reduceMotion) return;
    let running = true;
    const targetFrameMs = 1000 / 30;
    const tick = (ts) => {
      if (!running) return;
      if (document.visibilityState === "hidden") {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (ts - lastFrameTsRef.current < targetFrameMs) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      lastFrameTsRef.current = ts;
      phaseRef.current += 0.025;
      const ph = phaseRef.current;
      axisPairs.forEach((pair, pi) => {
        const d = waveAxisPath(pair.a1, pair.a2, rSignInner, cx, cy, waveAmp, 5, ph + pi * 1.5);
        const glowEl = waveRefs.current[pi*3];
        const midEl  = waveRefs.current[pi*3+1];
        const coreEl = waveRefs.current[pi*3+2];
        if (glowEl) glowEl.setAttribute("d", d);
        if (midEl)  midEl.setAttribute("d", d);
        if (coreEl) coreEl.setAttribute("d", d);
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { running = false; if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [houses, reduceMotion]);

  /* ── Entrance animations ── */
  useEffect(() => {
    if (!anime || !svgRef.current) return;
    const el = svgRef.current;
    anime({ targets: el.querySelectorAll(".wh-ring"),
      opacity:[0,1], duration:350, easing:"easeOutQuad" });
    anime({ targets: el.querySelectorAll(".sw"),
      opacity:[0,1], delay:anime.stagger(25, {start:100}), duration:400, easing:"easeOutCubic" });
    anime({ targets: el.querySelectorAll(".hc"),
      opacity:[0,1], delay:anime.stagger(20, {start:400}), duration:300, easing:"easeOutQuad" });
    anime({ targets: el.querySelectorAll(".ax-wave"),
      opacity:[0,1], delay:500, duration:600, easing:"easeInOutSine" });
    anime({ targets: el.querySelectorAll(".al"),
      strokeDashoffset:[anime.setDashoffset,0], opacity:[0,null],
      delay:anime.stagger(18,{start:600}), duration:500, easing:"easeInOutQuad" });
    anime({ targets: el.querySelectorAll(".pg"),
      opacity:[0,1], scale:[0.3,1],
      delay:anime.stagger(55,{start:700}), duration:550, easing:"easeOutBack" });
  }, [positions, anime]);

  /* ── Initial wave path for SSR / first paint ── */
  const initWavePaths = axisPairs.map((pair, pi) =>
    waveAxisPath(pair.a1, pair.a2, rSignInner, cx, cy, waveAmp, 5, pi * 1.5)
  );

  return (
    <svg ref={svgRef} width={S} height={S} viewBox={`0 0 ${S} ${S}`}
      style={{ display:"block", maxWidth:"100%",
        filter:`drop-shadow(0 0 24px rgba(187,134,252,0.14))` }}>
      <defs>
        <radialGradient id={`bg${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#0a0620"/>
          <stop offset="100%" stopColor="#04020e"/>
        </radialGradient>
        <radialGradient id={`ci${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#120e28" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#04020e" stopOpacity="0.95"/>
        </radialGradient>
        <filter id={`glo${id}`}><feGaussianBlur stdDeviation="3"/></filter>
        <filter id={`gl2${id}`}><feGaussianBlur stdDeviation="1.5"/></filter>
      </defs>

      {/* ── BACKGROUND ── */}
      <circle cx={cx} cy={cy} r={rBezel+2} fill={`url(#bg${id})`}/>

      {/* ── STRUCTURAL RINGS ── */}
      <circle className="wh-ring" cx={cx} cy={cy} r={rBezel} fill="none"
        stroke="#bb86fc" strokeWidth="1.5" opacity="0.2"/>
      <circle className="wh-ring" cx={cx} cy={cy} r={rSignInner} fill="none"
        stroke="#bb86fc" strokeWidth="1" opacity="0.12"/>
      <circle className="wh-ring" cx={cx} cy={cy} r={rPlanetRing} fill="none"
        stroke="#bb86fc" strokeWidth="0.3" opacity="0.06" strokeDasharray="2 6"/>
      <circle className="wh-ring" cx={cx} cy={cy} r={rHouseOuter} fill="none"
        stroke="#bb86fc" strokeWidth="0.6" opacity="0.08"/>
      <circle className="wh-ring" cx={cx} cy={cy} r={rHouseInner} fill="none"
        stroke="#bb86fc" strokeWidth="0.8" opacity="0.12"/>
      <circle cx={cx} cy={cy} r={rHouseInner} fill={`url(#ci${id})`}/>

      {/* ── SIGN WEDGES with 12 boundary ticks ── */}
      {signWedges.map(({ sign, path, gx, gy, idx }) => {
        const si = SIGN_INFO[sign];
        const tipInfo = { title:`${si.emoji} ${sign}`, emoji:si.emoji,
          plain:si.plain + (si.hebrew ? `\n\nLetter: ${si.letterName} (${si.hebrew}) ${si.hiero} ${si.phoenician} — ${si.letterMeaning.split("—")[1]?.trim()||""}` : ""),
          tags:[si.element, si.mode, "Ruler: "+si.ruler, ...(si.hebrew?[`${si.hebrew} ${si.letterName}`]:[]) ] };
        const bndA = lon2a(idx * 30);
        const [bx1,by1] = pt(rSignOuter, bndA);
        const [bx2,by2] = pt(rSignInner, bndA);
        return (
          <g key={sign} className="sw" style={{cursor:"pointer"}}
            onMouseMove={e=>showTip(e,tipInfo)} onMouseLeave={hideTip}>
            <path d={path} fill={SIGN_COL[sign]+"0c"} stroke={SIGN_COL[sign]+"28"} strokeWidth="0.5"/>
            <line x1={bx1} y1={by1} x2={bx2} y2={by2}
              stroke={SIGN_COL[sign]} strokeWidth="0.6" opacity="0.25"/>
            <text x={gx} y={gy} textAnchor="middle" dominantBaseline="middle"
              fill={SIGN_COL[sign]} fontSize={R*0.082} fontFamily="serif"
              style={{userSelect:"none", filter:`drop-shadow(0 0 6px ${SIGN_COL[sign]}55)`}}>{SIGN_SYM[idx]}</text>
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
              stroke="#bb86fc" strokeWidth={axis ? 0.7 : 0.35}
              opacity={axis ? 0.18 : 0.08}/>
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
              fill="#bb86fc" fontSize={R*0.044}
              fontFamily="'Share Tech Mono', monospace" fontWeight="600"
              opacity={axis ? 0.5 : 0.25}
              style={{userSelect:"none"}}>{n}</text>
          </g>
        );
      })}

      {/* ── AXIS WAVES (animated sine-wave AC-DC & MC-IC) ── */}
      {axisPairs.map((pair, pi) => (
        <g key={pi} className="ax-wave">
          <path ref={el => waveRefs.current[pi*3] = el}
            d={initWavePaths[pi]}
            fill="none" stroke={pair.col} strokeWidth="7" opacity="0.08"
            strokeLinecap="round" filter={`url(#glo${id})`}/>
          <path ref={el => waveRefs.current[pi*3+1] = el}
            d={initWavePaths[pi]}
            fill="none" stroke={pair.col} strokeWidth="3" opacity="0.35"
            strokeLinecap="round" filter={`url(#gl2${id})`}/>
          <path ref={el => waveRefs.current[pi*3+2] = el}
            d={initWavePaths[pi]}
            fill="none" stroke={pair.col} strokeWidth="1.2" opacity="0.85"
            strokeLinecap="round"/>
        </g>
      ))}

      {/* ── AXIS LABELS ── */}
      {axisLabels.map(({ lon, lbl, col }) => {
        const ai = AXIS_INFO[lbl];
        const a = lon2a(lon);
        const [labX,labY] = pt(rSignOuter + R*0.055, a);
        const [dotX,dotY] = pt(rSignInner, a);
        return (
          <g key={lbl} className="sw" style={{cursor:"pointer"}}
            onMouseMove={e=>showTip(e,{title:ai.title,emoji:ai.emoji,plain:ai.plain})}
            onMouseLeave={hideTip}>
            <circle cx={dotX} cy={dotY} r={R*0.014} fill={col} opacity="0.7"/>
            <circle cx={dotX} cy={dotY} r={R*0.006} fill="#fff" opacity="0.9"/>
            <text x={labX} y={labY}
              textAnchor="middle" dominantBaseline="middle"
              fill={col} fontSize={R*0.054} fontFamily="'Share Tech Mono', monospace"
              fontWeight="700" opacity="0.95"
              style={{userSelect:"none", filter:`drop-shadow(0 0 8px ${col}66)`}}>{lbl}</text>
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
            {isActive && <line x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={asp.col} strokeWidth={activeW+4} opacity={activeO*0.15}
              strokeLinecap="round" filter={`url(#glo${id})`}/>}
            <line className="al" x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={asp.col} strokeWidth={w} opacity={o} strokeLinecap="round"
              style={{cursor:"pointer", transition:"opacity 0.3s ease, stroke-width 0.3s ease"}}
              onMouseMove={e=>showTip(e,tipInfo)} onMouseLeave={hideTip}/>
            {(isActive || (isAspectsMode && asp.strength > 0.72)) && (()=>{
              const mx = (x1+x2)/2, my = (y1+y2)/2;
              return <text x={mx} y={my} textAnchor="middle" dominantBaseline="middle"
                fill={asp.col} fontSize={R*0.04} fontFamily="serif" opacity="0.8"
                style={{userSelect:"none", pointerEvents:"none",
                  filter:`drop-shadow(0 0 4px ${asp.col}88)`}}>{asp.sym}</text>;
            })()}
          </g>
        );
      })}

      {/* ── CENTER DOT ── */}
      <circle cx={cx} cy={cy} r={R*0.025} fill="#0a0620" stroke="#bb86fc33" strokeWidth="0.8"/>
      <circle cx={cx} cy={cy} r={R*0.008} fill="#bb86fc" opacity="0.4"/>

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
          <g key={planet} className="pg"
            style={{ transformOrigin:`${px}px ${py}px`, cursor:"pointer",
              transition:"opacity 0.3s ease" , opacity: dimmed ? 0.3 : 1 }}
            onMouseEnter={() => setHoveredPlanet(planet)}
            onMouseLeave={() => { setHoveredPlanet(null); hideTip(); }}
            onMouseMove={e=>tipInfo&&showTip(e,tipInfo)}>
            <line x1={edgeX} y1={edgeY} x2={px} y2={py}
              stroke={col} strokeWidth="0.7" opacity="0.25" strokeDasharray="2 3"/>
            {isHovered && <circle cx={px} cy={py} r={bubbleR+6} fill={col} opacity="0.08"
              filter={`url(#glo${id})`}/>}
            <circle cx={px} cy={py} r={bubbleR+2} fill={col} opacity="0.06"
              filter={`url(#gl2${id})`}/>
            <circle cx={px} cy={py} r={bubbleR}
              fill="#0a0620" stroke={col}
              strokeWidth={isHovered ? 2 : 1.2} opacity="0.9"/>
            <text x={px} y={py+0.5} textAnchor="middle" dominantBaseline="central"
              fill={col} fontSize={symSize} fontFamily="serif"
              style={{userSelect:"none", filter:`drop-shadow(0 0 4px ${col}66)`}}>{P_SYM[planet]}</text>
            <text x={px} y={py + bubbleR + degSize*0.9} textAnchor="middle"
              fill={col} fontSize={degSize} opacity={isHovered ? 0.8 : 0.5}
              fontFamily="'Share Tech Mono', monospace" style={{userSelect:"none"}}>
              {zodDeg(lon)}°
            </text>
          </g>
        );
      })}
    </svg>
  );
}
