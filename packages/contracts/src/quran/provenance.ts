import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

import { ContentLocaleSchema } from "#contracts/content";
import { Sha256HashSchema } from "#contracts/ids";
import { QuranProvenanceStatusSchema } from "#contracts/quran/snapshot";
import {
  type QuranSourceAttribution,
  QuranSourceAttributionSchema,
} from "#contracts/quran/source";
import { QuranTafsirLocaleSchema } from "#contracts/quran/spec";
import { compareCodeUnits } from "#contracts/text/order";

/** Quran source fields that require independent provenance decisions. */
const QuranStaticProvenanceScopeSchema = Schema.Literal(
  "arabic-text",
  "metadata"
);

const QuranTranslationProvenanceScopeSchema = Schema.TemplateLiteral(
  ContentLocaleSchema,
  "-translation"
);

const QuranTafsirProvenanceScopeSchema = Schema.TemplateLiteral(
  QuranTafsirLocaleSchema,
  "-tafsir"
);

/** Quran source fields derived from static fields and locale capabilities. */
export const QuranProvenanceScopeSchema = Schema.Union(
  QuranStaticProvenanceScopeSchema,
  QuranTranslationProvenanceScopeSchema,
  QuranTafsirProvenanceScopeSchema
);
export type QuranProvenanceScope = typeof QuranProvenanceScopeSchema.Type;

/** Decodes derived scope names through their single runtime contract. */
const decodeProvenanceScope = Schema.decodeUnknownSync(
  QuranProvenanceScopeSchema
);

const localizedProvenanceScopes = ContentLocaleSchema.literals.flatMap(
  (locale) => {
    const translation = decodeProvenanceScope(`${locale}-translation`);
    if (!Schema.is(QuranTafsirLocaleSchema)(locale)) {
      return [translation];
    }
    return [decodeProvenanceScope(`${locale}-tafsir`), translation];
  }
);

/** Canonical scope order derived from supported locale capabilities. */
export const QURAN_PROVENANCE_SCOPES = [
  decodeProvenanceScope("arabic-text"),
  ...localizedProvenanceScopes,
  decodeProvenanceScope("metadata"),
];

/** One reviewed official artifact and its field-level permission decision. */
export const QuranProvenanceRecordSchema = Schema.Struct({
  attribution: QuranSourceAttributionSchema,
  evidence: Schema.NonEmptyTrimmedString,
  scope: QuranProvenanceScopeSchema,
  status: QuranProvenanceStatusSchema,
});
export type QuranProvenanceRecord = typeof QuranProvenanceRecordSchema.Type;

/** Compares two provenance records in stable scope and source order. */
function compareProvenance(
  left: QuranProvenanceRecord,
  right: QuranProvenanceRecord
) {
  const leftScope = QURAN_PROVENANCE_SCOPES.indexOf(left.scope);
  const rightScope = QURAN_PROVENANCE_SCOPES.indexOf(right.scope);
  if (leftScope !== rightScope) {
    return leftScope - rightScope;
  }
  return compareCodeUnits(left.attribution.id, right.attribution.id);
}

/** Checks complete scope coverage, unique sources, and canonical order. */
function hasCanonicalSourceCoverage(records: readonly QuranProvenanceRecord[]) {
  const coveredScopes = new Set<QuranProvenanceScope>();
  const sourceIdentities = new Set<string>();
  const canonicalRecords = [...records].sort(compareProvenance);
  const sourceOrder = records.map(({ attribution, scope }) => [
    scope,
    attribution.id,
  ]);
  const canonicalOrder = canonicalRecords.map(({ attribution, scope }) => [
    scope,
    attribution.id,
  ]);
  if (JSON.stringify(sourceOrder) !== JSON.stringify(canonicalOrder)) {
    return false;
  }

  for (const record of records) {
    const identity = `${record.scope}\n${record.attribution.id}`;
    if (sourceIdentities.has(identity)) {
      return false;
    }
    sourceIdentities.add(identity);
    coveredScopes.add(record.scope);
  }

  return QURAN_PROVENANCE_SCOPES.every((scope) => coveredScopes.has(scope));
}

const QuranProvenanceRecordsSchema = Schema.NonEmptyArray(
  QuranProvenanceRecordSchema
).pipe(
  Schema.filter(hasCanonicalSourceCoverage, {
    message: () =>
      "Expected complete Quran provenance scopes with unique sources in canonical order.",
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

/** Provenance omitted a scope, duplicated a source, or broke canonical order. */
export class QuranProvenanceCoverageError extends Schema.TaggedError<QuranProvenanceCoverageError>()(
  "QuranProvenanceCoverageError",
  {
    actualScopes: Schema.Array(QuranProvenanceScopeSchema),
  }
) {}

const PROVENANCE_DOMAIN = "nakafa.aksara.quran-provenance.v2";

/** Serializes one public attribution without trusting insertion order. */
function canonicalizeAttribution(attribution: QuranSourceAttribution) {
  return {
    artifact: {
      byteCount: attribution.artifact.byteCount,
      digest: attribution.artifact.digest,
      fileCount: attribution.artifact.fileCount,
    },
    id: attribution.id,
    notice: attribution.notice,
    publisher: attribution.publisher,
    retrievedAt: attribution.retrievedAt,
    sourceUrl: attribution.sourceUrl,
    terms: {
      artifact: {
        byteCount: attribution.terms.artifact.byteCount,
        digest: attribution.terms.artifact.digest,
        fileCount: attribution.terms.artifact.fileCount,
      },
      url: attribution.terms.url,
    },
    title: attribution.title,
    updateUrl: attribution.updateUrl,
    version: attribution.version,
  };
}

/** Produces stable JSON for one reviewed Quran provenance record. */
export function canonicalizeQuranProvenance(record: QuranProvenanceRecord) {
  return JSON.stringify({
    attribution: canonicalizeAttribution(record.attribution),
    evidence: record.evidence,
    scope: record.scope,
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
  const ordered = [...records].sort(compareProvenance);
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
