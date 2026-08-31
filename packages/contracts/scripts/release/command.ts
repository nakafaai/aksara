import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect } from "effect";
import { makeReleaseCommand } from "#scripts/release/program";

NodeRuntime.runMain(
  makeReleaseCommand(process.argv.slice(2)).pipe(
    Effect.provide(NodeServices.layer)
  )
);
