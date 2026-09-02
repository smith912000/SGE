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
      icon:"☀️", title:"The Solar Placement — Sun in "+sunSign,
      text: `The Sun stands in ${sunSign}, in the ${sunHouse}${['st','nd','rd'][sunHouse-1]||'th'} house. ${SOLAR_DEEP[sunSign]?.shadow || SI[sunSign].plain} Hellenistic practice counts the Sun as one of the two lights and gives it the diurnal sect; modern practice reads the same placement as identity. The degree is the same in both readings; the register is not.`,
    },
    {
      icon:"🌙", title:"The Lunar Placement — Moon in "+moonSign,
      text: `The Moon stands in ${moonSign}, in the ${moonHouse}${['st','nd','rd'][moonHouse-1]||'th'} house. ${LUNAR_DEEP[moonSign]?.shadow || SI[moonSign].plain} The older sources read the Moon for the body, for nourishment and for the course of the month, and assign it the nocturnal sect; the modern recasting names it the affective register instead. The Moon moves about thirteen degrees a day, so this is the placement most sensitive to an imprecise recorded time.`,
    },
    {
      icon:"🌅", title:"The Rising Degree — "+ascSign+" Ascendant",
      text: `${ascSign} rises. The tradition names this degree the horoskopos, the hour marker, and in most schemes the twelve places are counted from it. ${SI[ascSign].plain} \n\nAttributed: ${RISING_SHADOW[ascSign]?.shadow || ""}\nStructure: ${RISING_SHADOW[ascSign]?.growth || ""}\n\nThis point is a function of the recorded time rather than of planetary position: roughly four minutes of clock error moves it about one degree. How firm is the recorded time behind this chart?`,
    },
    {
      icon:"🧠", title:"Mercury in "+zodSign(trop.Mercury),
      text: `Mercury stands in ${zodSign(trop.Mercury)}. Mercury never departs far from the Sun, so this placement falls in the solar sign or in one beside it. \n\n${MERCURY_SHADOW[zodSign(trop.Mercury)] ? `Attributed: ${MERCURY_SHADOW[zodSign(trop.Mercury)].shadow}\nStructure: ${MERCURY_SHADOW[zodSign(trop.Mercury)].growth}` : ""}`,
    },
    {
      icon:"💖", title:"Venus in "+venSign+", Mars in "+marSign,
      text: `Venus stands in ${venSign}. ${VENUS_SHADOW[venSign] ? `\nAttributed: ${VENUS_SHADOW[venSign].shadow}` : ""} \n\nMars stands in ${marSign}. ${MARS_SHADOW[marSign] ? `\nAttributed: ${MARS_SHADOW[marSign].shadow}` : ""} \n\n${venMars ? `Venus and Mars stand in a ${venMars.name.toLowerCase()}, at an orb of ${venMars.orb}°. The figure is counted because that separation falls inside the orb this instrument applies; a different orb policy counts a different set.` : "Venus and Mars form none of the aspects this instrument counts, within the orbs it applies."}`,
    },
    {
      icon:"🏔️", title:"The Midheaven — MC in "+mcSign,
      text: `The Midheaven falls in ${mcSign}. ${SI[mcSign].plain} Hellenistic sources name the culminating degree the Mesouranema and read the 10th place for praxis — what is done in the open — for rank, and for the judgement of others; modern practice keeps the subject matter and renames it vocation. Under whole-sign houses the Midheaven can fall in the 9th or the 11th rather than the 10th, and the two conventions then part company on the same chart.`,
    },
    {
      icon:"⏳", title:"Saturn in "+satSign,
      text: `Saturn stands in ${satSign}. ${SATURN_DEEP[satSign]?.shadow || ""} Saturn is the outermost of the seven visible bodies and completes its circuit in close to twenty-nine and a half years, so it holds one sign for something over two years. The Hellenistic sources class it as the greater malefic — a statement about the nature assigned to the body, not about an outcome; the modern register names the same ground limit, structure and time.`,
    },
    {
      icon:"🌟", title:"Jupiter in "+jupSign,
      text: `Jupiter stands in ${jupSign}. ${JUPITER_DEEP[jupSign]?.shadow || ""} Jupiter completes a circuit of the zodiac in close to twelve years, so it holds one sign for roughly a year, and every chart of a given birth year shares the placement. The older sources class it as the greater benefic, which is a designation of nature and not a forecast.`,
    },
  ];

  if (sunMoon) {
    sections.push({
      icon:"✨", title:`The Two Lights — Sun ${sunMoon.sym} Moon (${sunMoon.name})`,
      text:`The Sun and the Moon stand in a ${sunMoon.name.toLowerCase()}, at an orb of ${sunMoon.orb}°. ${ASPECT_MEANINGS[sunMoon.name]} The tradition names these two the lights and reads the figure between them as the relation of the chart's two governing bodies. The figure appears here because the separation falls inside the orb this instrument applies — widening the orb creates figures, narrowing it removes them.`,
    });
  }

  return sections;
}

export { generateProfile };
