import { parseArgs } from "node:util";
import { Effect } from "effect";
import { PointsCheckError } from "#nakafa-content/points/error";

const DEFAULT_BASE = "origin/main";
const USAGE = "Usage: points/check.ts <directory or file>... [--base <ref>]";

/** What one run checks and the revision it compares visuals with. */
export interface CheckOptions {
  readonly base: string;
  readonly targets: readonly string[];
}

/** Reads the target paths and the revision that visuals are compared with. */
export const parseOptions = Effect.fn("PointsCheck.parseOptions")(function* (
  arguments_: readonly string[]
) {
  const parsed = yield* Effect.try({
    catch: (cause) =>
      new PointsCheckError({
        detail: `${USAGE}\n${String(cause)}`,
        reason: "invalid-arguments",
      }),
    try: () =>
      parseArgs({
        allowPositionals: true,
        args: [...arguments_],
        options: { base: { type: "string" } },
        strict: true,
      }),
  });
  if (parsed.positionals.length === 0) {
    return yield* new PointsCheckError({
      detail: USAGE,
      reason: "invalid-arguments",
    });
  }
  return {
    base: parsed.values.base ?? DEFAULT_BASE,
    targets: parsed.positionals,
  } satisfies CheckOptions;
});
