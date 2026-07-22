import { FileSystem, Error as PlatformError } from "@effect/platform";
import { Effect } from "effect";

/** Provides deterministic corpus reads and private replay-spool writes in tests. */
export function testFileLayer(seed: ReadonlyMap<string, string>) {
  const files = new Map(seed);
  let temporaryDirectory = 0;
  return FileSystem.layerNoop({
    makeDirectory: () => Effect.void,
    makeTempDirectoryScoped: () =>
      Effect.sync(() => {
        temporaryDirectory += 1;
        return `/test/aksara-spool-${temporaryDirectory}`;
      }),
    readFileString: (path) => {
      const source = files.get(path);
      if (source !== undefined) {
        return Effect.succeed(source);
      }
      return Effect.fail(
        new PlatformError.SystemError({
          method: "readFileString",
          module: "FileSystem",
          pathOrDescriptor: path,
          reason: "NotFound",
        })
      );
    },
    writeFileString: (path, data) =>
      Effect.sync(() => {
        files.set(path, data);
      }),
  });
}
