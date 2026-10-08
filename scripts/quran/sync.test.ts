import { NodeHttpClient, NodeServices } from "@effect/platform-node";
import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Effect, Path } from "effect";

const sync = vi.hoisted((): { repositoryRoots: readonly string[] } => ({
  repositoryRoots: [],
}));

vi.mock("@nakafa/aksara-corpus/quran/source/sync", () => ({
  syncGermanQuranSources: vi.fn((repositoryRoot: string) => {
    sync.repositoryRoots = Arr.append(sync.repositoryRoots, repositoryRoot);
    return Effect.succeed({
      publication: {
        byteCount: 3485,
        digest: `sha256:${"b".repeat(64)}`,
        path: "/source/german-bubenheim.json",
      },
      translation: {
        byteCount: 1_523_305,
        digest: `sha256:${"a".repeat(64)}`,
        path: "/source/de.xml",
      },
    });
  }),
}));

import { makeQuranSourceSyncProgram } from "#scripts/quran/sync";

describe("German Quran source sync command", () => {
  it.effect(
    "runs the source-owned sync capability from the repository root",
    () =>
      Effect.gen(function* () {
        const path = yield* Path.Path;
        yield* makeQuranSourceSyncProgram().pipe(
          Effect.provide([NodeServices.layer, NodeHttpClient.layerNodeHttp])
        );

        assert.deepStrictEqual(sync.repositoryRoots, [
          path.resolve(import.meta.dirname, "../.."),
        ]);
      }).pipe(Effect.provide(NodeServices.layer))
  );
});
