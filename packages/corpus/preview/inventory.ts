import {
  type CorpusSourcePath,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  type AppLocale,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { compareCodeUnits } from "@nakafa/aksara-contracts/text/order";
import {
  Effect,
  Array as EffectArray,
  FileSystem,
  Option,
  Path,
  Schema,
} from "effect";
import { decodeArticlePreviewEntries } from "#corpus/articles/preview";
import { CANDIDATE_APP_LOCALE_CODES } from "#corpus/locale/lifecycle";
import { decodeMaterialPreviewEntries } from "#corpus/material/preview";
import {
  selectArticleEntries,
  selectMaterialEntries,
} from "#corpus/preview/public";
import { selectQuestionPreviewSources } from "#corpus/preview/question-source";
import type { PreviewSource } from "#corpus/preview/source";
import { loadQuestionContent } from "#corpus/question-bank/content";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

const FAMILY_ROOTS = {
  article: "packages/corpus/articles",
  material: "packages/corpus/material",
  question: "packages/corpus/question-bank",
} as const;
type CandidateFamily = keyof typeof FAMILY_ROOTS;

export interface CandidateBodyPath {
  readonly appLocale: AppLocale;
  readonly sourcePath: CorpusSourcePath;
}

/** Candidate files cannot be read or reconciled with their source owners. */
export class CandidatePreviewInventoryError extends Schema.TaggedError<CandidatePreviewInventoryError>()(
  "CandidatePreviewInventoryError",
  {
    cause: Schema.Unknown,
    family: Schema.Literals(["article", "material", "question"]),
    phase: Schema.Literals(["files", "ownership"]),
  }
) {}

/** Every physically present candidate body and its trusted compile source. */
export interface CandidatePreviewInventory {
  readonly articleCount: number;
  readonly materialCount: number;
  readonly questionCount: number;
  readonly sources: readonly PreviewSource[];
  readonly totalCount: number;
}

/** Resolves the candidate locale encoded by one physical body path. */
function candidateBodyLocale(family: CandidateFamily, sourcePath: string) {
  const appLocaleCode = CANDIDATE_APP_LOCALE_CODES.find((candidate) =>
    family === "question"
      ? sourcePath.endsWith(`/answer.${candidate}.mdx`) ||
        sourcePath.endsWith(`/question.${candidate}.mdx`)
      : sourcePath.endsWith(`/${candidate}.mdx`)
  );
  if (appLocaleCode === undefined) {
    return;
  }
  return AppLocaleSchema.make(appLocaleCode);
}

/** Reads every physical candidate body below one source-owned family root. */
const readCandidatePaths = Effect.fn("AksaraCorpus.readCandidatePreviewPaths")(
  function* (checkoutRoot: string, family: CandidateFamily) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const root = FAMILY_ROOTS[family];
    const entries = yield* fileSystem
      .readDirectory(path.join(checkoutRoot, root), { recursive: true })
      .pipe(
        Effect.mapError(
          (cause) =>
            new CandidatePreviewInventoryError({
              cause,
              family,
              phase: "files",
            })
        )
      );
    const candidates = yield* Effect.forEach(
      entries.map((entry) => `${root}/${entry.split(path.sep).join("/")}`),
      (sourcePath) => {
        const appLocale = candidateBodyLocale(family, sourcePath);
        if (appLocale === undefined) {
          return Effect.succeed(Option.none<CandidateBodyPath>());
        }
        return Schema.decodeEffect(CorpusSourcePathSchema)(sourcePath).pipe(
          Effect.map((decoded) =>
            Option.some({ appLocale, sourcePath: decoded })
          ),
          Effect.mapError(
            (cause) =>
              new CandidatePreviewInventoryError({
                cause,
                family,
                phase: "files",
              })
          )
        );
      },
      { concurrency: 16 }
    );
    return EffectArray.getSomes(candidates).sort((left, right) =>
      compareCodeUnits(left.sourcePath, right.sourcePath)
    );
  }
);

/** Requires projected ownership to close over every discovered candidate path. */
function requireExactPaths(
  family: CandidateFamily,
  expected: readonly CorpusSourcePath[],
  actual: readonly CorpusSourcePath[]
) {
  const matches =
    expected.length === actual.length &&
    expected.every((sourcePath, index) => sourcePath === actual[index]);
  return matches
    ? Effect.void
    : Effect.fail(
        new CandidatePreviewInventoryError({
          cause: { actual, expected },
          family,
          phase: "ownership",
        })
      );
}

/** Aligns authenticated question entries with their discovered shell locales. */
export const bindQuestionInputs = Effect.fn(
  "AksaraCorpus.bindCandidateQuestionPreviewInputs"
)(function* <Entry extends { readonly sourcePath: CorpusSourcePath }>(
  expected: readonly CandidateBodyPath[],
  actual: readonly Entry[]
) {
  const inputs: Array<{
    readonly appLocale: AppLocale;
    readonly entry: Entry;
  }> = [];
  for (const [index, body] of expected.entries()) {
    const entry = actual[index];
    if (entry === undefined || entry.sourcePath !== body.sourcePath) {
      return yield* new CandidatePreviewInventoryError({
        cause: {
          actual: actual.map(({ sourcePath }) => sourcePath),
          expected: expected.map(({ sourcePath }) => sourcePath),
        },
        family: "question",
        phase: "ownership",
      });
    }
    inputs.push({ appLocale: body.appLocale, entry });
  }
  if (inputs.length !== actual.length) {
    return yield* new CandidatePreviewInventoryError({
      cause: {
        actual: actual.map(({ sourcePath }) => sourcePath),
        expected: expected.map(({ sourcePath }) => sourcePath),
      },
      family: "question",
      phase: "ownership",
    });
  }
  return inputs;
});

/** Validates all present candidate bodies without activating signed output. */
export const validateCandidatePreviewInventory = Effect.fn(
  "AksaraCorpus.validateCandidatePreviewInventory"
)(function* (checkoutRoot: string) {
  const paths = yield* Effect.all(
    {
      article: readCandidatePaths(checkoutRoot, "article"),
      material: readCandidatePaths(checkoutRoot, "material"),
      question: readCandidatePaths(checkoutRoot, "question"),
    },
    { concurrency: 3 }
  );
  const totalCount =
    paths.article.length + paths.material.length + paths.question.length;
  if (totalCount === 0) {
    return {
      articleCount: 0,
      materialCount: 0,
      questionCount: 0,
      sources: [],
      totalCount: 0,
    } satisfies CandidatePreviewInventory;
  }
  const [articles, materials, questionContent] = yield* Effect.all(
    [
      paths.article.length === 0
        ? Effect.succeed([])
        : decodeArticlePreviewEntries(
            paths.article.map(({ sourcePath }) => sourcePath)
          ),
      paths.material.length === 0
        ? Effect.succeed([])
        : decodeMaterialPreviewEntries(
            paths.material.map(({ sourcePath }) => sourcePath)
          ),
      paths.question.length === 0
        ? Effect.succeed({
            candidateEntries: [],
            questionSources: [],
            tryoutSources: [],
          })
        : Effect.gen(function* () {
            const tryoutSources = yield* decodeTryoutRegistry();
            const content = yield* loadQuestionContent(
              checkoutRoot,
              tryoutSources
            );
            return {
              candidateEntries: content.candidateEntries,
              questionSources: content.sources,
              tryoutSources,
            };
          }),
    ],
    { concurrency: 3 }
  );
  const questionInputs = yield* bindQuestionInputs(
    paths.question,
    questionContent.candidateEntries
  );
  yield* Effect.all(
    [
      requireExactPaths(
        "article",
        paths.article.map(({ sourcePath }) => sourcePath),
        articles.map(({ sourcePath }) => sourcePath).sort(compareCodeUnits)
      ),
      requireExactPaths(
        "material",
        paths.material.map(({ sourcePath }) => sourcePath),
        materials.map(({ sourcePath }) => sourcePath).sort(compareCodeUnits)
      ),
    ],
    { concurrency: 2 }
  );
  const [articleSelections, materialSelections, questionSources] =
    yield* Effect.all(
      [
        selectArticleEntries(checkoutRoot, articles),
        selectMaterialEntries(checkoutRoot, materials),
        selectQuestionPreviewSources(
          checkoutRoot,
          questionInputs,
          questionContent.questionSources
        ),
      ],
      { concurrency: 3 }
    );
  const sources = [
    ...articleSelections.flatMap(({ sources: selected }) => selected),
    ...materialSelections.flatMap(({ sources: selected }) => selected),
    ...questionSources,
  ];
  return {
    articleCount: paths.article.length,
    materialCount: paths.material.length,
    questionCount: paths.question.length,
    sources,
    totalCount,
  } satisfies CandidatePreviewInventory;
});
