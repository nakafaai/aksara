import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { decodeQuestionChoiceSource } from "#corpus/question-bank/choice-source";

const sourcePath = "packages/corpus/question-bank/example/choices.ts";
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

/** Decodes one choices module at the Vitest runner boundary. */
function decode(source: string) {
  return Effect.runPromise(decodeQuestionChoiceSource(source, sourcePath));
}

/** Returns the typed parser rejection at the Vitest runner boundary. */
function reject(source: string) {
  return Effect.runPromise(
    decodeQuestionChoiceSource(source, sourcePath).pipe(Effect.flip)
  );
}

/** Requires every invalid module to fail with the exact typed source error. */
function expectRejections(sources: readonly string[]) {
  return Promise.all(
    sources.map((source) =>
      expect(reject(source)).resolves.toMatchObject({
        _tag: "QuestionChoiceError",
        sourcePath,
      })
    )
  );
}

describe("question choice source", () => {
  it("decodes reviewed literal data without executing the module", async () => {
    await expect(decode(choiceModule())).resolves.toEqual({
      en: [
        { label: "A", value: true },
        { label: "B", value: false },
      ],
      id: [
        { label: "A", value: false },
        { label: "B", value: true },
      ],
    });
  });

  it("rejects imports that expand the authoring module capability", async () => {
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
      "import type { QuestionChoices } from source;",
      "const first = 1;",
    ];

    await expectRejections(invalidImports.map((value) => choiceModule(value)));
  });

  it("rejects declarations other than one typed choices constant", async () => {
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

    await expectRejections(
      invalidDeclarations.map((value) => choiceModule(typeImport, value))
    );
  });

  it("rejects executable, computed, incomplete, and invalid choice values", async () => {
    const invalidObjects = [
      "[]",
      "{ ...other }",
      "{ en: [], en: [], id: [] }",
      "{ en: [] }",
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

    await expectRejections(
      invalidObjects.map((object) =>
        choiceModule(typeImport, `const choices: QuestionChoices = ${object};`)
      )
    );
  });

  it("rejects missing, additional, and unsafe export statements", async () => {
    const invalidModules = [
      "",
      typeImport,
      `${typeImport}\n${declaration}`,
      `${typeImport}\n${declaration}\n${exportAssignment}\nrun();`,
      choiceModule(typeImport, declaration, "const other = 1;"),
      choiceModule(typeImport, declaration, "export = choices;"),
      choiceModule(typeImport, declaration, "export default {};"),
      choiceModule(typeImport, declaration, "export default other;"),
    ];

    await expectRejections(invalidModules);
  });
});
