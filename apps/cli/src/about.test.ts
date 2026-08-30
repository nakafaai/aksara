import { describe, expect, it } from "@effect/vitest";
import { Console, Effect, Option, Result } from "effect";
import { parseInfoArguments, printCliInfo } from "#cli/about";

describe("CLI information", () => {
  it.effect("prints stable help and version output", () => {
    const output: string[] = [];
    const testConsole: Console.Console = Object.assign(Object.create(console), {
      log: (...values: readonly unknown[]) => {
        output.push(values.join(" "));
      },
    });

    return Effect.gen(function* () {
      yield* printCliInfo("help", "9.8.7");
      yield* printCliInfo("version", "9.8.7");

      expect(output[0]).toContain("Aksara CLI");
      expect(output[0]).toContain("inside an Aksara checkout");
      expect(output[1]).toBe("9.8.7");
    }).pipe(Effect.provideService(Console.Console, testConsole));
  });

  it.effect("decodes only exact informational invocations", () =>
    Effect.gen(function* () {
      expect(Option.getOrUndefined(yield* parseInfoArguments(["--help"]))).toBe(
        "help"
      );
      expect(Option.getOrUndefined(yield* parseInfoArguments(["-v"]))).toBe(
        "version"
      );
      expect(Option.isNone(yield* parseInfoArguments(["check"]))).toBe(true);
      const invalid = yield* parseInfoArguments(["--version", "extra"]).pipe(
        Effect.result
      );
      expect(Result.isFailure(invalid) && invalid.failure).toMatchObject({
        _tag: "InfoArgumentsError",
        reason: "unknown",
      });
    })
  );
});
