import assert from "node:assert/strict";

const TOOLCHAIN_ENV_PATTERN = /\b(?:NODE_VERSION|PNPM_VERSION):/u;
const PNPM_SETUP_PATTERN =
  /^ {6}- name: Setup pnpm\n^ {8}uses: pnpm\/action-setup@[^\n]+(?:\n^ {8}with:\n(?:^ {10}[^\n]+\n?)*)?/gmu;
const NODE_SETUP_PATTERN =
  /^ {6}- name: Setup Node\.js\n^ {8}uses: actions\/setup-node@[^\n]+\n^ {8}with:\n(?:^ {10}[^\n]+\n)*?^ {10}node-version-file: package\.json$/gmu;
const INLINE_PNPM_VERSION_PATTERN = /^ {10}version:/mu;
const PNPM_COMMAND_PATTERN = /\bpnpm\b/u;
const JOB_PATTERN = /^ {2}[a-z0-9_-]+:\n/gmu;

/** Returns each top-level job body from one GitHub Actions workflow. */
function workflowJobs(workflow: string): readonly string[] {
  const jobsStart = workflow.indexOf("\njobs:\n");
  assert.notEqual(jobsStart, -1, "Workflow must define jobs");
  const jobsSource = workflow.slice(jobsStart + "\njobs:\n".length);
  const starts = [...jobsSource.matchAll(JOB_PATTERN)].map((match) => {
    assert.notEqual(match.index, undefined, "Workflow job must have an offset");
    return match.index;
  });

  return starts.map((start, index) =>
    jobsSource.slice(start, starts[index + 1] ?? jobsSource.length)
  );
}

/** Verifies package.json-owned Node and pnpm setup within every pnpm job. */
export function verifyWorkflowToolchains(workflows: readonly string[]): void {
  assert.doesNotMatch(
    workflows.join("\n"),
    TOOLCHAIN_ENV_PATTERN,
    "Workflows must not duplicate Node or pnpm versions"
  );

  for (const workflow of workflows) {
    for (const job of workflowJobs(workflow)) {
      if (!PNPM_COMMAND_PATTERN.test(job)) {
        continue;
      }
      const pnpmSetups = [...job.matchAll(PNPM_SETUP_PATTERN)];
      const nodeSetups = [...job.matchAll(NODE_SETUP_PATTERN)];
      assert.equal(
        pnpmSetups.length,
        1,
        "Every pnpm job must set up pnpm once"
      );
      assert.equal(
        nodeSetups.length,
        1,
        "Every pnpm job must read the Node version from package.json"
      );
      const [pnpmSetup] = pnpmSetups;
      assert.ok(pnpmSetup, "Every pnpm job must expose its setup block");
      assert.doesNotMatch(
        pnpmSetup[0],
        INLINE_PNPM_VERSION_PATTERN,
        "Workflows must derive the pnpm version from package.json"
      );
    }
  }
}
