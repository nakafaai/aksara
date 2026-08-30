import assert from "node:assert/strict";
import { Option, Schema } from "effect";
import { parseDocument } from "yaml";

const WorkflowStepSchema = Schema.Struct({
  env: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
  run: Schema.optional(Schema.String),
  uses: Schema.optional(Schema.String),
  with: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
});

const WorkflowJobSchema = Schema.Struct({
  environment: Schema.optional(Schema.String),
  needs: Schema.optional(
    Schema.Union([Schema.String, Schema.Array(Schema.String)])
  ),
  outputs: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  permissions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  steps: Schema.Array(WorkflowStepSchema),
});

const ContractWorkflowSchema = Schema.Struct({
  jobs: Schema.Record(Schema.String, WorkflowJobSchema),
});

type WorkflowJob = Schema.Schema.Type<typeof WorkflowJobSchema>;

const PROVENANCE_ACTION =
  "actions/setup-node@820762786026740c76f36085b0efc47a31fe5020";
const GITHUB_EXPRESSION = "$";
const REQUIRED_BUILD_SOURCE = [
  "pnpm exec esbuild scripts/provenance/main.ts",
  "createRequire(import.meta.url)",
  "actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a",
  "contract-release",
  "provenance.mjs",
] as const;
const REQUIRED_PUBLISH_SOURCE = [
  "actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c",
  PROVENANCE_ACTION,
  "EXPECTED_VERIFIER_SHA256",
  "EXPECTED_VERIFIER_SIZE",
  "audit signatures --json",
  '--include-attestations > "$audit_file"',
  'node "$VERIFIER"',
  '".github/workflows/contracts.yml"',
  '"refs/heads/main"',
  '"npm-production"',
] as const;
const FORBIDDEN_SOURCE = [
  "@base64d",
  "bundle.dsseEnvelope.payload",
  "is_exact_provenance()",
] as const;
const FORBIDDEN_PRIVILEGED_CODE = /\bpnpm\b|\bnode\b|packages\/|scripts\//u;

/** Converts one decoded workflow step into its executable source fields. */
function stepSource(step: Schema.Schema.Type<typeof WorkflowStepSchema>) {
  return [
    step.name,
    step.run,
    step.uses,
    ...Object.entries(step.env ?? {}).flat(),
    ...Object.entries(step.with ?? {}).flat(),
  ]
    .filter((value) => value !== undefined)
    .join("\n");
}

/** Converts every step in one decoded job into bounded source text. */
function jobSource(job: WorkflowJob) {
  return job.steps.map(stepSource).join("\n");
}

/** Decodes exact workflow jobs without trusting comments or sibling jobs. */
function decodeWorkflowJobs(source: string) {
  const document = parseDocument(source);
  assert.equal(
    document.errors.length,
    0,
    document.errors[0]?.message ?? "Contract workflow YAML must parse"
  );
  const decoded = Schema.decodeUnknownOption(ContractWorkflowSchema)(
    document.toJS()
  );
  assert.ok(
    Option.isSome(decoded),
    "Contract workflow must contain decodable jobs"
  );
  return decoded.value.jobs;
}

/** Requires every exact fragment inside one bounded workflow job. */
function requireSource(source: string, fragments: readonly string[]): void {
  for (const fragment of fragments) {
    assert.ok(
      source.includes(fragment),
      `npm provenance must include exact source fragment: ${fragment}`
    );
  }
}

/** Counts exact occurrences of one workflow source fragment. */
function occurrenceCount(source: string, fragment: string) {
  return source.split(fragment).length - 1;
}

/** Verifies certificate-bound npm provenance and privileged-job isolation. */
export function verifyProvenanceWorkflow(source: string): void {
  const { build, publish } = decodeWorkflowJobs(source);
  assert.ok(
    build && publish,
    "Contract publication requires build and publish jobs"
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
  const publishNeeds = publish.needs;
  assert.ok(
    publishNeeds === "build" ||
      (Array.isArray(publishNeeds) && publishNeeds.includes("build")),
    "Contract publication must consume the verified build job"
  );
  assert.equal(
    build.outputs?.verifier_sha256,
    `${GITHUB_EXPRESSION}{{ steps.verifier.outputs.sha256 }}`,
    "The build job must export the exact verifier digest"
  );
  assert.equal(
    build.outputs?.verifier_size,
    `${GITHUB_EXPRESSION}{{ steps.verifier.outputs.size }}`,
    "The build job must export the exact verifier size"
  );

  const buildSource = jobSource(build);
  const publishSource = jobSource(publish);
  requireSource(buildSource, REQUIRED_BUILD_SOURCE);
  requireSource(publishSource, REQUIRED_PUBLISH_SOURCE);
  for (const fragment of FORBIDDEN_SOURCE) {
    assert.ok(
      !source.includes(fragment),
      `npm provenance must not parse unauthenticated source: ${fragment}`
    );
  }

  const setup = publish.steps.find(({ uses }) => uses === PROVENANCE_ACTION);
  assert.equal(
    setup?.with?.["node-version"],
    "24.19.0",
    "The provenance verifier must use the repository Node runtime"
  );
  assert.equal(
    setup?.with?.["package-manager-cache"],
    false,
    "The privileged job must disable package-manager caching"
  );

  const publishCommands = publish.steps
    .flatMap(({ run }) => (run === undefined ? [] : [run]))
    .join("\n");
  assert.equal(
    occurrenceCount(publishCommands, 'node "$VERIFIER"'),
    1,
    "The privileged job must execute only one transported verifier"
  );
  assert.doesNotMatch(
    publishCommands.replace('node "$VERIFIER"', ""),
    FORBIDDEN_PRIVILEGED_CODE,
    "The privileged contract job must not execute other repository code"
  );
  assert.ok(
    publish.steps.every(({ uses }) => !uses?.startsWith("actions/checkout@")),
    "The privileged contract job must not checkout repository code"
  );
}
