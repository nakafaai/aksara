import { resolve } from "node:path";

import {
  NodeContext,
  NodeHttpClient,
  NodeRuntime,
} from "@effect/platform-node";
import { syncGermanQuranSources } from "@nakafa/aksara-corpus/quran/source/sync";
import { Effect } from "effect";

/** Synchronizes the pinned German Quran source from its official endpoint. */
export const makeQuranSourceSyncProgram = Effect.fn(
  "AksaraScripts.syncGermanQuranSources"
)(function* () {
  const result = yield* syncGermanQuranSources(
    resolve(import.meta.dirname, "..")
  );
  yield* Effect.logInfo("German Quran sources synchronized", result);
});

NodeRuntime.runMain(
  Effect.scoped(makeQuranSourceSyncProgram()).pipe(
    Effect.provide([NodeContext.layer, NodeHttpClient.layer])
  )
);
