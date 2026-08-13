import { Effect, Schema } from "effect";
import { ContentFamilySchema } from "#contracts/content";
import { Sha256HashSchema } from "#contracts/ids";
import { ActiveAppLocaleListSchema } from "#contracts/locale";
import type { ContentSnapshotManifest } from "#contracts/release/snapshot/data";
import {
  ContentSnapshotKindSchema,
  type PublicationScope,
} from "#contracts/release/snapshot/spec";

const ClosureFieldSchema = Schema.Literal(
  "activeAppLocales",
  "editorialReviewDigest",
  "manifest",
  "scope"
);

/** Locale and editorial identity shared by one release and its snapshots. */
export const ReleasePolicySchema = Schema.Struct({
  activeAppLocales: ActiveAppLocaleListSchema,
  editorialReviewDigest: Sha256HashSchema,
});
export type ReleasePolicy = typeof ReleasePolicySchema.Type;

/** One structured scope does not close over the current release policy. */
export class ReleasePolicyClosureError extends Schema.TaggedError<ReleasePolicyClosureError>()(
  "ReleasePolicyClosureError",
  {
    actual: Schema.String,
    expected: Schema.String,
    family: Schema.Union(ContentSnapshotKindSchema, ContentFamilySchema),
    field: ClosureFieldSchema,
  }
) {}

/** Compares locale lists without exchanging their branded element roles. */
function hasSameLocaleCodes(left: readonly string[], right: readonly string[]) {
  return (
    left.length === right.length &&
    left.every((locale, index) => locale === right[index])
  );
}

/** Returns whether two release policies have the same signed identity. */
function hasSamePolicy(left: ReleasePolicy, right: ReleasePolicy) {
  return (
    left.editorialReviewDigest === right.editorialReviewDigest &&
    hasSameLocaleCodes(left.activeAppLocales, right.activeAppLocales)
  );
}

/** Fails with one exact structured-scope policy mismatch. */
function failClosure(input: {
  readonly actual: string;
  readonly expected: string;
  readonly family:
    | typeof ContentSnapshotKindSchema.Type
    | typeof ContentFamilySchema.Type;
  readonly field: typeof ClosureFieldSchema.Type;
}) {
  return Effect.fail(new ReleasePolicyClosureError(input));
}

/** Verifies one replacement snapshot against the new release policy. */
function verifyManifestPolicy(
  manifest: ContentSnapshotManifest,
  policy: ReleasePolicy
) {
  if (
    !hasSameLocaleCodes(
      manifest.manifest.activeAppLocales,
      policy.activeAppLocales
    )
  ) {
    return failClosure({
      actual: manifest.manifest.activeAppLocales.join(","),
      expected: policy.activeAppLocales.join(","),
      family: manifest.family,
      field: "activeAppLocales",
    });
  }
  if (
    manifest.manifest.editorialReviewDigest !== policy.editorialReviewDigest
  ) {
    return failClosure({
      actual: manifest.manifest.editorialReviewDigest,
      expected: policy.editorialReviewDigest,
      family: manifest.family,
      field: "editorialReviewDigest",
    });
  }
  return Effect.void;
}

/**
 * Verifies snapshot replacement policy for one release transition.
 *
 * Genesis and policy changes must replace every structured snapshot. An
 * unchanged policy may inherit prior snapshots while validating every supplied
 * replacement against the current release identity.
 */
export const verifyReleasePolicyTransition = Effect.fn(
  "AksaraContracts.verifyReleasePolicyTransition"
)(function* (input: {
  readonly basePolicy: ReleasePolicy | null;
  readonly manifests: readonly ContentSnapshotManifest[];
  readonly policy: ReleasePolicy;
  readonly scope: PublicationScope;
}) {
  const requiresCompleteReplacement =
    input.basePolicy === null || !hasSamePolicy(input.basePolicy, input.policy);

  if (requiresCompleteReplacement) {
    for (const family of ContentFamilySchema.literals) {
      if (!input.scope.families.includes(family)) {
        return yield* failClosure({
          actual: "partial",
          expected: "complete-family",
          family,
          field: "scope",
        });
      }
    }
  }

  for (const family of ContentSnapshotKindSchema.literals) {
    const manifests = input.manifests.filter(
      (candidate) => candidate.family === family
    );
    if (manifests.length > 1) {
      return yield* failClosure({
        actual: String(manifests.length),
        expected: "at-most-one",
        family,
        field: "manifest",
      });
    }
    const [manifest] = manifests;
    if (manifest !== undefined) {
      yield* verifyManifestPolicy(manifest, input.policy);
      continue;
    }
    if (requiresCompleteReplacement) {
      return yield* failClosure({
        actual: "missing",
        expected: "exactly-one",
        family,
        field: "manifest",
      });
    }
  }
});
