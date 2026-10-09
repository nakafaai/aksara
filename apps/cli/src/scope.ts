import {
  type ContentFamily,
  ContentFamilySchema,
} from "@nakafa/aksara-contracts/content";
import {
  type ContentSnapshotKind,
  ContentSnapshotKindSchema,
  type PublicationScope,
  PublicationScopeSchema,
} from "@nakafa/aksara-contracts/release/snapshot/scope";
import {
  Effect,
  Array as EffectArray,
  MutableList,
  Option,
  Order,
  Schema,
} from "effect";

/** One CLI selector does not form a canonical production publication scope. */
export class ProductionScopeDecodeError extends Schema.TaggedError<ProductionScopeDecodeError>()(
  "ProductionScopeDecodeError",
  {}
) {}

const DecodedSelectorSchema = Schema.Struct({
  kind: Schema.Literals(["family", "snapshot"]),
  value: Schema.String,
});
type DecodedSelector = typeof DecodedSelectorSchema.Type;

/** Converts one selector into an untrusted structured scope member. */
function decodeSelector(value: string): Option.Option<DecodedSelector> {
  const segments = value.split(":");
  if (segments.length !== 2) {
    return Option.none();
  }
  const kind = Option.getOrThrow(EffectArray.head(segments));
  const selection = Option.getOrThrow(EffectArray.get(segments, 1));
  if (kind === "snapshot" || kind === "family") {
    return Option.some({ kind, value: selection });
  }
  return Option.none();
}

/** Canonical ordering for one validated family selection. */
const familyOrder: Order.Order<ContentFamily> = Order.mapInput(
  Order.Number,
  (family: ContentFamily) =>
    Option.getOrThrow(
      EffectArray.findFirstIndex(
        ContentFamilySchema.literals,
        (literal) => literal === family
      )
    )
);

/** Canonical ordering for one validated snapshot selection. */
const snapshotOrder: Order.Order<ContentSnapshotKind> = Order.mapInput(
  Order.Number,
  (snapshot: ContentSnapshotKind) =>
    Option.getOrThrow(
      EffectArray.findFirstIndex(
        ContentSnapshotKindSchema.literals,
        (literal) => literal === snapshot
      )
    )
);

/** Decodes raw family selections, then orders the typed values canonically. */
const decodeOrderedFamilies = (
  values: readonly string[]
): Effect.Effect<readonly ContentFamily[], ProductionScopeDecodeError> =>
  Effect.forEach(values, (value) =>
    Schema.decodeUnknownEffect(ContentFamilySchema)(value)
  ).pipe(
    Effect.mapError(() => new ProductionScopeDecodeError()),
    Effect.map((decoded) => EffectArray.sort(decoded, familyOrder))
  );

/** Decodes raw snapshot selections, then orders the typed values canonically. */
const decodeOrderedSnapshots = (
  values: readonly string[]
): Effect.Effect<readonly ContentSnapshotKind[], ProductionScopeDecodeError> =>
  Effect.forEach(values, (value) =>
    Schema.decodeUnknownEffect(ContentSnapshotKindSchema)(value)
  ).pipe(
    Effect.mapError(() => new ProductionScopeDecodeError()),
    Effect.map((decoded) => EffectArray.sort(decoded, snapshotOrder))
  );

/**
 * Strictly decodes repeated CLI selectors into one schema-derived scope.
 *
 * Selector order is canonicalized because a publication scope is a set;
 * duplicates, unknowns, and empty collections are still rejected.
 */
export const decodePublicationScopeSelectors = Effect.fn(
  "AksaraCli.decodePublicationScopeSelectors"
)(function* (selectors: readonly string[]) {
  const families = MutableList.make<string>();
  const snapshots = MutableList.make<string>();
  for (const value of selectors) {
    const selected = decodeSelector(value);
    if (Option.isNone(selected)) {
      return yield* new ProductionScopeDecodeError();
    }
    if (selected.value.kind === "family") {
      MutableList.append(families, selected.value.value);
      continue;
    }
    MutableList.append(snapshots, selected.value.value);
  }
  const orderedFamilies = yield* decodeOrderedFamilies(
    MutableList.toArray(families)
  );
  const orderedSnapshots = yield* decodeOrderedSnapshots(
    MutableList.toArray(snapshots)
  );
  return yield* Schema.decodeEffect(PublicationScopeSchema)({
    families: orderedFamilies,
    snapshots: orderedSnapshots,
  }).pipe(
    Effect.mapError(() => new ProductionScopeDecodeError()),
    Effect.map((scope): PublicationScope => scope)
  );
});
