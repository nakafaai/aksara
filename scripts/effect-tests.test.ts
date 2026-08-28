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
        'import { Effect } from "effect";\nimport { it } from "@nakafa/testing/effect";\nEffect.runSync(program);'
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
      'import { Effect as Fx } from "effect";\nFx.runPromise(program);\nFx.runSync(program);',
      'import * as Fx from "effect/Effect";\nFx.runSync(program);',
      'import * as Fx from "effect";\nFx.Effect.runFork(program);',
    ];

    for (const source of sources) {
      expect(effectTestViolations("program.test.ts", source)).toEqual([
        "program.test.ts: execute Effects through @effect/vitest instead of Effect.run*.",
      ]);
    }
  });

  it("detects statically named element access", () => {
    const sources = [
      'import { Effect } from "effect";\nEffect["runPromise"](program);',
      'import { Effect as Fx } from "effect";\nFx[`runSync`](program);',
      'import * as Fx from "effect";\nFx["Effect"]["runFork"](program);',
    ];

    for (const source of sources) {
      expect(effectTestViolations("program.test.ts", source)).toEqual([
        "program.test.ts: execute Effects through @effect/vitest instead of Effect.run*.",
      ]);
    }
  });

  it("detects Effect runners passed as pipe steps", () => {
    const sources = [
      'import { Effect } from "effect";\nprogram.pipe(Effect.runPromise);',
      'import { Effect as Fx } from "effect";\nprogram["pipe"](Fx["runSync"]);',
      'import * as Fx from "effect";\nprogram.pipe(Fx.Effect.runFork);',
      'import { runPromise as execute } from "effect/Effect";\nprogram.pipe(execute);',
    ];

    for (const source of sources) {
      expect(effectTestViolations("program.test.ts", source)).toEqual([
        "program.test.ts: execute Effects through @effect/vitest instead of Effect.run*.",
      ]);
    }
  });

  it("unwraps transparent runtime references", () => {
    const sources = [
      'import { Effect } from "effect";\n(Effect.runPromise)(program);',
      'import { Effect } from "effect";\n(Effect.runPromise as typeof Effect.runPromise)(program);',
      'import { Effect } from "effect";\nEffect.runPromise!(program);',
      'import { Effect } from "effect";\n(<typeof Effect.runPromise>Effect.runPromise)(program);',
      'import { Effect } from "effect";\n(Effect.runPromise satisfies typeof Effect.runPromise)(program);',
      'import { Effect } from "effect";\nprogram.pipe(Effect.runPromise<string>);',
      'import { Effect } from "effect";\n(program.pipe)(Effect.runPromise);',
      'import { Effect } from "effect";\nconst run = (Effect.runPromise as typeof Effect.runPromise);\nrun(program);',
    ];

    for (const source of sources) {
      expect(effectTestViolations("program.test.ts", source)).toEqual([
        "program.test.ts: execute Effects through @effect/vitest instead of Effect.run*.",
      ]);
    }
  });

  it("preserves shadowing through transparent references", () => {
    const sources = [
      'import { Effect } from "effect";\ncallbacks.forEach((Effect) => (Effect.runPromise)(program));',
      'import { runPromise } from "effect/Effect";\ncallbacks.forEach((runPromise) => (runPromise as Function)(program));',
    ];

    for (const source of sources) {
      expect(effectTestViolations("program.test.ts", source)).toEqual([]);
    }
  });

  it("resolves Effect namespace aliases through their lexical binding", () => {
    const sources = [
      'import { Effect } from "effect";\ncallbacks.forEach((Effect) => Effect.runPromise(program));',
      'import { Effect as Fx } from "effect";\ncallbacks.forEach((Fx) => Fx.runPromise(program));',
      'import * as Fx from "effect/Effect";\ncallbacks.forEach((Fx) => Fx.runSync(program));',
      'import * as Fx from "effect";\ncallbacks.forEach((Fx) => Fx.Effect.runFork(program));',
      'import { Effect as Fx } from "effect";\ncallbacks.forEach((Fx) => program.pipe(Fx.runPromise));',
      'import * as Fx from "effect";\ncallbacks.forEach((Fx) => Fx["Effect"]["runFork"](program));',
    ];

    for (const source of sources) {
      expect(effectTestViolations("program.test.ts", source)).toEqual([]);
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

  it("traces local aliases and static destructuring", () => {
    const sources = [
      'import { Effect } from "effect";\nconst Fx = Effect;\nFx.runPromise(program);',
      'import { Effect } from "effect";\nconst run = Effect.runPromise;\nrun(program);',
      'import { Effect } from "effect";\nconst { runSync: execute } = Effect;\nexecute(program);',
      'import { Effect } from "effect";\nconst { ["runPromise"]: execute } = Effect;\nexecute(program);',
      'import * as Runtime from "effect";\nconst { Effect: Fx } = Runtime;\nprogram.pipe(Fx.runFork);',
      'import { runPromise } from "effect/Effect";\nconst execute = runPromise;\nprogram.pipe(execute);',
    ];

    for (const source of sources) {
      expect(effectTestViolations("program.test.ts", source)).toEqual([
        "program.test.ts: execute Effects through @effect/vitest instead of Effect.run*.",
      ]);
    }
  });

  it("bounds local alias tracing by lexical symbol identity", () => {
    const source = [
      'import { Effect } from "effect";',
      "const first = second;",
      "const second = first;",
      "program.pipe(first);",
      "callbacks.forEach((Effect) => program.pipe(Effect.runPromise));",
    ].join("\n");

    expect(effectTestViolations("program.test.ts", source)).toEqual([]);
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
    expect(
      effectTestViolations(
        "program.test.ts",
        'import * as Fx from "effect";\nFx.Schema.runSync(program);'
      )
    ).toEqual([]);
    expect(
      effectTestViolations(
        "program.test.ts",
        'import { Effect } from "effect";\nconst { succeed } = Effect;\nsucceed(1);'
      )
    ).toEqual([]);
    expect(
      effectTestViolations(
        "program.test.ts",
        'import { Effect } from "effect";\nEffect[dynamicRunner](program);'
      )
    ).toEqual([]);
    expect(
      effectTestViolations(
        "program.test.ts",
        'import { Effect } from "effect";\nconst { [0]: execute } = Effect;\nexecute(program);'
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
          `import { Effect } from "effect";\nEffect.${runner}(program);`
        )
      ).toHaveLength(1);
    }
  });
});
