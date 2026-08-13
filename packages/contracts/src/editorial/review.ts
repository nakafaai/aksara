import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

import { CorpusSourcePathSchema, Sha256HashSchema } from "#contracts/ids";
import { AppLocaleSchema, DeliveryLanguageSchema } from "#contracts/locale";
import { compareCodeUnits } from "#contracts/text/order";

/** Humanizer workflow version required by reviewed authored prose. */
export const HUMANIZER_WORKFLOW_VERSION = "2.9.1";

/** Editorial handling selected for one exact target artifact. */
export const EditorialReviewModeSchema = Schema.Literal(
  "authored-humanizer-review",
  "assessed-language-preserved",
  "immutable-official-source"
);
export type EditorialReviewMode = typeof EditorialReviewModeSchema.Type;

/** One exact source file and hash used to review a target artifact. */
export const EditorialReviewSourceSchema = Schema.Struct({
  sourceHash: Sha256HashSchema,
  sourcePath: CorpusSourcePathSchema,
});
export type EditorialReviewSource = typeof EditorialReviewSourceSchema.Type;

/** Compares source evidence through stable path and hash order. */
function compareReviewSources(
  left: EditorialReviewSource,
  right: EditorialReviewSource
) {
  return compareCodeUnits(left.sourcePath, right.sourcePath);
}

/** Checks source evidence for canonical order and unique source paths. */
function hasCanonicalReviewSources(sources: readonly EditorialReviewSource[]) {
  return sources.every((source, index) => {
    const previous = sources[index - 1];
    return previous === undefined || compareReviewSources(previous, source) < 0;
  });
}

const EditorialReviewSourceListSchema = Schema.NonEmptyArray(
  EditorialReviewSourceSchema
).pipe(
  Schema.filter(hasCanonicalReviewSources, {
    message: () =>
      "Editorial review sources must have unique paths in canonical order.",
  })
);

/** Checks one review mode against its application and delivery languages. */
function hasReviewLanguagePolicy(input: {
  readonly appLocale: string;
  readonly deliveryLanguage: string;
  readonly reviewMode: EditorialReviewMode;
}) {
  return (
    input.reviewMode === "assessed-language-preserved" ||
    input.appLocale === input.deliveryLanguage
  );
}

/** Complete review evidence for one exact authored or immutable target. */
export const EditorialReviewRecordSchema = Schema.Struct({
  appLocale: AppLocaleSchema,
  deliveryLanguage: DeliveryLanguageSchema,
  reviewMode: EditorialReviewModeSchema,
  sources: EditorialReviewSourceListSchema,
  targetHash: Sha256HashSchema,
  targetPath: CorpusSourcePathSchema,
  workflowVersion: Schema.Literal(HUMANIZER_WORKFLOW_VERSION),
}).pipe(
  Schema.filter(hasReviewLanguagePolicy, {
    message: () =>
      "Authored and immutable reviews must match app and delivery language.",
  })
);
export type EditorialReviewRecord = typeof EditorialReviewRecordSchema.Type;

/** Source paths that one review record must bind in canonical order. */
const EditorialReviewRequiredSourceListSchema = Schema.Array(
  CorpusSourcePathSchema
).pipe(
  Schema.filter(
    (paths) => {
      let previous: string | undefined;
      for (const path of paths) {
        if (previous !== undefined && compareCodeUnits(previous, path) >= 0) {
          return false;
        }
        previous = path;
      }
      return true;
    },
    {
      message: () =>
        "Required review source paths must be unique and canonical.",
    }
  )
);

/** Exact editorial binding required by one selected release source. */
export const EditorialReviewRequirementSchema = Schema.Struct({
  appLocale: AppLocaleSchema,
  deliveryLanguage: DeliveryLanguageSchema,
  expectedTargetHash: Schema.NullOr(Sha256HashSchema),
  requiredSourcePaths: EditorialReviewRequiredSourceListSchema,
  reviewMode: EditorialReviewModeSchema,
  targetPath: CorpusSourcePathSchema,
}).pipe(
  Schema.filter(hasReviewLanguagePolicy, {
    message: () =>
      "Authored and immutable review requirements must match app and delivery language.",
  })
);
export type EditorialReviewRequirement =
  typeof EditorialReviewRequirementSchema.Type;

/** Compares review records through their unique target identity. */
function compareReviewRecords(
  left: EditorialReviewRecord,
  right: EditorialReviewRecord
) {
  const targetOrder = compareCodeUnits(left.targetPath, right.targetPath);
  if (targetOrder !== 0) {
    return targetOrder;
  }
  const appLocaleOrder = compareCodeUnits(left.appLocale, right.appLocale);
  return (
    appLocaleOrder ||
    compareCodeUnits(left.deliveryLanguage, right.deliveryLanguage)
  );
}

/** Checks review records for canonical order and unique policy bindings. */
function hasCanonicalReviewRecords(records: readonly EditorialReviewRecord[]) {
  return records.every((record, index) => {
    const previous = records[index - 1];
    return previous === undefined || compareReviewRecords(previous, record) < 0;
  });
}

/** Nonempty exact review record set covered by one manifest digest. */
export const EditorialReviewRecordListSchema = Schema.NonEmptyArray(
  EditorialReviewRecordSchema
).pipe(
  Schema.filter(hasCanonicalReviewRecords, {
    message: () =>
      "Editorial review policy bindings must be unique and canonical.",
  })
);
export type EditorialReviewRecordList =
  typeof EditorialReviewRecordListSchema.Type;

/** Stable wire format for exact editorial review evidence. */
export const EDITORIAL_REVIEW_FORMAT = "editorial-review";

/** Signed-release editorial evidence with content-addressed identity. */
export const EditorialReviewManifestSchema = Schema.Struct({
  digest: Sha256HashSchema,
  format: Schema.Literal(EDITORIAL_REVIEW_FORMAT),
  records: EditorialReviewRecordListSchema,
});
export type EditorialReviewManifest = typeof EditorialReviewManifestSchema.Type;

const EDITORIAL_REVIEW_DOMAIN = "nakafa.aksara.editorial-review";

/** Serializes one source record without trusting object insertion order. */
function canonicalizeReviewSource(source: EditorialReviewSource) {
  return {
    sourceHash: source.sourceHash,
    sourcePath: source.sourcePath,
  };
}

/** Serializes one review record in deterministic signed field order. */
export function canonicalizeEditorialReview(record: EditorialReviewRecord) {
  return JSON.stringify({
    appLocale: record.appLocale,
    deliveryLanguage: record.deliveryLanguage,
    reviewMode: record.reviewMode,
    sources: record.sources.map(canonicalizeReviewSource),
    targetHash: record.targetHash,
    targetPath: record.targetPath,
    workflowVersion: record.workflowVersion,
  });
}

/** Node could not compute the deterministic editorial review digest. */
export class EditorialReviewHashError extends Schema.TaggedError<EditorialReviewHashError>()(
  "EditorialReviewHashError",
  {}
) {}

/** Hashes exact canonical review records with domain separation. */
export const hashEditorialReviews = Effect.fn(
  "AksaraContracts.hashEditorialReviews"
)((records: readonly EditorialReviewRecord[]) =>
  Effect.try({
    catch: () => new EditorialReviewHashError(),
    try: () => {
      const hash = createHash("sha256").update(`${EDITORIAL_REVIEW_DOMAIN}\n`);
      for (const record of records) {
        hash.update(canonicalizeEditorialReview(record));
        hash.update("\n");
      }
      return Sha256HashSchema.make(`sha256:${hash.digest("hex")}`);
    },
  })
);

/** Review records could not satisfy the canonical manifest contract. */
export class EditorialReviewManifestError extends Schema.TaggedError<EditorialReviewManifestError>()(
  "EditorialReviewManifestError",
  { cause: Schema.Unknown }
) {}

/** One review manifest digest differs from its canonical record set. */
export class EditorialReviewDigestMismatchError extends Schema.TaggedError<EditorialReviewDigestMismatchError>()(
  "EditorialReviewDigestMismatchError",
  {
    actualDigest: Sha256HashSchema,
    expectedDigest: Sha256HashSchema,
  }
) {}

/** Builds canonical content-addressed review evidence from exact records. */
export const makeEditorialReviewManifest = Effect.fn(
  "AksaraContracts.makeEditorialReviewManifest"
)(function* (records: readonly EditorialReviewRecord[]) {
  const ordered = [...records].sort(compareReviewRecords);
  const canonical = yield* Schema.decodeUnknown(
    EditorialReviewRecordListSchema
  )(ordered).pipe(
    Effect.mapError((cause) => new EditorialReviewManifestError({ cause }))
  );
  const digest = yield* hashEditorialReviews(canonical);
  return EditorialReviewManifestSchema.make({
    digest,
    format: EDITORIAL_REVIEW_FORMAT,
    records: canonical,
  });
});

/** Strictly decodes and authenticates one editorial review manifest. */
export const verifyEditorialReviewManifest = Effect.fn(
  "AksaraContracts.verifyEditorialReviewManifest"
)(function* (input: unknown) {
  const manifest = yield* Schema.decodeUnknown(EditorialReviewManifestSchema)(
    input,
    { onExcessProperty: "error" }
  ).pipe(
    Effect.mapError((cause) => new EditorialReviewManifestError({ cause }))
  );
  const actualDigest = yield* hashEditorialReviews(manifest.records);
  if (actualDigest !== manifest.digest) {
    return yield* new EditorialReviewDigestMismatchError({
      actualDigest,
      expectedDigest: manifest.digest,
    });
  }
  return manifest;
});
