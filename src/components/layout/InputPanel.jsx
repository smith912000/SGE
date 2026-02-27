import { useState } from 'react';
import { M3 } from '../../theme/m3.js';
import Card from '../ui/Card.jsx';
import Field from '../ui/Field.jsx';
import ComputeButton from '../ui/ComputeButton.jsx';

function parseGmtOffsetMinutes(label) {
  if (!label || label === 'GMT' || label === 'UTC') return 0;
  const m = String(label).match(/(?:GMT|UTC)([+-])(\d{1,2})(?::?(\d{2}))?/i);
  if (!m) return 0;
  const sign = m[1] === '-' ? -1 : 1;
  const hh = Number(m[2] || 0);
  const mm = Number(m[3] || 0);
  return sign * (hh * 60 + mm);
}

function getOffsetMinutesAtUtcMs(utcMs, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'shortOffset',
  }).formatToParts(new Date(utcMs));
  const tzPart = parts.find((p) => p.type === 'timeZoneName')?.value || 'GMT';
  return parseGmtOffsetMinutes(tzPart);
}

function to24Hour(hour12, meridiem) {
  const h = Number(hour12);
  if (!Number.isFinite(h)) return 0;
  const clamped = Math.min(12, Math.max(1, Math.trunc(h)));
  if (meridiem === 'PM') return clamped === 12 ? 12 : clamped + 12;
  return clamped === 12 ? 0 : clamped;
}

function deriveUtcOffsetHoursFromLocalBirth(birth, timeZone) {
  const h24 = to24Hour(birth.hour, birth.meridiem);
  const minute = Number(birth.min) || 0;
  let offsetMin = 0;
  let utcMs = Date.UTC(birth.year, birth.month - 1, birth.day, h24, minute, 0, 0);
  for (let i = 0; i < 4; i++) {
    offsetMin = getOffsetMinutesAtUtcMs(utcMs, timeZone);
    utcMs = Date.UTC(birth.year, birth.month - 1, birth.day, h24, minute, 0, 0) - offsetMin * 60000;
  }
  return offsetMin / 60;
}

export default function InputPanel({ A, setA, B, setB, syn, setSyn, compute, loading }) {
  const [locQuery, setLocQuery] = useState(A.place || '');
  const [locResults, setLocResults] = useState([]);
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState('');

  const searchLocation = async () => {
    const q = locQuery.trim();
    if (!q) {
      setLocResults([]);
      setLocError('Enter a city/town and country to search.');
      return;
    }
    setLocLoading(true);
    setLocError('');
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=en&format=json`;
      const res = await fetch(url);
      const data = await res.json();
      const rows = data?.results || [];
      setLocResults(rows);
      if (!rows.length) setLocError('No matching locations found.');
    } catch (_err) {
      setLocError('Location lookup failed. Check your connection and try again.');
      setLocResults([]);
    } finally {
      setLocLoading(false);
    }
  };

  const applyLocation = (row) => {
    const place = [row.name, row.admin1, row.country].filter(Boolean).join(', ');
    const derivedTz = row.timezone ? deriveUtcOffsetHoursFromLocalBirth(A, row.timezone) : A.tz;
    setA((p) => ({
      ...p,
      place,
      tzName: row.timezone || p.tzName || '',
      lat: Number(row.latitude.toFixed(5)),
      lon: Number(row.longitude.toFixed(5)),
      tz: Number(derivedTz.toFixed(2)),
    }));
    setLocQuery(place);
    setLocResults([]);
    setLocError('');
  };

  const refreshBirthTz = () => {
    if (!A.tzName) return;
    const derivedTz = deriveUtcOffsetHoursFromLocalBirth(A, A.tzName);
    setA((p) => ({ ...p, tz: Number(derivedTz.toFixed(2)) }));
  };

  return (
    <Card title="⬡  Enter Your Birth Details">
      <div style={{ marginBottom: 12, padding: '10px 12px', borderRadius: 10, background: M3.surfaceContainer, border: `1px solid ${M3.outlineVariant}` }}>
        <label style={{ fontFamily: M3.fontMono, fontSize: '0.62rem', color: M3.secondary, letterSpacing: '0.1em' }}>
          BIRTH LOCATION PICKER
        </label>
        <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
          <input
            type="text"
            value={locQuery}
            onChange={(e) => setLocQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') searchLocation(); }}
            placeholder="e.g. London, UK"
            style={{
              flex: 1, padding: '8px 12px', background: M3.surfaceDim,
              border: `1px solid ${M3.outline}`, borderRadius: M3.radius.sm,
              color: M3.onSurface, fontFamily: M3.fontMono, fontSize: '0.76rem',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
          <button
            onClick={searchLocation}
            disabled={locLoading}
            style={{
              padding: '8px 12px', borderRadius: 10, border: `1px solid ${M3.primary}55`,
              background: M3.primaryContainer, color: M3.onPrimaryContainer,
              fontFamily: M3.fontMono, fontSize: '0.66rem', cursor: 'pointer',
            }}
          >
            {locLoading ? 'Searching…' : 'Find'}
          </button>
        </div>
        {locResults.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {locResults.map((r) => {
              const label = [r.name, r.admin1, r.country].filter(Boolean).join(', ');
              return (
                <button
                  key={`${r.latitude}-${r.longitude}-${label}`}
                  onClick={() => applyLocation(r)}
                  style={{
                    textAlign: 'left', padding: '7px 10px', borderRadius: 8,
                    border: `1px solid ${M3.outlineVariant}`, background: M3.surfaceDim,
                    color: M3.onSurface, fontFamily: M3.fontMono, fontSize: '0.66rem', cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
        {locError && <div style={{ marginTop: 8, color: '#ff9b9b', fontFamily: M3.fontMono, fontSize: '0.6rem' }}>{locError}</div>}
        <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: M3.fontMono, fontSize: '0.6rem', color: M3.onSurfaceVariant }}>
            {A.place ? `Selected: ${A.place}` : 'No location selected yet.'}
          </span>
          {!!A.tzName && (
            <button
              onClick={refreshBirthTz}
              style={{
                padding: '4px 10px', borderRadius: 10, border: `1px solid ${M3.tertiary}55`,
                background: M3.tertiaryContainer || M3.surfaceContainer, color: M3.tertiary,
                fontFamily: M3.fontMono, fontSize: '0.6rem', cursor: 'pointer',
              }}
            >
              Recompute TZ from {A.tzName}
            </button>
          )}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(108px,1fr))', gap: 12 }}>
        {[
          ["Year", "year", 1, 1800, 2100], ["Month", "month", 1, 1, 12], ["Day", "day", 1, 1, 31],
          ["Hour (1-12)", "hour", 1, 1, 12], ["Min", "min", 1, 0, 59],
          ["Lat ° (N+/S-)", "lat", 0.01, -90, 90], ["Lon ° (E+/W-)", "lon", 0.01, -180, 180],
          ["TZ UTC±", "tz", 0.5, -12, 14],
        ].map(([lbl, fld, stp, mn, mx]) => (
          <Field key={fld} label={lbl} value={A[fld]} step={stp} min={mn} max={mx}
            onChange={v => setA(p => ({ ...p, [fld]: v }))} />
        ))}
      </div>
      <div style={{ marginTop: 6, fontFamily: M3.fontMono, fontSize: '0.6rem', color: M3.onSurfaceVariant }}>
        Use the timezone offset at birth (including DST if active). Example: UK summer time is usually `+1`.
      </div>
      <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {["AM", "PM"].map(m => (
          <button
            key={m}
            onClick={() => setA(p => ({ ...p, meridiem: m }))}
            style={{
              padding: '6px 12px',
              borderRadius: 14,
              border: `1px solid ${A.meridiem === m ? M3.primary : M3.outlineVariant}`,
              background: A.meridiem === m ? M3.primaryContainer : M3.surfaceContainer,
              color: A.meridiem === m ? M3.onPrimaryContainer : M3.onSurfaceVariant,
              fontFamily: M3.fontMono,
              fontSize: '0.66rem',
              cursor: 'pointer',
            }}
          >
            {m}
          </button>
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
            {["year", "month", "day", "hour", "min", "lat", "lon", "tz"].map(f => (
              <Field key={f} label={f} value={B[f]}
                step={f === "lat" || f === "lon" ? 0.01 : f === "tz" ? 0.5 : 1}
                min={f === "hour" ? 1 : f === "min" ? 0 : f === "lat" ? -90 : f === "lon" ? -180 : f === "tz" ? -12 : undefined}
                max={f === "hour" ? 12 : f === "min" ? 59 : f === "lat" ? 90 : f === "lon" ? 180 : f === "tz" ? 14 : undefined}
                onChange={v => setB(p => ({ ...p, [f]: v }))} />
            ))}
          </div>
          <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {["AM", "PM"].map(m => (
              <button
                key={`B-${m}`}
                onClick={() => setB(p => ({ ...p, meridiem: m }))}
                style={{
                  padding: '6px 12px',
                  borderRadius: 14,
                  border: `1px solid ${B.meridiem === m ? M3.primary : M3.outlineVariant}`,
                  background: B.meridiem === m ? M3.primaryContainer : M3.surfaceContainer,
                  color: B.meridiem === m ? M3.onPrimaryContainer : M3.onSurfaceVariant,
                  fontFamily: M3.fontMono,
                  fontSize: '0.66rem',
                  cursor: 'pointer',
                }}
              >
                {m}
              </button>
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
