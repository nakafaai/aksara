import { ContentLocaleSchema } from "@nakafa/aksara-contracts/content";
import {
  compareTryoutPlacements,
  makeTryoutCatalogRecord,
} from "@nakafa/aksara-contracts/tryout/hash";
import {
  compareTryoutCatalog,
  type TryoutPlacementSource,
  TryoutPlacementSourceSchema,
} from "@nakafa/aksara-contracts/tryout/spec";
import { Effect, Schema } from "effect";
import {
  discoverQuestionSources,
  type QuestionSource,
} from "#corpus/question-bank/source";
import { projectTryoutCatalog } from "#corpus/tryout/catalog";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";
import type { TryoutExamSource } from "#corpus/tryout/schema";

/** One active catalog references a reviewed question that does not exist. */
export class TryoutQuestionMissingError extends Schema.TaggedError<TryoutQuestionMissingError>()(
  "TryoutQuestionMissingError",
  { questionKey: Schema.String }
) {}

/** One projected identity is repeated before a snapshot can be signed. */
export class TryoutQuestionDuplicateError extends Schema.TaggedError<TryoutQuestionDuplicateError>()(
  "TryoutQuestionDuplicateError",
  { questionKey: Schema.String }
) {}

/** Two source-derived nodes claim one locale-specific public route. */
export class TryoutRouteDuplicateError extends Schema.TaggedError<TryoutRouteDuplicateError>()(
  "TryoutRouteDuplicateError",
  { locale: ContentLocaleSchema, publicPath: Schema.String }
) {}

/** Strict shared contracts rejected a source-derived try-out projection. */
export class TryoutProjectionDecodeError extends Schema.TaggedError<TryoutProjectionDecodeError>()(
  "TryoutProjectionDecodeError",
  { cause: Schema.Unknown }
) {}

/** Exact active try-out hierarchy and server-only placement expectations. */
export interface TryoutProjection {
  readonly catalog: readonly ReturnType<typeof makeTryoutCatalogRecord>[];
  readonly placements: readonly TryoutPlacementSource[];
  readonly routeCount: number;
}

type TryoutTrackSource = TryoutExamSource["tracks"][number];
type TryoutSetSource = TryoutTrackSource["sets"][number];
type TryoutSectionSource = TryoutSetSource["sections"][number];

interface TryoutSectionContext {
  readonly section: TryoutSectionSource;
  readonly set: TryoutSetSource;
  readonly source: TryoutExamSource;
  readonly track: TryoutTrackSource;
}

/** Indexes physical question sources and rejects repeated logical identities. */
const indexQuestions = Effect.fn("AksaraCorpus.indexTryoutQuestions")(
  function* (sources: readonly QuestionSource[]) {
    const questions = new Map<string, QuestionSource>();
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
    context: TryoutSectionContext,
    questions: ReadonlyMap<string, QuestionSource>
  ) {
    const rows: unknown[] = [];
    const { section, set, source, track } = context;
    for (
      let questionOrder = 1;
      questionOrder <= section.questionCount;
      questionOrder += 1
    ) {
      const questionKey = `${section.questionSourcePath}/question-${questionOrder}`;
      const question = questions.get(questionKey);
      if (question === undefined) {
        return yield* new TryoutQuestionMissingError({ questionKey });
      }
      for (const locale of ContentLocaleSchema.literals) {
        rows.push({
          answerContentKey: `${question.questionKey}/answer`,
          choices: question.choices[locale].map(({ label, value }, index) => ({
            isCorrect: value,
            label,
            optionKey: `option-${index + 1}`,
            order: index + 1,
          })),
          countryKey: source.countryKey,
          examKey: source.examKey,
          locale,
          questionContentKey: `${question.questionKey}/question`,
          questionOrder,
          questionSourcePath: question.sourceRoot,
          rendererDomain: question.rendererDomain,
          scope: "server",
          sectionKey: section.key,
          setKey: set.key,
          sourceRevision: source.sourceRevision,
          trackKey: track.key,
        });
      }
    }
    return rows;
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

/** Rejects locale-specific route collisions before snapshot signing. */
const validateTryoutRoutes = Effect.fn("AksaraCorpus.validateTryoutRoutes")(
  function* (rows: readonly ReturnType<typeof makeTryoutCatalogRecord>[]) {
    const routes = new Set<string>();
    for (const row of rows) {
      if (!("publicPath" in row.row) || row.row.publicPath === undefined) {
        continue;
      }
      const identity = `${row.row.locale}\0${row.row.publicPath}`;
      if (routes.has(identity)) {
        return yield* new TryoutRouteDuplicateError({
          locale: row.row.locale,
          publicPath: row.row.publicPath,
        });
      }
      routes.add(identity);
    }
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
  const placements = yield* Schema.decodeUnknown(
    Schema.Array(TryoutPlacementSourceSchema)
  )(placementRows, { onExcessProperty: "error" }).pipe(
    Effect.mapError((cause) => new TryoutProjectionDecodeError({ cause }))
  );
  const catalog = [...catalogRows]
    .sort(compareTryoutCatalog)
    .map(makeTryoutCatalogRecord);
  const sortedPlacements = [...placements].sort(compareTryoutPlacements);
  yield* validateTryoutRoutes(catalog);

  return {
    catalog,
    placements: sortedPlacements,
    routeCount: catalog.filter(
      ({ row }) => "publicPath" in row && row.publicPath !== undefined
    ).length,
  } satisfies TryoutProjection;
});

/** Loads reviewed sources and projects the exact active try-out snapshot. */
export const loadTryoutProjection = Effect.fn(
  "AksaraCorpus.loadTryoutProjection"
)(function* (corpusRoot: string) {
  const [sources, questions] = yield* Effect.all([
    decodeTryoutRegistry(),
    discoverQuestionSources(corpusRoot),
  ]);
  return yield* projectTryoutSources(sources, questions);
});
