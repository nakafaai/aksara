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
    "5209d8ab9e2fa3a1d24f8eccae20d5c695e4576147e4fcbefd1e1725ffa9b0d9",
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
            "5209d8ab9e2fa3a1d24f8eccae20d5c695e4576147e4fcbefd1e1725ffa9b0d8",
        })
      ).toThrow("npm publication must match the exact trusted job");
    }).pipe(Effect.provide(NodeServices.layer))
  );
});
