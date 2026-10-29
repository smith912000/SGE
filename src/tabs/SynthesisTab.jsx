import { useMemo } from 'react';
import { M3 } from '../theme/m3.js';
import Card from '../components/ui/Card.jsx';
import MoonPhase from '../components/ui/MoonPhase.jsx';
import { SIGNS, SIGN_COL, ELEMENT_HUE } from '../data/astrology/signs.js';
import { P_SYM, P_COL } from '../data/astrology/planets.js';
import { NAKSHATRA_INFO } from '../data/astrology/nakshatras.js';
import { NUM_PLANET } from '../data/numerology/tables.js';
import { nakshatra, ayanamsa, moonPhase } from '../engines/astronomy.js';
import { computeNumerology } from '../engines/numerology.js';

// SGE's synthesis view. Each tradition is asked the same few questions of the
// same moment: which body governs it, where the lights and the horizon stand,
// how the lunation is reckoned, which element or phase predominates. Where the
// answers coincide the view says so; where they part it names both and leaves
// the difference standing.

const norm = (x) => ((x % 360) + 360) % 360;
const signOf = (lon) => SIGNS[Math.floor(norm(lon) / 30)];
const degIn = (lon) => norm(lon) % 30;
const fmt = (d) => `${Math.floor(d)}°${String(Math.floor((d % 1) * 60)).padStart(2, '0')}′`;

const RASHI = ['Mesha', 'Vṛṣabha', 'Mithuna', 'Karka', 'Siṃha', 'Kanyā', 'Tulā', 'Vṛścika', 'Dhanu', 'Makara', 'Kumbha', 'Mīna'];
const SIGN_EL = ['Fire', 'Earth', 'Air', 'Water'];

// Traditional (seven-body) rulers, shared by the Hellenistic and Jyotiṣa schemes.
const RULER = {
  Aries: 'Mars', Taurus: 'Venus', Gemini: 'Mercury', Cancer: 'Moon', Leo: 'Sun', Virgo: 'Mercury',
  Libra: 'Venus', Scorpio: 'Mars', Sagittarius: 'Jupiter', Capricorn: 'Saturn', Aquarius: 'Saturn', Pisces: 'Jupiter',
};
// Planetary days, in the Chaldean order that names the week in both Rome and India.
const DAY_RULER = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
const DAY_NAME = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const VARA = ['Ravivāra', 'Somavāra', 'Maṅgalavāra', 'Budhavāra', 'Guruvāra', 'Śukravāra', 'Śanivāra'];
// The five stars (五星) of Chinese astronomy, one to each phase.
const PHASE_STAR = { Wood: ['Jupiter', '木星'], Fire: ['Mars', '火星'], Earth: ['Saturn', '土星'], Metal: ['Venus', '金星'], Water: ['Mercury', '水星'] };
const TITHI = ['Pratipadā', 'Dvitīyā', 'Tṛtīyā', 'Caturthī', 'Pañcamī', 'Ṣaṣṭhī', 'Saptamī', 'Aṣṭamī', 'Navamī', 'Daśamī', 'Ekādaśī', 'Dvādaśī', 'Trayodaśī', 'Caturdaśī'];
const NODE_SYM = { Rahu: '☊︎', Ketu: '☋︎' };
const glyph = (p) => P_SYM[p] || NODE_SYM[p] || '';
const colour = (p) => P_COL[p] || M3.onSurfaceVariant;

function Body({ name }) {
  return (
    <span className="sge-planet" style={{ color: colour(name) }}>
      <span aria-hidden="true" className="sge-planet-glyph">{glyph(name)}</span>{name}
    </span>
  );
}

export default function SynthesisTab({ ctx }) {
  const { res, A } = ctx;

  const s = useMemo(() => {
    const ay = ayanamsa(res.jd);
    const ascT = res.houses.ASC;
    const ascS = norm(ascT - ay);
    const moonNak = nakshatra(res.sid.Moon);
    const nakInfo = NAKSHATRA_INFO[moonNak.idx];
    const weekday = new Date(Date.UTC(A.year, A.month - 1, A.day)).getUTCDay();
    const num = computeNumerology(A.year, A.month, A.day, A.name || '');
    const lifePath = num.lifePath;
    const star = PHASE_STAR[res.cn.element];

    const methods = [
      { key: 'ruler', name: 'Chart ruler', lineage: 'Hellenistic', basis: `ruler of the ${signOf(ascT)} Ascendant, tropical`, planet: RULER[signOf(ascT)] },
      { key: 'lagna', name: 'Lagneśa, lord of the lagna', lineage: 'Jyotiṣa', basis: `ruler of ${RASHI[Math.floor(ascS / 30)]} rising, sidereal`, planet: RULER[SIGNS[Math.floor(ascS / 30)]] },
      { key: 'dasha', name: 'Daśā lord at birth', lineage: 'Jyotiṣa, Vimśottarī', basis: `lord of the Moon's nakṣatra, ${nakInfo.name}`, planet: nakInfo.lord },
      { key: 'day', name: 'Lord of the day', lineage: 'Chaldean order', basis: `${DAY_NAME[weekday]}, ${VARA[weekday]}, by the civil date`, planet: DAY_RULER[weekday] },
      { key: 'star', name: 'Star of the year phase', lineage: 'Chinese, five stars', basis: `${res.cn.element} year, ${star[1]}`, planet: star[0] },
      { key: 'number', name: 'Planet of the life-path number', lineage: 'Modern numerology', basis: `life path ${lifePath}`, planet: NUM_PLANET[lifePath] },
    ];
    const tally = {};
    methods.forEach((m) => { if (m.planet) (tally[m.planet] ||= []).push(m); });
    const ranked = Object.entries(tally).sort((a, b) => b[1].length - a[1].length);

    const lights = [
      { name: 'Sun', trop: res.trop.Sun, sid: res.sid.Sun },
      { name: 'Moon', trop: res.trop.Moon, sid: res.sid.Moon },
      { name: 'Ascendant', trop: ascT, sid: ascS },
    ].map((r) => ({ ...r, nak: NAKSHATRA_INFO[nakshatra(r.sid).idx], pada: nakshatra(r.sid).pada, same: signOf(r.trop) === signOf(r.sid) }));

    const sep = norm(res.trop.Moon - res.trop.Sun);
    const tithiN = Math.floor(sep / 12) + 1;
    const waxing = tithiN <= 15;
    const inPaksha = ((tithiN - 1) % 15) + 1;
    const tithi = inPaksha === 15 ? (waxing ? 'Pūrṇimā' : 'Amāvasyā') : TITHI[inPaksha - 1];
    const phase = moonPhase(res.trop.Sun, res.trop.Moon);

    const total = Object.values(res.el).reduce((a, b) => a + b, 0);
    const topEl = Object.entries(res.el).sort((a, b) => b[1] - a[1])[0][0];
    const moonSidEl = SIGN_EL[Math.floor(norm(res.sid.Moon) / 30) % 4];

    // Statements of agreement and of difference, in the order of their weight.
    const notes = [];
    const [lead, leadMethods] = ranked[0] || [];
    if (leadMethods && leadMethods.length >= 2) {
      notes.push({ kind: 'meet', text: <><Body name={lead} /> is named by {leadMethods.length} of {methods.length} methods: {leadMethods.map((m) => m.name.toLowerCase()).join(', ')}.</> });
      const second = ranked[1];
      if (second && second[1].length >= 2) notes.push({ kind: 'meet', text: <><Body name={second[0]} /> is named by {second[1].length}: {second[1].map((m) => m.name.toLowerCase()).join(', ')}.</> });
    } else {
      notes.push({ kind: 'part', text: <>No body is named by more than one method. The six answers stand side by side below, unreconciled.</> });
    }
    const split = lights.filter((l) => !l.same);
    if (split.length) {
      notes.push({ kind: 'part', text: <>The two zodiacs part on {split.map((l) => `the ${l.name === 'Ascendant' ? 'Ascendant' : l.name}`).join(' and ')}: {split.map((l, i) => <span key={l.name}>{i ? '; ' : ''}{signOf(l.trop)} tropical, {RASHI[Math.floor(norm(l.sid) / 30)]} sidereal</span>)}. The ayanāṃśa of {ay.toFixed(1)}° is the whole of the difference.</> });
    } else {
      notes.push({ kind: 'meet', text: <>Both zodiacs place the Sun, Moon and Ascendant in the same signs, despite the {ay.toFixed(1)}° between them.</> });
    }
    if (['Fire', 'Water', 'Earth'].includes(res.cn.element) && res.cn.element === topEl) {
      notes.push({ kind: 'meet', text: <>{topEl} leads the Western element count and is also the phase of the Chinese year.</> });
    } else if (['Fire', 'Water', 'Earth'].includes(res.cn.element)) {
      notes.push({ kind: 'part', text: <>The Western count leads with {topEl}; the Chinese year is {res.cn.element}.</> });
    }

    return { ay, methods, ranked, lights, sep, tithiN, waxing, tithi, phase, total, topEl, moonSidEl, notes, lifePath, nakInfo, moonNak };
  }, [res, A]);

  return (
    <div className="sge-synth">
      <Card title="Where the methods meet">
        <ul className="sge-notes">
          {s.notes.map((n, i) => (
            <li key={i} className={`sge-note sge-note-${n.kind}`} style={{ '--i': i }}>
              <span className="sge-note-mark" aria-hidden="true">{n.kind === 'meet' ? '☌︎' : '☍︎'}</span>
              <span>{n.text}</span>
            </li>
          ))}
        </ul>
        <p className="sge-synth-foot">☌ marks agreement between methods, ☍ a difference left standing.</p>
      </Card>

      <Card title="The governing body, asked six ways">
        <div className="sge-tally" aria-label="Count of methods naming each body">
          {s.ranked.map(([p, ms], i) => (
            <div key={p} className="sge-tally-row" style={{ '--i': i }}>
              <Body name={p} />
              <span className="sge-tally-track"><span className="sge-tally-fill" style={{ width: `${(ms.length / s.methods.length) * 100}%`, background: colour(p) }} /></span>
              <span className="sge-tally-n">{ms.length}</span>
            </div>
          ))}
        </div>
        <table className="sge-table sge-table-methods">
          <thead><tr><th>Method</th><th>Lineage</th><th>Basis</th><th>Body</th></tr></thead>
          <tbody>
            {s.methods.map((m) => (
              <tr key={m.key}>
                <td>{m.name}</td>
                <td className="sge-dim">{m.lineage}</td>
                <td className="sge-dim">{m.basis}</td>
                <td>{m.planet ? <Body name={m.planet} /> : <span className="sge-dim">none assigned</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="sge-synth-foot">Modern numerology gives 4 to Uranus and 7 to Neptune; Cheiro's Chaldean scheme gives the same numbers to Rāhu and Ketu. The lord of the day is taken from the civil date; vāra proper begins at sunrise.</p>
      </Card>

      <div className="sge-synth-grid">
        <Card title="The lights and the horizon in two zodiacs">
          <table className="sge-table">
            <thead><tr><th></th><th>Tropical</th><th>Sidereal</th><th>Nakṣatra</th></tr></thead>
            <tbody>
              {s.lights.map((l) => (
                <tr key={l.name}>
                  <td>{l.name === 'Ascendant' ? 'Ascendant' : <Body name={l.name} />}</td>
                  <td><span style={{ color: SIGN_COL[signOf(l.trop)] }}>{signOf(l.trop)}</span> <span className="sge-num">{fmt(degIn(l.trop))}</span></td>
                  <td><span style={{ color: SIGN_COL[signOf(l.sid)] }}>{RASHI[Math.floor(norm(l.sid) / 30)]}</span> <span className="sge-num">{fmt(degIn(l.sid))}</span></td>
                  <td>{l.nak.name} <span className="sge-dim">pada {l.pada}, lord {l.nak.lord}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="sge-synth-foot">Lahiri ayanāṃśa {s.ay.toFixed(2)}°. Signs that differ between the frames are noted above.</p>
        </Card>

        <Card title="One lunation, three reckonings">
          <div className="sge-luna">
            <MoonPhase angle={s.sep} size={64} title={s.phase.name} />
            <dl className="sge-dl">
              <dt>Western</dt><dd>{s.phase.name}, {Math.round(s.sep)}° from the Sun, {s.phase.illumination}% lit</dd>
              <dt>Vedic</dt><dd>Tithi {s.tithiN}, {s.tithi}, {s.waxing ? 'Śukla' : 'Kṛṣṇa'} pakṣa</dd>
              <dt>Chinese</dt><dd>{res.cn.lunar ? <>Day {res.cn.lunar.day} of the {res.cn.lunar.monthName.toLowerCase()} month <span className="sge-dim">(approximate)</span></> : 'not computed'}</dd>
            </dl>
          </div>
          <p className="sge-synth-foot">Each count is a division of the same Sun-Moon cycle: eight phases, thirty tithis of 12°, thirty lunar days.</p>
        </Card>

        <Card title="Elements and phases">
          <div className="sge-els">
            {Object.entries(res.el).map(([el, n], i) => (
              <div key={el} className="sge-el-row" style={{ '--i': i }}>
                <span style={{ color: ELEMENT_HUE[el] }}>{el}</span>
                <span className="sge-tally-track"><span className="sge-tally-fill" style={{ width: `${(n / s.total) * 100}%`, background: ELEMENT_HUE[el] }} /></span>
                <span className="sge-tally-n">{n}</span>
              </div>
            ))}
          </div>
          <dl className="sge-dl">
            <dt>Western count</dt><dd>{s.topEl} leads, across {s.total} bodies and points</dd>
            <dt>Sidereal Moon</dt><dd>in {/^[AEIOU]/.test(s.moonSidEl) ? 'an' : 'a'} {s.moonSidEl} rāśi</dd>
            <dt>Chinese year</dt><dd>{res.cn.polarity} {res.cn.element}, {res.cn.stem}{res.cn.branch} ({res.cn.stemPinyin}-{res.cn.branchPinyin})</dd>
          </dl>
          <p className="sge-synth-foot">Fire, Water and Earth carry the same names in both schemes. Wood and Metal have no agreed Western counterpart; sources that pair them with Air disagree on which.</p>
        </Card>
      </div>
    </div>
  );
}
