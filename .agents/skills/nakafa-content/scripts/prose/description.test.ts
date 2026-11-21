import { assert, describe, it } from "@effect/vitest";
import { Option } from "effect";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import {
  extractMetadataDescription,
  findDescriptionFindings,
  findMetadataDescriptionIssues,
  forbiddenDescriptionCharacters,
  forbiddenDescriptionPrefix,
} from "#nakafa-content/prose/description";

/** Wraps one description expression in a lesson metadata export. */
function pageWith(expression: string): string {
  return `export const metadata = {\n  title: "Respirasi Sel",\n  description: ${expression},\n};\n\n## Pembuka\n\nParagraf pembuka.\n`;
}

describe("extractMetadataDescription", () => {
  it("reads literal, static template, and concatenated descriptions", () => {
    const literal = parseLessonMdx(
      pageWith('"Pelajari respirasi sel, dari glikolisis sampai ATP."')
    );
    assert.deepStrictEqual(
      extractMetadataDescription(literal),
      Option.some({
        column: 3,
        line: 3,
        value: "Pelajari respirasi sel, dari glikolisis sampai ATP.",
      })
    );

    const template = parseLessonMdx(
      pageWith("`Learn cell respiration, step by step.`")
    );
    assert.deepStrictEqual(
      Option.map(extractMetadataDescription(template), ({ value }) => value),
      Option.some("Learn cell respiration, step by step.")
    );

    const concat = parseLessonMdx(
      pageWith('"Understand enzymes, " + "rate, and heat."')
    );
    assert.deepStrictEqual(
      Option.map(extractMetadataDescription(concat), ({ value }) => value),
      Option.some("Understand enzymes, rate, and heat.")
    );
  });

  it("ignores dynamic or non-metadata exports", () => {
    for (const source of [
      'import { x } from "./x";\nexport const helper = x;\n',
      "export function helper() { return 1; }\nexport const metadata = { ...extra, title: 'A', description: dynamicValue };\n",
      `export const value = 'x';\nexport const metadata = { description: \`A \${value}\` };\n`,
      "export const metadata = { description: dynamicValue };\n",
      "export const metadata = 'not-an-object';\n",
      "## No metadata\n\nPlain body.\n",
    ]) {
      assert.isTrue(
        Option.isNone(extractMetadataDescription(parseLessonMdx(source))),
        source
      );
    }
    const twoExports = parseLessonMdx(
      'export const metadata = { description: "First." };\nexport const extra = 1;\n'
    );
    assert.deepStrictEqual(
      Option.map(extractMetadataDescription(twoExports), ({ value }) => value),
      Option.some("First.")
    );
  });
});

describe("findDescriptionFindings", () => {
  it("accepts clean comma-and-period prose across all four locales", () => {
    const valid = [
      '"Learn how enzymes speed up reactions, why heat bends them, and what you\'ll see in real cells."',
      '"Pelajari cara sel menghasilkan ATP dari glukosa, mulai dari rata-rata laju reaksi sampai fermentasi."',
      '"Fahami cara sel menghasilkan tenaga daripada glukosa, termasuk perbandingan respirasi aerob dan anaerob."',
      '"Erfahre, wie Enzyme Reaktionen beschleunigen und wie die x-Achse den Verlauf zeigt."',
    ];
    for (const expression of valid) {
      const source = pageWith(expression);
      assert.deepStrictEqual(
        findDescriptionFindings(parseLessonMdx(source)),
        [],
        expression
      );
      assert.deepStrictEqual(
        findMetadataDescriptionIssues(source),
        [],
        expression
      );
    }
  });

  it("rejects colons, semicolons, parentheses, brackets, slashes, quotes, exclamation, question, and dashes", () => {
    const cases = [
      ['"Enzymes: speed and shape."', [":"]],
      ['"Enzymes speed reactions; heat breaks them."', [";"]],
      ['"Enzymes (proteins) speed reactions."', ["(", ")"]],
      ['"Enzymes [biocatalysts] speed reactions."', ["[", "]"]],
      ['"Compare aerobic/anaerobic paths."', ["/"]],
      ['"Discover how cells breathe!"', ["!"]],
      ['"How do cells make energy?"', ["?"]],
      ["\"See 'active' sites in action.\"", ["'"]],
      ['"See \\"active\\" sites in action."', ['"']],
      ['"Enzymes \u2014 fast catalysts."', ["\u2014"]],
      ['"Enzymes - fast catalysts."', ["-"]],
      ['"Enzymes -- fast catalysts."', ["-"]],
    ] as const;
    for (const [expression, expectedChars] of cases) {
      const source = pageWith(expression);
      const tree = parseLessonMdx(source);
      const extracted = extractMetadataDescription(tree);
      assert.isTrue(Option.isSome(extracted));
      if (Option.isSome(extracted)) {
        assert.deepStrictEqual(
          forbiddenDescriptionCharacters(extracted.value.value),
          expectedChars,
          expression
        );
      }
      assert.deepStrictEqual(
        findDescriptionFindings(tree).map(({ blocking, rule }) => [
          rule,
          blocking,
        ]),
        [["metadata-description-punctuation", true]],
        expression
      );
    }
  });

  it("rejects curriculum and chapter prefixes across all four locales", () => {
    const prefixes = [
      ['"Form 4 Biology Chapter 7 covers respiration."', "Form 4"],
      ['"Nota Biologi Tingkatan 4 Bab 2 tentang sel."', "Nota"],
      ['"Tingkatan 5 Matematik tentang matriks."', "Tingkatan 5"],
      ['"Chapter 3 explains forces and motion."', "Chapter 3"],
      ['"Bab 2 membahas struktur sel."', "Bab 2"],
      ['"Kelas 11 Fisika membahas termodinamika."', "Kelas 11"],
      ['"Kelas VII IPA tentang gerak."', "Kelas VII"],
      ['"Klasse 10 Physik zu Bewegung."', "Klasse 10"],
      ['"Kapitel 4 erklärt Integrale."', "Kapitel 4"],
      ['"KSSM biology guide to cell transport."', "KSSM"],
    ] as const;
    for (const [expression, expectedPrefix] of prefixes) {
      const source = pageWith(expression);
      const tree = parseLessonMdx(source);
      const extracted = extractMetadataDescription(tree);
      assert.isTrue(Option.isSome(extracted));
      if (Option.isSome(extracted)) {
        assert.deepStrictEqual(
          forbiddenDescriptionPrefix(extracted.value.value),
          Option.some(expectedPrefix),
          expression
        );
      }
      assert.deepStrictEqual(
        findDescriptionFindings(tree).map(({ blocking, rule }) => [
          rule,
          blocking,
        ]),
        [["metadata-description-prefix", true]],
        expression
      );
    }
  });

  it("reports both prefix and punctuation issues together when both fail", () => {
    const source = pageWith(
      '"Form 4 Biology Chapter 7: cellular respiration."'
    );
    const issues = findMetadataDescriptionIssues(source);
    assert.deepStrictEqual(
      issues.map(({ line, rule }) => [line, rule]),
      [
        [3, "metadata-description-prefix"],
        [3, "metadata-description-punctuation"],
      ]
    );
  });

  it("returns empty issues when a file has no metadata description", () => {
    assert.deepStrictEqual(
      findDescriptionFindings(parseLessonMdx("## Heading\n\nBody.\n")),
      []
    );
    assert.deepStrictEqual(
      findMetadataDescriptionIssues("## Heading\n\nBody.\n"),
      []
    );
  });
});
