import { M3 } from '../../theme/m3.js';

const SOURCE_URL = 'https://github.com/smith912000/SGE';

export default function Footer() {
  return (
    <div style={{
      textAlign: 'center', color: M3.secondary,
      fontFamily: M3.fontMono, padding: '30px 0',
      borderTop: `1px solid ${M3.glassBorder}`,
      fontSize: '0.62rem', letterSpacing: '0.08em',
    }}>
      <div>
        SGE v5.0 — 16 computation layers · deterministic · no ML · professional-grade astro-temporal engine
      </div>
      <div style={{ marginTop: '10px' }}>
        Free software under the{' '}
        <a
          href="https://www.gnu.org/licenses/agpl-3.0.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: M3.secondary, textDecoration: 'underline' }}
        >
          GNU AGPL v3
        </a>
        {' · '}
        <a
          href={SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: M3.secondary, textDecoration: 'underline' }}
        >
          source code
        </a>
      </div>
    </div>
  );
}
