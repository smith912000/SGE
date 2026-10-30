# Third-party data

## d3-celestial star and constellation data
`src/data/sky/catalogue.js` is generated from the data files of d3-celestial (https://github.com/ofrohn/d3-celestial): stars to magnitude 5.3, star names, the IAU constellation lines and the Chinese constellation lines. Copyright (c) 2015 Olaf Frohn, BSD-3-Clause; the full licence is in `src/data/sky/LICENSE-d3-celestial.txt`.

## Historical pictures on the symbol map
All public domain or CC0, from Wikimedia Commons; the original scans are kept on the `art-refs` branch with a source list.
- **Urania's Mirror** (London, 1824), cards engraved by Sidney Hall, public domain. `public/sky-art/*.webp` is the engraving of 20 cards lifted off the paper as line and pinned to the stars (`src/data/sky/atlasArt.js`); `public/sky-art/plates/card-*.jpg` are the cards themselves.
- **Hans Sebald Beham**, The Planets (c. 1530–40), National Gallery of Art, CC0: `plates/planet-*.jpg`.
- **Goguryeo tomb murals**, Gangseo Great Tomb (6th–7th c.): the 1915 survey copies of the four beasts, the south wall copy and the ceiling, public domain. `plates/sym-*.jpg`, and the beasts drawn along the mansions as `public/sky-art/beast-*.webp`.
- **Twelve animals**, Yuan dynasty tomb figures (1279–1368), Los Angeles County Museum of Art, public domain: `plates/branch-*.jpg`. The dog, rabbit, rat and tiger are named by elimination and from their look; LACMA's records do not say.
