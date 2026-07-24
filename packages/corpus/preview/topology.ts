import type { CorpusSourcePath } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { discoverSourceDependencies } from "#corpus/preview/dependency";
import type { PreviewDependency } from "#corpus/preview/source";

/** Converts one static source-module closure into restart dependencies. */
export const restartDependencies = Effect.fn(
  "AksaraCorpus.restartPreviewDependencies"
)(function* (corpusRoot: string, sourcePath: CorpusSourcePath) {
  const dependencies = yield* discoverSourceDependencies(
    corpusRoot,
    sourcePath
  );
  const [first, ...remaining] = dependencies;
  return [
    {
      mode: "restart",
      sourcePath: first,
    },
    ...remaining.map(
      (dependency): PreviewDependency => ({
        mode: "restart",
        sourcePath: dependency,
      })
    ),
  ] satisfies readonly [PreviewDependency, ...PreviewDependency[]];
});
