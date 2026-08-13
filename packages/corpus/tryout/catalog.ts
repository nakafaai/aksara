import { makeLearningGraphIdentity } from "@nakafa/aksara-contracts/graph/identity";
import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocale,
  activeAppLocaleCode,
} from "@nakafa/aksara-contracts/locale";
import { TryoutCatalogRowSchema } from "@nakafa/aksara-contracts/tryout/catalog";
import { Effect, Schema } from "effect";

import { projectTryoutExam } from "#corpus/tryout/catalog-exam";
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
  function* (source: TryoutExamSource, appLocale: ActiveAppLocale) {
    const appLocaleCode = activeAppLocaleCode(appLocale);
    const graph = yield* makeLearningGraphIdentity({
      appLocale,
      concept: ["tryout", source.countryKey],
      learningObject: ["tryout-country", source.countryKey],
      lens: ["tryout", source.countryKey, "catalog"],
    });
    const translation = source.countryTranslations[appLocaleCode];
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
      publicPath: `${TRYOUT_PATH}/${source.countryRouteSlugs[appLocaleCode]}`,
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

/** Produces strict hierarchy rows from one validated try-out registry. */
export const projectTryoutCatalog = Effect.fn(
  "AksaraCorpus.projectTryoutCatalog"
)(function* (sources: readonly TryoutExamSource[]) {
  const countries = yield* Effect.forEach(uniqueCountries(sources), (source) =>
    Effect.forEach(ACTIVE_APP_LOCALES, (appLocale) =>
      projectCountry(source, appLocale)
    )
  );
  const exams = yield* Effect.forEach(sources, (source) =>
    Effect.forEach(ACTIVE_APP_LOCALES, (appLocale) =>
      projectTryoutExam(source, appLocale)
    )
  );
  const rows = yield* Schema.decodeUnknown(
    Schema.Array(TryoutCatalogRowSchema)
  )([...countries.flat(), ...exams.flat(2)], {
    onExcessProperty: "error",
  }).pipe(Effect.mapError((cause) => new TryoutCatalogDecodeError({ cause })));
  yield* validateTryoutRoutes(rows);
  return rows;
});
