import { Schema } from "effect";

const HISTORICAL_QUESTION_SEGMENT_PATTERN = /^question-[1-9]\d*$/u;

const ContentKeySchema = Schema.String.pipe(
  Schema.pattern(/^[a-z0-9][a-z0-9._:/-]*$/u),
  Schema.maxLength(512),
  Schema.brand("@NakafaAI/AksaraContentKey")
);
const ReleaseIdSchema = Schema.String.pipe(
  Schema.pattern(/^[a-z0-9][a-z0-9._-]{0,127}$/u),
  Schema.brand("@NakafaAI/AksaraReleaseId")
);
const PublicPathSchema = Schema.String.pipe(
  Schema.maxLength(2048),
  Schema.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/u),
  Schema.brand("@NakafaAI/AksaraPublicPath")
);
const CorpusSourcePathSchema = Schema.String.pipe(
  Schema.maxLength(2048),
  Schema.pattern(
    /^packages\/corpus\/[a-z0-9][a-z0-9._-]*(?:\/[a-z0-9][a-z0-9._-]*)+$/u
  ),
  Schema.brand("@NakafaAI/AksaraCorpusSourcePath")
);
const GitCommitShaSchema = Schema.String.pipe(
  Schema.pattern(/^[a-f\d]{40}$/u),
  Schema.brand("@NakafaAI/AksaraGitCommitSha")
);
export const HistoricalSha256HashSchema = Schema.String.pipe(
  Schema.pattern(/^sha256:[a-f\d]{64}$/u),
  Schema.brand("@NakafaAI/AksaraSha256Hash")
);
const SigningKeyIdSchema = Schema.String.pipe(
  Schema.pattern(/^[a-z0-9][a-z0-9._-]{0,63}$/u),
  Schema.brand("@NakafaAI/AksaraSigningKeyId")
);
const Ed25519SignatureSchema = Schema.String.pipe(
  Schema.pattern(/^[A-Za-z0-9_-]{85}[AQgw]$/u),
  Schema.brand("@NakafaAI/AksaraEd25519Signature")
);
const CountryCodeSchema = Schema.String.pipe(Schema.pattern(/^[A-Z]{2}$/u));
const TryoutKeySchema = Schema.String.pipe(
  Schema.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u),
  Schema.maxLength(128)
);
const RendererDomainSchema = Schema.Literal(
  "ai-ds",
  "biology",
  "chemistry",
  "mathematics",
  "physics",
  "politics",
  "snbt-general",
  "snbt-math",
  "snbt-plain",
  "snbt-quant",
  "tka-math"
);
const LearningGraphIdSchema = Schema.String.pipe(
  Schema.pattern(
    /^(?:alignment|asset|concept|lens|lo):[a-z0-9]+(?:-[a-z0-9]+)*(?::[a-z0-9]+(?:-[a-z0-9]+)*)*$/u
  )
);
const LearningGraphIdentitySchema = Schema.Struct({
  alignmentId: LearningGraphIdSchema,
  assetId: LearningGraphIdSchema,
  conceptId: LearningGraphIdSchema,
  learningObjectId: LearningGraphIdSchema,
  lensId: LearningGraphIdSchema,
}).pipe(
  Schema.filter(
    ({ alignmentId, assetId, conceptId, learningObjectId, lensId }) =>
      alignmentId.startsWith("alignment:") &&
      assetId.startsWith("asset:") &&
      conceptId.startsWith("concept:") &&
      learningObjectId.startsWith("lo:") &&
      lensId.startsWith("lens:"),
    { message: () => "Stored graph identities lost their historical prefixes." }
  )
);

export type HistoricalLearningGraphIdentity =
  typeof LearningGraphIdentitySchema.Type;

/** Frozen private primitives used only to decode retained signed bytes. */
export const HistoricalPrimitive = {
  ContentKeySchema,
  CorpusSourcePathSchema,
  CountryCodeSchema,
  Ed25519SignatureSchema,
  GitCommitShaSchema,
  LearningGraphIdentitySchema,
  PublicPathSchema,
  ReleaseIdSchema,
  RendererDomainSchema,
  SigningKeyIdSchema,
  TryoutKeySchema,
} as const;

/** Compares retained strings through stable JavaScript code-unit order. */
export function compareHistoricalCodeUnits(left: string, right: string) {
  if (left < right) {
    return -1;
  }
  if (left > right) {
    return 1;
  }
  return 0;
}

/** Returns whether one segment is an exact historical question number. */
function isHistoricalQuestionSegment(value: string) {
  return HISTORICAL_QUESTION_SEGMENT_PATTERN.test(value);
}

/** Exact old question hierarchy required to authenticate retained placements. */
export function historicalQuestionKeyParts(input: string) {
  const prefix = "question-bank/tryout/";
  if (!input.startsWith(prefix)) {
    return;
  }
  const keys = input.slice(prefix.length).split("/");
  if (
    keys.length < 5 ||
    keys.some(
      (key, index) =>
        !Schema.is(TryoutKeySchema)(key) ||
        (index < keys.length - 1 && isHistoricalQuestionSegment(key))
    )
  ) {
    return;
  }
  const questionSegment = keys.at(-1);
  if (
    questionSegment === undefined ||
    !isHistoricalQuestionSegment(questionSegment)
  ) {
    return;
  }
  const questionNumber = Number(questionSegment.slice("question-".length));
  if (!Number.isSafeInteger(questionNumber) || questionNumber < 1) {
    return;
  }
  return {
    countryKey: keys[0],
    examKey: keys[1],
    questionNumber,
    sectionKey: keys.at(-3),
    setKey: keys.at(-2),
  };
}
