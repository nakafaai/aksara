import { Effect, Schema, Stream } from "effect";
import { DigestStream } from "#contracts/hash/stream";
import { type ReleaseId, ReleaseIdSchema } from "#contracts/ids";
import { canonicalizeContentReleaseItem } from "#contracts/release/canonical";
import type { ContentReleaseItem } from "#contracts/release/spec";

const CONTENT_RELEASE_ITEMS_DIGEST_DOMAIN =
  "nakafa.aksara.content-release-items";

/** SHA-256 computation failed before item integrity was established. */
export class ReleaseItemsHashComputationError extends Schema.TaggedError<ReleaseItemsHashComputationError>()(
  "ReleaseItemsHashComputationError",
  { releaseId: ReleaseIdSchema }
) {}

/** Keeps the digest stream private while exposing canonical operation counts. */
class ReleaseItemsDigestState {
  readonly #stream = new DigestStream();
  count = 0;
  deleteCount = 0;
  upsertCount = 0;

  /** Starts one domain-separated release-item digest. */
  constructor() {
    this.#stream.add(CONTENT_RELEASE_ITEMS_DIGEST_DOMAIN);
    this.#stream.add("\n");
  }

  /** Adds one canonical release item and updates operation counts. */
  update(item: ContentReleaseItem): void {
    this.#stream.add(canonicalizeContentReleaseItem(item));
    this.#stream.add("\n");
    this.count += 1;
    if (item.change.operation === "delete") {
      this.deleteCount += 1;
      return;
    }
    this.upsertCount += 1;
  }

  /** Digests the complete stream once and returns its branded identity. */
  digest() {
    return this.#stream.digest();
  }
}

/** Creates a fresh domain-separated digest state for one release stream. */
export const createReleaseItemsDigest = Effect.sync(
  () => new ReleaseItemsDigestState()
);

/** Adds one canonical release item to its incremental digest and counts. */
export function updateReleaseItemsDigest(
  state: ReleaseItemsDigestState,
  item: ContentReleaseItem
) {
  return Effect.sync(() => {
    state.update(item);
    return state;
  });
}

/** Finalizes one incremental release-item digest with typed hash failures. */
export function finalizeReleaseItemsDigest(
  releaseId: ReleaseId,
  state: ReleaseItemsDigestState
) {
  return state
    .digest()
    .pipe(
      Effect.mapError(() => new ReleaseItemsHashComputationError({ releaseId }))
    );
}

/** Digests a release-item stream. Its canonical bytes are held until one Web Crypto digest runs. */
export const digestItems = Effect.fn("AksaraContracts.digestItems")(function* <
  E,
  R,
>(releaseId: ReleaseId, items: Stream.Stream<ContentReleaseItem, E, R>) {
  const initial = yield* createReleaseItemsDigest;
  const state = yield* items.pipe(
    Stream.runFoldEffect(
      () => initial,
      (current, item) => updateReleaseItemsDigest(current, item)
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
