import { FileSystem, Path } from "@effect/platform";
import {
  type CorpusSourcePath,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import type { ActiveAppLocaleList } from "@nakafa/aksara-contracts/locale";
import type { ContentSnapshotKind } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Effect } from "effect";

import { decodeArticleSources } from "#corpus/articles/source";
import { decodeCurriculumCatalog } from "#corpus/curriculum/source";
import {
  authoredRequirements,
  canonicalPaths,
  compareReviewRequirements,
  corpusPath,
  makeReviewRequirement,
  StructuredReviewSourceError,
} from "#corpus/editorial/model";
import { loadQuranReviewRequirements } from "#corpus/editorial/quran";
import { decodeMaterialSources } from "#corpus/material/source";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

const TEAM_SOURCE_PATH = "team/source.ts";

/** Reads every authored TypeScript file below one source-owned directory. */
const readAuthoredFiles = Effect.fn("AksaraCorpus.readAuthoredReviewFiles")(
  function* (
    checkoutRoot: string,
    family: ContentSnapshotKind,
    directory: CorpusSourcePath
  ) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const entries = yield* fileSystem
      .readDirectory(path.join(checkoutRoot, directory), { recursive: true })
      .pipe(
        Effect.mapError(
          (cause) =>
            new StructuredReviewSourceError({
              cause,
              family,
              sourcePath: directory,
            })
        )
      );
    return entries
      .filter((entry) => entry.endsWith(".ts") && !entry.endsWith(".test.ts"))
      .map((entry) =>
        CorpusSourcePathSchema.make(
          `${directory}/${entry.split(path.sep).join("/")}`
        )
      );
  }
);

/** Derives every authored source that contributes to a Program snapshot. */
const programSourcePaths = Effect.fn("AksaraCorpus.programReviewSources")(
  function* (checkoutRoot: string) {
    const [curricula, materials] = yield* Effect.all(
      [decodeCurriculumCatalog(), decodeMaterialSources()],
      { concurrency: 2 }
    );
    const curriculumFiles = yield* Effect.forEach(
      curricula,
      ({ programKey }) =>
        readAuthoredFiles(
          checkoutRoot,
          "program",
          corpusPath(`curriculum/${programKey}`)
        ),
      { concurrency: "unbounded" }
    );
    const materialFiles = yield* Effect.forEach(
      canonicalPaths(materials.map(({ assetRoot }) => corpusPath(assetRoot))),
      (assetRoot) => readAuthoredFiles(checkoutRoot, "program", assetRoot),
      { concurrency: "unbounded" }
    );
    return canonicalPaths([
      corpusPath("material/domain.ts"),
      corpusPath("program/exam.ts"),
      corpusPath("program/school.ts"),
      ...curriculumFiles.flat(),
      ...materialFiles.flat(),
    ]);
  }
);

/** Derives every article metadata target and its exact companion sources. */
export const loadArticleReviewRequirements = Effect.fn(
  "AksaraCorpus.loadArticleReviewRequirements"
)(function* (activeAppLocales: ActiveAppLocaleList) {
  const articles = yield* decodeArticleSources();
  const categoryPaths = canonicalPaths(
    articles.map(({ category }) =>
      corpusPath(`articles/${category.key}/category.ts`)
    )
  );
  const categoryRequirements = authoredRequirements(
    categoryPaths,
    activeAppLocales
  );
  const articleRequirements = articles.flatMap(({ category, sourceRoot }) => {
    const targetPath = corpusPath(`${sourceRoot}/source.ts`);
    const requiredSourcePaths = canonicalPaths([
      corpusPath(`articles/${category.key}/category.ts`),
      corpusPath(`${sourceRoot}/ref.ts`),
      corpusPath(TEAM_SOURCE_PATH),
    ]);
    return activeAppLocales.map((appLocale) =>
      makeReviewRequirement({
        appLocale,
        requiredSourcePaths,
        reviewMode: "authored-humanizer-review",
        targetPath,
      })
    );
  });
  return [...categoryRequirements, ...articleRequirements].sort(
    compareReviewRequirements
  );
});

/** Derives every authored source that contributes to a Try-out snapshot. */
const tryoutSourcePaths = Effect.fn("AksaraCorpus.tryoutReviewSources")(
  function* () {
    const exams = yield* decodeTryoutRegistry();
    return canonicalPaths(
      exams.flatMap(({ countryKey, examKey }) => [
        corpusPath(`tryout/${countryKey}/country.ts`),
        corpusPath(`tryout/${countryKey}/${examKey}/source.ts`),
      ])
    );
  }
);

/** Loads one canonical review inventory for selected structured snapshots. */
export const loadStructuredReviewRequirements = Effect.fn(
  "AksaraCorpus.loadStructuredReviewRequirements"
)(function* (input: {
  readonly activeAppLocales: ActiveAppLocaleList;
  readonly checkoutRoot: string;
  readonly families: readonly ContentSnapshotKind[];
}) {
  const selected = new Set(input.families);
  const requirements = yield* Effect.all(
    {
      program: selected.has("program")
        ? programSourcePaths(input.checkoutRoot).pipe(
            Effect.map((paths) =>
              authoredRequirements(paths, input.activeAppLocales)
            )
          )
        : Effect.succeed([]),
      quran: selected.has("quran")
        ? loadQuranReviewRequirements(input.activeAppLocales)
        : Effect.succeed([]),
      tryout: selected.has("tryout")
        ? tryoutSourcePaths().pipe(
            Effect.map((paths) =>
              authoredRequirements(paths, input.activeAppLocales)
            )
          )
        : Effect.succeed([]),
    },
    { concurrency: 3 }
  );
  return [
    ...requirements.program,
    ...requirements.quran,
    ...requirements.tryout,
  ].sort(compareReviewRequirements);
});
