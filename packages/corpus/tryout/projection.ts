import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { QuestionKeySchema } from "@nakafa/aksara-contracts/question/identity";
import {
  compareTryoutCatalog,
  makeTryoutCatalogRecord,
} from "@nakafa/aksara-contracts/tryout/catalog-hash";
import { compareTryoutPlacements } from "@nakafa/aksara-contracts/tryout/identity";
import type { TryoutPlacementSource } from "@nakafa/aksara-contracts/tryout/placement";
import { Effect, Schema } from "effect";
import type { QuestionSource } from "#corpus/question-bank/source";
import { projectTryoutCatalog } from "#corpus/tryout/catalog";
import {
  makeTryoutPlacement,
  type TryoutPlacementContext,
} from "#corpus/tryout/placement";
import type { TryoutExamSource } from "#corpus/tryout/schema";

/** One active catalog references a reviewed question that does not exist. */
export class TryoutQuestionMissingError extends Schema.TaggedError<TryoutQuestionMissingError>()(
  "TryoutQuestionMissingError",
  { questionKey: QuestionKeySchema }
) {}

/** One projected identity is repeated before a snapshot can be signed. */
export class TryoutQuestionDuplicateError extends Schema.TaggedError<TryoutQuestionDuplicateError>()(
  "TryoutQuestionDuplicateError",
  { questionKey: QuestionKeySchema }
) {}

/** Exact active try-out hierarchy and server-only placement expectations. */
interface TryoutProjection {
  readonly catalog: readonly ReturnType<typeof makeTryoutCatalogRecord>[];
  readonly placements: readonly TryoutPlacementSource[];
  readonly routeCount: number;
}

/** Indexes physical question sources and rejects repeated logical identities. */
const indexQuestions = Effect.fn("AksaraCorpus.indexTryoutQuestions")(
  function* (sources: readonly QuestionSource[]) {
    const questions = new Map<QuestionSource["questionKey"], QuestionSource>();
    for (const source of sources) {
      if (questions.has(source.questionKey)) {
        return yield* new TryoutQuestionDuplicateError({
          questionKey: source.questionKey,
        });
      }
      questions.set(source.questionKey, source);
    }
    return questions;
  }
);

/** Flattens active source-owned sections while preserving their hierarchy. */
function activeSections(sources: readonly TryoutExamSource[]) {
  return sources.flatMap((source) =>
    source.tracks.flatMap((track) =>
      track.sets.flatMap((set) =>
        set.sections.map((section) => ({
          section,
          set,
          source,
          track,
        }))
      )
    )
  );
}

/** Builds localized placement rows for one exact active section. */
const projectSection = Effect.fn("AksaraCorpus.projectTryoutSection")(
  function* (
    context: TryoutPlacementContext,
    questions: ReadonlyMap<QuestionSource["questionKey"], QuestionSource>
  ) {
    const { section, set, source, track } = context;
    const rows: TryoutPlacementSource[][] = [];
    for (
      let questionOrder = 1;
      questionOrder <= section.questionCount;
      questionOrder += 1
    ) {
      const questionKey = QuestionKeySchema.make(
        `${section.questionSourcePath}/question-${questionOrder}`
      );
      const question = questions.get(questionKey);
      if (question === undefined) {
        return yield* new TryoutQuestionMissingError({ questionKey });
      }
      rows.push(
        yield* Effect.forEach(ACTIVE_APP_LOCALES, (appLocale) =>
          makeTryoutPlacement(
            { section, set, source, track },
            question,
            appLocale
          )
        )
      );
    }
    return rows.flat();
  }
);

/** Expands only source-selected sets into locale placement expectations. */
const projectPlacements = Effect.fn("AksaraCorpus.projectTryoutPlacements")(
  function* (
    sources: readonly TryoutExamSource[],
    questionSources: readonly QuestionSource[]
  ) {
    const questions = yield* indexQuestions(questionSources);
    const rows = yield* Effect.forEach(activeSections(sources), (section) =>
      projectSection(section, questions)
    );
    return rows.flat();
  }
);

/** Projects decoded sources into strict active-only snapshot inputs. */
export const projectTryoutSources = Effect.fn(
  "AksaraCorpus.projectTryoutSources"
)(function* (
  sources: readonly TryoutExamSource[],
  questionSources: readonly QuestionSource[]
) {
  const catalogRows = yield* projectTryoutCatalog(sources);
  const placementRows = yield* projectPlacements(sources, questionSources);
  const catalog = [...catalogRows]
    .sort(compareTryoutCatalog)
    .map(makeTryoutCatalogRecord);
  const sortedPlacements = [...placementRows].sort(compareTryoutPlacements);

  return {
    catalog,
    placements: sortedPlacements,
    routeCount: catalog.filter(
      ({ row }) => "publicPath" in row && row.publicPath !== undefined
    ).length,
  } satisfies TryoutProjection;
});
