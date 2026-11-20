import { assert, it } from "@effect/vitest";
import { isGenericHeading } from "#nakafa-content/heading/generic";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

it("finds a scaffold label alone in every locale, whatever its case and spacing", () => {
  const cases: readonly [LessonVoiceLocale, string][] = [
    ["id", "Latihan"],
    ["id", "Kesalahan  yang Sering Terjadi"],
    ["en", "Worked Solutions"],
    ["en", "common mistakes"],
    ["de", "Übungsaufgaben"],
    ["ms", "Jalan Kerja"],
  ];
  for (const [locale, words] of cases) {
    assert.isTrue(isGenericHeading(locale, words), words);
  }
});

it("finds a section about the visual instead of the topic", () => {
  assert.isTrue(isGenericHeading("id", "Visualisasi Interaktif Sudut Pusat"));
  assert.isTrue(isGenericHeading("en", "How to Read the Visualization"));
  assert.isTrue(isGenericHeading("de", "Interaktive Visualisierung"));
  assert.isTrue(isGenericHeading("ms", "Cara Membaca Visualisasi Graf"));
});

it("keeps a scaffold word that names its topic", () => {
  const cases: readonly [LessonVoiceLocale, string][] = [
    ["id", "Latihan Arsiran Daerah"],
    ["en", "Practice on Rotations"],
    ["de", "Übungen zur Spiegelung"],
    ["ms", "Latihan Pantulan Titik"],
    ["id", "Visualisasi Data Cuaca"],
  ];
  for (const [locale, words] of cases) {
    assert.isFalse(isGenericHeading(locale, words), words);
  }
});
