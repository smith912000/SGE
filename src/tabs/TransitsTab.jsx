export default function TransitsTab({ ctx }) {
  const {
    M3,
    res,
    norm,
    ASPECTS,
    ASP_EXPLAIN,
    P_COL,
    P_SYM,
    zodSign,
    zodDeg,
    Card,
    AspectTable,
    WheelWithTooltip,
  } = ctx;

  const SIGN_ORDER = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

  const TRANSIT_MEANING = {
    Sun: { slow: false, flavor: "spotlight, vitality, conscious focus" },
    Moon: { slow: false, flavor: "mood shifts, emotional triggers, daily rhythms" },
    Mercury: { slow: false, flavor: "communication shifts, mental focus, travel patterns" },
    Venus: { slow: false, flavor: "relationships, pleasure, financial flow, aesthetic sense" },
    Mars: { slow: false, flavor: "energy levels, motivation, conflict triggers, physical drive" },
    Jupiter: { slow: true, flavor: "expansion, opportunity, optimism, where life opens up" },
    Saturn: { slow: true, flavor: "discipline, restriction, maturing, where life gets serious" },
    Uranus: { slow: true, flavor: "sudden change, liberation, breakthroughs, disruption" },
    Neptune: { slow: true, flavor: "dreams, confusion, spiritual openings, dissolving boundaries" },
    Pluto: { slow: true, flavor: "deep transformation, power shifts, endings and rebirths" },
  };

  const activeTransits = Object.entries(res.trPos).map(([p, lon]) => {
    const natalLon = res.trop[p];
    const diff = Math.abs(norm(lon - natalLon));
    const angle = diff > 180 ? 360 - diff : diff;
    const aspMatch = ASPECTS.find((a) => Math.abs(angle - a.angle) <= a.orb);
    return { p, lon, aspMatch };
  });
  const hits = activeTransits.filter((t) => t.aspMatch);

  const majorTransitPlanets = ["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune","Pluto"]
    .filter((p) => res.trPos?.[p] != null)
    .map((p) => ({ p, lon: res.trPos[p], sign: zodSign(res.trPos[p]) }));

  const signCounts = majorTransitPlanets.reduce((acc, t) => {
    acc[t.sign] = (acc[t.sign] || 0) + 1;
    return acc;
  }, {});

  const topSign = Object.entries(signCounts).sort((a, b) => b[1] - a[1])[0] || [null, 0];

  let bestBand = { signs: [], planets: [] };
  for (let i = 0; i < SIGN_ORDER.length; i++) {
    const s1 = SIGN_ORDER[i];
    const s2 = SIGN_ORDER[(i + 1) % SIGN_ORDER.length];
    const bandPlanets = majorTransitPlanets.filter((t) => t.sign === s1 || t.sign === s2);
    if (bandPlanets.length > bestBand.planets.length) bestBand = { signs: [s1, s2], planets: bandPlanets };
  }

  const conjunctionPairs = [];
  for (let i = 0; i < majorTransitPlanets.length; i++) {
    for (let j = i + 1; j < majorTransitPlanets.length; j++) {
      const a = majorTransitPlanets[i];
      const b = majorTransitPlanets[j];
      const raw = Math.abs(norm(a.lon - b.lon));
      const sep = raw > 180 ? 360 - raw : raw;
      if (sep <= 6) conjunctionPairs.push({ a: a.p, b: b.p, sep });
    }
  }
  conjunctionPairs.sort((x, y) => x.sep - y.sep);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline }}>
        <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.primary, marginBottom: 8 }}>Transits — Where the Planets Are Right Now vs Your Birth</div>
        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
          Transits are the current positions of the planets compared to where they were when you were born. When a planet in the sky today forms an angle (aspect) to one of your birth planets, its energy "activates" that part of your chart. This is the foundation of astrological timing — it shows what themes are live for you <em>right now</em>.
        </p>
        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.65, color: M3.onSurface, marginTop: 8 }}>
          <strong>Fast planets</strong> (Sun, Moon, Mercury, Venus, Mars) move quickly and create brief, passing influences — moods, events, conversations.
          <strong> Slow planets</strong> (Jupiter, Saturn, Uranus, Neptune, Pluto) move gradually and create major life chapters lasting months or years.
        </p>
      </Card>

      <Card title="⟳ Today's Sky vs Your Birth — What's Active Now">
        <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: M3.secondary, marginBottom: 10, letterSpacing: "0.1em" }}>
          {new Date().toDateString().toUpperCase()} — {hits.length} of {activeTransits.length} planets are actively aspecting your chart
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {activeTransits.map(({ p, lon, aspMatch }) => {
            const tm = TRANSIT_MEANING[p] || {};
            return (
              <div key={p} style={{ padding: "8px 12px", borderRadius: 8, background: aspMatch ? aspMatch.col + "0e" : "transparent", border: aspMatch ? `1px solid ${aspMatch.col}18` : "1px solid transparent" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: P_COL[p], width: 18, textAlign: "center", fontSize: "1rem" }}>{P_SYM[p]}</span>
                  <span style={{ color: M3.onSurface, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "600", minWidth: 70 }}>{p}</span>
                  <span style={{ color: M3.onSurfaceVariant, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", flex: 1 }}>
                    currently in {zodSign(lon)} at {zodDeg(lon)}°
                  </span>
                  {aspMatch && (
                    <span style={{ color: aspMatch.col, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", fontWeight: "700" }}>
                      {aspMatch.sym} {aspMatch.name}
                    </span>
                  )}
                </div>
                {aspMatch && (
                  <div style={{ marginTop: 5, marginLeft: 26 }}>
                    <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: 0 }}>
                      Transiting {p} ({tm.flavor || ""}) is forming a <strong style={{ color: aspMatch.col }}>{aspMatch.name}</strong> ({ASP_EXPLAIN[aspMatch.name] || aspMatch.name}) to your birth {p}.
                      {tm.slow ? " This is a slow-moving transit — its influence unfolds over weeks or months and marks a significant chapter." : " This is a fast-moving transit — its influence is felt today and passes within days."}
                    </p>
                  </div>
                )}
                {!aspMatch && (
                  <div style={{ marginTop: 3, marginLeft: 26 }}>
                    <span style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.68rem", color: M3.outlineVariant, fontStyle: "italic" }}>
                      No direct aspect to your birth {p} today — this area is quiet.
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <Card title="✦ Planetary Alignment Radar — Today">
        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 10px" }}>
          Alignment is measured two ways: <strong>sign concentration</strong> (many planets in one sign) and <strong>conjunction clusters</strong> (planets within ~6° of each other). This helps detect events like "six planets are aligned."
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
          <div style={{ padding: "10px 12px", borderRadius: 10, background: M3.surfaceDim }}>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.64rem", color: M3.secondary, marginBottom: 6 }}>TOP SINGLE-SIGN CLUSTER</div>
            <div style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", color: M3.onSurface }}>
              {topSign[0] ? `${topSign[1]} planets in ${topSign[0]}` : "No data"}
            </div>
          </div>
          <div style={{ padding: "10px 12px", borderRadius: 10, background: M3.surfaceDim }}>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.64rem", color: M3.secondary, marginBottom: 6 }}>BEST TWO-SIGN BAND</div>
            <div style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", color: M3.onSurface }}>
              {bestBand.signs.length ? `${bestBand.planets.length} planets across ${bestBand.signs[0]} + ${bestBand.signs[1]}` : "No data"}
            </div>
            {bestBand.planets.length > 0 && (
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: M3.onSurfaceVariant, marginTop: 4 }}>
                {bestBand.planets.map((t) => `${P_SYM[t.p]} ${t.p}`).join(" · ")}
              </div>
            )}
          </div>
        </div>
        <div style={{ marginTop: 10, padding: "8px 10px", borderRadius: 8, background: M3.primaryContainer + "22" }}>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: M3.primary, marginBottom: 4 }}>TIGHT CONJUNCTIONS (≤6°)</div>
          <div style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", color: M3.onSurfaceVariant }}>
            {conjunctionPairs.length
              ? conjunctionPairs.slice(0, 8).map((c) => `${P_SYM[c.a]} ${c.a} - ${P_SYM[c.b]} ${c.b} (${c.sep.toFixed(1)}°)`).join(" | ")
              : "No tight major-planet conjunctions right now."}
          </div>
        </div>
      </Card>

      <Card title="⊙ Transit Wheel — Current Sky Positions">
        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: "0 0 10px" }}>
          Yes — transits are now shown as a dedicated wheel map of where planets are in the sky today.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WheelWithTooltip positions={res.trPos} size={340} id="transit_now" />
        </div>
      </Card>

      {res.trAsp.length > 0 && (
        <Card title={`⟳ All Cross-Chart Connections (${res.trAsp.length})`}>
          <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: "0 0 10px" }}>
            This table shows every connection between the sky today and your birth chart. Stronger connections (higher %) are felt more powerfully. Look for slow-planet aspects — those shape the major themes of this period.
          </p>
          <AspectTable aspects={res.trAsp.slice(0, 30)} />
        </Card>
      )}
    </div>
  );
}
