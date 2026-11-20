import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

const SECTION_HEADING_PATTERN = /^#{2,6}\s+.+$/u;
const HEADING_SEPARATOR_PATTERN = /\s/u;
/**
 * Exercise headings: the exact labels the corpus used before the outline rules,
 * and the scaffold word followed by the topic it practises, such as
 * `Latihan Arsiran Daerah`, `Practice on Rotations`, or `Übungen zur Spiegelung`,
 * which the generic-heading rule asks for.
 */
const EXERCISE_HEADING_PATTERNS: Record<LessonVoiceLocale, RegExp> = {
  de: /^(?:Verständnis prüfen|Überprüfe dein Verständnis|Übungen mit vollständigen Lösungen|Aufgaben zum Rationalisieren|Aufgaben|Übung|Übungen|Übungsaufgaben|Erste Übung|Zweite Übung|(?:Übung(?:en|saufgaben)?|Aufgaben) (?:zu|zum|zur|für) \S.*|\S+übungen)$/iu,
  en: /^(?:Check Your Understanding|Practice with Complete Solutions|Rationalization Exercises|Exercise|Exercises|Practice|Practice Problems|First Exercise|Second Exercise|(?:Practice|Exercises?) (?:on|for) \S.*|\S.* (?:Practice|Exercises))$/iu,
  id: /^(?:Cek Pemahaman|Periksa Pemahamanmu|Latihan dengan Pembahasan Lengkap|Latihan Merasionalkan|Latihan|Latihan Mandiri|Latihan Soal|Latihan Pertama|Latihan Kedua|(?:Latihan|Uji Pemahaman) \S.*)$/iu,
  ms: /^(?:Semak Kefahaman|Uji Kefahaman Kamu|Latihan dengan Penyelesaian Lengkap|Latihan|Latihan Pengukuhan|Soalan Latihan|Latihan Pertama|Latihan Kedua|(?:Latihan|Soalan Latihan) \S.*)$/iu,
};

/**
 * Solution headings below an exercise: the exact labels the corpus used, and
 * the scaffold word followed by the topic, such as `Pembahasan Arsiran`,
 * `Solutions to Rotation Practice`, or `Lösungen zur Spiegelung`.
 */
const SOLUTION_HEADING_PATTERNS: Record<LessonVoiceLocale, RegExp> = {
  de: /^(?:Lösung(?:en)?|Ausführliche Lösung(?:en)?|Ausgearbeitete Lösungen|Durchgerechnete Lösung(?:en)?|Lösungen zum (?:Rationalisieren von Nennern|Vereinfachen von Wurzelausdrücken)|Lösung zur (?:ersten|zweiten) Übung|(?:Ausführliche |Ausgearbeitete )?Lösung(?:en)? (?:zu|zum|zur|für) \S.*)$/iu,
  en: /^(?:Solutions for (?:Rationalizing Denominators|Simplifying Radicals)|Answer Key|Answers|Worked Solutions?|Solutions?|Solution to (?:First|Second) Exercise|(?:Worked )?Solutions? (?:to|for) \S.*|Worked Solutions? \S.*|Answers to \S.*)$/iu,
  id: /^(?:Penyelesaian|Pembahasan(?: Lengkap| Terperinci| Rasionalisasi Penyebut| Penyederhanaan Bentuk Akar)?|Kunci Jawaban(?: Latihan (?:Pertama|Kedua))?|(?:Pembahasan|Kunci Jawaban) \S.*)$/iu,
  ms: /^(?:Penyelesaian(?: Lengkap| Terperinci| Latihan (?:Pertama|Kedua)| untuk (?:Merasionalkan Penyebut|Mempermudahkan Surd))?|Jalan Kerja|(?:(?:Skema|Kunci) )?Jawapan(?: Latihan (?:Pertama|Kedua))?|(?:Jalan Kerja|Penyelesaian|(?:Skema |Kunci )?Jawapan) \S.*)$/iu,
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
