import {
  Array as Arr,
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
        Arr.map(
          Arr.filter(MutableHashMap.keys(files), (path) =>
            path.startsWith(`${root}/`)
          ),
          (path) => path.slice(root.length + 1)
        )
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
