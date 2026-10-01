import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";
import { Decision, DecisionModel } from "effect/ai";

import {
  canonicalQuestionRubric,
  canonicalQuestionRubricStructure,
  freezeQuestionRubric,
  QuestionRubricLabelSchema,
  QuestionRubricResponseSchema,
  QuestionRubricResponseSourceSchema,
  questionRubricPoints,
} from "#contracts/question/rubric";
import {
  rubricLabel as label,
  rubric,
  rubricSourceWith,
  rubricSource as source,
} from "#contracts/test/rubric";

/** Returns whether one unknown rubric fails strict decoding. */
function rejects(
  schema:
    | typeof QuestionRubricResponseSchema
    | typeof QuestionRubricResponseSourceSchema,
  input: unknown
) {
  return Exit.isFailure(
    Schema.decodeUnknownExit(schema)(input, { onExcessProperty: "error" })
  );
}

/** Builds one authored rubric with a single criterion. */
function oneCriterion(criterion: unknown) {
  return { criteria: [criterion], kind: "rubric" };
}

const textResult = rubricSourceWith({
  acceptedAnswers: ["Test-only result"],
  collapseWhitespace: true,
  ignoreCase: true,
  kind: "text",
});

describe("question rubric", () => {
  it("freezes stable criterion and level keys from authored order", () => {
    const [approach, result] = rubric.criteria;

    expect(
      rubric.criteria.map(({ criterionKey, order }) => ({
        criterionKey,
        order,
      }))
    ).toEqual([
      { criterionKey: "criterion-1", order: 1 },
      { criterionKey: "criterion-2", order: 2 },
    ]);
    expect(
      approach?.levels.map(({ levelKey, order, points }) => ({
        levelKey,
        order,
        points,
      }))
    ).toEqual([
      { levelKey: "level-1", order: 1, points: 0 },
      { levelKey: "level-2", order: 2, points: 1 },
      { levelKey: "level-3", order: 3, points: 2 },
    ]);
    expect(approach).not.toHaveProperty("finalAnswer");
    expect(result?.finalAnswer).toEqual({
      acceptsFractions: true,
      kind: "number",
      value: "0.5",
    });
    expect(Schema.decodeSync(QuestionRubricResponseSchema)(rubric)).toEqual(
      rubric
    );
  });

  it("derives the total from each criterion's highest level", () => {
    expect(questionRubricPoints(rubric)).toBe(3);
  });

  it("orders every label by the signed active locale order, not by key", () => {
    expect(Object.keys(label("Approach"))).toEqual(["de", "en", "id"]);
    expect(JSON.stringify(canonicalQuestionRubric(rubric))).toBe(
      '{"criteria":[{"criterionKey":"criterion-1","label":{"en":"Approach (en)","id":"Approach (id)","de":"Approach (de)"},"levels":[{"label":{"en":"Missing (en)","id":"Missing (id)","de":"Missing (de)"},"levelKey":"level-1","order":1,"points":0},{"label":{"en":"Partial (en)","id":"Partial (id)","de":"Partial (de)"},"levelKey":"level-2","order":2,"points":1},{"label":{"en":"Complete (en)","id":"Complete (id)","de":"Complete (de)"},"levelKey":"level-3","order":3,"points":2}],"order":1},{"criterionKey":"criterion-2","finalAnswer":{"acceptsFractions":true,"kind":"number","value":"0.5"},"label":{"en":"Result (en)","id":"Result (id)","de":"Result (de)"},"levels":[{"label":{"en":"Wrong (en)","id":"Wrong (id)","de":"Wrong (de)"},"levelKey":"level-1","order":1,"points":0},{"label":{"en":"Right (en)","id":"Right (id)","de":"Right (de)"},"levelKey":"level-2","order":2,"points":1}],"order":2}],"kind":"rubric"}'
    );
  });

  it("keeps labels and numeric keys in the structure but not delivery-language text", () => {
    const withText = freezeQuestionRubric(textResult);
    const [, result] = canonicalQuestionRubric(withText).criteria;
    const [, structure] = canonicalQuestionRubricStructure(withText).criteria;

    expect(canonicalQuestionRubricStructure(rubric)).toEqual(
      canonicalQuestionRubric(rubric)
    );
    expect(result?.finalAnswer).toEqual(textResult.criteria[1]?.finalAnswer);
    expect(structure?.finalAnswer).toEqual({
      collapseWhitespace: true,
      ignoreCase: true,
      kind: "text",
    });
    expect(structure?.label).toEqual(result?.label);
  });

  it.effect("maps each judged criterion onto one Effect rating decision", () =>
    Effect.gen(function* () {
      const judged = rubric.criteria.filter(
        ({ finalAnswer }) => finalAnswer === undefined
      );
      const decisions = Object.fromEntries(
        judged.map(({ criterionKey, label: criterionLabel, levels }) => [
          criterionKey,
          Decision.rate({
            criteria: levels.map(({ levelKey }) => levelKey),
            instructions: criterionLabel.en,
          }),
        ])
      );
      const model = yield* DecisionModel.make({
        decide: () =>
          Effect.succeed({
            answers: {
              "criterion-1": {
                _tag: "Rate",
                probabilities: {
                  "level-1": 0.1,
                  "level-2": 0.7,
                  "level-3": 0.2,
                },
                rating: 1.1,
              },
            },
            usage: { inputTokens: undefined, outputTokens: undefined },
          }),
      });
      const { answers } = yield* model.decide(
        Decision.make({ decisions, input: Schema.String }),
        { input: "Test-only learner answer" }
      );
      const earned = judged.map(
        ({ criterionKey, levels }) =>
          levels.find(
            ({ levelKey }) => levelKey === answers[criterionKey]?.label
          )?.points
      );

      expect(Object.keys(decisions)).toEqual(["criterion-1"]);
      expect(earned).toEqual([1]);
    })
  );

  it("rejects scales that are short, flat, descending, unanchored, or ambiguous", () => {
    for (const levels of [
      [{ label: label("Only"), points: 0 }],
      [
        { label: label("Low"), points: 0 },
        { label: label("Same"), points: 0 },
      ],
      [
        { label: label("High"), points: 2 },
        { label: label("Low"), points: 0 },
      ],
      [
        { label: label("Negative"), points: -1 },
        { label: label("Zero"), points: 0 },
      ],
      [
        { label: label("One"), points: 1 },
        { label: label("Two"), points: 2 },
      ],
      [
        { label: label("Zero"), points: 0 },
        { label: label("Half"), points: 0.5 },
      ],
    ]) {
      expect(
        rejects(
          QuestionRubricResponseSourceSchema,
          oneCriterion({ label: label("Criterion"), levels })
        )
      ).toBe(true);
    }
    const [, result] = source.criteria;
    expect(
      rejects(
        QuestionRubricResponseSourceSchema,
        oneCriterion({
          ...result,
          levels: [
            { label: label("Wrong"), points: 0 },
            { label: label("Close"), points: 1 },
            { label: label("Right"), points: 2 },
          ],
        })
      )
    ).toBe(true);
    expect(
      rejects(QuestionRubricResponseSourceSchema, {
        criteria: [],
        kind: "rubric",
      })
    ).toBe(true);
  });

  it("rejects labels without exactly every active app locale", () => {
    const { de: _de, ...withoutGerman } = label("Approach");
    for (const criterionLabel of [
      withoutGerman,
      { ...label("Approach"), de: "" },
      { ...label("Approach"), fr: "Approche" },
    ]) {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(QuestionRubricLabelSchema)(criterionLabel, {
            onExcessProperty: "error",
          })
        )
      ).toBe(true);
    }
  });

  it("rejects frozen rubrics with noncanonical identities or scales", () => {
    const [first] = rubric.criteria;
    for (const criteria of [
      [],
      [...rubric.criteria].reverse(),
      rubric.criteria.map((criterion) => ({
        ...criterion,
        criterionKey: "criterion-9",
      })),
      rubric.criteria.map((criterion) => ({
        ...criterion,
        levels: [...criterion.levels].reverse(),
      })),
      rubric.criteria.map((criterion) => ({
        ...criterion,
        levels: criterion.levels.map((level) => ({
          ...level,
          levelKey: "level-9",
        })),
      })),
      [{ ...first, levels: first?.levels.slice(0, 1) }],
    ]) {
      expect(
        rejects(QuestionRubricResponseSchema, { criteria, kind: "rubric" })
      ).toBe(true);
    }
  });
});
