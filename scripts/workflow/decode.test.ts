import { assert, describe, expect, it } from "@effect/vitest";
import { decodeWorkflow, jobSource } from "#scripts/workflow/decode";

describe("workflow job source", () => {
  it("keeps a declared empty value as an empty line of the job text", () => {
    const { jobs } = decodeWorkflow(`permissions: {}
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
  });
});
