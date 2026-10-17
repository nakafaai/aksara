import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { readSource } from "#scripts/source";
import {
  type NpmWorkflowContract,
  verifyNpmWorkflow,
} from "#scripts/workflow/npm";
import { workflowFailure } from "#scripts/workflow/test/failure";

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
      expect(
        yield* workflowFailure(
          verifyNpmWorkflow(source, {
            ...contract,
            publishSha256:
              "5209d8ab9e2fa3a1d24f8eccae20d5c695e4576147e4fcbefd1e1725ffa9b0d8",
          })
        )
      ).toContain("npm publication must match the exact trusted job");
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect("reports a rejected publish digest as a typed workflow error", () =>
    Effect.gen(function* () {
      const source = yield* readSource(".github/workflows/cli.yml");
      const error = yield* verifyNpmWorkflow(source, {
        ...contract,
        publishSha256:
          "5209d8ab9e2fa3a1d24f8eccae20d5c695e4576147e4fcbefd1e1725ffa9b0d8",
      }).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "WorkflowError",
        message: "npm publication must match the exact trusted job",
      });
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect("refuses a workflow that lacks one of its three release jobs", () =>
    Effect.gen(function* () {
      const source = yield* readSource(".github/workflows/cli.yml");
      const error = yield* verifyNpmWorkflow(
        source.replace("\n  verify:", "\n  other:"),
        contract
      ).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "WorkflowError",
        message: "npm workflow requires three release jobs",
      });
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect(
    "reports a workflow that is not YAML as a typed workflow error",
    () =>
      Effect.gen(function* () {
        const error = yield* verifyNpmWorkflow("jobs: [", contract).pipe(
          Effect.flip
        );

        expect(error).toMatchObject({ _tag: "WorkflowError" });
      })
  );
});
