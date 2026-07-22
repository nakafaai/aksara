import { Effect, Schema, Stream } from "effect";
import {
  ContentLocaleSchema,
  compareContentHeads,
  routeIdentity,
} from "#contracts/content";
import {
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import { digestItems } from "#contracts/release/digest";
import {
  type ContentReleaseItem,
  ContentReleaseItemSchema,
  type ContentReleaseManifest,
} from "#contracts/release/spec";

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
  { actualIndex: ItemCountSchema, expectedIndex: ItemCountSchema }
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

/** The separate ordered items do not match the signed digest. */
export class ReleaseItemsDigestMismatchError extends Schema.TaggedError<ReleaseItemsDigestMismatchError>()(
  "ReleaseItemsDigestMismatchError",
  {
    actualDigest: Sha256HashSchema,
    expectedDigest: Sha256HashSchema,
    releaseId: ReleaseIdSchema,
  }
) {}

/** Counts derived without retaining a complete release-item collection. */
export interface VerifiedContentReleaseItems {
  readonly deleteCount: number;
  readonly upsertCount: number;
}

interface ItemValidationState {
  readonly firstIndexByRoute: Map<string, number>;
  previous: ContentReleaseItem | undefined;
}

/** Verifies one item's signed release identity and sequence position. */
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

/** Rejects a head that is duplicated or outside canonical head order. */
function validateItemOrder(
  state: ItemValidationState,
  item: ContentReleaseItem
) {
  if (
    state.previous &&
    compareContentHeads(state.previous.change, item.change) >= 0
  ) {
    return Effect.fail(new ReleaseItemOrderError({ itemOffset: item.index }));
  }
  state.previous = item;
  return Effect.void;
}

/** Rejects an upsert that collides with an earlier locale-specific route. */
function validatePublicPath(
  state: ItemValidationState,
  item: ContentReleaseItem
) {
  if (item.change.operation === "delete") {
    return Effect.void;
  }
  const { locale, publicPath } = item.change;
  if (publicPath === undefined) {
    return Effect.void;
  }
  const identity = routeIdentity({ locale, publicPath });
  const firstItemIndex = state.firstIndexByRoute.get(identity);
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
  state.firstIndexByRoute.set(identity, item.index);
  return Effect.void;
}

/** Decodes one item and applies stateful canonical stream invariants. */
function decodeItem(
  manifest: ContentReleaseManifest,
  state: ItemValidationState,
  source: unknown,
  itemOffset: number
) {
  return Schema.decodeUnknown(ContentReleaseItemSchema)(source, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(() => new ReleaseItemDecodeError({ itemOffset })),
    Effect.tap((item) => validateItemIdentity(manifest, item, itemOffset)),
    Effect.tap((item) => validateItemOrder(state, item)),
    Effect.tap((item) => validatePublicPath(state, item))
  );
}

/**
 * Strictly decodes a replayable item stream without retaining its bodies.
 * Every evaluation owns fresh ordering and route-collision state.
 */
export function decodeContentReleaseItems<E, R>(input: {
  readonly items: Stream.Stream<unknown, E, R>;
  readonly manifest: ContentReleaseManifest;
}) {
  return Stream.unwrap(
    Effect.sync(() => {
      const state: ItemValidationState = {
        firstIndexByRoute: new Map(),
        previous: undefined,
      };
      return input.items.pipe(
        Stream.zipWithIndex,
        Stream.mapEffect(([source, itemOffset]) =>
          decodeItem(input.manifest, state, source, itemOffset)
        )
      );
    })
  );
}

/** Authenticates a replayable ordered stream against its signed manifest. */
export const verifyContentReleaseItems = Effect.fn(
  "AksaraContracts.verifyContentReleaseItems"
)(function* <E, R>(input: {
  readonly items: Stream.Stream<unknown, E, R>;
  readonly manifest: ContentReleaseManifest;
}) {
  const summary = yield* digestItems(
    input.manifest.releaseId,
    decodeContentReleaseItems(input)
  );
  if (summary.count !== input.manifest.itemCount) {
    return yield* new ReleaseItemCountMismatchError({
      actualCount: summary.count,
      expectedCount: input.manifest.itemCount,
    });
  }
  if (summary.digest !== input.manifest.itemsDigest) {
    return yield* new ReleaseItemsDigestMismatchError({
      actualDigest: summary.digest,
      expectedDigest: input.manifest.itemsDigest,
      releaseId: input.manifest.releaseId,
    });
  }
  return {
    deleteCount: summary.deleteCount,
    upsertCount: summary.upsertCount,
  };
});
