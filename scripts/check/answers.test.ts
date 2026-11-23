import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Option, Record as Rec } from "effect";
import { answerLocation, answerStandardsReport } from "#scripts/check/answers";
import {
  inDirectory,
  makeRepository,
  writeFiles,
} from "#scripts/check/fixture";

const PHYSICS =
  "packages/corpus/question-bank/tryout/malaysia/spm/physics/set-1";
const FSP =
  "packages/corpus/question-bank/tryout/germany/fsp/mathematics/set-1";

const PARTS_ITEM = `import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "parts",
      parts: [{ expression: "x", kind: "mathEntry", label: "a", points: 1 }],
    },
  },
};

export default item;
`;

const VALID_SINGLE = Arr.join(
  [
    "# Diketahui",
    "",
    'Kecepatan awal <InlineMath math="v_0 = 0" /> dan percepatan <InlineMath math="a = 2\\text{ m/s}^2" />.',
    "",
    "# Ditanyakan",
    "",
    "Tentukan kecepatan benda setelah tiga detik.",
    "",
    "# Penyelesaian",
    "",
    "Hitung kecepatan akhir dengan persamaan gerak lurus berubah beraturan.",
    "",
    '<BlockMath math="v = v_0 + at = 0 + 2(3) = 6" />',
    "",
    "> Percepatan konstan menambah kecepatan secara tetap pada setiap detik.",
    "",
    "# Jawaban",
    "",
    'Kecepatan benda adalah <InlineMath math="6\\text{ m/s}" />.',
  ],
  "\n"
);

const VALID_PARTS = Arr.join(
  [
    "# Teil a",
    "",
    "## Gegeben",
    "",
    'Die Funktion hat den Faktor <InlineMath math="a = 2" />.',
    "",
    "## Gesucht",
    "",
    "Bestimme die erste Ableitung.",
    "",
    "## Lösung",
    "",
    "### Ableitungsregel anwenden",
    "",
    "Leite jeden Summanden einzeln ab.",
    "",
    '<BlockMath math="f\'(x) = 4x" />',
    "",
    "> Jeder konstante Faktor bleibt beim Ableiten unverändert erhalten.",
    "",
    "## Antwort",
    "",
    'Die Ableitung lautet <InlineMath math="4x" />.',
  ],
  "\n"
);

describe("answerLocation", () => {
  it("extracts folder and locale from try-out answers and ignores other files", () => {
    expect(answerLocation(`${PHYSICS}/question-1/answer.id.mdx`)).toEqual(
      Option.some({ folder: `${PHYSICS}/question-1`, locale: "id" })
    );
    expect(
      Option.isNone(answerLocation(`${PHYSICS}/question-1/answer.xx.mdx`))
    ).toBe(true);
    expect(
      Option.isNone(answerLocation(`${PHYSICS}/question-1/question.id.mdx`))
    ).toBe(true);
  });
});

describe("answerStandardsReport", () => {
  it.effect(
    "passes valid single and multi-part answers and ignores untouched legacy answers",
    () =>
      Effect.gen(function* () {
        const root = yield* makeRepository();
        const files = {
          [`${PHYSICS}/question-1/answer.id.mdx`]: VALID_SINGLE,
          [`${PHYSICS}/question-2/answer.id.mdx`]: "# Legacy: old\n\nText.\n",
          [`${FSP}/question-1/item.ts`]: PARTS_ITEM,
          [`${FSP}/question-1/answer.de.mdx`]: VALID_PARTS,
        };
        yield* writeFiles(root, files);
        const listed = Rec.keys(files);

        yield* inDirectory(
          root,
          answerStandardsReport(listed, [
            `${PHYSICS}/question-1/answer.id.mdx`,
            `${FSP}/question-1/answer.de.mdx`,
            `${PHYSICS}/question-9/answer.id.mdx`,
          ])
        );
      }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );

  it.effect(
    "blocks missing headings, colons, missing blockquotes, bloated inline math, and walls of text on changed answers",
    () =>
      Effect.gen(function* () {
        const root = yield* makeRepository();
        const sixtyFive = Arr.join(Arr.replicate("kata", 65), " ");
        const ninety = Arr.join(Arr.replicate("kata", 90), " ");
        const files = {
          [`${PHYSICS}/question-1/answer.id.mdx`]: Arr.join(
            [
              "# Diketahui: salah",
              "",
              `Gunakan <InlineMath math="2x^2 + 5x - 3 = 0" />. ${ninety}.`,
            ],
            "\n"
          ),
          [`${PHYSICS}/question-2/answer.id.mdx`]: Arr.join(
            [
              "# Diketahui",
              "",
              `${sixtyFive}.`,
              "",
              "# Ditanyakan",
              "",
              "Nilai akhir.",
              "",
              "# Penyelesaian",
              "",
              "Hitung langsung.",
              "",
              "> Konsep inti tetap berlaku.",
              "",
              "# Jawaban",
              "",
              "Hasil empat.",
            ],
            "\n"
          ),
        };
        yield* writeFiles(root, files);
        const listed = Rec.keys(files);

        // Review-only wall-of-text (65 words) logs a warning and passes default gate.
        yield* inDirectory(
          root,
          answerStandardsReport(listed, [`${PHYSICS}/question-2/answer.id.mdx`])
        );

        const failed = yield* inDirectory(
          root,
          answerStandardsReport(listed, [`${PHYSICS}/question-1/answer.id.mdx`])
        ).pipe(Effect.flip);
        expect(failed._tag).toBe("ExplanationStandardsError");
        if (failed._tag === "ExplanationStandardsError") {
          expect(Arr.map(failed.findings, ({ rule }) => rule)).toEqual([
            "heading-symbol",
            "answer-heading-structure",
            "missing-blockquote",
            "bloated-inline-math",
            "wall-of-text",
          ]);
        }
      }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );

  it.effect(
    "reports parse errors cleanly when a changed answer has broken MDX",
    () =>
      Effect.gen(function* () {
        const root = yield* makeRepository();
        const file = `${PHYSICS}/question-1/answer.id.mdx`;
        yield* writeFiles(root, { [file]: "<Broken title=" });

        const failed = yield* inDirectory(
          root,
          answerStandardsReport([file], [file])
        ).pipe(Effect.flip);
        expect(failed).toMatchObject({ _tag: "PageParseError", file });
      }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );
});
