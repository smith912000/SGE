import { norm } from '../utils/helpers.js';
import { ASPECTS } from '../data/astrology/aspects.js';

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

function julianDay(year, month, day, hour = 0) {
  if (month <= 2) { year--; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25*(year+4716)) + Math.floor(30.6001*(month+1)) + day + hour/24 + B - 1524.5;
}

function sunLon(jd) {
  const T  = (jd - 2451545) / 36525;
  const L0 = norm(280.46646 + 36000.76983*T + 0.0003032*T*T);
  const M  = norm(357.52911 + 35999.05029*T - 0.0001537*T*T);
  const Mr = M * RAD;
  const C  = (1.9146 - 0.004817*T - 0.000014*T*T)*Math.sin(Mr)
           + (0.019993 - 0.000101*T)*Math.sin(2*Mr)
           + 0.000289*Math.sin(3*Mr);
  const om = 125.04 - 1934.136*T;
  return norm(L0 + C - 0.00569 - 0.00478*Math.sin(om*RAD));
}

function moonLon(jd) {
  const T  = (jd - 2451545) / 36525;
  const Lp = norm(218.3165 + 481267.8813*T);
  const M  = norm(357.5291 + 35999.0503*T);
  const Mp = norm(134.9634 + 477198.8676*T);
  const D  = norm(297.8502 + 445267.1115*T);
  const F  = norm(93.2721  + 483202.0175*T);
  return norm(Lp
    + 6.2888*Math.sin(Mp*RAD) + 1.2740*Math.sin((2*D-Mp)*RAD)
    + 0.6583*Math.sin(2*D*RAD) + 0.2136*Math.sin(2*Mp*RAD)
    - 0.1851*Math.sin(M*RAD)  - 0.1143*Math.sin(2*F*RAD)
    + 0.0588*Math.sin((2*D-2*Mp)*RAD)
    + 0.0572*Math.sin((2*D-M-Mp)*RAD)
    + 0.0533*Math.sin((2*D+Mp)*RAD)
    + 0.0459*Math.sin((2*D-M)*RAD)
    + 0.0410*Math.sin((Mp-M)*RAD)
    - 0.0341*Math.sin(D*RAD)
    - 0.0304*Math.sin((Mp+M)*RAD)
    - 0.0154*Math.sin((2*D-2*F)*RAD));
}

function nodeLon(jd) {
  const T = (jd - 2451545) / 36525;
  return norm(125.0445479 - 1934.1362891*T + 0.0020754*T*T + 0.00000215*T*T*T);
}

function lilithLon(jd) {
  const T = (jd - 2451545) / 36525;
  return norm(83.3532465 + 4069.0137287*T - 0.01032*T*T);
}

/* ── Keplerian orbital elements at J2000.0 and rates per century ──
   Source: Standish (1992) / Meeus "Astronomical Algorithms"
   [a(AU), e, i(deg), L(deg), longPeri(deg), longNode(deg)] */
const KEPLER = {
  Mercury: {
    a:[0.38709927, 0.00000037], e:[0.20563593, 0.00001906],
    I:[7.00497902,-0.00594749], L:[252.25032350,149472.67411175],
    w:[77.45779628, 0.16047689], O:[48.33076593,-0.12534081]
  },
  Venus: {
    a:[0.72333566, 0.00000390], e:[0.00677672,-0.00004107],
    I:[3.39467605,-0.00078890], L:[181.97909950, 58517.81538729],
    w:[131.60246718,0.00268329], O:[76.67984255,-0.27769418]
  },
  Mars: {
    a:[1.52371034, 0.00001847], e:[0.09339410, 0.00007882],
    I:[1.84969142,-0.00813131], L:[355.44656456, 19140.30268499],
    w:[336.05637041,0.44441088], O:[49.55953891,-0.29257343]
  },
  Jupiter: {
    a:[5.20288700,-0.00011607], e:[0.04838624,-0.00013253],
    I:[1.30439695,-0.00183714], L:[34.39644051, 3034.74612775],
    w:[14.72847983, 0.21252668], O:[100.47390909,0.20469106]
  },
  Saturn: {
    a:[9.53667594,-0.00125060], e:[0.05386179,-0.00050991],
    I:[2.48599187, 0.00193609], L:[49.95424423, 1222.49362201],
    w:[92.59887831,-0.41897216], O:[113.66242448,-0.28867794]
  },
  Uranus: {
    a:[19.18916464,-0.00196176], e:[0.04725744,-0.00004397],
    I:[0.77263783,-0.00242939], L:[313.23810451, 428.48202785],
    w:[170.95427630,0.40805281], O:[74.01692503, 0.04240589]
  },
  Neptune: {
    a:[30.06992276, 0.00026291], e:[0.00859048, 0.00005105],
    I:[1.77004347, 0.00035372], L:[304.87997031, 218.45945325],
    w:[44.96476227,-0.32241464], O:[131.78422574,-0.00508664]
  },
  Pluto: {
    a:[39.48211675,-0.00031596], e:[0.24882730, 0.00005170],
    I:[17.14001206, 0.00004818], L:[238.92903833, 145.20780515],
    w:[224.06891629,-0.04062942], O:[110.30393684,-0.01183482]
  },
};

function solveKepler(M, e, tol = 1e-8) {
  let E = M;
  for (let i = 0; i < 30; i++) {
    const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    E -= dE;
    if (Math.abs(dE) < tol) break;
  }
  return E;
}

function helioToGeo(helioLon, helioLat, helioR, sunLonDeg) {
  const sLon = sunLonDeg * RAD;
  const earthR = 1.00014;
  const hLon = helioLon * RAD;
  const hR = helioR;
  const x = hR * Math.cos(hLon) + earthR * Math.cos(sLon);
  const y = hR * Math.sin(hLon) + earthR * Math.sin(sLon);
  return norm(Math.atan2(y, x) * DEG);
}

function planetLon(jd, name) {
  const T = (jd - 2451545) / 36525;
  const k = KEPLER[name];
  if (!k) return 0;

  const a = k.a[0] + k.a[1] * T;
  const e = k.e[0] + k.e[1] * T;
  const I = k.I[0] + k.I[1] * T;
  const L = norm(k.L[0] + k.L[1] * T);
  const w = k.w[0] + k.w[1] * T;
  const O = k.O[0] + k.O[1] * T;

  const omega = w - O;
  const M = norm(L - w) * RAD;
  const E = solveKepler(M, e);

  const xOr = a * (Math.cos(E) - e);
  const yOr = a * Math.sqrt(1 - e*e) * Math.sin(E);

  const cosO = Math.cos(O * RAD), sinO = Math.sin(O * RAD);
  const cosI = Math.cos(I * RAD), sinI = Math.sin(I * RAD);
  const cosW = Math.cos(omega * RAD), sinW = Math.sin(omega * RAD);

  const Px = cosO*cosW - sinO*sinW*cosI;
  const Py = sinO*cosW + cosO*sinW*cosI;
  const Qx = -cosO*sinW - sinO*cosW*cosI;
  const Qy = -sinO*sinW + cosO*cosW*cosI;

  const xEcl = xOr*Px + yOr*Qx;
  const yEcl = xOr*Py + yOr*Qy;

  const helioLon = norm(Math.atan2(yEcl, xEcl) * DEG);
  const helioR = Math.sqrt(xEcl*xEcl + yEcl*yEcl);

  return helioToGeo(helioLon, 0, helioR, sunLon(jd));
}

function chironLon(jd) {
  const T = (jd - 2451545) / 36525;
  const a = 13.648;
  const e = 0.3786 + 0.00001 * T;
  const I = 6.926;
  const L = norm(209.37 + 7073.469 * T);
  const w = 339.55 + 1.42 * T;
  const O = 209.21 - 0.64 * T;

  const omega = w - O;
  const M = norm(L - w) * RAD;
  const E = solveKepler(M, e);

  const xOr = a * (Math.cos(E) - e);
  const yOr = a * Math.sqrt(1 - e*e) * Math.sin(E);

  const cosO = Math.cos(O * RAD), sinO = Math.sin(O * RAD);
  const cosI = Math.cos(I * RAD), sinI = Math.sin(I * RAD);
  const cosW = Math.cos(omega * RAD), sinW = Math.sin(omega * RAD);

  const Px = cosO*cosW - sinO*sinW*cosI;
  const Py = sinO*cosW + cosO*sinW*cosI;
  const Qx = -cosO*sinW - sinO*cosW*cosI;
  const Qy = -sinO*sinW + cosO*cosW*cosI;

  const xEcl = xOr*Px + yOr*Qx;
  const yEcl = xOr*Py + yOr*Qy;

  const helioLon = norm(Math.atan2(yEcl, xEcl) * DEG);
  const helioR = Math.sqrt(xEcl*xEcl + yEcl*yEcl);

  return helioToGeo(helioLon, 0, helioR, sunLon(jd));
}

function allPlanets(jd) {
  return {
    Sun: sunLon(jd), Moon: moonLon(jd),
    Mercury: planetLon(jd, "Mercury"), Venus: planetLon(jd, "Venus"),
    Mars: planetLon(jd, "Mars"), Jupiter: planetLon(jd, "Jupiter"),
    Saturn: planetLon(jd, "Saturn"), Uranus: planetLon(jd, "Uranus"),
    Neptune: planetLon(jd, "Neptune"), Pluto: planetLon(jd, "Pluto"),
    Chiron: chironLon(jd), Node: nodeLon(jd), Lilith: lilithLon(jd),
  };
}

function calcAsc(jd, lat, lon) {
  const T    = (jd - 2451545) / 36525;
  const GMST = norm(280.46061837 + 360.98564736629*(jd-2451545) + 0.000387933*T*T);
  const LMST = norm(GMST + lon);
  const eps  = 23.439291 - 0.013004*T;
  const a    = Math.atan2(Math.cos(LMST*RAD),
    -(Math.sin(LMST*RAD)*Math.cos(eps*RAD) + Math.tan(lat*RAD)*Math.sin(eps*RAD)));
  return norm(a*DEG);
}

function calcMC(jd, lon) {
  const T    = (jd - 2451545) / 36525;
  const RAMC = norm(280.46061837 + 360.98564736629*(jd-2451545) + 0.000387933*T*T + lon);
  const eps  = 23.439291 - 0.013004*T;
  return norm(Math.atan2(Math.sin(RAMC*RAD)*Math.cos(eps*RAD), Math.cos(RAMC*RAD)) * DEG);
}

function calcHouses(jd, lat, lon) {
  const asc = calcAsc(jd, lat, lon);
  const mc  = calcMC(jd, lon);
  const h   = {};
  for (let i=1;i<=12;i++) h[i] = norm(asc+(i-1)*30);
  h.ASC=asc; h.MC=mc; h.IC=norm(mc+180); h.DSC=norm(asc+180);
  return h;
}

function calcAspects(pos) {
  const ks  = Object.keys(pos);
  const out = [];
  for (let i=0;i<ks.length;i++) for (let j=i+1;j<ks.length;j++) {
    const d = Math.abs(pos[ks[i]]-pos[ks[j]]);
    const a = d>180?360-d:d;
    for (const def of ASPECTS) {
      const orb = Math.abs(a-def.angle);
      if (orb<=def.orb) out.push({ p1:ks[i], p2:ks[j], ...def, orb:orb.toFixed(2), strength:1-orb/def.orb });
    }
  }
  return out.sort((a,b)=>b.strength-a.strength);
}

const ayanamsa  = jd => 23.85 + 0.013004*((jd-2451545)/36525)*100;
const harmonic  = (pos, n) => Object.fromEntries(Object.entries(pos).map(([k,v])=>[k,norm(v*n)]));
const progChart = (nJD, age) => allPlanets(nJD+age);
const angSep = (a, b) => {
  const d = Math.abs(norm(a) - norm(b));
  return d > 180 ? 360 - d : d;
};

function findSolarReturn(natalSun, year) {
  const base = julianDay(year,1,1,0);
  for (let i=0;i<3660;i++) {
    const jd = base+i*0.1;
    if (angSep(sunLon(jd), natalSun) < 0.05) return jd;
  }
  return null;
}

function findLunarReturn(natalMoon, jdStart) {
  for (let i=0;i<3000;i++) {
    const jd = jdStart + i*0.01;
    if (angSep(moonLon(jd), natalMoon) < 0.15) return jd;
  }
  return null;
}

function elemMod(pos) {
  const SIGN_EL  = ["Fire","Earth","Air","Water","Fire","Earth","Air","Water","Fire","Earth","Air","Water"];
  const SIGN_MOD = ["Cardinal","Fixed","Mutable","Cardinal","Fixed","Mutable","Cardinal","Fixed","Mutable","Cardinal","Fixed","Mutable"];
  const el={Fire:0,Earth:0,Air:0,Water:0}, mod={Cardinal:0,Fixed:0,Mutable:0};
  for (const v of Object.values(pos)) {
    const i=Math.floor(norm(v)/30);
    el[SIGN_EL[i]]++;
    mod[SIGN_MOD[i]]++;
  }
  return { el, mod };
}

function phiEngine(day,cycle) {
  const p=(day%cycle)/cycle, pp=(p*1.6180339887)%1;
  return { state:pp<0.382?"φ·Low":pp<0.618?"φ·Mid":"φ·High", mult:(1+(pp-0.5)*0.618).toFixed(4), phase:pp.toFixed(4) };
}

function planetSpeeds(jd) {
  const dt = 0.5;
  const p1 = allPlanets(jd - dt);
  const p2 = allPlanets(jd + dt);
  const speeds = {};
  for (const k of Object.keys(p1)) {
    let diff = p2[k] - p1[k];
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    speeds[k] = diff;
  }
  return speeds;
}

function moonPhase(sunLon, moonLonVal) {
  const angle = norm(moonLonVal - sunLon);
  const PHASES = [
    { max:11.25, name:"New Moon", emoji:"🌑" },
    { max:33.75, name:"Waxing Crescent", emoji:"🌒" },
    { max:56.25, name:"Waxing Crescent", emoji:"🌒" },
    { max:78.75, name:"First Quarter", emoji:"🌓" },
    { max:101.25, name:"Waxing Gibbous", emoji:"🌔" },
    { max:123.75, name:"Waxing Gibbous", emoji:"🌔" },
    { max:146.25, name:"Waxing Gibbous", emoji:"🌔" },
    { max:168.75, name:"Full Moon", emoji:"🌕" },
    { max:191.25, name:"Full Moon", emoji:"🌕" },
    { max:213.75, name:"Waning Gibbous", emoji:"🌖" },
    { max:236.25, name:"Waning Gibbous", emoji:"🌖" },
    { max:258.75, name:"Last Quarter", emoji:"🌗" },
    { max:281.25, name:"Waning Crescent", emoji:"🌘" },
    { max:303.75, name:"Waning Crescent", emoji:"🌘" },
    { max:326.25, name:"Waning Crescent", emoji:"🌘" },
    { max:348.75, name:"New Moon", emoji:"🌑" },
    { max:360, name:"New Moon", emoji:"🌑" },
  ];
  const ph = PHASES.find(p => angle <= p.max) || PHASES[0];
  const illum = Math.round((1 - Math.cos(angle * RAD)) / 2 * 100);
  return { name: ph.name, emoji: ph.emoji, angle: Math.round(angle), illumination: illum };
}

export { julianDay, sunLon, moonLon, nodeLon, lilithLon, planetLon, chironLon, allPlanets, calcAsc, calcMC, calcHouses, calcAspects, ayanamsa, harmonic, progChart, findSolarReturn, findLunarReturn, elemMod, phiEngine, planetSpeeds, moonPhase };