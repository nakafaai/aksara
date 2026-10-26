import { CatalogRowSchema } from "@nakafa/aksara-contracts/assessment/catalog";
import { makeLearningGraphIdentity } from "@nakafa/aksara-contracts/graph/identity";
import {
  ACTIVE_APP_LOCALES,
  type AppLocale,
} from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Effect, MutableHashMap, Schema } from "effect";

import { requireSourceLocale } from "#corpus/locale/source";
import { type PaperOf, projectTryoutExam } from "#corpus/tryout/exam";
import { validateTryoutRoutes } from "#corpus/tryout/route";
import type { ExamSource } from "#corpus/tryout/schema";

const TRYOUT_PATH = "try-out";

/** Source-derived hierarchy rows failed their strict publication contract. */
export class TryoutCatalogDecodeError extends Schema.TaggedError<
  TryoutCatalogDecodeError,
  { readonly brand: unique symbol }
>()("TryoutCatalogDecodeError", { cause: Schema.Unknown }) {}

/** Projects one shared country once per locale from country-owned facts. */
const projectCountry = Effect.fn("AksaraCorpus.projectTryoutCatalogCountry")(
  function* (source: ExamSource, appLocale: AppLocale) {
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
function uniqueCountries(sources: readonly ExamSource[]) {
  return [
    ...MutableHashMap.values(
      MutableHashMap.fromIterable(
        Arr.map(sources, (source): [string, ExamSource] => [
          source.countryKey,
          source,
        ])
      )
    ),
  ];
}

/** Produces strict hierarchy rows from one validated locale selection. */
const projectCatalog = Effect.fn("AksaraCorpus.projectTryoutCatalogSelection")(
  function* (
    sources: readonly ExamSource[],
    appLocales: readonly AppLocale[],
    paperOf: PaperOf
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
        projectTryoutExam(source, appLocale, paperOf)
      )
    );
    const rows = yield* Schema.decodeUnknownEffect(
      Schema.Array(CatalogRowSchema)
    )([...Arr.flatten(countries), ...Arr.flatten(Arr.flatten(exams))], {
      onExcessProperty: "error",
    }).pipe(
      Effect.mapError((cause) => new TryoutCatalogDecodeError({ cause }))
    );
    yield* validateTryoutRoutes(rows);
    return rows;
  }
);

/**
 * Produces the catalog rows of every active exam in every active app locale,
 * each set naming the paper that the publisher froze for it.
 */
export const projectTryoutCatalog = Effect.fn(
  "AksaraCorpus.projectTryoutCatalog"
)(function* (sources: readonly ExamSource[], paperOf: PaperOf) {
  return yield* projectCatalog(sources, ACTIVE_APP_LOCALES, paperOf);
});
