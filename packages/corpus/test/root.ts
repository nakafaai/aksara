import { Effect, Path } from "effect";

/** Resolves the repository root, three folders above this test helper. */
export const corpusRoot = Effect.gen(function* () {
  const path = yield* Path.Path;
  return path.resolve(import.meta.dirname, "..", "..", "..");
});

/** The repository root as a path, for calls that take the checkout they read lessons from. */
export const CHECKOUT_ROOT = decodeURIComponent(
  new URL("../../..", import.meta.url).pathname
).replace(/\/$/u, "");
