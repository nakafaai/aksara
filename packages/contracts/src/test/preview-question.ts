import { Schema } from "effect";

import {
  QuestionAnswerPreviewDocumentSchema,
  QuestionPromptPreviewDocumentSchema,
} from "#contracts/preview/document";
import { TryoutPreviewTargetSchema } from "#contracts/preview/target";
import {
  QuestionAnswerProjectionSchema,
  QuestionPromptProjectionSchema,
} from "#contracts/projection/question";

const graph = {
  alignmentId: "alignment:test:preview",
  assetId: "asset:test:preview",
  conceptId: "concept:test:preview",
  learningObjectId: "lo:test:preview",
  lensId: "lens:test:preview",
};
const metadata = {
  authors: [{ name: "Test Author" }],
  datePublished: "2026-07-24",
  title: "Test Preview",
};
const setKey = "question-bank/tryout/indonesia/snbt/general-reasoning/set-1";
const questionKey = `${setKey}/question-1`;
const questionRoot =
  "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";

/** Exact visible try-out target used only by preview contract tests. */
export const testPreviewTarget = Schema.decodeSync(TryoutPreviewTargetSchema)({
  exam: {
    appLocale: "en",
    countryKey: "indonesia",
    examKey: "snbt",
    graph,
    kind: "exam",
    order: 1,
    publicPath: "try-out/indonesia/snbt",
    scoringStrategy: "irt",
    sourceRevision: "test-preview",
    title: "Test Exam",
  },
  placement: {
    answerArtifactLocale: "en",
    answerContentKey: `${questionKey}/answer`,
    appLocale: "en",
    countryKey: "indonesia",
    deliveryLanguage: "en",
    examKey: "snbt",
    languagePolicy: { kind: "app-locale" },
    questionArtifactLocale: "en",
    questionContentKey: `${questionKey}/question`,
    questionOrder: 1,
    questionSourcePath: questionRoot,
    rendererDomain: "snbt-general",
    scope: "server",
    sectionKey: "general-reasoning",
    setKey: "set-1",
    sourceRevision: "test-preview",
    trackKey: "2027",
  },
  section: {
    appLocale: "en",
    countryKey: "indonesia",
    examKey: "snbt",
    graph,
    kind: "section",
    order: 1,
    publicPath: "try-out/indonesia/snbt/2027/set-1/general-reasoning",
    questionCount: 20,
    questionSourcePath:
      "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
    sectionKey: "general-reasoning",
    setKey: "set-1",
    sourceRevision: "test-preview",
    timeLimitSeconds: 1800,
    title: "Test Section",
    trackKey: "2027",
    visibility: "visible",
  },
  set: {
    appLocale: "en",
    countryKey: "indonesia",
    examKey: "snbt",
    graph,
    kind: "set",
    order: 1,
    publicPath: "try-out/indonesia/snbt/2027/set-1",
    questionCount: 20,
    scoringStrategy: "irt",
    sectionCount: 1,
    setKey: "set-1",
    sourceRevision: "test-preview",
    title: "Test Set",
    trackKey: "2027",
    visibleSectionCount: 1,
  },
  track: {
    appLocale: "en",
    countryKey: "indonesia",
    examKey: "snbt",
    graph,
    kind: "track",
    order: 1,
    publicPath: "try-out/indonesia/snbt/2027",
    questionCount: 20,
    sectionCount: 1,
    setCount: 1,
    sourceRevision: "test-preview",
    title: "Test Track",
    trackKey: "2027",
    trackKind: "year",
    visibleSectionCount: 1,
  },
});

const testAssessedPreviewTarget = Schema.decodeSync(TryoutPreviewTargetSchema)({
  ...testPreviewTarget,
  exam: { ...testPreviewTarget.exam, appLocale: "de" },
  placement: {
    ...testPreviewTarget.placement,
    answerArtifactLocale: "de",
    appLocale: "de",
    deliveryLanguage: "en",
    languagePolicy: { kind: "fixed", language: "en" },
    questionArtifactLocale: "en",
  },
  section: { ...testPreviewTarget.section, appLocale: "de" },
  set: { ...testPreviewTarget.set, appLocale: "de" },
  track: { ...testPreviewTarget.track, appLocale: "de" },
});

const promptIdentity = {
  artifactLocale: "en",
  bodyKind: "question",
  contentKey: `${questionKey}/question`,
  peerContentKey: `${questionKey}/answer`,
  questionKey,
  questionNumber: 1,
  setKey,
} as const;
const answerIdentity = {
  ...promptIdentity,
  bodyKind: "answer",
  contentKey: `${questionKey}/answer`,
  peerContentKey: `${questionKey}/question`,
} as const;

/** Exact question prompt document used only by preview contract tests. */
export const testPromptDocument = Schema.decodeSync(
  QuestionPromptPreviewDocumentSchema
)({
  delivery: "authenticated",
  family: "question",
  identity: promptIdentity,
  rendererDomain: "snbt-general",
  sourcePath: `${questionRoot}/question.en.mdx`,
  target: testPreviewTarget,
});

/** Exact entitled answer document used only by preview contract tests. */
export const testAnswerDocument = Schema.decodeSync(
  QuestionAnswerPreviewDocumentSchema
)({
  delivery: "entitled",
  family: "question",
  identity: answerIdentity,
  rendererDomain: "snbt-general",
  sourcePath: `${questionRoot}/answer.en.mdx`,
  target: testPreviewTarget,
});

/** German answer paired with the immutable English assessed-language prompt. */
export const testAssessedAnswerDocument = Schema.decodeSync(
  QuestionAnswerPreviewDocumentSchema
)({
  ...testAnswerDocument,
  identity: { ...testAnswerDocument.identity, artifactLocale: "de" },
  sourcePath: `${questionRoot}/answer.de.mdx`,
  target: testAssessedPreviewTarget,
});

/** Exact question prompt projection used only by preview contract tests. */
export const testPromptProjection = Schema.decodeSync(
  QuestionPromptProjectionSchema
)({
  ...promptIdentity,
  kind: "question-body",
  metadata,
  response: {
    kind: "single-choice",
    options: [
      {
        isCorrect: true,
        label: [{ kind: "text", text: "Test correct choice" }],
        optionKey: "option-1",
        order: 1,
      },
      {
        isCorrect: false,
        label: [{ kind: "text", text: "Test incorrect choice" }],
        optionKey: "option-2",
        order: 2,
      },
    ],
  },
});

/** Invalid German prompt fixture for an English assessed-language document. */
export const testGermanPromptProjection = Schema.decodeSync(
  QuestionPromptProjectionSchema
)({
  ...testPromptProjection,
  artifactLocale: "de",
});

/** Exact answer projection used only by preview contract tests. */
export const testAnswerProjection = Schema.decodeSync(
  QuestionAnswerProjectionSchema
)({
  ...answerIdentity,
  kind: "question-body",
  metadata,
});

/** German answer projection paired with the immutable English test prompt. */
export const testAssessedAnswerProjection = Schema.decodeSync(
  QuestionAnswerProjectionSchema
)({
  ...testAnswerProjection,
  artifactLocale: "de",
});
