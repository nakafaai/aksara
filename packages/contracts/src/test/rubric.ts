import type { QuestionAnswer } from "#contracts/question/answer";
import {
  freezeQuestionRubric,
  type QuestionRubricResponseSource,
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
  finalAnswer: QuestionAnswer
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
