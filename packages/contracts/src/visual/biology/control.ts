import { Array as Arr, Schema } from "effect";

/**
 * The options a lab offers from a fixed list: at least one, each once, in the
 * order its toggle lists them.
 */
export function pickedFrom<const Ids extends readonly [string, ...string[]]>(
  ids: Ids
) {
  return Schema.NonEmptyArray(Schema.Literals(ids)).check(Schema.isUnique());
}

/**
 * A slider over values of one kind: its range and its starting value, with
 * the minimum below the maximum and the start between them.
 */
export function sliderOf(value: Schema.Codec<number>) {
  return Schema.Struct({ max: value, min: value, value }).check(
    Schema.makeFilter(
      ({ max, min, value: start }) => min < max && min <= start && start <= max,
      {
        message:
          "Expected a slider range whose minimum is below its maximum, with the starting value between them.",
      }
    )
  );
}

/** Checks that some words are all given when what they describe is shown, and none otherwise. */
export function givenWhen(shown: boolean, words: readonly unknown[]) {
  return Arr.every(words, (word) => (word !== undefined) === shown);
}
