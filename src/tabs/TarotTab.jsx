import { useState } from 'react';

const TAROT_CARDS = [
    { name: "The Fool", emoji: "🃏", meaning: "New beginnings, optimism, trust in life.", col: "#fff" },
    { name: "The Magician", emoji: "🪄", meaning: "Action, power, manifest destiny.", col: "#ff5252" },
    { name: "The High Priestess", emoji: "🌙", meaning: "Intuition, sacred knowledge, subliminal mind.", col: "#5c6bc0" },
    { name: "The Empress", emoji: "🌿", meaning: "Fertility, nature, abundance, nurturing.", col: "#8bc34a" },
    { name: "The Emperor", emoji: "👑", meaning: "Authority, structure, a solid foundation.", col: "#ffa726" },
    { name: "The Lovers", emoji: "💞", meaning: "Choice, relationship, alignment of values.", col: "#ff80ab" },
    { name: "The Chariot", emoji: "🏎️", meaning: "Focus, willpower, victory through discipline.", col: "#29b6f6" },
    { name: "Strength", emoji: "🦁", meaning: "Courage, persuasion, influence, compassion.", col: "#fdd835" },
    { name: "The Hermit", emoji: "🏮", meaning: "Soul-searching, introspection, inner guidance.", col: "#b39ddb" },
    { name: "The Sun", emoji: "☀️", meaning: "Success, radiance, abundance, joy.", col: "#FFD700" }
];

export default function TarotTab({ ctx }) {
    const { M3 } = ctx;
    const [card, setCard] = useState(null);
    const [isPulling, setIsPulling] = useState(false);

    const pullCard = () => {
        setIsPulling(true);
        setCard(null);
        setTimeout(() => {
            const randomCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
            setCard(randomCard);
            setIsPulling(false);
        }, 800);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: "20px 0" }}>
            <div style={{ textAlign: "center" }}>
                <h2 style={{ fontFamily: "Cinzel, serif", color: M3.primary, margin: 0 }}>Daily Tarot Pull</h2>
                <p style={{ color: M3.onSurfaceVariant, fontSize: "0.85rem", marginTop: 4 }}>Clear your mind and focus on a question.</p>
            </div>

            <div style={{
                width: 240,
                height: 380,
                borderRadius: 20,
                border: `2px solid ${card ? card.col : M3.outline}`,
                background: card ? `${card.col}11` : M3.surfaceContainerHigh,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                position: "relative",
                boxShadow: card ? `0 0 40px ${card.col}22` : "none",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            }}>
                {isPulling ? (
                    <div style={{ fontSize: "2rem", animation: "rotation 1s infinite linear" }}>✨</div>
                ) : card ? (
                    <>
                        <div style={{ fontSize: "5rem" }}>{card.emoji}</div>
                        <div style={{ textAlign: "center", padding: "0 20px" }}>
                            <h3 style={{ margin: 0, color: card.col, fontFamily: "Cinzel, serif" }}>{card.name}</h3>
                            <p style={{ fontSize: "0.85rem", marginTop: 12, color: M3.onSurface, lineHeight: 1.5 }}>
                                {card.meaning}
                            </p>
                        </div>
                    </>
                ) : (
                    <div style={{ color: M3.outline, fontSize: "3rem", opacity: 0.3 }}>🎴</div>
                )}
            </div>

            <button
                onClick={pullCard}
                disabled={isPulling}
                style={{
                    padding: "12px 32px",
                    borderRadius: 30,
                    background: M3.primary,
                    color: M3.onPrimary,
                    border: "none",
                    fontFamily: "Cinzel, serif",
                    fontWeight: "700",
                    cursor: isPulling ? "wait" : "pointer",
                    boxShadow: `0 4px 14px ${M3.primary}44`,
                    transition: "transform 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
                {card ? "PULL ANOTHER CARD" : "PULL TODAY'S CARD"}
            </button>

            <style>{`
        @keyframes rotation {
          from { transform: rotate(0deg); }
          to { transform: rotate(359deg); }
        }
      `}</style>
        </div>
    );
}
