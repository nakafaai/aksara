import { Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  type ActiveAppLocaleList,
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
} from "#contracts/locale";
import { QURAN_SURAH_COUNT } from "#contracts/quran/spec";
import { isHttpsUrl } from "#contracts/text/syntax";

/** Exact official Quran source identities in visible attribution order. */
export const QuranSourceIdSchema = Schema.Literal(
  "tanzil-text",
  "tanzil-metadata",
  "quranenc-english",
  "quranenc-indonesian",
  "quranenc-german",
  "quranenc-tafsir"
);
export type QuranSourceId = typeof QuranSourceIdSchema.Type;

/** Canonical order of every official source supported by the contract. */
export const QURAN_SOURCE_IDS = QuranSourceIdSchema.literals;

/** Derives the exact source identities required by one active locale set. */
export function quranSourceIds(
  activeAppLocales: ActiveAppLocaleList
): readonly QuranSourceId[] {
  const sourceIds: QuranSourceId[] = ["tanzil-text", "tanzil-metadata"];
  if (activeAppLocales.includes(AppLocaleSchema.make("en"))) {
    sourceIds.push("quranenc-english");
  }
  if (activeAppLocales.includes(AppLocaleSchema.make("id"))) {
    sourceIds.push("quranenc-indonesian");
  }
  if (activeAppLocales.includes(AppLocaleSchema.make("de"))) {
    sourceIds.push("quranenc-german");
  }
  if (activeAppLocales.includes(AppLocaleSchema.make("id"))) {
    sourceIds.push("quranenc-tafsir");
  }
  return QURAN_SOURCE_IDS.filter((sourceId) => sourceIds.includes(sourceId));
}

/** Counts exact source files required by one active locale set. */
export function quranSourceFileCount(activeAppLocales: ActiveAppLocaleList) {
  return quranSourceIds(activeAppLocales).reduce(
    (count, sourceId) =>
      count + (sourceId === "quranenc-tafsir" ? QURAN_SURAH_COUNT : 1),
    0
  );
}

const HttpsUrlSchema = Schema.String.pipe(
  Schema.filter(isHttpsUrl, {
    message: () => "Quran source links must use HTTPS.",
  })
);

const RetrievedAtSchema = Schema.String.pipe(
  Schema.pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/u, {
    message: () => "Expected an exact UTC Quran source retrieval time.",
  })
);

/** Content identity of one pinned official source or legal evidence artifact. */
export const QuranSourceArtifactSchema = Schema.Struct({
  byteCount: Schema.Int.pipe(Schema.positive()),
  digest: Sha256HashSchema,
  fileCount: Schema.Int.pipe(Schema.positive()),
});
export type QuranSourceArtifact = typeof QuranSourceArtifactSchema.Type;

/** Nakafa-owned source label and notice for one application locale. */
export const QuranSourceCopySchema = Schema.Struct({
  appLocale: AppLocaleSchema,
  notice: Schema.NonEmptyTrimmedString,
  title: Schema.NonEmptyTrimmedString,
});
export type QuranSourceCopy = typeof QuranSourceCopySchema.Type;

/** Public source attribution with exact version and pinned evidence identity. */
export const QuranSourceAttributionSchema = Schema.Struct({
  artifact: QuranSourceArtifactSchema,
  copy: Schema.NonEmptyArray(QuranSourceCopySchema),
  id: QuranSourceIdSchema,
  publisher: Schema.NonEmptyTrimmedString,
  retrievedAt: RetrievedAtSchema,
  sourceUrl: HttpsUrlSchema,
  terms: Schema.Struct({
    artifact: QuranSourceArtifactSchema,
    url: HttpsUrlSchema,
  }),
  updateUrl: HttpsUrlSchema,
  version: Schema.NonEmptyTrimmedString,
});
export type QuranSourceAttribution = typeof QuranSourceAttributionSchema.Type;

/** Checks source identities for uniqueness and canonical contract order. */
function hasCanonicalSources(sources: readonly QuranSourceAttribution[]) {
  return sources.every((source, index) => {
    const previous = sources[index - 1];
    return (
      previous === undefined ||
      QURAN_SOURCE_IDS.indexOf(previous.id) <
        QURAN_SOURCE_IDS.indexOf(source.id)
    );
  });
}

/** Checks every source copy against the exact active locale set and order. */
export function hasCompleteQuranSourceCopy(
  source: QuranSourceAttribution,
  activeAppLocales: ActiveAppLocaleList
) {
  return (
    source.copy.length === activeAppLocales.length &&
    source.copy.every(
      ({ appLocale }, index) => appLocale === activeAppLocales[index]
    )
  );
}

/** Checks localized copy closure across every selected official source. */
function hasCompleteLocalizedCopy(input: {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly sources: readonly QuranSourceAttribution[];
}) {
  return input.sources.every((source) =>
    hasCompleteQuranSourceCopy(source, input.activeAppLocales)
  );
}

/** Visible attribution row carrying the active official source subset. */
export const QuranAttributionRowSchema = Schema.Struct({
  activeAppLocales: ActiveAppLocaleListSchema,
  kind: Schema.Literal("quran-attribution"),
  sources: Schema.NonEmptyArray(QuranSourceAttributionSchema),
}).pipe(
  Schema.filter(({ sources }) => hasCanonicalSources(sources), {
    message: () => "Expected unique Quran sources in canonical order.",
  }),
  Schema.filter(
    ({ activeAppLocales, sources }) =>
      hasRequiredQuranSources(sources, activeAppLocales),
    {
      message: () =>
        "Expected exact Quran source coverage for the active locale set.",
    }
  ),
  Schema.filter(hasCompleteLocalizedCopy, {
    message: () =>
      "Expected localized Quran attribution copy for every active locale.",
  })
);
export type QuranAttributionRow = typeof QuranAttributionRowSchema.Type;

/** Checks exact source coverage against one active application-locale set. */
export function hasRequiredQuranSources(
  sources: readonly QuranSourceAttribution[],
  activeAppLocales: ActiveAppLocaleList
) {
  const expected = quranSourceIds(activeAppLocales);
  return (
    sources.length === expected.length &&
    sources.every(({ id }, index) => id === expected[index])
  );
}
