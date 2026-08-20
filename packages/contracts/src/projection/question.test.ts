import { describe, expect, it } from "@nakafa/testing/effect";
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
function promptProjection(artifactLocale: ArtifactLocale) {
  return Schema.decodeUnknownSync(QuestionPromptProjectionSchema)(
    Effect.runSync(
      makeQuestionBodyProjection({
        artifactLocale,
        bodyKind: "question",
        choices,
        contentKey: ContentKeySchema.make(`${questionKey}/question`),
        metadata,
        peerContentKey: ContentKeySchema.make(`${questionKey}/answer`),
        questionKey,
        questionNumber: 1,
        setKey,
      })
    )
  );
}

/** Builds one strict answer projection for the selected locale. */
function answerProjection(artifactLocale: ArtifactLocale) {
  return Schema.decodeUnknownSync(QuestionAnswerProjectionSchema)(
    Effect.runSync(
      makeQuestionBodyProjection({
        artifactLocale,
        bodyKind: "answer",
        choices,
        contentKey: ContentKeySchema.make(`${questionKey}/answer`),
        metadata,
        peerContentKey: ContentKeySchema.make(`${questionKey}/question`),
        questionKey,
        questionNumber: 1,
        setKey,
      })
    )
  );
}

describe("question projection", () => {
  it("projects only locale choices on prompts and none on answers", () => {
    const prompt = promptProjection(ArtifactLocaleSchema.make("id"));
    const answer = answerProjection(ArtifactLocaleSchema.make("en"));

    expect(prompt.choices).toEqual(choices.id);
    expect("choices" in answer).toBe(false);
    expect(
      [prompt, answer].map((value) =>
        Schema.decodeSync(QuestionBodyProjectionSchema)(value)
      )
    ).toEqual([prompt, answer]);
  });

  it("canonically serializes both body variants", () => {
    for (const value of [
      promptProjection(ArtifactLocaleSchema.make("en")),
      answerProjection(ArtifactLocaleSchema.make("id")),
    ]) {
      expect(JSON.parse(canonicalizeQuestionProjection(value))).toEqual(value);
    }
  });

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

  it("rejects invented metadata and answer choices", () => {
    const prompt = promptProjection(ArtifactLocaleSchema.make("en"));
    const answer = answerProjection(ArtifactLocaleSchema.make("en"));
    const decode = Schema.decodeUnknownExit(QuestionBodyProjectionSchema, {
      onExcessProperty: "error",
    });

    expect(Exit.isFailure(decode({ ...prompt, description: "Invented" }))).toBe(
      true
    );
    expect(Exit.isFailure(decode({ ...answer, choices: choices.en }))).toBe(
      true
    );
  });

  it("returns a typed failure when prompt choices are missing", () => {
    const error = Effect.runSync(
      makeQuestionBodyProjection({
        artifactLocale: ArtifactLocaleSchema.make("de"),
        bodyKind: "question",
        choices,
        contentKey: ContentKeySchema.make(`${questionKey}/question`),
        metadata,
        peerContentKey: ContentKeySchema.make(`${questionKey}/answer`),
        questionKey,
        questionNumber: 1,
        setKey,
      }).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(QuestionChoiceLocaleMissingError);
  });
});
