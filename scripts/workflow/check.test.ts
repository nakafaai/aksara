import { readFileSync } from "node:fs";
import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import {
  verifyRepositoryWorkflows,
  verifyWorkflows,
  type WorkflowSources,
} from "#scripts/workflow/check";
import { repositoryTestTargets } from "#scripts/workflow/target";
import { TOOLCHAIN_SETUP_ACTION } from "#scripts/workflow/toolchain";

const OPERATION_HISTORY_INPUT =
  /(^ {2}operate:\n[\s\S]*?^ {6}- name: Checkout\n^ {8}uses: actions\/checkout@[^\n]+\n^ {8}with:\n(?:^ {10}[^\n]+\n)*?)^ {10}fetch-depth: 0$/mu;
const OPERATION_SETUP_INPUT =
  /(^ {2}operate:\n[\s\S]*?^ {6}- name: Setup toolchain\n[\s\S]*?^ {10}install: false)$/mu;

/** Reads the workflow sources and test targets that repository policy checks. */
const currentSources = Effect.fn("WorkflowPolicyTest.currentSources")(
  function* () {
    const ci = readFileSync(".github/workflows/ci.yml", "utf8");
    const cli = readFileSync(".github/workflows/cli.yml", "utf8");
    const contracts = readFileSync(".github/workflows/contracts.yml", "utf8");
    const release = readFileSync(".github/workflows/release.yml", "utf8");
    const testTargets = yield* repositoryTestTargets();
    return {
      all: [ci, cli, contracts, release],
      ci,
      cli,
      contracts,
      release,
      testTargets,
    };
  }
);

/** Declares one policy test whose body receives the repository's workflow sources. */
function policyTest(check: (sources: WorkflowSources) => void, name: string) {
  return it.effect(name, () =>
    currentSources().pipe(Effect.map(check), Effect.provide(NodeServices.layer))
  );
}

describe("workflow policy", () => {
  it.effect("verifies the tracked repository workflows", () =>
    verifyRepositoryWorkflows().pipe(Effect.provide(NodeServices.layer))
  );
  policyTest((sources) => {
    expect(() => verifyWorkflows(sources)).not.toThrow();
  }, "accepts immutable archives and the direct content release path");
  policyTest((sources) => {
    const unconfigured = "jobs:\n  verify:\n    steps:\n      - run: pnpm test";
    expect(() =>
      verifyWorkflows({ ...sources, all: [...sources.all, unconfigured] })
    ).toThrow("Every pnpm job must set up the toolchain once");
  }, "verifies every tracked workflow source");
  policyTest((sources) => {
    const release = sources.release.replaceAll(
      TOOLCHAIN_SETUP_ACTION,
      "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1"
    );
    expect(() => verifyWorkflows({ ...sources, release })).toThrow(
      "Every pnpm job must set up the toolchain once"
    );
  }, "always verifies each named release workflow");
  policyTest((sources) => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        contracts: `${sources.contracts}\n# pnpm publish`,
      })
    ).toThrow(
      "Workflows must not retain registry or Changesets publication machinery"
    );
    for (const prefix of ["http://", "//", ""]) {
      const contracts = `${sources.contracts}\n# ${prefix}registry.npmjs.org/-/unexpected`;
      expect(() => verifyWorkflows({ ...sources, contracts })).toThrow(
        "Registry reads must use only the exact npm attestation endpoint"
      );
    }
  }, "rejects registry publication machinery");
  policyTest((sources) => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        ci: sources.ci.replace(
          "release/command.ts describe",
          "release/command.ts inspect"
        ),
      })
    ).toThrow("CI must derive release necessity from the tested identity tool");
  }, "requires CI to use the tested archive identity decision");
  policyTest((sources) => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        ci: sources.ci.replace(".immutable == true", ".immutable == false"),
      })
    ).toThrow("CI must derive release necessity from the tested identity tool");
  }, "derives previous bytes only from final immutable releases");
  policyTest((sources) => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        ci: `${sources.ci}\n# IFS=. read -r current_major`,
      })
    ).toThrow("CI must not parse contract versions in shell");
  }, "rejects shell contract version parsing");
  policyTest((sources) => {
    const contracts = sources.contracts
      .replace("- name: Upload verified package", "- name: Later transfer")
      .replace(
        "- name: Attest verified archive",
        "- name: Upload verified package"
      )
      .replace("- name: Later transfer", "- name: Attest verified archive");

    expect(() => verifyWorkflows({ ...sources, contracts })).toThrow(
      "Contract archives must be attested before crossing into the publish job"
    );
  }, "attests the verified archive before privileged transfer");
  policyTest((sources) => {
    const contracts = sources.contracts.replaceAll(
      '--source-digest "$GITHUB_SHA"',
      '--source-digest "unknown"'
    );
    expect(() => verifyWorkflows({ ...sources, contracts })).toThrow(
      "Contract attestation must bind workflow, source revision, and main"
    );
  }, "binds GitHub attestation to one exact source");
  policyTest((sources) => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        contracts: sources.contracts.replace(
          ".isImmutable == false and .targetCommitish == $sha",
          ".isImmutable == true and .targetCommitish == $sha"
        ),
      })
    ).toThrow(
      "Failed publication must remove only its same-SHA mutable release"
    );
  }, "removes only the failed same-SHA mutable release");
  policyTest((sources) => {
    const cases = [
      [
        '          if [[ -n "$tag" ]]; then\n            gh api --method DELETE',
        "          if true; then\n            gh api --method DELETE",
        "Failed publication must remove only its same-SHA mutable release",
      ],
      [
        '            if [[ -n "$tag" ]]; then\n              gh api --method DELETE',
        "            if true; then\n              gh api --method DELETE",
        "Contract reruns may recover only their same-SHA mutable release",
      ],
    ] as const;
    for (const [guard, replacement, message] of cases) {
      const contracts = sources.contracts.replaceAll(guard, replacement);
      expect(() => verifyWorkflows({ ...sources, contracts })).toThrow(message);
    }
  }, "removes mutable releases without requiring a draft tag");
  policyTest((sources) => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        contracts: `${sources.contracts}
          gh api "repos/$GITHUB_REPOSITORY/immutable-releases"`,
      })
    ).toThrow(
      "Contract workflows cannot query repository settings with GITHUB_TOKEN"
    );
  }, "rejects an impossible repository-setting preflight");
  policyTest((sources) => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        contracts: sources.contracts.replace(
          "  workflow_dispatch:",
          '    paths: ["packages/contracts/**"]\n  workflow_dispatch:'
        ),
      })
    ).toThrow("Contract release triggers must not guess archive input paths");
  }, "requires archive comparison instead of trigger path guesses");
  policyTest((sources) => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        contracts: sources.contracts.replace(
          "      - name: Verify repository\n        if: steps.decision.outputs.mode == 'create'",
          "      - name: Verify repository"
        ),
      })
    ).toThrow("Unchanged contract archives must skip full release gates");
  }, "skips full release gates when archive bytes are unchanged");
  policyTest((sources) => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        contracts: sources.contracts.replace(
          "      attestations: read",
          "      statuses: read"
        ),
      })
    ).toThrow("Contract publication must verify archive attestations");
  }, "requires the publish job to read archive attestations");
  policyTest((sources) => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        contracts: sources.contracts.replace(
          "tag exists without a GitHub Release",
          "tag can be reused"
        ),
      })
    ).toThrow(
      "Contract reruns may recover only their same-SHA mutable release"
    );
  }, "requires exact immutable release rerun handling");
  policyTest((sources) => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        contracts: sources.contracts.replace(
          ".isDraft == true or .isImmutable == false",
          ".isDraft == true"
        ),
      })
    ).toThrow(
      "Contract reruns may recover only their same-SHA mutable release"
    );
  }, "allows only same-SHA mutable release recovery");
  policyTest((sources) => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        ci: sources.ci.replace(
          "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1",
          "actions/checkout@main"
        ),
      })
    ).toThrow("Workflow action actions/checkout@main must use an exact commit");
  }, "requires exact action commits");
  policyTest((sources) => {
    const contract = sources.release.replace(
      "          fetch-depth: 0",
      "          fetch-depth: 1"
    );
    const operation = sources.release
      .replace(OPERATION_HISTORY_INPUT, "$1          fetch-depth: 1")
      .replace(
        OPERATION_SETUP_INPUT,
        "$1\n          fetch-depth: 0 # unrelated input"
      );
    expect(() => verifyWorkflows({ ...sources, release: contract })).toThrow(
      "Every content operation must depend on the exact immutable contract proof"
    );
    expect(() => verifyWorkflows({ ...sources, release: operation })).toThrow(
      "Production content operations must preserve complete Git history"
    );
  }, "requires complete history for content operations");
  policyTest((sources) => {
    const release = sources.release
      .replace("environment: content-production", "environment: moved")
      .replace(
        "    steps:\n      - name: Checkout",
        "    environment: content-production\n    steps:\n      - name: Checkout"
      );
    expect(() => verifyWorkflows({ ...sources, release })).toThrow(
      "Contract proof must finish before production credentials are approved"
    );
  }, "keeps contract proof outside the production environment");
  policyTest((sources) => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        release: sources.release.replace(
          'git worktree add --detach "$OPERATION_ROOT" "$GITHUB_SHA"',
          "git worktree add main"
        ),
      })
    ).toThrow(
      "Content operations must run from one clean exact-revision checkout"
    );
  }, "requires production operations to use an exact isolated checkout");
  policyTest((sources) => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        release: sources.release.replace(
          'scope_args+=(--scope "$selector")',
          'scope_args+=("$selector")'
        ),
      })
    ).toThrow(
      "Content releases must validate and pass one explicit scalable scope"
    );
  }, "requires release workflows to pass a validated scalable scope");
});
