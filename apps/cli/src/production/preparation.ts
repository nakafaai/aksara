import {
  GitCommitShaSchema,
  ReleaseIdSchema,
} from "@nakafa/aksara-contracts/ids";
import type { ActiveCatalogIdentity } from "@nakafa/aksara-contracts/release/identity";
import { ContentReleaseBundleSchema } from "@nakafa/aksara-contracts/release/lifecycle";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { verifyContentReleaseBundle } from "@nakafa/aksara-contracts/release/verify";

import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import type { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import {
  type ContentCatalogPublication,
  prepareContentCatalog,
} from "@nakafa/aksara-publisher/catalog/publication";
import { streamContentHeads } from "@nakafa/aksara-publisher/heads";
import { prepareContentRelease } from "@nakafa/aksara-publisher/preparation";
import { reuseStoredGitRelease } from "@nakafa/aksara-publisher/preparation/recovery";
import {
  PublicationRetentionSchema,
  type PublicationTarget,
} from "@nakafa/aksara-publisher/publication/spec";
import {
  type PreparedReleaseSnapshots,
  prepareReleaseSnapshots,
} from "@nakafa/aksara-publisher/snapshot/release";
import type { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import type { FileSystem, Path } from "effect";
import { Effect, Schema, type Scope, Stream } from "effect";
import {
  readCleanAksaraRevision,
  validateStableAksaraRevision,
} from "#cli/evidence";
import { mapProductionError, type ProductionError } from "#cli/failure";
import {
  selectRecoveryBase,
  selectSourceBase,
  validateRecoveryBase,
} from "#cli/production/base";
import { selectRendererManifest } from "#cli/production/renderer";
import { validateRecoveryRevision } from "#cli/recovery";

const GitPreparationBaseSchema = Schema.Struct({
  checkoutRoot: Schema.String,
  rebuild: Schema.optional(Schema.Boolean),
  releaseId: ReleaseIdSchema,
  retention: PublicationRetentionSchema,
  scope: PublicationScopeSchema,
});

const GitPreparationInputSchema = Schema.Union([
  Schema.Struct({
    ...GitPreparationBaseSchema.fields,
    baseBundle: Schema.NullOr(ContentReleaseBundleSchema),
    kind: Schema.Literal("new"),
    rendererManifest: Schema.Unknown,
  }),
  Schema.Struct({
    ...GitPreparationBaseSchema.fields,
    baseBundle: Schema.NullOr(ContentReleaseBundleSchema),
    bundle: ContentReleaseBundleSchema,
    kind: Schema.Literal("rebuild"),
    sha: GitCommitShaSchema,
  }),
]);

type GitPreparationInput = typeof GitPreparationInputSchema.Type;

/** Replay failures of one release's source streams; the catalog streams share one. */
type PreparedSourceError =
  | Stream.Error<ContentCatalogPublication["records"]>
  | Stream.Error<PreparedReleaseSnapshots["rows"]>;
type PreparedGit = Effect.Success<
  ReturnType<typeof prepareContentRelease<PreparedSourceError, never>>
>;
type PreparationServices =
  | ContentVerificationKeyResolver
  | ExactProcess
  | FileSystem.FileSystem
  | Path.Path
  | PublicationTarget
  | Scope.Scope;
type PrepareProductionGit = (
  input: GitPreparationInput
) => Effect.Effect<PreparedGit, ProductionError, PreparationServices>;

/** Streams no prior heads for genesis and every exact target-owned family later. */
function publishedContentHeads(base: ActiveCatalogIdentity | null) {
  if (base === null) {
    return {
      article: Stream.empty,
      material: Stream.empty,
      page: Stream.empty,
    };
  }
  return {
    article: streamContentHeads(base.releaseId, base.manifestHash, "article"),
    material: streamContentHeads(base.releaseId, base.manifestHash, "material"),
    page: streamContentHeads(base.releaseId, base.manifestHash, "page"),
  };
}

/** Prepares a Git publication and restores its stored envelope on recovery. */
export const prepareProductionGit: PrepareProductionGit = Effect.fn(
  "AksaraCli.prepareProductionGit"
)((input) =>
  Effect.gen(function* () {
    const verifiedBaseBundle =
      input.baseBundle === null
        ? null
        : yield* verifyContentReleaseBundle(input.baseBundle);
    let base: ActiveCatalogIdentity | null;
    if (input.kind === "new") {
      base = selectSourceBase(verifiedBaseBundle);
    } else {
      base = selectRecoveryBase(input.bundle);
      yield* validateRecoveryBase(base, selectSourceBase(verifiedBaseBundle));
    }
    const aksaraSha = yield* readCleanAksaraRevision(input.checkoutRoot);
    if (input.kind === "rebuild") {
      yield* validateRecoveryRevision(input.sha, aksaraSha);
    }
    const rendererManifest =
      input.kind === "new"
        ? yield* selectRendererManifest({
            baseBundle: verifiedBaseBundle,
            rendererManifest: input.rendererManifest,
            retention: input.retention,
            scope: input.scope,
          })
        : yield* validateRendererManifestHash(input.bundle.rendererManifest);
    const baseRendererManifestHash =
      verifiedBaseBundle?.rendererManifest.hash ?? null;
    const catalog = yield* prepareContentCatalog({
      base:
        base === null
          ? null
          : {
              count: base.resultCount,
              digest: base.resultDigest,
              releaseId: base.releaseId,
            },
      checkoutRoot: input.checkoutRoot,
      published: publishedContentHeads(base),
      rebuild: input.rebuild,
      rendererManifest,
      scope: input.scope,
    });
    const snapshots =
      input.scope.snapshots.length === 0
        ? { manifests: Stream.empty, rows: Stream.empty }
        : yield* prepareReleaseSnapshots({
            checkoutRoot: input.checkoutRoot,
            families: input.scope.snapshots,
            previousSnapshots: base?.snapshots ?? null,
          });
    const prepared = yield* prepareContentRelease<PreparedSourceError, never>({
      aksaraSha,
      baseActiveAppLocales: base?.activeAppLocales ?? null,
      baseManifestHash: base === null ? null : base.manifestHash,
      baseReleaseId: base === null ? null : base.releaseId,
      baseRendererManifestHash,
      baseResultCount: base === null ? 0 : base.resultCount,
      baseResultDigest:
        base === null ? EMPTY_RESULT_CATALOG_DIGEST : base.resultDigest,
      previousSnapshots: base?.snapshots ?? null,
      records: catalog.records,
      releaseId: input.releaseId,
      rendererManifest,
      result: catalog.result,
      routes: catalog.routes,
      scope: input.scope,
      snapshotManifests: snapshots.manifests,
      snapshotRows: snapshots.rows,
    });
    const preparedSha = yield* readCleanAksaraRevision(input.checkoutRoot);
    yield* validateStableAksaraRevision(aksaraSha, preparedSha);
    if (input.kind === "new") {
      return prepared;
    }
    return yield* reuseStoredGitRelease({
      prepared,
      storedRelease: input.bundle.release,
    });
  }).pipe(Effect.mapError(mapProductionError("prepare")))
);
