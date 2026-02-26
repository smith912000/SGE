import { useState, useRef, useEffect, useCallback } from 'react';
import { useAnime } from '../../hooks/useAnime.js';
import { M3 } from '../../theme/m3.js';
import { norm } from '../../utils/helpers.js';
import { ANIMALS, CN_EL_INFO, ANIMAL_TRIGRAM, BRANCHES, ANIMAL_INFO } from '../../data/astrology/chinese.js';
import Tooltip from '../ui/Tooltip.jsx';

export default function ChineseWheel({ cn, size = 460, onTooltip }) {
  const S = size, cx = S/2, cy = S/2, R = S * 0.46;
  const ANIMAL_SYMS = ["🐀","🐂","🐅","🐇","🐉","🐍","🐎","🐐","🐒","🐓","🐕","🐖"];
  const ANIMAL_NAMES = ANIMALS;
  const ANIMAL_HOURS = ["11pm–1am","1–3am","3–5am","5–7am","7–9am","9–11am","11am–1pm","1–3pm","3–5pm","5–7pm","7–9pm","9–11pm"];
  const ANIMAL_SEASON = ["Winter","Winter","Spring","Spring","Spring","Summer","Summer","Summer","Autumn","Autumn","Autumn","Winter"];
  const ANIMAL_DIRECTION = ["North","NNE","ENE","East","ESE","SSE","South","SSW","WSW","West","WNW","NNW"];
  const ANIMAL_EL = ["Water","Earth","Wood","Wood","Earth","Fire","Fire","Earth","Metal","Metal","Earth","Water"];
  const activeIdx = ANIMAL_NAMES.indexOf(cn.animal);
  const activeTrigramIdx = activeIdx >= 0 ? ANIMAL_TRIGRAM[activeIdx] : -1;
  const pt = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const DEG = Math.PI / 180;

  const showTip = (e, info) => { if (onTooltip) onTooltip({ info, x:e.clientX, y:e.clientY, visible:true }); };
  const hideTip = () => { if (onTooltip) onTooltip({ visible:false }); };

  const rOuter     = R;
  const rAnimalIn  = R * 0.76;
  const rElRingOut = R * 0.76;
  const rElRingIn  = R * 0.65;
  const rTriOuter  = R * 0.65;
  const rTriInner  = R * 0.42;
  const rYY        = R * 0.24;

  const TRIGRAMS = [
    { name:"☰", label:"Qián",  hanzi:"乾", lines:[1,1,1], meaning:"Heaven / Creative Force", nature:"Pure yang — the origin of all things, unceasing creative power. Qián is the initiator, the father principle, the force that begins all action.", assoc:"Father, sky, strength, the head, NW direction", animals:"Dog, Pig" },
    { name:"☱", label:"Duì",   hanzi:"兌", lines:[1,1,0], meaning:"Lake / Joyfulness", nature:"Openness above, strength below — joy that comes from inner confidence. Duì represents speech, pleasure, and the youngest daughter's playful wisdom.", assoc:"Youngest daughter, mouth, autumn, the west", animals:"Rooster" },
    { name:"☲", label:"Lí",    hanzi:"離", lines:[1,0,1], meaning:"Fire / Clarity", nature:"Brightness clinging to what it illuminates — awareness that depends on what it perceives. Lí is intelligence, beauty, and the flame of consciousness.", assoc:"Middle daughter, eyes, summer, the south", animals:"Horse" },
    { name:"☳", label:"Zhèn",  hanzi:"震", lines:[1,0,0], meaning:"Thunder / Arousing", nature:"Sudden movement from stillness — the shock that initiates change. Zhèn is the eldest son's decisive first step, the crack of new beginnings.", assoc:"Eldest son, feet, spring, the east", animals:"Rabbit" },
    { name:"☴", label:"Xùn",   hanzi:"巽", lines:[0,1,1], meaning:"Wind / Gentle Penetrating", nature:"Gentle persistence that enters everywhere — influence through subtlety rather than force. Xùn is the eldest daughter's patient wisdom.", assoc:"Eldest daughter, thighs, early summer, the SE", animals:"Dragon, Snake" },
    { name:"☵", label:"Kǎn",   hanzi:"坎", lines:[0,1,0], meaning:"Water / The Abyss", nature:"Danger and depth — yang truth hidden within yin darkness. Kǎn is the middle son's courage to enter the unknown and find meaning in the deep.", assoc:"Middle son, ears, winter, the north", animals:"Rat" },
    { name:"☶", label:"Gèn",   hanzi:"艮", lines:[0,0,1], meaning:"Mountain / Stillness", nature:"Keeping still — knowing when to stop is the beginning of wisdom. Gèn is the youngest son's gift of meditation and grounded presence.", assoc:"Youngest son, hands, early spring, the NE", animals:"Ox, Tiger" },
    { name:"☷", label:"Kūn",   hanzi:"坤", lines:[0,0,0], meaning:"Earth / Receptive", nature:"Pure yin — the power that receives, nurtures, and brings all things to completion. Kūn is the mother principle, the ground from which everything grows.", assoc:"Mother, belly, late summer, the SW", animals:"Goat, Monkey" },
  ];

  const CN_EL_LIST = ["Wood","Fire","Earth","Metal","Water"];
  const CN_EL_COL_MAP = { Wood:"#8bc34a", Fire:"#ff5252", Earth:"#c9a840", Metal:"#64b5f6", Water:"#5c6bc0" };

  const gold  = "#c9a840";
  const red   = "#c0392b";
  const cream = "#f5e6c8";
  const dark  = "#1a1206";

  const drawTrigramLines = (triIdx, rO, rI, aMid, isActive) => {
    const tri = TRIGRAMS[triIdx];
    const lineW = R * 0.020;
    const gap = R * 0.010;
    const totalH = 3 * lineW + 2 * gap;
    const rMid = (rO + rI) / 2;
    const stroke = isActive ? gold : cream;
    const opacity = isActive ? 1 : 0.5;
    const elems = [];
    for (let row = 0; row < 3; row++) {
      const rLine = rMid + totalH/2 - lineW/2 - row * (lineW + gap);
      const halfArc = 0.11;
      const a1 = aMid - halfArc;
      const a2 = aMid + halfArc;
      if (tri.lines[row] === 1) {
        const [x1,y1] = pt(rLine, a1);
        const [x2,y2] = pt(rLine, a2);
        elems.push(<line key={`${triIdx}-${row}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={lineW*0.5} strokeLinecap="round" opacity={opacity}/>);
      } else {
        const aGap = 0.025;
        const [x1,y1] = pt(rLine, a1);
        const [x2,y2] = pt(rLine, aMid - aGap);
        const [x3,y3] = pt(rLine, aMid + aGap);
        const [x4,y4] = pt(rLine, a2);
        elems.push(<line key={`${triIdx}-${row}a`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={lineW*0.5} strokeLinecap="round" opacity={opacity}/>);
        elems.push(<line key={`${triIdx}-${row}b`} x1={x3} y1={y3} x2={x4} y2={y4} stroke={stroke} strokeWidth={lineW*0.5} strokeLinecap="round" opacity={opacity}/>);
      }
    }
    return elems;
  };

  const yyR = rYY;
  const yinYangPath = `M ${cx} ${cy - yyR} A ${yyR} ${yyR} 0 0 1 ${cx} ${cy + yyR} A ${yyR/2} ${yyR/2} 0 0 0 ${cx} ${cy} A ${yyR/2} ${yyR/2} 0 0 1 ${cx} ${cy - yyR} Z`;
  const yinPath = `M ${cx} ${cy + yyR} A ${yyR} ${yyR} 0 0 1 ${cx} ${cy - yyR} A ${yyR/2} ${yyR/2} 0 0 0 ${cx} ${cy} A ${yyR/2} ${yyR/2} 0 0 1 ${cx} ${cy + yyR} Z`;

  return (
    <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ display:"block", maxWidth:"100%", filter:"drop-shadow(0 0 22px rgba(200,160,60,0.22))", overflow:"visible" }}>
      <defs>
        <radialGradient id="cnbg2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1c1408"/>
          <stop offset="100%" stopColor="#0a0804"/>
        </radialGradient>
        <style>{`
          @keyframes cnSpinCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
          @keyframes cnSpinCW  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </defs>

      <circle cx={cx} cy={cy} r={rOuter+2} fill="url(#cnbg2)" stroke={gold} strokeWidth="2.5"/>
      <circle cx={cx} cy={cy} r={rAnimalIn} fill="none" stroke={gold+"55"} strokeWidth="1.2"/>
      <circle cx={cx} cy={cy} r={rElRingIn} fill="none" stroke={gold+"33"} strokeWidth="0.8"/>
      <circle cx={cx} cy={cy} r={rTriInner} fill="none" stroke={gold+"44"} strokeWidth="1"/>

      <g style={{ transformOrigin:`${cx}px ${cy}px`, animation:"cnSpinCCW 120s linear infinite" }}>
      {ANIMAL_NAMES.map((animal, i) => {
        const a0 = (i * 30 - 90) * DEG;
        const a1 = ((i+1) * 30 - 90) * DEG;
        const aMid = ((i * 30 + 15) - 90) * DEG;
        const isActive = i === activeIdx;
        const [ox0,oy0] = pt(rOuter, a0);
        const [ox1,oy1] = pt(rOuter, a1);
        const [ix1,iy1] = pt(rAnimalIn, a1);
        const [ix0,iy0] = pt(rAnimalIn, a0);
        const path = `M${ox0},${oy0} A${rOuter},${rOuter} 0 0,1 ${ox1},${oy1} L${ix1},${iy1} A${rAnimalIn},${rAnimalIn} 0 0,0 ${ix0},${iy0} Z`;
        const [emx,emy] = pt(rOuter * 0.93, aMid);
        const [tx,ty] = pt((rOuter + rAnimalIn) / 2 - R*0.02, aMid);
        const [bx,by] = pt(rAnimalIn + R*0.03, aMid);
        const ai = ANIMAL_INFO[animal]||{};
        const triName = TRIGRAMS[ANIMAL_TRIGRAM[i]]?.label || "";
        const tipInfo = {
          title:`${ai.emoji||ANIMAL_SYMS[i]} ${animal} — ${BRANCHES[i]}`,
          emoji:ai.emoji||ANIMAL_SYMS[i],
          plain:`${ai.archetype ? `"${ai.archetype}" — ` : ""}${ai.desc || ""}\n\nHours: ${ANIMAL_HOURS[i]}\nDirection: ${ANIMAL_DIRECTION[i]}\nSeason: ${ANIMAL_SEASON[i]}\nFixed Element: ${ANIMAL_EL[i]}\nTrigram: ${TRIGRAMS[ANIMAL_TRIGRAM[i]]?.name} ${triName} (${TRIGRAMS[ANIMAL_TRIGRAM[i]]?.meaning})`,
          tags:[ai.trait||"", ANIMAL_HOURS[i], ANIMAL_DIRECTION[i], ANIMAL_EL[i], `${TRIGRAMS[ANIMAL_TRIGRAM[i]]?.name} ${triName}`, isActive?"★ YOUR SIGN":""],
        };
        return (
          <g key={animal} style={{cursor:"pointer"}}
            onMouseMove={e=>showTip(e,tipInfo)} onMouseLeave={hideTip}>
            <path d={path} fill={isActive ? red+"28" : "transparent"} stroke={isActive ? gold : gold+"33"} strokeWidth={isActive ? 1.8 : 0.5}/>
            <line x1={pt(rAnimalIn,a0)[0]} y1={pt(rAnimalIn,a0)[1]} x2={pt(rOuter,a0)[0]} y2={pt(rOuter,a0)[1]} stroke={gold+"22"} strokeWidth="0.5"/>
            <g style={{ transformOrigin:`${emx}px ${emy}px`, animation:"cnSpinCW 120s linear infinite" }}>
              <text x={emx} y={emy} textAnchor="middle" dominantBaseline="middle" fontSize={R*0.07} style={{userSelect:"none"}}>{ANIMAL_SYMS[i]}</text>
            </g>
            <g style={{ transformOrigin:`${tx}px ${ty-R*0.01}px`, animation:"cnSpinCW 120s linear infinite" }}>
              <text x={tx} y={ty-R*0.01} textAnchor="middle" dominantBaseline="middle"
                fill={isActive ? cream : cream+"55"} fontSize={R*0.033} fontFamily="'Share Tech Mono',monospace"
                fontWeight={isActive?"700":"400"} style={{userSelect:"none"}}>{animal}</text>
            </g>
            <g style={{ transformOrigin:`${bx}px ${by}px`, animation:"cnSpinCW 120s linear infinite" }}>
              <text x={bx} y={by} textAnchor="middle" dominantBaseline="middle"
                fill={isActive ? gold : gold+"33"} fontSize={R*0.026} fontFamily="serif" style={{userSelect:"none"}}>{BRANCHES[i]}</text>
            </g>
          </g>
        );
      })}
      </g>

      <g style={{ transformOrigin:`${cx}px ${cy}px`, animation:"cnSpinCW 90s linear infinite" }}>
      {CN_EL_LIST.map((el, i) => {
        const baseAngle = i * 72;
        const span = 60;
        const a0 = (baseAngle - span/2 - 90) * DEG;
        const a1 = (baseAngle + span/2 - 90) * DEG;
        const aMid = (baseAngle - 90) * DEG;
        const [ox0,oy0] = pt(rElRingOut, a0);
        const [ox1,oy1] = pt(rElRingOut, a1);
        const [ix1,iy1] = pt(rElRingIn, a1);
        const [ix0,iy0] = pt(rElRingIn, a0);
        const elPath = `M${ox0},${oy0} A${rElRingOut},${rElRingOut} 0 0,1 ${ox1},${oy1} L${ix1},${iy1} A${rElRingIn},${rElRingIn} 0 0,0 ${ix0},${iy0} Z`;
        const [lx,ly] = pt((rElRingOut + rElRingIn)/2, aMid);
        const isActive = cn.element === el;
        const col = CN_EL_COL_MAP[el];
        const elInfo = CN_EL_INFO[el]||{};
        const tipInfo = {
          title:`${el} Element — 五行 (Wǔ Xíng)`,
          emoji: el==="Wood"?"🌿":el==="Fire"?"🔥":el==="Earth"?"⛰️":el==="Metal"?"⚔️":"💧",
          plain: elInfo.desc || "",
          tags:[elInfo.trait||"", isActive?"★ YOUR ELEMENT":"", `Creates: ${CN_EL_LIST[(i+1)%5]}`, `Controls: ${CN_EL_LIST[(i+2)%5]}`],
        };
        return (
          <g key={el} style={{cursor:"pointer"}}
            onMouseMove={e=>showTip(e,tipInfo)} onMouseLeave={hideTip}>
            <path d={elPath} fill={isActive ? col+"25" : col+"0a"} stroke={isActive ? col : col+"33"} strokeWidth={isActive ? 1.5 : 0.5}/>
            <g style={{ transformOrigin:`${lx}px ${ly}px`, animation:"cnSpinCCW 90s linear infinite" }}>
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                fill={isActive ? col : col+"77"} fontSize={R*0.034} fontFamily="'Share Tech Mono',monospace"
                fontWeight={isActive?"700":"400"} style={{userSelect:"none"}}>{el}</text>
            </g>
          </g>
        );
      })}
      </g>

      <g style={{ transformOrigin:`${cx}px ${cy}px`, animation:"cnSpinCCW 150s linear infinite" }}>
      {TRIGRAMS.map((tri, i) => {
        const aMid = (i * 45 + 22.5 - 90) * DEG;
        const isActive = i === activeTrigramIdx;
        const rLabelOuter = rTriOuter - R*0.02;
        const rLabelInner = rTriInner + R*0.03;
        const [hx,hy] = pt(rLabelOuter, aMid);
        const [lx,ly] = pt(rLabelInner, aMid);
        const tipInfo = {
          title:`${tri.name} ${tri.hanzi} ${tri.label} — ${tri.meaning}`,
          emoji:tri.name,
          plain:`${tri.nature}\n\nAssociated animals: ${tri.animals}\nAssociations: ${tri.assoc}${isActive ? "\n\n★ This is YOUR trigram based on your animal sign ("+cn.animal+")." : ""}`,
          tags:[tri.meaning.split("/")[0]?.trim(), tri.label, tri.hanzi, tri.animals, isActive?"★ YOUR TRIGRAM":""],
        };

        const a0 = (i * 45 - 90) * DEG;
        const a1 = ((i+1) * 45 - 90) * DEG;
        const [so0,sy0] = pt(rTriOuter, a0);
        const [so1,sy1] = pt(rTriOuter, a1);
        const [si1,siy1] = pt(rTriInner, a1);
        const [si0,siy0] = pt(rTriInner, a0);
        const segPath = `M${so0},${sy0} A${rTriOuter},${rTriOuter} 0 0,1 ${so1},${sy1} L${si1},${siy1} A${rTriInner},${rTriInner} 0 0,0 ${si0},${siy0} Z`;

        return (
          <g key={i} style={{cursor:"pointer"}}
            onMouseMove={e=>showTip(e,tipInfo)} onMouseLeave={hideTip}>
            <path d={segPath} fill={isActive ? gold+"18" : "transparent"} stroke={isActive ? gold+"55" : gold+"11"} strokeWidth={isActive ? 1.2 : 0.3}/>
            {drawTrigramLines(i, rTriOuter, rTriInner, aMid, isActive)}
            <g style={{ transformOrigin:`${hx}px ${hy}px`, animation:"cnSpinCW 150s linear infinite" }}>
              <text x={hx} y={hy} textAnchor="middle" dominantBaseline="middle"
                fill={isActive ? gold : cream+"44"} fontSize={R*0.032} fontFamily="serif"
                fontWeight={isActive?"700":"400"} style={{userSelect:"none"}}>
                {tri.hanzi}
              </text>
            </g>
            <g style={{ transformOrigin:`${lx}px ${ly}px`, animation:"cnSpinCW 150s linear infinite" }}>
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                fill={isActive ? gold+"cc" : cream+"33"} fontSize={R*0.024} fontFamily="'EB Garamond',Georgia,serif"
                fontStyle="italic" style={{userSelect:"none"}}>
                {tri.label}
              </text>
            </g>
          </g>
        );
      })}
      </g>

      <circle cx={cx} cy={cy} r={yyR + 2} fill={dark} stroke={gold+"66"} strokeWidth="1.5"/>

      <g style={{cursor:"pointer"}}
        onMouseMove={e=>showTip(e,{
          title:"☯ Tàijí — The Supreme Ultimate",
          emoji:"☯",
          plain:`The Taijitu represents the fundamental duality underlying all of existence. Yang (white) and Yin (black) are not opposites but complementary forces — each contains the seed of the other.\n\nYour year is ${cn.polarity}: ${cn.polarity==="Yang" ? "outward, assertive, initiating energy" : "inward, receptive, completing energy"}.\n\nYour trigram is ${TRIGRAMS[activeTrigramIdx]?.name} ${TRIGRAMS[activeTrigramIdx]?.hanzi} ${TRIGRAMS[activeTrigramIdx]?.label} — ${TRIGRAMS[activeTrigramIdx]?.meaning}.`,
          tags:[cn.polarity, cn.polarity==="Yang"?"Active":"Receptive", TRIGRAMS[activeTrigramIdx]?.label||"", "Duality"],
        })}
        onMouseLeave={hideTip}>
        <path d={yinYangPath} fill={cream}/>
        <path d={yinPath} fill={dark}/>
        <circle cx={cx} cy={cy - yyR/2} r={yyR * 0.12} fill={dark}/>
        <circle cx={cx} cy={cy + yyR/2} r={yyR * 0.12} fill={cream}/>
      </g>

      {activeIdx >= 0 && (
        <g>
          <text x={cx} y={cy + yyR + R*0.10} textAnchor="middle" dominantBaseline="middle"
            fill={gold} fontSize={R*0.058} fontFamily="'Share Tech Mono',monospace" fontWeight="700" style={{userSelect:"none"}}>
            {cn.stem}{cn.branch} · {cn.stemPinyin}-{cn.branchPinyin}
          </text>
          <text x={cx} y={cy + yyR + R*0.155} textAnchor="middle" dominantBaseline="middle"
            fill={cream+"aa"} fontSize={R*0.034} fontFamily="'EB Garamond',Georgia,serif" fontStyle="italic" style={{userSelect:"none"}}>
            {cn.element} {cn.animal} · {cn.polarity} · {TRIGRAMS[activeTrigramIdx]?.name} {TRIGRAMS[activeTrigramIdx]?.label}
          </text>
        </g>
      )}
    </svg>
  );
}
