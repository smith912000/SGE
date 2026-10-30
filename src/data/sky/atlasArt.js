// Figures from Sidney Hall's Urania's Mirror (London, 1824), public domain,
// laid over the sky. Each card's engraving is lifted off the paper as gold line
// (public/sky-art) and pinned to its stars: M maps a card pixel [x, y, 1] (with
// x², xy, y² in thousandths, for the wider cards) to the azimuthal equidistant
// plane about [ra0, dec0], fitted to the bright stars on the
// card. Sources: docs/THIRD-PARTY.md.
export const ATLAS_ART = {
  Ori: { img: 'ori.webp', figs: ["Ori"], w: 1252, h: 1800, ra0: 83.9719, dec0: -1.0583, M: [-0.000383151, -1.35872e-06, 0.223879, 9.84666e-06, -0.000374435, 0.440119], plate: "Urania's Mirror, plate 29: Orion" },
  Tau: { img: 'tau.webp', figs: ["Tau"], w: 1800, h: 1266, ra0: 70.591, dec0: 14.5125, M: [-0.000488472, -9.97667e-06, 0.38096, 1.78916e-05, -0.00044803, 0.283252], plate: "Urania's Mirror, plate 17: Taurus" },
  Gem: { img: 'gem.webp', figs: ["Gem"], w: 1800, h: 1258, ra0: 106.0258, dec0: 24.3233, M: [-0.000370984, -5.07875e-05, 0.33386, 1.65354e-05, -0.000398501, 0.250609], plate: "Urania's Mirror, plate 18: Gemini" },
  Cnc: { img: 'cnc.webp', figs: ["Cnc"], w: 1800, h: 2574, ra0: 127.2065, dec0: 19.432, M: [-0.000242395, 7.79612e-06, 0.250088, -6.02969e-07, -0.000244636, 0.327709], plate: "Urania's Mirror, plate 19: Cancer" },
  Leo: { img: 'leo.webp', figs: ["Leo", "LMi"], w: 1800, h: 2565, ra0: 158.9368, dec0: 11.648, M: [-0.00046462, 4.35784e-06, 0.399903, -1.43481e-05, -0.000437644, 0.735018], plate: "Urania's Mirror, plate 20: Leo Major and Leo Minor" },
  Vir: { img: 'vir.webp', figs: ["Vir"], w: 1800, h: 1264, ra0: 196.2728, dec0: -2.465, M: [-0.000566819, 1.28564e-05, 0.529005, -5.72525e-06, -0.000549183, 0.379373], plate: "Urania's Mirror, plate 21: Virgo" },
  Lib: { img: 'lib.webp', figs: ["Lib"], w: 1800, h: 1258, ra0: 233.7704, dec0: -16.164, M: [-0.000397977, 3.95055e-06, 0.255051, 6.4982e-06, -0.00041521, 0.246688], plate: "Urania's Mirror, plate 22: Libra" },
  Sco: { img: 'sco.webp', figs: ["Sco"], w: 1800, h: 2579, ra0: 250.9765, dec0: -29.4575, M: [-0.000286656, 4.49135e-05, 0.150896, 5.50772e-05, -0.00024294, 0.312127], plate: "Urania's Mirror, plate 23: Scorpio" },
  Sgr: { img: 'sgr.webp', figs: ["Sgr", "CrA"], w: 1800, h: 1259, ra0: 281.5192, dec0: -29.875, M: [-0.000582754, -1.87726e-05, 0.66181, 2.05133e-05, -0.000552272, 0.297304], plate: "Urania's Mirror, plate 24: Sagittarius" },
  Cap: { img: 'cap.webp', figs: ["Cap"], w: 1800, h: 1258, ra0: 315.9548, dec0: -18.24, M: [-0.000314815, -4.48249e-05, 0.302905, 3.98689e-06, -0.000297888, 0.161776], plate: "Urania's Mirror, plate 25: Capricornus" },
  Aqr: { img: 'aqr.webp', figs: ["Aqr", "PsA"], w: 1800, h: 1260, ra0: 333.8934, dec0: -12.54, M: [-0.00052505, 5.63664e-05, 0.457285, -3.06818e-06, -0.000569045, 0.386209], plate: "Urania's Mirror, plate 26: Aquarius" },
  Psc: { img: 'psc.webp', figs: ["Psc"], w: 1800, h: 1260, ra0: 16.9258, dec0: 14.79, M: [-0.000659556, -2.75382e-05, 0.454086, -2.83489e-06, -0.000641882, 0.371299], plate: "Urania's Mirror, plate 27: Pisces" },
  Ari: { img: 'ari.webp', figs: ["Ari"], w: 1800, h: 1259, ra0: 40.6989, dec0: 18.1163, M: [-0.000504436, -5.86272e-05, 0.454776, 3.89972e-05, -0.000515027, 0.267874], plate: "Urania's Mirror, plate 16: Aries" },
  Oph: { img: 'oph.webp', figs: ["Oph", "Ser"], w: 1800, h: 1266, ra0: 255.2976, dec0: -1.7233, M: [-0.000836549, 3.26379e-05, 0.772356, -3.14797e-05, -0.000821279, 0.576854], plate: "Urania's Mirror, plate 12: Serpentarius and Serpens" },
  UMa: { img: 'uma.webp', figs: ["UMa"], w: 1800, h: 1265, ra0: 189.6368, dec0: 57.9013, M: [-0.000566687, 0.000248606, 0.435173, -8.14537e-05, -0.00011741, -0.000490738, -0.000562916, -0.000890491, 0.558989, 0.000346036, 0.000333035, -4.93721e-05], plate: "Urania's Mirror, plate 9: Ursa Major" },
  Cas: { img: 'cas.webp', figs: ["Cas"], w: 1800, h: 2586, ra0: 15.3279, dec0: 60.064, M: [0.000242965, 3.93137e-05, -0.30749, -4.11082e-05, 0.000195485, -0.235003], plate: "Urania's Mirror, plate 3: Cassiopeia" },
  Cyg: { img: 'cyg.webp', figs: ["Cyg", "Lyr", "Lac", "Vul", "Sge"], w: 1800, h: 1264, ra0: 294.8483, dec0: 39.6233, M: [-0.000689515, 6.55262e-05, 0.775791, 4.33838e-07, -0.000790066, 0.537034], plate: "Urania's Mirror, plate 14: Cygnus, Lyra, Lacerta and Vulpecula" },
  Per: { img: 'per.webp', figs: ["Per"], w: 1800, h: 1260, ra0: 39.0419, dec0: 45.2183, M: [-0.000498467, -8.46339e-05, 0.583821, 0.000110701, -0.000477588, 0.182768], plate: "Urania's Mirror, plate 6: Perseus and the Gorgon's head" },
  And: { img: 'and.webp', figs: ["And", "Tri"], w: 1800, h: 2567, ra0: 18.4518, dec0: 35.2562, M: [0.000163146, 0.000385014, -0.649181, -7.2153e-05, 1.59647e-06, 3.97583e-06, -0.000331278, -9.08008e-05, 0.405566, -2.38539e-05, -1.1679e-05, 3.4422e-05], plate: "Urania's Mirror, plate 5: Andromeda" },
  Peg: { img: 'peg.webp', figs: ["Peg", "Equ"], w: 1024, h: 715, ra0: 348.7818, dec0: 19.488, M: [-0.0010014, -6.3591e-05, 0.426725, -3.28103e-05, -0.000917337, 0.342339], plate: "Urania's Mirror, plate 15: Pegasus and Equuleus" },
};

// The four beasts of the Chinese quarters, from the Goguryeo tomb murals
// (Gangseo Great Tomb, 6th-7th c.; the bird from the south wall copy), laid along
// their seven mansions. Same mapping as above, set by hand, the left of each
// picture to the east.
export const BEASTS = {
  'Azure Dragon': { img: 'beast-dragon.webp', w: 900, h: 575, ra0: 236, dec0: -14, M: [-0.00135748, 0, 0.610865, 0, -0.00135748, 0.390275] },
  'Black Tortoise': { img: 'beast-tortoise.webp', w: 900, h: 718, ra0: 322, dec0: -6, M: [-0.00120234, 0, 0.541052, 0, -0.00120234, 0.431639] },
  'White Tiger': { img: 'beast-tiger.webp', w: 900, h: 671, ra0: 50, dec0: 14, M: [-0.00135748, 0, 0.610865, 0, -0.00135748, 0.455434] },
  'Vermilion Bird': { img: 'beast-bird.webp', w: 710, h: 900, ra0: 140, dec0: -4, M: [-0.00142576, 0, 0.506145, 0, -0.00142576, 0.641593] },
};
