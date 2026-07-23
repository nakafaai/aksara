import { globSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { Effect, Schema } from "effect";

const corpusRoot = resolve(import.meta.dirname, "..");

/** Test-only corpus module discovery or loading failed. */
export class CorpusImportError extends Schema.TaggedError<CorpusImportError>()(
  "CorpusImportError",
  { cause: Schema.Unknown, file: Schema.String }
) {}

/** Imports every production module matched by one domain-owned test pattern. */
export const importCorpusModules = Effect.fn("AksaraTest.importCorpusModules")(
  function* (pattern: string, exclude: readonly string[] = []) {
    const files = yield* Effect.try({
      catch: (cause) => new CorpusImportError({ cause, file: pattern }),
      try: () =>
        globSync(pattern, {
          cwd: corpusRoot,
          exclude: ["**/*.test.ts", "test/**/*.ts", ...exclude],
        }).sort(),
    });
    yield* Effect.forEach(
      files,
      (file) =>
        Effect.tryPromise({
          catch: (cause) => new CorpusImportError({ cause, file }),
          try: () => import(pathToFileURL(resolve(corpusRoot, file)).href),
        }),
      { concurrency: 16, discard: true }
    );
    return files;
  }
);
