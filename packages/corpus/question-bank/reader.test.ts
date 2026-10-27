import { expect, layer } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Array as Arr, Effect } from "effect";

import { decodeItemSource } from "#corpus/question-bank/reader";

const sourcePath = CorpusSourcePathSchema.make(
  "packages/corpus/question-bank/tryout/test-country/test-exam/test-section/test-set/question-1/item.ts"
);
const itemObject = `{
  "versions": {
    "en": {
      "kind": "choice",
      "options": [
        { "correct": true, "label": \`A\` },
        { correct: false, label: "B" },
      ],
    },
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "A (ID)" },
        { correct: false, label: "B (ID)" },
      ],
    },
  },
}`;
const typeImport =
  'import type { ItemSource } from "#corpus/question-bank/item";';
const declaration = `const item: ItemSource = ${itemObject};`;
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
        const error = yield* decodeItemSource(source, sourcePath).pipe(
          Effect.flip
        );

        expect(error).toMatchObject({ _tag: "ItemSourceError", sourcePath });
      }),
    { discard: true }
  );
}

layer(TypeScriptParser.layer)("item source", (it) => {
  it.effect("rejects literal dollars before accepting an authored item", () =>
    Effect.gen(function* () {
      const source = itemModule().replace('label: "A (ID)"', 'label: "$3$"');
      const error = yield* Effect.flip(decodeItemSource(source, sourcePath));

      expect(error).toMatchObject({
        _tag: "QuestionLabelError",
        labelPath: "versions.id.options[0].label",
        reason: "dollar",
        sourcePath,
      });
    })
  );

  it.effect("decodes reviewed literal data without executing the module", () =>
    Effect.gen(function* () {
      const item = yield* decodeItemSource(itemModule(), sourcePath);

      expect(item).toEqual({
        versions: {
          en: {
            kind: "choice",
            options: [
              { correct: true, label: "A" },
              { correct: false, label: "B" },
            ],
          },
          id: {
            kind: "choice",
            options: [
              { correct: true, label: "A (ID)" },
              { correct: false, label: "B (ID)" },
            ],
          },
        },
      });
    })
  );

  it.effect("decodes a matrix with its blueprint and shared reading", () =>
    Effect.gen(function* () {
      const item = yield* decodeItemSource(
        itemModule(
          typeImport,
          `const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  stimulus: "passage-1",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Satu" },
        { column: 2, label: "Dua" },
      ],
    },
  },
};`
        ),
        sourcePath
      );

      expect(item).toMatchObject({
        blueprint: { topic: "functions" },
        stimulus: "passage-1",
        versions: { id: { kind: "matrix", statements: [{ column: 1 }, {}] } },
      });
    })
  );

  it.effect(
    "rejects imports that expand the authoring module capability",
    () => {
      const invalidImports = [
        'import "#corpus/question-bank/item";',
        'import { ItemSource } from "#corpus/question-bank/item";',
        'import { type ItemSource } from "#corpus/question-bank/item";',
        'import type ItemSource from "#corpus/question-bank/item";',
        'import type * as ItemSource from "#corpus/question-bank/item";',
        'import type { ItemSource, Other } from "#corpus/question-bank/item";',
        'import type { Other } from "#corpus/question-bank/item";',
        'import type { ItemSource as Renamed } from "#corpus/question-bank/item";',
        'import type { ItemSource } from "#corpus/question-bank/path";',
        'import type { ItemSource } from "#corpus/question-bank/item" with { type: "json" };',
        "import type { ItemSource } from source;",
        "const first = 1;",
      ];

      return expectRejections(
        Arr.map(invalidImports, (value) => itemModule(value))
      );
    }
  );

  it.effect("rejects declarations other than one typed item constant", () => {
    const invalidDeclarations = [
      "function item() {}",
      `let item: ItemSource = ${itemObject};`,
      `const item: ItemSource = ${itemObject}, other = {};`,
      `const { item }: ItemSource = ${itemObject};`,
      `const other: ItemSource = ${itemObject};`,
      "const item: ItemSource;",
      `const item = ${itemObject};`,
      `const item: string = ${itemObject};`,
      `const item: Namespace.ItemSource = ${itemObject};`,
      `const item: Other = ${itemObject};`,
    ];

    return expectRejections(
      Arr.map(invalidDeclarations, (value) => itemModule(typeImport, value))
    );
  });

  it.effect(
    "rejects executable, computed, incomplete, and invalid item values",
    () => {
      const label = '"A"';
      const correct = `{ correct: true, label: ${label} }`;
      const wrong = `{ correct: false, label: ${label} }`;
      const choice = `{ kind: "choice", options: [${correct}, ${wrong}] }`;
      const invalidObjects = [
        "[]",
        "{}",
        "{ ...other }",
        "{ versions: {}, versions: {} }",
        "{ versions: {} }",
        `{ versions: { en: ${choice}, fr: ${choice} } }`,
        "{ versions: call() }",
        '{ versions: { en: ["A"] } }',
        "{ versions: { en: { ...other } } }",
        `{ versions: { en: { kind: "choice", options: [{ label: ${label} }, ${wrong}] } } }`,
        `{ versions: { en: { kind: "choice", options: [{ correct: true }, ${wrong}] } } }`,
        `{ versions: { en: { kind: "choice", options: [{ correct: true, label: ${label}, other: "A" }, ${wrong}] } } }`,
        `{ versions: { en: { kind: "choice", options: [{ correct: true, label: 1 }, ${wrong}] } } }`,
        `{ versions: { en: { kind: "choice", options: [{ correct: 1, label: ${label} }, ${wrong}] } } }`,
        `{ versions: { [locale]: ${choice} } }`,
        `{ versions: { en: { kind: "choice", options: [{ correct: true, label: ${label}, label: ${label} }, ${wrong}] } } }`,
        `{ versions: { en: { kind: "choice", options: [${wrong}, ${wrong}] } } }`,
        `{ versions: { en: { kind: "choice", options: [${correct}, ${correct}] } } }`,
        `{ versions: { en: { kind: "choice", options: [${correct}] } } }`,
        `{ versions: { en: ${choice}, id: { kind: "choice", options: [${wrong}, ${correct}] } } }`,
        `{ versions: { en: ${choice}, id: { columns: ["A", "B"], kind: "matrix", statements: [{ column: 1, label: ${label} }] } } }`,
        `{ versions: { en: { columns: ["A"], kind: "matrix", statements: [{ column: 1, label: ${label} }] } } }`,
        `{ versions: { en: { columns: ["A", "B"], kind: "matrix", statements: [] } } }`,
        `{ versions: { en: { columns: ["A", "B"], kind: "matrix", statements: [{ column: 3, label: ${label} }] } } }`,
        `{ stimulus: "Passage 1", versions: { en: ${choice} } }`,
      ];

      return expectRejections(
        Arr.map(invalidObjects, (object) =>
          itemModule(typeImport, `const item: ItemSource = ${object};`)
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
