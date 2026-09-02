import { useState, useMemo, useEffect } from 'react';

const DECK = [
    { id: 0, name: "The Fool", emoji: "🃏", meaning: "A traveller at an edge, a bundle on a stick. Unnumbered in Marseille, 0 after the Golden Dawn. Aleph, Air.", astro: "Air / Uranus", col: "#b2ebf2" },
    { id: 1, name: "The Magician", emoji: "🪄", meaning: "A figure at a table bearing cup, sword, wand and coin. Marseille reads dexterity; Golden Dawn, Beth and Mercury.", astro: "Mercury", col: "#ff5252" },
    { id: 2, name: "The High Priestess", emoji: "🌙", meaning: "La Papesse veiled between two pillars, the book half covered. Golden Dawn: Gimel and the Moon. Besancon prints Juno.", astro: "Moon", col: "#5c6bc0" },
    { id: 3, name: "The Empress", emoji: "🌿", meaning: "A crowned woman with ripe grain and falling water. Golden Dawn: Daleth and Venus; the Marseille shield is imperial heraldry.", astro: "Venus", col: "#8bc34a" },
    { id: 4, name: "The Emperor", emoji: "👑", meaning: "A crowned man on a seat with ram heads, orb and sceptre. Golden Dawn: Heh and Aries; Thoth gives Tzaddi.", astro: "Aries", col: "#f44336" },
    { id: 5, name: "The Hierophant", emoji: "🏛️", meaning: "Le Pape in a triple crown, two attendants below. Golden Dawn: Vau, the joining letter, and Taurus.", astro: "Taurus", col: "#795548" },
    { id: 6, name: "The Lovers", emoji: "💞", meaning: "Marseille shows three figures under an archer; Rider-Waite-Smith shows two in Eden. Golden Dawn: Zain and Gemini.", astro: "Gemini", col: "#ff80ab" },
    { id: 7, name: "The Chariot", emoji: "🏎️", meaning: "A canopy on four pillars, two draught creatures, no reins drawn. Golden Dawn: Cheth, the enclosure, and Cancer.", astro: "Cancer", col: "#29b6f6" },
    { id: 8, name: "Strength", emoji: "🦁", meaning: "Hands at a lion's jaws. Numbered VIII by the Golden Dawn, XI in Marseille. Teth and Leo.", astro: "Leo", col: "#ffa726" },
    { id: 9, name: "The Hermit", emoji: "🏮", meaning: "A hooded figure with a raised lantern and a staff. Golden Dawn: Yod and Virgo. Earlier trumps show an hourglass.", astro: "Virgo", col: "#9575cd" },
    { id: 10, name: "Wheel of Fortune", emoji: "☸️", meaning: "The Rota Fortunae, figures carried up and over the rim. Golden Dawn: Kaph and Jupiter; the rim letters settle nothing.", astro: "Jupiter", col: "#fdd835" },
    { id: 11, name: "Justice", emoji: "⚖️", meaning: "Sword upright, scales level. XI in the Golden Dawn line, VIII in Marseille. Lamed and Libra.", astro: "Libra", col: "#4db6ac" },
    { id: 12, name: "The Hanged Man", emoji: "🦇", meaning: "Le Pendu hung by one ankle, legs crossed in a four. Golden Dawn: Mem and Water; Neptune is a modern graft.", astro: "Water / Neptune", col: "#64b5f6" },
    { id: 13, name: "Death", emoji: "💀", meaning: "A reaper at work, numbered XIII and left untitled in Marseille. Golden Dawn: Nun and Scorpio.", astro: "Scorpio", col: "#212121" },
    { id: 14, name: "Temperance", emoji: "🏺", meaning: "A winged figure pouring between two vessels. Golden Dawn: Samekh and Sagittarius. Thoth retitles it Art.", astro: "Sagittarius", col: "#ffcc80" },
    { id: 15, name: "The Devil", emoji: "🐐", meaning: "A horned figure above two tethered ones, the chains hanging loose. Golden Dawn: Ayin, the eye, and Capricorn.", astro: "Capricorn", col: "#4e342e" },
    { id: 16, name: "The Tower", emoji: "⚡", meaning: "La Maison Dieu, its crowned top struck away. Golden Dawn: Peh, the mouth, and Mars. The name is disputed.", astro: "Mars", col: "#d32f2f" },
    { id: 17, name: "The Star", emoji: "⭐", meaning: "A kneeling figure pouring from two urns under one great star and seven lesser. Golden Dawn: Tzaddi and Aquarius.", astro: "Aquarius", col: "#40c4ff" },
    { id: 18, name: "The Moon", emoji: "🌕", meaning: "Two towers, a track running between them, a crayfish rising from the pool. Golden Dawn: Qoph and Pisces.", astro: "Pisces", col: "#3949ab" },
    { id: 19, name: "The Sun", emoji: "☀️", meaning: "A rayed face above a walled enclosure — two children in Marseille, one rider after Smith. Golden Dawn: Resh.", astro: "Sun", col: "#ffb300" },
    { id: 20, name: "Judgement", emoji: "🎺", meaning: "A trumpet sounded, figures rising from open ground. Golden Dawn: Shin and Fire; Pluto is a modern graft.", astro: "Fire / Pluto", col: "#ff6d00" },
    { id: 21, name: "The World", emoji: "🌐", meaning: "A figure in a garland with the four creatures at the corners. Golden Dawn: Tau and Saturn.", astro: "Saturn", col: "#ab47bc" }
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

        let r = "Derived from the day index and the julian day of this chart.";
        if (destined.id === 19) r = "The draw lands on the solar trump, Resh in the Golden Dawn lettering.";
        else if (destined.id === 2) r = "The draw lands on the lunar trump, Gimel in the Golden Dawn lettering.";
        else if (destined.id === 4) r = "The draw lands on the trump the Golden Dawn attributes to Aries.";
        else r = `Derived from the day index, the julian day of this chart and the ${asc} ascendant.`;

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
                    The draw is keyed to a computed chart. Without one there is no julian day to derive from, so the deck stays closed.
                </p>
                <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>Birth data is entered on the <strong>Natal</strong> tab, or through "Compute Chart" above.</p>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, padding: "20px 0" }}>
            <div style={{ textAlign: "center" }}>
                <h2 style={{ fontFamily: "Cinzel, serif", color: M3.primary, margin: 0, fontSize: "1.8rem" }}>The Day's Arcanum</h2>
                <p style={{ color: M3.onSurfaceVariant, fontSize: "0.85rem", marginTop: 8, maxWidth: 400 }}>
                    One trump of the twenty-two, fixed for the day by a <strong>deterministic draw</strong> from this chart and the date. The same card stands until the date changes.
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
                    justifyContent: "space-between", // Space between top content and bottom reason
                    padding: "32px 20px 24px",     // Better internal padding
                    position: "relative",
                    boxShadow: card ? `0 0 60px ${card.col}18` : "none",
                    transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    transform: isPulling ? "rotateY(180deg) scale(0.9)" : "rotateY(0deg) scale(1)",
                    cursor: hasDrawnToday ? "default" : "pointer",
                    overflow: "hidden",
                    boxSizing: "border-box"
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
                            color: M3.primary,
                            margin: "auto" // Center the spinner
                        }}>🎴</div>
                    ) : card ? (
                        <>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                                <div style={{
                                    fontSize: "80px", // Slightly smaller to fit better
                                    filter: `drop-shadow(0 0 20px ${card.col}66)`,
                                    margin: "10px 0"
                                }}>{card.emoji}</div>

                                <div style={{ textAlign: "center", zIndex: 1 }}>
                                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: card.col, marginBottom: 4, opacity: 0.8 }}>
                                        {card.astro.toUpperCase()}
                                    </div>
                                    <h3 style={{ margin: 0, color: card.col, fontFamily: "Cinzel, serif", fontSize: "1.3rem" }}>{card.name}</h3>
                                    <p style={{ fontSize: "0.85rem", marginTop: 12, color: M3.onSurface, lineHeight: 1.5, fontFamily: "'EB Garamond', serif" }}>
                                        {card.meaning}
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                fontSize: "0.65rem",
                                color: M3.onSurfaceVariant,
                                fontStyle: "italic",
                                opacity: 0.6,
                                textAlign: "center",
                                width: "100%",
                                borderTop: `1px solid ${card.col}22`,
                                paddingTop: 16
                            }}>
                                {reason}
                            </div>
                        </>
                    ) : (
                        <div style={{ textAlign: "center", opacity: 0.4, margin: "auto" }}>
                            <div style={{ fontSize: "4rem", marginBottom: 16 }}>🎴</div>
                            <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>THE DAY'S CARD</div>
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
                {isPulling ? "DRAWING" : hasDrawnToday ? "THE DAY'S CARD IS SET" : "TURN THE DAY'S CARD"}
            </button>

            {hasDrawnToday && (
                <p style={{ color: M3.onSurfaceVariant, fontSize: "0.75rem", opacity: 0.7 }}>
                    The draw is fixed until the date rolls over.
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
