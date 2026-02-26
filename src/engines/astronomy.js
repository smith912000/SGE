import { norm } from '../utils/helpers.js';
import { PL } from '../data/astrology/planets.js';
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
  const L0 = norm(280.46646 + 36000.76983*T);
  const M  = norm(357.52911 + 35999.05029*T - 0.0001537*T*T);
  const Mr = M * RAD;
  const C  = (1.914602 - 0.004817*T - 0.000014*T*T)*Math.sin(Mr)
           + (0.019993 - 0.000101*T)*Math.sin(2*Mr)
           + 0.000289*Math.sin(3*Mr);
  const om = 125.04 - 1934.136*T;
  return norm(L0 + C - 0.00569 - 0.00478*Math.sin(om*RAD));
}

function moonLon(jd) {
  const T  = (jd - 2451545) / 36525;
  const L1 = norm(218.3165 + 481267.8813*T);
  const M  = norm(357.5291 + 35999.0503*T);
  const Mp = norm(134.9634 + 477198.8676*T);
  const D  = norm(297.8502 + 445267.1115*T);
  const F  = norm(93.2721  + 483202.0175*T);
  return norm(L1
    + 6.2888*Math.sin(Mp*RAD) + 1.2740*Math.sin((2*D-Mp)*RAD)
    + 0.6583*Math.sin(2*D*RAD) + 0.2136*Math.sin(2*Mp*RAD)
    - 0.1851*Math.sin(M*RAD)  - 0.1143*Math.sin(2*F*RAD)
    + 0.0588*Math.sin((2*D-2*Mp)*RAD)
    + 0.0572*Math.sin((2*D-M-Mp)*RAD)
    + 0.0533*Math.sin((2*D+Mp)*RAD));
}

const plLon = (jd, p) => { const T=(jd-2451545)/36525; return norm(PL[p].L0 + PL[p].dL*T); };

function nodeLon(jd) {
  const T = (jd - 2451545) / 36525;
  return norm(125.0445479 - 1934.1362891*T + 0.0020754*T*T);
}

function allPlanets(jd) {
  return { Sun:sunLon(jd), Moon:moonLon(jd),
    Mercury:plLon(jd,"Mercury"), Venus:plLon(jd,"Venus"),
    Mars:plLon(jd,"Mars"), Jupiter:plLon(jd,"Jupiter"),
    Saturn:plLon(jd,"Saturn"), Uranus:plLon(jd,"Uranus"),
    Neptune:plLon(jd,"Neptune"), Pluto:plLon(jd,"Pluto"),
    Node:nodeLon(jd) };
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

function findSolarReturn(natalSun, year) {
  const base = julianDay(year,1,1,0);
  for (let i=0;i<3660;i++) {
    const jd = base+i*0.1;
    if (Math.abs(sunLon(jd)-natalSun)<0.05) return jd;
  }
  return null;
}

function findLunarReturn(natalMoon, jdStart) {
  for (let i=0;i<3000;i++) {
    const jd = jdStart + i*0.01;
    if (Math.abs(moonLon(jd) - natalMoon) < 0.15) return jd;
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

export { julianDay, sunLon, moonLon, nodeLon, plLon, allPlanets, calcAsc, calcMC, calcHouses, calcAspects, ayanamsa, harmonic, progChart, findSolarReturn, findLunarReturn, elemMod, phiEngine };
