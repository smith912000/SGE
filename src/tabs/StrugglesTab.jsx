export default function StrugglesTab({ ctx }) {
  const {
    M3,
    res,
    SIGN_INFO,
    SIGN_COL,
    P_COL,
    P_SYM,
    zodSign,
    Card,
    calcAspects,
    SATURN_DEEP,
    HOUSE_AREA,
    P_ROLE,
    PAIR_INSIGHT,
    RISING_SHADOW,
    VENUS_SHADOW,
    MARS_SHADOW,
    MERCURY_SHADOW,
    EL_COL,
    ANIMAL_INFO,
  } = ctx;

  const sunSign  = zodSign(res.trop.Sun);
  const moonSign = zodSign(res.trop.Moon);
  const ascSign  = zodSign(res.houses.ASC);
  const venSign  = zodSign(res.trop.Venus);
  const marSign  = zodSign(res.trop.Mars);
  const merSign  = zodSign(res.trop.Mercury);
  const jupSign  = zodSign(res.trop.Jupiter);
  const satSign  = zodSign(res.trop.Saturn);
  const allAsp   = calcAspects(res.trop);
  const hardAsp  = allAsp.filter(a=>a.name==="Square"||a.name==="Opposition").sort((a,b)=>b.strength-a.strength);
  const domEl    = Object.entries(res.el).sort(([,a],[,b])=>b-a);
  const weakEl   = domEl.filter(([,v])=>v===0).map(([e])=>e);
  const lowEl    = domEl.filter(([,v])=>v===1).map(([e])=>e);

  const MISSING_ELEMENT = {
    Fire:"With no Fire in your chart, you may struggle with initiative, self-assertion, and trusting your own instincts. Taking the first step can feel paralysing — not because you lack courage, but because the natural fuel for spontaneous action isn't built into your wiring. You may wait for permission, overthink risks, or let others take the lead when you should be out front. The growth: you can develop Fire consciously — through physical activity, deliberate risk-taking, and practising acting before you feel ready.",
    Earth:"With no Earth in your chart, you may struggle with practical follow-through, financial stability, and staying grounded. Ideas come easily, but turning them into real, tangible outcomes feels like pushing through mud. Your body may feel like an afterthought. The growth: you can develop Earth consciously — through routine, physical work, cooking, budgeting, and committing to the boring-but-necessary structures that keep life functioning.",
    Air:"With no Air in your chart, you may struggle with objectivity, intellectual detachment, and social communication. You may feel things deeply but have difficulty articulating them clearly, or you might avoid uncomfortable conversations because you can't find the words. The growth: you can develop Air consciously — through journaling, reading widely, engaging in debate, and practising the art of saying difficult things with clarity.",
    Water:"With no Water in your chart, you may struggle with emotional awareness, empathy, and vulnerability. You may intellectualise feelings, avoid situations that require emotional depth, or feel disconnected from your own inner life. Others may perceive you as cold when you're actually just unequipped to access what you feel. The growth: you can develop Water consciously — through therapy, creative expression, sitting with uncomfortable feelings without fixing them, and learning to say 'I don't know what I feel' as a starting point rather than an ending.",
  };
  const LOW_ELEMENT = {
    Fire:"With only 1 planet in Fire, your assertive, spontaneous energy is limited. You can access it, but it doesn't come naturally — you have to reach for it consciously, especially when life demands quick action or visible confidence.",
    Earth:"With only 1 planet in Earth, staying grounded and practical takes deliberate effort. You may find that structure, routine, and material concerns don't hold your attention well — but they're exactly what you need more of.",
    Air:"With only 1 planet in Air, intellectual detachment and social fluency require extra work. You feel more than you think, and translating deep experiences into clear words is an ongoing challenge worth developing.",
    Water:"With only 1 planet in Water, emotional depth and intuition are areas you have to cultivate. You may default to thinking or doing when the situation actually calls for feeling.",
  };

  const CHIRON_HOUSE_WOUND = {
    0:"Your deepest wound lives in the area of identity and self-image. You may feel fundamentally flawed or 'wrong' in some way that others don't seem to struggle with. Early experiences made you question whether you had a right to exist as you are. The healing: learning that your sensitivity about who you are is exactly what makes you able to help others feel accepted.",
    1:"Your deepest wound lives in the area of self-worth and money. You may struggle to feel valuable unless you're earning, producing, or providing something tangible. The healing: learning that your worth is inherent, not earned.",
    2:"Your deepest wound lives in communication and being understood. You may have been silenced, misunderstood, or told your voice didn't matter early on. The healing: learning to speak your truth even when it shakes — your words carry more weight than you know.",
    3:"Your deepest wound lives in family, home, and belonging. You may feel like you never quite had a safe emotional home base, or that the family you came from didn't fully see you. The healing: creating the sense of belonging you didn't receive — first within yourself, then in chosen family.",
    4:"Your deepest wound lives in creativity, self-expression, and joy. You may have been shamed for being too much, too visible, or too playful. The healing: learning to create and express without needing approval — joy is not something you need permission for.",
    5:"Your deepest wound lives in daily routine, health, and service. You may push your body past its limits, neglect self-care, or feel that rest is laziness. The healing: learning that taking care of yourself is not selfish — it's the foundation everything else rests on.",
    6:"Your deepest wound lives in relationships and partnership. You may attract partners who trigger your deepest insecurities, or avoid intimacy to protect yourself from rejection. The healing: learning that vulnerability in relationship is not weakness but the only path to genuine connection.",
    7:"Your deepest wound lives in trust, power, and deep intimacy. You may have experienced betrayal, loss, or situations where others had power over you. The healing: learning to be vulnerable without being consumed — to share power rather than surrender or seize it.",
    8:"Your deepest wound lives in belief, meaning, and truth. You may struggle with faith — in a higher power, in life's fairness, or in your own ability to find answers. The healing: learning that not-knowing is a valid spiritual stance, and that wisdom comes from questions, not just answers.",
    9:"Your deepest wound lives in career and public reputation. You may feel that no achievement is ever enough, or that success brings exposure you're not ready for. The healing: learning to define success by your own standards rather than by what the world validates.",
    10:"Your deepest wound lives in community, belonging, and hope for the future. You may feel like an outsider in groups, or that your hopes and visions for the world won't be taken seriously. The healing: learning that your unique perspective is exactly what the group needs — even when it feels alienating.",
    11:"Your deepest wound lives in the unconscious, solitude, and spiritual life. You may carry hidden pain, unexplained anxieties, or a sense of being haunted by something you can't name. The healing: learning to face the shadows within — therapy, meditation, creative expression, and the willingness to look at what you'd rather avoid.",
  };

  const chironLon = res.trop.Chiron;
  let chironHouse = null;
  if (chironLon != null) {
    for (let h=0;h<12;h++){
      const cusp = res.houses[h+1];
      const next = res.houses[((h+1)%12)+1];
      const inH = next > cusp ? (chironLon >= cusp && chironLon < next) : (chironLon >= cusp || chironLon < next);
      if (inH) { chironHouse = h; break; }
    }
  }

  const twelfthCusp = res.houses[12];
  const firstCusp   = res.houses[1];
  const in12th = [];
  ["Sun","Moon","Mercury","Venus","Mars","Saturn","Neptune","Pluto"].forEach(p=>{
    if (res.trop[p]==null) return;
    const lon=res.trop[p];
    const inH = firstCusp > twelfthCusp ? (lon >= twelfthCusp && lon < firstCusp) : (lon >= twelfthCusp || lon < firstCusp);
    if (inH) in12th.push(p);
  });

  const TH_PLANET = {
    Sun:"Your core identity operates partly in the shadows — you may feel unseen, as if who you really are is hidden from the world. Self-expression can feel risky, and you may downplay your own needs.",
    Moon:"Your emotional life is deeply private and may feel overwhelming when exposed. You absorb others' emotions unconsciously and need significant solitude to stay centred.",
    Mercury:"Your thinking happens in the background — you process slowly and deeply, often understanding things intuitively before you can explain them logically. Others may underestimate your intelligence.",
    Venus:"Your relationship with love, beauty, and pleasure has a hidden quality. You may love secretly, feel unworthy of affection, or find that your deepest connections happen away from public view.",
    Mars:"Your drive and anger operate beneath the surface. You may struggle to assert yourself directly, channelling aggression inward or expressing it only when pushed to extremes.",
    Saturn:"Your relationship with authority and discipline is deeply internalised. You carry responsibilities others don't see and may punish yourself with standards no one else would impose.",
    Neptune:"Your spiritual and imaginative life is immensely rich but can blur into confusion, escapism, or a sense of being lost in the world. Boundaries between self and other dissolve easily here.",
    Pluto:"Your relationship with power is unconscious and intense. Transformative experiences happen in private, and you may carry trauma or intensity that others never witness.",
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <Card style={{ background:`linear-gradient(135deg,#ff525222,${M3.surfaceContainer})`, borderColor:"#ff525244" }}>
        <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#ff8a50", marginBottom:8 }}>Struggles & Growth Edges — Where Life Challenges You</div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
          Every chart contains both gifts and difficulties. This page gathers all the hard parts in one place — not to discourage you, but because <strong>knowing your struggles is the first step to working with them</strong>. The patterns here aren't flaws to fix; they're areas where life has asked more of you than average, and where your deepest growth happens.
        </p>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, marginTop:8 }}>
          Think of these as the curriculum your life keeps returning to — the lessons you can't skip. The reward for engaging with them is genuine wisdom, resilience, and depth that no amount of natural talent can provide.
        </p>
      </Card>

      <Card title="♄ Saturn's Test — Your Hardest Life Lesson">
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <div style={{ width:48, height:48, borderRadius:"50%", background:P_COL.Saturn+"22", border:`2px solid ${P_COL.Saturn}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:"1.5rem", color:P_COL.Saturn }}>♄</span>
          </div>
          <div>
            <div style={{ color:SIGN_COL[satSign], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.76rem", fontWeight:"700" }}>Saturn in {satSign}</div>
            <div style={{ color:M3.outlineVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem" }}>The area where life demands the most from you</div>
          </div>
        </div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.75, color:M3.onSurface, margin:0 }}>
          {SATURN_DEEP[satSign]}
        </p>
      </Card>

      {chironHouse != null && (
        <Card title="🩹 Chiron's Wound — Your Deepest Vulnerability">
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
            <div style={{ width:48, height:48, borderRadius:"50%", background:"#b388ff22", border:"2px solid #b388ff", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:"1.2rem", color:"#b388ff" }}>⚷</span>
            </div>
            <div>
              <div style={{ color:"#b388ff", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.76rem", fontWeight:"700" }}>Chiron in House {chironHouse+1} — {HOUSE_AREA[chironHouse]}</div>
              <div style={{ color:M3.outlineVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem" }}>The "wounded healer" — where pain becomes your greatest gift</div>
            </div>
          </div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.75, color:M3.onSurface, margin:0 }}>
            {CHIRON_HOUSE_WOUND[chironHouse]}
          </p>
        </Card>
      )}

      <Card title="⚡ Internal Friction — Your Hardest Aspects">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
          These are the strongest squares (□ — 90° angles creating friction) and oppositions (☍ — 180° angles creating polarisation) in your chart. They represent internal contradictions that can't be resolved — only integrated.
        </p>
        {hardAsp.length===0 ? (
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", color:M3.onSurfaceVariant, fontStyle:"italic" }}>No major hard aspects found — your chart has relatively little internal friction, which means growth comes more through external circumstances than internal tension.</p>
        ) : hardAsp.slice(0,6).map((a,i)=>{
          const r0=(P_ROLE[a.p1]||a.p1), r1=(P_ROLE[a.p2]||a.p2);
          const k1=`${r0}+${r1}`, k2=`${r1}+${r0}`;
          const pi = PAIR_INSIGHT[k1]||PAIR_INSIGHT[k2]||"";
          const struggleNarrative = a.name==="Square"
            ? `This square means your ${r0.toLowerCase()} and ${r1.toLowerCase()} are in constant creative tension. Neither will yield to the other. In daily life, this shows up as an internal tug-of-war: you want two things that seem incompatible. The frustration is real, but it's also what drives you to develop more than people without this tension ever need to. Every time you navigate this conflict, you build muscle that others simply don't have.`
            : `This opposition means your ${r0.toLowerCase()} and ${r1.toLowerCase()} sit on opposite ends of your psyche, like two people pulling a rope in opposite directions. You may swing between them — fully identified with one, then overcorrecting to the other. The work is learning to stand in the middle and hold both. People who master their oppositions develop a rare kind of wholeness — the ability to see from multiple perspectives simultaneously.`;
          return (
          <div key={i} style={{ padding:"12px 16px", marginBottom:10, borderRadius:12, background:a.col+"0c", borderLeft:`4px solid ${a.col}` }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <span style={{color:P_COL[a.p1], fontSize:"1rem"}}>{P_SYM[a.p1]}</span>
              <span style={{color:P_COL[a.p1], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700"}}>{a.p1}</span>
              <span style={{color:a.col, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem"}}>{a.sym} {a.name}</span>
              <span style={{color:P_COL[a.p2], fontSize:"1rem"}}>{P_SYM[a.p2]}</span>
              <span style={{color:P_COL[a.p2], fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700"}}>{a.p2}</span>
              <span style={{color:M3.outlineVariant, marginLeft:"auto", fontSize:"0.62rem", fontFamily:"'Share Tech Mono',monospace"}}>{(a.strength*100).toFixed(0)}% strength</span>
            </div>
            {pi && <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:"0 0 6px" }}>At its core: {pi}.</p>}
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>{struggleNarrative}</p>
          </div>
          );
        })}
      </Card>

      <Card title="🎭 Shadow Patterns — Your Unconscious Defaults Under Stress">
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
          These are the behaviours that emerge when you're stressed, threatened, or operating on autopilot. They're not who you are — they're defence mechanisms. Recognising them is the first step to choosing differently.
        </p>
        {[
          { label:`Rising Shadow (${ascSign})`, icon:"🌅", data:RISING_SHADOW[ascSign], area:"social mask & first impressions" },
          { label:`Venus Shadow (${venSign})`, icon:"💖", data:VENUS_SHADOW[venSign], area:"love & relationships" },
          { label:`Mars Shadow (${marSign})`, icon:"🔥", data:MARS_SHADOW[marSign], area:"conflict & assertion" },
          { label:`Mercury Shadow (${merSign})`, icon:"🧠", data:MERCURY_SHADOW[merSign], area:"thinking & communication" },
        ].filter(x=>x.data).map((x,i)=>(
          <div key={i} style={{ padding:"12px 16px", marginBottom:10, borderRadius:12, background:"#ff525208", borderLeft:"3px solid #ff525233" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
              <span style={{ fontSize:"1rem" }}>{x.icon}</span>
              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.7rem", fontWeight:"700", color:"#ff8a50" }}>{x.label}</span>
              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.outlineVariant, marginLeft:4 }}>({x.area})</span>
            </div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:"0 0 8px" }}>{x.data.shadow}</p>
            <div style={{ padding:"8px 12px", borderRadius:8, background:"#69ff8e08", borderLeft:"3px solid #69ff8e44" }}>
              <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:"#69ff8e", letterSpacing:"0.08em" }}>THE SHIFT: </span>
              <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.5, color:M3.onSurface }}>{x.data.growth}</span>
            </div>
          </div>
        ))}
      </Card>

      {(weakEl.length > 0 || lowEl.length > 0) && (
        <Card title="△ Elemental Gaps — What's Missing From Your Chart">
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
            When an element is absent or underrepresented in your chart, it doesn't mean you can't access that energy — it means you weren't born with it built in. You have to develop it deliberately, which is harder but ultimately more conscious than running on natural wiring.
          </p>
          {weakEl.map(el=>(
            <div key={el} style={{ padding:"14px 18px", marginBottom:10, borderRadius:12, background:EL_COL[el]+"0a", border:`1px solid ${EL_COL[el]}22` }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.7rem", fontWeight:"700", color:EL_COL[el], marginBottom:6 }}>NO {el.toUpperCase()} — COMPLETELY ABSENT</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>{MISSING_ELEMENT[el]}</p>
            </div>
          ))}
          {lowEl.map(el=>(
            <div key={el} style={{ padding:"12px 16px", marginBottom:8, borderRadius:10, background:EL_COL[el]+"08", border:`1px solid ${EL_COL[el]}18` }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", fontWeight:"700", color:EL_COL[el], marginBottom:4 }}>LOW {el.toUpperCase()} — UNDERREPRESENTED</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>{LOW_ELEMENT[el]}</p>
            </div>
          ))}
        </Card>
      )}

      {in12th.length > 0 && (
        <Card title="🌙 12th House Planets — Your Hidden Struggles">
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
            The 12th house governs the unconscious, solitude, hidden strengths, and self-undoing. Planets here operate beneath your conscious awareness — they're powerful but hard to access directly. They often manifest as vague anxieties, recurring dreams, or patterns you can't quite explain.
          </p>
          {in12th.map(p=>(
            <div key={p} style={{ padding:"12px 16px", marginBottom:8, borderRadius:10, background:P_COL[p]+"0c", borderLeft:`3px solid ${P_COL[p]}44` }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                <span style={{ color:P_COL[p], fontSize:"1.1rem" }}>{P_SYM[p]}</span>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700", color:P_COL[p] }}>{p} in the 12th House</span>
              </div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>{TH_PLANET[p]||`Your ${(P_ROLE[p]||p).toLowerCase()} operates in the hidden 12th house — this part of your life is deeply internalised and may require deliberate effort to bring into awareness.`}</p>
            </div>
          ))}
        </Card>
      )}

      {res.cn && (ANIMAL_INFO[res.cn.animal]||{}).shadow && (
        <Card title={`☯ ${res.cn.animal} Shadow — Chinese Tradition`}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
            <span style={{ fontSize:"2.4rem" }}>{(ANIMAL_INFO[res.cn.animal]||{}).emoji||"☯"}</span>
            <div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.76rem", fontWeight:"700", color:M3.primary }}>The Shadow of the {res.cn.animal}</div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.outlineVariant }}>What the {res.cn.animal} looks like at its worst</div>
            </div>
          </div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.75, color:M3.onSurface, margin:0 }}>
            {(ANIMAL_INFO[res.cn.animal]||{}).shadow}
          </p>
        </Card>
      )}

      <Card style={{ background:`linear-gradient(135deg,#69ff8e11,${M3.surfaceContainer})`, borderColor:"#69ff8e33" }}>
        <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:"#69ff8e", marginBottom:10 }}>A Note on Struggles</div>
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.84rem", lineHeight:1.8, color:M3.onSurface, margin:0 }}>
          The patterns above are not sentences — they're invitations. Every struggle in a chart is also a doorway to the kind of growth that people with easier charts never develop. Saturn's tests build mastery. Chiron's wounds become your greatest gifts to others. Hard aspects forge resilience. Shadow patterns, once seen, become choices rather than compulsions. The people who do the deepest self-development work are almost always the ones with the hardest charts. If this page feels heavy, that's because it's honest — and honesty is where real change begins.
        </p>
      </Card>
    </div>
  );
}
