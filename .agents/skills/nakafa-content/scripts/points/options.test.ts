import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";
import { parseOptions } from "#nakafa-content/points/options";

describe("points options", () => {
  it.effect("reads the targets and compares with origin/main by default", () =>
    Effect.gen(function* () {
      assert.deepStrictEqual(yield* parseOptions(["lessons", "a/id.mdx"]), {
        all: false,
        base: "origin/main",
        targets: ["lessons", "a/id.mdx"],
      });
    })
  );

  it.effect(
    "reads --all and an explicit base before or after the targets",
    () =>
      Effect.gen(function* () {
        const expected = {
          all: false,
          base: "abc1234",
          targets: ["lessons"] as const,
        };

        assert.deepStrictEqual(
          yield* parseOptions(["--base", "abc1234", "lessons"]),
          expected
        );
        assert.deepStrictEqual(
          yield* parseOptions(["lessons", "--base=abc1234"]),
          expected
        );
        assert.deepStrictEqual(yield* parseOptions(["lessons", "--all"]), {
          all: true,
          base: "origin/main",
          targets: ["lessons"],
        });
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
