import { Array as Arr, Effect } from "effect";
import { TestConsole } from "effect/testing";

/** Every console log line that the test console has captured so far. */
export const loggedLines = Effect.map(TestConsole.logLines, Arr.map(String));

/** Runs one effect with a fresh test console and returns the lines it wrote. */
export function capture<A, E, R>(self: Effect.Effect<A, E, R>) {
  return Effect.gen(function* () {
    const code = yield* self;
    return {
      code,
      error: Arr.map(yield* TestConsole.errorLines, String),
      log: yield* loggedLines,
    };
  }).pipe(Effect.provide(TestConsole.layer));
}
