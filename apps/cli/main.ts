import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Effect } from "effect";
import { makePreviewProgram } from "#cli/program";

NodeRuntime.runMain(
  makePreviewProgram({
    args: process.argv.slice(2),
    cwd: process.cwd(),
  }).pipe(Effect.provide(NodeContext.layer))
);
