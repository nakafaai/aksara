import { Array as Arr, Console, Effect, Schema } from "effect";
import { trackedFiles } from "#scripts/check/files";
import { runEntry } from "#scripts/entry";
import { readSource } from "#scripts/source";
import { verifyCliWorkflow } from "#scripts/workflow/cli";
import { verifyProvenanceWorkflow } from "#scripts/workflow/provenance";
import { verifyPublicationWorkflow } from "#scripts/workflow/publication";
import { ensure, sameNames } from "#scripts/workflow/requirement";
import { verifyWorkflowToolchains } from "#scripts/workflow/toolchain";

const FORBIDDEN_REGISTRY_PATTERN =
  /NPM_BOOTSTRAP_TOKEN|pnpm publish|pnpm stage|bun publish|changesets|package-proof/iu;
const REGISTRY_REFERENCE_PATTERN =
  /(?:https?:\/\/|\/\/)?registry\.npmjs\.org(?:[^\s"'`]+)?/giu;
const NPM_ATTESTATION_URL =
  "https://registry.npmjs.org/-/npm/v1/attestations/$encoded_package_name@$package_version";
const NPM_REGISTRY = "https://registry.npmjs.org";
const SWALLOWED_CLI_OUTPUT_PATTERN = /2>\/dev\/null \|\| true\)/u;
const FROZEN_INSTALL_PATTERN = /bun install --frozen-lockfile/u;
const ARCHIVE_BUILD_PATTERN =
  /bun run verify:consumer -- --output "\$(?:CURRENT_ARCHIVE|TARBALL)"/u;
const FULL_GATE_PATTERN =
  /bun run lint[\s\S]*bun run deprecations[\s\S]*bun run names[\s\S]*bun run jsdocs[\s\S]*bun run lines[\s\S]*bun run workflows[\s\S]*bun run boundaries[\s\S]*bun run typecheck[\s\S]*bun run test[\s\S]*bun run build/u;
const CONDITIONAL_GATE_PATTERN =
  /Decide exact archive release[\s\S]*Verify repository[\s\S]*if: steps\.decision\.outputs\.mode == 'create'[\s\S]*bun run lint/u;
const CONTRACT_TRIGGER_PATTERN =
  /push:[\s\S]*branches: \[ main \][\s\S]*workflow_dispatch:/u;
const CONTRACT_PATH_TRIGGER_PATTERN = /\bpaths(?:-ignore)?:/u;
const RELEASE_IDENTITY_PATTERN =
  /Capture immutable contract releases[\s\S]*gh api --paginate[\s\S]*\.immutable == true[\s\S]*\.assets\[\][\s\S]*nakafa-aksara-contracts-[\s\S]*@tsv[\s\S]*release\/command\.ts describe[\s\S]*--releases[\s\S]*Download latest immutable archive[\s\S]*\.isImmutable == true[\s\S]*release\/command\.ts "\$\{arguments\[@\]\}"/u;
const SHELL_VERSION_PATTERN =
  /IFS=|current_(?:major|minor|patch)|latest_(?:major|minor|patch)|latest_version=\$\{|release_tag="(?:contracts-v|@nakafa\/aksara-contracts@)\$|asset_name="nakafa-aksara-contracts-\$/u;
const ARCHIVE_IDENTITY_PATTERN =
  /release\/command\.ts describe[\s\S]*bun run verify:consumer -- --output[\s\S]*gh release download[\s\S]*arguments=\(decide[\s\S]*--previous "\$LATEST_ARCHIVE"[\s\S]*release\/command\.ts "\$\{arguments\[@\]\}"/u;
const ATTESTATION_PATTERN =
  /actions\/attest@[0-9a-f]{40}[\s\S]*gh attestation verify "\$TARBALL"[\s\S]*--signer-workflow "\$GITHUB_REPOSITORY\/\.github\/workflows\/contracts\.yml"[\s\S]*--source-digest "\$GITHUB_SHA"[\s\S]*--source-ref "refs\/heads\/main"/u;
const RELEASE_JOB_PATTERN =
  /build:[\s\S]*attestations: write[\s\S]*contents: read[\s\S]*Upload verified package[\s\S]*contract-package[\s\S]*Upload publication verifier[\s\S]*contract-verifier[\s\S]*publish:[\s\S]*needs: build[\s\S]*environment: npm-production[\s\S]*attestations: read[\s\S]*contents: write[\s\S]*id-token: write[\s\S]*Download verified package[\s\S]*contract-package[\s\S]*verify:[\s\S]*needs: \[ build, publish \][\s\S]*permissions: \{\}[\s\S]*Download publication verifier[\s\S]*contract-verifier[\s\S]*finalize:[\s\S]*needs: \[ build, publish, verify \][\s\S]*contents: write/u;
const IMMUTABLE_SETTING_PATTERN =
  /repos\/\$GITHUB_REPOSITORY\/immutable-releases/u;
const IDEMPOTENT_RELEASE_PATTERN =
  /Resolve release state[\s\S]*isDraft,isImmutable,isPrerelease,targetCommitish[\s\S]*tag exists without a GitHub Release[\s\S]*\.isDraft == true or \.isImmutable == false[\s\S]*target" != "\$GITHUB_SHA"[\s\S]*\.isPrerelease[\s\S]*gh release delete "\$RELEASE_TAG"[\s\S]*--yes[\s\S]*if \[\[ -n "\$tag" \]\][\s\S]*git\/refs\/tags\/\$RELEASE_TAG[\s\S]*published contract release already owns/u;
const PUBLISHED_RELEASE_PATTERN =
  /Publish immutable release[\s\S]*gh release edit "\$RELEASE_TAG"[\s\S]*--draft=false[\s\S]*\.immutable == true[\s\S]*\.assets\[0\]\.digest == \$digest[\s\S]*git\/ref\/tags\/\$RELEASE_TAG[\s\S]*\.object\.type == "commit" and \.object\.sha == \$sha[\s\S]*gh release verify "\$RELEASE_TAG"[\s\S]*gh release verify-asset "\$RELEASE_TAG" "\$TARBALL"[\s\S]*gh attestation verify "\$TARBALL"/u;
const MUTABLE_RECOVERY_PATTERN =
  /if: failure\(\)(?: && steps\.state\.outputs\.mode == 'create')?[\s\S]*--json isImmutable,targetCommitish[\s\S]*\.isImmutable == false and \.targetCommitish == \$sha[\s\S]*\.object\.type == "commit" and \.object\.sha == \$sha[\s\S]*gh release delete "\$RELEASE_TAG"[\s\S]*--yes[\s\S]*if \[\[ -n "\$tag" \]\][\s\S]*gh api --method DELETE[\s\S]*git\/refs\/tags\/\$RELEASE_TAG/u;
const PINNED_ACTION_PATTERN = /^[a-z0-9-]+\/[a-z0-9-]+@[0-9a-f]{40}$/u;
const WORKFLOW_PATH_PATTERN = /^\.github\/workflows\/[^/]+\.ya?ml$/u;
const TOP_LEVEL_JOB_PATTERN = /\n {2}[a-z][a-z_]*:\n/u;

/** Workflow sources whose release controls must remain coherent. */
const WorkflowSourcesSchema = Schema.Struct({
  all: Schema.Array(Schema.String),
  cli: Schema.String,
  contracts: Schema.String,
  release: Schema.String,
});

/** Workflow sources that the workflow policy names. */
export type WorkflowSources = typeof WorkflowSourcesSchema.Type;

/** Returns where one named contract release step starts, and refuses a workflow that does not declare it. */
const contractStepStart = Effect.fn("AksaraWorkflow.contractStepStart")(
  function* (contracts: string, name: string) {
    const start = contracts.indexOf(`- name: ${name}`);
    yield* ensure(
      start >= 0,
      `Contract releases must declare the ${name} step`
    );
    return start;
  }
);

/** Verifies one source-only contract archive and one content release path. */
export const verifyWorkflows = Effect.fn("AksaraWorkflow.verifyWorkflows")(
  function* ({ all, cli, contracts, release }: WorkflowSources) {
    const releaseCombined = `${contracts}\n${release}`;
    const combined = `${releaseCombined}\n${cli}`;
    yield* ensure(
      !FORBIDDEN_REGISTRY_PATTERN.test(releaseCombined),
      "Workflows must not retain registry or Changesets publication machinery"
    );
    yield* ensure(
      sameNames(
        Arr.dedupe(
          Arr.map(
            [...combined.matchAll(REGISTRY_REFERENCE_PATTERN)],
            ([url]) => url
          )
        ),
        [NPM_REGISTRY, NPM_ATTESTATION_URL]
      ),
      "Registry reads must use only the exact npm attestation endpoint"
    );
    yield* ensure(
      !SWALLOWED_CLI_OUTPUT_PATTERN.test(combined),
      "Workflow probes must clear failed CLI output instead of treating error bodies as state"
    );
    yield* verifyWorkflowToolchains(
      Arr.dedupe([cli, contracts, release, ...all])
    );
    yield* verifyCliWorkflow(cli);
    yield* ensure(
      CONTRACT_TRIGGER_PATTERN.test(contracts),
      "Contract release checks must run for every main source revision"
    );
    const contractTrigger = contracts.slice(
      0,
      contracts.indexOf("permissions:")
    );
    yield* ensure(
      !CONTRACT_PATH_TRIGGER_PATTERN.test(contractTrigger),
      "Contract release triggers must not guess archive input paths"
    );
    yield* ensure(
      FROZEN_INSTALL_PATTERN.test(contracts),
      "Contract releases must install the exact Bun lockfile"
    );
    yield* ensure(
      RELEASE_IDENTITY_PATTERN.test(contracts),
      "Contract releases must derive release necessity from the tested identity tool"
    );
    yield* ensure(
      !SHELL_VERSION_PATTERN.test(contracts),
      "Contract releases must not parse contract versions in shell"
    );
    yield* ensure(
      FULL_GATE_PATTERN.test(contracts),
      "Contract releases must run every repository gate"
    );
    yield* ensure(
      CONDITIONAL_GATE_PATTERN.test(contracts),
      "Unchanged contract archives must skip full release gates"
    );
    yield* ensure(
      ARCHIVE_BUILD_PATTERN.test(contracts),
      "Contract releases must upload the archive proven by the consumer"
    );
    yield* ensure(
      ARCHIVE_IDENTITY_PATTERN.test(contracts),
      "Contract releases must compare exact verified archive bytes"
    );
    const attestIndex = yield* contractStepStart(
      contracts,
      "Attest verified archive"
    );
    const transferIndex = yield* contractStepStart(
      contracts,
      "Upload verified package"
    );
    const draftIndex = yield* contractStepStart(
      contracts,
      "Create draft release"
    );
    const uploadIndex = yield* contractStepStart(
      contracts,
      "Attach verified archive"
    );
    const publishIndex = yield* contractStepStart(
      contracts,
      "Publish immutable release"
    );
    yield* ensure(
      attestIndex < transferIndex,
      "Contract archives must be attested before crossing into the publish job"
    );
    yield* ensure(
      draftIndex < uploadIndex && uploadIndex < publishIndex,
      "Contract releases must draft, attach, then publish"
    );
    yield* ensure(
      ATTESTATION_PATTERN.test(contracts),
      "Contract attestation must bind workflow, source revision, and main"
    );
    yield* ensure(
      !IMMUTABLE_SETTING_PATTERN.test(contracts),
      "Contract workflows cannot query repository settings with GITHUB_TOKEN"
    );
    yield* ensure(
      IDEMPOTENT_RELEASE_PATTERN.test(contracts),
      "Contract reruns may recover only their same-SHA mutable release"
    );
    yield* ensure(
      PUBLISHED_RELEASE_PATTERN.test(contracts),
      "Published releases must match the verified asset and source tag"
    );
    const recoveries = [
      ...contracts.matchAll(/- name: Remove failed mutable release/gu),
    ];
    yield* ensure(
      recoveries.length === 2,
      "Every failed release boundary must own one mutable cleanup"
    );
    for (const recovery of recoveries) {
      const tail = contracts.slice(recovery.index);
      const nextJob = tail.slice(1).search(TOP_LEVEL_JOB_PATTERN);
      const step = nextJob < 0 ? tail : tail.slice(0, nextJob + 1);
      yield* ensure(
        MUTABLE_RECOVERY_PATTERN.test(step),
        "Failed publication must remove only its same-SHA mutable release"
      );
    }
    yield* verifyProvenanceWorkflow(contracts);
    yield* ensure(
      RELEASE_JOB_PATTERN.test(contracts),
      "Contract release privileges must remain separated by capability"
    );

    const actionReferences = Arr.map(
      [...combined.matchAll(/(?<=uses: )[^ #\n]+/gu)],
      (match) => match[0]
    );
    yield* ensure(
      actionReferences.length > 0,
      "Workflows must use pinned actions"
    );
    for (const reference of actionReferences) {
      yield* ensure(
        PINNED_ACTION_PATTERN.test(reference),
        `Workflow action ${reference} must use an exact commit`
      );
    }

    yield* verifyPublicationWorkflow(release, all);
  }
);

/** Reads every tracked workflow and the release workflows that the policy verifies. */
const readWorkflowSources = Effect.fn("WorkflowCheck.readSources")(
  function* () {
    const trackedPaths = yield* trackedFiles();
    const all = yield* Effect.forEach(
      Arr.filter(trackedPaths, (path) => WORKFLOW_PATH_PATTERN.test(path)),
      (path) => readSource(path)
    );
    const cli = yield* readSource(".github/workflows/cli.yml");
    const contracts = yield* readSource(".github/workflows/contracts.yml");
    const release = yield* readSource(".github/workflows/release.yml");
    return { all, cli, contracts, release };
  }
);

/** Verifies the tracked repository workflows and reports success on standard output. */
export const verifyRepositoryWorkflows = Effect.fn(
  "AksaraWorkflow.verifyRepository"
)(function* () {
  yield* verifyWorkflows(yield* readWorkflowSources());
  yield* Console.log("Verified immutable contract and content workflows.");
});

runEntry(import.meta.main, verifyRepositoryWorkflows());
