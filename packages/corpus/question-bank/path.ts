import { ContentLocaleSchema } from "@nakafa/aksara-contracts/content";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  QuestionBodyKindSchema,
  QuestionKeySchema,
  QuestionSetKeySchema,
} from "@nakafa/aksara-contracts/question/identity";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, Schema } from "effect";
import type { TryoutExamSource } from "#corpus/tryout/schema";

/** Repository-relative root containing every authored Nakafa question. */
export const QUESTION_BANK_ROOT = CorpusSourcePathSchema.make(
  "packages/corpus/question-bank/tryout/indonesia"
);

const CONTENT_ROOT = "question-bank/tryout/indonesia";
const QUESTION_PATH_PATTERN =
  /^(?<exam>[a-z0-9]+(?:-[a-z0-9]+)*)\/(?<group>[a-z0-9]+(?:-[a-z0-9]+)*)\/set-(?<setNumber>[1-9]\d*)\/question-(?<questionNumber>[1-9]\d*)$/;

const QuestionPathGroupsSchema = Schema.Struct({
  exam: Schema.String,
  group: Schema.String,
  questionNumber: Schema.NumberFromString.pipe(Schema.int(), Schema.positive()),
  setNumber: Schema.String,
});

/** Exact direct files required in every authored question directory. */
export const QUESTION_SOURCE_FILES = Object.freeze(
  [
    "choices.ts",
    ...QuestionBodyKindSchema.literals.flatMap((bodyKind) =>
      ContentLocaleSchema.literals.map((locale) => `${bodyKind}.${locale}.mdx`)
    ),
  ].sort()
);

/** Canonical logical identity derived from one physical question directory. */
export const QuestionLocationSchema = Schema.Struct({
  questionKey: QuestionKeySchema,
  questionNumber: Schema.Number.pipe(Schema.int(), Schema.positive()),
  rendererDomain: RendererDomainSchema,
  setKey: QuestionSetKeySchema,
  sourceRoot: CorpusSourcePathSchema,
});
export type QuestionLocation = typeof QuestionLocationSchema.Type;

/** A physical question directory does not follow the canonical path grammar. */
export class QuestionPathError extends Schema.TaggedError<QuestionPathError>()(
  "QuestionPathError",
  {
    reason: Schema.Literal("grammar", "renderer"),
    sourcePath: Schema.String,
  }
) {}

/** Maps one validated exam and logical group onto its renderer contract. */
const decodeRendererDomain = Effect.fn(
  "AksaraCorpus.decodeQuestionRendererDomain"
)(function* (
  sources: readonly TryoutExamSource[],
  exam: string,
  group: string,
  sourcePath: string
) {
  const groupRoot = `${CONTENT_ROOT}/${exam}/${group}/`;
  const domains = new Set(
    sources.flatMap((source) =>
      source.tracks.flatMap((track) =>
        track.sets.flatMap((set) =>
          set.sections.flatMap((section) =>
            section.questionSourcePath.startsWith(groupRoot)
              ? [section.rendererDomain]
              : []
          )
        )
      )
    )
  );
  const [rendererDomain] = domains;
  if (domains.size !== 1 || rendererDomain === undefined) {
    return yield* new QuestionPathError({ reason: "renderer", sourcePath });
  }
  return rendererDomain;
});

/** Decodes one physical directory into its canonical logical identity. */
export const decodeQuestionPath = Effect.fn("AksaraCorpus.decodeQuestionPath")(
  function* (sources: readonly TryoutExamSource[], physicalRoot: string) {
    const sourcePath = `${QUESTION_BANK_ROOT}/${physicalRoot}`;
    const match = QUESTION_PATH_PATTERN.exec(physicalRoot);
    const groups = yield* Schema.decodeUnknown(QuestionPathGroupsSchema)(
      match?.groups,
      { onExcessProperty: "error" }
    ).pipe(
      Effect.mapError(
        () => new QuestionPathError({ reason: "grammar", sourcePath })
      )
    );
    const rendererDomain = yield* decodeRendererDomain(
      sources,
      groups.exam,
      groups.group,
      sourcePath
    );
    const setKey = `${CONTENT_ROOT}/${groups.exam}/${groups.group}/set-${groups.setNumber}`;

    return yield* Schema.decodeUnknown(QuestionLocationSchema)(
      {
        questionKey: `${setKey}/question-${groups.questionNumber}`,
        questionNumber: groups.questionNumber,
        rendererDomain,
        setKey,
        sourceRoot: sourcePath,
      },
      { onExcessProperty: "error" }
    ).pipe(
      Effect.mapError(
        () => new QuestionPathError({ reason: "grammar", sourcePath })
      )
    );
  }
);

/** Decodes one exact localized question or answer body source path. */
export const decodeQuestionDocumentPath = Effect.fn(
  "AksaraCorpus.decodeQuestionDocumentPath"
)(function* (
  sources: readonly TryoutExamSource[],
  sourcePath: typeof CorpusSourcePathSchema.Type
) {
  const prefix = `${QUESTION_BANK_ROOT}/`;
  const body = QuestionBodyKindSchema.literals
    .flatMap((bodyKind) =>
      ContentLocaleSchema.literals.map((locale) => ({
        bodyKind,
        locale,
        suffix: `/${bodyKind}.${locale}.mdx`,
      }))
    )
    .find(({ suffix }) => sourcePath.endsWith(suffix));
  if (body === undefined || !sourcePath.startsWith(prefix)) {
    return yield* new QuestionPathError({
      reason: "grammar",
      sourcePath,
    });
  }
  const physicalRoot = sourcePath.slice(
    prefix.length,
    sourcePath.length - body.suffix.length
  );
  const location = yield* decodeQuestionPath(sources, physicalRoot);
  return {
    ...location,
    bodyKind: body.bodyKind,
    locale: body.locale,
    sourcePath,
  };
});
