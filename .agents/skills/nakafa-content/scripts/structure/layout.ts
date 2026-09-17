import { dirname, join } from "node:path";
import { Effect, FileSystem } from "effect";

import { StructureScanError } from "#nakafa-content/structure/integrity";

const DIRECTORY_NAME_PATTERN = /^[a-z]+$/u;
const TYPESCRIPT_NAME_PATTERN = /^[a-z]+(?:\.test)?\.ts$/u;

interface ScriptLayout {
  directories: string[];
  files: string[];
}

/** Returns true for symbolic links, which layout scans never follow. */
const isSymbolicLink = Effect.fn("ScriptLayout.isSymbolicLink")(function* (
  fileSystem: FileSystem.FileSystem,
  file: string
) {
  return yield* Effect.match(fileSystem.readLink(file), {
    onFailure: () => false,
    onSuccess: () => true,
  });
});

/** Returns true for directories; files and missing entries read as files. */
const isDirectory = Effect.fn("ScriptLayout.isDirectory")(function* (
  fileSystem: FileSystem.FileSystem,
  file: string
) {
  return yield* Effect.match(fileSystem.readDirectory(file), {
    onFailure: () => false,
    onSuccess: () => true,
  });
});

/** Collects every directory and TypeScript file below the checker root. */
const collectLayout = Effect.fn("ScriptLayout.collectLayout")(function* (
  root: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const layout: ScriptLayout = { directories: [], files: [] };

  /** Traverses one checker directory without following non-directory entries. */
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
        const path = join(directory, entry);
        if (yield* isSymbolicLink(fileSystem, path)) {
          continue;
        }
        if (yield* isDirectory(fileSystem, path)) {
          layout.directories.push(path);
          yield* visit(path);
          continue;
        }
        if (entry.endsWith(".ts")) {
          layout.files.push(path);
        }
      }
    });

  yield* visit(root);
  return layout;
});

/** Returns every script path that violates the grouped one-word layout. */
export const scriptLayoutIssues = Effect.fn("ScriptLayout.scriptLayoutIssues")(
  function* (root: string) {
    const layout = yield* collectLayout(root);
    const issues = layout.directories.filter((directory) => {
      const name = directory.slice(dirname(directory).length + 1);
      return !DIRECTORY_NAME_PATTERN.test(name);
    });
    for (const file of layout.files) {
      const name = file.slice(dirname(file).length + 1);
      if (dirname(file) === root || !TYPESCRIPT_NAME_PATTERN.test(name)) {
        issues.push(file);
      }
    }
    return issues;
  }
);
