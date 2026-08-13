import { resolve } from "node:path";

import { NodeContext } from "@effect/platform-node";
import { Effect } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";

const runtime = vi.hoisted(() => ({ calls: 0 }));
const writer = vi.hoisted(() => ({ inputs: [] as unknown[] }));

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

vi.mock("@nakafa/aksara-publisher/editorial/write", async () => ({
  writeEditorialReviewCatalog: vi.fn((input: unknown) => {
    writer.inputs.push(input);
    return Effect.succeed({
      digest: `sha256:${"a".repeat(64)}`,
      partCount: 2,
      recordCount: 300,
    });
  }),
}));

import { makeEditorialReviewWriteProgram } from "#scripts/editorial-write";

beforeEach(() => {
  writer.inputs.length = 0;
});

describe("editorial review writer command", () => {
  it("resolves one operator input and invokes the writer", async () => {
    await expect(
      Effect.runPromise(
        Effect.scoped(makeEditorialReviewWriteProgram(["records.json"])).pipe(
          Effect.provide(NodeContext.layer)
        )
      )
    ).resolves.toBeUndefined();

    expect(writer.inputs).toEqual([
      {
        inputPath: resolve("records.json"),
        repositoryRoot: resolve(import.meta.dirname, ".."),
      },
    ]);
    expect(runtime.calls).toBe(1);
  });

  it("rejects missing and excess operator inputs", async () => {
    const errors = await Promise.all(
      [[], ["first.json", "second.json"]].map((positionals) =>
        Effect.runPromise(
          Effect.scoped(makeEditorialReviewWriteProgram(positionals)).pipe(
            Effect.provide(NodeContext.layer),
            Effect.flip
          )
        )
      )
    );

    expect(errors).toMatchObject([
      { _tag: "EditorialReviewArgumentError", positionals: [] },
      {
        _tag: "EditorialReviewArgumentError",
        positionals: ["first.json", "second.json"],
      },
    ]);
    expect(writer.inputs).toEqual([]);
  });
});
