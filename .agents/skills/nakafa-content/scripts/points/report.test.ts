import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";
import { printReport, shortRevision } from "#nakafa-content/points/report";
import { capture } from "#nakafa-content/points/test/console";

const BASE = "0123456789abcdef";

describe("points report", () => {
  it("shortens a revision to seven characters", () => {
    assert.strictEqual(shortRevision(BASE), "0123456");
    assert.strictEqual(shortRevision("abc"), "abc");
  });

  it.effect("passes a run without findings with exit code 0", () =>
    Effect.gen(function* () {
      const result = yield* capture(
        printReport({ base: BASE, compared: 2, files: 5, findings: [] })
      );

      assert.strictEqual(result.code, 0);
      assert.deepStrictEqual(result.error, []);
      assert.deepStrictEqual(result.log, [
        "Points check passed for 5 files and compared 2 changed files with 0123456.",
      ]);
    })
  );

  it.effect("prints each finding with its position and exits with 1", () =>
    Effect.gen(function* () {
      const finding = {
        column: 7,
        file: "lessons/a/en.mdx",
        line: 12,
        message: "9 literal points in one series",
        rule: "literal-points",
      } as const;
      const result = yield* capture(
        printReport({
          base: BASE,
          compared: 1,
          files: 3,
          findings: [
            finding,
            { ...finding, line: 20, rule: "long-decimal" },
            { ...finding, file: "lessons/b/en.mdx" },
          ],
        })
      );

      assert.strictEqual(result.code, 1);
      assert.deepStrictEqual(result.error, [
        "lessons/a/en.mdx:12:7 [literal-points] 9 literal points in one series",
        "lessons/a/en.mdx:20:7 [long-decimal] 9 literal points in one series",
        "lessons/b/en.mdx:12:7 [literal-points] 9 literal points in one series",
        "Points check found 3 finding(s) in 2 of 3 files, compared with 0123456.",
      ]);
      assert.deepStrictEqual(result.log, []);
    })
  );
});
