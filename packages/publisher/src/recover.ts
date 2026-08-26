import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import type { PublicationReceipt } from "@nakafa/aksara-contracts/release";
import { verifyRollbackContentReleaseBundle } from "@nakafa/aksara-contracts/release/verify";
import type { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Schema } from "effect";
import { allContentCacheChanges } from "#publisher/cache";
import {
  PublicationActivation,
  PublicationTarget,
} from "#publisher/publication/spec";
import { validateManifestReceipt } from "#publisher/release-validation";
import {
  type RetainedRecoveryInput,
  selectRetainedRecovery,
} from "#publisher/retention";

/** A legacy retained inverse has no permanent runtime pair to restore safely. */
export class RecoveryRuntimeMissingError extends Schema.TaggedError<RecoveryRuntimeMissingError>()(
  "RecoveryRuntimeMissingError",
  { recoveryId: ReleaseIdSchema }
) {}

type RecoverContentRelease = (
  input: RetainedRecoveryInput
) => Effect.Effect<
  PublicationReceipt,
  | Effect.Error<ReturnType<typeof verifyRollbackContentReleaseBundle>>
  | Effect.Error<ReturnType<typeof validateManifestReceipt>>
  | Effect.Error<ReturnType<typeof selectRetainedRecovery>>
  | RecoveryRuntimeMissingError
  | Effect.Error<ReturnType<(typeof PublicationActivation.Service)["verify"]>>
  | Effect.Error<
      ReturnType<(typeof PublicationActivation.Service)["invalidate"]>
    >
  | Effect.Error<(typeof PublicationTarget.Service)["current"]>
  | Effect.Error<
      ReturnType<(typeof PublicationTarget.Service)["activateRecovery"]>
    >,
  ContentVerificationKeyResolver | PublicationActivation | PublicationTarget
>;

/** Atomically activates the verified inverse retained for one active release. */
export const recoverContentRelease: RecoverContentRelease = Effect.fn(
  "AksaraPublisher.recoverContentRelease"
)(function* (input) {
  const target = yield* PublicationTarget;
  const activation = yield* PublicationActivation;
  const lookup = yield* target.recovery(input);
  if (lookup.kind === "completed") {
    const completed = lookup.value;
    const bundle = yield* verifyRollbackContentReleaseBundle({
      release: completed.release,
      rendererManifest: completed.rendererManifest,
    });
    const receipt = yield* validateManifestReceipt(
      bundle.release,
      completed.receipt
    );
    yield* activation.invalidate({
      cacheChanges: allContentCacheChanges,
      release: bundle.release,
    });
    return receipt;
  }
  const current = yield* target.current;
  const retained = yield* selectRetainedRecovery(current, input, false);
  if (
    retained.release.manifest.snapshots.tryout.resultSnapshotId !== null &&
    current.tryoutRuntimeBundle === null
  ) {
    return yield* new RecoveryRuntimeMissingError({
      recoveryId: retained.release.manifest.releaseId,
    });
  }
  const bundle = yield* verifyRollbackContentReleaseBundle({
    release: retained.release,
    rendererManifest: retained.rendererManifest,
  });
  yield* activation.verify(bundle.release);
  const receipt = yield* target.activateRecovery(bundle.release);
  const verified = yield* validateManifestReceipt(bundle.release, receipt);
  yield* activation.invalidate({
    cacheChanges: allContentCacheChanges,
    release: bundle.release,
  });
  return verified;
});
