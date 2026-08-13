import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  type CorpusSourcePath,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  AppLocaleSchema,
  type ArtifactLocale,
  ArtifactLocaleSchema,
  artifactLocaleCode,
} from "@nakafa/aksara-contracts/locale";
import {
  type QuestionBodyKind,
  questionKeyParts,
} from "@nakafa/aksara-contracts/question/identity";
import {
  questionArtifactLocaleForSection,
  questionArtifactLocalesForSection,
} from "@nakafa/aksara-contracts/tryout/language";
import { Effect, Schema } from "effect";
import {
  decodeQuestionDocumentPath,
  indexQuestionBanks,
} from "#corpus/question-bank/path";
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
    artifactLocale: ArtifactLocaleSchema,
    contentKey: ContentKeySchema,
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

/** Projects one exact body and locale from its decoded question source. */
function projectQuestionEntry(
  source: QuestionSource,
  bodyKind: QuestionBodyKind,
  artifactLocale: ArtifactLocale
) {
  const entry = {
    artifactLocale,
    contentKey: ContentKeySchema.make(`${source.questionKey}/${bodyKind}`),
    peerContentKey: ContentKeySchema.make(
      `${source.questionKey}/${bodyKind === "question" ? "answer" : "question"}`
    ),
    questionKey: source.questionKey,
    questionNumber: source.questionNumber,
    rendererDomain: source.rendererDomain,
    setKey: source.setKey,
    sourcePath: CorpusSourcePathSchema.make(
      `${source.sourceRoot}/${bodyKind}.${artifactLocale}.mdx`
    ),
    sourceRoot: source.sourceRoot,
  };
  if (bodyKind === "question") {
    return {
      ...entry,
      bodyKind,
      delivery: "authenticated",
    } satisfies QuestionEntry;
  }
  return {
    ...entry,
    bodyKind,
    delivery: "entitled",
  } satisfies QuestionEntry;
}

/** Projects discovered question sources into the canonical body registry. */
function projectQuestionEntries(sources: readonly QuestionSource[]) {
  return sources
    .flatMap((source) => {
      const { sectionKey } = questionKeyParts(source.questionKey);
      const answers = ACTIVE_APP_LOCALES.map((appLocale) =>
        projectQuestionEntry(
          source,
          "answer",
          ArtifactLocaleSchema.make(appLocale)
        )
      );
      const prompts = questionArtifactLocalesForSection(sectionKey).map(
        (artifactLocale) =>
          projectQuestionEntry(source, "question", artifactLocale)
      );
      return [...answers, ...prompts];
    })
    .sort(compareContentHeads);
}

/** Discovers every question once and returns its canonical body registry. */
export const loadQuestionContent = Effect.fn(
  "AksaraCorpus.loadQuestionContent"
)(function* (corpusRoot: string, tryoutSources: readonly TryoutExamSource[]) {
  const questionBanks = yield* indexQuestionBanks(tryoutSources);
  const sources = yield* discoverQuestionSources(corpusRoot, questionBanks);
  const entries = projectQuestionEntries(sources);
  return { entries, questionBanks, sources };
});

/** Loads only the selected question and its required compilation bodies. */
export const selectQuestionContent = Effect.fn(
  "AksaraCorpus.selectQuestionContent"
)(function* (
  corpusRoot: string,
  tryoutSources: readonly TryoutExamSource[],
  sourcePath: CorpusSourcePath
) {
  const questionBanks = yield* indexQuestionBanks(tryoutSources);
  const location = yield* decodeQuestionDocumentPath(questionBanks, sourcePath);
  const source = yield* readQuestionSource(corpusRoot, location);
  const selected = projectQuestionEntry(
    source,
    location.bodyKind,
    location.artifactLocale
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
  const { sectionKey } = questionKeyParts(source.questionKey);
  const appLocale = AppLocaleSchema.make(
    artifactLocaleCode(location.artifactLocale)
  );
  const prompt = projectQuestionEntry(
    source,
    "question",
    questionArtifactLocaleForSection(sectionKey, appLocale)
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
