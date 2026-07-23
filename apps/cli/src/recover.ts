import type { HttpClient } from "@effect/platform";
import type { PublicationReceipt } from "@nakafa/aksara-contracts/release";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import {
  makeTrustedKeyResolver,
  TRUSTED_CONTENT_KEYS,
} from "@nakafa/aksara-contracts/signature/trusted";
import {
  PublicationActivation,
  PublicationTarget,
} from "@nakafa/aksara-publisher/publication/spec";
import { recoverContentRelease } from "@nakafa/aksara-publisher/recover";
import { makeHttpPublicationTarget } from "@nakafa/aksara-publisher/target/http";
import { Effect } from "effect";
import { makeProductionActivation } from "#cli/activation";
import type { RecoverArguments } from "#cli/args";
import { readRecoveryEnvironment } from "#cli/env";
import { mapProductionError, type ProductionError } from "#cli/failure";
import { retryPublicationTarget } from "#cli/retry";

const RECOVERY_TIMEOUT = "30 seconds";

type RecoverCommand = Effect.Effect<
  PublicationReceipt,
  ProductionError,
  HttpClient.HttpClient
>;

/** Activates one retained inverse after a fresh deployed-renderer preflight. */
export const runRecoverCommand: (args: RecoverArguments) => RecoverCommand =
  Effect.fn("AksaraCli.runRecoverCommand")((args) =>
    Effect.gen(function* () {
      const environment = yield* readRecoveryEnvironment().pipe(
        Effect.mapError(mapProductionError("environment"))
      );
      const rawTarget = yield* makeHttpPublicationTarget({
        allowInsecureLoopback: false,
        endpoint: environment.publicationEndpoint,
        timeout: RECOVERY_TIMEOUT,
        token: environment.publicationToken,
      }).pipe(Effect.mapError(mapProductionError("target")));
      const target = retryPublicationTarget(rawTarget);
      const activation = yield* makeProductionActivation({
        endpoint: environment.rendererEndpoint,
        token: environment.rendererToken,
      });
      const receipt = yield* recoverContentRelease({
        recoveryId: args.recoveryId,
        releaseId: args.releaseId,
      }).pipe(
        Effect.provideService(
          ContentVerificationKeyResolver,
          makeTrustedKeyResolver(TRUSTED_CONTENT_KEYS)
        ),
        Effect.provideService(PublicationActivation, activation),
        Effect.provideService(PublicationTarget, target),
        Effect.mapError(mapProductionError("recover"))
      );
      return yield* Effect.logInfo("Content recovery activated.").pipe(
        Effect.annotateLogs({
          manifestHash: receipt.manifestHash,
          recoveryId: receipt.releaseId,
          resultDigest: receipt.resultDigest,
        }),
        Effect.as(receipt)
      );
    })
  );
