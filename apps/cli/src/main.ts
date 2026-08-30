import {
  NodeHttpClient,
  NodeRuntime,
  NodeServices,
} from "@effect/platform-node";
import { ExactProcessLive } from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";
import { readPackageVersion } from "#cli/package";
import { makeCliProgram } from "#cli/program";

/** Complete Node services, including the native filesystem watcher backend. */
export const cliNodeLayer = NodeServices.layer;

/** Builds the complete Node-backed CLI program before the runtime boundary. */
export function makeMainProgram(input: {
  readonly args: readonly string[];
  readonly cwd: string;
}) {
  return Effect.gen(function* () {
    const version = yield* readPackageVersion(
      new URL("../package.json", import.meta.url)
    );
    return yield* makeCliProgram({ ...input, version });
  }).pipe(
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
