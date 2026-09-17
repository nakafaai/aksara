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
import { Effect, Option, Schema } from "effect";

/** One CLI selector does not form a canonical production publication scope. */
export class ProductionScopeDecodeError extends Schema.TaggedError<ProductionScopeDecodeError>()(
  "ProductionScopeDecodeError",
  {}
) {}

interface DecodedSelector {
  readonly kind: "family" | "snapshot";
  readonly value: unknown;
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

/** Ranks one raw family selection by its canonical literals position. */
function familyRank(value: unknown): number {
  return ContentFamilySchema.literals.indexOf(value as ContentFamily);
}

/** Ranks one raw snapshot selection by its canonical literals position. */
function snapshotRank(value: unknown): number {
  return ContentSnapshotKindSchema.literals.indexOf(
    value as ContentSnapshotKind
  );
}

/** Orders raw selections canonically without hiding duplicates or unknowns. */
function canonicalizeSelections(
  values: readonly unknown[],
  rank: (value: unknown) => number
): unknown[] {
  return [...values].sort((left, right) => rank(left) - rank(right));
}

/**
 * Strictly decodes repeated CLI selectors into one schema-derived scope.
 *
 * Selector order is canonicalized because a publication scope is a set;
 * duplicates, unknowns, and empty collections are still rejected.
 */
export const decodePublicationScopeSelectors = Effect.fn(
  "AksaraCli.decodePublicationScopeSelectors"
)((selectors: readonly string[]) => {
  const families: unknown[] = [];
  const snapshots: unknown[] = [];
  for (const value of selectors) {
    const selected = decodeSelector(value);
    if (Option.isNone(selected)) {
      return Effect.fail(new ProductionScopeDecodeError());
    }
    const selection = selected.value;
    if (selection.kind === "family") {
      families.push(selection.value);
      continue;
    }
    snapshots.push(selection.value);
  }
  return Schema.decodeUnknownEffect(PublicationScopeSchema)({
    families: canonicalizeSelections(families, familyRank),
    snapshots: canonicalizeSelections(snapshots, snapshotRank),
  }).pipe(
    Effect.mapError(() => new ProductionScopeDecodeError()),
    Effect.map((scope): PublicationScope => scope)
  );
});
