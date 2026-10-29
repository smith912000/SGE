import { useState, useId } from 'react';
import { M3 } from '../../theme/m3.js';
import Tooltip from './Tooltip.jsx';

export default function Field({ label, value, onChange, step = 1, min, max, tip = null }) {
  const [foc, setFoc] = useState(false);
  const [tipState, setTipState] = useState({ visible: false, info: null, x: 0, y: 0 });
  const id = useId();

  const showFT = (e) => { if (!tip) return; setTipState({ visible: true, info: tip, x: e.clientX, y: e.clientY }); };
  const hideFT = () => setTipState(t => ({ ...t, visible: false }));
  const moveFT = (e) => { if (!tip) return; setTipState(t => ({ ...t, x: e.clientX, y: e.clientY })); };

  return (
    <div style={{ position: 'relative' }}>
      <label htmlFor={id} onMouseEnter={showFT} onMouseLeave={hideFT} onMouseMove={moveFT}
        style={{
          display: 'flex', alignItems: 'center', gap: 4, color: M3.outlineVariant,
          fontFamily: M3.fontBody, fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.02em',
          marginBottom: 5, cursor: tip ? 'help' : 'default', userSelect: 'none',
        }}>
        {label}
        {tip && <span style={{ color: M3.primary, fontSize: '0.75rem' }}>ⓘ</span>}
      </label>
      <input id={id} type="number" value={value} step={step} min={min} max={max}
        onChange={e => onChange(parseFloat(e.target.value))}
        onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
        style={{
          width: '100%', padding: '9px 10px', minHeight: 40, background: M3.surfaceDim,
          border: `1px solid ${foc ? M3.secondary : M3.glassBorder}`,
          borderRadius: M3.radius.sm, color: M3.onSurface,
          fontFamily: M3.fontMono, fontSize: '0.84rem',
          outline: 'none', boxSizing: 'border-box',
          transition: 'border-color 0.18s, box-shadow 0.18s',
          boxShadow: foc ? `0 0 0 3px ${M3.secondary}33` : 'none',
        }} />
      <Tooltip {...tipState} />
    </div>
  );
}
