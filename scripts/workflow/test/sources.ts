import { NodeServices } from "@effect/platform-node";
import type { Vitest } from "@effect/vitest";
import { Context, Effect, Layer } from "effect";
import { readSource } from "#scripts/source";
import type { WorkflowSources } from "#scripts/workflow/check";
import { repositoryTestTargets } from "#scripts/workflow/target";

/** The checked-in workflow texts and repository test targets that policy tests read. */
export class WorkflowSourceSet extends Context.Service<
  WorkflowSourceSet,
  WorkflowSources
>()("WorkflowSourceSet") {}

const readWorkflowSources = Effect.gen(function* () {
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
});

/** Reads the workflow sources once for the test file whose policy tests share them. */
export const workflowSourcesLayer = Layer.effect(
  WorkflowSourceSet,
  readWorkflowSources
).pipe(Layer.provide(NodeServices.layer));

/** Declares one policy test on a layered test API that reads the shared workflow sources. */
export function sourceTestsOf(it: Vitest.MethodsNonLive<WorkflowSourceSet>) {
  return (name: string, check: (sources: WorkflowSources) => void) =>
    it.effect(name, () => WorkflowSourceSet.pipe(Effect.map(check)));
}
