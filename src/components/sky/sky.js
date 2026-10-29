// Sky geometry for the symbol map: J2000 equatorial positions turned into the
// sky over a place at a moment, then a stereographic view of it from below.
// Horizontal vectors are (north, east, up).

const D = Math.PI / 180;
export const OBLIQUITY = 23.4393;

export const norm = (d) => ((d % 360) + 360) % 360;

// Ecliptic longitude and latitude to right ascension and declination.
export function eclToEq(lon, lat = 0) {
  const l = lon * D, b = lat * D, e = OBLIQUITY * D;
  const ra = Math.atan2(Math.sin(l) * Math.cos(e) - Math.tan(b) * Math.sin(e), Math.cos(l));
  const dec = Math.asin(Math.sin(b) * Math.cos(e) + Math.cos(b) * Math.sin(e) * Math.sin(l));
  return [norm(ra / D), dec / D];
}

// Precession in longitude since J2000, to set dated longitudes on the J2000 sky.
export const precessionSinceJ2000 = (jd) => ((jd - 2451545) / 365.25) * 0.013969;

// Local sidereal time in degrees.
export const lst = (jd, lonEast) => norm(280.46061837 + 360.98564736629 * (jd - 2451545) + lonEast);

// A frame for one observer: turns RA/Dec into a horizontal unit vector.
export function observer(jd, lat, lonEast) {
  const L = lst(jd, lonEast) * D, phi = lat * D;
  const sp = Math.sin(phi), cp = Math.cos(phi);
  return (ra, dec) => {
    const H = L - ra * D, d = dec * D;
    const sd = Math.sin(d), cd = Math.cos(d), ch = Math.cos(H);
    const up = sp * sd + cp * cd * ch;
    const north = sd * cp - cd * sp * ch;
    const east = -cd * Math.sin(H);
    return [north, east, up];
  };
}

export const altAz = ([n, e, u]) => [Math.asin(Math.max(-1, Math.min(1, u))) / D, norm(Math.atan2(e, n) / D)];

// A camera looking at (alt, az) with half field h. Screen up follows the
// direction of rising altitude, so from the zenith with az 180 north is up
// and east is on the left, as on a star chart held overhead.
export function camera(alt, az, h, w, hgt) {
  const a = alt * D, z = az * D;
  const f = [Math.cos(a) * Math.cos(z), Math.cos(a) * Math.sin(z), Math.sin(a)];
  const u = [-Math.sin(a) * Math.cos(z), -Math.sin(a) * Math.sin(z), Math.cos(a)];
  const r = [u[1] * f[2] - u[2] * f[1], u[2] * f[0] - u[0] * f[2], u[0] * f[1] - u[1] * f[0]];
  const R = Math.min(w, hgt) / 2;
  const k = R / Math.tan((h * D) / 2);
  const cx = w / 2, cy = hgt / 2;
  const project = (v, all) => {
    const zf = v[0] * f[0] + v[1] * f[1] + v[2] * f[2];
    if (zf < (all ? -0.999 : -0.35)) return null;
    const x = v[0] * r[0] + v[1] * r[1] + v[2] * r[2];
    const y = v[0] * u[0] + v[1] * u[1] + v[2] * u[2];
    const s = k / (1 + zf);
    return [cx + x * s, cy - y * s, v[2]];
  };
  // Degrees moved per pixel near the centre, for dragging.
  const dpp = (2 * Math.atan(1 / k)) / D;
  return { project, dpp, k };
}

export const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function segDist(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l2));
  return Math.hypot(px - ax - t * dx, py - ay - t * dy);
}
