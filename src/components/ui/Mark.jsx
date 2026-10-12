// The WILD mark: a vertical vesica, two indigo rings with a gold aperture.
export default function Mark({ size = 40, className = '', ...props }) {
  return (
    <svg className={className} width={size} height={size * 1.2} viewBox="0 0 100 120" fill="none" aria-hidden="true" {...props}>
      <circle cx="50" cy="42" r="36" stroke="#6349B8" strokeWidth="2.5" />
      <circle cx="50" cy="78" r="36" stroke="#6349B8" strokeWidth="2.5" />
      <path d="M50 51V69" stroke="#E9C766" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
