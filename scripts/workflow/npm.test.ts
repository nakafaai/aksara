import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { readSource } from "#scripts/source";
import {
  type NpmWorkflowContract,
  verifyNpmWorkflow,
} from "#scripts/workflow/npm";

const contract: NpmWorkflowContract = {
  packageArtifact: "cli-package",
  publishSha256:
    "1457ab6a66705d5d83e88d3c047ed667846b4a7485a0538259514a2dee4aad54",
  repository: "nakafaai/aksara",
  verifierArtifact: "cli-verifier",
  workflowPath: ".github/workflows/cli.yml",
};

describe("npm trusted publication digest", () => {
  it.effect("rejects a publish digest that differs by one character", () =>
    Effect.gen(function* () {
      const source = yield* readSource(".github/workflows/cli.yml");
      expect(() =>
        verifyNpmWorkflow(source, {
          ...contract,
          publishSha256:
            "1457ab6a66705d5d83e88d3c047ed667846b4a7485a0538259514a2dee4aad53",
        })
      ).toThrow("npm publication must match the exact trusted job");
    }).pipe(Effect.provide(NodeServices.layer))
  );
});
