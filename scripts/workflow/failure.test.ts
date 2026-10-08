import { describe, expect, it } from "@effect/vitest";
import { Cause, Console, Effect } from "effect";
import { reportFailure } from "#scripts/workflow/failure";

/** Returns a console whose standard error channel keeps the text it last received. */
function captureStandardError() {
  const stderr: { text?: string } = {};
  const testConsole: Console.Console = Object.assign(Object.create(console), {
    error: (text: string) => {
      stderr.text = text;
    },
  });
  return { stderr, testConsole };
}

describe("workflow failure report", () => {
  it.effect("writes the cause of a failed check to standard error", () => {
    const { stderr, testConsole } = captureStandardError();
    return Effect.gen(function* () {
      yield* reportFailure(
        Cause.die(new Error("Workflows must not retain registry machinery"))
      );
      expect(stderr.text).toContain(
        "Workflows must not retain registry machinery"
      );
    }).pipe(Effect.provideService(Console.Console, testConsole));
  });

  it.effect("stays silent for an interruption alone", () => {
    const { stderr, testConsole } = captureStandardError();
    return Effect.gen(function* () {
      yield* reportFailure(Cause.interrupt());
      expect(stderr.text).toBeUndefined();
    }).pipe(Effect.provideService(Console.Console, testConsole));
  });
});
