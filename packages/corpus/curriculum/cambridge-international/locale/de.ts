import type { CurriculumLocaleSourceInput } from "#corpus/curriculum/locale-source";

const programKey = "cambridge-international";
const appLocale = "de";
const displayGroup = { title: "Lernstufen" };

/** Reviewed German copy for the Cambridge International curriculum tree. */
export const cambridgeInternationalGermanCurriculum = [
  {
    appLocale,
    displayGroup,
    nodeKey: "early-years",
    programKey,
    translation: {
      routeSlug: "fruehe-bildung",
      title: "Frühkindliche Bildung",
    },
  },
  {
    appLocale,
    displayGroup,
    nodeKey: "primary",
    programKey,
    translation: { routeSlug: "grundschule", title: "Grundschule" },
  },
  {
    appLocale,
    displayGroup,
    nodeKey: "lower-secondary",
    programKey,
    translation: {
      routeSlug: "sekundarstufe-1",
      title: "Sekundarstufe I",
    },
  },
  {
    appLocale,
    displayGroup,
    nodeKey: "upper-secondary",
    programKey,
    translation: {
      routeSlug: "sekundarstufe-2",
      title: "Sekundarstufe II",
    },
  },
  {
    appLocale,
    nodeKey: "mathematics-0580",
    programKey,
    translation: { routeSlug: "mathematik-0580", title: "Mathematik 0580" },
  },
  {
    appLocale,
    materialCard: {
      description: "Stelle Gleichungen, Graphen, Folgen und Funktionen auf.",
      title: "Algebra und Graphen",
    },
    nodeKey: "mathematics-0580-algebra-graphs",
    programKey,
    translation: {
      routeSlug: "algebra-und-graphen",
      title: "Algebra und Graphen",
    },
  },
  {
    appLocale,
    materialCard: {
      description: "Arbeite mit Kreisen, Koordinaten und Trigonometrie.",
      title: "Geometrie, Größenberechnung und Trigonometrie",
    },
    nodeKey: "mathematics-0580-geometry",
    programKey,
    translation: {
      routeSlug: "geometrie-groessenberechnung-und-trigonometrie",
      title: "Geometrie, Größenberechnung und Trigonometrie",
    },
  },
  {
    appLocale,
    materialCard: {
      description: "Nutze Transformationen und Vektoren in der Geometrie.",
      title: "Transformationen und Vektoren",
    },
    nodeKey: "mathematics-0580-transformations-vectors",
    programKey,
    translation: {
      routeSlug: "transformationen-und-vektoren",
      title: "Transformationen und Vektoren",
    },
  },
  {
    appLocale,
    materialCard: {
      description: "Berechne Wahrscheinlichkeiten und werte Daten aus.",
      title: "Wahrscheinlichkeit und Statistik",
    },
    nodeKey: "mathematics-0580-probability-statistics",
    programKey,
    translation: {
      routeSlug: "wahrscheinlichkeit-und-statistik",
      title: "Wahrscheinlichkeit und Statistik",
    },
  },
  {
    appLocale,
    nodeKey: "biology-0610",
    programKey,
    translation: { routeSlug: "biologie-0610", title: "Biologie 0610" },
  },
  {
    appLocale,
    materialCard: {
      description: "Ordne Lebewesen ein und vergleiche biologische Systeme.",
      title: "Lebewesen",
    },
    nodeKey: "biology-0610-living-organisms",
    programKey,
    translation: { routeSlug: "lebewesen", title: "Lebewesen" },
  },
  {
    appLocale,
    materialCard: {
      description: "Verbinde Viren, Ökosysteme und Klimafolgen.",
      title: "Krankheiten und Ökosysteme",
    },
    nodeKey: "biology-0610-disease-ecosystems",
    programKey,
    translation: {
      routeSlug: "krankheiten-und-oekosysteme",
      title: "Krankheiten und Ökosysteme",
    },
  },
  {
    appLocale,
    nodeKey: "chemistry-0620",
    programKey,
    translation: { routeSlug: "chemie-0620", title: "Chemie 0620" },
  },
  {
    appLocale,
    materialCard: {
      description: "Modelliere Atome, Reaktionen und chemische Gesetze.",
      title: "Stoffe und Reaktionen",
    },
    nodeKey: "chemistry-0620-matter-reactions",
    programKey,
    translation: {
      routeSlug: "stoffe-und-reaktionen",
      title: "Stoffe und Reaktionen",
    },
  },
  {
    appLocale,
    materialCard: {
      description: "Bewerte Reaktionen nach den Regeln der grünen Chemie.",
      title: "Umweltchemie",
    },
    nodeKey: "chemistry-0620-environment",
    programKey,
    translation: { routeSlug: "umweltchemie", title: "Umweltchemie" },
  },
  {
    appLocale,
    nodeKey: "physics-0625",
    programKey,
    translation: { routeSlug: "physik-0625", title: "Physik 0625" },
  },
  {
    appLocale,
    materialCard: {
      description: "Miss Bewegung und beschreibe Vektoren und Kräfte.",
      title: "Messung, Bewegung und Kräfte",
    },
    nodeKey: "physics-0625-measurement-motion",
    programKey,
    translation: {
      routeSlug: "messung-bewegung-und-kraefte",
      title: "Messung, Bewegung und Kräfte",
    },
  },
  {
    appLocale,
    materialCard: {
      description: "Vergleiche Energiequellen und ihre Vor- und Nachteile.",
      title: "Energie",
    },
    nodeKey: "physics-0625-energy",
    programKey,
    translation: { routeSlug: "energie", title: "Energie" },
  },
  {
    appLocale,
    displayGroup,
    nodeKey: "advanced",
    programKey,
    translation: {
      routeSlug: "fortgeschritten",
      title: "Fortgeschrittene Stufe",
    },
  },
] as const satisfies readonly CurriculumLocaleSourceInput[];
