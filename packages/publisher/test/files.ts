import {
  Effect,
  FileSystem,
  MutableHashMap,
  Option,
  PlatformError,
} from "effect";

/** Provides deterministic corpus reads and private replay-spool writes in tests. */
export function testFileLayer(seed: Iterable<readonly [string, string]>) {
  const files = MutableHashMap.fromIterable(seed);
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
        [...MutableHashMap.keys(files)]
          .filter((path) => path.startsWith(`${root}/`))
          .map((path) => path.slice(root.length + 1))
      ),
    readFileString: (path) => {
      const source = Option.getOrUndefined(MutableHashMap.get(files, path));
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
        MutableHashMap.set(files, path, data);
      }),
  });
}
