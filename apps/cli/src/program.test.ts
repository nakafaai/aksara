import { NodeContext, NodeHttpClient } from "@effect/platform-node";
import { Effect } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeCliProgram } from "#cli/program";

const calls = vi.hoisted(() => ({
  abort: undefined as
    | { readonly command: string; readonly releaseId: string }
    | undefined,
  accept: undefined as
    | {
        readonly command: string;
        readonly recoveryId: string;
        readonly releaseId: string;
      }
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
        readonly args: {
          readonly command: string;
          readonly recoveryId: string;
          readonly releaseId: string;
        };
        readonly cwd: string;
      }
    | undefined,
  recover: undefined as
    | {
        readonly command: string;
        readonly recoveryId: string;
        readonly releaseId: string;
      }
    | undefined,
  status: false,
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
      if (args[0] === "accept") {
        return TestEffect.succeed({
          command: "accept",
          recoveryId: "recovery-active",
          releaseId: "release-active",
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
          recoveryId: "recovery-next",
          releaseId: "release-next",
        });
      }
      if (args[0] === "recover") {
        return TestEffect.succeed({
          command: "recover",
          recoveryId: "recovery-active",
          releaseId: "release-active",
        });
      }
      if (args[0] === "status") {
        return TestEffect.succeed({ command: "status" });
      }
      return TestEffect.succeed({
        command: "preview",
        document: calls.document,
      });
    },
  };
});

vi.mock("#cli/accept", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Records acceptance dispatch without requiring production signing. */
    runAcceptCommand: (args: NonNullable<typeof calls.accept>) => {
      calls.accept = args;
      return TestEffect.succeed("accept-complete");
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

vi.mock("#cli/recover", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Records recovery dispatch without contacting production. */
    runRecoverCommand: (args: NonNullable<typeof calls.recover>) => {
      calls.recover = args;
      return TestEffect.succeed("recover-complete");
    },
  };
});

vi.mock("#cli/status", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Records publication-state dispatch without contacting production. */
    runStatusCommand: () => {
      calls.status = true;
      return TestEffect.succeed("status-complete");
    },
  };
});

beforeEach(() => {
  calls.accept = undefined;
  calls.abort = undefined;
  calls.args = [];
  calls.cleanup = undefined;
  calls.open = undefined;
  calls.production = undefined;
  calls.recover = undefined;
  calls.status = false;
});

/** Runs one CLI program with the real Node boundary services. */
function runProgram(args: readonly string[]) {
  return Effect.runPromise(
    makeCliProgram({ args, cwd: "/code/aksara" }).pipe(
      Effect.provide(NodeHttpClient.layer),
      Effect.provide(NodeContext.layer)
    )
  );
}

describe("CLI program", () => {
  it("composes implicit preview with the actual-app session", async () => {
    const result = await runProgram(["--document", calls.document]);

    expect(result).toBe("preview-complete");
    expect(calls.args).toEqual(["--document", calls.document]);
    expect(calls.open).toEqual({
      cwd: "/code/aksara",
      environment: { nakafaAppDir: "/code/nakafa.com" },
      requestedDocument: calls.document,
    });
  });

  it("dispatches explicit production commands without opening preview", async () => {
    const result = await runProgram([
      "release",
      "--release-id",
      "release-next",
      "--recovery-id",
      "recovery-next",
    ]);

    expect(result).toBe("publication-complete");
    expect(calls.production).toEqual({
      args: {
        command: "release",
        recoveryId: "recovery-next",
        releaseId: "release-next",
      },
      cwd: "/code/aksara",
    });
  });

  it("dispatches acceptance without entering signed publication", async () => {
    const result = await runProgram(["accept"]);

    expect(result).toBe("accept-complete");
    expect(calls.accept).toEqual({
      command: "accept",
      recoveryId: "recovery-active",
      releaseId: "release-active",
    });
  });

  it("dispatches recovery without entering signed publication", async () => {
    const result = await runProgram(["recover"]);

    expect(result).toBe("recover-complete");
    expect(calls.recover).toEqual({
      command: "recover",
      recoveryId: "recovery-active",
      releaseId: "release-active",
    });
  });

  it("dispatches abort without entering signed publication", async () => {
    const result = await runProgram(["abort", "--release-id", "release-abort"]);

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
    const result = await runProgram([
      "cleanup",
      "--release-id",
      "release-cleanup",
    ]);

    expect(result).toBe("cleanup-complete");
    expect(calls.cleanup).toEqual({
      command: "cleanup",
      releaseId: "release-cleanup",
    });
    expect(calls.production).toBeUndefined();
    expect(calls.open).toBeUndefined();
    expect(calls.abort).toBeUndefined();
  });

  it("dispatches status without entering signed publication", async () => {
    const result = await runProgram(["status"]);

    expect(result).toBe("status-complete");
    expect(calls.status).toBe(true);
    expect(calls.production).toBeUndefined();
    expect(calls.open).toBeUndefined();
  });
});
