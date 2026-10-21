/* ══════════════════════════════════════════════════════════════
   THE HAPPY STATE — ALLE TEKSTEN, FOTO'S EN LINKS VAN DE HOMEPAGE
   ──────────────────────────────────────────────────────────────
   Dit is het enige bestand dat je hoeft aan te passen voor
   tekst- en fotowijzigingen.

   FOTO'S
   • Zet een foto in de map /public (bijv. public/hero-1.jpg)
   • Vul hier de bestandsnaam in met een "/" ervoor: "/hero-1.jpg"
   • Staat er null? Dan toont de site een nette tijdelijke vlak
     met het label "Foto volgt".

   KNOPPEN
   • href: "#contact"  → scrolt naar het kennismakingsformulier
   • onderwerp: "..."  → vult dat onderwerp alvast in het formulier in
   • href: null        → knop wordt (nog) niet getoond
   • Later een eigen pagina? Zet dan bijv. href: "/over-ons"
   ══════════════════════════════════════════════════════════════ */

export const contact = {
  email: "info@thehappystate.com",
  // Formspree-code komt uit een omgevingsvariabele (NEXT_PUBLIC_FORMSPREE_ID),
  // zie de README. Zonder code opent het formulier het mailprogramma.
};

export const nav = {
  links: [
    { label: "Home", href: "#top" },
    { label: "Aanbod", href: "#aanbod" },
    { label: "Voor bedrijven", href: "#bedrijven" },
    { label: "Community", href: "#community" },
    { label: "Over ons", href: "#over-ons" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Plan een kennismaking", href: "#contact", onderwerp: "Vrijblijvende kennismaking" },
};

/* 1 ─ HERO */
export const hero = {
  eyebrow: "Welkom bij The Happy State",
  titel: "De sportschool voor je",
  titelAccent: "binnenwereld.",
  intro:
    "Train je gedachten, emoties, intuïtie en zenuwstelsel met actieve groepslessen vol beweging, creativiteit en verbinding.",
  knoppen: [
    { label: "Plan een kennismaking", href: "#contact", onderwerp: "Vrijblijvende kennismaking", stijl: "primair" },
    { label: "Bekijk ons aanbod", href: "#aanbod", stijl: "licht" },
  ],
  voordelen: [
    { icoon: "zap", tekst: "Meer rust en energie" },
    { icoon: "users", tekst: "Diepere verbinding" },
    { icoon: "sprout", tekst: "Een helderder en sterker jij" },
  ],
  // Carousel: zet hier één of meer foto's. Ze wisselen elke 6 seconden.
  // Leeg ([]) = warme achtergrondkleur.
  fotos: [],
  // Video "Bekijk de sfeer van onze lessen":
  // • eigen bestand in /public: "/sfeer.mp4"
  // • of een YouTube-link: "https://www.youtube.com/watch?v=..."
  // • null = knop wordt niet getoond
  video: null,
  videoLabel: "Bekijk de sfeer van onze lessen",
};

/* SPLITSING ─ direct onder de hero */
export const splitsing = [
  {
    label: "Voor jezelf",
    titel: "Train je binnenwereld",
    tekst: "Groepslessen, 1:1 coaching en een lidmaatschap dat past bij jouw ritme.",
    href: "#aanbod",
    icoon: "user",
  },
  {
    label: "Voor je team",
    titel: "Voor teams en organisaties",
    tekst: "Trainingen, workshops en verdiepende teambuilding op maat.",
    href: "#bedrijven",
    icoon: "building",
  },
];

/* 2 ─ ALTIJD "AAN" */
export const altijdAan = {
  eyebrow: "Altijd aan?",
  titel: "Altijd “aan”,",
  titelRegel2: "maar zelden",
  titelAccent: "in balans?",
  tekst:
    "Je hebt een druk leven, veel verantwoordelijkheden en je wilt groeien, presteren en genieten. Toch merk je dat je hoofd nooit uitstaat. Bij The Happy State train je actief je binnenwereld, zodat je meer rust, energie en richting ervaart – in je werk, je relaties en je leven.",
  knop: { label: "Ontdek The Happy State", href: "#binnenwereld" },
  foto: null, // man met gesloten ogen
  citaat: "Rust is geen stilstand, maar de basis voor meer focus, creativiteit en energie.",
};

/* 3 ─ DE BINNENWERELD */
export const binnenwereld = {
  eyebrow: "De binnenwereld",
  titel: "Vier lagen, één sterker geheel.",
  tekst:
    "Je hoofd, hart, gut en zenuwstelsel werken constant samen en beïnvloeden elkaar. Wanneer deze lagen meer in balans zijn, ervaar je meer rust, helderheid, energie en vrijheid om te kiezen wat echt bij jou past.",
  knop: { label: "Meer over je binnenwereld", href: "#aanbod" },
  midden: "Jouw binnenwereld in balans",
  lagen: [
    { naam: "Hoofd", sub: "Gedachten", icoon: "brain", kleur: "groen", effect: "Helder denken en minder ruis" },
    { naam: "Hart", sub: "Emoties & gevoel", icoon: "heart", kleur: "zand", effect: "Voelen en verbinden met wat belangrijk is" },
    { naam: "Gut", sub: "Intuïtie", icoon: "compass", kleur: "olijf", effect: "Innerlijke richting en vertrouwen" },
    { naam: "Zenuwstelsel", sub: "Regulatie & ademhaling", icoon: "wind", kleur: "terra", effect: "Meer rust, regulatie en veerkracht" },
  ],
};

/* 4 ─ LESSEN */
export const lessen = {
  eyebrow: "The Happy State lessen",
  titel: "Train je",
  titelAccent: "binnenwereld.",
  intro: "Actieve groepslessen van 60 minuten, gericht op jouw groei, energie en verbinding.",
  items: [
    {
      naam: "Noise",
      sub: "Van ruis naar helderheid",
      tekst: "Leer gedachten herkennen, loslaten en focus creëren.",
      foto: "/groepslessen.jpg",
    },
    {
      naam: "Emotions",
      sub: "Begrijpen en reguleren",
      tekst: "Ontdek, voel en leer omgaan met je emoties.",
      foto: "/wiebenik.jpg",
    },
    {
      naam: "Connect",
      sub: "Met jezelf en anderen",
      tekst: "Vergroot je zelfvertrouwen, verbinding en authenticiteit.",
      foto: "/community.jpg",
    },
    {
      naam: "1:1 Coaching",
      sub: "Persoonlijke begeleiding en verdieping",
      tekst: "Gerichte sessies voor jouw ontwikkeling en keuzes.",
      foto: "/coaching.jpg",
    },
  ],
  knopLabel: "Meer informatie",
  // Reviews: alleen echte reacties van deelnemers invullen.
  // Leeg = het blok wordt niet getoond.
  // Voorbeeld: { tekst: "...", naam: "Sophie", sub: "Deelnemer sinds 6 maanden" }
  reviews: [],
};

/* 5 ─ VOOR BEDRIJVEN */
export const bedrijven = {
  eyebrow: "Voor bedrijven",
  titel: "The Happy State",
  titelRegel2: "voor teams en organisaties.",
  tekst:
    "We helpen teams en organisaties aan meer bewustzijn, verbinding, creativiteit en eigenaarschap. Onze trainingen, workshops en verdiepende teambuilding versterken samenwerking, communicatie en veerkracht.",
  aanbod: [
    { icoon: "users", naam: "Trainingen", sub: "Praktisch en ervaringsgericht" },
    { icoon: "presentation", naam: "Workshops", sub: "Interactief en inspirerend" },
    { icoon: "handshake", naam: "Verdiepende teambuilding", sub: "Meer verbinding en samenwerking" },
    { icoon: "sprout", naam: "Persoonlijke begeleiding", sub: "Op maat voor jouw team" },
  ],
  knop: { label: "Ontdek ons zakelijke aanbod", href: "#contact", onderwerp: "Zakelijk aanbod" },
  fotos: ["/teambuilding.jpg"], // één grote of meerdere kleinere sfeerfoto's
};

/* 6 ─ DE KLAVERBENADERING */
export const klaver = {
  eyebrow: "De Klaverbenadering",
  titel: "De",
  titelAccent: "klaver",
  titelRest: "benadering.",
  tekst:
    "Onze werkwijze verbindt gedachten, emoties, intuïtie en het zenuwstelsel. Met beweging, creativiteit en verbinding helpen we je stap voor stap van onrust naar rust, helderheid en inzicht. Deze vier elementen komen terug in al onze lessen, trainingen en workshops.",
  knop: { label: "Ontdek onze methode", href: null }, // later bijv. "/methode"
  onderdelen: [
    { nr: "01", icoon: "sparkles", naam: "Creativiteit", tekst: "Expressie en schepping bevorderen mentaal, emotioneel en lichamelijk welbevinden." },
    { nr: "02", icoon: "smile", naam: "Speelsheid", tekst: "Lichtvoetigheid en spontaniteit leiden tot emotieregulatie en cognitieve flexibiliteit." },
    { nr: "03", icoon: "activity", naam: "Actief", tekst: "Ervaringsleren – de diepste manier van leren, door te beleven en te reflecteren." },
    { nr: "04", icoon: "zap", naam: "Energie", tekst: "Bewustzijn en beheer van jouw energie leidt tot spiritueel en fysiek welbevinden." },
  ],
  foto: null,
  citaat: "Bewegen. Voelen. Creëren. Groeien.",
};

/* 7 ─ COMMUNITY & EVENTS */
export const community = {
  eyebrow: "Community & events",
  titel: "Meer dan een les.",
  titelRegel2: "Een",
  titelAccent: "community.",
  tekst:
    "Inspirerende avonden, workshops en events om dieper te gaan, nieuwe mensen te ontmoeten en samen te groeien.",
  knop: { label: "Bekijk onze events", href: "#contact", onderwerp: "Op de hoogte blijven van events" },
  fotos: [null, null, null, null], // vier kleinere sfeerfoto's
  // Toekomstige events. Leeg = blok wordt niet getoond.
  // Voorbeeld: { datum: "14 nov", titel: "Een avond met The Happy State", tekst: "Storytelling, muziek en dans." }
  events: [],
};

/* 8 ─ LIDMAATSCHAPPEN */
export const lidmaatschappen = {
  eyebrow: "Lidmaatschappen",
  titel: "Kies het ritme dat bij jou past.",
  prijsLabel: "per maand (incl. btw)",
  plannen: [
    {
      naam: "CORE",
      sub: "Een stevige basis voor je binnenwereld.",
      prijs: 119,
      voordelen: ["2 lessen per week", "Toegang tot de studio", "Persoonlijke ontwikkeling", "Community events (selectie)"],
    },
    {
      naam: "FLOW",
      sub: "Meer verdieping en ritme.",
      prijs: 149,
      uitgelicht: "Meest gekozen",
      voordelen: ["2 lessen per week", "Morning intentions (45 min)", "Toegang tot de studio", "Community events"],
    },
    {
      naam: "STATE",
      sub: "Volledig in je flow.",
      prijs: 229,
      voordelen: ["Onbeperkt lessen", "1:1 coachingsessie", "1 tarot reading", "Toegang tot alle events"],
    },
  ],
  knopLabel: "Kies", // wordt "Kies CORE" enz.
  voetnoot: "Maandelijks opzegbaar · Prijzen inclusief 21% btw",
};

/* 9 ─ LATEN WE KENNISMAKEN */
export const kennismaken = {
  eyebrow: "Laten we kennismaken",
  titel: "Start jouw reis naar meer rust, helderheid en energie.",
  tekst:
    "Nieuwsgierig of The Happy State bij jou past? Plan een vrijblijvende kennismaking en ontdek wat wij voor jou kunnen betekenen.",
  foto: null, // sfeerfoto van de studio
  onderwerpen: [
    "Vrijblijvende kennismaking",
    "Lidmaatschap CORE",
    "Lidmaatschap FLOW",
    "Lidmaatschap STATE",
    "1:1 Coaching",
    "Zakelijk aanbod",
    "Op de hoogte blijven van events",
    "Overige vraag",
  ],
};

/* 10 ─ OPRICHTERS */
export const oprichters = {
  eyebrow: "De oprichters van The Happy State",
  titel: "Twee achtergronden,",
  titelAccent: "één missie.",
  tekst: [
    "Wij zijn **Daniel en Raphael**. We hebben zelf ervaren hoe het is om het contact met je binnenwereld kwijt te raken, en wat het verschil maakt wanneer die weer in harmonie is.",
    "Met onze achtergronden in sport, dans, theater, coaching, social work en sociologie creëren we een plek waar je kunt trainen, vertragen en jezelf opnieuw kunt ontmoeten.",
  ],
  knop: { label: "Lees ons verhaal", href: null }, // later bijv. "/over-ons"
  // Eén gezamenlijke foto, of twee losse portretten
  fotos: ["/daniel.jpg", "/raphael.jpg"],
  citaat: "Een sterkere binnenwereld maakt een vrijer leven.",
  ondertekening: "Daniel & Raphael",
};

export const footer = {
  tagline: "De sportschool voor je binnenwereld. Rotterdam.",
  adres: "West Blaak 7, Rotterdam",
  socials: [
    // { label: "Instagram", href: "https://instagram.com/..." },
  ],
};
