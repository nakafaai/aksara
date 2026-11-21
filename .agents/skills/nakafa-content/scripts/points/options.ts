import { Array as Arr, Effect, Schema } from "effect";
import { PointsCheckError } from "#nakafa-content/points/error";

const DEFAULT_BASE = "origin/main";
const ALL_OPTION = "--all";
const BASE_OPTION = "--base";
const BASE_PREFIX = `${BASE_OPTION}=`;
const USAGE =
  "Usage: points/check.ts <directory or file>... [--base <ref>] [--all]";

/** What one run checks and the revision it compares visuals with. */
const CheckOptionsSchema = Schema.Struct({
  all: Schema.Boolean,
  base: Schema.String,
  targets: Schema.NonEmptyArray(Schema.String),
});

/** What one run checks and the revision it compares visuals with. */
export type CheckOptions = typeof CheckOptionsSchema.Type;

/** The usage failure, with the reason the arguments were refused when there is one. */
function invalidArguments(reason?: string) {
  return new PointsCheckError({
    detail: reason === undefined ? USAGE : `${USAGE}\n${reason}`,
    reason: "invalid-arguments",
  });
}

/** Reads the target paths, audit flag, and revision that visuals are compared with. */
export const parseOptions = Effect.fn("PointsCheck.parseOptions")(function* (
  arguments_: readonly string[]
) {
  let all = false;
  let base = DEFAULT_BASE;
  const targets: string[] = [];
  let rest = arguments_;
  while (Arr.isReadonlyArrayNonEmpty(rest)) {
    const [argument, ...tail] = rest;
    rest = tail;
    if (argument === ALL_OPTION) {
      all = true;
    } else if (argument === BASE_OPTION) {
      const [value, ...after] = tail;
      if (value === undefined) {
        return yield* invalidArguments(`${BASE_OPTION} requires a revision`);
      }
      base = value;
      rest = after;
    } else if (argument.startsWith(BASE_PREFIX)) {
      base = argument.slice(BASE_PREFIX.length);
    } else if (argument.startsWith("-")) {
      return yield* invalidArguments(`Unknown option: ${argument}`);
    } else {
      targets.push(argument);
    }
  }
  return yield* Schema.decodeUnknownEffect(CheckOptionsSchema)({
    all,
    base,
    targets,
  }).pipe(Effect.mapError(() => invalidArguments()));
});
