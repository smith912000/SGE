import { STEMS, STEM_PINYIN, BRANCHES, BRANCH_PINYIN, ANIMALS, CN_EL, CN_MONTH_NAMES, CNY_DATES } from '../data/astrology/chinese.js';

function chineseLunarDate(y, m, d) {
  const eYear = y;
  const cny = CNY_DATES[eYear];
  if (!cny || m === undefined || d === undefined) return null;
  const birthDate = new Date(y, m - 1, d);
  const cnyDate = new Date(eYear, cny[0] - 1, cny[1]);
  let daysSinceCNY = Math.round((birthDate - cnyDate) / 86400000);
  if (daysSinceCNY < 0) {
    const prevCny = CNY_DATES[eYear - 1];
    if (prevCny) {
      const prevCnyDate = new Date(eYear - 1, prevCny[0] - 1, prevCny[1]);
      daysSinceCNY = Math.round((birthDate - prevCnyDate) / 86400000);
    } else return null;
  }
  const lunarMonth = Math.floor(daysSinceCNY / 29.5);
  const lunarDay = Math.round(daysSinceCNY - lunarMonth * 29.5) + 1;
  return { month: Math.min(lunarMonth, 11), day: lunarDay,
    monthName: CN_MONTH_NAMES[Math.min(lunarMonth, 11)] };
}
function chineseCycle(y, m, d) {
  let effectiveYear = y;
  if (m !== undefined && d !== undefined) {
    const cny = CNY_DATES[y];
    if (cny) {
      if (m < cny[0] || (m === cny[0] && d < cny[1])) effectiveYear = y - 1;
    } else {
      if (m === 1 || (m === 2 && d < 5)) effectiveYear = y - 1;
    }
  }
  const o = effectiveYear - 1924;
  const stemIdx = ((o%10)+10)%10;
  const branchIdx = ((o%12)+12)%12;
  const lunar = (m !== undefined && d !== undefined) ? chineseLunarDate(y, m, d) : null;
  return { stem:STEMS[stemIdx], branch:BRANCHES[branchIdx],
    stemPinyin:STEM_PINYIN[stemIdx], branchPinyin:BRANCH_PINYIN[branchIdx],
    animal:ANIMALS[branchIdx], element:CN_EL[((o%10)+10)%10],
    polarity:o%2===0?"Yang":"Yin", cycle60:((o%60)+60)%60, effectiveYear,
    lunar };
}

export { chineseLunarDate, chineseCycle };
