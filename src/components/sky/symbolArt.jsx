// Drawn artwork for the symbol map, so no symbol depends on a font or falls
// back to an emoji. Two sets:
//   SIGILS: the planet and sign glyphs as stroked paths on a 24 box, usable in
//           HTML (<Sigil>) and on the canvas (drawSigil).
//   <SymbolPlate>: an engraved medallion for each symbol, drawn from what the
//           traditions picture it as (the caduceus, the scythe, the ram's
//           horns...). Kinds without a picture get their own character set
//           large inside the same frame.

const r2 = (n) => Math.round(n * 100) / 100;
const circ = (cx, cy, r) => `M${r2(cx + r)} ${cy}a${r} ${r} 0 1 1 ${-2 * r} 0a${r} ${r} 0 1 1 ${2 * r} 0`;

// ── Sigils (24 x 24, stroke only) ───────────────────────────────────────
export const SIGILS = {
  'planet:Sun': circ(12, 12, 8) + circ(12, 12, 0.9),
  'planet:Moon': 'M15.5 3.8A8.5 8.5 0 1 0 15.5 20.2A6.8 6.8 0 1 1 15.5 3.8Z',
  'planet:Mercury': circ(12, 10.5, 4.2) + 'M8 2.8a4.2 4.2 0 0 0 8 0M12 14.7V21.5M9 18.3h6',
  'planet:Venus': circ(12, 8.5, 5) + 'M12 13.5V21.5M8.5 17.6h7',
  'planet:Mars': circ(10, 14, 5.5) + 'M13.9 10.1L20 4M14.3 4H20V9.7',
  'planet:Jupiter': 'M4.5 7C6.3 3.5 11.5 3.6 11.5 7.8c0 3-3.2 6-6.3 8.7H20M15.5 3.5V21',
  'planet:Saturn': 'M8 2.5v13M5 5.8h6M8 10.5c1.6-2.2 6.3-2.6 6.3 1.4 0 3-3.6 4-3.6 6.6 0 2 1.6 3 3.2 2.4',
  'planet:Uranus': circ(12, 16.5, 4) + circ(12, 16.5, 0.7) + 'M12 12.5V2.8M8.6 6.2L12 2.8l3.4 3.4',
  'planet:Neptune': 'M4.5 4.5c0 5 2.6 8 7.5 8s7.5-3 7.5-8M12 4v17.5M8.5 18h7M3.4 6L4.5 4.4 5.6 6M10.9 5.6L12 4l1.1 1.6M18.4 6l1.1-1.6L20.6 6',
  'planet:Pluto': 'M8 3v17.5M8 3h4.3a4 4 0 0 1 0 8H8M8 20.5h8',
  'planet:Chiron': circ(12, 17.2, 3.6) + 'M12 13.6V2.5M12 8.6l5-5M12 8.6l5 4.4',
  'planet:Lilith': 'M14.3 2.6A5.9 5.9 0 1 0 14.3 14.4A4.7 4.7 0 1 1 14.3 2.6ZM11 14.6V21.5M8 18.3h6',
  'planet:Rahu': 'M7 16.2V10a5 5 0 0 1 10 0v6.2' + circ(7, 18.2, 2) + circ(17, 18.2, 2),
  'planet:Ketu': 'M7 7.8V14a5 5 0 0 0 10 0V7.8' + circ(7, 5.8, 2) + circ(17, 5.8, 2),
  'sign:Aries': 'M12 21V10.5C12 5.5 9.5 3 6.8 3S2.8 5 2.8 7.5 4.3 11 6 11M12 10.5C12 5.5 14.5 3 17.2 3S21.2 5 21.2 7.5 19.7 11 18 11',
  'sign:Taurus': circ(12, 15, 5.5) + 'M3 3c1 4 4.5 6.5 9 6.5S20 7 21 3',
  'sign:Gemini': 'M4.5 4c4.3 1.6 10.7 1.6 15 0M4.5 20c4.3-1.6 10.7-1.6 15 0M9 5.3v13.4M15 5.3v13.4',
  'sign:Cancer': circ(6.3, 9.2, 2.7) + 'M6.3 6.5c4.2-2.7 10.6-2.6 14.4 1.4' + circ(17.7, 14.8, 2.7) + 'M17.7 17.5c-4.2 2.7-10.6 2.6-14.4-1.4',
  'sign:Leo': circ(6.8, 15.5, 3) + 'M9.8 15.5C9.8 11.5 8 9.3 8 6.5a4.5 4.5 0 0 1 9 0c0 4-4 7-4 11 0 2.4 3.4 3.5 6.5 1.9',
  'sign:Virgo': 'M2.8 5.5c1.5 0 2.5 1 2.5 2.5V18M5.3 8.5c0-2 1.4-3 2.9-3s2.9 1 2.9 3V18M11.1 8.5c0-2 1.4-3 2.9-3s2.9 1 2.9 3v6c0 3 1.6 5 4 6.5M16.9 14c1.6-1.6 4.4-1.4 4.4 1s-3 4.2-6.3 6',
  'sign:Libra': 'M3 20.5h18M3 16h5.3C6.8 15 6 13.6 6 11.6a6 6 0 0 1 12 0c0 2-.8 3.4-2.3 4.4H21',
  'sign:Scorpio': 'M2.8 5.5c1.5 0 2.5 1 2.5 2.5V18M5.3 8.5c0-2 1.4-3 2.9-3s2.9 1 2.9 3V18M11.1 8.5c0-2 1.4-3 2.9-3s2.9 1 2.9 3v8.2c0 1.6 1 2.6 2.6 2.6h2.3M19.3 16.8l2.5 2.5-2.5 2.5',
  'sign:Sagittarius': 'M3.5 20.5L20.5 3.5M12 3.5h8.5V12M6.5 11l6.5 6.5',
  'sign:Capricorn': 'M2.8 6c1.8 0 2.9 1.4 2.9 3.4V18M5.7 9.4C5.7 6 7.7 4 10.2 4s4.5 2 4.5 5v6.8c0 2.6 1.6 4.7 3.6 4.7a2.6 2.6 0 0 0 0-5.2c-2.3 0-3.8 2.4-5.2 5.4',
  'sign:Aquarius': 'M2.5 10.5l3.2-3 3.1 3 3.2-3 3.1 3 3.2-3 3.2 3M2.5 17l3.2-3 3.1 3 3.2-3 3.1 3 3.2-3 3.2 3',
  'sign:Pisces': 'M5 3c4.2 4.2 4.2 13.8 0 18M19 3c-4.2 4.2-4.2 13.8 0 18M3.8 12h16.4',
  'el:Fire': 'M12 3.5L21 19.5H3Z',
  'el:Water': 'M12 20.5L21 4.5H3Z',
  'el:Air': 'M12 3.5L21 19.5H3ZM5.6 13.5h12.8',
  'el:Earth': 'M12 20.5L21 4.5H3ZM5.6 10.5h12.8',
};

// HTML sigil, or the entity's own character where there is no drawn one.
const sigilFor = (ent) => SIGILS[ent.id] || (ent.kind === 'const' ? SIGILS[ent.links.find((l) => l.to.startsWith('sign:'))?.to] : null);

export function Sigil({ ent, size = '1em' }) {
  const d = sigilFor(ent);
  if (!d) return <span className="sm-glyph" style={{ color: ent.colour }}>{ent.glyph}</span>;
  return (
    <svg className="sm-sigil" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true"
      fill="none" stroke={ent.colour} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const PATHS = {};
// Draw a sigil on a canvas, centred on (x, y), px across. Returns false when
// the entity has no drawn sigil so the caller can fall back to text.
export function drawSigil(g, id, x, y, px, colour) {
  const d = SIGILS[id];
  if (!d || typeof Path2D === 'undefined') return false;
  const p = PATHS[id] || (PATHS[id] = new Path2D(d));
  const k = px / 24;
  g.save();
  g.translate(x - px / 2, y - px / 2); g.scale(k, k);
  g.strokeStyle = colour; g.lineWidth = 1.8; g.lineCap = 'round'; g.lineJoin = 'round';
  g.stroke(p);
  g.restore();
  return true;
}

// ── Plates (120 x 120) ──────────────────────────────────────────────────
const C = 60;
const polar = (r, deg, cx = C, cy = C) => [r2(cx + r * Math.cos((deg - 90) * Math.PI / 180)), r2(cy + r * Math.sin((deg - 90) * Math.PI / 180))];
const line = (a, b) => `M${a[0]} ${a[1]}L${b[0]} ${b[1]}`;
const star = (cx, cy, r) => `M${cx} ${cy - r}L${cx} ${cy + r}M${cx - r} ${cy}L${cx + r} ${cy}`;
const waves = (y, x0, x1, amp = 3, len = 10) => {
  let d = `M${x0} ${y}`;
  for (let x = x0; x < x1; x += len) d += `q${len / 4} ${-amp} ${len / 2} 0t${len / 2} 0`;
  return d;
};
const spiral = (cx, cy, r, turns, dir = 1, start = 0) => {
  let d = '';
  for (let i = 0; i <= 60; i++) {
    const t = i / 60, a = start + dir * t * turns * 360, rr = r * (1 - t * 0.85);
    const [x, y] = polar(rr, a, cx, cy);
    d += (i ? 'L' : 'M') + x + ' ' + y;
  }
  return d;
};
const wheat = (x, y0, y1) => {
  let d = `M${x} ${y1}L${x} ${y0}`;
  for (let y = y0 + 4; y < y0 + (y1 - y0) * 0.55; y += 5) d += `M${x} ${y}q-5 -2 -6 -7M${x} ${y}q5 -2 6 -7`;
  return d;
};
const flame = (x, y, h) => `M${x} ${y}c${-h * 0.35} ${-h * 0.25} ${-h * 0.3} ${-h * 0.6} 0 ${-h}c${h * 0.05} ${h * 0.35} ${h * 0.35} ${h * 0.45} ${h * 0.3} ${h * 0.75}c0 ${h * 0.15} ${-h * 0.12} ${h * 0.25} ${-h * 0.3} ${h * 0.25}`;
const fish = (cx, cy, dir) => {
  const s = dir;
  return `M${cx - 14 * s} ${cy}c${8 * s} -9 ${20 * s} -9 ${26 * s} 0c${-6 * s} 9 ${-18 * s} 9 ${-26 * s} 0ZM${cx - 14 * s} ${cy}l${-7 * s} -6v12Z` + circ(cx + 6 * s, cy - 1.5, 1);
};

// The emblems, drawn inside the medallion. Each is a list of path strings;
// a path that starts with '!' is filled as well as stroked.
const ART = {
  // Planets and points
  'planet:Sun': () => {
    const out = [circ(C, C, 17), circ(C, C, 3)];
    for (let i = 0; i < 16; i++) {
      const a = i * 22.5;
      out.push(i % 2 ? line(polar(21, a), polar(33, a)) : `M${polar(21, a - 3).join(' ')}Q${polar(29, a + 6).join(' ')} ${polar(36, a).join(' ')}`);
    }
    return out;
  },
  'planet:Moon': () => ['!M70 28A33 33 0 1 0 70 92A26 26 0 1 1 70 28Z', star(80, 44, 3), star(88, 62, 2), star(78, 78, 2.5), waves(98, 28, 92, 2.5, 12)],
  'planet:Mercury': () => {
    const out = ['M60 24V98', circ(60, 21, 3.5), 'M57 26c-8-6-20-5-27 0 8 1 14 3 20 7M63 26c8-6 20-5 27 0-8 1-14 3-20 7'];
    let a = 'M60 36', b = 'M60 36';
    for (let i = 1; i <= 24; i++) { const y = 36 + i * 2.4, x = 11 * Math.sin(i * Math.PI / 6); a += `L${r2(60 + x)} ${r2(y)}`; b += `L${r2(60 - x)} ${r2(y)}`; }
    out.push(a, b, circ(60, 35, 2.2));
    return out;
  },
  'planet:Venus': () => {
    const out = [circ(52, 50, 20), circ(52, 50, 16), 'M52 70V98M44 84h16'];
    for (let i = 0; i < 5; i++) out.push(`M80 38Q${polar(14, i * 72 - 25, 80, 38).join(' ')} ${polar(10, i * 72, 80, 38).join(' ')}Q${polar(14, i * 72 + 25, 80, 38).join(' ')} 80 38`);
    out.push(circ(80, 38, 2.5), 'M80 48q2 20-6 40M76 66q8-2 10-8');
    return out;
  },
  'planet:Mars': () => [circ(C, 64, 22), circ(C, 64, 17), circ(C, 64, 3), 'M28 96L90 26M86 24l8-4-4 8M30 90l-4 4M36 86l-6-6', 'M92 96L30 26M27 30l-2-10 10 2'],
  'planet:Jupiter': () => ['M66 22L50 54h14L46 98l30-48H60l14-28Z', 'M30 40c6-6 14-6 16 2-6 0-10 2-12 6M90 40c-6-6-14-6-16 2 6 0 10 2 12 6', star(32, 80, 3), star(88, 82, 3)],
  'planet:Saturn': () => ['M40 98L72 22', 'M72 22c14 4 22 18 20 34-8-14-16-20-26-20', 'M28 66h22M28 98h22M31 66c0 10 16 12 16 16s-16 6-16 16M47 66c0 10-16 12-16 16s16 6 16 16', 'M36 90h6'],
  'planet:Uranus': () => [star(30, 30, 3), star(86, 26, 2.5), star(46, 18, 2), star(92, 50, 2), star(24, 58, 2), 'M64 20L48 60h16L50 100', 'M72 40l-6 14h8l-8 18'],
  'planet:Neptune': () => ['M60 20V86M40 28v14c0 10 8 16 20 16s20-6 20-16V28M36 32l4-8 4 8M56 24l4-8 4 8M76 32l4-8 4 8', waves(88, 22, 98, 3, 12), waves(98, 26, 94, 2.5, 12)],
  'planet:Pluto': () => {
    const out = ['M60 34c-20 0-28 18-24 36 4 18 18 26 24 26s20-8 24-26c4-18-4-36-24-36Z', 'M54 34l2-8h8l2 8M60 26v-4', 'M60 48c-8 10-8 30 0 40M60 48c8 10 8 30 0 40'];
    [[52, 58], [48, 68], [52, 78], [68, 58], [72, 68], [68, 78], [60, 66]].forEach(([x, y]) => out.push(circ(x, y, 1.8)));
    return out;
  },
  'planet:Chiron': () => [circ(46, 80, 12), circ(46, 80, 6), 'M46 68V22M46 32h12M46 40h8', 'M78 98c0-20 4-44 8-64M86 50c-6-4-12-4-14 0 6 2 10 2 14 0M84 66c6-4 12-4 14 0-6 2-10 2-14 0M82 80c-6-4-12-4-14 0 6 2 10 2 14 0M86 36c4-4 8-4 10-2'],
  'planet:Lilith': () => ['!M64.4 24.2A23.8 23.8 0 1 0 64.4 70.2A18.7 18.7 0 1 1 64.4 24.2Z', 'M54 72V100M44 88h20', 'M24 34q14-4 22 4M80 84q10 4 16-4M84 30q8-6 14 0'],
  'planet:Rahu': () => [circ(78, 44, 13), '!' + circ(84, 44, 11), 'M20 96c4-30 22-46 42-46 10 0 12 6 8 10-6 2-12-2-18 2', circ(64, 54, 1.4), 'M70 60l6 2-5 3'],
  'planet:Ketu': () => ['M30 26c20 4 30 20 30 40s-10 30-26 32', 'M34 98l-6 2 3-6', 'M70 22V98M70 24c8-4 16 4 24 0v20c-8 4-16-4-24 0'],
  // Signs
  'sign:Aries': () => [spiral(38, 50, 18, 1.15, -1, 40), spiral(82, 50, 18, 1.15, 1, -40), 'M48 40c4 8 4 20 12 30 8-10 8-22 12-30M52 80c2 10 6 16 8 16s6-6 8-16'],
  'sign:Taurus': () => [circ(C, 70, 20), circ(52, 66, 1.8), circ(68, 66, 1.8), 'M54 82q6 4 12 0', 'M40 62c-12-4-18-18-14-34 6 10 12 16 20 18M80 62c12-4 18-18 14-34-6 10-12 16-20 18', star(84, 94, 2), star(92, 88, 1.5), star(90, 98, 1.5)],
  'sign:Gemini': () => [circ(44, 32, 7), circ(76, 32, 7), 'M44 39v34M76 39v34M44 73l-8 24M44 73l8 24M76 73l-8 24M76 73l8 24M44 48l-12 16M76 48l12 16M44 48l32 0', star(44, 18, 2.5), star(76, 18, 2.5)],
  'sign:Cancer': () => ['M36 66c0-14 10-22 24-22s24 8 24 22-10 18-24 18-24-4-24-18Z', 'M40 56c-10-4-14-14-10-22 4 6 8 8 12 6-2-4-2-8 0-10M80 56c10-4 14-14 10-22-4 6-8 8-12 6 2-4 2-8 0-10', 'M40 76l-12 8M42 82l-10 12M80 76l12 8M78 82l10 12', circ(54, 52, 1.6), circ(66, 52, 1.6)],
  'sign:Leo': () => {
    const out = [circ(C, 60, 16), circ(54, 56, 1.6), circ(66, 56, 1.6), 'M56 66q4 4 8 0M60 60v5'];
    for (let i = 0; i < 18; i++) { const a = i * 20; out.push(`M${polar(18, a).join(' ')}Q${polar(28, a + 10).join(' ')} ${polar(34, a + 4).join(' ')}`); }
    return out;
  },
  'sign:Virgo': () => [circ(C, 30, 8), 'M60 38c-10 4-14 20-16 40l-6 20h44l-6-20c-2-20-6-36-16-40', 'M52 50l-12 16', wheat(80, 24, 70), star(30, 40, 2.5)],
  'sign:Libra': () => ['M60 22V96M44 96h32M24 36h72', circ(60, 20, 3), 'M28 36l-8 24h24l-8-24M92 36l-8 24h24l-8-24', 'M20 60q12 8 24 0M76 60q12 8 24 0'],
  'sign:Scorpio': () => {
    const out = ['M30 70c0-6 6-10 14-10s14 4 14 10-6 10-14 10-14-4-14-10Z', 'M30 64l-10-8-2-8M30 76l-10 8-2 8M20 56l-6 2M20 84l-6-2'];
    let d = 'M58 70';
    for (let i = 1; i <= 6; i++) { const [x, y] = polar(22 - i, 90 - i * 30, 78, 52); d += `L${x} ${y}`; out.push(circ(x, y, 2.2)); }
    out.push(d, 'M72 30l-6-6M72 30l2-8');
    return out;
  },
  'sign:Sagittarius': () => ['M40 96C24 70 24 42 46 22M46 22L40 96', 'M22 72L96 26M96 26l-10 0M96 26l-4 9M28 70l-6-2M30 66l-6-4'],
  'sign:Capricorn': () => [spiral(44, 34, 14, 1, -1, 0), 'M52 40c4 4 6 10 4 16M40 46c-6 6-8 16-4 24 4 8 14 10 22 8', 'M58 78c12-4 24 0 30 10 6 10 2 18-6 16-8-2-6-12 2-12', 'M88 88l10-4M88 88l8 8', waves(102, 30, 74, 2, 10)],
  'sign:Aquarius': () => ['M30 30h28l-4 30H34Z', 'M58 36c8-2 12 4 6 10', 'M54 46c12 4 24 14 30 28', waves(80, 52, 98, 3, 12), waves(90, 46, 98, 3, 12), waves(100, 40, 98, 3, 12)],
  'sign:Pisces': () => [fish(40, 36, 1), fish(80, 84, -1), 'M19 36c-8 20 4 40 30 48 20 6 40 2 52 0'],
  'const:Ophiuchus': () => ['M60 18V100', circ(60, 16, 3), 'M40 92c30-6 40-18 20-28s-10-24 20-30c8-2 12 2 10 6-2 3-6 2-6-1', circ(86, 33, 1.2)],
  // Elements and modes
  'el:Fire': () => [flame(60, 96, 60), flame(42, 96, 34), flame(78, 96, 34), 'M30 98h60'],
  'el:Water': () => ['M60 22c-10 16-20 28-20 40a20 20 0 0 0 40 0c0-12-10-24-20-40Z', 'M52 66a8 8 0 0 0 8 8', waves(94, 22, 98, 3, 12), waves(104, 30, 90, 2.5, 12)],
  'el:Air': () => [spiral(44, 46, 16, 1.2, 1, 0), spiral(78, 72, 12, 1.2, -1, 180), 'M20 66h36M60 46h40M30 86h56'],
  'el:Earth': () => ['M14 96L44 46l14 20 14-30 34 60Z', 'M44 46l-6 14 6-2 4 8M72 36l-4 12 6-2', 'M14 96h92'],
  'mode:Cardinal': () => ['M30 90L60 26 90 90Z', 'M60 26v-8M54 22l6-6 6 6', circ(60, 70, 4)],
  'mode:Fixed': () => ['M32 32h56v56H32Z', 'M40 40h40v40H40Z', circ(60, 60, 4)],
  'mode:Mutable': () => ['M60 22L98 60 60 98 22 60Z', 'M60 36c10 8 10 40 0 48M60 36c-10 8-10 40 0 48'],
  // Chinese phases
  'phase:Wood': () => ['M60 98V40M60 70l-18-14M60 58l16-12M60 82l14-8', circ(60, 34, 12), circ(42, 52, 8), circ(78, 44, 8), 'M38 98h44'],
  'phase:Fire': () => [flame(60, 98, 70), flame(60, 98, 36)],
  'phase:Earth': () => ['M28 40h64v40H28Z', 'M28 60h64M60 40v40', 'M20 94h80'],
  'phase:Metal': () => ['M60 18l8 12v56H52V30Z', 'M40 86h40M56 92h8v10h-8Z', 'M60 30v52'],
  'phase:Water': () => [waves(40, 20, 100, 4, 16), waves(56, 20, 100, 4, 16), waves(72, 20, 100, 4, 16), waves(88, 20, 100, 4, 16)],
};

// Plates drawn from the entity's own data rather than by hand.
function generated(ent) {
  if (ent.kind === 'house') {
    const n = Number(ent.glyph), out = [circ(C, C, 34), circ(C, C, 14)];
    for (let i = 0; i < 12; i++) out.push(line(polar(14, 270 - i * 30), polar(34, 270 - i * 30)));
    const a0 = 270 - (n - 1) * 30, a1 = a0 - 30;
    out.push(`!M${polar(14, a0).join(' ')}L${polar(34, a0).join(' ')}A34 34 0 0 0 ${polar(34, a1).join(' ')}L${polar(14, a1).join(' ')}A14 14 0 0 1 ${polar(14, a0).join(' ')}Z`);
    out.push(line([C - 40, C], [C + 40, C]));
    return out;
  }
  if (ent.kind === 'asp') {
    const ang = Number((ent.attrs.find(([k]) => k === 'Angle') || [, '0'])[1].replace('°', ''));
    const a = polar(34, -ang / 2), b = polar(34, ang / 2);
    return [circ(C, C, 34), line([C, C], a), line([C, C], b), ang ? line(a, b) : '', '!' + circ(a[0], a[1], 4), '!' + circ(b[0], b[1], ang ? 4 : 2.5), circ(C, C, 1.5)];
  }
  if (ent.kind === 'angle') {
    const at = { ASC: 270, MC: 0, DSC: 90, IC: 180 }[ent.key];
    const p = polar(34, at);
    return [circ(C, C, 34), line([C - 40, C], [C + 40, C]), line([C, C - 40], [C, C + 40]), '!' + circ(p[0], p[1], 5), waves(C + 6, 22, 98, 1.5, 10)];
  }
  return null;
}

// Nakshatras carry their number in Devanagari numerals and their symbol.
const devanagari = (n) => String(n).replace(/\d/g, (d) => '०१२३४५६७८९'[d]);
const shortSymbol = (ent) => {
  const v = (ent.attrs.find(([k]) => k === 'Symbol') || [, ''])[1].split(/[,;(]/)[0].trim();
  return v.length > 22 ? v.slice(0, 21) + '…' : v;
};

export function SymbolPlate({ ent, size = 132 }) {
  // A constellation on the ecliptic is drawn as the figure its sign is named for.
  const own = ART[ent.id] || (ent.kind === 'const' ? ART[ent.links.find((l) => l.to.startsWith('sign:'))?.to] : null);
  const art = own?.() || generated(ent);
  const ticks = [];
  for (let i = 0; i < 72; i++) ticks.push(line(polar(55, i * 5), polar(i % 6 ? 53 : 51, i * 5)));
  return (
    <svg className="sm-plate" viewBox="0 0 120 120" width={size} height={size} role="img" aria-label={`Emblem of ${ent.name}`}
      fill="none" stroke={ent.colour} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={C} cy={C} r="58" strokeWidth="1" opacity="0.7" />
      <circle cx={C} cy={C} r="55" strokeWidth="0.6" opacity="0.55" />
      <path d={ticks.join('')} strokeWidth="0.5" opacity="0.5" />
      <circle cx={C} cy={C} r="49" strokeWidth="0.6" opacity="0.4" />
      {art ? art.filter(Boolean).map((d, i) => d[0] === '!'
        ? <path key={i} d={d.slice(1)} fill={ent.colour} fillOpacity="0.22" strokeWidth="1.4" />
        : <path key={i} d={d} strokeWidth="1.4" />)
        : ent.kind === 'nak'
          ? <>
              <text x={C} y={C - 6} textAnchor="middle" dominantBaseline="central" fill={ent.colour} stroke="none"
                style={{ font: '40px var(--font-display, Georgia, serif)' }}>{devanagari(ent.glyph)}</text>
              <text x={C} y={C + 24} textAnchor="middle" fill={ent.colour} stroke="none" opacity="0.8"
                style={{ font: '9px var(--font-body, system-ui, sans-serif)', letterSpacing: '.06em' }}>{shortSymbol(ent)}</text>
            </>
          : <text x={C} y={C} textAnchor="middle" dominantBaseline="central" fill={ent.colour} stroke="none"
              style={{ font: `${ent.glyph.length > 1 ? 30 : 44}px var(--font-display, Georgia, serif)` }}>{ent.glyph}</text>}
    </svg>
  );
}
