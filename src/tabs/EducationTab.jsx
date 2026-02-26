export default function EducationTab({ ctx }) {
  const { M3, EL_COL, MOD_COL, Card } = ctx;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

      <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
        <div style={{ fontFamily:"Cinzel,serif", fontSize:"1.05rem", color:M3.primary, marginBottom:8 }}>📖 How the SGE System Works — A Complete Guide</div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.7, color:M3.onSurface, margin:0 }}>
          The SGE (Semiotic-Geometric Engine) is a multi-layered system that combines <strong>Western Astrology</strong>, <strong>Chinese Astrology</strong>, <strong>Numerology</strong>, <strong>Grammatology</strong> (the study of writing systems and letter symbolism), and the <strong>Sacred Šambraielic Calendar</strong> into a unified framework for self-understanding. Each system offers a different lens on who you are. Together, they create a composite portrait far richer than any single system alone. This page explains every layer so you can understand exactly what each piece of your reading means.
        </p>
      </Card>

      <Card title="☉ LAYER 1 — WESTERN ASTROLOGY">
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.primary, letterSpacing:"0.1em", marginBottom:6 }}>WHAT IS IT?</div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
              Western astrology maps the positions of the Sun, Moon, and planets at the exact moment and place you were born. This creates a unique blueprint — your <strong>natal chart</strong> — that reveals your psychological makeup, strengths, challenges, and life patterns. It doesn't predict events; it reveals the terrain of your psyche.
            </p>
          </div>
          <div style={{ padding:"14px 16px", borderRadius:12, background:M3.surfaceVariant, border:`1px solid ${M3.outlineVariant}` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:10 }}>THE KEY BUILDING BLOCKS</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12 }}>
              {[
                { title:"Planets — Parts of Your Psyche", text:"Each planet represents a different psychological function. The Sun is your core identity. The Moon is your emotional nature. Mercury is how you think. Venus is how you love. Mars is how you act. Jupiter shows where life expands. Saturn shows where life tests you. Uranus, Neptune, and Pluto shape generational themes." },
                { title:"Zodiac Signs — How Those Parts Express", text:"There are 12 signs, each with a distinct energy style. The sign a planet occupies colours how that planet expresses. Your Sun might be in bold Aries or gentle Pisces — same identity function, completely different flavour. Signs are grouped by Element (Fire, Earth, Air, Water) and Mode (Cardinal, Fixed, Mutable)." },
                { title:"Houses — Where in Your Life", text:"The 12 houses divide your life into domains: self, money, communication, home, creativity, health, partnership, transformation, philosophy, career, community, and the unconscious. The house a planet falls in shows which area of life it most strongly activates." },
                { title:"Aspects — Connections Between Planets", text:"Aspects are the angles between planets. A Conjunction (0°) fuses two energies. A Trine (120°) creates natural flow. A Square (90°) creates friction that drives growth. An Opposition (180°) creates push-pull tension. A Sextile (60°) offers gentle opportunity. These connections form the dynamics of your chart — where things flow easily and where you're challenged to grow." },
              ].map((b,i)=>(
                <div key={i} style={{ padding:"10px 14px", borderRadius:10, background:M3.surfaceContainer }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.primary, fontWeight:"700", marginBottom:4 }}>{b.title}</div>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{b.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding:"14px 16px", borderRadius:12, background:M3.surfaceVariant, border:`1px solid ${M3.outlineVariant}` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:10 }}>ELEMENTS & MODALITIES</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
              {[
                { name:"Fire", col:EL_COL.Fire, desc:"Action, passion, instinct. Fire signs (Aries, Leo, Sagittarius) lead with enthusiasm and courage." },
                { name:"Earth", col:EL_COL.Earth, desc:"Stability, practicality, senses. Earth signs (Taurus, Virgo, Capricorn) build things that last." },
                { name:"Air", col:EL_COL.Air, desc:"Thought, communication, connection. Air signs (Gemini, Libra, Aquarius) live in the world of ideas." },
                { name:"Water", col:EL_COL.Water, desc:"Emotion, intuition, depth. Water signs (Cancer, Scorpio, Pisces) feel the currents beneath the surface." },
              ].map(e=>(
                <div key={e.name} style={{ padding:"8px 12px", borderRadius:8, background:e.col+"11", border:`1px solid ${e.col}33` }}>
                  <span style={{ color:e.col, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700" }}>{e.name}</span>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", lineHeight:1.5, color:M3.onSurface, margin:"4px 0 0" }}>{e.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              {[
                { name:"Cardinal", col:MOD_COL.Cardinal, desc:"Initiators — they start things. Aries, Cancer, Libra, Capricorn." },
                { name:"Fixed", col:MOD_COL.Fixed, desc:"Sustainers — they persist. Taurus, Leo, Scorpio, Aquarius." },
                { name:"Mutable", col:MOD_COL.Mutable, desc:"Adapters — they flow. Gemini, Virgo, Sagittarius, Pisces." },
              ].map(m=>(
                <div key={m.name} style={{ padding:"8px 12px", borderRadius:8, background:m.col+"11", border:`1px solid ${m.col}33` }}>
                  <span style={{ color:m.col, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700" }}>{m.name}</span>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", lineHeight:1.5, color:M3.onSurface, margin:"4px 0 0" }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>TROPICAL VS SIDEREAL</div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:0 }}>
              This system uses <strong>two zodiac frameworks</strong>. The <strong>Tropical</strong> (Western) zodiac is aligned to the seasons — 0° Aries begins at the spring equinox. The <strong>Sidereal</strong> (Vedic) zodiac is aligned to the actual constellations and is shifted about 24° from the Tropical. Both are valid perspectives; the Tropical reflects your psychological experience, while the Sidereal reflects cosmic placement. Your planet table shows both.
            </p>
          </div>
          <div>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>KEY TABS IN THIS LAYER</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {[
                {tab:"Summary", desc:"Your full natal chart with planet positions and profile"},
                {tab:"Deep Analysis", desc:"Detailed breakdown of every planet in your chart"},
                {tab:"Wheel", desc:"Visual map of your birth sky"},
                {tab:"Connections", desc:"Aspect geometry between your planets"},
                {tab:"Growth", desc:"Secondary progressions — your chart evolving over time"},
                {tab:"Year Ahead", desc:"Solar return — the chart cast for your next birthday"},
                {tab:"Right Now", desc:"Current transits hitting your natal chart"},
                {tab:"Compatibility", desc:"Synastry — comparing two charts"},
                {tab:"Hidden Patterns", desc:"Harmonic overtones in your chart"},
                {tab:"Struggles", desc:"Shadow work — where growth happens through challenge"},
              ].map(t=>(
                <div key={t.tab} style={{ padding:"4px 10px", borderRadius:10, background:M3.surfaceVariant, border:`1px solid ${M3.outlineVariant}` }}>
                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.primary, fontWeight:"700" }}>{t.tab}</span>
                  <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.6rem", color:M3.onSurfaceVariant, marginLeft:4 }}>— {t.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card title="☯ LAYER 2 — CHINESE ASTROLOGY">
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
            Chinese astrology is based on a 60-year cycle (the Sexagenary Cycle) combining <strong>10 Heavenly Stems</strong> and <strong>12 Earthly Branches</strong>. Each year is associated with one of 12 animals and one of 5 elements, plus a Yin or Yang polarity. Where Western astrology is primarily about the month you were born, Chinese astrology is primarily about the year — though the month and day add further layers.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div style={{ padding:"12px 16px", borderRadius:12, background:M3.surfaceVariant }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.primary, fontWeight:"700", marginBottom:6 }}>12 Animals</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>
                Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig. Each animal has a distinct personality archetype, compatible partners, and shadow traits. Your animal describes your social nature and outward character.
              </p>
            </div>
            <div style={{ padding:"12px 16px", borderRadius:12, background:M3.surfaceVariant }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.primary, fontWeight:"700", marginBottom:6 }}>5 Elements (Wu Xing)</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>
                Wood (growth, creativity), Fire (passion, dynamism), Earth (stability, nourishment), Metal (precision, discipline), Water (wisdom, adaptability). Your element shapes how your animal nature expresses — a Fire Horse is very different from a Water Horse.
              </p>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
            <div style={{ padding:"10px 14px", borderRadius:10, background:M3.surfaceVariant }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:M3.secondary, fontWeight:"700", marginBottom:4 }}>Yin & Yang</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:0 }}>Yang years favour bold action. Yin years favour reflection and consolidation. This alternates every year.</p>
            </div>
            <div style={{ padding:"10px 14px", borderRadius:10, background:M3.surfaceVariant }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:M3.secondary, fontWeight:"700", marginBottom:4 }}>Trigrams (Bagua)</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:0 }}>8 fundamental forces from the I Ching, each associated with specific animals. The wheel view shows your animal's trigram position.</p>
            </div>
            <div style={{ padding:"10px 14px", borderRadius:10, background:M3.surfaceVariant }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:M3.secondary, fontWeight:"700", marginBottom:4 }}>Chinese New Year</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:0 }}>The Chinese year starts between late January and mid-February. If you were born in January/February, your animal may be the previous year's.</p>
            </div>
          </div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:0, fontStyle:"italic" }}>
            The Chinese Year tab shows your animal, element, polarity, stems & branches, and an interactive Bagua wheel. The system also cross-references your Chinese element with your Western element to reveal polarity patterns across cultures.
          </p>
        </div>
      </Card>

      <Card title="🔢 LAYER 3 — NUMEROLOGY">
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
            Numerology extracts meaning from the numbers in your birth date and the letters in your name. It uses two systems: <strong>Pythagorean</strong> (the standard Western system, assigning A=1, B=2... through Z=8) and <strong>Chaldean</strong> (an older Babylonian system with slightly different values). Numbers are reduced to a single digit (1-9) or kept as Master Numbers (11, 22, 33) which carry amplified spiritual significance.
          </p>
          <div style={{ padding:"14px 16px", borderRadius:12, background:M3.surfaceVariant, border:`1px solid ${M3.outlineVariant}` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:10 }}>CORE NUMBERS — WHAT THEY MEAN</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:10 }}>
              {[
                { name:"Life Path", src:"Birth date", desc:"Your primary life lesson and purpose. Calculated from your full birth date. This is the most important number — it describes the road you walk." },
                { name:"Expression", src:"Full name", desc:"Your natural abilities and how you present yourself to the world. Calculated from all the letters in your birth name." },
                { name:"Soul Urge", src:"Vowels in name", desc:"Your innermost desires and secret motivations. Calculated from only the vowels in your name — the hidden voice." },
                { name:"Personality", src:"Consonants in name", desc:"How others perceive you — your outward mask. Calculated from the consonants — the visible structure." },
                { name:"Birthday", src:"Day of birth", desc:"A secondary talent or gift. Simply the day you were born, reduced to a root. A quick-read personality snapshot." },
                { name:"Maturity", src:"Life Path + Expression", desc:"What you are growing toward. Combines your path and your abilities — reveals the person you become in the second half of life." },
                { name:"Personal Year", src:"Birth date + current year", desc:"The theme of your current year. A 9-year cycle that shows whether this is a year to start, build, release, or reflect." },
              ].map(n=>(
                <div key={n.name} style={{ padding:"8px 12px", borderRadius:8, background:M3.surfaceContainer }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                    <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.7rem", color:M3.primary, fontWeight:"700" }}>{n.name}</span>
                    <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.56rem", color:M3.outlineVariant }}>{n.src}</span>
                  </div>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", lineHeight:1.5, color:M3.onSurface, margin:"4px 0 0" }}>{n.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div style={{ padding:"12px 16px", borderRadius:12, background:M3.surfaceVariant }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, fontWeight:"700", marginBottom:6 }}>Pinnacles & Challenges</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>
                Your life divides into four phases, each with a <strong>Pinnacle</strong> (the energy available to you) and a <strong>Challenge</strong> (what you must learn). These map to roughly ages 0-27, 28-36, 37-45, and 46+, though exact timing depends on your Life Path.
              </p>
            </div>
            <div style={{ padding:"12px 16px", borderRadius:12, background:M3.surfaceVariant }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, fontWeight:"700", marginBottom:6 }}>Karmic Lessons & Missing Numbers</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>
                Numbers absent from your name reveal lessons your soul chose to learn through experience. These aren't weaknesses — they're growth edges. <strong>Karmic Debts</strong> (13, 14, 16, 19) indicate patterns carried forward that require conscious resolution.
              </p>
            </div>
          </div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:0 }}>
            Each number is linked to a planet: 1=Sun, 2=Moon, 3=Jupiter, 4=Uranus, 5=Mercury, 6=Venus, 7=Neptune, 8=Saturn, 9=Mars. This creates a bridge between numerology and astrology — your Life Path planet resonates with its corresponding planetary archetype.
          </p>
        </div>
      </Card>

      <Card title="𐤀 LAYER 4 — GRAMMATOLOGY & SEMIOTICS">
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
            Grammatology is the study of writing systems and the hidden connections between letters, sounds, and symbols across human history. Every letter you read descends from a pictograph carved thousands of years ago. The letter "A" was once the head of an ox (𓃾), rotated and stylised across millennia through Phoenician, Greek, and Latin scripts. This engine maps <strong>22 root letters</strong> across <strong>20+ writing systems</strong> worldwide.
          </p>
          <div style={{ padding:"14px 16px", borderRadius:12, background:M3.surfaceVariant, border:`1px solid ${M3.outlineVariant}` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:10 }}>KEY CONCEPTS</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:10 }}>
              {[
                { name:"Acrophony", desc:"Letters originally pictured their name. Aleph (א) means 'ox' and the letter is a rotated ox head. Bet (ב) means 'house' and the letter is a house floor-plan. Each letter is a frozen image." },
                { name:"Gematria", desc:"Each Hebrew letter has a numerical value (Aleph=1, Bet=2... Tav=400). Words with equal sums are considered mystically connected. This engine transliterates English names into Hebrew and calculates their numerical resonance." },
                { name:"Sefer Yetzirah", desc:"An ancient Kabbalistic text that assigns each Hebrew letter to a zodiac sign, planet, or element. The 3 Mother Letters (Aleph, Mem, Shin) map to Air, Water, Fire. The 7 Doubles map to the 7 classical planets. The 12 Simples map to the 12 zodiac signs." },
                { name:"Writing System Families", desc:"Systems are classified as Alphabets (Greek, Latin — vowels and consonants equal), Abjads (Hebrew, Arabic — consonants primary), Abugidas (Devanagari, Ge'ez — consonant-vowel units), or Logographic (Chinese, Egyptian — symbols for words)." },
                { name:"Cross-Script Table", desc:"Traces how each of the 22 root Semitic letters evolved into 20+ scripts: Aramaic, Samaritan, Coptic, Gothic, Armenian, Georgian, Ge'ez, Ogham, Arabic, Syriac, Brahmi, Devanagari, Tamil, Cyrillic, and more." },
                { name:"Tarot Correspondences", desc:"Each of the 22 Major Arcana maps to a Hebrew letter, a path on the Tree of Life, and a Chinese ideogram — creating a symbolic bridge across Western, Hebraic, and Eastern traditions." },
              ].map(c=>(
                <div key={c.name} style={{ padding:"8px 12px", borderRadius:8, background:M3.surfaceContainer }}>
                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.7rem", color:M3.primary, fontWeight:"700" }}>{c.name}</span>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", lineHeight:1.5, color:M3.onSurface, margin:"4px 0 0" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:0 }}>
            The Grammatology tab includes 8 sub-sections: the Cross-Script Table (core evolution of each letter), Writing Systems (classification of all global scripts), Egyptian Signs (hieroglyphic uniliterals), Ogham Trees (Celtic tree-alphabet with animals and crystals), Tarot-Chinese correspondences, Digraphs, IPA Reference (International Phonetic Alphabet), and Sefer Yetzirah (mystical letter-to-cosmos mappings).
          </p>
        </div>
      </Card>

      <Card title="📅 LAYER 5 — THE SACRED ŠAMBRAIELIC CALENDAR">
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
            The Šambraielic Calendar is a sacred solar calendar beginning at the Winter Solstice (December 22). It divides the 365-day year into 12 months of 29-31 days, each spanning two zodiac signs. The calendar is geometrically structured — the year is subdivided by every number from 2 to 21, creating overlapping sacred geometries (triangles, squares, pentagrams, hexagrams, enneagrams, etc.) that activate on specific days.
          </p>
          <div style={{ padding:"14px 16px", borderRadius:12, background:M3.surfaceVariant, border:`1px solid ${M3.outlineVariant}` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:10 }}>WHAT THE CALENDAR TRACKS</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:10 }}>
              {[
                { name:"Geometric Subdivisions", desc:"The year is divided by 2 (Yin-Yang), 3 (Triangle), 4 (Seasons), 5 (Pentagram), 6 (Hexagram), 7 (Faery Star + planets), 8 (Octagram/Bagua), 9 (Enneagram), up to 21 (World). Each node day carries the symbolism of its geometry." },
                { name:"Number Sequences", desc:"Each day is checked against Prime, Fibonacci, Lucas, Triangular, Square, Pentagonal, Tetrahedral, and other number sequences. Days on multiple sequences are considered numerically potent." },
                { name:"Symbolic Cycles", desc:"Multiple symbolic systems rotate through the year: I Ching hexagrams (64), Taixuanjing tetragrams (81), Hebrew letter cycles (22, 27, 28), Greek letter cycle (24), Runic half-months, and Major Arcana (22)." },
                { name:"Sacred Names", desc:"The 72 Names of God, 99 Names of Allah, and 32 Paths of Wisdom each rotate through the year on their own cycle, adding layers of mystical correspondence to each day." },
                { name:"Cross-Cultural Zodiacs", desc:"Beyond Western zodiac signs, the calendar maps each day to the Ogham Celtic Tree Zodiac (with tree, animal, colour, crystal), Pan-Indigenous American Zodiac (animal, element, clan), and Chinese Solar Zodiac." },
                { name:"Holidays & Festivals", desc:"Over 200 holidays from 12+ traditions: Norse, Roman, Christian, Orthodox, Kemetic (Egyptian), Hindu, Buddhist, Vodou, Shinto, Chinese/Eastern, Greek Classical, and unique Šambraielic festivals. Each day may carry multiple cultural observances." },
                { name:"Day Symbolism", desc:"Each day of the month (1-32) has a Tarot correspondence, a Hebrew letter pair, and a symbolic meaning (e.g. Day 7 = 'Day of Choices, Gaining Control & Action')." },
                { name:"Reflective Festivals", desc:"Each month ends with a multi-day Reflective Festival: Month 1 has 1 day, Month 2 has 2 days... up to Month 12 with 12 days. These are periods for contemplation themed to the month's lessons." },
              ].map(c=>(
                <div key={c.name} style={{ padding:"8px 12px", borderRadius:8, background:M3.surfaceContainer }}>
                  <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.7rem", color:M3.primary, fontWeight:"700" }}>{c.name}</span>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", lineHeight:1.5, color:M3.onSurface, margin:"4px 0 0" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card title="φ LAYER 6 — PHI CYCLE & ELEMENT DISTRIBUTION">
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
            The Phi (φ) Engine applies the golden ratio (1.618...) to your birth day within a cycle, creating a three-phase rhythm: <strong>φ·Low</strong> (below 0.382 — a quieter, reflective phase), <strong>φ·Mid</strong> (0.382-0.618 — balanced activity), and <strong>φ·High</strong> (above 0.618 — peak output and expansion). This isn't prediction — it's a mathematical rhythm that some traditions believe underlies natural cycles.
          </p>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
            The <strong>Element Distribution</strong> counts how many of your planets fall in each element (Fire, Earth, Air, Water) and each modality (Cardinal, Fixed, Mutable). This reveals your energetic "DNA" — whether you're action-oriented or reflective, whether you initiate or sustain.
          </p>
        </div>
      </Card>

      <Card title="⚹ LAYER 7 — ADVANCED TECHNIQUES">
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div style={{ padding:"12px 16px", borderRadius:12, background:M3.surfaceVariant }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.primary, fontWeight:"700", marginBottom:6 }}>Secondary Progressions (Growth)</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>
                Progressions use the "day-for-a-year" method: the sky 30 days after your birth shows what your chart looks like at age 30. They reveal slow, internal psychological evolution — the person you are becoming, not the events happening to you.
              </p>
            </div>
            <div style={{ padding:"12px 16px", borderRadius:12, background:M3.surfaceVariant }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.primary, fontWeight:"700", marginBottom:6 }}>Solar Return (Year Ahead)</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>
                Your Solar Return is the chart for the exact moment the Sun returns to its natal position each year (near your birthday). This "birthday chart" sets the theme for your coming year — the rising sign and house placements shift annually.
              </p>
            </div>
            <div style={{ padding:"12px 16px", borderRadius:12, background:M3.surfaceVariant }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.primary, fontWeight:"700", marginBottom:6 }}>Transits (Right Now)</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>
                Transits are today's planetary positions compared against your birth chart. When a transiting planet forms an aspect to your natal planet, that area of your life activates. Slow planets (Saturn, Pluto) create long-lasting themes; fast planets (Moon, Mercury) create brief daily shifts.
              </p>
            </div>
            <div style={{ padding:"12px 16px", borderRadius:12, background:M3.surfaceVariant }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.primary, fontWeight:"700", marginBottom:6 }}>Harmonics (Hidden Patterns)</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>
                Harmonic charts multiply every planetary position by a number and wrap around 360°. The 5th harmonic reveals your creative pattern, the 7th reveals spiritual gifts, and the 9th (Navamsa) reveals your soul's deeper purpose and partnership karma.
              </p>
            </div>
            <div style={{ padding:"12px 16px", borderRadius:12, background:M3.surfaceVariant }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.primary, fontWeight:"700", marginBottom:6 }}>Synastry (Compatibility)</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>
                Synastry overlays two people's charts to reveal the aspects between them. Venus-Mars connections show romantic chemistry. Sun-Moon connections show emotional compatibility. Saturn connections show commitment and lessons. No combination is inherently "good" or "bad" — each creates a distinct relationship dynamic.
              </p>
            </div>
            <div style={{ padding:"12px 16px", borderRadius:12, background:M3.surfaceVariant }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.primary, fontWeight:"700", marginBottom:6 }}>Shadow Work (Struggles)</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>
                Every placement has a shadow — the way it expresses when you are stressed, unconscious, or defensive. The Struggles tab reveals these patterns alongside their growth signals: the specific behaviours that indicate you are maturing past your shadow into your highest potential.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card title="🔗 HOW THE LAYERS CONNECT">
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, margin:0 }}>
            The real power of this system is in the <strong>cross-references between layers</strong>:
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:10 }}>
            {[
              { bridge:"Astrology ↔ Grammatology", desc:"Each zodiac sign and planet maps to a Hebrew letter via the Sefer Yetzirah. Aries = He (ה), the 'window.' Your Sun sign's letter reveals an archetypal layer most astrology systems miss." },
              { bridge:"Astrology ↔ Chinese", desc:"Your Western element (Fire/Earth/Air/Water) is compared to your Chinese element (Wood/Fire/Earth/Metal/Water). When they match, the theme is reinforced. When they differ, you carry complementary registers." },
              { bridge:"Numerology ↔ Astrology", desc:"Each number maps to a planet (1=Sun, 2=Moon, etc.). Your Life Path planet should resonate with the corresponding planet's strength in your natal chart." },
              { bridge:"Grammatology ↔ Numerology", desc:"Gematria calculates the numerical value of your name in Hebrew letters — the same letters mapped to zodiac signs and planets. The number, the letter, and the cosmic body form a triple resonance." },
              { bridge:"Calendar ↔ All Layers", desc:"The Sacred Calendar encodes all symbolic systems into the year: I Ching, Hebrew letters, Tarot, Ogham, Runic, multiple zodiacs. Your birthday's day-number activates specific geometric nodes, number sequences, and symbolic cycles." },
              { bridge:"Self-Development Use", desc:"Use this system to identify your natural gifts (trines, dominant elements), your growth edges (squares, missing numbers, shadow patterns), and your current timing (transits, personal year, calendar cycles). The goal is self-knowledge, not prediction." },
            ].map(b=>(
              <div key={b.bridge} style={{ padding:"10px 14px", borderRadius:10, background:M3.surfaceVariant, border:`1px solid ${M3.outlineVariant}` }}>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.primary, fontWeight:"700" }}>{b.bridge}</span>
                <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.7rem", lineHeight:1.55, color:M3.onSurface, margin:"4px 0 0" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="⚙ TECHNICAL NOTES">
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {[
            "This system is deterministic and uses no machine learning. All calculations are based on astronomical formulae, established numerological systems, and documented symbolic traditions.",
            "Planetary positions are computed using simplified analytical ephemeris (Keplerian orbital elements). For professional-grade precision, the Python backend uses the Swiss Ephemeris (pyswisseph) — the same library powering Solar Fire, Astro.com, and other professional tools.",
            "The Tropical zodiac is season-aligned (0° Aries = Spring Equinox). The Sidereal zodiac is star-aligned using the Lahiri ayanamsa (~24° offset). Both are displayed for completeness.",
            "House cusps use Whole Sign houses (each house = one full 30° sign from the Ascendant). The Ascendant and Midheaven are calculated using sidereal time from Julian Day.",
            "Chinese New Year dates are stored in a lookup table (1924-2040) for accuracy. The system correctly adjusts for births in January/February that fall before the lunar new year.",
            "The Sacred Calendar uses the Winter Solstice (Dec 22) as Day 1. All geometric subdivisions, number sequences, and symbolic cycles are calculated from this day number.",
            "The codebase is modularised into 66 source files across a structured directory: data (35 files), engines (7 files), components (18 files), plus theme, hooks, and utilities.",
          ].map((note,i)=>(
            <p key={i} style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:0, paddingLeft:12, borderLeft:`2px solid ${M3.outlineVariant}` }}>{note}</p>
          ))}
        </div>
      </Card>

    </div>
  );
}
