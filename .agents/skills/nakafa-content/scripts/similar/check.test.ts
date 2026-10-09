import { fileURLToPath } from "node:url";
import { assert, it } from "@effect/vitest";
import { Effect } from "effect";
import { capture } from "#nakafa-content/points/test/console";
import { runMain } from "#nakafa-content/similar/check";

const SET =
  "packages/corpus/question-bank/tryout/indonesia/tka/english-language/set-4";
const BANK_TIMEOUT = 60_000;

it.effect("rejects missing, extra, unknown, and out-of-range arguments", () =>
  Effect.gen(function* () {
    const result = yield* capture(
      Effect.all([
        runMain([]),
        runMain(["first", "second"]),
        runMain(["--unknown"]),
        runMain([SET, "--threshold", "2"]),
      ])
    );

    assert.deepStrictEqual(result.code, [2, 2, 2, 2]);
    assert.isTrue(
      result.error.every((line) => line.startsWith("SimilarityCheckError"))
    );
  })
);

it.effect(
  "reports every item and passage pair at or above the threshold",
  () =>
    Effect.gen(function* () {
      const result = yield* capture(runMain([SET, "--threshold", "0.001"]));

      assert.equal(result.code, 1);
      assert.isTrue(result.error.some((line) => line.startsWith("ITEM ")));
      assert.isTrue(result.error.some((line) => line.startsWith("PASSAGE ")));
      assert.include(result.log[0], `under ${SET} reach 0.001.`);
    }),
  BANK_TIMEOUT
);

it.effect(
  "passes a set with nothing at the default threshold",
  () =>
    Effect.gen(function* () {
      const result = yield* capture(runMain([SET]));

      assert.equal(result.code, 0);
      assert.deepStrictEqual(result.error, []);
      assert.deepStrictEqual(result.log, [
        `0 item pairs and 0 passages under ${SET} reach 0.5.`,
      ]);
    }),
  BANK_TIMEOUT
);

it.effect("runs when the module is the process entrypoint", () =>
  Effect.gen(function* () {
    yield* Effect.acquireRelease(
      Effect.sync(() => {
        const original = {
          argv: process.argv,
          error: console.error,
          exitCode: process.exitCode,
        };
        console.error = () => undefined;
        process.argv = [
          process.execPath,
          fileURLToPath(new URL("./check.ts", import.meta.url)),
          "--unknown",
        ];
        process.exitCode = undefined;
        vi.resetModules();
        return original;
      }),
      (original) =>
        Effect.sync(() => {
          console.error = original.error;
          process.argv = original.argv;
          process.exitCode = original.exitCode;
        })
    );
    yield* Effect.promise(() => import("#nakafa-content/similar/check"));
    yield* Effect.promise(() =>
      vi.waitFor(() => {
        assert.equal(process.exitCode, 2);
      })
    );
  })
);
