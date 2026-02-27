export default function NatalTab({ ctx }) {
  const { M3, res, grid2, zodSign, SIGN_COL, SIGN_SYM, HOUSE_AREA, HOUSE_INFO, P_COL, P_SYM, Card, PlanetTable, WheelWithTooltip, ProfilePanel } = ctx;

  const fmtDeg = (lon) => {
    const l = ((lon % 360) + 360) % 360;
    const deg = Math.floor(l % 30);
    const frac = (l % 1) * 60;
    const min = Math.floor(frac);
    return `${deg}°${String(min).padStart(2,"0")}'`;
  };

  const AXIS_LABELS = { 1:"ASC", 4:"IC", 7:"DSC", 10:"MC" };

  const HOUSE_DESC = [
    "Your identity, body, and how you present yourself to the world. Planets here strongly shape your personality.",
    "Your money, possessions, and self-worth. Planets here affect how you earn and what you value.",
    "Communication, siblings, short trips, and daily learning. Planets here shape how you speak and think.",
    "Home, family, roots, and emotional foundation. Planets here influence your private life and sense of belonging.",
    "Creativity, romance, children, and pleasure. Planets here amplify your joy and self-expression.",
    "Daily routines, health, and service. Planets here affect your work habits and physical wellbeing.",
    "Partnerships, marriage, and one-on-one relationships. Planets here shape who you attract and how you relate.",
    "Shared resources, deep bonds, transformation, and endings. Planets here bring intensity to intimacy and change.",
    "Higher education, philosophy, travel, and beliefs. Planets here expand your worldview and sense of meaning.",
    "Career, reputation, authority, and public life. Planets here drive your ambitions and legacy.",
    "Friends, groups, hopes, and humanitarian causes. Planets here shape your social life and vision for the future.",
    "Solitude, spirituality, hidden strengths, and the unconscious. Planets here deepen your inner life and intuition.",
  ];

  const PLANET_IN_HOUSE = {
    Sun: "your core identity is strongly expressed here — this area of life feels central to who you are",
    Moon: "your emotional needs are centred here — you seek comfort and security through this domain",
    Mercury: "your mind is active here — you think, talk, and learn most through this area",
    Venus: "you find beauty and pleasure here — relationships and values are drawn to this domain",
    Mars: "your drive and energy are focused here — you take action and sometimes create friction in this area",
    Jupiter: "life expands and opportunities flow here — this is where luck tends to find you",
    Saturn: "you face your hardest lessons here — discipline and patience in this area lead to lasting mastery",
    Uranus: "you experience disruption and innovation here — expect the unexpected in this domain",
    Neptune: "imagination and idealism colour this area — it can be both inspiring and confusing",
    Pluto: "deep transformation happens here — power dynamics and rebirth are recurring themes",
    Node: "your soul's growth direction points through this area — leaning into it feels unfamiliar but right",
    Lilith: "your untamed shadow power sits here — this area exposes what you refuse to suppress or domesticate",
    Chiron: "your deepest wound lives here — healing it becomes your greatest gift to others",
  };

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
        <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.primary, marginBottom: 8 }}>Your Natal Chart — A Snapshot of the Sky at Your Birth</div>
        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
          At the moment you were born, every planet occupied a specific position in the zodiac. This page shows that snapshot. The <strong>planet table</strong> lists where each planet was, in both Western (Tropical) and Vedic (Sidereal) systems. The <strong>wheel</strong> is a visual map — the outer ring shows zodiac signs, inner lines divide 12 life areas called "houses," and planet symbols sit where they actually were.
        </p>
        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, marginTop: 8 }}>
          <strong>How to read it:</strong> Each planet represents a part of your psyche — ☉ Sun is your core identity, ☽ Moon is your emotions, ☿ Mercury is how you think, ♀ Venus is how you love, ♂ Mars is your drive. The sign a planet is in colors how that part of you expresses. The house it falls in shows which life area it activates.
        </p>
      </Card>
      <div style={grid2}>
        <Card title="☉ Where Each Planet Was — Western &amp; Vedic">
          <PlanetTable positions={res.trop} siderealPositions={res.sid} jd={res.jd} />
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card title="⊙ Your Birth Chart">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <WheelWithTooltip positions={res.trop} houses={res.houses} size={340} id="natal" />
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
          <Card title="⌂ Life Areas (Houses) — Where Things Happen For You">
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
                  {pls.length > 0 && pls.map(p => (
                    <p key={p} style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.66rem", lineHeight: 1.45, color: M3.onSurface, margin: "4px 0 0", paddingLeft: 8, borderLeft: `2px solid ${P_COL[p] || M3.primary}44` }}>
                      <strong style={{ color: P_COL[p] || M3.primary }}>{P_SYM[p]} {p}</strong> — {PLANET_IN_HOUSE[p] || "active in this area of your life"}.
                    </p>
                  ))}
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
