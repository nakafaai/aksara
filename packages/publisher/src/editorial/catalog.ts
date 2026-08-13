import { createHash } from "node:crypto";

import {
  EDITORIAL_REVIEW_FORMAT,
  EditorialReviewManifestSchema,
  type EditorialReviewRecord,
  EditorialReviewRecordListSchema,
} from "@nakafa/aksara-contracts/editorial/review";
import {
  CorpusSourcePathSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { compareCodeUnits } from "@nakafa/aksara-contracts/text/order";
import { Effect, Schema } from "effect";

export const MAX_EDITORIAL_REVIEW_CATALOG_BYTES = 128 * 1024;
export const MAX_EDITORIAL_REVIEW_PART_BYTES = 512 * 1024;
export const MAX_EDITORIAL_REVIEW_PART_RECORDS = 256;

const PositiveCountSchema = Schema.Int.pipe(Schema.positive());
const REVIEW_PART_PATTERN =
  /^packages\/corpus\/editorial\/review\/part-[0-9]{4}\.json$/;

/** Checks whether one exact Git path is a canonical editorial record part. */
function isReviewPartPath(path: string) {
  return REVIEW_PART_PATTERN.test(path);
}

/** One bounded source-controlled part of editorial review evidence. */
export const EditorialReviewPartReferenceSchema = Schema.Struct({
  recordCount: PositiveCountSchema.pipe(
    Schema.lessThanOrEqualTo(MAX_EDITORIAL_REVIEW_PART_RECORDS)
  ),
  sourceHash: Sha256HashSchema,
  sourcePath: CorpusSourcePathSchema.pipe(
    Schema.filter(isReviewPartPath, {
      message: () => "Expected a canonical editorial review part path.",
    })
  ),
});
export type EditorialReviewPartReference =
  typeof EditorialReviewPartReferenceSchema.Type;

/** Checks review parts for canonical path order and unique identities. */
function hasCanonicalPartOrder(parts: readonly EditorialReviewPartReference[]) {
  return parts.every((part, index) => {
    const previous = parts[index - 1];
    return (
      previous === undefined ||
      compareCodeUnits(previous.sourcePath, part.sourcePath) < 0
    );
  });
}

const EditorialReviewPartReferenceListSchema = Schema.NonEmptyArray(
  EditorialReviewPartReferenceSchema
).pipe(
  Schema.filter(hasCanonicalPartOrder, {
    message: () => "Editorial review parts must be unique and canonical.",
  })
);

/** Small authenticated root for bounded editorial record parts. */
export const EditorialReviewCatalogSchema = Schema.Struct({
  digest: Sha256HashSchema,
  format: Schema.Literal(EDITORIAL_REVIEW_FORMAT),
  parts: EditorialReviewPartReferenceListSchema,
});
export type EditorialReviewCatalog = typeof EditorialReviewCatalogSchema.Type;

/** Editorial catalog or record-part source bytes failed strict decoding. */
export class EditorialReviewCatalogError extends Schema.TaggedError<EditorialReviewCatalogError>()(
  "EditorialReviewCatalogError",
  {
    cause: Schema.Unknown,
    sourcePath: CorpusSourcePathSchema,
  }
) {}

/** One record part differs from its authenticated catalog descriptor. */
export class EditorialReviewPartError extends Schema.TaggedError<EditorialReviewPartError>()(
  "EditorialReviewPartError",
  {
    actualCount: Schema.Int.pipe(Schema.nonNegative()),
    actualHash: Sha256HashSchema,
    expectedCount: PositiveCountSchema,
    expectedHash: Sha256HashSchema,
    sourcePath: CorpusSourcePathSchema,
  }
) {}

/** Computes the exact SHA-256 identity of one source-controlled JSON part. */
export function hashEditorialReviewPart(bytes: Uint8Array) {
  return Sha256HashSchema.make(
    `sha256:${createHash("sha256").update(bytes).digest("hex")}`
  );
}

/** Strictly decodes one source-controlled JSON value. */
export const decodeEditorialJson = Effect.fn(
  "AksaraPublisher.decodeEditorialJson"
)(function* <A, I>(
  schema: Schema.Schema<A, I>,
  bytes: Uint8Array,
  sourcePath: typeof CorpusSourcePathSchema.Type
) {
  const text = yield* Effect.try({
    catch: (cause) => new EditorialReviewCatalogError({ cause, sourcePath }),
    try: () => new TextDecoder("utf-8", { fatal: true }).decode(bytes),
  });
  const json = yield* Schema.decodeUnknown(Schema.parseJson())(text).pipe(
    Effect.mapError(
      (cause) => new EditorialReviewCatalogError({ cause, sourcePath })
    )
  );
  return yield* Schema.decodeUnknown(schema)(json, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      (cause) => new EditorialReviewCatalogError({ cause, sourcePath })
    )
  );
});

/** Authenticates and combines bounded record parts into one logical manifest. */
export const assembleEditorialReviewManifest = Effect.fn(
  "AksaraPublisher.assembleEditorialReviewManifest"
)(function* (
  catalog: EditorialReviewCatalog,
  parts: ReadonlyMap<typeof CorpusSourcePathSchema.Type, Uint8Array>
) {
  const records: EditorialReviewRecord[] = [];
  for (const reference of catalog.parts) {
    const bytes = parts.get(reference.sourcePath);
    if (bytes === undefined) {
      return yield* new EditorialReviewCatalogError({
        cause: "The editorial review part is missing.",
        sourcePath: reference.sourcePath,
      });
    }
    const part = yield* decodeEditorialJson(
      EditorialReviewRecordListSchema,
      bytes,
      reference.sourcePath
    );
    const actualHash = hashEditorialReviewPart(bytes);
    if (
      actualHash !== reference.sourceHash ||
      part.length !== reference.recordCount
    ) {
      return yield* new EditorialReviewPartError({
        actualCount: part.length,
        actualHash,
        expectedCount: reference.recordCount,
        expectedHash: reference.sourceHash,
        sourcePath: reference.sourcePath,
      });
    }
    records.push(...part);
  }
  return yield* Schema.decodeUnknown(EditorialReviewManifestSchema)(
    {
      digest: catalog.digest,
      format: catalog.format,
      records,
    },
    { onExcessProperty: "error" }
  ).pipe(
    Effect.mapError(
      (cause) =>
        new EditorialReviewCatalogError({
          cause,
          sourcePath: catalog.parts[0].sourcePath,
        })
    )
  );
});
