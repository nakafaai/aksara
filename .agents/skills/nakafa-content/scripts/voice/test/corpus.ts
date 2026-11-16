import { NodeServices } from "@effect/platform-node";
import { Array as Arr, Effect, FileSystem, Order, Path } from "effect";

import { collectLessonFiles } from "#nakafa-content/voice/check";

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
 * Counts the documents under a root and lists those no part holds: a document
 * sits above the depth the gate splits at, so no per-part test would check it.
 * The root walk scales with the corpus, so it runs once, at collection.
 */
export const corpusCoverage = Effect.fn("LessonVoiceTest.corpusCoverage")(
  function* (root: string, parts: readonly string[]) {
    const path = yield* Path.Path;
    const documents = yield* collectLessonFiles(root);
    const unheld = Arr.filter(
      documents,
      (document) =>
        !Arr.some(
          parts,
          (part) => part === root || document.startsWith(`${part}${path.sep}`)
        )
    );
    return { documents: documents.length, unheld };
  }
);

/**
 * Lists the parts of every corpus root below the corpus, each a directory and
 * a depth, and measures which documents those parts hold, before Vitest
 * collects the tests. Vitest registers one test per part while it collects the
 * module, before any test runs, so the listing and the whole-root walk run
 * here, at that collection boundary, with Node's services and no test timeout.
 */
export function readCorpusParts(
  corpus: string,
  roots: readonly (readonly [root: string, depth: number, ...unknown[]])[]
) {
  return Effect.runPromise(
    Effect.forEach(roots, ([root, depth]) =>
      Effect.gen(function* () {
        const parts = yield* corpusParts(`${corpus}/${root}`, depth);
        const coverage = yield* corpusCoverage(`${corpus}/${root}`, parts);
        return { ...coverage, parts };
      })
    ).pipe(Effect.provide(NodeServices.layer))
  );
}
