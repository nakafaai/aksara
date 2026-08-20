import { Effect, Schema } from "effect";

import {
  type LocaleOverlayAppLocale,
  LocaleOverlayAppLocaleSchema,
} from "#corpus/locale/source";
import { indonesiaGermanCountry } from "#corpus/tryout/indonesia/locale/de";
import {
  snbtGermanExam,
  snbtGermanSections,
  snbtGermanSet,
} from "#corpus/tryout/indonesia/snbt/locale/de";
import {
  tkaGermanExam,
  tkaGermanSet,
} from "#corpus/tryout/indonesia/tka/locale/de";
import {
  composeTryoutLocaleExam,
  TryoutLocaleExamSchema,
  TryoutLocaleOwnershipError,
} from "#corpus/tryout/locale";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";
import type { TryoutExamSource } from "#corpus/tryout/schema";

const GERMAN_APP_LOCALE = Schema.decodeSync(LocaleOverlayAppLocaleSchema)("de");

/** Returns one German SNBT section copy by stable section identity. */
const germanSnbtSection = Effect.fn("AksaraCorpus.germanSnbtSection")(
  function* (examKey: string, sectionKey: string) {
    const entry = Object.entries(snbtGermanSections).find(
      ([key]) => key === sectionKey
    );
    if (entry === undefined) {
      return yield* new TryoutLocaleOwnershipError({
        examKey,
        key: sectionKey,
        scope: "section",
      });
    }
    return entry[1];
  }
);

/** Builds strict German copy for one source-owned exam hierarchy. */
const germanTryoutExam = Effect.fn("AksaraCorpus.germanTryoutExam")(function* (
  source: TryoutExamSource,
  appLocale: LocaleOverlayAppLocale
) {
  if (source.examKey === "snbt") {
    const tracks = yield* Effect.forEach(source.tracks, (track) =>
      Effect.gen(function* () {
        const sets = yield* Effect.forEach(track.sets, (set) =>
          Effect.gen(function* () {
            const sections = yield* Effect.forEach(set.sections, (section) =>
              Effect.gen(function* () {
                const copy = yield* germanSnbtSection(
                  source.examKey,
                  section.key
                );
                return {
                  key: section.key,
                  routeSlug: copy.routeSlug,
                  translation: { title: copy.title },
                };
              })
            );
            const copy = snbtGermanSet(set.order);
            return {
              key: set.key,
              routeSlug: copy.routeSlug,
              sections,
              translation: { title: copy.title },
            };
          })
        );
        return {
          key: track.key,
          routeSlug: snbtGermanExam.trackRouteSlug,
          sets,
          translation: { title: snbtGermanExam.trackTitle },
        };
      })
    );
    return yield* Schema.decodeEffect(TryoutLocaleExamSchema)(
      {
        appLocale,
        country: {
          key: source.countryKey,
          routeSlug: indonesiaGermanCountry.routeSlug,
          translation: indonesiaGermanCountry.translation,
        },
        exam: {
          key: source.examKey,
          routeSlug: snbtGermanExam.routeSlug,
          translation: {
            description: snbtGermanExam.description,
            title: snbtGermanExam.title,
          },
        },
        tracks,
      },
      { onExcessProperty: "error" }
    );
  }
  if (source.examKey === "tka") {
    const tracks = source.tracks.map((track) => ({
      key: track.key,
      routeSlug: tkaGermanExam.mathematicsRouteSlug,
      sets: track.sets.map((set) => {
        const copy = tkaGermanSet(set.order);
        return {
          key: set.key,
          routeSlug: copy.routeSlug,
          sections: set.sections.map((section) => ({
            key: section.key,
            routeSlug: tkaGermanExam.mathematicsRouteSlug,
            translation: { title: tkaGermanExam.mathematicsTitle },
          })),
          translation: { title: copy.title },
        };
      }),
      translation: { title: tkaGermanExam.mathematicsTitle },
    }));
    return yield* Schema.decodeEffect(TryoutLocaleExamSchema)(
      {
        appLocale,
        country: {
          key: source.countryKey,
          routeSlug: indonesiaGermanCountry.routeSlug,
          translation: indonesiaGermanCountry.translation,
        },
        exam: {
          key: source.examKey,
          routeSlug: tkaGermanExam.examRouteSlug,
          translation: {
            description: tkaGermanExam.description,
            title: tkaGermanExam.examTitle,
          },
        },
        tracks,
      },
      { onExcessProperty: "error" }
    );
  }
  return yield* new TryoutLocaleOwnershipError({
    examKey: source.examKey,
    key: source.examKey,
    scope: "exam",
  });
});

/** Returns the complete reviewed locale hierarchy independently of activation. */
export const decodeTryoutLocaleRegistry = Effect.fn(
  "AksaraCorpus.decodeTryoutLocaleRegistry"
)(function* () {
  const sources = yield* decodeTryoutRegistry();
  return yield* composeTryoutLocaleRegistry(sources);
});

/** Composes every permanent locale overlay needed by selected app locales. */
export const composeTryoutLocaleRegistry = Effect.fn(
  "AksaraCorpus.composeTryoutLocaleRegistry"
)(function* (sources: readonly TryoutExamSource[]) {
  return yield* Effect.forEach(sources, (source) =>
    germanTryoutExam(source, GERMAN_APP_LOCALE).pipe(
      Effect.flatMap((overlay) => composeTryoutLocaleExam(source, overlay))
    )
  );
});
