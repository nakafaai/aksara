// @vitest-environment node

import { Buffer } from "node:buffer";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { MaterialLessonProjectionSchema } from "@nakafa/aksara-contracts/projection/material";
import {
  MAX_PROJECTION_BATCH_BYTES,
  MAX_PROJECTION_BATCH_COUNT,
} from "@nakafa/aksara-contracts/transport/limits";
import { Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";
import {
  canonicalizeProjectionBatch,
  makeProjectionBatches,
} from "#publisher/projection-batch";
import { materialGraph } from "#test/graph";

const releaseId = ReleaseIdSchema.make("test-release-projections");

/** Builds one unmistakably test-only material projection. */
function projection(index: number, title = "Test Projection") {
  return Schema.decodeUnknownSync(MaterialLessonProjectionSchema)({
    contentKey: `test:projection-${index.toString().padStart(4, "0")}`,
    graph: materialGraph("en", "material", `test-lesson-${index}`),
    kind: "subject-lesson",
    locale: "en",
    materialKey: "lesson.test.material",
    metadata: {
      authors: [{ name: "Test Author" }],
      date: "2026-01-01",
      title,
    },
    order: index + 1,
    parentPath: "subjects/test/material",
    publicPath: `subjects/test/material/lesson-${index}`,
    sectionKey: `test-lesson-${index}`,
    sitemap: true,
  });
}

/** Materializes bounded projection batches only at the Vitest boundary. */
function collect(projections: Stream.Stream<ReturnType<typeof projection>>) {
  return Effect.runPromise(
    makeProjectionBatches(releaseId, projections).pipe(
      Stream.runCollect,
      Effect.map((chunk) => [...chunk])
    )
  );
}

describe("projection batching", () => {
  it("streams no envelope for an empty projection stream", async () => {
    await expect(collect(Stream.empty)).resolves.toEqual([]);
  });

  it("partitions projection rows at the exact target count ceiling", async () => {
    const values = Array.from(
      { length: MAX_PROJECTION_BATCH_COUNT + 1 },
      (_, index) => projection(index)
    );
    const batches = await collect(Stream.fromIterable(values));
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
  });

  it("splits a final projection that only fits a fresh envelope", async () => {
    const title = "x".repeat(Math.floor(MAX_PROJECTION_BATCH_BYTES / 2));
    const batches = await collect(
      Stream.make(
        projection(0, title),
        projection(1, title),
        projection(2, title)
      )
    );

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
  });

  it("rejects a standalone oversized envelope", async () => {
    const byteError = await Effect.runPromise(
      makeProjectionBatches(
        releaseId,
        Stream.make(projection(0, "x".repeat(MAX_PROJECTION_BATCH_BYTES)))
      ).pipe(Stream.runDrain, Effect.flip)
    );
    expect(byteError._tag).toBe("PublicationBatchLimitError");
    expect(byteError.actualBytes).toBeGreaterThan(MAX_PROJECTION_BATCH_BYTES);
  });
});
