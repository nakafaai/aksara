import { Effect, FileSystem } from "effect";

/** Reads the UTF-8 text of one repository file through the platform file system. */
export const readSource = Effect.fn("WorkflowSource.read")(function* (
  path: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const bytes = yield* fileSystem.readFile(path);
  // ignoreBOM keeps a leading byte order mark, which a default decoder strips.
  return new TextDecoder("utf-8", { ignoreBOM: true }).decode(bytes);
});
