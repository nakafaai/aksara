import {
  Array as Arr,
  Effect,
  MutableRef,
  Option,
  Schema,
  Stream,
} from "effect";
import { compareContentHeads } from "#contracts/content";
import { ReleaseIdSchema } from "#contracts/ids";
import { digestItems } from "#contracts/release/digest";
import { ReleaseDigestMismatchFields } from "#contracts/release/mismatch";
import {
  type ContentReleaseItem,
  ContentReleaseItemSchema,
  type ContentReleaseManifest,
} from "#contracts/release/spec";

const ItemCountSchema = Schema.Finite.pipe(
  Schema.check(Schema.isInt()),
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);

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

/** Upsert and delete totals do not match the counts signed by the manifest. */
export class ReleaseItemOperationCountMismatchError extends Schema.TaggedError<ReleaseItemOperationCountMismatchError>()(
  "ReleaseItemOperationCountMismatchError",
  {
    actualDeletes: ItemCountSchema,
    actualUpserts: ItemCountSchema,
    expectedDeletes: ItemCountSchema,
    expectedUpserts: ItemCountSchema,
  }
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

/** One signed item falls outside the release's exact publication scope. */
export class ReleaseItemScopeError extends Schema.TaggedError<ReleaseItemScopeError>()(
  "ReleaseItemScopeError",
  { itemOffset: ItemCountSchema }
) {}

/** The separate ordered items do not match the signed digest. */
export class ReleaseItemsDigestMismatchError extends Schema.TaggedError<ReleaseItemsDigestMismatchError>()(
  "ReleaseItemsDigestMismatchError",
  { ...ReleaseDigestMismatchFields }
) {}

const VerifiedContentReleaseItemsSchema = Schema.Struct({
  deleteCount: Schema.Finite,
  upsertCount: Schema.Finite,
});

/** Counts derived without retaining a complete release-item collection. */
export type VerifiedContentReleaseItems =
  typeof VerifiedContentReleaseItemsSchema.Type;

/** The last accepted item of one stream of release items, read to check the next one. */
type PreviousItem = MutableRef.MutableRef<Option.Option<ContentReleaseItem>>;

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
  if (!Arr.contains(manifest.scope.families, item.change.family)) {
    return Effect.fail(
      new ReleaseItemScopeError({ itemOffset: expectedIndex })
    );
  }
  return Effect.void;
}

/** Rejects a head that is duplicated or outside canonical head order. */
function validateItemOrder(previous: PreviousItem, item: ContentReleaseItem) {
  const last = MutableRef.get(previous);
  if (
    Option.isSome(last) &&
    compareContentHeads(last.value.change, item.change) >= 0
  ) {
    return Effect.fail(new ReleaseItemOrderError({ itemOffset: item.index }));
  }
  MutableRef.set(previous, Option.some(item));
  return Effect.void;
}

/** Decodes one item and applies stateful canonical stream invariants. */
const decodeItem = Effect.fn("AksaraContracts.decodeReleaseItem")(function* (
  manifest: ContentReleaseManifest,
  previous: PreviousItem,
  source: unknown,
  itemOffset: number
) {
  const item = yield* Schema.decodeUnknownEffect(ContentReleaseItemSchema)(
    source,
    { onExcessProperty: "error" }
  ).pipe(Effect.mapError(() => new ReleaseItemDecodeError({ itemOffset })));
  yield* validateItemIdentity(manifest, item, itemOffset);
  yield* validateItemOrder(previous, item);
  return item;
});

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
      const previous = MutableRef.make(Option.none<ContentReleaseItem>());
      return input.items.pipe(
        Stream.zipWithIndex,
        Stream.mapEffect(([source, itemOffset]) =>
          decodeItem(input.manifest, previous, source, itemOffset)
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
  if (summary.deleteCount !== input.manifest.deleteCount) {
    return yield* new ReleaseItemOperationCountMismatchError({
      actualDeletes: summary.deleteCount,
      actualUpserts: summary.upsertCount,
      expectedDeletes: input.manifest.deleteCount,
      expectedUpserts: input.manifest.upsertCount,
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
