import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  Array as Arr,
  Effect,
  HashSet,
  MutableHashMap,
  Option,
  Schema,
} from "effect";
import { readQuestionPrompts } from "#corpus/question-bank/prompt";
import type { QuestionSource } from "#corpus/question-bank/source";

const METADATA_PATTERN = /^export const metadata = \{[\s\S]*?\};\s*/u;
const MARK_PATTERN = /[“”„"'‘’`*]/gu;
const SPACE_PATTERN = /\s+/gu;
const NUMBER_PATTERN = /\d+(?:(?:[.,]|\{[.,]\})\d+)*/gu;

/** Prompts in one locale that repeat each other exactly or in all but numbers. */
const QuestionRepeatSchema = Schema.Struct({
  match: Schema.Literals(["numbers", "text"]),
  paths: Schema.Array(CorpusSourcePathSchema),
});
type QuestionRepeat = typeof QuestionRepeatSchema.Type;

/** The bank holds prompts that repeat another prompt in the same locale. */
export class QuestionDuplicateError extends Schema.TaggedError<QuestionDuplicateError>()(
  "QuestionDuplicateError",
  { repeats: Schema.Array(QuestionRepeatSchema) }
) {}

/** One prompt body reduced to its locale-scoped comparison keys. */
const PromptPrintSchema = Schema.Struct({
  numbers: Schema.String,
  path: CorpusSourcePathSchema,
  text: Schema.String,
});
type PromptPrint = typeof PromptPrintSchema.Type;

/** Removes case, quote, emphasis, and spacing differences that hide a repeat. */
function normalizePrompt(rawMdx: string) {
  return rawMdx
    .replace(METADATA_PATTERN, "")
    .toLowerCase()
    .replace(MARK_PATTERN, "")
    .replace(SPACE_PATTERN, " ")
    .trim();
}

/** Groups prompts by one comparison key and keeps every shared key. */
function sharedPrints(
  prints: readonly PromptPrint[],
  key: (print: PromptPrint) => string
) {
  const groups = MutableHashMap.empty<string, PromptPrint[]>();
  for (const print of prints) {
    const value = key(print);
    MutableHashMap.set(groups, value, [
      ...Option.getOrElse(MutableHashMap.get(groups, value), () => []),
      print,
    ]);
  }
  return Arr.filter(
    [...MutableHashMap.values(groups)],
    (group) => group.length > 1
  );
}

/** Names one repeat group by its kind and exact prompt paths. */
function repeat(
  match: QuestionRepeat["match"],
  group: readonly PromptPrint[]
): QuestionRepeat {
  return { match, paths: Arr.map(group, ({ path }) => path) };
}

/** Rejects repeated prompts at source ingestion before any signed publication. */
export const validateQuestionUniqueness = Effect.fn(
  "AksaraCorpus.validateQuestionUniqueness"
)(function* (corpusRoot: string, sources: readonly QuestionSource[]) {
  const prompts = yield* readQuestionPrompts(corpusRoot, sources);
  const prints = Arr.map(prompts, ({ locale, path, rawMdx }) => {
    const text = `${locale}\n${normalizePrompt(rawMdx)}`;
    return { numbers: text.replace(NUMBER_PATTERN, "#"), path, text };
  });
  const numberGroups = Arr.filter(
    sharedPrints(prints, ({ numbers }) => numbers),
    (group) =>
      HashSet.size(HashSet.fromIterable(Arr.map(group, ({ text }) => text))) > 1
  );
  const repeats = [
    ...Arr.map(
      sharedPrints(prints, ({ text }) => text),
      (group) => repeat("text", group)
    ),
    ...Arr.map(numberGroups, (group) => repeat("numbers", group)),
  ];
  if (repeats.length > 0) {
    return yield* new QuestionDuplicateError({ repeats });
  }
});
