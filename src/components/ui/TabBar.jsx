import { useRef, useEffect, useState } from 'react';
import { M3 } from '../../theme/m3.js';

const GROUPS = [
  { label: 'Chart',    ids: ['natal','deep','struggles','wheel','aspects'] },
  { label: 'Time',     ids: ['progressions','solar','harmonics','transits'] },
  { label: 'People',   ids: ['synastry','chinese','phi'] },
  { label: 'Symbolic', ids: ['numerology','grammatology','calendar','education'] },
];

export default function TabBar({ tabs, active, onChange }) {
  const scrollRef = useRef(null);
  const [canScrollL, setCanScrollL] = useState(false);
  const [canScrollR, setCanScrollR] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollL(el.scrollLeft > 4);
    setCanScrollR(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const btn = el.querySelector(`[data-id="${active}"]`);
    if (btn) btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [active]);

  const tabMap = {};
  tabs.forEach(t => { tabMap[t.id] = t; });

  return (
    <div style={{ position: 'relative' }}>
      {canScrollL && <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 32, zIndex: 2,
        background: `linear-gradient(90deg, ${M3.surfaceDim}, transparent)`,
        pointerEvents: 'none',
      }} />}
      {canScrollR && <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 32, zIndex: 2,
        background: `linear-gradient(270deg, ${M3.surfaceDim}, transparent)`,
        pointerEvents: 'none',
      }} />}

      <div ref={scrollRef} style={{
        display: 'flex', gap: 2, overflowX: 'auto', overflowY: 'hidden',
        background: M3.glass, borderRadius: M3.radius.lg, padding: '6px 8px',
        border: `1px solid ${M3.glassBorder}`,
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        scrollbarWidth: 'none', msOverflowStyle: 'none',
      }}>
        {GROUPS.map((g, gi) => (
          <div key={g.label} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {gi > 0 && <div style={{
              width: 1, height: 20, background: M3.outline + '33',
              margin: '0 4px', flexShrink: 0,
            }} />}
            {g.ids.map(id => {
              const t = tabMap[id];
              if (!t) return null;
              const isActive = active === id;
              return (
                <button key={id} data-id={id} onClick={() => onChange(id)} style={{
                  padding: '7px 12px', border: 'none', cursor: 'pointer',
                  background: isActive ? M3.primaryContainer : 'transparent',
                  borderRadius: M3.radius.sm,
                  color: isActive ? M3.onPrimaryContainer : M3.onSurfaceVariant,
                  fontFamily: M3.fontMono, fontSize: '0.68rem',
                  fontWeight: isActive ? '700' : '400',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s, color 0.2s',
                  flexShrink: 0,
                }}>{t.label}</button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
