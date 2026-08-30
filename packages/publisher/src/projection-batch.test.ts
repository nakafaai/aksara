// @vitest-environment node

import { Buffer } from "node:buffer";
import { describe, expect, it } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { MaterialLessonProjectionSchema } from "@nakafa/aksara-contracts/projection/material";
import { PublicPageProjectionSchema } from "@nakafa/aksara-contracts/projection/page";
import { ContentProjectionSchema } from "@nakafa/aksara-contracts/projection/spec";
import {
  MAX_PROJECTION_BATCH_BYTES,
  MAX_PROJECTION_BATCH_COUNT,
} from "@nakafa/aksara-contracts/transport/limits";
import { Effect, Schema, Stream } from "effect";
import {
  canonicalizeProjectionBatch,
  canonicalizeRollbackProjectionBatch,
  makeProjectionBatches,
  makeRollbackProjectionBatches,
} from "#publisher/projection-batch";
import { materialGraph } from "#test/graph";

const releaseId = ReleaseIdSchema.make("test-release-projections");
const currentPage = Schema.decodeSync(PublicPageProjectionSchema)({
  appLocale: "en",
  artifactLocale: "en",
  contentKey: "pages/test",
  kind: "public-page",
  metadata: {
    datePublished: "2026-01-01",
    description: "Test page",
    title: "Test Page",
  },
  pageKey: "test",
  publicPath: "test",
  sitemap: true,
  sourcePath: "packages/corpus/pages/test/en.mdx",
});
const historicalPage = Schema.decodeSync(ContentProjectionSchema)({
  ...currentPage,
  metadata: {
    description: currentPage.metadata.description,
    lastModified: currentPage.metadata.datePublished,
    title: currentPage.metadata.title,
  },
});

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
        expect(batches.map(({ projections }) => projections.length)).toEqual([
          MAX_PROJECTION_BATCH_COUNT,
          1,
        ]);
        expect(
          batches.every(
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

      expect(batches.map(({ projections }) => projections.length)).toEqual([
        1, 1, 1,
      ]);
      expect(
        batches.every(
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

  it.effect("preserves predecessor Page bytes only in rollback envelopes", () =>
    Effect.gen(function* () {
      const batches = yield* makeRollbackProjectionBatches(
        releaseId,
        Stream.make(historicalPage)
      ).pipe(Stream.runCollect);
      expect(batches).toHaveLength(1);
      const [batch] = batches;
      expect(batch).toBeDefined();
      if (batch === undefined) {
        return;
      }
      expect(JSON.parse(canonicalizeRollbackProjectionBatch(batch))).toEqual({
        batchIndex: 0,
        operation: "stageRollbackProjectionBatch",
        projections: [historicalPage],
        releaseId,
      });
    })
  );
});
