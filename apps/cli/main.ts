import {
  NodeContext,
  NodeHttpClient,
  NodeRuntime,
} from "@effect/platform-node";
import { Effect } from "effect";
import { makeCliProgram } from "#cli/program";

/** Builds the complete Node-backed CLI program before the runtime boundary. */
export function makeMainProgram(input: {
  readonly args: readonly string[];
  readonly cwd: string;
}) {
  return makeCliProgram(input).pipe(
    Effect.provide(NodeHttpClient.layer),
    Effect.provide(NodeContext.layer)
  );
}

NodeRuntime.runMain(
  makeMainProgram({ args: process.argv.slice(2), cwd: process.cwd() })
);
