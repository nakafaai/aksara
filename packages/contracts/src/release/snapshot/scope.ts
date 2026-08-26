import { Effect, Schema } from "effect";

import {
  type ContentFamily,
  ContentFamilySchema,
  compareContentHeads,
} from "#contracts/content";
import { ContentKeySchema } from "#contracts/ids";
import { ArtifactLocaleSchema } from "#contracts/locale";
import { compareCodeUnits } from "#contracts/text/order";

/** Fixed structured families selected by the one global release pointer. */
export const ContentSnapshotKindSchema = Schema.Literals([
  "program",
  "quran",
  "tryout",
]);
export type ContentSnapshotKind = typeof ContentSnapshotKindSchema.Type;

/** Authenticates exact content selection retained by predecessor releases. */
export const PredecessorContentPublicationIdentitySchema = Schema.Struct({
  artifactLocale: ArtifactLocaleSchema,
  contentKey: ContentKeySchema,
  family: ContentFamilySchema,
});
export type PredecessorContentPublicationIdentity =
  typeof PredecessorContentPublicationIdentitySchema.Type;

/** Orders predecessor scope identities exactly as their signed release did. */
function comparePredecessorPublicationIdentities(
  left: PredecessorContentPublicationIdentity,
  right: PredecessorContentPublicationIdentity
) {
  const familyOrder = compareCodeUnits(left.family, right.family);
  return familyOrder || compareContentHeads(left, right);
}

/** Accepts only canonical predecessor identities outside selected families. */
function hasCanonicalPredecessorContent(
  content: readonly PredecessorContentPublicationIdentity[],
  families: readonly ContentFamily[]
) {
  const ordered = content.every((identity, index) => {
    const previous = content[index - 1];
    return (
      previous === undefined ||
      comparePredecessorPublicationIdentities(previous, identity) < 0
    );
  });
  return ordered && content.every(({ family }) => !families.includes(family));
}

/** Checks strict canonical ordering for selected content and snapshot families. */
function hasCanonicalPublicationScope(input: {
  readonly content?:
    | readonly PredecessorContentPublicationIdentity[]
    | undefined;
  readonly families: readonly ContentFamily[];
  readonly snapshots: readonly ContentSnapshotKind[];
}) {
  const content = input.content ?? [];
  const contentIsCanonical = hasCanonicalPredecessorContent(
    content,
    input.families
  );
  const snapshotsAreCanonical = input.snapshots.every((family, index) => {
    const previous = input.snapshots[index - 1];
    return (
      previous === undefined ||
      ContentSnapshotKindSchema.literals.indexOf(previous) <
        ContentSnapshotKindSchema.literals.indexOf(family)
    );
  });
  const familiesAreCanonical = input.families.every((family, index) => {
    const previous = input.families[index - 1];
    return (
      previous === undefined ||
      ContentFamilySchema.literals.indexOf(previous) <
        ContentFamilySchema.literals.indexOf(family)
    );
  });
  return (
    contentIsCanonical &&
    familiesAreCanonical &&
    snapshotsAreCanonical &&
    content.length + input.families.length + input.snapshots.length > 0
  );
}

const PublicationScopeFields = {
  content: Schema.optional(
    Schema.Array(PredecessorContentPublicationIdentitySchema)
  ),
  families: Schema.Array(ContentFamilySchema),
  snapshots: Schema.Array(ContentSnapshotKindSchema),
};

/** Content and structured families authenticated from any signed release. */
export const PublicationScopeSchema = Schema.Struct(
  PublicationScopeFields
).pipe(
  Schema.check(
    Schema.makeFilter(hasCanonicalPublicationScope, {
      message:
        "Expected a non-empty publication scope in canonical unique order.",
    })
  )
);
export type PublicationScope = typeof PublicationScopeSchema.Type;

/** Whole-family scope accepted when preparing a new Git release. */
export const GitPublicationScopeSchema = Schema.Struct({
  families: PublicationScopeFields.families,
  snapshots: PublicationScopeFields.snapshots,
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCanonicalPublicationScope, {
      message:
        "Expected a non-empty Git publication scope in canonical unique order.",
    })
  )
);
export type GitPublicationScope = typeof GitPublicationScopeSchema.Type;

/** New Git release preparation received predecessor-only exact selection. */
export class GitPublicationScopeError extends Schema.TaggedError<GitPublicationScopeError>()(
  "GitPublicationScopeError",
  {}
) {}

/** Rejects predecessor-only fields before any new release work begins. */
export const verifyGitPublicationScope = Effect.fn(
  "AksaraContracts.verifyGitPublicationScope"
)((scope: PublicationScope) =>
  Schema.decodeEffect(GitPublicationScopeSchema)(scope, {
    onExcessProperty: "error",
  }).pipe(Effect.mapError(() => new GitPublicationScopeError()))
);

/** Checks whether one body transition is authorized by the signed scope. */
export function publicationScopeSelectsContent(
  scope: PublicationScope,
  identity: PredecessorContentPublicationIdentity
) {
  return (
    scope.families.includes(identity.family) ||
    scope.content?.some(
      (selected) =>
        selected.artifactLocale === identity.artifactLocale &&
        selected.contentKey === identity.contentKey &&
        selected.family === identity.family
    ) === true
  );
}

/** Checks whether one structured family may be replaced by this release. */
export function publicationScopeSelectsSnapshot(
  scope: PublicationScope,
  family: ContentSnapshotKind
) {
  return scope.snapshots.includes(family);
}

/** Serializes one publication scope with stable signed field order. */
export function canonicalizePublicationScope(scope: PublicationScope) {
  return {
    ...(scope.content === undefined
      ? {}
      : {
          content: scope.content.map(
            ({ artifactLocale, contentKey, family }) => ({
              artifactLocale,
              contentKey,
              family,
            })
          ),
        }),
    families: [...scope.families],
    snapshots: [...scope.snapshots],
  };
}
