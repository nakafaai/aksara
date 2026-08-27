import { assert, describe, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import {
  ContentReleaseManifestSchema,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import { hashContentReleaseManifest } from "@nakafa/aksara-contracts/release/hash";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { replaceContentSnapshot } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import { vi } from "vitest";

import { selectSourceBase } from "#cli/production/base";
import { verifyBaseTryoutRuntimeBundle } from "#cli/production/bundle";
import {
  gitBundle,
  recoveryBundle,
  releaseId,
  runtimeBundleFor,
} from "#test/target";

const TRYOUT_SNAPSHOT_ID = Sha256HashSchema.make(`sha256:${"c".repeat(64)}`);
const OTHER_SNAPSHOT_ID = Sha256HashSchema.make(`sha256:${"d".repeat(64)}`);
const resolver = ContentVerificationKeyResolver.of({
  resolve: () => Effect.succeed("unused-test-public-key"),
});

vi.mock("@nakafa/aksara-contracts/tryout/runtime/verify", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    verifySignedTryoutRuntimeBundle: (input: { readonly bundle: unknown }) =>
      TestEffect.succeed(input.bundle),
  };
});

/** Runs runtime verification with its explicit trust dependency supplied. */
function verifyBase(
  bundle: Parameters<typeof verifyBaseTryoutRuntimeBundle>[0],
  baseBundle: Parameters<typeof verifyBaseTryoutRuntimeBundle>[1],
  base: Parameters<typeof verifyBaseTryoutRuntimeBundle>[2]
) {
  return verifyBaseTryoutRuntimeBundle(bundle, baseBundle, base).pipe(
    Effect.provideService(ContentVerificationKeyResolver, resolver)
  );
}

describe("production runtime bundle verification", () => {
  it.effect("accepts only the bundle bound to the active base", () =>
    Effect.gen(function* () {
      const active = gitBundle("release-runtime-base", {
        baseReleaseId: releaseId("release-runtime-parent"),
        tryoutSnapshotId: TRYOUT_SNAPSHOT_ID,
      });
      const base = selectSourceBase(active);
      const runtimeBundle = runtimeBundleFor(active, TRYOUT_SNAPSHOT_ID);

      assert.isNull(yield* verifyBase(null, active, base));
      for (const [effect, reason] of [
        [verifyBase(runtimeBundle, null, base), "missing-base"],
        [verifyBase(runtimeBundle, active, null), "missing-base"],
      ] as const) {
        const failure = yield* effect.pipe(Effect.flip);
        if (failure._tag !== "BaseTryoutRuntimeBundleMismatchError") {
          return yield* Effect.die(
            `Expected a base runtime mismatch, received ${failure._tag}.`
          );
        }
        assert.strictEqual(failure.reason, reason);
      }
      assert.deepStrictEqual(
        yield* verifyBase(runtimeBundle, active, base),
        runtimeBundle
      );

      const recovered = recoveryBundle("release-runtime-recovered", active);
      assert.deepStrictEqual(
        yield* verifyBase(
          runtimeBundle,
          recovered,
          selectSourceBase(recovered)
        ),
        runtimeBundle
      );

      const replacementManifest = ContentReleaseManifestSchema.make({
        ...active.release.manifest,
        scope: PublicationScopeSchema.make({
          families: active.release.manifest.scope.families,
          snapshots: ["tryout"],
        }),
        snapshots: {
          ...active.release.manifest.snapshots,
          tryout: replaceContentSnapshot({
            baseSnapshotId: OTHER_SNAPSHOT_ID,
            resultSnapshotId: TRYOUT_SNAPSHOT_ID,
            rowCount: 1,
            rowDigest: OTHER_SNAPSHOT_ID,
          }),
        },
      });
      const replacement = {
        ...active,
        release: SignedContentReleaseSchema.make({
          ...active.release,
          manifest: replacementManifest,
          manifestHash: yield* hashContentReleaseManifest(replacementManifest),
        }),
      };
      const retainedFailure = yield* verifyBase(
        runtimeBundleFor(replacement, OTHER_SNAPSHOT_ID),
        replacement,
        selectSourceBase(replacement)
      ).pipe(Effect.flip);
      if (retainedFailure._tag !== "BaseTryoutRuntimeBundleMismatchError") {
        return yield* Effect.die(
          `Expected a base runtime mismatch, received ${retainedFailure._tag}.`
        );
      }
      assert.strictEqual(retainedFailure.reason, "snapshot");

      const foreign = gitBundle("release-runtime-foreign", {
        baseReleaseId: releaseId("release-runtime-parent"),
        tryoutSnapshotId: TRYOUT_SNAPSHOT_ID,
      });
      const sourceFailure = yield* verifyBase(
        runtimeBundleFor(foreign, TRYOUT_SNAPSHOT_ID),
        active,
        base
      ).pipe(Effect.flip);
      if (sourceFailure._tag !== "TryoutRuntimeBundleSourceError") {
        return yield* Effect.die(
          `Expected a runtime source mismatch, received ${sourceFailure._tag}.`
        );
      }
      assert.strictEqual(sourceFailure.reason, "release");
    })
  );
});
