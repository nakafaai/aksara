import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Array as Arr, Effect } from "effect";
import { verifyConsumer } from "#scripts/consumer/verifier";

NodeRuntime.runMain(
  verifyConsumer({
    args: Arr.drop(process.argv, 2),
    environment: process.env,
    executable: process.execPath,
    platform: process.platform,
  }).pipe(Effect.provide(NodeServices.layer), Effect.scoped)
);
