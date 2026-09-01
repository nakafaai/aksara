import type { LessonVoiceLocale } from "#nakafa-content/voice-types";

const SECTION_HEADING_PATTERN = /^(#{2,6})\s+(.+)$/u;
const EXERCISE_HEADING_PATTERNS: Record<LessonVoiceLocale, RegExp> = {
  de: /^(?:Aufgaben|Übung|Übungen|Übungsaufgaben)$/iu,
  en: /^(?:Exercise|Exercises|Practice|Practice Problems)$/iu,
  id: /^(?:Latihan|Latihan Mandiri|Latihan Soal)$/iu,
};

/** Collects lines inside an explicit exercise section. */
export function exerciseSectionLines(
  locale: LessonVoiceLocale,
  source: string
): ReadonlySet<number> {
  const result = new Set<number>();
  let exerciseDepth: number | undefined;
  for (const [lineIndex, line] of source.split("\n").entries()) {
    const heading = SECTION_HEADING_PATTERN.exec(line);
    if (heading) {
      const [, marker, label] = heading;
      if (!(marker && label)) {
        continue;
      }
      const depth = marker.length;
      if (exerciseDepth !== undefined && depth <= exerciseDepth) {
        exerciseDepth = undefined;
      }
      if (EXERCISE_HEADING_PATTERNS[locale].test(label.trim())) {
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
