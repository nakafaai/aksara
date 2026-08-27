import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import type { SignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import type { ReleaseSnapshotInput } from "@nakafa/aksara-publisher/snapshot/release";

import type { ProductionBaseIdentity } from "#cli/production/base";

/** Refreshes a permanent runtime pair only for an explicit try-out release. */
export function selectTryoutRuntimeRefresh(input: {
  readonly base: ProductionBaseIdentity | null;
  readonly bundle: SignedTryoutRuntimeBundle | null;
  readonly rendererManifest: RendererManifestEnvelope;
  readonly scope: PublicationScope;
}): ReleaseSnapshotInput<never, never>["runtime"] {
  const refresh =
    input.scope.snapshots.includes("tryout") &&
    input.base !== null &&
    input.base.snapshots.tryout.resultSnapshotId !== null &&
    (input.bundle === null ||
      input.rendererManifest.hash !==
        input.bundle.payload.rendererManifestHash);
  return refresh
    ? { kind: "refresh", snapshot: input.bundle?.payload.snapshot ?? null }
    : { kind: "stable" };
}
