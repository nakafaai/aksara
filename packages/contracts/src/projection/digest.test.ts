import type { BinaryLike } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Schema, Stream } from "effect";
import { ReleaseIdSchema } from "#contracts/ids";
import {
  createProjectionDigest,
  digestProjections,
  finalizeProjectionDigest,
  updateProjectionDigest,
} from "#contracts/projection/digest";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import { materialGraph } from "#contracts/test/graph";

const failures = vi.hoisted(() => ({ create: false, digest: false }));
const releaseId = Schema.decodeSync(ReleaseIdSchema)("test-release-projection");

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic projection digest failures. */
    createHash(algorithm: string) {
      if (failures.create) {
        throw new TypeError("injected projection digest creation failure");
      }
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves real methods while intercepting explicit test markers. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (String(data).includes('"contentKey":"hash:failure"')) {
                throw new TypeError("injected projection update failure");
              }
              target.update(data);
              return receiver;
            };
          }
          if (property === "digest" && failures.digest) {
            return () => {
              throw new TypeError("injected projection finalization failure");
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

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
      const initial = yield* createProjectionDigest(releaseId);
      const updated = yield* updateProjectionDigest(releaseId, initial, value);
      const digest = yield* finalizeProjectionDigest(releaseId, updated);
      const summary = yield* digestProjections(releaseId, Stream.make(value));

      expect(summary).toEqual({ count: 1, digest });
      expect(updated.count).toBe(1);
    })
  );

  it.effect("maps creation, update, and finalization failures", () =>
    Effect.gen(function* () {
      yield* Effect.addFinalizer(() =>
        Effect.sync(() => {
          failures.create = false;
          failures.digest = false;
        })
      );
      yield* Effect.sync(() => {
        failures.create = true;
      });
      const creation = yield* createProjectionDigest(releaseId).pipe(
        Effect.flip
      );
      yield* Effect.sync(() => {
        failures.create = false;
      });
      const initial = yield* createProjectionDigest(releaseId);
      const update = yield* updateProjectionDigest(
        releaseId,
        initial,
        projection("hash:failure")
      ).pipe(Effect.flip);
      yield* Effect.sync(() => {
        failures.digest = true;
      });
      const finalization = yield* finalizeProjectionDigest(
        releaseId,
        initial
      ).pipe(Effect.flip);

      expect(
        Arr.map([creation, update, finalization], ({ _tag }) => _tag)
      ).toEqual([
        "ProjectionHashError",
        "ProjectionHashError",
        "ProjectionHashError",
      ]);
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
        const initial = yield* createProjectionDigest(releaseId);
        const afterFirst = yield* updateProjectionDigest(
          releaseId,
          initial,
          first
        );
        const afterSecond = yield* updateProjectionDigest(
          releaseId,
          afterFirst,
          second
        );
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
