import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import { parseDocument } from "yaml";
import { readSource } from "#scripts/source";
import {
  verifyDispatchGuards,
  verifyTargetChoice,
} from "#scripts/workflow/dispatch";
import { ACCEPTED_DISPATCHES } from "#scripts/workflow/plan";
import { expectRefusal } from "#scripts/workflow/test/failure";
import {
  sourceEffectTestsOf,
  workflowSourcesLayer,
} from "#scripts/workflow/test/sources";
import { contractsStepProgram, runProgram } from "#scripts/workflow/test/step";

/** The steps that refuse a bad dispatch. */
const GUARD_STEPS = ["Validate target", "Validate operation"];

/** Step keys that would let a dispatch past a failed guard, with the refusal each must meet. */
const GUARD_BYPASSES: ReadonlyArray<readonly [string, string]> = [
  ["if: inputs.operation == 'release'", "must run unconditionally"],
  ["continue-on-error: true", "must stop the job when it fails"],
];

layer(workflowSourcesLayer)("dispatch guards", (layered) => {
  const it = sourceEffectTestsOf(layered);

  it("accepts the protected target choice and guard steps", ({ release }) =>
    Effect.gen(function* () {
      const document = parseDocument(release);
      yield* verifyTargetChoice(document);
      yield* verifyDispatchGuards(document);
    }));

  it("requires the target input to offer production first", ({ release }) =>
    Effect.gen(function* () {
      const source = release.replace(
        "- production\n          - development",
        "- development\n          - production"
      );
      expect(source).not.toEqual(release);
      yield* expectRefusal(
        verifyTargetChoice(parseDocument(source)),
        "in that order"
      );
    }));

  for (const name of GUARD_STEPS) {
    for (const [bypass, error] of GUARD_BYPASSES) {
      it(`rejects '${bypass}' on ${name}`, ({ release }) =>
        Effect.gen(function* () {
          const header = `      - name: ${name}\n`;
          const source = release.replace(
            header,
            `${header}        ${bypass}\n`
          );
          expect(source).not.toEqual(release);
          yield* expectRefusal(
            verifyDispatchGuards(parseDocument(source)),
            `${name} ${error}`
          );
        }));
    }
  }
});

const UNKNOWN_TARGETS = ["staging", "Production", "both,production", ""];
const TERMINAL_OPERATIONS = ["recover", "abort", "cleanup"];

/** Pairs every operation with every target. */
function combinations(
  operations: readonly string[],
  targets: readonly string[]
) {
  return Arr.flatMap(operations, (operation) =>
    Arr.map(targets, (target) => ({ operation, target }))
  );
}

/** Runs the real target validation step of the release workflow. */
const validateTarget = Effect.fn("WorkflowTest.validateTarget")(function* (
  operation: string,
  target: string
) {
  const release = yield* readSource(".github/workflows/release.yml");
  return yield* runProgram(
    yield* contractsStepProgram(release, "Validate target"),
    {
      OPERATION: operation,
      TARGET: target,
    }
  );
});

layer(NodeServices.layer)("dispatch target validation", (test) => {
  test.effect.each(ACCEPTED_DISPATCHES)(
    "accepts $operation on $target",
    ({ operation, target }) =>
      Effect.gen(function* () {
        const result = yield* validateTarget(operation, target);
        expect(result).toEqual({ exitCode: 0, stderr: "" });
      })
  );

  test.effect.each(TERMINAL_OPERATIONS)(
    "refuses to %s both targets at once",
    (operation) =>
      Effect.gen(function* () {
        const result = yield* validateTarget(operation, "both");
        expect(result.exitCode).toBe(1);
        expect(result.stderr).toBe(
          "Recovery, abort, and cleanup take one target, not both.\n"
        );
      })
  );

  test.effect.each(
    combinations(["release", "accept", ...TERMINAL_OPERATIONS], UNKNOWN_TARGETS)
  )(
    "refuses $operation on the unknown target '$target'",
    ({ operation, target }) =>
      Effect.gen(function* () {
        const result = yield* validateTarget(operation, target);
        expect(result.exitCode).toBe(1);
        expect(result.stderr).toBe("Unknown publication target.\n");
      })
  );
});

/** Runs the real operation validation step with one dispatch's inputs over safe defaults. */
const validateOperation = Effect.fn("WorkflowTest.validateOperation")(
  function* (dispatch: Readonly<Record<string, string>>) {
    const release = yield* readSource(".github/workflows/release.yml");
    return yield* runProgram(
      yield* contractsStepProgram(release, "Validate operation"),
      {
        OPERATION: "release",
        PUBLICATION_SCOPE: '["family:material"]',
        REBUILD: "false",
        RECOVERY_ID: "",
        RELEASE_ID: "release-next",
        TARGET: "production",
        ...dispatch,
      }
    );
  }
);

layer(NodeServices.layer)("dispatch operation validation", (test) => {
  test.effect.each([
    {
      dispatch: { RECOVERY_ID: "recovery-next" },
      exitCode: 0,
      name: "accepts a release over its retained inverse",
      stderr: "",
    },
    {
      dispatch: {},
      exitCode: 1,
      name: "refuses a release that names no retained inverse",
      stderr: "The operation must name its exact retained inverse.\n",
    },
    {
      dispatch: {
        OPERATION: "accept",
        PUBLICATION_SCOPE: "",
        RECOVERY_ID: "",
      },
      exitCode: 1,
      name: "refuses an accept without its retained inverse",
      stderr: "The operation must name its exact retained inverse.\n",
    },
    {
      dispatch: {
        OPERATION: "accept",
        PUBLICATION_SCOPE: "",
        RECOVERY_ID: "release-next",
      },
      exitCode: 1,
      name: "refuses an accept whose inverse is the release",
      stderr: "Active and recovery release identities must differ.\n",
    },
    {
      dispatch: {
        OPERATION: "abort",
        PUBLICATION_SCOPE: "",
        RECOVERY_ID: "recovery-next",
      },
      exitCode: 1,
      name: "refuses an abort with a retained inverse",
      stderr: "Abort and cleanup do not accept a recovery identity.\n",
    },
  ])("$name", ({ dispatch, exitCode, stderr }) =>
    Effect.gen(function* () {
      expect(yield* validateOperation(dispatch)).toEqual({ exitCode, stderr });
    })
  );
});
