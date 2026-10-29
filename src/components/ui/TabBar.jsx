import { useRef, useEffect } from 'react';

// The views, grouped the way a practitioner works through a chart: the
// synthesis across traditions first, then the figure itself, its motion
// through time, the other traditions read from the same moment, then
// comparison and method. Labels use the technical names.
export const TAB_GROUPS = [
  { label: 'Chart', tabs: [
    { id: 'synthesis', label: 'Synthesis' },
    { id: 'natal', label: 'Overview' },
    { id: 'deep', label: 'Placements' },
    { id: 'wheel', label: 'Wheels' },
    { id: 'aspects', label: 'Aspects' },
    { id: 'harmonics', label: 'Harmonics' },
  ] },
  { label: 'Time', tabs: [
    { id: 'today', label: 'Transits' },
    { id: 'progressions', label: 'Progressions' },
  ] },
  { label: 'Traditions', tabs: [
    { id: 'vedic', label: 'Vedic' },
    { id: 'chinese', label: 'Chinese' },
    { id: 'numerology', label: 'Numerology' },
  ] },
  { label: 'Comparison', tabs: [
    { id: 'synastry', label: 'Synastry' },
  ] },
  { label: 'Reference', tabs: [
    { id: 'symbols', label: 'Symbol map' },
    { id: 'education', label: 'How SGE computes' },
  ] },
];

export const TAB_IDS = TAB_GROUPS.flatMap(g => g.tabs.map(t => t.id));

export const tabDomId = id => `sge-tab-${id}`;
export const PANEL_ID = 'sge-panel';

// WAI-ARIA tabs: one tab in the tab order, arrows move between them, Home/End
// jump to the ends. Activation follows focus, as each view is cheap to open.
export default function TabBar({ active, onChange }) {
  const listRef = useRef(null);

  useEffect(() => {
    const btn = listRef.current?.querySelector(`[data-id="${active}"]`);
    if (btn) btn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [active]);

  const onKeyDown = (e) => {
    const i = TAB_IDS.indexOf(active);
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = TAB_IDS[(i + 1) % TAB_IDS.length];
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = TAB_IDS[(i - 1 + TAB_IDS.length) % TAB_IDS.length];
    else if (e.key === 'Home') next = TAB_IDS[0];
    else if (e.key === 'End') next = TAB_IDS[TAB_IDS.length - 1];
    if (!next) return;
    e.preventDefault();
    onChange(next);
    listRef.current?.querySelector(`[data-id="${next}"]`)?.focus();
  };

  return (
    <nav aria-label="Chart views" className="sge-tabnav">
      <div ref={listRef} role="tablist" aria-orientation="horizontal" className="sge-tabs" onKeyDown={onKeyDown}>
        {TAB_GROUPS.map((g) => (
          <div key={g.label} role="presentation" className="sge-tabgroup">
            <span className="sge-tabgroup-label" aria-hidden="true">{g.label}</span>
            <div role="presentation" className="sge-tabgroup-row">
              {g.tabs.map((t) => {
                const on = active === t.id;
                return (
                  <button key={t.id} id={tabDomId(t.id)} data-id={t.id} type="button"
                    role="tab" aria-selected={on} aria-controls={PANEL_ID} tabIndex={on ? 0 : -1}
                    className="sge-tab" onClick={() => onChange(t.id)}>
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
