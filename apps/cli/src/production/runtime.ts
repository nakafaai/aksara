import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { verifyTryoutRuntimeBundleSource } from "@nakafa/aksara-contracts/tryout/runtime/source";
import type { SignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { verifySignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/verify";
import type { TryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/spec";
import type { ReleaseSnapshotInput } from "@nakafa/aksara-publisher/snapshot/release";
import { Effect, Schema } from "effect";

import type { ProductionBaseIdentity } from "#cli/production/base";

/** Current permanent runtime bundle does not identify the active try-out base. */
export class BaseTryoutRuntimeBundleMismatchError extends Schema.TaggedError<BaseTryoutRuntimeBundleMismatchError>()(
  "BaseTryoutRuntimeBundleMismatchError",
  { reason: Schema.Literals(["missing-base", "missing-recovery", "snapshot"]) }
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
  yield* verifyTryoutRuntimeBundleSource({
    bundle: verified,
    release: baseBundle.release,
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

/** Selects the exact active snapshot source for any required runtime refresh. */
export function selectTryoutRuntimeRefresh(input: {
  readonly base: ProductionBaseIdentity | null;
  readonly bundle: SignedTryoutRuntimeBundle | null;
  readonly rendererManifest: RendererManifestEnvelope;
}): ReleaseSnapshotInput<never, never>["runtime"] {
  const refresh =
    input.base !== null &&
    input.base.snapshots.tryout.resultSnapshotId !== null &&
    (input.bundle === null ||
      input.rendererManifest.hash !==
        input.bundle.payload.rendererManifestHash);
  return refresh
    ? { kind: "refresh", snapshot: input.bundle?.payload.snapshot ?? null }
    : { kind: "stable" };
}

/** Selects the candidate pair and any retained inverse that must be re-signed. */
export const selectTryoutRuntimeTransition = Effect.fn(
  "AksaraCli.selectTryoutRuntimeTransition"
)(function* (input: {
  readonly base: ProductionBaseIdentity | null;
  readonly bundle: SignedTryoutRuntimeBundle | null;
  readonly rendererManifest: RendererManifestEnvelope;
  readonly snapshot: TryoutSnapshot | null;
}) {
  if (input.snapshot === null) {
    return null;
  }
  const baseSnapshotId = input.base?.snapshots.tryout.resultSnapshotId ?? null;
  if (baseSnapshotId === null || input.snapshot.snapshotId === baseSnapshotId) {
    return { recovery: null, result: input.snapshot };
  }
  if (input.bundle === null) {
    return yield* new BaseTryoutRuntimeBundleMismatchError({
      reason: "missing-recovery",
    });
  }
  if (
    input.bundle.payload.rendererManifestHash === input.rendererManifest.hash
  ) {
    return { recovery: null, result: input.snapshot };
  }
  return {
    recovery: input.bundle.payload.snapshot,
    result: input.snapshot,
  };
});
