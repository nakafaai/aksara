import {
  GitCommitShaSchema,
  type ReleaseId,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import type { TryoutRuntimeAdoptionSource } from "@nakafa/aksara-contracts/migration/tryout/history/adoption";
import { TRYOUT_RUNTIME_BUNDLE_FORMAT } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { Effect } from "effect";

import { migrationFail } from "#publisher/migration/tryout/error";
import { convertHistoricalRenderer } from "#publisher/migration/tryout/target";
import type { PublicationTarget } from "#publisher/publication/spec";
import type { PublicationSigner } from "#publisher/signing/service";

type Target = typeof PublicationTarget.Service;

/** Signs and adopts one exact historical runtime pair idempotently. */
const adoptRuntime = Effect.fn("AksaraPublisher.adoptTryoutRuntime")(function* (
  target: Target,
  signer: PublicationSigner,
  migrationId: ReleaseId,
  source: TryoutRuntimeAdoptionSource
) {
  const { manifest } = source.release;
  if (manifest.origin.kind !== "git") {
    return yield* migrationFail("adoption-evidence");
  }
  const rendererManifest = yield* convertHistoricalRenderer(
    source.rendererManifest
  );
  const bundle = yield* signer.signTryoutRuntimeBundle({
    format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
    rendererManifestHash: rendererManifest.hash,
    snapshot: source.snapshot,
    sourceGitSha: GitCommitShaSchema.make(manifest.origin.sha),
    sourceManifestHash: Sha256HashSchema.make(source.release.manifestHash),
    sourceReleaseId: ReleaseIdSchema.make(manifest.releaseId),
  });
  const value = yield* target.migrateTryoutHistory({
    bundle,
    command: "adoptBundle",
    inventoryHash: source.inventoryHash,
    operation: "migrateTryoutHistory",
    releaseId: migrationId,
    rendererManifest,
  });
  if (
    value.command !== "adoptBundle" ||
    value.migrationId !== migrationId ||
    value.receipt.attemptCount !== source.attemptCount ||
    value.receipt.snapshotId !== source.snapshot.snapshotId ||
    value.receipt.sourceReleaseId !== manifest.releaseId
  ) {
    return yield* migrationFail("adoption-evidence");
  }
  return value.receipt;
});

/** Adopts every audited terminal source in deterministic release order. */
export const adoptTryoutRuntimes = Effect.fn(
  "AksaraPublisher.adoptTryoutRuntimes"
)(function* (input: {
  readonly migrationId: ReleaseId;
  readonly signer: PublicationSigner;
  readonly sources: readonly TryoutRuntimeAdoptionSource[];
  readonly target: Target;
}) {
  const sources = [...input.sources].sort((left, right) =>
    left.release.manifest.releaseId.localeCompare(
      right.release.manifest.releaseId
    )
  );
  return yield* Effect.forEach(
    sources,
    (source) =>
      adoptRuntime(input.target, input.signer, input.migrationId, source),
    { concurrency: 1 }
  );
});
