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
import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";
import {
  type QuestionBodyKind,
  questionKeyParts,
} from "@nakafa/aksara-contracts/question/identity";
import {
  questionArtifactLocaleForSection,
  questionArtifactLocalesForSection,
} from "@nakafa/aksara-contracts/tryout/language";
import { Effect, FileSystem, Path, Schema, Struct } from "effect";
import {
  decodeQuestionDocumentPath,
  indexQuestionBanks,
} from "#corpus/question-bank/path";
import {
  discoverQuestionSources,
  QuestionReadError,
  type QuestionSource,
  QuestionSourceSchema,
  readQuestionSource,
} from "#corpus/question-bank/source";
import type { TryoutExamSource } from "#corpus/tryout/schema";

const QuestionEntrySourceSchema = QuestionSourceSchema.mapFields(
  Struct.omit(["choices", "files"])
);
const QuestionEntryBaseSchema = Schema.Struct({
  ...QuestionEntrySourceSchema.fields,
  artifactLocale: ArtifactLocaleSchema,
  contentKey: ContentKeySchema,
  peerContentKey: ContentKeySchema,
  sourcePath: CorpusSourcePathSchema,
});

/** Strict locale-specific prompt prepared for authenticated delivery. */
const QuestionPromptEntrySchema = Schema.Struct({
  ...QuestionEntryBaseSchema.fields,
  bodyKind: Schema.Literal("question"),
  delivery: Schema.Literal("authenticated"),
});

/** Strict locale-specific answer prepared for entitled delivery. */
const QuestionAnswerEntrySchema = Schema.Struct({
  ...QuestionEntryBaseSchema.fields,
  bodyKind: Schema.Literal("answer"),
  delivery: Schema.Literal("entitled"),
});

/** Strict question-bank body prepared for its exact delivery boundary. */
const QuestionEntrySchema = Schema.Union([
  QuestionPromptEntrySchema,
  QuestionAnswerEntrySchema,
]);
export type QuestionEntry = typeof QuestionEntrySchema.Type;

/** Complete authored question or answer body joined with canonical choices. */
export type QuestionDocumentSource = Omit<QuestionEntry, "sourceRoot"> & {
  readonly choices: QuestionChoices;
  readonly rawMdx: string;
};

/** One selected prompt or answer with its exact source-owned compile closure. */
export interface QuestionContentSelection {
  readonly entries:
    | readonly [QuestionEntry]
    | readonly [QuestionEntry, QuestionEntry];
  readonly selected: QuestionEntry;
  readonly source: QuestionSource;
}

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

/** Builds one selected question closure from an already decoded source row. */
export function questionContentForEntry(
  source: QuestionSource,
  selected: QuestionEntry
): QuestionContentSelection {
  if (selected.bodyKind === "question") {
    return { entries: [selected], selected, source };
  }
  const { sectionKey } = questionKeyParts(source.questionKey);
  const appLocale = AppLocaleSchema.make(
    artifactLocaleCode(selected.artifactLocale)
  );
  const prompt = projectQuestionEntry(
    source,
    "question",
    questionArtifactLocaleForSection(sectionKey, appLocale)
  );
  return { entries: [prompt, selected], selected, source };
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
  return questionContentForEntry(source, selected);
});

/** Reads one registry-owned question body from its exact reviewed source path. */
export const readQuestionDocument = Effect.fn(
  "AksaraCorpus.readQuestionDocument"
)(function* <Entry extends QuestionEntry>(
  corpusRoot: string,
  entry: Entry,
  choices: QuestionChoices
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const rawMdx = yield* fileSystem
    .readFileString(path.join(corpusRoot, entry.sourcePath), "utf8")
    .pipe(
      Effect.mapError(
        (cause) => new QuestionReadError({ cause, path: entry.sourcePath })
      )
    );
  const { sourceRoot: _sourceRoot, ...document } = entry;
  return { ...document, choices, rawMdx } satisfies QuestionDocumentSource;
});
