import {
  Array as Arr,
  HashSet,
  MutableHashMap,
  MutableHashSet,
  MutableList,
  Order,
  Schema,
} from "effect";
import { collect, pairs } from "#corpus/question-bank/similarity/group";

/** One `math="..."` attribute of a prompt, with its formula as the group. */
export const MATH_ATTRIBUTE_PATTERN = /math="(?<math>[^"]*)"/gu;
const LABEL_MATH_PATTERN = /\$\$[^$]*\$\$/gu;
const TEXT_PATTERN = /\\text\{[^{}]*\}/gu;
const ENVIRONMENT_PATTERN = /\\(?:begin|end)\{[a-z*]+\}/gu;
const BREAK_PATTERN = /\\qquad|\\quad|\\\\|&|\\[,;!]/u;
const NUMBER_PATTERN = /\d+(?:\{[.,]\}\d+)*(?:[.,]\d+)?/gu;
const SPACE_PATTERN = /\s+/gu;
const END_PATTERN = /[.,;]+$/u;
const COMMAND_PATTERN = /\\[a-z]+/giu;
const VARIABLE_PATTERN = /[a-z]/iu;
const RELATION_PATTERN = /[=<>+-]|\\(?:le|ge|ne|cdot|times|frac|sqrt)\b/u;
const MASK = "#";
const MIN_LENGTH = 4;
const MIN_SHARED = 3;
/** A shape more questions share than this is common notation, not a task. */
const COMMON_SHAPE = 64;

/**
 * Reduces one formula to the shapes a learner reads: spacing and text dropped,
 * every number masked, so a task with new numbers keeps its shape. A shape
 * counts only with a variable and a relation, so a bare number or a lone
 * variable never ties two questions together.
 */
function shapes(math: string): readonly string[] {
  const parts = math
    .replace(TEXT_PATTERN, "&")
    .replace(ENVIRONMENT_PATTERN, "&")
    .split(BREAK_PATTERN);
  return Arr.filter(
    Arr.map(parts, (part) =>
      part
        .replace(SPACE_PATTERN, "")
        .replace(NUMBER_PATTERN, MASK)
        .replace(END_PATTERN, "")
    ),
    (shape) =>
      shape.replaceAll(MASK, "").length >= MIN_LENGTH &&
      VARIABLE_PATTERN.test(shape.replace(COMMAND_PATTERN, "")) &&
      RELATION_PATTERN.test(shape)
  );
}

/** Collects the formula shapes of one prompt and the labels it shows. */
export function formulaShapes(rawMdx: string, answers: readonly string[]) {
  const written = Arr.map(
    rawMdx.match(MATH_ATTRIBUTE_PATTERN) ?? [],
    (attribute) => attribute.slice('math="'.length, -1)
  );
  const labelled = Arr.flatMap(answers, (answer) =>
    Arr.map(answer.match(LABEL_MATH_PATTERN) ?? [], (math) => math.slice(2, -2))
  );
  return HashSet.fromIterable(Arr.flatMap([...written, ...labelled], shapes));
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

/** Every formula pair of one scan, the most similar first. */
export const FormulaPairsSchema = Schema.Array(FormulaMatchSchema);

/** The parts of one scanned question that formula matching reads. */
const FormulaUnitSchema = Schema.Struct({
  formulas: Schema.HashSet(Schema.String),
  id: Schema.Finite,
  root: Schema.String,
  set: Schema.String,
});
type FormulaUnit = typeof FormulaUnitSchema.Type;

/** Orders formula pairs from the most similar, then by path. */
const RANKING = Order.combineAll([
  Order.flip(
    Order.mapInput(Order.Number, (match: FormulaMatch) => match.score)
  ),
  Order.mapInput(Order.String, (match: FormulaMatch) => match.first),
  Order.mapInput(Order.String, (match: FormulaMatch) => match.second),
]);

/** Lists the shapes two questions share and how much of both they cover. */
function overlap(left: FormulaUnit, right: FormulaUnit) {
  const shared = Arr.sort(
    Arr.filter([...left.formulas], (shape) =>
      HashSet.has(right.formulas, shape)
    ),
    Order.String
  );
  const union =
    HashSet.size(left.formulas) + HashSet.size(right.formulas) - shared.length;
  return { score: shared.length / union, shared };
}

/**
 * Compares questions of different sets in every language by their formula
 * shapes, so a task copied into another exam with new numbers still shows.
 */
export function formulaPairs(
  all: readonly FormulaUnit[],
  isTarget: (root: string) => boolean,
  threshold: number
) {
  const index = MutableHashMap.empty<
    string,
    MutableList.MutableList<FormulaUnit>
  >();
  for (const unit of all) {
    for (const shape of unit.formulas) {
      collect(index, shape, unit);
    }
  }
  const seen = MutableHashSet.empty<string>();
  const matches = MutableList.make<FormulaMatch>();
  for (const list of MutableHashMap.values(index)) {
    const group = MutableList.toArray(list);
    if (group.length > COMMON_SHAPE) {
      continue;
    }
    for (const { left, right } of pairs(group, ({ root }) => isTarget(root))) {
      const key = `${left.id}\n${right.id}`;
      if (left.set === right.set || MutableHashSet.has(seen, key)) {
        continue;
      }
      MutableHashSet.add(seen, key);
      const { score, shared } = overlap(left, right);
      if (shared.length >= MIN_SHARED && score >= threshold) {
        MutableList.append(matches, {
          first: left.root,
          score,
          second: right.root,
          shared,
        });
      }
    }
  }
  return Arr.sort(MutableList.toArray(matches), RANKING);
}
