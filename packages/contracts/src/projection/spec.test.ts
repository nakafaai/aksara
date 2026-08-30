import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import { ArticleProjectionSchema } from "#contracts/projection/article";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { PublicPageProjectionSchema } from "#contracts/projection/page";
import { QuestionBodyProjectionSchema } from "#contracts/projection/question";
import {
  ContentProjectionSchema,
  CurrentContentProjectionSchema,
  canonicalizeContentProjection,
  familyForProjection,
  projectionPublicPath,
  RoutedContentProjectionSchema,
} from "#contracts/projection/spec";
import { articleGraph, materialGraph } from "#contracts/test/graph";

const article = Schema.decodeSync(ArticleProjectionSchema)({
  appLocale: "en",
  articleRouteSlug: "test-article",
  articleSlug: "test-article",
  artifactLocale: "en",
  category: "politics",
  categoryRouteSlug: "politics",
  categoryTitle: "Politics",
  contentKey: "articles/politics/test-article",
  graph: articleGraph("en", "politics", "test-article"),
  kind: "article",
  metadata: {
    authors: [{ name: "Test Author" }],
    datePublished: "2026-01-01",
    title: "Test Article",
  },
  official: true,
  parentPath: "articles/politics",
  publicPath: "articles/politics/test-article",
  references: [],
  sitemap: true,
});
const material = Schema.decodeSync(MaterialLessonProjectionSchema)({
  appLocale: "en",
  artifactLocale: "en",
  contentKey: "test:material",
  graph: materialGraph("en", "test", "material", "test-lesson"),
  kind: "subject-lesson",
  materialKey: "lesson.test.material",
  metadata: {
    authors: [{ name: "Test Author" }],
    datePublished: "2026-01-01",
    title: "Test Material",
  },
  order: 1,
  parentPath: "subjects/test/material",
  publicPath: "subjects/test/material/lesson",
  sectionKey: "test-lesson",
  sitemap: true,
  topicTitle: "Test Material",
});
const page = Schema.decodeSync(PublicPageProjectionSchema)({
  appLocale: "en",
  artifactLocale: "en",
  contentKey: "pages/privacy-policy",
  kind: "public-page",
  metadata: {
    datePublished: "2026-08-20",
    description: "How Nakafa processes personal data.",
    title: "Privacy Policy",
  },
  pageKey: "privacy-policy",
  publicPath: "privacy-policy",
  sitemap: true,
  sourcePath: "packages/corpus/pages/privacy-policy/en.mdx",
});
const question = Schema.decodeSync(QuestionBodyProjectionSchema)({
  artifactLocale: "en",
  bodyKind: "question",
  contentKey:
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question",
  kind: "question-body",
  metadata: {
    authors: [{ name: "Test Author" }],
    datePublished: "2026-01-01",
    title: "Question 1",
  },
  peerContentKey:
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/answer",
  questionKey:
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1",
  questionNumber: 1,
  response: {
    kind: "single-choice",
    options: [
      {
        isCorrect: true,
        label: [{ kind: "text", text: "A" }],
        optionKey: "option-1",
        order: 1,
      },
      {
        isCorrect: false,
        label: [{ kind: "text", text: "B" }],
        optionKey: "option-2",
        order: 2,
      },
    ],
  },
  setKey: "question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
});
const historicalPage = {
  ...page,
  metadata: {
    description: page.metadata.description,
    lastModified: "2026-08-20",
    title: page.metadata.title,
  },
};

describe("content projection", () => {
  it("strictly decodes all implemented projection families", () => {
    expect(
      [article, material, page, question].map((value) =>
        Schema.decodeSync(ContentProjectionSchema)(value)
      )
    ).toEqual([article, material, page, question]);
    expect(
      Exit.isFailure(
        Schema.decodeUnknownExit(RoutedContentProjectionSchema)(question)
      )
    ).toBe(true);
  });

  it("keeps predecessor Page bytes outside the current staging contract", () => {
    expect(Schema.decodeSync(ContentProjectionSchema)(historicalPage)).toEqual(
      historicalPage
    );
    expect(
      Exit.isFailure(
        Schema.decodeUnknownExit(CurrentContentProjectionSchema)(historicalPage)
      )
    ).toBe(true);
    expect(JSON.parse(canonicalizeContentProjection(historicalPage))).toEqual(
      historicalPage
    );
  });

  it("dispatches canonicalization and family selection exhaustively", () => {
    expect(JSON.parse(canonicalizeContentProjection(article))).toEqual(article);
    expect(JSON.parse(canonicalizeContentProjection(material))).toEqual(
      material
    );
    expect(JSON.parse(canonicalizeContentProjection(page))).toEqual(page);
    expect(JSON.parse(canonicalizeContentProjection(question))).toEqual(
      question
    );
    expect(familyForProjection(article)).toBe("article");
    expect(familyForProjection(material)).toBe("material");
    expect(familyForProjection(page)).toBe("page");
    expect(familyForProjection(question)).toBe("question");
    expect(projectionPublicPath(article)).toBe(article.publicPath);
    expect(projectionPublicPath(material)).toBe(material.publicPath);
    expect(projectionPublicPath(page)).toBe(page.publicPath);
    expect(projectionPublicPath(question)).toBeUndefined();
  });
});
