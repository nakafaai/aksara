import type { GitCommitSha, ReleaseId } from "@nakafa/aksara-contracts/ids";
import type {
  ContentHead,
  QuestionHead,
} from "@nakafa/aksara-contracts/release/head";
import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { verifyContentReleaseBundle } from "@nakafa/aksara-contracts/release/verify";
import { validateLiveRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import type { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import type { SignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { prepareContentCatalog } from "@nakafa/aksara-publisher/catalog/publication";
import { streamContentHeads } from "@nakafa/aksara-publisher/heads";
import { prepareContentRelease } from "@nakafa/aksara-publisher/preparation";
import { reuseStoredGitRelease } from "@nakafa/aksara-publisher/preparation/recovery";
import type { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { prepareReleaseSnapshots } from "@nakafa/aksara-publisher/snapshot/release";
import type { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import type { FileSystem, Path } from "effect";
import { Effect, type Scope, Stream } from "effect";
import {
  readCleanAksaraRevision,
  validateStableAksaraRevision,
} from "#cli/evidence";
import { mapProductionError, type ProductionError } from "#cli/failure";
import {
  type ProductionBaseIdentity,
  selectRecoveryBase,
  selectSourceBase,
  validateRecoveryBase,
} from "#cli/production/base";
import {
  selectTryoutRuntimeRefresh,
  selectTryoutRuntimeTransition,
  verifyBaseTryoutRuntimeBundle,
} from "#cli/production/runtime";
import { validateRecoveryRevision } from "#cli/recovery";

interface GitPreparationBase {
  readonly baseTryoutRuntimeBundle: SignedTryoutRuntimeBundle | null;
  readonly checkoutRoot: string;
  readonly releaseId: ReleaseId;
  readonly scope: PublicationScope;
}

type GitPreparationInput =
  | (GitPreparationBase & {
      readonly baseBundle: ContentReleaseBundle | null;
      readonly kind: "new";
      readonly rendererManifest: unknown;
    })
  | (GitPreparationBase & {
      readonly baseBundle: ContentReleaseBundle | null;
      readonly bundle: ContentReleaseBundle;
      readonly kind: "rebuild";
      readonly sha: GitCommitSha;
    });

type PreparedGit = Effect.Success<
  ReturnType<typeof prepareContentRelease<unknown, never>>
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

/** Streams no prior heads for genesis and both exact target-owned families later. */
function publishedContentHeads(base: ProductionBaseIdentity | null) {
  if (base === null) {
    return {
      article: Stream.empty,
      material: Stream.empty,
      page: Stream.empty,
      question: Stream.empty,
    };
  }
  return {
    article: streamContentHeads(base.releaseId, base.manifestHash, "article"),
    material: streamContentHeads(base.releaseId, base.manifestHash, "material"),
    page: streamContentHeads(base.releaseId, base.manifestHash, "page"),
    question: streamContentHeads(base.releaseId, base.manifestHash, "question"),
  };
}

/** Narrows the complete desired catalog to try-out-owned question heads. */
function isQuestionHead(head: ContentHead): head is QuestionHead {
  return head.family === "question";
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
    let base: ProductionBaseIdentity | null;
    if (input.kind === "new") {
      base = selectSourceBase(verifiedBaseBundle);
    } else {
      base = selectRecoveryBase(input.bundle);
      yield* validateRecoveryBase(base, selectSourceBase(verifiedBaseBundle));
    }
    const verifiedBaseTryoutRuntimeBundle =
      yield* verifyBaseTryoutRuntimeBundle(
        input.baseTryoutRuntimeBundle,
        verifiedBaseBundle,
        base
      );
    const aksaraSha = yield* readCleanAksaraRevision(input.checkoutRoot);
    if (input.kind === "rebuild") {
      yield* validateRecoveryRevision(input.sha, aksaraSha);
    }
    const rendererManifest = yield* validateLiveRendererManifestHash(
      input.kind === "new"
        ? input.rendererManifest
        : input.bundle.rendererManifest
    );
    const runtime = selectTryoutRuntimeRefresh({
      base,
      bundle: verifiedBaseTryoutRuntimeBundle,
      rendererManifest,
    });
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
      rendererManifest,
      scope: input.scope,
    });
    const snapshots =
      input.scope.snapshots.length === 0 && runtime.kind === "stable"
        ? {
            manifests: Stream.empty,
            rows: Stream.empty,
            tryoutRuntimeSnapshot: null,
          }
        : yield* prepareReleaseSnapshots({
            checkoutRoot: input.checkoutRoot,
            families: input.scope.snapshots,
            previousSnapshots: base?.snapshots ?? null,
            questionHeads: catalog.result.pipe(Stream.filter(isQuestionHead)),
            rendererManifest,
            runtime,
          });
    const tryoutRuntime = yield* selectTryoutRuntimeTransition({
      base,
      bundle: verifiedBaseTryoutRuntimeBundle,
      snapshot:
        snapshots.tryoutRuntimeSnapshot ??
        verifiedBaseTryoutRuntimeBundle?.payload.snapshot ??
        null,
    });
    const prepared = yield* prepareContentRelease({
      aksaraSha,
      baseActiveAppLocales: base?.activeAppLocales ?? null,
      baseManifestHash: base === null ? null : base.manifestHash,
      baseReleaseId: base === null ? null : base.releaseId,
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
      tryoutRuntime,
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
