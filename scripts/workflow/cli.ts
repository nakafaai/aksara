import assert from "node:assert/strict";

const PUBLISH_CODE_PATTERN =
  /actions\/checkout|(?:^|\n)\s+run:\s+(?:node|pnpm)\b|(?:^|[ "'/])(?:apps|packages|scripts)\//mu;
const IDENTITY_PATTERN = /id-token: write/u;
const IDENTITY_GLOBAL_PATTERN = /id-token: write/gu;
const PERMISSION_PATTERN = /permissions:\n {6}id-token: write/u;
const BOOTSTRAP_AUTH_PATTERN =
  /NODE_AUTH_TOKEN: \$\{\{ secrets\.NPM_BOOTSTRAP_TOKEN \}\}[\s\S]*NPM_CONFIG_USERCONFIG:[\s\S]*\/\/registry\.npmjs\.org\/:_authToken=\\\$\{NODE_AUTH_TOKEN\}/u;
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
    BOOTSTRAP_AUTH_PATTERN,
    "The initial CLI publication must configure the bootstrap npm credential"
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
