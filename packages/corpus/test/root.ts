import { Effect, Path } from "effect";

/** Resolves the repository root, three folders above this test helper. */
export const corpusRoot = Effect.gen(function* () {
  const path = yield* Path.Path;
  return path.resolve(import.meta.dirname, "..", "..", "..");
});
