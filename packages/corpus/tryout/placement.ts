import {
  type AppLocale,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { QuestionKeySchema } from "@nakafa/aksara-contracts/question/identity";
import { questionResponseFor } from "@nakafa/aksara-contracts/question/item";
import {
  deliveryLanguageForPolicy,
  questionArtifactLocaleForPolicy,
} from "@nakafa/aksara-contracts/tryout/language";
import { TryoutPlacementSourceSchema } from "@nakafa/aksara-contracts/tryout/placement";
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
    reason: Schema.Literals(["decode", "order", "owner", "response"]),
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
  appLocale: AppLocale
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
  const deliveryLanguage = deliveryLanguageForPolicy(
    section.languagePolicy,
    appLocale
  );
  const questionArtifactLocale = questionArtifactLocaleForPolicy(
    section.languagePolicy,
    appLocale
  );
  const answerArtifactLocale = ArtifactLocaleSchema.make(appLocale);
  const response = yield* questionResponseFor(
    question.item,
    questionArtifactLocale
  ).pipe(
    Effect.mapError(
      () =>
        new TryoutPlacementError({
          questionKey: question.questionKey,
          reason: "response",
        })
    )
  );
  return yield* Schema.decodeEffect(TryoutPlacementSourceSchema)(
    {
      answerArtifactLocale,
      answerContentKey: `${question.questionKey}/answer`,
      appLocale,
      ...(question.item.blueprint === undefined
        ? {}
        : { blueprint: question.item.blueprint }),
      countryKey: source.countryKey,
      deliveryLanguage,
      examKey: source.examKey,
      languagePolicy: section.languagePolicy,
      questionArtifactLocale,
      questionContentKey: `${question.questionKey}/question`,
      questionOrder: question.questionNumber,
      questionSourcePath: question.sourceRoot,
      rendererDomain: section.rendererDomain,
      response,
      scope: "server",
      sectionKey: section.key,
      setKey: set.key,
      sourceRevision: source.sourceRevision,
      ...(question.item.stimulusKey === undefined
        ? {}
        : { stimulusKey: question.item.stimulusKey }),
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
