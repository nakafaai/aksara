import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import {
  hashTryoutHistoryMigrationMap,
  type TryoutHistoryMigrationMapEntry,
  TryoutHistoryMigrationMapEntrySchema,
} from "@nakafa/aksara-contracts/migration/tryout/history/map";
import type {
  TryoutHistoryMigrationSourceEvidence,
  TryoutHistoryMigrationTargetEvidence,
} from "@nakafa/aksara-contracts/migration/tryout/history/spec";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import type { TryoutHistoryMigrationSource } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { digestTryoutCatalog } from "@nakafa/aksara-contracts/tryout/catalog-hash";
import {
  tryoutCatalogIdentity,
  tryoutPlacementIdentity,
} from "@nakafa/aksara-contracts/tryout/identity";
import { digestTryoutPlacements } from "@nakafa/aksara-contracts/tryout/placement-hash";
import { TRYOUT_RUNTIME_BUNDLE_FORMAT } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import type { TryoutCatalogCounts } from "@nakafa/aksara-contracts/tryout/snapshot/spec";
import { Effect, Array as EffectArray, Schema, Stream } from "effect";
import type { ConvertedArtifactMap } from "#publisher/migration/tryout/artifact";
import { convertedCatalogRecords } from "#publisher/migration/tryout/catalog";
import { migrationFail } from "#publisher/migration/tryout/error";
import { convertedPlacementRecords } from "#publisher/migration/tryout/placement";
import type { ConvertedTryoutRows } from "#publisher/migration/tryout/row";
import type { PublicationSigner } from "#publisher/signing/service";

/** Signed runtime and exact target evidence ready for invisible staging. */
export interface PreparedTryoutMigrationTarget {
  readonly bundle: Effect.Success<
    ReturnType<PublicationSigner["signTryoutRuntimeBundle"]>
  >;
  readonly evidence: TryoutHistoryMigrationTargetEvidence;
  readonly rendererManifest: RendererManifestEnvelope;
}

/** Converts a hash-authenticated old renderer into the current exact schema. */
export const convertHistoricalRenderer = Effect.fn(
  "AksaraPublisher.convertHistoricalTryoutRenderer"
)((source: TryoutHistoryMigrationSource["rendererManifest"]) =>
  validateRendererManifestHash(source).pipe(
    Effect.mapError(() => migrationFail("renderer-conversion"))
  )
);

/** Counts current hierarchy kinds and public routes from converted records. */
function summarizeCatalog(rows: ConvertedTryoutRows) {
  const counts = {
    country: 0,
    exam: 0,
    section: 0,
    set: 0,
    track: 0,
  };
  let routeCount = 0;
  for (const { record } of rows.catalog) {
    counts[record.row.kind] += 1;
    if (record.row.publicPath !== undefined) {
      routeCount += 1;
    }
  }
  return { counts: counts satisfies TryoutCatalogCounts, routeCount };
}

/** Strictly decodes and hashes one already ordered conversion map. */
const mapEvidence = Effect.fn("AksaraPublisher.hashTryoutMigrationMap")(
  function* (entries: readonly TryoutHistoryMigrationMapEntry[]) {
    const decoded = yield* Schema.decodeEffect(
      Schema.Array(TryoutHistoryMigrationMapEntrySchema)
    )(entries, { onExcessProperty: "error" });
    return {
      count: decoded.length,
      digest: yield* hashTryoutHistoryMigrationMap(decoded),
    };
  },
  Effect.mapError(() => migrationFail("target-evidence"))
);

/** Builds the three deterministic old-to-current map evidence sets. */
const makeMapEvidence = Effect.fn(
  "AksaraPublisher.makeTryoutMigrationMapEvidence"
)(function* (
  artifacts: readonly ConvertedArtifactMap[],
  rows: ConvertedTryoutRows
) {
  const artifactEntries = artifacts.map(
    ({ index, newArtifactHash, oldArtifactHash }) => ({
      identity: oldArtifactHash,
      index,
      kind: "artifact" as const,
      newHash: newArtifactHash,
      oldHash: oldArtifactHash,
    })
  );
  const catalogEntries = rows.catalog.map(({ index, oldRowHash, record }) => ({
    identity: tryoutCatalogIdentity(record.row),
    index,
    kind: "catalog" as const,
    newHash: record.rowHash,
    oldHash: oldRowHash,
  }));
  const placementEntries = rows.placements.map(
    ({ index, oldRowHash, record }) => ({
      identity: tryoutPlacementIdentity(record.row),
      index,
      kind: "placement" as const,
      newHash: record.rowHash,
      oldHash: oldRowHash,
    })
  );
  return yield* Effect.all({
    artifacts: mapEvidence(artifactEntries),
    catalog: mapEvidence(catalogEntries),
    placements: mapEvidence(placementEntries),
  });
});

/** Selects the exact authenticated Git release that created the old snapshot. */
const selectCreatingRelease = Effect.fn(
  "AksaraPublisher.selectTryoutMigrationCreatingRelease"
)(function* (
  source: TryoutHistoryMigrationSource,
  rendererManifest: RendererManifestEnvelope
) {
  const creating = source.releases.find(
    ({ release }) =>
      release.manifest.releaseId === source.evidence.creatingReleaseId
  );
  const evidence = source.evidence.releases.find(
    ({ releaseId }) => releaseId === source.evidence.creatingReleaseId
  );
  if (
    creating === undefined ||
    evidence === undefined ||
    rendererManifest.hash !== source.evidence.rendererManifestHash ||
    creating.attemptCount !== evidence.attemptCount ||
    creating.release.manifestHash !== evidence.manifestHash ||
    creating.release.manifest.origin.kind !== "git" ||
    creating.release.manifest.rendererManifestHash !== rendererManifest.hash ||
    creating.release.manifest.snapshots.tryout.mode !== "replace" ||
    creating.release.manifest.snapshots.tryout.resultSnapshotId !==
      source.evidence.snapshot.snapshotId
  ) {
    return yield* migrationFail("provenance");
  }
  return {
    sourceGitSha: creating.release.manifest.origin.sha,
    sourceManifestHash: creating.release.manifestHash,
    sourceReleaseId: creating.release.manifest.releaseId,
  };
});

/** Recomputes and signs the permanent current target from converted rows. */
export const prepareTryoutMigrationTarget = Effect.fn(
  "AksaraPublisher.prepareTryoutMigrationTarget"
)(function* (input: {
  readonly artifacts: readonly ConvertedArtifactMap[];
  readonly rendererManifest: RendererManifestEnvelope;
  readonly rows: ConvertedTryoutRows;
  readonly signer: PublicationSigner;
  readonly source: TryoutHistoryMigrationSource;
}) {
  const catalogRecords = convertedCatalogRecords(input.rows.catalog);
  const placementRecords = convertedPlacementRecords(input.rows.placements);
  const activeAppLocales = EffectArray.make(
    AppLocaleSchema.make(input.source.evidence.snapshot.locales[0]),
    AppLocaleSchema.make(input.source.evidence.snapshot.locales[1])
  );
  const [catalog, placements, maps] = yield* Effect.all([
    digestTryoutCatalog(Stream.fromIterable(catalogRecords)),
    digestTryoutPlacements(Stream.fromIterable(placementRecords)),
    makeMapEvidence(input.artifacts, input.rows),
  ]);
  const summary = summarizeCatalog(input.rows);
  const snapshot = makeTryoutSnapshot({
    activeAppLocales,
    catalogDigest: catalog.digest,
    counts: summary.counts,
    placementCount: placements.count,
    placementDigest: placements.digest,
    routeCount: summary.routeCount,
  });
  const sourceSnapshot = input.source.evidence.snapshot;
  if (
    JSON.stringify(summary.counts) !== JSON.stringify(sourceSnapshot.counts) ||
    summary.routeCount !== sourceSnapshot.routeCount ||
    placements.count !== sourceSnapshot.placementCount
  ) {
    return yield* migrationFail("target-evidence");
  }
  const creating = yield* selectCreatingRelease(
    input.source,
    input.rendererManifest
  );
  const bundle = yield* input.signer.signTryoutRuntimeBundle({
    format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
    rendererManifestHash: input.rendererManifest.hash,
    snapshot,
    ...creating,
  });
  const evidence: TryoutHistoryMigrationTargetEvidence = {
    artifacts: maps.artifacts,
    bundleHash: bundle.bundleHash,
    catalog: maps.catalog,
    placements: maps.placements,
    snapshot,
  };
  return {
    bundle,
    evidence,
    rendererManifest: input.rendererManifest,
  } satisfies PreparedTryoutMigrationTarget;
});

/** Ensures the source evidence type remains the signed plan's exact contract. */
export function migrationSourceEvidence(
  source: TryoutHistoryMigrationSource
): TryoutHistoryMigrationSourceEvidence {
  return source.evidence;
}
