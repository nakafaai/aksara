import type { BinaryLike } from "node:crypto";
import { Effect, Schema, Stream } from "effect";
import { describe, expect, it, vi } from "vitest";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import { MaterialHeadSchema } from "#contracts/release/head";
import {
  createResultCatalogDigest,
  digestResultCatalog,
  finalizeResultCatalogDigest,
  updateResultCatalogDigest,
  verifyResultCatalog,
} from "#contracts/release/result-digest";

const failures = vi.hoisted(() => ({ create: false, digest: false }));
const releaseId =
  Schema.decodeUnknownSync(ReleaseIdSchema)("test-result-digest");

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic result-catalog hash failures. */
    createHash(algorithm: string) {
      if (failures.create) {
        throw new TypeError("injected result digest creation failure");
      }
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves real methods while intercepting explicit test markers. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (String(data).includes('"contentKey":"hash:failure"')) {
                throw new TypeError("injected result digest update failure");
              }
              target.update(data);
              return receiver;
            };
          }
          if (property === "digest" && failures.digest) {
            return () => {
              throw new TypeError(
                "injected result digest finalization failure"
              );
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

/** Builds one canonical compact material head at a test-only identity. */
function head(contentKey: string) {
  const slug = contentKey.replace(":", "-");
  return Schema.decodeUnknownSync(MaterialHeadSchema)({
    artifactHash: `sha256:${"a".repeat(64)}`,
    compilerConfigHash: `sha256:${"b".repeat(64)}`,
    contentKey,
    delivery: "public",
    locale: "en",
    projectionHash: `sha256:${"c".repeat(64)}`,
    publicPath: `subjects/test/${slug}`,
    rendererDomain: "mathematics",
    sourceHash: `sha256:${"d".repeat(64)}`,
    sourcePath: `packages/corpus/test/${slug}/en.mdx`,
  });
}

const firstHead = head("test:a");
const secondHead = head("test:b");
const heads = [firstHead, secondHead];

describe("result catalog digest", () => {
  it("matches streamed and incremental canonical digests", async () => {
    const initial = await Effect.runPromise(
      createResultCatalogDigest(releaseId)
    );
    const first = await Effect.runPromise(
      updateResultCatalogDigest(releaseId, initial, firstHead)
    );
    const updated = await Effect.runPromise(
      updateResultCatalogDigest(releaseId, first, secondHead)
    );
    const digest = await Effect.runPromise(
      finalizeResultCatalogDigest(releaseId, updated)
    );
    const summary = await Effect.runPromise(
      digestResultCatalog(releaseId, Stream.fromIterable(heads))
    );

    expect(summary).toEqual({ count: 2, digest });
    expect(updated).toMatchObject({ count: 2, previous: secondHead });
  });

  it("rejects duplicate and descending catalog order", async () => {
    const initial = await Effect.runPromise(
      createResultCatalogDigest(releaseId)
    );
    const updated = await Effect.runPromise(
      updateResultCatalogDigest(releaseId, initial, secondHead)
    );
    const duplicate = await Effect.runPromise(
      updateResultCatalogDigest(releaseId, updated, secondHead).pipe(
        Effect.flip
      )
    );
    const descending = await Effect.runPromise(
      updateResultCatalogDigest(releaseId, updated, firstHead).pipe(Effect.flip)
    );

    expect([duplicate._tag, descending._tag]).toEqual([
      "ResultCatalogOrderError",
      "ResultCatalogOrderError",
    ]);
  });

  it("rejects duplicate locale-specific public routes", async () => {
    const conflicting = MaterialHeadSchema.make({
      ...secondHead,
      publicPath: firstHead.publicPath,
    });
    const error = await Effect.runPromise(
      digestResultCatalog(releaseId, Stream.make(firstHead, conflicting)).pipe(
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "ResultCatalogRouteError",
      contentKey: conflicting.contentKey,
      locale: conflicting.locale,
      publicPath: firstHead.publicPath,
      releaseId,
    });
  });

  it("verifies signed count and digest evidence", async () => {
    const stream = Stream.fromIterable(heads);
    const summary = await Effect.runPromise(
      digestResultCatalog(releaseId, stream)
    );
    await expect(
      Effect.runPromise(
        verifyResultCatalog({
          expectedCount: summary.count,
          expectedDigest: summary.digest,
          heads: stream,
          releaseId,
        })
      )
    ).resolves.toEqual(summary);

    const count = await Effect.runPromise(
      verifyResultCatalog({
        expectedCount: 1,
        expectedDigest: summary.digest,
        heads: stream,
        releaseId,
      }).pipe(Effect.flip)
    );
    const digest = await Effect.runPromise(
      verifyResultCatalog({
        expectedCount: summary.count,
        expectedDigest: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
        heads: stream,
        releaseId,
      }).pipe(Effect.flip)
    );

    expect(count._tag).toBe("ResultCatalogCountMismatchError");
    expect(digest._tag).toBe("ResultCatalogDigestMismatchError");
  });

  it("maps creation, update, and finalization failures", async () => {
    failures.create = true;
    const creation = await Effect.runPromise(
      createResultCatalogDigest(releaseId).pipe(Effect.flip)
    );
    failures.create = false;
    const initial = await Effect.runPromise(
      createResultCatalogDigest(releaseId)
    );
    const update = await Effect.runPromise(
      updateResultCatalogDigest(releaseId, initial, head("hash:failure")).pipe(
        Effect.flip
      )
    );
    failures.digest = true;
    const finalization = await Effect.runPromise(
      finalizeResultCatalogDigest(releaseId, initial).pipe(Effect.flip)
    );
    failures.digest = false;

    expect([creation, update, finalization].map(({ _tag }) => _tag)).toEqual([
      "ResultCatalogHashError",
      "ResultCatalogHashError",
      "ResultCatalogHashError",
    ]);
  });
});
