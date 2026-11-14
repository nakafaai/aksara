import type { LearningGraphSegments } from "@nakafa/aksara-contracts/graph/identity";
import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Effect } from "effect";

import { requireSourceLocale } from "#corpus/locale/source";
import { graphIdentity, localizedFields, publicPath } from "#corpus/tryout/row";
import type { ExamSource, GroupSource } from "#corpus/tryout/schema";
import { type PaperOf, projectTrack } from "#corpus/tryout/track";

const TRYOUT_PATH = "try-out";

/** Projects one group of an exam with its route, and the tracks it holds. */
const projectGroup = Effect.fn("AksaraCorpus.projectTryoutCatalogGroup")(
  function* (
    source: ExamSource,
    group: GroupSource,
    appLocale: AppLocale,
    examPath: string,
    examLens: LearningGraphSegments["lens"],
    paperOf: PaperOf
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
    const tracks = yield* Effect.forEach(
      Arr.filter(source.tracks, (track) => track.group === group.key),
      (track) =>
        projectTrack(source, track, appLocale, groupPath, examLens, paperOf)
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
        groupKey: group.key,
        kind: "group",
        order: group.order,
        publicPath: groupPath,
      },
      ...Arr.flatten(tracks),
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
  const groups = yield* Effect.forEach(source.grouping.groups, (group) =>
    projectGroup(source, group, appLocale, examPath, examLens, paperOf)
  );
  return [
    {
      ...localizedFields({
        appLocale,
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
