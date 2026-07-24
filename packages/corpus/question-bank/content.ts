import {
  ContentLocaleSchema,
  compareContentHeads,
} from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  type CorpusSourcePath,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import { QuestionBodyKindSchema } from "@nakafa/aksara-contracts/question/identity";
import { Effect, Schema } from "effect";
import { decodeQuestionDocumentPath } from "#corpus/question-bank/path";
import {
  discoverQuestionSources,
  type QuestionSource,
  QuestionSourceSchema,
  readQuestionSource,
} from "#corpus/question-bank/source";
import type { TryoutExamSource } from "#corpus/tryout/schema";

const QuestionEntryBaseSchema = Schema.extend(
  QuestionSourceSchema.pipe(Schema.omit("choices")),
  Schema.Struct({
    contentKey: ContentKeySchema,
    locale: ContentLocaleSchema,
    peerContentKey: ContentKeySchema,
    sourcePath: CorpusSourcePathSchema,
  })
);

/** Strict locale-specific prompt prepared for authenticated delivery. */
const QuestionPromptEntrySchema = Schema.extend(
  QuestionEntryBaseSchema,
  Schema.Struct({
    bodyKind: Schema.Literal("question"),
    delivery: Schema.Literal("authenticated"),
  })
);

/** Strict locale-specific answer prepared for entitled delivery. */
const QuestionAnswerEntrySchema = Schema.extend(
  QuestionEntryBaseSchema,
  Schema.Struct({
    bodyKind: Schema.Literal("answer"),
    delivery: Schema.Literal("entitled"),
  })
);

/** Strict question-bank body prepared for its exact delivery boundary. */
const QuestionEntrySchema = Schema.Union(
  QuestionPromptEntrySchema,
  QuestionAnswerEntrySchema
);
export type QuestionEntry = typeof QuestionEntrySchema.Type;

/** A projected question-bank entry failed strict contract decoding. */
export class QuestionRegistryError extends Schema.TaggedError<QuestionRegistryError>()(
  "QuestionRegistryError",
  { cause: Schema.Unknown }
) {}

/** Projects one exact body and locale from its decoded question source. */
const projectQuestionEntry = Effect.fn("AksaraCorpus.projectQuestionEntry")(
  function* (
    source: QuestionSource,
    bodyKind: typeof QuestionBodyKindSchema.Type,
    locale: typeof ContentLocaleSchema.Type
  ) {
    return yield* Schema.decodeUnknown(QuestionEntrySchema)(
      {
        bodyKind,
        contentKey: `${source.questionKey}/${bodyKind}`,
        delivery: bodyKind === "question" ? "authenticated" : "entitled",
        locale,
        peerContentKey: `${source.questionKey}/${
          bodyKind === "question" ? "answer" : "question"
        }`,
        questionKey: source.questionKey,
        questionNumber: source.questionNumber,
        rendererDomain: source.rendererDomain,
        setKey: source.setKey,
        sourcePath: `${source.sourceRoot}/${bodyKind}.${locale}.mdx`,
        sourceRoot: source.sourceRoot,
      },
      { onExcessProperty: "error" }
    ).pipe(Effect.mapError((cause) => new QuestionRegistryError({ cause })));
  }
);

/** Projects discovered question sources into the canonical body registry. */
const projectQuestionEntries = Effect.fn("AksaraCorpus.projectQuestionEntries")(
  function* (sources: readonly QuestionSource[]) {
    const entries = yield* Effect.forEach(sources, (source) =>
      Effect.forEach(QuestionBodyKindSchema.literals, (bodyKind) =>
        Effect.forEach(ContentLocaleSchema.literals, (locale) =>
          projectQuestionEntry(source, bodyKind, locale)
        )
      )
    );

    return entries.flat(2).sort(compareContentHeads);
  }
);

/** Discovers every question once and returns its canonical body registry. */
export const loadQuestionContent = Effect.fn(
  "AksaraCorpus.loadQuestionContent"
)(function* (corpusRoot: string, tryoutSources: readonly TryoutExamSource[]) {
  const sources = yield* discoverQuestionSources(corpusRoot, tryoutSources);
  const entries = yield* projectQuestionEntries(sources);
  return { entries, sources };
});

/** Loads only the selected question and its required compilation bodies. */
export const selectQuestionContent = Effect.fn(
  "AksaraCorpus.selectQuestionContent"
)(function* (
  corpusRoot: string,
  tryoutSources: readonly TryoutExamSource[],
  sourcePath: CorpusSourcePath
) {
  const location = yield* decodeQuestionDocumentPath(tryoutSources, sourcePath);
  const source = yield* readQuestionSource(corpusRoot, location);
  const selected = yield* projectQuestionEntry(
    source,
    location.bodyKind,
    location.locale
  );
  if (selected.bodyKind === "question") {
    return {
      entries: [selected],
      selected,
      source,
    } satisfies {
      readonly entries: readonly [typeof selected];
      readonly selected: typeof selected;
      readonly source: typeof source;
    };
  }
  const prompt = yield* projectQuestionEntry(
    source,
    "question",
    location.locale
  );
  return {
    entries: [prompt, selected],
    selected,
    source,
  } satisfies {
    readonly entries: readonly [typeof prompt, typeof selected];
    readonly selected: typeof selected;
    readonly source: typeof source;
  };
});
