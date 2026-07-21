import { createHash } from "node:crypto";
import { Effect, Schema } from "effect";
import { ContentLocaleSchema } from "#contracts/content.js";
import {
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids.js";
import {
  CONTENT_RELEASE_ITEMS_DIGEST_DOMAIN,
  type ContentReleaseItem,
  ContentReleaseItemSchema,
  type ContentReleaseManifest,
  canonicalizeContentReleaseItem,
  compareContentChanges,
} from "#contracts/release/spec.js";

const ItemCountSchema = Schema.Number.pipe(Schema.int(), Schema.nonNegative());

/** One release item failed strict wire decoding. */
export class ReleaseItemDecodeError extends Schema.TaggedError<ReleaseItemDecodeError>()(
  "ReleaseItemDecodeError",
  { itemOffset: ItemCountSchema }
) {}

/** The separate item stream does not have the signed manifest length. */
export class ReleaseItemCountMismatchError extends Schema.TaggedError<ReleaseItemCountMismatchError>()(
  "ReleaseItemCountMismatchError",
  { actualCount: ItemCountSchema, expectedCount: ItemCountSchema }
) {}

/** An item belongs to another release envelope. */
export class ReleaseItemReleaseMismatchError extends Schema.TaggedError<ReleaseItemReleaseMismatchError>()(
  "ReleaseItemReleaseMismatchError",
  { itemOffset: ItemCountSchema, releaseId: ReleaseIdSchema }
) {}

/** An item is missing, duplicated, or out of its signed sequence. */
export class ReleaseItemIndexMismatchError extends Schema.TaggedError<ReleaseItemIndexMismatchError>()(
  "ReleaseItemIndexMismatchError",
  {
    actualIndex: ItemCountSchema,
    expectedIndex: ItemCountSchema,
  }
) {}

/** Item heads are duplicated or not in canonical content-head order. */
export class ReleaseItemOrderError extends Schema.TaggedError<ReleaseItemOrderError>()(
  "ReleaseItemOrderError",
  { itemOffset: ItemCountSchema }
) {}

/** Two heads in one release claim the same locale-specific public route. */
export class DuplicateReleasePublicPathError extends Schema.TaggedError<DuplicateReleasePublicPathError>()(
  "DuplicateReleasePublicPathError",
  {
    duplicateItemIndex: ItemCountSchema,
    firstItemIndex: ItemCountSchema,
    locale: ContentLocaleSchema,
    publicPath: PublicPathSchema,
  }
) {}

/** SHA-256 computation failed before item integrity was established. */
export class ReleaseItemsHashComputationError extends Schema.TaggedError<ReleaseItemsHashComputationError>()(
  "ReleaseItemsHashComputationError",
  { releaseId: ReleaseIdSchema }
) {}

/** The separate ordered items do not match the signed digest. */
export class ReleaseItemsDigestMismatchError extends Schema.TaggedError<ReleaseItemsDigestMismatchError>()(
  "ReleaseItemsDigestMismatchError",
  {
    actualDigest: Sha256HashSchema,
    expectedDigest: Sha256HashSchema,
    releaseId: ReleaseIdSchema,
  }
) {}

/** Counts derived while validating one canonical release-item stream. */
export interface VerifiedContentReleaseItems {
  readonly deleteCount: number;
  readonly items: readonly ContentReleaseItem[];
  readonly upsertCount: number;
}

/** Computes the streaming-friendly domain-separated digest for ordered items. */
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

function validateItemIdentity(
  manifest: ContentReleaseManifest,
  item: ContentReleaseItem,
  expectedIndex: number
) {
  if (item.releaseId !== manifest.releaseId) {
    return Effect.fail(
      new ReleaseItemReleaseMismatchError({
        itemOffset: expectedIndex,
        releaseId: manifest.releaseId,
      })
    );
  }
  if (item.index !== expectedIndex) {
    return Effect.fail(
      new ReleaseItemIndexMismatchError({
        actualIndex: item.index,
        expectedIndex,
      })
    );
  }
  return Effect.void;
}

function validateCanonicalOrder(items: readonly ContentReleaseItem[]) {
  for (let index = 1; index < items.length; index += 1) {
    const previous = items[index - 1];
    const current = items[index];
    if (
      !(previous && current) ||
      compareContentChanges(previous.change, current.change) >= 0
    ) {
      return Effect.fail(new ReleaseItemOrderError({ itemOffset: index }));
    }
  }
  return Effect.void;
}

function validateUniquePublicPaths(items: readonly ContentReleaseItem[]) {
  const firstIndexByRoute = new Map<string, number>();
  for (const item of items) {
    const { locale, publicPath } = item.change;
    if (item.change.operation === "delete" || publicPath === undefined) {
      continue;
    }
    const routeIdentity = `${locale}\0${publicPath}`;
    const firstItemIndex = firstIndexByRoute.get(routeIdentity);
    if (firstItemIndex !== undefined) {
      return Effect.fail(
        new DuplicateReleasePublicPathError({
          duplicateItemIndex: item.index,
          firstItemIndex,
          locale,
          publicPath,
        })
      );
    }
    firstIndexByRoute.set(routeIdentity, item.index);
  }
  return Effect.void;
}

function countOperations(items: readonly ContentReleaseItem[]) {
  let upsertCount = 0;
  for (const item of items) {
    if (item.change.operation === "upsert") {
      upsertCount += 1;
    }
  }
  return { deleteCount: items.length - upsertCount, upsertCount };
}

/** Strictly decodes and authenticates items against one O(1) manifest. */
export const verifyContentReleaseItems = Effect.fn(
  "AksaraContracts.verifyContentReleaseItems"
)(function* (input: {
  readonly items: readonly unknown[];
  readonly manifest: ContentReleaseManifest;
}) {
  if (input.items.length !== input.manifest.itemCount) {
    return yield* new ReleaseItemCountMismatchError({
      actualCount: input.items.length,
      expectedCount: input.manifest.itemCount,
    });
  }

  const items = yield* Effect.forEach(input.items, (source, itemOffset) =>
    Schema.decodeUnknown(ContentReleaseItemSchema)(source, {
      onExcessProperty: "error",
    }).pipe(
      Effect.mapError(() => new ReleaseItemDecodeError({ itemOffset })),
      Effect.tap((item) =>
        validateItemIdentity(input.manifest, item, itemOffset)
      )
    )
  );
  yield* validateCanonicalOrder(items);
  yield* validateUniquePublicPaths(items);
  const actualDigest = yield* Effect.try({
    catch: () =>
      new ReleaseItemsHashComputationError({
        releaseId: input.manifest.releaseId,
      }),
    try: () => hashContentReleaseItems(items),
  });
  if (actualDigest !== input.manifest.itemsDigest) {
    return yield* new ReleaseItemsDigestMismatchError({
      actualDigest,
      expectedDigest: input.manifest.itemsDigest,
      releaseId: input.manifest.releaseId,
    });
  }

  return { items, ...countOperations(items) };
});
