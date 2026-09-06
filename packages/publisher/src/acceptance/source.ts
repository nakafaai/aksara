import {
  compareContentHeads,
  headIdentity,
} from "@nakafa/aksara-contracts/content";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import type { ContentHead } from "@nakafa/aksara-contracts/release/head";
import { decodeArticleRegistry } from "@nakafa/aksara-corpus/articles/registry";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { decodePageRegistry } from "@nakafa/aksara-corpus/pages/registry";
import {
  type QuestionEntry,
  selectQuestionContent,
} from "@nakafa/aksara-corpus/question-bank/content";
import type { QuestionSource } from "@nakafa/aksara-corpus/question-bank/source";
import type { loadTryoutContent } from "@nakafa/aksara-corpus/tryout/content";
import { projectTryoutSources } from "@nakafa/aksara-corpus/tryout/projection";
import { validateAssessmentReadinessRegistry } from "@nakafa/aksara-corpus/tryout/readiness/registry";
import { decodeTryoutRegistry } from "@nakafa/aksara-corpus/tryout/registry";
import { Effect, Schema } from "effect";

const materialKeys = [
  "material/lesson/mathematics/analytic-geometry/hyperbola",
  "material/lesson/mathematics/function-composition-inverse-function/function-concept",
  "material/lesson/mathematics/linear-equation-inequality/system-linear-equation",
  "material/lesson/mathematics/trigonometry/right-triangle-naming",
  "material/lesson/mathematics/trigonometry/trigonometry-concept",
];
const articleKeys = ["articles/politics/regional-elections-turmoil"];

/** The pinned acceptance corpus no longer contains a required reviewed source. */
export class AcceptanceSourceError extends Schema.TaggedError<AcceptanceSourceError>()(
  "AcceptanceSourceError",
  { identity: Schema.String }
) {}

/** Requires every selected identity in every active locale before compiling. */
const selectEntries = Effect.fn("AksaraPublisher.selectAcceptanceEntries")(
  function* <
    Entry extends {
      readonly route: Pick<ContentHead, "contentKey" | "artifactLocale">;
    },
  >(entries: readonly Entry[], keys: readonly string[]) {
    const selected: Entry[] = [];
    for (const key of keys) {
      for (const locale of ACTIVE_APP_LOCALES) {
        const artifactLocale = ArtifactLocaleSchema.make(locale);
        const entry = entries.find(
          ({ route }) =>
            route.contentKey === key && route.artifactLocale === artifactLocale
        );
        if (entry === undefined) {
          return yield* new AcceptanceSourceError({
            identity: `${key}:${locale}`,
          });
        }
        selected.push(entry);
      }
    }
    return selected.sort((left, right) =>
      compareContentHeads(left.route, right.route)
    );
  }
);

/** Loads one complete reviewed set per track, including every prompt and answer locale. */
type AcceptanceTryout = Pick<
  Effect.Success<ReturnType<typeof loadTryoutContent>>,
  "entries" | "projection" | "sources"
>;
type AcceptanceTryoutError =
  | AcceptanceSourceError
  | Effect.Error<ReturnType<typeof decodeTryoutRegistry>>
  | Effect.Error<ReturnType<typeof selectQuestionContent>>
  | Effect.Error<ReturnType<typeof validateAssessmentReadinessRegistry>>
  | Effect.Error<ReturnType<typeof projectTryoutSources>>;
type AcceptanceSourceServices = Effect.Services<
  ReturnType<typeof selectQuestionContent>
>;

/** Loads complete reviewed set-one inputs without scanning unrelated question banks. */
export const loadAcceptanceTryout: (
  checkoutRoot: string
) => Effect.Effect<
  AcceptanceTryout,
  AcceptanceTryoutError,
  AcceptanceSourceServices
> = Effect.fn("AksaraPublisher.loadAcceptanceTryout")(function* (
  checkoutRoot: string
) {
  const registry = yield* decodeTryoutRegistry();
  const selection = yield* Effect.forEach(registry, (source) =>
    Effect.gen(function* () {
      const tracks = yield* Effect.forEach(source.tracks, (track) =>
        Effect.gen(function* () {
          const set = track.sets.find(({ key }) => key === "set-1");
          if (set === undefined) {
            return yield* new AcceptanceSourceError({
              identity: `${source.examKey}:${track.key}:set-1`,
            });
          }
          return { ...track, sets: [set] };
        })
      );
      return { ...source, tracks };
    })
  );
  const paths = selection.flatMap(({ tracks }) =>
    tracks.flatMap(({ sets }) =>
      sets.flatMap(({ sections }) =>
        sections.flatMap((section) =>
          Array.from({ length: section.questionCount }, (_, index) =>
            ACTIVE_APP_LOCALES.map((locale) =>
              CorpusSourcePathSchema.make(
                `packages/corpus/${section.questionSourcePath}/question-${index + 1}/answer.${locale}.mdx`
              )
            )
          ).flat()
        )
      )
    )
  );
  const selected = yield* Effect.forEach(
    paths,
    (path) => selectQuestionContent(checkoutRoot, selection, path),
    { concurrency: 16 }
  );
  const entries = new Map<string, QuestionEntry>();
  const sources = new Map<string, QuestionSource>();
  for (const question of selected) {
    sources.set(question.source.questionKey, question.source);
    for (const entry of question.entries) {
      entries.set(headIdentity(entry), entry);
    }
  }
  const questionSources = [...sources.values()];
  yield* validateAssessmentReadinessRegistry(selection, questionSources);
  const projection = yield* projectTryoutSources(selection, questionSources);
  return {
    entries: [...entries.values()].sort(compareContentHeads),
    projection,
    sources: questionSources,
  };
});

/** Resolves the finite acceptance selection from the pinned authored checkout. */
export interface AcceptanceSources {
  readonly article: Effect.Success<ReturnType<typeof decodeArticleRegistry>>;
  readonly material: Effect.Success<ReturnType<typeof decodeMaterialRegistry>>;
  readonly page: Effect.Success<ReturnType<typeof decodePageRegistry>>;
  readonly tryout: AcceptanceTryout;
}

export type AcceptanceSourceFailure =
  | AcceptanceTryoutError
  | Effect.Error<ReturnType<typeof decodeArticleRegistry>>
  | Effect.Error<ReturnType<typeof decodeMaterialRegistry>>
  | Effect.Error<ReturnType<typeof decodePageRegistry>>;

/** Resolves the finite acceptance selection from the pinned authored checkout. */
export const loadAcceptanceSources: (
  checkoutRoot: string
) => Effect.Effect<
  AcceptanceSources,
  AcceptanceSourceFailure,
  AcceptanceSourceServices
> = Effect.fn("AksaraPublisher.loadAcceptanceSources")(function* (
  checkoutRoot: string
) {
  const article = yield* selectEntries(
    yield* decodeArticleRegistry(),
    articleKeys
  );
  const materialRegistry = yield* decodeMaterialRegistry();
  const required = yield* selectEntries(materialRegistry, materialKeys);
  const materialGroups = new Set(
    required.map(({ route }) => route.materialKey)
  );
  const material = materialRegistry.filter(({ route }) =>
    materialGroups.has(route.materialKey)
  );
  const page = yield* decodePageRegistry();
  const tryout = yield* loadAcceptanceTryout(checkoutRoot);
  return { article, material, page, tryout };
});
