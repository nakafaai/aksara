import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { verifyMaterialMigrationWorkflow } from "#scripts/migration-workflow";

const FORBIDDEN_REGISTRY_PATTERN =
  /NPM_BOOTSTRAP_TOKEN|pnpm publish|pnpm stage|changesets|registry\.npmjs\.org|package-proof/iu;
const SWALLOWED_CLI_OUTPUT_PATTERN = /2>\/dev\/null \|\| true\)/u;
const FROZEN_INSTALL_PATTERN = /pnpm install --frozen-lockfile/u;
const VERIFY_CONSUMER_PATTERN = /pnpm verify:consumer/u;
const ARCHIVE_BUILD_PATTERN =
  /pnpm verify:consumer -- --output "\$(?:CURRENT_ARCHIVE|TARBALL)"/u;
const PRIVILEGED_CODE_PATTERN =
  /actions\/checkout|\bpnpm\b|\bnode\b|packages\/|scripts\//u;
const PRODUCTION_ENV_PATTERN = /environment: content-production/u;
const FULL_GATE_PATTERN =
  /pnpm lint[\s\S]*pnpm deprecations[\s\S]*pnpm names[\s\S]*pnpm jsdocs[\s\S]*pnpm lines[\s\S]*pnpm workflows[\s\S]*pnpm boundaries[\s\S]*pnpm typecheck[\s\S]*pnpm test[\s\S]*pnpm build/u;
const CONDITIONAL_GATE_PATTERN =
  /Decide exact archive release[\s\S]*Verify repository[\s\S]*if: steps\.decision\.outputs\.mode == 'create'[\s\S]*pnpm lint/u;
const CONTRACT_TRIGGER_PATTERN =
  /push:[\s\S]*branches: \[main\][\s\S]*workflow_dispatch:/u;
const CONTRACT_PATH_TRIGGER_PATTERN = /\bpaths(?:-ignore)?:/u;
const RELEASE_IDENTITY_PATTERN =
  /Capture immutable contract releases[\s\S]*gh api --paginate[\s\S]*\.immutable == true[\s\S]*startswith\("contracts-v"\)[\s\S]*release-command\.ts describe[\s\S]*Download latest immutable archive[\s\S]*\.isImmutable == true[\s\S]*release-command\.ts "\$\{arguments\[@\]\}"/u;
const SHELL_VERSION_PATTERN =
  /IFS=|current_(?:major|minor|patch)|latest_(?:major|minor|patch)|latest_version=\$\{|release_tag="contracts-v\$|asset_name="nakafa-aksara-contracts-\$/u;
const ARCHIVE_IDENTITY_PATTERN =
  /release-command\.ts describe[\s\S]*pnpm verify:consumer -- --output[\s\S]*gh release download[\s\S]*arguments=\(decide[\s\S]*--previous "\$LATEST_ARCHIVE"[\s\S]*release-command\.ts "\$\{arguments\[@\]\}"/u;
const ATTESTATION_PATTERN =
  /actions\/attest@[0-9a-f]{40}[\s\S]*gh attestation verify "\$TARBALL"[\s\S]*--signer-workflow "\$GITHUB_REPOSITORY\/\.github\/workflows\/contracts\.yml"[\s\S]*--source-digest "\$GITHUB_SHA"[\s\S]*--source-ref "refs\/heads\/main"/u;
const RELEASE_JOB_PATTERN =
  /build:[\s\S]*attestations: write[\s\S]*contents: read[\s\S]*Upload verified archive[\s\S]*actions\/upload-artifact@[0-9a-f]{40}[\s\S]*publish:[\s\S]*needs: build[\s\S]*if: needs\.build\.outputs\.mode == 'create'[\s\S]*attestations: read[\s\S]*contents: write[\s\S]*Download verified archive[\s\S]*actions\/download-artifact@[0-9a-f]{40}/u;
const IMMUTABLE_SETTING_PATTERN =
  /repos\/\$GITHUB_REPOSITORY\/immutable-releases/u;
const IDEMPOTENT_RELEASE_PATTERN =
  /Resolve release state[\s\S]*isDraft,isImmutable,isPrerelease,targetCommitish[\s\S]*tag exists without a GitHub Release[\s\S]*\.isDraft == true or \.isImmutable == false[\s\S]*target" != "\$GITHUB_SHA"[\s\S]*\.isPrerelease[\s\S]*gh release delete "\$RELEASE_TAG"[\s\S]*published contract release already owns/u;
const PUBLISHED_RELEASE_PATTERN =
  /Publish immutable release[\s\S]*gh release edit "\$RELEASE_TAG"[\s\S]*--draft=false[\s\S]*\.immutable == true[\s\S]*\.assets\[0\]\.digest == \$digest[\s\S]*git\/ref\/tags\/\$RELEASE_TAG[\s\S]*\.object\.type == "commit" and \.object\.sha == \$sha[\s\S]*gh release verify "\$RELEASE_TAG"[\s\S]*gh release verify-asset "\$RELEASE_TAG" "\$TARBALL"[\s\S]*gh attestation verify "\$TARBALL"/u;
const MUTABLE_RECOVERY_PATTERN =
  /Remove failed mutable release[\s\S]*if: failure\(\) && steps\.state\.outputs\.mode == 'create'[\s\S]*--json isImmutable,targetCommitish[\s\S]*\.isImmutable == false and \.targetCommitish == \$sha[\s\S]*\.object\.type == "commit" and \.object\.sha == \$sha[\s\S]*gh release delete "\$RELEASE_TAG"[\s\S]*--cleanup-tag/u;
const ISOLATED_OPERATION_PATTERN =
  /git worktree add --detach "\$OPERATION_ROOT" "\$GITHUB_SHA"[\s\S]*pnpm --dir "\$OPERATION_ROOT" install --frozen-lockfile[\s\S]*rev-parse --verify HEAD[\s\S]*status --porcelain=v1 --untracked-files=normal[\s\S]*working-directory: \$\{\{ runner\.temp \}\}\/aksara-operation/u;
const TERMINAL_GATE_PATTERN =
  /Verify terminal operation revision[\s\S]*pnpm exec turbo run typecheck test build[\s\S]*--filter=@nakafa\/aksara-contracts[\s\S]*--filter=@nakafa\/aksara-publisher[\s\S]*--filter=@nakafa\/aksara-cli[\s\S]*pnpm deprecations:audit/u;
const PUBLICATION_SCOPE_PATTERN =
  /scope:[\s\S]*PUBLICATION_SCOPE: \$\{\{ inputs\.scope \}\}[\s\S]*jq -e 'type == "array" and length > 0[\s\S]*mapfile -t SCOPE_SELECTORS[\s\S]*scope_args\+=\(--scope "\$selector"\)[\s\S]*"\$\{scope_args\[@\]\}"/u;
const CONTENT_CONTRACT_PATTERN =
  /contracts:[\s\S]*attestations: read[\s\S]*contents: read[\s\S]*fetch-depth: 0[\s\S]*pnpm --filter @nakafa\/aksara-contracts verify:consumer --output "\$TARBALL"[\s\S]*release-command\.ts prove[\s\S]*--archive "\$CURRENT_ARCHIVE"[\s\S]*--repository "\$GITHUB_REPOSITORY"[\s\S]*--source-sha "\$GITHUB_SHA"[\s\S]*operate:[\s\S]*needs: contracts[\s\S]*needs\.contracts\.result == 'success'/u;
const OPERATION_HISTORY_PATTERN =
  /^ {2}operate:\n[\s\S]*?^ {6}- name: Checkout\n^ {8}uses: actions\/checkout@[^\n]+\n^ {8}with:\n(?:^ {10}[^\n]+\n)*^ {10}fetch-depth: 0\n(?:^ {10}[^\n]+\n)*(?:\n)?^ {6}- name: Setup pnpm$/mu;
const PINNED_ACTION_PATTERN = /^[a-z0-9-]+\/[a-z0-9-]+@[0-9a-f]{40}$/u;

/** Workflow sources whose release controls must remain coherent. */
export interface WorkflowSources {
  readonly ci: string;
  readonly contracts: string;
  readonly release: string;
}

/** Verifies one source-only contract archive and one content release path. */
export function verifyWorkflows({
  ci,
  contracts,
  release,
}: WorkflowSources): void {
  const combined = `${ci}\n${contracts}\n${release}`;
  assert.doesNotMatch(
    combined,
    FORBIDDEN_REGISTRY_PATTERN,
    "Workflows must not retain registry or Changesets publication machinery"
  );
  assert.doesNotMatch(
    combined,
    SWALLOWED_CLI_OUTPUT_PATTERN,
    "Workflow probes must clear failed CLI output instead of treating error bodies as state"
  );
  assert.match(
    ci,
    FROZEN_INSTALL_PATTERN,
    "CI must install the exact pnpm lockfile"
  );
  assert.match(
    ci,
    RELEASE_IDENTITY_PATTERN,
    "CI must derive release necessity from the tested identity tool"
  );
  assert.doesNotMatch(
    ci,
    SHELL_VERSION_PATTERN,
    "CI must not parse contract versions in shell"
  );
  assert.match(ci, FULL_GATE_PATTERN, "CI must run every repository gate");
  assert.match(
    ci,
    VERIFY_CONSUMER_PATTERN,
    "CI must prove the release archive in an isolated consumer"
  );

  assert.match(
    contracts,
    CONTRACT_TRIGGER_PATTERN,
    "Contract release checks must run for every main source revision"
  );
  const contractTrigger = contracts.slice(0, contracts.indexOf("permissions:"));
  assert.doesNotMatch(
    contractTrigger,
    CONTRACT_PATH_TRIGGER_PATTERN,
    "Contract release triggers must not guess archive input paths"
  );
  assert.match(
    contracts,
    FROZEN_INSTALL_PATTERN,
    "Contract releases must install the exact pnpm lockfile"
  );
  assert.match(
    contracts,
    RELEASE_IDENTITY_PATTERN,
    "Contract releases must derive release necessity from the tested identity tool"
  );
  assert.doesNotMatch(
    contracts,
    SHELL_VERSION_PATTERN,
    "Contract releases must not parse contract versions in shell"
  );
  assert.match(
    contracts,
    FULL_GATE_PATTERN,
    "Contract releases must run every repository gate"
  );
  assert.match(
    contracts,
    CONDITIONAL_GATE_PATTERN,
    "Unchanged contract archives must skip full release gates"
  );
  assert.match(
    contracts,
    ARCHIVE_BUILD_PATTERN,
    "Contract releases must upload the archive proven by the consumer"
  );
  assert.match(
    contracts,
    ARCHIVE_IDENTITY_PATTERN,
    "Contract releases must compare exact verified archive bytes"
  );
  const attestIndex = contracts.indexOf("- name: Attest verified archive");
  const transferIndex = contracts.indexOf("- name: Upload verified archive");
  const draftIndex = contracts.indexOf("- name: Create draft release");
  const uploadIndex = contracts.indexOf("- name: Attach verified archive");
  const publishIndex = contracts.indexOf("- name: Publish immutable release");
  assert.ok(
    attestIndex < transferIndex,
    "Contract archives must be attested before crossing into the publish job"
  );
  assert.ok(
    draftIndex < uploadIndex && uploadIndex < publishIndex,
    "Contract releases must draft, attach, then publish"
  );
  assert.match(
    contracts,
    ATTESTATION_PATTERN,
    "Contract attestation must bind workflow, source revision, and main"
  );
  assert.match(
    contracts,
    RELEASE_JOB_PATTERN,
    "Contract builds and privileged publication must use separate jobs"
  );
  const publishJob = contracts.slice(contracts.indexOf("\n  publish:"));
  assert.doesNotMatch(
    publishJob,
    PRIVILEGED_CODE_PATTERN,
    "The privileged contract job must not checkout or execute repository code"
  );
  assert.doesNotMatch(
    contracts,
    IMMUTABLE_SETTING_PATTERN,
    "Contract workflows cannot query repository settings with GITHUB_TOKEN"
  );
  assert.match(
    contracts,
    IDEMPOTENT_RELEASE_PATTERN,
    "Contract reruns may recover only their same-SHA mutable release"
  );
  assert.match(
    contracts,
    PUBLISHED_RELEASE_PATTERN,
    "Published releases must match the verified asset and source tag"
  );
  assert.match(
    contracts,
    MUTABLE_RECOVERY_PATTERN,
    "Failed publication must remove only its same-SHA mutable release"
  );

  const actionReferences = [...combined.matchAll(/(?<=uses: )[^ #\n]+/gu)].map(
    (match) => match[0]
  );
  assert.ok(actionReferences.length > 0, "Workflows must use pinned actions");
  for (const reference of actionReferences) {
    assert.match(
      reference,
      PINNED_ACTION_PATTERN,
      `Workflow action ${reference} must use an exact commit`
    );
  }

  assert.match(
    release,
    PRODUCTION_ENV_PATTERN,
    "Content operations must require production environment approval"
  );
  assert.match(
    release,
    VERIFY_CONSUMER_PATTERN,
    "Full content operations must prove the contracts release archive"
  );
  assert.match(
    release,
    CONTENT_CONTRACT_PATTERN,
    "Every content operation must depend on the exact immutable contract proof"
  );
  assert.match(
    release,
    OPERATION_HISTORY_PATTERN,
    "Production content operations must preserve complete Git history"
  );
  assert.ok(
    release.indexOf("- name: Prove immutable contract release") <
      release.indexOf("environment: content-production"),
    "Contract proof must finish before production credentials are approved"
  );
  assert.match(
    release,
    ISOLATED_OPERATION_PATTERN,
    "Content operations must run from one clean exact-revision checkout"
  );
  assert.match(
    release,
    TERMINAL_GATE_PATTERN,
    "Terminal content operations must retain scoped recovery gates"
  );
  assert.match(
    release,
    PUBLICATION_SCOPE_PATTERN,
    "Content releases must validate and pass one explicit scalable scope"
  );
}

verifyWorkflows({
  ci: readFileSync(".github/workflows/ci.yml", "utf8"),
  contracts: readFileSync(".github/workflows/contracts.yml", "utf8"),
  release: readFileSync(".github/workflows/release.yml", "utf8"),
});
verifyMaterialMigrationWorkflow(
  readFileSync(".github/workflows/material-migration.yml", "utf8")
);
process.stdout.write("Verified immutable contract and content workflows.\n");
