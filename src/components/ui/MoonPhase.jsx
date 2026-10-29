// The Moon as it stood: the lit part drawn from the Sun-Moon separation.
// 0° new, 90° first quarter, 180° full, 270° last quarter. Waxing is lit on
// the right, as seen from the northern hemisphere.
export default function MoonPhase({ angle = 0, size = 40, title }) {
  const r = 18, c = 20;
  const a = ((angle % 360) + 360) % 360;
  const waxing = a < 180;
  const k = Math.cos(a * Math.PI / 180);        // 1 at new, -1 at full
  const rx = Math.abs(k) * r;
  // Outer limb on the lit side, terminator as a half-ellipse.
  const sweepLimb = waxing ? 1 : 0;
  const sweepTerm = (waxing ? k > 0 : k < 0) ? 0 : 1;
  const d = `M${c},${c - r} A${r},${r} 0 0,${sweepLimb} ${c},${c + r} A${rx},${r} 0 0,${sweepTerm} ${c},${c - r} Z`;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" role="img" aria-label={title}>
      <circle cx={c} cy={c} r={r} fill="#19112B" stroke="rgba(216,222,230,.35)" strokeWidth="0.8" />
      <path d={d} fill="#D8DEE6" />
    </svg>
  );
}
