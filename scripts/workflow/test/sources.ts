import { NodeServices } from "@effect/platform-node";
import { Effect } from "effect";
import { readSource } from "#scripts/source";
import type { WorkflowSources } from "#scripts/workflow/check";
import { repositoryTestTargets } from "#scripts/workflow/target";

/** The checked-in workflow texts and test targets that the policy tests read once per test file. */
export const workflowSources: Promise<WorkflowSources> = Effect.runPromise(
  Effect.gen(function* () {
    const ci = yield* readSource(".github/workflows/ci.yml");
    const cli = yield* readSource(".github/workflows/cli.yml");
    const contracts = yield* readSource(".github/workflows/contracts.yml");
    const release = yield* readSource(".github/workflows/release.yml");
    const testTargets = yield* repositoryTestTargets();
    return {
      all: [ci, cli, contracts, release],
      ci,
      cli,
      contracts,
      release,
      testTargets,
    };
  }).pipe(Effect.provide(NodeServices.layer))
);
