import { M3 } from '../../theme/m3.js';

export default function Footer() {
  return (
    <div style={{
      textAlign: 'center', color: M3.secondary,
      fontFamily: M3.fontMono, padding: '30px 0',
      borderTop: `1px solid ${M3.glassBorder}`,
      fontSize: '0.62rem', letterSpacing: '0.08em',
    }}>
      SGE v5.0 — 16 computation layers · deterministic · no ML · professional-grade astro-temporal engine
    </div>
  );
}
