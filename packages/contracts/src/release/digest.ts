import { createHash } from "node:crypto";
import { Effect, Schema } from "effect";
import {
  type ReleaseId,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import {
  CONTENT_RELEASE_ITEMS_DIGEST_DOMAIN,
  type ContentReleaseItem,
  canonicalizeContentReleaseItem,
} from "#contracts/release/spec";

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

/** Computes the domain-separated digest for an already materialized iterable. */
export function hashContentReleaseItems(items: Iterable<ContentReleaseItem>) {
  const hash = createHash("sha256");
  hash.update(CONTENT_RELEASE_ITEMS_DIGEST_DOMAIN);
  hash.update("\n");
  for (const item of items) {
    hash.update(canonicalizeContentReleaseItem(item));
    hash.update("\n");
  }
  return Sha256HashSchema.make(`sha256:${hash.digest("hex")}`);
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
