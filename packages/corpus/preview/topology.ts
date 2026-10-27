import type { CorpusSourcePath } from "@nakafa/aksara-contracts/ids";
import { Cache, Effect } from "effect";
import { discoverSourceDependencies } from "#corpus/preview/dependency";

export type RestartDependencyLookup = (
  sourcePath: CorpusSourcePath
) => ReturnType<typeof discoverSourceDependencies>;

/**
 * Creates one concurrent-safe lookup of the static source-module closure of a
 * file, whose every member restarts preview, scoped to a preview batch.
 */
export const makeRestartDependencyLookup = Effect.fn(
  "AksaraCorpus.makeRestartDependencyLookup"
)(function* (corpusRoot: string) {
  const cache = yield* Cache.make({
    capacity: Number.MAX_SAFE_INTEGER,
    lookup: (sourcePath: CorpusSourcePath) =>
      discoverSourceDependencies(corpusRoot, sourcePath),
  });
  return (sourcePath: CorpusSourcePath) => Cache.get(cache, sourcePath);
});
