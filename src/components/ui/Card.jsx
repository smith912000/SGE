import { M3 } from '../../theme/m3.js';
import { plainTitle } from './Tooltip.jsx';

const VARIANTS = {
  default: {
    background: M3.surfaceContainer,
    border: `1px solid ${M3.glassBorder}`,
  },
  highlight: {
    background: `linear-gradient(135deg, ${M3.primaryContainer}66, ${M3.surfaceContainer})`,
    border: `1px solid ${M3.outline}66`,
  },
  sunken: {
    background: M3.surface,
    border: `1px solid ${M3.glassBorder}`,
  },
};

export default function Card({ children, title, style = {}, variant = 'default' }) {
  const v = VARIANTS[variant] || VARIANTS.default;
  return (
    <section style={{
      ...v,
      borderRadius: M3.radius.lg,
      padding: 20,
      ...style,
    }}>
      {title && (
        <h3 style={{
          fontFamily: M3.fontBody,
          fontWeight: 600,
          fontSize: '0.75rem',
          letterSpacing: '0.16em',
          color: M3.tertiary,
          marginBottom: 14,
          textTransform: 'uppercase',
        }}>{typeof title === 'string' ? plainTitle(title) : title}</h3>
      )}
      {children}
    </section>
  );
}
