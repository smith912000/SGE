// South Indian style Vedic chart.
// Layout: 4×4 grid with the 12 rashis fixed in the outer cells (clockwise
// from Pisces top-left), centre 2×2 reserved for chart label.
//
// Sign positions in the grid (row, col, signIdx):
//   (0,0) Pisces 11    (0,1) Aries 0     (0,2) Taurus 1    (0,3) Gemini 2
//   (1,0) Aquarius 10  (1,1)             (1,2)             (1,3) Cancer 3
//   (2,0) Capricorn 9  (2,1)             (2,2)             (2,3) Leo 4
//   (3,0) Sagittarius 8(3,1) Scorpio 7   (3,2) Libra 6     (3,3) Virgo 5

import React from 'react';

const POSITIONS = {
  11: [0,0], 0: [0,1], 1: [0,2], 2: [0,3],
  10: [1,0],                       3: [1,3],
  9:  [2,0],                       4: [2,3],
  8:  [3,0], 7: [3,1], 6: [3,2], 5: [3,3],
};

const RASHI_SHORT = ["Ari","Tau","Gem","Can","Leo","Vir","Lib","Sco","Sag","Cap","Aqu","Pis"];
const RASHI_SYM   = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];

const PLANET_SHORT = {
  Sun:"Su", Moon:"Mo", Mars:"Ma", Mercury:"Me", Jupiter:"Ju", Venus:"Ve", Saturn:"Sa",
  Rahu:"Ra", Ketu:"Ke", Node:"Ra",
  Uranus:"Ur", Neptune:"Ne", Pluto:"Pl", Chiron:"Ch", Lilith:"Li",
};

const PLANET_COL = {
  Sun:"#ffb74d", Moon:"#e1f5fe", Mars:"#ef5350", Mercury:"#aed581",
  Jupiter:"#ffd54f", Venus:"#f48fb1", Saturn:"#90a4ae",
  Rahu:"#ce93d8", Ketu:"#ff9800", Node:"#ce93d8",
};

export default function SouthIndianChart({
  positions = {},              // { Sun: lon, Moon: lon, ... } in sidereal degrees
  ascSidereal = 0,             // Lagna sidereal longitude
  size = 320,
  title = "Rashi (D1)",
  theme = {},                  // { bg, surface, border, text, muted, accent }
}) {
  const T = {
    bg:      theme.bg      || "#161420",
    surface: theme.surface || "#1f1c2c",
    border:  theme.border  || "rgba(255,255,255,0.08)",
    text:    theme.text    || "#e9e6f0",
    muted:   theme.muted   || "#948ca8",
    accent:  theme.accent  || "#a78bfa",
  };

  const cellSize = size / 4;
  const lagnaSign = Math.floor(((ascSidereal % 360) + 360) % 360 / 30);

  // Group planets by their sign
  const planetsBySign = {};
  for (const [name, lon] of Object.entries(positions)) {
    if (lon == null) continue;
    const s = Math.floor(((lon % 360) + 360) % 360 / 30);
    if (!planetsBySign[s]) planetsBySign[s] = [];
    planetsBySign[s].push(name);
  }

  // House numbers from Lagna (1-12) — house = (signIdx - lagnaSign + 12) % 12 + 1
  const houseFor = (signIdx) => ((signIdx - lagnaSign + 12) % 12) + 1;

  return (
    <svg viewBox={`0 0 ${size} ${size}`}
         style={{ display: "block", width: "100%", maxWidth: size, height: "auto", aspectRatio: "1 / 1" }}>
      {/* outer frame */}
      <rect x="0" y="0" width={size} height={size} fill={T.surface} stroke={T.border} strokeWidth="1.2"/>

      {/* grid lines */}
      {[1,2,3].map(i => (
        <React.Fragment key={i}>
          <line x1={i*cellSize} y1="0"     x2={i*cellSize} y2={size} stroke={T.border} strokeWidth="0.7"/>
          <line x1="0"   y1={i*cellSize} x2={size} y2={i*cellSize} stroke={T.border} strokeWidth="0.7"/>
        </React.Fragment>
      ))}

      {/* centre 2×2 — title block */}
      <rect x={cellSize} y={cellSize} width={cellSize*2} height={cellSize*2}
            fill={T.bg} stroke={T.border} strokeWidth="0.7"/>
      <text x={size/2} y={size/2 - 6} textAnchor="middle" fill={T.muted}
            fontSize={size * 0.038} fontFamily="-apple-system, sans-serif"
            fontWeight="700" letterSpacing="0.1em">
        {title.toUpperCase()}
      </text>
      <text x={size/2} y={size/2 + 14} textAnchor="middle" fill={T.accent}
            fontSize={size * 0.035} fontFamily="-apple-system, sans-serif">
        Lagna · {RASHI_SHORT[lagnaSign]}
      </text>

      {/* sign cells */}
      {Object.entries(POSITIONS).map(([signStr, [row, col]]) => {
        const sign = parseInt(signStr, 10);
        const x = col * cellSize;
        const y = row * cellSize;
        const isLagna = sign === lagnaSign;
        const planets = planetsBySign[sign] || [];
        const houseNum = houseFor(sign);

        return (
          <g key={sign}>
            {/* lagna highlight */}
            {isLagna && (
              <rect x={x+1.5} y={y+1.5} width={cellSize-3} height={cellSize-3}
                    fill="none" stroke={T.accent} strokeWidth="1.8" strokeDasharray="3 3"/>
            )}
            {/* lagna corner mark */}
            {isLagna && (
              <polygon points={`${x+1.5},${y+1.5} ${x+12},${y+1.5} ${x+1.5},${y+12}`}
                       fill={T.accent} opacity="0.5"/>
            )}

            {/* house number top-left */}
            <text x={x+4} y={y+11} fill={T.muted} fontSize={size * 0.025}
                  fontFamily="-apple-system, sans-serif" fontWeight="700">
              H{houseNum}
            </text>

            {/* rashi symbol + name (top-right) */}
            <text x={x + cellSize - 4} y={y+11} textAnchor="end" fill={T.muted}
                  fontSize={size * 0.026} fontFamily="-apple-system, sans-serif">
              {RASHI_SYM[sign]} {RASHI_SHORT[sign]}
            </text>

            {/* planets — stacked from upper area */}
            {planets.map((p, i) => {
              const px = x + cellSize / 2;
              const py = y + cellSize * 0.42 + i * (size * 0.045);
              const col = PLANET_COL[p] || T.text;
              return (
                <text key={p} x={px} y={py} textAnchor="middle" fill={col}
                      fontSize={size * 0.045} fontFamily="-apple-system, sans-serif"
                      fontWeight="700">
                  {PLANET_SHORT[p] || p.slice(0, 2)}
                </text>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
