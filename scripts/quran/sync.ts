import { resolve } from "node:path";

import { NodeHttpClient } from "@effect/platform-node";
import { syncGermanQuranSources } from "@nakafa/aksara-corpus/quran/source/sync";
import { Effect } from "effect";
import { runEntry } from "#scripts/entry";

/** Synchronizes the pinned German Quran source from its official endpoint. */
export const makeQuranSourceSyncProgram = Effect.fn(
  "AksaraScripts.syncGermanQuranSources"
)(function* () {
  const result = yield* syncGermanQuranSources(
    resolve(import.meta.dirname, "../..")
  );
  yield* Effect.logInfo("German Quran sources synchronized", result);
});

runEntry(
  import.meta.main,
  Effect.scoped(makeQuranSourceSyncProgram()).pipe(
    Effect.provide(NodeHttpClient.layerNodeHttp)
  )
);
