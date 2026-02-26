export default function DeepTab({ ctx }) {
  const {
    M3,
    res,
    zodSign,
    SIGN_INFO,
    SIGN_COL,
    P_COL,
    P_SYM,
    P_ROLE,
    Card,
    grid2,
    calcAspects,
    harmonic,
    SOLAR_DEEP,
    LUNAR_DEEP,
    RISING_SHADOW,
    VENUS_SHADOW,
    MARS_SHADOW,
    MERCURY_SHADOW,
    JUPITER_DEEP,
    SATURN_DEEP,
    PAIR_INSIGHT,
    EL_COL,
    MOD_COL,
    ANIMAL_INFO,
    CN_EL_INFO,
    POLARITY_INFO,
    HOUSE_AREA,
  } = ctx;

  const sunSign  = zodSign(res.trop.Sun);
  const moonSign = zodSign(res.trop.Moon);
  const ascSign  = zodSign(res.houses.ASC);
  const venSign  = zodSign(res.trop.Venus);
  const marSign  = zodSign(res.trop.Mars);
  const merSign  = zodSign(res.trop.Mercury);
  const jupSign  = zodSign(res.trop.Jupiter);
  const satSign  = zodSign(res.trop.Saturn);
  const SI = SIGN_INFO;

  const domEl = Object.entries(res.el).sort(([,a],[,b])=>b-a)[0];
  const domMod = Object.entries(res.mod).sort(([,a],[,b])=>b-a)[0];
  const modLabel = {Cardinal:"Starter — you initiate",Fixed:"Sustainer — you persist",Mutable:"Adapter — you flow"};

  const aspects = res.aspects;
  const hardAsp = aspects.filter(a=>["Square","Opposition"].includes(a.name));
  const softAsp = aspects.filter(a=>["Trine","Sextile","Conjunction"].includes(a.name));

  return (
  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

    <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
      <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:8 }}>Deep Analysis — Your Chart Decoded in Plain English</div>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
        This page breaks down every major piece of your birth chart into detailed, personalized descriptions. It covers your <strong>Solar character</strong> (who you are at your core, based on your Sun sign), <strong>Lunar character</strong> (your emotional inner world, based on your Moon sign), <strong>Rising sign</strong> (how others perceive you), and the influence of every significant planet in your chart. Below that, you'll find your element and modality distribution, harmonic layers, and a full spiritual summary that ties everything together.
      </p>
    </Card>

    <Card title="☀ Solar Character — Who You Are at Your Core">
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
        <div style={{ width:52, height:52, borderRadius:"50%", background:SIGN_COL[sunSign]+"22", border:`2px solid ${SIGN_COL[sunSign]}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:"1.6rem" }}>{SI[sunSign].emoji}</span>
        </div>
        <div>
          <div style={{ color:SIGN_COL[sunSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>Sun in {sunSign}</div>
          <div style={{ color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem" }}>{SI[sunSign].element} · {SI[sunSign].mode} · ruled by {SI[sunSign].ruler}</div>
          {SI[sunSign].hebrew && <div style={{ color:M3.outlineVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", marginTop:2 }}>{SI[sunSign].emoji} ← {SI[sunSign].letterName} ({SI[sunSign].hebrew}) ← {SI[sunSign].phoenician} ← {SI[sunSign].hiero} — {SI[sunSign].letterMeaning.split("—")[1]?.trim()||""}</div>}
        </div>
      </div>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.75, color:M3.onSurface, margin:0 }}>{SOLAR_DEEP[sunSign]}</p>
    </Card>

    <Card title="🌙 Lunar Character — Your Emotional Landscape">
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
        <div style={{ width:52, height:52, borderRadius:"50%", background:SIGN_COL[moonSign]+"22", border:`2px solid ${SIGN_COL[moonSign]}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:"1.6rem" }}>{SI[moonSign].emoji}</span>
        </div>
        <div>
          <div style={{ color:SIGN_COL[moonSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>Moon in {moonSign}</div>
          <div style={{ color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem" }}>{SI[moonSign].element} · {SI[moonSign].mode} · ruled by {SI[moonSign].ruler}</div>
          {SI[moonSign].hebrew && <div style={{ color:M3.outlineVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", marginTop:2 }}>{SI[moonSign].emoji} ← {SI[moonSign].letterName} ({SI[moonSign].hebrew}) ← {SI[moonSign].phoenician} ← {SI[moonSign].hiero} — {SI[moonSign].letterMeaning.split("—")[1]?.trim()||""}</div>}
        </div>
      </div>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.75, color:M3.onSurface, margin:0 }}>{LUNAR_DEEP[moonSign]}</p>
    </Card>

    <Card title="🌅 Your Mask — How the World Meets You">
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
        <div style={{ width:52, height:52, borderRadius:"50%", background:SIGN_COL[ascSign]+"22", border:`2px solid ${SIGN_COL[ascSign]}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:"1.6rem" }}>{SI[ascSign].emoji}</span>
        </div>
        <div>
          <div style={{ color:SIGN_COL[ascSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>{ascSign} Rising</div>
          <div style={{ color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem" }}>Your ascendant — the sign that was rising on the eastern horizon at your birth</div>
          {SI[ascSign].hebrew && <div style={{ color:M3.outlineVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", marginTop:2 }}>{SI[ascSign].emoji} ← {SI[ascSign].letterName} ({SI[ascSign].hebrew}) ← {SI[ascSign].phoenician} ← {SI[ascSign].hiero} — {SI[ascSign].letterMeaning.split("—")[1]?.trim()||""}</div>}
        </div>
      </div>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.75, color:M3.onSurface, margin:0 }}>
        Your Rising Sign is your social front — the energy people encounter before they know your Sun or Moon. With <strong style={{color:SIGN_COL[ascSign]}}>{ascSign}</strong> rising, you come across as {SI[ascSign].plain.split(".")[0].toLowerCase()}. This is the lens through which all your other energies are filtered. People often identify more with their rising sign than their Sun sign in social settings, because it governs first impressions, body language, and instinctive reactions to new environments.
      </p>
      {RISING_SHADOW[ascSign] && (
        <div style={{ marginTop:14, padding:"12px 16px", borderRadius:10, background:"#ff525208", border:"1px solid #ff525218" }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.64rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:6 }}>SHADOW SIDE — WHEN THIS MASK GOES WRONG</div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>{RISING_SHADOW[ascSign].shadow}</p>
          <div style={{ marginTop:10, padding:"10px 14px", borderRadius:8, background:"#69ff8e08", border:"1px solid #69ff8e18" }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:4 }}>GROWTH SIGNAL</div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>{RISING_SHADOW[ascSign].growth}</p>
          </div>
        </div>
      )}
    </Card>

    {(()=>{
      const loveStyle = {Fire:"bold gestures and enthusiasm",Earth:"practical devotion and reliability",Air:"words, ideas, and intellectual connection",Water:"emotional depth and intuitive care"};
      const angerStyle = {Fire:"direct, fiery confrontation — quick to ignite and quick to forgive",Earth:"slow-burning determination — you rarely explode but never forget",Air:"sharp words and strategic detachment — you fight with your mind",Water:"emotional intensity — your feelings fuel your actions"};
      return (
      <div style={grid2}>
        <Card title="💖 How You Love — Venus in Your Chart">
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
            <span style={{ color:P_COL.Venus, fontSize:"1.4rem" }}>♀</span>
            <span style={{ color:SIGN_COL[venSign], fontFamily:"'Share Tech Mono',monospace", fontWeight:"700" }}>Venus in {venSign}</span>
          </div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
            Venus governs what you find beautiful, how you attract love, and what you value in relationships. In <strong style={{color:SIGN_COL[venSign]}}>{venSign}</strong>, your romantic style is {SI[venSign].plain.split(".")[0].toLowerCase()}. You are drawn to partners who embody {venSign} qualities — {SI[venSign].element.toLowerCase()} energy, {SI[venSign].mode.toLowerCase()} nature. You show love through {loveStyle[SI[venSign].element]}.
          </p>
          {VENUS_SHADOW[venSign] && (
            <div style={{ marginTop:10, padding:"10px 14px", borderRadius:8, background:"#ff525208", border:"1px solid #ff525218" }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:4 }}>SHADOW IN LOVE</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{VENUS_SHADOW[venSign].shadow}</p>
            </div>
          )}
          {VENUS_SHADOW[venSign] && (
            <div style={{ marginTop:6, padding:"8px 14px", borderRadius:8, background:"#69ff8e08", border:"1px solid #69ff8e18" }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:4 }}>GROWTH SIGNAL</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurface, margin:0 }}>{VENUS_SHADOW[venSign].growth}</p>
            </div>
          )}
        </Card>
        <Card title="🔥 How You Act — Mars in Your Chart">
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
            <span style={{ color:P_COL.Mars, fontSize:"1.4rem" }}>♂</span>
            <span style={{ color:SIGN_COL[marSign], fontFamily:"'Share Tech Mono',monospace", fontWeight:"700" }}>Mars in {marSign}</span>
          </div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
            Mars is your engine — how you pursue goals, handle conflict, and express desire. In <strong style={{color:SIGN_COL[marSign]}}>{marSign}</strong>, your drive is {SI[marSign].plain.split(".")[0].toLowerCase()}. When angered, you respond with {angerStyle[SI[marSign].element]}.
          </p>
          {MARS_SHADOW[marSign] && (
            <div style={{ marginTop:10, padding:"10px 14px", borderRadius:8, background:"#ff525208", border:"1px solid #ff525218" }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:4 }}>SHADOW IN CONFLICT</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{MARS_SHADOW[marSign].shadow}</p>
            </div>
          )}
          {MARS_SHADOW[marSign] && (
            <div style={{ marginTop:6, padding:"8px 14px", borderRadius:8, background:"#69ff8e08", border:"1px solid #69ff8e18" }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:4 }}>GROWTH SIGNAL</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurface, margin:0 }}>{MARS_SHADOW[marSign].growth}</p>
            </div>
          )}
        </Card>
      </div>
      );
    })()}

    {(()=>{
      const learnStyle = {Fire:"doing and experimenting — hands-on, fast-paced, intuitive leaps",Earth:"practical application — step-by-step, methodical, evidence-based",Air:"reading, discussion, and debate — abstract thinking comes naturally",Water:"feeling and absorption — you understand things emotionally before intellectually"};
      const commStyle = {Cardinal:"direct and initiating — you get to the point",Fixed:"thorough and persistent — you develop ideas fully before sharing",Mutable:"adaptable and wide-ranging — you can talk to anyone about anything"};
      return (
      <Card title="🧠 How You Think — Mercury in Your Chart">
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
          <span style={{ color:P_COL.Mercury, fontSize:"1.3rem" }}>☿</span>
          <span style={{ color:SIGN_COL[merSign], fontFamily:"'Share Tech Mono',monospace", fontWeight:"700" }}>Mercury in {merSign}</span>
        </div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, margin:0 }}>
          Mercury shapes how you process information, communicate, and learn. In <strong style={{color:SIGN_COL[merSign]}}>{merSign}</strong>, your mind is {SI[merSign].plain.split(".")[0].toLowerCase()}. You learn best through {learnStyle[SI[merSign].element]}. Your communication style is {commStyle[SI[merSign].mode]}.
        </p>
        {MERCURY_SHADOW[merSign] && (
          <div style={{ marginTop:12, padding:"10px 14px", borderRadius:8, background:"#ff525208", border:"1px solid #ff525218" }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:4 }}>YOUR MIND'S TRAP</div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>{MERCURY_SHADOW[merSign].shadow}</p>
          </div>
        )}
        {MERCURY_SHADOW[merSign] && (
          <div style={{ marginTop:6, padding:"8px 14px", borderRadius:8, background:"#69ff8e08", border:"1px solid #69ff8e18" }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:4 }}>GROWTH SIGNAL</div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{MERCURY_SHADOW[merSign].growth}</p>
          </div>
        )}
      </Card>
      );
    })()}

    <div style={grid2}>
      <Card title="♃ Where Life Expands — Jupiter in Your Chart">
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
          <span style={{ color:P_COL.Jupiter, fontSize:"1.4rem" }}>♃</span>
          <span style={{ color:SIGN_COL[jupSign], fontFamily:"'Share Tech Mono',monospace", fontWeight:"700" }}>Jupiter in {jupSign}</span>
        </div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
          {JUPITER_DEEP[jupSign]}
        </p>
      </Card>
      <Card title="♄ Where Life Tests You — Saturn in Your Chart">
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
          <span style={{ color:P_COL.Saturn, fontSize:"1.4rem" }}>♄</span>
          <span style={{ color:SIGN_COL[satSign], fontFamily:"'Share Tech Mono',monospace", fontWeight:"700" }}>Saturn in {satSign}</span>
        </div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
          {SATURN_DEEP[satSign]}
        </p>
      </Card>
    </div>

    <Card title="⚖ Your Inner Tensions & Gifts — Key Connections">
      <div style={{ marginBottom:16 }}>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:10 }}>NATURAL GIFTS ({softAsp.length}) — talents and ease built into your chart</div>
        {softAsp.slice(0,5).map((a,i)=>{
          const r0=(P_ROLE[a.p1]||a.p1).toLowerCase(), r1=(P_ROLE[a.p2]||a.p2).toLowerCase();
          const k1=`${P_ROLE[a.p1]}+${P_ROLE[a.p2]}`, k2=`${P_ROLE[a.p2]}+${P_ROLE[a.p1]}`;
          const pi = PAIR_INSIGHT[k1]||PAIR_INSIGHT[k2]||"";
          const giftAdvice = a.name==="Conjunction"?`Because these two forces are fused, they amplify each other powerfully. The self-development opportunity: consciously direct this combined energy rather than letting it run on autopilot.`
            :a.name==="Trine"?`This is a natural talent — it comes so easily you may not recognise it as a gift. The self-development opportunity: deliberately invest in this area, because ease here means you can reach mastery faster than most.`
            :`This is a gentle opportunity that activates when you consciously choose to use it. The self-development opportunity: look for situations that let these two parts of you collaborate — that's where you'll find effortless progress.`;
          return (
          <div key={i} style={{ padding:"10px 14px", marginBottom:8, borderRadius:10, background:a.col+"0e", borderLeft:`3px solid ${a.col}` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface }}>
              <span style={{color:P_COL[a.p1]}}>{P_SYM[a.p1]} {a.p1}</span>
              <span style={{color:a.col, margin:"0 6px"}}>{a.sym} {a.name}</span>
              <span style={{color:P_COL[a.p2]}}>{P_SYM[a.p2]} {a.p2}</span>
            </div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:"6px 0 0" }}>
              {pi ? `Your ${r0} and ${r1}: ${pi}.` : `Your ${r0} and ${r1} work together naturally.`}
            </p>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:"#69ff8e", margin:"6px 0 0", fontStyle:"italic" }}>
              {giftAdvice}
            </p>
          </div>
          );
        })}
      </div>
      <div>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:10 }}>GROWTH EDGES ({hardAsp.length}) — where challenge builds your deepest strengths</div>
        {hardAsp.slice(0,5).map((a,i)=>{
          const r0=(P_ROLE[a.p1]||a.p1).toLowerCase(), r1=(P_ROLE[a.p2]||a.p2).toLowerCase();
          const k1=`${P_ROLE[a.p1]}+${P_ROLE[a.p2]}`, k2=`${P_ROLE[a.p2]}+${P_ROLE[a.p1]}`;
          const pi = PAIR_INSIGHT[k1]||PAIR_INSIGHT[k2]||"";
          const growthAdvice = a.name==="Square"
            ?`This square creates internal friction that never fully resolves — and that's the point. It's a lifelong engine of growth. The self-development work: instead of trying to eliminate the tension between your ${r0} and ${r1}, learn to use it as fuel. The moments when these two parts of you clash are exactly the moments that forge your character.`
            :a.name==="Opposition"
            ?`This opposition means your ${r0} and ${r1} pull in opposite directions — you may feel like you have to choose one over the other. The self-development work: you don't. Integration means holding both, learning to swing between the poles consciously rather than being yanked by whichever one is louder. The people who master their oppositions become remarkably balanced.`
            :`This creates a persistent challenge that pushes you to develop where you're weakest. The self-development work: notice when your ${r0} and ${r1} feel at odds, and instead of suppressing one, ask what each is trying to tell you.`;
          return (
          <div key={i} style={{ padding:"10px 14px", marginBottom:8, borderRadius:10, background:a.col+"0e", borderLeft:`3px solid ${a.col}` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface }}>
              <span style={{color:P_COL[a.p1]}}>{P_SYM[a.p1]} {a.p1}</span>
              <span style={{color:a.col, margin:"0 6px"}}>{a.sym} {a.name}</span>
              <span style={{color:P_COL[a.p2]}}>{P_SYM[a.p2]} {a.p2}</span>
            </div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:"6px 0 0" }}>
              {pi ? `Your ${r0} and ${r1}: ${pi}.` : `Your ${r0} and ${r1} are in tension.`}
            </p>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:"#ff8a50", margin:"6px 0 0", fontStyle:"italic" }}>
              {growthAdvice}
            </p>
          </div>
          );
        })}
      </div>
    </Card>

    <Card title="△ Elemental Makeup — Your Energetic DNA">
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:14 }}>
        {Object.entries(res.el).sort(([,a],[,b])=>b-a).map(([el,v])=>(
          <div key={el} style={{ flex:1, minWidth:120, padding:"12px 14px", borderRadius:12, background:EL_COL[el]+"11", border:`1px solid ${EL_COL[el]}33`, textAlign:"center" }}>
            <div style={{ color:EL_COL[el], fontFamily:"'Share Tech Mono',monospace", fontSize:"1.4rem", fontWeight:"700" }}>{v}</div>
            <div style={{ color:EL_COL[el], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700" }}>{el}</div>
          </div>
        ))}
      </div>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, margin:0 }}>
        Your dominant element is <strong style={{color:EL_COL[domEl[0]]}}>{domEl[0]} ({domEl[1]} planets)</strong>. {domEl[0]==="Fire"?"Fire-dominant people are energetic, inspiring, and action-oriented. You lead with passion and instinct. Your challenge is patience and listening.":domEl[0]==="Earth"?"Earth-dominant people are practical, reliable, and grounded. You build real things in the real world. Your challenge is flexibility and letting go of control.":domEl[0]==="Air"?"Air-dominant people are intellectual, social, and communicative. You live in the world of ideas and connection. Your challenge is grounding your thoughts in action and emotion.":"Water-dominant people are intuitive, emotional, and deeply perceptive. You feel the undercurrents others miss. Your challenge is boundaries and not absorbing everyone else's pain."}
      </p>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, marginTop:10 }}>
        Your dominant action style is <strong style={{color:MOD_COL[domMod[0]]}}>{domMod[0]} ({domMod[1]} planets)</strong>: {modLabel[domMod[0]]||domMod[0]}. {domMod[0]==="Cardinal"?"Cardinal-dominant charts produce leaders and initiators — people who start things, launch projects, and set direction. The risk is starting too many things without finishing.":domMod[0]==="Fixed"?"Fixed-dominant charts produce people of incredible persistence and focus. Once committed, you don't waver. The risk is stubbornness and resistance to necessary change.":"Mutable-dominant charts produce versatile, adaptable people who thrive in changing environments. You can shape-shift to meet any challenge. The risk is losing your center and becoming scattered."}
      </p>
    </Card>

    <Card title="∞ Your Harmonic Layers — Hidden Patterns Explained">
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
        Harmonics are like musical overtones in your chart. Your birth chart is the fundamental note; each harmonic reveals a subtler frequency of who you are. They are calculated by multiplying every planet's position by a number and wrapping it around the circle. Here are the key layers in your chart:
      </p>
      {[
        { n:5, title:"Creativity & Art (5th Harmonic)", col:"#64b5f6", desc:"This pattern reveals your creative DNA — how you play, what you make, and where your originality lives. Clusters here show concentrated artistic or inventive talent." },
        { n:7, title:"Intuition & Spiritual Gifts (7th Harmonic)", col:"#ce93d8", desc:"This pattern reveals mystical leanings — where you sense things beyond the rational. Strong patterns here indicate spiritual sensitivity, prophetic dreams, or artistic inspiration that feels channeled." },
        { n:9, title:"Purpose & Soul Bonds (9th Harmonic)", col:"#f48fb1", desc:"Called the Navamsa in Vedic astrology, this is considered the chart of your soul's deeper purpose and your most meaningful partnerships. It shows what you are truly here to do." },
      ].map(h=>{
        const hPos = harmonic(res.trop, h.n);
        const hAsp = calcAspects(hPos);
        const tight = hAsp.filter(a=>a.strength>0.7).slice(0,3);
        return (
          <div key={h.n} style={{ padding:"14px 16px", marginBottom:12, borderRadius:12, background:h.col+"0a", border:`1px solid ${h.col}22` }}>
            <div style={{ color:h.col, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.76rem", fontWeight:"700", marginBottom:6 }}>{h.title}</div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:"0 0 8px" }}>{h.desc}</p>
            {tight.length>0 && (
              <div style={{ borderTop:`1px solid ${h.col}22`, paddingTop:8 }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, marginBottom:4 }}>STRONGEST PATTERNS IN YOUR CHART:</div>
                {tight.map((a,i)=>(
                  <div key={i} style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", color:M3.onSurfaceVariant, padding:"2px 0" }}>
                    {P_SYM[a.p1]} {a.p1} ({P_ROLE[a.p1]||""}) {a.sym} {P_SYM[a.p2]} {a.p2} ({P_ROLE[a.p2]||""}) — <span style={{color:h.col}}>{a.name}</span> at {(a.strength*100).toFixed(0)}% strength
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </Card>

    {(()=>{
      const sunEl = SI[sunSign].element, moonEl = SI[moonSign].element, ascEl = SI[ascSign].element;
      const sunPlain = SI[sunSign].plain.split(". ").slice(0,2).join(". ")+".";
      const moonPlain = SI[moonSign].plain.split(". ").slice(0,2).join(". ")+".";
      const ascPlain = SI[ascSign].plain.split(". ").slice(0,2).join(". ")+".";

      const EL_DESC = {
        Fire:"a drive toward action, passion, and self-expression — you lead with enthusiasm and instinct",
        Earth:"a pull toward the practical, the tangible, and the real — you trust what you can see and build",
        Air:"a need to think, communicate, and connect — you process life through ideas and conversation",
        Water:"a depth of feeling, intuition, and empathy — you process life through emotion and imagination",
      };
      const MOD_DESC = {
        Cardinal:"starting things — you naturally initiate, set direction, and take the first step even when no one else will",
        Fixed:"sustaining things — you naturally persist, commit, and hold steady when others give up",
        Mutable:"adapting to things — you naturally adjust, improvise, and find a way through changing circumstances",
      };

      const moonAsEmotional =
        moonEl==="Fire" ? "Your emotional world runs hot and quick — you feel in bursts of intensity, need excitement to feel alive, and process feelings by acting on them. You recover fast from emotional blows but can be impatient with slower emotional processes." :
        moonEl==="Earth" ? "Your emotional world is steady and grounded — you feel deeply but process slowly, need physical comfort and routine to feel safe, and express care through practical acts rather than grand declarations. Change unsettles you, and you need time to adjust." :
        moonEl==="Air"  ? "Your emotional world runs through your mind — you process feelings by talking about them, analyzing them, and finding words for them. You need intellectual connection to feel emotionally close to someone. You can seem detached but you feel more than you show." :
        "Your emotional world is vast and permeable — you absorb the moods of people and places around you. You feel everything deeply, sometimes overwhelmingly. You need creative or spiritual outlets to process the sheer volume of what you take in. Solitude recharges you.";

      const ascAsFilter =
        ascEl==="Fire" ? "People first see you as confident, warm, and energetic. You come across as someone who takes charge and lights up a room — even if internally you feel very different." :
        ascEl==="Earth" ? "People first see you as calm, reliable, and put-together. You come across as someone grounded and competent — even if internally there is much more going on." :
        ascEl==="Air"  ? "People first see you as approachable, articulate, and socially graceful. You come across as someone who can talk to anyone and make them feel at ease — even if your inner world is far more complex." :
        "People first see you as sensitive, gentle, and somewhat mysterious. You come across as someone with hidden depths — which, in your case, is true.";

      const softCount = softAsp.length, hardCount = hardAsp.length;
      const totalAsp = softCount + hardCount;
      const flowDesc = `${softCount} of the ${totalAsp} connections between your planets are harmonious — these are areas where life cooperates with you. Things come naturally here: talents you didn't have to work for, relationships that click, situations that resolve themselves. They represent your built-in advantages.`;
      const growthDesc = `${hardCount} of the ${totalAsp} connections carry tension — these are areas where life pushes back. They create friction, challenges, and the feeling that you have to earn every inch. But this friction is what develops strength, depth, and resilience. People with many of these grow the most over a lifetime.`;

      const balanceParagraph = softCount > hardCount
        ? `With more ease than friction in your chart, life has given you many natural gifts. The challenge for you is not hardship — it's making sure you don't coast. Your talents are real, but they reach their full potential only when you voluntarily seek challenge. Comfort is your trap; growth happens when you leave it.`
        : hardCount > softCount
        ? `With more friction than ease in your chart, life has pushed you harder than most. You've likely felt that nothing comes easily — and that is accurate. But this pattern builds something rare: resilience, depth, and wisdom that come only from earned experience. People with charts like yours often accomplish things that surprise those who had an easier start.`
        : `Your chart is evenly balanced between ease and friction. You have genuine natural talent and enough challenge to develop it. This is the pattern of someone who can both receive gifts gracefully and fight for what matters. The key is knowing which situations call for which response.`;

      const cnAnimal = res.cn ? (ANIMAL_INFO[res.cn.animal]||{}) : {};
      const cnEl = res.cn ? (CN_EL_INFO[res.cn.element]||{}) : {};
      const cnPol = res.cn ? (POLARITY_INFO[res.cn.polarity]||{}) : {};

      const cnBridge = res.cn ? (() => {
        const sameEl = SI[sunSign].element.toLowerCase() === res.cn.element.toLowerCase();
        const westernEl = SI[sunSign].element;
        const chineseEl = res.cn.element;
        const animalDesc = cnAnimal.desc || "";
        const animalTrait = (cnAnimal.trait||"").toLowerCase();
        const animalShadow = (cnAnimal.shadow||"").toLowerCase();
        const polLabel = res.cn.polarity === "Yang" ? "outward-moving and assertive" : "inward-moving and reflective";

        let bridgeText = `In the Chinese system, you were born in a ${chineseEl} ${res.cn.animal} year with ${res.cn.polarity} polarity — meaning your Chinese energy is ${polLabel}. `;
        bridgeText += `The ${res.cn.animal} is known for being ${animalTrait}. ${animalDesc.split(". ").slice(0,2).join(". ")}. `;
        bridgeText += `${chineseEl} energy (${(cnEl.trait||"").toLowerCase()}) shapes how your ${res.cn.animal} nature expresses — ${cnEl.desc?.split(". ").slice(0,2).join(". ")||""}. `;
        if (sameEl) {
          bridgeText += `Both your Western and Chinese charts emphasise the same element (${westernEl}/${chineseEl}), reinforcing these qualities as a central theme of who you are. This is a strong, consistent signature.`;
        } else {
          bridgeText += `Your Western chart is rooted in ${westernEl} (${EL_DESC[westernEl]?.split("—")[0]?.trim()||westernEl.toLowerCase()}) while your Chinese chart is rooted in ${chineseEl} (${(cnEl.trait||"").toLowerCase()}). This means you carry two distinct energetic registers — one more ${westernEl==="Fire"||westernEl==="Air"?"outward and expressive":"inward and reflective"}, the other more ${chineseEl==="Fire"||chineseEl==="Air"?"outward and expressive":"inward and reflective"}. People who know you in different contexts may see genuinely different sides of you — and both are real.`;
        }
        if (cnAnimal.shadow) bridgeText += ` The ${res.cn.animal}'s shadow side (${animalShadow}) is something to be aware of — it often surfaces under stress, and understanding it helps you catch it early.`;
        return bridgeText;
      })() : "";

      return (<>
      <Card title="📖 Understanding the Building Blocks">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 16px" }}>
          Before reading your full portrait, here is what the key pieces mean in your specific case.
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12, marginBottom:16 }}>
          <div style={{ padding:"14px 16px", borderRadius:12, background:SIGN_COL[sunSign]+"0a", border:`1px solid ${SIGN_COL[sunSign]}22` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>YOUR SUN SIGN — YOUR CORE SELF</div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <span style={{ fontSize:"1.3rem" }}>{SI[sunSign].emoji}</span>
              <span style={{ color:SIGN_COL[sunSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>{sunSign}</span>
            </div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
              {sunPlain} This is who you are at your most authentic — the identity you grow into over your lifetime.
            </p>
          </div>

          <div style={{ padding:"14px 16px", borderRadius:12, background:SIGN_COL[moonSign]+"0a", border:`1px solid ${SIGN_COL[moonSign]}22` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>YOUR MOON SIGN — YOUR EMOTIONAL INNER WORLD</div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <span style={{ fontSize:"1.3rem" }}>{SI[moonSign].emoji}</span>
              <span style={{ color:SIGN_COL[moonSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>{moonSign}</span>
            </div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
              {moonPlain} {moonAsEmotional}
            </p>
          </div>

          <div style={{ padding:"14px 16px", borderRadius:12, background:SIGN_COL[ascSign]+"0a", border:`1px solid ${SIGN_COL[ascSign]}22` }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>YOUR RISING SIGN — HOW OTHERS SEE YOU</div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <span style={{ fontSize:"1.3rem" }}>{SI[ascSign].emoji}</span>
              <span style={{ color:SIGN_COL[ascSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", fontWeight:"700" }}>{ascSign}</span>
            </div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
              {ascPlain} {ascAsFilter}
            </p>
          </div>
        </div>

        <div style={{ padding:"14px 16px", borderRadius:12, background:EL_COL[domEl[0]]+"0a", border:`1px solid ${EL_COL[domEl[0]]}22`, marginBottom:12 }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>YOUR DOMINANT ELEMENT — {domEl[0].toUpperCase()} ({domEl[1]} OF YOUR PLANETS)</div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
            The element that dominates your chart is <strong style={{color:EL_COL[domEl[0]]}}>{domEl[0]}</strong> — this means {EL_DESC[domEl[0]]}. This colours everything: how you make decisions, what environments energise you, and what kind of people you naturally attract.
          </p>
        </div>

        <div style={{ padding:"14px 16px", borderRadius:12, background:MOD_COL[domMod[0]]+"0a", border:`1px solid ${MOD_COL[domMod[0]]}22`, marginBottom:12 }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>YOUR DOMINANT ACTION STYLE — {domMod[0].toUpperCase()} ({domMod[1]} PLANETS)</div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
            Your dominant mode is <strong style={{color:MOD_COL[domMod[0]]}}>{domMod[0]}</strong> — your natural approach to life is {MOD_DESC[domMod[0]]}. This is how you instinctively respond when life presents you with a choice or a challenge.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
          <div style={{ padding:"14px 16px", borderRadius:12, background:"#69ff8e0a", border:"1px solid #69ff8e22" }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:6 }}>FLOWING CONNECTIONS — {softCount}</div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{flowDesc}</p>
          </div>
          <div style={{ padding:"14px 16px", borderRadius:12, background:"#ff8a500a", border:"1px solid #ff8a5022" }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:6 }}>GROWTH EDGES — {hardCount}</div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{growthDesc}</p>
          </div>
        </div>

        <div style={{ padding:"14px 16px", borderRadius:12, background:M3.surfaceDim, border:`1px solid ${M3.outlineVariant}` }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, letterSpacing:"0.1em", marginBottom:6 }}>THE BALANCE BETWEEN THEM</div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>{balanceParagraph}</p>
        </div>
      </Card>

      {res.cn && (
        <Card title={`${cnAnimal.emoji||"☯"} The ${res.cn.animal} in Your Story — East Meets West`}>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.84rem", lineHeight:1.8, color:M3.onSurface, margin:0 }}>{cnBridge}</p>
        </Card>
      )}

      <Card title="🔮 Your Portrait — In Plain Language">
        <div style={{ padding:"16px 18px", borderRadius:12, background:M3.surfaceDim, border:`1px solid ${M3.outlineVariant}` }}>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.88rem", lineHeight:1.85, color:M3.onSurface, margin:0 }}>
            {(()=>{
              const sunDesc = sunSign==="Aries"?"someone who leads with instinct and courage":sunSign==="Taurus"?"someone who builds steadily and values what's real and lasting":sunSign==="Gemini"?"someone who connects, communicates, and adapts":sunSign==="Cancer"?"someone who nurtures, protects, and feels deeply":sunSign==="Leo"?"someone who radiates warmth and creative self-expression":sunSign==="Virgo"?"someone who refines, improves, and serves with precision":sunSign==="Libra"?"someone who seeks harmony, beauty, and genuine partnership":sunSign==="Scorpio"?"someone who transforms, probes, and operates with intensity":sunSign==="Sagittarius"?"someone who explores, questions, and reaches for meaning":sunSign==="Capricorn"?"someone who builds, endures, and earns lasting achievement":sunSign==="Aquarius"?"someone who innovates, reforms, and thinks ahead of the crowd":"someone who feels everything, imagines deeply, and dissolves ordinary boundaries";
              const moonDesc = moonSign==="Aries"?"quick, fiery emotions — you feel in bursts and recover fast":moonSign==="Taurus"?"steady, grounded emotions — you take your time to process but once you feel something, it lasts":moonSign==="Gemini"?"restless, curious emotions — you talk through your feelings and need mental stimulation to feel secure":moonSign==="Cancer"?"deep, protective emotions — you feel everything around you and need a safe emotional home base":moonSign==="Leo"?"warm, generous emotions — you need to feel appreciated and express your feelings with drama and heart":moonSign==="Virgo"?"careful, analytical emotions — you worry as a form of caring and show love through practical help":moonSign==="Libra"?"measured, diplomatic emotions — you seek equilibrium in relationships and are unsettled by conflict":moonSign==="Scorpio"?"intense, all-or-nothing emotions — you feel the full depth of everything and never forget":moonSign==="Sagittarius"?"optimistic, freedom-loving emotions — you need space to breathe and humour to cope":moonSign==="Capricorn"?"reserved, disciplined emotions — you feel more than you show and take emotional responsibility seriously":moonSign==="Aquarius"?"independent, unconventional emotions — you process feelings intellectually and need space to be yourself":"oceanic, boundless emotions — you absorb everything around you and need solitude to find your own centre";
              const ascDesc = ascSign==="Aries"?"bold and direct — people see you as confident and action-oriented":ascSign==="Taurus"?"calm and grounded — people see you as stable and reassuring":ascSign==="Gemini"?"witty and versatile — people see you as clever and easy to talk to":ascSign==="Cancer"?"gentle and approachable — people see you as caring and emotionally present":ascSign==="Leo"?"charismatic and warm — people see you as someone who commands attention naturally":ascSign==="Virgo"?"composed and detail-oriented — people see you as competent and put-together":ascSign==="Libra"?"graceful and diplomatic — people see you as charming and socially skilled":ascSign==="Scorpio"?"intense and magnetic — people see you as powerful and a little mysterious":ascSign==="Sagittarius"?"open and enthusiastic — people see you as adventurous and optimistic":ascSign==="Capricorn"?"serious and capable — people see you as mature and authoritative":ascSign==="Aquarius"?"unique and forward-thinking — people see you as original and independent":"dreamy and gentle — people see you as sensitive and slightly otherworldly";
              const domElDesc = domEl[0]==="Fire"?"action-oriented, passionate, and instinct-driven":domEl[0]==="Earth"?"practical, grounded, and focused on tangible results":domEl[0]==="Air"?"idea-driven, communicative, and socially attuned":"emotionally deep, intuitive, and relationship-focused";
              const domModDesc = domMod[0]==="Cardinal"?"initiate, set direction, and take the first step":domMod[0]==="Fixed"?"commit deeply, persevere, and see things through":"adapt, improvise, and find creative solutions to whatever comes";
              const balDesc = softCount > hardCount ? "Life has given you more natural ease than friction — your talents come naturally, and your path often opens without force. The invitation is to push yourself beyond comfort, because that's where your real potential lives." : hardCount > softCount ? "Life has asked more of you than most — you've earned your strengths through difficulty rather than luck. This builds a kind of depth and resilience that cannot be taught, only lived." : "You carry a balanced mix of natural ease and earned strength — some things come naturally, others you've had to fight for. This combination makes you both gifted and tested.";
              let portrait = `At your core, you are ${sunDesc}. `;
              portrait += `Beneath the surface, your inner emotional life is shaped by ${moonDesc}. `;
              portrait += `When people first meet you, the impression you give off is ${ascDesc}. `;
              portrait += `The overall texture of your personality is ${domElDesc}, and your instinct when facing decisions is to ${domModDesc}. `;
              portrait += balDesc;
              return portrait;
            })()}
          </p>
          {res.cn && (
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.88rem", lineHeight:1.85, color:M3.onSurface, marginTop:14 }}>
              {(()=>{
                const anTrait = (cnAnimal.trait||"").toLowerCase();
                const cnElTrait = (cnEl.trait||"").toLowerCase();
                const pol = res.cn.polarity==="Yang"?"outward-facing and assertive":"inward-facing and reflective";
                const sameEl = SI[sunSign].element===res.cn.element;
                let p = `The Chinese tradition sees you as a ${res.cn.element} ${res.cn.animal} — ${anTrait}, coloured by ${cnElTrait}, and ${pol} in nature. `;
                p += sameEl
                  ? `This echoes and reinforces your Western chart — both traditions point to the same core qualities, making them a defining signature of who you are.`
                  : `This adds a dimension your Western chart doesn't emphasise. Where your Western side is more ${SI[sunSign].element==="Fire"||SI[sunSign].element==="Air"?"outwardly expressive":"inwardly processing"}, your Chinese side brings ${res.cn.element==="Fire"||res.cn.element==="Air"?"outward energy and spontaneity":"depth and grounding"}. People who know you in different settings often see genuinely different versions of you — and both are authentic.`;
                return p;
              })()}
            </p>
          )}
        </div>
      </Card>

      <Card title="🧭 Your Self-Development Summary — An Actionable Guide">
        {(()=>{
          const solarPower = SOLAR_DEEP[sunSign]?.match(/Your.*superpower[^.]*\./)?.at(0) || SOLAR_DEEP[sunSign]?.split(". ").slice(-2).join(". ") || `${sunSign} core strength`;
          const lunarPower = LUNAR_DEEP[moonSign]?.match(/Your emotional superpower[^.]*\./)?.at(0) || `${moonSign} emotional resilience`;
          const elPower = domEl[0]==="Fire"?"inspiring others through your energy and courage — you ignite action wherever you go"
            :domEl[0]==="Earth"?"building real, lasting things in the real world — your reliability is rare and deeply valued"
            :domEl[0]==="Air"?"connecting ideas and people — your mind sees patterns others miss and translates complexity into clarity"
            :"feeling the invisible currents that others walk past — your emotional intelligence is a genuine superpower";

          const satGrowth = SATURN_DEEP[satSign]?.split(". ").slice(0,2).join(". ") || `Saturn in ${satSign} tests your discipline`;
          const hardTop = hardAsp[0] ? `Your strongest internal friction: ${(P_ROLE[hardAsp[0].p1]||hardAsp[0].p1)} ${hardAsp[0].name} ${(P_ROLE[hardAsp[0].p2]||hardAsp[0].p2)} — this is where life keeps asking you to grow, and where your deepest breakthroughs live.` : "";
          const cnShadow = (ANIMAL_INFO[res.cn?.animal]||{}).shadow || "";

          const pSun=zodSign(res.prog.Sun), pMoon=zodSign(res.prog.Moon);
          const sunShift = pSun!==sunSign ? `Your progressed Sun has moved into ${pSun} — you're evolving from ${sunSign} themes toward ${pSun}: ${SI[pSun]?.plain?.split(".")[0]?.toLowerCase()}.` : `Your progressed Sun is still in ${sunSign} — you're deepening your core identity rather than shifting it.`;
          const moonShift = pMoon!==zodSign(res.trop.Moon) ? `Your progressed Moon is in ${pMoon}, meaning your emotional needs are currently shaped by ${pMoon} energy.` : `Your progressed Moon remains in ${pMoon}, consolidating your emotional foundation.`;

          const srSatSign = res.sr?.Saturn ? zodSign(res.sr.Saturn) : null;
          const srChapter = srSatSign ? `This year, Saturn in your Solar Return is in ${srSatSign} — ${SATURN_DEEP[srSatSign]?.split(". ")[0]?.toLowerCase() || "challenging you to grow through discipline"}.` : "";

          const prompt1 = RISING_SHADOW[ascSign]?.shadow ? `"When I'm stressed, I notice myself ${RISING_SHADOW[ascSign].shadow.split("—")[1]?.trim()?.split(".")[0]?.toLowerCase() || "falling into old patterns"}. What is this behaviour protecting me from?"` : `"What mask do I put on when I feel unsafe, and what would happen if I let it drop?"`;
          const prompt2 = SATURN_DEEP[satSign] ? `"The area of life where I feel the most pressure or inadequacy is ${HOUSE_AREA ? satSign : satSign} — what would it look like to meet that challenge with compassion instead of just grit?"` : `"Where do I feel life is hardest on me, and what would it look like to meet that challenge with compassion?"`;
          const prompt3 = hardAsp[0] ? `"My ${(P_ROLE[hardAsp[0].p1]||hardAsp[0].p1).toLowerCase()} and ${(P_ROLE[hardAsp[0].p2]||hardAsp[0].p2).toLowerCase()} seem to pull in different directions. Instead of choosing one, how might I honour both?"` : `"What two parts of myself seem to be in conflict, and what would it look like to integrate them?"`;

          return (
          <div>
            <div style={{ padding:"16px 18px", borderRadius:12, background:"#7c4dff08", border:`1px solid #7c4dff22`, marginBottom:16 }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:"#b388ff", letterSpacing:"0.12em", marginBottom:10 }}>YOUR 3 SUPERPOWERS</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <div style={{ padding:"8px 14px", borderRadius:8, background:"#69ff8e08", borderLeft:"3px solid #69ff8e" }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:"#69ff8e", letterSpacing:"0.08em", marginBottom:2 }}>FROM YOUR SUN ({sunSign})</div>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{solarPower}</p>
                </div>
                <div style={{ padding:"8px 14px", borderRadius:8, background:"#69ff8e08", borderLeft:"3px solid #69ff8e" }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:"#69ff8e", letterSpacing:"0.08em", marginBottom:2 }}>FROM YOUR MOON ({moonSign})</div>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{lunarPower}</p>
                </div>
                <div style={{ padding:"8px 14px", borderRadius:8, background:"#69ff8e08", borderLeft:"3px solid #69ff8e" }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:"#69ff8e", letterSpacing:"0.08em", marginBottom:2 }}>FROM YOUR DOMINANT ELEMENT ({domEl[0]})</div>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{elPower}</p>
                </div>
              </div>
            </div>

            <div style={{ padding:"16px 18px", borderRadius:12, background:"#ff525208", border:"1px solid #ff525218", marginBottom:16 }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:"#ff8a50", letterSpacing:"0.12em", marginBottom:10 }}>YOUR 3 GROWTH EDGES</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <div style={{ padding:"8px 14px", borderRadius:8, background:"#ff8a5008", borderLeft:"3px solid #ff8a50" }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:"#ff8a50", letterSpacing:"0.08em", marginBottom:2 }}>FROM SATURN IN {satSign.toUpperCase()}</div>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{satGrowth}</p>
                </div>
                {hardTop && (
                  <div style={{ padding:"8px 14px", borderRadius:8, background:"#ff8a5008", borderLeft:"3px solid #ff8a50" }}>
                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:"#ff8a50", letterSpacing:"0.08em", marginBottom:2 }}>FROM YOUR HARDEST ASPECT</div>
                    <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{hardTop}</p>
                  </div>
                )}
                {cnShadow && (
                  <div style={{ padding:"8px 14px", borderRadius:8, background:"#ff8a5008", borderLeft:"3px solid #ff8a50" }}>
                    <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:"#ff8a50", letterSpacing:"0.08em", marginBottom:2 }}>FROM YOUR CHINESE SHADOW ({res.cn?.animal})</div>
                    <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{cnShadow}</p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ padding:"16px 18px", borderRadius:12, background:M3.primaryContainer+"44", border:`1px solid ${M3.outline}33`, marginBottom:16 }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.primary, letterSpacing:"0.12em", marginBottom:10 }}>YOUR CURRENT CHAPTER</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, margin:"0 0 8px" }}>{sunShift}</p>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, margin:"0 0 8px" }}>{moonShift}</p>
              {srChapter && <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.8rem", lineHeight:1.7, color:M3.onSurface, margin:0 }}>{srChapter}</p>}
            </div>

            <div style={{ padding:"16px 18px", borderRadius:12, background:"#ffab4008", border:"1px solid #ffab4022", marginBottom:16 }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:"#ffab40", letterSpacing:"0.12em", marginBottom:10 }}>3 JOURNAL PROMPTS — FOR DEEPER SELF-INQUIRY</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <div style={{ padding:"10px 14px", borderRadius:8, background:M3.surfaceDim }}>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0, fontStyle:"italic" }}>1. {prompt1}</p>
                </div>
                <div style={{ padding:"10px 14px", borderRadius:8, background:M3.surfaceDim }}>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0, fontStyle:"italic" }}>2. {prompt2}</p>
                </div>
                <div style={{ padding:"10px 14px", borderRadius:8, background:M3.surfaceDim }}>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurface, margin:0, fontStyle:"italic" }}>3. {prompt3}</p>
                </div>
              </div>
            </div>

            <div style={{ padding:"16px 18px", borderRadius:12, background:`linear-gradient(135deg,${M3.primaryContainer}66,${M3.secondaryContainer}66)`, border:`1px solid ${M3.outline}44` }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.tertiary, letterSpacing:"0.12em", marginBottom:10 }}>WHAT INTEGRATION LOOKS LIKE FOR YOU</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.84rem", lineHeight:1.8, color:M3.onSurface, margin:0 }}>
                Integration means bringing all parts of your chart — even the parts that seem to contradict each other — into conscious awareness. For you, that means honouring your {sunSign} need to {sunSign==="Aries"?"lead and initiate":sunSign==="Taurus"?"build and stabilise":sunSign==="Gemini"?"explore and communicate":sunSign==="Cancer"?"nurture and protect":sunSign==="Leo"?"create and shine":sunSign==="Virgo"?"refine and serve":sunSign==="Libra"?"harmonise and connect":sunSign==="Scorpio"?"transform and probe":sunSign==="Sagittarius"?"explore and philosophise":sunSign==="Capricorn"?"build and achieve":sunSign==="Aquarius"?"innovate and liberate":"imagine and feel"} while giving your {moonSign} Moon the {SI[moonSign]?.element==="Fire"?"excitement and freedom":SI[moonSign]?.element==="Earth"?"stability and comfort":SI[moonSign]?.element==="Air"?"mental stimulation and social connection":"emotional depth and creative space"} it craves — and presenting all of this through your {ascSign} Rising's natural style of {SI[ascSign]?.plain?.split(".")[0]?.toLowerCase() || ascSign.toLowerCase() + " energy"}. You don't have to choose between these parts. The goal is to let each one take the lead when it's needed, and step back when it's not. That's wholeness.
              </p>
            </div>
          </div>
          );
        })()}
      </Card>

      </>);
    })()}
  </div>
  );
}
