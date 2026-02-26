import { useState } from 'react';
import { M3 } from '../../theme/m3.js';
import Tooltip from './Tooltip.jsx';

export default function Field({ label, value, onChange, step = 1, min, max, tip = null }) {
  const [foc, setFoc] = useState(false);
  const [tipState, setTipState] = useState({ visible: false, info: null, x: 0, y: 0 });

  const showFT = (e) => { if (!tip) return; setTipState({ visible: true, info: tip, x: e.clientX, y: e.clientY }); };
  const hideFT = () => setTipState(t => ({ ...t, visible: false }));
  const moveFT = (e) => { if (!tip) return; setTipState(t => ({ ...t, x: e.clientX, y: e.clientY })); };

  return (
    <div style={{ position: 'relative' }}>
      <label onMouseEnter={showFT} onMouseLeave={hideFT} onMouseMove={moveFT}
        style={{
          display: 'flex', alignItems: 'center', gap: 4, color: M3.secondary,
          fontFamily: M3.fontMono, fontSize: '0.63rem', letterSpacing: '0.12em',
          marginBottom: 3, cursor: tip ? 'help' : 'default', userSelect: 'none',
        }}>
        {label}
        {tip && <span style={{ color: M3.primary, fontSize: '0.65rem' }}>ⓘ</span>}
      </label>
      <input type="number" value={value} step={step} min={min} max={max}
        onChange={e => onChange(parseFloat(e.target.value))}
        onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
        style={{
          width: '100%', padding: '7px 9px', background: M3.surfaceDim,
          border: `1px solid ${foc ? M3.primary : M3.outline}`,
          borderRadius: M3.radius.sm, color: M3.onSurface,
          fontFamily: M3.fontMono, fontSize: '0.78rem',
          outline: 'none', boxSizing: 'border-box',
          transition: 'border-color 0.18s, box-shadow 0.18s',
          boxShadow: foc ? `0 0 0 2px ${M3.primary}33` : 'none',
        }} />
      <Tooltip {...tipState} />
    </div>
  );
}
