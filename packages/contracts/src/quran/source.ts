import { Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  type ActiveAppLocaleList,
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
  appLocaleLiteral,
} from "#contracts/locale";
import {
  QURAN_SURAH_COUNT,
  QuranExternalTafsirLocaleSchema,
  QuranTafsirLocaleSchema,
} from "#contracts/quran/spec";
import { isHttpsUrl } from "#contracts/text/syntax";

/** Official source identities whose bytes are pinned inside Aksara. */
export const QuranEmbeddedSourceIdSchema = Schema.Literals([
  "tanzil-text",
  "tanzil-metadata",
  "quranenc-english",
  "quranenc-indonesian",
  "quranenc-german",
  "quranenc-tafsir",
]);
export type QuranEmbeddedSourceId = typeof QuranEmbeddedSourceIdSchema.Type;

/** Official source identities that Aksara may link to but not republish. */
export const QuranExternalSourceIdSchema = Schema.Literals([
  "mokhtasar-english",
  "mokhtasar-german",
]);
export type QuranExternalSourceId = typeof QuranExternalSourceIdSchema.Type;

/** Exact official Quran source identities in visible attribution order. */
export const QuranSourceIdSchema = Schema.Literals([
  ...QuranEmbeddedSourceIdSchema.literals,
  ...QuranExternalSourceIdSchema.literals,
]);
export type QuranSourceId = typeof QuranSourceIdSchema.Type;

/** Canonical order of every official source supported by the contract. */
export const QURAN_SOURCE_IDS = QuranSourceIdSchema.literals;

/** Derives the exact source identities required by one active locale set. */
export function quranSourceIds(
  activeAppLocales: ActiveAppLocaleList
): readonly [QuranSourceId, QuranSourceId, ...QuranSourceId[]] {
  const sourceIds: QuranSourceId[] = [];
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
  if (activeAppLocales.includes(AppLocaleSchema.make("en"))) {
    sourceIds.push("mokhtasar-english");
  }
  if (activeAppLocales.includes(AppLocaleSchema.make("de"))) {
    sourceIds.push("mokhtasar-german");
  }
  return [
    "tanzil-text",
    "tanzil-metadata",
    ...QURAN_SOURCE_IDS.slice(2).filter((sourceId) =>
      sourceIds.includes(sourceId)
    ),
  ];
}

/** Counts exact source files required by one active locale set. */
export function quranSourceFileCount(activeAppLocales: ActiveAppLocaleList) {
  const tafsirFileCount = activeAppLocales.includes(AppLocaleSchema.make("id"))
    ? QURAN_SURAH_COUNT
    : 0;
  return 2 + activeAppLocales.length + tafsirFileCount;
}

const HttpsUrlSchema = Schema.String.pipe(
  Schema.check(
    Schema.makeFilter(isHttpsUrl, {
      message: "Quran source links must use HTTPS.",
    })
  )
);

const RetrievedAtSchema = Schema.String.pipe(
  Schema.check(
    Schema.isPattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/u, {
      message: "Expected an exact UTC Quran source retrieval time.",
    })
  )
);

/** Content identity of one pinned official source or legal evidence artifact. */
export const QuranSourceArtifactSchema = Schema.Struct({
  byteCount: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
  digest: Sha256HashSchema,
  fileCount: Schema.Int.pipe(Schema.check(Schema.isGreaterThan(0))),
});
export type QuranSourceArtifact = typeof QuranSourceArtifactSchema.Type;

/** Nakafa-owned source label and notice for one application locale. */
export const QuranSourceCopySchema = Schema.Struct({
  appLocale: AppLocaleSchema,
  notice: Schema.Trimmed.check(Schema.isNonEmpty()),
  title: Schema.Trimmed.check(Schema.isNonEmpty()),
});
export type QuranSourceCopy = typeof QuranSourceCopySchema.Type;

const QuranSourceAttributionFields = {
  copy: Schema.NonEmptyArray(QuranSourceCopySchema),
  publisher: Schema.Trimmed.check(Schema.isNonEmpty()),
  retrievedAt: RetrievedAtSchema,
  sourceUrl: HttpsUrlSchema,
  updateUrl: HttpsUrlSchema,
  version: Schema.Trimmed.check(Schema.isNonEmpty()),
};

/** Attribution for source bytes embedded and authenticated by Aksara. */
export const QuranEmbeddedSourceAttributionSchema = Schema.Struct({
  ...QuranSourceAttributionFields,
  artifact: QuranSourceArtifactSchema,
  id: QuranEmbeddedSourceIdSchema,
  kind: Schema.Literal("embedded"),
  terms: Schema.Struct({
    artifact: QuranSourceArtifactSchema,
    url: HttpsUrlSchema,
  }),
});
export type QuranEmbeddedSourceAttribution =
  typeof QuranEmbeddedSourceAttributionSchema.Type;

/** Attribution for an official edition that Aksara may only link to. */
export const QuranExternalSourceAttributionSchema = Schema.Struct({
  ...QuranSourceAttributionFields,
  id: QuranExternalSourceIdSchema,
  kind: Schema.Literal("external"),
  terms: Schema.Struct({
    access: Schema.Literal("link-only"),
    url: HttpsUrlSchema,
  }),
});
export type QuranExternalSourceAttribution =
  typeof QuranExternalSourceAttributionSchema.Type;

/** Public attribution that distinguishes embedded bytes from external links. */
export const QuranSourceAttributionSchema = Schema.Union([
  QuranEmbeddedSourceAttributionSchema,
  QuranExternalSourceAttributionSchema,
]);
export type QuranSourceAttribution = typeof QuranSourceAttributionSchema.Type;

const QuranIndonesianTafsirAccessSchema = Schema.Struct({
  appLocale: appLocaleLiteral(QuranTafsirLocaleSchema.literal),
  kind: Schema.Literal("embedded"),
  notice: Schema.Trimmed.check(Schema.isNonEmpty()),
  sourceId: Schema.Literal("quranenc-tafsir"),
});

const QuranEnglishTafsirAccessSchema = Schema.Struct({
  appLocale: appLocaleLiteral(QuranExternalTafsirLocaleSchema.literals[0]),
  kind: Schema.Literal("external"),
  notice: Schema.Trimmed.check(Schema.isNonEmpty()),
  sourceId: Schema.Literal("mokhtasar-english"),
});

const QuranGermanTafsirAccessSchema = Schema.Struct({
  appLocale: appLocaleLiteral(QuranExternalTafsirLocaleSchema.literals[1]),
  kind: Schema.Literal("external"),
  notice: Schema.Trimmed.check(Schema.isNonEmpty()),
  sourceId: Schema.Literal("mokhtasar-german"),
});

/** Signed locale-specific access to embedded or official external Tafsir. */
export const QuranTafsirAccessSchema = Schema.Union([
  QuranEnglishTafsirAccessSchema,
  QuranIndonesianTafsirAccessSchema,
  QuranGermanTafsirAccessSchema,
]);
export type QuranTafsirAccess = typeof QuranTafsirAccessSchema.Type;

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

/** Checks every signed Tafsir access record against one attributed source. */
function hasAttributedTafsirSources(input: {
  readonly sources: readonly QuranSourceAttribution[];
  readonly tafsirAccess: readonly QuranTafsirAccess[];
}) {
  return input.tafsirAccess.every((access) =>
    input.sources.some((source) => source.id === access.sourceId)
  );
}

/** Checks exact Tafsir access coverage against one active locale set. */
export function hasCompleteQuranTafsirAccess(
  access: readonly QuranTafsirAccess[],
  activeAppLocales: ActiveAppLocaleList
) {
  return (
    access.length === activeAppLocales.length &&
    access.every(
      ({ appLocale }, index) => appLocale === activeAppLocales[index]
    )
  );
}

/** Visible attribution row carrying the active official source subset. */
export const QuranAttributionRowSchema = Schema.Struct({
  activeAppLocales: ActiveAppLocaleListSchema,
  kind: Schema.Literal("quran-attribution"),
  sources: Schema.NonEmptyArray(QuranSourceAttributionSchema),
  tafsirAccess: Schema.NonEmptyArray(QuranTafsirAccessSchema),
}).pipe(
  Schema.check(
    Schema.makeFilter(({ sources }) => hasCanonicalSources(sources), {
      message: "Expected unique Quran sources in canonical order.",
    })
  ),
  Schema.check(
    Schema.makeFilter(
      ({ activeAppLocales, sources }) =>
        hasRequiredQuranSources(sources, activeAppLocales),
      {
        message:
          "Expected exact Quran source coverage for the active locale set.",
      }
    )
  ),
  Schema.check(
    Schema.makeFilter(hasCompleteLocalizedCopy, {
      message:
        "Expected localized Quran attribution copy for every active locale.",
    })
  ),
  Schema.check(
    Schema.makeFilter(
      ({ activeAppLocales, tafsirAccess }) =>
        hasCompleteQuranTafsirAccess(tafsirAccess, activeAppLocales),
      {
        message: "Expected exact Tafsir access for every active locale.",
      }
    )
  ),
  Schema.check(
    Schema.makeFilter(hasAttributedTafsirSources, {
      message: "Expected every Tafsir access record to bind an attribution.",
    })
  )
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
