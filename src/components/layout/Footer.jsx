import { M3 } from '../../theme/m3.js';

const SOURCE_URL = 'https://github.com/smith912000/SGE';
const HUB = 'https://smith912000.github.io/wild-programme/';

export default function Footer() {
  const link = { color: M3.primary, textDecoration: 'underline', textUnderlineOffset: 3 };
  return (
    <footer style={{
      color: M3.outlineVariant, fontFamily: M3.fontBody, padding: '28px 0 8px',
      borderTop: `1px solid ${M3.glassBorder}`, marginTop: 40,
      fontSize: '0.8rem', display: 'flex', gap: '6px 20px', flexWrap: 'wrap', justifyContent: 'space-between',
    }}>
      <div>SGE v6.2 "Sky Atlas" is part of the <a href={HUB} style={link}>WILD membership</a>. Sixteen computation layers, deterministic, no machine learning.</div>
      <div>
        Free software under the{' '}
        <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noopener noreferrer" style={link}>GNU AGPL v3</a>
        {' · '}
        <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" style={link}>source code</a>
      </div>
    </footer>
  );
}
