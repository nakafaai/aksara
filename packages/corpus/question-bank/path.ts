import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import {
  QUESTION_BANK_KEY_ROOT,
  QuestionKeySchema,
  QuestionSegmentSchema,
  QuestionSetKeySchema,
  QuestionSourcePathSchema,
  questionBankKey,
  questionKeyParts,
  questionSourcePathParts,
} from "@nakafa/aksara-contracts/question/identity";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import type { TryoutKey } from "@nakafa/aksara-contracts/tryout/key";
import {
  questionArtifactLocaleForSection,
  questionArtifactLocalesForSection,
} from "@nakafa/aksara-contracts/tryout/language";
import { Effect, Schema } from "effect";
import { AUTHORING_APP_LOCALES } from "#corpus/locale/source";
import {
  questionChoiceOverlayLocale,
  questionChoiceSourceFiles,
} from "#corpus/question-bank/choice-locale";
import type { TryoutExamSource } from "#corpus/tryout/schema";

/** Repository-relative root containing every authored Nakafa question. */
export const QUESTION_BANK_ROOT = CorpusSourcePathSchema.make(
  `packages/corpus/${QUESTION_BANK_KEY_ROOT}`
);

const isQuestionSegment = Schema.is(QuestionSegmentSchema);

/** Canonical logical identity derived from one physical question directory. */
export const QuestionLocationSchema = Schema.Struct({
  questionKey: QuestionKeySchema,
  questionNumber: Schema.Number.pipe(Schema.int(), Schema.positive()),
  rendererDomain: RendererDomainSchema,
  setKey: QuestionSetKeySchema,
  sourceRoot: CorpusSourcePathSchema,
});
export type QuestionLocation = typeof QuestionLocationSchema.Type;
export type QuestionBankIndex = ReadonlyMap<
  string,
  typeof RendererDomainSchema.Type
>;

/** Derives exact answer and assessed-language prompt files for one section. */
export function questionSourceFiles(sectionKey: TryoutKey) {
  return Object.freeze(
    [
      ...questionChoiceSourceFiles(sectionKey, ACTIVE_APP_LOCALES),
      ...ACTIVE_APP_LOCALES.map((appLocale) => `answer.${appLocale}.mdx`),
      ...questionArtifactLocalesForSection(sectionKey).map(
        (artifactLocale) => `question.${artifactLocale}.mdx`
      ),
    ].sort()
  );
}

/** Lists unique prompt locales allowed while authoring inactive app locales. */
export function questionAuthoringArtifactLocalesForSection(
  sectionKey: TryoutKey
) {
  return Object.freeze([
    ...new Set(
      AUTHORING_APP_LOCALES.map((appLocale) =>
        questionArtifactLocaleForSection(sectionKey, appLocale)
      )
    ),
  ]);
}

/** Derives every allowed active or candidate file in one question directory. */
export function questionAuthoringSourceFiles(sectionKey: TryoutKey) {
  return Object.freeze(
    [
      ...questionChoiceSourceFiles(sectionKey, AUTHORING_APP_LOCALES),
      ...AUTHORING_APP_LOCALES.map((appLocale) => `answer.${appLocale}.mdx`),
      ...questionAuthoringArtifactLocalesForSection(sectionKey).map(
        (artifactLocale) => `question.${artifactLocale}.mdx`
      ),
    ].sort()
  );
}

/** Returns whether every choice overlay has its same-locale authored prompt. */
export function hasCompleteQuestionChoiceOverlays(
  sectionKey: TryoutKey,
  files: readonly string[]
) {
  return questionChoiceSourceFiles(sectionKey, AUTHORING_APP_LOCALES)
    .filter((file) => file !== "choices.ts")
    .every((file) => {
      const appLocale = questionChoiceOverlayLocale(file);
      return (
        appLocale !== undefined &&
        files.includes(file) === files.includes(`question.${appLocale}.mdx`)
      );
    });
}

/** Finds the terminal question directory and its direct relative file path. */
export function locateQuestionEntry(entry: string, separator: string) {
  const segments = entry.split(separator);
  let questionIndex = -1;
  for (const [index, segment] of segments.entries()) {
    if (isQuestionSegment(segment)) {
      questionIndex = index;
    }
  }
  if (questionIndex === -1) {
    return;
  }
  return {
    file: segments.slice(questionIndex + 1).join("/"),
    root: segments.slice(0, questionIndex + 1).join("/"),
  };
}

/** A physical question directory does not follow the canonical path grammar. */
export class QuestionPathError extends Schema.TaggedError<QuestionPathError>()(
  "QuestionPathError",
  {
    reason: Schema.Literal("grammar", "renderer"),
    sourcePath: Schema.String,
  }
) {}

/** Indexes reviewed question banks once and rejects renderer conflicts. */
export const indexQuestionBanks = Effect.fn("AksaraCorpus.indexQuestionBanks")(
  function* (sources: readonly TryoutExamSource[]) {
    const banks = new Map<string, typeof RendererDomainSchema.Type>();
    for (const source of sources) {
      for (const track of source.tracks) {
        for (const set of track.sets) {
          for (const section of set.sections) {
            const bankKey = questionBankKey(section.questionSourcePath);
            const rendererDomain = banks.get(bankKey);
            if (
              rendererDomain !== undefined &&
              rendererDomain !== section.rendererDomain
            ) {
              return yield* new QuestionPathError({
                reason: "renderer",
                sourcePath: `packages/corpus/${bankKey}`,
              });
            }
            banks.set(bankKey, section.rendererDomain);
          }
        }
      }
    }
    return banks;
  }
);

/** Decodes one physical directory into its canonical logical identity. */
export const decodeQuestionPath = Effect.fn("AksaraCorpus.decodeQuestionPath")(
  function* (questionBanks: QuestionBankIndex, physicalRoot: string) {
    const sourcePath = `${QUESTION_BANK_ROOT}/${physicalRoot}`;
    const questionKey = yield* Schema.decodeUnknown(QuestionKeySchema)(
      `${QUESTION_BANK_KEY_ROOT}/${physicalRoot}`
    ).pipe(
      Effect.mapError(
        () => new QuestionPathError({ reason: "grammar", sourcePath })
      )
    );
    const { questionNumber, questionSetKey } = questionKeyParts(questionKey);
    const rendererDomain = questionBanks.get(questionBankKey(questionSetKey));
    if (rendererDomain === undefined) {
      return yield* new QuestionPathError({ reason: "renderer", sourcePath });
    }

    return {
      questionKey,
      questionNumber,
      rendererDomain,
      setKey: questionSetKey,
      sourceRoot: CorpusSourcePathSchema.make(sourcePath),
    };
  }
);

/** Decodes one exact localized question or answer body source path. */
export const decodeQuestionDocumentPath = Effect.fn(
  "AksaraCorpus.decodeQuestionDocumentPath"
)(function* (
  questionBanks: QuestionBankIndex,
  sourcePath: typeof CorpusSourcePathSchema.Type
) {
  const decodedPath = yield* Schema.decodeUnknown(QuestionSourcePathSchema)(
    sourcePath
  ).pipe(
    Effect.mapError(
      () => new QuestionPathError({ reason: "grammar", sourcePath })
    )
  );
  const parts = questionSourcePathParts(decodedPath);
  if (parts.kind !== "body") {
    return yield* new QuestionPathError({ reason: "grammar", sourcePath });
  }
  const physicalRoot = parts.questionKey.slice(
    QUESTION_BANK_KEY_ROOT.length + 1
  );
  const location = yield* decodeQuestionPath(questionBanks, physicalRoot);
  return {
    ...location,
    artifactLocale: parts.artifactLocale,
    bodyKind: parts.bodyKind,
    sourcePath,
  };
});
