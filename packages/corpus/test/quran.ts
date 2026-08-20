import { resolve } from "node:path";

import { NodeServices } from "@effect/platform-node";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { Effect, Stream } from "effect";

import { streamQuranRegistry } from "#corpus/quran/registry";
import { loadPinnedQuranSources } from "#corpus/quran/source/load";
import { parseQuranSources } from "#corpus/quran/source/parse";

const repositoryRoot = resolve(import.meta.dirname, "../../..");

/** Exact pinned official Quran values shared by source-dependent tests. */
export const testQuranSources = await Effect.runPromise(
  loadPinnedQuranSources(repositoryRoot, ACTIVE_APP_LOCALES).pipe(
    Effect.flatMap(({ sources }) => parseQuranSources(sources)),
    Effect.provide(NodeServices.layer)
  )
);

/** Replays the strict test registry from authenticated official source values. */
export const testQuranRegistry = streamQuranRegistry(
  Stream.fromIterable(testQuranSources)
);
