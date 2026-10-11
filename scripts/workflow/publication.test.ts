import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import { readSource } from "#scripts/source";
import { verifyPublicationWorkflow } from "#scripts/workflow/publication";
import {
  sourceTestsOf,
  workflowSourcesLayer,
} from "#scripts/workflow/test/sources";
import { operateStepProgram, runProgram } from "#scripts/workflow/test/step";

const UNSAFE_PUBLICATION_CHANGES: ReadonlyArray<
  readonly [string, string, string]
> = [
  [
    "Verify paired acceptance",
    "Skip paired acceptance",
    "Acceptance must prove authenticated complete-result parity",
  ],
  [
    "Verify paired result",
    "Skip paired result",
    "Paired release and acceptance must finish",
  ],
  [
    "vars.AKSARA_DEV_PUBLICATION_ENDPOINT",
    "vars.AKSARA_PUBLICATION_ENDPOINT",
    "Parity must authenticate both exact target credentials",
  ],

  [
    "group: content-publication",
    "group: isolated-target",
    "Paired operations must serialize",
  ],
  [
    "cancel-in-progress: false",
    "cancel-in-progress: true",
    "Paired operations must serialize",
  ],
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
    "fail-fast: false",
    "fail-fast: true",
    "One target failure must not interrupt its peer",
  ],
  [
    '["development","production"]',
    '["production"]',
    "Publication matrix must plan both legs for both targets",
  ],
  [
    "format('[\"{0}\"]', inputs.target)",
    "'[\"production\"]'",
    "Publication matrix must plan both legs for both targets and one leg for each single target",
  ],
  ["needs.verify.result == 'success'", "true", "Shared validation must finish"],
  [
    "- name: Validate target",
    "- name: Check target",
    "The target must be validated before any checkout or credential use",
  ],
  [
    "TARGET:",
    "FIXED_TARGET:",
    "Target validation must read the dispatched operation and target",
  ],
  [
    "if: inputs.operation == 'accept' && inputs.target == 'both'",
    "if: inputs.operation == 'accept'",
    "Paired acceptance must run only when both targets are published",
  ],
  [
    "      && inputs.target == 'both'\n",
    "",
    "Final parity must run only when both targets are published",
  ],
  [
    "vars[matrix.target == 'development' && 'AKSARA_DEV_PUBLICATION_ENDPOINT' || 'AKSARA_PUBLICATION_ENDPOINT']",
    "vars.AKSARA_DEV_PUBLICATION_ENDPOINT || vars.AKSARA_PUBLICATION_ENDPOINT",
    "Each operation must select credential keys",
  ],
  [
    "secrets[matrix.target == 'development' && 'AKSARA_DEV_PUBLICATION_TOKEN' || 'AKSARA_PUBLICATION_TOKEN']",
    "secrets.AKSARA_PUBLICATION_TOKEN",
    "Each operation must select credential keys",
  ],
  [
    `\${{ matrix.target == 'development' && 'none' || 'deployed' }}`,
    "deployed",
    "Release and recovery must invalidate only their deployed cache surface",
  ],
];

layer(workflowSourcesLayer)("publication target policy", (layered) => {
  const it = sourceTestsOf(layered);

  it("accepts the protected release with production by default and target-specific parity", ({
    release,
  }) => {
    expect(() => verifyPublicationWorkflow(release, [release])).not.toThrow();
  });

  it("rejects a second workflow that can independently publish content", ({
    release,
  }) => {
    expect(() =>
      verifyPublicationWorkflow(release, [
        release,
        "run: pnpm release -- --release-id drift",
      ])
    ).toThrow("Only one workflow may own content publication");
  });

  it("requires the target input to offer production first", ({ release }) => {
    const source = release.replace(
      "- production\n          - development",
      "- development\n          - production"
    );
    expect(source).not.toEqual(release);
    expect(() => verifyPublicationWorkflow(source, [source])).toThrow(
      "in that order"
    );
  });

  for (const [before, after, error] of UNSAFE_PUBLICATION_CHANGES) {
    it(`rejects unsafe publication change to ${before.trim()}`, ({
      release,
    }) => {
      const source = release.replaceAll(before, after);
      expect(source).not.toEqual(release);
      expect(() => verifyPublicationWorkflow(source, [source])).toThrow(error);
    });
  }
});

const ANY_TARGET = ["production", "development", "both"];
const ONE_TARGET = ["production", "development"];
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

layer(NodeServices.layer)("publication target validation", (test) => {
  test.effect.each([
    ...combinations(["release", "accept"], ANY_TARGET),
    ...combinations(TERMINAL_OPERATIONS, ONE_TARGET),
  ])("accepts $operation on $target", ({ operation, target }) =>
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
