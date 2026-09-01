import type { BinaryLike } from "node:crypto";
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

      expect([creation, update, finalization].map(({ _tag }) => _tag)).toEqual([
        "ProjectionHashError",
        "ProjectionHashError",
        "ProjectionHashError",
      ]);
    })
  );
});
