import {
  NodeHttpClient,
  NodeRuntime,
  NodeServices,
} from "@effect/platform-node";
import { ExactProcessLive } from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";
import { publishAcceptance } from "#cli/acceptance/publication";

NodeRuntime.runMain(
  publishAcceptance().pipe(
    Effect.provide([
      NodeHttpClient.layerNodeHttp,
      ExactProcessLive,
      NodeServices.layer,
    ])
  )
);
