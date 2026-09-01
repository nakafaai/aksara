import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";

import { ContentKeySchema } from "#contracts/ids";
import { type ArtifactLocale, ArtifactLocaleSchema } from "#contracts/locale";
import {
  canonicalizeQuestionProjection,
  makeQuestionBodyProjection,
  QuestionAnswerProjectionSchema,
  QuestionBodyProjectionSchema,
  QuestionPromptProjectionSchema,
} from "#contracts/projection/question";
import {
  QuestionKeySchema,
  QuestionSetKeySchema,
} from "#contracts/question/identity";
import {
  QuestionItemSchema,
  QuestionResponseLocaleMissingError,
} from "#contracts/question/item";

const questionKey = QuestionKeySchema.make(
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1"
);
const setKey = QuestionSetKeySchema.make(
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1"
);
const metadata = {
  authors: [{ name: "Test Author" }],
  datePublished: "2026-07-01",
  title: "Question 1",
};
const item = Schema.decodeSync(QuestionItemSchema)({
  responses: {
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "A" },
        { isCorrect: false, label: "B" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: true, label: "A (ID)" },
        { isCorrect: false, label: "B (ID)" },
      ],
    },
  },
});
const documentedItem = Schema.decodeSync(QuestionItemSchema)({
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  responses: item.responses,
  stimulusKey: "shared-table",
});

/** Builds one strict prompt projection for the selected locale. */
const promptProjection = Effect.fn("QuestionProjectionTest.prompt")(function* (
  artifactLocale: ArtifactLocale
) {
  const projection = yield* makeQuestionBodyProjection({
    artifactLocale,
    bodyKind: "question",
    contentKey: ContentKeySchema.make(`${questionKey}/question`),
    item,
    metadata,
    peerContentKey: ContentKeySchema.make(`${questionKey}/answer`),
    questionKey,
    questionNumber: 1,
    setKey,
  });
  return yield* Schema.decodeUnknownEffect(QuestionPromptProjectionSchema)(
    projection
  );
});

/** Builds one strict answer projection for the selected locale. */
const answerProjection = Effect.fn("QuestionProjectionTest.answer")(function* (
  artifactLocale: ArtifactLocale
) {
  const projection = yield* makeQuestionBodyProjection({
    artifactLocale,
    bodyKind: "answer",
    contentKey: ContentKeySchema.make(`${questionKey}/answer`),
    item,
    metadata,
    peerContentKey: ContentKeySchema.make(`${questionKey}/question`),
    questionKey,
    questionNumber: 1,
    setKey,
  });
  return yield* Schema.decodeUnknownEffect(QuestionAnswerProjectionSchema)(
    projection
  );
});

describe("question projection", () => {
  it.effect("projects one frozen locale response only on the prompt", () =>
    Effect.gen(function* () {
      const prompt = yield* promptProjection(ArtifactLocaleSchema.make("id"));
      const answer = yield* answerProjection(ArtifactLocaleSchema.make("en"));

      expect(prompt.response).toEqual({
        kind: "single-choice",
        options: [
          {
            isCorrect: true,
            label: "A (ID)",
            optionKey: "option-1",
            order: 1,
          },
          {
            isCorrect: false,
            label: "B (ID)",
            optionKey: "option-2",
            order: 2,
          },
        ],
      });
      expect("response" in answer).toBe(false);
      expect(
        [prompt, answer].map((value) =>
          Schema.decodeSync(QuestionBodyProjectionSchema)(value)
        )
      ).toEqual([prompt, answer]);
    })
  );

  it.effect("canonically serializes both body variants", () =>
    Effect.gen(function* () {
      const projections = yield* Effect.all([
        promptProjection(ArtifactLocaleSchema.make("en")),
        answerProjection(ArtifactLocaleSchema.make("id")),
      ]);
      for (const projection of projections) {
        expect(JSON.parse(canonicalizeQuestionProjection(projection))).toEqual(
          projection
        );
      }
    })
  );

  it.effect("preserves complete editorial facts in canonical bytes", () =>
    Effect.gen(function* () {
      const projection = yield* makeQuestionBodyProjection({
        artifactLocale: ArtifactLocaleSchema.make("en"),
        bodyKind: "question",
        contentKey: ContentKeySchema.make(`${questionKey}/question`),
        item: documentedItem,
        metadata: { ...metadata, dateModified: "2026-07-02" },
        peerContentKey: ContentKeySchema.make(`${questionKey}/answer`),
        questionKey,
        questionNumber: 1,
        setKey,
      });

      expect(JSON.parse(canonicalizeQuestionProjection(projection))).toEqual(
        projection
      );
      expect(projection).toMatchObject({
        blueprint: documentedItem.blueprint,
        stimulusKey: "shared-table",
      });
    })
  );

  it.effect("rejects invented metadata and an answer response", () =>
    Effect.gen(function* () {
      const prompt = yield* promptProjection(ArtifactLocaleSchema.make("en"));
      const answer = yield* answerProjection(ArtifactLocaleSchema.make("en"));
      const decode = Schema.decodeUnknownExit(QuestionBodyProjectionSchema, {
        onExcessProperty: "error",
      });

      expect(
        Exit.isFailure(decode({ ...prompt, description: "Invented" }))
      ).toBe(true);
      expect(
        Exit.isFailure(decode({ ...answer, response: prompt.response }))
      ).toBe(true);
    })
  );

  it.effect("returns a typed failure when the response locale is missing", () =>
    Effect.gen(function* () {
      const error = yield* makeQuestionBodyProjection({
        artifactLocale: ArtifactLocaleSchema.make("de"),
        bodyKind: "question",
        contentKey: ContentKeySchema.make(`${questionKey}/question`),
        item,
        metadata,
        peerContentKey: ContentKeySchema.make(`${questionKey}/answer`),
        questionKey,
        questionNumber: 1,
        setKey,
      }).pipe(Effect.flip);

      expect(error).toBeInstanceOf(QuestionResponseLocaleMissingError);
    })
  );
});
