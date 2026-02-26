import { M3 } from '../../theme/m3.js';
import Card from '../ui/Card.jsx';
import Field from '../ui/Field.jsx';
import ComputeButton from '../ui/ComputeButton.jsx';

export default function InputPanel({ A, setA, B, setB, syn, setSyn, compute, loading }) {
  return (
    <Card title="⬡  Enter Your Birth Details">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(108px,1fr))', gap: 12 }}>
        {[
          ["Year", "year", 1, 1800, 2100], ["Month", "month", 1, 1, 12], ["Day", "day", 1, 1, 31],
          ["Hour", "hour", 1, 0, 23], ["Min", "min", 1, 0, 59],
          ["Lat °", "lat", 0.01], ["Lon °", "lon", 0.01],
        ].map(([lbl, fld, stp, mn, mx]) => (
          <Field key={fld} label={lbl} value={A[fld]} step={stp} min={mn} max={mx}
            onChange={v => setA(p => ({ ...p, [fld]: v }))} />
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <label style={{ fontFamily: M3.fontMono, fontSize: '0.62rem', color: M3.secondary, letterSpacing: '0.1em' }}>
          FULL NAME (for numerology)
        </label>
        <input type="text" value={A.name} onChange={e => setA(p => ({ ...p, name: e.target.value }))}
          placeholder="e.g. John Michael Smith"
          style={{
            width: '100%', padding: '8px 12px', marginTop: 4, background: M3.surfaceDim,
            border: `1px solid ${M3.outline}`, borderRadius: M3.radius.sm,
            color: M3.onSurface, fontFamily: M3.fontMono, fontSize: '0.78rem',
            outline: 'none', boxSizing: 'border-box',
          }} />
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <label style={{
          display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
          color: M3.onSurfaceVariant, fontFamily: M3.fontMono, fontSize: '0.72rem', paddingBottom: 2,
        }}>
          <input type="checkbox" checked={syn} onChange={e => setSyn(e.target.checked)}
            style={{ accentColor: M3.primary, width: 14, height: 14 }} />
          Compare with another person
        </label>
      </div>

      {syn && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${M3.glassBorder}` }}>
          <div style={{
            color: M3.secondary, fontFamily: M3.fontMono,
            fontSize: '0.65rem', letterSpacing: '0.18em', marginBottom: 10,
          }}>PERSON B</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(108px,1fr))', gap: 10 }}>
            {["year", "month", "day", "hour", "min", "lat", "lon"].map(f => (
              <Field key={f} label={f} value={B[f]}
                step={f === "lat" || f === "lon" ? 0.01 : 1}
                onChange={v => setB(p => ({ ...p, [f]: v }))} />
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <ComputeButton onClick={compute} loading={loading} />
      </div>
    </Card>
  );
}
