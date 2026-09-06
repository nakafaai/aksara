import type { PublicationReceipt } from "@nakafa/aksara-contracts/release";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { makeTrustedKeyResolver } from "@nakafa/aksara-contracts/signature/trusted";
import { prepareAcceptanceRelease } from "@nakafa/aksara-publisher/acceptance/preparation";
import { makeGitPublicationSourceLive } from "@nakafa/aksara-publisher/git/source";
import { publishGitRelease } from "@nakafa/aksara-publisher/publication";
import {
  PublicationActivation,
  PublicationActivationError,
  PublicationRecoveryId,
  PublicationSigningKey,
  PublicationTarget,
} from "@nakafa/aksara-publisher/publication/spec";
import { makeHttpPublicationTarget } from "@nakafa/aksara-publisher/target/http";
import type { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Effect, FileSystem, type Path, Stream } from "effect";
import type { HttpClient } from "effect/unstable/http";
import {
  AcceptanceEnvironmentError,
  readAcceptanceRenderer,
  readAcceptanceSettings,
} from "#cli/acceptance/settings";
import {
  readCleanAksaraRevision,
  validateStableAksaraRevision,
} from "#cli/evidence";
import { mapProductionError, type ProductionError } from "#cli/failure";
import { PUBLICATION_TARGET_TIMEOUT, retryPublicationTarget } from "#cli/retry";

/** Publishes the fixed acceptance corpus only into a new loopback deployment. */
export const publishAcceptance: () => Effect.Effect<
  PublicationReceipt,
  ProductionError,
  ExactProcess | FileSystem.FileSystem | Path.Path | HttpClient.HttpClient
> = Effect.fn("AksaraCli.publishAcceptance")(
  function* () {
    const fs = yield* FileSystem.FileSystem;
    const settings = yield* readAcceptanceSettings();
    const aksaraSha = yield* readCleanAksaraRevision(settings.checkoutRoot);
    if (aksaraSha !== settings.revision) {
      return yield* new AcceptanceEnvironmentError({ reason: "revision" });
    }
    const rendererManifest = yield* readAcceptanceRenderer(
      settings.rendererPath
    );
    const rawTarget = yield* makeHttpPublicationTarget({
      allowInsecureLoopback: true,
      endpoint: settings.endpoint,
      timeout: PUBLICATION_TARGET_TIMEOUT,
      token: settings.token,
    });
    const target = retryPublicationTarget(rawTarget);
    const current = yield* target.current;
    if (current.active !== null || current.candidate !== null) {
      return yield* new AcceptanceEnvironmentError({ reason: "target" });
    }
    const prepared = yield* prepareAcceptanceRelease({
      aksaraSha,
      checkoutRoot: settings.checkoutRoot,
      releaseId: settings.releaseId,
      rendererManifest,
    });
    yield* validateStableAksaraRevision(
      aksaraSha,
      yield* readCleanAksaraRevision(settings.checkoutRoot)
    );
    const activation = PublicationActivation.of({
      // A newly seeded acceptance target has no app caches. The subsequent production
      // build and browser suite execute the renderer before this candidate can merge.
      invalidate: (input) => Stream.runDrain(input.cacheChanges),
      /** Rechecks the exported renderer before this local target can activate. */
      verify: Effect.fn("AksaraCli.verifyAcceptanceRenderer")(
        function* (bundle) {
          const currentRenderer = yield* readAcceptanceRenderer(
            settings.rendererPath
          ).pipe(
            Effect.mapError(
              () =>
                new PublicationActivationError({
                  phase: "preflight",
                  releaseId: settings.releaseId,
                })
            )
          );
          if (currentRenderer.hash !== bundle.rendererManifest.hash) {
            return yield* new PublicationActivationError({
              phase: "preflight",
              releaseId: settings.releaseId,
            });
          }
        },
        Effect.provideService(FileSystem.FileSystem, fs)
      ),
    });
    const receipt = yield* publishGitRelease(prepared).pipe(
      Effect.provide(makeGitPublicationSourceLive(settings.checkoutRoot)),
      Effect.provideService(
        ContentVerificationKeyResolver,
        makeTrustedKeyResolver([settings.key])
      ),
      Effect.provideService(PublicationSigningKey, {
        keyId: settings.key.keyId,
        privateKeyPem: settings.privateKeyPem,
      }),
      Effect.provideService(PublicationRecoveryId, settings.recoveryId),
      Effect.provideService(PublicationActivation, activation),
      Effect.provideService(PublicationTarget, target)
    );
    yield* Effect.logInfo("Isolated acceptance publication activated.").pipe(
      Effect.annotateLogs({
        aksaraSha,
        manifestHash: receipt.manifestHash,
        releaseId: receipt.releaseId,
        resultCount: receipt.resultCount,
      })
    );
    return receipt;
  },
  Effect.scoped,
  Effect.mapError(mapProductionError("publish"))
);
