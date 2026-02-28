import registry from "../data/datasets/index.json";
import buddhist from "../data/datasets/calendars/buddhist.json";
import jewish from "../data/datasets/calendars/jewish.json";
import islamic from "../data/datasets/calendars/islamic.json";
import vedic from "../data/datasets/calendars/vedic.json";
import sambraielic from "../data/datasets/calendars/sambraielic.json";
import egyptianSolar from "../data/datasets/calendars/egyptian_ancient_solar.json";
import athenianLunar from "../data/datasets/calendars/athenian_lunar.json";
import mayan from "../data/datasets/calendars/mayan.json";
import symbolicOverlays from "../data/datasets/astrology/symbolic_overlays.json";
import scriptFamilies from "../data/datasets/linguistics/script_families.json";
import symbolTaxonomy from "../data/datasets/semiotics/symbol_taxonomy.json";

const CALENDAR_DATASETS = {
  buddhist,
  jewish,
  islamic,
  vedic,
  sambraielic,
  egyptian_ancient_solar: egyptianSolar,
  athenian_lunar: athenianLunar,
  mayan,
};

const OTHER_DATASETS = {
  symbolic_overlays: symbolicOverlays,
  script_families: scriptFamilies,
  symbol_taxonomy: symbolTaxonomy,
};

const ALL_DATASETS = { ...CALENDAR_DATASETS, ...OTHER_DATASETS };

function isObj(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function validateBaseDataset(ds) {
  if (!isObj(ds)) return false;
  if (typeof ds.id !== "string" || !ds.id) return false;
  if (typeof ds.title !== "string" || !ds.title) return false;
  if (typeof ds.version !== "string" || !ds.version) return false;
  if (typeof ds.updatedAt !== "string" || !ds.updatedAt) return false;
  if (!Array.isArray(ds.notes)) return false;
  return true;
}

function validateRegistryShape(r) {
  if (!isObj(r)) return false;
  if (typeof r.version !== "string") return false;
  if (!Array.isArray(r.categories)) return false;
  return r.categories.every((c) => isObj(c) && typeof c.id === "string" && Array.isArray(c.datasets));
}

function freezeDeep(value) {
  if (!isObj(value) && !Array.isArray(value)) return value;
  if (Array.isArray(value)) return Object.freeze(value.map(freezeDeep));
  const out = {};
  for (const [k, v] of Object.entries(value)) out[k] = freezeDeep(v);
  return Object.freeze(out);
}

const _registryValid = validateRegistryShape(registry);
const _datasetErrors = Object.entries(ALL_DATASETS)
  .filter(([, ds]) => !validateBaseDataset(ds))
  .map(([id]) => id);

const FROZEN_REGISTRY = freezeDeep(registry);
const FROZEN_DATASETS = freezeDeep(ALL_DATASETS);

export function getDatasetRegistry() {
  return FROZEN_REGISTRY;
}

export function getDatasetById(id) {
  return FROZEN_DATASETS[id] || null;
}

export function listDatasetsByCategory(categoryId) {
  const cat = FROZEN_REGISTRY.categories.find((c) => c.id === categoryId);
  if (!cat) return [];
  return cat.datasets.map((id) => FROZEN_DATASETS[id]).filter(Boolean);
}

export function listCalendarDatasets() {
  return Object.values(CALENDAR_DATASETS).map((d) => FROZEN_DATASETS[d.id]).filter(Boolean);
}

export function getDatasetStoreHealth() {
  return {
    registryValid: _registryValid,
    invalidDatasets: _datasetErrors,
    totalDatasets: Object.keys(FROZEN_DATASETS).length,
    categories: (FROZEN_REGISTRY.categories || []).map((c) => c.id),
  };
}

