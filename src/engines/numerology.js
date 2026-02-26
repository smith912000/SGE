import { PYTHAGOREAN, CHALDEAN, VOWELS_SET } from '../data/numerology/tables.js';

function reduceToRoot(n) {
  let v = n;
  while (v > 9 && v !== 11 && v !== 22 && v !== 33) v = String(v).split("").reduce((s,d)=>s+Number(d),0);
  return v;
}

/* Number sequence definitions (from calendar engine) — inlined to avoid circular dependency */
const _primeSet = new Set(); { for(let i=2;i<=366;i++){let p=true;for(let j=2;j<=Math.sqrt(i);j++)if(i%j===0){p=false;break;}if(p)_primeSet.add(i);} }
const _fibSet = new Set(); { let a=1,b=1;while(a<=366){_fibSet.add(a);[a,b]=[b,a+b];} }
const _lucSet = new Set(); { let a=2,b=1;_lucSet.add(1);while(a<=366){_lucSet.add(a);[a,b]=[a+b,a];} }
const _triSet = new Set(); { for(let n=1;n*(n+1)/2<=366;n++) _triSet.add(n*(n+1)/2); _triSet.add(1); }
const _sqSet = new Set(); { for(let n=1;n*n<=366;n++) _sqSet.add(n*n); }
const _pentSet = new Set(); { for(let n=1;;n++){const v=n*(3*n-1)/2;if(v>366)break;_pentSet.add(v);} _pentSet.add(1); }
const _cenTriSet = new Set([1,4,10,19,31,46,64,85,109,136,166,199,235,274,316,361]);
const _cenSqPentSet = new Set([1,5,13,25,41,61,85,113,145,181,221,265,313,365]);
const _rectSet = new Set([1,2,6,12,20,30,42,56,72,90,110,132,156,182,210,240,272,306,342]);
const _tetraSet = new Set([1,4,10,20,35,56,84,120,165,220,286,364]);
const _octaSet = new Set([1,6,19,44,85,146,231,344]);
const _cubicSet = new Set([1,8,27,64,125,216,343]);
const _cenCubeSet = new Set([1,9,35,91,189,341]);
const _sqPyrSet = new Set([1,5,14,30,55,91,140,204,285]);

const NUM_SEQ_DEFS = [
  { key:"prime",   sym:"⦾", name:"Prime",              set:_primeSet },
  { key:"fib",     sym:"𝛷", name:"Fibonacci",          set:_fibSet },
  { key:"lucas",   sym:"𝝀", name:"Lucas",              set:_lucSet },
  { key:"tri",     sym:"⧌", name:"Triangular (יהוה)",  set:_triSet },
  { key:"sq",      sym:"⧅", name:"Square",             set:_sqSet },
  { key:"pent",    sym:"⬠", name:"Pentagonal",         set:_pentSet },
  { key:"cenTri",  sym:"◬", name:"Centered Triangular",set:_cenTriSet },
  { key:"cenSqP",  sym:"⍟", name:"Centered Sq/Pent",   set:_cenSqPentSet },
  { key:"rect",    sym:"⏥", name:"Rectangular",        set:_rectSet },
  { key:"tetra",   sym:"⟁", name:"Tetrahedral",        set:_tetraSet },
  { key:"octa",    sym:"⧈", name:"Octahedral",         set:_octaSet },
  { key:"cubic",   sym:"⧉", name:"Cubic",              set:_cubicSet },
  { key:"cenCube", sym:"⟐", name:"Centered Cube",      set:_cenCubeSet },
  { key:"sqPyr",   sym:"⧇", name:"Square Pyramidal",   set:_sqPyrSet },
];

function computeNumSequences(dayNum) {
  return NUM_SEQ_DEFS.map(d => ({ ...d, active: d.set.has(dayNum) }));
}

function computeNumerology(year, month, day, fullName) {
  const lifePath = reduceToRoot(reduceToRoot(month) + reduceToRoot(day) + reduceToRoot(year));

  const upper = (fullName||"").toUpperCase().replace(/[^A-Z]/g,"");
  let exprSum = 0, soulSum = 0, persSum = 0;
  let chaldExprSum = 0;
  const letterBreakdown = [];
  for (const ch of upper) {
    const pv = PYTHAGOREAN[ch]||0, cv = CHALDEAN[ch]||0;
    const isVowel = VOWELS_SET.has(ch);
    exprSum += pv;
    chaldExprSum += cv;
    if (isVowel) soulSum += pv; else persSum += pv;
    letterBreakdown.push({ ch, pythagorean:pv, chaldean:cv, isVowel });
  }
  const expression = reduceToRoot(exprSum);
  const chaldeanExpr = reduceToRoot(chaldExprSum);
  const soulUrge = reduceToRoot(soulSum);
  const personality = reduceToRoot(persSum);
  const birthday = reduceToRoot(day);

  const maturity = reduceToRoot(lifePath + expression);
  const challenge1 = Math.abs(reduceToRoot(month) - reduceToRoot(day));
  const challenge2 = Math.abs(reduceToRoot(day) - reduceToRoot(year));
  const challenge3 = Math.abs(challenge1 - challenge2);
  const challenge4 = Math.abs(reduceToRoot(month) - reduceToRoot(year));

  const pinnacle1 = reduceToRoot(month + day);
  const pinnacle2 = reduceToRoot(day + year);
  const pinnacle3 = reduceToRoot(pinnacle1 + pinnacle2);
  const pinnacle4 = reduceToRoot(month + year);

  const personalYear = reduceToRoot(month + day + reduceToRoot(new Date().getFullYear()));

  const karmicDebts = [];
  if (lifePath===13||lifePath===14||lifePath===16||lifePath===19) karmicDebts.push({num:lifePath, from:"Life Path"});
  if (exprSum%9===4 && [13,14,16,19].includes(exprSum%22||exprSum)) karmicDebts.push({num:exprSum, from:"Expression"});

  const missingNums = [];
  const presentNums = new Set(letterBreakdown.map(l=>l.pythagorean));
  for (let i=1;i<=9;i++) if (!presentNums.has(i)) missingNums.push(i);

  const daySeqs = computeNumSequences(
    Math.floor((new Date(year, month-1, day) - new Date(year,0,0)) / 86400000)
  );

  const pythagoreanGrid = {};
  for (let i=1;i<=9;i++) pythagoreanGrid[i] = { count:0, letters:[] };
  for (const lb of letterBreakdown) {
    if (lb.pythagorean >= 1 && lb.pythagorean <= 9) {
      pythagoreanGrid[lb.pythagorean].count++;
      pythagoreanGrid[lb.pythagorean].letters.push(lb.ch);
    }
  }
  const dateDigits = `${month}${day}${year}`.replace(/0/g,"").split("").map(Number);
  for (const d of dateDigits) if (d>=1 && d<=9) { pythagoreanGrid[d].count++; pythagoreanGrid[d].letters.push(`(${d})`); }

  return {
    lifePath, expression, chaldeanExpr, soulUrge, personality, birthday, maturity,
    personalYear, challenges:[challenge1,challenge2,challenge3,challenge4],
    pinnacles:[pinnacle1,pinnacle2,pinnacle3,pinnacle4],
    karmicDebts, missingNums, letterBreakdown, daySeqs, pythagoreanGrid,
    exprSum, soulSum, persSum, chaldExprSum
  };
}

export { reduceToRoot, computeNumerology };
