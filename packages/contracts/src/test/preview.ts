import { Schema } from "effect";

import {
  ArticlePreviewDocumentSchema,
  MaterialPreviewDocumentSchema,
  PagePreviewDocumentSchema,
} from "#contracts/preview/document";
import { ArticleProjectionSchema } from "#contracts/projection/article";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { PublicPageProjectionSchema } from "#contracts/projection/page";
import { articleGraph, materialGraph } from "#contracts/test/graph";

const metadata = {
  authors: [{ name: "Test Author" }],
  date: "2026-07-24",
  title: "Test Preview",
};

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

/** Exact public page document used only by preview contract tests. */
export const testPageDocument = Schema.decodeSync(PagePreviewDocumentSchema)({
  delivery: "public",
  family: "page",
  rendererDomain: "site",
  route: {
    appLocale: "en",
    artifactLocale: "en",
    contentKey: "pages/privacy-policy",
    pageKey: "privacy-policy",
    publicPath: "privacy-policy",
  },
  sourcePath: "packages/corpus/pages/privacy-policy/en.mdx",
});

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

/** Exact public page projection used only by preview contract tests. */
export const testPageProjection = Schema.decodeSync(PublicPageProjectionSchema)(
  {
    ...testPageDocument.route,
    kind: "public-page",
    metadata: {
      description: "How Nakafa processes personal data.",
      lastModified: "2026-08-20",
      title: "Privacy Policy",
    },
    sitemap: true,
  }
);
