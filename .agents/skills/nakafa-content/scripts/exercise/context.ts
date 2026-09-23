import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

const SECTION_HEADING_PATTERN = /^#{2,6}\s+.+$/u;
const HEADING_SEPARATOR_PATTERN = /\s/u;
const EXERCISE_HEADING_PATTERNS: Record<LessonVoiceLocale, RegExp> = {
  de: /^(?:Verständnis prüfen|Überprüfe dein Verständnis|Übungen mit vollständigen Lösungen|Aufgaben zum Rationalisieren|Aufgaben|Übung|Übungen|Übungsaufgaben|Erste Übung|Zweite Übung)$/iu,
  en: /^(?:Check Your Understanding|Practice with Complete Solutions|Rationalization Exercises|Exercise|Exercises|Practice|Practice Problems|First Exercise|Second Exercise)$/iu,
  id: /^(?:Cek Pemahaman|Periksa Pemahamanmu|Latihan dengan Pembahasan Lengkap|Latihan Merasionalkan|Latihan|Latihan Mandiri|Latihan Soal|Latihan Pertama|Latihan Kedua)$/iu,
};

const SOLUTION_HEADING_PATTERNS: Record<LessonVoiceLocale, RegExp> = {
  de: /^(?:Lösung(?:en)?|Ausführliche Lösung(?:en)?|Ausgearbeitete Lösungen|Lösungen zum Rationalisieren von Nennern|Lösung zur (?:ersten|zweiten) Übung)$/iu,
  en: /^(?:Solutions for Rationalizing Denominators|Answer Key|Worked Solutions?|Solutions?|Solution to (?:First|Second) Exercise)$/iu,
  id: /^(?:Penyelesaian|Pembahasan(?: Lengkap| Terperinci| Rasionalisasi Penyebut)?|Kunci Jawaban(?: Latihan (?:Pertama|Kedua))?)$/iu,
};

/** Recognizes an explicit exercise title without matching conceptual headings. */
export function isExerciseHeading(locale: LessonVoiceLocale, label: string) {
  return EXERCISE_HEADING_PATTERNS[locale].test(label.trim());
}

/** Recognizes authored answer labels whose parent is an exercise section. */
export function isSolutionHeading(locale: LessonVoiceLocale, label: string) {
  return SOLUTION_HEADING_PATTERNS[locale].test(label.trim());
}

/** Collects lines inside an explicit exercise section. */
export function exerciseSectionLines(
  locale: LessonVoiceLocale,
  source: string
): ReadonlySet<number> {
  const result = new Set<number>();
  let exerciseDepth: number | undefined;
  for (const [lineIndex, line] of source.split("\n").entries()) {
    if (SECTION_HEADING_PATTERN.test(line)) {
      const depth = line.search(HEADING_SEPARATOR_PATTERN);
      const label = line.slice(depth).trim();
      if (exerciseDepth !== undefined && depth <= exerciseDepth) {
        exerciseDepth = undefined;
      }
      if (isExerciseHeading(locale, label)) {
        exerciseDepth = depth;
      }
      continue;
    }
    if (exerciseDepth !== undefined) {
      result.add(lineIndex + 1);
    }
  }
  return result;
}
