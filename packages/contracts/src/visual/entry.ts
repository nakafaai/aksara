import { Array as Arr, Predicate, Record as Rec, Schema } from "effect";

/**
 * How a document draws a catalog component. A `figure` is a visual that a
 * lesson places as an element and an assessment places as a figure node. A
 * `markup` component shapes text or layout instead, such as a formula, a
 * highlighted phrase, or a stack of blocks, and an assessment writes it as
 * nodes and marks of its own.
 */
export type VisualKind = "figure" | "markup";

/**
 * One step of an answer path: a prop name, or `*` for every entry of a record
 * or every item of a list.
 */
export type AnswerStep = string;

/** The path of a prop that holds answer state, such as `["trigValues"]`. */
export type AnswerPattern = readonly [AnswerStep, ...AnswerStep[]];

/**
 * Lists the answer state that decoded props hold, each as the dotted path of a
 * prop that is present, such as `labels.modes.closed.calculation`.
 */
export type AnswerReader = (props: unknown) => readonly string[];

/**
 * One component of the catalog: its kind, the schema of its props in one
 * document kind, and the reader of the answer state those props hold.
 */
export interface VisualEntry<Props extends Schema.Top> {
  readonly answer: AnswerReader;
  readonly kind: VisualKind;
  readonly props: Props;
}

/** The value one step of a path names in a value, with the path so far. */
const LocatedSchema = Schema.Struct({
  path: Schema.Array(Schema.String),
  value: Schema.Unknown,
});
type Located = typeof LocatedSchema.Type;

/** Follows one step of a path from every value reached so far. */
function stepInto(located: readonly Located[], step: AnswerStep) {
  return Arr.flatMap(located, ({ path, value }): readonly Located[] => {
    if (Arr.isArray(value)) {
      return step === "*"
        ? Arr.map(value, (item, index) => ({
            path: [...path, String(index)],
            value: item,
          }))
        : [];
    }
    if (!Predicate.isObject(value)) {
      return [];
    }
    if (step !== "*") {
      const next = Predicate.hasProperty(value, step) ? value[step] : false;
      return next === false ? [] : [{ path: [...path, step], value: next }];
    }
    return Arr.map(Rec.toEntries(value), ([key, item]) => ({
      path: [...path, key],
      value: item,
    }));
  });
}

/**
 * Reads answer state at fixed paths: every prop that one of the patterns names
 * and that the props hold, written as its dotted path. A flag set to `false`
 * shows nothing, so it holds no answer state.
 */
export function answerAt(...patterns: readonly AnswerPattern[]): AnswerReader {
  return (props) =>
    Arr.flatMap(patterns, (pattern) =>
      Arr.map(
        Arr.reduce(pattern, [{ path: [], value: props }], stepInto),
        ({ path }) => Arr.join(path, ".")
      )
    );
}

/** A component whose props never hold answer state. */
export const noAnswer: AnswerReader = () => [];

/** A figure component, with the answer state its props may hold. */
export function figure<Props extends Schema.Top>(
  props: Props,
  answer: AnswerReader = noAnswer
): VisualEntry<Props> {
  return { answer, kind: "figure", props };
}

/** A markup component: a formula, an emphasis, or a layout around blocks. */
export function markup<Props extends Schema.Top>(
  props: Props
): VisualEntry<Props> {
  return { answer: noAnswer, kind: "markup", props };
}
