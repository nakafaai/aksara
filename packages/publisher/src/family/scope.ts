import {
  type ContentFamily,
  type ContentHeadIdentity,
  headIdentity,
} from "@nakafa/aksara-contracts/content";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import type { ContentHead } from "@nakafa/aksara-contracts/release/head";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Effect, Schema, Stream, Tuple } from "effect";
import { mergeSortedCatalogStreams } from "#publisher/catalog/merge";

/** One requested content identity is absent from both source and active state. */
export class PublicationScopeIdentityError extends Schema.TaggedError<PublicationScopeIdentityError>()(
  "PublicationScopeIdentityError",
  {
    artifactLocale: ArtifactLocaleSchema,
    contentKey: ContentKeySchema,
    family: Schema.Literals(["article", "material", "question"]),
  }
) {}

/** One family diff row annotated with its exact scope ownership. */
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

/** Selects the exact keys owned by one family from a signed scope. */
function selectedFamilyKeys(
  scope: PublicationScope | undefined,
  family: ContentFamily
) {
  if (scope === undefined || scope.families.includes(family)) {
    return;
  }
  return new Map(
    scope.content
      .filter((identity) => identity.family === family)
      .map((identity) => [headIdentity(identity), identity])
  );
}

/** Fails after the merge when a selected identity has no known source or head. */
function validateKnownIdentities(
  selected: NonNullable<ReturnType<typeof selectedFamilyKeys>>,
  known: ReadonlySet<string>
) {
  return Effect.forEach(
    selected,
    ([key, identity]) =>
      known.has(key)
        ? Effect.void
        : Effect.fail(new PublicationScopeIdentityError(identity)),
    { discard: true }
  );
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
  /** Selects the exact artifactLocale-specific identity owned by one registry entry. */
  readonly identity: (entry: Entry) => ContentHeadIdentity;
  readonly published: Stream.Stream<Head, E, R>;
  readonly scope?: PublicationScope | undefined;
}) {
  return Stream.unwrap(
    Effect.sync(() => {
      const selected = selectedFamilyKeys(input.scope, input.family);
      const known = new Set<string>();
      /** Marks exact selected identities while projecting merge keys. */
      const markKnown = (identity: ContentHeadIdentity) => {
        const key = headIdentity(identity);
        if (selected?.has(key)) {
          known.add(key);
        }
        return key;
      };
      const current = Stream.fromIterable(input.entries).pipe(
        Stream.map((entry) =>
          Tuple.make(markKnown(input.identity(entry)), entry)
        )
      );
      const prior = input.published.pipe(
        Stream.map((head) => Tuple.make(markKnown(head), head))
      );
      const merged = mergeSortedCatalogStreams(current, {
        onBoth: (entry, head): ScopedFamilyDiff<Entry, Head> => ({
          entry,
          head,
          kind: "matched",
          scoped: selected?.has(headIdentity(head)) ?? true,
        }),
        onLeft: (entry): ScopedFamilyDiff<Entry, Head> => ({
          entry,
          kind: "current",
          scoped: true,
        }),
        onRight: (head): ScopedFamilyDiff<Entry, Head> => ({
          head,
          kind: "published",
          scoped: selected?.has(headIdentity(head)) ?? true,
        }),
        right: prior,
      }).pipe(
        Stream.filter(
          (diff) =>
            diff.kind !== "current" ||
            selected === undefined ||
            selected.has(headIdentity(input.identity(diff.entry)))
        )
      );
      if (selected === undefined) {
        return merged;
      }
      return merged.pipe(
        Stream.concat(
          Stream.fromEffectDrain(validateKnownIdentities(selected, known))
        )
      );
    })
  );
}
