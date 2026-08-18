import type { CurriculumLocaleSourceInput } from "#corpus/curriculum/locale-source";

const appLocale = "de";
const programKey = "singapore-moe";
const displayGroup = { title: "Schulstufen" };

/** Reviewed German copy for the Singapore MOE curriculum tree. */
export const singaporeMoeGermanCurriculum = [
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
    nodeKey: "secondary",
    programKey,
    translation: { routeSlug: "sekundarstufe", title: "Sekundarstufe" },
  },
  {
    appLocale,
    nodeKey: "secondary-mathematics",
    programKey,
    translation: { routeSlug: "mathematik", title: "Mathematik" },
  },
  {
    appLocale,
    materialCard: {
      description: "Vertiefe Algebra anhand von Gleichungen und Potenzen.",
      title: "Zahlen und Algebra",
    },
    nodeKey: "secondary-mathematics-number-algebra",
    programKey,
    translation: {
      routeSlug: "zahlen-und-algebra",
      title: "Zahlen und Algebra",
    },
  },
  {
    appLocale,
    materialCard: {
      description: "Nutze Formen, Daten und Zufall in Sachaufgaben.",
      title: "Geometrie, Statistik und Wahrscheinlichkeit",
    },
    nodeKey: "secondary-mathematics-geometry-statistics",
    programKey,
    translation: {
      routeSlug: "geometrie-statistik-und-wahrscheinlichkeit",
      title: "Geometrie, Statistik und Wahrscheinlichkeit",
    },
  },
  {
    appLocale,
    nodeKey: "secondary-additional-mathematics",
    programKey,
    translation: {
      routeSlug: "vertiefende-mathematik",
      title: "Vertiefende Mathematik",
    },
  },
  {
    appLocale,
    materialCard: {
      description: "Verbinde Funktionen mit Änderungsraten und Summen.",
      title: "Funktionen und Analysis",
    },
    nodeKey: "secondary-additional-mathematics-functions-calculus",
    programKey,
    translation: {
      routeSlug: "funktionen-und-analysis",
      title: "Funktionen und Analysis",
    },
  },
  {
    appLocale,
    nodeKey: "secondary-science",
    programKey,
    translation: {
      routeSlug: "naturwissenschaften",
      title: "Naturwissenschaften",
    },
  },
  {
    appLocale,
    materialCard: {
      description: "Miss Bewegung, Vektoren und Energie präzise.",
      title: "Physik",
    },
    nodeKey: "secondary-science-physics",
    programKey,
    translation: { routeSlug: "physik", title: "Physik" },
  },
  {
    appLocale,
    materialCard: {
      description: "Erkläre Stoffe und Reaktionen anhand von Beobachtungen.",
      title: "Chemie",
    },
    nodeKey: "secondary-science-chemistry",
    programKey,
    translation: { routeSlug: "chemie", title: "Chemie" },
  },
  {
    appLocale,
    materialCard: {
      description: "Untersuche Lebewesen und Veränderungen in Ökosystemen.",
      title: "Biologie",
    },
    nodeKey: "secondary-science-biology",
    programKey,
    translation: { routeSlug: "biologie", title: "Biologie" },
  },
  {
    appLocale,
    displayGroup,
    nodeKey: "pre-university",
    programKey,
    translation: {
      routeSlug: "studienvorbereitung",
      title: "Studienvorbereitung",
    },
  },
] as const satisfies readonly CurriculumLocaleSourceInput[];
