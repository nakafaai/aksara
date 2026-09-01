import { resolve } from "node:path";

import { NodeHttpClient, NodeServices } from "@effect/platform-node";
import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

const runtime = vi.hoisted(() => ({ calls: 0 }));
const sync = vi.hoisted(() => ({ repositoryRoots: [] as string[] }));

vi.mock("@effect/platform-node", async (importOriginal) => {
  const platform =
    await importOriginal<typeof import("@effect/platform-node")>();
  return {
    ...platform,
    NodeRuntime: {
      ...platform.NodeRuntime,
      runMain: vi.fn(() => {
        runtime.calls += 1;
      }),
    },
  };
});

vi.mock("@nakafa/aksara-corpus/quran/source/sync", () => ({
  syncGermanQuranSources: vi.fn((repositoryRoot: string) => {
    sync.repositoryRoots.push(repositoryRoot);
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
        yield* makeQuranSourceSyncProgram().pipe(
          Effect.provide([NodeServices.layer, NodeHttpClient.layerNodeHttp])
        );

        assert.deepStrictEqual(sync.repositoryRoots, [
          resolve(import.meta.dirname, "../.."),
        ]);
        assert.strictEqual(runtime.calls, 1);
      })
  );
});
