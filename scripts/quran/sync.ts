import { NodeHttpClient } from "@effect/platform-node";
import { syncGermanQuranSources } from "@nakafa/aksara-corpus/quran/source/sync";
import { Effect, Path } from "effect";
import { runEntry } from "#scripts/entry";

/** Synchronizes the pinned German Quran source from its official endpoint. */
export const makeQuranSourceSyncProgram = Effect.fn(
  "AksaraScripts.syncGermanQuranSources"
)(function* () {
  const path = yield* Path.Path;
  const result = yield* syncGermanQuranSources(
    path.resolve(import.meta.dirname, "../..")
  );
  yield* Effect.logInfo("German Quran sources synchronized", result);
});

runEntry(
  import.meta.main,
  Effect.scoped(makeQuranSourceSyncProgram()).pipe(
    Effect.provide(NodeHttpClient.layerNodeHttp)
  ),
  { failureStream: "stdout" }
);
