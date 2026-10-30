import { NodeServices } from "@effect/platform-node";
import { layer } from "@effect/vitest";
import { Effect } from "effect";
import {
  verifyRepositoryWorkflows,
  verifyWorkflows,
  type WorkflowSources,
} from "#scripts/workflow/check";
import { expectRefusal } from "#scripts/workflow/test/failure";
import {
  sourceEffectTestsOf,
  workflowSourcesLayer,
} from "#scripts/workflow/test/sources";
import { TOOLCHAIN_SETUP_ACTION } from "#scripts/workflow/toolchain";

const OPERATION_HISTORY_INPUT =
  /(?<step>^ {2}operate:\n[\s\S]*?^ {6}- name: Checkout\n^ {8}uses: actions\/checkout@[^\n]+\n^ {8}with:\n(?:^ {10}[^\n]+\n)*?)^ {10}fetch-depth: 0$/mu;
const OPERATION_SETUP_INPUT =
  /(?<step>^ {2}operate:\n[\s\S]*?^ {6}- name: Setup toolchain\n[\s\S]*?^ {10}install: false)$/mu;

/** Expects the verifier to refuse the sources with the changed sources, with one reason. */
const refused = (
  sources: WorkflowSources,
  changed: Partial<WorkflowSources>,
  message: string
) => expectRefusal(verifyWorkflows({ ...sources, ...changed }), message);

/** Replaces one fragment of one text source and expects the verifier to refuse the result. */
const refusedReplacement = (
  sources: WorkflowSources,
  key: "contracts" | "release",
  from: string,
  to: string,
  message: string
) => refused(sources, { [key]: sources[key].replace(from, to) }, message);

layer(workflowSourcesLayer)("workflow policy", (layered) => {
  const it = sourceEffectTestsOf(layered);

  layered.effect("verifies the tracked repository workflows", () =>
    verifyRepositoryWorkflows().pipe(Effect.provide(NodeServices.layer))
  );

  it("accepts immutable archives and the direct content release path", (sources) =>
    verifyWorkflows(sources));

  it("verifies every tracked workflow source", (sources) =>
    refused(
      sources,
      {
        all: [
          ...sources.all,
          "jobs:\n  verify:\n    steps:\n      - run: bun run test",
        ],
      },
      "Every Bun job must set up Node.js once"
    ));

  it("always verifies each named release workflow", (sources) =>
    refused(
      sources,
      {
        release: sources.release.replaceAll(
          TOOLCHAIN_SETUP_ACTION,
          "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1"
        ),
      },
      "Every Bun job must set up the toolchain once"
    ));

  it("rejects registry publication machinery", (sources) =>
    Effect.gen(function* () {
      yield* refused(
        sources,
        { contracts: `${sources.contracts}\n# pnpm publish` },
        "Workflows must not retain registry or Changesets publication machinery"
      );
      for (const prefix of ["http://", "//", ""]) {
        yield* refused(
          sources,
          {
            contracts: `${sources.contracts}\n# ${prefix}registry.npmjs.org/-/unexpected`,
          },
          "Registry reads must use only the exact npm attestation endpoint"
        );
      }
    }));

  it("requires contract releases to use the tested archive identity decision", (sources) =>
    refusedReplacement(
      sources,
      "contracts",
      "release/command.ts describe",
      "release/command.ts inspect",
      "Contract releases must derive release necessity from the tested identity tool"
    ));

  it("derives previous bytes only from final immutable releases", (sources) =>
    refusedReplacement(
      sources,
      "contracts",
      ".immutable == true",
      ".immutable == false",
      "Contract releases must derive release necessity from the tested identity tool"
    ));

  it("rejects shell contract version parsing", (sources) =>
    refused(
      sources,
      { contracts: `${sources.contracts}\n# IFS=. read -r current_major` },
      "Contract releases must not parse contract versions in shell"
    ));

  it("attests the verified archive before privileged transfer", (sources) =>
    refused(
      sources,
      {
        contracts: sources.contracts
          .replace("- name: Upload verified package", "- name: Later transfer")
          .replace(
            "- name: Attest verified archive",
            "- name: Upload verified package"
          )
          .replace("- name: Later transfer", "- name: Attest verified archive"),
      },
      "Contract archives must be attested before crossing into the publish job"
    ));

  for (const name of ["Attest verified archive", "Create draft release"]) {
    it(`requires the contract release to declare the ${name} step`, (sources) =>
      refusedReplacement(
        sources,
        "contracts",
        `- name: ${name}`,
        "- name: Renamed release step",
        `Contract releases must declare the ${name} step`
      ));
  }

  it("binds GitHub attestation to one exact source", (sources) =>
    refused(
      sources,
      {
        contracts: sources.contracts.replaceAll(
          '--source-digest "$GITHUB_SHA"',
          '--source-digest "unknown"'
        ),
      },
      "Contract attestation must bind workflow, source revision, and main"
    ));

  it("removes only the failed same-SHA mutable release", (sources) =>
    refusedReplacement(
      sources,
      "contracts",
      ".isImmutable == false and .targetCommitish == $sha",
      ".isImmutable == true and .targetCommitish == $sha",
      "Failed publication must remove only its same-SHA mutable release"
    ));

  it("removes mutable releases without requiring a draft tag", (sources) =>
    Effect.gen(function* () {
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
        yield* refused(
          sources,
          { contracts: sources.contracts.replaceAll(guard, replacement) },
          message
        );
      }
    }));

  it("rejects an impossible repository-setting preflight", (sources) =>
    refused(
      sources,
      {
        contracts: `${sources.contracts}
          gh api "repos/$GITHUB_REPOSITORY/immutable-releases"`,
      },
      "Contract workflows cannot query repository settings with GITHUB_TOKEN"
    ));

  it("requires archive comparison instead of trigger path guesses", (sources) =>
    refusedReplacement(
      sources,
      "contracts",
      "  workflow_dispatch:",
      '    paths: ["packages/contracts/**"]\n  workflow_dispatch:',
      "Contract release triggers must not guess archive input paths"
    ));

  it("skips full release gates when archive bytes are unchanged", (sources) =>
    refusedReplacement(
      sources,
      "contracts",
      "      - name: Verify repository\n        if: steps.decision.outputs.mode == 'create'",
      "      - name: Verify repository",
      "Unchanged contract archives must skip full release gates"
    ));

  it("requires the publish job to read archive attestations", (sources) =>
    refusedReplacement(
      sources,
      "contracts",
      "      attestations: read",
      "      statuses: read",
      "Contract publication must verify archive attestations"
    ));

  it("requires exact immutable release rerun handling", (sources) =>
    refusedReplacement(
      sources,
      "contracts",
      "tag exists without a GitHub Release",
      "tag can be reused",
      "Contract reruns may recover only their same-SHA mutable release"
    ));

  it("allows only same-SHA mutable release recovery", (sources) =>
    refusedReplacement(
      sources,
      "contracts",
      ".isDraft == true or .isImmutable == false",
      ".isDraft == true",
      "Contract reruns may recover only their same-SHA mutable release"
    ));

  it("requires exact action commits", (sources) =>
    refusedReplacement(
      sources,
      "contracts",
      "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1",
      "actions/checkout@main",
      "Workflow action actions/checkout@main must use an exact commit"
    ));

  it("requires complete history for content operations", (sources) =>
    Effect.gen(function* () {
      yield* refusedReplacement(
        sources,
        "release",
        "          fetch-depth: 0",
        "          fetch-depth: 1",
        "Every content operation must depend on the exact immutable contract proof"
      );
      yield* refused(
        sources,
        {
          release: sources.release
            .replace(OPERATION_HISTORY_INPUT, "$1          fetch-depth: 1")
            .replace(
              OPERATION_SETUP_INPUT,
              "$1\n          fetch-depth: 0 # unrelated input"
            ),
        },
        "Production content operations must preserve complete Git history"
      );
    }));

  it("keeps contract proof outside the production environment", (sources) =>
    refused(
      sources,
      {
        release: sources.release
          .replace("environment: content-production", "environment: moved")
          .replace(
            "  contracts:\n",
            "  contracts:\n    environment: content-production\n"
          ),
      },
      "Contract proof must finish before production credentials are approved"
    ));

  it("requires production operations to use an exact isolated checkout", (sources) =>
    refusedReplacement(
      sources,
      "release",
      'git worktree add --detach "$OPERATION_ROOT" "$GITHUB_SHA"',
      "git worktree add main",
      "Content operations must run from one clean exact-revision checkout"
    ));

  it("requires release workflows to pass a validated scalable scope", (sources) =>
    refusedReplacement(
      sources,
      "release",
      'scope_args+=(--scope "$selector")',
      'scope_args+=("$selector")',
      "Content releases must validate and pass one explicit scalable scope"
    ));
});
