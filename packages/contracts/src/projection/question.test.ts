import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Exit, Schema } from "effect";

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
        Arr.map([prompt, answer], (value) =>
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
        expect(
          yield* Schema.decodeEffect(
            Schema.fromJsonString(QuestionBodyProjectionSchema)
          )(canonicalizeQuestionProjection(projection))
        ).toEqual(projection);
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

      expect(
        yield* Schema.decodeEffect(
          Schema.fromJsonString(QuestionBodyProjectionSchema)
        )(canonicalizeQuestionProjection(projection))
      ).toEqual(projection);
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
      expect(Exit.isFailure(decode({ ...prompt, choices: [] }))).toBe(true);
      expect(
        Exit.isFailure(
          decode({
            ...prompt,
            metadata: { ...prompt.metadata, date: "2026-07-01" },
          })
        )
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

describe("pinned question canonical bytes", () => {
  const pinnedPrompt = Schema.decodeSync(
    Schema.fromJsonString(QuestionBodyProjectionSchema)
  )(
    '{"artifactLocale": "id", "blueprint": {"cognitiveLevel": "reasoning", "contentDomain": "algebra", "topic": "functions"}, "bodyKind": "question", "contentKey": "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/question", "kind": "question-body", "metadata": {"authors": [{"name": "Tim Café"}, {"name": "Nabil Ñandú"}], "dateModified": "2026-07-02", "datePublished": "2026-07-01", "title": "Soal Ñandú 1"}, "peerContentKey": "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/answer", "questionKey": "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1", "questionNumber": 1, "response": {"kind": "single-choice", "options": [{"isCorrect": true, "label": "Pilihan Ñandú", "optionKey": "option-1", "order": 1}, {"isCorrect": false, "label": "Pilihan café", "optionKey": "option-2", "order": 2}]}, "setKey": "question-bank/tryout/test-country/test-exam/test-section-2/test-set", "stimulusKey": "shared-table"}'
  );
  const pinnedPromptMinimal = Schema.decodeSync(
    Schema.fromJsonString(QuestionBodyProjectionSchema)
  )(
    '{"artifactLocale": "id", "bodyKind": "question", "contentKey": "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/question", "kind": "question-body", "metadata": {"authors": [], "datePublished": "2026-07-01", "title": "Soal Ñandú 1"}, "peerContentKey": "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/answer", "questionKey": "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1", "questionNumber": 1, "response": {"kind": "single-choice", "options": [{"isCorrect": true, "label": "Pilihan Ñandú", "optionKey": "option-1", "order": 1}, {"isCorrect": false, "label": "Pilihan café", "optionKey": "option-2", "order": 2}]}, "setKey": "question-bank/tryout/test-country/test-exam/test-section-2/test-set"}'
  );
  const pinnedAnswer = Schema.decodeSync(
    Schema.fromJsonString(QuestionBodyProjectionSchema)
  )(
    '{"artifactLocale": "id", "blueprint": {"cognitiveLevel": "reasoning", "contentDomain": "algebra", "topic": "functions"}, "bodyKind": "answer", "contentKey": "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/answer", "kind": "question-body", "metadata": {"authors": [{"name": "Tim Café"}, {"name": "Nabil Ñandú"}], "dateModified": "2026-07-02", "datePublished": "2026-07-01", "title": "Kunci Ñandú 1"}, "peerContentKey": "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/question", "questionKey": "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1", "questionNumber": 1, "setKey": "question-bank/tryout/test-country/test-exam/test-section-2/test-set", "stimulusKey": "shared-table"}'
  );
  const pinnedAnswerMinimal = Schema.decodeSync(
    Schema.fromJsonString(QuestionBodyProjectionSchema)
  )(
    '{"artifactLocale": "id", "bodyKind": "answer", "contentKey": "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/answer", "kind": "question-body", "metadata": {"authors": [], "datePublished": "2026-07-01", "title": "Kunci Ñandú 1"}, "peerContentKey": "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/question", "questionKey": "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1", "questionNumber": 1, "setKey": "question-bank/tryout/test-country/test-exam/test-section-2/test-set"}'
  );

  it("pins prompt bytes with blueprint, stimulus, and modification date", () => {
    expect(
      canonicalizeQuestionProjection(
        Schema.decodeSync(QuestionBodyProjectionSchema)(pinnedPrompt)
      )
    ).toBe(
      '{"bodyKind":"question","response":{"kind":"single-choice","options":[{"isCorrect":true,"label":"Pilihan Ñandú","optionKey":"option-1","order":1},{"isCorrect":false,"label":"Pilihan café","optionKey":"option-2","order":2}]},"artifactLocale":"id","blueprint":{"cognitiveLevel":"reasoning","contentDomain":"algebra","topic":"functions"},"contentKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/question","kind":"question-body","metadata":{"authors":[{"name":"Tim Café"},{"name":"Nabil Ñandú"}],"dateModified":"2026-07-02","datePublished":"2026-07-01","title":"Soal Ñandú 1"},"peerContentKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/answer","questionKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1","questionNumber":1,"setKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set","stimulusKey":"shared-table"}'
    );
  });

  it("pins prompt bytes with every optional field absent", () => {
    expect(
      canonicalizeQuestionProjection(
        Schema.decodeSync(QuestionBodyProjectionSchema)(pinnedPromptMinimal)
      )
    ).toBe(
      '{"bodyKind":"question","response":{"kind":"single-choice","options":[{"isCorrect":true,"label":"Pilihan Ñandú","optionKey":"option-1","order":1},{"isCorrect":false,"label":"Pilihan café","optionKey":"option-2","order":2}]},"artifactLocale":"id","contentKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/question","kind":"question-body","metadata":{"authors":[],"datePublished":"2026-07-01","title":"Soal Ñandú 1"},"peerContentKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/answer","questionKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1","questionNumber":1,"setKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set"}'
    );
  });

  it("pins answer bytes with blueprint, stimulus, and modification date", () => {
    expect(
      canonicalizeQuestionProjection(
        Schema.decodeSync(QuestionBodyProjectionSchema)(pinnedAnswer)
      )
    ).toBe(
      '{"bodyKind":"answer","artifactLocale":"id","blueprint":{"cognitiveLevel":"reasoning","contentDomain":"algebra","topic":"functions"},"contentKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/answer","kind":"question-body","metadata":{"authors":[{"name":"Tim Café"},{"name":"Nabil Ñandú"}],"dateModified":"2026-07-02","datePublished":"2026-07-01","title":"Kunci Ñandú 1"},"peerContentKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/question","questionKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1","questionNumber":1,"setKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set","stimulusKey":"shared-table"}'
    );
  });

  it("pins answer bytes with every optional field absent", () => {
    expect(
      canonicalizeQuestionProjection(
        Schema.decodeSync(QuestionBodyProjectionSchema)(pinnedAnswerMinimal)
      )
    ).toBe(
      '{"bodyKind":"answer","artifactLocale":"id","contentKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/answer","kind":"question-body","metadata":{"authors":[],"datePublished":"2026-07-01","title":"Kunci Ñandú 1"},"peerContentKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/question","questionKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1","questionNumber":1,"setKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set"}'
    );
  });
});
