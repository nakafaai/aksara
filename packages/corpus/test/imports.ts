import { Array as Arr, Effect, FileSystem, Order, Path, Schema } from "effect";

/** Test-only corpus module discovery or loading failed. */
class CorpusImportError extends Schema.TaggedError<CorpusImportError>()(
  "CorpusImportError",
  { cause: Schema.Unknown, file: Schema.String }
) {}

/** Escapes every character that has a meaning inside a regular expression. */
const escapeRegExp = (text: string) =>
  text.replace(/[$()*+.?[\\\]^{|}]/gu, "\\$&");

/** Compiles one corpus glob, where `**` spans any folders and `*` any part of one name, into a path test. */
function globMatcher(glob: string) {
  const segments = glob.split("/");
  const source = Arr.join(
    Arr.map(segments, (segment, index) => {
      if (segment === "**") {
        return "(?:[^/]+/)*";
      }
      const name = Arr.join(Arr.map(segment.split("*"), escapeRegExp), "[^/]*");
      return index === segments.length - 1 ? name : `${name}/`;
    }),
    ""
  );
  const pattern = new RegExp(`^${source}$`, "u");
  return (file: string) => pattern.test(file);
}

/** Returns the folders above the first wildcard, the only part of a corpus glob that needs a directory read. */
function wildcardBase(glob: string) {
  const segments = glob.split("/");
  return Arr.join(
    Arr.takeWhile(
      Arr.dropRight(segments, 1),
      (segment) => !segment.includes("*")
    ),
    "/"
  );
}

/** Imports every production module and preserves its unknown export boundary. */
export const importCorpusModules = Effect.fn("AksaraTest.importCorpusModules")(
  function* (pattern: string, exclude: readonly string[] = []) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const corpusRoot = path.resolve(import.meta.dirname, "..");
    const base = wildcardBase(pattern);
    const included = globMatcher(pattern);
    const excluded = Arr.map(
      ["**/*.test.ts", "test/**/*.ts", ...exclude],
      globMatcher
    );
    const listed = yield* fileSystem
      .readDirectory(path.resolve(corpusRoot, base), { recursive: true })
      .pipe(
        Effect.mapError(
          (cause) => new CorpusImportError({ cause, file: pattern })
        )
      );
    const files = Arr.sort(
      Arr.filter(
        Arr.map(listed, (entry) => (base === "" ? entry : `${base}/${entry}`)),
        (file) =>
          included(file) && !Arr.some(excluded, (matches) => matches(file))
      ),
      Order.String
    );
    return yield* Effect.forEach(
      files,
      (file) =>
        Effect.gen(function* () {
          const url = yield* path
            .toFileUrl(path.resolve(corpusRoot, file))
            .pipe(
              Effect.mapError((cause) => new CorpusImportError({ cause, file }))
            );
          const exports: unknown = yield* Effect.tryPromise({
            catch: (cause) => new CorpusImportError({ cause, file }),
            try: () => import(url.href),
          });
          return { exports, file };
        }),
      { concurrency: 16 }
    );
  }
);
