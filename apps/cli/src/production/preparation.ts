import type { CommandExecutor, FileSystem, Path } from "@effect/platform";
import type { GitCommitSha, ReleaseId } from "@nakafa/aksara-contracts/ids";
import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import { verifyContentReleaseBundle } from "@nakafa/aksara-contracts/release/verify";
import type { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { streamMaterialHeads } from "@nakafa/aksara-publisher/heads";
import { prepareMaterialPublication } from "@nakafa/aksara-publisher/material/publication";
import { prepareContentRelease } from "@nakafa/aksara-publisher/preparation";
import {
  reuseStoredGitRelease,
  reuseStoredRollbackRelease,
} from "@nakafa/aksara-publisher/preparation/recovery";
import type { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { prepareRollback } from "@nakafa/aksara-publisher/rollback";
import { Effect, type Scope, Stream } from "effect";
import { readCleanAksaraRevision } from "#cli/evidence";
import { mapProductionError, type ProductionError } from "#cli/failure";
import { validateRecoveryRevision } from "#cli/recovery";
import { findAksaraRoot } from "#cli/repository";

interface BaseCatalogIdentity {
  readonly manifestHash: ContentReleaseBundle["release"]["manifestHash"];
  readonly releaseId: ReleaseId;
  readonly resultCount: number;
  readonly resultDigest: ContentReleaseBundle["release"]["manifest"]["resultDigest"];
}

interface GitPreparationBase {
  readonly cwd: string;
  readonly releaseId: ReleaseId;
}

type GitPreparationInput =
  | (GitPreparationBase & {
      readonly baseBundle: ContentReleaseBundle | null;
      readonly kind: "new";
      readonly rendererManifest: unknown;
    })
  | (GitPreparationBase & {
      readonly bundle: ContentReleaseBundle;
      readonly kind: "rebuild";
      readonly sha: GitCommitSha;
    });

interface RollbackPreparationBase {
  readonly releaseId: ReleaseId;
  readonly rollbackOf: ReleaseId;
}

type RollbackPreparationInput =
  | (RollbackPreparationBase & {
      readonly kind: "new";
      readonly rendererManifest: unknown;
      readonly sourceBundle: ContentReleaseBundle;
    })
  | (RollbackPreparationBase & {
      readonly bundle: ContentReleaseBundle;
      readonly kind: "rebuild";
    });

type PreparedGit = Effect.Effect.Success<
  ReturnType<typeof prepareContentRelease<unknown, never>>
>;
type PreparedRollback = Effect.Effect.Success<
  ReturnType<typeof prepareRollback>
>;
type PreparationServices =
  | CommandExecutor.CommandExecutor
  | ContentVerificationKeyResolver
  | FileSystem.FileSystem
  | Path.Path
  | PublicationTarget
  | Scope.Scope;
type PrepareProductionGit = (
  input: GitPreparationInput
) => Effect.Effect<PreparedGit, ProductionError, PreparationServices>;
type PrepareProductionRollback = (
  input: RollbackPreparationInput
) => Effect.Effect<PreparedRollback, ProductionError, PreparationServices>;

/** Streams no prior heads for genesis and exact target-owned heads later. */
function publishedMaterialHeads(base: BaseCatalogIdentity | null) {
  if (base === null) {
    return Stream.empty;
  }
  return streamMaterialHeads(base.releaseId, base.manifestHash);
}

/** Selects the authenticated base catalog represented by one source bundle. */
function selectSourceBase(bundle: ContentReleaseBundle | null) {
  if (bundle === null) {
    return null;
  }
  return {
    manifestHash: bundle.release.manifestHash,
    releaseId: bundle.release.manifest.releaseId,
    resultCount: bundle.release.manifest.resultCount,
    resultDigest: bundle.release.manifest.resultDigest,
  } satisfies BaseCatalogIdentity;
}

/** Selects the authenticated base catalog frozen inside a pending release. */
function selectRecoveryBase(bundle: ContentReleaseBundle) {
  const { manifest } = bundle.release;
  if (manifest.baseReleaseId === null || manifest.baseManifestHash === null) {
    return null;
  }
  return {
    manifestHash: manifest.baseManifestHash,
    releaseId: manifest.baseReleaseId,
    resultCount: manifest.baseResultCount,
    resultDigest: manifest.baseResultDigest,
  } satisfies BaseCatalogIdentity;
}

/** Prepares a Git publication and restores its stored envelope on recovery. */
export const prepareProductionGit: PrepareProductionGit = Effect.fn(
  "AksaraCli.prepareProductionGit"
)((input) =>
  Effect.gen(function* () {
    let base: BaseCatalogIdentity | null;
    if (input.kind === "new") {
      const bundle =
        input.baseBundle === null
          ? null
          : yield* verifyContentReleaseBundle(input.baseBundle);
      base = selectSourceBase(bundle);
    } else {
      base = selectRecoveryBase(input.bundle);
    }
    const checkoutRoot = yield* findAksaraRoot(input.cwd);
    const aksaraSha = yield* readCleanAksaraRevision(checkoutRoot);
    if (input.kind === "rebuild") {
      yield* validateRecoveryRevision(input.sha, aksaraSha);
    }
    const rendererManifest =
      input.kind === "new"
        ? input.rendererManifest
        : input.bundle.rendererManifest;
    const material = yield* prepareMaterialPublication({
      baseCatalog:
        base === null
          ? null
          : {
              count: base.resultCount,
              digest: base.resultDigest,
              releaseId: base.releaseId,
            },
      checkoutRoot,
      published: publishedMaterialHeads(base),
      rendererManifest,
    });
    const prepared = yield* prepareContentRelease({
      aksaraSha,
      baseManifestHash: base === null ? null : base.manifestHash,
      baseReleaseId: base === null ? null : base.releaseId,
      baseResultCount: base === null ? 0 : base.resultCount,
      baseResultDigest:
        base === null ? EMPTY_RESULT_CATALOG_DIGEST : base.resultDigest,
      records: material.records,
      releaseId: input.releaseId,
      rendererManifest,
      result: material.result,
    });
    if (input.kind === "new") {
      return prepared;
    }
    return yield* reuseStoredGitRelease({
      prepared,
      storedRelease: input.bundle.release,
    });
  }).pipe(Effect.mapError(mapProductionError("prepare")))
);

/** Prepares a rollback and restores its stored envelope on recovery. */
export const prepareProductionRollback: PrepareProductionRollback = Effect.fn(
  "AksaraCli.prepareProductionRollback"
)((input) =>
  Effect.gen(function* () {
    const proofBundle =
      input.kind === "new" ? input.sourceBundle : input.bundle;
    const rendererManifest =
      input.kind === "new"
        ? input.rendererManifest
        : input.bundle.rendererManifest;
    const prepared = yield* prepareRollback({
      proofBundle,
      releaseId: input.releaseId,
      rendererManifest,
      rollbackOf: input.rollbackOf,
    });
    if (input.kind === "new") {
      return prepared;
    }
    return yield* reuseStoredRollbackRelease({
      prepared,
      storedRelease: input.bundle.release,
    });
  }).pipe(Effect.mapError(mapProductionError("prepare")))
);
