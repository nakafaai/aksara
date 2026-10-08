import { readFileSync } from "node:fs";
import { describe, expect, it } from "@effect/vitest";
import {
  type NpmWorkflowContract,
  verifyNpmWorkflow,
} from "#scripts/workflow/npm";

const source = readFileSync(".github/workflows/cli.yml", "utf8");
const contract: NpmWorkflowContract = {
  packageArtifact: "cli-package",
  publishSha256:
    "5209d8ab9e2fa3a1d24f8eccae20d5c695e4576147e4fcbefd1e1725ffa9b0d9",
  repository: "nakafaai/aksara",
  verifierArtifact: "cli-verifier",
  workflowPath: ".github/workflows/cli.yml",
};

describe("npm trusted publication digest", () => {
  it("rejects a publish digest that differs by one character", () => {
    expect(() =>
      verifyNpmWorkflow(source, {
        ...contract,
        publishSha256:
          "5209d8ab9e2fa3a1d24f8eccae20d5c695e4576147e4fcbefd1e1725ffa9b0d8",
      })
    ).toThrow("npm publication must match the exact trusted job");
  });
});
