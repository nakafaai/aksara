import { resolve } from "node:path";

import { NodeContext, NodeHttpClient } from "@effect/platform-node";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";

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

vi.mock("@nakafa/aksara-corpus/quran/source/sync", async () => ({
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

import { makeQuranSourceSyncProgram } from "#scripts/quran-sync";

describe("German Quran source sync command", () => {
  it("runs the source-owned sync capability from the repository root", async () => {
    await expect(
      Effect.runPromise(
        Effect.scoped(makeQuranSourceSyncProgram()).pipe(
          Effect.provide([NodeContext.layer, NodeHttpClient.layer])
        )
      )
    ).resolves.toBeUndefined();

    expect(sync.repositoryRoots).toEqual([resolve(import.meta.dirname, "..")]);
    expect(runtime.calls).toBe(1);
  });
});
