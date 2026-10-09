// @vitest-environment node

import { Buffer } from "node:buffer";
import { describe, expect, it } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { ArticleProjectionSchema } from "@nakafa/aksara-contracts/projection/article";
import { MaterialLessonProjectionSchema } from "@nakafa/aksara-contracts/projection/material";
import { PublicPageProjectionSchema } from "@nakafa/aksara-contracts/projection/page";
import { QuestionBodyProjectionSchema } from "@nakafa/aksara-contracts/projection/question";
import {
  MAX_PROJECTION_BATCH_BYTES,
  MAX_PROJECTION_BATCH_COUNT,
} from "@nakafa/aksara-contracts/transport/limits";
import { Array as Arr, Effect, Schema, Stream } from "effect";
import {
  canonicalizeProjectionBatch,
  makeProjectionBatches,
} from "#publisher/projection/batch";
import { materialGraph } from "#test/graph";

const releaseId = ReleaseIdSchema.make("test-release-projections");
/** Builds one unmistakably test-only material projection. */
const projection = Effect.fn("ProjectionBatchTest.projection")(
  (index: number, title = "Test Projection") => {
    const appLocale = AppLocaleSchema.make("en");
    return Schema.decodeEffect(MaterialLessonProjectionSchema)({
      appLocale,
      artifactLocale: "en",
      contentKey: `test:projection-${index.toString().padStart(4, "0")}`,
      graph: materialGraph(appLocale, "material", `test-lesson-${index}`),
      kind: "subject-lesson",
      materialKey: "lesson.test.material",
      metadata: {
        authors: [{ name: "Test Author" }],
        datePublished: "2026-01-01",
        title,
      },
      order: index + 1,
      parentPath: "subjects/test/material",
      publicPath: `subjects/test/material/lesson-${index}`,
      sectionKey: `test-lesson-${index}`,
      sitemap: true,
      topicTitle: "Test Material",
    });
  }
);

/** Materializes bounded projection batches only at the Vitest boundary. */
const collect = Effect.fn("ProjectionBatchTest.collect")(
  (projections: Stream.Stream<Effect.Success<ReturnType<typeof projection>>>) =>
    makeProjectionBatches(releaseId, projections).pipe(
      Stream.runCollect,
      Effect.map((chunk) => [...chunk])
    )
);

describe("projection batching", () => {
  it.effect("streams no envelope for an empty projection stream", () =>
    Effect.gen(function* () {
      expect(yield* collect(Stream.empty)).toEqual([]);
    })
  );

  it.effect(
    "partitions projection rows at the exact target count ceiling",
    () =>
      Effect.gen(function* () {
        const values = Array.from(
          { length: MAX_PROJECTION_BATCH_COUNT + 1 },
          (_, index) => index
        );
        const projectionValues = yield* Effect.forEach(values, (index) =>
          projection(index)
        );
        const batches = yield* collect(Stream.fromIterable(projectionValues));
        expect(
          Arr.map(batches, ({ projections }) => projections.length)
        ).toEqual([MAX_PROJECTION_BATCH_COUNT, 1]);
        expect(
          Arr.every(
            batches,
            (batch) =>
              Buffer.byteLength(canonicalizeProjectionBatch(batch), "utf8") <=
              MAX_PROJECTION_BATCH_BYTES
          )
        ).toBe(true);
      })
  );

  it.effect("splits a final projection that only fits a fresh envelope", () =>
    Effect.gen(function* () {
      const title = "x".repeat(Math.floor(MAX_PROJECTION_BATCH_BYTES / 2));
      const projectionValues = yield* Effect.all([
        projection(0, title),
        projection(1, title),
        projection(2, title),
      ]);
      const batches = yield* collect(Stream.fromIterable(projectionValues));

      expect(Arr.map(batches, ({ projections }) => projections.length)).toEqual(
        [1, 1, 1]
      );
      expect(
        Arr.every(
          batches,
          (batch) =>
            Buffer.byteLength(canonicalizeProjectionBatch(batch), "utf8") <=
            MAX_PROJECTION_BATCH_BYTES
        )
      ).toBe(true);
    })
  );

  it.effect("rejects a standalone oversized envelope", () =>
    Effect.gen(function* () {
      const oversized = yield* projection(
        0,
        "x".repeat(MAX_PROJECTION_BATCH_BYTES)
      );
      const byteError = yield* makeProjectionBatches(
        releaseId,
        Stream.make(oversized)
      ).pipe(Stream.runDrain, Effect.flip);
      expect(byteError._tag).toBe("PublicationBatchLimitError");
      expect(byteError.actualBytes).toBeGreaterThan(MAX_PROJECTION_BATCH_BYTES);
    })
  );
});

describe("projection batch canonical wire bytes", () => {
  it.effect("pins one projection of every kind in batch order", () =>
    Effect.gen(function* () {
      const subject = yield* projection(0, "Pelajaran é ✓ 数学");
      const article = yield* Schema.decodeEffect(ArticleProjectionSchema)({
        appLocale: "en",
        articleRouteSlug: "test-article",
        articleSlug: "test-article",
        artifactLocale: "en",
        category: "politics",
        categoryRouteSlug: "politics",
        categoryTitle: "Politics",
        contentKey: "articles/politics/test-article",
        graph: {
          alignmentId:
            "alignment:article:politics:article:politics:test-article",
          assetId: "asset:en:article:politics:article:politics:test-article",
          conceptId: "concept:article:politics",
          learningObjectId: "lo:article:politics:test-article",
          lensId: "lens:article:politics",
        },
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
      const page = yield* Schema.decodeEffect(PublicPageProjectionSchema)({
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
      const question = yield* Schema.decodeEffect(QuestionBodyProjectionSchema)(
        {
          artifactLocale: "en",
          bodyKind: "question",
          contentKey:
            "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/question",
          kind: "question-body",
          metadata: {
            authors: [{ name: "Test Author" }],
            datePublished: "2026-01-01",
            title: "Question 1",
          },
          peerContentKey:
            "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/answer",
          questionKey:
            "question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1",
          questionNumber: 1,
          response: {
            kind: "single-choice",
            options: [
              { isCorrect: true, label: "A", optionKey: "option-1", order: 1 },
              { isCorrect: false, label: "B", optionKey: "option-2", order: 2 },
            ],
          },
          setKey:
            "question-bank/tryout/test-country/test-exam/test-section-2/test-set",
        }
      );
      expect(
        canonicalizeProjectionBatch({
          batchIndex: 1,
          projections: [question, page, subject, article],
          releaseId,
        })
      ).toMatchInlineSnapshot(
        `"{"batchIndex":1,"projections":[{"bodyKind":"question","response":{"kind":"single-choice","options":[{"isCorrect":true,"label":"A","optionKey":"option-1","order":1},{"isCorrect":false,"label":"B","optionKey":"option-2","order":2}]},"artifactLocale":"en","contentKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/question","kind":"question-body","metadata":{"authors":[{"name":"Test Author"}],"datePublished":"2026-01-01","title":"Question 1"},"peerContentKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1/answer","questionKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set/question-1","questionNumber":1,"setKey":"question-bank/tryout/test-country/test-exam/test-section-2/test-set"},{"appLocale":"en","artifactLocale":"en","contentKey":"pages/privacy-policy","kind":"public-page","metadata":{"datePublished":"2026-08-20","description":"How Nakafa processes personal data.","title":"Privacy Policy"},"pageKey":"privacy-policy","publicPath":"privacy-policy","sitemap":true,"sourcePath":"packages/corpus/pages/privacy-policy/en.mdx"},{"appLocale":"en","artifactLocale":"en","contentKey":"test:projection-0000","graph":{"alignmentId":"alignment:material:lesson:test:material-section:test:material:test-lesson-0","assetId":"asset:en:material:lesson:test:material-section:test:material:test-lesson-0","conceptId":"concept:material:lesson:test:material","learningObjectId":"lo:material-section:test:material:test-lesson-0","lensId":"lens:material:lesson:test"},"kind":"subject-lesson","materialKey":"lesson.test.material","metadata":{"authors":[{"name":"Test Author"}],"datePublished":"2026-01-01","title":"Pelajaran é ✓ 数学"},"order":1,"parentPath":"subjects/test/material","publicPath":"subjects/test/material/lesson-0","sectionKey":"test-lesson-0","sitemap":true,"topicTitle":"Test Material"},{"appLocale":"en","articleRouteSlug":"test-article","articleSlug":"test-article","artifactLocale":"en","category":"politics","categoryRouteSlug":"politics","categoryTitle":"Politics","contentKey":"articles/politics/test-article","graph":{"alignmentId":"alignment:article:politics:article:politics:test-article","assetId":"asset:en:article:politics:article:politics:test-article","conceptId":"concept:article:politics","learningObjectId":"lo:article:politics:test-article","lensId":"lens:article:politics"},"kind":"article","metadata":{"authors":[{"name":"Test Author"}],"datePublished":"2026-01-01","title":"Test Article"},"official":true,"parentPath":"articles/politics","publicPath":"articles/politics/test-article","references":[],"sitemap":true}],"operation":"stageProjectionBatch","releaseId":"test-release-projections"}"`
      );
    })
  );

  it.effect("pins a projection batch with non-ASCII metadata", () =>
    Effect.gen(function* () {
      const first = yield* projection(0, "Pelajaran é ✓ 数学");
      const second = yield* projection(1);
      expect(
        canonicalizeProjectionBatch({
          batchIndex: 0,
          projections: [first, second],
          releaseId,
        })
      ).toMatchInlineSnapshot(
        `"{"batchIndex":0,"projections":[{"appLocale":"en","artifactLocale":"en","contentKey":"test:projection-0000","graph":{"alignmentId":"alignment:material:lesson:test:material-section:test:material:test-lesson-0","assetId":"asset:en:material:lesson:test:material-section:test:material:test-lesson-0","conceptId":"concept:material:lesson:test:material","learningObjectId":"lo:material-section:test:material:test-lesson-0","lensId":"lens:material:lesson:test"},"kind":"subject-lesson","materialKey":"lesson.test.material","metadata":{"authors":[{"name":"Test Author"}],"datePublished":"2026-01-01","title":"Pelajaran é ✓ 数学"},"order":1,"parentPath":"subjects/test/material","publicPath":"subjects/test/material/lesson-0","sectionKey":"test-lesson-0","sitemap":true,"topicTitle":"Test Material"},{"appLocale":"en","artifactLocale":"en","contentKey":"test:projection-0001","graph":{"alignmentId":"alignment:material:lesson:test:material-section:test:material:test-lesson-1","assetId":"asset:en:material:lesson:test:material-section:test:material:test-lesson-1","conceptId":"concept:material:lesson:test:material","learningObjectId":"lo:material-section:test:material:test-lesson-1","lensId":"lens:material:lesson:test"},"kind":"subject-lesson","materialKey":"lesson.test.material","metadata":{"authors":[{"name":"Test Author"}],"datePublished":"2026-01-01","title":"Test Projection"},"order":2,"parentPath":"subjects/test/material","publicPath":"subjects/test/material/lesson-1","sectionKey":"test-lesson-1","sitemap":true,"topicTitle":"Test Material"}],"operation":"stageProjectionBatch","releaseId":"test-release-projections"}"`
      );
    })
  );
});
