import { M3 } from '../../theme/m3.js';

const VARIANTS = {
  default: {
    background: M3.glass,
    border: `1px solid ${M3.glassBorder}`,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
  },
  highlight: {
    background: `linear-gradient(135deg, ${M3.primaryContainer}55, ${M3.glass})`,
    border: `1px solid ${M3.primary}22`,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
  },
  sunken: {
    background: M3.surfaceDim,
    border: `1px solid ${M3.glassBorder}`,
  },
};

export default function Card({ children, title, style = {}, variant = 'default' }) {
  const v = VARIANTS[variant] || VARIANTS.default;
  return (
    <div style={{
      ...v,
      borderRadius: M3.radius.lg,
      padding: 20,
      ...style,
    }}>
      {title && (
        <div style={{
          fontFamily: M3.fontMono,
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: M3.secondary,
          marginBottom: 14,
          textTransform: 'uppercase',
        }}>{title}</div>
      )}
      {children}
    </div>
  );
}
