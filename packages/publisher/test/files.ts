import { Effect, FileSystem, PlatformError } from "effect";

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
    readDirectory: (root) =>
      Effect.succeed(
        [...files.keys()]
          .filter((path) => path.startsWith(`${root}/`))
          .map((path) => path.slice(root.length + 1))
      ),
    readFileString: (path) => {
      const source = files.get(path);
      if (source !== undefined) {
        return Effect.succeed(source);
      }
      return Effect.fail(
        PlatformError.systemError({
          _tag: "NotFound",
          method: "readFileString",
          module: "FileSystem",
          pathOrDescriptor: path,
        })
      );
    },
    writeFileString: (path, data) =>
      Effect.sync(() => {
        files.set(path, data);
      }),
  });
}
