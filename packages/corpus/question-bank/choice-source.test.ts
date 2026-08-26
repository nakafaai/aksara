import { describe, expect, it } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";

import { decodeQuestionChoiceSource } from "#corpus/question-bank/choice-source";

const sourcePath = CorpusSourcePathSchema.make(
  "packages/corpus/question-bank/example/choices.ts"
);
const choiceObject = `{
  "en": [
    { "label": \`A\`, "value": true },
    { label: "B", value: false },
  ],
  id: [
    { label: "A", value: false },
    { label: "B", value: true },
  ],
}`;
const typeImport =
  'import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";';
const declaration = `const choices: QuestionChoices = ${choiceObject};`;
const exportAssignment = "export default choices;";

/** Builds a complete choices module around one syntax variant. */
function choiceModule(
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
        const error = yield* decodeQuestionChoiceSource(
          source,
          sourcePath
        ).pipe(Effect.flip);

        expect(error).toMatchObject({
          _tag: "QuestionChoiceError",
          sourcePath,
        });
      }),
    { discard: true }
  );
}

describe("question choice source", () => {
  it.effect("decodes reviewed literal data without executing the module", () =>
    Effect.gen(function* () {
      const choices = yield* decodeQuestionChoiceSource(
        choiceModule(),
        sourcePath
      );

      expect(choices).toEqual({
        en: [
          { label: "A", value: true },
          { label: "B", value: false },
        ],
        id: [
          { label: "A", value: false },
          { label: "B", value: true },
        ],
      });
    })
  );

  it.effect(
    "rejects imports that expand the authoring module capability",
    () => {
      const invalidImports = [
        'import "@nakafa/aksara-contracts/projection/question";',
        'import { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";',
        'import { type QuestionChoices } from "@nakafa/aksara-contracts/projection/question";',
        'import type QuestionChoices from "@nakafa/aksara-contracts/projection/question";',
        'import type * as QuestionChoices from "@nakafa/aksara-contracts/projection/question";',
        'import type { QuestionChoices, Other } from "@nakafa/aksara-contracts/projection/question";',
        'import type { Other } from "@nakafa/aksara-contracts/projection/question";',
        'import type { QuestionChoice as QuestionChoices } from "@nakafa/aksara-contracts/projection/question";',
        'import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/material";',
        'import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question" with { type: "json" };',
        "import type { QuestionChoices } from source;",
        "const first = 1;",
      ];

      return expectRejections(
        invalidImports.map((value) => choiceModule(value))
      );
    }
  );

  it.effect(
    "rejects declarations other than one typed choices constant",
    () => {
      const invalidDeclarations = [
        "function choices() {}",
        `let choices: QuestionChoices = ${choiceObject};`,
        `const choices: QuestionChoices = ${choiceObject}, other = {};`,
        `const { choices }: QuestionChoices = ${choiceObject};`,
        `const other: QuestionChoices = ${choiceObject};`,
        "const choices: QuestionChoices;",
        `const choices = ${choiceObject};`,
        `const choices: string = ${choiceObject};`,
        `const choices: Namespace.QuestionChoices = ${choiceObject};`,
        `const choices: Other = ${choiceObject};`,
      ];

      return expectRejections(
        invalidDeclarations.map((value) => choiceModule(typeImport, value))
      );
    }
  );

  it.effect(
    "rejects executable, computed, incomplete, and invalid choice values",
    () => {
      const invalidObjects = [
        "[]",
        "{}",
        "{ ...other }",
        "{ en: [], en: [], id: [] }",
        "{ en: [] }",
        "{ en: [], id: [], de: [] }",
        "{ en: call(), id: [] }",
        '{ en: ["A"], id: [] }',
        "{ en: [{ ...other }], id: [] }",
        '{ en: [{ value: true }], id: [{ label: "A", value: true }] }',
        '{ en: [{ label: "A" }], id: [{ label: "A", value: true }] }',
        '{ en: [{ other: "A", value: true }], id: [{ label: "A", value: true }] }',
        '{ en: [{ label: 1, value: true }], id: [{ label: "A", value: true }] }',
        '{ en: [{ label: "A", value: 1 }], id: [{ label: "A", value: true }] }',
        '{ [locale]: [], id: [{ label: "A", value: true }] }',
        '{ en: [{ label: "A", label: "B", value: true }], id: [{ label: "A", value: true }] }',
        '{ en: [{ label: "A", value: true, value: false }], id: [{ label: "A", value: true }] }',
        '{ en: [{ label: "A", value: false }], id: [{ label: "A", value: true }] }',
        '{ en: [{ label: "A", value: true }, { label: "B", value: true }], id: [{ label: "A", value: true }] }',
      ];

      return expectRejections(
        invalidObjects.map((object) =>
          choiceModule(
            typeImport,
            `const choices: QuestionChoices = ${object};`
          )
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
      `${choiceModule()}\n/*`,
      choiceModule(typeImport, declaration, "const other = 1;"),
      choiceModule(typeImport, declaration, "export = choices;"),
      choiceModule(typeImport, declaration, "export default {};"),
      choiceModule(typeImport, declaration, "export default other;"),
    ];

    return expectRejections(invalidModules);
  });
});
