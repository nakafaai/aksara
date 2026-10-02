import { Effect } from "effect";

/** Captures console output while one effect runs, then restores it. */
export function capture<A, E, R>(self: Effect.Effect<A, E, R>) {
  return Effect.acquireUseRelease(
    Effect.sync(() => {
      const error: string[] = [];
      const log: string[] = [];
      const original = { error: console.error, log: console.log };
      console.error = (...parts: unknown[]) => error.push(parts.join(" "));
      console.log = (...parts: unknown[]) => log.push(parts.join(" "));
      return { error, log, original };
    }),
    ({ error, log }) => self.pipe(Effect.map((code) => ({ code, error, log }))),
    ({ original }) =>
      Effect.sync(() => {
        console.error = original.error;
        console.log = original.log;
      })
  );
}
