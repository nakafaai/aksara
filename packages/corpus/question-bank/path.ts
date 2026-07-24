import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  QuestionKeySchema,
  QuestionSetKeySchema,
} from "@nakafa/aksara-contracts/projection/question";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, Schema } from "effect";

/** Repository-relative root containing every authored Nakafa question. */
export const QUESTION_BANK_ROOT =
  "packages/corpus/question-bank/tryout/indonesia";

const CONTENT_ROOT = "question-bank/tryout/indonesia";
const QUESTION_PATH_PATTERN =
  /^(?<exam>[a-z0-9]+(?:-[a-z0-9]+)*)\/(?<group>[a-z0-9]+(?:-[a-z0-9]+)*)\/set-(?<setNumber>[1-9]\d*)\/question-(?<questionNumber>[1-9]\d*)$/;

const QuestionPathGroupsSchema = Schema.Struct({
  exam: Schema.String,
  group: Schema.String,
  questionNumber: Schema.NumberFromString.pipe(Schema.int(), Schema.positive()),
  setNumber: Schema.String,
});

/** Canonical logical identity derived from one physical question directory. */
export const QuestionLocationSchema = Schema.Struct({
  questionKey: QuestionKeySchema,
  questionNumber: Schema.Number.pipe(Schema.int(), Schema.positive()),
  rendererDomain: RendererDomainSchema,
  setKey: QuestionSetKeySchema,
  sourceRoot: CorpusSourcePathSchema,
});

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
)(function* (exam: string, group: string, sourcePath: string) {
  if (exam === "tka" && group === "mathematics") {
    return "tka-math";
  }
  if (exam === "snbt" && group === "general-reasoning") {
    return "snbt-general";
  }
  if (exam === "snbt" && group === "mathematical-reasoning") {
    return "snbt-math";
  }
  if (exam === "snbt" && group === "quantitative-knowledge") {
    return "snbt-quant";
  }
  if (exam === "snbt") {
    return "snbt-plain";
  }
  return yield* new QuestionPathError({ reason: "renderer", sourcePath });
});

/** Decodes one physical directory into its canonical logical identity. */
export const decodeQuestionPath = Effect.fn("AksaraCorpus.decodeQuestionPath")(
  function* (physicalRoot: string) {
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
