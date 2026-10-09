import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { QuestionKeySchema } from "@nakafa/aksara-contracts/question/identity";
import {
  compareTryoutCatalog,
  makeTryoutCatalogRecord,
} from "@nakafa/aksara-contracts/tryout/hash/catalog";
import { compareTryoutPlacements } from "@nakafa/aksara-contracts/tryout/identity";
import { TryoutKeySchema } from "@nakafa/aksara-contracts/tryout/key";
import type { TryoutPlacementSource } from "@nakafa/aksara-contracts/tryout/placement";
import {
  Array as Arr,
  Effect,
  MutableHashMap,
  MutableList,
  Option,
  Order,
  Schema,
} from "effect";
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

/** One grouped stimulus is isolated or interrupted inside its active section. */
export class TryoutStimulusGroupError extends Schema.TaggedError<TryoutStimulusGroupError>()(
  "TryoutStimulusGroupError",
  {
    questionKey: QuestionKeySchema,
    reason: Schema.Literals(["isolated", "noncontiguous"]),
    stimulusKey: TryoutKeySchema,
  }
) {}

/** Indexes physical question sources and rejects repeated logical identities. */
const indexQuestions = Effect.fn("AksaraCorpus.indexTryoutQuestions")(
  function* (sources: readonly QuestionSource[]) {
    const questions = MutableHashMap.empty<
      QuestionSource["questionKey"],
      QuestionSource
    >();
    for (const source of sources) {
      if (MutableHashMap.has(questions, source.questionKey)) {
        return yield* new TryoutQuestionDuplicateError({
          questionKey: source.questionKey,
        });
      }
      MutableHashMap.set(questions, source.questionKey, source);
    }
    return questions;
  }
);

/** Flattens active source-owned sections while preserving their hierarchy. */
function activeSections(sources: readonly TryoutExamSource[]) {
  return Arr.flatMap(sources, (source) =>
    Arr.flatMap(source.tracks, (track) =>
      Arr.flatMap(track.sets, (set) =>
        Arr.map(set.sections, (section) => ({
          section,
          set,
          source,
          track,
        }))
      )
    )
  );
}

/** Requires every shared-stimulus group to contain contiguous sibling items. */
const validateStimulusGroups = Effect.fn(
  "AksaraCorpus.validateTryoutStimulusGroups"
)(function* (questions: readonly QuestionSource[]) {
  const groups = MutableHashMap.empty<
    NonNullable<QuestionSource["item"]["stimulusKey"]>,
    {
      readonly first: QuestionSource;
      readonly rest: MutableList.MutableList<QuestionSource>;
    }
  >();
  for (const question of questions) {
    const { stimulusKey } = question.item;
    if (stimulusKey === undefined) {
      continue;
    }
    const group = Option.getOrUndefined(
      MutableHashMap.get(groups, stimulusKey)
    );
    if (group === undefined) {
      MutableHashMap.set(groups, stimulusKey, {
        first: question,
        rest: MutableList.make<QuestionSource>(),
      });
    } else {
      MutableList.append(group.rest, question);
    }
  }
  for (const [stimulusKey, { first, rest }] of groups) {
    const group = [first, ...MutableList.toArray(rest)];
    if (group.length < 2) {
      return yield* new TryoutStimulusGroupError({
        questionKey: first.questionKey,
        reason: "isolated",
        stimulusKey,
      });
    }
    if (
      Arr.some(
        group,
        ({ questionNumber }, index) =>
          questionNumber !== first.questionNumber + index
      )
    ) {
      return yield* new TryoutStimulusGroupError({
        questionKey: first.questionKey,
        reason: "noncontiguous",
        stimulusKey,
      });
    }
  }
  return questions;
});

/** Builds localized placement rows for one exact active section. */
const projectSection = Effect.fn("AksaraCorpus.projectTryoutSection")(
  function* (
    context: TryoutPlacementContext,
    questions: MutableHashMap.MutableHashMap<
      QuestionSource["questionKey"],
      QuestionSource
    >
  ) {
    const { section, set, source, track } = context;
    const collected = MutableList.make<QuestionSource>();
    for (
      let questionOrder = 1;
      questionOrder <= section.questionCount;
      questionOrder += 1
    ) {
      const questionKey = QuestionKeySchema.make(
        `${section.questionSourcePath}/question-${questionOrder}`
      );
      const question = Option.getOrUndefined(
        MutableHashMap.get(questions, questionKey)
      );
      if (question === undefined) {
        return yield* new TryoutQuestionMissingError({ questionKey });
      }
      MutableList.append(collected, question);
    }
    const selected = MutableList.toArray(collected);
    yield* validateStimulusGroups(selected);
    const rows = yield* Effect.forEach(selected, (question) =>
      Effect.forEach(ACTIVE_APP_LOCALES, (appLocale) =>
        makeTryoutPlacement(
          { section, set, source, track },
          question,
          appLocale
        )
      )
    );
    return Arr.flatten(rows);
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
    return Arr.flatten(rows);
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
  const catalog = Arr.map(
    Arr.sort(catalogRows, Order.make(compareTryoutCatalog)),
    makeTryoutCatalogRecord
  );
  const sortedPlacements = Arr.sort(
    placementRows,
    Order.make(compareTryoutPlacements)
  );

  return {
    catalog,
    placements: sortedPlacements,
    routeCount: Arr.filter(
      catalog,
      ({ row }) => "publicPath" in row && row.publicPath !== undefined
    ).length,
  } satisfies {
    /** Exact active try-out hierarchy and server-only placement expectations. */
    readonly catalog: readonly ReturnType<typeof makeTryoutCatalogRecord>[];
    readonly placements: readonly TryoutPlacementSource[];
    readonly routeCount: number;
  };
});
