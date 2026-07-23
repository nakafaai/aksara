import type { PublicationReceipt } from "@nakafa/aksara-contracts/release";
import { verifyRollbackContentReleaseBundle } from "@nakafa/aksara-contracts/release/verify";
import type { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import {
  PublicationActivation,
  PublicationTarget,
} from "#publisher/publication/spec";
import { validateManifestReceipt } from "#publisher/release-validation";
import {
  type RetainedRecoveryInput,
  selectRetainedRecovery,
} from "#publisher/retention";

type RecoverContentRelease = (
  input: RetainedRecoveryInput
) => Effect.Effect<
  PublicationReceipt,
  | Effect.Effect.Error<ReturnType<typeof verifyRollbackContentReleaseBundle>>
  | Effect.Effect.Error<ReturnType<typeof validateManifestReceipt>>
  | Effect.Effect.Error<ReturnType<typeof selectRetainedRecovery>>
  | Effect.Effect.Error<
      ReturnType<(typeof PublicationActivation.Service)["verify"]>
    >
  | Effect.Effect.Error<
      ReturnType<(typeof PublicationTarget.Service)["current"]>
    >
  | Effect.Effect.Error<
      ReturnType<(typeof PublicationTarget.Service)["activateRecovery"]>
    >,
  ContentVerificationKeyResolver | PublicationActivation | PublicationTarget
>;

/** Atomically activates the verified inverse retained for one active release. */
export const recoverContentRelease: RecoverContentRelease = Effect.fn(
  "AksaraPublisher.recoverContentRelease"
)(function* (input) {
  const target = yield* PublicationTarget;
  const lookup = yield* target.recovery(input);
  if (lookup.kind === "completed") {
    const completed = lookup.value;
    const bundle = yield* verifyRollbackContentReleaseBundle({
      release: completed.release,
      rendererManifest: completed.rendererManifest,
    });
    return yield* validateManifestReceipt(bundle.release, completed.receipt);
  }
  const current = yield* target.current();
  const retained = yield* selectRetainedRecovery(current, input, false);
  const bundle = yield* verifyRollbackContentReleaseBundle({
    release: retained.release,
    rendererManifest: retained.rendererManifest,
  });
  const activation = yield* PublicationActivation;
  yield* activation.verify(bundle.release);
  const receipt = yield* target.activateRecovery(bundle.release);
  return yield* validateManifestReceipt(bundle.release, receipt);
});
