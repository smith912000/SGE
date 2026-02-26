import { HEBREW_CHAR_MAP, FINAL_FORMS, KNOWN_HEBREW } from '../data/grammatology/hebrewMap.js';

function transliterateToHebrew(text) {
  const upper = text.toUpperCase().replace(/[^A-Z ]/g,"");
  const words = upper.split(/\s+/).filter(Boolean);
  const result = [];

  const DIGRAPHS = [
    { pat:"SH", heb:"ש", name:"Shin",   val:300, note:"SH → Shin (ש)" },
    { pat:"CH", heb:"ח", name:"Chet",    val:8,   note:"CH → Chet (ח)" },
    { pat:"TH", heb:"ת", name:"Tav",     val:400, note:"TH → Tav (ת)" },
    { pat:"PH", heb:"פ", name:"Pe",      val:80,  note:"PH → Pe (פ)" },
    { pat:"TZ", heb:"צ", name:"Tsade",   val:90,  note:"TZ → Tsade (צ)" },
    { pat:"TS", heb:"צ", name:"Tsade",   val:90,  note:"TS → Tsade (צ)" },
    { pat:"KH", heb:"כ", name:"Kaph",    val:20,  note:"KH → Kaph (כ)" },
  ];

  const SINGLE = {
    A:{ heb:"א", name:"Aleph", val:1,   note:"A → Aleph (א) — glottal stop / silent carrier", isVowel:true },
    B:{ heb:"ב", name:"Bet",   val:2,   note:"B → Bet (ב)" },
    C:{ heb:"כ", name:"Kaph",  val:20,  note:"C → Kaph (כ) — hard C sound", altNote:"C before E/I could also be Samekh (ס)" },
    D:{ heb:"ד", name:"Dalet", val:4,   note:"D → Dalet (ד)" },
    E:{ heb:"ה", name:"He",    val:5,   note:"E → He (ה) — breath/aspiration", isVowel:true },
    F:{ heb:"פ", name:"Pe",    val:80,  note:"F → Pe (פ) — soft pronunciation" },
    G:{ heb:"ג", name:"Gimel", val:3,   note:"G → Gimel (ג)" },
    H:{ heb:"ה", name:"He",    val:5,   note:"H → He (ה)" },
    I:{ heb:"י", name:"Yod",   val:10,  note:"I → Yod (י) — smallest letter, creative spark", isVowel:true },
    J:{ heb:"י", name:"Yod",   val:10,  note:"J → Yod (י) — J evolved from I/Yod" },
    K:{ heb:"כ", name:"Kaph",  val:20,  note:"K → Kaph (כ)" },
    L:{ heb:"ל", name:"Lamed", val:30,  note:"L → Lamed (ל)" },
    M:{ heb:"מ", name:"Mem",   val:40,  note:"M → Mem (מ)" },
    N:{ heb:"נ", name:"Nun",   val:50,  note:"N → Nun (נ)" },
    O:{ heb:"ו", name:"Vav",   val:6,   note:"O → Vav (ו) — vowel marker for O/U sounds", isVowel:true, altHeb:"ע", altName:"Ayin", altVal:70, altNote:"O can also map to Ayin (ע) when representing the guttural sound" },
    P:{ heb:"פ", name:"Pe",    val:80,  note:"P → Pe (פ)" },
    Q:{ heb:"ק", name:"Qoph",  val:100, note:"Q → Qoph (ק)" },
    R:{ heb:"ר", name:"Resh",  val:200, note:"R → Resh (ר)" },
    S:{ heb:"ש", name:"Shin",  val:300, note:"S → Shin (ש) — the most common S-sound letter in Hebrew names", altHeb:"ס", altName:"Samekh", altVal:60, altNote:"S can also map to Samekh (ס) — a softer S used in loanwords" },
    T:{ heb:"ת", name:"Tav",   val:400, note:"T → Tav (ת)" },
    U:{ heb:"ו", name:"Vav",   val:6,   note:"U → Vav (ו) — the hook/connector", isVowel:true },
    V:{ heb:"ו", name:"Vav",   val:6,   note:"V → Vav (ו)" },
    W:{ heb:"ו", name:"Vav",   val:6,   note:"W → Vav (ו) — double-V, from Vav" },
    X:{ heb:"כס",name:"Kaph+Samekh", val:80, note:"X → Kaph (כ) + Samekh (ס) — /ks/ sound", multi:true, parts:[{heb:"כ",name:"Kaph",val:20},{heb:"ס",name:"Samekh",val:60}] },
    Y:{ heb:"י", name:"Yod",   val:10,  note:"Y → Yod (י)" },
    Z:{ heb:"ז", name:"Zayin", val:7,   note:"Z → Zayin (ז)" },
  };

  const notes = [];
  let hasAmbiguity = false;

  for (const word of words) {
    const wordLetters = [];
    let i = 0;
    while (i < word.length) {
      let matched = false;
      if (i < word.length - 1) {
        const di = word.slice(i, i+2);
        const dg = DIGRAPHS.find(d => d.pat === di);
        if (dg) {
          wordLetters.push({ chars:di, heb:dg.heb, name:dg.name, val:dg.val, note:dg.note, isDigraph:true });
          notes.push(dg.note);
          i += 2;
          matched = true;
        }
      }
      if (!matched) {
        const ch = word[i];
        const s = SINGLE[ch];
        if (s) {
          if (s.multi && s.parts) {
            s.parts.forEach(p => wordLetters.push({ chars:ch, heb:p.heb, name:p.name, val:p.val, note:s.note, isExpanded:true }));
            notes.push(s.note);
          } else {
            const isWordEnd = i === word.length - 1;
            const drop = s.isVowel && !isWordEnd && i > 0 && word.length > 2;
            if (s.altHeb) hasAmbiguity = true;
            if (!drop) {
              wordLetters.push({ chars:ch, heb:s.heb, name:s.name, val:s.val, note:s.note,
                alt:s.altHeb ? { heb:s.altHeb, name:s.altName, val:s.altVal, note:s.altNote } : null });
              if (s.altNote && s.altHeb) notes.push(s.altNote);
            } else {
              wordLetters.push({ chars:ch, heb:s.heb, name:s.name, val:s.val, note:s.note + " (medial vowel — often silent in Hebrew, included at reduced weight)",
                isVowelDrop:true,
                alt:s.altHeb ? { heb:s.altHeb, name:s.altName, val:s.altVal, note:s.altNote } : null });
            }
          }
          i++;
        } else {
          i++;
        }
      }
    }
    if (wordLetters.length > 0) result.push({ word, letters:wordLetters });
  }

  return { words:result, notes:[...new Set(notes)], hasAmbiguity };
}

function calcGematria(name) {
  const isHebrew = /[\u0590-\u05FF]/.test(name);
  if (isHebrew) {
    const letters = [];
    let total = 0;
    for (const ch of name) {
      const entry = HEBREW_CHAR_MAP[ch] || FINAL_FORMS[ch];
      if (entry) {
        letters.push({ chars:ch, heb:ch, name:entry.hebrewName, val:entry.gematria });
        total += entry.gematria;
      }
    }
    let reduced = total;
    while (reduced > 9 && reduced !== 11 && reduced !== 22 && reduced !== 33)
      reduced = String(reduced).split("").reduce((s,d)=>s+Number(d),0);
    const planetRes = [null,"Sun","Moon","Jupiter","Uranus","Mercury","Venus","Neptune","Saturn","Mars"][reduced<=9?reduced:0]||null;
    return { total, reduced, planetRes, letters, words:null, hebrewStr:name, notes:[], isHebrew:true };
  }

  const knownWords = name.toUpperCase().split(/\s+/).filter(Boolean);
  const knownParts = knownWords.map(w => KNOWN_HEBREW[w]);
  const hasKnown = knownParts.some(Boolean);
  let knownStr = null;
  let knownTotal = null;
  if (hasKnown) {
    knownStr = knownWords.map((w,i) => knownParts[i] || "?").join(" ");
    if (knownParts.every(Boolean)) {
      knownTotal = 0;
      for (const hWord of knownParts) {
        for (const ch of hWord) {
          const entry = HEBREW_CHAR_MAP[ch] || FINAL_FORMS[ch];
          if (entry) knownTotal += entry.gematria;
        }
      }
    }
  }

  const trans = transliterateToHebrew(name);
  const allLetters = [];
  let total = 0;
  let fullTotal = 0;
  let hebrewStr = "";
  let fullHebrewStr = "";
  for (const w of trans.words) {
    for (const l of w.letters) {
      allLetters.push(l);
      fullTotal += l.val;
      fullHebrewStr += l.heb;
      if (!l.isVowelDrop) {
        total += l.val;
        hebrewStr += l.heb;
      }
    }
    hebrewStr += " ";
    fullHebrewStr += " ";
  }
  hebrewStr = hebrewStr.trim();
  fullHebrewStr = fullHebrewStr.trim();

  let altTotal = 0;
  let altHebrewStr = "";
  let hasAlt = false;
  for (const w of trans.words) {
    for (const l of w.letters) {
      if (l.isVowelDrop) continue;
      if (l.alt) {
        hasAlt = true;
        altTotal += l.alt.val;
        altHebrewStr += l.alt.heb;
      } else {
        altTotal += l.val;
        altHebrewStr += l.heb;
      }
    }
    altHebrewStr += " ";
  }
  altHebrewStr = altHebrewStr.trim();

  let reduced = total;
  while (reduced > 9 && reduced !== 11 && reduced !== 22 && reduced !== 33)
    reduced = String(reduced).split("").reduce((s,d)=>s+Number(d),0);
  const planetRes = [null,"Sun","Moon","Jupiter","Uranus","Mercury","Venus","Neptune","Saturn","Mars"][reduced<=9?reduced:0]||null;

  let altReduced = altTotal;
  while (altReduced > 9 && altReduced !== 11 && altReduced !== 22 && altReduced !== 33)
    altReduced = String(altReduced).split("").reduce((s,d)=>s+Number(d),0);

  const primaryTotal = knownTotal !== null ? knownTotal : total;
  let primaryReduced = primaryTotal;
  while (primaryReduced > 9 && primaryReduced !== 11 && primaryReduced !== 22 && primaryReduced !== 33)
    primaryReduced = String(primaryReduced).split("").reduce((s,d)=>s+Number(d),0);
  const primaryPlanet = [null,"Sun","Moon","Jupiter","Uranus","Mercury","Venus","Neptune","Saturn","Mars"][primaryReduced<=9?primaryReduced:0]||null;

  return { total:primaryTotal, fullTotal, reduced:primaryReduced, planetRes:primaryPlanet, letters:allLetters, words:trans.words,
    hebrewStr:knownStr && knownTotal!==null ? knownStr : hebrewStr, fullHebrewStr, notes:trans.notes,
    hasKnown, knownStr, knownTotal,
    transTotal:total, transHebrewStr:hebrewStr,
    hasAlt, altTotal:hasAlt?altTotal:null, altReduced:hasAlt?altReduced:null, altHebrewStr:hasAlt?altHebrewStr:null, isHebrew:false };
}

export { transliterateToHebrew, calcGematria };
