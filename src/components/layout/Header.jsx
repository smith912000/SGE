import { M3 } from '../../theme/m3.js';
import Mark from '../ui/Mark.jsx';

const HUB = 'https://smith912000.github.io/wild-programme/';

export default function Header() {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16, flexWrap: 'wrap', padding: '18px 0 16px',
      borderBottom: `1px solid ${M3.glassBorder}`,
    }}>
      <a href={HUB} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}>
        <Mark size={30} />
        <div>
          <div style={{
            fontFamily: M3.fontDisplay, fontWeight: 600, fontSize: '1.7rem',
            letterSpacing: '0.14em', lineHeight: 1, color: M3.onSurface,
          }}>SGE</div>
          <div style={{
            fontFamily: M3.fontBody, fontWeight: 600, fontSize: '0.75rem',
            letterSpacing: '0.18em', textTransform: 'uppercase', color: M3.tertiary, marginTop: 4,
          }}>Astrological synthesis</div>
        </div>
      </a>
    </header>
  );
}
