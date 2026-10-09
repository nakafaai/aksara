import type { ActiveCatalogIdentity } from "@nakafa/aksara-contracts/release/identity";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { SignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import type { ReleaseSnapshotInput } from "@nakafa/aksara-publisher/snapshot/release";
import { Array as Arr, Effect } from "effect";
import { BaseTryoutRuntimeBundleMismatchError } from "#cli/production/bundle";

/** Refreshes a permanent runtime pair only for an explicit try-out release. */
export const selectTryoutRuntimeRefresh = Effect.fn(
  "AksaraCli.selectTryoutRuntimeRefresh"
)(function* (input: {
  readonly base: ActiveCatalogIdentity | null;
  readonly bundle: SignedTryoutRuntimeBundle | null;
  readonly rendererManifest: RendererManifestEnvelope;
  readonly scope: PublicationScope;
}) {
  const snapshotId = input.base?.snapshots.tryout.resultSnapshotId ?? null;
  const selectsTryout = Arr.contains(input.scope.snapshots, "tryout");
  if (snapshotId !== null && input.bundle === null) {
    return yield* new BaseTryoutRuntimeBundleMismatchError({
      reason: "missing-runtime",
    });
  }
  const refresh =
    selectsTryout &&
    snapshotId !== null &&
    input.bundle !== null &&
    input.rendererManifest.hash !== input.bundle.payload.rendererManifestHash;
  return refresh
    ? ({
        kind: "refresh",
        snapshot: input.bundle.payload.snapshot,
      } satisfies ReleaseSnapshotInput<never, never>["runtime"])
    : ({ kind: "stable" } satisfies ReleaseSnapshotInput<
        never,
        never
      >["runtime"]);
});
