import { HashSet } from "effect";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/**
 * The scaffold labels that name no topic, per locale, written in lower case.
 * They read the same in every lesson, so a learner scanning the outline learns
 * nothing from them and a search engine finds no topic in them.
 */
const GENERIC_LABELS: Record<LessonVoiceLocale, HashSet.HashSet<string>> = {
  de: HashSet.make(
    "aufgaben",
    "ausführliche lösung",
    "ausführliche lösungen",
    "ausgearbeitete lösungen",
    "beispiel",
    "beispiele",
    "die visualisierung lesen",
    "fazit",
    "häufige fehler",
    "lösung",
    "lösungen",
    "typische fehler",
    "übung",
    "übungen",
    "übungsaufgabe",
    "übungsaufgaben",
    "überprüfe dein verständnis",
    "verständnis prüfen",
    "zusammenfassung"
  ),
  en: HashSet.make(
    "answer key",
    "answers",
    "check your understanding",
    "common errors",
    "common mistakes",
    "conclusion",
    "example",
    "examples",
    "exercise",
    "exercises",
    "how to read the visualization",
    "practice",
    "practice problems",
    "solution",
    "solutions",
    "summary",
    "worked example",
    "worked examples",
    "worked solution",
    "worked solutions"
  ),
  id: HashSet.make(
    "cara membaca visualisasi",
    "cek pemahaman",
    "contoh",
    "contoh soal",
    "kesalahan umum",
    "kesalahan yang sering terjadi",
    "kesimpulan",
    "kunci jawaban",
    "latihan",
    "latihan mandiri",
    "latihan soal",
    "pembahasan",
    "pembahasan lengkap",
    "pembahasan terperinci",
    "penyelesaian",
    "periksa pemahamanmu",
    "rangkuman",
    "ringkasan",
    "uji pemahaman"
  ),
  ms: HashSet.make(
    "contoh",
    "contoh soalan",
    "jalan kerja",
    "jawapan",
    "kesilapan lazim",
    "kesimpulan",
    "kunci jawapan",
    "latihan",
    "latihan pengukuhan",
    "penyelesaian",
    "ringkasan",
    "rumusan",
    "semak kefahaman",
    "semak kefahaman kamu",
    "skema jawapan",
    "soalan latihan",
    "uji kefahaman kamu"
  ),
};

/**
 * A section about the visual instead of the topic. A visual belongs inside the
 * section whose idea it models, and its own description says how to read it.
 */
const VISUAL_SECTION_PATTERNS: Record<LessonVoiceLocale, RegExp> = {
  de: /^(?:interaktive visualisierung|die visualisierung lesen)(?:\s|$)/u,
  en: /^(?:interactive visualization|how to read the visualization)(?:\s|$)/u,
  id: /^(?:visualisasi interaktif|cara membaca visualisasi)(?:\s|$)/u,
  ms: /^(?:visualisasi interaktif|cara membaca visualisasi)(?:\s|$)/u,
};

const WHITESPACE = /\s+/gu;

/**
 * Tells whether a heading is only a scaffold label, such as `Latihan` or
 * `Common Mistakes`, or names the visual instead of the topic.
 */
export function isGenericHeading(
  locale: LessonVoiceLocale,
  words: string
): boolean {
  const label = words.toLowerCase().replace(WHITESPACE, " ").trim();
  return (
    HashSet.has(GENERIC_LABELS[locale], label) ||
    VISUAL_SECTION_PATTERNS[locale].test(label)
  );
}
