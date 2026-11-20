import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { readSource } from "#scripts/source";
import type { NpmWorkflowContract } from "#scripts/workflow/npm";
import { verifyNpmWorkflow } from "#scripts/workflow/npm";
import { expectRefusal, workflowFailure } from "#scripts/workflow/test/failure";
import { mutateJob } from "#scripts/workflow/test/mutation";

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
      expect(
        yield* workflowFailure(
          verifyNpmWorkflow(source, {
            ...contract,
            publishSha256:
              "1457ab6a66705d5d83e88d3c047ed667846b4a7485a0538259514a2dee4aad53",
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

  it.effect("refuses a publish job that cannot be encoded as JSON text", () =>
    Effect.gen(function* () {
      const source = yield* readSource(".github/workflows/cli.yml");
      const cyclic = mutateJob(
        source,
        "publish",
        "        with:\n          name: cli-package\n",
        "        with: &cycle\n          name: cli-package\n          self: *cycle\n"
      );
      expect(cyclic).not.toEqual(source);

      expect(yield* workflowFailure(verifyNpmWorkflow(cyclic, contract))).toBe(
        "npm publication could not be hashed"
      );
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

describe("pinned pnpm publication", () => {
  it.effect("refuses another pnpm, an install, or a dropped assertion", () =>
    Effect.gen(function* () {
      const source = yield* readSource(".github/workflows/cli.yml");
      const cases = [
        [
          "publish",
          "          version: 12.21.0",
          "          version: 12.22.0",
          "npm publication must set up only the pinned pnpm 12.21.0",
        ],
        [
          "verify",
          "          install: false",
          "          install: true",
          "npm verification must set up only the pinned pnpm 12.21.0",
        ],
        [
          "publish",
          "          PINNED_PNPM: 12.21.0",
          "          PINNED_PNPM: 12.22.0",
          "npm publication must assert the pinned pnpm 12.21.0",
        ],
        [
          "verify",
          '"$pnpm_version" != "$PINNED_PNPM"',
          '"$pnpm_version" == "$PINNED_PNPM"',
          "npm verification must assert the pinned pnpm 12.21.0",
        ],
      ] as const;
      for (const [job, from, to, message] of cases) {
        yield* expectRefusal(
          verifyNpmWorkflow(mutateJob(source, job, from, to), contract),
          message
        );
      }
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect("refuses every publisher but one pinned pnpm publish", () =>
    Effect.gen(function* () {
      const source = yield* readSource(".github/workflows/cli.yml");
      const publish = '          pnpm publish "$TARBALL" \\';
      const foreign =
        "npm publication must publish only through the pinned pnpm CLI";
      const cases = [
        ['          bun publish "$TARBALL"', foreign],
        ['          npm publish "$TARBALL"', foreign],
        ['          npx --yes npm@12.0.2 publish "$TARBALL"', foreign],
        [
          '          pnpm publish "$TARBALL"',
          "npm publication may execute only one publish command",
        ],
      ] as const;
      for (const [command, message] of cases) {
        yield* expectRefusal(
          verifyNpmWorkflow(
            mutateJob(source, "publish", publish, `${command}\n${publish}`),
            contract
          ),
          message
        );
      }
    }).pipe(Effect.provide(NodeServices.layer))
  );

  it.effect("refuses npm and pnpm registry tokens", () =>
    Effect.gen(function* () {
      const source = yield* readSource(".github/workflows/cli.yml");
      for (const credential of [
        "NPM_TOKEN",
        "NODE_AUTH_TOKEN",
        "pnpm_config__auth",
        "PNPM_CONFIG__AUTH",
      ]) {
        yield* expectRefusal(
          verifyNpmWorkflow(`${source}\n# ${credential}: secret`, contract),
          "npm workflow must not contain registry credentials"
        );
      }
    }).pipe(Effect.provide(NodeServices.layer))
  );
});
