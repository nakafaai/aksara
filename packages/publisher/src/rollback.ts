import type { FileSystem, Path } from "@effect/platform";
import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import { MaterialHeadSchema } from "@nakafa/aksara-contracts/release/head";
import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import { verifyResultCatalog } from "@nakafa/aksara-contracts/release/result-digest";
import { RouteRollbackRecordSchema } from "@nakafa/aksara-contracts/release/route-page";
import { verifyContentReleaseBundle } from "@nakafa/aksara-contracts/release/verify";
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, type Scope, type Stream } from "effect";
import { streamMaterialHeads } from "#publisher/heads";
import type { PreparedRollbackRelease } from "#publisher/preparation/spec";
import { validateReleaseRendererManifest } from "#publisher/release-validation";
import type { ReplaySpoolError } from "#publisher/replay/error";
import { createReplaySpool } from "#publisher/replay/spool";
import { mergeRollbackResult } from "#publisher/rollback/catalog";
import {
  RollbackIdentityError,
  type RollbackProofIdentityError,
} from "#publisher/rollback/errors";
import {
  type RollbackProofMode,
  type RollbackProofSelection,
  selectRollbackProof,
  verifyRollbackProof,
} from "#publisher/rollback/proof";
import {
  DerivedRollbackRecordSchema,
  deriveRollbackRecords,
  type RollbackArtifactPolicy,
} from "#publisher/rollback/records";
import {
  buildRollbackRelease,
  type RollbackBaseCatalog,
} from "#publisher/rollback/release";
import { streamRouteRecords } from "#publisher/rollback/route-page";
import {
  inverseRouteStream,
  verifyRouteProof,
} from "#publisher/rollback/route-proof";
import { streamRollbackRecords } from "#publisher/rollback/stream";

type RollbackPageStream = ReturnType<typeof streamRollbackRecords>;
type RoutePageStream = ReturnType<typeof streamRouteRecords>;
type DerivedTransitionStream = ReturnType<
  typeof deriveRollbackRecords<
    Stream.Stream.Error<RollbackPageStream>,
    Stream.Stream.Context<RollbackPageStream>
  >
>;
type ActiveHeadStream = ReturnType<typeof streamMaterialHeads>;
type ResultCatalogStream = ReturnType<
  typeof mergeRollbackResult<ReplaySpoolError, never, ReplaySpoolError, never>
>;

/** Exact signed proof and identities for one forward rollback. */
export interface PrepareRollbackInput {
  readonly proofBundle: unknown;
  readonly releaseId: ReleaseId;
  readonly rendererManifest: unknown;
  readonly rollbackOf: ReleaseId;
}

/** Every typed failure surfaced while authenticating and deriving a rollback. */
export type PrepareRollbackError =
  | Effect.Effect.Error<ReturnType<typeof validateRendererManifestHash>>
  | Effect.Effect.Error<ReturnType<typeof validateReleaseRendererManifest>>
  | Effect.Effect.Error<ReturnType<typeof verifyContentReleaseBundle>>
  | Effect.Effect.Error<ReturnType<typeof verifyRollbackProof>>
  | Effect.Effect.Error<
      ReturnType<typeof verifyResultCatalog<ReplaySpoolError, never>>
    >
  | Effect.Effect.Error<
      ReturnType<typeof buildRollbackRelease<ReplaySpoolError, never>>
    >
  | ReplaySpoolError
  | RollbackIdentityError
  | RollbackProofIdentityError
  | Stream.Stream.Error<ActiveHeadStream>
  | Stream.Stream.Error<DerivedTransitionStream>
  | Stream.Stream.Error<ResultCatalogStream>
  | Stream.Stream.Error<RoutePageStream>;

/** Services required by secure rollback preparation. */
export type PrepareRollbackContext =
  | Effect.Effect.Context<ReturnType<typeof verifyContentReleaseBundle>>
  | FileSystem.FileSystem
  | Path.Path
  | Scope.Scope
  | Stream.Stream.Context<ActiveHeadStream>
  | Stream.Stream.Context<DerivedTransitionStream>
  | Stream.Stream.Context<RoutePageStream>;

/** Complete Effect interface for secure rollback preparation. */
export type PrepareRollback = (
  input: PrepareRollbackInput
) => Effect.Effect<
  PreparedRollbackRelease<ReplaySpoolError, never>,
  PrepareRollbackError,
  PrepareRollbackContext
>;

/** Extracts the exact active catalog identity from source or recovery proof. */
function baseCatalogFromProof(
  proof: ContentReleaseBundle,
  selection: RollbackProofSelection
): RollbackBaseCatalog {
  const { manifest } = proof.release;
  if (selection.kind === "source") {
    return {
      manifestHash: proof.release.manifestHash,
      releaseId: manifest.releaseId,
      resultCount: manifest.resultCount,
      resultDigest: manifest.resultDigest,
    };
  }
  return {
    manifestHash: selection.baseManifestHash,
    releaseId: selection.baseReleaseId,
    resultCount: manifest.baseResultCount,
    resultDigest: manifest.baseResultDigest,
  };
}

/** Prepares one self-verified rollback from signed source or recovery proof. */
export const prepareRollback: PrepareRollback = Effect.fn(
  "AksaraPublisher.prepareRollback"
)(function* (input: PrepareRollbackInput) {
  if (input.releaseId === input.rollbackOf) {
    return yield* new RollbackIdentityError({
      releaseId: input.releaseId,
      rollbackOf: input.rollbackOf,
    });
  }
  const rendererManifest = yield* validateRendererManifestHash(
    input.rendererManifest
  );
  const proof = yield* verifyContentReleaseBundle(input.proofBundle);
  const proofSelection = yield* selectRollbackProof(
    proof.release,
    input.releaseId,
    input.rollbackOf
  );
  const proofMode: RollbackProofMode = proofSelection.kind;
  if (proofMode === "recovery") {
    yield* validateReleaseRendererManifest(
      proof.release.manifest,
      rendererManifest
    );
  }
  const base = baseCatalogFromProof(proof, proofSelection);
  const currentPolicy: RollbackArtifactPolicy =
    proofMode === "source"
      ? {
          kind: "compatible",
          rendererManifest: proof.rendererManifest,
        }
      : { kind: "integrity" };
  const transitionSpool = yield* createReplaySpool({
    prefix: "aksara-rollback-",
    schema: DerivedRollbackRecordSchema,
    stream: deriveRollbackRecords({
      currentPolicy,
      currentReleaseId: base.releaseId,
      priorPolicy: { kind: "compatible", rendererManifest },
      priorReleaseId: input.releaseId,
      records: streamRollbackRecords(
        base.releaseId,
        base.manifestHash,
        proof.release.manifest.rollbackCount
      ),
    }),
  });
  yield* verifyRollbackProof({
    manifest: proof.release.manifest,
    mode: proofMode,
    records: transitionSpool.replay,
  });
  const routeSpool = yield* createReplaySpool({
    prefix: "aksara-route-rollback-",
    schema: RouteRollbackRecordSchema,
    stream: streamRouteRecords(
      base.releaseId,
      base.manifestHash,
      proof.release.manifest.routeCount
    ),
  });
  yield* verifyRouteProof({
    manifest: proof.release.manifest,
    mode: proofMode,
    records: routeSpool.replay,
  });
  const activeSpool = yield* createReplaySpool({
    prefix: "aksara-rollback-active-",
    schema: MaterialHeadSchema,
    stream: streamMaterialHeads(base.releaseId, base.manifestHash),
  });
  yield* verifyResultCatalog({
    expectedCount: base.resultCount,
    expectedDigest: base.resultDigest,
    heads: activeSpool.replay(),
    releaseId: base.releaseId,
  });
  const resultSpool = yield* createReplaySpool({
    prefix: "aksara-rollback-result-",
    schema: MaterialHeadSchema,
    stream: mergeRollbackResult({
      active: activeSpool.replay(),
      transitions: transitionSpool.replay(),
    }),
  });
  return yield* buildRollbackRelease({
    base,
    records: transitionSpool.replay,
    releaseId: input.releaseId,
    rendererManifest,
    result: resultSpool.replay,
    routes: () => inverseRouteStream(routeSpool.replay, input.releaseId),
  });
});
