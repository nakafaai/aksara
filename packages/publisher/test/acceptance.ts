import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { decodeArticleRegistry } from "@nakafa/aksara-corpus/articles/registry";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { decodePageRegistry } from "@nakafa/aksara-corpus/pages/registry";
import { readQuestionSets } from "@nakafa/aksara-corpus/question-bank/source";
import {
  examSetPaths,
  planTryoutPapers,
} from "@nakafa/aksara-corpus/tryout/projection";
import { decodeTryoutRegistry } from "@nakafa/aksara-corpus/tryout/registry";
import { Array as Arr, Effect, HashSet, Path } from "effect";
import type { AcceptanceSources } from "#publisher/acceptance/source";
import { materialSlicePaths } from "#test/material/slice";
import { testRendererDomains } from "#test/renderer";

const repositoryRoot = Effect.map(Path.Path, (path) =>
  path.resolve(process.cwd(), "..", "..")
);

/** Keeps the first set of TKA compulsory mathematics: one paper of 25 items and its readings. */
function selectTestExam(
  registry: Effect.Success<ReturnType<typeof decodeTryoutRegistry>>
) {
  return Arr.flatMap(registry, (source) =>
    source.examKey === "tka"
      ? [
          {
            ...source,
            tracks: Arr.flatMap(source.tracks, (track) =>
              track.key === "compulsory-mathematics"
                ? [{ ...track, sets: Arr.take(track.sets, 1) }]
                : []
            ),
          },
        ]
      : []
  );
}

type AcceptanceTestError =
  | Effect.Error<ReturnType<typeof decodeArticleRegistry>>
  | Effect.Error<ReturnType<typeof decodeMaterialRegistry>>
  | Effect.Error<ReturnType<typeof decodePageRegistry>>
  | Effect.Error<ReturnType<typeof decodeTryoutRegistry>>
  | Effect.Error<ReturnType<typeof readQuestionSets>>
  | Effect.Error<ReturnType<typeof planTryoutPapers>>
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
  Effect.Services<ReturnType<typeof readQuestionSets>> | Path.Path
> = Effect.gen(function* () {
  const checkoutRoot = yield* repositoryRoot;
  const articles = yield* decodeArticleRegistry();
  const materials = yield* decodeMaterialRegistry();
  const page = yield* decodePageRegistry();
  const exams = selectTestExam(yield* decodeTryoutRegistry());
  const sets = yield* readQuestionSets(checkoutRoot, examSetPaths(exams));
  const papers = yield* planTryoutPapers(exams, sets);
  const materialPaths = HashSet.fromIterable<string>(materialSlicePaths);
  const sources = {
    article: Arr.filter(
      articles,
      ({ route }) =>
        route.contentKey === "articles/politics/regional-elections-turmoil"
    ),
    material: Arr.filter(materials, ({ sourcePath }) =>
      HashSet.has(materialPaths, sourcePath)
    ),
    page,
    tryout: { exams, papers, sets },
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
    publishedDomains: ["chemistry", "mathematics", "politics", "site"],
  });
  return { checkoutRoot, rendererManifest, sources };
}).pipe(Effect.withSpan("AcceptanceTest.makeSources"));
