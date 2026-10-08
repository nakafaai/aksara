import { Exit, Schema } from "effect";

import { QuestionItemSchema } from "#contracts/question/item";
import { QuestionResponseSchema } from "#contracts/question/response";

export const itemSingle = Schema.decodeSync(QuestionItemSchema)({
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Bandung" },
        { isCorrect: true, label: "Jakarta é" },
        { isCorrect: false, label: "Surabaya" },
      ],
    },
  },
});
export const itemMultiple = Schema.decodeSync(QuestionItemSchema)({
  responses: {
    en: {
      kind: "multiple-choice",
      options: [
        { isCorrect: true, label: "Merah" },
        { isCorrect: true, label: "Biru é" },
        { isCorrect: false, label: "Hijau" },
      ],
    },
  },
});
export const itemShort = Schema.decodeSync(QuestionItemSchema)({
  responses: {
    en: {
      key: {
        acceptedAnswers: ["jakarta", "Jakarta é"],
        collapseWhitespace: true,
        ignoreCase: true,
        kind: "text",
      },
      kind: "short-answer",
    },
  },
});
export const itemCategory = Schema.decodeSync(QuestionItemSchema)({
  responses: {
    en: {
      categories: ["Hewan", "Tumbuhan é"],
      kind: "category",
      statements: [
        { correctCategoryOrder: 2, label: "Kaktus" },
        { correctCategoryOrder: 1, label: "Kucing" },
      ],
    },
  },
});
export const itemRubric = Schema.decodeSync(QuestionItemSchema)({
  responses: {
    en: {
      criteria: [
        {
          label: {
            de: "Ansatz (de)",
            en: "Approach (en)",
            id: "Pendekatan é (id)",
          },
          levels: [
            {
              label: {
                de: "Fehlt (de)",
                en: "Missing (en)",
                id: "Tidak ada (id)",
              },
              points: 0,
            },
            {
              label: {
                de: "Teilweise (de)",
                en: "Partial (en)",
                id: "Sebagian (id)",
              },
              points: 1,
            },
            {
              label: {
                de: "Vollständig (de)",
                en: "Complete (en)",
                id: "Lengkap (id)",
              },
              points: 2,
            },
          ],
        },
        {
          finalAnswer: { acceptsFractions: true, kind: "number", value: "0.5" },
          label: { de: "Ergebnis (de)", en: "Result (en)", id: "Hasil (id)" },
          levels: [
            {
              label: { de: "Falsch (de)", en: "Wrong (en)", id: "Salah (id)" },
              points: 0,
            },
            {
              label: { de: "Richtig (de)", en: "Right (en)", id: "Benar (id)" },
              points: 1,
            },
          ],
        },
      ],
      kind: "rubric",
    },
  },
});

export const responseSingle = Schema.decodeSync(QuestionResponseSchema)({
  kind: "single-choice",
  options: [
    { isCorrect: false, label: "Bandung", optionKey: "option-1", order: 1 },
    { isCorrect: true, label: "Jakarta é", optionKey: "option-2", order: 2 },
    { isCorrect: false, label: "Surabaya", optionKey: "option-3", order: 3 },
  ],
});
export const responseMultiple = Schema.decodeSync(QuestionResponseSchema)({
  kind: "multiple-choice",
  options: [
    { isCorrect: true, label: "Merah", optionKey: "option-1", order: 1 },
    { isCorrect: true, label: "Biru é", optionKey: "option-2", order: 2 },
    { isCorrect: false, label: "Hijau", optionKey: "option-3", order: 3 },
  ],
});
export const responseCategory = Schema.decodeSync(QuestionResponseSchema)({
  categories: [
    { categoryKey: "category-1", label: "Hewan", order: 1 },
    { categoryKey: "category-2", label: "Tumbuhan é", order: 2 },
  ],
  kind: "category",
  statements: [
    {
      correctCategoryKey: "category-2",
      label: "Kaktus",
      order: 1,
      statementKey: "statement-1",
    },
    {
      correctCategoryKey: "category-1",
      label: "Kucing",
      order: 2,
      statementKey: "statement-2",
    },
  ],
});
export const responseShort = Schema.decodeSync(QuestionResponseSchema)({
  key: {
    acceptedAnswers: ["jakarta", "Jakarta é"],
    collapseWhitespace: true,
    ignoreCase: true,
    kind: "text",
  },
  kind: "short-answer",
});

/** Canonical response bytes of the golden single, multiple, category, and short answers. */
export const responseBytes = {
  category:
    '{"categories":[{"categoryKey":"category-1","label":"Hewan","order":1},{"categoryKey":"category-2","label":"Tumbuhan é","order":2}],"kind":"category","statements":[{"correctCategoryKey":"category-2","label":"Kaktus","order":1,"statementKey":"statement-1"},{"correctCategoryKey":"category-1","label":"Kucing","order":2,"statementKey":"statement-2"}]}',
  multiple:
    '{"kind":"multiple-choice","options":[{"isCorrect":true,"label":"Merah","optionKey":"option-1","order":1},{"isCorrect":true,"label":"Biru é","optionKey":"option-2","order":2},{"isCorrect":false,"label":"Hijau","optionKey":"option-3","order":3}]}',
  short:
    '{"key":{"acceptedAnswers":["jakarta","Jakarta é"],"collapseWhitespace":true,"ignoreCase":true,"kind":"text"},"kind":"short-answer"}',
  single:
    '{"kind":"single-choice","options":[{"isCorrect":false,"label":"Bandung","optionKey":"option-1","order":1},{"isCorrect":true,"label":"Jakarta é","optionKey":"option-2","order":2},{"isCorrect":false,"label":"Surabaya","optionKey":"option-3","order":3}]}',
};

/** Structure bytes of the golden single, multiple, category, and short answers. */
export const responseStructureBytes = {
  category:
    '{"categories":[{"categoryKey":"category-1","order":1},{"categoryKey":"category-2","order":2}],"kind":"category","statements":[{"correctCategoryKey":"category-2","order":1,"statementKey":"statement-1"},{"correctCategoryKey":"category-1","order":2,"statementKey":"statement-2"}]}',
  multiple:
    '{"kind":"multiple-choice","options":[{"isCorrect":true,"optionKey":"option-1","order":1},{"isCorrect":true,"optionKey":"option-2","order":2},{"isCorrect":false,"optionKey":"option-3","order":3}]}',
  short:
    '{"key":{"collapseWhitespace":true,"ignoreCase":true,"kind":"text"},"kind":"short-answer"}',
  single:
    '{"kind":"single-choice","options":[{"isCorrect":false,"optionKey":"option-1","order":1},{"isCorrect":true,"optionKey":"option-2","order":2},{"isCorrect":false,"optionKey":"option-3","order":3}]}',
};

export const singleChoice = {
  kind: "single-choice",
  options: [
    { isCorrect: true, label: "A" },
    { isCorrect: false, label: "B" },
  ],
} as const;
export const multipleChoice = {
  kind: "multiple-choice",
  options: [
    { isCorrect: true, label: "A" },
    { isCorrect: true, label: "B" },
    { isCorrect: false, label: "C" },
  ],
} as const;
export const category = {
  categories: ["True", "False"],
  kind: "category",
  statements: [
    { correctCategoryOrder: 1, label: "Statement A" },
    { correctCategoryOrder: 2, label: "Statement B" },
  ],
} as const;

export const COHERENCE_MESSAGE =
  "Localized responses must preserve one format, structure, and answer key.";

/** Returns the strict decoding failure of one authored item, if any. */
export function itemFailure(input: unknown) {
  const exit = Schema.decodeUnknownExit(QuestionItemSchema)(input, {
    onExcessProperty: "error",
  });
  return Exit.isFailure(exit) ? String(exit.cause) : "";
}

/** Frozen category response of the golden category item. */
export const frozenCategory = {
  categories: [
    {
      categoryKey: "category-1",
      label: "True",
      order: 1,
    },
    {
      categoryKey: "category-2",
      label: "False",
      order: 2,
    },
  ],
  kind: "category",
  statements: [
    {
      correctCategoryKey: "category-1",
      label: "Statement A",
      order: 1,
      statementKey: "statement-1",
    },
    {
      correctCategoryKey: "category-2",
      label: "Statement B",
      order: 2,
      statementKey: "statement-2",
    },
  ],
};

/** Authored single-choice response with one correct and one wrong option. */
export const single = {
  kind: "single-choice",
  options: [
    {
      isCorrect: true,
      label: "A",
      optionKey: "option-1",
      order: 1,
    },
    {
      isCorrect: false,
      label: "B",
      optionKey: "option-2",
      order: 2,
    },
  ],
} as const;
