import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect } from "effect";

/**
 * Runs one maintenance program as the Node process when Node executes its
 * module directly. An imported module stays inert, so a test or another
 * script that imports it never starts the program.
 */
export function runEntry<E>(
  main: boolean,
  program: Effect.Effect<unknown, E, NodeServices.NodeServices>
) {
  if (!main) {
    return;
  }
  NodeRuntime.runMain(program.pipe(Effect.provide(NodeServices.layer)));
}
