import { Schema } from "effect";

import {
  HistoricalTryoutCatalogRowSchema,
  HistoricalTryoutPlacementSchema,
} from "#contracts/history/tryout-row";

const historicalGraph = {
  alignmentId: "alignment:tryout-indonesia",
  assetId: "asset:tryout-indonesia",
  conceptId: "concept:tryout-indonesia",
  learningObjectId: "lo:tryout-indonesia",
  lensId: "lens:tryout-indonesia",
} as const;

const localized = {
  description: "Retained description",
  graph: historicalGraph,
  locale: "en",
  sourceRevision: "retained-source",
  title: "Retained title",
} as const;

/** One valid retained row for every historical catalog discriminator. */
export const historicalCatalogRows = Schema.decodeSync(
  Schema.Array(HistoricalTryoutCatalogRowSchema)
)([
  {
    ...localized,
    countryCode: "ID",
    countryKey: "indonesia",
    kind: "country",
    order: 1,
    publicPath: "try-out/indonesia",
  },
  {
    ...localized,
    countryKey: "indonesia",
    examKey: "snbt",
    kind: "exam",
    order: 1,
    publicPath: "try-out/indonesia/snbt",
    scoringStrategy: "raw",
  },
  {
    ...localized,
    countryKey: "indonesia",
    examKey: "snbt",
    kind: "track",
    order: 1,
    publicPath: "try-out/indonesia/snbt/2027",
    questionCount: 100,
    sectionCount: 2,
    setCount: 1,
    trackKey: "2027",
    trackKind: "year",
    visibleSectionCount: 2,
  },
  {
    ...localized,
    countryKey: "indonesia",
    examKey: "snbt",
    kind: "set",
    order: 1,
    publicPath: "try-out/indonesia/snbt/2027/set-1",
    questionCount: 100,
    scoringStrategy: "raw",
    sectionCount: 2,
    setKey: "set-1",
    trackKey: "2027",
    visibleSectionCount: 2,
  },
  {
    ...localized,
    countryKey: "indonesia",
    examKey: "snbt",
    kind: "section",
    order: 1,
    publicPath: "try-out/indonesia/snbt/2027/set-1/general-reasoning",
    questionCount: 50,
    questionSourcePath:
      "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
    sectionKey: "general-reasoning",
    setKey: "set-1",
    timeLimitSeconds: 1800,
    trackKey: "2027",
    visibility: "visible",
  },
]);

/** One internal retained set whose entry section is not publicly routed. */
export const historicalInternalSet = Schema.decodeSync(
  HistoricalTryoutCatalogRowSchema
)({
  ...localized,
  countryKey: "indonesia",
  examKey: "snbt",
  internalEntrySectionKey: "entry",
  kind: "set",
  order: 1,
  publicPath: "try-out/indonesia/snbt/2027/set-entry",
  questionCount: 1,
  scoringStrategy: "raw",
  sectionCount: 1,
  setKey: "set-entry",
  trackKey: "2027",
  visibleSectionCount: 0,
});

/** One internal retained section without a public route. */
export const historicalInternalSection = Schema.decodeSync(
  HistoricalTryoutCatalogRowSchema
)({
  ...localized,
  countryKey: "indonesia",
  examKey: "snbt",
  kind: "section",
  order: 1,
  questionCount: 1,
  questionSourcePath:
    "packages/corpus/question-bank/tryout/indonesia/snbt/entry/set-entry",
  sectionKey: "entry",
  setKey: "set-entry",
  timeLimitSeconds: 60,
  trackKey: "2027",
  visibility: "internal-entry",
});

/** One valid retained placement used to exercise historical identity checks. */
export const historicalPlacement = Schema.decodeSync(
  HistoricalTryoutPlacementSchema
)({
  answerArtifactHash:
    "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
  answerContentKey:
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/answer",
  choices: [
    { isCorrect: true, label: "A", optionKey: "option-1", order: 1 },
    { isCorrect: false, label: "B", optionKey: "option-2", order: 2 },
  ],
  countryKey: "indonesia",
  examKey: "snbt",
  locale: "en",
  questionArtifactHash:
    "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
  questionContentKey:
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question",
  questionOrder: 1,
  questionSourcePath:
    "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1",
  rendererDomain: "snbt-general",
  scope: "server",
  sectionKey: "general-reasoning",
  setKey: "set-1",
  sourceRevision: "retained-source",
  title: "Question 1",
  trackKey: "2027",
});
