import { assert, describe, expect, it } from "@effect/vitest";
import { decodeWorkflow, jobSource } from "#scripts/workflow/decode";

describe("workflow job source", () => {
  it("keeps a declared empty value as an empty line of the job text", () => {
    const { jobs } = decodeWorkflow(`permissions: {}
jobs:
  verify:
    steps:
      - uses: actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a
        with:
          name: contract-package
          retention-days:
`);
    const job = jobs.verify;
    assert.ok(job, "The verify job must decode");

    expect(jobSource(job)).toBe(
      "\nactions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a\nname\ncontract-package\nretention-days\n"
    );
  });
});
