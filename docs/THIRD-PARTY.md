# Third-party data

## d3-celestial star and constellation data
`src/data/sky/catalogue.js` is generated from the data files of d3-celestial (https://github.com/ofrohn/d3-celestial): stars to magnitude 5.3, star names, the IAU constellation lines and the Chinese constellation lines. Copyright (c) 2015 Olaf Frohn, BSD-3-Clause; the full licence is in `src/data/sky/LICENSE-d3-celestial.txt`.

## Historical pictures on the symbol map
All public domain or CC0 unless marked CC BY, from Wikimedia Commons and museum open-access collections; the original scans are kept on the `art-refs` branch with a source list.
- **Urania's Mirror** (London, 1824), cards engraved by Sidney Hall, public domain. `public/sky-art/*.webp` is the engraving of 20 cards lifted off the paper as line and pinned to the stars (`src/data/sky/atlasArt.js`); `public/sky-art/plates/card-*.jpg` are the cards themselves.
- **Hans Sebald Beham**, The Planets (c. 1530–40), National Gallery of Art, CC0: `plates/planet-*.jpg`.
- **Goguryeo tomb murals**, Gangseo Great Tomb (6th–7th c.): the 1915 survey copies of the four beasts, the south wall copy and the ceiling, public domain. `plates/sym-*.jpg`, and the beasts drawn along the mansions as `public/sky-art/beast-*.webp`.
- **Twelve animals**, Yuan dynasty tomb figures (1279–1368), Los Angeles County Museum of Art, public domain: `plates/branch-*.jpg`. The dog, rabbit, rat and tiger are named by elimination and from their look; LACMA's records do not say.
- **The Indian sky** (the Nakshatras and Sidereal zodiac layers and the planet, sign and nakshatra panels):
  - E. A. Rodrigues, *The Complete Hindoo Pantheon* (Madras, 1842), public domain: the nine grahas (`plates/graha-*.jpg`) and the presiding deities Agni, Brahma, Yama, Ishana (for Rudra), Indra, Nirrti and Vayu (`plates/deva-*.jpg`).
  - *Surya ringed by the twelve rashis*, Kangra, c. 1830, San Diego Museum of Art, public domain: the twelve roundels cut out as `public/sky-art/vedic/rashi-*.webp`, and the whole painting as `plates/rashi-chakra.jpg`.
  - Sanju, Mandi astrology series, c. 1810: Taurus and Sagittarius (Cleveland Museum of Art, CC0) and Pisces (Metropolitan Museum of Art, CC0), `plates/rashi-*-mandi.jpg`.
  - "The Twenty-eight Hindoo Lunar Mansions", engraved by Inigo Barlow for Thomas Maurice. **Wellcome Collection, CC BY 4.0** (credit: Wellcome Collection). The panels are `plates/nak-*.jpg`, and the symbols lifted off the black ground as `public/sky-art/vedic/nak-*.webp`.
  - A North Indian birth chart, Hindi MS 240 f. 6a. **Wellcome Collection, CC BY 4.0**: `plates/kundali.jpg`.
