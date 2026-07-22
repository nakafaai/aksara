import type {
  CommandExecutor,
  FileSystem,
  HttpClient,
  Path,
} from "@effect/platform";
import type { GitCommitSha, ReleaseId } from "@nakafa/aksara-contracts/ids";
import type { PublicationReceipt } from "@nakafa/aksara-contracts/release";
import { verifyContentReleaseBundle } from "@nakafa/aksara-contracts/release/verify";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import {
  ACTIVE_SIGNING_KEY_ID,
  makeTrustedKeyResolver,
  TRUSTED_CONTENT_KEYS,
} from "@nakafa/aksara-contracts/signature/trusted";
import { GitPublicationSourceLive } from "@nakafa/aksara-publisher/git/source";
import { streamMaterialHeads } from "@nakafa/aksara-publisher/heads";
import { prepareMaterialPublication } from "@nakafa/aksara-publisher/material/publication";
import { prepareContentRelease } from "@nakafa/aksara-publisher/preparation";
import {
  publishGitRelease,
  publishRollbackRelease,
} from "@nakafa/aksara-publisher/publication";
import {
  PublicationSigningKey,
  PublicationTarget,
} from "@nakafa/aksara-publisher/publication/spec";
import { resumeContentRelease } from "@nakafa/aksara-publisher/resume";
import { prepareRollback } from "@nakafa/aksara-publisher/rollback";
import { makeHttpPublicationTarget } from "@nakafa/aksara-publisher/target/http";
import { Effect, Stream } from "effect";
import type { ReleaseArguments, RollbackArguments } from "#cli/args";
import { readProductionEnvironment } from "#cli/env";
import { readCleanAksaraRevision } from "#cli/evidence";
import { mapProductionError, type ProductionError } from "#cli/failure";
import { verifySigningKey } from "#cli/keys";
import { fetchProductionRenderer } from "#cli/production-renderer";
import {
  validateRecoveryManifest,
  validateRecoveryRevision,
} from "#cli/recovery";
import { findAksaraRoot } from "#cli/repository";
import { retryPublicationTarget } from "#cli/retry";
import { type ProductionStateAction, selectProductionAction } from "#cli/state";

const PUBLICATION_TIMEOUT = "30 seconds";

/** Explicit decoded command input for the production publication boundary. */
export interface ProductionInput {
  readonly args: ReleaseArguments | RollbackArguments;
  readonly cwd: string;
}

interface GitPreparationInput {
  readonly baseReleaseId: ReleaseId | null;
  readonly cwd: string;
  readonly expectedSha?: GitCommitSha;
  readonly releaseId: ReleaseId;
  readonly rendererManifest: RendererManifestEnvelope;
}

type ProductionServices =
  | CommandExecutor.CommandExecutor
  | FileSystem.FileSystem
  | HttpClient.HttpClient
  | Path.Path;

type ProductionCommand = Effect.Effect<
  PublicationReceipt,
  ProductionError,
  ProductionServices
>;

/** Streams no prior heads for the first release and target-owned heads later. */
function publishedMaterialHeads(activeReleaseId: ReleaseId | null) {
  if (activeReleaseId === null) {
    return Stream.empty;
  }
  return streamMaterialHeads(activeReleaseId);
}

/** Prepares one exact-Git material delta against authoritative base heads. */
const prepareGitRelease = Effect.fn("AksaraCli.prepareGitRelease")(function* (
  input: GitPreparationInput
) {
  const checkoutRoot = yield* findAksaraRoot(input.cwd);
  const aksaraSha = yield* readCleanAksaraRevision(checkoutRoot);
  if (input.expectedSha !== undefined) {
    yield* validateRecoveryRevision(input.expectedSha, aksaraSha);
  }
  const material = yield* prepareMaterialPublication({
    checkoutRoot,
    published: publishedMaterialHeads(input.baseReleaseId),
    rendererManifest: input.rendererManifest,
  });
  return yield* prepareContentRelease({
    aksaraSha,
    baseReleaseId: input.baseReleaseId,
    records: material.records,
    releaseId: input.releaseId,
    rendererManifest: input.rendererManifest,
  });
});

/** Emits only non-secret durable evidence after publication completes. */
function logPublicationReceipt(receipt: PublicationReceipt) {
  return Effect.logInfo("Content publication completed.").pipe(
    Effect.annotateLogs({
      activatedHeads: receipt.activatedHeads,
      deletedHeads: receipt.deletedHeads,
      projectionDigest: receipt.projectionDigest,
      releaseId: receipt.releaseId,
      stagedArtifacts: receipt.stagedArtifacts,
      stagedItems: receipt.stagedItems,
      stagedProjections: receipt.stagedProjections,
    }),
    Effect.as(receipt)
  );
}

/** Reads and authenticates the frozen renderer for one pending rebuild. */
function verifyPendingRenderer(
  action: Extract<ProductionStateAction, { readonly kind: "rebuild" }>,
  resolver: typeof ContentVerificationKeyResolver.Service
) {
  return verifyContentReleaseBundle({
    release: action.pending.release,
    rendererManifest: action.pending.rendererManifest,
  }).pipe(
    Effect.provideService(ContentVerificationKeyResolver, resolver),
    Effect.map((bundle) => bundle.rendererManifest),
    Effect.mapError(mapProductionError("state"))
  );
}

/** Runs one fail-closed production release or forward rollback command. */
export const runProductionCommand: (
  input: ProductionInput
) => ProductionCommand = Effect.fn("AksaraCli.runProductionCommand")((input) =>
  Effect.gen(function* () {
    const environment = yield* readProductionEnvironment().pipe(
      Effect.mapError(mapProductionError("environment"))
    );
    const keyResolver = makeTrustedKeyResolver(TRUSTED_CONTENT_KEYS);
    yield* verifySigningKey({
      activeKeyId: ACTIVE_SIGNING_KEY_ID,
      derivedPublicKeyPem: environment.derivedPublicKeyPem,
      keyId: environment.keyId,
    }).pipe(
      Effect.provideService(ContentVerificationKeyResolver, keyResolver),
      Effect.mapError(mapProductionError("keys"))
    );
    const rawTarget = yield* makeHttpPublicationTarget({
      allowInsecureLoopback: false,
      endpoint: environment.publicationEndpoint,
      timeout: PUBLICATION_TIMEOUT,
      token: environment.publicationToken,
    }).pipe(Effect.mapError(mapProductionError("target")));
    const target = retryPublicationTarget(rawTarget);
    const current = yield* target
      .current()
      .pipe(Effect.mapError(mapProductionError("target")));
    const action = yield* selectProductionAction(input.args, current).pipe(
      Effect.mapError(mapProductionError("state"))
    );

    if (action.kind === "resume") {
      const receipt = yield* resumeContentRelease(action.bundle).pipe(
        Effect.provideService(ContentVerificationKeyResolver, keyResolver),
        Effect.provideService(PublicationTarget, target),
        Effect.mapError(mapProductionError("publish"))
      );
      return yield* logPublicationReceipt(receipt);
    }

    let rendererManifest: RendererManifestEnvelope;
    if (action.kind === "rebuild") {
      rendererManifest = yield* verifyPendingRenderer(action, keyResolver);
    } else {
      rendererManifest = yield* fetchProductionRenderer(
        environment.rendererEndpoint,
        environment.rendererToken
      ).pipe(Effect.mapError(mapProductionError("renderer")));
    }
    const signingKey = PublicationSigningKey.of({
      keyId: environment.keyId,
      privateKeyPem: environment.privateKeyPem,
    });

    if (action.mode === "git") {
      const prepared = yield* prepareGitRelease({
        baseReleaseId:
          action.kind === "new"
            ? action.baseReleaseId
            : action.pending.release.manifest.baseReleaseId,
        cwd: input.cwd,
        ...(action.kind === "rebuild" ? { expectedSha: action.sha } : {}),
        releaseId: input.args.releaseId,
        rendererManifest,
      }).pipe(
        Effect.provideService(PublicationTarget, target),
        Effect.mapError(mapProductionError("prepare"))
      );
      if (action.kind === "rebuild") {
        yield* validateRecoveryManifest(
          action.pending.release,
          prepared.manifest
        ).pipe(Effect.mapError(mapProductionError("prepare")));
      }
      const receipt = yield* publishGitRelease(prepared).pipe(
        Effect.provideService(ContentVerificationKeyResolver, keyResolver),
        Effect.provideService(PublicationSigningKey, signingKey),
        Effect.provideService(PublicationTarget, target),
        Effect.provide(GitPublicationSourceLive),
        Effect.mapError(mapProductionError("publish"))
      );
      return yield* logPublicationReceipt(receipt);
    }

    const prepared = yield* prepareRollback({
      releaseId: input.args.releaseId,
      rendererManifest,
      rollbackOf: action.rollbackOf,
    }).pipe(
      Effect.provideService(ContentVerificationKeyResolver, keyResolver),
      Effect.provideService(PublicationTarget, target),
      Effect.mapError(mapProductionError("prepare"))
    );
    if (action.kind === "rebuild") {
      yield* validateRecoveryManifest(
        action.pending.release,
        prepared.manifest
      ).pipe(Effect.mapError(mapProductionError("prepare")));
    }
    const receipt = yield* publishRollbackRelease(prepared).pipe(
      Effect.provideService(ContentVerificationKeyResolver, keyResolver),
      Effect.provideService(PublicationSigningKey, signingKey),
      Effect.provideService(PublicationTarget, target),
      Effect.mapError(mapProductionError("publish"))
    );
    return yield* logPublicationReceipt(receipt);
  }).pipe(Effect.scoped)
);
