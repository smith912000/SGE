export default function SolarTab({ ctx }) {
  const {
    M3,
    RAD,
    grid2,
    res,
    SIGN_INFO,
    SIGN_COL,
    P_COL,
    zodSign,
    Card,
    PlanetTable,
    WheelWithTooltip,
  } = ctx;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: `linear-gradient(135deg,${M3.tertiaryContainer}88,${M3.surfaceContainer})`, borderColor: `${M3.tertiary}44` }}>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.tertiary, marginBottom: 8 }}>Solar Return - your annual reset</div>
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.83rem", lineHeight: 1.65, color: M3.onSurface, margin: "0 0 10px" }}>
              Once a year, the Sun returns to the <em>exact degree and minute</em> it occupied when you were born. That precise moment - the Solar Return - acts as a cosmic reset.
            </p>
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.83rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
              The Solar Return chart is read like a natal chart, but its influence lasts only one year.
            </p>
          </div>
          <svg width="160" height="160" viewBox="0 0 160 160" style={{ flexShrink: 0 }}>
            <circle cx="80" cy="80" r="12" fill={M3.tertiary} opacity="0.9" />
            <text x="80" y="80" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontFamily="serif">☉</text>
            <circle cx="80" cy="80" r="55" fill="none" stroke={M3.outline} strokeWidth="1" strokeDasharray="4 3" />
            {[0, 90, 180, 270].map((a, i) => {
              const x = 80 + 55 * Math.cos((a - 90) * RAD), y = 80 + 55 * Math.sin((a - 90) * RAD);
              return <circle key={i} cx={x} cy={y} r="4" fill={i === 0 ? M3.tertiary : M3.outlineVariant} stroke={M3.primary} strokeWidth="0.5" />;
            })}
            <text x="80" y="16" textAnchor="middle" fill={M3.tertiary} fontSize="8" fontFamily="'Share Tech Mono',monospace">SR MOMENT</text>
            <path d={`M80,25 A55,55 0 0,1 ${80 + 55} 80`} fill="none" stroke={M3.tertiary} strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
        </div>
      </Card>

      {res.srJD ? (
        <>
          {res.srPos && (() => {
            const SI = SIGN_INFO;
            const srSun = zodSign(res.srPos.Sun);
            const srMoon = zodSign(res.srPos.Moon);
            const srMars = zodSign(res.srPos.Mars);
            const srVenus = zodSign(res.srPos.Venus);
            const srJup = zodSign(res.srPos.Jupiter);
            const srSat = zodSign(res.srPos.Saturn);

            const signFeel = (s) => (SI[s]?.plain || "").split(".").slice(0, 2).join(".").trim();
            const signShort = (s) => s === "Aries" ? "bold, direct, and action-oriented" : s === "Taurus" ? "steady, grounded, and comfort-seeking" : s === "Gemini" ? "curious, sociable, and mentally restless" : s === "Cancer" ? "nurturing, protective, and emotionally sensitive" : s === "Leo" ? "warm, expressive, and creativity-driven" : s === "Virgo" ? "precise, helpful, and improvement-focused" : s === "Libra" ? "diplomatic, harmonious, and partnership-oriented" : s === "Scorpio" ? "intense, transformative, and deeply probing" : s === "Sagittarius" ? "expansive, freedom-loving, and truth-seeking" : s === "Capricorn" ? "disciplined, ambitious, and structure-building" : s === "Aquarius" ? "unconventional, community-minded, and future-focused" : "intuitive, empathic, and boundary-dissolving";

            const yearCards = [
              { icon: "☉", title: "The Overall Tone of Your Year", sign: srSun, col: P_COL.Sun, body: `Your year is set in a ${srSun} key - ${signShort(srSun)}. This colours everything: your sense of identity this year, what feels important, and the general atmosphere of your daily life. Think of this as the background music that plays all year.` },
              { icon: "☽", title: "Your Emotional Landscape This Year", sign: srMoon, col: P_COL.Moon, body: `Emotionally, this year runs on ${srMoon} energy - ${signShort(srMoon)}. This is how you'll process your feelings, what kind of comfort you'll seek, and what will make you feel safe or unsettled.` },
              { icon: "♀", title: "Love and Relationships This Year", sign: srVenus, col: P_COL.Venus, body: `Venus in ${srVenus} shapes how you connect with others this year - ${signShort(srVenus)}. This affects romantic relationships, friendships, your aesthetic tastes, and how you spend money on pleasure.` },
              { icon: "♂", title: "How You'll Take Action This Year", sign: srMars, col: P_COL.Mars, body: `Mars in ${srMars} drives your energy and initiative - ${signShort(srMars)}. This determines how you'll fight for what you want, what motivates you, and how you handle conflict.` },
              { icon: "♃", title: "Where Life Opens Up for You", sign: srJup, col: P_COL.Jupiter, body: `Jupiter in ${srJup} shows where opportunity, growth, and good fortune flow this year - ${signShort(srJup)}.` },
              { icon: "♄", title: "Where Life Tests You This Year", sign: srSat, col: P_COL.Saturn, body: `Saturn in ${srSat} shows where you'll face the hardest lessons - ${signShort(srSat)}. This is where life asks you to get serious and do the work.` },
            ];
            return (
              <>
                <Card title="↩ Your Year Ahead - What Each Planet Brings">
                  <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.55, color: M3.onSurfaceVariant, margin: "0 0 16px" }}>
                    Each section below describes a different area of your life over the coming year. This is based on where the planets were at the exact moment the Sun returned to its birth position - your annual reset point.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {yearCards.map((yc) => (
                      <div key={yc.title} style={{ padding: "14px 16px", borderRadius: 12, background: yc.col + "08", border: `1px solid ${yc.col}22` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                          <span style={{ fontSize: "1.2rem", color: yc.col }}>{yc.icon}</span>
                          <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.76rem", fontWeight: "700", color: yc.col }}>{yc.title}</span>
                          <span style={{ marginLeft: "auto", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", color: SIGN_COL[yc.sign], fontWeight: "600" }}>{yc.sign}</span>
                        </div>
                        <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.8rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>{yc.body}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card title="↩ Year Ahead - Summary">
                  <div style={{ padding: "14px 16px", background: M3.surfaceVariant, borderRadius: 12, fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.84rem", color: M3.onSurface, lineHeight: 1.8 }}>
                    <p style={{ margin: 0 }}>
                      This year's overall atmosphere is {signShort(srSun)}. Your emotional life will feel {signShort(srMoon)} - {signFeel(srMoon).toLowerCase()}. In relationships, you'll be drawn to {signShort(srVenus).split(",")[0].toLowerCase()} dynamics. Your drive and energy will be {signShort(srMars).split(",")[0].toLowerCase()}.
                    </p>
                    <p style={{ margin: "10px 0 0" }}>
                      The biggest opportunities this year come through {signShort(srJup).split(",").slice(0, 2).join(" and").toLowerCase()} - lean into these areas when doors open. The hardest lessons involve {signShort(srSat).split(",").slice(0, 2).join(" and").toLowerCase()}.
                    </p>
                  </div>
                </Card>
              </>
            );
          })()}

          <div style={grid2}>
            <Card title="↩ Year-Ahead Planet Positions">
              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: "0 0 10px" }}>
                These are the exact positions of each planet at your Solar Return moment - the raw data behind the descriptions above.
              </p>
              {res.srPos && <PlanetTable positions={res.srPos} />}
            </Card>
            <Card title="↩ Year-Ahead Wheel">
              <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.72rem", lineHeight: 1.5, color: M3.onSurfaceVariant, margin: "0 0 10px" }}>
                The wheel shows where each planet sits in the zodiac for your year ahead. Hover or tap any planet for details.
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <WheelWithTooltip positions={res.srPos} size={300} id="sr" />
              </div>
            </Card>
          </div>
        </>
      ) : (
        <Card><div style={{ textAlign: "center", color: M3.secondary, fontFamily: "'Share Tech Mono',monospace", padding: 40 }}>Solar return not found in search range.</div></Card>
      )}
    </div>
  );
}
