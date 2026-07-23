import { ContentLocaleSchema } from "@nakafa/aksara-contracts/content";
import { Schema } from "effect";

const QuestionChoiceItemSchema = Schema.Struct({
  label: Schema.String,
  value: Schema.Boolean,
}).pipe(Schema.mutable);
type QuestionChoiceItem = typeof QuestionChoiceItemSchema.Type;

/** Reports whether a localized choice list has exactly one correct answer. */
function hasExactlyOneCorrectChoice(
  choices: readonly QuestionChoiceItem[]
): boolean {
  return choices.filter((choice) => choice.value).length === 1;
}

const QuestionChoiceListSchema = Schema.Array(QuestionChoiceItemSchema).pipe(
  Schema.mutable,
  Schema.filter(hasExactlyOneCorrectChoice, {
    identifier: "QuestionChoiceList",
    message: () => "Expected exactly one correct choice.",
  })
);

/** Localized single-answer choices required for every supported locale. */
export const QuestionChoicesSchema = Schema.Record({
  key: ContentLocaleSchema,
  value: QuestionChoiceListSchema,
}).pipe(Schema.mutable);
export type QuestionChoices = typeof QuestionChoicesSchema.Type;
