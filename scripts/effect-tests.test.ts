import { describe, expect, it } from "@effect/vitest";

import { effectTestViolations } from "#scripts/effect-tests";

const FILE = "packages/example/src/program.test.ts";
const RUNNER_VIOLATION =
  "packages/example/src/program.test.ts: use @effect/vitest instead of Effect runtime runners.";

/** Asserts the reserved runner diagnostic for one source fixture. */
const expectRunnerViolation = (source: string) => {
  expect(effectTestViolations(FILE, source), source).toEqual([
    RUNNER_VIOLATION,
  ]);
};

describe("Effect test policy", () => {
  it("rejects the removed static and dynamic adapter imports", () => {
    for (const source of [
      'import { it } from "@nakafa/testing/effect";',
      'await import("@nakafa/testing/effect");',
    ]) {
      expect(effectTestViolations(FILE, source)).toEqual([
        `${FILE}: import Effect test APIs directly from @effect/vitest.`,
      ]);
    }
  });

  it("rejects reserved runner imports and member access", () => {
    const sources = [
      'import { Effect } from "effect";\nEffect.runPromise(program);',
      'import { Effect } from "effect";\nEffect["runSync"](program);',
      'import { runPromise as execute } from "effect/Effect";\nexecute(program);',
      'import { runSync } from "effect/ManagedRuntime";\nrunSync(program);',
      'import { ManagedRuntime } from "effect";\nruntime.runPromise(program);',
      'const Runtime = await import("effect", { with: {} });\nRuntime.Effect.runPromise(program);',
    ];
    for (const source of sources) {
      expectRunnerViolation(source);
    }
  });

  it("reserves runner names through aliases and destructuring", () => {
    const sources = [
      'const consume = ({ Effect }: typeof import("effect")) => Effect.runPromise(program);\nimport("effect").then(consume);',
      'import { Effect } from "effect";\nconst holder = { Effect };\nholder.Effect.runPromise(program);',
      'import { Effect } from "effect";\nconst { runPromise } = Effect;',
      'import { Effect } from "effect";\nlet run;\n({ runSync: run } = Effect);',
      'import * as Runtime from "effect";\nlet run;\n({ Effect: { runFork: run } } = Runtime);',
    ];
    for (const source of sources) {
      expectRunnerViolation(source);
    }
  });

  it("rejects unknown computed access on direct imported bindings", () => {
    for (const source of [
      'import { Effect } from "effect";\nEffect[runner](program);',
      'import * as Runtime from "effect/Effect";\nRuntime[member];',
    ]) {
      expectRunnerViolation(source);
    }
  });

  it("allows native tests, types, fixtures, and unrelated APIs", () => {
    const sources = [
      'import { Effect } from "effect";\nimport { it } from "@effect/vitest";\nit.effect("runs", () => Effect.succeed(1));',
      'import { it } from "@effect/vitest";\nit("pure", () => true);',
      'import type { runPromise } from "effect/Effect";\ntype Runner = typeof runPromise;',
      'import { Effect } from "effect";\ntype Runner = typeof Effect.runPromise;\nEffect.succeed(1);',
      'import { Schema } from "effect";\nSchema.runSync(program);',
      'import { Effect } from "effect";\nconst fake = { runPromise: callback };\nfake.work();',
      'import { Effect } from "effect";\nconst name = "succeed";\nconst { [name]: operation } = Effect;',
      "const Runtime = await import(moduleName);\nRuntime.runSync(program);",
    ];
    for (const source of sources) {
      expect(effectTestViolations(FILE, source)).toEqual([]);
    }
    expect(
      effectTestViolations(
        "packages/example/src/program.ts",
        'import { Effect } from "effect";\nEffect.runSync(program);'
      )
    ).toEqual([]);
    expect(
      effectTestViolations(
        "packages/contracts/scripts/consumer.test.ts",
        'expect(source).toContain("await Effect.runPromise(");'
      )
    ).toEqual([]);
  });

  it("covers the exact vendored Effect runner names", () => {
    const runners =
      "runCallback runCallbackWith runFork runForkWith runPromise runPromiseExit runPromiseExitWith runPromiseWith runSync runSyncExit runSyncExitWith runSyncWith".split(
        " "
      );
    for (const runner of runners) {
      expectRunnerViolation(
        `import { Effect } from "effect";\nEffect.${runner}(program);`
      );
    }
  });

  it("covers the exact vendored ManagedRuntime runner names", () => {
    const runners =
      "runCallback runFork runPromise runPromiseExit runSync runSyncExit".split(
        " "
      );
    for (const runner of runners) {
      expectRunnerViolation(
        `import { ManagedRuntime } from "effect";\nruntime.${runner}(program);`
      );
    }
  });
});
