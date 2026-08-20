import { Schema } from "effect";

const OPTION_KEY_PATTERN = /^option-[1-9]\d*$/u;
const TRYOUT_CONTENT_HASH_PATTERN = /^[a-f\d]{64}$/u;
const PositiveCountSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThan(0))
);

/** Scoring model selected by one authored exam. */
export const TryoutScoringSchema = Schema.Literals(["irt", "raw"]);
export type TryoutScoring = typeof TryoutScoringSchema.Type;

/** Navigation role of one authored track. */
export const TryoutTrackKindSchema = Schema.Literals(["subject", "year"]);

/** Public route behavior of one authored section. */
export const TryoutVisibilitySchema = Schema.Literals([
  "internal-entry",
  "visible",
]);

/** Bounded authored revision shared by one try-out source hierarchy. */
export const TryoutSourceRevisionSchema = Schema.Trimmed.check(
  Schema.isNonEmpty()
).pipe(Schema.check(Schema.isMaxLength(128)));

/** One frozen answer choice delivered in the language being assessed. */
export const TryoutChoiceSchema = Schema.Struct({
  isCorrect: Schema.Boolean,
  label: Schema.String,
  optionKey: Schema.String.pipe(
    Schema.check(Schema.isPattern(OPTION_KEY_PATTERN))
  ),
  order: PositiveCountSchema,
});
export type TryoutChoice = typeof TryoutChoiceSchema.Type;

/** Checks contiguous option identities and exactly one correct answer. */
function hasCoherentChoices(choices: readonly TryoutChoice[]) {
  return (
    choices.filter(({ isCorrect }) => isCorrect).length === 1 &&
    choices.every(
      ({ optionKey, order }, index) =>
        order === index + 1 && optionKey === `option-${order}`
    )
  );
}

/** Complete ordered single-answer choices frozen into one attempt placement. */
export const TryoutChoiceListSchema = Schema.NonEmptyArray(
  TryoutChoiceSchema
).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentChoices, {
      message:
        "Choices require contiguous option identities and one correct answer.",
    })
  )
);

/** Durable complete-question identity retained by every frozen placement. */
export const TryoutContentHashSchema = Schema.String.pipe(
  Schema.check(Schema.isPattern(TRYOUT_CONTENT_HASH_PATTERN)),
  Schema.brand("@NakafaAI/AksaraTryoutContentHash")
);
export type TryoutContentHash = typeof TryoutContentHashSchema.Type;
