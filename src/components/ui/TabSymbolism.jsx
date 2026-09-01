import Card from './Card.jsx';
import SymbolPanel from './SymbolPanel.jsx';
import DepthControl from './DepthControl.jsx';
import { M3 } from '../../theme/m3.js';
import { useDepth } from '../../store/depthStore.js';

// A whole symbolism card with its own depth control.
//
// records: [{ heading, glyph, record }]  — entries with a null record are skipped,
// which is what the combination getters return for Node, Lilith and Chiron.

export default function TabSymbolism({ title, blurb, records = [], columns = 1 }) {
  const [depth, setDepth] = useDepth();
  const present = records.filter((r) => r && r.record);

  if (!present.length) return null;

  return (
    <Card>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: blurb ? 8 : 14,
        }}
      >
        <div
          style={{
            fontFamily: M3.fontMono,
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: M3.secondary,
            textTransform: 'uppercase',
          }}
        >
          {title}
        </div>
        <DepthControl depth={depth} onChange={setDepth} compact />
      </div>

      {blurb && (
        <p
          style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: '0.78rem',
            lineHeight: 1.66,
            color: M3.onSurfaceVariant,
            margin: '0 0 16px',
          }}
        >
          {blurb}
        </p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: columns > 1 ? `repeat(auto-fit, minmax(260px, 1fr))` : '1fr',
          gap: 20,
        }}
      >
        {present.map((r, i) => (
          <SymbolPanel
            key={i}
            record={r.record}
            depth={depth}
            heading={r.heading}
            glyph={r.glyph}
          />
        ))}
      </div>
    </Card>
  );
}
