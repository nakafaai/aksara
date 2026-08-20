import {
  type ActiveAppLocaleList,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  type QuranSourceAttribution,
  QuranSourceAttributionSchema,
  type QuranSourceCopy,
  type QuranSourceId,
  QuranSourceIdSchema,
  quranSourceIds,
} from "@nakafa/aksara-contracts/quran/source";
import { Effect, Schema } from "effect";
import { quranSourceAttributions } from "#corpus/quran/attribution/source";

/** A selected attribution source or locale copy is missing or duplicated. */
export class QuranAttributionLocaleError extends Schema.TaggedError<QuranAttributionLocaleError>()(
  "QuranAttributionLocaleError",
  {
    activeAppLocales: Schema.Array(AppLocaleSchema),
    reason: Schema.Literals([
      "duplicate-copy",
      "duplicate-source",
      "missing-copy",
      "missing-source",
    ]),
    sourceId: QuranSourceIdSchema,
  }
) {}

/** Creates one attribution closure failure with the selected locale context. */
function attributionError(
  activeAppLocales: ActiveAppLocaleList,
  sourceId: QuranSourceId,
  reason: QuranAttributionLocaleError["reason"]
) {
  return new QuranAttributionLocaleError({
    activeAppLocales,
    reason,
    sourceId,
  });
}

/** Requires exactly one attribution record for a stable Quran source. */
const requireAttributionSource = Effect.fn(
  "AksaraCorpus.requireQuranAttributionSource"
)(function* (
  sourceId: QuranSourceId,
  activeAppLocales: ActiveAppLocaleList,
  sources: readonly QuranSourceAttribution[]
) {
  const matches = sources.filter((candidate) => candidate.id === sourceId);
  const [source] = matches;
  if (source === undefined) {
    return yield* attributionError(
      activeAppLocales,
      sourceId,
      "missing-source"
    );
  }
  if (matches.length > 1) {
    return yield* attributionError(
      activeAppLocales,
      sourceId,
      "duplicate-source"
    );
  }
  return source;
});

/** Requires exactly one localized attribution copy for one source. */
const requireAttributionCopy = Effect.fn(
  "AksaraCorpus.requireQuranAttributionCopy"
)(function* (
  source: QuranSourceAttribution,
  appLocale: ActiveAppLocaleList[number],
  activeAppLocales: ActiveAppLocaleList
) {
  const matches = source.copy.filter(
    (candidate) => candidate.appLocale === appLocale
  );
  const [copy] = matches;
  if (copy === undefined) {
    return yield* attributionError(activeAppLocales, source.id, "missing-copy");
  }
  if (matches.length > 1) {
    return yield* attributionError(
      activeAppLocales,
      source.id,
      "duplicate-copy"
    );
  }
  return copy;
});

/** Selects one exact source and its canonical copy for a publication locale set. */
export const quranSourceAttributionFor = Effect.fn(
  "AksaraCorpus.quranSourceAttributionFor"
)(function* (
  sourceId: QuranSourceId,
  activeAppLocales: ActiveAppLocaleList,
  sources: readonly QuranSourceAttribution[] = quranSourceAttributions
) {
  const source = yield* requireAttributionSource(
    sourceId,
    activeAppLocales,
    sources
  );
  const [firstAppLocale, ...remainingAppLocales] = activeAppLocales;
  const firstCopy = yield* requireAttributionCopy(
    source,
    firstAppLocale,
    activeAppLocales
  );
  const remainingCopy = yield* Effect.forEach(
    remainingAppLocales,
    (appLocale) => requireAttributionCopy(source, appLocale, activeAppLocales),
    { concurrency: "unbounded" }
  );
  const copy: readonly [QuranSourceCopy, ...QuranSourceCopy[]] = [
    firstCopy,
    ...remainingCopy,
  ];
  return QuranSourceAttributionSchema.make({ ...source, copy });
});

/** Selects exact visible sources and copy for one publication locale set. */
export const quranSourceAttributionsFor = Effect.fn(
  "AksaraCorpus.quranSourceAttributionsFor"
)(function* (
  activeAppLocales: ActiveAppLocaleList,
  sources: readonly QuranSourceAttribution[] = quranSourceAttributions
) {
  const core = yield* Effect.all({
    metadata: quranSourceAttributionFor(
      "tanzil-metadata",
      activeAppLocales,
      sources
    ),
    text: quranSourceAttributionFor("tanzil-text", activeAppLocales, sources),
  });
  const localizedSourceIds = quranSourceIds(activeAppLocales).filter(
    (sourceId) => sourceId !== "tanzil-text" && sourceId !== "tanzil-metadata"
  );
  const localized = yield* Effect.forEach(
    localizedSourceIds,
    (sourceId) =>
      quranSourceAttributionFor(sourceId, activeAppLocales, sources),
    { concurrency: "unbounded" }
  );
  const selected: readonly [
    QuranSourceAttribution,
    QuranSourceAttribution,
    ...QuranSourceAttribution[],
  ] = [core.text, core.metadata, ...localized];
  return selected;
});
