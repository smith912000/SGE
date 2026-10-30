// Named asterisms, and what each figure or asterism shows: [kind, text].
export const FIGURE_NOTE = {
  Orion: ['Constellation', 'The hunter, club raised, the lion\'s pelt held up as a shield, the sword hung from his belt.'],
  'Ursa Major': ['Constellation', 'The great bear, its long tail drawn out by the seven stars of the plough.'],
  Cygnus: ['Constellation', 'The swan in flight down the Milky Way, neck stretched to the south.'],
  Perseus: ['Constellation', 'The hero with the sword raised and the Gorgon\'s head held low; Algol is her eye.'],
  Andromeda: ['Constellation', 'The princess chained to the rock, arms held out to her bonds.'],
  Pegasus: ['Constellation', 'The winged horse, drawn as its forepart only, the great square its body.'],
  Cassiopeia: ['Constellation', 'The queen on her throne.'],
  "Orion's Belt": ['Asterism', 'Alnitak, Alnilam and Mintaka. The Three Kings; in China the Three Stars, 參宿, heart of the White Tiger; in Egypt the stars of Osiris.'],
  "Orion's Sword": ['Asterism', 'Hanging from the belt, with the Great Nebula at its middle.'],
  'Orion Nebula': ['Nebula', 'M42, the Great Nebula in the sword, a cloud where stars are still being born. Seen by eye as the hazy middle star of the sword.'],
  Pleiades: ['Asterism', 'The Seven Sisters on the shoulder of the Bull. Krittika in India, 昴 Mǎo in China, the Kimah of Job.'],
  Hyades: ['Asterism', 'The rain-bringers, the V of the Bull\'s face; Aldebaran stands before them but is not one of them.'],
  'Summer Triangle': ['Asterism', 'Vega, Deneb and Altair. In China the Weaver Girl and the Herd Boy, parted by the Milky Way and met once a year.'],
  'Great Square': ['Asterism', 'The body of Pegasus, four stars on the autumn sky; one corner, Alpheratz, belongs to Andromeda.'],
};

// Named asterisms, drawn when the sky is zoomed in or their constellation is touched.
// lines: J2000 [ra, dec] polylines through the stars; ring: a cluster circled
// [ra, dec, radius in degrees]; glow: a nebula [ra, dec]; lab: label offset [dx, dy, align].
export const ASTERISMS = [
  { name: "Orion's Belt", fig: 'Ori', lines: [[[85.19, -1.94], [84.05, -1.2], [83.0, -0.3]]] },
  { name: "Orion's Sword", fig: 'Ori', lab: [-14, 0, 'right'], lines: [[[83.85, -4.84], [83.82, -5.39], [83.86, -5.91]]] },
  { name: 'Orion Nebula', fig: 'Ori', glow: [83.82, -5.39] },
  { name: 'Pleiades', fig: 'Tau', ring: [56.75, 24.12, 1.1] },
  { name: 'Hyades', fig: 'Tau', lab: [0, 22, 'center'], lines: [[[67.15, 19.18], [65.73, 17.54], [64.95, 15.63], [66.37, 17.93]], [[64.95, 15.63], [67.14, 15.96]]] },
  { name: 'Summer Triangle', lines: [[[279.23, 38.78], [310.36, 45.28], [297.7, 8.87], [279.23, 38.78]]] },
  { name: 'Great Square', fig: 'Peg', lines: [[[2.1, 29.09], [345.94, 28.08], [346.19, 15.21], [3.31, 15.18], [2.1, 29.09]]] },
];
