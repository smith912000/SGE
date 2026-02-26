import { SIGNS, SIGN_INFO } from '../data/astrology/signs.js';
import { HOUSE_INFO } from '../data/astrology/houses.js';
import { ASPECT_MEANINGS } from '../data/astrology/aspects.js';
import { norm } from '../utils/helpers.js';
import { calcAspects } from './astronomy.js';

const zodSign = lon => SIGNS[Math.floor(((lon % 360 + 360) % 360)/30)];

function generateProfile(trop, houses) {
  const sunSign  = zodSign(trop.Sun);
  const moonSign = zodSign(trop.Moon);
  const ascSign  = zodSign(houses.ASC);
  const mcSign   = zodSign(houses.MC);
  const venSign  = zodSign(trop.Venus);
  const marSign  = zodSign(trop.Mars);
  const satSign  = zodSign(trop.Saturn);
  const jupSign  = zodSign(trop.Jupiter);

  const getHouse = lon => {
    const asc = houses.ASC;
    for (let i=1; i<=12; i++) {
      const cuspStart = norm(asc + (i-1)*30);
      const cuspEnd   = norm(asc + i*30);
      const l         = norm(lon);
      if (cuspStart < cuspEnd ? (l>=cuspStart && l<cuspEnd) : (l>=cuspStart || l<cuspEnd)) return i;
    }
    return 1;
  };

  const sunHouse  = getHouse(trop.Sun);
  const moonHouse = getHouse(trop.Moon);
  const aspects   = calcAspects(trop);
  const sunMoon   = aspects.find(a=>(a.p1==="Sun"&&a.p2==="Moon")||(a.p1==="Moon"&&a.p2==="Sun"));
  const venMars   = aspects.find(a=>(a.p1==="Venus"&&a.p2==="Mars")||(a.p1==="Mars"&&a.p2==="Venus"));

  const SI = SIGN_INFO;

  const sections = [
    {
      icon:"☀️", title:"Core Identity — Sun in "+sunSign,
      text: `At your core, you are ${SI[sunSign].plain} Your Sun lives in the ${sunHouse}${['st','nd','rd'][sunHouse-1]||'th'} house, which means this core self-expression plays out especially in the realm of ${HOUSE_INFO[sunHouse-1]?.name.split("—")[1]?.trim().toLowerCase() || "life"}.`,
    },
    {
      icon:"🌙", title:"Inner World — Moon in "+moonSign,
      text: `Emotionally, you operate through ${moonSign} energy. ${SI[moonSign].plain} Your Moon is in the ${moonHouse}${['st','nd','rd'][moonHouse-1]||'th'} house — the arena of ${HOUSE_INFO[moonHouse-1]?.name.split("—")[1]?.trim().toLowerCase()||"experience"} is where your deepest feelings surface and where you seek nourishment.`,
    },
    {
      icon:"🌅", title:"How Others See You — "+ascSign+" Rising",
      text: `When people meet you, they encounter ${ascSign} energy first. ${SI[ascSign].plain} This is your social mask and your body's energy. Your true depth often only emerges once people know you better.`,
    },
    {
      icon:"💖", title:"Love & Desire — Venus in "+venSign+", Mars in "+marSign,
      text: `In love, you are drawn to ${venSign} qualities — ${SI[venSign].plain.split(".")[0].toLowerCase()}. In pursuit and desire, you act with ${marSign} energy: ${SI[marSign].plain.split(".")[0].toLowerCase()}.${venMars ? ` Your Venus and Mars form a ${venMars.name} to each other — ${venMars.name==="Conjunction"?"your romantic and sexual natures are fused into one powerful force":venMars.name==="Opposition"?"you feel a push-pull between what you love and how you pursue it":venMars.name==="Trine"?"your love nature and desire nature flow together with natural ease":venMars.name==="Square"?"there's creative tension between tenderness and passion that drives you to grow":" creating a dynamic interplay between your heart and your drive"}.` : ""}`,
    },
    {
      icon:"🏔️", title:"Life Purpose & Career — MC in "+mcSign,
      text: `The world is most likely to know you for ${mcSign} qualities. ${SI[mcSign].plain} This is the energy you are building toward publicly, the archetype your career and reputation tends to embody.`,
    },
    {
      icon:"⏳", title:"Your Greatest Teacher — Saturn in "+satSign,
      text: `Saturn in ${satSign} is where life presents your hardest lessons. ${SI[satSign].plain} This area asks for discipline and patience. The reward — once you've done the work — is becoming genuinely masterful in ways that ${satSign.toLowerCase()} energy can uniquely achieve.`,
    },
    {
      icon:"🌟", title:"Where Luck Flows — Jupiter in "+jupSign,
      text: `Jupiter in ${jupSign} shows where life tends to be generous and expansive for you. ${SI[jupSign].plain} Following this energy tends to attract growth, abundance, and opportunity almost effortlessly.`,
    },
  ];

  if (sunMoon) {
    sections.push({
      icon:"✨", title:`Identity & Emotions — Sun ${sunMoon.sym} Moon (${sunMoon.name})`,
      text:`Your conscious identity (Sun) and your emotional instincts (Moon) are in a ${sunMoon.name.toLowerCase()} to each other. ${ASPECT_MEANINGS[sunMoon.name]} This shapes how harmoniously — or how dynamically — your outer and inner worlds relate.`,
    });
  }

  return sections;
}

export { generateProfile };
