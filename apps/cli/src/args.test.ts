import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { parseCliArguments, parsePreviewArguments } from "#cli/args";

const ENGLISH_DOCUMENT =
  "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/en.mdx";

/** Decodes one preview invocation through its Effect boundary. */
function parse(args: readonly string[]) {
  return parsePreviewArguments(args);
}

/** Returns the typed preview argument failure for one invalid invocation. */
function reject(args: readonly string[]) {
  return parse(args).pipe(Effect.flip);
}

/** Decodes one complete CLI invocation through its Effect boundary. */
function parseCli(args: readonly string[]) {
  return parseCliArguments(args);
}

/** Returns the typed CLI argument failure for one invalid invocation. */
function rejectCli(args: readonly string[]) {
  return parseCli(args).pipe(Effect.flip);
}

describe("preview arguments", () => {
  it.effect("accepts one exact document option", () =>
    Effect.gen(function* () {
      expect(yield* parse(["--document", ENGLISH_DOCUMENT])).toEqual({
        document: ENGLISH_DOCUMENT,
      });
      expect(
        yield* parse(["--app-locale", "de", "--document", ENGLISH_DOCUMENT])
      ).toEqual({ appLocale: "de", document: ENGLISH_DOCUMENT });
    })
  );

  it.effect.each([
    { args: [], reason: "missing" },
    { args: ["--unknown"], reason: "unknown" },
    { args: ["--document"], reason: "value" },
    { args: ["--document", ""], reason: "value" },
    { args: ["--document", "   "], reason: "value" },
    { args: ["--document", "--document"], reason: "value" },
    {
      args: ["--app-locale", "fr", "--document", ENGLISH_DOCUMENT],
      reason: "value",
    },
    {
      args: [
        "--app-locale",
        "de",
        "--app-locale",
        "en",
        "--document",
        ENGLISH_DOCUMENT,
      ],
      reason: "duplicate",
    },
    {
      args: ["--document", "first.mdx", "--document", "second.mdx"],
      reason: "duplicate",
    },
  ] as const)("rejects ambiguous invocation %#", ({ args, reason }) =>
    Effect.gen(function* () {
      expect(yield* reject(args)).toMatchObject({
        _tag: "PreviewArgumentsError",
        reason,
      });
    })
  );
});

describe("production arguments", () => {
  it.effect("decodes the complete supported command vocabulary", () =>
    Effect.gen(function* () {
      expect(yield* parseCli(["--document", ENGLISH_DOCUMENT])).toEqual({
        command: "preview",
        document: ENGLISH_DOCUMENT,
      });
      expect(
        yield* parseCli(["abort", "--release-id", "release-2026-06-21"])
      ).toEqual({
        command: "abort",
        releaseId: "release-2026-06-21",
      });
      expect(
        yield* parseCli(["cleanup", "--release-id", "release-2026-06-22"])
      ).toEqual({
        command: "cleanup",
        releaseId: "release-2026-06-22",
      });
      expect(
        yield* parseCli([
          "cleanup-tryout-history",
          "--release-id",
          "retained-history-v1",
          "--receipt-path",
          "/tmp/receipt.json",
        ])
      ).toEqual({
        command: "cleanup-tryout-history",
        receiptPath: "/tmp/receipt.json",
        releaseId: "retained-history-v1",
      });
      expect(yield* parseCli(["status"])).toEqual({ command: "status" });
      expect(yield* parseCli(["check"])).toEqual({ command: "check" });
      expect(
        yield* parseCli([
          "accept",
          "--release-id",
          "release-2026-07-22",
          "--recovery-id",
          "recovery-2026-07-22",
        ])
      ).toEqual({
        command: "accept",
        recoveryId: "recovery-2026-07-22",
        releaseId: "release-2026-07-22",
      });
      expect(
        yield* parseCli([
          "recover",
          "--release-id",
          "release-2026-07-22",
          "--recovery-id",
          "recovery-2026-07-22",
        ])
      ).toEqual({
        command: "recover",
        recoveryId: "recovery-2026-07-22",
        releaseId: "release-2026-07-22",
      });
      expect(
        yield* parseCli([
          "release",
          "--release-id",
          "release-2026-07-23",
          "--recovery-id",
          "recovery-2026-07-23",
          "--scope",
          "family:material",
          "--scope",
          "snapshot:program",
        ])
      ).toEqual({
        command: "release",
        recoveryId: "recovery-2026-07-23",
        releaseId: "release-2026-07-23",
        scope: {
          families: ["material"],
          snapshots: ["program"],
        },
      });
    })
  );

  it.effect.each([
    {
      args: ["abort"],
      command: "abort",
      option: "--release-id",
      reason: "missing",
    },
    {
      args: ["abort", "--release-id", "INVALID"],
      command: "abort",
      option: "--release-id",
      reason: "value",
    },
    {
      args: ["cleanup"],
      command: "cleanup",
      option: "--release-id",
      reason: "missing",
    },
    {
      args: ["status", "--release-id", "release"],
      command: "status",
      option: "--release-id",
      reason: "unknown",
    },
    {
      args: ["cleanup", "--release-id", "INVALID"],
      command: "cleanup",
      option: "--release-id",
      reason: "value",
    },
    {
      args: ["abort", "--recovery-id", "recovery-next"],
      command: "abort",
      option: "--recovery-id",
      reason: "unknown",
    },
    {
      args: ["release"],
      command: "release",
      option: "--release-id",
      reason: "missing",
    },
    {
      args: ["release", "--unknown", "value"],
      command: "release",
      option: "command",
      reason: "unknown",
    },
    {
      args: ["release", "--release-id"],
      command: "release",
      option: "--release-id",
      reason: "value",
    },
    {
      args: ["release", "--release-id", "--scope"],
      command: "release",
      option: "--release-id",
      reason: "value",
    },
    {
      args: ["release", "--release-id", "first", "--release-id", "second"],
      command: "release",
      option: "--release-id",
      reason: "duplicate",
    },
    {
      args: ["release", "--release-id", "INVALID"],
      command: "release",
      option: "--release-id",
      reason: "value",
    },
    {
      args: ["release", "--release-id", "release-next"],
      command: "release",
      option: "--recovery-id",
      reason: "missing",
    },
    {
      args: [
        "release",
        "--release-id",
        "release-next",
        "--recovery-id",
        "release-next",
      ],
      command: "release",
      option: "--recovery-id",
      reason: "identity",
    },
    {
      args: [
        "release",
        "--release-id",
        "release-next",
        "--recovery-id",
        "recovery-next",
      ],
      command: "release",
      option: "--scope",
      reason: "missing",
    },
    {
      args: [
        "release",
        "--release-id",
        "release-next",
        "--recovery-id",
        "recovery-next",
        "--scope",
        "unknown:material",
      ],
      command: "release",
      option: "--scope",
      reason: "value",
    },
  ] as const)(
    "rejects production invocation %#",
    ({ args, command, option, reason }) =>
      Effect.gen(function* () {
        expect(yield* rejectCli(args)).toMatchObject({
          _tag: "ProductionArgumentsError",
          command,
          option,
          reason,
        });
      })
  );

  it.effect("rejects the deleted forward rollback command", () =>
    Effect.gen(function* () {
      expect(
        yield* rejectCli([
          "rollback",
          "--release-id",
          "rollback-next",
          "--recovery-id",
          "recovery-next",
        ])
      ).toMatchObject({
        _tag: "PreviewArgumentsError",
        reason: "unknown",
      });
    })
  );

  it.effect("rejects values attached to the read-only catalog check", () =>
    Effect.gen(function* () {
      expect(yield* rejectCli(["check", "--unknown"])).toMatchObject({
        _tag: "CheckArgumentsError",
        reason: "unknown",
      });
    })
  );
});
