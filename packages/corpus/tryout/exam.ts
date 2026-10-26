import {
  type LearningGraphSegments,
  makeLearningGraphIdentity,
} from "@nakafa/aksara-contracts/graph/identity";
import type { Sha256Hash } from "@nakafa/aksara-contracts/ids";
import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Effect, Option, Schema } from "effect";

import { requireSourceLocale } from "#corpus/locale/source";
import { profileId } from "#corpus/tryout/profile";
import type {
  ExamSource,
  SectionSource,
  SetSource,
  TrackSource,
} from "#corpus/tryout/schema";

const TRYOUT_PATH = "try-out";

/** The frozen paper of a set, by its identifier: the publisher freezes each one. */
export type PaperOf = (
  id: string
) => Option.Option<{ readonly hash: Sha256Hash; readonly id: string }>;

/** The publisher froze no paper for a set of the catalog. */
export class CatalogPaperError extends Schema.TaggedError<
  CatalogPaperError,
  { readonly brand: unique symbol }
>()("CatalogPaperError", { paper: Schema.String }) {}

/** The identifier of the paper of one set: its track's profile and its own key. */
export function paperId(exam: ExamSource, track: TrackSource, set: SetSource) {
  return `${profileId(exam, track)}/${set.key}`;
}

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
  return Arr.join(segments, "/");
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
    source: ExamSource,
    track: TrackSource,
    set: SetSource,
    section: SectionSource,
    order: number,
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
      section.routeSlugs === undefined
        ? undefined
        : yield* requireSourceLocale(section.routeSlugs, appLocale, owner);
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
      order,
      ...(routeSlug === undefined
        ? {}
        : { publicPath: publicPath(setPath, routeSlug) }),
      sectionKey: section.key,
      setKey: set.key,
      trackKey: track.key,
      visibility: section.visibility,
    };
  }
);

/** Projects one set and all of its source-owned sections. */
const projectSet = Effect.fn("AksaraCorpus.projectTryoutCatalogSet")(function* (
  source: ExamSource,
  track: TrackSource,
  set: SetSource,
  appLocale: AppLocale,
  trackPath: string,
  examLens: LearningGraphSegments["lens"],
  paperOf: PaperOf
) {
  const owner = `${source.examKey}:${track.key}:${set.key}`;
  const id = paperId(source, track, set);
  const paper = yield* Effect.fromOption(paperOf(id)).pipe(
    Effect.mapError(() => new CatalogPaperError({ paper: id }))
  );
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
  const { sections: authored } = track.profile;
  const internalEntry = Arr.findFirst(
    authored,
    ({ visibility }) => visibility === "internal-entry"
  );
  const sections = yield* Effect.forEach(authored, (section, index) =>
    projectSection(
      source,
      track,
      set,
      section,
      index + 1,
      appLocale,
      setPath,
      examLens
    )
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
      ...(Option.isNone(internalEntry)
        ? {}
        : { internalEntrySectionKey: internalEntry.value.key }),
      kind: "set",
      order: set.order,
      paper,
      publicPath: setPath,
      setKey: set.key,
      trackKey: track.key,
    },
    ...sections,
  ];
});

/** Projects one track and its complete active set hierarchy. */
const projectTrack = Effect.fn("AksaraCorpus.projectTryoutCatalogTrack")(
  function* (
    source: ExamSource,
    track: TrackSource,
    appLocale: AppLocale,
    examPath: string,
    examLens: LearningGraphSegments["lens"],
    paperOf: PaperOf
  ) {
    const owner = `${source.examKey}:${track.key}`;
    const [routeSlug, translation] = yield* Effect.all(
      [
        requireSourceLocale(track.routeSlugs, appLocale, owner),
        requireSourceLocale(track.translations, appLocale, owner),
      ],
      { concurrency: 2 }
    );
    const trackPath = publicPath(examPath, routeSlug);
    const graph = yield* graphIdentity(
      appLocale,
      [...examLens, track.key],
      ["tryout-track", source.countryKey, source.examKey, track.key],
      examLens
    );
    const sets = yield* Effect.forEach(track.sets, (set) =>
      projectSet(source, track, set, appLocale, trackPath, examLens, paperOf)
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
        trackKey: track.key,
        trackKind: track.kind,
      },
      ...Arr.flatten(sets),
    ];
  }
);

/** Projects one localized exam and every active child hierarchy row. */
export const projectTryoutExam = Effect.fn(
  "AksaraCorpus.projectTryoutCatalogExam"
)(function* (source: ExamSource, appLocale: AppLocale, paperOf: PaperOf) {
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
    projectTrack(source, track, appLocale, examPath, examLens, paperOf)
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
    },
    ...Arr.flatten(tracks),
  ];
});
