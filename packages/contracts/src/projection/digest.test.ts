import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema, Stream } from "effect";
import { ReleaseIdSchema } from "#contracts/ids";
import {
  createProjectionDigest,
  digestProjections,
  finalizeProjectionDigest,
  updateProjectionDigest,
} from "#contracts/projection/digest";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { withNextDigestFailure } from "#contracts/test/digest";
import { materialGraph } from "#contracts/test/graph";

const releaseId = Schema.decodeSync(ReleaseIdSchema)("test-release-projection");

/** Builds one unmistakably test-only material projection. */
function projection(contentKey = "test:projection") {
  return Schema.decodeSync(MaterialLessonProjectionSchema)({
    appLocale: "en",
    artifactLocale: "en",
    contentKey,
    graph: materialGraph("en", "test", "material", "test-lesson"),
    kind: "subject-lesson",
    materialKey: "lesson.test.material",
    metadata: {
      authors: [{ name: "Test Author" }],
      datePublished: "2026-01-01",
      title: "Test Projection",
    },
    order: 1,
    parentPath: "subjects/test/material",
    publicPath: "subjects/test/material/lesson",
    sectionKey: "test-lesson",
    sitemap: true,
    topicTitle: "Test Material",
  });
}

describe("projection digest", () => {
  it.effect("matches streamed and incremental canonical digests", () =>
    Effect.gen(function* () {
      const value = projection();
      const initial = yield* createProjectionDigest;
      const updated = yield* updateProjectionDigest(initial, value);
      const digest = yield* finalizeProjectionDigest(releaseId, updated);
      const summary = yield* digestProjections(releaseId, Stream.make(value));

      expect(summary).toEqual({ count: 1, digest });
      expect(updated.count).toBe(1);
    })
  );

  it.effect(
    "maps a rejected Web Crypto digest to a projection hash error",
    () =>
      Effect.gen(function* () {
        const state = yield* updateProjectionDigest(
          yield* createProjectionDigest,
          projection()
        );

        const failure = yield* withNextDigestFailure(
          finalizeProjectionDigest(releaseId, state)
        ).pipe(Effect.flip);

        expect(failure).toMatchObject({
          _tag: "ProjectionHashError",
          releaseId,
        });
      })
  );
});

describe("pinned projection digest", () => {
  const pinnedGraph = {
    alignmentId:
      "alignment:material:lesson:test:material-section:test:material:test-lesson",
    assetId:
      "asset:en:material:lesson:test:material-section:test:material:test-lesson",
    conceptId: "concept:material:lesson:test:material",
    learningObjectId: "lo:material-section:test:material:test-lesson",
    lensId: "lens:material:lesson:test",
  } as const;
  /** Decodes one pinned material projection with its own content identity. */
  function pinnedMaterial(contentKey: string, publicPath: string) {
    return Schema.decodeSync(MaterialLessonProjectionSchema)({
      appLocale: "en",
      artifactLocale: "en",
      contentKey,
      graph: pinnedGraph,
      kind: "subject-lesson",
      materialKey: "lesson.test.material",
      metadata: {
        authors: [{ name: "Test Author" }],
        datePublished: "2026-01-01",
        title: "Pecahan Ñandú café",
      },
      order: 1,
      parentPath: "subjects/test/material",
      publicPath,
      sectionKey: "test-lesson",
      sitemap: true,
      topicTitle: "Test Material",
    });
  }
  const first = pinnedMaterial(
    "test:projection",
    "subjects/test/material/lesson"
  );
  const second = pinnedMaterial("test:second", "subjects/test/material/second");

  it.effect(
    "pins one digest for one stream, a chunked stream, and incremental updates",
    () =>
      Effect.gen(function* () {
        const oneChunk = yield* digestProjections(
          releaseId,
          Stream.make(first, second)
        );
        const twoChunks = yield* digestProjections(
          releaseId,
          Stream.make(first).pipe(Stream.concat(Stream.make(second)))
        );
        const initial = yield* createProjectionDigest;
        const afterFirst = yield* updateProjectionDigest(initial, first);
        const afterSecond = yield* updateProjectionDigest(afterFirst, second);
        const incremental = yield* finalizeProjectionDigest(
          releaseId,
          afterSecond
        );

        expect(oneChunk).toEqual({
          count: 2,
          digest:
            "sha256:c63b3b5ad63046358b028d935af46a8308ac831139f420ebe0e71085f424ee50",
        });
        expect(twoChunks).toEqual({
          count: 2,
          digest:
            "sha256:c63b3b5ad63046358b028d935af46a8308ac831139f420ebe0e71085f424ee50",
        });
        expect(incremental).toBe(
          "sha256:c63b3b5ad63046358b028d935af46a8308ac831139f420ebe0e71085f424ee50"
        );
      })
  );

  it.effect("pins a different digest when the caller changes order", () =>
    Effect.gen(function* () {
      expect(
        yield* digestProjections(releaseId, Stream.make(second, first))
      ).toEqual({
        count: 2,
        digest:
          "sha256:e895fc67a8acb93dca6f4648a3d81d3a1f4ddb5de4bf8e1ab6ece11d9db008a6",
      });
    })
  );
});
