import { describe, expect, it } from "@effect/vitest";
import { Cause, Console, Effect } from "effect";
import { reportFailure } from "#scripts/workflow/failure";

/** Returns a console whose error channel records each line written to standard error. */
function recordStandardError() {
  const errors: string[] = [];
  const testConsole: Console.Console = Object.assign(Object.create(console), {
    error: (...values: readonly unknown[]) => {
      errors.push(values.join(" "));
    },
  });
  return { errors, testConsole };
}

describe("workflow failure report", () => {
  it.effect("writes the cause of a failed check to standard error", () => {
    const { errors, testConsole } = recordStandardError();
    return Effect.gen(function* () {
      yield* reportFailure(
        Cause.die(new Error("Workflows must not retain registry machinery"))
      );
      expect(errors).toHaveLength(1);
      expect(errors[0]).toContain(
        "Workflows must not retain registry machinery"
      );
    }).pipe(Effect.provideService(Console.Console, testConsole));
  });

  it.effect("stays silent for an interruption alone", () => {
    const { errors, testConsole } = recordStandardError();
    return Effect.gen(function* () {
      yield* reportFailure(Cause.interrupt());
      expect(errors).toEqual([]);
    }).pipe(Effect.provideService(Console.Console, testConsole));
  });
});
