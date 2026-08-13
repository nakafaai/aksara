import type { CorpusSourcePath } from "@nakafa/aksara-contracts/ids";
import type {
  ActiveAppLocaleList,
  AppLocale,
} from "@nakafa/aksara-contracts/locale";
import { Effect } from "effect";

import {
  corpusPath,
  makeReviewRequirement,
  StructuredReviewSourceError,
} from "#corpus/editorial/model";
import { QURAN_SOURCE_POLICY } from "#corpus/quran/source/policy";

const QURAN_SOURCE_ROOT = "quran/sources";

/** Resolves one pinned Quran source to its tracked repository path. */
function quranSourcePath(path: string) {
  return corpusPath(`${QURAN_SOURCE_ROOT}/${path}`);
}

/** Returns every exact locale-owned immutable Quran source. */
function quranLocalePaths(
  appLocale: AppLocale
): Effect.Effect<readonly CorpusSourcePath[], StructuredReviewSourceError> {
  if (appLocale === "en") {
    return Effect.succeed([
      quranSourcePath(QURAN_SOURCE_POLICY.data.english.path),
    ]);
  }
  if (appLocale === "id") {
    return Effect.succeed([
      quranSourcePath(QURAN_SOURCE_POLICY.data.indonesian.path),
      ...Array.from({ length: 114 }, (_, index) =>
        quranSourcePath(
          `${QURAN_SOURCE_POLICY.tafsir.directory}/${index + 1}.json`
        )
      ),
    ]);
  }
  return Effect.fail(
    new StructuredReviewSourceError({
      cause: "German Quran source policy is not pinned.",
      family: "quran",
      sourcePath: quranSourcePath("quranenc/de.xml"),
    })
  );
}

/** Derives immutable Quran and authored provenance review requirements. */
export const loadQuranReviewRequirements = Effect.fn(
  "AksaraCorpus.loadQuranReviewRequirements"
)(function* (activeAppLocales: ActiveAppLocaleList) {
  const tanzilTerms = quranSourcePath(QURAN_SOURCE_POLICY.terms.tanzil.path);
  const quranencTerms = quranSourcePath(
    QURAN_SOURCE_POLICY.terms.quranenc.path
  );
  const shared = [
    quranSourcePath(QURAN_SOURCE_POLICY.data.arabic.path),
    quranSourcePath(QURAN_SOURCE_POLICY.data.metadata.path),
  ];
  const requirements = yield* Effect.forEach(
    activeAppLocales,
    (appLocale) =>
      quranLocalePaths(appLocale).pipe(
        Effect.map((localized) => {
          const official = [...shared, ...localized];
          return [
            ...official.map((targetPath) =>
              makeReviewRequirement({
                appLocale,
                requiredSourcePaths: [
                  targetPath.includes("/tanzil/") ? tanzilTerms : quranencTerms,
                ],
                reviewMode: "immutable-official-source",
                targetPath,
              })
            ),
            makeReviewRequirement({
              appLocale,
              requiredSourcePaths: [...official, quranencTerms, tanzilTerms],
              reviewMode: "authored-humanizer-review",
              targetPath: corpusPath("quran/provenance.ts"),
            }),
          ];
        })
      ),
    { concurrency: "unbounded" }
  );
  return requirements.flat();
});
