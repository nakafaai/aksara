import {
  compareContentHeads,
  headIdentity,
} from "@nakafa/aksara-contracts/content";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { decodeArticleRegistry } from "@nakafa/aksara-corpus/articles/registry";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { decodePageRegistry } from "@nakafa/aksara-corpus/pages/registry";
import { selectQuestionContent } from "@nakafa/aksara-corpus/question-bank/content";
import { projectTryoutSources } from "@nakafa/aksara-corpus/tryout/projection";
import { decodeTryoutRegistry } from "@nakafa/aksara-corpus/tryout/registry";
import { Array as Arr, Effect, HashSet, MutableHashMap, Path } from "effect";
import type { AcceptanceSources } from "#publisher/acceptance/source";
import { materialSlicePaths } from "#test/material/slice";
import { testRendererDomains } from "#test/renderer";

const repositoryRoot = Effect.map(Path.Path, (path) =>
  path.resolve(process.cwd(), "..", "..")
);
const questionKey =
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";

/** Keeps the actual parent hierarchy around one reviewed test question. */
function selectTestHierarchy(
  registry: Effect.Success<ReturnType<typeof decodeTryoutRegistry>>
) {
  return registry.flatMap((source) => {
    const tracks = source.tracks.flatMap((track) => {
      const sets = track.sets.flatMap((set) => {
        const sections = set.sections
          .filter(
            (section) =>
              questionKey === `${section.questionSourcePath}/question-1`
          )
          .map((section) => ({ ...section, questionCount: 1 }));
        return sections.length > 0 ? [{ ...set, sections }] : [];
      });
      return sets.length > 0 ? [{ ...track, sets }] : [];
    });
    return tracks.length > 0 ? [{ ...source, tracks }] : [];
  });
}

type AcceptanceTestError =
  | Effect.Error<ReturnType<typeof decodeArticleRegistry>>
  | Effect.Error<ReturnType<typeof decodeMaterialRegistry>>
  | Effect.Error<ReturnType<typeof decodePageRegistry>>
  | Effect.Error<ReturnType<typeof decodeTryoutRegistry>>
  | Effect.Error<ReturnType<typeof selectQuestionContent>>
  | Effect.Error<ReturnType<typeof projectTryoutSources>>
  | Effect.Error<ReturnType<typeof createRendererManifest>>;

/** Loads bounded real source slices through the production family registries. */
export const makeAcceptanceTestSources: Effect.Effect<
  {
    readonly checkoutRoot: string;
    readonly rendererManifest: Effect.Success<
      ReturnType<typeof createRendererManifest>
    >;
    readonly sources: AcceptanceSources;
  },
  AcceptanceTestError,
  Effect.Services<ReturnType<typeof selectQuestionContent>> | Path.Path
> = Effect.gen(function* () {
  const checkoutRoot = yield* repositoryRoot;
  const articles = yield* decodeArticleRegistry();
  const materials = yield* decodeMaterialRegistry();
  const page = yield* decodePageRegistry();
  const registry = selectTestHierarchy(yield* decodeTryoutRegistry());
  const questions = yield* Effect.forEach(ACTIVE_APP_LOCALES, (locale) =>
    selectQuestionContent(
      checkoutRoot,
      registry,
      CorpusSourcePathSchema.make(
        `packages/corpus/${questionKey}/answer.${locale}.mdx`
      )
    )
  );
  const questionEntries = [
    ...MutableHashMap.values(
      MutableHashMap.fromIterable(
        questions.flatMap(({ entries }) =>
          entries.map((entry) => [headIdentity(entry), entry] as const)
        )
      )
    ),
  ].sort(compareContentHeads);
  const questionSources = [
    ...MutableHashMap.values(
      MutableHashMap.fromIterable(
        questions.map(({ source }) => [source.questionKey, source] as const)
      )
    ),
  ];
  const projection = yield* projectTryoutSources(registry, questionSources);
  const materialPaths = HashSet.fromIterable<string>(materialSlicePaths);
  const sources = {
    article: articles.filter(
      ({ route }) =>
        route.contentKey === "articles/politics/regional-elections-turmoil"
    ),
    material: materials.filter(({ sourcePath }) =>
      HashSet.has(materialPaths, sourcePath)
    ),
    page,
    tryout: {
      entries: questionEntries,
      projection,
      sources: questionSources,
    },
  } satisfies AcceptanceSources;
  const base = [
    "BlockMath",
    "CodeBlock",
    "ContentGrid",
    "Highlight",
    "InlineMath",
    "MathContainer",
  ];
  const rendererManifest = yield* createRendererManifest({
    base,
    domains: testRendererDomains({
      chemistry: ["AtomShellLab"],
      mathematics: ["FunctionMachine"],
      politics: [
        "KimPlusElectabilityChart",
        "MerahPutihCabinetChart",
        "MerahPutihCompositionChart",
        "NepotismStage",
        "NepotismStateTable",
        "PorkBarrelBudgetChart",
        "PorkBarrelElectabilityChart",
        "PorkBarrelFundChart",
      ],
    }),
    publishedDomains: [
      "chemistry",
      "mathematics",
      "politics",
      "site",
      ...Arr.dedupe(
        questionEntries.map(({ rendererDomain }) => rendererDomain)
      ),
    ],
  });
  return { checkoutRoot, rendererManifest, sources };
}).pipe(Effect.withSpan("AcceptanceTest.makeSources"));
