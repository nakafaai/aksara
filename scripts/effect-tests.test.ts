import { describe, expect, it } from "vitest";

import { effectTestAdapterViolations } from "#scripts/effect-tests";

describe("Effect test adapter policy", () => {
  it("requires the shared adapter for explicit Effect runtime tests", () => {
    const file = "packages/example/src/program.test.ts";
    const source = [
      'import { Effect } from "effect";',
      'import { it } from "vitest";',
      'it("runs", async () => Effect.runPromise(Effect.void));',
    ].join("\n");

    expect(effectTestAdapterViolations(file, source)).toEqual([
      `${file}: Effect runtime tests must import @nakafa/testing/effect.`,
    ]);
  });

  it("allows the shared adapter, pure tests, and production modules", () => {
    expect(
      effectTestAdapterViolations(
        "packages/example/src/program.test.ts",
        'import { it } from "@nakafa/testing/effect";\nimport { vi } from "vitest";\nEffect.runPromise(program);'
      )
    ).toEqual([]);
    expect(
      effectTestAdapterViolations(
        "packages/example/src/program.test.ts",
        'import { it } from "vitest";\nit("pure", () => true);'
      )
    ).toEqual([]);
    expect(
      effectTestAdapterViolations(
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
        effectTestAdapterViolations(
          "program.test.ts",
          `import { it } from "vitest";\nEffect.${runner}(program);`
        )
      ).toHaveLength(1);
    }
  });
});
