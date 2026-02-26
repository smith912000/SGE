import { useState } from "react";

export default function ChineseTab({ ctx }) {
  const {
    M3, A, res, grid2, ANIMAL_INFO, CN_EL_INFO, POLARITY_INFO, chineseCycle, Card, ChineseWheelWithTooltip,
    CHINESE_ASTRO_INTRO, WUXING_PROFILES, WUXING_GENERATING, WUXING_CONTROLLING,
    YEAR_END_STEM_POLARITY, CHINESE_ZODIAC_EXTENDED, CHINESE_TRANSLATION_NOTES,
    ZODIAC_TRINES, ZI_WEI_INFO, ZI_WEI_PALACES_SEQUENCES,
    ZI_WEI_MAJOR_STARS, TWELVE_HEAVENLY_GENERALS,
  } = ctx;

  const [cnSubTab, setCnSubTab] = useState("overview");
  const ai = ANIMAL_INFO[res.cn.animal] || {};
  const ei = CN_EL_INFO[res.cn.element] || {};
  const pi = POLARITY_INFO[res.cn.polarity] || {};
  const ext = CHINESE_ZODIAC_EXTENDED?.[res.cn.animal] || null;

  const elBal = {
    Wood:  { balanced:"When Wood is balanced, you grow steadily, set healthy boundaries, and channel anger into constructive change.", imbalanced:"When Wood is out of balance, you may become rigid, controlling, or chronically frustrated.", cultivate:"Spend time in nature. Begin new creative projects. Practice forgiveness. Physical movement unblocks Wood energy." },
    Fire:  { balanced:"When Fire is balanced, you radiate warmth, joy, and inspiration. You connect easily with others.", imbalanced:"When Fire is out of balance, you may become anxious, scattered, or burn out from overcommitting.", cultivate:"Practice presence and mindfulness. Laugh freely. Nurture close relationships." },
    Earth: { balanced:"When Earth is balanced, you feel grounded, generous, and nourishing — both to yourself and others.", imbalanced:"When Earth is out of balance, you may become a chronic worrier, overly self-sacrificing, or stuck in overthinking.", cultivate:"Eat mindfully. Spend time cooking, gardening, or working with your hands. Practice receiving as much as giving." },
    Metal: { balanced:"When Metal is balanced, you have clarity, integrity, and the ability to let go of what no longer serves you.", imbalanced:"When Metal is out of balance, you may become perfectionistic, grief-stricken, or emotionally cold.", cultivate:"Practice decluttering. Breathe deeply. Engage with art, music, or ritual. Allow yourself to grieve fully and then release." },
    Water: { balanced:"When Water is balanced, you possess deep wisdom, adaptability, and courage that comes from understanding.", imbalanced:"When Water is out of balance, you may become paralysed by fear, isolated, or emotionally frozen.", cultivate:"Rest more — Water needs stillness. Meditate near water. Journal your fears honestly." },
  };
  const eb = elBal[res.cn.element];

  const subTabs = [
    { id:"overview", label:"Overview" },
    { id:"wuxing",   label:"Wuxing" },
    { id:"trines",   label:"Trines" },
    { id:"ziwei",    label:"Zi Wei Dou Shu" },
    { id:"generals", label:"Heavenly Generals" },
  ];

  const pill = (id) => ({
    padding:"5px 14px", borderRadius:20, cursor:"pointer",
    background: cnSubTab===id ? M3.primary : "transparent",
    color: cnSubTab===id ? M3.onPrimary : M3.onSurfaceVariant,
    border: `1px solid ${cnSubTab===id ? M3.primary : M3.outlineVariant+"55"}`,
    fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", fontWeight: cnSubTab===id ? "700" : "400",
  });

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

      {/* Sub-tab navigation */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"center" }}>
        {subTabs.map(t=>(
          <div key={t.id} style={pill(t.id)} onClick={()=>setCnSubTab(t.id)}>{t.label}</div>
        ))}
      </div>

      {/* ═══════════════════ OVERVIEW ═══════════════════ */}
      {cnSubTab==="overview" && (<>
        <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
          <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.primary, marginBottom:4 }}>
            {CHINESE_ASTRO_INTRO?.titleEn || "Chinese Astrology — The Sexagenary Cycle"}
          </div>
          {CHINESE_ASTRO_INTRO?.titleZh && (
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.secondary, marginBottom:8 }}>
              {CHINESE_ASTRO_INTRO.titleZh}
            </div>
          )}
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>
            {CHINESE_ASTRO_INTRO?.dynastyContext || "Chinese astrology is based on a 60-year cycle combining 12 animals, 5 elements, and Yin/Yang polarity."}
          </p>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, marginTop:8, margin:"8px 0 0" }}>
            {CHINESE_ASTRO_INTRO?.pillars}
          </p>
          {CHINESE_ASTRO_INTRO?.harmonies && (
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurfaceVariant, fontStyle:"italic", margin:"8px 0 0" }}>
              {CHINESE_ASTRO_INTRO.harmonies}
            </p>
          )}
        </Card>

        {/* Year summary card */}
        <Card title={`☯ Year of the ${res.cn.animal} — ${res.cn.element} ${res.cn.polarity}`}>
          <div style={{ textAlign:"center", marginBottom:16 }}>
            <div style={{ fontSize:"4rem", lineHeight:1 }}>{ai.emoji||"☯"}</div>
            <div style={{ fontSize:"2.4rem", color:M3.primary, marginTop:4 }}>{res.cn.stem}{res.cn.branch}</div>
            <div style={{ fontSize:"1rem", color:M3.secondary, marginTop:2, fontFamily:"'EB Garamond',Georgia,serif", fontStyle:"italic" }}>
              {res.cn.stemPinyin}-{res.cn.branchPinyin}
            </div>
            {ext && (
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.tertiary, marginTop:4 }}>
                {ext.zh} · Branch: {ext.branch} · Trine {ext.trine}
              </div>
            )}
            {res.cn.lunar && (
              <div style={{ marginTop:8, padding:"6px 18px", borderRadius:20, background:M3.surfaceVariant+"66", display:"inline-block" }}>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.76rem", color:M3.primary, fontWeight:"700" }}>
                  Day {res.cn.lunar.day}, {res.cn.lunar.monthName} Month
                </span>
                <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", color:M3.onSurfaceVariant, marginLeft:8 }}>(lunisolar calendar)</span>
              </div>
            )}
            <div style={{ marginTop:8, display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap" }}>
              <span style={{ padding:"4px 14px", borderRadius:20, background:ei.color+"22", border:`1px solid ${ei.color}66`, color:ei.color, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700" }}>{res.cn.element}</span>
              <span style={{ padding:"4px 14px", borderRadius:20, background:M3.primaryContainer, color:M3.onPrimaryContainer, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem" }}>{pi.label}</span>
            </div>
            <div style={{ color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem", marginTop:6 }}>
              Position {res.cn.cycle60} of 60 in the Sexagenary Cycle
            </div>
            {res.cn.effectiveYear && res.cn.effectiveYear !== A.year && (
              <div style={{ color:M3.tertiary, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.7rem", fontStyle:"italic", marginTop:6 }}>
                Note: Born before Chinese New Year — your Chinese year is {res.cn.effectiveYear} rather than {A.year}.
              </div>
            )}
          </div>
        </Card>

        {/* Wheel */}
        <Card title="☯ Your Position on the Wheel">
          <div style={{ display:"flex", justifyContent:"center" }}>
            <ChineseWheelWithTooltip cn={res.cn} size={Math.min(420, window.innerWidth-80)}/>
          </div>
        </Card>

        {/* Animal archetype card */}
        <Card title={`${ai.emoji} The ${res.cn.animal} — "${ai.archetype}"`}>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:12 }}>
            {(ai.trait||"").split(", ").map(t=>(
              <span key={t} style={{ padding:"3px 12px", borderRadius:16, background:M3.primaryContainer, color:M3.onPrimaryContainer, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem" }}>{t}</span>
            ))}
          </div>
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.7, color:M3.onSurface, margin:0 }}>{ai.desc}</p>
          {ai.shadow && (
            <div style={{ marginTop:12, padding:"10px 14px", borderRadius:10, background:"#ff525211", border:"1px solid #ff525233" }}>
              <span style={{ color:"#ff8a80", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", fontWeight:"700" }}>SHADOW SIDE: </span>
              <span style={{ color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem" }}>{ai.shadow}</span>
            </div>
          )}
        </Card>

        {/* Extended profile from corpus */}
        {ext && (
          <Card title={`🜁 Extended Shēngxiào Profile — ${res.cn.animal}`}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:12 }}>
              <span style={{ padding:"4px 10px", borderRadius:14, background:M3.surfaceVariant+"55", color:M3.onSurface, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem" }}>
                {ext.zh} ({ext.pinyin})
              </span>
              <span style={{ padding:"4px 10px", borderRadius:14, background:M3.primaryContainer, color:M3.onPrimaryContainer, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem" }}>
                {ext.yinYang} · {ext.fixedElement}
              </span>
              <span style={{ padding:"4px 10px", borderRadius:14, background:M3.tertiaryContainer||M3.surfaceVariant, color:M3.onTertiaryContainer||M3.onSurface, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem" }}>
                Branch: {ext.branch} · Trine {ext.trine}
              </span>
              {ext.heavenlyCreature && (
                <span style={{ padding:"4px 10px", borderRadius:14, background:"#c9a84022", border:"1px solid #c9a84055", color:"#c9a840", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.65rem" }}>
                  {ext.heavenlyCreature}
                </span>
              )}
            </div>
            <div style={grid2}>
              <div>
                <div style={{ color:M3.secondary, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", letterSpacing:"0.08em", marginBottom:4 }}>TIME / POSITION</div>
                <p style={{ margin:"0 0 6px", color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55 }}>
                  Lunar month: {ext.lunarMonth} · Hours: {ext.hours}
                </p>
                <p style={{ margin:"0 0 6px", color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55 }}>
                  Cardinal point: {ext.cardinalPoint}
                </p>
                {ext.planets?.length > 0 && (
                  <p style={{ margin:0, color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55 }}>
                    Planets: {ext.planets.join(", ")}
                  </p>
                )}
                {ext.virtues?.length > 0 && (
                  <p style={{ margin:"6px 0 0", color:M3.tertiary, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem" }}>
                    Virtue(s): {ext.virtues.join(", ")}
                  </p>
                )}
              </div>
              <div>
                <div style={{ color:"#69ff8e", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", letterSpacing:"0.08em", marginBottom:4 }}>EXTENDED COMPATIBILITY</div>
                <p style={{ margin:"0 0 5px", color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.73rem", lineHeight:1.55 }}><strong style={{color:"#69ff8e"}}>Best:</strong> {(ext.compatible||[]).join(", ")}</p>
                <p style={{ margin:"0 0 5px", color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.73rem", lineHeight:1.55 }}><strong>Average:</strong> {(ext.average||[]).join(", ")}</p>
                <p style={{ margin:"0 0 5px", color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.73rem", lineHeight:1.55 }}><strong style={{color:"#ffab40"}}>Conflict:</strong> {(ext.conflict||[]).join(", ")}</p>
                <p style={{ margin:0, color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.73rem", lineHeight:1.55 }}><strong style={{color:"#ff5252"}}>Avoid:</strong> {(ext.avoid||[]).join(", ")}</p>
              </div>
            </div>
            {ext.generals && (
              <div style={{ marginTop:10, padding:"8px 12px", borderRadius:8, background:M3.surfaceDim }}>
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary }}>HEAVENLY GENERAL: </span>
                <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.73rem", color:M3.onSurfaceVariant }}>{ext.generals.sanskrit} ({ext.generals.chinese})</span>
              </div>
            )}
            {ext.note && (
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.7rem", color:M3.onSurfaceVariant, fontStyle:"italic", marginTop:8, margin:"8px 0 0" }}>
                {ext.note}
              </p>
            )}
          </Card>
        )}

        {/* Element + Polarity side-by-side */}
        <div style={grid2}>
          <Card title={`☯ Your Element: ${res.cn.element}`}>
            <div style={{ textAlign:"center", marginBottom:10 }}>
              <div style={{ width:56, height:56, borderRadius:"50%", background:ei.color+"22", border:`2px solid ${ei.color}`, display:"inline-flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:ei.color, fontFamily:"'Share Tech Mono',monospace", fontSize:"1.4rem", fontWeight:"700" }}>{res.cn.element[0]}</span>
              </div>
            </div>
            <div style={{ textAlign:"center", color:ei.color, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700", marginBottom:8 }}>{ei.trait}</div>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>{ei.desc}</p>
            {eb && (
              <div style={{ marginTop:14 }}>
                <div style={{ padding:"10px 14px", borderRadius:10, background:"#69ff8e08", border:"1px solid #69ff8e18", marginBottom:8 }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:4 }}>WHEN BALANCED</div>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{eb.balanced}</p>
                </div>
                <div style={{ padding:"10px 14px", borderRadius:10, background:"#ff525208", border:"1px solid #ff525218", marginBottom:8 }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#ff8a50", letterSpacing:"0.1em", marginBottom:4 }}>WHEN OUT OF BALANCE</div>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{eb.imbalanced}</p>
                </div>
                <div style={{ padding:"10px 14px", borderRadius:10, background:ei.color+"08", border:`1px solid ${ei.color}18` }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:ei.color, letterSpacing:"0.1em", marginBottom:4 }}>HOW TO CULTIVATE HEALTHY {res.cn.element.toUpperCase()}</div>
                  <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, color:M3.onSurface, margin:0 }}>{eb.cultivate}</p>
                </div>
              </div>
            )}
          </Card>

          <Card title={`${pi.symbol} Energy: ${pi.label}`}>
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurface, margin:0 }}>{pi.desc}</p>
            <div style={{ marginTop:14, padding:"10px 14px", borderRadius:10, background:M3.surfaceDim }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, marginBottom:4 }}>COMBINED READING</div>
              <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurface, margin:0 }}>
                As a <strong style={{color:ei.color}}>{res.cn.element}</strong> <strong style={{color:M3.primary}}>{res.cn.animal}</strong> in a <strong>{res.cn.polarity}</strong> year, your {res.cn.element.toLowerCase()} nature expresses through the {res.cn.animal.toLowerCase()}&apos;s {(ai.trait||"").split(", ")[0]?.toLowerCase()} quality with {res.cn.polarity==="Yang"?"an outward, assertive energy":"an inward, reflective energy"}.
              </p>
            </div>
          </Card>
        </div>

        {/* Compatibility */}
        <Card title="♡ Compatibility">
          <div style={grid2}>
            <div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:"#69ff8e", letterSpacing:"0.1em", marginBottom:8 }}>BEST ALLIES</div>
              {(ai.compat||[]).map(a=>{
                const inf=ANIMAL_INFO[a]||{};
                return (
                  <div key={a} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 0", borderBottom:`1px solid ${M3.outlineVariant}22` }}>
                    <span style={{ fontSize:"1.2rem" }}>{inf.emoji}</span>
                    <div>
                      <div style={{ color:M3.onSurface, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700" }}>{a}</div>
                      <div style={{ color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.66rem", fontStyle:"italic" }}>{inf.trait}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:"#ff5252", letterSpacing:"0.1em", marginBottom:8 }}>CHALLENGING MATCHES</div>
              {(ai.clash||[]).map(a=>{
                const inf=ANIMAL_INFO[a]||{};
                return (
                  <div key={a} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 0", borderBottom:`1px solid ${M3.outlineVariant}22` }}>
                    <span style={{ fontSize:"1.2rem" }}>{inf.emoji}</span>
                    <div>
                      <div style={{ color:M3.onSurface, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", fontWeight:"700" }}>{a}</div>
                      <div style={{ color:M3.onSurfaceVariant, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.66rem", fontStyle:"italic" }}>{inf.trait}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Year-end stem rule */}
        {YEAR_END_STEM_POLARITY && (
          <Card title="☯ Year-End Stem Rule (Lunisolar Quick Reference)">
            <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", color:M3.onSurfaceVariant, lineHeight:1.55, margin:"0 0 10px" }}>
              An easy traversal rule: the last digit of a Gregorian year reveals its Heavenly Stem polarity and element.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6 }}>
              {Object.entries(YEAR_END_STEM_POLARITY).map(([digit,info])=>(
                <div key={digit} style={{ padding:"6px 8px", borderRadius:8, textAlign:"center", background:M3.surfaceContainer, border:`1px solid ${M3.outlineVariant}33` }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1rem", color:M3.primary, fontWeight:"700" }}>{digit}</div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.onSurfaceVariant }}>{info.polarity} {info.element}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* 12 Animals Full Cycle */}
        <Card title="☯ The 12 Animals — Full Cycle">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2px 14px" }}>
            {Array.from({length:12},(_,i)=>{
              const yr=A.year - ((A.year-1924)%12) + i;
              const cc=chineseCycle(yr);
              const inf=ANIMAL_INFO[cc.animal]||{};
              const isYou=cc.animal===res.cn.animal;
              return (
                <div key={i} style={{ padding:"5px 8px", borderRadius:8, background:isYou?M3.primaryContainer+"44":"transparent", display:"flex", alignItems:"center", gap:6, fontFamily:"'Share Tech Mono', monospace", fontSize:"0.68rem", color:isYou?M3.tertiary:M3.onSurfaceVariant }}>
                  <span style={{ fontSize:"0.9rem" }}>{inf.emoji}</span>
                  <span style={{ minWidth:24 }}>{yr}</span>
                  <span style={{ fontWeight:isYou?"700":"400" }}>{cc.animal}</span>
                  <span style={{ marginLeft:"auto", fontSize:"0.6rem", color:M3.outlineVariant }}>{inf.archetype}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Translation notes */}
        {CHINESE_TRANSLATION_NOTES?.length > 0 && (
          <Card title="Translation and Naming Notes">
            <ul style={{ margin:"0 0 0 18px", padding:0, color:M3.onSurfaceVariant }}>
              {CHINESE_TRANSLATION_NOTES.map((note,i)=>(
                <li key={i} style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.74rem", lineHeight:1.55, marginBottom:5 }}>{note}</li>
              ))}
            </ul>
          </Card>
        )}
      </>)}

      {/* ═══════════════════ WUXING ═══════════════════ */}
      {cnSubTab==="wuxing" && (<>
        <Card title="☯ Five Phases (Wǔxíng 五行) — Profiles">
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
            The Chinese word <em>xíng</em> means &quot;changing states of being&quot; or &quot;metamorphoses&quot; — these are not static building blocks but dynamic transformations.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:10 }}>
            {Object.entries(WUXING_PROFILES||{}).map(([name, p])=>{
              const active = res.cn.element === name;
              const elCol = CN_EL_INFO[name]?.color || M3.primary;
              return (
                <div key={name} style={{ padding:"12px", borderRadius:10, border:`1px solid ${active?elCol:M3.outlineVariant+"55"}`, background: active ? elCol+"11" : M3.surfaceContainer }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:elCol, fontWeight:"700", marginBottom:6 }}>
                    {name} ({p.zh})
                  </div>
                  <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", color:M3.onSurfaceVariant, lineHeight:1.5 }}>
                    <div>{p.direction} · {p.season}</div>
                    <div>{p.creature} · {p.planet}</div>
                    <div>Color: {p.color}</div>
                    <div>Organs: {p.organs.join(", ")}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div style={grid2}>
          <Card title="生 Generating Cycle (Shēng)">
            <div style={{ padding:"10px 0" }}>
              {(WUXING_GENERATING||[]).map((step,i)=>(
                <div key={i} style={{ padding:"5px 0", fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", color:M3.onSurfaceVariant, lineHeight:1.55, borderBottom:`1px solid ${M3.outlineVariant}22` }}>
                  <span style={{ color:"#69ff8e", marginRight:8 }}>↻</span>{step}
                </div>
              ))}
            </div>
          </Card>
          <Card title="克 Controlling Cycle (Kè)">
            <div style={{ padding:"10px 0" }}>
              {(WUXING_CONTROLLING||[]).map((step,i)=>(
                <div key={i} style={{ padding:"5px 0", fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", color:M3.onSurfaceVariant, lineHeight:1.55, borderBottom:`1px solid ${M3.outlineVariant}22` }}>
                  <span style={{ color:"#ff8a80", marginRight:8 }}>⊘</span>{step}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card title="☯ Five Elements — Element Selector">
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
            {Object.entries(CN_EL_INFO).map(([el,inf])=>{
              const active=res.cn.element===el;
              return (
                <div key={el} style={{ padding:"7px 16px", borderRadius:20, background:active?inf.color+"33":"transparent", border:`1px solid ${inf.color}${active?"bb":"33"}`, color:active?inf.color:M3.onSurfaceVariant, fontFamily:"'Share Tech Mono', monospace", fontSize:"0.73rem", fontWeight:active?"700":"400" }}>{el}</div>
              );
            })}
          </div>
        </Card>
      </>)}

      {/* ═══════════════════ TRINES ═══════════════════ */}
      {cnSubTab==="trines" && (<>
        <Card title="☯ The Four Trines">
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
            The 12 animals are grouped into four trines of three, each sharing core temperamental qualities.
          </p>
          {(ZODIAC_TRINES||[]).map((tr)=>{
            const isYours = tr.signs.includes(res.cn.animal);
            return (
              <div key={tr.trine} style={{ padding:"12px 14px", borderRadius:10, marginBottom:10, border:`1px solid ${isYours ? M3.primary : M3.outlineVariant+"44"}`, background: isYours ? M3.primaryContainer+"33" : M3.surfaceContainer }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color: isYours ? M3.primary : M3.secondary, fontWeight:"700", marginBottom:6 }}>
                  Trine {tr.trine}: {tr.signs.map(s => `${(ANIMAL_INFO[s]||{}).emoji||""} ${s}`).join(" · ")}
                  {isYours && <span style={{ marginLeft:8, color:M3.tertiary, fontSize:"0.6rem" }}>← YOUR TRINE</span>}
                </div>
                <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.55, color:M3.onSurface, margin:"0 0 6px" }}>
                  {tr.summary}
                </p>
                <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                  <div>
                    <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#69ff8e", letterSpacing:"0.08em" }}>STRENGTHS: </span>
                    <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", color:M3.onSurfaceVariant }}>{tr.strengths.join(", ")}</span>
                  </div>
                  <div>
                    <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:"#ff8a80", letterSpacing:"0.08em" }}>SHADOW: </span>
                    <span style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", color:M3.onSurfaceVariant }}>{tr.shadow.join(", ")}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </Card>
      </>)}

      {/* ═══════════════════ ZI WEI DOU SHU ═══════════════════ */}
      {cnSubTab==="ziwei" && (<>
        <Card title={`✶ ${ZI_WEI_INFO?.name || "Zi Wei Dou Shu"}`}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.secondary, marginBottom:8 }}>
            {ZI_WEI_INFO?.hanzi}
          </div>
          {ZI_WEI_INFO?.notes?.map((n,i)=>(
            <p key={i} style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin: i===0 ? 0 : "6px 0 0" }}>{n}</p>
          ))}
          {ZI_WEI_INFO?.etymology?.length > 0 && (
            <div style={{ marginTop:10, padding:"8px 12px", borderRadius:8, background:M3.surfaceDim }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.secondary, marginBottom:4 }}>ETYMOLOGY</div>
              {ZI_WEI_INFO.etymology.map((e,i)=>(
                <div key={i} style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", color:M3.onSurfaceVariant, lineHeight:1.5 }}>{e}</div>
              ))}
            </div>
          )}
        </Card>

        <Card title="十二宮 The 12 Palaces">
          <div style={grid2}>
            <div style={{ padding:"10px 12px", borderRadius:10, background:M3.surfaceContainer }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, marginBottom:6 }}>CANONICAL SEQUENCE</div>
              {(ZI_WEI_PALACES_SEQUENCES?.canonical||[]).map((name,i)=>(
                <div key={i} style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", color:M3.onSurfaceVariant, lineHeight:1.6 }}>{i+1}. {name}</div>
              ))}
            </div>
            <div style={{ padding:"10px 12px", borderRadius:10, background:M3.surfaceContainer }}>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, marginBottom:6 }}>HOUSE-STYLE SEQUENCE</div>
              {(ZI_WEI_PALACES_SEQUENCES?.houseStyle||[]).map((h,i)=>(
                <div key={i} style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", color:M3.onSurfaceVariant, lineHeight:1.6 }}>
                  <strong style={{color:M3.primary}}>{h.house}</strong> {h.hanzi} — {h.title}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="✶ 14 Major Stars">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:10 }}>
            {(ZI_WEI_MAJOR_STARS||[]).map((star)=>(
              <div key={star.id} style={{ padding:"10px 12px", borderRadius:10, border:`1px solid ${M3.outlineVariant}55`, background:M3.surfaceContainer }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.7rem", color:M3.primary, fontWeight:"700" }}>
                  {star.hanzi} — {star.title}
                </div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.secondary, marginTop:2 }}>{star.element}</div>
                <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", color:M3.onSurfaceVariant, lineHeight:1.5, marginTop:6 }}>
                  {star.themes.join(" · ")}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </>)}

      {/* ═══════════════════ HEAVENLY GENERALS ═══════════════════ */}
      {cnSubTab==="generals" && (<>
        <Card title="十二神將 Twelve Heavenly Generals">
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 14px" }}>
            In East Asian Buddhism, the Twelve Heavenly Generals (Yaksha) are protective deities of Bhaiṣajyaguru, the Medicine Buddha. Each is traditionally linked to one of the twelve zodiac branches.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:8 }}>
            {(TWELVE_HEAVENLY_GENERALS||[]).map((g,i)=>{
              const isYours = g.linkedSign === res.cn.animal;
              return (
                <div key={i} style={{ padding:"10px 12px", borderRadius:10, border:`1px solid ${isYours ? M3.primary : M3.outlineVariant+"44"}`, background: isYours ? M3.primaryContainer+"33" : M3.surfaceContainer }}>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.7rem", color: isYours ? M3.primary : M3.secondary, fontWeight:"700" }}>
                    {g.sanskrit}
                    {isYours && <span style={{ marginLeft:6, color:M3.tertiary, fontSize:"0.58rem" }}>YOUR GENERAL</span>}
                  </div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.8rem", color:M3.onSurface, marginTop:2 }}>{g.chinese}</div>
                  <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.7rem", color:M3.onSurfaceVariant, marginTop:4 }}>
                    Linked to: {(ANIMAL_INFO[g.linkedSign]||{}).emoji||""} {g.linkedSign}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </>)}

    </div>
  );
}
