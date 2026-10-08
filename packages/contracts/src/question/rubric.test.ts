import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Record as Rec, Schema } from "effect";
import { Decision, DecisionModel } from "effect/ai";

import {
  canonicalQuestionRubric,
  canonicalQuestionRubricStructure,
  freezeQuestionRubric,
  QuestionRubricLabelSchema,
  QuestionRubricResponseSchema,
  QuestionRubricResponseSourceSchema,
  QuestionRubricScaleSchema,
  questionRubricPoints,
} from "#contracts/question/rubric";
import { rejects } from "#contracts/test/answer";
import {
  authoredLevels,
  goldenRubricCanonical,
  goldenRubricFrozen,
  goldenRubricSource,
  goldenRubricStructure,
  rubricLabel as label,
  oneCriterion,
  rubric,
  rubricSourceWith,
  rubricSource as source,
} from "#contracts/test/rubric";
import { encodeJsonText } from "#contracts/text/json";

describe("question rubric golden canonical bytes", () => {
  it("pins the canonical and structure bytes of a frozen rubric", () => {
    expect(encodeJsonText(canonicalQuestionRubric(goldenRubricFrozen))).toBe(
      goldenRubricCanonical
    );
    expect(
      encodeJsonText(canonicalQuestionRubricStructure(goldenRubricFrozen))
    ).toBe(goldenRubricStructure);
  });

  it("derives the stable criterion and level keys from authored order", () => {
    const frozen = freezeQuestionRubric(goldenRubricSource);

    expect(encodeJsonText(canonicalQuestionRubric(frozen))).toBe(
      goldenRubricCanonical
    );
    expect(encodeJsonText(canonicalQuestionRubricStructure(frozen))).toBe(
      goldenRubricStructure
    );
  });
});

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

  it("signs every label with its locales in alphabetical order", () => {
    const reversed = Schema.decodeUnknownSync(QuestionRubricLabelSchema)(
      Rec.fromEntries(Rec.toEntries(label("Approach")).reverse())
    );
    const relabeled = QuestionRubricResponseSchema.make({
      ...rubric,
      criteria: rubric.criteria.map((criterion, index) =>
        index === 0 ? { ...criterion, label: reversed } : criterion
      ),
    });

    expect(encodeJsonText(canonicalQuestionRubric(rubric))).toBe(
      '{"criteria":[{"criterionKey":"criterion-1","label":{"de":"Approach (de)","en":"Approach (en)","id":"Approach (id)"},"levels":[{"label":{"de":"Missing (de)","en":"Missing (en)","id":"Missing (id)"},"levelKey":"level-1","order":1,"points":0},{"label":{"de":"Partial (de)","en":"Partial (en)","id":"Partial (id)"},"levelKey":"level-2","order":2,"points":1},{"label":{"de":"Complete (de)","en":"Complete (en)","id":"Complete (id)"},"levelKey":"level-3","order":3,"points":2}],"order":1},{"criterionKey":"criterion-2","finalAnswer":{"acceptsFractions":true,"kind":"number","value":"0.5"},"label":{"de":"Result (de)","en":"Result (en)","id":"Result (id)"},"levels":[{"label":{"de":"Wrong (de)","en":"Wrong (en)","id":"Wrong (id)"},"levelKey":"level-1","order":1,"points":0},{"label":{"de":"Right (de)","en":"Right (en)","id":"Right (id)"},"levelKey":"level-2","order":2,"points":1}],"order":2}],"kind":"rubric"}'
    );
    expect(encodeJsonText(canonicalQuestionRubric(relabeled))).toBe(
      encodeJsonText(canonicalQuestionRubric(rubric))
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
      const decisions = Rec.fromEntries(
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

      expect(Rec.keys(decisions)).toEqual(["criterion-1"]);
      expect(earned).toEqual([1]);
    })
  );

  it("accepts judged scales from any non-negative start", () => {
    const fourPoint = Schema.decodeUnknownSync(
      QuestionRubricResponseSourceSchema
    )(
      oneCriterion({
        label: label("Aspect"),
        levels: authoredLevels(1, 2, 3, 4),
      })
    );

    expect(questionRubricPoints(freezeQuestionRubric(fourPoint))).toBe(4);
  });

  it("rejects scales that are short, flat, descending, fractional, or ambiguous", () => {
    const [, result] = source.criteria;
    const criteria = [
      ...[[0], [0, 0], [2, 0], [-1, 0], [0, 0.5]].map((points) => ({
        label: label("Criterion"),
        levels: authoredLevels(...points),
      })),
      { ...result, levels: authoredLevels(0, 1, 2) },
      { ...result, levels: authoredLevels(1, 2) },
    ];

    for (const criterion of criteria) {
      expect(
        rejects(QuestionRubricResponseSourceSchema, oneCriterion(criterion))
      ).toBe(true);
    }
    expect(
      rejects(QuestionRubricResponseSourceSchema, {
        criteria: [],
        kind: "rubric",
      })
    ).toBe(true);
  });

  it("validates a single-language rubric's scale without its labels", () => {
    const school = {
      criteria: rubric.criteria.map((criterion) => ({
        ...criterion,
        label: criterion.label.id,
        levels: criterion.levels.map((level) => ({
          ...level,
          label: level.label.id,
        })),
      })),
      kind: "rubric",
    };
    const scale = Schema.decodeUnknownSync(QuestionRubricScaleSchema)(school);

    expect(scale.criteria[0]).not.toHaveProperty("label");
    expect(scale.criteria[1]?.finalAnswer).toEqual(
      rubric.criteria[1]?.finalAnswer
    );
    expect(questionRubricPoints(scale)).toBe(questionRubricPoints(rubric));
    expect(
      Exit.isFailure(
        Schema.decodeUnknownExit(QuestionRubricScaleSchema)({
          ...school,
          criteria: [...school.criteria].reverse(),
        })
      )
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
