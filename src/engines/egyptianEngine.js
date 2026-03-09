import { EGYPTIAN_SEASONS, EGYPTIAN_SOLAR_MONTHS, EPAGOMENAL_DAYS } from '../data/calendar/egyptianSolar.js';

/**
 * Calculates the Ancient Egyptian Solar date for a given Gregorian date.
 * Based on a fixed alignment to July 19th (Sopdet rising).
 */
export function computeEgyptianSolarDate(year, month, day) {
    const gDate = new Date(year, month - 1, day);

    // Egyptian New Year is traditionally July 19th
    let nyYear = month < 7 || (month === 7 && day < 19) ? year - 1 : year;
    let nyDate = new Date(nyYear, 6, 19); // month is 0-indexed, 6 = July

    let diff = Math.round((gDate - nyDate) / 86400000);
    const dayOfYear = diff + 1; // 1-indexed day of year

    // Egyptian Civil year is exactly 365 days. 
    // In our implementation, we'll map Day 1-365. 
    // If it's a leap year day (Feb 29), we treat it as part of the previous day or a "standing outside" day?
    // Modern "fixed" reconstructions usually just map the 365 days.

    if (dayOfYear <= 360) {
        const monthIdx = Math.floor((dayOfYear - 1) / 30);
        const egyptianMonth = EGYPTIAN_SOLAR_MONTHS[monthIdx];
        const dayOfMonth = ((dayOfYear - 1) % 30) + 1;
        const season = EGYPTIAN_SEASONS[egyptianMonth.season];
        const decan = Math.floor((dayOfMonth - 1) / 10) + 1;

        return {
            type: 'standard',
            dayOfYear,
            month: egyptianMonth,
            monthNum: egyptianMonth.n,
            dayOfMonth,
            season,
            decan,
            isEpagomenal: false
        };
    } else {
        const epagIdx = Math.min(dayOfYear - 361, 4); // Handle days 361-365 (or 366 in leap years)
        const epagDay = EPAGOMENAL_DAYS[epagIdx];

        return {
            type: 'epagomenal',
            dayOfYear,
            epagomenalDay: epagDay,
            isEpagomenal: true,
            season: EGYPTIAN_SEASONS[2], // Still in Shemu (Harvest)
            decan: 3 // Last decan block
        };
    }
}

export const E_SEASON_RE = E_SEASON_RE_VAL; // placeholder if needed
export const E_MONTH_RE = E_MONTH_RE_VAL;
export const E_EPAG_RE = E_EPAG_RE_VAL;

const E_SEASON_RE_VAL = "The Ancient Egyptian year was divided into three seasons: Akhet (Inundation), Peret (Emergence), and Shemu (Harvest).";
const E_MONTH_RE_VAL = "Each season consisted of four 30-day months.";
const E_EPAG_RE_VAL = "The five epagomenal days are the birthdays of the gods Osiris, Horus, Set, Isis, and Nephthys.";
