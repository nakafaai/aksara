import { NodeServices } from "@effect/platform-node";
import { Effect } from "effect";
import { readSource } from "#scripts/workflow/source";

/** The checked-in workflow texts that the policy tests read once per test file. */
export const workflowSources = Effect.runPromise(
  Effect.gen(function* () {
    const ci = yield* readSource(".github/workflows/ci.yml");
    const cli = yield* readSource(".github/workflows/cli.yml");
    const contracts = yield* readSource(".github/workflows/contracts.yml");
    const release = yield* readSource(".github/workflows/release.yml");
    return { ci, cli, contracts, release };
  }).pipe(Effect.provide(NodeServices.layer))
);
