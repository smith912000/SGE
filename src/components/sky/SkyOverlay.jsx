import { useMemo } from 'react';
import { useSky, trailStepDays } from '../../store/skyTimeStore.js';
import { skySamples, TRAIL_BODIES, ghostOpacity, formatJd, ageAt } from '../../engines/skyTime.js';
import { P_SYM, P_COL } from '../../data/astrology/planets.js';

const N = 36;          // ghosts behind each body
const CHUNK = 6;       // ghosts per drawn path, so a trail is a handful of elements, not hundreds

export const stepLabel = d => {
  if (d < 1.5) return `${Math.max(0.25, d).toFixed(d < 1 ? 2 : 1)} day`;
  if (d < 14) return `${Math.round(d)} days`;
  if (d < 60) return `${Math.round(d / 7)} weeks`;
  if (d < 730) return `${(d / 30.4375).toFixed(d < 365 ? 0 : 1)} months`;
  const y = d / 365.25;
  return y < 20 ? `${y.toFixed(1)} years` : `${Math.round(y).toLocaleString('en-GB')} years`;
};

// The sky of the scroller's moment on a wheel: each body as a small ghost glyph on
// the outer band, and behind it a fading stream of where it stood at each earlier
// step. Joined by straight chords, so a coarse step draws the figure the planet
// weaves (Venus's pentagram at eight-year steps) and a fine one hugs the ring.
export default function SkyOverlay({ cx, cy, R, lon2a, frame = 'trop', trailsOnly = false }) {
  const s = useSky();
  const active = s.touched && s.show;
  const step = trailStepDays(s);
  const samples = useMemo(() => (active ? skySamples(s.jd, step, s.trail === 'off' ? 0 : N) : null), [active, s.jd, step, s.trail]);
  if (!samples) return null;
  const r = R * 0.925;
  const at = (lon, ay) => {
    const a = lon2a(frame === 'sid' ? lon - ay : lon);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  return (
    <g aria-hidden="true" style={{ pointerEvents: 'none' }}>
      {s.trail !== 'off' && TRAIL_BODIES.map(b => {
        const pts = samples.map(sm => at(sm.pos[b], sm.ay));
        const paths = [];
        for (let i = 0; i < pts.length - 1; i += CHUNK) {
          const seg = pts.slice(i, Math.min(pts.length, i + CHUNK + 1));
          paths.push(<path key={i} d={'M' + seg.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('L')}
            fill="none" stroke={P_COL[b]} strokeWidth={R * (b === 'Sun' || b === 'Moon' ? 0.006 : 0.005)}
            strokeLinecap="round" strokeLinejoin="round" opacity={ghostOpacity(i + CHUNK / 2, N)} />);
        }
        return <g key={b}>{paths}</g>;
      })}
      {!trailsOnly && TRAIL_BODIES.map(b => {
        const [x, y] = at(samples[0].pos[b], samples[0].ay);
        return (
          <g key={b}>
            <circle cx={x} cy={y} r={R * 0.026} fill="#0B1613" fillOpacity="0.7" stroke={P_COL[b]} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.9" />
            <text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="central" fill={P_COL[b]} fontSize={R * 0.034} fontFamily="serif" opacity="0.95">{P_SYM[b]}</text>
          </g>
        );
      })}
    </g>
  );
}

// The line under a wheel that says what the ghost ring is.
export function SkyCaption({ trailsOnly = false }) {
  const s = useSky();
  if (!s.touched || !s.show) return null;
  const step = trailStepDays(s);
  return (
    <p className="sge-skycap" aria-live="polite">
      {trailsOnly ? 'Planets' : 'Ghost ring: the sky'} of <b>{formatJd(s.jd)}</b>, in the age of {ageAt(s.jd).sign}.
      {s.trail !== 'off' ? <> Each faint stream is the planet's earlier places, {stepLabel(step)} apart.</> : null}
    </p>
  );
}
