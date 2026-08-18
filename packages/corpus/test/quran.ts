import { resolve } from "node:path";

import { NodeContext } from "@effect/platform-node";
import { Effect, Stream } from "effect";

import { AUTHORING_APP_LOCALES } from "#corpus/locale/source";
import { streamQuranRegistry } from "#corpus/quran/registry";
import { loadPinnedQuranSources } from "#corpus/quran/source/load";
import { parseQuranSources } from "#corpus/quran/source/parse";

const repositoryRoot = resolve(import.meta.dirname, "../../..");

/** Exact pinned official Quran values shared by source-dependent tests. */
export const testQuranSources = await Effect.runPromise(
  loadPinnedQuranSources(repositoryRoot, AUTHORING_APP_LOCALES).pipe(
    Effect.flatMap(({ sources }) => parseQuranSources(sources)),
    Effect.provide(NodeContext.layer)
  )
);

/** Replays the strict test registry from authenticated official source values. */
export function testQuranRegistry() {
  return streamQuranRegistry(Stream.fromIterable(testQuranSources));
}
