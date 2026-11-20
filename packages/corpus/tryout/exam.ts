import type { LearningGraphSegments } from "@nakafa/aksara-contracts/graph/identity";
import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Effect, Result } from "effect";

import { requireSourceLocale } from "#corpus/locale/source";
import {
  graphIdentity,
  localizedFields,
  publicPath,
  servedLocales,
} from "#corpus/tryout/row";
import type { ExamSource, GroupSource } from "#corpus/tryout/schema";
import type { PaperOf, ServedTrack } from "#corpus/tryout/track";
import { projectTrack, serves, serveTrack } from "#corpus/tryout/track";

const TRYOUT_PATH = "try-out";

/** Freezes every track of one exam and serves the exam wherever one of its sets is written. */
export const serveTryoutExam = Effect.fn("AksaraCorpus.serveTryoutExam")(
  function* (source: ExamSource, paperOf: PaperOf) {
    const tracks = yield* Effect.forEach(source.tracks, (track) =>
      serveTrack(source, track, paperOf)
    );
    return {
      appLocales: servedLocales(
        Arr.map(tracks, ({ appLocales }) => appLocales)
      ),
      source,
      tracks,
    };
  }
);

/** One exam with its served tracks and the locales they are served in together. */
export type ServedExam = Effect.Success<ReturnType<typeof serveTryoutExam>>;

/** Projects one group of an exam with its route, and the tracks it serves in one locale. */
const projectGroup = Effect.fn("AksaraCorpus.projectTryoutCatalogGroup")(
  function* (
    source: ExamSource,
    group: GroupSource,
    tracks: readonly ServedTrack[],
    appLocale: AppLocale,
    examPath: string,
    examLens: LearningGraphSegments["lens"]
  ) {
    const owner = `${source.examKey}:${group.key}`;
    const [routeSlug, translation] = yield* Effect.all(
      [
        requireSourceLocale(group.routeSlugs, appLocale, owner),
        requireSourceLocale(group.translations, appLocale, owner),
      ],
      { concurrency: 2 }
    );
    const groupPath = publicPath(examPath, routeSlug);
    const graph = yield* graphIdentity(
      appLocale,
      [...examLens, "group", group.key],
      ["tryout-group", source.countryKey, source.examKey, group.key],
      examLens
    );
    const projected = yield* Effect.forEach(
      Arr.filter(tracks, (served) => serves(served, appLocale)),
      (served) => projectTrack(source, served, appLocale, groupPath, examLens)
    );
    return [
      {
        ...localizedFields({
          appLocale,
          appLocales: servedLocales(
            Arr.map(tracks, ({ appLocales }) => appLocales)
          ),
          description: translation.description,
          sourceRevision: source.sourceRevision,
          title: translation.title,
        }),
        countryKey: source.countryKey,
        examKey: source.examKey,
        graph,
        groupKey: group.key,
        kind: "group",
        order: group.order,
        publicPath: groupPath,
      },
      ...Arr.flatten(projected),
    ];
  }
);

/** Projects one localized exam and every child row it serves in that locale. */
export const projectTryoutExam = Effect.fn(
  "AksaraCorpus.projectTryoutCatalogExam"
)(function* (served: ServedExam, appLocale: AppLocale) {
  const { source } = served;
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
  const groups = yield* Effect.forEach(
    Arr.filterMap(source.grouping.groups, (group) => {
      const tracks = Arr.filter(
        served.tracks,
        ({ track }) => track.group === group.key
      );
      return Arr.some(tracks, (track) => serves(track, appLocale))
        ? Result.succeed({ group, tracks })
        : Result.failVoid;
    }),
    ({ group, tracks }) =>
      projectGroup(source, group, tracks, appLocale, examPath, examLens)
  );
  return [
    {
      ...localizedFields({
        appLocale,
        appLocales: served.appLocales,
        description: examTranslation.description,
        sourceRevision: source.sourceRevision,
        title: source.examName,
      }),
      countryKey: source.countryKey,
      examKey: source.examKey,
      graph,
      groupAxis: source.grouping.axis,
      kind: "exam",
      order: source.examOrder,
      publicPath: examPath,
    },
    ...Arr.flatten(groups),
  ];
});
