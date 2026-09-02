import { getPreferenceFocus } from '../store/userPreferences.js';
import { PLANET_IN_SIGN } from '../data/astrology/planetInSign.js';
import { PLANET_IN_HOUSE } from '../data/astrology/planetInHouse.js';

export default function NatalTab({ ctx }) {
  const { M3, res, grid2, zodSign, SIGN_COL, SIGN_SYM, HOUSE_AREA, HOUSE_INFO, P_COL, P_SYM, Card, PlanetTable, WheelWithTooltip, ProfilePanel, moonPhase } = ctx;

  const fmtDeg = (lon) => {
    const l = ((lon % 360) + 360) % 360;
    const deg = Math.floor(l % 30);
    const frac = (l % 1) * 60;
    const min = Math.floor(frac);
    return `${deg}°${String(min).padStart(2,"0")}'`;
  };

  const AXIS_LABELS = { 1:"ASC", 4:"IC", 7:"DSC", 10:"MC" };

  const SIGN_RULERS = {
    Aries:"Mars", Taurus:"Venus", Gemini:"Mercury", Cancer:"Moon",
    Leo:"Sun", Virgo:"Mercury", Libra:"Venus", Scorpio:"Pluto",
    Sagittarius:"Jupiter", Capricorn:"Saturn", Aquarius:"Uranus", Pisces:"Neptune"
  };
  const TRAD_RULERS = { Scorpio:"Mars", Aquarius:"Saturn", Pisces:"Jupiter" };

  const ascSign = zodSign(res.houses[1]);
  const chartRuler = SIGN_RULERS[ascSign];
  const tradRuler = TRAD_RULERS[ascSign];
  const rulerLon = res.trop[chartRuler];
  const rulerSign = rulerLon != null ? zodSign(rulerLon) : null;
  const rulerHouse = (() => {
    if (rulerLon == null) return null;
    for (let h = 0; h < 12; h++) {
      const cusp = res.houses[h + 1];
      const next = res.houses[((h + 1) % 12) + 1];
      const inH = next > cusp ? (rulerLon >= cusp && rulerLon < next) : (rulerLon >= cusp || rulerLon < next);
      if (inH) return h + 1;
    }
    return null;
  })();

  const DIGNITY = {
    Sun:{dom:"Leo",exa:"Aries",det:"Aquarius",fall:"Libra"},
    Moon:{dom:"Cancer",exa:"Taurus",det:"Capricorn",fall:"Scorpio"},
    Mercury:{dom:"Gemini",exa:"Virgo",det:"Sagittarius",fall:"Pisces"},
    Venus:{dom:"Taurus",exa:"Pisces",det:"Scorpio",fall:"Virgo"},
    Mars:{dom:"Aries",exa:"Capricorn",det:"Libra",fall:"Cancer"},
    Jupiter:{dom:"Sagittarius",exa:"Cancer",det:"Gemini",fall:"Capricorn"},
    Saturn:{dom:"Capricorn",exa:"Libra",det:"Cancer",fall:"Aries"},
    Uranus:{dom:"Aquarius",exa:"Scorpio",det:"Leo",fall:"Taurus"},
    Neptune:{dom:"Pisces",exa:"Cancer",det:"Virgo",fall:"Capricorn"},
    Pluto:{dom:"Scorpio",exa:"Aries",det:"Taurus",fall:"Libra"},
  };

  function calcDominant() {
    const scores = {};
    const planets = ["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune","Pluto"];
    planets.forEach(p => { scores[p] = 0; });
    if (res.trop.Sun != null) scores.Sun += 4;
    if (res.trop.Moon != null) scores.Moon += 4;
    const asc = zodSign(res.houses[1]);
    const ascRuler = SIGN_RULERS[asc];
    if (ascRuler && scores[ascRuler] != null) scores[ascRuler] += 3;
    planets.forEach(p => {
      if (res.trop[p] == null) return;
      const s = zodSign(res.trop[p]);
      const d = DIGNITY[p];
      if (d) {
        if (s === d.dom) scores[p] += 3;
        if (s === d.exa) scores[p] += 2;
        if (s === d.det) scores[p] -= 2;
        if (s === d.fall) scores[p] -= 1;
      }
      for (let h = 0; h < 12; h++) {
        const cusp = res.houses[h + 1];
        const next = res.houses[((h + 1) % 12) + 1];
        const inH = next > cusp ? (res.trop[p] >= cusp && res.trop[p] < next) : (res.trop[p] >= cusp || res.trop[p] < next);
        if (inH) {
          if ([0,3,6,9].includes(h)) scores[p] += 2;
          break;
        }
      }
    });
    return Object.entries(scores).sort((a,b) => b[1] - a[1]).slice(0, 3);
  }
  const dominant = calcDominant();

  const phase = (res.trop.Sun != null && res.trop.Moon != null && moonPhase)
    ? moonPhase(res.trop.Sun, res.trop.Moon) : null;

  const HOUSE_DESC = [
    "The ground of the body and of the manner of appearing. Hellenistic sources name it the Horoskopos, the hour-marker, and count the other eleven places from it.",
    "The field of substance and movable goods. Hellenistic sources name it the Gate of Hades and read it as the means of living rather than the living itself.",
    "The field of siblings, neighbours, short journeys and ordinary exchange. Hellenistic sources name it Goddess, and the doctrine of joys places the Moon here.",
    "The angle beneath the earth: ancestry, land, the household, and the end of the matter. Hellenistic sources name it the Hypogeion.",
    "The field of children, play, and what is made for its own sake. The doctrine of joys places Venus here.",
    "The field of labour, illness, servitude and daily regimen. Older sources count it among the difficult places and give Mars his joy in it; modern practice recasts the same ground as work and health.",
    "The ground of the one-to-one relation: marriage, partnership, and the declared opponent. Its cusp is the Descendant.",
    "The field of death, inheritance, and what is held jointly with another. Its subject matter is what passes between parties rather than what is owned outright.",
    "The field of the long journey, doctrine, divination and foreign ground. The doctrine of joys places the Sun here.",
    "The angle at the top of the chart: rank, office, reputation and public action. Its cusp is the Midheaven.",
    "The field of allies, patrons, associations and hope. The doctrine of joys places Jupiter here.",
    "The field of confinement, enmity, and what operates out of sight. The doctrine of joys places Saturn here; modern psychological practice reads the same ground as the unconscious.",
  ];

  // Per-combination readings live in the data layer (one entry per planet × house
  // pair, written distinctly). Fallback to a planet-only line for planets not
  // included in PLANET_IN_HOUSE (Node, Lilith, Chiron).
  const PIH_FALLBACK = {
    Node:   "The mean North Node falls in this house. It is a computed crossing of the Moon's path with the ecliptic rather than a body, and medieval Western sources named it caput draconis, the dragon's head.",
    Lilith: "Black Moon Lilith falls in this house. It is the mean lunar apogee, a calculated point with nothing visible at it, and which of the four Liliths is meant has to be settled before the placement is read.",
    Chiron: "Chiron falls in this house. It was identified in 1977, so every attribution made to it is modern and none of it is traditional.",
  };
  const pihText = (planet, houseNum) =>
    PLANET_IN_HOUSE[planet]?.[houseNum] || PIH_FALLBACK[planet] || "No record stands for this body in the house layer.";
  const pisText = (planet, sign) =>
    PLANET_IN_SIGN[planet]?.[sign] || null;

  const housePlanets = Array.from({ length: 12 }, () => []);
  const planetList = ["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune","Pluto","Node","Lilith","Chiron"];
  planetList.forEach(p => {
    if (res.trop[p] == null) return;
    const lon = res.trop[p];
    for (let h = 0; h < 12; h++) {
      const cusp = res.houses[h + 1];
      const next = res.houses[((h + 1) % 12) + 1];
      const inHouse = next > cusp ? (lon >= cusp && lon < next) : (lon >= cusp || lon < next);
      if (inHouse) { housePlanets[h].push(p); break; }
    }
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline }}>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.primary, marginBottom: 8 }}>The Natal Chart — the Sky at the Moment Named</div>
        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
          At the moment entered, every body held a definite position in the zodiac. This page states those positions and the conventions used to divide them. The <strong>planet table</strong> gives each body in the tropical (Western) and sidereal (Vedic) frames, which are separated by the ayanamsa and so rarely name the same sign. The <strong>wheel</strong> is the same data drawn: the outer ring is the zodiac, the inner divisions are the twelve houses, and each glyph sits at its computed longitude.
        </p>
        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, marginTop: 8 }}>
          <strong>How it is read:</strong> each body carries a field of signification — ☉ the Sun light, rank and honour; ☽ the Moon the changing and the nocturnal; ☿ Mercury exchange and speech; ♀ Venus attraction and value; ♂ Mars division and force. The sign colours the temper in which that field operates; the house names the subject matter it operates on. Sources disagree over how much weight sign carries against house, and SGE does not resolve the disagreement.
        </p>
      </Card>

      {Array.isArray(res.trAsp) && res.trAsp.length > 0 && (() => {
        const strong = res.trAsp.filter(a => (a.strength || 0) >= 0.7).length;
        const total = res.trAsp.length;
        const focus = getPreferenceFocus();
        const focusLabel = focus === "all" ? "balanced" : focus === "love" ? "love & connection" : focus === "career" ? "work & purpose" : focus === "spiritual" ? "spiritual growth" : "body & energy";
        return (
          <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}66,${M3.surfaceContainer})`, borderLeft: `3px solid ${M3.primary}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <div style={{ fontFamily: "Cinzel,serif", fontSize: "0.95rem", color: M3.primary }}>Today&apos;s Guided Theme</div>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: M3.tertiary, letterSpacing: "0.08em", padding: "2px 8px", borderRadius: 12, border: `1px solid ${M3.tertiary}44` }}>
                FOCUS: {focusLabel.toUpperCase()}
              </div>
            </div>
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.8rem", lineHeight: 1.6, color: M3.onSurface, margin: "0 0 10px" }}>
              {strong >= 4 ? `${strong} of ${total} current contacts fall within a tight orb. A count is not a significance: the number found is a function of the orb policy in use.` 
               : strong >= 2 ? `${strong} of ${total} current contacts fall within a tight orb. Widening the orb would add more; narrowing it would remove these.` 
               : total > 0 ? `Transits are relatively gentle today with ${total} connections. This is a good day to integrate rather than force rapid change.` 
               : "Few contacts fall within a tight orb for this date. That is a statement about the orb policy and the current positions, not about the day."}
            </p>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: M3.secondary, cursor: "pointer", display: "inline-block", background: M3.primary+"1a", padding: "4px 12px", borderRadius: 16 }} onClick={() => {
              // Simulating a tab switch by clicking the "Today" tab button, which would be ideal, but for now we just show text.
              window.scrollTo({ top: 0, behavior: "smooth" });
              // The Today tab carries the full transit breakdown.
            }}>
              → VIEW FULL DAILY FORECAST
            </div>
          </Card>
        );
      })()}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}44,${M3.surfaceContainer})` }}>
          <div style={{ fontFamily: "Cinzel,serif", fontSize: "0.78rem", color: M3.primary, marginBottom: 6 }}>Chart Ruler</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: "1.6rem" }}>{P_SYM[chartRuler] || ""}</span>
            <div>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.8rem", color: M3.onSurface, fontWeight: 700 }}>
                {chartRuler} <span style={{ color: M3.tertiary, fontWeight: 400, fontSize: "0.68rem" }}>(rules {ascSign} rising)</span>
              </div>
              {rulerSign && (
                <div style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", color: M3.onSurfaceVariant }}>
                  in {SIGN_SYM?.[rulerSign]} {rulerSign} {fmtDeg(rulerLon)}{rulerHouse ? ` — House ${rulerHouse}` : ""}
                </div>
              )}
              {tradRuler && <div style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.64rem", color: M3.outlineVariant, fontStyle: "italic" }}>Traditional ruler: {tradRuler}</div>}
            </div>
          </div>
          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.66rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: 0 }}>
            The chart ruler is the traditional ruler of the rising sign. Hellenistic practice treats it as the significator of the chart as a whole; its own sign and house placement are read as qualifying that office.
          </p>
        </Card>

        {phase && (
          <Card style={{ background: `linear-gradient(135deg,${M3.surfaceContainer},${M3.primaryContainer}33)` }}>
            <div style={{ fontFamily: "Cinzel,serif", fontSize: "0.78rem", color: M3.primary, marginBottom: 6 }}>Moon Phase at Birth</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: "2rem" }}>{phase.emoji}</span>
              <div>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.8rem", color: M3.onSurface, fontWeight: 700 }}>{phase.name}</div>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.64rem", color: M3.tertiary }}>
                  {phase.angle}° separation &middot; {phase.illumination}% illumination
                </div>
              </div>
            </div>
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.66rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: 0 }}>
              {phase.name === "New Moon" ? "The Sun and Moon stand in conjunction: the two lights at the same longitude, the Moon unlit from Earth. The tradition reads the conjunction as the start of the lunation cycle."
              : phase.name === "Waxing Crescent" ? "The Moon has separated from the Sun and is gaining light. The tradition places this phase between the conjunction and the first square."
              : phase.name === "First Quarter" ? "The Moon stands square the Sun, waxing: a 90-degree separation with light increasing. The classical reading of the square is friction between the two lights."
              : phase.name === "Waxing Gibbous" ? "The Moon is more than half lit and still gaining, approaching the opposition."
              : phase.name === "Full Moon" ? "The Sun and Moon stand in opposition: 180 degrees apart, the Moon fully lit. The tradition reads the opposition as the point of maximum separation between the two lights."
              : phase.name === "Waning Gibbous" ? "The Moon has passed the opposition and is losing light, still more than half lit. Older texts call this the disseminating phase."
              : phase.name === "Last Quarter" ? "The Moon stands square the Sun, waning: a 90-degree separation with light decreasing."
              : "The Moon is a thin waning crescent approaching conjunction, the balsamic phase in modern terminology. It closes the lunation cycle."}
            </p>
          </Card>
        )}

        <Card style={{ background: `linear-gradient(135deg,${M3.surfaceContainer},${M3.primaryContainer}22)` }}>
          <div style={{ fontFamily: "Cinzel,serif", fontSize: "0.78rem", color: M3.primary, marginBottom: 6 }}>Dominant Planets</div>
          {dominant.map(([p, score], i) => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: i === 0 ? "1.4rem" : "1rem", color: P_COL[p] || M3.primary }}>{P_SYM[p] || ""}</span>
              <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: i === 0 ? "0.78rem" : "0.68rem", color: i === 0 ? M3.onSurface : M3.onSurfaceVariant, fontWeight: i === 0 ? 700 : 400 }}>{p}</span>
              <div style={{ flex: 1, height: 4, borderRadius: 2, background: M3.outlineVariant + "33", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.max(10, (score / (dominant[0]?.[1] || 1)) * 100)}%`, background: P_COL[p] || M3.primary, borderRadius: 2 }} />
              </div>
              <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: M3.tertiary, minWidth: 16, textAlign: "right" }}>{score}</span>
            </div>
          ))}
          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.66rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: "6px 0 0" }}>
            Dominance is scored by luminaries, ASC ruler dignity, essential dignity (domicile, exaltation, detriment, fall), and angular house placement.
          </p>
        </Card>
      </div>

      <div style={grid2}>
        <Card title="☉ Where Each Planet Was — Western &amp; Vedic">
          <PlanetTable positions={res.trop} siderealPositions={res.sid} jd={res.jd} />
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card title="⊙ Natal Positions">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <WheelWithTooltip positions={res.trop} houses={res.houses} size={340} id="natal" theme="western" />
            </div>
          </Card>
          <Card title="⌂ House Cusps — Exact Positions">
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 10px" }}>
              Each house cusp marks where a life domain begins. The degree and sign show the exact zodiacal position. Equal House system (30° per house from the Ascendant).
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr>
                  {["House","Cusp","Sign","Degree","Area","Planets"].map(h => (
                    <th key={h} style={{ padding: "5px 8px", textAlign: "left", color: M3.secondary, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.06em", borderBottom: `1px solid ${M3.outlineVariant}`, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {Array.from({ length: 12 }, (_, i) => {
                    const lon = res.houses[i + 1];
                    const sign = zodSign(lon);
                    const pls = housePlanets[i];
                    const axis = AXIS_LABELS[i + 1];
                    return (
                      <tr key={i} style={{ borderBottom: `1px solid ${M3.outlineVariant}22`, background: axis ? M3.primaryContainer + "11" : "transparent" }}>
                        <td style={{ padding: "4px 8px", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: axis ? M3.primary : M3.onSurface, fontWeight: axis ? "700" : "400" }}>
                          {i + 1}{axis ? ` (${axis})` : ""}
                        </td>
                        <td style={{ padding: "4px 8px", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.64rem", color: M3.tertiary }}>{lon.toFixed(2)}°</td>
                        <td style={{ padding: "4px 8px", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: SIGN_COL[sign], fontWeight: "600" }}>{SIGN_SYM?.[sign] || ""} {sign}</td>
                        <td style={{ padding: "4px 8px", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.64rem", color: M3.onSurfaceVariant }}>{fmtDeg(lon)}</td>
                        <td style={{ padding: "4px 8px", fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.64rem", color: M3.onSurfaceVariant, fontStyle: "italic" }}>{HOUSE_AREA[i]}</td>
                        <td style={{ padding: "4px 8px", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", color: M3.primary }}>{pls.map(p => P_SYM[p] || p).join(" ") || "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
          <Card title="⌂ Life Areas (Houses) — The Twelve Fields">
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 12px" }}>
              Houses are life domains — each one governs a specific area. The sign on the house sets the style; planets inside bring activity and focus to that area.
            </p>
            {Array.from({ length: 12 }, (_, i) => {
              const h = res.houses[i + 1];
              const sign = zodSign(h);
              const pls = housePlanets[i];
              const axis = AXIS_LABELS[i + 1];
              const hi = HOUSE_INFO?.[i];
              return (
                <div key={i} style={{ padding: "10px 14px", marginBottom: 6, borderRadius: 10, background: SIGN_COL[sign] + "08", borderLeft: `3px solid ${SIGN_COL[sign]}33` }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: pls.length ? 4 : 0 }}>
                    <span style={{ color: M3.secondary, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "700", minWidth: 22 }}>{i + 1}.</span>
                    <span style={{ color: SIGN_COL[sign], fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "700" }}>{SIGN_SYM?.[sign] || ""} {sign}</span>
                    <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: M3.tertiary }}>{fmtDeg(h)}</span>
                    {axis && <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.58rem", color: M3.primary, fontWeight: "700", padding: "1px 6px", borderRadius: 6, background: M3.primaryContainer + "44" }}>{axis}</span>}
                    <span style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.68rem", fontStyle: "italic", color: M3.onSurfaceVariant }}>{HOUSE_AREA[i]}</span>
                    {pls.length > 0 && <span style={{ marginLeft: "auto", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: M3.primary }}>{pls.map(p => P_SYM[p] || p).join(" ")}</span>}
                  </div>
                  <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.68rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: 0 }}>{HOUSE_DESC[i]}</p>
                  {pls.length > 0 && pls.map(p => {
                    const pSign = zodSign(res.trop[p]);
                    const signRead = pisText(p, pSign);
                    return (
                      <div key={p} style={{ margin: "6px 0 0", paddingLeft: 10, borderLeft: `2px solid ${P_COL[p] || M3.primary}44` }}>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.68rem", lineHeight: 1.5, color: M3.onSurface, margin: 0 }}>
                          <strong style={{ color: P_COL[p] || M3.primary }}>{P_SYM[p]} {p} in {sign}, {hi?.name?.split(' — ')[1] || `H${i+1}`}</strong> — {pihText(p, i+1)}.
                        </p>
                        {signRead && (
                          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.66rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: "3px 0 0", fontStyle: "italic" }}>
                            <span style={{ color: SIGN_COL[pSign], fontStyle: "normal", fontWeight: 600 }}>In {pSign}:</span> {signRead}
                          </p>
                        )}
                      </div>
                    );
                  })}
                  {pls.length === 0 && <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.64rem", lineHeight: 1.4, color: M3.outlineVariant, margin: "4px 0 0", fontStyle: "italic" }}>No planets here — this area runs on {sign} autopilot, governed by the sign on the cusp rather than a planet's direct attention.</p>}
                </div>
              );
            })}
          </Card>
        </div>
      </div>
      <Card>
        <ProfilePanel trop={res.trop} houses={res.houses} />
      </Card>
    </div>
  );
}
