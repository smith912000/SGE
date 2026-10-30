import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { essenceOf } from '../data/symbolEssence.js';
import { ENTITIES, OVERLAYS, KIND_ORDER, NAK_SPAN, XIU, FOUR_SYMBOLS, ANGLES, POLARIS } from '../data/symbolMap.js';
import { STARS, NAMED_STARS, YOGATARAS, FIGURES, XIU_FIGURES } from '../data/sky/catalogue.js';
import { FIGURE_ART, FIGURE_NOTE, ASTERISMS } from '../data/sky/figureArt.js';
import { RASHI_INFO } from '../data/astrology/nakshatras.js';
import { SIGNS, SIGN_SYM, SIGN_COL } from '../data/astrology/signs.js';
import { NAKSHATRA_INFO } from '../data/astrology/nakshatras.js';
import { julianDay, allPlanets, ayanamsa, houseOf } from '../engines/astronomy.js';
import { Sigil, SymbolPlate, drawSigil } from '../components/sky/symbolArt.jsx';
import { eclToEq, precessionSinceJ2000, observer, altAz, camera, easeInOut, segDist, norm } from '../components/sky/sky.js';

// The symbol map: the sky as it stands over the chart's place at the chart's
// moment (or over the visitor now), seen from below, with each tradition's
// way of dividing it laid on as an overlay that can be switched off. Hover
// lights a symbol and its correspondences; selecting one flies to it and
// opens what the traditions tie to it.

const BODIES = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'Chiron', 'Lilith', 'Rahu', 'Ketu'];
const posKey = (b) => (b === 'Rahu' ? 'Node' : b);
const BODY_SIZE = { Sun: 7, Moon: 6, Venus: 3.6, Jupiter: 3.3, Mars: 3, Saturn: 2.9, Mercury: 2.6, Uranus: 1.9, Neptune: 1.7, Pluto: 1.5 };
const FIG_TO_CONST = Object.fromEntries(Object.values(ENTITIES).filter((e) => e.kind === 'const' || e.kind === 'fig').map((e) => [e.fig, e.id]));
const XIU_BY_KEY = Object.fromEntries(XIU.map((x) => [x[0], `xiu:${x[3]}`]));
const INK = { star: '244,241,237', fig: '234,223,196', gold: '201,168,76', nak: '217,142,95', xiu: '147,184,154' };

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
    case 'angle': {
      if (!houses) return null;
      const lon = houses[ent.key];
      return `${label}: ${degIn(lon)}° ${signOf(lon)}.`;
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

// Everything placed on the sky once per moment and place, as horizontal vectors.
function buildScene({ jd, lat, lon, pos, ay, houses }) {
  const hv = observer(jd, lat, lon);
  const prec = precessionSinceJ2000(jd);
  const ecl = (l, b = 0) => hv(...eclToEq(l - prec, b));
  const arc = (l0, l1, b, step = 2) => { const out = []; for (let l = l0; l <= l1 + 1e-6; l += step) out.push(ecl(l, b)); return out; };
  const scene = {
    stars: STARS.map(([ra, dec, m]) => [hv(ra, dec), m]),
    named: NAMED_STARS.map(([ra, dec, m, n]) => ({ v: hv(ra, dec), m, n })),
    figs: FIGURES.map((f) => ({ id: f.id, name: f.name, ent: FIG_TO_CONST[f.id] || null, at: f.at ? hv(...f.at) : null, lines: f.lines.map((l) => l.map(([ra, dec]) => hv(ra, dec))), art: (FIGURE_ART[f.id] || []).map((l) => l.map(([ra, dec]) => hv(ra, dec))) })),
    xiu: Object.entries(XIU_FIGURES).map(([k, f]) => ({ ent: XIU_BY_KEY[k], at: hv(...f.at), lines: f.lines.map((l) => l.map(([ra, dec]) => hv(ra, dec))) })).filter((x) => x.ent),
    ecliptic: arc(0, 360, 0),
    beltN: arc(0, 360, 8), beltS: arc(0, 360, -8),
    signs: SIGNS.map((s, i) => ({ ent: `sign:${s}`, i, label: ecl(i * 30 + 15, 4.2), tick: [ecl(i * 30, 8), ecl(i * 30, -8)], n: arc(i * 30, i * 30 + 30, 8, 1), s: arc(i * 30, i * 30 + 30, -8, 1) })),
    sid: SIGNS.map((sg, i) => ({ ent: `sign:${sg}`, i, label: ecl(i * 30 + 15 + ay, -4.2), tick: [ecl(i * 30 + ay, 8), ecl(i * 30 + ay, -8)] })),
    asterisms: ASTERISMS.map((a) => ({ ...a, lines: (a.lines || []).map((l) => l.map(([ra, dec]) => hv(ra, dec))), ring: a.ring && Array.from({ length: 25 }, (_, k) => { const t = (k / 24) * 2 * Math.PI; return hv(a.ring[0] + (a.ring[2] * Math.cos(t)) / Math.cos((a.ring[1] * Math.PI) / 180), a.ring[1] + a.ring[2] * Math.sin(t)); }), at: hv(...(a.glow || (a.ring ? a.ring.slice(0, 2) : a.lines[0][Math.floor(a.lines[0].length / 2)]))) })),
    naks: NAKSHATRA_INFO.map((n, i) => ({ ent: `nak:${n.name}`, i, tick: [ecl(i * NAK_SPAN + ay, -1.5), ecl(i * NAK_SPAN + ay, -11)], star: hv(YOGATARAS[i][0], YOGATARAS[i][1]), m: YOGATARAS[i][2] })),
    bodies: [
      ...BODIES.filter((b) => pos[posKey(b)] != null).map((b) => ({ ent: `planet:${b}`, b, v: ecl(pos[posKey(b)]) })),
      ...(houses ? Object.entries(ANGLES).map(([n, a]) => ({ ent: `angle:${n}`, b: n, v: ecl(houses[a.key]) })) : []),
    ],
    polaris: { v: hv(...POLARIS.at), pointers: POLARIS.pointers.map(([ra, dec]) => hv(ra, dec)) },
    horizon: Array.from({ length: 91 }, (_, i) => { const a = (i * 4 * Math.PI) / 180; return [Math.cos(a), Math.sin(a), 0]; }),
    cardinals: [['N', [1, 0, 0.004]], ['E', [0, 1, 0.004]], ['S', [-1, 0, 0.004]], ['W', [0, -1, 0.004]]],
  };
  // Where each symbol sits on this sky, for flying to it and drawing its ties.
  const at = {};
  scene.bodies.forEach((b) => { at[b.ent] = b.v; });
  scene.figs.forEach((f) => { if (f.ent && f.at) at[f.ent] = f.at; });
  scene.signs.forEach((s) => { at[s.ent] = s.label; });
  scene.asterisms.forEach((a) => { at[`ast:${a.name}`] = a.at; });
  at['star:Polaris'] = scene.polaris.v;
  at['sym:Yellow Dragon'] = scene.polaris.v;
  scene.naks.forEach((n) => { at[n.ent] = n.star; });
  scene.xiu.forEach((x) => { at[x.ent] = x.at; });
  for (const name of Object.keys(FOUR_SYMBOLS)) {
    const vs = scene.xiu.filter((x) => ENTITIES[x.ent].links.some((l) => l.to === `sym:${name}`)).map((x) => x.at);
    if (vs.length) { const m = [0, 1, 2].map((k) => vs.reduce((s, v) => s + v[k], 0)); const L = Math.hypot(...m) || 1; at[`sym:${name}`] = m.map((c) => c / L); }
  }
  scene.at = at;
  return scene;
}

function drawSky(cv, scene, view, shown, lit, focus, hitsOut, hoverName) {
  const dpr = window.devicePixelRatio || 1;
  const w = cv.clientWidth, h = cv.clientHeight;
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  const g = cv.getContext('2d');
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.fillStyle = '#06050D';
  g.fillRect(0, 0, w, h);
  const { project } = camera(view.alt, view.az, view.h, w, h);
  const s = Math.sqrt(Math.max(0.8, Math.min(3, 90 / view.h)));
  const dim = (v) => (v[2] < 0 ? 0.32 : 1);
  const hits = [];
  const poly = (pts, style, width, glow) => {
    g.beginPath();
    let pen = false;
    for (const v of pts) {
      const p = project(v);
      if (!p) { pen = false; continue; }
      if (pen) g.lineTo(p[0], p[1]); else { g.moveTo(p[0], p[1]); pen = true; }
    }
    g.strokeStyle = style; g.lineWidth = width;
    if (glow) { g.shadowColor = style; g.shadowBlur = glow; }
    g.stroke();
    g.shadowBlur = 0;
  };
  const text = (str, p, colour, size, font = 'serif', align = 'center') => {
    g.font = `${size}px ${font === 'serif' ? "'Cormorant Garamond', Georgia, serif" : "'DM Sans', system-ui, sans-serif"}`;
    g.textAlign = align; g.textBaseline = 'middle'; g.fillStyle = colour;
    g.fillText(str, p[0], p[1]);
  };

  // A faint glow along the horizon, so up and down read at a glance.
  const hz = scene.horizon.map(project);
  if (hz.some(Boolean)) poly(scene.horizon, 'rgba(234,223,196,.28)', 1);

  // Western figures
  if (shown.const) {
    for (const f of scene.figs) {
      const on = f.ent && lit(f.ent);
      // The figure itself, drawn over its stars while it is touched or open.
      if (f.art.length && (on || f.name === hoverName)) for (const ln of f.art) poly(ln, `rgba(${INK.gold},0.85)`, 1.4, 8);
      const a = on ? 0.9 : f.ent ? 0.3 : 0.14;
      for (const ln of f.lines) {
        poly(ln, `rgba(${INK.fig},${a})`, on ? 1.3 : 0.8, on ? 10 : 0);
        for (let i = 1; i < ln.length; i++) {
          const p0 = project(ln[i - 1]), p1 = project(ln[i]);
          if (p0 && p1) hits.push({ seg: [p0[0], p0[1], p1[0], p1[1]], id: f.ent, name: f.name });
        }
      }
      if (on) for (const ln of f.lines) for (const v of ln) { const p = project(v); if (p) { g.beginPath(); g.arc(p[0], p[1], 2.4 * s, 0, 7); g.fillStyle = '#FFF8E6'; g.shadowColor = '#FFE9B0'; g.shadowBlur = 12; g.fill(); g.shadowBlur = 0; } }
      const pa = f.at && project(f.at);
      if (pa && (f.ent || view.h < 45)) {
        text(f.ent ? f.name.toUpperCase() : f.name, pa, `rgba(${INK.fig},${on ? 0.95 : f.ent ? 0.5 : 0.32})`, (f.ent ? 11 : 10) * Math.min(s, 1.4), 'sans');
        if (f.ent) hits.push({ x: pa[0], y: pa[1], r: 16, id: f.ent });
      }
    }
  }

  // Named asterisms: shown zoomed in, or with their constellation
  if (shown.const) {
    const figOn = (id) => scene.figs.some((f) => f.id === id && ((f.ent && lit(f.ent)) || f.name === hoverName));
    for (const a of scene.asterisms) {
      const on = lit(`ast:${a.name}`) || a.name === hoverName;
      if (!(view.h < 40 || on || (a.fig && figOn(a.fig)))) continue;
      const ink = `rgba(255,236,190,${on ? 0.95 : 0.7})`;
      for (const ln of a.lines) poly(ln, ink, on ? 2 : 1.5, on ? 12 : 6);
      if (a.ring) poly(a.ring, ink, 1, on ? 10 : 4);
      const p = project(a.at);
      if (!p) continue;
      if (a.glow) {
        const r = 14 * Math.min(s, 2);
        const grd = g.createRadialGradient(p[0], p[1], 0, p[0], p[1], r);
        grd.addColorStop(0, 'rgba(255,150,170,.55)'); grd.addColorStop(0.5, 'rgba(150,170,255,.22)'); grd.addColorStop(1, 'rgba(150,170,255,0)');
        g.fillStyle = grd; g.beginPath(); g.arc(p[0], p[1], r, 0, 7); g.fill();
      }
      const [dx, dy, al] = a.lab || (a.glow ? [16, 0, 'left'] : [0, a.ring ? -16 : 12, 'center']);
      text(a.name, [p[0] + dx, p[1] + dy], ink, 10 * Math.min(s, 1.3), 'sans', al);
      hits.push({ x: p[0], y: p[1], r: 14, id: `ast:${a.name}` });
    }
  }

  // Chinese mansions
  if (shown.xiu) {
    for (const x of scene.xiu) {
      const on = lit(x.ent);
      for (const ln of x.lines) poly(ln, `rgba(${INK.xiu},${on ? 0.95 : 0.34})`, on ? 1.3 : 0.8, on ? 10 : 0);
      const p = project(x.at);
      if (p) { text(ENTITIES[x.ent].glyph, [p[0], p[1] - 10], `rgba(${INK.xiu},${on ? 1 : 0.6})`, 15 * Math.min(s, 1.4)); hits.push({ x: p[0], y: p[1] - 10, r: 14, id: x.ent }); }
    }
  }

  // Stars, brightest last so they sit on top
  for (let i = scene.stars.length - 1; i >= 0; i--) {
    const [v, m] = scene.stars[i];
    const p = project(v);
    if (!p) continue;
    const r = Math.max(0.45, (5.6 - m) * 0.48) * s;
    const a = Math.min(1, 0.28 + (5.4 - m) * 0.17) * dim(v);
    g.beginPath(); g.arc(p[0], p[1], r, 0, 7);
    g.fillStyle = `rgba(${INK.star},${a})`;
    if (m < 1.2) { g.shadowColor = 'rgba(255,248,230,.8)'; g.shadowBlur = 6; }
    g.fill(); g.shadowBlur = 0;
  }
  for (const st of scene.named) { const p = project(st.v); if (p) { hits.push({ x: p[0], y: p[1], r: 6, name: st.n }); if (view.h < 40 && st.m < 1.6) text(st.n, [p[0] + 6, p[1] + 9], 'rgba(244,241,237,.42)', 10, 'sans', 'left'); } }

  // Polaris, the North Star: always marked, with the Plough's pointers when it is touched.
  {
    const on = lit('star:Polaris');
    if (on) poly(scene.polaris.pointers, 'rgba(255,236,190,.75)', 1.2, 8);
    const p = project(scene.polaris.v);
    if (p) {
      const r = (on ? 11 : 8) * Math.min(s, 1.6);
      g.save(); g.translate(p[0], p[1]);
      g.strokeStyle = `rgba(255,236,190,${on ? 1 : 0.8})`; g.lineWidth = 1.1; g.shadowColor = '#FFE9B0'; g.shadowBlur = on ? 14 : 8;
      g.beginPath(); for (let k = 0; k < 4; k++) { const t = (k * Math.PI) / 2; g.moveTo(Math.cos(t) * r * 0.35, Math.sin(t) * r * 0.35); g.lineTo(Math.cos(t) * r * 1.6, Math.sin(t) * r * 1.6); } g.stroke();
      g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke();
      g.beginPath(); g.arc(0, 0, 2.6 * s, 0, 7); g.fillStyle = '#FFF8E6'; g.fill();
      g.restore(); g.shadowBlur = 0;
      text('POLARIS · NORTH STAR', [p[0], p[1] + r * 1.6 + 10], `rgba(255,236,190,${on ? 1 : 0.8})`, 11 * Math.min(s, 1.4), 'sans');
      hits.push({ x: p[0], y: p[1], r: 18, id: 'star:Polaris' });
    }
  }

  // The zodiac: the ecliptic, the belt eight degrees either side, twelve signs
  if (shown.sign) {
    poly(scene.beltN, `rgba(${INK.gold},.13)`, 0.7);
    poly(scene.beltS, `rgba(${INK.gold},.13)`, 0.7);
    poly(scene.ecliptic, `rgba(${INK.gold},.55)`, 1);
    for (const sg of scene.signs) {
      const on = lit(sg.ent);
      poly(sg.tick, `rgba(${INK.gold},${on ? 0.7 : 0.28})`, 0.8);
      if (on) { poly(sg.n, `rgba(${INK.gold},.75)`, 1.2, 8); poly(sg.s, `rgba(${INK.gold},.75)`, 1.2, 8); }
      const p = project(sg.label);
      if (p) {
        if (on) { g.shadowColor = SIGN_COL[SIGNS[sg.i]]; g.shadowBlur = 14; }
        if (!drawSigil(g, sg.ent, p[0], p[1], 15 * Math.min(s, 1.5), SIGN_COL[SIGNS[sg.i]])) text(SIGN_SYM[sg.i], p, SIGN_COL[SIGNS[sg.i]], 17 * Math.min(s, 1.5));
        g.shadowBlur = 0;
        hits.push({ x: p[0], y: p[1], r: 13, id: sg.ent });
      }
    }
  }

  // The sidereal zodiac: the rashis, set back by the ayanamsa, named south of the ecliptic
  if (shown.sid) {
    for (const sg of scene.sid) {
      const on = lit(sg.ent);
      poly(sg.tick, `rgba(${INK.nak},${on ? 0.8 : 0.35})`, 0.8);
      const p = project(sg.label);
      if (p) {
        text(RASHI_INFO[sg.i].name, p, `rgba(${INK.nak},${on ? 1 : 0.7})`, (on ? 12 : 10.5) * Math.min(s, 1.4), 'sans');
        hits.push({ x: p[0], y: p[1], r: 14, id: sg.ent });
      }
    }
  }

  // Nakshatras: their divisions south of the ecliptic and the junction star of each
  if (shown.nak) {
    for (const n of scene.naks) {
      const on = lit(n.ent);
      poly(n.tick, `rgba(${INK.nak},${on ? 0.8 : 0.3})`, 0.8);
      const p = project(n.star);
      if (!p) continue;
      g.beginPath(); g.arc(p[0], p[1], (on ? 7 : 5) * Math.min(s, 1.5), 0, 7);
      g.strokeStyle = `rgba(${INK.nak},${on ? 1 : 0.6})`; g.lineWidth = on ? 1.4 : 0.9;
      if (on) { g.shadowColor = `rgb(${INK.nak})`; g.shadowBlur = 12; }
      g.stroke(); g.shadowBlur = 0;
      if (on || view.h < 55) text(on ? NAKSHATRA_INFO[n.i].name : String(n.i + 1), [p[0], p[1] + 13 * Math.min(s, 1.5)], `rgba(${INK.nak},${on ? 1 : 0.7})`, (on ? 12 : 10) * Math.min(s, 1.3), 'sans');
      hits.push({ x: p[0], y: p[1], r: 10, id: n.ent });
    }
  }

  // Ties from the symbol in focus to whatever of its correspondences is on the sky
  if (focus && scene.at[focus]) {
    const fp = project(scene.at[focus]);
    if (fp) {
      g.setLineDash([2, 5]);
      for (const l of ENTITIES[focus].links) {
        const v = scene.at[l.to]; const p = v && project(v);
        if (!p) continue;
        g.beginPath(); g.moveTo(fp[0], fp[1]); g.lineTo(p[0], p[1]);
        g.strokeStyle = 'rgba(234,223,196,.42)'; g.lineWidth = 1; g.stroke();
      }
      g.setLineDash([]);
    }
  }

  // The ground: the horizon projects to a circle, and whichever side of it
  // the zenith is not on is below the observer.
  const q = [[1, 0, 0], [0, 1, 0], [-1, 0, 0]].map((v) => project(v, true));
  const zen = project([0, 0, 1], true);
  if (q.every(Boolean)) {
    const [[ax, ay], [bx, by], [cx, cy]] = q;
    const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    if (Math.abs(d) > 1e-6) {
      const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
      const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;
      const r = Math.hypot(ax - ux, ay - uy);
      const zenInside = !zen || Math.hypot(zen[0] - ux, zen[1] - uy) < r;
      g.beginPath();
      if (zenInside) g.rect(0, 0, w, h);
      g.arc(ux, uy, r, 0, Math.PI * 2);
      g.fillStyle = 'rgba(14,10,8,.42)';
      g.fill(zenInside ? 'evenodd' : 'nonzero');
    }
  }

  for (const [c, v] of scene.cardinals) { const p = project(v); if (p) text(c, [p[0], p[1] + 12], 'rgba(234,223,196,.6)', 12, 'sans'); }
  // The bodies, last of all so they sit in front of every other layer and are easiest to touch
  for (const b of scene.bodies) {
    const p = project(b.v);
    if (!p) continue;
    const e = ENTITIES[b.ent], on = lit(b.ent), size = BODY_SIZE[b.b];
    if (size) {
      g.beginPath(); g.arc(p[0], p[1], size * Math.min(s, 1.6), 0, 7);
      g.fillStyle = e.colour; g.globalAlpha = dim(b.v);
      g.shadowColor = e.colour; g.shadowBlur = (b.b === 'Sun' ? 22 : 8) + (on ? 12 : 0);
      g.fill(); g.shadowBlur = 0; g.globalAlpha = 1;
    }
    if (on) { g.beginPath(); g.arc(p[0], p[1], (size || 4) * Math.min(s, 1.6) + 7, 0, 7); g.strokeStyle = e.colour; g.lineWidth = 1; g.stroke(); }
    const gp = [p[0] + (size ? 11 : 0), p[1] - (size ? 10 : 0)];
    if (!drawSigil(g, b.ent, gp[0], gp[1], 13 * Math.min(s, 1.4), e.colour)) text(e.glyph, gp, e.colour, (e.glyph.length > 1 ? 11 : 15) * Math.min(s, 1.4), e.glyph.length > 1 ? 'sans' : 'serif');
    hits.push({ x: p[0], y: p[1], r: 16, id: b.ent, top: true });
  }
  hitsOut.current = hits;
}

export default function SymbolMapTab({ ctx = {} }) {
  const { res, A } = ctx;

  // The moment and place: the cast chart's, or now over the form's place.
  const moment = useMemo(() => {
    const lat = A?.lat ?? 51.5, lon = A?.lon ?? -0.1;
    if (res) return { jd: res.jd, lat, lon, pos: res.trop, ay: ayanamsa(res.jd), houses: res.houses, aspects: res.aspects, cn: res.cn, label: 'In this chart' };
    const d = new Date();
    const jd = julianDay(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate(), d.getUTCHours() + d.getUTCMinutes() / 60);
    return { jd, lat, lon, pos: allPlanets(jd), ay: ayanamsa(jd), label: 'In the sky now' };
  }, [res, A?.lat, A?.lon]);
  const sky = { ...moment, year: 2000 + (moment.jd - 2451545) / 365.25 };
  const scene = useMemo(() => buildScene(moment), [moment]);

  const [shown, setShown] = useState({ const: true, sign: true, sid: false, nak: true, xiu: false });
  const [view, setView] = useState({ alt: 90, az: 180, h: 92 });
  const [hover, setHover] = useState(null);
  const [mode, setMode] = useState('symbol');
  const [focus, setFocus] = useState(idFromHash);
  const [trail, setTrail] = useState(() => (idFromHash() ? [idFromHash()] : []));
  const cvRef = useRef(null), hitsRef = useRef([]), viewRef = useRef(view), flight = useRef(0), panelRef = useRef(null);
  viewRef.current = view;

  const related = useMemo(() => {
    const ids = new Set();
    for (const id of [hover?.id, focus]) if (id && ENTITIES[id]) ENTITIES[id].links.forEach((l) => ids.add(l.to));
    return ids;
  }, [hover, focus]);
  const lit = useCallback((id) => id === hover?.id || id === focus || related.has(id), [hover, focus, related]);

  // Draw on every change, and on resize
  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const paint = () => drawSky(cv, scene, view, shown, lit, focus, hitsRef, hover?.id ? null : hover?.name);
    paint();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(paint) : null;
    ro?.observe(cv);
    return () => ro?.disconnect();
  }, [scene, view, shown, lit, focus, hover]);

  const flyTo = useCallback((id) => {
    const v = scene.at[id];
    if (!v) return;
    const [alt, az] = altAz(v);
    const kind = ENTITIES[id].kind;
    const target = { alt: Math.max(alt, -60), az, h: kind === 'planet' || kind === 'nak' || kind === 'star' ? 34 : kind === 'ast' ? 22 : 46 };
    const from = viewRef.current;
    if (reduced()) { setView(target); return; }
    const dAz = ((target.az - from.az + 540) % 360) - 180;
    const t0 = performance.now(), id0 = ++flight.current, dur = 750;
    const step = (t) => {
      if (id0 !== flight.current) return;
      const k = easeInOut(Math.min(1, (t - t0) / dur));
      setView({ alt: from.alt + (target.alt - from.alt) * k, az: norm(from.az + dAz * k), h: from.h + (target.h - from.h) * k });
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [scene]);

  const syncHash = (id) => {
    const h = id ? `#symbols/${encodeURIComponent(id)}` : '#symbols';
    if (window.location.hash !== h) history.replaceState(null, '', h);
  };
  const open = useCallback((id, fresh) => {
    if (!ENTITIES[id]) return;
    setFocus(id);
    setTrail((t) => (fresh ? [id] : [...t.slice(0, t.includes(id) ? t.indexOf(id) : t.length), id]));
    syncHash(id);
    flyTo(id);
  }, [flyTo]);
  const clear = useCallback(() => { setFocus(null); setTrail([]); syncHash(null); }, []);

  // Open a symbol named in the link once the sky is ready
  useEffect(() => { if (focus) flyTo(focus); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const onHash = () => { const id = idFromHash(); if (id && id !== focus) open(id, true); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [focus, open]);

  // Pointer: drag to turn the sky, pinch or wheel to zoom, tap to choose
  const ptr = useRef({ pts: new Map(), start: null, moved: false });
  const pick = (x, y) => {
    let best = null, bd = Infinity;
    // A planet or angle under the finger wins over the lines and labels behind it.
    for (const t of hitsRef.current) {
      if (!t.top) continue;
      const d = Math.hypot(x - t.x, y - t.y) - t.r;
      if (d < bd && d < 8) { bd = d; best = t; }
    }
    if (best) return { id: best.id, name: ENTITIES[best.id]?.name };
    for (const t of hitsRef.current) {
      const d = t.seg ? segDist(x, y, ...t.seg) + 4 : Math.hypot(x - t.x, y - t.y) - t.r;
      if (d < bd && d < (t.seg ? 9 : 6)) { bd = d; best = t; }
    }
    return best ? { id: best.id || null, name: best.name || ENTITIES[best.id]?.name } : null;
  };
  const local = (e) => { const r = cvRef.current.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const onDown = (e) => {
    cvRef.current.setPointerCapture?.(e.pointerId);
    ptr.current.pts.set(e.pointerId, local(e));
    ptr.current.start = { p: local(e), view: viewRef.current, dist: null };
    ptr.current.moved = false;
    flight.current++;
  };
  const onMove = (e) => {
    const P = ptr.current, xy = local(e);
    if (!P.pts.has(e.pointerId)) { const hit = pick(...xy); setHover((h) => (h?.id === hit?.id && h?.name === hit?.name ? h : hit)); return; }
    P.pts.set(e.pointerId, xy);
    const v0 = P.start.view;
    if (P.pts.size === 2) {
      const [a, b] = [...P.pts.values()];
      const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      if (!P.start.dist) P.start.dist = d;
      setView({ ...viewRef.current, h: Math.max(6, Math.min(110, v0.h * (P.start.dist / d))) });
      P.moved = true;
      return;
    }
    const dx = xy[0] - P.start.p[0], dy = xy[1] - P.start.p[1];
    if (!P.moved && Math.hypot(dx, dy) < 4) return;
    P.moved = true;
    const cv = cvRef.current;
    const { dpp } = camera(v0.alt, v0.az, v0.h, cv.clientWidth, cv.clientHeight);
    const alt = Math.max(-60, Math.min(90, v0.alt + dy * dpp));
    setView({ ...v0, alt, az: norm(v0.az - (dx * dpp) / Math.max(0.35, Math.cos((alt * Math.PI) / 180))) });
  };
  const onUp = (e) => {
    const P = ptr.current;
    P.pts.delete(e.pointerId);
    if (!P.moved && P.pts.size === 0) { const hit = pick(...local(e)); if (hit?.id) open(hit.id, !focus); }
  };
  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const onWheel = (e) => { e.preventDefault(); flight.current++; setView((v) => ({ ...v, h: Math.max(6, Math.min(110, v.h * Math.exp(e.deltaY * 0.0012))) })); };
    cv.addEventListener('wheel', onWheel, { passive: false });
    return () => cv.removeEventListener('wheel', onWheel);
  }, []);
  const onKey = (e) => {
    const step = { ArrowLeft: [0, -6], ArrowRight: [0, 6], ArrowUp: [6, 0], ArrowDown: [-6, 0] }[e.key];
    if (step) { e.preventDefault(); setView((v) => ({ ...v, alt: Math.max(-60, Math.min(90, v.alt + step[0])), az: norm(v.az + step[1]) })); }
    else if (e.key === '+' || e.key === '=') setView((v) => ({ ...v, h: Math.max(6, v.h / 1.25) }));
    else if (e.key === '-') setView((v) => ({ ...v, h: Math.min(110, v.h * 1.25) }));
    else if (e.key === 'Escape') clear();
  };

  const when = new Date((moment.jd - 2440587.5) * 86400000);
  const place = `${Math.abs(moment.lat).toFixed(1)}°${moment.lat >= 0 ? 'N' : 'S'} ${Math.abs(moment.lon).toFixed(1)}°${moment.lon >= 0 ? 'E' : 'W'}`;
  const hv = hover?.id ? ENTITIES[hover.id] : null;

  return (
    <div className="sm">
      <div className="sm-toolbar" role="group" aria-label="Traditions shown">
        {OVERLAYS.map((o) => (
          <button key={o.id} type="button" className="sge-chip" aria-pressed={shown[o.id]} title={o.note}
            onClick={() => setShown((s) => ({ ...s, [o.id]: !s[o.id] }))}>{o.label}</button>
        ))}
      </div>

      <div className="sm-grid">
        <div className="sm-skywrap">
          <canvas ref={cvRef} className="sm-sky" tabIndex={0} role="img"
            aria-label={`The sky over ${place} on ${when.toUTCString().slice(5, 22)} UT. Drag or use the arrow keys to look round, plus and minus to zoom. Choose symbols from the list beside it.`}
            onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
            onPointerLeave={() => setHover(null)} onKeyDown={onKey} />
          <div className="sm-controls">
            <button type="button" className="sm-ctl" onClick={() => { flight.current++; setView({ alt: 90, az: 180, h: 92 }); }}>Look up</button>
            <button type="button" className="sm-ctl" aria-label="Zoom in" onClick={() => setView((v) => ({ ...v, h: Math.max(6, v.h / 1.3) }))}>+</button>
            <button type="button" className="sm-ctl" aria-label="Zoom out" onClick={() => setView((v) => ({ ...v, h: Math.min(110, v.h * 1.3) }))}>−</button>
          </div>
          <p className="sm-where">{moment.label === 'In this chart' ? 'The chart\'s sky' : 'The sky now'} over {place}, {when.toUTCString().slice(5, 22)} UT</p>
        </div>

        <aside className="sm-panel" ref={panelRef} tabIndex={-1} aria-live="polite">
          {focus ? <FocusPanel id={focus} trail={trail} sky={sky} mode={mode} setMode={setMode} onOpen={(id) => open(id, false)} onBack={clear} />
            : <IntroPanel hover={hover} hv={hv} onOpen={(id) => open(id, true)} />}
        </aside>
      </div>
    </div>
  );
}

function IntroPanel({ hover, hv, onOpen }) {
  return (
    <>
      {hover ? (
        <div className="sm-hover">
          {hv ? <><SymbolPlate ent={hv} size={96} /><h2><Sigil ent={hv} /> {hv.name}</h2><p className="sm-kind">{hv.kindLabel}</p>{essenceOf(hv)?.core && <p className="sm-core-word" style={{ '--c': hv.colour }}>{essenceOf(hv).core}</p>}<p className="sm-essence">{hv.essence}</p></>
            : <><h2>{hover.name}</h2><p className="sm-kind">{FIGURE_NOTE[hover.name]?.[0] || 'Star or figure'}</p>{FIGURE_NOTE[hover.name] && <p className="sm-essence">{FIGURE_NOTE[hover.name][1]}</p>}</>}
        </div>
      ) : (
        <div className="sm-hover">
          <h2>The sky, read five ways</h2>
          <p className="sm-essence">Each tradition divides the same sky differently. Switch them on and off above; touch a figure, sign, mansion or planet to follow what the traditions tie to it.</p>
        </div>
      )}
      <details className="sm-index">
        <summary>Every symbol, by kind</summary>
        {KIND_ORDER.map(({ kind, label }) => (
          <div key={kind} className="sm-index-group">
            <h3>{label}</h3>
            <div className="sm-index-row">
              {Object.values(ENTITIES).filter((e) => e.kind === kind).map((e) => (
                <button key={e.id} type="button" className="sge-chip" onClick={() => onOpen(e.id)}>
                  <Sigil ent={e} /> {e.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </details>
    </>
  );
}

function FocusPanel({ id, trail, sky, mode, setMode, onOpen, onBack }) {
  const e = ENTITIES[id];
  const line = chartLine(e, sky);
  const es = essenceOf(e);
  return (
    <div className="sm-focus" key={id}>
      <nav className="sm-trail" aria-label="Path through the map">
        <button type="button" className="sm-crumb" onClick={onBack}>Sky</button>
        {trail.map((t, i) => (
          <span key={t + i}>
            <span aria-hidden="true" className="sm-sep">›</span>
            {i === trail.length - 1
              ? <span className="sm-crumb sm-crumb-on" aria-current="page">{ENTITIES[t].name}</span>
              : <button type="button" className="sm-crumb" onClick={() => onOpen(t)}>{ENTITIES[t].name}</button>}
          </span>
        ))}
      </nav>
      <div className="sm-head">
        <SymbolPlate ent={e} />
        <div>
          <h2><Sigil ent={e} /> {e.name}</h2>
          <p className="sm-kind">{e.kindLabel}</p>
        </div>
      </div>
      <div className="sm-modes" role="group" aria-label="Read it as">
        <button type="button" className="sm-mode" aria-pressed={mode === 'symbol'} onClick={() => setMode('symbol')}>What it is</button>
        <button type="button" className="sm-mode" aria-pressed={mode === 'ties'} onClick={() => setMode('ties')}>How it ties in</button>
      </div>
      {mode === 'symbol' ? (
        <div className="sm-symbolism">
          {es?.core && <p className="sm-core-word" style={{ '--c': e.colour }}>{es.core}</p>}
          <p className="sm-essence">{es?.core && e.essence.toLowerCase().startsWith(es.core.toLowerCase() + '.') ? e.essence.slice(es.core.length + 1).trim() : e.essence}</p>
          {es?.keys?.length > 0 && <p className="sm-keys">{es.keys.join(' · ')}</p>}
          {(es?.rep?.length > 0 || e.attrs.length > 0) && (
            <dl className="sm-attrs">
              {[...(es?.rep || []), ...e.attrs.filter(([k]) => !(es?.rep || []).some(([r]) => r === k))].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          )}
          {es?.myth && <><h3>The story</h3><p className="sm-myth">{es.myth}</p></>}
          {e.links.length > 0 && <button type="button" className="sge-chip sm-switch" onClick={() => setMode('ties')}>How it ties in: {e.links.length} {e.links.length === 1 ? "correspondence" : "correspondences"}</button>}
        </div>
      ) : (
      <>
      {line && <p className="sm-chartline">{line}</p>}
      <h3>Tied to it</h3>
      <ul className="sm-links">
        {e.links.map((l, i) => {
          const t = ENTITIES[l.to];
          return (
            <li key={l.to + l.rel} style={{ '--d': `${i * 40}ms` }}>
              <button type="button" onClick={() => onOpen(l.to)}>
                <span className="sm-rel">{l.rel}</span>
                <span className="sm-link-name"><Sigil ent={t} /> {t.name}</span>
                <span className="sm-link-ess">{t.essence}</span>
              </button>
            </li>
          );
        })}
      </ul>
      </>
      )}
      <button type="button" className="sge-chip sm-back" onClick={onBack}>Back to the whole sky</button>
    </div>
  );
}
