import { makeLearningGraphIdentity } from "@nakafa/aksara-contracts/graph/identity";
import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocaleList,
  type AppLocale,
} from "@nakafa/aksara-contracts/locale";
import { TryoutCatalogRowSchema } from "@nakafa/aksara-contracts/tryout/catalog";
import { Effect, Schema } from "effect";

import {
  CANDIDATE_APP_LOCALES,
  type CandidateAppLocaleList,
} from "#corpus/locale/lifecycle";
import {
  localeOverlayAppLocaleCode,
  requireSourceLocale,
} from "#corpus/locale/source";
import { projectTryoutExam } from "#corpus/tryout/catalog-exam";
import type { LocalizedTryoutExamSource } from "#corpus/tryout/locale";
import { composeTryoutLocaleRegistry } from "#corpus/tryout/locale-registry";
import { validateTryoutRoutes } from "#corpus/tryout/route";
import type { TryoutExamSource } from "#corpus/tryout/schema";

const TRYOUT_PATH = "try-out";

/** Source-derived hierarchy rows failed their strict publication contract. */
export class TryoutCatalogDecodeError extends Schema.TaggedError<TryoutCatalogDecodeError>()(
  "TryoutCatalogDecodeError",
  { cause: Schema.Unknown }
) {}

/** Projects one shared country once per locale from country-owned facts. */
const projectCountry = Effect.fn("AksaraCorpus.projectTryoutCatalogCountry")(
  function* (source: TryoutExamSource, appLocale: AppLocale) {
    const owner = `${source.countryKey}:${appLocale}`;
    const [translation, routeSlug] = yield* Effect.all(
      [
        requireSourceLocale(source.countryTranslations, appLocale, owner),
        requireSourceLocale(source.countryRouteSlugs, appLocale, owner),
      ],
      { concurrency: 2 }
    );
    const graph = yield* makeLearningGraphIdentity({
      appLocale,
      concept: ["tryout", source.countryKey],
      learningObject: ["tryout-country", source.countryKey],
      lens: ["tryout", source.countryKey, "catalog"],
    });
    return {
      ...(translation.description === undefined
        ? {}
        : { description: translation.description }),
      appLocale,
      countryCode: source.countryCode,
      countryKey: source.countryKey,
      graph,
      kind: "country",
      order: source.countryOrder,
      publicPath: `${TRYOUT_PATH}/${routeSlug}`,
      sourceRevision: source.countryRevision,
      title: translation.title,
    };
  }
);

/** Selects one registry-validated owner of each shared country identity. */
function uniqueCountries(sources: readonly TryoutExamSource[]) {
  return [
    ...new Map(sources.map((source) => [source.countryKey, source])).values(),
  ];
}

/** Produces strict hierarchy rows from one validated lifecycle selection. */
const projectCatalog = Effect.fn("AksaraCorpus.projectTryoutCatalogSelection")(
  function* (
    sources: readonly TryoutExamSource[],
    appLocales: readonly AppLocale[]
  ) {
    const countries = yield* Effect.forEach(
      uniqueCountries(sources),
      (source) =>
        Effect.forEach(appLocales, (appLocale) =>
          projectCountry(source, appLocale)
        )
    );
    const exams = yield* Effect.forEach(sources, (source) =>
      Effect.forEach(appLocales, (appLocale) =>
        projectTryoutExam(source, appLocale)
      )
    );
    const rows = yield* Schema.decodeUnknownEffect(
      Schema.Array(TryoutCatalogRowSchema)
    )([...countries.flat(), ...exams.flat(2)], {
      onExcessProperty: "error",
    }).pipe(
      Effect.mapError((cause) => new TryoutCatalogDecodeError({ cause }))
    );
    yield* validateTryoutRoutes(rows);
    return rows;
  }
);

/** Produces strict hierarchy rows for the active signed locale set only. */
export const projectTryoutCatalog = Effect.fn(
  "AksaraCorpus.projectTryoutCatalog"
)(function* (
  sources: readonly TryoutExamSource[],
  appLocales: ActiveAppLocaleList = ACTIVE_APP_LOCALES
) {
  const needsLocaleOverlay = appLocales.some(
    (appLocale) => localeOverlayAppLocaleCode(appLocale) !== undefined
  );
  const localizedSources = needsLocaleOverlay
    ? yield* composeTryoutLocaleRegistry(sources)
    : sources;
  return yield* projectCatalog(localizedSources, appLocales);
});

/** Produces strict hierarchy rows for exact inactive authoring locales only. */
export const projectCandidateTryoutCatalog = Effect.fn(
  "AksaraCorpus.projectCandidateTryoutCatalog"
)(
  (
    sources: readonly LocalizedTryoutExamSource[],
    appLocales: CandidateAppLocaleList = CANDIDATE_APP_LOCALES
  ) => projectCatalog(sources, appLocales)
);

/** Produces only the source hierarchy needed by one honest preview shell. */
export const projectPreviewTryoutCatalog = Effect.fn(
  "AksaraCorpus.projectPreviewTryoutCatalog"
)((sources: readonly TryoutExamSource[], appLocale: AppLocale) =>
  projectCatalog(sources, [appLocale])
);
