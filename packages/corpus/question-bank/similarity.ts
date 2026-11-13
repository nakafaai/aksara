import {
  Array as Arr,
  Effect,
  HashSet,
  MutableHashMap,
  MutableHashSet,
  MutableList,
  Option,
  Order,
  pipe,
  Record as Rec,
  Schema,
} from "effect";
import {
  type InteractionSource,
  itemVersions,
} from "#corpus/question-bank/item";
import {
  type QuestionPrompt,
  readQuestionPrompts,
} from "#corpus/question-bank/prompt";
import {
  type Print,
  PrintSchema,
  score,
  shingles,
} from "#corpus/question-bank/similarity/print";
import type { QuestionSet } from "#corpus/question-bank/source";

const MATH_ATTRIBUTE_PATTERN = /math="(?<math>[^"]*)"/gu;
const TAG_PATTERN = /<[^>]+>/gu;
const PARAGRAPH_PATTERN = /\n\s*\n/u;
const COMMAND_PATTERN = /\\(?<command>[a-z]+)/gu;
const SYMBOL_PATTERN = /[{}()[\]$^_=+\-*/,.;:!?"'`|<>“”„‘’]/gu;
const NUMBER_PATTERN = /\d+/gu;
const SPACE_PATTERN = /\s+/u;
const PASSAGE_WORDS = 25;
const COMMON_SHINGLE = 64;
const LABEL_MATH_PATTERN = /\$\$[^$]*\$\$/gu;
const MATH_TEXT_PATTERN = /\\text\{[^{}]*\}/gu;
const MATH_ENVIRONMENT_PATTERN = /\\(?:begin|end)\{[a-z*]+\}/gu;
const FORMULA_BREAK_PATTERN = /\\qquad|\\quad|\\\\|&|\\[,;!]/u;
const FORMULA_NUMBER_PATTERN = /\d+(?:\{[.,]\}\d+)*(?:[.,]\d+)?/gu;
const FORMULA_SPACE_PATTERN = /\s+/gu;
const FORMULA_END_PATTERN = /[.,;]+$/u;
const FORMULA_COMMAND_PATTERN = /\\[a-z]+/giu;
const FORMULA_VARIABLE_PATTERN = /[a-z]/iu;
const FORMULA_RELATION_PATTERN =
  /[=<>+-]|\\(?:le|ge|ne|cdot|times|frac|sqrt)\b/u;
const MASK = "#";
const FORMULA_MIN_LENGTH = 4;
const FORMULA_MIN_SHARED = 3;

/** Splits one text into comparable words, optionally masking every number. */
function words(text: string, mask: boolean) {
  const spaced = text
    .toLowerCase()
    .replace(COMMAND_PATTERN, " \\$1 ")
    .replace(SYMBOL_PATTERN, " ");
  const masked = mask ? spaced.replace(NUMBER_PATTERN, "#") : spaced;
  return Arr.filter(masked.split(SPACE_PATTERN), (word) => word.length > 0);
}

/**
 * Reduces one formula to the shapes a learner reads: spacing and text dropped,
 * every number masked, so a task with new numbers keeps its shape. A shape
 * counts only with a variable and a relation, so a bare number or a lone
 * variable never ties two questions together.
 */
function formulaShapes(math: string): readonly string[] {
  const parts = math
    .replace(MATH_TEXT_PATTERN, "&")
    .replace(MATH_ENVIRONMENT_PATTERN, "&")
    .split(FORMULA_BREAK_PATTERN);
  const shapes = Arr.map(parts, (part) =>
    part
      .replace(FORMULA_SPACE_PATTERN, "")
      .replace(FORMULA_NUMBER_PATTERN, MASK)
      .replace(FORMULA_END_PATTERN, "")
  );
  return Arr.filter(
    shapes,
    (shape) =>
      shape.replaceAll(MASK, "").length >= FORMULA_MIN_LENGTH &&
      FORMULA_VARIABLE_PATTERN.test(
        shape.replace(FORMULA_COMMAND_PATTERN, "")
      ) &&
      FORMULA_RELATION_PATTERN.test(shape)
  );
}

/** Collects the formula shapes of one prompt and the labels it shows. */
function formulas(rawMdx: string, answers: readonly string[]) {
  const written = Arr.map(
    rawMdx.match(MATH_ATTRIBUTE_PATTERN) ?? [],
    (attribute) => attribute.slice('math="'.length, -1)
  );
  const labelled = Arr.flatMap(answers, (answer) =>
    Arr.map(answer.match(LABEL_MATH_PATTERN) ?? [], (math) => math.slice(2, -2))
  );
  return HashSet.fromIterable(
    Arr.flatMap([...written, ...labelled], formulaShapes)
  );
}

/** Prints one text in both comparison forms. */
function print(text: string): Print {
  return {
    exact: shingles(words(text, false)),
    masked: shingles(words(text, true)),
  };
}

/**
 * One pair of questions in different sets, in any languages, that ask with the
 * same formulas once their numbers are masked: the same task with new numbers.
 */
const FormulaMatchSchema = Schema.Struct({
  first: Schema.String,
  score: Schema.Finite,
  second: Schema.String,
  shared: Schema.Array(Schema.String),
});
export type FormulaMatch = typeof FormulaMatchSchema.Type;

/** One pair of questions or passages that read too much alike. */
const SimilarityMatchSchema = Schema.Struct({
  exact: Schema.Finite,
  first: Schema.String,
  masked: Schema.Finite,
  score: Schema.Finite,
  second: Schema.String,
});
export type SimilarityMatch = typeof SimilarityMatchSchema.Type;

/** Every item and passage pair at or above the threshold, highest first. */
const SimilarityReportSchema = Schema.Struct({
  formulas: Schema.Array(FormulaMatchSchema),
  items: Schema.Array(SimilarityMatchSchema),
  passages: Schema.Array(SimilarityMatchSchema),
});
type SimilarityReport = typeof SimilarityReportSchema.Type;

/** One prompt with its own wording separated from the passage it shares. */
const UnitSchema = Schema.Struct({
  formulas: Schema.HashSet(Schema.String),
  full: PrintSchema,
  id: Schema.Finite,
  locale: Schema.String,
  own: PrintSchema,
  root: Schema.String,
  set: Schema.String,
  stimulus: Schema.Array(Schema.String),
});
type Unit = typeof UnitSchema.Type;

/** Reads the visible paragraphs of one prompt, math included. */
function paragraphs(rawMdx: string) {
  const text = rawMdx
    .replace(MATH_ATTRIBUTE_PATTERN, " $1 ")
    .replace(TAG_PATTERN, " ");
  const parts = Arr.map(text.split(PARAGRAPH_PATTERN), (part) => part.trim());
  return Arr.filter(parts, (part) => part.length > 0);
}

/**
 * Lists every option, column, and statement a learner reads with the prompt. A
 * numeric entry shows only its unit, which is no wording of its own.
 */
function labels(interaction: InteractionSource): readonly string[] {
  if (interaction.kind === "numericEntry") {
    return [];
  }
  if (interaction.kind === "matrix") {
    return [
      ...interaction.columns,
      ...Arr.map(interaction.statements, ({ label }) => label),
    ];
  }
  return Arr.map(interaction.options, ({ label }) => label);
}

/** Names the set directory that owns one question directory. */
function setOf(root: string) {
  return root.slice(0, root.lastIndexOf("/"));
}

/** Separates each prompt's shared passage from its own question wording. */
function units(prompts: readonly QuestionPrompt[]) {
  const groups = MutableHashMap.empty<string, QuestionPrompt[]>();
  for (const prompt of prompts) {
    const key = `${setOf(prompt.source.sourceRoot)}\n${prompt.language}`;
    MutableHashMap.set(groups, key, [
      ...Option.getOrElse(MutableHashMap.get(groups, key), () => []),
      prompt,
    ]);
  }
  return Arr.flatMap([...MutableHashMap.values(groups)], (members) => {
    const read = Arr.map(members, (prompt) => ({
      list: paragraphs(prompt.rawMdx),
      prompt,
    }));
    const counts = MutableHashMap.empty<string, number>();
    for (const part of Arr.flatMap(read, ({ list }) => Arr.dedupe(list))) {
      MutableHashMap.set(
        counts,
        part,
        Option.getOrElse(MutableHashMap.get(counts, part), () => 0) + 1
      );
    }
    /** A paragraph is shared unless exactly one prompt in the set uses it. */
    const isShared = (part: string) =>
      Option.getOrUndefined(MutableHashMap.get(counts, part)) !== 1;
    return Arr.map(read, ({ list, prompt }): Omit<Unit, "id"> => {
      const answers = Arr.flatMap(
        itemVersions(prompt.source.item.versions),
        ({ interaction }) => labels(interaction)
      );
      const own = Arr.filter(list, (part) => !isShared(part));
      return {
        formulas: formulas(prompt.rawMdx, answers),
        full: print(Arr.join([...list, ...answers], " ")),
        locale: prompt.language,
        own: print(Arr.join([...own, ...answers], " ")),
        root: prompt.source.sourceRoot,
        set: setOf(prompt.source.sourceRoot),
        stimulus: Arr.filter(list, isShared),
      };
    });
  });
}

/** Adds one unit to the list kept under one key. */
function collect(
  map: MutableHashMap.MutableHashMap<string, MutableList.MutableList<Unit>>,
  key: string,
  unit: Unit
) {
  const list = Option.getOrUndefined(MutableHashMap.get(map, key));
  if (list === undefined) {
    const created = MutableList.make<Unit>();
    MutableList.append(created, unit);
    MutableHashMap.set(map, key, created);
    return;
  }
  MutableList.append(list, unit);
}

/** Lists each unordered pair of one group once when either side is a target. */
function pairs<Item>(
  group: readonly Item[],
  isTarget: (item: Item) => boolean
) {
  return Arr.flatMap(group, (left, index) =>
    pipe(
      Arr.drop(group, index + 1),
      Arr.filter((right) => isTarget(left) || isTarget(right)),
      Arr.map((right) => ({ left, right }))
    )
  );
}

/** Compares siblings by their own wording and other sets by the whole item. */
function itemMatches(
  all: readonly Unit[],
  isTarget: (root: string) => boolean,
  threshold: number
) {
  const sets = MutableHashMap.empty<string, MutableList.MutableList<Unit>>();
  const shared = MutableHashMap.empty<string, MutableList.MutableList<Unit>>();
  for (const unit of all) {
    collect(sets, `${unit.set}\n${unit.locale}`, unit);
    for (const shingle of unit.full.masked) {
      collect(shared, `${unit.locale}\n${shingle}`, unit);
    }
  }
  const siblingGroups = Arr.map(
    [...MutableHashMap.values(sets)],
    MutableList.toArray
  );
  const sharedGroups = Arr.map(
    [...MutableHashMap.values(shared)],
    MutableList.toArray
  );
  const groups = [
    ...siblingGroups,
    ...Arr.filter(sharedGroups, ({ length }) => length <= COMMON_SHINGLE),
  ];
  const seen = MutableHashSet.empty<string>();
  const matches = MutableList.make<SimilarityMatch>();
  for (const group of groups) {
    for (const { left, right } of pairs(group, ({ root }) => isTarget(root))) {
      const key = `${left.id}\n${right.id}`;
      if (MutableHashSet.has(seen, key)) {
        continue;
      }
      MutableHashSet.add(seen, key);
      const sibling = left.set === right.set;
      const match = sibling
        ? score(left.root, left.own, right.root, right.own)
        : score(left.root, left.full, right.root, right.full);
      if (match.score >= threshold) {
        MutableList.append(matches, match);
      }
    }
  }
  return MutableList.toArray(matches);
}

/**
 * Compares questions of different sets in every language by their formula
 * shapes, so a task copied into another exam with new numbers still shows.
 */
function formulaMatches(
  all: readonly Unit[],
  isTarget: (root: string) => boolean,
  threshold: number
) {
  const index = MutableHashMap.empty<string, MutableList.MutableList<Unit>>();
  for (const unit of all) {
    for (const shape of unit.formulas) {
      collect(index, shape, unit);
    }
  }
  const groups = Arr.filter(
    Arr.map([...MutableHashMap.values(index)], MutableList.toArray),
    ({ length }) => length <= COMMON_SHINGLE
  );
  const seen = MutableHashSet.empty<string>();
  const matches = MutableList.make<FormulaMatch>();
  for (const group of groups) {
    for (const { left, right } of pairs(group, ({ root }) => isTarget(root))) {
      const key = `${left.id}\n${right.id}`;
      if (left.set === right.set || MutableHashSet.has(seen, key)) {
        continue;
      }
      MutableHashSet.add(seen, key);
      const shared = Arr.sort(
        Arr.filter([...left.formulas], (shape) =>
          HashSet.has(right.formulas, shape)
        ),
        Order.String
      );
      const overlap =
        shared.length /
        (HashSet.size(left.formulas) +
          HashSet.size(right.formulas) -
          shared.length);
      if (shared.length >= FORMULA_MIN_SHARED && overlap >= threshold) {
        MutableList.append(matches, {
          first: left.root,
          score: overlap,
          second: right.root,
          shared,
        });
      }
    }
  }
  return MutableList.toArray(matches);
}

/** One passage shared inside a set, with the questions that share it. */
const PassageSchema = Schema.Struct({
  locale: Schema.String,
  members: Schema.mutable(Schema.Array(Schema.String)),
  print: PrintSchema,
  set: Schema.String,
});
type Passage = typeof PassageSchema.Type;

/** Names one shared passage by its set and the questions that use it. */
function passageName({ members, set }: Passage) {
  return `${set} (${Arr.join(members, ", ")})`;
}

/** Joins the shared paragraphs of one unit into the text that keys its passage. */
function passageText(unit: Unit) {
  return Arr.join(unit.stimulus, " ");
}

/** Groups the units that share one passage text inside one set and locale. */
function sharedPassages(all: readonly Unit[]) {
  const groups = Arr.groupBy(
    Arr.filter(
      all,
      (unit) => words(passageText(unit), false).length >= PASSAGE_WORDS
    ),
    (unit) => `${unit.set}\n${unit.locale}\n${passageText(unit)}`
  );
  return Arr.map(Rec.values(groups), (group): Passage => {
    const [first] = group;
    return {
      locale: first.locale,
      members: Arr.map(group, (unit) => unit.root.slice(unit.set.length + 1)),
      print: print(passageText(first)),
      set: first.set,
    };
  });
}

/** Compares every shared passage with the passages of other sets. */
function passageMatches(
  all: readonly Unit[],
  isTarget: (root: string) => boolean,
  threshold: number
) {
  const candidates = Arr.filter(
    pairs(sharedPassages(all), ({ set }) => isTarget(set)),
    ({ left, right }) => left.set !== right.set && left.locale === right.locale
  );
  const matches = Arr.map(candidates, ({ left, right }) =>
    score(passageName(left), left.print, passageName(right), right.print)
  );
  return Arr.filter(matches, (match) => match.score >= threshold);
}

/** Orders matches from the most similar, then by path. */
const RANKING = Order.combineAll([
  Order.flip(
    Order.mapInput(Order.Number, (match: SimilarityMatch) => match.score)
  ),
  Order.mapInput(Order.String, (match: SimilarityMatch) => match.first),
  Order.mapInput(Order.String, (match: SimilarityMatch) => match.second),
]);

/** Orders formula matches from the most similar, then by path. */
const FORMULA_RANKING = Order.combineAll([
  Order.flip(
    Order.mapInput(Order.Number, (match: FormulaMatch) => match.score)
  ),
  Order.mapInput(Order.String, (match: FormulaMatch) => match.first),
  Order.mapInput(Order.String, (match: FormulaMatch) => match.second),
]);

/**
 * Finds questions and passages under a target that read like others in the
 * bank, and questions in any language that repeat another set's formulas.
 */
export const scanQuestionSimilarity = Effect.fn(
  "AksaraCorpus.scanQuestionSimilarity"
)(function* (
  corpusRoot: string,
  sets: readonly QuestionSet[],
  target: string,
  threshold: number
) {
  const prompts = yield* readQuestionPrompts(corpusRoot, sets);
  const all = Arr.map(units(prompts), (unit, id): Unit => ({ ...unit, id }));
  /** Targets the directory itself and everything beneath it. */
  const isTarget = (root: string) =>
    root === target || root.startsWith(`${target}/`);
  return {
    formulas: Arr.sort(
      formulaMatches(all, isTarget, threshold),
      FORMULA_RANKING
    ),
    items: Arr.sort(itemMatches(all, isTarget, threshold), RANKING),
    passages: Arr.sort(passageMatches(all, isTarget, threshold), RANKING),
  } satisfies SimilarityReport;
});
