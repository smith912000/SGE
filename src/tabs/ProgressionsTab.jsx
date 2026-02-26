export default function ProgressionsTab({ ctx }) {
  const {
    M3,
    age,
    res,
    zodSign,
    SIGN_COL,
    SIGN_INFO,
    P_COL,
    P_SYM,
    grid2,
    calcAspects,
    Card,
    PlanetTable,
    WheelWithTooltip,
    AspectTable,
  } = ctx;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ background: `linear-gradient(135deg,${M3.secondaryContainer}88,${M3.surfaceContainer})`, borderColor: M3.outline }}>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontFamily: "Cinzel,serif", fontSize: "1rem", color: M3.secondary, marginBottom: 8 }}>Secondary Progressions - who you're becoming</div>
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.83rem", lineHeight: 1.65, color: M3.onSurface, margin: "0 0 10px" }}>
              Imagine your birth chart is a seed. Secondary progressions show how that seed has grown. The method is simple but profound: <strong style={{ color: M3.primary }}>one day after birth = one year of life</strong>. So at age {age}, the planets are read from the sky {age} days after you were born.
            </p>
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.83rem", lineHeight: 1.65, color: M3.onSurface, margin: 0 }}>
              The Progressed Moon changes sign every ~2.5 years and is the most felt. The Progressed Sun shifts sign roughly every 30 years - a complete identity rebirth.
            </p>
          </div>
          <svg width="160" height="160" viewBox="0 0 160 160" style={{ flexShrink: 0 }}>
            <line x1="80" y1="10" x2="80" y2="150" stroke={M3.outline} strokeWidth="2" />
            {[0, 10, 20, 30, 40, age].map((a, i) => {
              const y = 10 + a * 3.5;
              const isNow = a === age;
              return (
                <g key={i}>
                  <line x1="72" y1={y} x2="88" y2={y} stroke={isNow ? M3.tertiary : M3.outlineVariant} strokeWidth={isNow ? 2 : 1} />
                  <text x="65" y={y} textAnchor="end" dominantBaseline="middle" fill={isNow ? M3.tertiary : M3.onSurfaceVariant} fontSize="9" fontFamily="'Share Tech Mono',monospace">{a}y</text>
                  {isNow && <text x="92" y={y} dominantBaseline="middle" fill={M3.tertiary} fontSize="8" fontFamily="'Share Tech Mono',monospace">{"<- NOW"}</text>}
                </g>
              );
            })}
            <text x="80" y="6" textAnchor="middle" fill={M3.secondary} fontSize="8" fontFamily="'Share Tech Mono',monospace">BIRTH</text>
          </svg>
        </div>
      </Card>

      {(() => {
        const nSun = zodSign(res.trop.Sun), pSun = zodSign(res.prog.Sun), nMoon = zodSign(res.trop.Moon), pMoon = zodSign(res.prog.Moon);
        const sunChanged = nSun !== pSun, moonChanged = nMoon !== pMoon;
        const PROG_SIGN_ARC = {
          Aries: "assertiveness, independence, and a pioneering spirit - you're learning to put yourself first",
          Taurus: "patience, sensory pleasure, and building real value - you're learning what truly lasts",
          Gemini: "curiosity, communication, and intellectual exploration - you're learning to ask better questions",
          Cancer: "emotional depth, nurturing, and creating home - you're learning what it means to belong",
          Leo: "creative self-expression, courage, and visibility - you're learning to let yourself be seen",
          Virgo: "precision, service, and practical mastery - you're learning that excellence is a form of love",
          Libra: "partnership, balance, and aesthetic refinement - you're learning that you don't have to do it alone",
          Scorpio: "depth, transformation, and radical honesty - you're learning to let go of what no longer serves you",
          Sagittarius: "expansion, adventure, and philosophical inquiry - you're learning that the truth is bigger than you thought",
          Capricorn: "ambition, structure, and earned authority - you're learning that real power comes with real responsibility",
          Aquarius: "individuality, innovation, and community vision - you're learning to be yourself in service to something larger",
          Pisces: "compassion, imagination, and spiritual surrender - you're learning that letting go is the deepest form of strength",
        };
        return (
          <Card title="📖 Your Growth Arc - Where Life Has Taken You">
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.82rem", lineHeight: 1.7, color: M3.onSurface, margin: "0 0 14px" }}>
              Your progressions tell the story of your inner evolution - not events that happened to you, but the way your character has deepened and shifted over time.
            </p>
            {sunChanged ? (
              <div style={{ padding: "14px 16px", borderRadius: 12, background: P_COL.Sun + "12", border: `1px solid ${P_COL.Sun}33`, marginBottom: 12 }}>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: P_COL.Sun, letterSpacing: "0.1em", marginBottom: 6 }}>☉ IDENTITY SHIFT - {nSun} {"->"} {pSun}</div>
                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.8rem", lineHeight: 1.7, color: M3.onSurface, margin: 0 }}>
                  You were born with a <strong style={{ color: SIGN_COL[nSun] }}>{nSun}</strong> identity - {SIGN_INFO[nSun].plain.split(".")[0].toLowerCase()}. Over the course of your life, your progressed Sun has moved into <strong style={{ color: SIGN_COL[pSun] }}>{pSun}</strong>. This is a profound chapter change: your core self is now developing through {PROG_SIGN_ARC[pSun]}. This doesn't erase your birth Sun - it layers a new dimension of growth on top of it. You may notice that the concerns and interests that drive you now are different from what drove you as a young person.
                </p>
              </div>
            ) : (
              <div style={{ padding: "12px 16px", borderRadius: 10, background: M3.surfaceDim, marginBottom: 12 }}>
                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: 0 }}>
                  Your progressed Sun is still in <strong style={{ color: SIGN_COL[nSun] }}>{nSun}</strong> - you're still deepening the core identity you were born with. This is a period of mastery rather than reinvention.
                </p>
              </div>
            )}
            {moonChanged ? (
              <div style={{ padding: "14px 16px", borderRadius: 12, background: P_COL.Moon + "12", border: `1px solid ${P_COL.Moon}33`, marginBottom: 12 }}>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: P_COL.Moon, letterSpacing: "0.1em", marginBottom: 6 }}>☽ EMOTIONAL SHIFT - {nMoon} {"->"} {pMoon}</div>
                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.8rem", lineHeight: 1.7, color: M3.onSurface, margin: 0 }}>
                  Your emotional landscape has shifted. Born with a <strong style={{ color: SIGN_COL[nMoon] }}>{nMoon}</strong> Moon, your instinctive emotional style was {SIGN_INFO[nMoon].plain.split(".")[0].toLowerCase()}. Now, with the progressed Moon in <strong style={{ color: SIGN_COL[pMoon] }}>{pMoon}</strong>, you're processing feelings through a new lens: {PROG_SIGN_ARC[pMoon]}. The progressed Moon changes sign every ~2.5 years, so this is a shorter chapter - but deeply felt. Pay attention to what you crave emotionally right now. It's different from what you craved a few years ago, and that shift is purposeful growth.
                </p>
              </div>
            ) : (
              <div style={{ padding: "12px 16px", borderRadius: 10, background: M3.surfaceDim, marginBottom: 12 }}>
                <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.78rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: 0 }}>
                  Your progressed Moon is still in <strong style={{ color: SIGN_COL[nMoon] }}>{nMoon}</strong> - your emotional needs are currently being refined within the same sign you were born with, deepening rather than shifting.
                </p>
              </div>
            )}
            <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.76rem", lineHeight: 1.6, color: M3.onSurfaceVariant, margin: 0, fontStyle: "italic" }}>
              {sunChanged && moonChanged ? "Both your identity and emotional life are in active transition - this is an intense period of personal evolution. Be gentle with yourself; you're changing at every level."
                : sunChanged ? "Your identity is shifting while your emotional base holds steady - you have an anchor even as your sense of self evolves."
                  : moonChanged ? "Your emotional world is in transition while your core identity stays rooted - you're learning new ways to feel without losing who you are."
                    : "Neither your Sun nor Moon have changed signs yet - you're in a period of deepening and consolidation, building strength in the foundations you were born with."}
            </p>
          </Card>
        );
      })()}

      <Card title={`→ How You've Evolved by Age ${age}`}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
          {["Sun", "Moon", "Mercury", "Venus", "Mars"].map((planet) => {
            const natalSign = zodSign(res.trop[planet]);
            const progSign = zodSign(res.prog[planet]);
            const changed = natalSign !== progSign;
            return (
              <div key={planet} style={{ padding: "10px 14px", borderRadius: 10, background: changed ? P_COL[planet] + "18" : M3.surfaceDim, border: `1px solid ${changed ? P_COL[planet] + "55" : M3.outlineVariant}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                  <span style={{ color: P_COL[planet], fontSize: "1rem" }}>{P_SYM[planet]}</span>
                  <span style={{ color: P_COL[planet], fontFamily: "'Share Tech Mono',monospace", fontSize: "0.72rem", fontWeight: "700" }}>{planet}</span>
                  {changed && <span style={{ marginLeft: "auto", background: M3.tertiary, color: M3.onPrimary, fontSize: "0.58rem", padding: "1px 6px", borderRadius: 10, fontFamily: "'Share Tech Mono',monospace" }}>SHIFTED</span>}
                </div>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.68rem", color: M3.onSurfaceVariant }}>
                  <span style={{ color: SIGN_COL[natalSign] }}>Born: {natalSign}</span>
                  {changed && <span style={{ color: M3.secondary }}> → </span>}
                  {changed && <span style={{ color: SIGN_COL[progSign] }}>Now: {progSign}</span>}
                </div>
                {changed && (
                  <p style={{ fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.71rem", color: M3.onSurface, lineHeight: 1.5, margin: "6px 0 0" }}>
                    {planet === "Sun" ? `Your core identity is now expressing through ${progSign} - a different register than birth.`
                      : planet === "Moon" ? `Your emotional needs have shifted toward ${progSign} themes.`
                        : planet === "Venus" ? `What you find beautiful and how you love carries ${progSign} flavour now.`
                          : planet === "Mars" ? `Your drive and action style now operates through ${progSign} energy.`
                            : `Your thinking and communication has evolved to ${progSign} mode.`}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <div style={grid2}>
        <Card title={`→ Evolved Positions - Age ${age}`}>
          <PlanetTable positions={res.prog} />
        </Card>
        <Card title="→ Evolved Chart Wheel">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WheelWithTooltip positions={res.prog} houses={res.houses} size={300} id="prog" />
          </div>
        </Card>
      </div>

      <Card title="→ Evolved Connections">
        <AspectTable aspects={calcAspects(res.prog)} />
      </Card>
    </div>
  );
}
