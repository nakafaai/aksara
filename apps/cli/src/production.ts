import type {
  CommandExecutor,
  FileSystem,
  HttpClient,
  Path,
} from "@effect/platform";
import type { PublicationReceipt } from "@nakafa/aksara-contracts/release";
import { verifyContentReleaseBundle } from "@nakafa/aksara-contracts/release/verify";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import {
  ACTIVE_SIGNING_KEY_ID,
  makeTrustedKeyResolver,
  TRUSTED_CONTENT_KEYS,
} from "@nakafa/aksara-contracts/signature/trusted";
import { GitPublicationSourceLive } from "@nakafa/aksara-publisher/git/source";
import {
  publishGitRelease,
  publishRollbackRelease,
} from "@nakafa/aksara-publisher/publication";
import {
  PublicationActivation,
  PublicationRecoveryId,
  PublicationSigningKey,
  PublicationTarget,
} from "@nakafa/aksara-publisher/publication/spec";
import { resumeContentRelease } from "@nakafa/aksara-publisher/resume";
import { makeHttpPublicationTarget } from "@nakafa/aksara-publisher/target/http";
import { Effect } from "effect";
import { makeProductionActivation } from "#cli/activation";
import type { ReleaseArguments, RollbackArguments } from "#cli/args";
import { readProductionEnvironment, readRecoveryEnvironment } from "#cli/env";
import { mapProductionError, type ProductionError } from "#cli/failure";
import { verifySigningKey } from "#cli/keys";
import {
  prepareProductionGit,
  prepareProductionRollback,
} from "#cli/production/preparation";
import { fetchProductionRenderer } from "#cli/production-renderer";
import { retryPublicationTarget } from "#cli/retry";
import { type ProductionStateAction, selectProductionAction } from "#cli/state";

const PUBLICATION_TIMEOUT = "30 seconds";

/** Explicit decoded command input for the production publication boundary. */
export interface ProductionInput {
  readonly args: ReleaseArguments | RollbackArguments;
  readonly cwd: string;
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
type PreparedGit = Effect.Effect.Success<
  ReturnType<typeof prepareProductionGit>
>;
type PreparedRollback = Effect.Effect.Success<
  ReturnType<typeof prepareProductionRollback>
>;

/** Emits only non-secret durable evidence after publication completes. */
function logPublicationReceipt(receipt: PublicationReceipt) {
  return Effect.logInfo("Content publication completed.").pipe(
    Effect.annotateLogs({
      activatedHeads: receipt.activatedHeads,
      deletedHeads: receipt.deletedHeads,
      manifestHash: receipt.manifestHash,
      projectionDigest: receipt.projectionDigest,
      releaseId: receipt.releaseId,
      resultCount: receipt.resultCount,
      resultDigest: receipt.resultDigest,
      stagedArtifacts: receipt.stagedArtifacts,
      stagedItems: receipt.stagedItems,
      stagedProjections: receipt.stagedProjections,
    }),
    Effect.as(receipt)
  );
}

/** Authenticates the exact signed release and frozen renderer for rebuilding. */
function verifyPendingBundle(
  action: Extract<ProductionStateAction, { readonly kind: "rebuild" }>,
  resolver: typeof ContentVerificationKeyResolver.Service
) {
  return verifyContentReleaseBundle({
    release: action.candidate.release,
    rendererManifest: action.candidate.rendererManifest,
  }).pipe(
    Effect.provideService(ContentVerificationKeyResolver, resolver),
    Effect.mapError(mapProductionError("state"))
  );
}

/** Runs one fail-closed production release or forward rollback command. */
export const runProductionCommand: (
  input: ProductionInput
) => ProductionCommand = Effect.fn("AksaraCli.runProductionCommand")((input) =>
  Effect.gen(function* () {
    const recoveryEnvironment = yield* readRecoveryEnvironment().pipe(
      Effect.mapError(mapProductionError("environment"))
    );
    const keyResolver = makeTrustedKeyResolver(TRUSTED_CONTENT_KEYS);
    const rawTarget = yield* makeHttpPublicationTarget({
      allowInsecureLoopback: false,
      endpoint: recoveryEnvironment.publicationEndpoint,
      timeout: PUBLICATION_TIMEOUT,
      token: recoveryEnvironment.publicationToken,
    }).pipe(Effect.mapError(mapProductionError("target")));
    const target = retryPublicationTarget(rawTarget);
    const activation = yield* makeProductionActivation({
      endpoint: recoveryEnvironment.rendererEndpoint,
      token: recoveryEnvironment.rendererToken,
    });
    const current = yield* target
      .current()
      .pipe(Effect.mapError(mapProductionError("target")));
    const action = yield* selectProductionAction(input.args, current).pipe(
      Effect.mapError(mapProductionError("state"))
    );

    if (action.kind === "resume") {
      const receipt = yield* resumeContentRelease(action.bundle).pipe(
        Effect.provideService(PublicationActivation, activation),
        Effect.provideService(ContentVerificationKeyResolver, keyResolver),
        Effect.provideService(PublicationTarget, target),
        Effect.mapError(mapProductionError("publish"))
      );
      return yield* logPublicationReceipt(receipt);
    }

    const environment = yield* readProductionEnvironment(
      recoveryEnvironment
    ).pipe(Effect.mapError(mapProductionError("environment")));
    yield* verifySigningKey({
      activeKeyId: ACTIVE_SIGNING_KEY_ID,
      derivedPublicKeyPem: environment.derivedPublicKeyPem,
      keyId: environment.keyId,
    }).pipe(
      Effect.provideService(ContentVerificationKeyResolver, keyResolver),
      Effect.mapError(mapProductionError("keys"))
    );
    const signingKey = PublicationSigningKey.of({
      keyId: environment.keyId,
      privateKeyPem: environment.privateKeyPem,
    });

    if (action.mode === "git") {
      let publishable: PreparedGit;
      if (action.kind === "new") {
        const rendererManifest = yield* fetchProductionRenderer(
          environment.rendererEndpoint,
          environment.rendererToken
        ).pipe(Effect.mapError(mapProductionError("renderer")));
        publishable = yield* prepareProductionGit({
          baseBundle: action.baseBundle,
          cwd: input.cwd,
          kind: "new",
          releaseId: input.args.releaseId,
          rendererManifest,
        }).pipe(
          Effect.provideService(ContentVerificationKeyResolver, keyResolver),
          Effect.provideService(PublicationTarget, target)
        );
      } else {
        const bundle = yield* verifyPendingBundle(action, keyResolver);
        publishable = yield* prepareProductionGit({
          bundle,
          cwd: input.cwd,
          kind: "rebuild",
          releaseId: input.args.releaseId,
          sha: action.sha,
        }).pipe(
          Effect.provideService(ContentVerificationKeyResolver, keyResolver),
          Effect.provideService(PublicationTarget, target)
        );
      }
      const receipt = yield* publishGitRelease(publishable).pipe(
        Effect.provideService(PublicationActivation, activation),
        Effect.provideService(PublicationRecoveryId, input.args.recoveryId),
        Effect.provideService(ContentVerificationKeyResolver, keyResolver),
        Effect.provideService(PublicationSigningKey, signingKey),
        Effect.provideService(PublicationTarget, target),
        Effect.provide(GitPublicationSourceLive),
        Effect.mapError(mapProductionError("publish"))
      );
      return yield* logPublicationReceipt(receipt);
    }

    let publishable: PreparedRollback;
    if (action.kind === "new") {
      const rendererManifest = yield* fetchProductionRenderer(
        environment.rendererEndpoint,
        environment.rendererToken
      ).pipe(Effect.mapError(mapProductionError("renderer")));
      publishable = yield* prepareProductionRollback({
        kind: "new",
        releaseId: input.args.releaseId,
        rendererManifest,
        rollbackOf: action.rollbackOf,
        sourceBundle: action.sourceBundle,
      }).pipe(
        Effect.provideService(ContentVerificationKeyResolver, keyResolver),
        Effect.provideService(PublicationTarget, target)
      );
    } else {
      const bundle = yield* verifyPendingBundle(action, keyResolver);
      publishable = yield* prepareProductionRollback({
        bundle,
        kind: "rebuild",
        releaseId: input.args.releaseId,
        rollbackOf: action.rollbackOf,
      }).pipe(
        Effect.provideService(ContentVerificationKeyResolver, keyResolver),
        Effect.provideService(PublicationTarget, target)
      );
    }
    const receipt = yield* publishRollbackRelease(publishable).pipe(
      Effect.provideService(PublicationActivation, activation),
      Effect.provideService(PublicationRecoveryId, input.args.recoveryId),
      Effect.provideService(ContentVerificationKeyResolver, keyResolver),
      Effect.provideService(PublicationSigningKey, signingKey),
      Effect.provideService(PublicationTarget, target),
      Effect.mapError(mapProductionError("publish"))
    );
    return yield* logPublicationReceipt(receipt);
  }).pipe(Effect.scoped)
);
