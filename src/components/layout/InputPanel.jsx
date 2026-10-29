import { useState, useEffect, useId } from 'react';
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

const pad = (n) => String(n).padStart(2, '0');
const dateValue = (b) => `${String(b.year).padStart(4, '0')}-${pad(b.month)}-${pad(b.day)}`;
const timeValue = (b) => `${pad(to24Hour(b.hour, b.meridiem))}:${pad(b.min)}`;
const fmtOffset = (h) => {
  const m = Math.round(Math.abs(h) * 60);
  return `UTC${h < 0 ? '−' : '+'}${Math.floor(m / 60)}${m % 60 ? ':' + pad(m % 60) : ''}`;
};
const fmtCoord = (v, pos, neg) => `${Math.abs(v).toFixed(2)}°${v >= 0 ? pos : neg}`;

// One person's birth moment: date, clock time and place. The UTC offset is
// worked out from the place's time zone for that date and time, so summer
// time and historical changes in the tz database are applied without the
// user having to know them. It can still be set by hand.
function BirthFields({ who, b, setB, withName }) {
  const uid = useId();
  const [query, setQuery] = useState(b.place || '');
  const [results, setResults] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!b.tzName || b.tzManual) return;
    let tz;
    try { tz = Number(deriveUtcOffsetHoursFromLocalBirth(b, b.tzName).toFixed(2)); } catch { return; }
    if (tz !== b.tz) setB((p) => ({ ...p, tz }));
  }, [b.year, b.month, b.day, b.hour, b.meridiem, b.min, b.tzName, b.tzManual]);

  const search = async () => {
    const q = query.trim();
    if (!q) { setResults([]); setError('Enter a town or city, and a country if the name is common.'); return; }
    setBusy(true); setError('');
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=en&format=json`;
      const data = await (await fetch(url)).json();
      const rows = data?.results || [];
      setResults(rows);
      if (!rows.length) setError('No matching place found.');
    } catch {
      setResults([]);
      setError('The place search could not be reached. Coordinates and offset can be entered by hand below.');
    } finally { setBusy(false); }
  };

  const choose = (row) => {
    const place = [row.name, row.admin1, row.country].filter(Boolean).join(', ');
    setB((p) => ({
      ...p, place, tzName: row.timezone || p.tzName, tzManual: false,
      lat: Number(row.latitude.toFixed(5)), lon: Number(row.longitude.toFixed(5)),
    }));
    setQuery(place); setResults([]); setError('');
  };

  const onDate = (v) => {
    const m = /^(\d{1,4})-(\d{2})-(\d{2})$/.exec(v);
    if (m) setB((p) => ({ ...p, year: +m[1], month: +m[2], day: +m[3] }));
  };
  const onTime = (v) => {
    const m = /^(\d{2}):(\d{2})/.exec(v);
    if (!m) return;
    const h = +m[1];
    setB((p) => ({ ...p, hour: ((h + 11) % 12) + 1, meridiem: h >= 12 ? 'PM' : 'AM', min: +m[2] }));
  };

  return (
    <fieldset className="sge-birth">
      <legend className="sge-eyebrow">{who}</legend>
      {withName && (
        <label className="sge-field">
          <span>Full name <i>for numerology, optional</i></span>
          <input type="text" value={b.name || ''} autoComplete="off"
            onChange={(e) => setB((p) => ({ ...p, name: e.target.value }))} />
        </label>
      )}
      <div className="sge-field-row">
        <label className="sge-field">
          <span>Date</span>
          <input type="date" value={dateValue(b)} min="1800-01-01" max="2100-12-31" onChange={(e) => onDate(e.target.value)} />
        </label>
        <label className="sge-field">
          <span>Local time</span>
          <input type="time" value={timeValue(b)} onChange={(e) => onTime(e.target.value)} />
        </label>
      </div>
      <div className="sge-field">
        <label htmlFor={`${uid}-place`}><span>Place</span></label>
        <div className="sge-place">
          <input id={`${uid}-place`} type="search" value={query} placeholder="Town or city" autoComplete="off"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); search(); } }} />
          <button type="button" className="sge-chip" onClick={search} disabled={busy}>{busy ? 'Searching…' : 'Find'}</button>
        </div>
        {results.length > 0 && (
          <ul className="sge-place-results" role="listbox" aria-label="Matching places">
            {results.map((r) => (
              <li key={`${r.id || r.name}-${r.latitude}`}>
                <button type="button" role="option" aria-selected="false" onClick={() => choose(r)}>
                  <b>{r.name}</b>{[r.admin1, r.country].filter(Boolean).length ? `, ${[r.admin1, r.country].filter(Boolean).join(', ')}` : ''}
                  <small>{fmtCoord(r.latitude, 'N', 'S')} {fmtCoord(r.longitude, 'E', 'W')}{r.timezone ? ` · ${r.timezone}` : ''}</small>
                </button>
              </li>
            ))}
          </ul>
        )}
        {error && <p className="sge-field-error" role="alert">{error}</p>}
      </div>
      <p className="sge-birth-summary">
        {b.place || 'No place chosen'} · {fmtCoord(b.lat, 'N', 'S')} {fmtCoord(b.lon, 'E', 'W')} · {fmtOffset(b.tz)}
        {b.tzName && !b.tzManual ? <> from {b.tzName}</> : b.tzManual ? <> set by hand</> : null}
      </p>
      <details className="sge-manual">
        <summary>Coordinates and offset by hand</summary>
        <div className="sge-field-row sge-field-row-3">
          <Field label="Latitude (N +)" value={b.lat} step={0.01} min={-90} max={90} onChange={(v) => setB((p) => ({ ...p, lat: v }))} />
          <Field label="Longitude (E +)" value={b.lon} step={0.01} min={-180} max={180} onChange={(v) => setB((p) => ({ ...p, lon: v }))} />
          <Field label="UTC offset, hours" value={b.tz} step={0.25} min={-12} max={14} onChange={(v) => setB((p) => ({ ...p, tz: v, tzManual: true }))} />
        </div>
        {b.tzManual && b.tzName && (
          <button type="button" className="sge-chip" onClick={() => setB((p) => ({ ...p, tzManual: false }))}>Use {b.tzName} again</button>
        )}
      </details>
    </fieldset>
  );
}

export default function InputPanel({ A, setA, B, setB, syn, setSyn, compute, loading }) {
  return (
    <Card title="Birth data">
      <form className="sge-form" onSubmit={(e) => { e.preventDefault(); compute(); }}>
        <BirthFields who="The native" b={A} setB={setA} withName />
        <label className="sge-check">
          <input type="checkbox" checked={syn} onChange={(e) => setSyn(e.target.checked)} />
          Compare with a second chart (synastry)
        </label>
        {syn && <BirthFields who="Second chart" b={B} setB={setB} />}
        <ComputeButton onClick={compute} loading={loading} />
      </form>
    </Card>
  );
}
