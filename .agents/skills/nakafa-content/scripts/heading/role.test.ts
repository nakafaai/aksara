import { assert, describe, it } from "@effect/vitest";
import type { OutlineHeading } from "#nakafa-content/heading/outline";
import { scaffoldTail, sectionRole } from "#nakafa-content/heading/role";
import type { LessonVoiceLocale } from "#nakafa-content/voice/types";

/** Builds one outline heading at a line. */
function heading(depth: number, words: string, line = 1): OutlineHeading {
  return { depth, excerpt: words, label: words, line, words };
}

describe("sectionRole", () => {
  it("names the scaffold role each locale's first words announce", () => {
    const cases: readonly [LessonVoiceLocale, string, string][] = [
      ["id", "Kesalahan Saat Mengarsir", "mistakes"],
      ["id", "Latihan Arsiran Daerah", "practice"],
      ["id", "Pembahasan Arsiran", "solutions"],
      ["id", "Contoh Menghitung Determinan", "examples"],
      ["id", "Ringkasan Arsiran", "summary"],
      ["en", "Common Mistakes about Rotations", "mistakes"],
      ["en", "Practice on Rotations", "practice"],
      ["en", "Rotation Practice", "practice"],
      ["en", "Worked Solutions for Rotations", "solutions"],
      ["en", "Example of a Rotation", "examples"],
      ["en", "Summary of Rotations", "summary"],
      ["de", "Typische Fehler beim Spiegeln", "mistakes"],
      ["de", "Übungen zur Spiegelung", "practice"],
      ["de", "Spiegelungsübungen", "practice"],
      ["de", "Ausführliche Lösungen zur Spiegelung", "solutions"],
      ["de", "Beispiel mit zwei Würfeln", "examples"],
      ["de", "Fazit zur Spiegelung", "summary"],
      ["ms", "Kesilapan Lazim Pantulan", "mistakes"],
      ["ms", "Soalan Latihan Pantulan", "practice"],
      ["ms", "Jalan Kerja Pantulan", "solutions"],
      ["ms", "Contoh Pengiraan", "examples"],
      ["ms", "Rumusan Pantulan", "summary"],
    ];
    for (const [locale, words, role] of cases) {
      assert.strictEqual(sectionRole(locale, heading(2, words)), role, words);
    }
  });

  it("reads a solution word that names a concept as a solution only below an H2", () => {
    assert.strictEqual(
      sectionRole("id", heading(2, "Penyelesaian Berupa Daerah")),
      "teaching"
    );
    assert.strictEqual(
      sectionRole("id", heading(3, "Penyelesaian")),
      "solutions"
    );
    assert.strictEqual(
      sectionRole("en", heading(2, "Solutions of Quadratic Equations")),
      "teaching"
    );
    assert.strictEqual(sectionRole("en", heading(3, "Solutions")), "solutions");
    assert.strictEqual(sectionRole("de", heading(3, "Lösung")), "solutions");
    assert.strictEqual(
      sectionRole("ms", heading(3, "Penyelesaian")),
      "solutions"
    );
  });

  it("names a topic heading teaching", () => {
    for (const words of [
      "Practical Uses",
      "Exemplary Cases",
      "Errorless Sums",
    ]) {
      assert.strictEqual(
        sectionRole("en", heading(2, words)),
        "teaching",
        words
      );
    }
  });
});

describe("scaffoldTail", () => {
  it("lists the scaffold sections after the last teaching section", () => {
    const tail = scaffoldTail("en", [
      heading(2, "Rotations Turn Points", 1),
      heading(2, "Common Mistakes about Rotations", 5),
      heading(2, "Rotation Centers", 9),
      heading(2, "Common Mistakes with Angles", 13),
      heading(2, "Practice on Rotations", 17),
      heading(3, "Worked Solutions", 21),
    ]);

    assert.deepStrictEqual(
      tail.map(({ heading: { line }, role }) => [role, line]),
      [
        ["mistakes", 13],
        ["practice", 17],
      ]
    );
  });

  it("lists none when the last section teaches, and every section when none does", () => {
    assert.deepStrictEqual(
      scaffoldTail("en", [
        heading(2, "Practice on Rotations"),
        heading(2, "Rotation Centers"),
      ]),
      []
    );
    assert.deepStrictEqual(
      scaffoldTail("en", [heading(2, "Exercises"), heading(2, "Summary")]).map(
        ({ role }) => role
      ),
      ["practice", "summary"]
    );
  });
});
