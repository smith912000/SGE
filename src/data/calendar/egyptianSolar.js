/**
 * Ancient Egyptian Solar (Civil) Calendar Metadata
 * 
 * Structure: 
 * - 3 Seasons (Akhet, Peret, Shemu) 
 * - 12 Months of 30 days each
 * - 5 Epagomenal days (Birthday of the Gods)
 * 
 * New Year (1 Thoth) aligns with the heliacal rising of Sirius (Sopdet)
 * traditionally around July 19th Gregorian.
 */

export const EGYPTIAN_SEASONS = [
    { id: "akhet", name: "Akhet", meaning: "Inundation", hiero: "𓈗", desc: "The flood season — when the Nile overflows, revitalizing the land." },
    { id: "peret", name: "Peret", meaning: "Emergence / Growing", hiero: "𓇇𓂋", desc: "The season of emergence — when the water recedes and planting begins." },
    { id: "shemu", name: "Shemu", meaning: "Harvest / Low Water", hiero: "𓈙𓅓𓅱", desc: "The harvest season — the time of heat and gathering the fruits of the labor." }
];

export const EGYPTIAN_SOLAR_MONTHS = [
    { n: 1, season: 0, name: "Thoth", greek: "Djehuty", hiero: "𓅓𓎛𓏏", deity: "Thoth", deityDesc: "God of wisdom, writing, and time." },
    { n: 2, season: 0, name: "Phaophi", greek: "Pa-en-Ipet", hiero: "𓂋𓎡𓎡", deity: "Ptah", deityDesc: "The divine craftsman and architect of the universe." },
    { n: 3, season: 0, name: "Athyr", greek: "Hut-Hery", hiero: "𓎛𓋴𓇋", deity: "Hathor", deityDesc: "Goddess of love, beauty, music, and motherhood." },
    { n: 4, season: 0, name: "Choiak", greek: "Ka-her-ka", hiero: "𓎡𓎡𓎡", deity: "Sekhmet", deityDesc: "The powerful lioness goddess of war and healing." },

    { n: 5, season: 1, name: "Tybi", greek: "Ta-abet", hiero: "𓎡𓎡𓏤", deity: "Min", deityDesc: "God of fertility, virility, and the eastern desert." },
    { n: 6, season: 1, name: "Mechir", greek: "Mekhir", hiero: "𓂋𓎡𓎡", deity: "Horus the Elder", deityDesc: "Heru-wer, the god of the sky and light." },
    { n: 7, season: 1, name: "Phamenoth", greek: "Pa-en-Amenhotep", hiero: "𓊪𓎡𓎡", deity: "Amun-Ra", deityDesc: "The king of the gods and the hidden solar force." },
    { n: 8, season: 1, name: "Pharmuthi", greek: "Pa-en-Rannut", hiero: "𓊪𓎡𓇋", deity: "Renenutet", deityDesc: "Cobra goddess of the harvest and nourishment." },

    { n: 9, season: 2, name: "Pachons", greek: "Pa-en-Khonsu", hiero: "𓊪𓎡𓎡", deity: "Khonsu", deityDesc: "The traveler, falcon-headed god of the moon and time." },
    { n: 10, season: 2, name: "Payni", greek: "Pa-en-Inat", hiero: "𓊪𓎡𓎡", deity: "Horus", deityDesc: "The son of Isis and Osiris, god of kingship and the sky." },
    { n: 11, season: 2, name: "Epiphi", greek: "Abot-Ipi", hiero: "𓊪𓎡𓎡", deity: "Madjet", deityDesc: "The mysterious protector referenced in the Am-Tuat." },
    { n: 12, season: 2, name: "Mesore", greek: "Mesut-Ra", hiero: "𓎡𓎡𓎡", deity: "Thoth / Ra-Horakhty", deityDesc: "The birth of Ra, celebrating the solar completion." }
];

export const EPAGOMENAL_DAYS = [
    { n: 1, name: "Osiris", deity: "Osiris", desc: "First Epagomenal Day: The birthday of Osiris, god of the afterlife and rebirth." },
    { n: 2, name: "Horus", deity: "Horus", desc: "Second Epagomenal Day: The birthday of Horus the Younger, the avenger of his father." },
    { n: 3, name: "Set", deity: "Set", desc: "Third Epagomenal Day: The birthday of Set, god of storms, chaos, and deserts." },
    { n: 4, name: "Isis", deity: "Isis", desc: "Fourth Epagomenal Day: The birthday of Isis, goddess of magic, motherhood, and healing." },
    { n: 5, name: "Nephthys", deity: "Nephthys", desc: "Fifth Epagomenal Day: The birthday of Nephthys, goddess of mourning and the night." }
];

export const EGYPTIAN_SOLAR_INFO = {
    name: "Ancient Egyptian Solar (Civil) Calendar",
    type: "Solar",
    epoch: "Heliacal Rising of Sirius (Sopdet)",
    startDateGregorian: "July 19th",
    structure: "12 months of 30 days + 5 epagomenal days",
    decans: "3 decades per month",
    newYear: "Wepet Renpet"
};
