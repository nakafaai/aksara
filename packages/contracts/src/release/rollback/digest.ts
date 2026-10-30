import { Effect, Schema, Stream } from "effect";
import { DigestStream } from "#contracts/hash/stream";
import {
  ReleaseCountMismatchFields,
  ReleaseDigestMismatchFields,
} from "#contracts/release/mismatch";
import {
  canonicalizeRollbackSnapshotEntry,
  type RollbackSnapshotEntry,
} from "#contracts/release/rollback/spec";
import type { ContentReleaseManifest } from "#contracts/release/spec";

const ROLLBACK_SNAPSHOT_DIGEST_DOMAIN = "nakafa.aksara.rollback-snapshot";

/** A replayed rollback snapshot has a different signed entry count. */
export class RollbackSnapshotCountMismatchError extends Schema.TaggedError<
  RollbackSnapshotCountMismatchError,
  { readonly brand: unique symbol }
>()("RollbackSnapshotCountMismatchError", { ...ReleaseCountMismatchFields }) {}

/** A replayed rollback snapshot does not match its signed digest. */
export class RollbackSnapshotDigestMismatchError extends Schema.TaggedError<
  RollbackSnapshotDigestMismatchError,
  { readonly brand: unique symbol }
>()("RollbackSnapshotDigestMismatchError", {
  ...ReleaseDigestMismatchFields,
}) {}

/** Keeps the digest stream private behind the incremental digest seam. */
class RollbackSnapshotDigestState {
  readonly #stream = new DigestStream();
  count = 0;

  /** Starts one domain-separated rollback snapshot digest. */
  constructor() {
    this.#stream.add(ROLLBACK_SNAPSHOT_DIGEST_DOMAIN);
    this.#stream.add("\n");
  }

  /** Adds one canonical prior state to the snapshot digest. */
  update(entry: RollbackSnapshotEntry): void {
    this.#stream.add(canonicalizeRollbackSnapshotEntry(entry));
    this.#stream.add("\n");
    this.count += 1;
  }

  /** Digests the complete stream once and returns its branded immutable identity. */
  digest() {
    return this.#stream.digest();
  }
}

/** Creates a fresh domain-separated digest state for one rollback snapshot. */
export const createRollbackSnapshotDigest = Effect.sync(
  () => new RollbackSnapshotDigestState()
);

/** Adds one canonical prior state to an incremental rollback digest. */
export function updateRollbackSnapshotDigest(
  state: RollbackSnapshotDigestState,
  entry: RollbackSnapshotEntry
) {
  return Effect.sync(() => {
    state.update(entry);
    return state;
  });
}

/** Finalizes one rollback snapshot digest. */
export function finalizeRollbackSnapshotDigest(
  state: RollbackSnapshotDigestState
) {
  return state.digest();
}

/** Digests one rollback snapshot stream. Its canonical bytes are held until one digest runs. */
export const digestRollbackSnapshot = Effect.fn(
  "AksaraContracts.digestRollbackSnapshot"
)(function* <E, R>(entries: Stream.Stream<RollbackSnapshotEntry, E, R>) {
  const initial = yield* createRollbackSnapshotDigest;
  const state = yield* entries.pipe(
    Stream.runFoldEffect(
      () => initial,
      (current, entry) => updateRollbackSnapshotDigest(current, entry)
    )
  );
  const digest = yield* finalizeRollbackSnapshotDigest(state);
  return { count: state.count, digest };
});

/** Authenticates a replayed prior-state stream against its signed release. */
export const verifyRollbackSnapshot = Effect.fn(
  "AksaraContracts.verifyRollbackSnapshot"
)(function* <E, R>(input: {
  readonly entries: Stream.Stream<RollbackSnapshotEntry, E, R>;
  readonly manifest: ContentReleaseManifest;
}) {
  const summary = yield* digestRollbackSnapshot(input.entries);
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
