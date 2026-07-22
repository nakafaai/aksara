import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import type { ContentReleaseManifest } from "@nakafa/aksara-contracts/release";
import { hashContentReleaseManifest } from "@nakafa/aksara-contracts/release/hash";
import { verifySignedContentRelease } from "@nakafa/aksara-contracts/release/verify";
import { Effect, Schema } from "effect";
import type {
  PreparedGitRelease,
  PreparedRollbackRelease,
} from "#publisher/preparation/spec";

/** A rebuilt prepared manifest differs from its exact stored pending envelope. */
export class PreparedStoredReleaseMismatchError extends Schema.TaggedError<PreparedStoredReleaseMismatchError>()(
  "PreparedStoredReleaseMismatchError",
  {
    actualHash: Sha256HashSchema,
    expectedHash: Sha256HashSchema,
    releaseId: ReleaseIdSchema,
  }
) {}

type ReuseStoredReleaseError =
  | Effect.Effect.Error<ReturnType<typeof hashContentReleaseManifest>>
  | Effect.Effect.Error<ReturnType<typeof verifySignedContentRelease>>
  | PreparedStoredReleaseMismatchError;

type ReuseStoredReleaseContext = Effect.Effect.Context<
  ReturnType<typeof verifySignedContentRelease>
>;

/** Authenticates one stored envelope and binds it to a rebuilt manifest hash. */
const verifyStoredRelease = Effect.fn("AksaraPublisher.verifyStoredRelease")(
  function* (manifest: ContentReleaseManifest, source: unknown) {
    const storedRelease = yield* verifySignedContentRelease(source);
    const actualHash = yield* hashContentReleaseManifest(manifest);
    if (actualHash !== storedRelease.manifestHash) {
      return yield* new PreparedStoredReleaseMismatchError({
        actualHash,
        expectedHash: storedRelease.manifestHash,
        releaseId: storedRelease.manifest.releaseId,
      });
    }
    return storedRelease;
  }
);

/** Reuses one exact pending envelope for a deterministic Git rebuild. */
export const reuseStoredGitRelease: <E, R>(input: {
  readonly prepared: PreparedGitRelease<E, R>;
  readonly storedRelease: unknown;
}) => Effect.Effect<
  PreparedGitRelease<E, R>,
  ReuseStoredReleaseError,
  ReuseStoredReleaseContext
> = Effect.fn("AksaraPublisher.reuseStoredGitRelease")(function* <E, R>(input: {
  readonly prepared: PreparedGitRelease<E, R>;
  readonly storedRelease: unknown;
}) {
  const storedRelease = yield* verifyStoredRelease(
    input.prepared.manifest,
    input.storedRelease
  );
  return { ...input.prepared, storedRelease };
});

/** Reuses one exact pending envelope for a deterministic rollback rebuild. */
export const reuseStoredRollbackRelease: <E, R>(input: {
  readonly prepared: PreparedRollbackRelease<E, R>;
  readonly storedRelease: unknown;
}) => Effect.Effect<
  PreparedRollbackRelease<E, R>,
  ReuseStoredReleaseError,
  ReuseStoredReleaseContext
> = Effect.fn("AksaraPublisher.reuseStoredRollbackRelease")(function* <
  E,
  R,
>(input: {
  readonly prepared: PreparedRollbackRelease<E, R>;
  readonly storedRelease: unknown;
}) {
  const storedRelease = yield* verifyStoredRelease(
    input.prepared.manifest,
    input.storedRelease
  );
  return { ...input.prepared, storedRelease };
});
