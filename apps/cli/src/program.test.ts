import { beforeEach, describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { vi } from "vitest";
import type { ProgramCalls } from "#test/program";
import { runProgram } from "#test/program";

const calls = vi.hoisted(
  (): ProgramCalls => ({
    abort: undefined,
    accept: undefined,
    args: [],
    check: undefined,
    cleanup: undefined,
    document:
      "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx",
    migration: undefined,
    open: undefined,
    production: undefined,
    recover: undefined,
    status: false,
  })
);
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
      if (args[0] === "check") {
        return TestEffect.succeed({ command: "check" });
      }
      if (args[0] === "release") {
        return TestEffect.succeed({
          command: "release",
          recoveryId: "recovery-next",
          releaseId: "release-next",
        });
      }
      if (args[0] === "migrate-tryout-history") {
        return TestEffect.succeed({
          command: "migrate-tryout-history",
          receiptPath: "/tmp/migration-receipt.json",
          releaseId: "migration-release",
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
      const appLocaleIndex = args.indexOf("--app-locale");
      const appLocale =
        appLocaleIndex === -1 ? undefined : args[appLocaleIndex + 1];
      return TestEffect.succeed({
        ...(appLocale === undefined ? {} : { appLocale }),
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
vi.mock("#cli/environment/read", async () => {
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
vi.mock("#cli/check", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Records read-only catalog validation without opening a real app. */
    runCheckCommand: (cwd: string) => {
      calls.check = cwd;
      return TestEffect.succeed("check-complete");
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
vi.mock("#cli/production/command", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Records production dispatch without performing external publication. */
    runProductionCommand: (input: NonNullable<typeof calls.production>) => {
      calls.production = input;
      return TestEffect.succeed("publication-complete");
    },
  };
});
vi.mock("#cli/migration/tryout", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    /** Records migration dispatch without contacting production. */
    runTryoutMigrationCommand: (args: NonNullable<typeof calls.migration>) => {
      calls.migration = args;
      return TestEffect.succeed("migration-complete");
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
    runStatusCommand: TestEffect.sync(() => {
      calls.status = true;
      return "status-complete";
    }),
  };
});
beforeEach(() => {
  calls.accept = undefined;
  calls.abort = undefined;
  calls.args = [];
  calls.cleanup = undefined;
  calls.check = undefined;
  calls.migration = undefined;
  calls.open = undefined;
  calls.production = undefined;
  calls.recover = undefined;
  calls.status = false;
});
describe("CLI program", () => {
  it.effect("composes implicit preview with the actual-app session", () =>
    Effect.gen(function* () {
      const result = yield* runProgram(["--document", calls.document]);
      expect(result).toBe("preview-complete");
      expect(calls.args).toEqual(["--document", calls.document]);
      expect(calls.open).toEqual({
        appLocale: undefined,
        cwd: "/code/aksara",
        environment: { nakafaAppDir: "/code/nakafa.com" },
        requestedDocument: calls.document,
      });
    })
  );

  it.effect(
    "passes an explicit application locale into preview orchestration",
    () =>
      Effect.gen(function* () {
        const result = yield* runProgram([
          "--app-locale",
          "de",
          "--document",
          calls.document,
        ]);
        expect(result).toBe("preview-complete");
        expect(calls.open).toMatchObject({ appLocale: "de" });
      })
  );

  it.effect(
    "dispatches explicit production commands without opening preview",
    () =>
      Effect.gen(function* () {
        const result = yield* runProgram([
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
      })
  );

  it.effect(
    "dispatches the signed try-out history migration independently",
    () =>
      Effect.gen(function* () {
        const result = yield* runProgram(["migrate-tryout-history"]);
        expect(result).toBe("migration-complete");
        expect(calls.migration).toEqual({
          command: "migrate-tryout-history",
          receiptPath: "/tmp/migration-receipt.json",
          releaseId: "migration-release",
        });
      })
  );

  it.effect.each(["accept", "recover"] satisfies readonly (
    | "accept"
    | "recover"
  )[])("dispatches %s without entering signed publication", (command) =>
    Effect.gen(function* () {
      const result = yield* runProgram([command]);
      expect(result).toBe(`${command}-complete`);
      expect(calls[command]).toEqual({
        command,
        recoveryId: "recovery-active",
        releaseId: "release-active",
      });
    })
  );

  it.effect.each(["abort", "cleanup"] satisfies readonly (
    | "abort"
    | "cleanup"
  )[])("dispatches %s without entering signed publication", (command) =>
    Effect.gen(function* () {
      const releaseId = `release-${command}`;
      const result = yield* runProgram([command, "--release-id", releaseId]);
      expect(result).toBe(`${command}-complete`);
      expect(calls[command]).toEqual({ command, releaseId });
    })
  );

  it.effect("dispatches status without entering signed publication", () =>
    Effect.gen(function* () {
      const result = yield* runProgram(["status"]);
      expect(result).toBe("status-complete");
      expect(calls.status).toBe(true);
    })
  );

  it.effect("dispatches read-only catalog validation without publication", () =>
    Effect.gen(function* () {
      const result = yield* runProgram(["check"]);
      expect(result).toBe("check-complete");
      expect(calls.check).toBe("/code/aksara");
    })
  );
});
