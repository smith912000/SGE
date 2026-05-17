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

// Black Moon Lilith = mean lunar APOGEE (the empty focus, far point of the Moon's
// orbit). The Meeus formula below gives the mean lunar PERIGEE; Lilith is the
// point 180° opposite. Prior code returned the perigee directly — every Lilith
// position was 180° wrong (e.g. for 9 Jan 2000 it gave Gemini 24° instead of
// Sagittarius 24°).
function lilithLon(jd) {
  const T = (jd - 2451545) / 36525;
  const perigee = 83.3532465 + 4069.0137287*T - 0.01032*T*T;
  return norm(perigee + 180);
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

// Chiron (2060 Chiron). Low-precision Keplerian — accurate to a few degrees
// over 1900-2100. Verified against Swiss Ephemeris reference for J2000:
// Chiron at ~Sagittarius 13° (geocentric, tropical).
//
// Original implementation had FOUR interlocking bugs:
//   1. Mean motion 7073.469°/century (10× too fast; Chiron's period is
//      50.6 yr → true mean motion ≈ 707.35°/century).
//   2. Epoch L₀ = 209.37° was a copy of Ω; correct L₀ ≈ 218.4°.
//   3. `w` was named "longitude of perihelion" by the M = L - w formula,
//      but the value 339.55° is actually the argument of perihelion ω.
//   4. Consequently `omega = w - O` produced a meaningless angle that was
//      then used as ω in the orbital-plane rotation matrix.
function chironLon(jd) {
  const T = (jd - 2451545) / 36525;             // Julian centuries since J2000

  // Orbital elements (J2000.0, from JPL Horizons / IAU MPC)
  const a = 13.6483;                            // semi-major axis, AU
  const e = 0.38226 + 0.00001 * T;              // eccentricity
  const I = 6.9343;                             // inclination, deg
  const O = 209.395 - 0.64 * T;                 // Ω, longitude of ascending node, deg
  const w = 339.408 + 1.42 * T;                 // ω, argument of perihelion, deg

  // Mean longitude L = Ω + ω + M. Back-solved from Chiron's known J2000
  // heliocentric ecliptic longitude (~252°) gives L₀ ≈ 218.4°.
  const L = norm(218.4 + 707.35 * T);

  // Mean anomaly M = L - (Ω + ω)
  const M = norm(L - O - w) * RAD;
  const E = solveKepler(M, e);

  // Position in orbital plane: x along perihelion, y perpendicular (in plane)
  const xOr = a * (Math.cos(E) - e);
  const yOr = a * Math.sqrt(1 - e*e) * Math.sin(E);

  // Rotate orbital → ecliptic via standard Px,Py,Qx,Qy matrix (using ω directly)
  const cosO = Math.cos(O * RAD), sinO = Math.sin(O * RAD);
  const cosI = Math.cos(I * RAD), sinI = Math.sin(I * RAD);
  const cosW = Math.cos(w * RAD), sinW = Math.sin(w * RAD);

  const Px =  cosO*cosW - sinO*sinW*cosI;
  const Py =  sinO*cosW + cosO*sinW*cosI;
  const Qx = -cosO*sinW - sinO*cosW*cosI;
  const Qy = -sinO*sinW + cosO*cosW*cosI;

  const xEcl = xOr*Px + yOr*Qx;
  const yEcl = xOr*Py + yOr*Qy;

  const helioLon = norm(Math.atan2(yEcl, xEcl) * DEG);
  const helioR   = Math.sqrt(xEcl*xEcl + yEcl*yEcl);

  return helioToGeo(helioLon, 0, helioR, sunLon(jd));
}

function allPlanets(jd) {
  const rahu = nodeLon(jd);
  return {
    Sun: sunLon(jd), Moon: moonLon(jd),
    Mercury: planetLon(jd, "Mercury"), Venus: planetLon(jd, "Venus"),
    Mars: planetLon(jd, "Mars"), Jupiter: planetLon(jd, "Jupiter"),
    Saturn: planetLon(jd, "Saturn"), Uranus: planetLon(jd, "Uranus"),
    Neptune: planetLon(jd, "Neptune"), Pluto: planetLon(jd, "Pluto"),
    Chiron: chironLon(jd),
    Node: rahu,                      // Rahu — North lunar node
    Ketu: norm(rahu + 180),          // Ketu — South lunar node (180° opposite Rahu)
    Lilith: lilithLon(jd),
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

// Porphyry house system — trisects each ecliptic quadrant between the four
// angles. Guarantees house 1 = ASC, 4 = IC, 7 = DSC, 10 = MC, which is what
// the wheel renderer assumes. Previous Equal-House version produced cusps that
// did NOT align with the true MC at most latitudes, making houses 10/11/12
// appear "on the opposite side of the wheel" relative to the MC pointer.
function calcHouses(jd, lat, lon) {
  const asc = calcAsc(jd, lat, lon);
  const mc  = calcMC(jd, lon);
  const ic  = norm(mc  + 180);
  const dsc = norm(asc + 180);

  // Four ecliptic-arc lengths (always positive, summing to 360°).
  const arc1 = norm(ic  - asc);   // ASC → IC  (covers houses 1→4, going through 2 and 3)
  const arc2 = norm(dsc - ic);    // IC  → DSC (houses 4→7, through 5 and 6)
  const arc3 = norm(mc  - dsc);   // DSC → MC  (houses 7→10, through 8 and 9)
  const arc4 = norm(asc - mc);    // MC  → ASC (houses 10→1, through 11 and 12)

  const h = {};
  h[1]  = asc;
  h[2]  = norm(asc + arc1 / 3);
  h[3]  = norm(asc + 2 * arc1 / 3);
  h[4]  = ic;
  h[5]  = norm(ic  + arc2 / 3);
  h[6]  = norm(ic  + 2 * arc2 / 3);
  h[7]  = dsc;
  h[8]  = norm(dsc + arc3 / 3);
  h[9]  = norm(dsc + 2 * arc3 / 3);
  h[10] = mc;
  h[11] = norm(mc  + arc4 / 3);
  h[12] = norm(mc  + 2 * arc4 / 3);

  h.ASC = asc; h.MC = mc; h.IC = ic; h.DSC = dsc;
  return h;
}

// Find which house (1-12) a given ecliptic longitude falls into, given a
// houses object from calcHouses(). Wrap-aware: handles the case where a
// house spans 0°/360°.
function houseOf(lon, houses) {
  const L = norm(lon);
  for (let i = 1; i <= 12; i++) {
    const cusp = houses[i];
    const next = houses[(i % 12) + 1];
    const inside = next > cusp
      ? (L >= cusp && L < next)
      : (L >= cusp || L < next);   // wraps past 360
    if (inside) return i;
  }
  return null;
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

// Lahiri (Chitrapaksha) ayanamsa — the standard Vedic sidereal-tropical offset.
// J2000.0 value 23°51'11" = 23.8531°, precession ~50.29 arcsec/year = 0.01397°/year.
// Prior formula (23.85 + 0.013004*T*100) used a 7%-slow rate (46.8"/yr) — close
// enough at J2000 but drifted ~0.1° per century.
const ayanamsa  = jd => 23.8531 + 0.01397 * ((jd - 2451545) / 365.25);
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

// ─────────────────────────────────────────────────────────────────────
//  VEDIC / JYOTISH HELPERS
// ─────────────────────────────────────────────────────────────────────

// 27 nakshatras (lunar mansions). Each spans 360/27 = 13°20' of sidereal
// longitude starting from 0° sidereal Aries.
const NAKSHATRA_NAMES = [
  "Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu",
  "Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta",
  "Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha",
  "Uttara Ashadha","Shravana","Dhanishta","Shatabhisha",
  "Purva Bhadrapada","Uttara Bhadrapada","Revati",
];

// Vimshottari nakshatra-lord cycle (repeats every 9 nakshatras).
const NAK_LORDS = ["Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"];

const NAK_DEG  = 360 / 27;     // 13.3333…° per nakshatra
const PADA_DEG = NAK_DEG / 4;  // 3.3333…° per pada (1/4 of a nakshatra)

function nakshatra(siderealLon) {
  const L = norm(siderealLon);
  const idx = Math.floor(L / NAK_DEG);
  const within = L - idx * NAK_DEG;
  const pada = Math.floor(within / PADA_DEG) + 1;
  return {
    idx,
    name: NAKSHATRA_NAMES[idx],
    lord: NAK_LORDS[idx % 9],
    pada,
    degInNak: within,
    degInPada: within - (pada - 1) * PADA_DEG,
  };
}

// Whole Sign houses (Vedic standard): each house = exactly one rashi (sign),
// numbered from the rashi containing the Ascendant. ASC sign = house 1.
function wholeSignHouse(siderealLon, ascSidereal) {
  const ascSignIdx = Math.floor(norm(ascSidereal) / 30);
  const lonSignIdx = Math.floor(norm(siderealLon) / 30);
  return ((lonSignIdx - ascSignIdx + 12) % 12) + 1;
}

// Vimshottari Dasha — 120-year planetary cycle, the primary timing system in
// Vedic. Triggered by the Moon's nakshatra at birth. Returns the active
// Mahadasha (major period) and Antardasha (sub-period) for the requested JD.
const DASHA_SEQUENCE = ["Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"];
const DASHA_YEARS    = { Ketu:7, Venus:20, Sun:6, Moon:10, Mars:7, Rahu:18, Jupiter:16, Saturn:19, Mercury:17 };
const DASHA_TOTAL    = 120;
const YR_DAYS        = 365.25;

function vimshottariDasha(moonSidereal, jdBirth, jdNow = null) {
  const now = jdNow ?? ((Date.now() / 86400000) + 2440587.5);
  const nak = nakshatra(moonSidereal);
  const startLord = nak.lord;

  // Fraction of birth nakshatra already traversed (0 = just entered, 1 = about to leave)
  const fractionInNak = nak.degInNak / NAK_DEG;
  const startYears    = DASHA_YEARS[startLord];
  const remainingAtBirth = (1 - fractionInNak) * startYears;

  // Build all 9 Mahadashas. The birth lord started its period BEFORE birth, so
  // back up to find its true start.
  const periods = [];
  let cursor = jdBirth - (startYears - remainingAtBirth) * YR_DAYS;
  const startIdx = DASHA_SEQUENCE.indexOf(startLord);
  for (let i = 0; i < 9; i++) {
    const lord = DASHA_SEQUENCE[(startIdx + i) % 9];
    const yrs  = DASHA_YEARS[lord];
    periods.push({ lord, startJD: cursor, endJD: cursor + yrs * YR_DAYS, years: yrs });
    cursor += yrs * YR_DAYS;
  }
  const current = periods.find(p => now >= p.startJD && now < p.endJD) || periods[0];

  // Antardashas: the current Mahadasha is split into 9 nested periods,
  // each weighted by its lord's years (sums to current Mahadasha years).
  const antars = [];
  const aIdx = DASHA_SEQUENCE.indexOf(current.lord);
  let aCursor = current.startJD;
  for (let i = 0; i < 9; i++) {
    const aLord = DASHA_SEQUENCE[(aIdx + i) % 9];
    const aYrs  = (current.years * DASHA_YEARS[aLord]) / DASHA_TOTAL;
    antars.push({ lord: aLord, startJD: aCursor, endJD: aCursor + aYrs * YR_DAYS, years: aYrs });
    aCursor += aYrs * YR_DAYS;
  }
  const currentAntar = antars.find(a => now >= a.startJD && now < a.endJD) || antars[0];

  return {
    mahadasha: current,
    antardasha: currentAntar,
    allMahadashas: periods,
    allAntardashas: antars,
    birthNakshatra: nak,
    nowJD: now,
  };
}

// JD → calendar date helper, for displaying Dasha period boundaries.
function jdToDate(jd) {
  const ms = (jd - 2440587.5) * 86400000;
  return new Date(ms);
}

export {
  julianDay, sunLon, moonLon, nodeLon, lilithLon, planetLon, chironLon,
  allPlanets, calcAsc, calcMC, calcHouses, houseOf,
  calcAspects, ayanamsa, harmonic, progChart, findSolarReturn, findLunarReturn,
  elemMod, phiEngine, planetSpeeds, moonPhase,
  // Vedic
  nakshatra, wholeSignHouse, vimshottariDasha, jdToDate,
  NAKSHATRA_NAMES, NAK_LORDS,
};