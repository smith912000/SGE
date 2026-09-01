// Depth control — how much of a symbolic record is shown.
//
//   0  plain      what stands there, in ordinary words
//   1  reading     what the tradition has attributed to it
//   2  principle   the underlying structure, lineages, and where sources disagree
//
// The depth is a reader preference, stored per browser. It is deliberately
// global: a practitioner who wants principle-level prose wants it everywhere,
// not tab by tab.

import { useCallback, useEffect, useState } from 'react';

const KEY = 'sge_depth';

export const DEPTHS = [
  { id: 0, label: 'Plain',     desc: 'What stands there' },
  { id: 1, label: 'Reading',   desc: 'What the tradition attributes to it' },
  { id: 2, label: 'Principle', desc: 'Structure, lineage, and dispute' },
];

export function getDepth() {
  try {
    const v = parseInt(localStorage.getItem(KEY), 10);
    return Number.isInteger(v) && v >= 0 && v <= 2 ? v : 0;
  } catch {
    return 0;
  }
}

export function setDepth(d) {
  try {
    localStorage.setItem(KEY, String(d));
  } catch {}
  try {
    window.dispatchEvent(new CustomEvent('sge:depth', { detail: d }));
  } catch {}
}

// Shared depth, kept in sync across every mounted panel.
export function useDepth() {
  const [depth, setLocal] = useState(getDepth);

  useEffect(() => {
    const onDepth = (e) => {
      const d = typeof e?.detail === 'number' ? e.detail : getDepth();
      setLocal(d);
    };
    window.addEventListener('sge:depth', onDepth);
    return () => window.removeEventListener('sge:depth', onDepth);
  }, []);

  const update = useCallback((d) => {
    const clamped = Math.max(0, Math.min(2, Number(d) || 0));
    setDepth(clamped);
    setLocal(clamped);
  }, []);

  return [depth, update];
}
