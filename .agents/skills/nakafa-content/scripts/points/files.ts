import { Effect, FileSystem, Path } from "effect";
import { PointsCheckError, unreadable } from "#nakafa-content/points/error";

/** Lists every MDX file below the targets, relative to the repository root. */
export const collectFiles = Effect.fn("PointsCheck.collectFiles")(function* (
  root: string,
  targets: readonly string[]
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const files = new Set<string>();
  for (const target of targets) {
    const absolute = path.resolve(root, target);
    const info = yield* fileSystem
      .stat(absolute)
      .pipe(Effect.mapError(unreadable(target)));
    if (info.type !== "Directory") {
      files.add(path.relative(root, absolute));
      continue;
    }
    const entries = yield* fileSystem
      .readDirectory(absolute, { recursive: true })
      .pipe(Effect.mapError(unreadable(target)));
    for (const entry of entries.filter((name) => name.endsWith(".mdx"))) {
      files.add(path.relative(root, path.join(absolute, entry)));
    }
  }
  if (files.size === 0) {
    return yield* new PointsCheckError({
      detail: `No MDX files found under ${targets.join(", ")}`,
      reason: "empty-targets",
    });
  }
  return [...files].sort();
});
