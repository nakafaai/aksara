import { Schema } from "effect";

import { ContentSnapshotRowSchema } from "#contracts/release/snapshot/data";

/** Test try-out placement row. */
export const placementRow = Schema.decodeSync(ContentSnapshotRowSchema)({
  family: "tryout",
  record: {
    row: {
      answerArtifactHash:
        "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      answerArtifactLocale: "de",
      answerContentKey:
        "question-bank/tryout/test-country/test-exam/test-section/test-set/question-1/answer",
      appLocale: "de",
      contentHash:
        "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
      countryKey: "test-country",
      deliveryLanguage: "de",
      examKey: "test-exam",
      languagePolicy: { kind: "app-locale" },
      questionArtifactHash:
        "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      questionArtifactLocale: "de",
      questionContentKey:
        "question-bank/tryout/test-country/test-exam/test-section/test-set/question-1/question",
      questionOrder: 1,
      questionSourcePath:
        "packages/corpus/question-bank/tryout/test-country/test-exam/test-section/test-set/question-1",
      rendererDomain: "snbt-quant",
      response: {
        kind: "single-choice",
        options: [
          {
            isCorrect: true,
            label: "Test-only correct option",
            optionKey: "option-1",
            order: 1,
          },
          {
            isCorrect: false,
            label: "Test-only distractor",
            optionKey: "option-2",
            order: 2,
          },
        ],
      },
      scope: "server",
      sectionKey: "test-section",
      setKey: "test-set",
      sourceRevision: "2026-08-12",
      trackKey: "test-track",
    },
    rowHash:
      "sha256:7b99090567abb870969f34b114cf13fa5b6ef8fb627a916767f4c5a13398a3c8",
  },
  rowKind: "placement",
});

/** Test try-out placement row with points, a blueprint, and a stimulus. */
export const scoredPlacementRow = Schema.decodeSync(ContentSnapshotRowSchema)({
  family: "tryout",
  record: {
    row: {
      answerArtifactHash:
        "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      answerArtifactLocale: "id",
      answerContentKey:
        "question-bank/tryout/test-country/test-exam/test-section/test-set/question-2/answer",
      appLocale: "id",
      blueprint: {
        cognitiveLevel: "apply",
        contentDomain: "algebra",
        topic: "linear-equations",
      },
      contentHash:
        "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
      countryKey: "test-country",
      deliveryLanguage: "id",
      examKey: "test-exam",
      languagePolicy: { kind: "app-locale" },
      points: 2,
      questionArtifactHash:
        "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      questionArtifactLocale: "id",
      questionContentKey:
        "question-bank/tryout/test-country/test-exam/test-section/test-set/question-2/question",
      questionOrder: 2,
      questionSourcePath:
        "packages/corpus/question-bank/tryout/test-country/test-exam/test-section/test-set/question-2",
      rendererDomain: "snbt-quant",
      response: {
        kind: "single-choice",
        options: [
          {
            isCorrect: true,
            label: "Jawaban benar é",
            optionKey: "option-1",
            order: 1,
          },
          {
            isCorrect: false,
            label: "Pengecoh é",
            optionKey: "option-2",
            order: 2,
          },
        ],
      },
      scope: "server",
      sectionKey: "test-section",
      setKey: "test-set",
      sourceRevision: "2026-08-12",
      stimulusKey: "stimulus-1",
      trackKey: "test-track",
    },
    rowHash:
      "sha256:cafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafe",
  },
  rowKind: "placement",
});
