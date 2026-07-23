import { Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { ReleaseIdSchema } from "#contracts/ids";
import { digestProjections } from "#contracts/projection/digest";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { QuestionBodyProjectionSchema } from "#contracts/projection/question";
import {
  decodeContentProjections,
  verifyContentProjections,
} from "#contracts/projection/verify";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result";
import { ContentReleaseManifestSchema } from "#contracts/release/spec";

/** Builds one unmistakably test-only canonical material projection. */
function projection(
  contentKey: string,
  locale: "en" | "id",
  publicPath: string
) {
  const parentPath = publicPath.slice(0, publicPath.lastIndexOf("/"));
  return Schema.decodeUnknownSync(MaterialLessonProjectionSchema)({
    contentKey,
    kind: "subject-lesson",
    locale,
    materialKey: "test.material",
    metadata: {
      authors: [{ name: "Test Author" }],
      date: "2026-01-01",
      title: "Test Projection",
    },
    order: 1,
    parentPath,
    publicPath,
    sectionKey: "test-lesson",
    sitemap: true,
  });
}

const firstProjection = projection("test:a", "en", "subjects/test/material/a");
const secondProjection = projection("test:b", "id", "materi/test/material/b");
const projections = [firstProjection, secondProjection];
const questionProjection = Schema.decodeUnknownSync(
  QuestionBodyProjectionSchema
)({
  bodyKind: "answer",
  contentKey:
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/answer",
  kind: "question-body",
  locale: "en",
  metadata: {
    authors: [{ name: "Test Author" }],
    date: "2026-01-01",
    title: "Question 1 answer",
  },
  peerContentKey:
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question",
  questionKey:
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1",
  questionNumber: 1,
  setKey: "question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
});
const releaseId = Schema.decodeUnknownSync(ReleaseIdSchema)(
  "test-release-projections"
);
const projectionSummary = await Effect.runPromise(
  digestProjections(releaseId, Stream.fromIterable(projections))
);
const manifest = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
  baseManifestHash: null,
  baseReleaseId: null,
  baseResultCount: 0,
  baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
  deleteCount: 0,
  itemCount: 0,
  itemsDigest: `sha256:${"b".repeat(64)}`,
  origin: { kind: "git", sha: "a".repeat(40) },
  projectionCount: projections.length,
  projectionDigest: projectionSummary.digest,
  releaseId,
  rendererContractVersion: "1.0.0",
  rendererManifestHash: `sha256:${"c".repeat(64)}`,
  resultCount: 0,
  resultDigest: EMPTY_RESULT_CATALOG_DIGEST,
  rollbackCount: 0,
  rollbackDigest: `sha256:${"d".repeat(64)}`,
  routeCount: 0,
  routeDigest: `sha256:${"d".repeat(64)}`,
  upsertCount: 0,
});

/** Returns the typed projection verification failure for one candidate stream. */
function reject(values: readonly unknown[], candidateManifest = manifest) {
  return Effect.runPromise(
    verifyContentProjections({
      manifest: candidateManifest,
      projections: Stream.fromIterable(values),
    }).pipe(Effect.flip)
  );
}

describe("projection integrity", () => {
  it("authenticates replayable projections without retaining bodies", async () => {
    const verified = await Effect.runPromise(
      verifyContentProjections({
        manifest,
        projections: Stream.fromIterable(projections),
      })
    );
    expect(verified).toEqual({ count: 2 });
  });

  it("rejects count, digest, and strict schema mismatches", async () => {
    const [count, digest, decode] = await Promise.all([
      reject([firstProjection]),
      reject(
        projections,
        Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
          ...manifest,
          projectionDigest: `sha256:${"d".repeat(64)}`,
        })
      ),
      reject([{ ...firstProjection, unexpected: true }]),
    ]);
    expect([count._tag, digest._tag, decode._tag]).toEqual([
      "ProjectionCountError",
      "ProjectionDigestError",
      "ProjectionDecodeError",
    ]);
  });

  it("rejects duplicate identity and locale-specific routes", async () => {
    const duplicateIdentity = [firstProjection, firstProjection];
    const duplicateRoute = [
      firstProjection,
      projection("test:b", "en", "subjects/test/material/a"),
    ];
    const [order, route] = await Promise.all([
      reject(duplicateIdentity),
      reject(duplicateRoute),
    ]);
    expect(order._tag).toBe("ProjectionOrderError");
    expect(route).toMatchObject({
      _tag: "ProjectionRouteError",
      duplicateIndex: 1,
      firstIndex: 0,
    });
  });

  it("accepts non-route question projections without claiming routes", async () => {
    const decoded = await Effect.runPromise(
      decodeContentProjections(Stream.fromIterable([questionProjection])).pipe(
        Stream.runCollect
      )
    );

    expect([...decoded]).toEqual([questionProjection]);
  });
});
