import { describe, expect, it } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";

import { decodeQuestionItemSource } from "#corpus/question-bank/item-source";

const sourcePath = CorpusSourcePathSchema.make(
  "packages/corpus/question-bank/example/item.ts"
);
const itemObject = `{
  "responses": {
    "en": {
      "kind": "single-choice",
      "options": [
        { "isCorrect": true, "label": \`A\` },
        { isCorrect: false, label: "B" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "A (ID)" },
        { isCorrect: false, label: "B (ID)" },
      ],
    },
  },
}`;
const typeImport =
  'import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";';
const declaration = `const item: QuestionItem = ${itemObject};`;
const exportAssignment = "export default item;";

/** Builds a complete item module around one syntax variant. */
function itemModule(
  selectedImport = typeImport,
  selectedDeclaration = declaration,
  selectedExport = exportAssignment
) {
  return `${selectedImport}\n${selectedDeclaration}\n${selectedExport}`;
}

/** Requires every invalid module to fail with the exact typed source error. */
function expectRejections(sources: readonly string[]) {
  return Effect.forEach(
    sources,
    (source) =>
      Effect.gen(function* () {
        const error = yield* decodeQuestionItemSource(source, sourcePath).pipe(
          Effect.flip
        );

        expect(error).toMatchObject({
          _tag: "QuestionItemError",
          sourcePath,
        });
      }),
    { discard: true }
  );
}

describe("question item source", () => {
  it.effect("decodes reviewed literal data without executing the module", () =>
    Effect.gen(function* () {
      const item = yield* decodeQuestionItemSource(itemModule(), sourcePath);

      expect(item).toEqual({
        responses: {
          en: {
            kind: "single-choice",
            options: [
              {
                isCorrect: true,
                label: "A",
              },
              {
                isCorrect: false,
                label: "B",
              },
            ],
          },
          id: {
            kind: "single-choice",
            options: [
              {
                isCorrect: true,
                label: "A (ID)",
              },
              {
                isCorrect: false,
                label: "B (ID)",
              },
            ],
          },
        },
      });
    })
  );

  it.effect(
    "rejects imports that expand the authoring module capability",
    () => {
      const invalidImports = [
        'import "@nakafa/aksara-contracts/question/item";',
        'import { QuestionItem } from "@nakafa/aksara-contracts/question/item";',
        'import { type QuestionItem } from "@nakafa/aksara-contracts/question/item";',
        'import type QuestionItem from "@nakafa/aksara-contracts/question/item";',
        'import type * as QuestionItem from "@nakafa/aksara-contracts/question/item";',
        'import type { QuestionItem, Other } from "@nakafa/aksara-contracts/question/item";',
        'import type { Other } from "@nakafa/aksara-contracts/question/item";',
        'import type { QuestionItem as Renamed } from "@nakafa/aksara-contracts/question/item";',
        'import type { QuestionItem } from "@nakafa/aksara-contracts/projection/material";',
        'import type { QuestionItem } from "@nakafa/aksara-contracts/question/item" with { type: "json" };',
        "import type { QuestionItem } from source;",
        "const first = 1;",
      ];

      return expectRejections(invalidImports.map((value) => itemModule(value)));
    }
  );

  it.effect("rejects declarations other than one typed item constant", () => {
    const invalidDeclarations = [
      "function item() {}",
      `let item: QuestionItem = ${itemObject};`,
      `const item: QuestionItem = ${itemObject}, other = {};`,
      `const { item }: QuestionItem = ${itemObject};`,
      `const other: QuestionItem = ${itemObject};`,
      "const item: QuestionItem;",
      `const item = ${itemObject};`,
      `const item: string = ${itemObject};`,
      `const item: Namespace.QuestionItem = ${itemObject};`,
      `const item: Other = ${itemObject};`,
    ];

    return expectRejections(
      invalidDeclarations.map((value) => itemModule(typeImport, value))
    );
  });

  it.effect(
    "rejects executable, computed, incomplete, and invalid item values",
    () => {
      const label = '"A"';
      const correctOption = `{ isCorrect: true, label: ${label} }`;
      const distractor = `{ isCorrect: false, label: ${label} }`;
      const response = `{ kind: "single-choice", options: [${correctOption}, ${distractor}] }`;
      const invalidObjects = [
        "[]",
        "{}",
        "{ ...other }",
        "{ responses: {}, responses: {} }",
        "{ responses: {} }",
        `{ responses: { en: ${response}, fr: ${response} } }`,
        "{ responses: call() }",
        '{ responses: { en: ["A"] } }',
        "{ responses: { en: { ...other } } }",
        `{ responses: { en: { kind: "single-choice", options: [{ label: ${label} }, ${distractor}] } } }`,
        `{ responses: { en: { kind: "single-choice", options: [{ isCorrect: true }, ${distractor}] } } }`,
        `{ responses: { en: { kind: "single-choice", options: [{ isCorrect: true, label: ${label}, other: "A" }, ${distractor}] } } }`,
        `{ responses: { en: { kind: "single-choice", options: [{ isCorrect: true, label: 1 }, ${distractor}] } } }`,
        `{ responses: { en: { kind: "single-choice", options: [{ isCorrect: 1, label: ${label} }, ${distractor}] } } }`,
        `{ responses: { [locale]: ${response} } }`,
        `{ responses: { en: { kind: "single-choice", options: [{ isCorrect: true, label: ${label}, label: ${label} }, ${distractor}] } } }`,
        `{ responses: { en: { kind: "single-choice", options: [{ isCorrect: true, isCorrect: false, label: ${label} }, ${distractor}] } } }`,
        `{ responses: { en: { kind: "single-choice", options: [${distractor}, ${distractor}] } } }`,
        `{ responses: { en: { kind: "single-choice", options: [${correctOption}, ${correctOption}] } } }`,
      ];

      return expectRejections(
        invalidObjects.map((object) =>
          itemModule(typeImport, `const item: QuestionItem = ${object};`)
        )
      );
    }
  );

  it.effect("rejects missing, additional, and unsafe export statements", () => {
    const invalidModules = [
      "",
      typeImport,
      `${typeImport}\n${declaration}`,
      `${typeImport}\n${declaration}\n${exportAssignment}\nrun();`,
      `${itemModule()}\n/*`,
      itemModule(typeImport, declaration, "const other = 1;"),
      itemModule(typeImport, declaration, "export = item;"),
      itemModule(typeImport, declaration, "export default {};"),
      itemModule(typeImport, declaration, "export default other;"),
    ];

    return expectRejections(invalidModules);
  });
});
