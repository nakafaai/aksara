import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { OptionArgumentError, parseOptions } from "#scripts/options";

const DECLARED = ["output", "package"];

describe("command option parsing", () => {
  it.effect(
    "reads declared options in both spellings and keeps positionals",
    () =>
      Effect.gen(function* () {
        const parsed = yield* parseOptions(
          [
            "--output",
            "out.tgz",
            "--package=packages/contracts/package.json",
            "describe",
          ],
          DECLARED,
          true
        );

        expect(parsed).toEqual({
          positionals: ["describe"],
          values: {
            output: "out.tgz",
            package: "packages/contracts/package.json",
          },
        });
      })
  );

  it.effect("rejects an undeclared option with its exact name", () =>
    Effect.gen(function* () {
      const error = yield* parseOptions(
        ["--unknown=value"],
        DECLARED,
        true
      ).pipe(Effect.flip);

      expect(error).toBeInstanceOf(OptionArgumentError);
      expect(error).toMatchObject({
        argument: "--unknown=value",
        detail: "Unknown option '--unknown'",
      });
    })
  );

  it.effect("rejects a positional argument when the command takes none", () =>
    Effect.gen(function* () {
      const error = yield* parseOptions(["describe"], DECLARED, false).pipe(
        Effect.flip
      );

      expect(error).toMatchObject({
        argument: "describe",
        detail: "Unexpected argument 'describe'",
      });
    })
  );

  it.effect("rejects a declared option that lacks its value", () =>
    Effect.gen(function* () {
      const missing = yield* parseOptions(["--output"], DECLARED, true).pipe(
        Effect.flip
      );
      const followed = yield* parseOptions(
        ["--output", "--package=packages/contracts/package.json"],
        DECLARED,
        true
      ).pipe(Effect.flip);

      expect(missing).toMatchObject({
        argument: "--output",
        detail: "Option '--output' requires a value",
      });
      expect(followed).toMatchObject({
        argument: "--output",
        detail: "Option '--output' requires a value",
      });
    })
  );
});
