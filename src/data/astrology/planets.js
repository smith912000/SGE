export const P_SYM = { Sun: "☉", Moon: "☽", Mercury: "☿", Venus: "♀", Mars: "♂", Jupiter: "♃", Saturn: "♄", Uranus: "⛢", Neptune: "♆", Pluto: "♇", Chiron: "⚷", Node: "☊", Lilith: "⚸" };
export const P_COL = {
  Sun: "#FFD700", Moon: "#d0dce8", Mercury: "#c9a840", Venus: "#ff80ab",
  Mars: "#ff5252", Jupiter: "#ffa726", Saturn: "#bcaa84", Uranus: "#4dd0e1",
  Neptune: "#5c6bc0", Pluto: "#ab47bc", Chiron: "#b388ff", Node: "#78909c", Lilith: "#e040fb",
};
export const P_ROLE = {
  Sun: "Identity", Moon: "Emotions", Mercury: "Thinking", Venus: "Love", Mars: "Drive",
  Jupiter: "Growth", Saturn: "Discipline", Uranus: "Change", Neptune: "Imagination", Pluto: "Transformation",
  Chiron: "Healing", Node: "Life Purpose", Lilith: "Shadow Self",
};
export const PL = {};
export const PLANET_INFO = {
  Sun: {
    title: "The Sun ☉", emoji: "☀️", hebrew: "כ", hiero: "𓂧", gematriaVal: 20, letterName: "Kaph (Palm)",
    plain: "Your core identity — who you are at heart and what drives you forward. It's your ego, your life purpose, and the energy you radiate into the world.",
    detail: "Rules Leo. Represents vitality, willpower, and conscious self-expression.",
    shadow: "Arrogance, self-centeredness, and a need for constant validation.",
    advice: "Focus on authentic self-expression rather than seeking external applause."
  },
  Moon: {
    title: "The Moon ☽", emoji: "🌙", hebrew: "ת", hiero: "𓏴", gematriaVal: 400, letterName: "Tav (Mark)",
    plain: "Your emotional nature — how you feel things, what makes you feel safe, and your instinctive reactions. It reflects your inner world.",
    detail: "Rules Cancer. Represents emotions, intuition, and memory.",
    shadow: "Moodiness, emotional manipulation, and clinging to the past.",
    advice: "Nurture your inner child and listen to your intuition without letting it overwhelm your logic."
  },
  Mercury: {
    title: "Mercury ☿", emoji: "💬", hebrew: "ר", hiero: "𓁶", gematriaVal: 200, letterName: "Resh (Head)",
    plain: "How you think and communicate. Mercury governs your mind — how you process ideas and talk.",
    detail: "Rules Gemini & Virgo. Represents intellect, speech, and writing.",
    shadow: "Nervousness, deceit, and over-intellectualizing feelings.",
    advice: "Balance your curiosity with focus; not every thought needs to be expressed immediately."
  },
  Venus: {
    title: "Venus ♀", emoji: "💖", hebrew: "פ", hiero: "𓂋", gematriaVal: 80, letterName: "Pe (Mouth)",
    plain: "What you love and find beautiful. Venus shapes your romantic style and values.",
    detail: "Rules Taurus & Libra. Represents love, beauty, and pleasure.",
    shadow: "Superficiality, vanity, and a tendency to avoid conflict at any cost.",
    advice: "Find value within yourself so you don't over-rely on external beauty or approval."
  },
  Mars: {
    title: "Mars ♂", emoji: "🔥", hebrew: "ד", hiero: "𓉿", gematriaVal: 4, letterName: "Dalet (Door)",
    plain: "Your drive and ambition. Mars is the engine — how you take action and assert yourself.",
    detail: "Rules Aries. Represents aggression, courage, and physical energy.",
    shadow: "Impulsiveness, anger, and a 'me first' attitude.",
    advice: "Channel your competitive energy into constructive projects rather than unnecessary conflict."
  },
  Jupiter: {
    title: "Jupiter ♃", emoji: "🌟", hebrew: "ג", hiero: "𓌙", gematriaVal: 3, letterName: "Gimel (Camel)",
    plain: "Where luck and growth come easily to you. Jupiter expands everything it touches.",
    detail: "Rules Sagittarius. Represents abundance, wisdom, and travel.",
    shadow: "Excess, overconfidence, and ignoring practical details.",
    advice: "Say yes to growth but remember to ground your expansion in reality."
  },
  Saturn: {
    title: "Saturn ♄", emoji: "⏳", hebrew: "ב", hiero: "𓉐", gematriaVal: 2, letterName: "Bet (House)",
    plain: "Where life asks you to work hardest. Saturn brings lessons, discipline, and structure.",
    detail: "Rules Capricorn. Represents karma, responsibility, and mastery.",
    shadow: "Fear, restriction, and a pessimistic outlook on life.",
    advice: "Practical effort is your path to freedom; don't mistake boundaries for walls."
  },
  Uranus: {
    title: "Uranus ⛢", emoji: "⚡", hebrew: null, hiero: null, gematriaVal: null, letterName: null,
    plain: "Where you rebel and innovate. Uranus brings sudden change and a need for freedom.",
    detail: "Rules Aquarius. Represents revolution, technology, and liberation.",
    shadow: "Chaos, detachment, and rebellion for rebellion's sake.",
    advice: "Use your unique perspective to build the future, not just to tear down the past."
  },
  Neptune: {
    title: "Neptune ♆", emoji: "🌊", hebrew: null, hiero: null, gematriaVal: null, letterName: null,
    plain: "Where you dream and idealize. Neptune dissolves boundaries and brings imagination.",
    detail: "Rules Pisces. Represents mysticism, art, and transcendence.",
    shadow: "Escapism, confusion, and becoming a victim of your own illusions.",
    advice: "Ground your spiritual insights in daily practice to avoid getting lost in the fog."
  },
  Pluto: {
    title: "Pluto ♇", emoji: "💀", hebrew: null, hiero: null, gematriaVal: null, letterName: null,
    plain: "Where deep transformation happens. Pluto destroys what is no longer needed.",
    detail: "Rules Scorpio. Represents power, death & rebirth, and hidden forces.",
    shadow: "Control issues, obsession, and power struggles.",
    advice: "Release what no longer serves you to allow for a true rebirth."
  },
  Chiron: {
    title: "Chiron ⚷", emoji: "🩹", hebrew: null, hiero: null, gematriaVal: null, letterName: null,
    plain: "Your deepest wound and your greatest gift as a healer.",
    detail: "The 'wounded healer' — shows where you develop mastery through suffering.",
    shadow: "Self-pity and a refusal to acknowledge your own capacity for healing.",
    advice: "Your pain is a classroom; once you learn the lesson, you can teach others."
  },
  Node: {
    title: "North Node ☊", emoji: "🧭", hebrew: null, hiero: null, gematriaVal: null, letterName: null,
    plain: "Your soul's compass — the direction you are meant to grow toward.",
    detail: "North Node (Rahu) is your evolutionary edge.",
    shadow: "Resistance to growth and clinging to comfortable, outdated patterns.",
    advice: "Move toward what scares you most — that is usually where your growth lies."
  },
  Lilith: {
    title: "Black Moon Lilith ⚸", emoji: "🌑", hebrew: null, hiero: null, gematriaVal: null, letterName: null,
    plain: "Your raw, untamed feminine power — the part of you that refuses to be tamed.",
    detail: "The lunar apogee — where you rebel against convention.",
    shadow: "Self-destructiveness, isolation, and refusal to cooperate with anyone.",
    advice: "Embrace your wild nature but find a way to integrate it into your conscious life."
  },
};
