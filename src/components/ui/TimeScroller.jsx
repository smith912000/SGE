import { useEffect, useRef, useState } from 'react';
import { useSky, scrollSkyTo, jumpSkyTo, resetSky, setSkyOption, trailStepDays, RANGE } from '../../store/skyTimeStore.js';
import { STEP_UNITS, unitDays, agesBetween, ageAt, ageYearsLabel, formatJd, isoJd, parseDate, deepTimeNote, yearsFromNow, nowJd, PRECESSION_YEARS } from '../../engines/skyTime.js';
import { SIGN_SYM, SIGN_COL } from '../../data/astrology/signs.js';
import { stepLabel } from '../sky/SkyOverlay.jsx';

const TRAIL_CHOICES = [{ id: 'auto', label: 'Follow my scrolling' }, { id: 'off', label: 'Off' }, ...STEP_UNITS.filter(u => u.id !== 'age').map(u => ({ id: u.id, label: `${u.label} apart` }))];
const FINE_SPANS = [{ id: 'month', label: '1 month' }, { id: 'year', label: '1 year' }, { id: 'decade', label: '10 years' }, { id: 'century', label: '100 years' }, { id: 'millennium', label: '1,000 years' }];
const TICK_STEPS = [1, 2, 5];

export default function TimeScroller() {
  const s = useSky();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState(null);       // text being typed in the date box
  const [fineSpan, setFineSpan] = useState('year');
  const [fine, setFine] = useState({ anchor: s.jd, f: 0 });
  const trackRef = useRef(null);
  const jdRef = useRef(s.jd);
  jdRef.current = s.jd;
  const unit = unitDays(s.unit);
  const age = ageAt(s.jd);
  const span = RANGE.max - RANGE.min;
  const pct = jd => ((jd - RANGE.min) / span) * 100;

  // The fine slider re-centres whenever the time moves by any other route.
  const fineJd = fine.anchor + fine.f * unitDays(fineSpan);
  useEffect(() => { if (Math.abs(s.jd - fineJd) > 1e-6) setFine({ anchor: s.jd, f: 0 }); }, [s.jd]); // eslint-disable-line

  const step = dir => scrollSkyTo(jdRef.current + dir * unit, unit);

  // Play: one step each beat, forward or back, until the end of the range.
  useEffect(() => {
    if (!s.playing) return undefined;
    const id = setInterval(() => {
      const next = jdRef.current + s.playing * unit;
      if (next >= RANGE.max || next <= RANGE.min) setSkyOption({ playing: 0 });
      scrollSkyTo(next, unit);
    }, 120);
    return () => clearInterval(id);
  }, [s.playing, unit]);

  // The wheel of the mouse over the track scrolls time by one step, a tick of the wheel a step.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    const onWheel = e => { e.preventDefault(); step(e.deltaY > 0 ? 1 : -1); };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }); // eslint-disable-line

  const onKey = e => {
    const big = e.shiftKey ? 10 : 1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); scrollSkyTo(s.jd + big * unit, big * unit); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); scrollSkyTo(s.jd - big * unit, big * unit); }
    else if (e.key === 'PageUp') { e.preventDefault(); scrollSkyTo(s.jd + 100 * unit, 100 * unit); }
    else if (e.key === 'PageDown') { e.preventDefault(); scrollSkyTo(s.jd - 100 * unit, 100 * unit); }
    else if (e.key === 'Home') { e.preventDefault(); jumpSkyTo(RANGE.min); }
    else if (e.key === 'End') { e.preventDefault(); jumpSkyTo(RANGE.max); }
  };

  const commitDate = () => {
    const jd = parseDate(typed);
    if (jd != null) jumpSkyTo(jd);
    setTyped(null);
  };
  const ages = agesBetween(RANGE.min, RANGE.max);
  const note = deepTimeNote(s.jd);
  const yrs = yearsFromNow(s.jd);
  const rel = Math.abs(yrs) < 1 ? 'today' : `${Math.round(Math.abs(yrs)).toLocaleString('en-GB')} years ${yrs < 0 ? 'ago' : 'ahead'}`;

  return (
    <section className="sge-time" aria-label="Sky time scroller">
      <div className="sge-time-row">
        <span className="sge-time-title">Sky time</span>
        <label className="sge-time-date">
          <span className="sge-sr">Date (year-month-day, or 12000 BC)</span>
          <input type="text" inputMode="text" value={typed ?? isoJd(s.jd)} spellCheck="false" aria-label="Date of the sky"
            onChange={e => setTyped(e.target.value)} onBlur={() => typed != null && commitDate()}
            onKeyDown={e => { if (e.key === 'Enter') commitDate(); if (e.key === 'Escape') setTyped(null); }} />
        </label>
        <span className="sge-time-read" aria-live="polite">
          {formatJd(s.jd)} <span className="sge-time-dim">({rel})</span>
          {' · '}<b style={{ color: SIGN_COL[age.sign] }}>{SIGN_SYM[age.idx]}</b> Age of {age.sign}
          <span className="sge-time-dim"> {ageYearsLabel(age)}</span>
        </span>
        <span className="sge-time-actions">
          <button type="button" className="sge-chip" onClick={() => step(-1)} aria-label="Step back">◀</button>
          <label className="sge-time-step"><span className="sge-sr">Step size</span>
            <select value={s.unit} onChange={e => setSkyOption({ unit: e.target.value })} aria-label="Step size">
              {STEP_UNITS.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
            </select>
          </label>
          <button type="button" className="sge-chip" onClick={() => step(1)} aria-label="Step forward">▶</button>
          <button type="button" className="sge-chip" onClick={() => { setSkyOption({ playing: 0 }); resetSky(); }} disabled={!s.touched}>Now</button>
          <button type="button" className="sge-chip" aria-expanded={open} onClick={() => setOpen(o => !o)}>{open ? 'Fewer' : 'More'}</button>
        </span>
      </div>

      <div className="sge-time-trackwrap" ref={trackRef}>
        <div className="sge-time-bands" aria-hidden="true">
          {ages.map(a => (
            <span key={a.k} className={`sge-time-band${a.k === ageAt(s.jd).k ? ' on' : ''}`}
              style={{ left: `${pct(a.from)}%`, width: `${pct(a.to) - pct(a.from)}%`, '--c': SIGN_COL[a.sign] }}
              title={`Age of ${a.sign}, ${ageYearsLabel(a)}`}>
              <i>{SIGN_SYM[a.idx]}</i>
            </span>
          ))}
          <span className="sge-time-now" style={{ left: `${pct(nowJd())}%` }} title="Today" />
        </div>
        <input type="range" className="sge-time-range" min={RANGE.min} max={RANGE.max} step={1} value={s.jd}
          aria-label={`Sky time across ${Math.round(PRECESSION_YEARS).toLocaleString('en-GB')} years. Arrow keys step by ${STEP_UNITS.find(u => u.id === s.unit).label.toLowerCase()}; shift for ten steps; page keys for a hundred.`}
          aria-valuetext={`${formatJd(s.jd)}, age of ${age.sign}`}
          onChange={e => { setSkyOption({ playing: 0 }); scrollSkyTo(+e.target.value); }} onKeyDown={onKey} />
      </div>

      {open && (
        <>
          <div className="sge-time-row sge-time-fine">
            <label>Fine, within ±
              <select value={fineSpan} onChange={e => { setFineSpan(e.target.value); setFine({ anchor: s.jd, f: 0 }); }}>
                {FINE_SPANS.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
              </select>
            </label>
            <input type="range" className="sge-time-range sge-time-fineslider" min={-1} max={1} step={0.0005} value={fine.f}
              aria-label={`Fine adjustment of up to ${FINE_SPANS.find(f => f.id === fineSpan).label} either way`}
              onChange={e => { const f = +e.target.value; setSkyOption({ playing: 0 }); const d = unitDays(fineSpan); scrollSkyTo(fine.anchor + f * d, Math.abs(f - fine.f) * d || undefined); setFine(p => ({ ...p, f })); }}
              onKeyDown={onKey} />
          </div>
          <div className="sge-time-row">
            <button type="button" className="sge-chip" aria-pressed={s.playing === -1} onClick={() => setSkyOption({ playing: s.playing === -1 ? 0 : -1 })}>{s.playing === -1 ? '❚❚ Pause' : '⏴ Play back'}</button>
            <button type="button" className="sge-chip" aria-pressed={s.playing === 1} onClick={() => setSkyOption({ playing: s.playing === 1 ? 0 : 1 })}>{s.playing === 1 ? '❚❚ Pause' : 'Play on ⏵'}</button>
            <label>Ghost stream
              <select value={s.trail} onChange={e => setSkyOption({ trail: e.target.value })}>
                {TRAIL_CHOICES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </label>
            <label className="sge-time-check"><input type="checkbox" checked={s.show} onChange={e => setSkyOption({ show: e.target.checked })} /> Show the sky on wheels</label>
          </div>
          <p className="sge-time-help">
            Drag the bar to sweep the whole cycle; each coloured band is one age ({Math.round(PRECESSION_YEARS / 12).toLocaleString('en-GB')} years, 30° of the equinox's slow turn through the signs). The fine slider, the arrow keys and the step buttons settle the exact day.
            {s.touched && s.trail !== 'off' ? <> Ghost spacing now: {stepLabel(trailStepDays(s))}.</> : null}
          </p>
        </>
      )}
      {note && <p className="sge-time-warn">{note}</p>}
    </section>
  );
}
