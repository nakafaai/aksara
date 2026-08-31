import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import { ContentHeadSchema } from "@nakafa/aksara-contracts/release/head";
import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import { verifyResultCatalog } from "@nakafa/aksara-contracts/release/result/digest";
import { RouteRollbackRecordSchema } from "@nakafa/aksara-contracts/release/route/page";
import { invertContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { verifyContentReleaseBundle } from "@nakafa/aksara-contracts/release/verify";
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import type { FileSystem, Path } from "effect";
import { Effect, type Scope, Stream } from "effect";
import { streamContentHeads } from "#publisher/heads";
import type { PreparedRollbackRelease } from "#publisher/preparation/prepared";
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
  type RollbackTargetPolicy,
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
    Stream.Error<RollbackPageStream>,
    Stream.Services<RollbackPageStream>
  >
>;
type ActiveHeadStream = ReturnType<typeof streamContentHeads>;
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
  | Effect.Error<ReturnType<typeof validateRendererManifestHash>>
  | Effect.Error<ReturnType<typeof validateReleaseRendererManifest>>
  | Effect.Error<ReturnType<typeof verifyContentReleaseBundle>>
  | Effect.Error<ReturnType<typeof verifyRollbackProof>>
  | Effect.Error<
      ReturnType<typeof verifyResultCatalog<ReplaySpoolError, never>>
    >
  | Effect.Error<
      ReturnType<typeof buildRollbackRelease<ReplaySpoolError, never>>
    >
  | ReplaySpoolError
  | RollbackIdentityError
  | RollbackProofIdentityError
  | Stream.Error<ActiveHeadStream>
  | Stream.Error<DerivedTransitionStream>
  | Stream.Error<ResultCatalogStream>
  | Stream.Error<RoutePageStream>;

/** Services required by secure rollback preparation. */
export type PrepareRollbackContext =
  | Effect.Services<ReturnType<typeof verifyContentReleaseBundle>>
  | FileSystem.FileSystem
  | Path.Path
  | Scope.Scope
  | Stream.Services<ActiveHeadStream>
  | Stream.Services<DerivedTransitionStream>
  | Stream.Services<RoutePageStream>;

/** Complete Effect interface for secure rollback preparation. */
export type PrepareRollback = (
  input: PrepareRollbackInput
) => Effect.Effect<
  PreparedRollbackRelease<ReplaySpoolError, never>,
  PrepareRollbackError,
  PrepareRollbackContext
>;

/** Extracts the active catalog and restored policy from signed proof. */
function rollbackPolicyFromProof(
  proof: ContentReleaseBundle,
  selection: RollbackProofSelection
) {
  const { manifest } = proof.release;
  if (selection.kind === "source") {
    const target: RollbackTargetPolicy = {
      activeAppLocales:
        manifest.baseActiveAppLocales ?? manifest.activeAppLocales,
      snapshots: invertContentSnapshots(manifest.snapshots),
    };
    return Effect.succeed({
      active: {
        activeAppLocales: manifest.activeAppLocales,
        manifestHash: proof.release.manifestHash,
        releaseId: manifest.releaseId,
        resultCount: manifest.resultCount,
        resultDigest: manifest.resultDigest,
      },
      target,
    });
  }
  return Effect.succeed({
    active: {
      activeAppLocales: selection.baseActiveAppLocales,
      manifestHash: selection.baseManifestHash,
      releaseId: selection.baseReleaseId,
      resultCount: manifest.baseResultCount,
      resultDigest: manifest.baseResultDigest,
    },
    target: {
      activeAppLocales: manifest.activeAppLocales,
      snapshots: manifest.snapshots,
    },
  });
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
  const policy = yield* rollbackPolicyFromProof(proof, proofSelection);
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
      currentReleaseId: policy.active.releaseId,
      priorPolicy: { kind: "compatible", rendererManifest },
      priorReleaseId: input.releaseId,
      records: streamRollbackRecords(
        policy.active.releaseId,
        policy.active.manifestHash,
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
      policy.active.releaseId,
      policy.active.manifestHash,
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
    schema: ContentHeadSchema,
    stream: Stream.concat(
      streamContentHeads(
        policy.active.releaseId,
        policy.active.manifestHash,
        "article"
      ),
      streamContentHeads(
        policy.active.releaseId,
        policy.active.manifestHash,
        "material"
      )
    ).pipe(
      Stream.concat(
        streamContentHeads(
          policy.active.releaseId,
          policy.active.manifestHash,
          "page"
        )
      ),
      Stream.concat(
        streamContentHeads(
          policy.active.releaseId,
          policy.active.manifestHash,
          "question"
        )
      )
    ),
  });
  yield* verifyResultCatalog({
    expectedCount: policy.active.resultCount,
    expectedDigest: policy.active.resultDigest,
    heads: activeSpool.replay,
    releaseId: policy.active.releaseId,
  });
  const resultSpool = yield* createReplaySpool({
    prefix: "aksara-rollback-result-",
    schema: ContentHeadSchema,
    stream: mergeRollbackResult({
      active: activeSpool.replay,
      transitions: transitionSpool.replay,
    }),
  });
  return yield* buildRollbackRelease({
    active: policy.active,
    records: transitionSpool.replay,
    releaseId: input.releaseId,
    rendererManifest,
    result: resultSpool.replay,
    routes: inverseRouteStream(routeSpool.replay, input.releaseId),
    scope: proof.release.manifest.scope,
    target: policy.target,
  });
});
