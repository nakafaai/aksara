import { Schema } from "effect";
import { describe, expect, it } from "vitest";
import { ArticleProjectionSchema } from "#contracts/projection/article";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { QuestionBodyProjectionSchema } from "#contracts/projection/question";
import {
  ContentProjectionSchema,
  canonicalizeContentProjection,
  familyForProjection,
  isArticleProjection,
  isMaterialProjection,
  isQuestionProjection,
  projectionPublicPath,
  RoutedContentProjectionSchema,
} from "#contracts/projection/spec";

const article = Schema.decodeUnknownSync(ArticleProjectionSchema)({
  articleSlug: "test-article",
  category: "politics",
  contentKey: "articles/politics/test-article",
  kind: "article",
  locale: "en",
  metadata: {
    authors: [{ name: "Test Author" }],
    date: "2026-01-01",
    title: "Test Article",
  },
  official: true,
  parentPath: "articles/politics",
  publicPath: "articles/politics/test-article",
  references: [],
  sitemap: true,
});
const material = Schema.decodeUnknownSync(MaterialLessonProjectionSchema)({
  contentKey: "test:material",
  kind: "subject-lesson",
  locale: "en",
  materialKey: "test.material",
  metadata: {
    authors: [{ name: "Test Author" }],
    date: "2026-01-01",
    title: "Test Material",
  },
  order: 1,
  parentPath: "subjects/test/material",
  publicPath: "subjects/test/material/lesson",
  sectionKey: "test-lesson",
  sitemap: true,
});
const question = Schema.decodeUnknownSync(QuestionBodyProjectionSchema)({
  bodyKind: "question",
  choices: [
    { label: "A", value: true },
    { label: "B", value: false },
  ],
  contentKey:
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question",
  kind: "question-body",
  locale: "en",
  metadata: {
    authors: [{ name: "Test Author" }],
    date: "2026-01-01",
    title: "Question 1",
  },
  peerContentKey:
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/answer",
  questionKey:
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1",
  questionNumber: 1,
  setKey: "question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
});

describe("content projection", () => {
  it("strictly decodes all implemented projection families", () => {
    expect(
      [article, material, question].map((value) =>
        Schema.decodeUnknownSync(ContentProjectionSchema)(value)
      )
    ).toEqual([article, material, question]);
    expect(
      Schema.decodeUnknownEither(RoutedContentProjectionSchema)(question)._tag
    ).toBe("Left");
  });

  it("dispatches canonicalization and family narrowing exhaustively", () => {
    expect(JSON.parse(canonicalizeContentProjection(article))).toEqual(article);
    expect(JSON.parse(canonicalizeContentProjection(material))).toEqual(
      material
    );
    expect(JSON.parse(canonicalizeContentProjection(question))).toEqual(
      question
    );
    expect(isArticleProjection(article)).toBe(true);
    expect(isArticleProjection(material)).toBe(false);
    expect(isArticleProjection(question)).toBe(false);
    expect(isMaterialProjection(material)).toBe(true);
    expect(isMaterialProjection(article)).toBe(false);
    expect(isMaterialProjection(question)).toBe(false);
    expect(isQuestionProjection(question)).toBe(true);
    expect(isQuestionProjection(article)).toBe(false);
    expect(familyForProjection(article)).toBe("article");
    expect(familyForProjection(material)).toBe("material");
    expect(familyForProjection(question)).toBe("question");
    expect(projectionPublicPath(article)).toBe(article.publicPath);
    expect(projectionPublicPath(material)).toBe(material.publicPath);
    expect(projectionPublicPath(question)).toBeUndefined();
  });
});
