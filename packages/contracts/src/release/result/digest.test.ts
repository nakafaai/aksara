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
import { catalog, firstHead, heads, secondHead } from "#contracts/test/result";

const releaseId = Schema.decodeSync(ReleaseIdSchema)("test-result-digest");

describe("result catalog digest", () => {
  it.effect("matches streamed and incremental canonical digests", () =>
    Effect.gen(function* () {
      const initial = yield* createResultCatalogDigest;
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
      const digest = yield* finalizeResultCatalogDigest(updated);
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
      const initial = yield* createResultCatalogDigest;
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
        const emptyState = yield* createResultCatalogDigest;
        const emptyIncremental = yield* finalizeResultCatalogDigest(emptyState);
        const initial = yield* createResultCatalogDigest;
        const updated = yield* Effect.reduce(
          catalog,
          () => initial,
          (state, catalogHead) =>
            updateResultCatalogDigest(releaseId, state, catalogHead)
        );
        const incremental = yield* finalizeResultCatalogDigest(updated);

        expect(empty).toEqual({
          count: 0,
          digest:
            "sha256:ed7d49e237dadbd311a1599264b00852ae18657d123c8f9cbc26c1c62c8f81cd",
        });
        expect(whole).toEqual({
          count: 3,
          digest:
            "sha256:608aa14c5c70194fd4e9332e2c59e01ca6d7b055a4159cc78e16f59f41f85484",
        });
        expect(split).toEqual({
          count: 3,
          digest:
            "sha256:608aa14c5c70194fd4e9332e2c59e01ca6d7b055a4159cc78e16f59f41f85484",
        });
        expect(emptyIncremental).toBe(
          "sha256:ed7d49e237dadbd311a1599264b00852ae18657d123c8f9cbc26c1c62c8f81cd"
        );
        expect(incremental).toBe(
          "sha256:608aa14c5c70194fd4e9332e2c59e01ca6d7b055a4159cc78e16f59f41f85484"
        );
      })
  );

  it.effect("verifies the pinned catalog root and reports a wrong root", () =>
    Effect.gen(function* () {
      const summary = yield* verifyResultCatalog({
        expectedCount: 3,
        expectedDigest: Sha256HashSchema.make(
          "sha256:608aa14c5c70194fd4e9332e2c59e01ca6d7b055a4159cc78e16f59f41f85484"
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
          "sha256:608aa14c5c70194fd4e9332e2c59e01ca6d7b055a4159cc78e16f59f41f85484",
      });
      expect(error).toMatchObject({
        _tag: "ResultCatalogDigestMismatchError",
      });
      expect("actualDigest" in error ? error.actualDigest : undefined).toBe(
        "sha256:608aa14c5c70194fd4e9332e2c59e01ca6d7b055a4159cc78e16f59f41f85484"
      );
    })
  );
});
