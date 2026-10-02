import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";

import { ArtifactLocaleSchema } from "#contracts/locale";
import {
  canonicalQuestionBlueprint,
  QuestionItemSchema,
  QuestionResponseLocaleMissingError,
  QuestionResponseSourceSchema,
  questionResponseFor,
} from "#contracts/question/item";
import { shortNumber, shortText } from "#contracts/test/answer";
import {
  patchRubricCriterion,
  rubric,
  rubricLabel,
  rubricSource,
  rubricSourceWith,
} from "#contracts/test/rubric";

const singleChoice = {
  kind: "single-choice",
  options: [
    { isCorrect: true, label: "A" },
    { isCorrect: false, label: "B" },
  ],
} as const;
const multipleChoice = {
  kind: "multiple-choice",
  options: [
    { isCorrect: true, label: "A" },
    { isCorrect: true, label: "B" },
    { isCorrect: false, label: "C" },
  ],
} as const;
const category = {
  categories: ["True", "False"],
  kind: "category",
  statements: [
    { correctCategoryOrder: 1, label: "Statement A" },
    { correctCategoryOrder: 2, label: "Statement B" },
  ],
} as const;

const COHERENCE_MESSAGE =
  "Localized responses must preserve one format, structure, and answer key.";

/** Returns the strict decoding failure of one authored item, if any. */
function itemFailure(input: unknown) {
  const exit = Schema.decodeUnknownExit(QuestionItemSchema)(input, {
    onExcessProperty: "error",
  });
  return Exit.isFailure(exit) ? String(exit.cause) : "";
}

describe("question item", () => {
  it("canonicalizes the complete editorial blueprint in stable order", () => {
    expect(
      canonicalQuestionBlueprint({
        cognitiveLevel: "reasoning",
        contentDomain: "algebra",
        topic: "functions",
      })
    ).toEqual({
      cognitiveLevel: "reasoning",
      contentDomain: "algebra",
      topic: "functions",
    });
  });

  it("accepts every official response source format", () => {
    for (const response of [
      singleChoice,
      multipleChoice,
      category,
      shortNumber,
      shortText,
      rubricSource,
    ]) {
      expect(
        Schema.decodeUnknownSync(QuestionResponseSourceSchema)(response)
      ).toEqual(response);
    }
  });

  it("rejects invalid single and multiple choice answer keys", () => {
    for (const response of [
      { kind: "single-choice", options: [singleChoice.options[0]] },
      {
        kind: "single-choice",
        options: singleChoice.options.map((option) => ({
          ...option,
          isCorrect: true,
        })),
      },
      {
        kind: "multiple-choice",
        options: multipleChoice.options.map((option) => ({
          ...option,
          isCorrect: true,
        })),
      },
      { kind: "multiple-choice", options: singleChoice.options },
    ]) {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(QuestionResponseSourceSchema)(response)
        )
      ).toBe(true);
    }
  });

  it("rejects invalid category structure", () => {
    for (const response of [
      { ...category, categories: ["Only"] },
      { ...category, statements: [] },
      {
        ...category,
        statements: [
          {
            correctCategoryOrder: 3,
            label: "Out of range",
          },
        ],
      },
    ]) {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(QuestionResponseSourceSchema)(response)
        )
      ).toBe(true);
    }
  });

  it("requires localized responses to preserve format and answer key", () => {
    const valid = Schema.decodeUnknownSync(QuestionItemSchema)({
      responses: {
        en: singleChoice,
        id: {
          ...singleChoice,
          options: [
            { isCorrect: true, label: "A (ID)" },
            { isCorrect: false, label: "B (ID)" },
          ],
        },
      },
      stimulusKey: "shared-passage",
    });
    expect(valid.stimulusKey).toBe("shared-passage");

    for (const responses of [
      {},
      { en: singleChoice, id: multipleChoice },
      {
        en: singleChoice,
        id: {
          ...singleChoice,
          options: [...singleChoice.options].reverse(),
        },
      },
    ]) {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(QuestionItemSchema)({ responses })
        )
      ).toBe(true);
    }
  });

  it.effect("freezes option and category identities once", () =>
    Effect.gen(function* () {
      const item = yield* Schema.decodeUnknownEffect(QuestionItemSchema)({
        responses: { en: category },
      });
      const response = yield* questionResponseFor(
        item,
        ArtifactLocaleSchema.make("en")
      );

      expect(response).toEqual({
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
      });
    })
  );

  it.effect("returns a typed failure for a missing response locale", () =>
    Effect.gen(function* () {
      const item = yield* Schema.decodeUnknownEffect(QuestionItemSchema)({
        responses: { en: singleChoice },
      });
      const error = yield* questionResponseFor(
        item,
        ArtifactLocaleSchema.make("de")
      ).pipe(Effect.flip);

      expect(error).toBeInstanceOf(QuestionResponseLocaleMissingError);
      expect(error.artifactLocale).toBe("de");
    })
  );

  it("lets locale copies differ only in delivery-language answer text", () => {
    /** Builds one short text answer written in one delivery language. */
    const textAnswer = (text: string) => ({
      ...shortText,
      key: { ...shortText.key, acceptedAnswers: [text] },
    });
    /** Builds the fixture rubric whose result accepts one written text. */
    const textResult = (text: string) =>
      rubricSourceWith({ ...shortText.key, acceptedAnswers: [text] });
    const rescaled = [0, 2].map((points) => ({
      label: rubricLabel("R"),
      points,
    }));

    for (const responses of [
      { en: textAnswer("photosynthesis"), id: textAnswer("fotosintesis") },
      { de: textResult("Test-only Ergebnis"), en: textResult("Test-only") },
    ]) {
      expect(itemFailure({ responses })).toBe("");
    }
    for (const [base, copy] of [
      [
        shortNumber,
        { ...shortNumber, key: { ...shortNumber.key, value: "1" } },
      ],
      [
        shortText,
        { ...shortText, key: { ...shortText.key, ignoreCase: false } },
      ],
      [rubricSource, rubricSourceWith({ ...shortNumber.key, value: "1" })],
      [rubricSource, patchRubricCriterion(0, { label: rubricLabel("Method") })],
      [rubricSource, patchRubricCriterion(1, { levels: rescaled })],
    ]) {
      expect(itemFailure({ responses: { de: base, en: copy } })).toContain(
        COHERENCE_MESSAGE
      );
    }
  });

  it("keeps authored points above the default and off rubric items", () => {
    expect(itemFailure({ points: 2, responses: { en: singleChoice } })).toBe(
      ""
    );
    expect(
      itemFailure({ points: 2, responses: { de: rubricSource } })
    ).toContain("Rubric items derive their points from the rubric total.");
    expect(
      itemFailure({ points: 1, responses: { en: singleChoice } })
    ).toContain("Omit points to use the default of one point.");
  });

  it.effect(
    "freezes short answers unchanged and rubrics with stable keys",
    () =>
      Effect.gen(function* () {
        for (const [response, frozen] of [
          [shortNumber, shortNumber],
          [rubricSource, rubric],
        ] as const) {
          const item = yield* Schema.decodeEffect(QuestionItemSchema)({
            responses: { en: response },
          });
          expect(
            yield* questionResponseFor(item, ArtifactLocaleSchema.make("en"))
          ).toEqual(frozen);
        }
      })
  );
});
