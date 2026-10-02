import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";
import { parseOptions } from "#nakafa-content/points/options";

describe("points options", () => {
  it.effect("reads the targets and compares with origin/main by default", () =>
    Effect.gen(function* () {
      assert.deepStrictEqual(yield* parseOptions(["lessons", "a/id.mdx"]), {
        base: "origin/main",
        targets: ["lessons", "a/id.mdx"],
      });
    })
  );

  it.effect("reads an explicit base before or after the targets", () =>
    Effect.gen(function* () {
      const expected = { base: "abc1234", targets: ["lessons"] };

      assert.deepStrictEqual(
        yield* parseOptions(["--base", "abc1234", "lessons"]),
        expected
      );
      assert.deepStrictEqual(
        yield* parseOptions(["lessons", "--base=abc1234"]),
        expected
      );
    })
  );

  it.effect("rejects missing, unknown, and incomplete arguments", () =>
    Effect.gen(function* () {
      for (const arguments_ of [
        [],
        ["--unknown", "lessons"],
        ["lessons", "--base"],
      ]) {
        const error = yield* parseOptions(arguments_).pipe(Effect.flip);

        assert.strictEqual(error._tag, "PointsCheckError");
        assert.strictEqual(error.reason, "invalid-arguments");
        assert.include(error.detail, "Usage: points/check.ts");
      }
    })
  );
});
