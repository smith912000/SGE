// Fades each view in with CSS, so the content never depends on a script loading.
export default function TabContent({ children, id }) {
  return <div key={id} className="fade-in">{children}</div>;
}
