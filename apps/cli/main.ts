import {
  NodeContext,
  NodeHttpClient,
  NodeRuntime,
} from "@effect/platform-node";
import { layer as parcelWatcherLayer } from "@effect/platform-node/NodeFileSystem/ParcelWatcher";
import { ExactProcessLive } from "@nakafa/aksara-utilities/process/exact";
import { Effect, Layer } from "effect";
import { makeCliProgram } from "#cli/program";

/** Node services with the installed lossless directory watcher backend. */
export const cliNodeLayer = NodeContext.layer.pipe(
  Layer.provide(parcelWatcherLayer)
);

/** Builds the complete Node-backed CLI program before the runtime boundary. */
export function makeMainProgram(input: {
  readonly args: readonly string[];
  readonly cwd: string;
}) {
  return makeCliProgram(input).pipe(
    Effect.provide([NodeHttpClient.layer, ExactProcessLive, cliNodeLayer])
  );
}

NodeRuntime.runMain(
  makeMainProgram({ args: process.argv.slice(2), cwd: process.cwd() })
);
