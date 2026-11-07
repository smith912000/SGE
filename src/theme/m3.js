// SGE theme. Key names are the Material 3 roles the tabs were written against;
// the values are the WILD design system tokens (see wild-programme/DESIGN.md),
// so every tab reads the same night ground, indigo and gold as the hub and WILD OS.
// SGE leans on the starlit end of that range: parchment for headings, gold for
// labels and the one action, indigo for secondary text and quiet surfaces.
export const M3 = {
  surfaceDim:        "#06100E",
  surface:           "#0B1613",
  surfaceContainer:  "#11201C",
  surfaceBright:     "#172B25",
  surfaceVariant:    "#172B25",
  outline:           "#3C5750",
  outlineVariant:    "#A3B0AB",
  primary:           "#F2E3D5",
  onPrimary:         "#08130F",
  primaryContainer:  "#142C26",
  onPrimaryContainer:"#EDEFE6",
  secondary:         "#9EDCCB",
  onSecondary:       "#EDEFE6",
  secondaryContainer:"#183229",
  tertiary:          "#EBA37F",
  tertiaryContainer: "#3A2316",
  onSurface:         "#EDEFE6",
  onSurfaceVariant:  "#C4D0CB",
  error:             "#E07A85",

  glass:             "rgba(17,32,28,0.82)",
  glassBorder:       "rgba(237,239,230,0.09)",
  glassHighlight:    "rgba(235,163,127,0.05)",

  fontDisplay: "'Cinzel', Georgia, serif",
  fontBody:    "'DM Sans', system-ui, sans-serif",
  fontMono:    "ui-monospace, Menlo, Consolas, monospace",

  radius: { sm: 4, md: 6, lg: 8, xl: 6 },
  sp:     [0, 4, 8, 12, 16, 20, 24, 32, 48],
};
