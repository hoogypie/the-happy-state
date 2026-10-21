# The Happy State — website

Next.js-site voor The Happy State (Rotterdam).

## Teksten en foto's aanpassen

Alles staat in **`src/content/site.js`**: teksten, knoppen, foto's, lidmaatschappen.

- **Foto toevoegen:** zet het bestand in `public/` (bijv. `public/hero-1.jpg`) en vul in `site.js` de naam in: `"/hero-1.jpg"`. Staat er `null`, dan toont de site een tijdelijk vlak met "Foto volgt".
- **Hero-carousel:** `hero.fotos: ["/hero-1.jpg", "/hero-2.jpg"]` — wisselt elke 6 seconden.
- **Video "Bekijk de sfeer":** `hero.video: "/sfeer.mp4"` of een YouTube-link. Bij `null` wordt de knop niet getoond.
- **Reviews / events:** de lijsten `lessen.reviews` en `community.events` zijn leeg; de blokken verschijnen zodra je ze invult.
- **Knop verbergen:** `href: null`. Later een eigen pagina? Zet bijv. `href: "/over-ons"`.

Tip: maak foto's maximaal ±2500 px breed; de site verkleint ze verder automatisch.

## Volgorde van secties

`src/app/page.jsx` — verschuif of verwijder een regel. De secties zelf staan in `src/components/home/sections.jsx`, de opmaak in `src/components/home/home.css`.

## Contactformulier (Formspree)

1. Maak een gratis account op formspree.io met het ontvangende e-mailadres en maak een formulier aan.
2. Kopieer de code uit de link (`https://formspree.io/f/XXXXXXX` → `XXXXXXX`).
3. Vercel → Project → Settings → Environment Variables: `NEXT_PUBLIC_FORMSPREE_ID` = die code. Daarna opnieuw deployen.

Zonder code opent het formulier het mailprogramma van de bezoeker (naar `contact.email` in `site.js`).

## Lokaal draaien

```bash
npm install
npm run dev
```
