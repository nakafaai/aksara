import assert from "node:assert/strict";
import {
  Array as Arr,
  Option,
  Order,
  pipe,
  Record as Rec,
  Schema,
} from "effect";
import {
  decodeWorkflow,
  exactNeeds,
  jobSource,
  type WorkflowJob,
} from "#scripts/workflow/decode";
import { TEST_TASK_PREFIX } from "#scripts/workflow/target";

const DOLLAR = "$";
const TRIGGER_PATTERN =
  /^on:\n {2}pull_request:\n(?: {2}#[^\n]*\n)* {2}merge_group:\n {4}branches: \[main\]\n {4}types: \[checks_requested\]\n\npermissions:/mu;
const CHECKS_PATTERN =
  /pnpm lint[\s\S]*pnpm deprecations[\s\S]*pnpm names[\s\S]*pnpm jsdocs[\s\S]*pnpm lines[\s\S]*pnpm points[\s\S]*pnpm workflows[\s\S]*pnpm boundaries[\s\S]*pnpm typecheck[\s\S]*pnpm build/u;
const JOBS = ["checks", "test", "verify"];
const POINTS_STEP = Arr.join(
  [
    'pnpm points --base "$BASE_SHA"',
    "BASE_SHA",
    `${DOLLAR}{{ github.event.pull_request.base.sha || github.event.merge_group.base_sha }}`,
  ],
  "\n"
);
const RESULT_SOURCE = Arr.join(
  [
    'test "$CHECKS" = success && test "$TEST" = success',
    "CHECKS",
    `${DOLLAR}{{ needs.checks.result }}`,
    "TEST",
    `${DOLLAR}{{ needs.test.result }}`,
  ],
  "\n"
);
const INSTALL_COMMAND = "pnpm install --frozen-lockfile";
const TEST_COMMAND = `${DOLLAR}{{ matrix.command }}`;
// One Turbo run of test tasks and package filters, ending at one concurrent task.
// Shell operators, newlines, dry runs, and other flags never match.
const TURBO_COMMAND_PATTERN =
  /^pnpm exec turbo run (?:(?:test(?::[\w-]+)?|--filter=[\w@/.-]+) )+--concurrency=1$/u;
const FILTER_PREFIX = "--filter=";
const ROOT_FILTER = "--filter=//";
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

/** The only keys the test job may carry, so no key can skip a group or let its failure pass. */
const TEST_JOB_KEYS = ["runs-on", "steps", "strategy", "timeout-minutes"];
/** The only keys each test step may carry, so no step can skip its command or change its shell. */
const TEST_STEP_KEYS = ["name", "run", "uses", "with"];

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
  return pipe(
    command.split(WHITESPACE_PATTERN),
    Arr.flatMap((token) => {
      if (token.startsWith(TEST_TASK_PREFIX)) {
        return [token];
      }
      if (token.startsWith(FILTER_PREFIX) && token !== ROOT_FILTER) {
        return [token.slice(FILTER_PREFIX.length)];
      }
      return [];
    }),
    Arr.sort(Order.String)
  );
}

/** Reports whether a matrix command filters packages without the root package, which drops the root test tasks it names. */
function skipsRootTasks(command: string): boolean {
  const tokens = command.split(WHITESPACE_PATTERN);
  return (
    Arr.some(tokens, (token) => token.startsWith(TEST_TASK_PREFIX)) &&
    Arr.some(tokens, (token) => token.startsWith(FILTER_PREFIX)) &&
    !Arr.contains(tokens, ROOT_FILTER)
  );
}

/** Reports whether every key of one YAML mapping is among the allowed keys. */
function hasOnlyKeys(
  mapping: Readonly<Record<string, unknown>>,
  keys: readonly string[]
): boolean {
  return Arr.every(Rec.keys(mapping), (key) => Arr.contains(keys, key));
}

/** Verifies that the test matrix runs every test target in exactly one group. */
function verifyTestGroups(job: WorkflowJob, targets: readonly string[]): void {
  assert.ok(
    hasOnlyKeys(job, TEST_JOB_KEYS) &&
      Arr.every(job.steps, (step) => hasOnlyKeys(step, TEST_STEP_KEYS)),
    "The test job may carry only the keys that run each test group"
  );
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
    Arr.sort(
      Arr.map(legs, (leg) => leg.group),
      Order.String
    ),
    Arr.sort(Rec.keys(TEST_GROUPS), Order.String),
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
    const owners = Arr.filter(legs, (leg) =>
      Arr.contains(legTargets(leg.command), target)
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
        Arr.contains(targets, target),
        "CI test groups must name only repository test targets"
      );
    }
  }
  assert.deepEqual(
    Rec.fromEntries(
      Arr.map(legs, (leg): readonly [string, readonly string[]] => [
        leg.group,
        legTargets(leg.command),
      ])
    ),
    Rec.fromEntries(
      Arr.map(
        Rec.toEntries(TEST_GROUPS),
        ([group, members]): readonly [string, readonly string[]] => [
          group,
          Arr.sort(members, Order.String),
        ]
      )
    ),
    "Each CI test group must run exactly its own test targets"
  );
  for (const leg of legs) {
    assert.ok(
      !skipsRootTasks(leg.command),
      "A CI test group that selects root test tasks with package filters must include --filter=//"
    );
  }
  assert.deepEqual(
    Arr.flatMap(job.steps, (step) =>
      step.run === undefined ? [] : [step.run]
    ),
    [INSTALL_COMMAND, TEST_COMMAND],
    "Each CI test group must run only its matrix command"
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
    Rec.keys(jobs),
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
