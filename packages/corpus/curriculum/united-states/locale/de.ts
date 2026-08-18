import type { CurriculumLocaleSourceInput } from "#corpus/curriculum/locale-source";

const appLocale = "de";
const programKey = "united-states";

/** Reviewed German copy for the US standards-aligned curriculum tree. */
export const unitedStatesGermanCurriculum = [
  {
    appLocale,
    displayGroup: { title: "Schulstufen" },
    nodeKey: "high-school",
    programKey,
    translation: { routeSlug: "highschool", title: "Highschool" },
  },
  {
    appLocale,
    nodeKey: "high-school-mathematics",
    programKey,
    translation: { routeSlug: "mathematik", title: "Mathematik" },
  },
  {
    appLocale,
    materialCard: {
      description: "Arbeite mit komplexen Zahlen, Vektoren und Matrizen.",
      title: "Zahlen und Größen",
    },
    nodeKey: "high-school-mathematics-number-quantity",
    programKey,
    translation: {
      routeSlug: "zahlen-und-groessen",
      title: "Zahlen und Größen",
    },
  },
  {
    appLocale,
    materialCard: {
      description: "Löse Gleichungen, Polynome und Exponentialterme.",
      title: "Algebra",
    },
    nodeKey: "high-school-mathematics-algebra",
    programKey,
    translation: { routeSlug: "algebra", title: "Algebra" },
  },
  {
    appLocale,
    materialCard: {
      description: "Modelliere, verknüpfe und transformiere Funktionen.",
      title: "Funktionen",
    },
    nodeKey: "high-school-mathematics-functions",
    programKey,
    translation: { routeSlug: "funktionen", title: "Funktionen" },
  },
  {
    appLocale,
    materialCard: {
      description: "Arbeite mit Kreisen, Koordinaten und Trigonometrie.",
      title: "Geometrie",
    },
    nodeKey: "high-school-mathematics-geometry",
    programKey,
    translation: { routeSlug: "geometrie", title: "Geometrie" },
  },
  {
    appLocale,
    materialCard: {
      description: "Werte Daten, Zufall und Regressionsmodelle aus.",
      title: "Statistik und Wahrscheinlichkeit",
    },
    nodeKey: "high-school-mathematics-statistics-probability",
    programKey,
    translation: {
      routeSlug: "statistik-und-wahrscheinlichkeit",
      title: "Statistik und Wahrscheinlichkeit",
    },
  },
  {
    appLocale,
    nodeKey: "high-school-science",
    programKey,
    translation: {
      routeSlug: "naturwissenschaften",
      title: "Naturwissenschaften",
    },
  },
  {
    appLocale,
    materialCard: {
      description: "Verbinde Bewegung, Energie, Stoffe und Reaktionen.",
      title: "Physikalische Wissenschaften",
    },
    nodeKey: "high-school-science-physical-sciences",
    programKey,
    translation: {
      routeSlug: "physikalische-wissenschaften",
      title: "Physikalische Wissenschaften",
    },
  },
  {
    appLocale,
    materialCard: {
      description: "Vergleiche Lebewesen, Viren und biologische Vielfalt.",
      title: "Lebenswissenschaften",
    },
    nodeKey: "high-school-science-life-sciences",
    programKey,
    translation: {
      routeSlug: "lebenswissenschaften",
      title: "Lebenswissenschaften",
    },
  },
  {
    appLocale,
    materialCard: {
      description: "Verfolge den Klimawandel in den Systemen der Erde.",
      title: "Geo- und Weltraumwissenschaften",
    },
    nodeKey: "high-school-science-earth-space-sciences",
    programKey,
    translation: {
      routeSlug: "geo-und-weltraumwissenschaften",
      title: "Geo- und Weltraumwissenschaften",
    },
  },
] as const satisfies readonly CurriculumLocaleSourceInput[];
