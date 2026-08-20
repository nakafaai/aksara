import { NodeServices } from "@effect/platform-node";
import type { FileSystem, Path } from "effect";
import { Effect } from "effect";

/** Runs one Node-platform program at the Vitest process boundary. */
export function runNode<A, E>(
  program: Effect.Effect<A, E, FileSystem.FileSystem | Path.Path>
) {
  return Effect.runPromise(program.pipe(Effect.provide(NodeServices.layer)));
}
