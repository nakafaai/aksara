import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { verifyWorkflows, type WorkflowSources } from "#scripts/workflow/check";

const OPERATION_HISTORY_INPUT =
  /(^ {2}operate:\n[\s\S]*?^ {6}- name: Checkout\n^ {8}uses: actions\/checkout@[^\n]+\n^ {8}with:\n(?:^ {10}[^\n]+\n)*?)^ {10}fetch-depth: 0$/mu;
const OPERATION_SETUP_INPUT =
  /(^ {2}operate:\n[\s\S]*?^ {6}- name: Setup toolchain\n[\s\S]*?^ {10}install: false)$/mu;

/** Reads the exact workflow set exercised by repository policy. */
function currentSources(): WorkflowSources {
  const ci = readFileSync(".github/workflows/ci.yml", "utf8");
  const cli = readFileSync(".github/workflows/cli.yml", "utf8");
  const contracts = readFileSync(".github/workflows/contracts.yml", "utf8");
  const release = readFileSync(".github/workflows/release.yml", "utf8");
  return {
    all: [ci, cli, contracts, release],
    ci,
    cli,
    contracts,
    release,
  };
}

const sources = currentSources();

describe("workflow policy", () => {
  it("accepts immutable archives and the direct content release path", () => {
    expect(() => verifyWorkflows(sources)).not.toThrow();
  });

  it("verifies every tracked workflow source", () => {
    const unconfigured = "jobs:\n  verify:\n    steps:\n      - run: pnpm test";
    expect(() =>
      verifyWorkflows({ ...sources, all: [...sources.all, unconfigured] })
    ).toThrow("Every pnpm job must set up the toolchain once");
  });

  it("always verifies each named release workflow", () => {
    const release = sources.release.replaceAll(
      "pnpm/setup@84cb39b217b10273981911c288cd62326dc7c6d2",
      "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1"
    );
    expect(() => verifyWorkflows({ ...sources, release })).toThrow(
      "Every pnpm job must set up the toolchain once"
    );
  });

  it("rejects registry publication machinery", () => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        contracts: `${sources.contracts}\n# pnpm publish`,
      })
    ).toThrow(
      "Workflows must not retain registry or Changesets publication machinery"
    );
  });

  it("requires CI to use the tested archive identity decision", () => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        ci: sources.ci.replace(
          "release-command.ts describe",
          "release-command.ts inspect"
        ),
      })
    ).toThrow("CI must derive release necessity from the tested identity tool");
  });

  it("derives previous bytes only from final immutable releases", () => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        ci: sources.ci.replace(".immutable == true", ".immutable == false"),
      })
    ).toThrow("CI must derive release necessity from the tested identity tool");
  });

  it("rejects shell contract version parsing", () => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        ci: `${sources.ci}\n# IFS=. read -r current_major`,
      })
    ).toThrow("CI must not parse contract versions in shell");
  });

  it("attests the verified archive before privileged transfer", () => {
    const contracts = sources.contracts
      .replace("- name: Upload verified archive", "- name: Later transfer")
      .replace(
        "- name: Attest verified archive",
        "- name: Upload verified archive"
      )
      .replace("- name: Later transfer", "- name: Attest verified archive");

    expect(() => verifyWorkflows({ ...sources, contracts })).toThrow(
      "Contract archives must be attested before crossing into the publish job"
    );
  });

  it("binds GitHub and npm provenance to one exact source", () => {
    const cases = [
      [
        sources.contracts.replaceAll(
          '--source-digest "$GITHUB_SHA"',
          '--source-digest "unknown"'
        ),
        "Contract attestation must bind workflow, source revision, and main",
      ],
      [
        sources.contracts.replace(
          ".digest.gitCommit == $sha",
          '.digest.gitCommit == "unknown"'
        ),
        "npm provenance must bind archive, repository, workflow, main, and source revision",
      ],
    ] as const;
    for (const [contracts, message] of cases) {
      expect(() => verifyWorkflows({ ...sources, contracts })).toThrow(message);
    }
  });

  it("removes only the failed same-SHA mutable release", () => {
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
  });

  it("keeps repository code out of the privileged contract job", () => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        contracts: `${sources.contracts}\n      - run: node scripts/check.ts`,
      })
    ).toThrow(
      "The privileged contract job must not checkout or execute repository code"
    );
  });

  it("rejects an impossible repository-setting preflight", () => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        contracts: `${sources.contracts}
          gh api "repos/$GITHUB_REPOSITORY/immutable-releases"`,
      })
    ).toThrow(
      "Contract workflows cannot query repository settings with GITHUB_TOKEN"
    );
  });

  it("requires archive comparison instead of trigger path guesses", () => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        contracts: sources.contracts.replace(
          "  workflow_dispatch:",
          '    paths: ["packages/contracts/**"]\n  workflow_dispatch:'
        ),
      })
    ).toThrow("Contract release triggers must not guess archive input paths");
  });

  it("skips full release gates when archive bytes are unchanged", () => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        contracts: sources.contracts.replace(
          "      - name: Verify repository\n        if: steps.decision.outputs.mode == 'create'",
          "      - name: Verify repository"
        ),
      })
    ).toThrow("Unchanged contract archives must skip full release gates");
  });

  it("requires the publish job to read archive attestations", () => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        contracts: sources.contracts.replace(
          "      attestations: read",
          "      statuses: read"
        ),
      })
    ).toThrow(
      "Contract builds and privileged publication must use separate jobs"
    );
  });

  it("requires exact immutable release rerun handling", () => {
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
  });

  it("allows only same-SHA mutable release recovery", () => {
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
  });

  it("requires exact action commits", () => {
    expect(() =>
      verifyWorkflows({
        ...sources,
        ci: sources.ci.replace(
          "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1",
          "actions/checkout@main"
        ),
      })
    ).toThrow("Workflow action actions/checkout@main must use an exact commit");
  });

  it("requires complete history for content operations", () => {
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
  });

  it("keeps contract proof outside the production environment", () => {
    const release = sources.release
      .replace("environment: content-production", "environment: moved")
      .replace(
        "    steps:\n      - name: Checkout",
        "    environment: content-production\n    steps:\n      - name: Checkout"
      );
    expect(() => verifyWorkflows({ ...sources, release })).toThrow(
      "Contract proof must finish before production credentials are approved"
    );
  });

  it("requires production operations to use an exact isolated checkout", () => {
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
  });

  it("requires release workflows to pass a validated scalable scope", () => {
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
  });
});
