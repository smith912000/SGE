import { PANEL_ID, tabDomId } from './TabBar.jsx';

// Fades each view in with CSS, so the content never depends on a script loading.
export default function TabContent({ children, id }) {
  return (
    <div key={id} id={PANEL_ID} role="tabpanel" aria-labelledby={tabDomId(id)} tabIndex={0} className="fade-in sge-panel">
      {children}
    </div>
  );
}
