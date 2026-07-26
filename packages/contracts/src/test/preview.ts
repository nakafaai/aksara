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
export const testPreviewTarget = Schema.decodeUnknownSync(
  TryoutPreviewTargetSchema
)({
  exam: {
    countryKey: "indonesia",
    examKey: "snbt",
    graph,
    kind: "exam",
    locale: "en",
    order: 1,
    publicPath: "try-out/indonesia/snbt",
    scoringStrategy: "irt",
    sourceRevision: "test-preview-v1",
    title: "Test Exam",
  },
  placement: {
    answerContentKey: `${questionKey}/answer`,
    countryKey: "indonesia",
    examKey: "snbt",
    locale: "en",
    questionContentKey: `${questionKey}/question`,
    questionOrder: 1,
    questionSourcePath: questionRoot,
    rendererDomain: "snbt-general",
    scope: "server",
    sectionKey: "general-reasoning",
    setKey: "set-1",
    sourceRevision: "test-preview-v1",
    trackKey: "2027",
  },
  section: {
    countryKey: "indonesia",
    examKey: "snbt",
    graph,
    kind: "section",
    locale: "en",
    order: 1,
    publicPath: "try-out/indonesia/snbt/2027/set-1/general-reasoning",
    questionCount: 20,
    questionSourcePath:
      "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
    sectionKey: "general-reasoning",
    setKey: "set-1",
    sourceRevision: "test-preview-v1",
    timeLimitSeconds: 1800,
    title: "Test Section",
    trackKey: "2027",
    visibility: "visible",
  },
  set: {
    countryKey: "indonesia",
    examKey: "snbt",
    graph,
    kind: "set",
    locale: "en",
    order: 1,
    publicPath: "try-out/indonesia/snbt/2027/set-1",
    questionCount: 20,
    scoringStrategy: "irt",
    sectionCount: 1,
    setKey: "set-1",
    sourceRevision: "test-preview-v1",
    title: "Test Set",
    trackKey: "2027",
    visibleSectionCount: 1,
  },
  track: {
    countryKey: "indonesia",
    examKey: "snbt",
    graph,
    kind: "track",
    locale: "en",
    order: 1,
    publicPath: "try-out/indonesia/snbt/2027",
    questionCount: 20,
    sectionCount: 1,
    setCount: 1,
    sourceRevision: "test-preview-v1",
    title: "Test Track",
    trackKey: "2027",
    trackKind: "year",
    visibleSectionCount: 1,
  },
});

/** Exact article document used only by preview contract tests. */
export const testArticleDocument = Schema.decodeUnknownSync(
  ArticlePreviewDocumentSchema
)({
  delivery: "public",
  family: "article",
  rendererDomain: "politics",
  route: {
    articleSlug: "test-article",
    category: "politics",
    contentKey: "articles/politics/test-article",
    graph: articleGraph("en", "politics", "test-article"),
    locale: "en",
    publicPath: "articles/politics/test-article",
  },
  sourcePath: "packages/corpus/articles/politics/test/test-article/en.mdx",
});

/** Exact material document used only by preview contract tests. */
export const testMaterialDocument = Schema.decodeUnknownSync(
  MaterialPreviewDocumentSchema
)({
  delivery: "public",
  family: "material",
  rendererDomain: "mathematics",
  route: {
    contentKey: "test:material",
    graph: materialGraph("en", "test", "material", "test-lesson"),
    locale: "en",
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
  bodyKind: "question",
  contentKey: `${questionKey}/question`,
  locale: "en",
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
export const testPromptDocument = Schema.decodeUnknownSync(
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
export const testAnswerDocument = Schema.decodeUnknownSync(
  QuestionAnswerPreviewDocumentSchema
)({
  delivery: "entitled",
  family: "question",
  identity: answerIdentity,
  rendererDomain: "snbt-general",
  sourcePath: `${questionRoot}/answer.en.mdx`,
  target: testPreviewTarget,
});

const metadata = {
  authors: [{ name: "Test Author" }],
  date: "2026-07-24",
  title: "Test Preview",
};

/** Exact article projection used only by preview contract tests. */
export const testArticleProjection = Schema.decodeUnknownSync(
  ArticleProjectionSchema
)({
  ...testArticleDocument.route,
  categoryTitle: "Politics",
  kind: "article",
  metadata,
  official: true,
  parentPath: "articles/politics",
  references: [],
  sitemap: true,
});

/** Exact material projection used only by preview contract tests. */
export const testMaterialProjection = Schema.decodeUnknownSync(
  MaterialLessonProjectionSchema
)({
  ...testMaterialDocument.route,
  kind: "subject-lesson",
  metadata,
  parentPath: "subjects/test/material",
  sitemap: true,
});

/** Exact question prompt projection used only by preview contract tests. */
export const testPromptProjection = Schema.decodeUnknownSync(
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

/** Exact answer projection used only by preview contract tests. */
export const testAnswerProjection = Schema.decodeUnknownSync(
  QuestionAnswerProjectionSchema
)({
  ...answerIdentity,
  kind: "question-body",
  metadata,
});
