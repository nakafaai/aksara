import { Schema } from "effect";
import {
  ArticlePreviewDocumentSchema,
  MaterialPreviewDocumentSchema,
  QuestionAnswerPreviewDocumentSchema,
  QuestionPromptPreviewDocumentSchema,
} from "#contracts/preview/document";
import { TryoutPreviewTargetSchema } from "#contracts/preview/target";
import { ArticleProjectionSchema } from "#contracts/projection/article";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import {
  QuestionAnswerProjectionSchema,
  QuestionPromptProjectionSchema,
} from "#contracts/projection/question";
import { articleGraph, materialGraph } from "#contracts/test/graph";

const graph = {
  alignmentId: "alignment:test:preview",
  assetId: "asset:test:preview",
  conceptId: "concept:test:preview",
  learningObjectId: "lo:test:preview",
  lensId: "lens:test:preview",
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
    questionArtifactLocale: "en",
  },
  section: { ...testPreviewTarget.section, appLocale: "de" },
  set: { ...testPreviewTarget.set, appLocale: "de" },
  track: { ...testPreviewTarget.track, appLocale: "de" },
});

/** Exact article document used only by preview contract tests. */
export const testArticleDocument = Schema.decodeSync(
  ArticlePreviewDocumentSchema
)({
  delivery: "public",
  family: "article",
  rendererDomain: "politics",
  route: {
    appLocale: "en",
    articleRouteSlug: "test-article",
    articleSlug: "test-article",
    artifactLocale: "en",
    category: "politics",
    categoryRouteSlug: "politics",
    contentKey: "articles/politics/test-article",
    graph: articleGraph("en", "politics", "test-article"),
    publicPath: "articles/politics/test-article",
  },
  sourcePath: "packages/corpus/articles/politics/test/test-article/en.mdx",
});

/** Exact material document used only by preview contract tests. */
export const testMaterialDocument = Schema.decodeSync(
  MaterialPreviewDocumentSchema
)({
  delivery: "public",
  family: "material",
  rendererDomain: "mathematics",
  route: {
    appLocale: "en",
    artifactLocale: "en",
    contentKey: "test:material",
    graph: materialGraph("en", "test", "material", "test-lesson"),
    materialKey: "lesson.test.material",
    order: 1,
    publicPath: "subjects/test/material/test-lesson",
    sectionKey: "test-lesson",
    topicTitle: "Test Material",
  },
  sourcePath:
    "packages/corpus/material/lesson/test/material/test-lesson/en.mdx",
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

const metadata = {
  authors: [{ name: "Test Author" }],
  date: "2026-07-24",
  title: "Test Preview",
};

/** Exact article projection used only by preview contract tests. */
export const testArticleProjection = Schema.decodeSync(ArticleProjectionSchema)(
  {
    ...testArticleDocument.route,
    categoryTitle: "Politics",
    kind: "article",
    metadata,
    official: true,
    parentPath: "articles/politics",
    references: [],
    sitemap: true,
  }
);

/** Exact material projection used only by preview contract tests. */
export const testMaterialProjection = Schema.decodeSync(
  MaterialLessonProjectionSchema
)({
  ...testMaterialDocument.route,
  kind: "subject-lesson",
  metadata,
  parentPath: "subjects/test/material",
  sitemap: true,
});

/** Exact question prompt projection used only by preview contract tests. */
export const testPromptProjection = Schema.decodeSync(
  QuestionPromptProjectionSchema
)({
  ...promptIdentity,
  choices: [
    { label: "Test correct choice", value: true },
    { label: "Test incorrect choice", value: false },
  ],
  kind: "question-body",
  metadata,
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
