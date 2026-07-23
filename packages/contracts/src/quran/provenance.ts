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

/** Checks exact complete provenance coverage in canonical scope order. */
function hasCanonicalScopeCoverage(records: readonly QuranProvenanceRecord[]) {
  return (
    records.length === QuranProvenanceScopeSchema.literals.length &&
    records.every(
      (record, index) =>
        record.scope === QuranProvenanceScopeSchema.literals[index]
    )
  );
}

const QuranProvenanceRecordsSchema = Schema.NonEmptyArray(
  QuranProvenanceRecordSchema
).pipe(
  Schema.filter(hasCanonicalScopeCoverage, {
    message: () =>
      "Expected every Quran provenance scope exactly once in canonical order.",
  })
);

/** Checks that the declared gate status matches every reviewed record. */
function hasCoherentProvenanceStatus(input: {
  readonly records: readonly QuranProvenanceRecord[];
  readonly status: "approved" | "blocked";
}) {
  const expected = input.records.some((record) => record.status === "blocked")
    ? "blocked"
    : "approved";
  return input.status === expected;
}

/** Complete ordered evidence set that gates Quran production publication. */
export const QuranProvenanceManifestSchema = Schema.Struct({
  digest: Sha256HashSchema,
  records: QuranProvenanceRecordsSchema,
  status: QuranProvenanceStatusSchema,
}).pipe(
  Schema.filter(hasCoherentProvenanceStatus, {
    message: () =>
      "Expected Quran provenance status to match its complete evidence.",
  })
);
export type QuranProvenanceManifest = typeof QuranProvenanceManifestSchema.Type;

/** Provenance records omitted, duplicated, or misidentified one source scope. */
export class QuranProvenanceCoverageError extends Schema.TaggedError<QuranProvenanceCoverageError>()(
  "QuranProvenanceCoverageError",
  {
    actualScopes: Schema.Array(QuranProvenanceScopeSchema),
  }
) {}

const PROVENANCE_DOMAIN = "nakafa.aksara.quran-provenance.v1";

/** Produces stable JSON for one reviewed Quran provenance record. */
export function canonicalizeQuranProvenance(record: QuranProvenanceRecord) {
  return JSON.stringify({
    evidence: record.evidence,
    provider: record.provider,
    retrievedOn: record.retrievedOn,
    scope: record.scope,
    sourceUrl: record.sourceUrl,
    status: record.status,
  });
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
)(function* (records: readonly QuranProvenanceRecord[]) {
  const byScope = new Map(records.map((record) => [record.scope, record]));
  const ordered = QuranProvenanceScopeSchema.literals.flatMap((scope) => {
    const record = byScope.get(scope);
    return record === undefined ? [] : [record];
  });
  const canonical = yield* Schema.decodeUnknown(QuranProvenanceRecordsSchema)(
    ordered
  ).pipe(
    Effect.mapError(
      () =>
        new QuranProvenanceCoverageError({
          actualScopes: records.map(({ scope }) => scope),
        })
    )
  );
  if (byScope.size !== records.length) {
    return yield* new QuranProvenanceCoverageError({
      actualScopes: records.map(({ scope }) => scope),
    });
  }
  const digest = yield* hashQuranProvenance(canonical);
  const status = canonical.some((record) => record.status === "blocked")
    ? "blocked"
    : "approved";
  return QuranProvenanceManifestSchema.make({
    digest,
    records: canonical,
    status,
  });
});
