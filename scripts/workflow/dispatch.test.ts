import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import { parseDocument } from "yaml";
import { readSource } from "#scripts/source";
import { verifyDispatch } from "#scripts/workflow/dispatch";
import { ACCEPTED_DISPATCHES } from "#scripts/workflow/plan";
import {
  sourceTestsOf,
  workflowSourcesLayer,
} from "#scripts/workflow/test/sources";
import { operateStepProgram, runProgram } from "#scripts/workflow/test/step";

const UNSAFE_DISPATCH_CHANGES: ReadonlyArray<
  readonly [string, string, string]
> = [
  [
    "default: production",
    "default: both",
    "The target input must offer exactly production, development, and both",
  ],
  [
    "- both",
    "- staging",
    "The target input must offer exactly production, development, and both",
  ],
  [
    "- development",
    "- development\n          - staging",
    "The target input must offer exactly production, development, and both",
  ],
  [
    "      revision:\n        description:",
    "      commit:\n        description:",
    "the revision input must be an optional string",
  ],
  [
    "        required: false\n        type: string\n      rebuild:",
    "        required: true\n        type: string\n      rebuild:",
    "the revision input must be an optional string",
  ],
  [
    "- name: Validate target",
    "- name: Check target",
    "Validate target must be step 1 of the publication job",
  ],
  [
    "- name: Validate revision",
    "- name: Check revision",
    "Validate revision must be step 2 of the publication job",
  ],
  [
    "- name: Validate operation",
    "- name: Check operation",
    "Validate operation must be step 3 of the publication job",
  ],
  [
    "TARGET:",
    "FIXED_TARGET:",
    "Validate target must read the dispatched target",
  ],
  [
    "REVISION:",
    "FIXED_REVISION:",
    "Validate revision must read the dispatched revision",
  ],
];

/** The steps that refuse a bad dispatch. */
const GUARD_STEPS = [
  "Validate target",
  "Validate revision",
  "Validate operation",
];

/** Step keys that would let a dispatch past a failed guard, with the refusal each must meet. */
const GUARD_BYPASSES: ReadonlyArray<readonly [string, string]> = [
  ["if: inputs.operation == 'release'", "must run unconditionally"],
  ["continue-on-error: true", "must stop the job when it fails"],
];

layer(workflowSourcesLayer)("dispatch policy", (layered) => {
  const it = sourceTestsOf(layered);

  it("accepts the dispatch of the protected release", ({ release }) => {
    expect(() => verifyDispatch(parseDocument(release))).not.toThrow();
  });

  it("requires the target input to offer production first", ({ release }) => {
    const source = release.replace(
      "- production\n          - development",
      "- development\n          - production"
    );
    expect(source).not.toEqual(release);
    expect(() => verifyDispatch(parseDocument(source))).toThrow(
      "in that order"
    );
  });

  for (const [before, after, error] of UNSAFE_DISPATCH_CHANGES) {
    it(`rejects unsafe dispatch change to ${before.trim()}`, ({ release }) => {
      const source = release.replaceAll(before, after);
      expect(source).not.toEqual(release);
      expect(() => verifyDispatch(parseDocument(source))).toThrow(error);
    });
  }

  for (const name of GUARD_STEPS) {
    for (const [bypass, error] of GUARD_BYPASSES) {
      it(`rejects '${bypass}' on ${name}`, ({ release }) => {
        const header = `      - name: ${name}\n`;
        const source = release.replace(header, `${header}        ${bypass}\n`);
        expect(source).not.toEqual(release);
        expect(() => verifyDispatch(parseDocument(source))).toThrow(
          `${name} ${error}`
        );
      });
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
  return yield* runProgram(operateStepProgram(release, "Validate target"), {
    OPERATION: operation,
    TARGET: target,
  });
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

const DISPATCHED_COMMIT = "0123456789abcdef0123456789abcdef01234567";
const OTHER_COMMIT = "89abcdef0123456789abcdef0123456789abcdef";
const NEAR_MISSES = [
  OTHER_COMMIT,
  DISPATCHED_COMMIT.slice(0, 7),
  DISPATCHED_COMMIT.toUpperCase(),
  `${DISPATCHED_COMMIT} `,
];

/** Every accepted dispatch except a development release, which must name its commit. */
const REVISION_OPTIONAL = Arr.filter(
  ACCEPTED_DISPATCHES,
  ({ operation, target }) =>
    !(operation === "release" && target === "development")
);

/** Runs the real revision validation step for a run dispatched from the test commit. */
const validateRevision = Effect.fn("WorkflowTest.validateRevision")(function* (
  operation: string,
  target: string,
  revision: string
) {
  const release = yield* readSource(".github/workflows/release.yml");
  return yield* runProgram(operateStepProgram(release, "Validate revision"), {
    GITHUB_SHA: DISPATCHED_COMMIT,
    OPERATION: operation,
    REVISION: revision,
    TARGET: target,
  });
});

layer(NodeServices.layer)("dispatch revision validation", (test) => {
  test.effect.each(ACCEPTED_DISPATCHES)(
    "accepts the dispatched commit for $operation on $target",
    ({ operation, target }) =>
      Effect.gen(function* () {
        const result = yield* validateRevision(
          operation,
          target,
          DISPATCHED_COMMIT
        );
        expect(result).toEqual({ exitCode: 0, stderr: "" });
      })
  );

  test.effect.each(REVISION_OPTIONAL)(
    "accepts no revision for $operation on $target",
    ({ operation, target }) =>
      Effect.gen(function* () {
        const result = yield* validateRevision(operation, target, "");
        expect(result).toEqual({ exitCode: 0, stderr: "" });
      })
  );

  test.effect("refuses a development release that names no revision", () =>
    Effect.gen(function* () {
      const result = yield* validateRevision("release", "development", "");
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toBe(
        "A development release must name the commit it publishes in the revision input.\n"
      );
    })
  );

  test.effect.each(ACCEPTED_DISPATCHES)(
    "refuses $operation on $target at another commit",
    ({ operation, target }) =>
      Effect.gen(function* () {
        const result = yield* validateRevision(operation, target, OTHER_COMMIT);
        expect(result.exitCode).toBe(1);
        expect(result.stderr).toBe(
          `The revision input must be the commit this run was dispatched from (${DISPATCHED_COMMIT}). Dispatch the run while main is at the commit to publish.\n`
        );
      })
  );

  test.effect.each(NEAR_MISSES)(
    "refuses the revision '%s' for a development release",
    (revision) =>
      Effect.gen(function* () {
        const result = yield* validateRevision(
          "release",
          "development",
          revision
        );
        expect(result.exitCode).toBe(1);
        expect(result.stderr).toContain(DISPATCHED_COMMIT);
      })
  );
});
