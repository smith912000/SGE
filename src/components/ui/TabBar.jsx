import { useRef, useEffect, useState } from 'react';
import { M3 } from '../../theme/m3.js';

const GROUPS = [
  { label: 'Chart', ids: ['today', 'natal', 'deep', 'wheel', 'aspects'] },
  { label: 'Time', ids: ['progressions', 'harmonics'] },
  { label: 'Systems', ids: ['synastry', 'chinese', 'vedic'] },
  { label: 'Symbolic', ids: ['tarot', 'numerology', 'grammatology', 'calendar', 'education'] },
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

  const fade = (dir) => ({
    position: 'absolute', [dir]: 0, top: 0, bottom: 0, width: 40, zIndex: 2,
    background: `linear-gradient(${dir === 'left' ? 90 : 270}deg, ${M3.surfaceDim}, transparent)`,
    pointerEvents: 'none', borderRadius: M3.radius.lg,
  });

  return (
    <nav aria-label="Chart views" style={{ position: 'relative' }}>
      {canScrollL && <div style={fade('left')} />}
      {canScrollR && <div style={fade('right')} />}

      <div ref={scrollRef} role="tablist" className="sge-tabs" style={{ borderBottom: `1px solid ${M3.glassBorder}` }}>
        {GROUPS.map((g) => {
          const ids = g.ids.filter(id => tabMap[id]);
          if (!ids.length) return null;
          return (
            <div key={g.label} style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
              <div style={{
                fontFamily: M3.fontBody, fontWeight: 600, fontSize: '0.6rem',
                letterSpacing: '0.18em', textTransform: 'uppercase', color: M3.outlineVariant,
                paddingLeft: 12,
              }}>{g.label}</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {ids.map(id => {
                  const t = tabMap[id];
                  const isActive = active === id;
                  return (
                    <button key={id} data-id={id} role="tab" aria-selected={isActive} type="button"
                      onClick={() => onChange(id)} style={{
                      padding: '8px 14px', minHeight: 38, cursor: 'pointer',
                      background: isActive ? 'rgba(99,73,184,.18)' : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(99,73,184,.55)' : 'transparent'}`,
                      borderRadius: 999,
                      color: isActive ? M3.primary : M3.onSurfaceVariant,
                      fontFamily: M3.fontBody, fontSize: '0.82rem',
                      fontWeight: isActive ? 600 : 500,
                      whiteSpace: 'nowrap',
                      transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                      flexShrink: 0,
                      WebkitTapHighlightColor: 'transparent',
                    }}>{t.label}</button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
