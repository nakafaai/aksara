import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { Array as Arr, Option, pipe, Record as Rec, Schema } from "effect";
import {
  decodeWorkflow,
  exactNeeds,
  executableSource,
  jobSource,
  type WorkflowJob,
} from "#scripts/workflow/decode";

const NpmWorkflowContractSchema = Schema.Struct({
  packageArtifact: Schema.String,
  publishSha256: Schema.String,
  repository: Schema.String,
  verifierArtifact: Schema.String,
  workflowPath: Schema.String,
});

export type NpmWorkflowContract = typeof NpmWorkflowContractSchema.Type;

const DOLLAR = "$";
const DOWNLOAD_ACTION =
  "actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c";
const SETUP_NODE_ACTION =
  "actions/setup-node@820762786026740c76f36085b0efc47a31fe5020";
const UPLOAD_ACTION =
  "actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a";
const JsonTextSchema = Schema.fromJsonString(Schema.Unknown);
const FORBIDDEN_CREDENTIAL = /NODE_AUTH_TOKEN|NPM_TOKEN|_authToken/u;
const FORBIDDEN_SOURCE =
  /@base64d|bundle\.dsseEnvelope\.payload|is_exact_provenance\(\)/u;
const PUBLICATION_WINDOW_PATTERN =
  /PUBLICATION_WINDOW_SECONDS=([3-9][0-9]{2}|[1-9][0-9]{3,})/gu;
const PUBLICATION_DEADLINE_PATTERN =
  /publication_deadline=\$\(\(SECONDS \+ PUBLICATION_WINDOW_SECONDS\)\)[\s\S]{0,400}?"\$SECONDS" -ge "\$publication_deadline"/gu;
/** Reports whether both immutable artifacts are replaceable on a rerun. */
function hasRerunnableArtifacts(
  build: WorkflowJob,
  contract: NpmWorkflowContract
) {
  const uploads = Arr.filter(build.steps, ({ uses }) => uses === UPLOAD_ACTION);
  return (
    uploads.length === 2 &&
    Arr.every(uploads, ({ with: inputs }) => inputs?.overwrite === true) &&
    Arr.every([contract.packageArtifact, contract.verifierArtifact], (name) =>
      Arr.some(uploads, ({ with: inputs }) => inputs?.name === name)
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

/** Requires one deadline-bounded registry wait inside one publication job. */
function requirePublicationWindow(owner: string, source: string) {
  assert.equal(
    [...source.matchAll(PUBLICATION_WINDOW_PATTERN)].length,
    1,
    `${owner} must allow npm metadata propagation`
  );
  assert.equal(
    [...source.matchAll(PUBLICATION_DEADLINE_PATTERN)].length,
    1,
    `${owner} must bound its npm metadata wait by deadline`
  );
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
  for (const [name, job] of Rec.toEntries(jobs)) {
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
    "is_exact_publication",
  ]);
  requirePublicationWindow("npm publication", publishSource);
  requirePublicationWindow("npm verification", verifySource);
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
    const setup = Option.getOrUndefined(
      Arr.findFirst(job.steps, ({ uses }) => uses === SETUP_NODE_ACTION)
    );
    assert.equal(
      setup?.with?.["node-version"],
      "24.21.0",
      `npm ${owner} must use the repository Node runtime`
    );
    assert.equal(
      setup?.with?.["package-manager-cache"],
      false,
      `npm ${owner} must disable package-manager caching`
    );
  }

  const publishCommands = pipe(
    publish.steps,
    Arr.flatMap(({ run }) => (run === undefined ? [] : [run])),
    Arr.map(executableSource),
    Arr.join("\n")
  );
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
    Arr.every(
      publish.steps,
      ({ uses }) => !uses?.startsWith("actions/checkout@")
    ),
    "npm publication must not checkout repository code"
  );
  const publishSha256 = createHash("sha256")
    .update(Schema.encodeSync(JsonTextSchema)(publish))
    .digest("hex");
  assert.equal(
    publishSha256,
    contract.publishSha256,
    "npm publication must match the exact trusted job"
  );

  const verifyCommands = pipe(
    verify.steps,
    Arr.flatMap(({ run }) => (run === undefined ? [] : [run])),
    Arr.map(executableSource),
    Arr.join("\n")
  );
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
