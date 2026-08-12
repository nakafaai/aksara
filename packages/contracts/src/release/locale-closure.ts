import { Effect, Schema } from "effect";

import type { Sha256Hash } from "#contracts/ids";
import type { ActiveAppLocaleList } from "#contracts/locale";
import { PROGRAM_SNAPSHOT_V4_FORMAT } from "#contracts/program/snapshot/spec";
import { QURAN_SNAPSHOT_V3_FORMAT } from "#contracts/quran/snapshot/spec";
import type { ContentSnapshotManifest } from "#contracts/release/snapshot/data";
import { ContentSnapshotKindSchema } from "#contracts/release/snapshot/spec";
import { TRYOUT_SNAPSHOT_V2_FORMAT } from "#contracts/tryout/snapshot/spec";

const ClosureFieldSchema = Schema.Literal(
  "activeAppLocales",
  "editorialReviewDigest",
  "format",
  "manifest"
);

/** One structured scope does not close over the current release policy. */
export class SnapshotLocaleClosureError extends Schema.TaggedError<SnapshotLocaleClosureError>()(
  "SnapshotLocaleClosureError",
  {
    actual: Schema.String,
    expected: Schema.String,
    family: ContentSnapshotKindSchema,
    field: ClosureFieldSchema,
  }
) {}

const expectedFormats = {
  program: PROGRAM_SNAPSHOT_V4_FORMAT,
  quran: QURAN_SNAPSHOT_V3_FORMAT,
  tryout: TRYOUT_SNAPSHOT_V2_FORMAT,
} as const;

/** Compares locale lists without exchanging their branded element roles. */
function hasSameLocaleCodes(left: readonly string[], right: readonly string[]) {
  return (
    left.length === right.length &&
    left.every((locale, index) => locale === right[index])
  );
}

/** Fails with one exact structured-scope policy mismatch. */
function failClosure(input: {
  readonly actual: string;
  readonly expected: string;
  readonly family: typeof ContentSnapshotKindSchema.Type;
  readonly field: typeof ClosureFieldSchema.Type;
}) {
  return Effect.fail(new SnapshotLocaleClosureError(input));
}

/** Verifies one current snapshot against global locale and review identity. */
function verifyManifestPolicy(
  manifest: ContentSnapshotManifest,
  activeAppLocales: ActiveAppLocaleList,
  editorialReviewDigest: Sha256Hash
) {
  const expectedFormat = expectedFormats[manifest.family];
  if (manifest.manifest.format !== expectedFormat) {
    return failClosure({
      actual: manifest.manifest.format,
      expected: expectedFormat,
      family: manifest.family,
      field: "format",
    });
  }
  if (
    !hasSameLocaleCodes(manifest.manifest.activeAppLocales, activeAppLocales)
  ) {
    return failClosure({
      actual: manifest.manifest.activeAppLocales.join(","),
      expected: activeAppLocales.join(","),
      family: manifest.family,
      field: "activeAppLocales",
    });
  }
  if (manifest.manifest.editorialReviewDigest !== editorialReviewDigest) {
    return failClosure({
      actual: manifest.manifest.editorialReviewDigest,
      expected: editorialReviewDigest,
      family: manifest.family,
      field: "editorialReviewDigest",
    });
  }
  return Effect.void;
}

/** Requires all current structured scopes to share one release policy. */
export const verifySnapshotLocaleClosure = Effect.fn(
  "AksaraContracts.verifySnapshotLocaleClosure"
)(function* (input: {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly editorialReviewDigest: Sha256Hash;
  readonly manifests: readonly ContentSnapshotManifest[];
}) {
  for (const family of ContentSnapshotKindSchema.literals) {
    const manifests = input.manifests.filter(
      (candidate) => candidate.family === family
    );
    const [manifest] = manifests;
    if (manifest === undefined) {
      return yield* failClosure({
        actual: "missing",
        expected: "exactly-one",
        family,
        field: "manifest",
      });
    }
    if (manifests.length !== 1) {
      return yield* failClosure({
        actual: "duplicate",
        expected: "exactly-one",
        family,
        field: "manifest",
      });
    }
    yield* verifyManifestPolicy(
      manifest,
      input.activeAppLocales,
      input.editorialReviewDigest
    );
  }
});
