import { SIGN_SYM, SIGNS, SIGN_COL } from '../../data/astrology/signs.js';

// The ecliptic as an instrument ring: degree ticks every 5°, longer every 30°,
// the twelve signs in their element colours. It is SGE's own motif, the one
// circle every tradition in the app measures along.
export default function EclipticRing({ size = 240, className = '', title }) {
  const c = 100, rOut = 96, rIn = 78, rGlyph = 87;
  const pt = (r, deg) => {
    const a = (180 - deg) * Math.PI / 180;            // 0° Aries on the left, counter-clockwise
    return [c + r * Math.cos(a), c - r * Math.sin(a)];
  };
  const ticks = [];
  for (let d = 0; d < 360; d += 5) {
    const major = d % 30 === 0;
    const [x1, y1] = pt(rIn, d);
    const [x2, y2] = pt(rIn + (major ? 18 : d % 10 === 0 ? 5 : 3), d);
    ticks.push(<line key={d} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9A84C"
      strokeWidth={major ? 0.6 : 0.35} opacity={major ? 0.55 : 0.35} />);
  }
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 200 200" fill="none"
      role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : 'true'}>
      <circle cx={c} cy={c} r={rOut} stroke="#C9A84C" strokeWidth="0.6" opacity="0.5" />
      <circle cx={c} cy={c} r={rIn} stroke="#C9A84C" strokeWidth="0.4" opacity="0.4" />
      <circle cx={c} cy={c} r={rIn - 22} stroke="#6349B8" strokeWidth="0.4" opacity="0.6" />
      <line x1={c - rIn + 22} y1={c} x2={c + rIn - 22} y2={c} stroke="#6349B8" strokeWidth="0.4" opacity="0.6" />
      {ticks}
      {SIGNS.map((s, i) => {
        const [x, y] = pt(rGlyph, i * 30 + 15);
        return <text key={s} x={x} y={y} textAnchor="middle" dominantBaseline="central"
          fontSize="9" fill={SIGN_COL[s]} opacity="0.85" fontFamily="'Segoe UI Symbol','Noto Sans Symbols 2',serif">{SIGN_SYM[i]}</text>;
      })}
      <circle cx={c} cy={c} r="2" fill="#E9C766" />
    </svg>
  );
}
