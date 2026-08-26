import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  type ActiveAppLocaleList,
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
} from "#contracts/locale";
import { canonicalizeQuranAttribution } from "#contracts/quran/attribution";
import {
  type QuranSourceId,
  QuranTranslationProvenanceScopeSchema,
  quranTranslationProvenanceScope,
  quranTranslationSourceForScope,
} from "#contracts/quran/identity";
import { QuranProvenanceStatusSchema } from "#contracts/quran/snapshot/spec";
import {
  hasCompleteQuranSourceCopy,
  QuranSourceAttributionSchema,
} from "#contracts/quran/source";

/** Quran source fields that require independent provenance decisions. */
const QuranStaticProvenanceScopeSchema = Schema.Literals([
  "arabic-text",
  "metadata",
]);

const QuranExternalTafsirProvenanceScopeSchema = Schema.Literals([
  "en-tafsir-access",
  "de-tafsir-access",
]);

const QuranNonTranslationProvenanceScopeSchema = Schema.Union([
  QuranStaticProvenanceScopeSchema,
  QuranExternalTafsirProvenanceScopeSchema,
  Schema.Literal("id-tafsir"),
]);
type QuranNonTranslationProvenanceScope =
  typeof QuranNonTranslationProvenanceScopeSchema.Type;

/** Complete source-field vocabulary supported by current Quran publication. */
export const QuranProvenanceScopeSchema = Schema.Union([
  QuranNonTranslationProvenanceScopeSchema,
  QuranTranslationProvenanceScopeSchema,
]);
export type QuranProvenanceScope = typeof QuranProvenanceScopeSchema.Type;

/** Derives the exact provenance scope order for one active locale set. */
export function quranProvenanceScopes(
  activeAppLocales: ActiveAppLocaleList
): readonly QuranProvenanceScope[] {
  const scopes: QuranProvenanceScope[] = ["arabic-text"];
  for (const appLocale of activeAppLocales) {
    scopes.push(quranTranslationProvenanceScope(appLocale));
    if (appLocale === AppLocaleSchema.make("en")) {
      scopes.push("en-tafsir-access");
    } else if (appLocale === AppLocaleSchema.make("id")) {
      scopes.push("id-tafsir");
    } else {
      scopes.push("de-tafsir-access");
    }
  }
  scopes.push("metadata");
  return scopes;
}

const QURAN_STATIC_PROVENANCE_SOURCE = {
  "arabic-text": "tanzil-text",
  "de-tafsir-access": "mokhtasar-german",
  "en-tafsir-access": "mokhtasar-english",
  "id-tafsir": "quranenc-tafsir",
  metadata: "tanzil-metadata",
} as const satisfies Record<QuranNonTranslationProvenanceScope, QuranSourceId>;

/** Resolves the only official source allowed to prove one provenance scope. */
export function quranSourceForProvenanceScope(
  scope: QuranProvenanceScope
): QuranSourceId {
  if (Schema.is(QuranTranslationProvenanceScopeSchema)(scope)) {
    return quranTranslationSourceForScope(scope);
  }
  return QURAN_STATIC_PROVENANCE_SOURCE[scope];
}

/** One reviewed official artifact and its field-level permission decision. */
export const QuranProvenanceRecordSchema = Schema.Struct({
  attribution: QuranSourceAttributionSchema,
  evidence: Schema.Trimmed.check(Schema.isNonEmpty()),
  scope: QuranProvenanceScopeSchema,
  status: QuranProvenanceStatusSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({ attribution, scope }) =>
        attribution.id === quranSourceForProvenanceScope(scope),
      { message: "Expected each Quran scope to bind its official source." }
    )
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
        record.attribution.id === quranSourceForProvenanceScope(record.scope) &&
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
  Schema.check(
    Schema.makeFilter(hasCanonicalSourceCoverage, {
      message: "Expected exact active-locale Quran provenance scope coverage.",
    })
  ),
  Schema.check(
    Schema.makeFilter(hasCoherentProvenanceStatus, {
      message:
        "Expected Quran provenance status to match its complete evidence.",
    })
  )
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

/** Produces stable JSON for one reviewed Quran provenance record. */
export function canonicalizeQuranProvenance(record: QuranProvenanceRecord) {
  return JSON.stringify({
    attribution: canonicalizeQuranAttribution(record.attribution),
    evidence: record.evidence,
    scope: record.scope,
    status: record.status,
  });
}

/** Digests exact ordered provenance records under their active locale set. */
export const hashQuranProvenance = Effect.fn(
  "AksaraContracts.hashQuranProvenance"
)(
  (input: {
    readonly activeAppLocales: ActiveAppLocaleList;
    readonly records: readonly QuranProvenanceRecord[];
  }) =>
    Effect.try({
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
    })
);

/** Builds a snapshot provenance gate from exact reviewed source records. */
export const makeQuranProvenanceManifest = Effect.fn(
  "AksaraContracts.makeQuranProvenanceManifest"
)(function* (input: {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly records: readonly QuranProvenanceRecord[];
}) {
  const decoded = yield* Schema.decodeUnknownEffect(
    Schema.Struct({
      activeAppLocales: ActiveAppLocaleListSchema,
      records: Schema.NonEmptyArray(QuranProvenanceRecordSchema),
    }).pipe(Schema.check(Schema.makeFilter(hasCanonicalSourceCoverage)))
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
