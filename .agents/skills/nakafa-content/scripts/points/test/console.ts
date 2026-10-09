import { Effect } from "effect";
import { TestConsole } from "effect/testing";

/** Runs one effect with a fresh test console and returns the lines it wrote. */
export function capture<A, E, R>(self: Effect.Effect<A, E, R>) {
  return Effect.gen(function* () {
    const code = yield* self;
    return {
      code,
      error: (yield* TestConsole.errorLines).map(String),
      log: (yield* TestConsole.logLines).map(String),
    };
  }).pipe(Effect.provide(TestConsole.layer));
}
