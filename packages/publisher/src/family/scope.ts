import {
  type ContentFamily,
  type ContentHeadIdentity,
  headIdentity,
} from "@nakafa/aksara-contracts/content";
import type { ContentHead } from "@nakafa/aksara-contracts/release/head";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Stream, Tuple } from "effect";
import { mergeSortedCatalogStreams } from "#publisher/catalog/merge";

/** One family diff row annotated with whole-family scope ownership. */
export type ScopedFamilyDiff<Entry, Head> =
  | { readonly entry: Entry; readonly kind: "current"; readonly scoped: true }
  | {
      readonly entry: Entry;
      readonly head: Head;
      readonly kind: "matched";
      readonly scoped: boolean;
    }
  | {
      readonly head: Head;
      readonly kind: "published";
      readonly scoped: boolean;
    };

/** Checks whether one complete content family belongs to the signed scope. */
function selectsFamily(
  scope: PublicationScope | undefined,
  family: ContentFamily
) {
  return scope === undefined || scope.families.includes(family);
}

/** Builds one constant-space merge that preserves every unselected base head. */
export function diffScopedFamilyHeads<
  Entry,
  Head extends ContentHead,
  E,
  R,
>(input: {
  readonly entries: readonly Entry[];
  readonly family: ContentFamily;
  /** Selects the artifactLocale-specific identity owned by one registry entry. */
  readonly identity: (entry: Entry) => ContentHeadIdentity;
  readonly published: Stream.Stream<Head, E, R>;
  readonly scope?: PublicationScope | undefined;
}) {
  const selected = selectsFamily(input.scope, input.family);
  const current = Stream.fromIterable(input.entries).pipe(
    Stream.map((entry) =>
      Tuple.make(headIdentity(input.identity(entry)), entry)
    )
  );
  const prior = input.published.pipe(
    Stream.map((head) => Tuple.make(headIdentity(head), head))
  );
  return mergeSortedCatalogStreams(current, {
    onBoth: (entry, head): ScopedFamilyDiff<Entry, Head> => ({
      entry,
      head,
      kind: "matched",
      scoped: selected,
    }),
    onLeft: (entry): ScopedFamilyDiff<Entry, Head> => ({
      entry,
      kind: "current",
      scoped: true,
    }),
    onRight: (head): ScopedFamilyDiff<Entry, Head> => ({
      head,
      kind: "published",
      scoped: selected,
    }),
    right: prior,
  }).pipe(Stream.filter((diff) => diff.kind !== "current" || selected));
}
