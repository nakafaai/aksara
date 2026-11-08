import type { AssessmentSite } from "@nakafa/aksara-compiler/assessment/error";
import { labelDocument } from "@nakafa/aksara-compiler/assessment/label";
import type { AppLocaleCode } from "@nakafa/aksara-contracts/locale";
import type { InteractionSource } from "@nakafa/aksara-corpus/question-bank/item";
import { Array as Arr, Effect, Result, String as Str } from "effect";

/**
 * What a screen reader calls the one interaction of an item, in the language
 * the item is asked in.
 */
const ANSWER_LABELS = {
  de: "Antwort",
  en: "Answer",
  id: "Jawaban",
} satisfies Record<AppLocaleCode, string>;

/**
 * The interaction and its answer that one authored task becomes, with document
 * labels. A typed number takes a fraction such as `3/4` exactly when its value
 * is not a whole number.
 */
export const assembleInteraction = Effect.fn(
  "AksaraPublisher.assembleInteraction"
)(function* (
  source: InteractionSource,
  language: AppLocaleCode,
  site: AssessmentSite
) {
  if (source.kind === "numericEntry") {
    return {
      interaction: {
        acceptsFractions: Str.includes(".")(source.value),
        id: "number",
        kind: "numericEntry",
        label: ANSWER_LABELS[language],
        ...(source.unit === undefined ? {} : { unit: source.unit }),
      },
      key: {
        interaction: "number",
        kind: "numericEntry",
        value: source.value,
      },
    };
  }
  /** Compiles one authored label into the label document of this site. */
  const label = (text: string) => labelDocument(text, site);
  if (source.kind === "matrix") {
    const columns = yield* Effect.forEach(source.columns, (text, index) =>
      Effect.map(label(text), (document) => ({
        id: `column-${index + 1}`,
        label: document,
      }))
    );
    const statements = yield* Effect.forEach(
      source.statements,
      (statement, index) =>
        Effect.map(label(statement.label), (document) => ({
          id: `statement-${index + 1}`,
          label: document,
        }))
    );
    return {
      interaction: {
        columns,
        id: "matrix",
        kind: "matrix",
        label: ANSWER_LABELS[language],
        shuffle: false,
        statements,
      },
      key: {
        answers: Arr.map(source.statements, ({ column }, index) => ({
          column: `column-${column}`,
          statement: `statement-${index + 1}`,
        })),
        interaction: "matrix",
        kind: "matrix",
      },
    };
  }
  const options = yield* Effect.forEach(source.options, (option, index) =>
    Effect.map(label(option.label), (document) => ({
      id: `option-${index + 1}`,
      label: document,
    }))
  );
  const correct = Arr.filterMap(source.options, (option, index) =>
    option.correct ? Result.succeed(`option-${index + 1}`) : Result.failVoid
  );
  return {
    interaction: {
      id: "choice",
      kind: "choice",
      label: ANSWER_LABELS[language],
      maxChoices: correct.length === 1 ? 1 : options.length,
      minChoices: 0,
      options,
      shuffle: false,
    },
    key: { correct, interaction: "choice", kind: "choice" },
  };
});
