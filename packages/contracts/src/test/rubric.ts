import { Schema } from "effect";

import type { QuestionAnswerKey } from "#contracts/question/answer";
import {
  freezeQuestionRubric,
  QuestionRubricResponseSchema,
  type QuestionRubricResponseSource,
  QuestionRubricResponseSourceSchema,
} from "#contracts/question/rubric";

/** Builds one test-only rubric label written for every active app locale. */
export function rubricLabel(text: string) {
  return { de: `${text} (de)`, en: `${text} (en)`, id: `${text} (id)` };
}

/**
 * Builds the test-only rubric: one judged approach criterion and one result
 * criterion decided by the supplied final answer.
 */
export function rubricSourceWith(
  finalAnswer: QuestionAnswerKey
): QuestionRubricResponseSource {
  return {
    criteria: [
      {
        label: rubricLabel("Approach"),
        levels: [
          { label: rubricLabel("Missing"), points: 0 },
          { label: rubricLabel("Partial"), points: 1 },
          { label: rubricLabel("Complete"), points: 2 },
        ],
      },
      {
        finalAnswer,
        label: rubricLabel("Result"),
        levels: [
          { label: rubricLabel("Wrong"), points: 0 },
          { label: rubricLabel("Right"), points: 1 },
        ],
      },
    ],
    kind: "rubric",
  };
}

/** Test-only rubric whose result criterion checks one exact number. */
export const rubricSource = rubricSourceWith({
  acceptsFractions: true,
  kind: "number",
  value: "0.5",
});

/** The test-only rubric with its stable criterion and level keys. */
export const rubric = freezeQuestionRubric(rubricSource);

type RubricCriterionSource = QuestionRubricResponseSource["criteria"][number];

/** Returns the test-only rubric with one authored criterion patched. */
export function patchRubricCriterion(
  index: number,
  patch: Partial<RubricCriterionSource>
): QuestionRubricResponseSource {
  return {
    ...rubricSource,
    criteria: rubricSource.criteria.map((criterion, at) =>
      at === index ? { ...criterion, ...patch } : criterion
    ),
  };
}

export const goldenRubricSource = Schema.decodeSync(
  QuestionRubricResponseSourceSchema
)({
  criteria: [
    {
      label: {
        de: "Ansatz (de)",
        en: "Approach (en)",
        id: "Pendekatan é (id)",
      },
      levels: [
        {
          label: { de: "Fehlt (de)", en: "Missing (en)", id: "Tidak ada (id)" },
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
});

export const goldenRubricFrozen = Schema.decodeSync(
  QuestionRubricResponseSchema
)({
  criteria: [
    {
      criterionKey: "criterion-1",
      label: {
        de: "Ansatz (de)",
        en: "Approach (en)",
        id: "Pendekatan é (id)",
      },
      levels: [
        {
          label: { de: "Fehlt (de)", en: "Missing (en)", id: "Tidak ada (id)" },
          levelKey: "level-1",
          order: 1,
          points: 0,
        },
        {
          label: {
            de: "Teilweise (de)",
            en: "Partial (en)",
            id: "Sebagian (id)",
          },
          levelKey: "level-2",
          order: 2,
          points: 1,
        },
        {
          label: {
            de: "Vollständig (de)",
            en: "Complete (en)",
            id: "Lengkap (id)",
          },
          levelKey: "level-3",
          order: 3,
          points: 2,
        },
      ],
      order: 1,
    },
    {
      criterionKey: "criterion-2",
      finalAnswer: { acceptsFractions: true, kind: "number", value: "0.5" },
      label: { de: "Ergebnis (de)", en: "Result (en)", id: "Hasil (id)" },
      levels: [
        {
          label: { de: "Falsch (de)", en: "Wrong (en)", id: "Salah (id)" },
          levelKey: "level-1",
          order: 1,
          points: 0,
        },
        {
          label: { de: "Richtig (de)", en: "Right (en)", id: "Benar (id)" },
          levelKey: "level-2",
          order: 2,
          points: 1,
        },
      ],
      order: 2,
    },
  ],
  kind: "rubric",
});

export const goldenRubricCanonical =
  '{"criteria":[{"criterionKey":"criterion-1","label":{"de":"Ansatz (de)","en":"Approach (en)","id":"Pendekatan é (id)"},"levels":[{"label":{"de":"Fehlt (de)","en":"Missing (en)","id":"Tidak ada (id)"},"levelKey":"level-1","order":1,"points":0},{"label":{"de":"Teilweise (de)","en":"Partial (en)","id":"Sebagian (id)"},"levelKey":"level-2","order":2,"points":1},{"label":{"de":"Vollständig (de)","en":"Complete (en)","id":"Lengkap (id)"},"levelKey":"level-3","order":3,"points":2}],"order":1},{"criterionKey":"criterion-2","finalAnswer":{"acceptsFractions":true,"kind":"number","value":"0.5"},"label":{"de":"Ergebnis (de)","en":"Result (en)","id":"Hasil (id)"},"levels":[{"label":{"de":"Falsch (de)","en":"Wrong (en)","id":"Salah (id)"},"levelKey":"level-1","order":1,"points":0},{"label":{"de":"Richtig (de)","en":"Right (en)","id":"Benar (id)"},"levelKey":"level-2","order":2,"points":1}],"order":2}],"kind":"rubric"}';
export const goldenRubricStructure =
  '{"criteria":[{"criterionKey":"criterion-1","label":{"de":"Ansatz (de)","en":"Approach (en)","id":"Pendekatan é (id)"},"levels":[{"label":{"de":"Fehlt (de)","en":"Missing (en)","id":"Tidak ada (id)"},"levelKey":"level-1","order":1,"points":0},{"label":{"de":"Teilweise (de)","en":"Partial (en)","id":"Sebagian (id)"},"levelKey":"level-2","order":2,"points":1},{"label":{"de":"Vollständig (de)","en":"Complete (en)","id":"Lengkap (id)"},"levelKey":"level-3","order":3,"points":2}],"order":1},{"criterionKey":"criterion-2","finalAnswer":{"acceptsFractions":true,"kind":"number","value":"0.5"},"label":{"de":"Ergebnis (de)","en":"Result (en)","id":"Hasil (id)"},"levels":[{"label":{"de":"Falsch (de)","en":"Wrong (en)","id":"Salah (id)"},"levelKey":"level-1","order":1,"points":0},{"label":{"de":"Richtig (de)","en":"Right (en)","id":"Benar (id)"},"levelKey":"level-2","order":2,"points":1}],"order":2}],"kind":"rubric"}';

/** Builds one authored rubric with a single criterion. */
export function oneCriterion(criterion: unknown) {
  return { criteria: [criterion], kind: "rubric" };
}

/** Builds authored levels worth the given points, in order. */
export function authoredLevels(...points: number[]) {
  return points.map((value) => ({
    label: rubricLabel(`Level ${value}`),
    points: value,
  }));
}
