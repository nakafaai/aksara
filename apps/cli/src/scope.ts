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
import { Effect, Array as EffectArray, Option, Order, Schema } from "effect";

/** One CLI selector does not form a canonical production publication scope. */
export class ProductionScopeDecodeError extends Schema.TaggedError<ProductionScopeDecodeError>()(
  "ProductionScopeDecodeError",
  {}
) {}

interface DecodedSelector {
  readonly kind: "family" | "snapshot";
  readonly value: string;
}

/** Converts one selector into an untrusted structured scope member. */
function decodeSelector(value: string): Option.Option<DecodedSelector> {
  const segments = value.split(":");
  const kind = segments.at(0);
  const selection = segments.at(1);
  if (selection === undefined || segments.length !== 2) {
    return Option.none();
  }
  if (kind === "snapshot" || kind === "family") {
    return Option.some({ kind, value: selection });
  }
  return Option.none();
}

/** Canonical ordering for one validated family selection. */
const familyOrder: Order.Order<ContentFamily> = Order.mapInput(
  Order.Number,
  (family: ContentFamily) => ContentFamilySchema.literals.indexOf(family)
);

/** Canonical ordering for one validated snapshot selection. */
const snapshotOrder: Order.Order<ContentSnapshotKind> = Order.mapInput(
  Order.Number,
  (snapshot: ContentSnapshotKind) =>
    ContentSnapshotKindSchema.literals.indexOf(snapshot)
);

/** Decodes raw family selections, then orders the typed values canonically. */
const decodeOrderedFamilies = (
  values: readonly string[]
): Effect.Effect<readonly ContentFamily[], ProductionScopeDecodeError> =>
  Effect.forEach(values, (value) =>
    Schema.decodeEffect(ContentFamilySchema)(value)
  ).pipe(
    Effect.mapError(() => new ProductionScopeDecodeError()),
    Effect.map((decoded) => EffectArray.sort(decoded, familyOrder))
  );

/** Decodes raw snapshot selections, then orders the typed values canonically. */
const decodeOrderedSnapshots = (
  values: readonly string[]
): Effect.Effect<readonly ContentSnapshotKind[], ProductionScopeDecodeError> =>
  Effect.forEach(values, (value) =>
    Schema.decodeEffect(ContentSnapshotKindSchema)(value)
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
  const families: string[] = [];
  const snapshots: string[] = [];
  for (const value of selectors) {
    const selected = decodeSelector(value);
    if (Option.isNone(selected)) {
      return yield* new ProductionScopeDecodeError();
    }
    if (selected.value.kind === "family") {
      families.push(selected.value.value);
      continue;
    }
    snapshots.push(selected.value.value);
  }
  const orderedFamilies = yield* decodeOrderedFamilies(families);
  const orderedSnapshots = yield* decodeOrderedSnapshots(snapshots);
  return yield* Schema.decodeUnknownEffect(PublicationScopeSchema)({
    families: orderedFamilies,
    snapshots: orderedSnapshots,
  }).pipe(
    Effect.mapError(() => new ProductionScopeDecodeError()),
    Effect.map((scope): PublicationScope => scope)
  );
});
