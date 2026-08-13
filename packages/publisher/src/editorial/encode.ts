import {
  type EditorialReviewRecord,
  EditorialReviewRecordSchema,
  makeEditorialReviewManifest,
} from "@nakafa/aksara-contracts/editorial/review";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, Schema } from "effect";

import {
  type EditorialReviewCatalog,
  EditorialReviewCatalogSchema,
  hashEditorialReviewPart,
  MAX_EDITORIAL_REVIEW_CATALOG_BYTES,
  MAX_EDITORIAL_REVIEW_PART_BYTES,
  MAX_EDITORIAL_REVIEW_PART_RECORDS,
} from "#publisher/editorial/catalog";

const encoder = new TextEncoder();

/** Editorial records could not be encoded into bounded canonical parts. */
export class EditorialReviewEncodingError extends Schema.TaggedError<EditorialReviewEncodingError>()(
  "EditorialReviewEncodingError",
  {
    cause: Schema.Unknown,
    scope: Schema.Literal("catalog", "part", "records"),
  }
) {}

export interface EncodedEditorialReviewPart {
  readonly bytes: Uint8Array;
  readonly recordCount: number;
  readonly sourcePath: typeof CorpusSourcePathSchema.Type;
}

/** Preserves explicit record field order in source-controlled JSON. */
function jsonRecord(record: EditorialReviewRecord) {
  return {
    appLocale: record.appLocale,
    deliveryLanguage: record.deliveryLanguage,
    reviewMode: record.reviewMode,
    sources: record.sources.map(({ sourceHash, sourcePath }) => ({
      sourceHash,
      sourcePath,
    })),
    targetHash: record.targetHash,
    targetPath: record.targetPath,
    workflowVersion: record.workflowVersion,
  };
}

/** Encodes one human-reviewable canonical JSON value with a final newline. */
function encodeJson(value: unknown) {
  return encoder.encode(`${JSON.stringify(value, null, 2)}\n`);
}

/** Returns whether one candidate record list fits both repository ceilings. */
function fitsPart(records: readonly EditorialReviewRecord[]) {
  return (
    records.length <= MAX_EDITORIAL_REVIEW_PART_RECORDS &&
    encodeJson(records.map(jsonRecord)).byteLength <=
      MAX_EDITORIAL_REVIEW_PART_BYTES
  );
}

/** Splits canonical records without changing their signed logical order. */
function partitionRecords(records: readonly EditorialReviewRecord[]) {
  const parts: EditorialReviewRecord[][] = [];
  let current: EditorialReviewRecord[] = [];
  for (const record of records) {
    const candidate = [...current, record];
    if (fitsPart(candidate)) {
      current = candidate;
      continue;
    }
    if (current.length === 0) {
      return Effect.fail(
        new EditorialReviewEncodingError({ cause: record, scope: "part" })
      );
    }
    parts.push(current);
    current = [record];
    if (!fitsPart(current)) {
      return Effect.fail(
        new EditorialReviewEncodingError({ cause: record, scope: "part" })
      );
    }
  }
  parts.push(current);
  return Effect.succeed(parts);
}

/** Encodes and bounds the authenticated root of one editorial review catalog. */
export const encodeEditorialReviewCatalogRoot = Effect.fn(
  "AksaraPublisher.encodeEditorialReviewCatalogRoot"
)(function* (input: unknown) {
  const catalog = yield* Schema.decodeUnknown(EditorialReviewCatalogSchema)(
    input,
    { onExcessProperty: "error" }
  ).pipe(
    Effect.mapError(
      (cause) => new EditorialReviewEncodingError({ cause, scope: "catalog" })
    )
  );
  const catalogBytes = encodeJson(catalog);
  if (catalogBytes.byteLength > MAX_EDITORIAL_REVIEW_CATALOG_BYTES) {
    return yield* new EditorialReviewEncodingError({
      cause: catalogBytes.byteLength,
      scope: "catalog",
    });
  }
  return { catalog, catalogBytes };
});

/** Encodes a deterministic content-addressed editorial catalog and its parts. */
export const encodeEditorialReviewCatalog = Effect.fn(
  "AksaraPublisher.encodeEditorialReviewCatalog"
)(function* (input: unknown) {
  const records = yield* Schema.decodeUnknown(
    Schema.NonEmptyArray(EditorialReviewRecordSchema)
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError(
      (cause) => new EditorialReviewEncodingError({ cause, scope: "records" })
    )
  );
  const manifest = yield* makeEditorialReviewManifest(records);
  const groups = yield* partitionRecords(manifest.records);
  const parts = groups.map((group, index) => {
    const bytes = encodeJson(group.map(jsonRecord));
    const sequence = String(index + 1).padStart(4, "0");
    return {
      bytes,
      recordCount: group.length,
      sourcePath: CorpusSourcePathSchema.make(
        `packages/corpus/editorial/review/part-${sequence}.json`
      ),
    };
  });
  const { catalog, catalogBytes } = yield* encodeEditorialReviewCatalogRoot({
    digest: manifest.digest,
    format: manifest.format,
    parts: parts.map(({ bytes, recordCount, sourcePath }) => ({
      recordCount,
      sourceHash: hashEditorialReviewPart(bytes),
      sourcePath,
    })),
  });
  return { catalog, catalogBytes, parts } satisfies {
    readonly catalog: EditorialReviewCatalog;
    readonly catalogBytes: Uint8Array;
    readonly parts: readonly EncodedEditorialReviewPart[];
  };
});
