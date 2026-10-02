import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  APP_LOCALE_CODES,
  AppLocaleCodeSchema,
  type ArtifactLocale,
  ArtifactLocaleSchema,
  artifactLocaleCode,
} from "@nakafa/aksara-contracts/locale";
import type { QuestionItemSchema } from "@nakafa/aksara-contracts/question/item";
import { Effect, Schema } from "effect";

/** An authored item does not exactly match its section-owned locales. */
export class QuestionItemLocaleError extends Schema.TaggedError<QuestionItemLocaleError>()(
  "QuestionItemLocaleError",
  {
    actualLocales: Schema.Array(AppLocaleCodeSchema),
    expectedLocales: Schema.Array(ArtifactLocaleSchema),
    sourcePath: CorpusSourcePathSchema,
  }
) {}

/** Returns canonical locale keys present in one decoded item. */
function actualItemLocales(item: typeof QuestionItemSchema.Type) {
  return APP_LOCALE_CODES.filter(
    (appLocale) => item.responses[appLocale] !== undefined
  );
}

/** Requires one owner source to contain exactly its assessed item locales. */
export const validateQuestionItemLocales = Effect.fn(
  "AksaraCorpus.validateQuestionItemLocales"
)(function* (
  item: typeof QuestionItemSchema.Type,
  expectedLocales: readonly ArtifactLocale[],
  sourcePath: typeof CorpusSourcePathSchema.Type
) {
  const actualLocales = actualItemLocales(item);
  const matches =
    actualLocales.length === expectedLocales.length &&
    expectedLocales.every(
      (expected, index) => actualLocales[index] === artifactLocaleCode(expected)
    );
  if (!matches) {
    return yield* new QuestionItemLocaleError({
      actualLocales,
      expectedLocales: [...expectedLocales],
      sourcePath,
    });
  }
  return item;
});
