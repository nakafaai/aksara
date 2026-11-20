import { CatalogRowSchema } from "@nakafa/aksara-contracts/assessment/catalog";
import { makeLearningGraphIdentity } from "@nakafa/aksara-contracts/graph/identity";
import type {
  ActiveAppLocale,
  AppLocale,
} from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Effect, MutableHashMap, Schema } from "effect";

import { requireSourceLocale } from "#corpus/locale/source";
import type { ServedExam } from "#corpus/tryout/exam";
import { projectTryoutExam, serveTryoutExam } from "#corpus/tryout/exam";
import { validateTryoutRoutes } from "#corpus/tryout/route";
import { servedLocales } from "#corpus/tryout/row";
import type { ExamSource } from "#corpus/tryout/schema";
import type { PaperOf } from "#corpus/tryout/track";

const TRYOUT_PATH = "try-out";

/** Source-derived hierarchy rows failed their strict publication contract. */
export class TryoutCatalogDecodeError extends Schema.TaggedError<
  TryoutCatalogDecodeError,
  { readonly brand: unique symbol }
>()("TryoutCatalogDecodeError", { cause: Schema.Unknown }) {}

/** Projects one shared country once per locale from country-owned facts. */
const projectCountry = Effect.fn("AksaraCorpus.projectTryoutCatalogCountry")(
  function* (
    source: ExamSource,
    appLocale: AppLocale,
    appLocales: readonly ActiveAppLocale[]
  ) {
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
      appLocales,
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

/**
 * Selects one registry-validated owner of each shared country identity, served
 * wherever one of its exams is.
 */
function uniqueCountries(exams: readonly ServedExam[]) {
  const owners = MutableHashMap.fromIterable(
    Arr.map(exams, (exam): [string, ExamSource] => [
      exam.source.countryKey,
      exam.source,
    ])
  );
  return Arr.map([...MutableHashMap.values(owners)], (source) => ({
    appLocales: servedLocales(
      Arr.map(
        Arr.filter(
          exams,
          (exam) => exam.source.countryKey === source.countryKey
        ),
        ({ appLocales }) => appLocales
      )
    ),
    source,
  }));
}

/**
 * Produces the catalog rows of every active exam, each node in exactly the
 * locales the sets beneath it are written in, and each set naming the paper
 * that the publisher froze for it. A locale without a set of an exam shows
 * neither the exam nor a country that holds no other exam in it.
 */
export const projectTryoutCatalog = Effect.fn(
  "AksaraCorpus.projectTryoutCatalog"
)(function* (sources: readonly ExamSource[], paperOf: PaperOf) {
  const exams = yield* Effect.forEach(sources, (source) =>
    serveTryoutExam(source, paperOf)
  );
  const countries = yield* Effect.forEach(
    uniqueCountries(exams),
    ({ appLocales, source }) =>
      Effect.forEach(appLocales, (appLocale) =>
        projectCountry(source, appLocale, appLocales)
      )
  );
  const examRows = yield* Effect.forEach(exams, (exam) =>
    Effect.forEach(exam.appLocales, (appLocale) =>
      projectTryoutExam(exam, appLocale)
    )
  );
  const rows = yield* Schema.decodeUnknownEffect(
    Schema.Array(CatalogRowSchema)
  )([...Arr.flatten(countries), ...Arr.flatten(Arr.flatten(examRows))], {
    onExcessProperty: "error",
  }).pipe(Effect.mapError((cause) => new TryoutCatalogDecodeError({ cause })));
  yield* validateTryoutRoutes(rows);
  return rows;
});
