import { assert, describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import { decodeWorkflow, jobSource } from "#scripts/workflow/decode";
import { WorkflowError } from "#scripts/workflow/requirement";

describe("workflow job source", () => {
  it.effect(
    "keeps a declared empty value as an empty line of the job text",
    () =>
      Effect.gen(function* () {
        const { jobs } = yield* decodeWorkflow(`permissions: {}
jobs:
  verify:
    steps:
      - uses: actions/upload-artifact@cf430e030ddbb5b0abf93d22962f4752f3646cd9
        with:
          name: contract-package
          retention-days:
`);
        const job = jobs.verify;
        assert.ok(job, "The verify job must decode");

        expect(jobSource(job)).toBe(
          "\nactions/upload-artifact@cf430e030ddbb5b0abf93d22962f4752f3646cd9\nname\ncontract-package\nretention-days\n"
        );
      })
  );

  it.effect(
    "refuses malformed YAML and an undecodable workflow with typed errors",
    () =>
      Effect.gen(function* () {
        const malformed = yield* decodeWorkflow("jobs: [\n").pipe(Effect.flip);
        const undecodable = yield* decodeWorkflow("permissions: {}\n").pipe(
          Effect.flip
        );

        expect(malformed).toBeInstanceOf(WorkflowError);
        expect(undecodable).toBeInstanceOf(WorkflowError);
        expect(undecodable.message).toBe(
          "Workflow must contain decodable jobs"
        );
      })
  );

  it.effect(
    "refuses YAML whose aliases exceed the parser limit with a typed error",
    () =>
      Effect.gen(function* () {
        const aliases = Arr.join(
          Arr.makeBy(150, () => "*base"),
          ", "
        );
        const refusal = yield* decodeWorkflow(
          `base: &base 1\njobs:\n  verify: [${aliases}]\n`
        ).pipe(Effect.flip);

        expect(refusal).toBeInstanceOf(WorkflowError);
        expect(refusal.message).toContain("Excessive alias count");
      })
  );
});
