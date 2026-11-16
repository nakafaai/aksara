import { NodeServices } from "@effect/platform-node";
import { Array as Arr, Effect, FileSystem, Order, Path } from "effect";

/**
 * Lists the directories a number of levels below a corpus root. The gate
 * checks each one as its own test, so a root that grows adds parts instead of
 * pushing one test past its timeout. Depth zero is the root itself.
 */
export const corpusParts = Effect.fn("LessonVoiceTest.corpusParts")(function* (
  root: string,
  depth: number
): Effect.fn.Return<
  readonly string[],
  never,
  FileSystem.FileSystem | Path.Path
> {
  if (depth === 0) {
    return [root];
  }
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const names = Arr.sort(
    yield* fileSystem.readDirectory(root).pipe(Effect.orDie),
    Order.String
  );
  const children = yield* Effect.filter(names, (name) =>
    fileSystem.stat(path.join(root, name)).pipe(
      Effect.map((info) => info.type === "Directory"),
      Effect.orDie
    )
  );
  const parts = yield* Effect.forEach(children, (name) =>
    corpusParts(path.join(root, name), depth - 1)
  );
  return Arr.flatten(parts);
});

/**
 * Lists the parts of every corpus root below the corpus, each a directory and
 * a depth, before Vitest collects the tests. Vitest registers one test per
 * part while it collects the module, before any test runs, so the listing runs
 * here, at that collection boundary, with Node's services.
 */
export function readCorpusParts(
  corpus: string,
  roots: readonly (readonly [root: string, depth: number, ...unknown[]])[]
) {
  return Effect.runPromise(
    Effect.forEach(roots, ([root, depth]) =>
      corpusParts(`${corpus}/${root}`, depth)
    ).pipe(Effect.provide(NodeServices.layer))
  );
}
