import { Effect, FileSystem } from "effect";

/** Reads the UTF-8 text of one repository file through the platform file system. */
export const readSource = Effect.fn("WorkflowSource.read")(function* (
  path: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  return yield* fileSystem.readFileString(path);
});
