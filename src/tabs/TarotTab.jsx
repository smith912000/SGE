import { useState, useMemo, useEffect } from 'react';

const DECK = [
    { id: 0, name: "The Fool", emoji: "🃏", meaning: "Spontaneous beginnings, trust in the universe, an adventure of spirit.", astro: "Air / Uranus", col: "#b2ebf2" },
    { id: 1, name: "The Magician", emoji: "🪄", meaning: "Manifestation, resourcefulness, tapping into your innate power.", astro: "Mercury", col: "#ff5252" },
    { id: 2, name: "The High Priestess", emoji: "🌙", meaning: "Intuition, sacred knowledge, the mystery of the subconscious.", astro: "Moon", col: "#5c6bc0" },
    { id: 3, name: "The Empress", emoji: "🌿", meaning: "Abundance, creativity, nurturing growth in the material world.", astro: "Venus", col: "#8bc34a" },
    { id: 4, name: "The Emperor", emoji: "👑", meaning: "Authority, structure, strategic leadership and solid foundations.", astro: "Aries", col: "#f44336" },
    { id: 5, name: "The Hierophant", emoji: "🏛️", meaning: "Tradition, spiritual wisdom, following a proven path or mentor.", astro: "Taurus", col: "#795548" },
    { id: 6, name: "The Lovers", emoji: "💞", meaning: "Alignment of values, choice, sacred harmony between opposites.", astro: "Gemini", col: "#ff80ab" },
    { id: 7, name: "The Chariot", emoji: "🏎️", meaning: "Willpower, triumph over obstacles, internal drive and focus.", astro: "Cancer", col: "#29b6f6" },
    { id: 8, name: "Strength", emoji: "🦁", meaning: "Compassion, influence, the courage to master your inner nature.", astro: "Leo", col: "#ffa726" },
    { id: 9, name: "The Hermit", emoji: "🏮", meaning: "Introspection, finding your inner light, taking a period of solitude.", astro: "Virgo", col: "#9575cd" },
    { id: 10, name: "Wheel of Fortune", emoji: "☸️", meaning: "Cycles of change, destiny, a turning point in your journey.", astro: "Jupiter", col: "#fdd835" },
    { id: 11, name: "Justice", emoji: "⚖️", meaning: "Truth, balance, clarity and the law of cause and effect.", astro: "Libra", col: "#4db6ac" },
    { id: 12, name: "The Hanged Man", emoji: "🦇", meaning: "Surrender, letting go, seeing from a new perspective.", astro: "Water / Neptune", col: "#64b5f6" },
    { id: 13, name: "Death", emoji: "💀", meaning: "Transformation, end of a cycle, making room for the new.", astro: "Scorpio", col: "#212121" },
    { id: 14, name: "Temperance", emoji: "🏺", meaning: "Alchemy, moderation, patience and finding the middle path.", astro: "Sagittarius", col: "#ffcc80" },
    { id: 15, name: "The Devil", emoji: "🐐", meaning: "Shadow work, healthy boundaries, recognizing self-imposed chains.", astro: "Capricorn", col: "#4e342e" },
    { id: 16, name: "The Tower", emoji: "⚡", meaning: "Sudden breakthrough, liberation, clearing away what is false.", astro: "Mars", col: "#d32f2f" },
    { id: 17, name: "The Star", emoji: "⭐", meaning: "Hope, inspiration, spiritual guidance after a storm.", astro: "Aquarius", col: "#40c4ff" },
    { id: 18, name: "The Moon", emoji: "🌕", meaning: "Illusion, dreams, facing the unknown and trusting your instinct.", astro: "Pisces", col: "#3949ab" },
    { id: 19, name: "The Sun", emoji: "☀️", meaning: "Vitality, success, radiates joy and conscious awareness.", astro: "Sun", col: "#ffb300" },
    { id: 20, name: "Judgement", emoji: "🎺", meaning: "Awakening, reckoning, listening to your higher calling.", astro: "Fire / Pluto", col: "#ff6d00" },
    { id: 21, name: "The World", emoji: "🌐", meaning: "Completion, unity, wholeness and mastering the cycle.", astro: "Saturn", col: "#ab47bc" }
];

export default function TarotTab({ ctx }) {
    const { M3, res, zodSign } = ctx;
    const [card, setCard] = useState(null);
    const [isPulling, setIsPulling] = useState(false);
    const [reason, setReason] = useState("");
    const [hasDrawnToday, setHasDrawnToday] = useState(false);

    const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

    // Derives fixed card from Chart + Date
    const getDestinedCard = useMemo(() => {
        if (!res) return null;
        const daySeed = Math.floor(Date.now() / 86400000);
        const sunIdx = Number(daySeed % 12);
        const moonIdx = Math.floor((res.jd % 29.5) / (29.5 / 12)) % 12;
        const asc = zodSign(res.houses.ASC);
        const hash = (daySeed + sunIdx + moonIdx + res.jd) % DECK.length;
        const destined = DECK[Math.floor(hash)];

        let r = "Connecting to the currents of time...";
        if (destined.id === 19) r = "Aligned with your Solar vitality today.";
        else if (destined.id === 2) r = "The Lunar cycle is activating your intuition.";
        else if (destined.id === 4) r = "Reflecting the Martian strength in your chart.";
        else r = `Drawn through the alignment of your ${asc} ascendant and today's planetary positions.`;

        return { card: destined, reason: r };
    }, [res, zodSign]);

    useEffect(() => {
        const lastDraw = localStorage.getItem('sge-tarot-last-draw');
        if (lastDraw === todayStr && getDestinedCard) {
            setCard(getDestinedCard.card);
            setReason(getDestinedCard.reason);
            setHasDrawnToday(true);
        }
    }, [todayStr, getDestinedCard]);

    const pullCard = () => {
        if (!getDestinedCard || hasDrawnToday) return;
        setIsPulling(true);
        setTimeout(() => {
            setCard(getDestinedCard.card);
            setReason(getDestinedCard.reason);
            setHasDrawnToday(true);
            setIsPulling(false);
            localStorage.setItem('sge-tarot-last-draw', todayStr);
        }, 1200);
    };

    if (!res) {
        return (
            <div style={{ padding: 40, textAlign: "center", color: M3.onSurfaceVariant }}>
                <div style={{ fontSize: "3rem", marginBottom: 20 }}>🌌</div>
                <h3 style={{ fontFamily: "Cinzel, serif", color: M3.primary }}>Chart Required</h3>
                <p style={{ fontSize: "0.9rem", maxWidth: 300, margin: "10px auto" }}>
                    The Tarot Synchronicity Engine needs your birth details to align the cards with your unique astrological blueprint.
                </p>
                <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>Please go to the <strong>Natal</strong> tab or click "Compute Chart" above.</p>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, padding: "20px 0" }}>
            <div style={{ textAlign: "center" }}>
                <h2 style={{ fontFamily: "Cinzel, serif", color: M3.primary, margin: 0, fontSize: "1.8rem" }}>Today's Arcana</h2>
                <p style={{ color: M3.onSurfaceVariant, fontSize: "0.85rem", marginTop: 8, maxWidth: 400 }}>
                    A unique card drawn through <strong>Synchronicity</strong> — revealed once every 24 hours based on your astrological alignment.
                </p>
            </div>

            <div style={{
                perspective: "1000px",
                width: 260,
                height: 420,
            }}>
                <div style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                    border: `1px solid ${card ? card.col : M3.outlineVariant}`,
                    background: card ? `${card.col}08` : M3.surfaceContainerHigh,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 24,
                    position: "relative",
                    boxShadow: card ? `0 0 60px ${card.col}18` : "none",
                    transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    transform: isPulling ? "rotateY(180deg) scale(0.9)" : "rotateY(0deg) scale(1)",
                    cursor: hasDrawnToday ? "default" : "pointer",
                    overflow: "hidden"
                }}>
                    {/* Decorative border */}
                    <div style={{
                        position: "absolute", inset: 12, border: `1px solid ${card ? card.col + '33' : M3.outlineVariant + '33'}`,
                        borderRadius: 14, pointerEvents: "none"
                    }} />

                    {isPulling ? (
                        <div style={{
                            fontSize: "3rem",
                            animation: "pulse 1s infinite alternate",
                            color: M3.primary
                        }}>🎴</div>
                    ) : card ? (
                        <>
                            <div style={{
                                fontSize: "100px",
                                filter: `drop-shadow(0 0 20px ${card.col}66)`,
                                margin: "20px 0"
                            }}>{card.emoji}</div>

                            <div style={{ textAlign: "center", padding: "0 28px", zIndex: 1 }}>
                                <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: card.col, marginBottom: 4, opacity: 0.8 }}>
                                    {card.astro.toUpperCase()}
                                </div>
                                <h3 style={{ margin: 0, color: card.col, fontFamily: "Cinzel, serif", fontSize: "1.4rem" }}>{card.name}</h3>
                                <p style={{ fontSize: "0.85rem", marginTop: 16, color: M3.onSurface, lineHeight: 1.6, fontFamily: "'EB Garamond', serif" }}>
                                    {card.meaning}
                                </p>
                            </div>

                            <div style={{
                                position: "absolute", bottom: 20, fontSize: "0.65rem",
                                color: M3.onSurfaceVariant, fontStyle: "italic", opacity: 0.6,
                                padding: "0 20px", textAlign: "center"
                            }}>
                                {reason}
                            </div>
                        </>
                    ) : (
                        <div style={{ textAlign: "center", opacity: 0.4 }}>
                            <div style={{ fontSize: "4rem", marginBottom: 16 }}>🎴</div>
                            <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>YOUR DAILY CARD</div>
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={pullCard}
                disabled={isPulling || hasDrawnToday}
                style={{
                    padding: "14px 40px",
                    borderRadius: 30,
                    background: hasDrawnToday ? M3.surfaceContainer : M3.primary,
                    color: hasDrawnToday ? M3.onSurfaceVariant : M3.onPrimary,
                    border: hasDrawnToday ? `1px solid ${M3.outlineVariant}` : "none",
                    fontFamily: "Cinzel, serif",
                    fontWeight: "700",
                    fontSize: "0.9rem",
                    letterSpacing: "0.05em",
                    cursor: (isPulling || hasDrawnToday) ? "default" : "pointer",
                    boxShadow: hasDrawnToday ? "none" : `0 8px 16px ${M3.primary}33`,
                    transition: "all 0.3s",
                    opacity: hasDrawnToday ? 0.7 : 1
                }}
                onMouseEnter={e => {
                    if (hasDrawnToday || isPulling) return;
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 12px 20px ${M3.primary}44`;
                }}
                onMouseLeave={e => {
                    if (hasDrawnToday || isPulling) return;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 8px 16px ${M3.primary}33`;
                }}
            >
                {isPulling ? "CONSULTING THE STARS..." : hasDrawnToday ? "TODAY'S READING IS SET" : "REVEAL TODAY'S CARD"}
            </button>

            {hasDrawnToday && (
                <p style={{ color: M3.onSurfaceVariant, fontSize: "0.75rem", opacity: 0.7 }}>
                    Return tomorrow for your next destined alignment.
                </p>
            )}

            <style>{`
                @keyframes pulse {
                    from { transform: scale(1); opacity: 0.5; }
                    to { transform: scale(1.1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
