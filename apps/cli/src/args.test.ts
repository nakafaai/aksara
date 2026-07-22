import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { parsePreviewArguments } from "#cli/args";

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
    await expect(
      parse(["--document", "packages/corpus/material/lesson/example/en.mdx"])
    ).resolves.toEqual({
      document: "packages/corpus/material/lesson/example/en.mdx",
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
