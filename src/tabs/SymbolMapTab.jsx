import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { ENTITIES, OVERLAYS, KIND_ORDER, NAK_SPAN } from '../data/symbolMap.js';
import { SIGNS, SIGN_SYM, SIGN_COL } from '../data/astrology/signs.js';
import { NAKSHATRA_INFO } from '../data/astrology/nakshatras.js';
import { ANIMALS } from '../data/astrology/chinese.js';
import { julianDay, allPlanets, ayanamsa, houseOf } from '../engines/astronomy.js';

// The symbol map. Zoomed out: the ecliptic with one ring per tradition, any
// of which can be hidden, and the bodies inside at their degrees. Zoomed in:
// one symbol at the centre with what the traditions tie to it round it.
// Works with or without a cast chart; without one, the bodies are the sky now.

const S = 600, C = S / 2;
const R_OUT = 292, R_IN = 122, R_BODY = 98;
const BAND_WEIGHT = { const: 1.7, sign: 1, nak: 1, branch: 1 };
const BODIES = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Rahu', 'Ketu'];
const posKey = (b) => (b === 'Rahu' ? 'Node' : b);

const norm = (d) => ((d % 360) + 360) % 360;
const rad = (d) => (d * Math.PI) / 180;
// 0° Aries at the left, longitude rising anticlockwise, as on a chart.
const pt = (r, lon) => [C - r * Math.cos(rad(lon)), C + r * Math.sin(rad(lon))];
const sector = (r0, r1, a0, a1) => {
  const sw = norm(a1 - a0) || 360, large = sw > 180 ? 1 : 0;
  const [x0, y0] = pt(r1, a0), [x1, y1] = pt(r1, a0 + sw), [x2, y2] = pt(r0, a0 + sw), [x3, y3] = pt(r0, a0);
  return `M${x0},${y0} A${r1},${r1} 0 ${large} 0 ${x1},${y1} L${x2},${y2} A${r0},${r0} 0 ${large} 1 ${x3},${y3} Z`;
};
const signOf = (lon) => SIGNS[Math.floor(norm(lon) / 30)];
const degIn = (lon) => Math.floor(norm(lon) % 30);
const inSpan = (lon, a, b) => { const L = norm(lon); return b > a ? L >= a && L < b : L >= a || L < b; };
const ord = (n) => n + (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th');
const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const idFromHash = () => {
  if (typeof window === 'undefined' || !window.location) return null;
  const [, rest] = window.location.hash.slice(1).split('/');
  const id = rest ? decodeURIComponent(rest) : null;
  return id && ENTITIES[id] ? id : null;
};

// What the chart (or the sky now) holds for one symbol, in one line.
function chartLine(ent, sky) {
  const { pos, ay, houses, aspects, cn, label, year } = sky;
  const bodiesWhere = (test) => BODIES.filter((b) => pos[posKey(b)] != null && test(pos[posKey(b)]));
  const list = (bs) => (bs.length ? bs.join(', ') : null);
  switch (ent.kind) {
    case 'planet': {
      const lon = pos[posKey(ent.name)];
      if (lon == null) return null;
      const h = houses ? `, ${ord(houseOf(lon, houses))} house` : '';
      const nak = NAKSHATRA_INFO[Math.floor(norm(lon - ay) / NAK_SPAN)]?.name;
      return `${label}: ${degIn(lon)}° ${signOf(lon)}${h}, in ${nak}.`;
    }
    case 'sign': {
      const bs = list(bodiesWhere((l) => signOf(l) === ent.name));
      const rising = houses && signOf(houses.ASC) === ent.name ? ' The rising sign.' : '';
      return bs || rising ? `${label}: ${bs ? `holds ${bs}.` : 'no body here.'}${rising}` : `${label}: no body here.`;
    }
    case 'const': {
      const prec = (year - 2000) * 0.01397;
      const bs = list(bodiesWhere((l) => inSpan(l - prec, ent.start, ent.end)));
      return `${label}: ${bs ? `${bs} among these stars.` : 'no body among these stars.'}`;
    }
    case 'nak': {
      const bs = list(bodiesWhere((l) => inSpan(l - ay, ent.start, ent.end)));
      return `${label}: ${bs ? `${bs} in this mansion.` : 'no body in this mansion.'}`;
    }
    case 'branch': {
      const parts = [];
      if (cn?.animal === ent.name) parts.push('the year branch');
      if (inSpan(pos.Sun, ent.start, ent.end)) parts.push('the Sun stands in this month');
      return parts.length ? `${label}: ${parts.join('; ')}.` : null;
    }
    case 'phase':
      return cn?.element === ent.name ? `${label}: the phase of the year stem.` : null;
    case 'element':
    case 'mode': {
      const signs = ent.links.filter((l) => l.to.startsWith('sign:')).map((l) => l.to.slice(5));
      const bs = bodiesWhere((l) => signs.includes(signOf(l)));
      return `${label}: ${bs.length} of ${BODIES.length} bodies${bs.length ? ` (${bs.join(', ')})` : ''}.`;
    }
    case 'house': {
      if (!houses) return null;
      const n = Number(ent.glyph);
      const bs = list(bodiesWhere((l) => houseOf(l, houses) === n));
      return `${label}: ${bs ? `holds ${bs}` : 'empty'}, cusp ${degIn(houses[n])}° ${signOf(houses[n])}.`;
    }
    case 'asp': {
      if (!aspects) return null;
      const hits = aspects.filter((a) => a.name === ent.name);
      if (!hits.length) return `${label}: none inside the orb.`;
      return `${label}: ${hits.slice(0, 4).map((a) => `${a.p1} and ${a.p2}`).join('; ')}${hits.length > 4 ? `, and ${hits.length - 4} more` : ''}.`;
    }
    default: return null;
  }
}

export default function SymbolMapTab({ ctx = {} }) {
  const { res } = ctx;

  // The bodies: the cast chart's, or the sky at the moment the view opens.
  const sky = useMemo(() => {
    if (res) {
      return { pos: res.trop, ay: ayanamsa(res.jd), houses: res.houses, aspects: res.aspects, cn: res.cn, label: 'In this chart', year: 2000 + (res.jd - 2451545) / 365.25 };
    }
    const d = new Date();
    const jd = julianDay(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate(), d.getUTCHours() + d.getUTCMinutes() / 60);
    return { pos: allPlanets(jd), ay: ayanamsa(jd), label: 'In the sky now', year: d.getUTCFullYear() };
  }, [res]);

  const [shown, setShown] = useState({ const: true, sign: true, nak: true, branch: true });
  const [hover, setHover] = useState(null);
  const [focus, setFocusState] = useState(idFromHash);
  const [trail, setTrail] = useState(() => (idFromHash() ? [idFromHash()] : []));
  const [zoom, setZoom] = useState(null);
  const zoomTimer = useRef(null);
  const panelRef = useRef(null);

  const syncHash = (id) => {
    const h = id ? `#symbols/${encodeURIComponent(id)}` : '#symbols';
    if (window.location.hash !== h) history.replaceState(null, '', h);
  };
  const openFocus = useCallback((id, from) => {
    if (!ENTITIES[id]) return;
    const go = () => {
      setZoom(null);
      setFocusState(id);
      setTrail((t) => (from === 'map' ? [id] : [...t.slice(0, t.includes(id) ? t.indexOf(id) : t.length), id]));
      syncHash(id);
      requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));
    };
    clearTimeout(zoomTimer.current);
    if (from === 'map' && !reduced()) {
      setZoom(id);
      zoomTimer.current = setTimeout(go, 420);
    } else go();
  }, []);
  const backToMap = useCallback(() => { setFocusState(null); setTrail([]); syncHash(null); }, []);

  useEffect(() => {
    const onHash = () => { const id = idFromHash(); if (id && id !== focus) { setFocusState(id); setTrail([id]); } };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [focus]);
  useEffect(() => () => clearTimeout(zoomTimer.current), []);
  useEffect(() => {
    if (!focus) return;
    const onKey = (e) => { if (e.key === 'Escape') backToMap(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focus, backToMap]);

  return (
    <div className="sm">
      {focus
        ? <FocusView id={focus} trail={trail} sky={sky} onOpen={(id) => openFocus(id, 'focus')} onBack={backToMap} panelRef={panelRef} />
        : <MapView sky={sky} shown={shown} setShown={setShown} hover={hover} setHover={setHover} zoom={zoom} onOpen={(id) => openFocus(id, 'map')} />}
    </div>
  );
}

function MapView({ sky, shown, setShown, hover, setHover, zoom, onOpen }) {
  const on = OVERLAYS.filter((o) => shown[o.id]);
  // Share the ring between the overlays that are on; each keeps its own band
  // so every one stays reachable with all of them showing.
  const bands = useMemo(() => {
    const total = on.reduce((s, o) => s + BAND_WEIGHT[o.id], 0) || 1;
    let r = R_OUT;
    const out = {};
    for (const o of on) { const w = ((R_OUT - R_IN) * BAND_WEIGHT[o.id]) / total; out[o.id] = [r - w, r]; r -= w; }
    return out;
  }, [on.map((o) => o.id).join()]);

  const related = useMemo(() => new Set(hover ? ENTITIES[hover].links.map((l) => l.to) : []), [hover]);
  const cls = (id) => `sm-seg${hover === id ? ' on' : ''}${related.has(id) ? ' rel' : ''}${zoom === id ? ' on' : ''}`;
  const segProps = (id) => {
    const e = ENTITIES[id];
    return {
      className: cls(id), tabIndex: 0, role: 'button', 'aria-label': `${e.name}, ${e.kindLabel}`,
      onMouseEnter: () => setHover(id), onMouseLeave: () => setHover((h) => (h === id ? null : h)),
      onFocus: () => setHover(id), onBlur: () => setHover((h) => (h === id ? null : h)),
      onClick: () => onOpen(id),
      onKeyDown: (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); onOpen(id); } },
    };
  };

  // Zoom toward the chosen symbol before the focus view replaces the map.
  const zoomStyle = (() => {
    if (!zoom) return undefined;
    const e = ENTITIES[zoom];
    let lon = e.start != null ? e.start + norm(e.end - e.start) / 2 : null;
    if (e.kind === 'planet') lon = sky.pos[posKey(e.name)];
    if (e.sidereal && lon != null) lon += sky.ay;
    const band = bands[e.kind === 'planet' ? null : e.kind] || [R_BODY, R_BODY];
    const [x, y] = lon == null ? [C, C] : pt((band[0] + band[1]) / 2, lon);
    return { transform: `translate(${C - x}px, ${C - y}px) scale(2.4)`, transformOrigin: `${x}px ${y}px`, opacity: 0.25 };
  })();

  const hv = hover ? ENTITIES[hover] : null;
  const bodyR = BODIES.map((b) => [b, sky.pos[posKey(b)]]).filter(([, l]) => l != null).sort((a, b) => a[1] - b[1]);
  // Stagger bodies that sit within 7° of each other.
  let prev = -99, lane = 0;
  const bodyPts = bodyR.map(([b, l]) => { lane = l - prev < 7 ? (lane + 1) % 3 : 0; prev = l; return [b, l, R_BODY - lane * 20]; });

  return (
    <>
      <div className="sm-toolbar" role="group" aria-label="Traditions shown">
        {OVERLAYS.map((o) => (
          <button key={o.id} type="button" className="sge-chip" aria-pressed={shown[o.id]} title={o.note}
            onClick={() => setShown((s) => ({ ...s, [o.id]: !s[o.id] }))}>{o.label}</button>
        ))}
        <span className="sm-sky">{sky.label === 'In this chart' ? 'Bodies: the cast chart' : 'Bodies: the sky now'}</span>
      </div>

      <div className="sm-mapwrap">
        <svg viewBox={`0 0 ${S} ${S}`} className="sm-map" role="group" aria-label="Symbol map of the ecliptic">
          <g className="sm-zoom" style={zoomStyle}>
            <circle cx={C} cy={C} r={R_OUT} className="sm-ring" />
            <circle cx={C} cy={C} r={R_IN} className="sm-ring" />
            {on.map((o) => { const [r0] = bands[o.id]; return <circle key={o.id} cx={C} cy={C} r={r0} className="sm-ring sm-ring-in" />; })}

            {shown.const && (() => { const [r0, r1] = bands.const, mid = (r0 + r1) / 2, k = (r1 - r0) / 2 / 24; return Object.values(ENTITIES).filter((e) => e.kind === 'const').map((e) => {
              const P = e.stars.map(([lon, lat]) => pt(mid + Math.max(-22, Math.min(22, lat)) * k, lon));
              return (
                <g key={e.id} {...segProps(e.id)}>
                  <path d={sector(r0, r1, e.start, e.end)} className="sm-hit" />
                  <path d={sector(r0, r1, e.start, e.start + 0.01)} className="sm-tick" />
                  <g className="sm-stars">
                    {e.lines.map((ln, i) => <polyline key={i} points={ln.map((j) => P[j].join(',')).join(' ')} />)}
                    {P.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1.9} />)}
                  </g>
                </g>
              );
            }); })()}

            {shown.sign && (() => { const [r0, r1] = bands.sign; return SIGNS.map((s, i) => {
              const id = `sign:${s}`, [x, y] = pt((r0 + r1) / 2, i * 30 + 15);
              return (
                <g key={id} {...segProps(id)}>
                  <path d={sector(r0, r1, i * 30, i * 30 + 30)} className="sm-hit" style={{ '--c': SIGN_COL[s] }} />
                  <text x={x} y={y} className="sm-glyph" fill={SIGN_COL[s]} fontSize={Math.min(22, (r1 - r0) * 0.6)}>{SIGN_SYM[i]}</text>
                </g>
              );
            }); })()}

            {shown.nak && (() => { const [r0, r1] = bands.nak; return NAKSHATRA_INFO.map((n, i) => {
              const id = `nak:${n.name}`, e = ENTITIES[id], a0 = i * NAK_SPAN + sky.ay;
              const [x, y] = pt((r0 + r1) / 2, a0 + NAK_SPAN / 2);
              return (
                <g key={id} {...segProps(id)}>
                  <path d={sector(r0, r1, a0, a0 + NAK_SPAN)} className="sm-hit sm-hit-line" style={{ '--c': e.colour }} />
                  <text x={x} y={y} className="sm-num" fill={e.colour} fontSize={Math.min(12, (r1 - r0) * 0.45)}>{i + 1}</text>
                </g>
              );
            }); })()}

            {shown.branch && (() => { const [r0, r1] = bands.branch; return ANIMALS.map((a) => {
              const id = `branch:${a}`, e = ENTITIES[id], [x, y] = pt((r0 + r1) / 2, e.start + 15);
              return (
                <g key={id} {...segProps(id)}>
                  <path d={sector(r0, r1, e.start, e.end)} className="sm-hit sm-hit-line" style={{ '--c': e.colour }} />
                  <text x={x} y={y} className="sm-han" fill={e.colour} fontSize={Math.min(18, (r1 - r0) * 0.5)}>{e.glyph}</text>
                </g>
              );
            }); })()}

            {bodyPts.map(([b, lon, r]) => {
              const id = `planet:${b}`, e = ENTITIES[id], [x, y] = pt(r, lon), [x2, y2] = pt(R_IN, lon);
              return (
                <g key={id} {...segProps(id)}>
                  <line x1={x} y1={y} x2={x2} y2={y2} className="sm-spoke" stroke={e.colour} />
                  <circle cx={x} cy={y} r={12} className="sm-body" stroke={e.colour} />
                  <text x={x} y={y + 0.5} className="sm-glyph" fill={e.colour} fontSize={14}>{e.glyph}</text>
                </g>
              );
            })}

            <text x={C} y={C - 6} className="sm-centre-glyph" fill={hv?.colour || 'rgba(234,223,196,.35)'}>{hv ? hv.glyph : '⊕'}</text>
            {hv && <text x={C} y={C + 20} className="sm-centre-name">{hv.name}</text>}
          </g>
        </svg>
      </div>

      <p className="sm-readout" aria-live="polite">
        {hv ? <><b style={{ color: hv.colour }}>{hv.name}</b> <span className="sm-kind">{hv.kindLabel}</span> {hv.essence}</>
          : <span className="sm-idle">Hover or tab to a symbol to read it; select it to open what the traditions tie to it. Lit symbols are its correspondences.</span>}
      </p>

      <details className="sm-index">
        <summary>Every symbol, by kind</summary>
        {KIND_ORDER.map(({ kind, label }) => (
          <div key={kind} className="sm-index-group">
            <h3>{label}</h3>
            <div className="sm-index-row">
              {Object.values(ENTITIES).filter((e) => e.kind === kind).map((e) => (
                <button key={e.id} type="button" className="sge-chip" onClick={() => onOpen(e.id)}>
                  <span style={{ color: e.colour }}>{e.glyph}</span> {e.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </details>
    </>
  );
}

function FocusView({ id, trail, sky, onOpen, onBack, panelRef }) {
  const e = ENTITIES[id];
  const links = e.links.slice(0, 14);
  const n = links.length;
  const R = n > 9 ? 222 : 200;
  const line = chartLine(e, sky);

  return (
    <div className="sm-focus" key={id}>
      <nav className="sm-trail" aria-label="Path through the map">
        <button type="button" className="sm-crumb" onClick={onBack}>Map</button>
        {trail.map((t, i) => (
          <span key={t + i}>
            <span aria-hidden="true" className="sm-sep">›</span>
            {i === trail.length - 1
              ? <span className="sm-crumb sm-crumb-on" aria-current="page">{ENTITIES[t].name}</span>
              : <button type="button" className="sm-crumb" onClick={() => onOpen(t)}>{ENTITIES[t].name}</button>}
          </span>
        ))}
      </nav>

      <div className="sm-focus-grid">
        <svg viewBox={`0 0 ${S} ${S}`} className="sm-map sm-constellate" aria-hidden="true">
          {links.map((l, i) => {
            const t = ENTITIES[l.to], a = -90 + (360 / n) * i;
            const x = C + R * Math.cos(rad(a)), y = C + R * Math.sin(rad(a));
            return (
              <g key={l.to + l.rel} className="sm-node" style={{ '--d': `${80 + i * 45}ms` }} onClick={() => onOpen(l.to)}>
                <line x1={C} y1={C} x2={x} y2={y} className="sm-edge" stroke={t.colour} pathLength="1" />
                <circle cx={x} cy={y} r={24} className="sm-body" stroke={t.colour} />
                <text x={x} y={y + 0.5} className="sm-glyph" fill={t.colour} fontSize={t.glyph.length > 2 ? 12 : 18}>{t.glyph}</text>
                <text x={x} y={y + 42} className="sm-node-name">{t.name}</text>
                <text x={x} y={y - 34} className="sm-node-rel">{l.rel}</text>
              </g>
            );
          })}
          <circle cx={C} cy={C} r={66} className="sm-core" stroke={e.colour} />
          <text x={C} y={C - 4} className="sm-glyph" fill={e.colour} fontSize={e.glyph.length > 2 ? 22 : 46}>{e.glyph}</text>
          <text x={C} y={C + 40} className="sm-centre-name">{e.name}</text>
        </svg>

        <section className="sm-panel" ref={panelRef} tabIndex={-1} aria-label={e.name}>
          <h2><span style={{ color: e.colour }}>{e.glyph}</span> {e.name}</h2>
          <p className="sm-kind">{e.kindLabel}</p>
          <p className="sm-essence">{e.essence}</p>
          {e.attrs.length > 0 && (
            <dl className="sm-attrs">
              {e.attrs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          )}
          {line && <p className="sm-chartline">{line}</p>}
          <h3>Tied to it</h3>
          <ul className="sm-links">
            {e.links.map((l) => {
              const t = ENTITIES[l.to];
              return (
                <li key={l.to + l.rel}>
                  <button type="button" onClick={() => onOpen(l.to)}>
                    <span className="sm-rel">{l.rel}</span>
                    <span className="sm-link-name"><span style={{ color: t.colour }}>{t.glyph}</span> {t.name}</span>
                    <span className="sm-link-ess">{t.essence}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <button type="button" className="sge-chip sm-back" onClick={onBack}>Back to the map</button>
        </section>
      </div>
    </div>
  );
}
