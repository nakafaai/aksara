import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema, Stream } from "effect";
import { ReleaseIdSchema } from "#contracts/ids";
import { ACTIVE_APP_LOCALES, type AppLocaleCode } from "#contracts/locale";
import { digestProjections } from "#contracts/projection/digest";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { QuestionBodyProjectionSchema } from "#contracts/projection/question";
import {
  decodeContentProjections,
  verifyContentProjections,
} from "#contracts/projection/verify";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result/spec";
import { inheritContentSnapshots } from "#contracts/release/snapshot/spec";
import {
  CONTENT_RELEASE_FORMAT,
  ContentReleaseManifestSchema,
} from "#contracts/release/spec";
import { materialGraph } from "#contracts/test/graph";

/** Builds one unmistakably test-only canonical material projection. */
function projection(
  contentKey: string,
  appLocale: AppLocaleCode,
  publicPath: string
) {
  const parentPath = publicPath.slice(0, publicPath.lastIndexOf("/"));
  return Schema.decodeSync(MaterialLessonProjectionSchema)({
    appLocale,
    artifactLocale: appLocale,
    contentKey,
    graph: materialGraph(appLocale, "test", "material", "test-lesson"),
    kind: "subject-lesson",
    materialKey: "lesson.test.material",
    metadata: {
      authors: [{ name: "Test Author" }],
      datePublished: "2026-01-01",
      title: "Test Projection",
    },
    order: 1,
    parentPath,
    publicPath,
    sectionKey: "test-lesson",
    sitemap: true,
    topicTitle: "Test Material",
  });
}

const firstProjection = projection("test:a", "en", "subjects/test/material/a");
const secondProjection = projection("test:b", "id", "materi/test/material/b");
const projections = [firstProjection, secondProjection];
const questionProjection = Schema.decodeSync(QuestionBodyProjectionSchema)({
  artifactLocale: "en",
  bodyKind: "answer",
  contentKey:
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/answer",
  kind: "question-body",
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
const releaseId = Schema.decodeSync(ReleaseIdSchema)(
  "test-release-projections"
);
/** Builds the signed manifest identity for the canonical projection fixture. */
const makeManifest = Effect.fn("AksaraContractsTest.makeProjectionManifest")(
  function* () {
    const projectionSummary = yield* digestProjections(
      releaseId,
      Stream.fromIterable(projections)
    );
    return yield* Schema.decodeEffect(ContentReleaseManifestSchema)({
      activeAppLocales: ACTIVE_APP_LOCALES,
      baseActiveAppLocales: null,
      baseManifestHash: null,
      baseReleaseId: null,
      baseResultCount: 0,
      baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      deleteCount: 0,
      format: CONTENT_RELEASE_FORMAT,
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
      scope: {
        families: ["material"],
        snapshots: [],
      },
      snapshots: inheritContentSnapshots(null),
      upsertCount: 0,
    });
  }
);

/** Returns the typed projection verification failure for one candidate stream. */
function reject(
  values: readonly unknown[],
  candidateManifest?: typeof ContentReleaseManifestSchema.Type
) {
  return Effect.gen(function* () {
    const manifest = candidateManifest ?? (yield* makeManifest());
    return yield* verifyContentProjections({
      manifest,
      projections: Stream.fromIterable(values),
    }).pipe(Effect.flip);
  });
}

describe("projection integrity", () => {
  it.effect(
    "authenticates replayable projections without retaining bodies",
    () =>
      Effect.gen(function* () {
        const manifest = yield* makeManifest();
        const verified = yield* verifyContentProjections({
          manifest,
          projections: Stream.fromIterable(projections),
        });
        expect(verified).toEqual({ count: 2 });
      })
  );

  it.effect("rejects count, digest, and strict schema mismatches", () =>
    Effect.gen(function* () {
      const manifest = yield* makeManifest();
      const mismatchedManifest = yield* Schema.decodeEffect(
        ContentReleaseManifestSchema
      )({
        ...manifest,
        projectionDigest: `sha256:${"d".repeat(64)}`,
      });
      const [count, digest, decode] = yield* Effect.all([
        reject([firstProjection]),
        reject(projections, mismatchedManifest),
        reject([{ ...firstProjection, unexpected: true }]),
      ]);
      expect([count._tag, digest._tag, decode._tag]).toEqual([
        "ProjectionCountError",
        "ProjectionDigestError",
        "ProjectionDecodeError",
      ]);
    })
  );

  it.effect("rejects duplicate identity and locale-specific routes", () =>
    Effect.gen(function* () {
      const duplicateIdentity = [firstProjection, firstProjection];
      const duplicateRoute = [
        firstProjection,
        projection("test:b", "en", "subjects/test/material/a"),
      ];
      const [order, route] = yield* Effect.all([
        reject(duplicateIdentity),
        reject(duplicateRoute),
      ]);
      expect(order._tag).toBe("ProjectionOrderError");
      expect(route).toMatchObject({
        _tag: "ProjectionRouteError",
        duplicateIndex: 1,
        firstIndex: 0,
      });
    })
  );

  it.effect(
    "accepts non-route question projections without claiming routes",
    () =>
      Effect.gen(function* () {
        const decoded = yield* decodeContentProjections(
          Stream.fromIterable([questionProjection])
        ).pipe(Stream.runCollect);

        expect([...decoded]).toEqual([questionProjection]);
      })
  );
});
