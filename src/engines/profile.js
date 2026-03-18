import { SIGNS, SIGN_INFO } from '../data/astrology/signs.js';
import { HOUSE_INFO } from '../data/astrology/houses.js';
import { ASPECT_MEANINGS } from '../data/astrology/aspects.js';
import { SOLAR_DEEP, LUNAR_DEEP } from '../data/deepAnalysis/solarLunar.js';
import { RISING_SHADOW, VENUS_SHADOW, MARS_SHADOW, MERCURY_SHADOW } from '../data/deepAnalysis/shadows.js';
import { JUPITER_DEEP, SATURN_DEEP } from '../data/deepAnalysis/outerPlanets.js';
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
      text: SOLAR_DEEP[sunSign] || `At your core, you are ${SI[sunSign].plain} Your Sun lives in the ${sunHouse}${['st','nd','rd'][sunHouse-1]||'th'} house.`,
    },
    {
      icon:"🌙", title:"Inner World — Moon in "+moonSign,
      text: LUNAR_DEEP[moonSign] || `Emotionally, you operate through ${moonSign} energy. ${SI[moonSign].plain}`,
    },
    {
      icon:"🌅", title:"How Others See You — "+ascSign+" Rising",
      text: `When people meet you, they encounter ${ascSign} energy first. ${SI[ascSign].plain} \n\nShadow: ${RISING_SHADOW[ascSign]?.shadow || ""}\nGrowth: ${RISING_SHADOW[ascSign]?.growth || ""}`,
    },
    {
      icon:"🧠", title:"Mind & Communication — Mercury in "+zodSign(trop.Mercury),
      text: `Your mind operates with ${zodSign(trop.Mercury)} energy. \n\n${MERCURY_SHADOW[zodSign(trop.Mercury)] ? `Trap: ${MERCURY_SHADOW[zodSign(trop.Mercury)].shadow}\nGrowth: ${MERCURY_SHADOW[zodSign(trop.Mercury)].growth}` : ""}`,
    },
    {
      icon:"💖", title:"Love & Desire — Venus in "+venSign+", Mars in "+marSign,
      text: `In love, you are drawn to ${venSign} qualities. ${VENUS_SHADOW[venSign] ? `\nVenus Shadow: ${VENUS_SHADOW[venSign].shadow}` : ""} \n\nIn pursuit and desire, you act with ${marSign} energy. ${MARS_SHADOW[marSign] ? `\nMars Shadow: ${MARS_SHADOW[marSign].shadow}` : ""} \n\n${venMars ? `Your Venus and Mars form a ${venMars.name}.` : ""}`,
    },
    {
      icon:"🏔️", title:"Life Purpose & Career — MC in "+mcSign,
      text: `The world is most likely to know you for ${mcSign} qualities. ${SI[mcSign].plain} This is the energy you are building toward publicly, the archetype your career and reputation tends to embody.`,
    },
    {
      icon:"⏳", title:"Your Greatest Teacher — Saturn in "+satSign,
      text: SATURN_DEEP[satSign] || `Saturn in ${satSign} is where life presents your hardest lessons.`,
    },
    {
      icon:"🌟", title:"Where Luck Flows — Jupiter in "+jupSign,
      text: JUPITER_DEEP[jupSign] || `Jupiter in ${jupSign} shows where life tends to be generous and expansive for you.`,
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
