import { useRef, useEffect, useState } from "react";
import { useAnime } from "../../hooks/useAnime.js";
import { M3 } from "../../theme/m3.js";

const RAD = Math.PI / 180;

function polar(cx, cy, r, deg) {
  const a = (deg - 90) * RAD;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function arcPath(cx, cy, r, startDeg, endDeg) {
  const span = Math.max(0.001, endDeg - startDeg);
  const large = span > 180 ? 1 : 0;
  const [x0, y0] = polar(cx, cy, r, startDeg);
  const [x1, y1] = polar(cx, cy, r, endDeg);
  return `M${x0},${y0} A${r},${r} 0 ${large},1 ${x1},${y1}`;
}

function wedgePath(cx, cy, rOuter, rInner, startDeg, endDeg) {
  const span = Math.max(0.001, endDeg - startDeg);
  const large = span > 180 ? 1 : 0;
  const [ox0, oy0] = polar(cx, cy, rOuter, startDeg);
  const [ox1, oy1] = polar(cx, cy, rOuter, endDeg);
  const [ix1, iy1] = polar(cx, cy, rInner, endDeg);
  const [ix0, iy0] = polar(cx, cy, rInner, startDeg);
  return `M${ox0},${oy0} A${rOuter},${rOuter} 0 ${large},1 ${ox1},${oy1} L${ix1},${iy1} A${rInner},${rInner} 0 ${large},0 ${ix0},${iy0} Z`;
}

const RING_PALETTES = [
  { base: "#bb86fc", active: "#e0b0ff", glow: "rgba(187,134,252,0.25)" },
  { base: "#80cbc4", active: "#a7f3d0", glow: "rgba(128,203,196,0.22)" },
  { base: "#f6c840", active: "#ffe082", glow: "rgba(246,200,64,0.22)" },
  { base: "#f48fb1", active: "#f8bbd0", glow: "rgba(244,143,177,0.22)" },
];

export default function CalendarWheel({ model, size = 500, onTooltip, showOverlay = true }) {
  if (!model) return null;
  const svgRef = useRef(null);
  const anime = useAnime();
  const [hovered, setHovered] = useState(null); // { ringIdx, segIdx }

  const S = size;
  const cx = S / 2;
  const cy = S / 2;
  const R = S * 0.46;

  const rBezel = R;
  const ringCount = Math.max(1, model.nativeRings.length);
  const ringGap = R * 0.025;
  const ringThickness = Math.min(R * 0.28, (R * 0.58) / ringCount);
  const outerStart = R * 0.94;

  const handleMove = (e, info) => {
    if (onTooltip) onTooltip({ visible: true, info, x: e.clientX, y: e.clientY });
  };
  const handleLeave = () => {
    if (onTooltip) onTooltip({ visible: false });
  };

  useEffect(() => {
    if (!anime || !svgRef.current) return;
    const el = svgRef.current;
    anime({ targets: el.querySelectorAll(".cw-ring"), opacity: [0, 1], duration: 400, easing: "easeOutQuad" });
    anime({ targets: el.querySelectorAll(".cw-seg"), opacity: [0, 1], delay: anime.stagger(8, { start: 150 }), duration: 350, easing: "easeOutCubic" });
    anime({ targets: el.querySelectorAll(".cw-lbl"), opacity: [0, 1], delay: anime.stagger(12, { start: 350 }), duration: 300, easing: "easeOutQuad" });
    anime({ targets: el.querySelectorAll(".cw-overlay"), opacity: [0, 1], delay: 500, duration: 600, easing: "easeInOutSine" });
    anime({ targets: el.querySelectorAll(".cw-center"), opacity: [0, 1], scale: [0.6, 1], delay: 600, duration: 500, easing: "easeOutBack" });
  }, [model, anime]);

  return (
    <svg ref={svgRef} width={S} height={S} viewBox={`0 0 ${S} ${S}`}
      style={{ display: "block", maxWidth: "100%", filter: "drop-shadow(0 0 20px rgba(187,134,252,0.12))" }}>
      <defs>
        <radialGradient id={`calBg-${model.id}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#0a0620" />
          <stop offset="100%" stopColor="#04020e" />
        </radialGradient>
        <radialGradient id={`calCenter-${model.id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#120e28" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#04020e" stopOpacity="0.95" />
        </radialGradient>
        <filter id={`calGlow-${model.id}`}><feGaussianBlur stdDeviation="3" /></filter>
        <filter id={`calGlow2-${model.id}`}><feGaussianBlur stdDeviation="1.5" /></filter>
        <filter id={`calGlow3-${model.id}`}><feGaussianBlur stdDeviation="6" /></filter>
      </defs>

      <circle cx={cx} cy={cy} r={rBezel + 3} fill={`url(#calBg-${model.id})`} />
      <circle className="cw-ring" cx={cx} cy={cy} r={rBezel} fill="none" stroke={M3.primary} strokeWidth="1.5" opacity="0.2" />

      {model.nativeRings.map((ring, ringIdx) => {
        const palette = RING_PALETTES[ringIdx % RING_PALETTES.length];
        const ringOuter = outerStart - ringIdx * (ringThickness + ringGap);
        const ringInner = ringOuter - ringThickness;
        const labelR = (ringOuter + ringInner) / 2;
        const segCount = ring.segments.length;
        const showLabels = segCount <= 48;
        const labelStep = segCount > 30 ? 4 : segCount > 20 ? 2 : 1;
        const labelFontSize = ringIdx === 0 ? R * 0.03 : ringIdx === ringCount - 1 ? R * 0.02 : R * 0.025;

        return (
          <g key={ring.id}>
            <circle className="cw-ring" cx={cx} cy={cy} r={ringOuter} fill="none" stroke={palette.base} strokeWidth="0.8" opacity="0.18" />
            <circle className="cw-ring" cx={cx} cy={cy} r={ringInner} fill="none" stroke={palette.base} strokeWidth="0.6" opacity="0.1" />

            {ring.segments.map((seg, segIdx) => {
              const isActive = segIdx === ring.activeIndex;
              const mid = (seg.start + seg.end) / 2;
              const [lx, ly] = polar(cx, cy, labelR, mid);
              const path = wedgePath(cx, cy, ringOuter, ringInner, seg.start, seg.end);

              const segCol = isActive ? palette.active : palette.base;
              const baseFill = seg.color || segCol;
              const fillOpacity = isActive ? 0.22 : (segIdx % 2 === 0 ? 0.06 : 0.03);
              const strokeCol = isActive ? palette.active : palette.base;
              const strokeOpacity = isActive ? 0.7 : 0.12;

              const tipInfo = {
                title: `${model.title} — ${ring.label}`,
                emoji: isActive ? "◆" : "◇",
                plain: `${seg.label}${isActive ? " (current)" : ""}${seg.detail ? "\n" + seg.detail : ""}`,
                detail: ring.plain || "",
                tags: [ring.id, `${segIdx + 1}/${segCount}`],
              };

              return (
                <g key={`${ring.id}-${segIdx}`} className="cw-seg"
                  style={{
                    cursor: "pointer",
                    opacity: hovered && hovered.ringIdx === ringIdx && hovered.segIdx !== segIdx ? 0.3 : 1,
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={() => setHovered({ ringIdx, segIdx })}
                  onMouseLeave={() => { setHovered(null); handleLeave(); }}
                  onMouseMove={(e) => handleMove(e, tipInfo)}>
                  {hovered?.ringIdx === ringIdx && hovered?.segIdx === segIdx && !isActive && (
                    <path d={path} fill={palette.glow} stroke="none" opacity="0.25"
                      filter={`url(#calGlow2-${model.id})`} />
                  )}
                  {isActive && (
                    <path d={path} fill={palette.glow} stroke="none"
                      filter={`url(#calGlow3-${model.id})`} opacity="0.3" />
                  )}
                  {isActive && (
                    <path d={path} fill={palette.glow} stroke="none"
                      filter={`url(#calGlow-${model.id})`} opacity="0.6" />
                  )}
                  <path d={path}
                    fill={`${baseFill}${Math.round(fillOpacity * 255).toString(16).padStart(2, "0")}`}
                    stroke={strokeCol}
                    strokeWidth={isActive ? 1.4 : 0.4}
                    strokeOpacity={strokeOpacity} />
                  {isActive && (
                    <path d={arcPath(cx, cy, ringOuter - 1, seg.start + 0.5, seg.end - 0.5)}
                      fill="none" stroke={palette.active} strokeWidth="2"
                      opacity="0.6" filter={`url(#calGlow2-${model.id})`} />
                  )}
                  <line
                    x1={polar(cx, cy, ringOuter, seg.start)[0]} y1={polar(cx, cy, ringOuter, seg.start)[1]}
                    x2={polar(cx, cy, ringOuter - ringThickness * 0.3, seg.start)[0]} y2={polar(cx, cy, ringOuter - ringThickness * 0.3, seg.start)[1]}
                    stroke={palette.base} strokeWidth="0.6" opacity="0.3"
                  />
                  {showLabels && segIdx % labelStep === 0 && (
                    <text className="cw-lbl"
                      x={lx} y={ly}
                      textAnchor="middle" dominantBaseline="middle"
                      fill={isActive ? palette.active : M3.onSurfaceVariant}
                      fontSize={labelFontSize}
                      fontFamily="Cinzel, serif"
                      opacity={isActive ? 0.95 : 0.55}
                      style={{
                        userSelect: "none", pointerEvents: "none",
                        filter: isActive ? `drop-shadow(0 0 4px ${palette.glow})` : "none",
                      }}>
                      {seg.label}
                    </text>
                  )}
                </g>
              );
            })}

            <text
              x={cx + (ringOuter + 4) * Math.cos((-90 + 2) * RAD)}
              y={cy + (ringOuter + 4) * Math.sin((-90 + 2) * RAD)}
              fill={palette.base} fontSize={Math.max(7, R * 0.015)}
              fontFamily="'Share Tech Mono', monospace" opacity="0.25"
              textAnchor="start" dominantBaseline="middle"
              style={{ userSelect: "none", pointerEvents: "none" }}>
              {ring.label}
            </text>
          </g>
        );
      })}

      {showOverlay && (() => {
        const angle = model.overlayAngle ?? 0;
        const [ox, oy] = polar(cx, cy, R * 0.98, angle);
        const [ix, iy] = polar(cx, cy, R * 0.22, angle);
        const tipInfo = {
          title: "Normalized Solar Anchor",
          emoji: "◎",
          plain: `${model.overlayLabel || "Solar longitude"} at ${angle.toFixed(1)}°`,
          detail: "Shared 0–360° comparison reference for cross-calendar alignment.",
          tags: ["overlay", "solar", "normalized"],
        };
        return (
          <g className="cw-overlay">
            <circle cx={cx} cy={cy} r={R * 0.985} fill="none"
              stroke="#ffd54f" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.2" />
            <line x1={ix} y1={iy} x2={ox} y2={oy}
              stroke="#ffd54f" strokeWidth="8" opacity="0.04"
              strokeLinecap="round" filter={`url(#calGlow3-${model.id})`} />
            <line x1={ix} y1={iy} x2={ox} y2={oy}
              stroke="#ffd54f" strokeWidth="5" opacity="0.08"
              strokeLinecap="round" filter={`url(#calGlow-${model.id})`} />
            <line x1={ix} y1={iy} x2={ox} y2={oy}
              stroke="#ffd54f" strokeWidth="2" opacity="0.5"
              strokeLinecap="round" filter={`url(#calGlow2-${model.id})`} />
            <line x1={ix} y1={iy} x2={ox} y2={oy}
              stroke="#ffd54f" strokeWidth="1" opacity="0.85"
              strokeLinecap="round"
              style={{ cursor: "pointer" }}
              onMouseMove={(e) => handleMove(e, tipInfo)} onMouseLeave={handleLeave} />
            <circle cx={ox} cy={oy} r={S * 0.014} fill="#ffd54f" opacity="0.15"
              filter={`url(#calGlow-${model.id})`} />
            <circle cx={ox} cy={oy} r={S * 0.008} fill="#ffd54f" opacity="0.9">
              <animate attributeName="r" values={`${S*0.008};${S*0.011};${S*0.008}`} dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0.6;0.9" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        );
      })()}

      <circle className="cw-center" cx={cx} cy={cy} r={R * 0.21} fill="none" stroke={M3.primary} strokeWidth="0.4" opacity="0.08" />
      <circle className="cw-center" cx={cx} cy={cy} r={R * 0.16} fill="none" stroke={M3.primary} strokeWidth="0.3" opacity="0.06" />
      <circle className="cw-center" cx={cx} cy={cy} r={R * 0.12} fill="none" stroke={M3.primary} strokeWidth="0.3" opacity="0.04" />
      <circle className="cw-center" cx={cx} cy={cy} r={R * 0.18}
        fill={`url(#calCenter-${model.id})`} stroke={M3.primary} strokeWidth="0.8" strokeOpacity="0.2" />
      <text className="cw-center"
        x={cx} y={cy - S * 0.016}
        textAnchor="middle" fill={M3.primary}
        fontSize={R * 0.035}
        fontFamily="Cinzel, serif"
        style={{ filter: `drop-shadow(0 0 6px ${M3.primary}44)` }}>
        {model.title}
      </text>
      <text className="cw-center"
        x={cx} y={cy + S * 0.018}
        textAnchor="middle" fill={M3.onSurfaceVariant}
        fontSize={R * 0.02}
        fontFamily="'Share Tech Mono', monospace" opacity="0.6">
        {model.confidence}
      </text>
      {model.nativeRings[0]?.segments[model.nativeRings[0]?.activeIndex]?.label && (
        <text className="cw-center"
          x={cx} y={cy + S * 0.04}
          textAnchor="middle" fill={RING_PALETTES[0].active}
          fontSize={R * 0.018}
          fontFamily="Cinzel, serif" opacity="0.7"
          style={{ userSelect: "none" }}>
          {model.nativeRings[0].segments[model.nativeRings[0].activeIndex].label}
        </text>
      )}
    </svg>
  );
}
