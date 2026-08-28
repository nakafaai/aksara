// @vitest-environment node

import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { Sha256HashSchema } from "#contracts/ids";
import { verifyTryoutRuntimeAdoptionSource } from "#contracts/migration/tryout/history/adoption/verify";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import {
  adoptionSource,
  adoptionSourceFrom,
  migrationResolver,
} from "#contracts/test/migration";

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
      const retainedBase = adoptionSourceFrom({
        releaseBaseSnapshotId: adoptionSource.snapshot.snapshotId,
        releaseSnapshotId: Sha256HashSchema.make(`sha256:${"e".repeat(64)}`),
      });
      expect(yield* verify(retainedBase)).toEqual(retainedBase);
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
        verify(adoptionSourceFrom({ releaseSnapshotId: foreignHash })).pipe(
          Effect.flip
        ),
        verify(adoptionSourceFrom({ rendererManifestHash: foreignHash })).pipe(
          Effect.flip
        ),
        verify(
          adoptionSourceFrom({
            snapshot: {
              ...adoptionSource.snapshot,
              snapshotId: foreignHash,
            },
          })
        ).pipe(Effect.flip),
      ]);

      expect(failures).toMatchObject([
        { _tag: "StoredRendererHashMismatchError" },
        { _tag: "TryoutRuntimeAdoptionSourceError", reason: "release" },
        { _tag: "TryoutRuntimeAdoptionSourceError", reason: "renderer" },
        { _tag: "TryoutRuntimeAdoptionSourceError", reason: "snapshot" },
      ]);
    })
  );
});
