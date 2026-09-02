import { M3 } from '../../theme/m3.js';
import { terseList } from '../../data/symbolism/terse.js';

// Renders one symbolic record at the requested depth.
//
// A record is { plain, reading, principle } plus optional
// energies, tensions, attributions, correspondences, contested, prompts.
//
// The prose names the position and what has been attributed to it. It does not
// address the reader, and it does not forecast. Structural additions
// (attributions, contested points, prompts) surface as depth increases.

const prose = {
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: '0.84rem',
  lineHeight: 1.72,
  color: M3.onSurface,
  margin: 0,
};

const microLabel = {
  fontFamily: M3.fontMono,
  fontSize: '0.55rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: M3.secondary,
  marginBottom: 5,
};

function Chips({ label, items, colour }) {
  if (!items || !items.length) return null;
  return (
    <div style={{ marginTop: 12 }}>
      <div style={microLabel}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {items.map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: M3.fontBody,
              fontSize: '0.68rem',
              padding: '3px 9px',
              borderRadius: 999,
              background: `${colour}18`,
              border: `1px solid ${colour}33`,
              color: M3.onSurface,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Attributions({ items }) {
  if (!items || !items.length) return null;
  return (
    <div style={{ marginTop: 14 }}>
      <div style={microLabel}>Attributed by</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {items.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'baseline' }}>
            <span
              style={{
                fontFamily: M3.fontMono,
                fontSize: '0.58rem',
                letterSpacing: '0.08em',
                color: M3.tertiary,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                minWidth: 92,
              }}
            >
              {a.lineage}
            </span>
            <span style={{ ...prose, fontSize: '0.76rem', lineHeight: 1.6 }}>{a.claim}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contested({ items }) {
  if (!items || !items.length) return null;
  return (
    <div
      style={{
        marginTop: 14,
        padding: '11px 13px',
        borderRadius: M3.radius.sm,
        background: M3.surfaceDim,
        border: `1px solid ${M3.glassBorder}`,
      }}
    >
      <div style={microLabel}>Sources disagree</div>
      <ul style={{ margin: 0, paddingLeft: 17 }}>
        {items.map((c, i) => (
          <li key={i} style={{ ...prose, fontSize: '0.76rem', lineHeight: 1.62, marginBottom: 4 }}>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Prompts({ items }) {
  if (!items || !items.length) return null;
  return (
    <div style={{ marginTop: 14 }}>
      <div style={microLabel}>Questions for the practitioner</div>
      <ul style={{ margin: 0, paddingLeft: 17 }}>
        {items.map((p, i) => (
          <li
            key={i}
            style={{
              ...prose,
              fontSize: '0.78rem',
              lineHeight: 1.62,
              marginBottom: 5,
              fontStyle: 'italic',
              color: M3.onSurfaceVariant,
            }}
          >
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SymbolPanel({ record, depth = 0, heading, glyph, style = {} }) {
  if (!record) return null;

  // Depth 0 is the core symbolism only: short noun phrases, nothing explained.
  const core = terseList(record);

  const body =
    depth >= 2
      ? record.principle || record.reading || record.plain
      : depth === 1
        ? record.reading || record.plain
        : null;

  return (
    <div style={{ ...style }}>
      {(heading || glyph) && (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, marginBottom: 6 }}>
          {glyph && (
            <span style={{ fontSize: '1.05rem', color: M3.primary, lineHeight: 1 }}>{glyph}</span>
          )}
          {heading && (
            <span
              style={{
                fontFamily: M3.fontDisplay,
                fontSize: '0.9rem',
                color: M3.primary,
                letterSpacing: '0.03em',
              }}
            >
              {heading}
            </span>
          )}
        </div>
      )}

      {core.length > 0 && (
        <div
          style={{
            fontFamily: M3.fontBody,
            fontSize: '0.82rem',
            lineHeight: 1.5,
            color: M3.onSurface,
          }}
        >
          {core.join('  ·  ')}
        </div>
      )}

      {depth === 0 && depth >= 1 && null}

      {body && <p style={{ ...prose, marginTop: 10 }}>{body}</p>}

      {depth >= 1 && <Chips label="Tensions" items={record.tensions} colour={M3.error} />}
      {depth >= 2 && <Chips label="Correspondences" items={record.correspondences} colour={M3.tertiary} />}
      {depth >= 2 && <Attributions items={record.attributions} />}
      {depth >= 2 && <Contested items={record.contested} />}
      {depth >= 2 && <Prompts items={record.prompts} />}
    </div>
  );
}
