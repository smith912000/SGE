export const FOCUS_OPTIONS = [
  { id: "all", label: "✦ All Themes", desc: "Show every life area equally" },
  { id: "love", label: "♡ Love & Relationships", desc: "Heart, connection, partnership" },
  { id: "career", label: "⊕ Career & Purpose", desc: "Goals, money, achievement" },
  { id: "spiritual", label: "☽ Spiritual Growth", desc: "Inner life, soul, transformation" },
  { id: "body", label: "◎ Body & Energy", desc: "Vitality, mood, physical rhythms" },
];

export function getPreferenceFocus() {
  try {
    return localStorage.getItem("sge_focus") || "all";
  } catch {
    return "all";
  }
}

export function setPreferenceFocus(focus) {
  try {
    localStorage.setItem("sge_focus", focus);
  } catch {}
}
