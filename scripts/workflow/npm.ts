import { digestSha256 } from "@nakafa/aksara-contracts/hash/digest";
import {
  Array as Arr,
  Effect,
  Option,
  pipe,
  Record as Rec,
  Schema,
} from "effect";
import { Hex } from "effect/encoding";
import {
  decodeWorkflow,
  exactNeeds,
  executableSource,
  jobSource,
  type WorkflowJob,
} from "#scripts/workflow/decode";
import { ensure, WorkflowError } from "#scripts/workflow/requirement";

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
  "actions/download-artifact@9000827ccba6bdab643e8b6fd33ac0654aef8333";
const SETUP_NODE_ACTION =
  "actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1";
const UPLOAD_ACTION =
  "actions/upload-artifact@cf430e030ddbb5b0abf93d22962f4752f3646cd9";
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
const requireSource = Effect.fn("AksaraScripts.requireNpmSource")(function* (
  owner: string,
  source: string,
  fragments: readonly string[]
) {
  for (const fragment of fragments) {
    yield* ensure(
      source.includes(fragment),
      `${owner} must include exact source fragment: ${fragment}`
    );
  }
});

/** Requires one deadline-bounded registry wait inside one publication job. */
const requirePublicationWindow = Effect.fn(
  "AksaraScripts.requireNpmPublicationWindow"
)(function* (owner: string, source: string) {
  yield* ensure(
    [...source.matchAll(PUBLICATION_WINDOW_PATTERN)].length === 1,
    `${owner} must allow npm metadata propagation`
  );
  yield* ensure(
    [...source.matchAll(PUBLICATION_DEADLINE_PATTERN)].length === 1,
    `${owner} must bound its npm metadata wait by deadline`
  );
});

/** Hashes the exact JSON text of one trusted publish job. A job that cannot be hashed is refused. */
const publishSha256Of = Effect.fn("AksaraScripts.publishSha256")(
  function* (publish: unknown) {
    const publishJson = yield* Schema.encodeEffect(JsonTextSchema)(publish);
    const digest = yield* digestSha256(new TextEncoder().encode(publishJson));
    return Hex.encode(digest);
  },
  Effect.mapError(
    () => new WorkflowError({ message: "npm publication could not be hashed" })
  )
);

/** Verifies the shared trusted npm publication and provenance boundary. */
export const verifyNpmWorkflow = Effect.fn("AksaraScripts.verifyNpmWorkflow")(
  function* (source: string, contract: NpmWorkflowContract) {
    yield* ensure(
      !FORBIDDEN_CREDENTIAL.test(source),
      "npm workflow must not contain registry credentials"
    );
    const decoded = yield* decodeWorkflow(source);
    const { defaults, env, jobs, permissions } = decoded;
    yield* ensure(
      Rec.isEmptyRecord(permissions),
      "npm workflow root permissions must be empty"
    );
    yield* ensure(
      defaults === undefined,
      "npm workflow must not inherit root run defaults"
    );
    yield* ensure(
      env === undefined,
      "npm workflow must not inherit root environment values"
    );
    const { build, publish, verify } = jobs;
    if (build === undefined || publish === undefined || verify === undefined) {
      return yield* new WorkflowError({
        message: "npm workflow requires three release jobs",
      });
    }
    yield* ensure(
      build.if ===
        `github.ref == 'refs/heads/main' && github.repository == '${contract.repository}'`,
      "npm builds must target protected repository main"
    );
    yield* ensure(
      publish.environment === "npm-production",
      "The publish job must own the protected npm-production environment"
    );
    yield* ensure(
      publish.permissions?.["id-token"] === "write",
      "The publish job must own npm OIDC identity"
    );
    yield* ensure(
      exactNeeds(publish, ["build"]),
      "npm publication must consume the verified build job"
    );
    yield* ensure(
      exactNeeds(verify, ["build", "publish"]),
      "npm verification must consume build and publication"
    );
    yield* ensure(
      verify.environment === undefined,
      "npm verification must not use a protected environment"
    );
    yield* ensure(
      verify.permissions !== undefined && Rec.isEmptyRecord(verify.permissions),
      "npm verification permissions must remain empty"
    );
    for (const [name, job] of Rec.toEntries(jobs)) {
      if (name !== "build" && name !== "publish") {
        yield* ensure(
          job.permissions?.["id-token"] === undefined,
          `${name} must not receive npm OIDC identity`
        );
      }
    }
    yield* ensure(
      build.outputs?.verifier_sha256 ===
        `${DOLLAR}{{ steps.verifier.outputs.sha256 }}`,
      "The build job must export the exact verifier digest"
    );
    yield* ensure(
      build.outputs?.verifier_size ===
        `${DOLLAR}{{ steps.verifier.outputs.size }}`,
      "The build job must export the exact verifier size"
    );

    const buildSource = jobSource(build);
    const publishSource = jobSource(publish);
    const verifySource = jobSource(verify);
    yield* requireSource("npm build", buildSource, [
      "bunx esbuild scripts/provenance/main.ts",
      "createRequire(import.meta.url)",
      UPLOAD_ACTION,
      contract.packageArtifact,
      contract.verifierArtifact,
      "provenance.mjs",
    ]);
    yield* requireSource("npm publication", publishSource, [
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
    yield* requireSource("npm verification", verifySource, [
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
    yield* requirePublicationWindow("npm publication", publishSource);
    yield* requirePublicationWindow("npm verification", verifySource);
    yield* ensure(
      !FORBIDDEN_SOURCE.test(source),
      "npm provenance must not parse unauthenticated source"
    );
    yield* ensure(
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
      yield* ensure(
        setup?.with?.["node-version"] === "24.22.0",
        `npm ${owner} must use the repository Node runtime`
      );
      yield* ensure(
        setup?.with?.["package-manager-cache"] === false,
        `npm ${owner} must disable package-manager caching`
      );
    }

    const publishCommands = pipe(
      publish.steps,
      Arr.flatMap(({ run }) => (run === undefined ? [] : [run])),
      Arr.map(executableSource),
      Arr.join("\n")
    );
    yield* ensure(
      publishCommands.split('npx --yes "$NPM_CLI" publish "$TARBALL"')
        .length === 2,
      "npm publication may execute only one publish command"
    );
    yield* ensure(
      !(
        publishSource.includes(contract.verifierArtifact) ||
        publishSource.includes("provenance.mjs") ||
        publishSource.includes("VERIFIER")
      ),
      "npm publication must not receive the verifier artifact"
    );
    yield* ensure(
      Arr.every(
        publish.steps,
        ({ uses }) => !uses?.startsWith("actions/checkout@")
      ),
      "npm publication must not checkout repository code"
    );
    const publishSha256 = yield* publishSha256Of(publish);
    yield* ensure(
      publishSha256 === contract.publishSha256,
      "npm publication must match the exact trusted job"
    );

    const verifyCommands = pipe(
      verify.steps,
      Arr.flatMap(({ run }) => (run === undefined ? [] : [run])),
      Arr.map(executableSource),
      Arr.join("\n")
    );
    yield* ensure(
      verifyCommands.split('node "$VERIFIER"').length === 2,
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
);
