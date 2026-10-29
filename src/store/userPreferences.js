// Transit groupings by the transiting or natal body, in the classes a
// practitioner already uses: the lights, the personal, social and outer planets.
export const FOCUS_OPTIONS = [
  { id: "all", label: "All bodies", desc: "Every class in its usual order" },
  { id: "lights", label: "Lights", desc: "Sun and Moon" },
  { id: "personal", label: "Personal planets", desc: "Mercury, Venus, Mars" },
  { id: "social", label: "Social planets", desc: "Jupiter, Saturn" },
  { id: "outer", label: "Outer planets", desc: "Uranus, Neptune, Pluto" },
];
const FOCUS_IDS = FOCUS_OPTIONS.map((o) => o.id);

export function getPreferenceFocus() {
  try {
    const v = localStorage.getItem("sge_focus");
    return FOCUS_IDS.includes(v) ? v : "all";
  } catch {
    return "all";
  }
}

export function setPreferenceFocus(focus) {
  try {
    localStorage.setItem("sge_focus", focus);
  } catch {}
}
