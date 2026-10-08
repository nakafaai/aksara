import type { BinaryLike } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema, Stream } from "effect";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import { MaterialHeadSchema } from "#contracts/release/head";
import {
  createResultCatalogDigest,
  digestResultCatalog,
  finalizeResultCatalogDigest,
  updateResultCatalogDigest,
  verifyResultCatalog,
} from "#contracts/release/result/digest";
import {
  catalog,
  firstHead,
  head,
  heads,
  secondHead,
} from "#contracts/test/result";

const failures = vi.hoisted(() => ({ create: false, digest: false }));
const releaseId = Schema.decodeSync(ReleaseIdSchema)("test-result-digest");

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

describe("result catalog digest", () => {
  it.effect("matches streamed and incremental canonical digests", () =>
    Effect.gen(function* () {
      const initial = yield* createResultCatalogDigest(releaseId);
      const first = yield* updateResultCatalogDigest(
        releaseId,
        initial,
        firstHead
      );
      const updated = yield* updateResultCatalogDigest(
        releaseId,
        first,
        secondHead
      );
      const digest = yield* finalizeResultCatalogDigest(releaseId, updated);
      const summary = yield* digestResultCatalog(
        releaseId,
        Stream.fromIterable(heads)
      );

      expect(summary).toEqual({ count: 2, digest });
      expect(updated).toMatchObject({ count: 2, previous: secondHead });
    })
  );

  it.effect("rejects duplicate and descending catalog order", () =>
    Effect.gen(function* () {
      const initial = yield* createResultCatalogDigest(releaseId);
      const updated = yield* updateResultCatalogDigest(
        releaseId,
        initial,
        secondHead
      );
      const duplicate = yield* updateResultCatalogDigest(
        releaseId,
        updated,
        secondHead
      ).pipe(Effect.flip);
      const descending = yield* updateResultCatalogDigest(
        releaseId,
        updated,
        firstHead
      ).pipe(Effect.flip);

      expect([duplicate._tag, descending._tag]).toEqual([
        "ResultCatalogOrderError",
        "ResultCatalogOrderError",
      ]);
    })
  );

  it.effect("rejects duplicate locale-specific public routes", () =>
    Effect.gen(function* () {
      const conflicting = MaterialHeadSchema.make({
        ...secondHead,
        publicPath: firstHead.publicPath,
      });
      const error = yield* digestResultCatalog(
        releaseId,
        Stream.make(firstHead, conflicting)
      ).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "ResultCatalogRouteError",
        artifactLocale: conflicting.artifactLocale,
        contentKey: conflicting.contentKey,
        publicPath: firstHead.publicPath,
        releaseId,
      });
    })
  );

  it.effect("verifies signed count and digest evidence", () =>
    Effect.gen(function* () {
      const stream = Stream.fromIterable(heads);
      const summary = yield* digestResultCatalog(releaseId, stream);
      const verified = yield* verifyResultCatalog({
        expectedCount: summary.count,
        expectedDigest: summary.digest,
        heads: stream,
        releaseId,
      });
      const count = yield* verifyResultCatalog({
        expectedCount: 1,
        expectedDigest: summary.digest,
        heads: stream,
        releaseId,
      }).pipe(Effect.flip);
      const digest = yield* verifyResultCatalog({
        expectedCount: summary.count,
        expectedDigest: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
        heads: stream,
        releaseId,
      }).pipe(Effect.flip);

      expect(verified).toEqual(summary);
      expect(count._tag).toBe("ResultCatalogCountMismatchError");
      expect(digest._tag).toBe("ResultCatalogDigestMismatchError");
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
      const creation = yield* createResultCatalogDigest(releaseId).pipe(
        Effect.flip
      );
      yield* Effect.sync(() => {
        failures.create = false;
      });
      const initial = yield* createResultCatalogDigest(releaseId);
      const update = yield* updateResultCatalogDigest(
        releaseId,
        initial,
        head("hash:failure")
      ).pipe(Effect.flip);
      yield* Effect.sync(() => {
        failures.digest = true;
      });
      const finalization = yield* finalizeResultCatalogDigest(
        releaseId,
        initial
      ).pipe(Effect.flip);

      expect([creation, update, finalization].map(({ _tag }) => _tag)).toEqual([
        "ResultCatalogHashError",
        "ResultCatalogHashError",
        "ResultCatalogHashError",
      ]);
    })
  );

  it.effect(
    "pins the empty and mixed result catalog digests in whole and one-head chunks and through the incremental API",
    () =>
      Effect.gen(function* () {
        const empty = yield* digestResultCatalog(releaseId, Stream.empty);
        const whole = yield* digestResultCatalog(
          releaseId,
          Stream.fromIterable(catalog)
        );
        const split = yield* digestResultCatalog(
          releaseId,
          Stream.fromIterable(catalog).pipe(Stream.rechunk(1))
        );
        const emptyState = yield* createResultCatalogDigest(releaseId);
        const emptyIncremental = yield* finalizeResultCatalogDigest(
          releaseId,
          emptyState
        );
        const initial = yield* createResultCatalogDigest(releaseId);
        const updated = yield* Effect.reduce(
          catalog,
          () => initial,
          (state, catalogHead) =>
            updateResultCatalogDigest(releaseId, state, catalogHead)
        );
        const incremental = yield* finalizeResultCatalogDigest(
          releaseId,
          updated
        );

        expect(empty).toEqual({
          count: 0,
          digest:
            "sha256:ed7d49e237dadbd311a1599264b00852ae18657d123c8f9cbc26c1c62c8f81cd",
        });
        expect(whole).toEqual({
          count: 3,
          digest:
            "sha256:d0a400a80958362d96b028e3dbcea99dec4f47bf37bee795b8b6e137d2647604",
        });
        expect(split).toEqual({
          count: 3,
          digest:
            "sha256:d0a400a80958362d96b028e3dbcea99dec4f47bf37bee795b8b6e137d2647604",
        });
        expect(emptyIncremental).toBe(
          "sha256:ed7d49e237dadbd311a1599264b00852ae18657d123c8f9cbc26c1c62c8f81cd"
        );
        expect(incremental).toBe(
          "sha256:d0a400a80958362d96b028e3dbcea99dec4f47bf37bee795b8b6e137d2647604"
        );
      })
  );

  it.effect("verifies the pinned catalog root and reports a wrong root", () =>
    Effect.gen(function* () {
      const summary = yield* verifyResultCatalog({
        expectedCount: 3,
        expectedDigest: Sha256HashSchema.make(
          "sha256:d0a400a80958362d96b028e3dbcea99dec4f47bf37bee795b8b6e137d2647604"
        ),
        heads: Stream.fromIterable(catalog),
        releaseId,
      });
      const error = yield* verifyResultCatalog({
        expectedCount: 3,
        expectedDigest: Sha256HashSchema.make(`sha256:${"0".repeat(64)}`),
        heads: Stream.fromIterable(catalog),
        releaseId,
      }).pipe(Effect.flip);

      expect(summary).toEqual({
        count: 3,
        digest:
          "sha256:d0a400a80958362d96b028e3dbcea99dec4f47bf37bee795b8b6e137d2647604",
      });
      expect(error).toMatchObject({
        _tag: "ResultCatalogDigestMismatchError",
      });
      expect("actualDigest" in error ? error.actualDigest : undefined).toBe(
        "sha256:d0a400a80958362d96b028e3dbcea99dec4f47bf37bee795b8b6e137d2647604"
      );
    })
  );
});
