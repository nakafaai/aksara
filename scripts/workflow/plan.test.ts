import { describe, expect, it, layer } from "@effect/vitest";
import { Array as Arr } from "effect";
import {
  ACCEPTED_DISPATCHES,
  intendedPlan,
  mainRun,
  workflowPlan,
} from "#scripts/workflow/plan";
import {
  sourceTestsOf,
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
  const test = sourceTestsOf(layered);

  for (const dispatch of ACCEPTED_DISPATCHES) {
    test(`starts what was decided for ${dispatch.operation} on ${dispatch.target}`, ({
      release,
    }) => {
      expect(workflowPlan(release, mainRun(dispatch))).toEqual(
        intendedPlan(dispatch)
      );
    });
  }

  test("plans the legs from the matrix expression it is given", ({
    release,
  }) => {
    const source = release.replace(
      '\'["development","production"]\'',
      "'[\"production\"]'"
    );
    expect(source).not.toEqual(release);
    expect(
      workflowPlan(source, mainRun({ operation: "release", target: "both" }))
        .legs
    ).toEqual(PRODUCTION);
  });

  test("plans the final parity from the job condition it is given", ({
    release,
  }) => {
    const source = release.replace("      && inputs.target == 'both'\n", "");
    expect(source).not.toEqual(release);
    expect(
      workflowPlan(
        source,
        mainRun({ operation: "release", target: "production" })
      ).parity
    ).toBe(true);
  });

  test("plans the paired acceptance from the step condition it is given", ({
    release,
  }) => {
    const source = release.replace(
      "if: inputs.operation == 'accept' && inputs.target == 'both'",
      "if: inputs.operation == 'accept'"
    );
    expect(source).not.toEqual(release);
    expect(
      workflowPlan(
        source,
        mainRun({ operation: "accept", target: "production" })
      ).pairedAcceptance
    ).toBe(true);
  });

  test("keeps the final parity from running after a failed publication", ({
    release,
  }) => {
    const run = mainRun({ operation: "release", target: "both" });
    expect(workflowPlan(release, run).parity).toBe(true);
    expect(
      workflowPlan(release, { ...run, operateResult: "failure" }).parity
    ).toBe(false);
  });

  test("refuses a workflow without the parts that decide the plan", () => {
    expect(() =>
      workflowPlan(
        "permissions: {}\njobs: {}\n",
        mainRun({ operation: "release", target: "both" })
      )
    ).toThrow("must declare the matrix, the paired acceptance, and the parity");
  });

  test("refuses a workflow whose paired acceptance is missing", ({
    release,
  }) => {
    const source = release.replace(
      "- name: Verify paired acceptance",
      "- name: Compare targets"
    );
    expect(source).not.toEqual(release);
    expect(() =>
      workflowPlan(source, mainRun({ operation: "accept", target: "both" }))
    ).toThrow("Verify paired acceptance must declare when it runs");
  });

  test("refuses a workflow whose paired acceptance has no condition", ({
    release,
  }) => {
    const source = release.replace(
      "        if: inputs.operation == 'accept' && inputs.target == 'both'\n",
      ""
    );
    expect(source).not.toEqual(release);
    expect(() =>
      workflowPlan(source, mainRun({ operation: "accept", target: "both" }))
    ).toThrow("Verify paired acceptance must declare when it runs");
  });

  test("refuses a matrix that does not evaluate to a list of targets", ({
    release,
  }) => {
    const source = release.replace("fromJSON(", "format(");
    expect(source).not.toEqual(release);
    expect(() =>
      workflowPlan(source, mainRun({ operation: "release", target: "both" }))
    ).toThrow("The matrix must evaluate to a list of targets");
  });
});
