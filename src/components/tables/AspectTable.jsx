import { M3 } from '../../theme/m3.js';
import { P_SYM, P_COL, P_ROLE } from '../../data/astrology/planets.js';
import { ASP_SHORT } from '../../data/astrology/aspects.js';

export default function AspectTable({ aspects }) {
  const TH = { padding:"5px 10px", textAlign:"left", color:M3.secondary,
    fontFamily:"'Share Tech Mono', monospace", fontSize:"0.67rem",
    letterSpacing:"0.1em", borderBottom:`1px solid ${M3.outlineVariant}` };
  const TD = { padding:"4px 10px", fontFamily:"'Share Tech Mono', monospace", fontSize:"0.72rem", color:M3.onSurface };
  const cleanName = n => n.replace(/^(T_|B_|A_|natal_|transit_)/,"");
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead><tr>{["Planet","Connection","Planet","Closeness","Meaning"].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
        <tbody>
          {aspects.map((a,i)=>{
            const n1=cleanName(a.p1), n2=cleanName(a.p2);
            const r1=P_ROLE[n1]||"", r2=P_ROLE[n2]||"";
            return (
              <tr key={i} style={{ borderBottom:`1px solid ${M3.outlineVariant}22` }}>
                <td style={{ ...TD, color:P_COL[n1]||M3.onSurface }}>
                  {P_SYM[n1]||""} {n1}
                  {r1 && <span style={{ color:M3.onSurfaceVariant, fontSize:"0.6rem", fontStyle:"italic", marginLeft:4 }}>({r1})</span>}
                </td>
                <td style={TD}>
                  <span style={{ color:a.col, marginRight:4 }}>{a.sym}</span>
                  <span style={{ color:M3.onSurfaceVariant }}>{a.name}</span>
                </td>
                <td style={{ ...TD, color:P_COL[n2]||M3.onSurface }}>
                  {P_SYM[n2]||""} {n2}
                  {r2 && <span style={{ color:M3.onSurfaceVariant, fontSize:"0.6rem", fontStyle:"italic", marginLeft:4 }}>({r2})</span>}
                </td>
                <td style={TD}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <div style={{ width:40, height:3, background:M3.outlineVariant, borderRadius:2 }}>
                      <div style={{ width:`${a.strength*100}%`, height:"100%", background:a.col, borderRadius:2 }}/>
                    </div>
                    <span style={{ color:a.col, fontSize:"0.66rem" }}>{(a.strength*100).toFixed(0)}%</span>
                  </div>
                </td>
                <td style={{ ...TD, fontFamily:"'EB Garamond',Georgia,serif", fontSize:"0.68rem", fontStyle:"italic", color:M3.onSurfaceVariant }}>
                  {r1&&r2 ? `${r1} & ${r2}: ${ASP_SHORT[a.name]||a.name.toLowerCase()}` : ASP_SHORT[a.name]||""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
