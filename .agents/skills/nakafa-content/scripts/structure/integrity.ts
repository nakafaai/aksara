import { Effect, FileSystem, Path, Schema } from "effect";

const TEXT_EXTENSIONS = new Set([".md", ".mdx", ".ts"]);

/** Typed failure for an unreadable entry during owned-source scans. */
export class StructureScanError extends Schema.TaggedError<
  StructureScanError,
  { readonly brand: unique symbol }
>()("StructureScanError", {
  detail: Schema.String,
  reason: Schema.Literals(["unreadable-entry"]),
}) {}

/** Returns true for symbolic links, which scans never follow. */
const isSymbolicLink = Effect.fn("StructureIntegrity.isSymbolicLink")(
  function* (fileSystem: FileSystem.FileSystem, file: string) {
    return yield* Effect.isSuccess(fileSystem.readLink(file));
  }
);

/** Returns true for directories; files and missing entries read as files. */
const isDirectory = Effect.fn("StructureIntegrity.isDirectory")(function* (
  fileSystem: FileSystem.FileSystem,
  file: string
) {
  return yield* Effect.isSuccess(fileSystem.readDirectory(file));
});

/** Collects text files below one source root without following links. */
const collectTextFiles = Effect.fn("StructureIntegrity.collectTextFiles")(
  function* (root: string) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const files: string[] = [];

    /** Traverses one source directory without following non-directory entries. */
    const visit = (
      directory: string
    ): Effect.Effect<void, StructureScanError, FileSystem.FileSystem> =>
      Effect.gen(function* () {
        const entries = yield* Effect.mapError(
          fileSystem.readDirectory(directory),
          (cause) =>
            new StructureScanError({
              detail: `Cannot list ${directory}: ${String(cause)}`,
              reason: "unreadable-entry",
            })
        );
        for (const entry of entries) {
          const file = path.join(directory, entry);
          if (yield* isSymbolicLink(fileSystem, file)) {
            continue;
          }
          if (yield* isDirectory(fileSystem, file)) {
            yield* visit(file);
            continue;
          }
          if (TEXT_EXTENSIONS.has(path.extname(entry))) {
            files.push(file);
          }
        }
      });

    yield* visit(root);
    return files;
  }
);

/** Returns files containing one forbidden byte. */
export const filesContainingCharacter = Effect.fn(
  "StructureIntegrity.filesContainingCharacter"
)(function* (roots: readonly string[], character: string) {
  const fileSystem = yield* FileSystem.FileSystem;
  const files = yield* Effect.forEach(roots, (root) =>
    collectTextFiles(root)
  ).pipe(Effect.map((groups) => groups.flat()));
  const matches: string[] = [];
  for (const file of files) {
    const source = yield* Effect.mapError(
      fileSystem.readFileString(file),
      (cause) =>
        new StructureScanError({
          detail: `Cannot read ${file}: ${String(cause)}`,
          reason: "unreadable-entry",
        })
    );
    if (source.includes(character)) {
      matches.push(file);
    }
  }
  return matches.sort();
});
