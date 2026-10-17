import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import { readSource } from "#scripts/source";
import { ACCEPTED_DISPATCHES } from "#scripts/workflow/plan";
import { verifyPublicationWorkflow } from "#scripts/workflow/publication";
import { expectRefusal } from "#scripts/workflow/test/failure";
import { mutateJob } from "#scripts/workflow/test/mutation";
import {
  sourceEffectTestsOf,
  workflowSourcesLayer,
} from "#scripts/workflow/test/sources";
import { operateStepProgram, runProgram } from "#scripts/workflow/test/step";

const UNSAFE_PUBLICATION_CHANGES: ReadonlyArray<
  readonly [string, string, string]
> = [
  [
    "- name: Prove immutable contract release",
    "- name: Prove contract release",
    "Contract proof must finish before production credentials are approved",
  ],
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
    "The release on both must start only the legs",
  ],
  [
    "format('[\"{0}\"]', inputs.target)",
    "'[\"production\"]'",
    "The release on development must start only the legs",
  ],
  ["needs.verify.result == 'success'", "true", "Shared validation must finish"],
  [
    "- name: Validate target",
    "- name: Check target",
    "Validate target must be step 1 of the publication job",
  ],
  [
    "- name: Validate operation",
    "- name: Check operation",
    "Validate operation must be step 2 of the publication job",
  ],
  [
    "TARGET:",
    "FIXED_TARGET:",
    "Validate target must read the dispatched target",
  ],
  [
    "if: inputs.operation == 'accept' && inputs.target == 'both'",
    "if: inputs.operation == 'accept'",
    "The accept on production must start only the legs",
  ],
  [
    "      && inputs.target == 'both'\n",
    "",
    "The release on production must start only the legs",
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

/** Conditions of the final parity job whose removal would let it run when it must not, with the refusal each must meet. */
const PARITY_GUARDS: ReadonlyArray<readonly [string, string]> = [
  [
    "needs.operate.result == 'success'",
    "The final parity must not run after a failed publication",
  ],
  ["github.ref == 'refs/heads/main'", "The final parity must not run off main"],
  [
    "github.repository == 'nakafaai/aksara'",
    "The final parity must not run outside the Aksara repository",
  ],
];

/** The steps that refuse a bad dispatch. */
const GUARD_STEPS = ["Validate target", "Validate operation"];

/** Step keys that would let a dispatch past a failed guard, with the refusal each must meet. */
const GUARD_BYPASSES: ReadonlyArray<readonly [string, string]> = [
  ["if: inputs.operation == 'release'", "must run unconditionally"],
  ["continue-on-error: true", "must stop the job when it fails"],
];

layer(workflowSourcesLayer)("publication target policy", (layered) => {
  const it = sourceEffectTestsOf(layered);

  it("accepts the protected release with production by default and target-specific parity", ({
    release,
  }) => verifyPublicationWorkflow(release, [release]));

  it("rejects a second workflow that can independently publish content", ({
    release,
  }) =>
    expectRefusal(
      verifyPublicationWorkflow(release, [
        release,
        "run: pnpm release -- --release-id drift",
      ]),
      "Only one workflow may own content publication"
    ));

  it("requires the target input to offer production first", ({ release }) =>
    Effect.gen(function* () {
      const source = release.replace(
        "- production\n          - development",
        "- development\n          - production"
      );
      expect(source).not.toEqual(release);
      yield* expectRefusal(
        verifyPublicationWorkflow(source, [source]),
        "in that order"
      );
    }));

  for (const [before, after, error] of UNSAFE_PUBLICATION_CHANGES) {
    it(`rejects unsafe publication change to ${before.trim()}`, ({ release }) =>
      Effect.gen(function* () {
        const source = release.replaceAll(before, after);
        expect(source).not.toEqual(release);
        yield* expectRefusal(
          verifyPublicationWorkflow(source, [source]),
          error
        );
      }));
  }

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
            verifyPublicationWorkflow(source, [source]),
            `${name} ${error}`
          );
        }));
    }
  }

  for (const [condition, error] of PARITY_GUARDS) {
    it(`rejects a final parity job without '${condition}'`, ({ release }) =>
      Effect.gen(function* () {
        const source = mutateJob(release, "parity", condition, "true");
        expect(source).not.toEqual(release);
        yield* expectRefusal(
          verifyPublicationWorkflow(source, [source]),
          error
        );
      }));
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
    yield* operateStepProgram(release, "Validate target"),
    {
      OPERATION: operation,
      TARGET: target,
    }
  );
});

layer(NodeServices.layer)("publication target validation", (test) => {
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
