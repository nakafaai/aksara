import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import type { ContentReleaseItem } from "@nakafa/aksara-contracts/release";
import { DEVELOPER_PAGE_KEY } from "@nakafa/aksara-corpus/pages/source";
import type {
  ReuseStoredReleaseContext,
  ReuseStoredReleaseError,
} from "@nakafa/aksara-publisher/preparation/recovery";
import { reuseStoredRollbackRelease } from "@nakafa/aksara-publisher/preparation/recovery";
import { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import {
  type RetainedRecoveryInput,
  RetainedRecoveryStateError,
  selectRetainedRecovery,
} from "@nakafa/aksara-publisher/retention";
import {
  type PrepareRollbackContext,
  type PrepareRollbackError,
  prepareRollback,
} from "@nakafa/aksara-publisher/rollback";
import type { PublicationTargetFailure } from "@nakafa/aksara-publisher/target/errors";
import { Effect, Stream } from "effect";
import { verifyPublishedDeveloperSurface } from "#cli/developer-readiness/verify";

const DEVELOPER_CONTENT_KEY = ContentKeySchema.make(
  `pages/${DEVELOPER_PAGE_KEY}`
);

/** Detects whether one authenticated publication upserts developer MDX. */
export const activatesDeveloperPage = Effect.fn(
  "AksaraCli.activatesDeveloperPage"
)(function* <E, R>(items: Stream.Stream<ContentReleaseItem, E, R>) {
  return yield* items.pipe(
    Stream.runFold(
      () => false,
      (activates, { change }) =>
        activates ||
        (change.operation === "upsert" &&
          change.contentKey === DEVELOPER_CONTENT_KEY)
    )
  );
});

/** Gates an authenticated developer-page upsert on its live dependencies. */
export const verifyDeveloperPublication = Effect.fn(
  "AksaraCli.verifyDeveloperPublication"
)(function* <E, R>(items: Stream.Stream<ContentReleaseItem, E, R>) {
  if (yield* activatesDeveloperPage(items)) {
    yield* verifyPublishedDeveloperSurface();
  }
});

/** Rebuilds the retained inverse and gates its exact authenticated items. */
type VerifyDeveloperRecovery = (
  input: RetainedRecoveryInput
) => Effect.Effect<
  void,
  | Effect.Error<ReturnType<typeof verifyPublishedDeveloperSurface>>
  | PrepareRollbackError
  | PublicationTargetFailure
  | RetainedRecoveryStateError
  | ReuseStoredReleaseError,
  | Effect.Services<ReturnType<typeof verifyPublishedDeveloperSurface>>
  | PrepareRollbackContext
  | PublicationTarget
  | ReuseStoredReleaseContext
>;

export const verifyDeveloperRecovery: VerifyDeveloperRecovery = Effect.fn(
  "AksaraCli.verifyDeveloperRecovery"
)(function* (input) {
  const target = yield* PublicationTarget;
  const lookup = yield* target.recovery(input);
  if (lookup.kind === "completed") {
    return;
  }
  const current = yield* target.current;
  const { active } = current;
  if (active === null) {
    return yield* new RetainedRecoveryStateError({
      reason: "active",
      releaseId: input.releaseId,
    });
  }
  const retained = yield* selectRetainedRecovery(current, input, false);
  const prepared = yield* prepareRollback({
    proofBundle: {
      release: active.release,
      rendererManifest: active.rendererManifest,
    },
    releaseId: retained.release.manifest.releaseId,
    rendererManifest: retained.rendererManifest,
    rollbackOf: active.release.manifest.releaseId,
  });
  const exact = yield* reuseStoredRollbackRelease({
    prepared,
    storedRelease: retained.release,
  });
  yield* verifyDeveloperPublication(exact.items);
});
