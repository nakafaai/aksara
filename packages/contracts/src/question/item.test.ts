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
import { canonicalQuestionResponse } from "#contracts/question/response";
import { shortNumber, shortText } from "#contracts/test/answer";
import {
  COHERENCE_MESSAGE,
  category,
  frozenCategory,
  itemCategory,
  itemFailure,
  itemMultiple,
  itemRubric,
  itemShort,
  itemSingle,
  multipleChoice,
  responseBytes,
  singleChoice,
} from "#contracts/test/question";
import {
  goldenRubricCanonical,
  patchRubricCriterion,
  rubric,
  rubricLabel,
  rubricSource,
  rubricSourceWith,
} from "#contracts/test/rubric";

describe("question item golden response bytes", () => {
  it("pins the canonical bytes of a blueprint in signed field order", () => {
    expect(
      JSON.stringify(
        canonicalQuestionBlueprint({
          cognitiveLevel: "reasoning",
          contentDomain: "algebra",
          topic: "functions",
        })
      )
    ).toBe(
      '{"cognitiveLevel":"reasoning","contentDomain":"algebra","topic":"functions"}'
    );
  });

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

  it.effect(
    "pins the frozen canonical bytes of every authored response kind",
    () =>
      Effect.gen(function* () {
        const en = ArtifactLocaleSchema.make("en");
        const frozen = {
          category: yield* questionResponseFor(itemCategory, en),
          multiple: yield* questionResponseFor(itemMultiple, en),
          rubric: yield* questionResponseFor(itemRubric, en),
          short: yield* questionResponseFor(itemShort, en),
          single: yield* questionResponseFor(itemSingle, en),
        };

        expect(JSON.stringify(canonicalQuestionResponse(frozen.single))).toBe(
          responseBytes.single
        );
        expect(JSON.stringify(canonicalQuestionResponse(frozen.multiple))).toBe(
          responseBytes.multiple
        );
        expect(JSON.stringify(canonicalQuestionResponse(frozen.short))).toBe(
          responseBytes.short
        );
        expect(JSON.stringify(canonicalQuestionResponse(frozen.category))).toBe(
          responseBytes.category
        );
        expect(JSON.stringify(canonicalQuestionResponse(frozen.rubric))).toBe(
          goldenRubricCanonical
        );
      })
  );
});

describe("question item", () => {
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

      expect(response).toEqual(frozenCategory);
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
