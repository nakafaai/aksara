import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { posix } from "node:path";
import { Option, Schema } from "effect";
import { parseDocument } from "yaml";
import { trackedFiles } from "#scripts/check/files";
import {
  decodeWorkflow,
  exactNeeds,
  jobSource,
  type WorkflowJob,
} from "#scripts/workflow/decode";

const DOLLAR = "$";
const TRIGGER_PATTERN =
  /^on:\n {2}pull_request:\n(?: {2}#[^\n]*\n)* {2}merge_group:\n {4}branches: \[main\]\n {4}types: \[checks_requested\]\n\npermissions:/mu;
const CHECKS_PATTERN =
  /pnpm lint[\s\S]*pnpm deprecations[\s\S]*pnpm names[\s\S]*pnpm jsdocs[\s\S]*pnpm lines[\s\S]*pnpm points[\s\S]*pnpm workflows[\s\S]*pnpm boundaries[\s\S]*pnpm typecheck[\s\S]*pnpm build/u;
const JOBS = ["checks", "test", "verify"];
const POINTS_STEP = [
  'pnpm points --base "$BASE_SHA"',
  "BASE_SHA",
  `${DOLLAR}{{ github.event.pull_request.base.sha || github.event.merge_group.base_sha }}`,
].join("\n");
const RESULT_SOURCE = [
  'test "$CHECKS" = success && test "$TEST" = success',
  "CHECKS",
  `${DOLLAR}{{ needs.checks.result }}`,
  "TEST",
  `${DOLLAR}{{ needs.test.result }}`,
].join("\n");
const TEST_COMMAND = `${DOLLAR}{{ matrix.command }}`;
const TURBO_COMMAND_PATTERN = /^pnpm exec turbo run .+ --concurrency=1$/u;
const TEST_TASK_PREFIX = "test:";
const TEST_SCRIPT = "test";
const FILTER_PREFIX = "--filter=";
const ROOT_FILTER = "--filter=//";
const MANIFEST_FILE = "package.json";
const WORKSPACE_FILE = "pnpm-workspace.yaml";
const DIRECTORY_GLOB_PATTERN = /^[A-Za-z][\w.-]*(?:\/[A-Za-z][\w.-]*)*\/\*$/u;
const DIRECTORY_GLOB_SUFFIX = "/*";
const WHITESPACE_PATTERN = /\s+/u;

/** The four test groups. They partition every test target, one matrix leg each. */
const TEST_GROUPS: Readonly<Record<string, readonly string[]>> = {
  corpus: [
    "@nakafa/aksara-corpus",
    "@nakafa/aksara-utilities",
    "@nakafa/aksara-compiler",
  ],
  publisher: ["@nakafa/aksara-publisher", "@nakafa/aksara-cli"],
  scripts: ["test:root", "@nakafa/aksara-contracts"],
  voice: ["test:lesson-voice"],
};

const MatrixLegSchema = Schema.Struct({
  command: Schema.String,
  group: Schema.String,
});

const TestStrategySchema = Schema.Struct({
  "fail-fast": Schema.optional(Schema.Boolean),
  matrix: Schema.Struct({
    include: Schema.Array(MatrixLegSchema),
  }),
});

/** Rejects any strategy key beyond these, so an exclude or base matrix key cannot change the legs. */
const decodeTestStrategy = Schema.decodeUnknownOption(TestStrategySchema, {
  onExcessProperty: "error",
});

const ManifestSchema = Schema.Struct({
  name: Schema.String,
  scripts: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});

const WorkspaceSchema = Schema.Struct({
  packages: Schema.Array(Schema.String),
});

/** Returns one CI job that the exact job list already requires. */
function requireJob(
  jobs: Readonly<Record<string, WorkflowJob>>,
  name: string
): WorkflowJob {
  const job = jobs[name];
  assert.ok(job, `CI must define the ${name} job`);
  return job;
}

/** Lists the sorted test targets that one matrix command runs. */
function legTargets(command: string): readonly string[] {
  return command
    .split(WHITESPACE_PATTERN)
    .flatMap((token) => {
      if (token.startsWith(TEST_TASK_PREFIX)) {
        return [token];
      }
      if (token.startsWith(FILTER_PREFIX) && token !== ROOT_FILTER) {
        return [token.slice(FILTER_PREFIX.length)];
      }
      return [];
    })
    .sort();
}

/** Reports whether a matrix command filters packages without the root package, which drops the root test tasks it names. */
function skipsRootTasks(command: string): boolean {
  const tokens = command.split(WHITESPACE_PATTERN);
  return (
    tokens.some((token) => token.startsWith(TEST_TASK_PREFIX)) &&
    tokens.some((token) => token.startsWith(FILTER_PREFIX)) &&
    !tokens.includes(ROOT_FILTER)
  );
}

/** Verifies that the test matrix runs every test target in exactly one group. */
function verifyTestGroups(job: WorkflowJob, targets: readonly string[]): void {
  const strategy = decodeTestStrategy(job.strategy);
  assert.ok(
    Option.isSome(strategy),
    "The test job must run one matrix leg per test group"
  );
  assert.equal(
    strategy.value["fail-fast"],
    false,
    "Test groups must not cancel one another"
  );
  const legs = strategy.value.matrix.include;
  assert.deepEqual(
    legs.map((leg) => leg.group).sort(),
    Object.keys(TEST_GROUPS).sort(),
    "CI must run the four test groups, one matrix leg each"
  );
  for (const leg of legs) {
    assert.match(
      leg.command,
      TURBO_COMMAND_PATTERN,
      "Each CI test group must run through Turbo with --concurrency=1"
    );
  }
  for (const target of targets) {
    const owners = legs.filter((leg) =>
      legTargets(leg.command).includes(target)
    );
    assert.equal(
      owners.length,
      1,
      `Test target ${target} must belong to exactly one CI test group`
    );
  }
  for (const leg of legs) {
    for (const target of legTargets(leg.command)) {
      assert.ok(
        targets.includes(target),
        "CI test groups must name only repository test targets"
      );
    }
  }
  assert.deepEqual(
    Object.fromEntries(legs.map((leg) => [leg.group, legTargets(leg.command)])),
    Object.fromEntries(
      Object.entries(TEST_GROUPS).map(([group, members]) => [
        group,
        [...members].sort(),
      ])
    ),
    "Each CI test group must run exactly its own test targets"
  );
  for (const leg of legs) {
    assert.ok(
      !skipsRootTasks(leg.command),
      "A CI test group that selects root test tasks with package filters must include --filter=//"
    );
  }
  assert.ok(
    job.steps.some((step) => step.run === TEST_COMMAND),
    "Every CI test group must run its own matrix command"
  );
}

/** Verifies that CI runs its checks and test groups in parallel behind one verify job. */
export function verifyCiWorkflow(
  source: string,
  targets: readonly string[]
): void {
  assert.match(
    source,
    TRIGGER_PATTERN,
    "CI must run only for pull requests and merge queue groups"
  );
  const { jobs } = decodeWorkflow(source);
  assert.deepEqual(
    Object.keys(jobs),
    JOBS,
    "CI must run checks and tests in parallel behind one verify job"
  );
  const checks = jobSource(requireJob(jobs, "checks"));
  assert.match(checks, CHECKS_PATTERN, "CI must run every repository gate");
  assert.ok(
    checks.includes(POINTS_STEP),
    "CI must compare lesson visuals with the base of the pull request or merge group"
  );
  verifyTestGroups(requireJob(jobs, "test"), targets);
  const verify = requireJob(jobs, "verify");
  assert.ok(
    exactNeeds(verify, ["checks", "test"]),
    "The verify check must wait for every CI job"
  );
  assert.equal(
    verify.if,
    `${DOLLAR}{{ !cancelled() }}`,
    "The verify check must report when a CI job fails"
  );
  assert.equal(
    jobSource(verify),
    RESULT_SOURCE,
    "The verify check must fail unless every CI job succeeds"
  );
}

/** Lists the test targets that one package manifest declares. */
export function manifestTestTargets(
  path: string,
  source: string
): readonly string[] {
  const manifest = Schema.decodeOption(Schema.fromJsonString(ManifestSchema))(
    source
  );
  assert.ok(Option.isSome(manifest), `${path} must be a package manifest`);
  const scripts = manifest.value.scripts ?? {};
  if (path === MANIFEST_FILE) {
    return Object.keys(scripts).filter((script) =>
      script.startsWith(TEST_TASK_PREFIX)
    );
  }
  return Object.hasOwn(scripts, TEST_SCRIPT) ? [manifest.value.name] : [];
}

/** Lists the directories that the pnpm workspace globs name as `<directory>/*`. */
function workspaceDirectories(workspace: string): readonly string[] {
  const document = parseDocument(workspace);
  assert.equal(
    document.errors.length,
    0,
    "pnpm-workspace.yaml must be valid YAML"
  );
  const decoded = Schema.decodeUnknownOption(WorkspaceSchema)(document.toJS());
  assert.ok(
    Option.isSome(decoded),
    "pnpm-workspace.yaml must declare its packages"
  );
  return decoded.value.packages.map((glob) => {
    assert.match(
      glob,
      DIRECTORY_GLOB_PATTERN,
      `Workspace glob ${glob} must be a plain directory followed by /*, such as apps/*`
    );
    return glob.slice(0, -DIRECTORY_GLOB_SUFFIX.length);
  });
}

/** Reports whether one tracked path is the manifest of a workspace that a glob names. */
function isWorkspaceManifest(
  path: string,
  directories: readonly string[]
): boolean {
  if (posix.basename(path) !== MANIFEST_FILE) {
    return false;
  }
  return directories.includes(posix.dirname(posix.dirname(path)));
}

/** Lists the root manifest and every workspace manifest that the pnpm workspace names. */
export function manifestPaths(
  workspace: string,
  trackedPaths: readonly string[]
): readonly string[] {
  const directories = workspaceDirectories(workspace);
  return trackedPaths.filter(
    (path) => path === MANIFEST_FILE || isWorkspaceManifest(path, directories)
  );
}

/** Lists every test target the repository owns, read from its tracked manifests. */
export function repositoryTestTargets(): readonly string[] {
  return manifestPaths(
    readFileSync(WORKSPACE_FILE, "utf8"),
    trackedFiles()
  ).flatMap((path) => manifestTestTargets(path, readFileSync(path, "utf8")));
}
