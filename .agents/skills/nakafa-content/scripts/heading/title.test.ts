import { assert, it } from "@effect/vitest";
import type { OutlineHeading } from "#nakafa-content/heading/outline";
import { findTitleFindings, foldLabel } from "#nakafa-content/heading/title";

/** Builds one H2 at a line. */
function heading(words: string, line: number): OutlineHeading {
  return { depth: 2, excerpt: words, label: words, line, words };
}

it("folds case, accents, punctuation, and spacing away", () => {
  assert.strictEqual(foldLabel("  Übung: Sudut-Pusat! "), "ubung sudut pusat");
});

it("blocks a heading that repeats the title and reviews one that contains it", () => {
  const findings = findTitleFindings("Sistem Pertidaksamaan Linear", [
    heading("Sistem pertidaksamaan linear", 3),
    heading("Daerah Sistem Pertidaksamaan Linear", 7),
    heading("Pertidaksamaan Linear", 11),
  ]);

  assert.deepStrictEqual(
    findings.map(({ blocking, line, rule }) => [rule, blocking, line]),
    [
      ["heading-title", true, 3],
      ["heading-title", false, 7],
    ]
  );
});

it("reviews no contained title shorter than three words, and reads no empty title", () => {
  assert.deepStrictEqual(
    findTitleFindings("Vektor Satuan", [heading("Panjang Vektor Satuan", 1)]),
    []
  );
  assert.deepStrictEqual(findTitleFindings("", [heading("Anything", 1)]), []);
});
