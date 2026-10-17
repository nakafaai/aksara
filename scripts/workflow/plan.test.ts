import { describe, expect, it, layer } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import {
  ACCEPTED_DISPATCHES,
  intendedPlan,
  mainRun,
  workflowPlan,
} from "#scripts/workflow/plan";
import { WorkflowError } from "#scripts/workflow/requirement";
import {
  sourceEffectTestsOf,
  workflowSourcesLayer,
} from "#scripts/workflow/test/sources";

const PRODUCTION = ["production"];
const DEVELOPMENT = ["development"];
const BOTH = ["development", "production"];

/** What the release decision says each accepted dispatch starts, one row per dispatch. */
const DECIDED = [
  {
    legs: PRODUCTION,
    operation: "release",
    pairedAcceptance: false,
    parity: false,
    target: "production",
  },
  {
    legs: DEVELOPMENT,
    operation: "release",
    pairedAcceptance: false,
    parity: false,
    target: "development",
  },
  {
    legs: BOTH,
    operation: "release",
    pairedAcceptance: false,
    parity: true,
    target: "both",
  },
  {
    legs: PRODUCTION,
    operation: "accept",
    pairedAcceptance: false,
    parity: false,
    target: "production",
  },
  {
    legs: DEVELOPMENT,
    operation: "accept",
    pairedAcceptance: false,
    parity: false,
    target: "development",
  },
  {
    legs: BOTH,
    operation: "accept",
    pairedAcceptance: true,
    parity: true,
    target: "both",
  },
  ...Arr.flatMap(["recover", "abort", "cleanup"], (operation) => [
    {
      legs: PRODUCTION,
      operation,
      pairedAcceptance: false,
      parity: false,
      target: "production",
    },
    {
      legs: DEVELOPMENT,
      operation,
      pairedAcceptance: false,
      parity: false,
      target: "development",
    },
  ]),
];

describe("decided plan", () => {
  it("covers exactly the dispatches that the target guard lets through", () => {
    expect(
      Arr.map(DECIDED, ({ operation, target }) => ({ operation, target }))
    ).toEqual(ACCEPTED_DISPATCHES);
  });

  it.each(DECIDED)(
    "starts $legs for $operation on $target",
    ({ legs, operation, pairedAcceptance, parity, target }) => {
      expect(intendedPlan({ operation, target })).toEqual({
        legs,
        pairedAcceptance,
        parity,
      });
    }
  );
});

layer(workflowSourcesLayer)("workflow plan", (layered) => {
  const test = sourceEffectTestsOf(layered);

  for (const dispatch of ACCEPTED_DISPATCHES) {
    test(`starts what was decided for ${dispatch.operation} on ${dispatch.target}`, ({
      release,
    }) =>
      Effect.gen(function* () {
        expect(yield* workflowPlan(release, mainRun(dispatch))).toEqual(
          intendedPlan(dispatch)
        );
      }));
  }

  test("plans the legs from the matrix expression it is given", ({ release }) =>
    Effect.gen(function* () {
      const source = release.replace(
        '\'["development","production"]\'',
        "'[\"production\"]'"
      );
      expect(source).not.toEqual(release);
      expect(
        (yield* workflowPlan(
          source,
          mainRun({ operation: "release", target: "both" })
        )).legs
      ).toEqual(PRODUCTION);
    }));

  test("plans the final parity from the job condition it is given", ({
    release,
  }) =>
    Effect.gen(function* () {
      const source = release.replace("      && inputs.target == 'both'\n", "");
      expect(source).not.toEqual(release);
      expect(
        (yield* workflowPlan(
          source,
          mainRun({ operation: "release", target: "production" })
        )).parity
      ).toBe(true);
    }));

  test("plans the paired acceptance from the step condition it is given", ({
    release,
  }) =>
    Effect.gen(function* () {
      const source = release.replace(
        "if: inputs.operation == 'accept' && inputs.target == 'both'",
        "if: inputs.operation == 'accept'"
      );
      expect(source).not.toEqual(release);
      expect(
        (yield* workflowPlan(
          source,
          mainRun({ operation: "accept", target: "production" })
        )).pairedAcceptance
      ).toBe(true);
    }));

  test("keeps the final parity from running after a failed publication", ({
    release,
  }) =>
    Effect.gen(function* () {
      const run = mainRun({ operation: "release", target: "both" });
      expect((yield* workflowPlan(release, run)).parity).toBe(true);
      expect(
        (yield* workflowPlan(release, { ...run, operateResult: "failure" }))
          .parity
      ).toBe(false);
    }));

  test("refuses a workflow without the parts that decide the plan", () =>
    Effect.gen(function* () {
      const refusal = yield* workflowPlan(
        "permissions: {}\njobs: {}\n",
        mainRun({ operation: "release", target: "both" })
      ).pipe(Effect.flip);

      expect(refusal).toBeInstanceOf(WorkflowError);
      expect(refusal.message).toContain(
        "must declare the matrix, the paired acceptance, and the parity"
      );
    }));

  test("refuses a workflow whose paired acceptance is missing", ({ release }) =>
    Effect.gen(function* () {
      const source = release.replace(
        "- name: Verify paired acceptance",
        "- name: Compare targets"
      );
      expect(source).not.toEqual(release);
      const refusal = yield* workflowPlan(
        source,
        mainRun({ operation: "accept", target: "both" })
      ).pipe(Effect.flip);

      expect(refusal).toBeInstanceOf(WorkflowError);
      expect(refusal.message).toContain(
        "Verify paired acceptance must declare when it runs"
      );
    }));

  test("refuses a workflow whose paired acceptance has no condition", ({
    release,
  }) =>
    Effect.gen(function* () {
      const source = release.replace(
        "        if: inputs.operation == 'accept' && inputs.target == 'both'\n",
        ""
      );
      expect(source).not.toEqual(release);
      const refusal = yield* workflowPlan(
        source,
        mainRun({ operation: "accept", target: "both" })
      ).pipe(Effect.flip);

      expect(refusal).toBeInstanceOf(WorkflowError);
      expect(refusal.message).toContain(
        "Verify paired acceptance must declare when it runs"
      );
    }));

  test("refuses a matrix that does not evaluate to a list of targets", ({
    release,
  }) =>
    Effect.gen(function* () {
      const source = release.replace("fromJSON(", "format(");
      expect(source).not.toEqual(release);
      const refusal = yield* workflowPlan(
        source,
        mainRun({ operation: "release", target: "both" })
      ).pipe(Effect.flip);

      expect(refusal).toBeInstanceOf(WorkflowError);
      expect(refusal.message).toContain(
        "The matrix must evaluate to a list of targets"
      );
    }));

  test("refuses a matrix expression that the expression parser cannot read", ({
    release,
  }) =>
    Effect.gen(function* () {
      const source = release.replace("fromJSON(", "fromJSON((");
      expect(source).not.toEqual(release);
      const refusal = yield* workflowPlan(
        source,
        mainRun({ operation: "release", target: "both" })
      ).pipe(Effect.flip);

      expect(refusal).toBeInstanceOf(WorkflowError);
    }));
});
