import { getDatasetById } from "./datasetStore.js";
import { chineseCycle } from "./chinese.js";
import { julianDay, sunLon } from "./astronomy.js";
import { ELDER_FUTHARK, SAMBRAIELIC_HOURLY_CHECKPOINTS, SAMBRAIELIC_HALF_HOUR_NOTES, resolveCheckpointForDate } from "../data/calendar/sambraielicWheel.js";

const MAYAN_EPOCH_JDN = 584283;
const SYNODIC_MONTH = 29.530588;

const CONFIDENCE_BY_STATUS = {
  phase1_foundation: "baseline",
  phase1_scaffold_low_priority: "provisional",
};

const CHINESE_ANIMALS = [
  "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
  "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig",
];

const TZOLKIN_DAY_NAMES = [
  "Imix", "Ik", "Akbal", "Kan", "Chikchan", "Kimi", "Manik", "Lamat", "Muluk", "Ok",
  "Chuwen", "Eb", "Ben", "Ix", "Men", "Kib", "Kaban", "Etznab", "Kawak", "Ajaw",
];

const HAAB_MONTHS = [
  "Pop", "Wo", "Sip", "Sotz", "Sek", "Xul", "Yaxkin", "Mol", "Chen", "Yax",
  "Sak", "Keh", "Mak", "Kankin", "Muwan", "Pax", "Kayab", "Kumku", "Wayeb",
];

function norm360(deg) {
  return ((deg % 360) + 360) % 360;
}

function dayOfYearFromUTC(date) {
  const y = date.getUTCFullYear();
  const start = Date.UTC(y, 0, 1);
  const current = Date.UTC(y, date.getUTCMonth(), date.getUTCDate());
  return Math.floor((current - start) / 86400000) + 1;
}

function segmentColor(index) {
  const hue = Math.round((index * 360) / 24) % 360;
  return `hsla(${hue}, 65%, 60%, 0.22)`;
}

function buildSegments(count, labelForIndex) {
  const size = 360 / count;
  return Array.from({ length: count }, (_, idx) => ({
    idx,
    start: idx * size,
    end: (idx + 1) * size,
    label: labelForIndex(idx),
    color: segmentColor(idx),
  }));
}

function parseNumericPart(parts, type) {
  const raw = parts.find((p) => p.type === type)?.value ?? "";
  const digitsOnly = raw.replace(/[^\d]/g, "");
  const parsed = Number.parseInt(digitsOnly, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function intlCalendarParts(date, calendarId) {
  try {
    const fmt = new Intl.DateTimeFormat(`en-u-ca-${calendarId}`, {
      timeZone: "UTC",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "short",
    });
    return fmt.formatToParts(date);
  } catch {
    return [];
  }
}

function datasetMeta(datasetId) {
  const dataset = getDatasetById(datasetId);
  const errors = [];
  if (!dataset) {
    errors.push("Dataset not found.");
    return {
      datasetId,
      title: datasetId,
      source: "Unknown",
      status: "unknown",
      confidence: "unknown",
      notes: [],
      errors,
    };
  }
  if (!dataset.source) errors.push("Missing source metadata.");
  if (!dataset.status) errors.push("Missing status metadata.");
  if (!dataset.wheel) errors.push("Missing wheel descriptor.");
  return {
    datasetId,
    title: dataset.title,
    source: dataset.source || "Unspecified source",
    status: dataset.status || "unknown",
    confidence: CONFIDENCE_BY_STATUS[dataset.status] || "experimental",
    notes: Array.isArray(dataset.notes) ? dataset.notes : [],
    errors,
  };
}

function getNormalizedAnchor({ date, jd, solarLongitude }) {
  if (Number.isFinite(solarLongitude)) return norm360(solarLongitude);
  if (Number.isFinite(jd)) return norm360(sunLon(jd));
  const doy = dayOfYearFromUTC(date);
  return ((doy - 1) / 365) * 360;
}

function baseModel(datasetId, ctx) {
  const date = ctx?.date ?? new Date(Date.UTC(ctx.year, (ctx.month || 1) - 1, ctx.day || 1));
  const jd = Number.isFinite(ctx?.jd)
    ? ctx.jd
    : julianDay(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), 12);
  const metadata = datasetMeta(datasetId);
  return {
    id: datasetId,
    title: metadata.title,
    dateISO: date.toISOString().slice(0, 10),
    nativeRings: [],
    overlayAngle: getNormalizedAnchor({ date, jd, solarLongitude: ctx?.solarLongitude }),
    overlayLabel: "Normalized solar anchor",
    metadata,
    confidence: metadata.confidence,
    caveats: [...metadata.notes, ...metadata.errors],
  };
}

function buildChineseModel(ctx = {}) {
  const model = baseModel("chinese", ctx);
  const y = ctx?.year;
  const m = ctx?.month;
  const d = ctx?.day;
  const cn = ctx?.cn || chineseCycle(y, m, d);
  const segments = buildSegments(12, (idx) => CHINESE_ANIMALS[idx]);
  const activeIndex = Math.max(0, CHINESE_ANIMALS.indexOf(cn.animal));
  model.nativeRings.push({
    id: "animal",
    label: "Earthly branch animals",
    segments,
    activeIndex,
    plain: `${cn.element} ${cn.animal} (${cn.polarity})`,
  });
  return model;
}

function buildBuddhistModel(ctx = {}) {
  const model = baseModel("buddhist", ctx);
  const date = new Date(`${model.dateISO}T00:00:00Z`);
  const monthIndex = date.getUTCMonth();
  const segments = buildSegments(12, (idx) => `Month ${idx + 1}`);
  model.nativeRings.push({
    id: "month",
    label: "Buddhist month cycle",
    segments,
    activeIndex: monthIndex,
    plain: `Month ${monthIndex + 1} in Buddhist Era year.`,
  });
  return model;
}

function buildIslamicModel(ctx = {}) {
  const model = baseModel("islamic", ctx);
  const date = new Date(`${model.dateISO}T00:00:00Z`);
  const parts = intlCalendarParts(date, "islamic");
  const monthNum = parseNumericPart(parts, "month");
  const dayNum = parseNumericPart(parts, "day");
  const yearNum = parseNumericPart(parts, "year");
  const segments = buildSegments(12, (idx) => `Hijri ${idx + 1}`);
  model.nativeRings.push({
    id: "hijriMonth",
    label: "Hijri month cycle",
    segments,
    activeIndex: monthNum ? monthNum - 1 : 0,
    plain: `Hijri date ${dayNum || "?"}/${monthNum || "?"}/${yearNum || "?"}.`,
  });
  return model;
}

function buildJewishModel(ctx = {}) {
  const model = baseModel("jewish", ctx);
  const date = new Date(`${model.dateISO}T00:00:00Z`);
  const parts = intlCalendarParts(date, "hebrew");
  const monthNum = parseNumericPart(parts, "month");
  const dayNum = parseNumericPart(parts, "day");
  const yearNum = parseNumericPart(parts, "year");
  const segments = buildSegments(13, (idx) => `Hebrew ${idx + 1}`);
  model.nativeRings.push({
    id: "hebrewMonth",
    label: "Hebrew month cycle",
    segments,
    activeIndex: monthNum ? Math.min(12, Math.max(0, monthNum - 1)) : 0,
    plain: `Hebrew date ${dayNum || "?"}/${monthNum || "?"}/${yearNum || "?"}.`,
  });
  return model;
}

function buildEgyptianSolarModel(ctx = {}) {
  const model = baseModel("egyptian_ancient_solar", ctx);
  const date = new Date(`${model.dateISO}T00:00:00Z`);
  const doy = dayOfYearFromUTC(date);
  const segmentIndex = doy <= 360 ? Math.floor((doy - 1) / 30) : 12;
  const segments = [
    ...buildSegments(12, (idx) => `Month ${idx + 1}`),
    { idx: 12, start: 360, end: 360, label: "Epagomenal 5", color: "hsla(40, 80%, 70%, 0.28)" },
  ];
  model.nativeRings.push({
    id: "civilYear",
    label: "12x30 + 5 civil cycle",
    segments,
    activeIndex: segmentIndex,
    plain: segmentIndex === 12 ? "In epagomenal days." : `Civil month ${segmentIndex + 1}.`,
  });
  return model;
}

function buildPanchangaModel(ctx = {}) {
  const model = baseModel("panchanga", ctx);
  const date = new Date(`${model.dateISO}T00:00:00Z`);
  const doy = dayOfYearFromUTC(date);
  const weekday = date.getUTCDay();
  const tithi = (doy % 30);
  const nakshatra = (doy % 27);
  model.nativeRings.push({
    id: "tithi",
    label: "Tithi (30)",
    segments: buildSegments(30, (idx) => `Tithi ${idx + 1}`),
    activeIndex: tithi,
    plain: `Tithi index ${tithi + 1}.`,
  });
  model.nativeRings.push({
    id: "nakshatra",
    label: "Nakshatra (27)",
    segments: buildSegments(27, (idx) => `Nakshatra ${idx + 1}`),
    activeIndex: nakshatra,
    plain: `Nakshatra index ${nakshatra + 1}.`,
  });
  model.nativeRings.push({
    id: "vara",
    label: "Vara (7 weekdays)",
    segments: buildSegments(7, (idx) => `Vara ${idx + 1}`),
    activeIndex: weekday,
    plain: `Weekday index ${weekday + 1}.`,
  });
  return model;
}

function buildAthenianLunarModel(ctx = {}) {
  const model = baseModel("athenian_lunar", ctx);
  const jd = Number.isFinite(ctx?.jd)
    ? ctx.jd
    : julianDay(ctx.year, ctx.month, ctx.day, 12);
  const daysSinceEpoch = jd - 2451545.0;
  const lunation = Math.floor(daysSinceEpoch / SYNODIC_MONTH);
  const monthIdx = ((lunation % 12) + 12) % 12;
  const dayInLunation = Math.floor(((daysSinceEpoch % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH) + 1;
  model.nativeRings.push({
    id: "athenianMonth",
    label: "Lunation month scaffold",
    segments: buildSegments(12, (idx) => `Lunar month ${idx + 1}`),
    activeIndex: monthIdx,
    plain: `Approx lunation day ${dayInLunation}.`,
  });
  return model;
}

function buildMayanModel(ctx = {}) {
  const model = baseModel("mayan", ctx);
  const jd = Number.isFinite(ctx?.jd)
    ? ctx.jd
    : julianDay(ctx.year, ctx.month, ctx.day, 12);
  const jdn = Math.floor(jd + 0.5);
  const days = jdn - MAYAN_EPOCH_JDN;
  const tzolkinNumber = ((days + 3) % 13 + 13) % 13 + 1;
  const tzolkinNameIdx = ((days + 19) % 20 + 20) % 20;
  const haabDay = ((days + 348) % 365 + 365) % 365;
  const haabMonthIdx = haabDay < 360 ? Math.floor(haabDay / 20) : 18;
  model.nativeRings.push({
    id: "tzolkin",
    label: "Tzolkin day-name ring",
    segments: buildSegments(20, (idx) => TZOLKIN_DAY_NAMES[idx]),
    activeIndex: tzolkinNameIdx,
    plain: `Tzolkin ${tzolkinNumber} ${TZOLKIN_DAY_NAMES[tzolkinNameIdx]}.`,
  });
  model.nativeRings.push({
    id: "haab",
    label: "Haab month ring",
    segments: buildSegments(19, (idx) => HAAB_MONTHS[idx]),
    activeIndex: haabMonthIdx,
    plain: `Haab month ${HAAB_MONTHS[haabMonthIdx]}.`,
  });
  return model;
}

function buildSambraielicModel(ctx = {}) {
  const model = baseModel("sambraielic", ctx);
  const y = ctx?.year;
  const m = ctx?.month;
  const d = ctx?.day;
  const { dayOfYear, checkpoints, active } = resolveCheckpointForDate(y, m, d);
  const slotSize = 360 / 48;
  const activeSlot = Math.floor((model.overlayAngle ?? 0) / slotSize) % 48;

  const halfHourMeta = Object.fromEntries(SAMBRAIELIC_HALF_HOUR_NOTES.map((row) => [row.slot, row]));
  const hourMeta = Object.fromEntries(SAMBRAIELIC_HOURLY_CHECKPOINTS.map((row) => [row.hour, row]));
  const alternatingSegments = Array.from({ length: 48 }, (_, idx) => {
    const isHourMark = idx % 2 === 0;
    const hour = Math.floor(idx / 2);
    const hourDef = hourMeta[hour];
    const runeDef = halfHourMeta[idx];
    const label = isHourMark
      ? `${hourDef?.hebrew || "?"}`
      : `${runeDef?.rune || ELDER_FUTHARK[(hour + 12) % 24]}`;
    let detail;
    if (isHourMark && hourDef) {
      const cnPart = hourDef.eastCn ? ` ${hourDef.eastCn} ${hourDef.eastPin}` : "";
      const triPart = hourDef.trigram ? ` ${hourDef.trigram}` : "";
      const iChingPart = hourDef.iChing ? ` | ${hourDef.iChing}` : "";
      const txPart = hourDef.taiXuan ? ` | ${hourDef.taiXuan}` : "";
      const bpmfPart = hourDef.bopomofo ? ` [${hourDef.bopomofo}]` : "";
      const kxPart = hourDef.kangxi ? ` ⿻${hourDef.kangxi}` : "";
      detail = `${String(hour).padStart(2, "0")}:00 ${hourDef.hebrew} ${hourDef.westGlyph || ""} ${hourDef.west} / ${hourDef.east}${cnPart}${triPart}${iChingPart}${txPart}${bpmfPart}${kxPart} — ${hourDef.note}`;
    } else if (!isHourMark && runeDef) {
      detail = `${String(hour).padStart(2, "0")}:30 ${runeDef.rune} — ${runeDef.note}`;
    } else {
      detail = isHourMark
        ? `${String(hour).padStart(2, "0")}:00 Gate`
        : `${String(hour).padStart(2, "0")}:30 Runic half-hour marker`;
    }
    return {
      idx,
      start: idx * slotSize,
      end: (idx + 1) * slotSize,
      label,
      color: isHourMark ? "hsla(265, 70%, 62%, 0.24)" : "hsla(45, 92%, 66%, 0.22)",
      detail,
    };
  });
  model.nativeRings.push({
    id: "hourRuneLetter",
    label: "Half-hour rune / hour-letter alternation",
    segments: alternatingSegments,
    activeIndex: activeSlot,
    plain: `Šambraielic day ${dayOfYear}: active checkpoint ${active.hebrew} ${active.westGlyph || ""} ${active.west} / ${active.east} at ${active.hour}:00.`,
  });

  const checkpointSegments = checkpoints.map((cp, idx) => {
    const next = checkpoints[(idx + 1) % checkpoints.length];
    const start = ((cp.dayOfYear - 1) / 365) * 360;
    const nextDay = idx === checkpoints.length - 1 ? next.dayOfYear + 365 : next.dayOfYear;
    const end = ((nextDay - 1) / 365) * 360;
    const cnPart = cp.eastCn ? ` ${cp.eastCn} ${cp.eastPin}` : "";
    const triPart = cp.trigram ? ` ${cp.trigram}` : "";
    const iChingPart = cp.iChing ? ` | ${cp.iChing}` : "";
    const txPart = cp.taiXuan ? ` | ${cp.taiXuan}` : "";
    const blotPart = cp.runicBlot ? ` [${cp.runicBlot}]` : "";
    return {
      idx,
      start,
      end,
      label: `${cp.hebrew} ${cp.westGlyph || ""}`,
      color: cp.westGlyph ? "hsla(265, 70%, 62%, 0.18)" : "hsla(45, 92%, 66%, 0.18)",
      detail: `${String(cp.hour).padStart(2, "0")}:00 ${cp.west} / ${cp.east}${cnPart}${triPart}${iChingPart}${txPart}${blotPart} — ${cp.note}`,
    };
  });
  const activeCheckpointIdx = Math.max(0, checkpoints.findIndex((cp) => cp.hour === active.hour));
  model.nativeRings.push({
    id: "yearCheckpoint",
    label: "24 yearly checkpoints (solstice-anchored)",
    segments: checkpointSegments,
    activeIndex: activeCheckpointIdx,
    plain: `Current gate: ${active.hebrew} ${active.westGlyph || ""} ${active.west} / ${active.east} (${active.month}/${active.day}). ${active.note}`,
  });

  model.caveats.push("Šambraielic Wheel Calendar: Šabbatic (Lunar-Solar) unified calendar with Sepher Yetzirah correspondences and Runic Half-Month cycle.");
  return model;
}

const BUILDERS = {
  chinese: buildChineseModel,
  panchanga: buildPanchangaModel,
  islamic: buildIslamicModel,
  jewish: buildJewishModel,
  buddhist: buildBuddhistModel,
  sambraielic: buildSambraielicModel,
  egyptian_ancient_solar: buildEgyptianSolarModel,
  athenian_lunar: buildAthenianLunarModel,
  mayan: buildMayanModel,
};

function buildCalendarWheelModel(id, ctx = {}) {
  const builder = BUILDERS[id];
  if (!builder) return null;
  const model = builder(ctx);
  const hasRings = Array.isArray(model.nativeRings) && model.nativeRings.length > 0;
  if (!hasRings) model.caveats.push("No native rings produced.");
  for (const ring of model.nativeRings) {
    if (!Array.isArray(ring.segments) || ring.segments.length === 0) {
      model.caveats.push(`Ring ${ring.id} has no segments.`);
    }
    if (ring.activeIndex < 0 || ring.activeIndex >= ring.segments.length) {
      model.caveats.push(`Ring ${ring.id} active index is out of range.`);
    }
  }
  return model;
}

const CALENDAR_WHEEL_IDS = [
  "chinese",
  "panchanga",
  "islamic",
  "jewish",
  "buddhist",
  "sambraielic",
  "egyptian_ancient_solar",
  "athenian_lunar",
  "mayan",
];

export { CALENDAR_WHEEL_IDS, buildCalendarWheelModel };
