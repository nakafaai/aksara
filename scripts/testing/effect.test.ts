import { describe, expect, it } from "vitest";

import { effectTestViolations } from "#scripts/testing/effect";

describe("Effect test integration policy", () => {
  it("requires the official integration for explicit Effect runners", () => {
    const file = "packages/example/src/program.test.ts";
    const source = [
      'import { Effect } from "effect";',
      'import { it } from "vitest";',
      'it("runs", async () => Effect.runPromise(Effect.void));',
    ].join("\n");

    expect(effectTestViolations(file, source)).toEqual([
      `${file}: Effect runtime tests must import @effect/vitest.`,
    ]);
  });

  it("rejects the deleted pass-through adapter", () => {
    expect(
      effectTestViolations(
        "packages/example/src/program.test.ts",
        'import { it } from "@nakafa/testing/effect";\nit("pure", () => true);'
      )
    ).toEqual([
      "packages/example/src/program.test.ts: Remove the legacy @nakafa/testing/effect adapter.",
    ]);
  });

  it("allows official integration, pure tests, and production modules", () => {
    expect(
      effectTestViolations(
        "packages/example/src/program.test.ts",
        'import { it } from "@effect/vitest";\nEffect.runPromise(program);'
      )
    ).toEqual([]);
    expect(
      effectTestViolations(
        "packages/example/src/program.test.ts",
        'import { it } from "vitest";\nit("pure", () => true);'
      )
    ).toEqual([]);
    expect(
      effectTestViolations(
        "packages/example/src/program.ts",
        'import { it } from "vitest";\nEffect.runSync(program);'
      )
    ).toEqual([]);
  });

  it("covers every direct Effect runner", () => {
    const runners = [
      "runFork",
      "runPromise",
      "runPromiseExit",
      "runSync",
      "runSyncExit",
    ];

    for (const runner of runners) {
      expect(
        effectTestViolations(
          "program.test.ts",
          `import { it } from "vitest";\nEffect.${runner}(program);`
        )
      ).toHaveLength(1);
    }
  });
});
