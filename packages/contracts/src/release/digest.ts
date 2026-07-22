import { createHash } from "node:crypto";
import { Effect, Schema, Stream } from "effect";
import {
  type ReleaseId,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import {
  type ContentReleaseItem,
  canonicalizeContentReleaseItem,
} from "#contracts/release/spec";

const CONTENT_RELEASE_ITEMS_DIGEST_DOMAIN =
  "nakafa.aksara.content-release-items.v1";

/** SHA-256 computation failed before item integrity was established. */
export class ReleaseItemsHashComputationError extends Schema.TaggedError<ReleaseItemsHashComputationError>()(
  "ReleaseItemsHashComputationError",
  { releaseId: ReleaseIdSchema }
) {}

/** Keeps Node hash state private while exposing canonical operation counts. */
class ReleaseItemsDigestState {
  readonly #hash = createHash("sha256");
  count = 0;
  deleteCount = 0;
  upsertCount = 0;

  /** Initializes a domain-separated incremental release-item hash. */
  constructor() {
    this.#hash.update(CONTENT_RELEASE_ITEMS_DIGEST_DOMAIN);
    this.#hash.update("\n");
  }

  /** Adds one canonical release item and updates operation counts. */
  update(item: ContentReleaseItem): void {
    this.#hash.update(canonicalizeContentReleaseItem(item));
    this.#hash.update("\n");
    this.count += 1;
    if (item.change.operation === "delete") {
      this.deleteCount += 1;
      return;
    }
    this.upsertCount += 1;
  }

  /** Consumes the hash and returns its branded immutable identity. */
  digest() {
    return Sha256HashSchema.make(`sha256:${this.#hash.digest("hex")}`);
  }
}

/** Creates a fresh domain-separated digest state for one release stream. */
export function createReleaseItemsDigest(releaseId: ReleaseId) {
  return Effect.try({
    catch: () => new ReleaseItemsHashComputationError({ releaseId }),
    try: () => new ReleaseItemsDigestState(),
  });
}

/** Adds one canonical release item to its incremental digest and counts. */
export function updateReleaseItemsDigest(
  releaseId: ReleaseId,
  state: ReleaseItemsDigestState,
  item: ContentReleaseItem
) {
  return Effect.try({
    catch: () => new ReleaseItemsHashComputationError({ releaseId }),
    try: () => {
      state.update(item);
      return state;
    },
  });
}

/** Finalizes one incremental release-item digest with typed hash failures. */
export function finalizeReleaseItemsDigest(
  releaseId: ReleaseId,
  state: ReleaseItemsDigestState
) {
  return Effect.try({
    catch: () => new ReleaseItemsHashComputationError({ releaseId }),
    try: () => state.digest(),
  });
}

/** Digests a release-item stream without retaining its content changes. */
export const digestItems = Effect.fn("AksaraContracts.digestItems")(function* <
  E,
  R,
>(releaseId: ReleaseId, items: Stream.Stream<ContentReleaseItem, E, R>) {
  const initial = yield* createReleaseItemsDigest(releaseId);
  const state = yield* items.pipe(
    Stream.runFoldEffect(initial, (current, item) =>
      updateReleaseItemsDigest(releaseId, current, item)
    )
  );
  const digest = yield* finalizeReleaseItemsDigest(releaseId, state);
  return {
    count: state.count,
    deleteCount: state.deleteCount,
    digest,
    upsertCount: state.upsertCount,
  };
});
