import { platesFor } from '../../data/sky/plates.js';

// The planet and sign glyphs as stroked paths on a 24 box, so no symbol depends
// on a font or falls back to an emoji: <Sigil> in HTML, drawSigil on the canvas.
// The pictures shown with a symbol are historical plates (<Plate>, below).

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

// The historical pictures for the symbol, each with its source: the main one
// alone when compact, otherwise every tradition's side by side.
export function Plate({ ent, compact = false }) {
  const all = platesFor(ent);
  if (!all.length) return null;
  const shown = compact ? all.slice(0, 1) : all;
  return (
    <div className={`sm-plates${shown.length > 1 ? ' sm-plates-many' : ''}`}>
      {shown.map(([file, w, h, caption]) => (
        <figure key={file} className={`sm-plate${compact ? ' sm-plate-compact' : ''}`}>
          <img src={`${import.meta.env.BASE_URL}sky-art/plates/${file}`} width={w} height={h} alt={caption} loading="lazy" decoding="async" />
          {!compact && <figcaption>{caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
