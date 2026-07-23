import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

import { DateOnlySchema } from "#contracts/date";
import { Sha256HashSchema } from "#contracts/ids";
import { QuranProvenanceStatusSchema } from "#contracts/quran/snapshot";

/** Quran source fields that require independent provenance decisions. */
export const QuranProvenanceScopeSchema = Schema.Literal(
  "arabic-text",
  "audio",
  "english-translation",
  "indonesian-tafsir",
  "indonesian-translation",
  "metadata",
  "transliteration"
);
export type QuranProvenanceScope = typeof QuranProvenanceScopeSchema.Type;

/** One reviewed provider statement without inferring unavailable permission. */
export const QuranProvenanceRecordSchema = Schema.Struct({
  evidence: Schema.NonEmptyTrimmedString,
  provider: Schema.NonEmptyTrimmedString,
  retrievedOn: DateOnlySchema,
  scope: QuranProvenanceScopeSchema,
  sourceUrl: Schema.String.pipe(Schema.pattern(/^https:\/\/\S+$/u)),
  status: QuranProvenanceStatusSchema,
});
export type QuranProvenanceRecord = typeof QuranProvenanceRecordSchema.Type;

/** Complete ordered evidence set that gates Quran production publication. */
export const QuranProvenanceManifestSchema = Schema.Struct({
  digest: Sha256HashSchema,
  records: Schema.NonEmptyArray(QuranProvenanceRecordSchema),
  status: QuranProvenanceStatusSchema,
});
export type QuranProvenanceManifest = typeof QuranProvenanceManifestSchema.Type;

const PROVENANCE_DOMAIN = "nakafa.aksara.quran-provenance.v1";

/** Produces stable JSON for one reviewed Quran provenance record. */
export function canonicalizeQuranProvenance(record: QuranProvenanceRecord) {
  return JSON.stringify(record);
}

/** Digests the exact ordered provenance records encoded into a snapshot. */
export function hashQuranProvenance(records: readonly QuranProvenanceRecord[]) {
  return Effect.try({
    catch: () => new QuranProvenanceHashError(),
    try: () => {
      const hash = createHash("sha256").update(`${PROVENANCE_DOMAIN}\n`);
      for (const record of records) {
        hash.update(canonicalizeQuranProvenance(record));
        hash.update("\n");
      }
      return Sha256HashSchema.make(`sha256:${hash.digest("hex")}`);
    },
  });
}

/** Node could not compute the deterministic provenance digest. */
export class QuranProvenanceHashError extends Schema.TaggedError<QuranProvenanceHashError>()(
  "QuranProvenanceHashError",
  {}
) {}

/** Builds a signed-snapshot provenance gate from exact reviewed records. */
export const makeQuranProvenanceManifest = Effect.fn(
  "AksaraContracts.makeQuranProvenanceManifest"
)(function* (
  records: readonly [QuranProvenanceRecord, ...QuranProvenanceRecord[]]
) {
  const digest = yield* hashQuranProvenance(records);
  const status = records.some((record) => record.status === "blocked")
    ? "blocked"
    : "approved";
  return QuranProvenanceManifestSchema.make({ digest, records, status });
});
