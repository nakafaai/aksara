import { NodeContext } from "@effect/platform-node";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";
import { makePreviewProgram } from "#cli/program";

const calls = vi.hoisted(() => ({
  args: [] as readonly string[],
  open: undefined as
    | {
        readonly cwd: string;
        readonly environment: { readonly nakafaAppDir: string };
        readonly requestedDocument: string;
      }
    | undefined,
}));

vi.mock("#cli/args", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Records the process arguments consumed by the program boundary. */
    parsePreviewArguments: (args: readonly string[]) => {
      calls.args = args;
      return TestEffect.succeed({ document: "packages/corpus/real/en.mdx" });
    },
  };
});

vi.mock("#cli/env", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Supplies the decoded environment after arguments are accepted. */
    readPreviewEnvironment: () =>
      TestEffect.succeed({ nakafaAppDir: "/code/nakafa.com" }),
  };
});

vi.mock("#cli/nakafa", async () => {
  const { Layer } = await import("effect");
  return { NakafaAppLive: Layer.empty };
});

vi.mock("#cli/session", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Records orchestration input and returns a bounded test session. */
    openLocalPreview: (input: NonNullable<typeof calls.open>) => {
      calls.open = input;
      return TestEffect.succeed({ run: TestEffect.succeed("complete") });
    },
  };
});

describe("preview program", () => {
  it("composes arguments, environment, session opening, and session run", async () => {
    const result = await Effect.runPromise(
      makePreviewProgram({
        args: ["--document", "packages/corpus/real/en.mdx"],
        cwd: "/code/aksara",
      }).pipe(Effect.provide(NodeContext.layer))
    );

    expect(result).toBe("complete");
    expect(calls.args).toEqual(["--document", "packages/corpus/real/en.mdx"]);
    expect(calls.open).toEqual({
      cwd: "/code/aksara",
      environment: { nakafaAppDir: "/code/nakafa.com" },
      requestedDocument: "packages/corpus/real/en.mdx",
    });
  });
});
