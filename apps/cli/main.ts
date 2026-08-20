import {
  NodeHttpClient,
  NodeRuntime,
  NodeServices,
} from "@effect/platform-node";
import { ExactProcessLive } from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";
import { makeCliProgram } from "#cli/program";

/** Complete Node services, including the native filesystem watcher backend. */
export const cliNodeLayer = NodeServices.layer;

/** Builds the complete Node-backed CLI program before the runtime boundary. */
export function makeMainProgram(input: {
  readonly args: readonly string[];
  readonly cwd: string;
}) {
  return makeCliProgram(input).pipe(
    Effect.provide([
      NodeHttpClient.layerNodeHttp,
      ExactProcessLive,
      cliNodeLayer,
    ])
  );
}

NodeRuntime.runMain(
  makeMainProgram({ args: process.argv.slice(2), cwd: process.cwd() })
);
