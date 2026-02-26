import { computeSambCalendar, SAMB_HOLIDAYS_MAP } from '../engines/calendar.js';
import { MASTER_TEACHER_DAYS } from '../data/calendar/festivals.js';
import { SAMB_SUBDIVISIONS } from '../data/calendar/subdivisions.js';

export default function CalendarTab({ ctx }) {
  const { calDate, setCalDate, A, setCalShowMonth, calShowMonth, calHolFilter, setCalHolFilter, M3, Card } = ctx;

  const cd = computeSambCalendar(calDate.y, calDate.m, calDate.d);
  const navPrev = ()=>{ const dt=new Date(calDate.y,calDate.m-1,calDate.d-1); setCalDate({y:dt.getFullYear(),m:dt.getMonth()+1,d:dt.getDate()}); };
  const navNext = ()=>{ const dt=new Date(calDate.y,calDate.m-1,calDate.d+1); setCalDate({y:dt.getFullYear(),m:dt.getMonth()+1,d:dt.getDate()}); };
  const navToday= ()=>{ const dt=new Date(); setCalDate({y:dt.getFullYear(),m:dt.getMonth()+1,d:dt.getDate()}); };
  const navBirth= ()=>{ setCalDate({y:A.year,m:A.month,d:A.day}); };
  const cyc = cd.cycles;
  const markerRadius = 130, markerCx = 160, markerCy = 160;
  const activeSubKeys = Object.entries(cd.subdivisions).filter(([,v])=>v.active);
  const allSubKeys = Object.entries(cd.subdivisions);
  const gDay = cd.dayOfYear;
  const gDayHebVal = (() => { let v = gDay, out = []; const H = [[400,"ת"],[300,"ש"],[200,"ר"],[100,"ק"],[90,"צ"],[80,"פ"],[70,"ע"],[60,"ס"],[50,"נ"],[40,"מ"],[30,"ל"],[20,"כ"],[10,"י"],[9,"ט"],[8,"ח"],[7,"ז"],[6,"ו"],[5,"ה"],[4,"ד"],[3,"ג"],[2,"ב"],[1,"א"]]; for(const [n,l] of H){while(v>=n){out.push(l);v-=n;}} return out.join(""); })();
  const gDayReduced = (() => { let v = gDay; while(v>9&&v!==11&&v!==22&&v!==33) v=String(v).split("").reduce((s,d)=>s+Number(d),0); return v; })();

  return (
  <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

    {/* Intro Card */}
    <Card style={{ background:`linear-gradient(135deg,${M3.primaryContainer}88,${M3.surfaceContainer})`, borderColor:M3.outline }}>
      <div style={{ fontFamily:"Cinzel,serif", fontSize:"1.1rem", color:M3.primary, marginBottom:8 }}>The Sacred Sambraielic Calendar</div>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", lineHeight:1.7, color:M3.onSurface, margin:"0 0 10px" }}>
        This is a <strong>multi-layered sacred calendar</strong> that begins on the Winter Solstice (around December 22nd) and counts 365 days (366 in a leap year). Unlike the Gregorian calendar, which is administrative, this calendar is designed to reveal the <em>symbolic meaning of each day</em> by overlaying multiple ancient traditions onto a single timeline.
      </p>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurfaceVariant, margin:0 }}>
        <strong>How to read this page:</strong> Each card below shows a different "layer" of meaning for the selected date. Think of it like a prism — one day, many angles of light. The <em>geometric markers</em> show where the day falls in the year's sacred geometry. The <em>symbolic cycles</em> show which ancient symbols (Chinese, Hebrew, Greek, Norse) are active. The <em>sacred names</em> show which divine names preside today. The <em>cross-cultural zodiacs</em> show your day's Ogham tree, Indigenous American totem, and Chinese solar animal. <em>Master Teacher</em> days (every 11th day) connect to the Qabbalah's 32 Paths of Wisdom. <em>Reflective Festivals</em> mark the end of each month with dedicated days for integration. The <em>number sequences</em> show whether the day number has special mathematical properties. Browse any date using the navigator below.
      </p>
    </Card>

    {/* Date Navigator */}
    <Card>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
        <button onClick={navPrev} style={{ background:M3.surfaceVariant, color:M3.onSurface, border:`1px solid ${M3.outline}`, borderRadius:8, padding:"6px 14px", cursor:"pointer", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.8rem" }}>◀ Prev Day</button>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:M3.tertiary }}>{cd.monthName}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.75rem", color:M3.onSurfaceVariant }}>
            Day {cd.dayOfYear} of {cd.maxDay} — Month {cd.month}, Day {cd.dayOfMonth} — Week {cd.weekNumber}
          </div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.secondary, marginTop:2 }}>
            {calDate.d}/{calDate.m}/{calDate.y} Gregorian
          </div>
        </div>
        <button onClick={navNext} style={{ background:M3.surfaceVariant, color:M3.onSurface, border:`1px solid ${M3.outline}`, borderRadius:8, padding:"6px 14px", cursor:"pointer", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.8rem" }}>Next Day ▶</button>
      </div>
      <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:10, flexWrap:"wrap", alignItems:"center" }}>
        <button onClick={navToday} style={{ background:M3.primaryContainer, color:M3.onPrimaryContainer, border:"none", borderRadius:8, padding:"5px 14px", cursor:"pointer", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem" }}>Today</button>
        <button onClick={navBirth} style={{ background:M3.secondaryContainer, color:M3.onPrimaryContainer, border:"none", borderRadius:8, padding:"5px 14px", cursor:"pointer", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem" }}>Birth Date</button>
        <button onClick={()=>setCalShowMonth(v=>!v)} style={{ background:calShowMonth?M3.tertiary:M3.surfaceVariant, color:calShowMonth?M3.surfaceDim:M3.onSurface, border:`1px solid ${M3.outline}`, borderRadius:8, padding:"5px 14px", cursor:"pointer", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem" }}>{calShowMonth?"Day View":"Month View"}</button>
      </div>
      <div style={{ display:"flex", gap:6, justifyContent:"center", marginTop:10, alignItems:"center", flexWrap:"wrap" }}>
        <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.onSurfaceVariant }}>Go to:</span>
        <input type="number" min="1" max="31" value={calDate.d} onChange={e=>{const v=parseInt(e.target.value)||1; setCalDate(p=>({...p,d:Math.max(1,Math.min(31,v))}));}}
          style={{ width:42, textAlign:"center", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", padding:"4px 2px", borderRadius:6, border:`1px solid ${M3.outline}`, background:M3.surfaceVariant, color:M3.onSurface }} />
        <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.onSurfaceVariant }}>/</span>
        <input type="number" min="1" max="12" value={calDate.m} onChange={e=>{const v=parseInt(e.target.value)||1; setCalDate(p=>({...p,m:Math.max(1,Math.min(12,v))}));}}
          style={{ width:42, textAlign:"center", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", padding:"4px 2px", borderRadius:6, border:`1px solid ${M3.outline}`, background:M3.surfaceVariant, color:M3.onSurface }} />
        <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.onSurfaceVariant }}>/</span>
        <input type="number" min="1900" max="2200" value={calDate.y} onChange={e=>{const v=parseInt(e.target.value)||2026; setCalDate(p=>({...p,y:v}));}}
          style={{ width:60, textAlign:"center", fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", padding:"4px 2px", borderRadius:6, border:`1px solid ${M3.outline}`, background:M3.surfaceVariant, color:M3.onSurface }} />
      </div>
    </Card>

    {/* Daily Guidance Synthesis */}
    <Card title="Daily Guidance" style={{ background:`linear-gradient(135deg,${M3.tertiaryContainer}44,${M3.surfaceContainer})`, borderColor:`${M3.tertiary}44` }}>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.84rem", lineHeight:1.75, color:M3.onSurface, margin:0 }}>
        {(()=>{
          const parts = [];
          parts.push(`Today is ${cd.weekday}, Day ${cd.dayOfYear} of the sacred year — ${cd.monthName} ${cd.dayOfMonth} (${cd.zodiacPrimary?.sign}${cd.isCusp?` cusp ${cd.zodiacSecondary?.sign||""}`:""}).`);
          if (cd.ogham) parts.push(`This is a ${cd.ogham.tree} day in the Ogham cycle, carrying ${cd.ogham.tree}'s energy of ${cd.ogham.tree==="Birch"?"new beginnings":cd.ogham.tree==="Rowan"?"protection and vision":cd.ogham.tree==="Ash"?"connection and rebirth":cd.ogham.tree==="Alder"?"courage and strength":cd.ogham.tree==="Willow"?"intuition and emotion":cd.ogham.tree==="Hawthorn"?"purification and patience":cd.ogham.tree==="Oak"?"strength and endurance":cd.ogham.tree==="Holly"?"challenge and balance":cd.ogham.tree==="Hazel"?"wisdom and creativity":cd.ogham.tree==="Vine"?"harvest and prophecy":cd.ogham.tree==="Ivy"?"persistence and growth":cd.ogham.tree==="Reed"?"direction and purpose":"transformation and endings"}, guided by the ${cd.ogham.animal}.`);
          if (cyc.iChing) parts.push(`The I Ching hexagram is #${cyc.iChing.n} "${cyc.iChing.en}" — meditate on how this theme shows up in your day.`);
          if (cyc.runic) parts.push(`The Norse half-month rune ${cyc.runic.rune} ${cyc.runic.name} (${cyc.runic.desc}) guides this period, with ${cyc.runic.shadow} as its shadow balance.`);
          if (cyc.arcana) parts.push(`The Tarot archetype is ${cyc.arcana} — use this as a reflective lens, not a prediction.`);
          if (activeSubKeys.length > 0) parts.push(`This is a geometrically significant day, sitting at a ${activeSubKeys.map(([,v])=>v.name).join(" and ")} division point of the year — a moment of heightened symbolic resonance.`);
          else parts.push(`No geometric markers are active, making this an "ordinary" day — ideal for steady progress and grounding.`);
          if (cd.masterTeacher) parts.push(`This is a Master Teacher day (#${cd.masterTeacher.cyclePos}), aligned with the "${cd.masterTeacher.intel}" Intelligence of ${cd.masterTeacher.pathName} — a potent day for inner work and study.`);
          if (cd.holidays.length > 0) parts.push(`Observed today: ${cd.holidays.map(h=>h.name).join(", ")}.`);
          return parts.join(" ");
        })()}
      </p>
    </Card>

    {/* Month Overview Grid */}
    {calShowMonth && (()=>{
      const mData = cd.monthData;
      const mDays = mData.n === 12 && cd.isLeap ? mData.days + 1 : mData.days;
      const gridDays = [];
      for (let i = 1; i <= mDays; i++) {
        const dayOfYear = mData.start + i - 1;
        const hasMT = MASTER_TEACHER_DAYS.includes(dayOfYear);
        const hasHol = !!(SAMB_HOLIDAYS_MAP[dayOfYear] && SAMB_HOLIDAYS_MAP[dayOfYear].length > 0);
        let hasGeo = false;
        for (const sub of Object.values(SAMB_SUBDIVISIONS)) {
          if (sub.days.includes(dayOfYear)) { hasGeo = true; break; }
        }
        gridDays.push({ dom: i, doy: dayOfYear, hasMT, hasHol, hasGeo, isCurrent: dayOfYear === cd.dayOfYear });
      }
      const solYear = cd.solsticeYear;
      const solstice = new Date(solYear, 11, 22);
      return (
      <Card title={`Month View — ${cd.monthName} (${mDays} days)`}>
        <div style={{ display:"flex", flexWrap:"wrap", gap:3, marginBottom:10 }}>
          <span style={{ display:"inline-flex", alignItems:"center", gap:3, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.onSurfaceVariant }}>
            <span style={{ width:8, height:8, borderRadius:2, background:M3.tertiary, display:"inline-block" }}></span> Master Teacher
          </span>
          <span style={{ display:"inline-flex", alignItems:"center", gap:3, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.onSurfaceVariant }}>
            <span style={{ width:8, height:8, borderRadius:2, background:M3.primary, display:"inline-block" }}></span> Holiday
          </span>
          <span style={{ display:"inline-flex", alignItems:"center", gap:3, fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.onSurfaceVariant }}>
            <span style={{ width:8, height:8, borderRadius:2, background:M3.secondary, display:"inline-block" }}></span> Geometry
          </span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:3 }}>
          {gridDays.map(gd => {
            const gregDate = new Date(solstice.getTime() + (gd.doy - 1) * 86400000);
            const gregStr = `${gregDate.getDate()}/${gregDate.getMonth()+1}`;
            return (
              <div key={gd.dom} onClick={()=>{setCalDate({y:gregDate.getFullYear(),m:gregDate.getMonth()+1,d:gregDate.getDate()}); setCalShowMonth(false);}}
                style={{ padding:"6px 2px", borderRadius:6, textAlign:"center", cursor:"pointer",
                  background: gd.isCurrent ? M3.primary : gd.hasMT ? M3.tertiaryContainer+"88" : gd.hasHol ? M3.primaryContainer+"66" : gd.hasGeo ? M3.secondaryContainer+"44" : M3.surfaceVariant+"44",
                  border: gd.isCurrent ? `2px solid ${M3.tertiary}` : `1px solid ${M3.outlineVariant}`,
                  transition:"all 0.15s" }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:gd.isCurrent?M3.surfaceDim:M3.onSurface, fontWeight:gd.isCurrent?"700":"400" }}>{gd.dom}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.48rem", color:gd.isCurrent?M3.surfaceDim+"cc":M3.onSurfaceVariant }}>{gregStr}</div>
                <div style={{ display:"flex", justifyContent:"center", gap:2, marginTop:2 }}>
                  {gd.hasMT && <span style={{ width:4, height:4, borderRadius:1, background:M3.tertiary, display:"inline-block" }}></span>}
                  {gd.hasHol && <span style={{ width:4, height:4, borderRadius:1, background:M3.primary, display:"inline-block" }}></span>}
                  {gd.hasGeo && <span style={{ width:4, height:4, borderRadius:1, background:M3.secondary, display:"inline-block" }}></span>}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      );
    })()}

    {/* Upcoming Events */}
    {!calShowMonth && (()=>{
      const d = cd.dayOfYear;
      const mx = cd.maxDay;
      const nextMT = MASTER_TEACHER_DAYS.find(mt => mt > d) || MASTER_TEACHER_DAYS[0];
      const daysToMT = nextMT > d ? nextMT - d : (mx - d) + nextMT;
      let nextHolDay = null, nextHolName = null;
      for (let i = d + 1; i <= mx; i++) { if (SAMB_HOLIDAYS_MAP[i] && SAMB_HOLIDAYS_MAP[i].length) { nextHolDay = i; nextHolName = SAMB_HOLIDAYS_MAP[i][0].name; break; } }
      if (!nextHolDay) { for (let i = 1; i <= d; i++) { if (SAMB_HOLIDAYS_MAP[i] && SAMB_HOLIDAYS_MAP[i].length) { nextHolDay = i; nextHolName = SAMB_HOLIDAYS_MAP[i][0].name; break; } } }
      const daysToHol = nextHolDay ? (nextHolDay > d ? nextHolDay - d : (mx - d) + nextHolDay) : null;
      let nextGeoDay = null, nextGeoName = null;
      for (let i = d + 1; i <= mx && !nextGeoDay; i++) {
        for (const [, sub] of Object.entries(SAMB_SUBDIVISIONS)) { if (sub.days.includes(i)) { nextGeoDay = i; nextGeoName = sub.name; break; } }
      }
      const daysToGeo = nextGeoDay ? nextGeoDay - d : null;
      return (
      <Card title="Coming Up">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
          <div style={{ padding:"8px", borderRadius:8, background:M3.tertiaryContainer+"44", textAlign:"center" }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.08em" }}>NEXT MASTER TEACHER</div>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.1rem", color:M3.tertiary, margin:"4px 0" }}>Day {nextMT}</div>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.onSurfaceVariant }}>in {daysToMT} day{daysToMT!==1?"s":""}</div>
          </div>
          <div style={{ padding:"8px", borderRadius:8, background:M3.primaryContainer+"44", textAlign:"center" }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.08em" }}>NEXT HOLIDAY</div>
            {nextHolName ? <>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.primary, margin:"4px 0" }}>{nextHolName}</div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.onSurfaceVariant }}>in {daysToHol} day{daysToHol!==1?"s":""}</div>
            </> : <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.onSurfaceVariant, margin:"4px 0" }}>None found</div>}
          </div>
          <div style={{ padding:"8px", borderRadius:8, background:M3.secondaryContainer+"44", textAlign:"center" }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.08em" }}>NEXT GEOMETRY</div>
            {nextGeoName ? <>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.secondary, margin:"4px 0" }}>{nextGeoName}</div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.onSurfaceVariant }}>Day {nextGeoDay} ({daysToGeo} day{daysToGeo!==1?"s":""})</div>
            </> : <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.onSurfaceVariant, margin:"4px 0" }}>End of year</div>}
          </div>
        </div>
      </Card>
      );
    })()}

    {/* Header Card */}
    <Card style={{ background:`linear-gradient(135deg,${M3.surfaceVariant}88,${M3.surfaceDim})`, borderColor:`${M3.tertiary}44` }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontFamily:"Cinzel,serif", fontSize:"1.6rem", color:M3.tertiary, letterSpacing:"0.08em" }}>
          {cd.zodiacPrimary?.sym} {cd.monthNameFull}
        </div>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1rem", color:M3.primary, margin:"6px 0" }}>
          {cd.weekday}, Day {cd.dayOfYear} of {cd.maxDay} — {cd.monthName} {cd.dayOfMonth}
        </div>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurfaceVariant, margin:"4px 0" }}>
          Hebrew: {cd.hebrewMonth?.heb} ({cd.hebrewMonth?.en}) · Egyptian: {cd.egyptianMonth?.name} (of {cd.egyptianMonth?.deity})
        </div>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.78rem", color:M3.onSurfaceVariant }}>
          {cd.zodiacPrimary?.sign}
          {cd.isCusp && cd.zodiacSecondary ? ` ↔ ${cd.zodiacSecondary.sign}` : ""}
          {cd.isCusp ? " (cusp day — the Sun transitions between two signs, blending their energies)" : ""}
          {cd.is53rdDay ? " — 53rd Day of Harmony (the year's final day, standing outside the 52 weeks — a day of completion and unity)" : ""}
          {cd.isLeapDay ? " — Leap Day (an extra day added every 4 years to align the calendar with Earth's orbit)" : ""}
        </div>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.tertiary, marginTop:6 }}>
          Gematrial day value: {gDayHebVal} = {cd.dayOfYear} (reduced: {gDayReduced})
        </div>
      </div>
    </Card>

    {/* Geometric Markers Ring */}
    <Card title="Geometric Markers — Sacred Divisions of the Year">
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurfaceVariant, margin:"0 0 6px" }}>
        Imagine dividing the 365-day year into equal segments using different shapes. Split it in <strong>half</strong> (day 182/183) and you get the Yin-Yang midpoint. Split it in <strong>thirds</strong> and you get the Triangle points. In <strong>quarters</strong> = the four seasons. In <strong>fifths</strong> = the Pentagram. And so on, all the way to <strong>21sts</strong>.
      </p>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", lineHeight:1.6, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
        When today falls exactly on one of these division points, that marker is "active" — the day sits at a geometrically significant moment in the year's cycle. Most days have no active markers; some rare days activate several at once.
      </p>
      <svg viewBox="0 0 320 320" style={{ width:"100%", maxWidth:320, margin:"0 auto", display:"block" }}>
        <circle cx={markerCx} cy={markerCy} r={markerRadius} fill="none" stroke={M3.outline} strokeWidth={1} />
        <circle cx={markerCx} cy={markerCy} r={markerRadius-20} fill="none" stroke={M3.outlineVariant} strokeWidth={0.5} strokeDasharray="2 4" />
        {allSubKeys.map(([key,v], i)=>{
          const angle = (i / allSubKeys.length) * Math.PI * 2 - Math.PI/2;
          const r = v.active ? markerRadius - 5 : markerRadius - 20;
          const x = markerCx + Math.cos(angle) * r;
          const y = markerCy + Math.sin(angle) * r;
          return <g key={key}>
            {v.active && <line x1={markerCx} y1={markerCy} x2={x} y2={y} stroke={M3.tertiary} strokeWidth={0.5} opacity={0.4} />}
            <circle cx={x} cy={y} r={v.active ? 8 : 4} fill={v.active ? M3.tertiary : M3.surfaceVariant} stroke={v.active ? M3.tertiary : M3.outline} strokeWidth={0.5} opacity={v.active ? 1 : 0.4} />
            <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fill={v.active ? M3.surfaceDim : M3.onSurfaceVariant} fontSize={v.active ? "8" : "5"} fontFamily="'Share Tech Mono',monospace">{v.sym}</text>
          </g>;
        })}
        <text x={markerCx} y={markerCy-8} textAnchor="middle" fill={M3.primary} fontSize="14" fontFamily="Cinzel,serif">Day {cd.dayOfYear}</text>
        <text x={markerCx} y={markerCy+8} textAnchor="middle" fill={M3.tertiary} fontSize="10" fontFamily="'Share Tech Mono',monospace">{activeSubKeys.length} active</text>
      </svg>
      {activeSubKeys.length > 0 && (
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:10, justifyContent:"center" }}>
          {activeSubKeys.map(([key,v])=>(
            <div key={key} style={{ background:M3.primaryContainer+"44", padding:"4px 10px", borderRadius:8, border:`1px solid ${M3.tertiary}44`, textAlign:"center" }}>
              <div style={{ fontSize:"1.1rem" }}>{v.sym}</div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurface }}>{v.name}</div>
              <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.56rem", color:M3.secondary }}>{v.fraction} of year · point #{v.index+1} of {v.total}</div>
            </div>
          ))}
        </div>
      )}
      {activeSubKeys.length === 0 && (
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", color:M3.onSurfaceVariant, textAlign:"center", margin:"10px 0 0" }}>
          No geometric markers are active today — this day falls between division points, which is the most common position.
        </p>
      )}
    </Card>

    {/* Symbolic Cycles */}
    <Card title="Symbolic Cycles — The Day's Living Symbols">
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
        Different ancient traditions divide the year into cycles and assign a symbol to each period. Below are the symbols active for this date from six traditions: Chinese divination (I Ching and Tai Xuan Jing), Hebrew mysticism (letter cycles), the Greek-Runic alphabet pairing, Norse runic half-months, and the Tarot's Major Arcana. Each gives a different lens on the day's energy.
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {/* I Ching */}
        <div style={{ background:M3.surfaceVariant+"66", padding:"10px 12px", borderRadius:10, border:`1px solid ${M3.outline}` }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:4 }}>I CHING HEXAGRAM</div>
          <div style={{ fontSize:"1.6rem", textAlign:"center" }}>{cyc.iChing?.ch}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface, textAlign:"center" }}>#{cyc.iChing?.n} — {cyc.iChing?.en}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant, textAlign:"center" }}>{cyc.iChing?.py} {cyc.iChing?.tri}</div>
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.6rem", color:M3.onSurfaceVariant, marginTop:6, fontStyle:"italic", lineHeight:1.4 }}>
            The I Ching (Book of Changes) is a 3,000-year-old Chinese oracle with 64 hexagrams. Each is a six-line figure of solid (yang) and broken (yin) lines representing a life situation. The 64 hexagrams cycle through the year, and "{cyc.iChing?.en}" is the theme presiding over this period.
          </div>
        </div>
        {/* Tetragram */}
        <div style={{ background:M3.surfaceVariant+"66", padding:"10px 12px", borderRadius:10, border:`1px solid ${M3.outline}` }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:4 }}>TAI XUAN JING TETRAGRAM</div>
          <div style={{ fontSize:"1.6rem", textAlign:"center" }}>{cyc.tetragram?.ch}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface, textAlign:"center" }}>#{cyc.tetragram?.n} — {cyc.tetragram?.en}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant, textAlign:"center" }}>{cyc.tetragram?.py}</div>
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.6rem", color:M3.onSurfaceVariant, marginTop:6, fontStyle:"italic", lineHeight:1.4 }}>
            The Tai Xuan Jing (Canon of Supreme Mystery) is a lesser-known Chinese text with 81 tetragrams (four-line figures instead of six). It adds a third state beyond yin/yang — representing heaven, earth, and humanity. 81 symbols cycle through the year, offering a subtler reading than the I Ching.
          </div>
        </div>
        {/* Hebrew 22-letter */}
        <div style={{ background:M3.primaryContainer+"33", padding:"10px 12px", borderRadius:10, border:`1px solid ${M3.primary}33` }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:4 }}>HEBREW 22-LETTER CYCLE</div>
          <div style={{ fontSize:"1.6rem", textAlign:"center" }}>{cyc.hebrew22?.l1} → {cyc.hebrew22?.l2}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface, textAlign:"center" }}>{cyc.hebrew22?.n1} → {cyc.hebrew22?.n2}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant, textAlign:"center" }}>{cyc.hebrew22?.t1}</div>
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.6rem", color:M3.onSurfaceVariant, marginTop:6, fontStyle:"italic", lineHeight:1.4 }}>
            The 22 Hebrew letters are mapped across the year so each pair governs ~16.6 days. Each letter corresponds to a Tarot Major Arcana card. Today transitions between these two letters and their associated archetypes. The arrow (→) shows the direction of the transition.
          </div>
        </div>
        {/* Hebrew 27 */}
        <div style={{ background:M3.primaryContainer+"33", padding:"10px 12px", borderRadius:10, border:`1px solid ${M3.primary}33` }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:4 }}>HEBREW 27-LETTER CYCLE (with finals)</div>
          <div style={{ fontSize:"1.6rem", textAlign:"center" }}>{cyc.hebrew27?.l} {cyc.hebrew27?.l2}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface, textAlign:"center" }}>{cyc.hebrew27?.n}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant, textAlign:"center" }}>Greek: {cyc.hebrew27?.g}</div>
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.6rem", color:M3.onSurfaceVariant, marginTop:6, fontStyle:"italic", lineHeight:1.4 }}>
            Hebrew has 5 letters that change shape when they appear at the end of a word (the "final" forms). Including these gives 27 letters, which cycle every ~13.5 days. This finer cycle pairs with Greek letters, revealing cross-cultural symbolic links.
          </div>
        </div>
        {/* Hebrew 28 */}
        <div style={{ background:M3.primaryContainer+"22", padding:"10px 12px", borderRadius:10, border:`1px solid ${M3.primary}22` }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:4 }}>HEBREW 28-LETTER (Perfection Cycle)</div>
          <div style={{ fontSize:"1.6rem", textAlign:"center" }}>{cyc.hebrew28?.l}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface, textAlign:"center" }}>{cyc.hebrew28?.n}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant, textAlign:"center" }}>Greek: {cyc.hebrew28?.g}</div>
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.6rem", color:M3.onSurfaceVariant, marginTop:6, fontStyle:"italic", lineHeight:1.4 }}>
            28 is a "perfect number" in mathematics (its factors 1+2+4+7+14 sum to itself). This cycle maps 28 letters (22 standard + 5 finals + a "Return" day) across the year at ~13-day intervals, symbolising mathematical perfection embedded in the alphabet.
          </div>
        </div>
        {/* Greek 24 + Runes */}
        <div style={{ background:M3.surfaceVariant+"66", padding:"10px 12px", borderRadius:10, border:`1px solid ${M3.outline}` }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:4 }}>GREEK-RUNIC PAIR (Grammatochronometrion)</div>
          <div style={{ fontSize:"1.4rem", textAlign:"center" }}>{cyc.greek24?.g} · {cyc.greek24?.r}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface, textAlign:"center" }}>Hebrew: {cyc.greek24?.h}</div>
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.6rem", color:M3.onSurfaceVariant, marginTop:6, fontStyle:"italic", lineHeight:1.4 }}>
            The "Grammatochronometrion" (literally "letter-time-measure") pairs the 24 Greek letters with the 24 Elder Futhark runes across the year (~15 days each). Greek and Norse cultures never shared an alphabet, but this overlay reveals surprising symbolic parallels. The Hebrew correspondence ties all three scripts together.
          </div>
        </div>
        {/* Runic Half-Month */}
        <div style={{ background:M3.surfaceVariant+"66", padding:"10px 12px", borderRadius:10, border:`1px solid ${M3.outline}` }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:4 }}>RUNIC HALF-MONTH</div>
          <div style={{ fontSize:"1.8rem", textAlign:"center" }}>{cyc.runic?.rune}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface, textAlign:"center" }}>{cyc.runic?.name}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant, textAlign:"center" }}>{cyc.runic?.desc}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.outlineVariant, textAlign:"center", marginTop:3 }}>
            Shadow rune: {cyc.runic?.shadow} (the opposite energy to balance against)
          </div>
          {cyc.runic?.time && (
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.tertiary, textAlign:"center", marginTop:3 }}>
              Runic Hour: {cyc.runic.time} — the time of day when this rune's energy peaks
            </div>
          )}
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.6rem", color:M3.onSurfaceVariant, marginTop:6, fontStyle:"italic", lineHeight:1.4 }}>
            In Norse tradition, each of the 24 Elder Futhark runes governs about half a month (~15 days). The "shadow rune" is its polar opposite — the energy that challenges or balances it. The "Runic Hour" is the time of day (in a 24-hour cycle) when this rune's energy is at its strongest — each rune maps to one hour of the day, creating a daily micro-cycle within the half-month macro-cycle.
          </div>
        </div>
        {/* Major Arcana */}
        <div style={{ background:M3.surfaceVariant+"66", padding:"10px 12px", borderRadius:10, border:`1px solid ${M3.outline}` }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:4 }}>MAJOR ARCANA (Tarot)</div>
          <div style={{ fontFamily:"Cinzel,serif", fontSize:"1rem", color:M3.tertiary, textAlign:"center" }}>{cyc.arcana}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant, textAlign:"center" }}>Card {cyc.arcanaIdx} of 22</div>
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.6rem", color:M3.onSurfaceVariant, marginTop:6, fontStyle:"italic", lineHeight:1.4 }}>
            The Tarot's 22 Major Arcana cards represent a journey from innocence (The Fool) through mastery (The World). They map across the year so each card presides over about 16.6 days. "{cyc.arcana}" sets the archetypal theme for this period — not a fortune-telling prediction, but a lens for self-reflection.
          </div>
        </div>
      </div>
    </Card>

    {/* Month+Day Tarot Narrative */}
    {cyc.monthDayTarot && (
    <Card title="Month-Day Tarot Narrative — The Story of Today">
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
        When you add the month number and the day-of-month number together, they point to a combined Tarot reading — a narrative formed by blending two cards. This is not a prediction but a symbolic lens for the day.
      </p>
      <div style={{ padding:"12px 16px", borderRadius:10, background:M3.primaryContainer+"22", border:`1px solid ${M3.primary}22` }}>
        <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.82rem", color:M3.onSurface, lineHeight:1.7 }}>{cyc.monthDayTarot}</div>
      </div>
    </Card>
    )}

    {/* Sacred Names */}
    <Card title="Sacred Names — Three Great Naming Traditions">
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
        Multiple spiritual traditions teach that the divine has many names, each expressing a different quality of the sacred. Below are three such traditions, each cycling through the year so that a specific name "presides" over each span of days.
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
        <div style={{ background:`linear-gradient(135deg,${M3.primaryContainer}44,${M3.surfaceDim})`, padding:"12px", borderRadius:10, border:`1px solid ${M3.primary}33`, textAlign:"center" }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:6 }}>72 NAMES OF GOD</div>
          <div style={{ fontSize:"1.8rem", direction:"rtl" }}>{cyc.name72?.heb}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface }}>Name #{cyc.name72?.n} of 72</div>
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.58rem", color:M3.onSurfaceVariant, marginTop:6, fontStyle:"italic", lineHeight:1.4 }}>
            From the Kabbalistic tradition: 72 three-letter combinations derived from Exodus 14:19-21. Each is treated as a vibrational quality of the divine that governs a ~5-day period.
          </div>
        </div>
        <div style={{ background:`linear-gradient(135deg,${M3.secondaryContainer}44,${M3.surfaceDim})`, padding:"12px", borderRadius:10, border:`1px solid ${M3.secondary}33`, textAlign:"center" }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:6 }}>99 NAMES OF ALLAH</div>
          <div style={{ fontFamily:"Cinzel,serif", fontSize:"0.82rem", color:M3.tertiary }}>{cyc.name99?.ar}</div>
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", color:M3.onSurface, marginTop:3 }}>"{cyc.name99?.en}"</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant }}>Name #{cyc.name99?.n} of 99</div>
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.58rem", color:M3.onSurfaceVariant, marginTop:6, fontStyle:"italic", lineHeight:1.4 }}>
            From Islamic tradition: the 99 "Beautiful Names" (Asma ul Husna) describe the qualities of the divine — mercy, justice, creativity, patience, etc. Each governs a ~3.7-day period.
          </div>
        </div>
        <div style={{ background:`linear-gradient(135deg,${M3.tertiaryContainer}44,${M3.surfaceDim})`, padding:"12px", borderRadius:10, border:`1px solid ${M3.tertiary}33`, textAlign:"center" }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:6 }}>32 PATHS OF WISDOM</div>
          <div style={{ fontSize:"1.4rem", direction:"rtl" }}>{cyc.path32?.heb}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.onSurface }}>{cyc.path32?.west}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.onSurfaceVariant }}>"{cyc.path32?.intel}" Intelligence</div>
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.58rem", color:M3.onSurfaceVariant, marginTop:6, fontStyle:"italic", lineHeight:1.4 }}>
            From the Qabbalah (Jewish mystical tradition): 32 paths connect the 10 spheres ("Sephiroth") on the Tree of Life. Each path has an "Intelligence" — a quality of consciousness. The path active today describes the type of wisdom available.
          </div>
        </div>
      </div>
    </Card>

    {/* Holidays */}
    <Card title="Holidays & Observances — Multi-Tradition Sacred Days">
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
        This database maps over 150 holidays from more than 15 traditions onto the calendar. Filter by tradition using the chips below, or view all.
      </p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:10 }}>
        {["all","sambraielic","norse","roman","christian","orthodox","kemetic","hindu","buddhist","vodou","shinto","eastern","greek","neopagan"].map(t=>(
          <button key={t} onClick={()=>setCalHolFilter(t)}
            style={{ padding:"3px 10px", borderRadius:14, border:`1px solid ${calHolFilter===t?M3.primary:M3.outlineVariant}`,
              background:calHolFilter===t?M3.primaryContainer:M3.surfaceVariant+"44", color:calHolFilter===t?M3.primary:M3.onSurfaceVariant,
              fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", cursor:"pointer", textTransform:"capitalize" }}>
            {t}
          </button>
        ))}
      </div>
      {(()=>{
        const filtered = calHolFilter==="all" ? cd.holidays : cd.holidays.filter(h=>h.tradition===calHolFilter);
        return filtered.length > 0 ? (
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {filtered.map((h,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 10px", borderRadius:8, background:M3.surfaceVariant+"44", border:`1px solid ${M3.outlineVariant}` }}>
                <span style={{ fontSize:"1.2rem" }}>{h.symbol}</span>
                <div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.78rem", color:M3.onSurface }}>{h.name}</div>
                  <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:M3.secondary, textTransform:"capitalize" }}>{h.tradition} tradition</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", color:M3.onSurfaceVariant, textAlign:"center", margin:0 }}>
            {calHolFilter==="all" ? "No recorded holidays or observances fall on this date." : `No ${calHolFilter} holidays on this date. Try another tradition or "all".`}
          </p>
        );
      })()}
    </Card>

    {/* Number Sequences */}
    <Card title="Number Sequences — Mathematical Properties of Today's Number">
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurfaceVariant, margin:"0 0 6px" }}>
        Every number has mathematical properties. Day {cd.dayOfYear} is tested against sequences that have been considered significant since antiquity:
      </p>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.55, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
        <strong>Prime</strong> = divisible only by 1 and itself (considered "pure").
        <strong> Fibonacci</strong> = each number is the sum of the two before it (found in spirals, petals, galaxies).
        <strong> Lucas</strong> = like Fibonacci but starting from 2,1 (a companion spiral).
        <strong> Triangular</strong> = can be arranged in a triangle (1, 3, 6, 10... — called "YHVH numbers" in Hebrew tradition).
        <strong> Square</strong> = perfect squares (1, 4, 9, 16...).
        <strong> Pentagonal</strong> = can be arranged in a pentagon shape.
        Other sequences follow similar geometric logic for hexagons, cubes, pyramids, etc.
      </p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, justifyContent:"center" }}>
        {cd.numSequences.map(s=>(
          <div key={s.key} style={{ padding:"5px 10px", borderRadius:8, background:s.active ? M3.primaryContainer+"66" : M3.surfaceVariant+"33", border:`1px solid ${s.active ? M3.tertiary+"66" : M3.outlineVariant}`, opacity:s.active ? 1 : 0.5, textAlign:"center" }}>
            <div style={{ fontSize:"1rem" }}>{s.sym}</div>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.6rem", color:s.active ? M3.onSurface : M3.onSurfaceVariant }}>{s.name}</div>
          </div>
        ))}
      </div>
      {cd.activeSeqs.length > 0 ? (
        <div style={{ marginTop:10, padding:"8px 12px", borderRadius:8, background:M3.primaryContainer+"22", border:`1px solid ${M3.primary}22` }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.68rem", color:M3.tertiary, marginBottom:4 }}>ACTIVE TODAY (day {cd.dayOfYear} is a member of these sequences):</div>
          {cd.activeSeqs.map(s=>(
            <div key={s.key} style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.onSurface, padding:"2px 0" }}>
              {s.sym} <strong>{s.name}</strong>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", color:M3.onSurfaceVariant, textAlign:"center", marginTop:10 }}>
          Day {cd.dayOfYear} does not belong to any of the tracked sequences — it sits in the "ordinary number" space between them.
        </p>
      )}
    </Card>

    {/* Day Symbolism */}
    <Card title="Day Symbolism — What Does This Day-of-Month Mean?">
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
        Each day-of-month number (1st through 32nd) carries a universal symbolic meaning tied to the Tarot's Major Arcana. This isn't fortune-telling — it's a meditative theme, like a "word of the day" drawn from centuries of symbolic tradition. The Hebrew letters shown are the pair from the Sefer Yetzirah (Book of Formation) associated with this day number.
      </p>
      {cd.dayMeaning ? (
        <div style={{ textAlign:"center", padding:"10px 0" }}>
          <div style={{ fontFamily:"Cinzel,serif", fontSize:"1.2rem", color:M3.tertiary, marginBottom:6 }}>
            {cd.dayMeaning.tarot}
          </div>
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.88rem", color:M3.onSurface, lineHeight:1.6 }}>
            {cd.dayMeaning.meaning}
          </div>
          {cd.dayMeaning.sym && (
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"1.1rem", color:M3.primary, marginTop:8, direction:"rtl" }}>
              {cd.dayMeaning.sym}
            </div>
          )}
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.onSurfaceVariant, marginTop:8 }}>
            Day {cd.dayOfMonth} of {cd.monthName} (Month {cd.month})
          </div>
        </div>
      ) : (
        <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", color:M3.onSurfaceVariant, textAlign:"center", margin:0 }}>
          Day {cd.dayOfMonth} falls beyond the standard 32-day symbolism range.
        </p>
      )}
    </Card>

    {/* Cross-Cultural Zodiac Systems */}
    <Card title="Cross-Cultural Zodiacs — Three Traditions, One Day">
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
        Beyond the familiar Western zodiac, the calendar overlays two additional ancient systems onto the year. Each maps a different set of animal archetypes to the solar cycle, giving you three "animal identities" for any given day. These are <em>solar</em> assignments (based on the day of the year), distinct from the Chinese <em>yearly</em> animal you may already know.
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
        {/* Ogham / Celtic */}
        <div style={{ background:M3.primaryContainer+"33", padding:"12px", borderRadius:10, border:`1px solid ${M3.primary}33`, textAlign:"center" }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:6 }}>OGHAM / CELTIC TREE</div>
          <div style={{ fontFamily:"Cinzel,serif", fontSize:"1.1rem", color:M3.tertiary }}>{cd.ogham?.ogham}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", color:M3.onSurface, marginTop:4 }}>{cd.ogham?.tree}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.onSurfaceVariant, marginTop:2 }}>
            Animal: {cd.ogham?.animal} · Colour: {cd.ogham?.colour}
          </div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, marginTop:2 }}>
            Crystal: {cd.ogham?.crystal}
          </div>
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.58rem", color:M3.onSurfaceVariant, marginTop:6, fontStyle:"italic", lineHeight:1.4 }}>
            The Ogham is an ancient Celtic alphabet where each letter corresponds to a tree. The 13 trees divide the year into ~28-day "lunar months," each with an associated animal guide, colour, and crystal. The {cd.ogham?.tree} tree's energy governs this period.
          </div>
        </div>
        {/* Indigenous American */}
        <div style={{ background:M3.secondaryContainer+"33", padding:"12px", borderRadius:10, border:`1px solid ${M3.secondary}33`, textAlign:"center" }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:6 }}>INDIGENOUS AMERICAN</div>
          <div style={{ fontSize:"1.4rem" }}>{cd.indigenous?.animal==="Goose"?"🪿":cd.indigenous?.animal==="Otter"?"🦦":cd.indigenous?.animal==="Wolf"?"🐺":cd.indigenous?.animal==="Falcon"?"🦅":cd.indigenous?.animal==="Beaver"?"🦫":cd.indigenous?.animal==="Deer"?"🦌":cd.indigenous?.animal==="Woodpecker"?"🪶":cd.indigenous?.animal==="Salmon"?"🐟":cd.indigenous?.animal==="Bear"?"🐻":cd.indigenous?.animal==="Raven"?"🐦‍⬛":cd.indigenous?.animal==="Snake"?"🐍":"🦉"}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", color:M3.onSurface, marginTop:4 }}>{cd.indigenous?.animal}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.onSurfaceVariant, marginTop:2 }}>
            {cd.indigenous?.element} · {cd.indigenous?.clan} Clan · {cd.indigenous?.wind}
          </div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.62rem", color:M3.secondary, marginTop:2 }}>
            Plant: {cd.indigenous?.plant} · Stone: {cd.indigenous?.stone}
          </div>
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.58rem", color:M3.onSurfaceVariant, marginTop:6, fontStyle:"italic", lineHeight:1.4 }}>
            This system draws from pan-Indigenous North American traditions, mapping 12 animal totems across the year. Each animal carries an element, a clan affiliation (Turtle=stability, Butterfly=transformation, Frog=emotion, Thunderbird=power), a healing plant, a stone, and a cardinal wind direction.
          </div>
        </div>
        {/* Chinese Solar */}
        <div style={{ background:M3.tertiaryContainer+"33", padding:"12px", borderRadius:10, border:`1px solid ${M3.tertiary}33`, textAlign:"center" }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.58rem", color:M3.secondary, letterSpacing:"0.08em", marginBottom:6 }}>CHINESE SOLAR ZODIAC</div>
          <div style={{ fontSize:"1.4rem" }}>{cd.chineseSolar?.animal==="Rat"?"🐀":cd.chineseSolar?.animal==="Ox"?"🐂":cd.chineseSolar?.animal==="Tiger"?"🐅":cd.chineseSolar?.animal==="Rabbit"?"🐇":cd.chineseSolar?.animal==="Dragon"?"🐉":cd.chineseSolar?.animal==="Snake"?"🐍":cd.chineseSolar?.animal==="Horse"?"🐎":cd.chineseSolar?.animal==="Goat"?"🐐":cd.chineseSolar?.animal==="Monkey"?"🐒":cd.chineseSolar?.animal==="Rooster"?"🐓":cd.chineseSolar?.animal==="Dog"?"🐕":"🐖"}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", color:M3.onSurface, marginTop:4 }}>{cd.chineseSolar?.animal}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.66rem", color:M3.onSurfaceVariant, marginTop:2 }}>
            {cd.chineseSolar?.yin} {cd.chineseSolar?.wuxing}
          </div>
          <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.58rem", color:M3.onSurfaceVariant, marginTop:6, fontStyle:"italic", lineHeight:1.4 }}>
            The familiar 12 Chinese zodiac animals are usually assigned by birth year. Here they are mapped to ~30-day <em>solar</em> periods within the year. This gives a day-level animal energy distinct from your birth-year animal. Today carries the energy of the {cd.chineseSolar?.animal} ({cd.chineseSolar?.yin} {cd.chineseSolar?.wuxing}).
          </div>
        </div>
      </div>
    </Card>

    {/* Master Teacher Day */}
    {cd.masterTeacher && (
    <Card title="Day of the Master Teacher — 33-Day Sacred Cycle" style={{ background:`linear-gradient(135deg,${M3.tertiaryContainer}44,${M3.surfaceDim})`, borderColor:`${M3.tertiary}66` }}>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurfaceVariant, margin:"0 0 12px" }}>
        Every 11th day (11, 22, 33... up to 365) is a "Master Teacher" day — a moment when the 33-day cycle aligns with the 32 Paths of Wisdom from the Qabbalah (the Tree of Life's connecting pathways). The 33rd occurrence at day 365 is known as "El" — the day of the divine name that crowns the year. These days are considered especially potent for spiritual study and inner work.
      </p>
      <div style={{ textAlign:"center", padding:"10px 0" }}>
        <div style={{ fontFamily:"Cinzel,serif", fontSize:"1.3rem", color:M3.tertiary }}>
          {cd.masterTeacher.isEl ? "אל — El (The Divine Name)" : `Path ${cd.masterTeacher.pathNum}: ${cd.masterTeacher.pathName}`}
        </div>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", color:M3.onSurface, marginTop:4 }}>
          "{cd.masterTeacher.intel}" Intelligence
        </div>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.72rem", color:M3.secondary, marginTop:4 }}>
          Master Teacher Day #{cd.masterTeacher.cyclePos} of 33 · Hebrew: {cd.masterTeacher.heb}
        </div>
        <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", color:M3.onSurfaceVariant, marginTop:10, lineHeight:1.55 }}>
          {cd.masterTeacher.isEl
            ? "The final day of the year stands as El — a day of pure divine presence. All 32 paths have been walked; the 33rd step is unity itself."
            : `Today the Tree of Life's "${cd.masterTeacher.pathName}" pathway is highlighted. Its "${cd.masterTeacher.intel}" Intelligence describes the quality of awareness available today — meditate on what this means in your life.`
          }
        </div>
      </div>
    </Card>
    )}

    {/* Reflective Festival */}
    {cd.reflective && (
    <Card title={`${cd.reflective.name} — Reflective Festival`} style={{ background:`linear-gradient(135deg,${M3.primaryContainer}44,${M3.surfaceDim})`, borderColor:`${M3.primary}66` }}>
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.78rem", lineHeight:1.65, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
        Each month ends with a "Reflective Festival" whose length matches the month number: Month 1 gets 1 day of reflection (Monalia), Month 2 gets 2 days (Duallia), all the way to Month 12 which gets 12 days (Dodekalia). These final days of each month are devoted to looking back on the month's themes and integrating their lessons before the next cycle begins.
      </p>
      <div style={{ textAlign:"center", padding:"8px 0" }}>
        <div style={{ fontFamily:"Cinzel,serif", fontSize:"1.2rem", color:M3.primary }}>{cd.reflective.name}</div>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.82rem", color:M3.onSurface, marginTop:4 }}>
          Day {cd.reflective.festDay} of {cd.reflective.days} — Month {cd.reflective.month}
        </div>
        <div style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.76rem", color:M3.onSurfaceVariant, marginTop:8, lineHeight:1.55 }}>
          {cd.reflective.desc}
        </div>
      </div>
    </Card>
    )}

    {/* Summary of All Layers */}
    <Card title="All Layers at a Glance — Quick Reference">
      <p style={{ fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.72rem", lineHeight:1.5, color:M3.onSurfaceVariant, margin:"0 0 10px" }}>
        A compact summary of every active layer for this date.
      </p>
      <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:"0.7rem", color:M3.onSurface, lineHeight:2 }}>
        <div>📅 <strong>{cd.monthName} {cd.dayOfMonth}</strong> ({cd.monthNameFull}) — Day {cd.dayOfYear}/{cd.maxDay}</div>
        <div>{cd.zodiacPrimary?.sym} <strong>{cd.zodiacPrimary?.sign}</strong>{cd.isCusp ? ` ↔ ${cd.zodiacSecondary?.sign||""} (cusp)` : ""} — Week {cd.weekNumber}</div>
        <div>☰ I Ching #{cyc.iChing?.n} {cyc.iChing?.ch} "{cyc.iChing?.en}" — Tetragram #{cyc.tetragram?.n} {cyc.tetragram?.ch} "{cyc.tetragram?.en}"</div>
        <div style={{direction:"rtl",textAlign:"left"}}>עב Hebrew 22: {cyc.hebrew22?.l1}→{cyc.hebrew22?.l2} ({cyc.hebrew22?.t1}) · 27: {cyc.hebrew27?.l}{cyc.hebrew27?.l2} · 28: {cyc.hebrew28?.l}</div>
        <div>ΑΩ Greek: {cyc.greek24?.g} — Rune: {cyc.runic?.rune} {cyc.runic?.name} (shadow: {cyc.runic?.shadow})</div>
        <div>🃏 Arcana: {cyc.arcana} — Gematrial: {gDayHebVal} = {cd.dayOfYear} → {gDayReduced}</div>
        <div>שם 72 Names: #{cyc.name72?.n} {cyc.name72?.heb} — 99 Names: #{cyc.name99?.n} {cyc.name99?.ar} "{cyc.name99?.en}"</div>
        <div>🌳 Path #{cyc.path32?.n}: {cyc.path32?.west} — "{cyc.path32?.intel}" Intelligence</div>
        <div>🌿 Ogham: {cd.ogham?.ogham} ({cd.ogham?.tree}) · Animal: {cd.ogham?.animal} · Crystal: {cd.ogham?.crystal}</div>
        <div>🪶 Indigenous: {cd.indigenous?.animal} ({cd.indigenous?.element}, {cd.indigenous?.clan} Clan) · {cd.indigenous?.wind}</div>
        <div>🐉 Chinese Solar: {cd.chineseSolar?.animal} ({cd.chineseSolar?.yin} {cd.chineseSolar?.wuxing})</div>
        {cd.masterTeacher && <div>✡ Master Teacher #{cd.masterTeacher.cyclePos}: {cd.masterTeacher.pathName} — "{cd.masterTeacher.intel}"</div>}
        {cd.reflective && <div>🪞 Reflective Festival: {cd.reflective.name} day {cd.reflective.festDay}/{cd.reflective.days}</div>}
        <div>📆 {cd.weekday} · Hebrew: {cd.hebrewMonth?.en} · Egyptian: {cd.egyptianMonth?.name}</div>
        {cd.activeSeqs.length>0 && <div>🔢 Sequences: {cd.activeSeqs.map(s=>s.name).join(", ")}</div>}
        {activeSubKeys.length>0 && <div>⬡ Geometry: {activeSubKeys.map(([,v])=>`${v.sym} ${v.name}`).join(" · ")}</div>}
        {cd.holidays.length>0 && <div>🎉 Holidays: {cd.holidays.map(h=>`${h.name} (${h.tradition})`).join(", ")}</div>}
      </div>
    </Card>
  </div>
  );
}
