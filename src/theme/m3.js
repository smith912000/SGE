// SGE theme. Key names are the Material 3 roles the tabs were written against;
// the values are the WILD design system tokens (see wild-programme/DESIGN.md),
// so every tab reads the same night ground, indigo and gold as the hub and WILD OS.
// SGE leans on the starlit end of that range: parchment for headings, gold for
// labels and the one action, indigo for secondary text and quiet surfaces.
export const M3 = {
  surfaceDim:        "#050309",
  surface:           "#0A0612",
  surfaceContainer:  "#120C1F",
  surfaceBright:     "#19112B",
  surfaceVariant:    "#19112B",
  outline:           "#4A4160",
  outlineVariant:    "#A6A2B0",
  primary:           "#EADFC4",
  onPrimary:         "#0B0714",
  primaryContainer:  "#1E1734",
  onPrimaryContainer:"#F4F1ED",
  secondary:         "#B9A9F0",
  onSecondary:       "#F4F1ED",
  secondaryContainer:"#231838",
  tertiary:          "#E9C766",
  tertiaryContainer: "#2E2410",
  onSurface:         "#F4F1ED",
  onSurfaceVariant:  "#C9C4D4",
  error:             "#E07A85",

  glass:             "rgba(18,12,31,0.82)",
  glassBorder:       "rgba(244,241,237,0.09)",
  glassHighlight:    "rgba(233,199,102,0.05)",

  fontDisplay: "'Cormorant Garamond', Georgia, serif",
  fontBody:    "'DM Sans', system-ui, sans-serif",
  fontMono:    "'JetBrains Mono', ui-monospace, monospace",

  radius: { sm: 10, md: 14, lg: 18, xl: 999 },
  sp:     [0, 4, 8, 12, 16, 20, 24, 32, 48],
};
