import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { curriculumNamespace } from "@nakafa/aksara-contracts/program/curriculum";
import { materialPublicNamespace } from "@nakafa/aksara-contracts/projection/material";

const KMK_STANDARDS =
  "https://www.kmk.org/bildungsministerkonferenz/bildungsthemen/bildungsstandards.html";
const LEHRPLAN_PLUS = "https://www.lehrplanplus.bayern.de/seite/lehrplanplus";
const KMK_MATHEMATICS =
  "https://www.kmk.org/fileadmin/Dateien/veroeffentlichungen_beschluesse/2022/2022_06_23-Bista-ESA-MSA-Mathe.pdf";
const KMK_SCIENCE =
  "https://www.kmk.org/fileadmin/Dateien/pdf/Bildung/Qualitaet/ImplBroschuere_BiSta_NATURWISSENSCHAFTEN_2024-06-06.pdf";
const LEHRPLAN_PLUS_AI =
  "https://www.lehrplanplus.bayern.de/fachlehrplan/fos/12/kuenstliche_intelligenz_informatik_u_technologie/abu";
const GERMAN_APP_LOCALE = AppLocaleSchema.make("de");

/** Reviewed German terminology for education, mathematics, and science. */
export const germanEducationGlossarySource = [
  {
    key: "artificial-intelligence-data-science",
    preferred: "Künstliche Intelligenz und Data Science",
    routeSlug: "ki-und-data-science",
    scope: "education",
    sourceUrl: LEHRPLAN_PLUS_AI,
  },
  {
    key: "curriculum",
    preferred: "Lehrplan",
    routeSlug: curriculumNamespace(GERMAN_APP_LOCALE),
    scope: "education",
    sourceUrl: LEHRPLAN_PLUS,
  },
  {
    key: "subject",
    preferred: "Fach",
    routeSlug: materialPublicNamespace(GERMAN_APP_LOCALE),
    scope: "education",
    sourceUrl: LEHRPLAN_PLUS,
  },
  {
    key: "grade-level",
    note: "Klasse bezeichnet nur dann die Lerngruppe, wenn die Quelle das meint.",
    preferred: "Jahrgangsstufe",
    scope: "education",
    sourceUrl: KMK_STANDARDS,
  },
  {
    key: "school-type",
    preferred: "Schulart",
    scope: "education",
    sourceUrl: KMK_STANDARDS,
  },
  {
    key: "learning-area",
    preferred: "Lernbereich",
    scope: "education",
    sourceUrl: LEHRPLAN_PLUS,
  },
  {
    key: "competency-expectation",
    preferred: "Kompetenzerwartung",
    scope: "education",
    sourceUrl: LEHRPLAN_PLUS,
  },
  {
    key: "learning-material",
    note: "Unterrichtsmaterial bleibt Angeboten für Lehrkräfte vorbehalten.",
    preferred: "Lernmaterial",
    scope: "education",
    sourceUrl: LEHRPLAN_PLUS,
  },
  {
    key: "lesson",
    note: "Lerneinheit passt besser, wenn der Inhalt in sich abgeschlossen ist.",
    preferred: "Lektion",
    scope: "education",
    sourceUrl: LEHRPLAN_PLUS,
  },
  {
    key: "unit",
    preferred: "Einheit",
    scope: "education",
    sourceUrl: LEHRPLAN_PLUS,
  },
  {
    key: "topic",
    preferred: "Thema",
    scope: "education",
    sourceUrl: LEHRPLAN_PLUS,
  },
  {
    key: "mathematics",
    preferred: "Mathematik",
    routeSlug: "mathematik",
    scope: "mathematics",
    sourceUrl: KMK_MATHEMATICS,
  },
  {
    key: "algebra-and-graphs",
    preferred: "Algebra und Graphen",
    scope: "mathematics",
    sourceUrl: KMK_MATHEMATICS,
  },
  {
    key: "geometry-and-measurement",
    preferred: "Geometrie sowie Größen und Messen",
    scope: "mathematics",
    sourceUrl: KMK_MATHEMATICS,
  },
  {
    key: "probability-and-statistics",
    preferred: "Wahrscheinlichkeitsrechnung und Statistik",
    scope: "mathematics",
    sourceUrl: KMK_MATHEMATICS,
  },
  {
    key: "functions-and-calculus",
    note: "Kalkulus ist für deutsche Schulinhalte nicht die natürliche Bezeichnung.",
    preferred: "Funktionen und Analysis",
    scope: "mathematics",
    sourceUrl: KMK_MATHEMATICS,
  },
  {
    key: "function-composition",
    preferred: "Verkettung von Funktionen",
    scope: "mathematics",
    sourceUrl: KMK_MATHEMATICS,
  },
  {
    key: "inverse-functions",
    preferred: "Umkehrfunktionen",
    scope: "mathematics",
    sourceUrl: KMK_MATHEMATICS,
  },
  {
    key: "derivatives-and-integrals",
    preferred: "Ableitungen und Integrale",
    scope: "mathematics",
    sourceUrl: KMK_MATHEMATICS,
  },
  {
    key: "limits",
    preferred: "Grenzwerte",
    scope: "mathematics",
    sourceUrl: KMK_MATHEMATICS,
  },
  {
    key: "polynomial-functions",
    preferred: "ganzrationale Funktionen",
    scope: "mathematics",
    sourceUrl: KMK_MATHEMATICS,
  },
  {
    key: "analytic-geometry",
    preferred: "Analytische Geometrie",
    scope: "mathematics",
    sourceUrl: KMK_MATHEMATICS,
  },
  {
    key: "vectors",
    preferred: "Vektoren",
    scope: "mathematics",
    sourceUrl: KMK_MATHEMATICS,
  },
  {
    key: "natural-sciences",
    preferred: "Naturwissenschaften",
    scope: "science",
    sourceUrl: KMK_SCIENCE,
  },
  {
    key: "biology",
    preferred: "Biologie",
    routeSlug: "biologie",
    scope: "science",
    sourceUrl: KMK_SCIENCE,
  },
  {
    key: "chemistry",
    preferred: "Chemie",
    routeSlug: "chemie",
    scope: "science",
    sourceUrl: KMK_SCIENCE,
  },
  {
    key: "physics",
    preferred: "Physik",
    routeSlug: "physik",
    scope: "science",
    sourceUrl: KMK_SCIENCE,
  },
  {
    key: "matter-and-reactions",
    preferred: "Stoffe und chemische Reaktionen",
    scope: "science",
    sourceUrl: KMK_SCIENCE,
  },
];
