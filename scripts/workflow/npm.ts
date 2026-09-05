import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  decodeWorkflow,
  exactNeeds,
  executableSource,
  jobSource,
  type WorkflowJob,
} from "#scripts/workflow/decode";

export interface NpmWorkflowContract {
  readonly packageArtifact: string;
  readonly publishSha256: string;
  readonly repository: string;
  readonly verifierArtifact: string;
  readonly workflowPath: string;
}

const DOLLAR = "$";
const DOWNLOAD_ACTION =
  "actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c";
const SETUP_NODE_ACTION =
  "actions/setup-node@820762786026740c76f36085b0efc47a31fe5020";
const UPLOAD_ACTION =
  "actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a";
const FORBIDDEN_CREDENTIAL = /NODE_AUTH_TOKEN|NPM_TOKEN|_authToken/u;
const FORBIDDEN_SOURCE =
  /@base64d|bundle\.dsseEnvelope\.payload|is_exact_provenance\(\)/u;
/** Reports whether both immutable artifacts are replaceable on a rerun. */
function hasRerunnableArtifacts(
  build: WorkflowJob,
  contract: NpmWorkflowContract
) {
  const uploads = build.steps.filter(({ uses }) => uses === UPLOAD_ACTION);
  return (
    uploads.length === 2 &&
    uploads.every(({ with: inputs }) => inputs?.overwrite === true) &&
    [contract.packageArtifact, contract.verifierArtifact].every((name) =>
      uploads.some(({ with: inputs }) => inputs?.name === name)
    )
  );
}

/** Requires exact source fragments inside one owning job. */
function requireSource(
  owner: string,
  source: string,
  fragments: readonly string[]
) {
  for (const fragment of fragments) {
    assert.ok(
      source.includes(fragment),
      `${owner} must include exact source fragment: ${fragment}`
    );
  }
}

/** Verifies the shared trusted npm publication and provenance boundary. */
export function verifyNpmWorkflow(
  source: string,
  contract: NpmWorkflowContract
) {
  assert.doesNotMatch(
    source,
    FORBIDDEN_CREDENTIAL,
    "npm workflow must not contain registry credentials"
  );
  const { defaults, env, jobs, permissions } = decodeWorkflow(source);
  assert.deepEqual(
    permissions,
    {},
    "npm workflow root permissions must be empty"
  );
  assert.equal(
    defaults,
    undefined,
    "npm workflow must not inherit root run defaults"
  );
  assert.equal(
    env,
    undefined,
    "npm workflow must not inherit root environment values"
  );
  const { build, publish, verify } = jobs;
  assert.ok(
    build && publish && verify,
    "npm workflow requires three release jobs"
  );
  assert.equal(
    build.if,
    `github.ref == 'refs/heads/main' && github.repository == '${contract.repository}'`,
    "npm builds must target protected repository main"
  );
  assert.equal(
    publish.environment,
    "npm-production",
    "The publish job must own the protected npm-production environment"
  );
  assert.equal(
    publish.permissions?.["id-token"],
    "write",
    "The publish job must own npm OIDC identity"
  );
  assert.ok(
    exactNeeds(publish, ["build"]),
    "npm publication must consume the verified build job"
  );
  assert.ok(
    exactNeeds(verify, ["build", "publish"]),
    "npm verification must consume build and publication"
  );
  assert.equal(
    verify.environment,
    undefined,
    "npm verification must not use a protected environment"
  );
  assert.deepEqual(
    verify.permissions,
    {},
    "npm verification permissions must remain empty"
  );
  for (const [name, job] of Object.entries(jobs)) {
    if (name !== "build" && name !== "publish") {
      assert.equal(
        job.permissions?.["id-token"],
        undefined,
        `${name} must not receive npm OIDC identity`
      );
    }
  }
  assert.equal(
    build.outputs?.verifier_sha256,
    `${DOLLAR}{{ steps.verifier.outputs.sha256 }}`,
    "The build job must export the exact verifier digest"
  );
  assert.equal(
    build.outputs?.verifier_size,
    `${DOLLAR}{{ steps.verifier.outputs.size }}`,
    "The build job must export the exact verifier size"
  );

  const buildSource = jobSource(build);
  const publishSource = jobSource(publish);
  const verifySource = jobSource(verify);
  requireSource("npm build", buildSource, [
    "pnpm exec esbuild scripts/provenance/main.ts",
    "createRequire(import.meta.url)",
    UPLOAD_ACTION,
    contract.packageArtifact,
    contract.verifierArtifact,
    "provenance.mjs",
  ]);
  requireSource("npm publication", publishSource, [
    DOWNLOAD_ACTION,
    SETUP_NODE_ACTION,
    contract.packageArtifact,
    "EXPECTED_SHA256",
    "EXPECTED_SIZE",
    "NPM_CONFIG_REGISTRY",
    "ACTIONS_ID_TOKEN_REQUEST_URL",
    "ACTIONS_ID_TOKEN_REQUEST_TOKEN",
    "expected_shasum",
    "expected_integrity",
    "npm error code E404",
    "for attempt in {1..5}",
    'npx --yes "$NPM_CLI" publish "$TARBALL"',
    "--ignore-scripts",
    "--provenance",
  ]);
  requireSource("npm verification", verifySource, [
    DOWNLOAD_ACTION,
    SETUP_NODE_ACTION,
    contract.packageArtifact,
    contract.verifierArtifact,
    "EXPECTED_VERIFIER_SHA256",
    "EXPECTED_VERIFIER_SIZE",
    "NPM_CONFIG_REGISTRY",
    "ACTIONS_ID_TOKEN_REQUEST_URL",
    "ACTIONS_ID_TOKEN_REQUEST_TOKEN",
    "npm/v1/attestations/",
    "audit signatures --json",
    "--include-attestations",
    'node "$VERIFIER"',
    `"${contract.workflowPath}"`,
    '"refs/heads/main"',
    '"npm-production"',
    "for attempt in {1..10}",
  ]);
  assert.doesNotMatch(
    source,
    FORBIDDEN_SOURCE,
    "npm provenance must not parse unauthenticated source"
  );
  assert.ok(
    hasRerunnableArtifacts(build, contract),
    "npm build artifacts must be replaceable on rerun"
  );

  for (const [owner, job] of [
    ["publication", publish],
    ["verification", verify],
  ] as const) {
    const setup = job.steps.find(({ uses }) => uses === SETUP_NODE_ACTION);
    assert.equal(
      setup?.with?.["node-version"],
      "24.20.0",
      `npm ${owner} must use the repository Node runtime`
    );
    assert.equal(
      setup?.with?.["package-manager-cache"],
      false,
      `npm ${owner} must disable package-manager caching`
    );
  }

  const publishCommands = publish.steps
    .flatMap(({ run }) => (run === undefined ? [] : [run]))
    .map(executableSource)
    .join("\n");
  assert.ok(
    publishCommands.split('npx --yes "$NPM_CLI" publish "$TARBALL"').length ===
      2,
    "npm publication may execute only one publish command"
  );
  assert.ok(
    !(
      publishSource.includes(contract.verifierArtifact) ||
      publishSource.includes("provenance.mjs") ||
      publishSource.includes("VERIFIER")
    ),
    "npm publication must not receive the verifier artifact"
  );
  assert.ok(
    publish.steps.every(({ uses }) => !uses?.startsWith("actions/checkout@")),
    "npm publication must not checkout repository code"
  );
  const publishSha256 = createHash("sha256")
    .update(JSON.stringify(publish))
    .digest("hex");
  assert.equal(
    publishSha256,
    contract.publishSha256,
    "npm publication must match the exact trusted job"
  );

  const verifyCommands = verify.steps
    .flatMap(({ run }) => (run === undefined ? [] : [run]))
    .map(executableSource)
    .join("\n");
  assert.equal(
    verifyCommands.split('node "$VERIFIER"').length,
    2,
    "npm verification must execute one transported verifier"
  );
  return {
    build,
    buildSource,
    jobs,
    publish,
    publishSource,
    verify,
    verifySource,
  };
}
