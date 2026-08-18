import {
  type LearningGraphSegments,
  makeLearningGraphIdentity,
} from "@nakafa/aksara-contracts/graph/identity";
import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import { Effect } from "effect";

import { requireSourceLocale } from "#corpus/locale/source";
import type { TryoutExamSource } from "#corpus/tryout/schema";

const TRYOUT_PATH = "try-out";
type TryoutTrackSource = TryoutExamSource["tracks"][number];
type TryoutSetSource = TryoutTrackSource["sets"][number];
type TryoutSectionSource = TryoutSetSource["sections"][number];

/** Includes a localized description only when the source authored it. */
function localizedFields(input: {
  readonly description: string | undefined;
  readonly appLocale: AppLocale;
  readonly sourceRevision: string;
  readonly title: string;
}) {
  return {
    ...(input.description === undefined
      ? {}
      : { description: input.description }),
    appLocale: input.appLocale,
    sourceRevision: input.sourceRevision,
    title: input.title,
  };
}

/** Joins canonical route segments without locale or leading slash. */
function publicPath(...segments: readonly string[]) {
  return segments.join("/");
}

/** Counts every question across one source-owned section list. */
function questionCount(sections: readonly TryoutSectionSource[]) {
  return sections.reduce((total, section) => total + section.questionCount, 0);
}

/** Counts only sections that own a physical public route. */
function visibleCount(sections: readonly TryoutSectionSource[]) {
  return sections.filter(({ visibility }) => visibility === "visible").length;
}

/** Derives a signed graph identity from stable source keys, never route slugs. */
function graphIdentity(
  appLocale: AppLocale,
  concept: LearningGraphSegments["concept"],
  learningObject: LearningGraphSegments["learningObject"],
  lens: LearningGraphSegments["lens"]
) {
  return makeLearningGraphIdentity({
    appLocale,
    concept,
    learningObject,
    lens,
  });
}

/** Projects one section, including an internal-entry section without a route. */
const projectSection = Effect.fn("AksaraCorpus.projectTryoutCatalogSection")(
  function* (
    source: TryoutExamSource,
    track: TryoutTrackSource,
    set: TryoutSetSource,
    section: TryoutSectionSource,
    appLocale: AppLocale,
    setPath: string,
    examLens: LearningGraphSegments["lens"]
  ) {
    const owner = `${source.examKey}:${track.key}:${set.key}:${section.key}`;
    const translation = yield* requireSourceLocale(
      section.translations,
      appLocale,
      owner
    );
    const routeSlug =
      section.visibility === "visible"
        ? yield* requireSourceLocale(section.routeSlugs, appLocale, owner)
        : undefined;
    const graph = yield* graphIdentity(
      appLocale,
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
        appLocale,
        description: translation.description,
        sourceRevision: source.sourceRevision,
        title: translation.title,
      }),
      countryKey: source.countryKey,
      examKey: source.examKey,
      graph,
      kind: "section",
      order: section.order,
      ...(routeSlug === undefined
        ? {}
        : { publicPath: publicPath(setPath, routeSlug) }),
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
  appLocale: AppLocale,
  trackPath: string,
  examLens: LearningGraphSegments["lens"]
) {
  const owner = `${source.examKey}:${track.key}:${set.key}`;
  const [routeSlug, translation] = yield* Effect.all(
    [
      requireSourceLocale(set.routeSlugs, appLocale, owner),
      requireSourceLocale(set.translations, appLocale, owner),
    ],
    { concurrency: 2 }
  );
  const setPath = publicPath(trackPath, routeSlug);
  const graph = yield* graphIdentity(
    appLocale,
    [...examLens, track.key, set.key],
    ["tryout-set", source.countryKey, source.examKey, track.key, set.key],
    examLens
  );
  const internalEntry = set.sections.find(
    ({ visibility }) => visibility === "internal-entry"
  );
  const sections = yield* Effect.forEach(set.sections, (section) =>
    projectSection(source, track, set, section, appLocale, setPath, examLens)
  );
  return [
    {
      ...localizedFields({
        appLocale,
        description: translation.description,
        sourceRevision: source.sourceRevision,
        title: translation.title,
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
    appLocale: AppLocale,
    examPath: string,
    examLens: LearningGraphSegments["lens"]
  ) {
    const owner = `${source.examKey}:${track.key}`;
    const [routeSlug, translation] = yield* Effect.all(
      [
        requireSourceLocale(track.routeSlugs, appLocale, owner),
        requireSourceLocale(track.translations, appLocale, owner),
      ],
      { concurrency: 2 }
    );
    const sections = track.sets.flatMap((set) => set.sections);
    const trackPath = publicPath(examPath, routeSlug);
    const graph = yield* graphIdentity(
      appLocale,
      [...examLens, track.key],
      ["tryout-track", source.countryKey, source.examKey, track.key],
      examLens
    );
    const sets = yield* Effect.forEach(track.sets, (set) =>
      projectSet(source, track, set, appLocale, trackPath, examLens)
    );
    return [
      {
        ...localizedFields({
          appLocale,
          description: translation.description,
          sourceRevision: source.sourceRevision,
          title: translation.title,
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
export const projectTryoutExam = Effect.fn(
  "AksaraCorpus.projectTryoutCatalogExam"
)(function* (source: TryoutExamSource, appLocale: AppLocale) {
  const owner = `${source.countryKey}:${source.examKey}`;
  const [countryRouteSlug, examRouteSlug, examTranslation] = yield* Effect.all(
    [
      requireSourceLocale(source.countryRouteSlugs, appLocale, owner),
      requireSourceLocale(source.examRouteSlugs, appLocale, owner),
      requireSourceLocale(source.examTranslations, appLocale, owner),
    ],
    { concurrency: 3 }
  );
  const countryPath = publicPath(TRYOUT_PATH, countryRouteSlug);
  const examPath = publicPath(countryPath, examRouteSlug);
  const examLens: LearningGraphSegments["lens"] = [
    "tryout",
    source.countryKey,
    source.examKey,
  ];
  const graph = yield* graphIdentity(
    appLocale,
    examLens,
    ["tryout-exam", source.countryKey, source.examKey],
    examLens
  );
  const tracks = yield* Effect.forEach(source.tracks, (track) =>
    projectTrack(source, track, appLocale, examPath, examLens)
  );
  return [
    {
      ...localizedFields({
        appLocale,
        description: examTranslation.description,
        sourceRevision: source.sourceRevision,
        title: examTranslation.title,
      }),
      countryKey: source.countryKey,
      examKey: source.examKey,
      graph,
      kind: "exam",
      order: source.examOrder,
      publicPath: examPath,
      scoringStrategy: source.scoringStrategy,
    },
    ...tracks.flat(),
  ];
});
