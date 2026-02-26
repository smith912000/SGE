import { useMemo, useState } from "react";
import alphabetIndex from "../../data/datasets/linguistics/alphabet_index.json";

export default function ScriptSelector({ onSelect }) {
  const [q, setQ] = useState("");
  const scripts = (alphabetIndex && alphabetIndex.scripts) || [];
  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return scripts;
    return scripts.filter(s => s.toLowerCase().includes(qq));
  }, [q, scripts]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search scripts..."
        style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.12)", outline: "none" }}
      />
      <div style={{ maxHeight: 160, overflow: "auto", borderRadius: 8, border: "1px solid rgba(0,0,0,0.06)", padding: 6, background: "transparent" }}>
        {filtered.map((s) => (
          <div
            key={s}
            onClick={() => onSelect && onSelect(s)}
            style={{ padding: "6px 8px", cursor: "pointer", borderRadius: 6 }}
          >
            {s}
          </div>
        ))}
        {filtered.length === 0 && <div style={{ padding: 8, color: "#666" }}>No matches</div>}
      </div>
    </div>
  );
}
