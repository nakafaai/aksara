import type { BinaryLike } from "node:crypto";
import { Effect, Schema, Stream } from "effect";
import { describe, expect, it, vi } from "vitest";
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
const releaseId = Schema.decodeUnknownSync(ReleaseIdSchema)(
  "test-release-projection"
);

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
  return Schema.decodeUnknownSync(MaterialLessonProjectionSchema)({
    contentKey,
    graph: materialGraph("en", "test", "material", "test-lesson"),
    kind: "subject-lesson",
    locale: "en",
    materialKey: "lesson.test.material",
    metadata: {
      authors: [{ name: "Test Author" }],
      date: "2026-01-01",
      title: "Test Projection",
    },
    order: 1,
    parentPath: "subjects/test/material",
    publicPath: "subjects/test/material/lesson",
    sectionKey: "test-lesson",
    sitemap: true,
  });
}

describe("projection digest", () => {
  it("matches streamed and incremental canonical digests", async () => {
    const value = projection();
    const initial = await Effect.runPromise(createProjectionDigest(releaseId));
    const updated = await Effect.runPromise(
      updateProjectionDigest(releaseId, initial, value)
    );
    const digest = await Effect.runPromise(
      finalizeProjectionDigest(releaseId, updated)
    );
    const summary = await Effect.runPromise(
      digestProjections(releaseId, Stream.make(value))
    );
    expect(summary).toEqual({ count: 1, digest });
    expect(updated.count).toBe(1);
  });

  it("maps creation, update, and finalization failures", async () => {
    failures.create = true;
    const creation = await Effect.runPromise(
      createProjectionDigest(releaseId).pipe(Effect.flip)
    );
    failures.create = false;
    const initial = await Effect.runPromise(createProjectionDigest(releaseId));
    const update = await Effect.runPromise(
      updateProjectionDigest(
        releaseId,
        initial,
        projection("hash:failure")
      ).pipe(Effect.flip)
    );
    failures.digest = true;
    const finalization = await Effect.runPromise(
      finalizeProjectionDigest(releaseId, initial).pipe(Effect.flip)
    );
    failures.digest = false;
    expect([creation, update, finalization].map(({ _tag }) => _tag)).toEqual([
      "ProjectionHashError",
      "ProjectionHashError",
      "ProjectionHashError",
    ]);
  });
});
