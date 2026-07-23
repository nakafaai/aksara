import { ContentLocaleSchema } from "@nakafa/aksara-contracts/content";
import {
  type LearningGraphSegments,
  makeLearningGraphIdentity,
} from "@nakafa/aksara-contracts/graph/identity";
import { TryoutCatalogRowSchema } from "@nakafa/aksara-contracts/tryout/spec";
import { Effect, Schema } from "effect";
import type { TryoutExamSource } from "#corpus/tryout/schema";

const TRYOUT_PATH = "try-out";
type TryoutTrackSource = TryoutExamSource["tracks"][number];
type TryoutSetSource = TryoutTrackSource["sets"][number];
type TryoutSectionSource = TryoutSetSource["sections"][number];
type TryoutLocale = typeof ContentLocaleSchema.Type;
/** Source-derived hierarchy rows failed their strict publication contract. */
export class TryoutCatalogDecodeError extends Schema.TaggedError<TryoutCatalogDecodeError>()(
  "TryoutCatalogDecodeError",
  { cause: Schema.Unknown }
) {}
/** Includes a localized description only when the source authored it. */
function localizedFields(input: {
  readonly description: string | undefined;
  readonly locale: TryoutLocale;
  readonly sourceRevision: string;
  readonly title: string;
}) {
  return {
    ...(input.description === undefined
      ? {}
      : { description: input.description }),
    locale: input.locale,
    sourceRevision: input.sourceRevision,
    title: input.title,
  };
}
/** Joins canonical route segments without locale or leading slash. */
function publicPath(...segments: readonly string[]) {
  return segments.join("/");
}
/** Counts every question across one source-owned section list. */
function questionCount(
  sections: readonly { readonly questionCount: number }[]
) {
  return sections.reduce((total, section) => total + section.questionCount, 0);
}
/** Counts only sections that own a physical public route. */
function visibleCount(
  sections: readonly { readonly visibility: "internal-entry" | "visible" }[]
) {
  return sections.filter(({ visibility }) => visibility === "visible").length;
}
/** Derives a signed graph identity from stable source keys, never route slugs. */
function graphIdentity(
  locale: TryoutLocale,
  concept: LearningGraphSegments["concept"],
  learningObject: LearningGraphSegments["learningObject"],
  lens: LearningGraphSegments["lens"]
) {
  return makeLearningGraphIdentity({
    concept,
    learningObject,
    lens,
    locale,
  });
}
/** Projects one section, including an internal-entry section without a route. */
const projectSection = Effect.fn("AksaraCorpus.projectTryoutCatalogSection")(
  function* (
    source: TryoutExamSource,
    track: TryoutTrackSource,
    set: TryoutSetSource,
    section: TryoutSectionSource,
    locale: TryoutLocale,
    setPath: string,
    examLens: LearningGraphSegments["lens"]
  ) {
    const graph = yield* graphIdentity(
      locale,
      [...examLens, track.key, section.key],
      [
        "tryout-section",
        source.countryKey,
        source.examKey,
        track.key,
        set.key,
        section.key,
      ],
      examLens
    );
    return {
      ...localizedFields({
        description: section.translations[locale].description,
        locale,
        sourceRevision: source.sourceRevision,
        title: section.translations[locale].title,
      }),
      countryKey: source.countryKey,
      examKey: source.examKey,
      graph,
      kind: "section",
      order: section.order,
      ...(section.visibility === "visible"
        ? {
            publicPath: publicPath(setPath, section.routeSlugs[locale]),
          }
        : {}),
      questionCount: section.questionCount,
      questionSourcePath: `packages/corpus/${section.questionSourcePath}`,
      sectionKey: section.key,
      setKey: set.key,
      timeLimitSeconds: section.timeLimitSeconds,
      trackKey: track.key,
      visibility: section.visibility,
    };
  }
);
/** Projects one set and all of its source-owned sections. */
const projectSet = Effect.fn("AksaraCorpus.projectTryoutCatalogSet")(function* (
  source: TryoutExamSource,
  track: TryoutTrackSource,
  set: TryoutSetSource,
  locale: TryoutLocale,
  trackPath: string,
  examLens: LearningGraphSegments["lens"]
) {
  const setPath = publicPath(trackPath, set.routeSlugs[locale]);
  const graph = yield* graphIdentity(
    locale,
    [...examLens, track.key, set.key],
    ["tryout-set", source.countryKey, source.examKey, track.key, set.key],
    examLens
  );
  const internalEntry = set.sections.find(
    ({ visibility }) => visibility === "internal-entry"
  );
  const sections = yield* Effect.forEach(set.sections, (section) =>
    projectSection(source, track, set, section, locale, setPath, examLens)
  );
  return [
    {
      ...localizedFields({
        description: set.translations[locale].description,
        locale,
        sourceRevision: source.sourceRevision,
        title: set.translations[locale].title,
      }),
      countryKey: source.countryKey,
      examKey: source.examKey,
      graph,
      ...(internalEntry === undefined
        ? {}
        : { internalEntrySectionKey: internalEntry.key }),
      kind: "set",
      order: set.order,
      publicPath: setPath,
      questionCount: questionCount(set.sections),
      scoringStrategy: source.scoringStrategy,
      sectionCount: set.sections.length,
      setKey: set.key,
      trackKey: track.key,
      visibleSectionCount: visibleCount(set.sections),
    },
    ...sections,
  ];
});
/** Projects one track and its complete active set hierarchy. */
const projectTrack = Effect.fn("AksaraCorpus.projectTryoutCatalogTrack")(
  function* (
    source: TryoutExamSource,
    track: TryoutTrackSource,
    locale: TryoutLocale,
    examPath: string,
    examLens: LearningGraphSegments["lens"]
  ) {
    const sections = track.sets.flatMap((set) => set.sections);
    const trackPath = publicPath(examPath, track.routeSlugs[locale]);
    const graph = yield* graphIdentity(
      locale,
      [...examLens, track.key],
      ["tryout-track", source.countryKey, source.examKey, track.key],
      examLens
    );
    const sets = yield* Effect.forEach(track.sets, (set) =>
      projectSet(source, track, set, locale, trackPath, examLens)
    );
    return [
      {
        ...localizedFields({
          description: track.translations[locale].description,
          locale,
          sourceRevision: source.sourceRevision,
          title: track.translations[locale].title,
        }),
        countryKey: source.countryKey,
        examKey: source.examKey,
        graph,
        kind: "track",
        order: track.order,
        publicPath: trackPath,
        questionCount: questionCount(sections),
        sectionCount: sections.length,
        setCount: track.sets.length,
        trackKey: track.key,
        trackKind: track.kind,
        visibleSectionCount: visibleCount(sections),
      },
      ...sets.flat(),
    ];
  }
);

/** Projects one localized exam and every active child hierarchy row. */
const projectExam = Effect.fn("AksaraCorpus.projectTryoutCatalogExam")(
  function* (source: TryoutExamSource, locale: TryoutLocale) {
    const countryPath = publicPath(
      TRYOUT_PATH,
      source.countryRouteSlugs[locale]
    );
    const examPath = publicPath(countryPath, source.examRouteSlugs[locale]);
    const examLens: LearningGraphSegments["lens"] = [
      "tryout",
      source.countryKey,
      source.examKey,
    ];
    const graph = yield* graphIdentity(
      locale,
      examLens,
      ["tryout-exam", source.countryKey, source.examKey],
      examLens
    );
    const tracks = yield* Effect.forEach(source.tracks, (track) =>
      projectTrack(source, track, locale, examPath, examLens)
    );
    return [
      {
        ...localizedFields({
          description: source.examTranslations[locale].description,
          locale,
          sourceRevision: source.sourceRevision,
          title: source.examTranslations[locale].title,
        }),
        countryKey: source.countryKey,
        examKey: source.examKey,
        graph,
        kind: "exam",
        publicPath: examPath,
        scoringStrategy: source.scoringStrategy,
      },
      ...tracks.flat(),
    ];
  }
);

/** Projects one shared country once per locale from its first stable owner. */
const projectCountry = Effect.fn("AksaraCorpus.projectTryoutCatalogCountry")(
  function* (source: TryoutExamSource, locale: TryoutLocale) {
    const graph = yield* graphIdentity(
      locale,
      ["tryout", source.countryKey],
      ["tryout-country", source.countryKey],
      ["tryout", source.countryKey, "catalog"]
    );
    return {
      ...localizedFields({
        description: source.countryTranslations[locale].description,
        locale,
        sourceRevision: source.sourceRevision,
        title: source.countryTranslations[locale].title,
      }),
      countryCode: source.countryCode,
      countryKey: source.countryKey,
      graph,
      kind: "country",
      publicPath: publicPath(TRYOUT_PATH, source.countryRouteSlugs[locale]),
    };
  }
);

/** Selects the first validated owner of each shared country identity. */
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
    Effect.forEach(ContentLocaleSchema.literals, (locale) =>
      projectCountry(source, locale)
    )
  );
  const exams = yield* Effect.forEach(sources, (source) =>
    Effect.forEach(ContentLocaleSchema.literals, (locale) =>
      projectExam(source, locale)
    )
  );
  return yield* Schema.decodeUnknown(Schema.Array(TryoutCatalogRowSchema))(
    [...countries.flat(), ...exams.flat(2)],
    {
      onExcessProperty: "error",
    }
  ).pipe(
    Effect.mapError(
      (cause) =>
        new TryoutCatalogDecodeError({
          cause,
        })
    )
  );
});
