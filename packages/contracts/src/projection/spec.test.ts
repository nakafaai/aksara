import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Exit, Schema } from "effect";
import { ArticleProjectionSchema } from "#contracts/projection/article";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { PublicPageProjectionSchema } from "#contracts/projection/page";
import { QuestionBodyProjectionSchema } from "#contracts/projection/question";
import {
  ContentProjectionSchema,
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
        label: "A",
        optionKey: "option-1",
        order: 1,
      },
      {
        isCorrect: false,
        label: "B",
        optionKey: "option-2",
        order: 2,
      },
    ],
  },
  setKey: "question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
});
describe("content projection", () => {
  it("strictly decodes all implemented projection families", () => {
    expect(
      Arr.map([article, material, page, question], (value) =>
        Schema.decodeSync(ContentProjectionSchema)(value)
      )
    ).toEqual([article, material, page, question]);
    expect(
      Exit.isFailure(
        Schema.decodeUnknownExit(RoutedContentProjectionSchema)(question)
      )
    ).toBe(true);
  });

  it("dispatches canonicalization and family selection exhaustively", () => {
    expect(
      Schema.decodeSync(Schema.fromJsonString(ContentProjectionSchema))(
        canonicalizeContentProjection(article)
      )
    ).toEqual(article);
    expect(
      Schema.decodeSync(Schema.fromJsonString(ContentProjectionSchema))(
        canonicalizeContentProjection(material)
      )
    ).toEqual(material);
    expect(
      Schema.decodeSync(Schema.fromJsonString(ContentProjectionSchema))(
        canonicalizeContentProjection(page)
      )
    ).toEqual(page);
    expect(
      Schema.decodeSync(Schema.fromJsonString(ContentProjectionSchema))(
        canonicalizeContentProjection(question)
      )
    ).toEqual(question);
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

describe("pinned content projection dispatch", () => {
  it("pins canonical text for every dispatched projection family", () => {
    expect(canonicalizeContentProjection(article)).toBe(
      '{"appLocale":"en","articleRouteSlug":"test-article","articleSlug":"test-article","artifactLocale":"en","category":"politics","categoryRouteSlug":"politics","categoryTitle":"Politics","contentKey":"articles/politics/test-article","graph":{"alignmentId":"alignment:article:politics:article:politics:test-article","assetId":"asset:en:article:politics:article:politics:test-article","conceptId":"concept:article:politics","learningObjectId":"lo:article:politics:test-article","lensId":"lens:article:politics"},"kind":"article","metadata":{"authors":[{"name":"Test Author"}],"datePublished":"2026-01-01","title":"Test Article"},"official":true,"parentPath":"articles/politics","publicPath":"articles/politics/test-article","references":[],"sitemap":true}'
    );
    expect(canonicalizeContentProjection(material)).toBe(
      '{"appLocale":"en","artifactLocale":"en","contentKey":"test:material","graph":{"alignmentId":"alignment:material:lesson:test:material-section:test:material:test-lesson","assetId":"asset:en:material:lesson:test:material-section:test:material:test-lesson","conceptId":"concept:material:lesson:test:material","learningObjectId":"lo:material-section:test:material:test-lesson","lensId":"lens:material:lesson:test"},"kind":"subject-lesson","materialKey":"lesson.test.material","metadata":{"authors":[{"name":"Test Author"}],"datePublished":"2026-01-01","title":"Test Material"},"order":1,"parentPath":"subjects/test/material","publicPath":"subjects/test/material/lesson","sectionKey":"test-lesson","sitemap":true,"topicTitle":"Test Material"}'
    );
    expect(canonicalizeContentProjection(page)).toBe(
      '{"appLocale":"en","artifactLocale":"en","contentKey":"pages/privacy-policy","kind":"public-page","metadata":{"datePublished":"2026-08-20","description":"How Nakafa processes personal data.","title":"Privacy Policy"},"pageKey":"privacy-policy","publicPath":"privacy-policy","sitemap":true,"sourcePath":"packages/corpus/pages/privacy-policy/en.mdx"}'
    );
    expect(canonicalizeContentProjection(question)).toBe(
      '{"bodyKind":"question","response":{"kind":"single-choice","options":[{"isCorrect":true,"label":"A","optionKey":"option-1","order":1},{"isCorrect":false,"label":"B","optionKey":"option-2","order":2}]},"artifactLocale":"en","contentKey":"question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question","kind":"question-body","metadata":{"authors":[{"name":"Test Author"}],"datePublished":"2026-01-01","title":"Question 1"},"peerContentKey":"question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/answer","questionKey":"question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1","questionNumber":1,"setKey":"question-bank/tryout/indonesia/snbt/general-reasoning/set-1"}'
    );
  });
});

describe("pinned material optional metadata through the dispatcher", () => {
  it("pins canonical text with every optional material field present", () => {
    expect(
      canonicalizeContentProjection(
        Schema.decodeSync(
          Schema.fromJsonString(MaterialLessonProjectionSchema)
        )(
          '{"appLocale": "id", "artifactLocale": "id", "contentKey": "materi:pecahan-dasar:bilangan", "graph": {"alignmentId": "alignment:material:lesson:matematika:material-section:matematika:pecahan-dasar:bilangan-bulat", "assetId": "asset:id:material:lesson:matematika:material-section:matematika:pecahan-dasar:bilangan-bulat", "conceptId": "concept:material:lesson:matematika:pecahan-dasar", "learningObjectId": "lo:material-section:matematika:pecahan-dasar:bilangan-bulat", "lensId": "lens:material:lesson:matematika"}, "kind": "subject-lesson", "materialKey": "lesson.matematika.pecahan-dasar", "order": 2, "parentPath": "materi/sains/pecahan-dasar", "publicPath": "materi/sains/pecahan-dasar/bilangan", "sectionKey": "bilangan-bulat", "sitemap": true, "topicTitle": "Pecahan Dasar Ñandú", "metadata": {"authors": [{"name": "Tim Café"}, {"name": "Nabil Ñandú"}], "dateModified": "2026-02-01", "datePublished": "2026-01-31", "description": "Bilangan bulat dan pecahan 😀", "searchTitle": "Bilangan Bulat Ñandú", "subject": "Matematika", "title": "Bilangan Bulat"}}'
        )
      )
    ).toBe(
      '{"appLocale":"id","artifactLocale":"id","contentKey":"materi:pecahan-dasar:bilangan","graph":{"alignmentId":"alignment:material:lesson:matematika:material-section:matematika:pecahan-dasar:bilangan-bulat","assetId":"asset:id:material:lesson:matematika:material-section:matematika:pecahan-dasar:bilangan-bulat","conceptId":"concept:material:lesson:matematika:pecahan-dasar","learningObjectId":"lo:material-section:matematika:pecahan-dasar:bilangan-bulat","lensId":"lens:material:lesson:matematika"},"kind":"subject-lesson","materialKey":"lesson.matematika.pecahan-dasar","metadata":{"authors":[{"name":"Tim Café"},{"name":"Nabil Ñandú"}],"dateModified":"2026-02-01","datePublished":"2026-01-31","description":"Bilangan bulat dan pecahan 😀","searchTitle":"Bilangan Bulat Ñandú","subject":"Matematika","title":"Bilangan Bulat"},"order":2,"parentPath":"materi/sains/pecahan-dasar","publicPath":"materi/sains/pecahan-dasar/bilangan","sectionKey":"bilangan-bulat","sitemap":true,"topicTitle":"Pecahan Dasar Ñandú"}'
    );
  });
});
