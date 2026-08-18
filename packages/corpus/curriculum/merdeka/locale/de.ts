import type { CurriculumLocaleSourceInput } from "#corpus/curriculum/locale-source";

const appLocale = "de";
const programKey = "merdeka";

/** Builds one reviewed German curriculum node without hiding its stable key. */
function node(
  nodeKey: string,
  routeSlug: string,
  title: string,
  displayGroup?: string
) {
  return {
    appLocale,
    displayGroup:
      displayGroup === undefined ? undefined : { title: displayGroup },
    nodeKey,
    programKey,
    translation: { routeSlug, title },
  } satisfies CurriculumLocaleSourceInput;
}

/** Builds one reviewed German curriculum node with learner-facing card copy. */
function card(
  nodeKey: string,
  routeSlug: string,
  title: string,
  description: string
) {
  return {
    appLocale,
    materialCard: { description, title },
    nodeKey,
    programKey,
    translation: { routeSlug, title },
  } satisfies CurriculumLocaleSourceInput;
}

/** Reviewed German copy for the complete Kurikulum Merdeka curriculum tree. */
export const merdekaGermanCurriculum = [
  node("class-1", "klasse-1", "Klasse 1", "Grundschule (SD)"),
  node("class-2", "klasse-2", "Klasse 2", "Grundschule (SD)"),
  node("class-3", "klasse-3", "Klasse 3", "Grundschule (SD)"),
  node("class-4", "klasse-4", "Klasse 4", "Grundschule (SD)"),
  node("class-5", "klasse-5", "Klasse 5", "Grundschule (SD)"),
  node("class-6", "klasse-6", "Klasse 6", "Grundschule (SD)"),
  node("class-7", "klasse-7", "Klasse 7", "Sekundarstufe I (SMP)"),
  node("class-8", "klasse-8", "Klasse 8", "Sekundarstufe I (SMP)"),
  node("class-9", "klasse-9", "Klasse 9", "Sekundarstufe I (SMP)"),
  node("class-10", "klasse-10", "Klasse 10", "Sekundarstufe II (SMA)"),
  node("class-10-biology", "biologie", "Biologie"),
  card(
    "class-10-biology-biodiversity",
    "vielfalt-der-lebewesen",
    "Vielfalt der Lebewesen",
    "Untersuche Vielfalt, Ökosysteme, Bakterien und Pilze."
  ),
  card(
    "class-10-biology-climate-change",
    "klimawandel",
    "Klimawandel",
    "Untersuche Aktivitäten, die Wärme in der Luft halten."
  ),
  card(
    "class-10-biology-virus-role",
    "viren-und-ihre-rolle",
    "Viren und ihre Rolle",
    "Verfolge, wie Viren sich vermehren."
  ),
  node("class-10-chemistry", "chemie", "Chemie"),
  card(
    "class-10-chemistry-basic-chemistry-laws",
    "grundgesetze-der-chemie",
    "Grundgesetze der Chemie",
    "Erkenne chemische Veränderungen an ihren Merkmalen."
  ),
  card(
    "class-10-chemistry-green-chemistry",
    "gruene-chemie",
    "Grüne Chemie",
    "Bewerte Reaktionen anhand der Prinzipien grüner Chemie."
  ),
  card(
    "class-10-chemistry-structure-matter",
    "atombau",
    "Atombau",
    "Nutze Atommodelle, um Stoffe zu verstehen."
  ),
  node("class-10-mathematics", "mathematik", "Mathematik"),
  card(
    "class-10-mathematics-exponential-logarithm",
    "potenzen-und-logarithmen",
    "Potenzen und Logarithmen",
    "Leite Potenzen aus wiederholter Multiplikation ab."
  ),
  card(
    "class-10-mathematics-linear-equation-inequality",
    "lineare-gleichungen-und-ungleichungen",
    "Lineare Gleichungen und Ungleichungen",
    "Löse lineare Zusammenhänge mit algebraischen Verfahren."
  ),
  card(
    "class-10-mathematics-probability",
    "wahrscheinlichkeit",
    "Wahrscheinlichkeit",
    "Nutze die Additionsregel für Wahrscheinlichkeiten."
  ),
  card(
    "class-10-mathematics-quadratic-function",
    "quadratische-funktionen",
    "Quadratische Funktionen",
    "Lies Nullstellen und Veränderungen an Parabeln ab."
  ),
  card(
    "class-10-mathematics-sequence-series",
    "folgen-und-reihen",
    "Folgen und Reihen",
    "Bestimme Muster, Glieder und Summen."
  ),
  card(
    "class-10-mathematics-statistics-foundations",
    "grundlagen-der-statistik",
    "Statistik",
    "Wähle passende Lageparameter für einen Datensatz."
  ),
  card(
    "class-10-mathematics-trigonometry",
    "trigonometrie",
    "Trigonometrie",
    "Ordne Dreiecksseiten den passenden Verhältnissen zu."
  ),
  card(
    "class-10-mathematics-vector-operations",
    "vektorrechnung",
    "Vektorrechnung",
    "Arbeite mit Vektorschreibweise, Betrag und Richtung."
  ),
  node("class-10-physics", "physik", "Physik"),
  card(
    "class-10-physics-measurement",
    "messen-im-naturwissenschaftlichen-arbeiten",
    "Messen",
    "Verwende Einheiten und Messgeräte sachgerecht."
  ),
  card(
    "class-10-physics-renewable-energy",
    "erneuerbare-energien",
    "Erneuerbare Energien",
    "Vergleiche Energiequellen und ihre Auswirkungen."
  ),
  node("class-11", "klasse-11", "Klasse 11", "Sekundarstufe II (SMA)"),
  node("class-11-mathematics", "mathematik", "Mathematik"),
  card(
    "class-11-mathematics-circle",
    "kreis",
    "Kreis",
    "Vergleiche Mittelpunkts- und Umfangswinkel."
  ),
  card(
    "class-11-mathematics-complex-number",
    "komplexe-zahlen",
    "Komplexe Zahlen",
    "Addiere komplexe Zahlen und deute sie geometrisch."
  ),
  card(
    "class-11-mathematics-function-composition-inverse-function",
    "funktionskomposition-und-umkehrfunktion",
    "Funktionskomposition und Umkehrfunktion",
    "Verknüpfe Funktionen mit passenden Definitionsbereichen."
  ),
  card(
    "class-11-mathematics-function-modeling",
    "funktionsmodellierung",
    "Funktionsmodellierung",
    "Modelliere das Verhalten von Betragsfunktionen."
  ),
  card(
    "class-11-mathematics-geometric-transformation",
    "geometrische-transformationen",
    "Geometrische Transformationen",
    "Verbinde geometrische Transformationen mit Matrizen."
  ),
  card(
    "class-11-mathematics-matrix",
    "matrizen",
    "Matrizen",
    "Berechne Determinanten mithilfe von Minoren."
  ),
  card(
    "class-11-mathematics-polynomial",
    "polynome",
    "Polynome",
    "Fasse gleichartige Terme in Polynomen zusammen."
  ),
  card(
    "class-11-mathematics-statistics-regression",
    "regressionsanalyse",
    "Regressionsanalyse",
    "Lies ab, welchen Anteil der Streuung ein Modell erklärt."
  ),
  node("class-11-physics", "physik", "Physik"),
  card(
    "class-11-physics-kinematics",
    "kinematik",
    "Kinematik",
    "Verfolge Ort, Geschwindigkeit und Beschleunigung."
  ),
  card(
    "class-11-physics-vector",
    "vektoren-in-der-physik",
    "Vektoren in der Physik",
    "Nutze Vektorrichtungen in Bewegungsaufgaben."
  ),
  node("class-12", "klasse-12", "Klasse 12", "Sekundarstufe II (SMA)"),
  node("class-12-mathematics", "mathematik", "Mathematik"),
  card(
    "class-12-mathematics-analytic-geometry",
    "analytische-geometrie",
    "Analytische Geometrie",
    "Leite Kreisgleichungen aus der Geometrie her."
  ),
  card(
    "class-12-mathematics-circle-arc-sector",
    "kreisboegen-und-kreissektoren",
    "Kreisbögen und Kreissektoren",
    "Verbinde Bogenlänge, Winkel und Sektorfläche."
  ),
  card(
    "class-12-mathematics-combinatorics",
    "kombinatorik",
    "Kombinatorik",
    "Entwickle Potenzen mit Binomialkoeffizienten."
  ),
  card(
    "class-12-mathematics-data-analysis-probability",
    "datenanalyse-und-wahrscheinlichkeit",
    "Datenanalyse und Wahrscheinlichkeit",
    "Modelliere wiederholte Erfolge mit Wahrscheinlichkeiten."
  ),
  card(
    "class-12-mathematics-derivative-function",
    "ableitungen",
    "Ableitungen",
    "Nutze Ableitungen für Änderungsraten und Extremwerte."
  ),
  card(
    "class-12-mathematics-function-transformation",
    "funktionstransformationen",
    "Funktionstransformationen",
    "Verschiebe, strecke und spiegle Funktionsgraphen."
  ),
  card(
    "class-12-mathematics-integral",
    "integrale",
    "Integrale",
    "Bestimme Flächeninhalte mit bestimmten Integralen."
  ),
  card(
    "class-12-mathematics-limit",
    "grenzwerte",
    "Grenzwerte",
    "Untersuche Veränderungen mithilfe von Grenzwerten."
  ),
] as const;
