import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";
import { ContentKeySchema } from "#contracts/ids";
import { type ArtifactLocale, ArtifactLocaleSchema } from "#contracts/locale";
import {
  canonicalizeQuestionProjection,
  makeQuestionBodyProjection,
  QuestionAnswerProjectionSchema,
  QuestionBodyProjectionSchema,
  QuestionChoiceLocaleMissingError,
  QuestionChoicesSchema,
  QuestionPromptProjectionSchema,
} from "#contracts/projection/question";
import {
  QuestionKeySchema,
  QuestionSetKeySchema,
} from "#contracts/question/identity";

const questionKey = QuestionKeySchema.make(
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1"
);
const setKey = QuestionSetKeySchema.make(
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1"
);
const metadata = {
  authors: [{ name: "Nakafa" }],
  date: "2026-07-01",
  title: "Question 1",
};
const choices = Schema.decodeSync(QuestionChoicesSchema)({
  en: [
    { label: "A", value: true },
    { label: "B", value: false },
  ],
  id: [
    { label: "A", value: false },
    { label: "B", value: true },
  ],
});

/** Builds one strict prompt projection for the selected locale. */
const promptProjection = Effect.fn("QuestionProjectionTest.prompt")(function* (
  artifactLocale: ArtifactLocale
) {
  const projection = yield* makeQuestionBodyProjection({
    artifactLocale,
    bodyKind: "question",
    choices,
    contentKey: ContentKeySchema.make(`${questionKey}/question`),
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
    choices,
    contentKey: ContentKeySchema.make(`${questionKey}/answer`),
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
  it.effect("projects only locale choices on prompts and none on answers", () =>
    Effect.gen(function* () {
      const prompt = yield* promptProjection(ArtifactLocaleSchema.make("id"));
      const answer = yield* answerProjection(ArtifactLocaleSchema.make("en"));

      expect(prompt.choices).toEqual(choices.id);
      expect("choices" in answer).toBe(false);
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

  it("requires exactly one correct choice in every locale", () => {
    for (const localized of [
      [{ label: "A", value: false }],
      [
        { label: "A", value: true },
        { label: "B", value: true },
      ],
    ]) {
      const result = Schema.decodeExit(QuestionChoicesSchema)({
        en: localized,
        id: choices.id,
      });
      expect(Exit.isFailure(result)).toBe(true);
      expect(Exit.isFailure(result) ? String(result.cause) : "").toContain(
        "Expected exactly one correct choice."
      );
    }
  });

  it.effect("rejects invented metadata and answer choices", () =>
    Effect.gen(function* () {
      const prompt = yield* promptProjection(ArtifactLocaleSchema.make("en"));
      const answer = yield* answerProjection(ArtifactLocaleSchema.make("en"));
      const decode = Schema.decodeUnknownExit(QuestionBodyProjectionSchema, {
        onExcessProperty: "error",
      });

      expect(
        Exit.isFailure(decode({ ...prompt, description: "Invented" }))
      ).toBe(true);
      expect(Exit.isFailure(decode({ ...answer, choices: choices.en }))).toBe(
        true
      );
    })
  );

  it.effect("returns a typed failure when prompt choices are missing", () =>
    Effect.gen(function* () {
      const error = yield* makeQuestionBodyProjection({
        artifactLocale: ArtifactLocaleSchema.make("de"),
        bodyKind: "question",
        choices,
        contentKey: ContentKeySchema.make(`${questionKey}/question`),
        metadata,
        peerContentKey: ContentKeySchema.make(`${questionKey}/answer`),
        questionKey,
        questionNumber: 1,
        setKey,
      }).pipe(Effect.flip);

      expect(error).toBeInstanceOf(QuestionChoiceLocaleMissingError);
    })
  );
});
