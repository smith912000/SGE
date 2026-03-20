import { useState } from "react";
import { ASP_SHORT } from "../data/astrology/aspects.js";
import { P_SYM, P_ROLE } from "../data/astrology/planets.js";
import { PAIR_INSIGHT } from "../data/deepAnalysis/pairInsights.js";
import { getPreferenceFocus, setPreferenceFocus, FOCUS_OPTIONS } from "../store/userPreferences.js";

export default function TodayTab({ ctx }) {
  const {
    M3,
    res,
    norm,
    ASPECTS,
    ASP_EXPLAIN,
    P_COL,
    P_SYM: P_SYM_CTX,
    zodSign,
    zodDeg,
    Card,
  } = ctx;

  const [focus, setFocus] = useState(() => getPreferenceFocus());
  const [horizon, setHorizon] = useState("today"); // today, week, month

  const saveFocus = (f) => {
    setFocus(f);
    setPreferenceFocus(f);
  };

  const P_SYM_USE = P_SYM_CTX || P_SYM;

  const cleanName = (n) => n.replace(/^(T_|B_|A_|natal_|transit_)/, "");

  const aspects = (res.trAsp || []).map((a) => ({
    ...a,
    p1c: cleanName(a.p1),
    p2c: cleanName(a.p2),
  }));

  const getPairInsight = (p1, p2) => {
    const r0 = P_ROLE[p1] || p1;
    const r1 = P_ROLE[p2] || p2;
    return (
      PAIR_INSIGHT[`${r0}+${r1}`] ||
      PAIR_INSIGHT[`${r1}+${r0}`] ||
      "these two parts of you are in dialogue — the current sky is asking them to work together more consciously."
    );
  };

  const SLOW_PLANETS = ["Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
  const VERY_SLOW = ["Uranus", "Neptune", "Pluto"];
  
  const horizonAspects = aspects.filter(a => {
    if (horizon === "today") return true;
    if (horizon === "week") return SLOW_PLANETS.includes(a.p1c) || SLOW_PLANETS.includes(a.p2c) || ["Mars", "Venus", "Sun"].includes(a.p1c);
    if (horizon === "month") return SLOW_PLANETS.includes(a.p1c) || SLOW_PLANETS.includes(a.p2c);
    return true;
  });

  const slowHits = aspects.filter(
    (a) => SLOW_PLANETS.includes(a.p1c) || SLOW_PLANETS.includes(a.p2c)
  );
  const weekAnchor =
    slowHits.length > 0
      ? [...slowHits].sort((x, y) => (y.strength || 0) - (x.strength || 0))[0]
      : null;

  const themedCategories = [
    {
      id: "love",
      label: "Love & Relationships",
      desc: {
        today: "How your heart and connections are being activated today.",
        week: "The emotional pulse and relationship themes of your week.",
        month: "Major shifts in your connection style and heart-centered growth."
      },
      planets: ["Venus", "Mars", "Moon"],
    },
    {
      id: "work",
      label: "Work, Career & Money",
      desc: {
        today: "Momentum around goals, career, and resources today.",
        week: "Strategic opportunities and practical focus for the coming days.",
        month: "Long-term professional expansion and financial planning."
      },
      planets: ["Sun", "Saturn", "Jupiter"],
    },
    {
      id: "growth",
      label: "Inner Growth & Destiny",
      desc: {
        today: "Individual shifts in purpose sparking today.",
        week: "The deeper narrative arc unfolding in your life right now.",
        month: "The karmic and evolutionary background of your month."
      },
      planets: ["Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"],
    },
    {
      id: "body",
      label: "Body, Mood & Energy",
      desc: {
        today: "How your nervous system and vitality may feel today.",
        week: "Rest and activity cycles for the next seven days.",
        month: "The overall energetic baseline for your physical well-being."
      },
      planets: ["Sun", "Moon", "Mars"],
    },
  ];

  // Reorder based on focus preference
  const FOCUS_ORDER = {
    love: ["love", "body", "growth", "work"],
    career: ["work", "growth", "body", "love"],
    spiritual: ["growth", "love", "body", "work"],
    body: ["body", "love", "work", "growth"],
    all: ["love", "work", "growth", "body"],
  };
  const catOrder = FOCUS_ORDER[focus] || FOCUS_ORDER.all;
  const sortedCategories = [...themedCategories].sort(
    (a, b) => catOrder.indexOf(a.id) - catOrder.indexOf(b.id)
  );

  const pickTopAspect = (planets) => {
    const hits = horizonAspects.filter(
      (a) => planets.includes(a.p1c) || planets.includes(a.p2c)
    );
    if (!hits.length) return null;
    return [...hits].sort((x, y) => (y.strength || 0) - (x.strength || 0))[0];
  };

  const todayStr = horizon === "today" ? new Date().toDateString() : (horizon === "week" ? "Week of " + new Date().toLocaleDateString() : new Date().toLocaleString('default', { month: 'long', year: 'numeric' }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* ── Horizon & Focus Preference ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:12 }}>
        <div style={{ padding: "12px 16px", borderRadius: 12, background: M3.surfaceContainer, border: `1px solid ${M3.outlineVariant}` }}>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: M3.secondary, letterSpacing: "0.12em", marginBottom: 8 }}>
            TIME HORIZON
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["today", "week", "month"].map(h => (
              <button key={h} onClick={() => setHorizon(h)}
                style={{
                  flex: 1, fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", cursor: "pointer",
                  padding: "5px 4px", borderRadius: 6, border: `1px solid ${horizon === h ? M3.primary : M3.outlineVariant}`,
                  background: horizon === h ? M3.primary + "22" : "transparent",
                  color: horizon === h ? M3.primary : M3.onSurfaceVariant,
                  transition: "all 0.2s", textTransform: "capitalize"
                }}>
                {h}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: "12px 16px", borderRadius: 12, background: M3.surfaceContainer, border: `1px solid ${M3.outlineVariant}` }}>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.62rem", color: M3.secondary, letterSpacing: "0.12em", marginBottom: 8 }}>
            YOUR FOCUS
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {FOCUS_OPTIONS.map(opt => (
              <button key={opt.id} onClick={() => saveFocus(opt.id)}
                style={{
                  fontFamily: "'EB Garamond',Georgia,serif", fontSize: "0.74rem", cursor: "pointer",
                  padding: "4px 10px", borderRadius: 20, border: `1px solid ${focus === opt.id ? M3.primary : M3.outlineVariant}`,
                  background: focus === opt.id ? M3.primary + "22" : "transparent",
                  color: focus === opt.id ? M3.primary : M3.onSurfaceVariant,
                  transition: "all 0.2s"
                }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Card
        style={{
          background: `linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`,
          borderColor: M3.outline,
        }}
      >
        <div
          style={{
            fontFamily: "Cinzel,serif",
            fontSize: "1rem",
            color: M3.primary,
            marginBottom: 8,
          }}
        >
          Today&apos;s Sky — Guided Themes
        </div>
        <p
          style={{
            fontFamily: "'EB Garamond',Georgia,serif",
            fontSize: "0.82rem",
            lineHeight: 1.65,
            color: M3.onSurface,
            margin: 0,
          }}
        >
          This page translates the transits tab into four simple lenses:{" "}
          <strong>love</strong>, <strong>work</strong>,{" "}
          <strong>inner growth</strong>, and <strong>body/mood</strong>. It
          starts with the <strong>slow-planet background chapter</strong> that
          colours this week, then shows where today&apos;s sky most strongly
          connects to your birth chart.
        </p>
        <p
          style={{
            fontFamily: "'Share Tech Mono',monospace",
            fontSize: "0.68rem",
            color: M3.secondary,
            marginTop: 8,
            letterSpacing: "0.12em",
          }}
        >
          {todayStr.toUpperCase()} — {res.trAsp?.length || 0} transit
          connections to your chart
        </p>
        {weekAnchor && (
          <div
            style={{
              marginTop: 10,
              padding: "10px 12px",
              borderRadius: 10,
              background: (weekAnchor.col || M3.primary) + "12",
              border: `1px solid ${(weekAnchor.col || M3.primary) + "33"}`,
            }}
          >
            <div
              style={{
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: "0.66rem",
                color: weekAnchor.col || M3.primary,
                letterSpacing: "0.1em",
                marginBottom: 4,
              }}
            >
              THIS WEEK&apos;S BIG BACKGROUND TRANSIT
            </div>
            {(() => {
              const n1 = cleanName(weekAnchor.p1);
              const n2 = cleanName(weekAnchor.p2);
              const r0 = P_ROLE[n1] || n1;
              const r1 = P_ROLE[n2] || n2;
              const short =
                ASP_SHORT[weekAnchor.name] ||
                weekAnchor.name.toLowerCase();
              const expl = ASP_EXPLAIN[weekAnchor.name] || short;
              const insight = getPairInsight(n1, n2);
              return (
                <p
                  style={{
                    fontFamily: "'EB Garamond',Georgia,serif",
                    fontSize: "0.76rem",
                    lineHeight: 1.6,
                    color: M3.onSurface,
                    margin: 0,
                  }}
                >
                  A slow-moving planet is setting the tone for several days:{" "}
                  <strong>
                    {n1 === n2 ? n1 : `${n1} and ${n2}`} {weekAnchor.sym}{" "}
                    {weekAnchor.name}
                  </strong>{" "}
                  ({expl}). In plain language, this links your{" "}
                  {` ${r0.toLowerCase()}`} and{" "}
                  {` ${r1.toLowerCase()}`} — {insight} Expect this theme
                  to colour the whole week rather than just a single day.
                </p>
              );
            })()}
          </div>
        )}
        {res.mathematical_resonance && (
          <div
            style={{
              marginTop: 10,
              padding: "10px 12px",
              borderRadius: 10,
              background: M3.tertiary + "08",
              border: `1px solid ${M3.tertiary}22`,
            }}
          >
            <div
              style={{
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: "0.66rem",
                color: M3.tertiary,
                letterSpacing: "0.1em",
                marginBottom: 4,
                display: "flex", justifyContent: "space-between"
              }}
            >
              <span>SYSTEMIC MATHEMATICAL HARMONY</span>
              <span>{res.mathematical_resonance.systemic_harmony.toUpperCase()}</span>
            </div>
            <p
              style={{
                fontFamily: "'EB Garamond',Georgia,serif",
                fontSize: "0.76rem",
                lineHeight: 1.6,
                color: M3.onSurface,
                margin: 0,
              }}
            >
              The geometry of your profile currently resonates at{" "}
              <strong>
                {(res.mathematical_resonance.average_correlation_index * 100).toFixed(1)}%
              </strong>{" "}
              systemic harmony. This indicates how proportionally aligned your
              current configuration is with the Golden Ratio (Phi),
              Fibonacci sequences, and Tesla&apos;s 369 Vortex Mathematics.
              Highly resonant periods often feel more "synchronic" or orderly.
            </p>
          </div>
        )}
      </Card>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: 12,
        }}
      >
        {sortedCategories.map((cat) => {
          const top = pickTopAspect(cat.planets);
          let body;
          if (!top) {
            body =
              "No strong planet-to-planet activations here today — this area is steady. Focus on integrating longer-term themes rather than forcing change.";
          } else {
            const n1 = cleanName(top.p1);
            const n2 = cleanName(top.p2);
            const role1 = P_ROLE[n1] || "";
            const role2 = P_ROLE[n2] || "";
            const short = ASP_SHORT[top.name] || top.name.toLowerCase();
            const expl = ASP_EXPLAIN[top.name] || short;
            const flavor1 = role1 ? `${role1}` : n1;
            const flavor2 = role2 ? `${role2}` : n2;
            body = `Transiting ${n1 === n2 ? n1 : `${n1} and ${n2}`} links your ${flavor1}${role2 ? ` with your ${flavor2}` : ""
              } via a ${top.name} aspect — ${expl}.`;
          }
          const isPriority = focus !== "all" && sortedCategories.indexOf(cat) === 0;
          return (
            <Card key={cat.id} style={isPriority ? { border: `1.5px solid ${M3.primary}44`, background: `linear-gradient(135deg,${M3.primaryContainer}22,${M3.surfaceContainer})` } : {}}>
              <div
                style={{
                  fontFamily: "Cinzel,serif",
                  fontSize: isPriority ? "0.9rem" : "0.82rem",
                  color: isPriority ? M3.primary : M3.secondary,
                  marginBottom: 4,
                  display: "flex", alignItems: "center", gap: 6
                }}
              >
                {isPriority && <span style={{ fontSize: "0.6rem", background: M3.primary + "22", color: M3.primary, padding: "1px 8px", borderRadius: 20, fontFamily: "'Share Tech Mono',monospace", letterSpacing: "0.08em" }}>FOCUS</span>}
                {cat.label}
              </div>
              <p
                style={{
                  fontFamily: "'EB Garamond',Georgia,serif",
                  fontSize: "0.76rem",
                  lineHeight: 1.6,
                  color: M3.onSurfaceVariant,
                  margin: "0 0 6px",
                }}
              >
                {cat.desc[horizon]}
              </p>
              <p
                style={{
                  fontFamily: "'EB Garamond',Georgia,serif",
                  fontSize: "0.76rem",
                  lineHeight: 1.6,
                  color: M3.onSurface,
                  margin: 0,
                }}
              >
                {body}
              </p>
              {top && (
                <div
                  style={{
                    marginTop: 6,
                    fontFamily: "'Share Tech Mono',monospace",
                    fontSize: "0.64rem",
                    color: top.col || M3.secondary,
                  }}
                >
                  {P_SYM_USE[cleanName(top.p1)] || ""} {cleanName(top.p1)}{" "}
                  {top.sym} {top.name}{" "}
                  {P_SYM_USE[cleanName(top.p2)] || ""} {cleanName(top.p2)} •{" "}
                  {(top.strength * 100).toFixed(0)}% strength
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

