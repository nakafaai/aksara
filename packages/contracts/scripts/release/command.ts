import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Array as Arr, Effect } from "effect";
import { makeReleaseCommand } from "#scripts/release/program";

NodeRuntime.runMain(
  makeReleaseCommand(Arr.drop(process.argv, 2)).pipe(
    Effect.provide(NodeServices.layer)
  )
);
