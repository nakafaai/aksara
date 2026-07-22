import { createHash } from "node:crypto";
import { Effect, Schema, Stream } from "effect";
import {
  type ReleaseId,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import {
  canonicalizeRollbackSnapshotEntry,
  type RollbackSnapshotEntry,
} from "#contracts/release/rollback";
import type { ContentReleaseManifest } from "#contracts/release/spec";

const ROLLBACK_SNAPSHOT_DIGEST_DOMAIN = "nakafa.aksara.rollback-snapshot.v1";

/** SHA-256 computation failed before rollback-state integrity was established. */
export class RollbackSnapshotHashError extends Schema.TaggedError<RollbackSnapshotHashError>()(
  "RollbackSnapshotHashError",
  { releaseId: ReleaseIdSchema }
) {}

/** A replayed rollback snapshot has a different signed entry count. */
export class RollbackSnapshotCountMismatchError extends Schema.TaggedError<RollbackSnapshotCountMismatchError>()(
  "RollbackSnapshotCountMismatchError",
  {
    actualCount: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    expectedCount: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    releaseId: ReleaseIdSchema,
  }
) {}

/** A replayed rollback snapshot does not match its signed digest. */
export class RollbackSnapshotDigestMismatchError extends Schema.TaggedError<RollbackSnapshotDigestMismatchError>()(
  "RollbackSnapshotDigestMismatchError",
  {
    actualDigest: Sha256HashSchema,
    expectedDigest: Sha256HashSchema,
    releaseId: ReleaseIdSchema,
  }
) {}

/** Keeps mutable Node hash state private behind the incremental digest seam. */
class RollbackSnapshotDigestState {
  readonly #hash = createHash("sha256");
  count = 0;

  /** Initializes one domain-separated rollback snapshot hash. */
  constructor() {
    this.#hash.update(ROLLBACK_SNAPSHOT_DIGEST_DOMAIN);
    this.#hash.update("\n");
  }

  /** Adds one canonical prior state to the snapshot digest. */
  update(entry: RollbackSnapshotEntry): void {
    this.#hash.update(canonicalizeRollbackSnapshotEntry(entry));
    this.#hash.update("\n");
    this.count += 1;
  }

  /** Consumes the hash and returns its branded immutable identity. */
  digest() {
    return Sha256HashSchema.make(`sha256:${this.#hash.digest("hex")}`);
  }
}

/** Creates a fresh domain-separated digest state for one rollback snapshot. */
export function createRollbackSnapshotDigest(releaseId: ReleaseId) {
  return Effect.try({
    catch: () => new RollbackSnapshotHashError({ releaseId }),
    try: () => new RollbackSnapshotDigestState(),
  });
}

/** Adds one canonical prior state to an incremental rollback digest. */
export function updateRollbackSnapshotDigest(
  releaseId: ReleaseId,
  state: RollbackSnapshotDigestState,
  entry: RollbackSnapshotEntry
) {
  return Effect.try({
    catch: () => new RollbackSnapshotHashError({ releaseId }),
    try: () => {
      state.update(entry);
      return state;
    },
  });
}

/** Finalizes one rollback snapshot digest with a typed hash failure. */
export function finalizeRollbackSnapshotDigest(
  releaseId: ReleaseId,
  state: RollbackSnapshotDigestState
) {
  return Effect.try({
    catch: () => new RollbackSnapshotHashError({ releaseId }),
    try: () => state.digest(),
  });
}

/** Digests one rollback snapshot stream without retaining prior state bodies. */
export const digestRollbackSnapshot = Effect.fn(
  "AksaraContracts.digestRollbackSnapshot"
)(function* <E, R>(
  releaseId: ReleaseId,
  entries: Stream.Stream<RollbackSnapshotEntry, E, R>
) {
  const initial = yield* createRollbackSnapshotDigest(releaseId);
  const state = yield* entries.pipe(
    Stream.runFoldEffect(initial, (current, entry) =>
      updateRollbackSnapshotDigest(releaseId, current, entry)
    )
  );
  const digest = yield* finalizeRollbackSnapshotDigest(releaseId, state);
  return { count: state.count, digest };
});

/** Authenticates a replayed prior-state stream against its signed release. */
export const verifyRollbackSnapshot = Effect.fn(
  "AksaraContracts.verifyRollbackSnapshot"
)(function* <E, R>(input: {
  readonly entries: Stream.Stream<RollbackSnapshotEntry, E, R>;
  readonly manifest: ContentReleaseManifest;
}) {
  const summary = yield* digestRollbackSnapshot(
    input.manifest.releaseId,
    input.entries
  );
  if (summary.count !== input.manifest.rollbackCount) {
    return yield* new RollbackSnapshotCountMismatchError({
      actualCount: summary.count,
      expectedCount: input.manifest.rollbackCount,
      releaseId: input.manifest.releaseId,
    });
  }
  if (summary.digest !== input.manifest.rollbackDigest) {
    return yield* new RollbackSnapshotDigestMismatchError({
      actualDigest: summary.digest,
      expectedDigest: input.manifest.rollbackDigest,
      releaseId: input.manifest.releaseId,
    });
  }
  return summary;
});
