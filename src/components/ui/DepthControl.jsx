import { M3 } from '../../theme/m3.js';
import { DEPTHS } from '../../store/depthStore.js';

// Three-segment control selecting how much of a record is rendered.
export default function DepthControl({ depth, onChange, compact = false }) {
  return (
    <div
      role="group"
      aria-label="Reading depth"
      style={{
        display: 'inline-flex',
        borderRadius: M3.radius.sm,
        border: `1px solid ${M3.glassBorder}`,
        overflow: 'hidden',
        background: M3.surfaceDim,
      }}
    >
      {DEPTHS.map((d) => {
        const active = depth === d.id;
        return (
          <button
            key={d.id}
            type="button"
            onClick={() => onChange(d.id)}
            title={d.desc}
            aria-pressed={active}
            style={{
              fontFamily: M3.fontMono,
              fontSize: compact ? '0.55rem' : '0.6rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: compact ? '4px 8px' : '5px 11px',
              cursor: 'pointer',
              border: 'none',
              background: active ? M3.secondaryContainer : 'transparent',
              color: active ? M3.onPrimaryContainer : M3.onSurfaceVariant,
              transition: 'background 120ms ease, color 120ms ease',
            }}
          >
            {d.label}
          </button>
        );
      })}
    </div>
  );
}
