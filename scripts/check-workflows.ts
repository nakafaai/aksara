import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { isRecord } from "effect/Predicate";

const BOOTSTRAP_PATH = ".github/workflows/bootstrap.yml";
const INITIAL_PACKAGE_PATTERN =
  /aksara-contracts\/0\.1\.0[\s\S]*bootstrap_status" != "200"/u;
const TRANSFERRED_TARBALL_PATTERN =
  /id: tarball[\s\S]*package_integrity=.*openssl dgst -sha512[\s\S]*EXPECTED_INTEGRITY: \$\{\{ steps\.tarball\.outputs\.package_integrity \}\}[\s\S]*package_integrity" != "\$EXPECTED_INTEGRITY"/u;
const CANDIDATE_VERSION_PATTERN =
  /aksara-contracts\/\$package_version[\s\S]*candidate_status" != "404"/u;
const VERSION_SETUP_PATTERN =
  /- name: Setup pnpm\n\s+if: steps\.bootstrap\.outputs\.ready == 'true'/u;
const PROOF_INSTALLER_PATTERN =
  /workflow_call:[\s\S]*proof_mode:[\s\S]*uses: slsa-framework\/slsa-verifier\/actions\/installer@ea584f4502babc6f60d9bc799dbbb13c1caa9ee6/u;
const LOCAL_PACKAGE_PATTERN =
  /Build current package[\s\S]*pnpm install --frozen-lockfile[\s\S]*verify:package[\s\S]*aksara-contracts\.local\.tgz/u;
const PACKAGE_INTEGRITY_PATTERN =
  /EXPECTED_INTEGRITY="sha512-\$\(openssl dgst -sha512 -binary "\$local_tarball"[\s\S]*actual_integrity[\s\S]*downloaded_integrity[\s\S]*provenance_source_sha=[\s\S]*git merge-base --is-ancestor/u;
const RELEASE_PROOF_PATTERN =
  /package:[\s\S]*inputs\.operation == 'accept'[\s\S]*inputs\.operation == 'release'[\s\S]*inputs\.operation == 'rollback'[\s\S]*uses: \.\/\.github\/workflows\/package-proof\.yml[\s\S]*proof_mode: current/u;
const RECOVERY_OPERATION_PATTERN =
  /needs: package[\s\S]*always\(\)[\s\S]*needs\.package\.result == 'success'[\s\S]*inputs\.operation == 'abort'[\s\S]*inputs\.operation == 'cleanup'[\s\S]*inputs\.operation == 'recover'[\s\S]*needs\.package\.result == 'skipped'/u;
const SHARED_DEPRECATION_PATTERN =
  /Verify repository controls[\s\S]*pnpm deprecations\s*\n[\s\S]*Verify full publication revision/u;
const FULL_DEPRECATION_PATTERN =
  /Verify full publication revision[\s\S]*pnpm deprecations\s*\n[\s\S]*pnpm typecheck/u;
const TERMINAL_DEPRECATION_PATTERN =
  /Verify terminal operation revision[\s\S]*pnpm exec turbo run typecheck test build[\s\S]*--filter=@nakafa\/aksara-contracts[\s\S]*--filter=@nakafa\/aksara-publisher[\s\S]*--filter=@nakafa\/aksara-cli[\s\S]*pnpm deprecations:audit/u;
const SOURCE_ANCESTRY_PATTERN =
  /slsa-verifier verify-npm-package[\s\S]*provenance_source_sha=[\s\S]*gh api[\s\S]*compare\/\$provenance_source_sha\.\.\.\$CURRENT_SHA[\s\S]*comparison_status" != "ahead"/u;
const PUBLISH_CALL_PATTERN = /pnpm publish "\$TARBALL"/gu;
const TOKEN_BINDING_PATTERN = /secrets\.NPM_BOOTSTRAP_TOKEN/gu;
const LOST_VISIBILITY_PATTERN =
  /if \[\[ "\$ready" != "true" \]\]; then(?<body>[\s\S]*?)\n\s+fi/u;
const PRIVILEGED_CODE_PATTERN = /actions\/checkout|pnpm install/u;
const SAFE_PUBLISH_PATTERN =
  /pnpm publish "\$TARBALL"[\s\S]*--provenance[\s\S]*--ignore-scripts[\s\S]*\|\| publish_status=\$\?/u;
const EXISTING_VERSION_PATTERN =
  /if \[\[ "\$status" == "200" \]\]; then[\s\S]*needs_publish=false[\s\S]*if: steps\.state\.outputs\.needs_publish == 'true'/u;
const HARD_FAILURE_PATTERN = /exit 1/u;
const INHERITED_STATUS_PATTERN = /exit "?\$\{?publish_status/u;

/** Exact workflow sources whose cross-file release policy is verified together. */
export interface WorkflowSources {
  readonly bootstrap: string | undefined;
  readonly packageProof: string;
  readonly publish: string;
  readonly release: string;
  readonly state: unknown;
  readonly version: string;
}

/** Reads one workflow only while its guarded bootstrap path exists. */
export function readOptionalWorkflow(
  path: string,
  pathExists: (candidate: string) => boolean,
  readSource: (candidate: string) => string
): string | undefined {
  return pathExists(path) ? readSource(path) : undefined;
}

/** Verifies bootstrap, package proof, publication, and recovery as one policy. */
export function verifyWorkflows({
  bootstrap,
  packageProof,
  publish,
  release,
  state,
  version,
}: WorkflowSources): void {
  assert.ok(isRecord(state), "Bootstrap state must be an object");
  assert.equal(
    typeof state.contracts,
    "boolean",
    "Contracts bootstrap state must be boolean"
  );
  assert.match(
    publish,
    INITIAL_PACKAGE_PATTERN,
    "Steady-state publishing must prove the initial package exists"
  );
  assert.match(
    publish,
    TRANSFERRED_TARBALL_PATTERN,
    "Staged package output must match the exact transferred tarball"
  );
  assert.match(
    publish,
    CANDIDATE_VERSION_PATTERN,
    "Steady-state publishing must require a new candidate version"
  );
  assert.ok(
    version.indexOf("- name: Check package bootstrap") <
      version.indexOf("- name: Setup pnpm"),
    "Version automation must stop before toolchain setup while bootstrap is incomplete"
  );
  assert.match(
    version,
    VERSION_SETUP_PATTERN,
    "Version toolchain setup must run only after bootstrap"
  );
  assert.match(
    packageProof,
    PROOF_INSTALLER_PATTERN,
    "Reusable package proof must install the pinned SLSA verifier"
  );
  assert.match(
    packageProof,
    LOCAL_PACKAGE_PATTERN,
    "Current package proof must build an isolated tarball from the exact checkout"
  );
  assert.match(
    packageProof,
    PACKAGE_INTEGRITY_PATTERN,
    "Current package proof must bind exact tarball bytes and signed provenance"
  );
  assert.match(
    release,
    RELEASE_PROOF_PATTERN,
    "Content acceptance, release, and rollback must call current cryptographic package proof"
  );
  assert.match(
    release,
    RECOVERY_OPERATION_PATTERN,
    "Terminal recovery operations must remain available only when package proof is intentionally skipped"
  );
  assert.doesNotMatch(
    release,
    SHARED_DEPRECATION_PATTERN,
    "Shared release controls must not trigger an unfiltered declaration build"
  );
  assert.match(
    release,
    FULL_DEPRECATION_PATTERN,
    "Full publication must build every declaration before auditing deprecations"
  );
  assert.match(
    release,
    TERMINAL_DEPRECATION_PATTERN,
    "Terminal recovery must audit deprecations after its scoped build"
  );

  if (state.contracts) {
    assert.equal(
      bootstrap,
      undefined,
      "Completed bootstrap must delete its privileged workflow"
    );
    return;
  }

  assert.ok(
    typeof bootstrap === "string",
    "Incomplete bootstrap must retain its privileged workflow"
  );
  assert.match(
    bootstrap,
    SOURCE_ANCESTRY_PATTERN,
    "Bootstrap recovery must verify proven source ancestry after signature proof"
  );
  const privileged = bootstrap.slice(bootstrap.indexOf("\n  publish:\n"));
  const publishCalls = [...bootstrap.matchAll(PUBLISH_CALL_PATTERN)];
  const tokenBindings = [...privileged.matchAll(TOKEN_BINDING_PATTERN)];
  const lostVisibility = LOST_VISIBILITY_PATTERN.exec(bootstrap)?.groups?.body;

  assert.equal(
    publishCalls.length,
    1,
    "Bootstrap must attempt package publication exactly once"
  );
  assert.equal(
    tokenBindings.length,
    1,
    "The bootstrap token must be visible only to the single publish step"
  );
  assert.doesNotMatch(
    privileged,
    PRIVILEGED_CODE_PATTERN,
    "The privileged bootstrap job must not execute repository or package code"
  );
  assert.match(
    bootstrap,
    SAFE_PUBLISH_PATTERN,
    "Bootstrap must publish the exact tarball once with provenance and no lifecycle scripts"
  );
  assert.match(
    bootstrap,
    EXISTING_VERSION_PATTERN,
    "An existing bootstrap version must pass exact registry proof without republishing"
  );
  assert.ok(
    lostVisibility,
    "Bootstrap must handle a publish result that is not visible in the registry"
  );
  assert.match(
    lostVisibility,
    HARD_FAILURE_PATTERN,
    "Lost registry visibility must fail regardless of the publish exit status"
  );
  assert.doesNotMatch(
    lostVisibility,
    INHERITED_STATUS_PATTERN,
    "Lost registry visibility must never inherit a successful publish exit status"
  );
}

const bootstrapSource = readOptionalWorkflow(
  BOOTSTRAP_PATH,
  existsSync,
  (path) => readFileSync(path, "utf8")
);
verifyWorkflows({
  bootstrap: bootstrapSource,
  packageProof: readFileSync(".github/workflows/package-proof.yml", "utf8"),
  publish: readFileSync(".github/workflows/publish.yml", "utf8"),
  release: readFileSync(".github/workflows/release.yml", "utf8"),
  state: JSON.parse(readFileSync(".changeset/bootstrap.json", "utf8")),
  version: readFileSync(".github/workflows/version.yml", "utf8"),
});
process.stdout.write("Verified package workflow recovery policy.\n");
