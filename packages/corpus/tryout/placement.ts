import type { ContentLocaleSchema } from "@nakafa/aksara-contracts/content";
import { QuestionKeySchema } from "@nakafa/aksara-contracts/question/identity";
import { TryoutPlacementSourceSchema } from "@nakafa/aksara-contracts/tryout/spec";
import { Effect, Schema } from "effect";
import type { QuestionSource } from "#corpus/question-bank/source";
import type { TryoutExamSource } from "#corpus/tryout/schema";

type TryoutTrackSource = TryoutExamSource["tracks"][number];
type TryoutSetSource = TryoutTrackSource["sets"][number];
type TryoutSectionSource = TryoutSetSource["sections"][number];

/** Exact source hierarchy that owns one authored question placement. */
export interface TryoutPlacementContext {
  readonly section: TryoutSectionSource;
  readonly set: TryoutSetSource;
  readonly source: TryoutExamSource;
  readonly track: TryoutTrackSource;
}

/** One question cannot be placed in the supplied source hierarchy. */
export class TryoutPlacementError extends Schema.TaggedError<TryoutPlacementError>()(
  "TryoutPlacementError",
  {
    questionKey: QuestionKeySchema,
    reason: Schema.Literal("decode", "order", "owner"),
  }
) {}

/** Checks that the supplied hierarchy is nested in its decoded exam source. */
function ownsContext(context: TryoutPlacementContext) {
  return context.source.tracks.some(
    (track) =>
      track === context.track &&
      track.sets.some(
        (set) =>
          set === context.set &&
          set.sections.some((section) => section === context.section)
      )
  );
}

/** Builds one canonical locale-specific placement from its source hierarchy. */
export const makeTryoutPlacement = Effect.fn(
  "AksaraCorpus.makeTryoutPlacement"
)(function* (
  context: TryoutPlacementContext,
  question: QuestionSource,
  locale: typeof ContentLocaleSchema.Type
) {
  if (
    !ownsContext(context) ||
    question.setKey !== context.section.questionSourcePath ||
    question.rendererDomain !== context.section.rendererDomain
  ) {
    return yield* new TryoutPlacementError({
      questionKey: question.questionKey,
      reason: "owner",
    });
  }
  if (question.questionNumber > context.section.questionCount) {
    return yield* new TryoutPlacementError({
      questionKey: question.questionKey,
      reason: "order",
    });
  }
  const { section, set, source, track } = context;
  return yield* Schema.decodeUnknown(TryoutPlacementSourceSchema)(
    {
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
      questionOrder: question.questionNumber,
      questionSourcePath: question.sourceRoot,
      rendererDomain: section.rendererDomain,
      scope: "server",
      sectionKey: section.key,
      setKey: set.key,
      sourceRevision: source.sourceRevision,
      trackKey: track.key,
    },
    { onExcessProperty: "error" }
  ).pipe(
    Effect.mapError(
      () =>
        new TryoutPlacementError({
          questionKey: question.questionKey,
          reason: "decode",
        })
    )
  );
});
