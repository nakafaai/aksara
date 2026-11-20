import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Option, Record as Rec } from "effect";
import {
  inDirectory,
  makeRepository,
  writeFiles,
} from "#scripts/check/fixture";
import { partReport, questionFolder, topHeadings } from "#scripts/check/parts";

/** A folder of FSP mathematics questions, whose items have parts. */
const FSP =
  "packages/corpus/question-bank/tryout/germany/fsp/mathematics/set-1";

/** An item module whose German version asks the given task. */
const itemModule = (task: string) =>
  `import type { ItemSource } from "#corpus/question-bank/item";\n\nconst item: ItemSource = {\n  versions: { de: ${task} },\n};\n\nexport default item;\n`;

/** An item module whose parts carry the given labels. */
const partsItem = (labels: readonly string[]) =>
  itemModule(
    `{ kind: "parts", parts: [${Arr.join(
      Arr.map(
        labels,
        (label) =>
          `{ expression: "x", kind: "mathEntry", label: "${label}", points: 1 }`
      ),
      ", "
    )}] }`
  );

describe("questionFolder", () => {
  it("names the folder of an item or a worked answer and nothing else", () => {
    expect(questionFolder(`${FSP}/question-1/item.ts`)).toEqual(
      Option.some(`${FSP}/question-1`)
    );
    expect(questionFolder(`${FSP}/question-12/answer.de.mdx`)).toEqual(
      Option.some(`${FSP}/question-12`)
    );
    expect(
      Arr.map(
        [`${FSP}/question-1/question.de.mdx`, `${FSP}/passage-1/item.ts`],
        (file) => Option.isNone(questionFolder(file))
      )
    ).toEqual([true, true]);
  });
});

describe("topHeadings", () => {
  it.effect("reads the part label of each top heading, or its whole text", () =>
    Effect.gen(function* () {
      expect(
        yield* topHeadings(
          "answer.de.mdx",
          "# a) Ableitung\n\n## Schritt\n\nWeil.\n\n# 1.2) Grenzwert\n\n# Lösung\n"
        )
      ).toEqual(["a", "1.2", "Lösung"]);
      expect(
        yield* Effect.flip(topHeadings("answer.de.mdx", "<Broken title="))
      ).toMatchObject({ _tag: "PageParseError", file: "answer.de.mdx" });
    })
  );
});

describe("partReport", () => {
  it.effect(
    "holds each answer of a changed item with parts to one top heading per part",
    () =>
      Effect.gen(function* () {
        const root = yield* makeRepository();
        const files = {
          [`${FSP}/question-1/item.ts`]: partsItem(["a", "b"]),
          [`${FSP}/question-1/answer.de.mdx`]:
            "# a) Ableitung\n\n## Schritt\n\nWeil.\n\n# b) Monotonie\n\nWeil.\n",
          [`${FSP}/question-1/answer.en.mdx`]:
            "# a) Derivative\n\nBecause.\n\n# Monotony\n\nBecause.\n",
          [`${FSP}/question-2/item.ts`]: partsItem(["1"]),
          [`${FSP}/question-2/answer.de.mdx`]: "Weil.\n",
          [`${FSP}/question-3/item.ts`]: itemModule(
            '{ kind: "numericEntry", value: "4" }'
          ),
          [`${FSP}/question-3/answer.de.mdx`]: "Weil.\n",
        };
        yield* writeFiles(root, files);
        const listed = Rec.keys(files);

        yield* inDirectory(
          root,
          partReport(listed, [
            `${FSP}/question-3/answer.de.mdx`,
            `${FSP}/question-4/item.ts`,
            `${FSP}/question-1/question.de.mdx`,
          ])
        );
        expect(
          yield* inDirectory(root, partReport(listed, listed)).pipe(Effect.flip)
        ).toMatchObject({
          _tag: "ExplanationPartError",
          findings: [
            {
              expected: ["a", "b"],
              file: `${FSP}/question-1/answer.en.mdx`,
              found: ["a", "Monotony"],
            },
            {
              expected: ["1"],
              file: `${FSP}/question-2/answer.de.mdx`,
              found: [],
            },
          ],
        });
      }).pipe(Effect.scoped, Effect.provide(NodeServices.layer))
  );
});
