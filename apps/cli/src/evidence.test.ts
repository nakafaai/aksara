import type { Command } from "@effect/platform/Command";
import { CommandExecutor } from "@effect/platform/CommandExecutor";
import { SystemError } from "@effect/platform/Error";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { readCleanAksaraRevision, readRepositoryEvidence } from "#cli/evidence";
import {
  inspectTestCommand,
  makeTestExecutor,
  type TestCommandResult,
} from "#test/command";

const COMMIT_SHA = "a".repeat(40);
const COMMAND_ERROR = new SystemError({
  method: "spawn",
  module: "Command",
  reason: "Unknown",
});

interface EvidenceOverrides {
  readonly sha?: TestCommandResult;
  readonly status?: TestCommandResult;
}

/** Responds independently to exact SHA and dirty-state Git commands. */
function makeEvidenceExecutor(overrides: EvidenceOverrides = {}) {
  return makeTestExecutor((command: Command) => {
    const { args } = inspectTestCommand(command);
    const isSha = args.includes("rev-parse");
    return Effect.succeed(
      isSha
        ? (overrides.sha ?? { stdout: `${COMMIT_SHA}\n` })
        : (overrides.status ?? { stdout: "" })
    );
  });
}

/** Reads repository evidence through one explicit command service. */
function readEvidence(overrides?: EvidenceOverrides) {
  return Effect.runPromise(
    readRepositoryEvidence("aksara", "/code/aksara").pipe(
      Effect.provideService(CommandExecutor, makeEvidenceExecutor(overrides))
    )
  );
}

/** Returns the typed evidence error produced by one command scenario. */
function rejectEvidence(overrides: EvidenceOverrides) {
  return Effect.runPromise(
    readRepositoryEvidence("nakafa", "/code/nakafa.com").pipe(
      Effect.provideService(CommandExecutor, makeEvidenceExecutor(overrides)),
      Effect.flip
    )
  );
}

describe("repository evidence", () => {
  it("captures exact clean and dirty repository states", async () => {
    const [clean, dirty] = await Promise.all([
      readEvidence(),
      readEvidence({ status: { stdout: " M packages/corpus/real/en.mdx\n" } }),
    ]);

    expect(clean).toEqual({ dirty: false, sha: COMMIT_SHA });
    expect(dirty).toEqual({ dirty: true, sha: COMMIT_SHA });
  });

  it("accepts only a clean exact Aksara release revision", async () => {
    const clean = await Effect.runPromise(
      readCleanAksaraRevision("/code/aksara").pipe(
        Effect.provideService(CommandExecutor, makeEvidenceExecutor())
      )
    );
    const dirty = await Effect.runPromise(
      readCleanAksaraRevision("/code/aksara").pipe(
        Effect.provideService(
          CommandExecutor,
          makeEvidenceExecutor({ status: { stdout: " M real-source.mdx\n" } })
        ),
        Effect.flip
      )
    );

    expect(clean).toBe(COMMIT_SHA);
    expect(dirty).toMatchObject({
      _tag: "ReleaseEvidenceError",
      reason: "dirty",
    });
  });

  it.each([
    [{ sha: { exitCode: 1, stdout: "" } }, "sha"],
    [{ status: { exitCode: 1, stdout: "" } }, "status"],
    [{ sha: { stdout: "not-a-commit\n" } }, "sha"],
    [{ sha: { stdout: new Uint8Array(4 * 1024 * 1024 + 1) } }, "sha"],
    [{ status: { stdout: Uint8Array.from([0xc3, 0x28]) } }, "status"],
  ] as const)(
    "fails closed for invalid Git evidence %#",
    async (overrides, stage) => {
      const error = await rejectEvidence(overrides);
      expect(error).toMatchObject({
        _tag: "PreviewEvidenceError",
        repository: "nakafa",
        stage,
      });
    }
  );

  it("maps process startup failures without exposing command details", async () => {
    const executor = makeTestExecutor(() => Effect.fail(COMMAND_ERROR));
    const error = await Effect.runPromise(
      readRepositoryEvidence("aksara", "/secret/path").pipe(
        Effect.provideService(CommandExecutor, executor),
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "PreviewEvidenceError",
      repository: "aksara",
    });
    expect(JSON.stringify(error)).not.toContain("secret");
  });
});
