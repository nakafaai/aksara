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
import {
  type AssessmentLanguagePolicy,
  AssessmentLanguagePolicySchema,
  questionArtifactLocalesForPolicy,
} from "@nakafa/aksara-contracts/tryout/language";
import { Effect, Schema } from "effect";
import type { TryoutExamSource } from "#corpus/tryout/schema";

/** Repository-relative root containing every authored Nakafa question. */
export const QUESTION_BANK_ROOT = CorpusSourcePathSchema.make(
  `packages/corpus/${QUESTION_BANK_KEY_ROOT}`
);

const isQuestionSegment = Schema.is(QuestionSegmentSchema);

/** Canonical logical identity derived from one physical question directory. */
export const QuestionLocationSchema = Schema.Struct({
  languagePolicy: AssessmentLanguagePolicySchema,
  questionKey: QuestionKeySchema,
  questionNumber: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
  rendererDomain: RendererDomainSchema,
  setKey: QuestionSetKeySchema,
  sourceRoot: CorpusSourcePathSchema,
});
export type QuestionLocation = typeof QuestionLocationSchema.Type;
export interface QuestionBankDefinition {
  readonly languagePolicy: AssessmentLanguagePolicy;
  readonly rendererDomain: typeof RendererDomainSchema.Type;
}
export type QuestionBankIndex = ReadonlyMap<string, QuestionBankDefinition>;

/** Derives exact answer and assessed-language prompt files for one section. */
export function questionSourceFiles(languagePolicy: AssessmentLanguagePolicy) {
  return Object.freeze(
    [
      "item.ts",
      ...ACTIVE_APP_LOCALES.map((appLocale) => `answer.${appLocale}.mdx`),
      ...questionArtifactLocalesForPolicy(languagePolicy).map(
        (artifactLocale) => `question.${artifactLocale}.mdx`
      ),
    ].sort()
  );
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
    reason: Schema.Literals(["grammar", "language", "renderer"]),
    sourcePath: Schema.String,
  }
) {}

/** Flattens reviewed hierarchy into the section-owned question-bank seams. */
function questionBankSections(sources: readonly TryoutExamSource[]) {
  return sources.flatMap(({ tracks }) =>
    tracks.flatMap(({ sets }) => sets.flatMap(({ sections }) => sections))
  );
}

/** Compares source-owned policies without relying on object serialization. */
function hasSameLanguagePolicy(
  left: AssessmentLanguagePolicy,
  right: AssessmentLanguagePolicy
) {
  return (
    left.kind === right.kind &&
    (left.kind === "app-locale" ||
      (right.kind === "fixed" && left.language === right.language))
  );
}

/** Requires repeated use of one physical bank to retain one exact contract. */
const registerQuestionBank = Effect.fn("AksaraCorpus.registerQuestionBank")(
  function* (
    banks: Map<string, QuestionBankDefinition>,
    section: ReturnType<typeof questionBankSections>[number]
  ) {
    const bankKey = questionBankKey(section.questionSourcePath);
    const definition = banks.get(bankKey);
    if (
      definition !== undefined &&
      definition.rendererDomain !== section.rendererDomain
    ) {
      return yield* new QuestionPathError({
        reason: "renderer",
        sourcePath: `packages/corpus/${bankKey}`,
      });
    }
    if (
      definition !== undefined &&
      !hasSameLanguagePolicy(definition.languagePolicy, section.languagePolicy)
    ) {
      return yield* new QuestionPathError({
        reason: "language",
        sourcePath: `packages/corpus/${bankKey}`,
      });
    }
    banks.set(bankKey, {
      languagePolicy: section.languagePolicy,
      rendererDomain: section.rendererDomain,
    });
  }
);

/** Indexes reviewed question banks once and rejects renderer conflicts. */
export const indexQuestionBanks = Effect.fn("AksaraCorpus.indexQuestionBanks")(
  function* (sources: readonly TryoutExamSource[]) {
    const banks = new Map<string, QuestionBankDefinition>();
    for (const section of questionBankSections(sources)) {
      yield* registerQuestionBank(banks, section);
    }
    return banks;
  }
);

/** Decodes one physical directory into its canonical logical identity. */
export const decodeQuestionPath = Effect.fn("AksaraCorpus.decodeQuestionPath")(
  function* (questionBanks: QuestionBankIndex, physicalRoot: string) {
    const sourcePath = `${QUESTION_BANK_ROOT}/${physicalRoot}`;
    const questionKey = yield* Schema.decodeEffect(QuestionKeySchema)(
      `${QUESTION_BANK_KEY_ROOT}/${physicalRoot}`
    ).pipe(
      Effect.mapError(
        () => new QuestionPathError({ reason: "grammar", sourcePath })
      )
    );
    const { questionNumber, questionSetKey } = questionKeyParts(questionKey);
    const definition = questionBanks.get(questionBankKey(questionSetKey));
    if (definition === undefined) {
      return yield* new QuestionPathError({ reason: "renderer", sourcePath });
    }

    return {
      questionKey,
      questionNumber,
      ...definition,
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
  const decodedPath = yield* Schema.decodeEffect(QuestionSourcePathSchema)(
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
