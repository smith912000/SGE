import { useState, useMemo } from 'react';

export default function HoroscopeTab({ ctx }) {
    const { M3, res, zodSign, SIGN_COL, P_COL, P_SYM } = ctx;

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Simple "Daily Vibe" generator based on Sun/Moon sign pairings
    const sunSign = zodSign(res.trop?.Sun || 0);
    const moonSign = zodSign(res.trop?.Moon || 0);

    const insights = useMemo(() => {
        return [
            {
                title: "Energy & Vitality",
                emoji: "⚡",
                text: `With the Sun in ${sunSign}, your core identity is focused on growth. Today's radiation suggests a time for bold moves.`,
                col: SIGN_COL[sunSign]
            },
            {
                title: "Emotional Landscape",
                emoji: "🌊",
                text: `The Moon in ${moonSign} highlights your inner world. You may feel more sensitive to the environment around you today.`,
                col: SIGN_COL[moonSign]
            },
            {
                title: "Love & Connection",
                emoji: "💖",
                text: "Venus suggests that harmony is found in the small details today. Reach out to those who ground you.",
                col: P_COL.Venus
            }
        ];
    }, [sunSign, moonSign, SIGN_COL, P_COL]);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ textAlign: "center", padding: "20px 0" }}>
                <h2 style={{ fontFamily: "Cinzel, serif", color: M3.primary, margin: 0 }}>Daily Insights</h2>
                <p style={{ fontFamily: "'Share Tech Mono', monospace", color: M3.onSurfaceVariant, fontSize: "0.8rem", marginTop: 4 }}>{dateStr}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                {insights.map((item, i) => (
                    <div key={i} style={{
                        background: M3.surfaceContainer,
                        border: `1px solid ${item.col}33`,
                        borderRadius: 16,
                        padding: 20,
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        transition: "transform 0.2s",
                        cursor: "default"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: "1.5rem" }}>{item.emoji}</span>
                            <h3 style={{ margin: 0, fontSize: "1rem", color: item.col }}>{item.title}</h3>
                        </div>
                        <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.6, color: M3.onSurface }}>
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: 20,
                padding: 24,
                borderRadius: 20,
                background: `linear-gradient(135deg, ${M3.primary}11, ${M3.tertiary}11)`,
                border: `1px solid ${M3.outlineVariant}`,
                textAlign: "center"
            }}>
                <h4 style={{ fontFamily: "Cinzel, serif", color: M3.primary, margin: "0 0 10px 0" }}>Astro Advice</h4>
                <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: M3.onSurfaceVariant }}>
                    "The stars impel, they do not compel. Use today's energy to shape your own destiny."
                </p>
            </div>
        </div>
    );
}
