import { describe, expect, it } from "vitest";

import { effectTestViolations } from "#scripts/effect-tests";

const FILE = "program.test.ts";
const RUNNER_VIOLATION =
  "program.test.ts: use @effect/vitest instead of Effect runtime runners.";

/** Asserts that one source fixture violates the native runner policy. */
const expectRunnerViolation = (source: string) => {
  expect(effectTestViolations(FILE, source)).toEqual([RUNNER_VIOLATION]);
};

describe("Effect runtime import policy", () => {
  it("rejects runner references in ordinary JavaScript combinators", () => {
    const sources = [
      'import { Effect, pipe } from "effect";\npipe(program, Effect.runPromise);',
      'import { Effect } from "effect";\nimport { flow } from "effect/Function";\nflow(Effect.runPromise)(program);',
      'import { Effect } from "effect";\nEffect.runPromise.call(undefined, program);',
      'import { Effect } from "effect";\nEffect["runSync"].apply(undefined, [program]);',
      'import { Effect } from "effect";\nEffect.runPromiseWith(context);',
      'import { Effect, pipe } from "effect";\npipe(Effect.runPromise);',
      'import { Effect } from "effect";\nconst [execute] = [Effect.runPromise];\nexecute(program);',
      'import { Effect } from "effect";\nlet execute;\nexecute = Effect.runPromise;\nexecute(program);',
    ];

    for (const source of sources) {
      expectRunnerViolation(source);
    }
  });

  it("preserves lexical shadowing and unrelated Effect APIs", () => {
    const sources = [
      'import { Effect } from "effect";\ncallbacks.forEach((Effect) => Effect.runPromise(program));',
      'import { Effect as Fx } from "effect";\ncallbacks.forEach((Fx) => Fx.runSync(program));',
      'import { dual } from "effect/Function";\ndual(2, operation);',
      'const { Effect: TestEffect } = await import("effect");\nTestEffect.succeed(1);',
      'import { type Effect } from "effect";\ntype Program = Effect.Effect<void>;',
      'import { type runPromise } from "effect/Effect";\ntype Runner = typeof runPromise;',
    ];

    for (const source of sources) {
      expect(effectTestViolations(FILE, source)).toEqual([]);
    }
  });

  it("resolves runner references from dynamic Effect imports", () => {
    const sources = [
      'const { Effect } = await import("effect");\nEffect.runPromise(program);',
      'const Runtime = await import("effect", { with: {} });\nRuntime.Effect.runSync(program);',
      'const { runPromise: execute } = await import("effect/Effect");\nexecute(program);',
      'import("effect").then(({ Effect }) => Effect.runPromise(program));',
      'import("effect").then((Runtime) => Runtime.Effect.runSync(program));',
      'const runtime = import("effect/Effect");\nruntime.then(({ runFork }) => runFork(program));',
    ];

    for (const source of sources) {
      expectRunnerViolation(source);
    }
  });

  it("preserves dynamic import shadowing and dynamic specifiers", () => {
    const sources = [
      'const { Effect } = await import("effect");\ncallbacks.forEach((Effect) => Effect.runPromise(program));',
      'import("effect").then(({ Effect }) => callbacks.forEach((Effect) => Effect.runPromise(program)));',
      "const Runtime = await import(moduleName);\nRuntime.Effect.runPromise(program);",
    ];

    for (const source of sources) {
      expect(effectTestViolations(FILE, source)).toEqual([]);
    }
  });
});
