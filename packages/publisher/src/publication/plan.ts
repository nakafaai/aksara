import type { FileSystem, Path } from "@effect/platform";
import type { ContentCacheChange } from "@nakafa/aksara-contracts/cache/content";
import {
  type SignedContentArtifact,
  SignedContentArtifactSchema,
} from "@nakafa/aksara-contracts/content";
import type { VerifiedContentProjections } from "@nakafa/aksara-contracts/projection/verify";
import {
  decodeContentProjections,
  verifyContentProjections,
} from "@nakafa/aksara-contracts/projection/verify";
import type {
  ContentReleaseItem,
  SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import {
  decodeContentReleaseItems,
  type VerifiedContentReleaseItems,
  verifyContentReleaseItems,
} from "@nakafa/aksara-contracts/release/items";
import {
  decodeContentRoutes,
  type VerifiedContentRoutes,
  verifyContentRoutes,
} from "@nakafa/aksara-contracts/release/routes";
import type { VerifiedContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot-verify";
import { verifySignedContentRelease } from "@nakafa/aksara-contracts/release/verify";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import type { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Redacted, type Scope, Stream } from "effect";
import {
  makeArtifactBatches,
  makeReleaseItemBatches,
  makeRouteBatches,
} from "#publisher/batching";
import { contentSnapshotCacheChanges } from "#publisher/cache";
import type {
  PreparedContentRelease,
  PreparedGitRelease,
  PreparedRollbackRelease,
} from "#publisher/preparation/spec";
import { makeProjectionBatches } from "#publisher/projection-batch";
import {
  makeGitArtifacts,
  makeRollbackArtifacts,
} from "#publisher/publication/artifacts";
import type { PublishContentReleaseError } from "#publisher/publication/program";
import {
  stagePublicationSnapshots,
  verifyPublicationSnapshots,
} from "#publisher/publication/snapshots";
import {
  PublicationModeMismatchError,
  PublicationSigningKey,
  type PublicationSource,
  PublicationTarget,
} from "#publisher/publication/spec";
import { validateReleaseRendererManifest } from "#publisher/release-validation";
import { createReplaySpool, type ReplaySpool } from "#publisher/replay/spool";
import { makeEd25519PublicationSigner } from "#publisher/signing";
import {
  type CompiledReleaseSource,
  CompiledReleaseSourceSchema,
  compileReleaseSources,
} from "#publisher/source-compilation";

/** One prepared release mode plus any exact-Git source dependency it needs. */
export type PublicationInvocation<E, R> =
  | {
      readonly input: PreparedGitRelease<E, R>;
      readonly kind: "git";
      readonly source: typeof PublicationSource.Service;
    }
  | {
      readonly input: PreparedRollbackRelease<E, R>;
      readonly kind: "rollback";
    };

type PublicationArtifactPlan =
  | {
      readonly compiled: ReplaySpool<CompiledReleaseSource>;
      readonly kind: "git";
    }
  | {
      readonly artifacts: ReplaySpool<SignedContentArtifact>;
      readonly kind: "rollback";
    };

/** Signed release plan whose streams can be replayed into one target slot. */
export interface PublicationPlan<E, R> {
  readonly bundle: {
    readonly release: SignedContentRelease;
    readonly rendererManifest: RendererManifestEnvelope;
  };
  /** Replays family-aware cache changes from the decoded release item stream. */
  readonly cacheChanges: () => Stream.Stream<
    ContentCacheChange,
    PublishContentReleaseError<E>,
    R
  >;
  readonly projectionSummary: VerifiedContentProjections;
  readonly routeSummary: VerifiedContentRoutes;
  readonly snapshotSummary: VerifiedContentSnapshots;
  readonly stage: Effect.Effect<
    void,
    PublishContentReleaseError<E>,
    ContentVerificationKeyResolver | R
  >;
  readonly summary: VerifiedContentReleaseItems;
  readonly target: typeof PublicationTarget.Service;
}

type PreparePublicationPlan = <E, R>(
  invocation: PublicationInvocation<E, R>
) => Effect.Effect<
  PublicationPlan<E, R>,
  PublishContentReleaseError<E>,
  | FileSystem.FileSystem
  | Path.Path
  | Scope.Scope
  | PublicationSigningKey
  | PublicationTarget
  | Effect.Effect.Context<ReturnType<typeof verifySignedContentRelease>>
  | R
>;

/** Creates the typed failure for a prepared and signed mode mismatch. */
function modeMismatch<E, R>(input: PreparedContentRelease<E, R>) {
  return new PublicationModeMismatchError({
    manifestMode: input.manifest.origin.kind,
    preparedMode: input.kind,
    releaseId: input.manifest.releaseId,
  });
}

/** Requires one Git-prepared release to carry exact Git provenance. */
function validateGitMode<E, R>(input: PreparedGitRelease<E, R>) {
  if (input.manifest.origin.kind !== "git") {
    return Effect.fail(modeMismatch(input));
  }
  return Effect.succeed(input.manifest.origin.sha);
}

/** Requires one rollback-prepared release to carry rollback provenance. */
function validateRollbackMode<E, R>(input: PreparedRollbackRelease<E, R>) {
  if (input.manifest.origin.kind !== "rollback") {
    return Effect.fail(modeMismatch(input));
  }
  return Effect.void;
}

/** Selects authenticated upserts while preserving canonical stream order. */
function upsertItems<E, R>(items: Stream.Stream<ContentReleaseItem, E, R>) {
  return items.pipe(
    Stream.filter((item) => item.change.operation === "upsert")
  );
}

/** Selects cache family and optional immutable hash from every changed item. */
function contentCacheChanges<E, R>(
  items: Stream.Stream<ContentReleaseItem, E, R>
) {
  return items.pipe(
    Stream.map(
      (item): ContentCacheChange =>
        item.change.operation === "upsert"
          ? {
              artifactHash: item.change.artifactHash,
              family: item.change.family,
            }
          : { family: item.change.family }
    )
  );
}

/** Builds one signed replayable plan without changing target visibility. */
export const preparePublicationPlan: PreparePublicationPlan = Effect.fn(
  "AksaraPublisher.preparePublicationPlan"
)(function* <E, R>(invocation: PublicationInvocation<E, R>) {
  const { input } = invocation;
  const rendererManifest = yield* validateRendererManifestHash(
    input.rendererManifest
  );
  /** Replays strictly decoded release items for bounded target staging. */
  const decodedItems = () =>
    decodeContentReleaseItems({
      items: input.items(),
      manifest: input.manifest,
    });
  /** Replays strictly decoded projections for bounded target staging. */
  const decodedProjections = () =>
    decodeContentProjections(input.projections());
  /** Replays strictly decoded routes for bounded target staging. */
  const decodedRoutes = () =>
    decodeContentRoutes({ manifest: input.manifest, routes: input.routes() });
  const summary = yield* verifyContentReleaseItems({
    items: input.items(),
    manifest: input.manifest,
  });
  const projectionSummary = yield* verifyContentProjections({
    manifest: input.manifest,
    projections: input.projections(),
  });
  const routeSummary = yield* verifyContentRoutes({
    manifest: input.manifest,
    routes: input.routes(),
  });
  const snapshotSummary = yield* verifyPublicationSnapshots(input);
  /** Replays every structured snapshot and body-item cache change. */
  const cacheChanges = () =>
    contentSnapshotCacheChanges(snapshotSummary.snapshots).pipe(
      Stream.concat(contentCacheChanges(decodedItems()))
    );
  yield* validateReleaseRendererManifest(input.manifest, rendererManifest);

  let artifactPlan: PublicationArtifactPlan;
  if (invocation.kind === "rollback") {
    yield* validateRollbackMode(invocation.input);
    const artifacts = yield* createReplaySpool({
      prefix: "aksara-rollback-artifacts-",
      schema: SignedContentArtifactSchema,
      stream: makeRollbackArtifacts({
        artifacts: invocation.input.artifacts(),
        items: upsertItems(decodedItems()),
        manifest: input.manifest,
        rendererManifest,
      }),
    });
    artifactPlan = { artifacts, kind: "rollback" };
  } else {
    const aksaraSha = yield* validateGitMode(invocation.input);
    const items = upsertItems(decodedItems());
    const compiled = yield* createReplaySpool({
      prefix: "aksara-exact-git-",
      schema: CompiledReleaseSourceSchema,
      stream: compileReleaseSources({
        items,
        rendererManifest,
        sources: invocation.source.loadExactRevision({ aksaraSha, items }),
      }),
    });
    artifactPlan = { compiled, kind: "git" };
  }

  const signingKey = yield* PublicationSigningKey;
  const target = yield* PublicationTarget;
  const signer = yield* makeEd25519PublicationSigner({
    keyId: signingKey.keyId,
    privateKeyPem: Redacted.value(signingKey.privateKeyPem),
  });
  const signedRelease = yield* input.storedRelease === null
    ? signer.signRelease(input.manifest)
    : Effect.succeed(input.storedRelease);
  const release = yield* verifySignedContentRelease(signedRelease);
  const stage = Effect.gen(function* () {
    yield* makeReleaseItemBatches(
      input.manifest.releaseId,
      decodedItems()
    ).pipe(Stream.runForEach(target.stageItemBatch));
    yield* makeProjectionBatches(
      input.manifest.releaseId,
      decodedProjections()
    ).pipe(Stream.runForEach(target.stageProjectionBatch));
    yield* makeRouteBatches(input.manifest.releaseId, decodedRoutes()).pipe(
      Stream.runForEach(target.stageRouteBatch)
    );
    if (artifactPlan.kind === "rollback") {
      yield* makeArtifactBatches(
        input.manifest.releaseId,
        artifactPlan.artifacts.replay()
      ).pipe(Stream.runForEach(target.stageArtifactBatch));
    } else {
      const artifacts = makeGitArtifacts({
        compiled: artifactPlan.compiled.replay(),
        manifest: input.manifest,
        rendererManifest,
        signer,
      });
      yield* makeArtifactBatches(input.manifest.releaseId, artifacts).pipe(
        Stream.runForEach(target.stageArtifactBatch)
      );
    }
    yield* stagePublicationSnapshots(input, target);
  });
  return {
    bundle: { release, rendererManifest },
    cacheChanges,
    projectionSummary,
    routeSummary,
    snapshotSummary,
    stage,
    summary,
    target,
  };
});
