import assert from "node:assert/strict";

const PUBLISH_CODE_PATTERN =
  /actions\/checkout|(?:^|\n)\s+run:\s+(?:node|pnpm)\b|(?:^|[ "'/])(?:apps|packages|scripts)\//mu;
const IDENTITY_PATTERN = /id-token: write/u;
const IDENTITY_GLOBAL_PATTERN = /id-token: write/gu;
const PERMISSION_PATTERN = /permissions:\n {6}id-token: write/u;
const PROTECTED_ENVIRONMENT_PATTERN = /^ {4}environment: npm-production$/mu;
const LONG_LIVED_CREDENTIAL_PATTERN =
  /NODE_AUTH_TOKEN|NPM_CONFIG_USERCONFIG|_authToken|\$\{\{\s*secrets\./u;
const PINNED_NPM_PATTERN =
  /^ {10}NPM_CLI: npm@12\.0\.2$[\s\S]*^ {10}version=\$\(npx --yes "\$NPM_CLI" --version\)$\n^ {10}if \[\[ "\$version" != "\$\{NPM_CLI#npm@\}" \]\]; then$\n^ {12}echo "The trusted publisher requires the pinned npm CLI\." >&2$\n^ {12}exit 1$\n^ {10}fi$/mu;
const OIDC_CONTEXT_PATTERN =
  /^ {10}if \[\[ -z "\$\{ACTIONS_ID_TOKEN_REQUEST_URL:-\}" \\$\n^ {12}\|\| -z "\$\{ACTIONS_ID_TOKEN_REQUEST_TOKEN:-\}" \]\]; then$\n^ {12}echo "The trusted publisher requires GitHub OIDC identity\." >&2$\n^ {12}exit 1$\n^ {10}fi$/mu;
const PUBLISH_COMMAND_PATTERN = /^ {6,}(?!#).*\bpublish\b.*$/gmu;
const TRUSTED_PUBLISH_COMMAND =
  'npx --yes "$NPM_CLI" publish "$TARBALL" --access public --provenance';
const STABLE_VERSION_PATTERN =
  /^ {6}- name: Verify stable package version\n^ {8}run: \|\n[\s\S]*^ {10}version=\$\(jq -er '\.version' apps\/cli\/dist\/package\/package\.json\)$[\s\S]*^ {10}if \[\[ ! "\$version" =~ \^\(0\|\[1-9\]\[0-9\]\*\)\\\.\(0\|\[1-9\]\[0-9\]\*\)\\\.\(0\|\[1-9\]\[0-9\]\*\)\$ \]\]; then$/mu;
const TRANSPORT_PATTERN =
  /package_sha256:[\s\S]*sha256:[\s\S]*size:[\s\S]*Build release archive[\s\S]*sha256sum[\s\S]*Upload verified archive[\s\S]*publish:[\s\S]*needs: build[\s\S]*Download verified archive[\s\S]*Verify transported archive[\s\S]*EXPECTED_PACKAGE_SHA256[\s\S]*EXPECTED_SHA256[\s\S]*EXPECTED_SIZE/u;

/** Verifies isolated exact-byte npm publication for the public CLI. */
export function verifyCliWorkflow(source: string): void {
  const buildIndex = source.indexOf("\n  build:");
  const publishIndex = source.indexOf("\n  publish:");
  assert.ok(
    buildIndex >= 0 && publishIndex > buildIndex,
    "CLI verification and publication must use separate jobs"
  );
  const buildJob = source.slice(buildIndex, publishIndex);
  const publishJob = source.slice(publishIndex);
  assert.doesNotMatch(
    buildJob,
    IDENTITY_PATTERN,
    "CLI verification must not receive npm publishing identity"
  );
  assert.match(
    publishJob,
    PERMISSION_PATTERN,
    "The minimal CLI publish job must own npm publishing identity"
  );
  assert.equal(
    source.match(IDENTITY_GLOBAL_PATTERN)?.length,
    1,
    "Only the minimal CLI publish job may own npm publishing identity"
  );
  assert.doesNotMatch(
    publishJob,
    PUBLISH_CODE_PATTERN,
    "The privileged CLI job must not checkout or execute repository code"
  );
  assert.match(
    source,
    TRANSPORT_PATTERN,
    "CLI publication must transport and reverify the exact built archive"
  );
  assert.match(
    publishJob,
    PROTECTED_ENVIRONMENT_PATTERN,
    "CLI publication must require the protected npm production environment"
  );
  assert.doesNotMatch(
    publishJob,
    LONG_LIVED_CREDENTIAL_PATTERN,
    "CLI publication must not receive a long-lived registry credential"
  );
  assert.match(
    publishJob,
    PINNED_NPM_PATTERN,
    "CLI publication must pin an OIDC-capable npm client"
  );
  assert.match(
    publishJob,
    OIDC_CONTEXT_PATTERN,
    "CLI publication must fail closed without GitHub OIDC identity"
  );
  assert.deepEqual(
    publishJob
      .match(PUBLISH_COMMAND_PATTERN)
      ?.map((command) => command.trim()) ?? [],
    [TRUSTED_PUBLISH_COMMAND],
    "CLI publication must use only the registered npm trusted publisher"
  );
  assert.match(
    buildJob,
    STABLE_VERSION_PATTERN,
    "CLI production publication must reject prerelease versions"
  );
  const downloadIndex = publishJob.indexOf("- name: Download verified archive");
  const verifyIndex = publishJob.indexOf("- name: Verify transported archive");
  const publishStepIndex = publishJob.indexOf("- name: Publish public package");
  assert.ok(
    downloadIndex >= 0 &&
      downloadIndex < verifyIndex &&
      verifyIndex < publishStepIndex,
    "CLI publication must download, verify, then publish"
  );
}
