import { expect, layer } from "@effect/vitest";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Effect } from "effect";

import { effectTestViolations } from "#scripts/imports/effect";

const FILE = "packages/example/src/program.test.ts";
const RUNNER_VIOLATION =
  "packages/example/src/program.test.ts: use @effect/vitest instead of Effect runtime runners.";

/** Asserts the reserved runner diagnostic for one source fixture. */
const expectRunnerViolation = Effect.fn(
  "EffectPolicyTest.expectRunnerViolation"
)(function* (source: string) {
  expect(yield* effectTestViolations(FILE, source), source).toEqual([
    RUNNER_VIOLATION,
  ]);
});

layer(TypeScriptParser.layer)("Effect test policy", (it) => {
  it.effect("rejects the removed static and dynamic adapter imports", () =>
    Effect.gen(function* () {
      for (const source of [
        'import { it } from "@nakafa/testing/effect";',
        'await import("@nakafa/testing/effect");',
      ]) {
        expect(yield* effectTestViolations(FILE, source)).toEqual([
          `${FILE}: import Effect test APIs directly from @effect/vitest.`,
        ]);
      }
    })
  );

  it.effect("rejects reserved runner imports and member access", () =>
    Effect.gen(function* () {
      const sources = [
        'import { Effect } from "effect";\nEffect.runPromise(program);',
        'import { Effect } from "effect";\nEffect["runSync"](program);',
        'import { runPromise as execute } from "effect/Effect";\nexecute(program);',
        'import { runSync } from "effect/ManagedRuntime";\nrunSync(program);',
        'import { ManagedRuntime } from "effect";\nruntime.runPromise(program);',
        'const Runtime = await import("effect", { with: {} });\nRuntime.Effect.runPromise(program);',
      ];
      for (const source of sources) {
        yield* expectRunnerViolation(source);
      }
    })
  );

  it.effect("reserves runner names through aliases and destructuring", () =>
    Effect.gen(function* () {
      const sources = [
        'const consume = ({ Effect }: typeof import("effect")) => Effect.runPromise(program);\nimport("effect").then(consume);',
        'import { Effect } from "effect";\nconst holder = { Effect };\nholder.Effect.runPromise(program);',
        'import { Effect } from "effect";\nconst { runPromise } = Effect;',
        'import { Effect } from "effect";\nlet run;\n({ runSync: run } = Effect);',
        'import * as Runtime from "effect";\nlet run;\n({ Effect: { runFork: run } } = Runtime);',
      ];
      for (const source of sources) {
        yield* expectRunnerViolation(source);
      }
    })
  );

  it.effect("rejects unknown computed access on direct imported bindings", () =>
    Effect.gen(function* () {
      for (const source of [
        'import { Effect } from "effect";\nEffect[runner](program);',
        'import * as Runtime from "effect/Effect";\nRuntime[member];',
      ]) {
        yield* expectRunnerViolation(source);
      }
    })
  );

  it.effect("allows native tests, types, fixtures, and unrelated APIs", () =>
    Effect.gen(function* () {
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
        expect(yield* effectTestViolations(FILE, source)).toEqual([]);
      }
      expect(
        yield* effectTestViolations(
          "packages/example/src/program.ts",
          'import { Effect } from "effect";\nEffect.runSync(program);'
        )
      ).toEqual([]);
      expect(
        yield* effectTestViolations(
          "packages/contracts/scripts/consumer.test.ts",
          'expect(source).toContain("await Effect.runPromise(");'
        )
      ).toEqual([]);
    })
  );

  it.effect("covers the exact vendored Effect runner names", () =>
    Effect.gen(function* () {
      const runners =
        "runCallback runCallbackWith runFork runForkWith runPromise runPromiseExit runPromiseExitWith runPromiseWith runSync runSyncExit runSyncExitWith runSyncWith".split(
          " "
        );
      for (const runner of runners) {
        yield* expectRunnerViolation(
          `import { Effect } from "effect";\nEffect.${runner}(program);`
        );
      }
    })
  );

  it.effect("covers the exact vendored ManagedRuntime runner names", () =>
    Effect.gen(function* () {
      const runners =
        "runCallback runFork runPromise runPromiseExit runSync runSyncExit".split(
          " "
        );
      for (const runner of runners) {
        yield* expectRunnerViolation(
          `import { ManagedRuntime } from "effect";\nruntime.${runner}(program);`
        );
      }
    })
  );
});
