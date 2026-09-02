// Terse view of a record: the core symbolism, nothing explained.
//
// Depth 0 shows only this. The prose sits behind the depth control for
// anyone who wants it.

const firstClause = (s) => {
  if (typeof s !== 'string' || !s) return '';
  // First sentence, then trim to the first clause if it is still long.
  let t = s.split(/(?<=\.)\s/)[0].replace(/\.$/, '');
  if (t.length > 90) t = t.split(/[—;:,]/)[0].trim();
  return t;
};

// Short noun phrases naming what the position is.
export function terseList(rec) {
  if (!rec) return [];
  if (Array.isArray(rec.energies) && rec.energies.length) return rec.energies;
  const c = firstClause(rec.plain);
  return c ? [c] : [];
}

// One short line.
export function terse(rec) {
  const list = terseList(rec);
  return list.length ? list.join(' · ') : '';
}
