import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { SignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { verifySignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/verify";
import { Effect, Schema } from "effect";

import type { ProductionBaseIdentity } from "#cli/production/base";

/** Current permanent runtime bundle does not identify the active try-out base. */
export class BaseTryoutRuntimeBundleMismatchError extends Schema.TaggedError<BaseTryoutRuntimeBundleMismatchError>()(
  "BaseTryoutRuntimeBundleMismatchError",
  { reason: Schema.Literals(["missing-base", "snapshot"]) }
) {}

/** Authenticates the optional permanent bundle and binds it to the active base. */
export const verifyBaseTryoutRuntimeBundle = Effect.fn(
  "AksaraCli.verifyBaseTryoutRuntimeBundle"
)(function* (
  bundle: SignedTryoutRuntimeBundle | null,
  baseBundle: ContentReleaseBundle | null,
  base: ProductionBaseIdentity | null
) {
  if (bundle === null) {
    return null;
  }
  if (baseBundle === null || base === null) {
    return yield* new BaseTryoutRuntimeBundleMismatchError({
      reason: "missing-base",
    });
  }
  const verified = yield* verifySignedTryoutRuntimeBundle({
    bundle,
    rendererManifest: baseBundle.rendererManifest,
  });
  if (
    verified.payload.snapshot.snapshotId !==
    base.snapshots.tryout.resultSnapshotId
  ) {
    return yield* new BaseTryoutRuntimeBundleMismatchError({
      reason: "snapshot",
    });
  }
  return verified;
});

/** Determines whether the active try-out snapshot needs a new runtime pair. */
export function shouldRefreshTryoutRuntimeBundle(input: {
  readonly base: ProductionBaseIdentity | null;
  readonly bundle: SignedTryoutRuntimeBundle | null;
  readonly rendererManifest: RendererManifestEnvelope;
}) {
  return (
    input.base !== null &&
    input.base.snapshots.tryout.resultSnapshotId !== null &&
    (input.bundle === null ||
      input.rendererManifest.hash !== input.bundle.payload.rendererManifestHash)
  );
}
