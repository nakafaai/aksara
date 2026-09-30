import assert from "node:assert/strict";
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
  /pnpm lint[\s\S]*pnpm deprecations[\s\S]*pnpm names[\s\S]*pnpm jsdocs[\s\S]*pnpm lines[\s\S]*pnpm workflows[\s\S]*pnpm boundaries[\s\S]*pnpm typecheck[\s\S]*pnpm build/u;
const TEST_PATTERN = /^pnpm test$/mu;
const JOBS = ["checks", "test", "verify"];
const RESULT_SOURCE = [
  'test "$CHECKS" = success && test "$TEST" = success',
  "CHECKS",
  `${DOLLAR}{{ needs.checks.result }}`,
  "TEST",
  `${DOLLAR}{{ needs.test.result }}`,
].join("\n");

/** Returns one CI job that the exact job list already requires. */
function requireJob(
  jobs: Readonly<Record<string, WorkflowJob>>,
  name: string
): WorkflowJob {
  const job = jobs[name];
  assert.ok(job, `CI must define the ${name} job`);
  return job;
}

/** Verifies that CI runs its checks and tests in parallel behind `verify`. */
export function verifyCiWorkflow(source: string): void {
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
  assert.match(
    jobSource(requireJob(jobs, "checks")),
    CHECKS_PATTERN,
    "CI must run every repository gate"
  );
  assert.match(
    jobSource(requireJob(jobs, "test")),
    TEST_PATTERN,
    "CI must run every workspace test"
  );
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
