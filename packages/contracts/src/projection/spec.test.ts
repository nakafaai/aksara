import { Schema } from "effect";
import { describe, expect, it } from "vitest";
import { ArticleProjectionSchema } from "#contracts/projection/article";
import {
  MaterialLessonProjectionSchema,
  MaterialProjectionV2Schema,
} from "#contracts/projection/material";
import { QuestionBodyProjectionSchema } from "#contracts/projection/question";
import {
  ContentProjectionSchema,
  ContentProjectionWireSchema,
  canonicalizeContentProjection,
  familyForProjection,
  projectionPublicPath,
  RoutedContentProjectionSchema,
  RoutedContentProjectionWireSchema,
} from "#contracts/projection/spec";
import { articleGraph, materialGraph } from "#contracts/test/graph";

const article = Schema.decodeUnknownSync(ArticleProjectionSchema)({
  articleSlug: "test-article",
  category: "politics",
  categoryTitle: "Politics",
  contentKey: "articles/politics/test-article",
  graph: articleGraph("en", "politics", "test-article"),
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
  graph: materialGraph("en", "test", "material", "test-lesson"),
  kind: "subject-lesson",
  locale: "en",
  materialKey: "lesson.test.material",
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
  topicTitle: "Test Material",
});
const { topicTitle: _topicTitle, ...materialV2Input } = material;
const materialV2 = Schema.decodeUnknownSync(MaterialProjectionV2Schema)(
  materialV2Input
);
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
      Schema.decodeUnknownEither(ContentProjectionSchema)(materialV2)._tag
    ).toBe("Left");
    expect(
      Schema.decodeUnknownSync(ContentProjectionWireSchema)(materialV2)
    ).toEqual(materialV2);
    expect(
      Schema.decodeUnknownEither(RoutedContentProjectionSchema)(question)._tag
    ).toBe("Left");
    expect(
      Schema.decodeUnknownEither(RoutedContentProjectionSchema)(materialV2)._tag
    ).toBe("Left");
    expect(
      Schema.decodeUnknownSync(RoutedContentProjectionWireSchema)(materialV2)
    ).toEqual(materialV2);
  });

  it("dispatches canonicalization and family selection exhaustively", () => {
    expect(JSON.parse(canonicalizeContentProjection(article))).toEqual(article);
    expect(JSON.parse(canonicalizeContentProjection(material))).toEqual(
      material
    );
    expect(JSON.parse(canonicalizeContentProjection(materialV2))).toEqual(
      materialV2
    );
    expect(JSON.parse(canonicalizeContentProjection(question))).toEqual(
      question
    );
    expect(familyForProjection(article)).toBe("article");
    expect(familyForProjection(material)).toBe("material");
    expect(familyForProjection(materialV2)).toBe("material");
    expect(familyForProjection(question)).toBe("question");
    expect(projectionPublicPath(article)).toBe(article.publicPath);
    expect(projectionPublicPath(material)).toBe(material.publicPath);
    expect(projectionPublicPath(materialV2)).toBe(materialV2.publicPath);
    expect(projectionPublicPath(question)).toBeUndefined();
  });
});
