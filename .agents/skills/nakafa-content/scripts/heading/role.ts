import { Array as Arr, Option } from "effect";
import type { OutlineHeading } from "#nakafa-content/heading/outline";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/**
 * The job a section heading announces. Every role except `teaching` is a
 * scaffold: the same mistakes, examples, practice, solutions, and summary
 * sections that a template adds to every lesson whatever its topic.
 */
export type SectionRole =
  | "examples"
  | "mistakes"
  | "practice"
  | "solutions"
  | "summary"
  | "teaching";

/** The scaffold roles a heading's first words announce, checked in this order. */
const SCAFFOLD_ROLES = [
  "mistakes",
  "practice",
  "solutions",
  "examples",
  "summary",
] as const;

type ScaffoldRole = (typeof SCAFFOLD_ROLES)[number];

/**
 * The first words that announce each scaffold role, per locale. A solution
 * word that also names a concept, such as `Penyelesaian` (the solution set of
 * an equation) or `Solutions of`, announces solutions only below an H2.
 */
const ROLE_PATTERNS: Record<LessonVoiceLocale, Record<ScaffoldRole, RegExp>> = {
  de: {
    examples: /^(?:rechen|anwendungs)?beispiele?(?:\s|$)/u,
    mistakes:
      /^(?:(?:häufige|typische)\s+)?(?:fehler|fehlvorstellungen)(?:\s|$)/u,
    practice:
      /^(?:übung(?:en|saufgaben?)?|aufgaben|verständnis prüfen|überprüfe dein verständnis)(?:\s|$)|übungen$/u,
    solutions:
      /^(?:(?:ausführliche|ausgearbeitete|durchgerechnete)\s+lösung(?:en)?|lösung(?:en)?\s+(?:zu|zum|zur)\s)/u,
    summary: /^(?:zusammenfassung|fazit)(?:\s|$)/u,
  },
  en: {
    examples: /^(?:worked\s+)?examples?(?:\s|$)/u,
    mistakes:
      /^(?:(?:common|typical)\s+)?(?:mistakes|errors|misconceptions|pitfalls)(?:\s|$)/u,
    practice:
      /^(?:exercises?|practice|check your understanding)(?:\s|$)|\s(?:exercises|practice|practice problems)$/u,
    solutions:
      /^(?:worked\s+solutions?|answer key|answers|solutions?\s+(?:to|for)\s)/u,
    summary: /^(?:summary|conclusion|key takeaways)(?:\s|$)/u,
  },
  id: {
    examples: /^contoh(?:\s|$)/u,
    mistakes: /^(?:kesalahan|miskonsepsi)(?:\s|$)/u,
    practice:
      /^(?:latihan|soal latihan|uji pemahaman|cek pemahaman|periksa pemahaman)/u,
    solutions: /^(?:pembahasan|kunci jawaban)(?:\s|$)/u,
    summary: /^(?:ringkasan|rangkuman|kesimpulan)(?:\s|$)/u,
  },
  ms: {
    examples: /^contoh(?:\s|$)/u,
    mistakes: /^(?:kesilapan|miskonsepsi)(?:\s|$)/u,
    practice: /^(?:latihan|soalan latihan|semak kefahaman|uji kefahaman)/u,
    solutions: /^(?:jalan kerja|kunci jawapan|skema jawapan|jawapan)(?:\s|$)/u,
    summary: /^(?:ringkasan|rumusan|kesimpulan)(?:\s|$)/u,
  },
};

/** Solution words that also name a concept, so they count only below an H2. */
const SUBSECTION_SOLUTION_PATTERNS: Record<LessonVoiceLocale, RegExp> = {
  de: /^lösung(?:en)?(?:\s|$)/u,
  en: /^solutions?(?:\s|$)/u,
  id: /^penyelesaian(?:\s|$)/u,
  ms: /^penyelesaian(?:\s|$)/u,
};

const SECTION_DEPTH = 2;

/** Names the job one heading announces from its first words. */
export function sectionRole(
  locale: LessonVoiceLocale,
  heading: Pick<OutlineHeading, "depth" | "words">
): SectionRole {
  const label = heading.words.toLowerCase();
  const patterns = ROLE_PATTERNS[locale];
  const announced = Arr.findFirst(SCAFFOLD_ROLES, (role) =>
    patterns[role].test(label)
  );
  if (Option.isSome(announced)) {
    return announced.value;
  }
  return heading.depth > SECTION_DEPTH &&
    SUBSECTION_SOLUTION_PATTERNS[locale].test(label)
    ? "solutions"
    : "teaching";
}

/** One H2 section of a page's scaffold tail, with the role its heading announces. */
export interface TailSection {
  readonly heading: OutlineHeading;
  readonly role: SectionRole;
}

/**
 * The scaffold sections a page ends with: its last H2 sections after its last
 * teaching H2, in page order. A page whose last H2 teaches has none. This is
 * the fixed tail that a template gives every lesson.
 */
export function scaffoldTail(
  locale: LessonVoiceLocale,
  headings: readonly OutlineHeading[]
): readonly TailSection[] {
  const sections = Arr.map(
    Arr.filter(headings, ({ depth }) => depth === SECTION_DEPTH),
    (heading) => ({ heading, role: sectionRole(locale, heading) })
  );
  return Option.match(
    Arr.findLastIndex(sections, ({ role }) => role === "teaching"),
    {
      onNone: () => sections,
      onSome: (index) => sections.slice(index + 1),
    }
  );
}
