import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { parseCliArguments, parsePreviewArguments } from "#cli/args";

const ENGLISH_DOCUMENT =
  "packages/corpus/material/lesson/mathematics/function-composition_/inverse-function/function-concept/en.mdx";

/** Runs argument decoding at the test runner boundary. */
function parse(args: readonly string[]) {
  return Effect.runPromise(parsePreviewArguments(args));
}

/** Returns the typed argument failure for one invalid invocation. */
function reject(args: readonly string[]) {
  return Effect.runPromise(parsePreviewArguments(args).pipe(Effect.flip));
}

describe("preview arguments", () => {
  it("accepts one exact document option", async () => {
    await expect(parse(["--document", ENGLISH_DOCUMENT])).resolves.toEqual({
      document: ENGLISH_DOCUMENT,
    });
  });

  it.each([
    [[], "missing"],
    [["--unknown"], "unknown"],
    [["--document"], "value"],
    [["--document", ""], "value"],
    [["--document", "   "], "value"],
    [["--document", "--document"], "value"],
    [["--document", "first.mdx", "--document", "second.mdx"], "duplicate"],
  ] as const)("rejects ambiguous invocation %#", async (args, reason) => {
    await expect(reject(args)).resolves.toMatchObject({
      _tag: "PreviewArgumentsError",
      reason,
    });
  });
});

/** Runs complete CLI argument decoding at the test runner boundary. */
function parseCli(args: readonly string[]) {
  return Effect.runPromise(parseCliArguments(args));
}

/** Returns one typed production argument failure for an invalid invocation. */
function rejectCli(args: readonly string[]) {
  return Effect.runPromise(parseCliArguments(args).pipe(Effect.flip));
}

describe("production arguments", () => {
  it("preserves implicit preview and decodes exact production commands", async () => {
    await expect(parseCli(["--document", ENGLISH_DOCUMENT])).resolves.toEqual({
      command: "preview",
      document: ENGLISH_DOCUMENT,
    });
    await expect(
      parseCli(["abort", "--release-id", "release-2026-06-21"])
    ).resolves.toEqual({
      command: "abort",
      releaseId: "release-2026-06-21",
    });
    await expect(
      parseCli(["cleanup", "--release-id", "release-2026-06-22"])
    ).resolves.toEqual({
      command: "cleanup",
      releaseId: "release-2026-06-22",
    });
    await expect(
      parseCli(["release", "--release-id", "release-2026-07-22"])
    ).resolves.toEqual({
      command: "release",
      releaseId: "release-2026-07-22",
    });
    await expect(
      parseCli([
        "rollback",
        "--rollback-of",
        "release-2026-07-21",
        "--release-id",
        "rollback-2026-07-22",
      ])
    ).resolves.toEqual({
      command: "rollback",
      releaseId: "rollback-2026-07-22",
      rollbackOf: "release-2026-07-21",
    });
  });

  it.each([
    [["abort"], "abort", "--release-id", "missing"],
    [["abort", "--rollback-of", "prior"], "abort", "--rollback-of", "unknown"],
    [["abort", "--release-id", "INVALID"], "abort", "--release-id", "value"],
    [["cleanup"], "cleanup", "--release-id", "missing"],
    [
      ["cleanup", "--rollback-of", "prior"],
      "cleanup",
      "--rollback-of",
      "unknown",
    ],
    [
      ["cleanup", "--release-id", "INVALID"],
      "cleanup",
      "--release-id",
      "value",
    ],
    [["release"], "release", "--release-id", "missing"],
    [
      ["release", "--rollback-of", "prior"],
      "release",
      "--rollback-of",
      "unknown",
    ],
    [["release", "--unknown", "value"], "release", "command", "unknown"],
    [["release", "--release-id"], "release", "--release-id", "value"],
    [
      ["release", "--release-id", "--rollback-of"],
      "release",
      "--release-id",
      "value",
    ],
    [
      ["release", "--release-id", "first", "--release-id", "second"],
      "release",
      "--release-id",
      "duplicate",
    ],
    [
      ["release", "--release-id", "INVALID"],
      "release",
      "--release-id",
      "value",
    ],
    [
      ["rollback", "--release-id", "next"],
      "rollback",
      "--rollback-of",
      "missing",
    ],
    [
      [
        "rollback",
        "--release-id",
        "next",
        "--rollback-of",
        "first",
        "--rollback-of",
        "second",
      ],
      "rollback",
      "--rollback-of",
      "duplicate",
    ],
    [
      ["rollback", "--release-id", "next", "--rollback-of", "INVALID"],
      "rollback",
      "--rollback-of",
      "value",
    ],
  ] as const)(
    "rejects production invocation %#",
    async (args, command, option, reason) => {
      await expect(rejectCli(args)).resolves.toMatchObject({
        _tag: "ProductionArgumentsError",
        command,
        option,
        reason,
      });
    }
  );
});
