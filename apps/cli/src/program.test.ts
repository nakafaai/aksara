import { NodeContext, NodeHttpClient } from "@effect/platform-node";
import { Effect } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeCliProgram } from "#cli/program";

const calls = vi.hoisted(() => ({
  abort: undefined as
    | { readonly command: string; readonly releaseId: string }
    | undefined,
  args: [] as readonly string[],
  cleanup: undefined as
    | { readonly command: string; readonly releaseId: string }
    | undefined,
  document:
    "packages/corpus/material/lesson/mathematics/function-composition/inverse-function/function-concept/en.mdx",
  open: undefined as
    | {
        readonly cwd: string;
        readonly environment: { readonly nakafaAppDir: string };
        readonly requestedDocument: string;
      }
    | undefined,
  production: undefined as
    | {
        readonly args: { readonly command: string; readonly releaseId: string };
        readonly cwd: string;
      }
    | undefined,
}));

vi.mock("#cli/args", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Decodes either the real preview path or one production test command. */
    parseCliArguments: (args: readonly string[]) => {
      calls.args = args;
      if (args[0] === "abort") {
        return TestEffect.succeed({
          command: "abort",
          releaseId: "release-abort",
        });
      }
      if (args[0] === "cleanup") {
        return TestEffect.succeed({
          command: "cleanup",
          releaseId: "release-cleanup",
        });
      }
      if (args[0] === "release") {
        return TestEffect.succeed({
          command: "release",
          releaseId: "release-next",
        });
      }
      return TestEffect.succeed({
        command: "preview",
        document: calls.document,
      });
    },
  };
});

vi.mock("#cli/abort", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Records explicit abort dispatch without contacting publication. */
    runAbortCommand: (args: NonNullable<typeof calls.abort>) => {
      calls.abort = args;
      return TestEffect.succeed("abort-complete");
    },
  };
});

vi.mock("#cli/env", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Supplies the decoded preview environment after arguments are accepted. */
    readPreviewEnvironment: () =>
      TestEffect.succeed({ nakafaAppDir: "/code/nakafa.com" }),
  };
});

vi.mock("#cli/nakafa", async () => {
  const { Layer } = await import("effect");
  return { NakafaAppLive: Layer.empty };
});

vi.mock("#cli/cleanup", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Records cleanup dispatch without requiring production signing inputs. */
    runCleanupCommand: (args: NonNullable<typeof calls.cleanup>) => {
      calls.cleanup = args;
      return TestEffect.succeed("cleanup-complete");
    },
  };
});

vi.mock("#cli/session", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Records preview orchestration and returns a bounded test session. */
    openLocalPreview: (input: NonNullable<typeof calls.open>) => {
      calls.open = input;
      return TestEffect.succeed({
        run: TestEffect.succeed("preview-complete"),
      });
    },
  };
});

vi.mock("#cli/production", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Records production dispatch without performing external publication. */
    runProductionCommand: (input: NonNullable<typeof calls.production>) => {
      calls.production = input;
      return TestEffect.succeed("publication-complete");
    },
  };
});

beforeEach(() => {
  calls.abort = undefined;
  calls.args = [];
  calls.cleanup = undefined;
  calls.open = undefined;
  calls.production = undefined;
});

describe("CLI program", () => {
  it("composes implicit preview with the actual-app session", async () => {
    const result = await Effect.runPromise(
      makeCliProgram({
        args: ["--document", calls.document],
        cwd: "/code/aksara",
      }).pipe(
        Effect.provide(NodeHttpClient.layer),
        Effect.provide(NodeContext.layer)
      )
    );

    expect(result).toBe("preview-complete");
    expect(calls.args).toEqual(["--document", calls.document]);
    expect(calls.open).toEqual({
      cwd: "/code/aksara",
      environment: { nakafaAppDir: "/code/nakafa.com" },
      requestedDocument: calls.document,
    });
    expect(calls.production).toBeUndefined();
    expect(calls.abort).toBeUndefined();
  });

  it("dispatches explicit production commands without opening preview", async () => {
    const result = await Effect.runPromise(
      makeCliProgram({
        args: ["release", "--release-id", "release-next"],
        cwd: "/code/aksara",
      }).pipe(
        Effect.provide(NodeHttpClient.layer),
        Effect.provide(NodeContext.layer)
      )
    );

    expect(result).toBe("publication-complete");
    expect(calls.production).toEqual({
      args: { command: "release", releaseId: "release-next" },
      cwd: "/code/aksara",
    });
    expect(calls.open).toBeUndefined();
    expect(calls.cleanup).toBeUndefined();
    expect(calls.abort).toBeUndefined();
  });

  it("dispatches abort without entering signed publication", async () => {
    const result = await Effect.runPromise(
      makeCliProgram({
        args: ["abort", "--release-id", "release-abort"],
        cwd: "/code/aksara",
      }).pipe(
        Effect.provide(NodeHttpClient.layer),
        Effect.provide(NodeContext.layer)
      )
    );

    expect(result).toBe("abort-complete");
    expect(calls.abort).toEqual({
      command: "abort",
      releaseId: "release-abort",
    });
    expect(calls.cleanup).toBeUndefined();
    expect(calls.production).toBeUndefined();
    expect(calls.open).toBeUndefined();
  });

  it("dispatches cleanup without entering signed publication", async () => {
    const result = await Effect.runPromise(
      makeCliProgram({
        args: ["cleanup", "--release-id", "release-cleanup"],
        cwd: "/code/aksara",
      }).pipe(
        Effect.provide(NodeHttpClient.layer),
        Effect.provide(NodeContext.layer)
      )
    );

    expect(result).toBe("cleanup-complete");
    expect(calls.cleanup).toEqual({
      command: "cleanup",
      releaseId: "release-cleanup",
    });
    expect(calls.production).toBeUndefined();
    expect(calls.open).toBeUndefined();
    expect(calls.abort).toBeUndefined();
  });
});
