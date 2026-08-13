import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  type ActiveAppLocaleList,
  ActiveAppLocaleListSchema,
  type AppLocale,
  AppLocaleCodeSchema,
  AppLocaleSchema,
} from "#contracts/locale";
import { QuranProvenanceStatusSchema } from "#contracts/quran/snapshot/spec";
import {
  hasCompleteQuranSourceCopy,
  type QuranSourceAttribution,
  QuranSourceAttributionSchema,
  type QuranSourceId,
} from "#contracts/quran/source";

/** Quran source fields that require independent provenance decisions. */
const QuranStaticProvenanceScopeSchema = Schema.Literal(
  "arabic-text",
  "metadata"
);

const QuranTranslationProvenanceScopeSchema = Schema.TemplateLiteral(
  AppLocaleCodeSchema,
  "-translation"
);

/** Complete source-field vocabulary supported by current Quran publication. */
export const QuranProvenanceScopeSchema = Schema.Union(
  QuranStaticProvenanceScopeSchema,
  QuranTranslationProvenanceScopeSchema,
  Schema.Literal("id-tafsir")
);
export type QuranProvenanceScope = typeof QuranProvenanceScopeSchema.Type;

/** Maps one active application locale to its exact translation source field. */
function translationScope(appLocale: AppLocale): QuranProvenanceScope {
  if (appLocale === AppLocaleSchema.make("en")) {
    return "en-translation";
  }
  if (appLocale === AppLocaleSchema.make("id")) {
    return "id-translation";
  }
  return "de-translation";
}

/** Derives the exact provenance scope order for one active locale set. */
export function quranProvenanceScopes(
  activeAppLocales: ActiveAppLocaleList
): readonly QuranProvenanceScope[] {
  const scopes: QuranProvenanceScope[] = ["arabic-text"];
  for (const appLocale of activeAppLocales) {
    scopes.push(translationScope(appLocale));
    if (appLocale === AppLocaleSchema.make("id")) {
      scopes.push("id-tafsir");
    }
  }
  scopes.push("metadata");
  return scopes;
}

/** Resolves the only official source allowed to prove one provenance scope. */
function sourceForScope(scope: QuranProvenanceScope): QuranSourceId {
  if (scope === "arabic-text") {
    return "tanzil-text";
  }
  if (scope === "metadata") {
    return "tanzil-metadata";
  }
  if (scope === "en-translation") {
    return "quranenc-english";
  }
  if (scope === "id-translation") {
    return "quranenc-indonesian";
  }
  if (scope === "de-translation") {
    return "quranenc-german";
  }
  return "quranenc-tafsir";
}

/** One reviewed official artifact and its field-level permission decision. */
export const QuranProvenanceRecordSchema = Schema.Struct({
  attribution: QuranSourceAttributionSchema,
  evidence: Schema.NonEmptyTrimmedString,
  scope: QuranProvenanceScopeSchema,
  status: QuranProvenanceStatusSchema,
}).pipe(
  Schema.filter(
    ({ attribution, scope }) => attribution.id === sourceForScope(scope),
    { message: () => "Expected each Quran scope to bind its official source." }
  )
);
export type QuranProvenanceRecord = typeof QuranProvenanceRecordSchema.Type;

/** Checks exact active-locale coverage and canonical scope order. */
function hasCanonicalSourceCoverage(input: {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly records: readonly QuranProvenanceRecord[];
}) {
  const expected = quranProvenanceScopes(input.activeAppLocales);
  return (
    input.records.length === expected.length &&
    input.records.every(
      (record, index) =>
        record.scope === expected[index] &&
        record.attribution.id === sourceForScope(record.scope) &&
        hasCompleteQuranSourceCopy(record.attribution, input.activeAppLocales)
    )
  );
}

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
  activeAppLocales: ActiveAppLocaleListSchema,
  digest: Sha256HashSchema,
  records: Schema.NonEmptyArray(QuranProvenanceRecordSchema),
  status: QuranProvenanceStatusSchema,
}).pipe(
  Schema.filter(hasCanonicalSourceCoverage, {
    message: () =>
      "Expected exact active-locale Quran provenance scope coverage.",
  }),
  Schema.filter(hasCoherentProvenanceStatus, {
    message: () =>
      "Expected Quran provenance status to match its complete evidence.",
  })
);
export type QuranProvenanceManifest = typeof QuranProvenanceManifestSchema.Type;

/** Quran provenance omitted or misordered an active-locale scope. */
export class QuranProvenanceCoverageError extends Schema.TaggedError<QuranProvenanceCoverageError>()(
  "QuranProvenanceCoverageError",
  {
    actualScopes: Schema.Array(QuranProvenanceScopeSchema),
  }
) {}

/** Node could not compute the deterministic provenance digest. */
export class QuranProvenanceHashError extends Schema.TaggedError<QuranProvenanceHashError>()(
  "QuranProvenanceHashError",
  {}
) {}

const PROVENANCE_DOMAIN = "nakafa.aksara.quran-provenance";

/** Serializes one public attribution without trusting insertion order. */
function canonicalizeAttribution(attribution: QuranSourceAttribution) {
  return {
    artifact: {
      byteCount: attribution.artifact.byteCount,
      digest: attribution.artifact.digest,
      fileCount: attribution.artifact.fileCount,
    },
    copy: attribution.copy.map((entry) => ({
      appLocale: entry.appLocale,
      notice: entry.notice,
      title: entry.title,
    })),
    id: attribution.id,
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

/** Digests exact ordered provenance records under their active locale set. */
export function hashQuranProvenance(input: {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly records: readonly QuranProvenanceRecord[];
}) {
  return Effect.try({
    catch: () => new QuranProvenanceHashError(),
    try: () => {
      const hash = createHash("sha256")
        .update(`${PROVENANCE_DOMAIN}\n`)
        .update(JSON.stringify(input.activeAppLocales))
        .update("\n");
      for (const record of input.records) {
        hash.update(canonicalizeQuranProvenance(record));
        hash.update("\n");
      }
      return Sha256HashSchema.make(`sha256:${hash.digest("hex")}`);
    },
  });
}

/** Builds a snapshot provenance gate from exact reviewed source records. */
export const makeQuranProvenanceManifest = Effect.fn(
  "AksaraContracts.makeQuranProvenanceManifest"
)(function* (input: {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly records: readonly QuranProvenanceRecord[];
}) {
  const decoded = yield* Schema.decodeUnknown(
    Schema.Struct({
      activeAppLocales: ActiveAppLocaleListSchema,
      records: Schema.NonEmptyArray(QuranProvenanceRecordSchema),
    }).pipe(Schema.filter(hasCanonicalSourceCoverage))
  )(input).pipe(
    Effect.mapError(
      () =>
        new QuranProvenanceCoverageError({
          actualScopes: input.records.map(({ scope }) => scope),
        })
    )
  );
  const digest = yield* hashQuranProvenance(decoded);
  const status = decoded.records.some((record) => record.status === "blocked")
    ? "blocked"
    : "approved";
  return QuranProvenanceManifestSchema.make({ ...decoded, digest, status });
});
