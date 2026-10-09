import { Array as Arr, Schema } from "effect";

import { type ContentFamily, ContentFamilySchema } from "#contracts/content";

/** Fixed structured families selected by the one global release pointer. */
export const ContentSnapshotKindSchema = Schema.Literals([
  "program",
  "quran",
  "tryout",
]);
export type ContentSnapshotKind = typeof ContentSnapshotKindSchema.Type;

/** Checks that a list names each literal once, in the schema's canonical order. */
function hasCanonicalLiteralOrder<A extends string>(
  literals: readonly A[],
  values: readonly A[]
) {
  const canonical = Arr.filter(literals, (literal) =>
    Arr.contains(values, literal)
  );
  return (
    canonical.length === values.length &&
    Arr.every(values, (value, index) => value === canonical[index])
  );
}

/** Checks strict canonical ordering for selected content and snapshot families. */
function hasCanonicalPublicationScope(input: {
  readonly families: readonly ContentFamily[];
  readonly snapshots: readonly ContentSnapshotKind[];
}) {
  return (
    hasCanonicalLiteralOrder(ContentFamilySchema.literals, input.families) &&
    hasCanonicalLiteralOrder(
      ContentSnapshotKindSchema.literals,
      input.snapshots
    ) &&
    input.families.length + input.snapshots.length > 0
  );
}

/** Whole content and structured families authenticated by one signed release. */
export const PublicationScopeSchema = Schema.Struct({
  families: Schema.Array(ContentFamilySchema),
  snapshots: Schema.Array(ContentSnapshotKindSchema),
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCanonicalPublicationScope, {
      message:
        "Expected a non-empty publication scope in canonical unique order.",
    })
  )
);
export type PublicationScope = typeof PublicationScopeSchema.Type;

/** Serializes one publication scope with stable signed field order. */
export function canonicalizePublicationScope(scope: PublicationScope) {
  return {
    families: [...scope.families],
    snapshots: [...scope.snapshots],
  };
}
