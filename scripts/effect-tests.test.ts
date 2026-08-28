import { describe, expect, it } from "vitest";

import { effectTestViolations } from "#scripts/effect-tests";

describe("Effect test execution policy", () => {
  it("rejects direct Effect runtime execution", () => {
    const file = "packages/example/src/program.test.ts";
    const source = [
      'import { Effect } from "effect";',
      'import { it } from "@effect/vitest";',
      'it("runs", () => Effect.runPromise(Effect.void));',
    ].join("\n");

    expect(effectTestViolations(file, source)).toEqual([
      `${file}: execute Effects through @effect/vitest instead of Effect.run*.`,
    ]);
  });

  it("rejects the removed pass-through adapter", () => {
    expect(
      effectTestViolations(
        "packages/example/src/program.test.ts",
        'import { it } from "@nakafa/testing/effect";\nit("pure", () => true);'
      )
    ).toEqual([
      "packages/example/src/program.test.ts: import Effect test APIs directly from @effect/vitest.",
    ]);
  });

  it("reports legacy imports and direct runners independently", () => {
    expect(
      effectTestViolations(
        "packages/example/src/program.test.ts",
        'import { it } from "@nakafa/testing/effect";\nEffect.runSync(program);'
      )
    ).toEqual([
      "packages/example/src/program.test.ts: import Effect test APIs directly from @effect/vitest.",
      "packages/example/src/program.test.ts: execute Effects through @effect/vitest instead of Effect.run*.",
    ]);
  });

  it("allows native Effect Vitest, pure Vitest, and runtime boundaries", () => {
    expect(
      effectTestViolations(
        "packages/example/src/program.test.ts",
        'import { it } from "@effect/vitest";\nit.effect("runs", () => program);'
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

  it("ignores runtime source examples stored in fixture strings", () => {
    expect(
      effectTestViolations(
        "packages/contracts/scripts/consumer.test.ts",
        'expect(createInstallRunner()).toContain("await Effect.runPromise(");'
      )
    ).toEqual([]);
  });

  it("detects aliased Effect runtime namespaces", () => {
    const sources = [
      'import { Effect as Fx } from "effect";\nFx.runPromise(program);',
      'import * as Fx from "effect/Effect";\nFx.runSync(program);',
      'import * as Fx from "effect";\nFx.Effect.runFork(program);',
    ];

    for (const source of sources) {
      expect(effectTestViolations("program.test.ts", source)).toEqual([
        "program.test.ts: execute Effects through @effect/vitest instead of Effect.run*.",
      ]);
    }
  });

  it("detects direct Effect runtime imports", () => {
    const sources = [
      'import { runPromise } from "effect/Effect";\nrunPromise(program);',
      'import { runSync as execute } from "effect/Effect";\nexecute(program);',
    ];

    for (const source of sources) {
      expect(effectTestViolations("program.test.ts", source)).toEqual([
        "program.test.ts: execute Effects through @effect/vitest instead of Effect.run*.",
      ]);
    }
  });

  it("resolves direct runner imports through their lexical binding", () => {
    const file = "program.test.ts";
    const source = [
      'import { runPromise } from "effect/Effect";',
      "expect(runPromise).toBeDefined();",
      "callbacks.forEach((runPromise) => runPromise());",
    ].join("\n");

    expect(effectTestViolations(file, source)).toEqual([]);
  });

  it("allows unrelated aliases from Effect modules", () => {
    expect(
      effectTestViolations(
        "program.test.ts",
        'import { Schema as S } from "effect";\nS.decodeUnknownSync(schema)(input);'
      )
    ).toEqual([]);
    expect(
      effectTestViolations(
        "program.test.ts",
        'import { succeed } from "effect/Effect";\nsucceed(1);'
      )
    ).toEqual([]);
  });

  it("covers every direct Effect runner", () => {
    const runners = [
      "runCallback",
      "runCallbackWith",
      "runFork",
      "runForkWith",
      "runPromise",
      "runPromiseExit",
      "runPromiseExitWith",
      "runPromiseWith",
      "runSync",
      "runSyncExit",
      "runSyncExitWith",
      "runSyncWith",
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
