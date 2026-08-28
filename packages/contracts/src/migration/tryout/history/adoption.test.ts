// @vitest-environment node

import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { Sha256HashSchema } from "#contracts/ids";
import {
  TryoutRuntimeAdoptionReceiptSchema,
  verifyTryoutRuntimeAdoptionSource,
} from "#contracts/migration/tryout/history/adoption";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import { adoptionSource, migrationResolver } from "#contracts/test/migration";

/** Verifies one adoption source with the exact retained test key. */
function verify(input: typeof adoptionSource) {
  return verifyTryoutRuntimeAdoptionSource(input).pipe(
    Effect.provideService(ContentVerificationKeyResolver, migrationResolver)
  );
}

describe("try-out runtime adoption", () => {
  it.effect("authenticates the retained release, renderer, and snapshot", () =>
    Effect.gen(function* () {
      expect(yield* verify(adoptionSource)).toEqual(adoptionSource);
    })
  );

  it.effect("rejects contradictory renderer and snapshot identities", () =>
    Effect.gen(function* () {
      const foreignHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);
      const failures = yield* Effect.all([
        verify({
          ...adoptionSource,
          rendererManifest: {
            ...adoptionSource.rendererManifest,
            hash: foreignHash,
          },
        }).pipe(Effect.flip),
        verify({
          ...adoptionSource,
          snapshot: { ...adoptionSource.snapshot, snapshotId: foreignHash },
        }).pipe(Effect.flip),
      ]);

      expect(failures.map(({ _tag }) => _tag)).toEqual([
        "StoredRendererHashMismatchError",
        "TryoutRuntimeAdoptionSourceError",
      ]);
    })
  );

  it("requires complete attempt and bundle outcomes", () => {
    const receipt = {
      adopted: 1,
      alreadyAdopted: 0,
      attemptCount: 1,
      bundleCreated: 1,
      bundleHash: `sha256:${"a".repeat(64)}`,
      bundleUnchanged: 0,
      snapshotId: adoptionSource.snapshot.snapshotId,
      sourceReleaseId: adoptionSource.release.manifest.releaseId,
    };

    const isReceipt = Schema.is(TryoutRuntimeAdoptionReceiptSchema);

    expect(isReceipt(receipt)).toBe(true);
    expect(isReceipt({ ...receipt, adopted: 0 })).toBe(false);
    expect(
      isReceipt({
        ...receipt,
        bundleUnchanged: 1,
      })
    ).toBe(false);
  });
});
