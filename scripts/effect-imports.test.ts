import { describe, expect, it } from "vitest";

import { effectTestViolations } from "#scripts/effect-tests";

const FILE = "program.test.ts";
const DIRECT_RUNNER_VIOLATION =
  "program.test.ts: execute Effects through @effect/vitest instead of Effect.run*.";

describe("Effect runtime import policy", () => {
  it("detects standalone Effect pipe execution", () => {
    const sources = [
      'import { Effect, pipe } from "effect";\npipe(program, Effect.runPromise);',
      'import { Effect, pipe as flow } from "effect";\nflow(program, Effect.runSync);',
      'import { Effect } from "effect";\nimport { pipe } from "effect/Function";\npipe(program, Effect.runPromise);',
      'import { Effect } from "effect";\nimport { pipe as flow } from "effect/Function";\nflow(program, Effect.runFork);',
      'import { Effect } from "effect";\nimport * as Fn from "effect/Function";\nFn.pipe(program, Effect.runPromiseExit);',
      'import { Effect, pipe } from "effect";\nconst flow = pipe;\nflow(program, Effect.runPromise);',
    ];

    for (const source of sources) {
      expect(effectTestViolations(FILE, source)).toEqual([
        DIRECT_RUNNER_VIOLATION,
      ]);
    }
  });

  it("preserves standalone pipe lexical shadowing", () => {
    const source = [
      'import { Effect, pipe } from "effect";',
      "callbacks.forEach((pipe) => pipe(program, Effect.runPromise));",
    ].join("\n");

    expect(effectTestViolations(FILE, source)).toEqual([]);
    expect(
      effectTestViolations(
        FILE,
        'import { dual } from "effect/Function";\ndual(2, operation);'
      )
    ).toEqual([]);
  });

  it("detects statically named dynamic Effect imports", () => {
    const sources = [
      'const { Effect } = await import("effect");\nEffect.runPromise(program);',
      "const Runtime = await import(`effect`);\nRuntime.Effect.runSync(program);",
      'const { runPromise: execute } = await import("effect/Effect");\nexecute(program);',
      'const Runtime = await import("effect/Effect");\nRuntime.runFork(program);',
      'const { Effect, pipe: flow } = await import("effect");\nflow(program, Effect.runPromise);',
      'const { pipe: flow } = await import("effect/Function");\nconst { Effect } = await import("effect");\nflow(program, Effect.runSync);',
    ];

    for (const source of sources) {
      expect(effectTestViolations(FILE, source)).toEqual([
        DIRECT_RUNNER_VIOLATION,
      ]);
    }
  });

  it("preserves dynamic import lexical shadowing", () => {
    const sources = [
      'const { Effect } = await import("effect");\ncallbacks.forEach((Effect) => Effect.runPromise(program));',
      'const { runPromise } = await import("effect/Effect");\ncallbacks.forEach((runPromise) => runPromise(program));',
      'const { [`runPromise`]: execute } = await import("effect/Effect");\ncallbacks.forEach((execute) => execute(program));',
      'const { Effect, pipe } = await import("effect");\ncallbacks.forEach((pipe) => pipe(program, Effect.runPromise));',
      "const Runtime = await import(moduleName);\nRuntime.Effect.runPromise(program);",
    ];

    for (const source of sources) {
      expect(effectTestViolations(FILE, source)).toEqual([]);
    }
  });
});
