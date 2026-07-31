import assert from "node:assert/strict";
import { isMap, isScalar, isSeq, parseDocument, type YAMLMap } from "yaml";

const PNPM_COMMAND_PATTERN = /\bpnpm\b/u;
const PNPM_SETUP_PREFIX = "pnpm/action-setup@";
const NODE_SETUP_PREFIX = "actions/setup-node@";
const TOOLCHAIN_ENV_NAMES = new Set(["NODE_VERSION", "PNPM_VERSION"]);

interface WorkflowStructure {
  readonly jobs: readonly YAMLMap[];
  readonly root: YAMLMap;
}

/** Returns a string scalar or `undefined` for another YAML node kind. */
function scalarText(node: unknown): string | undefined {
  if (!isScalar(node) || typeof node.value !== "string") {
    return;
  }

  return node.value;
}

/** Returns one named value from a YAML mapping. */
function mapValue(map: YAMLMap, key: string): unknown {
  for (const item of map.items) {
    if (scalarText(item.key) === key) {
      return item.value;
    }
  }
}

/** Returns every step mapping declared by one workflow job. */
function jobSteps(job: YAMLMap): readonly YAMLMap[] {
  const steps = mapValue(job, "steps");
  if (steps === undefined) {
    return [];
  }

  assert.ok(isSeq(steps), "Workflow job steps must be a sequence");

  return steps.items.map((step) => {
    assert.ok(isMap(step), "Every workflow step must be a mapping");
    return step;
  });
}

/** Parses one workflow and every top-level job mapping it owns. */
function parseWorkflow(workflow: string): WorkflowStructure {
  const document = parseDocument(workflow);
  assert.equal(
    document.errors.length,
    0,
    document.errors[0]?.message ?? "Workflow YAML must parse"
  );
  assert.ok(isMap(document.contents), "Workflow must be a mapping");

  const jobs = mapValue(document.contents, "jobs");
  assert.ok(isMap(jobs), "Workflow must define jobs");
  assert.ok(jobs.items.length > 0, "Workflow must define at least one job");

  const jobMaps = jobs.items.map((item) => {
    assert.ok(
      scalarText(item.key) !== undefined,
      "Workflow job identifiers must be strings"
    );
    assert.ok(isMap(item.value), "Every workflow job must be a mapping");
    return item.value;
  });

  return { jobs: jobMaps, root: document.contents };
}

/** Returns each step index whose action reference starts with `prefix`. */
function setupIndexes(
  steps: readonly YAMLMap[],
  prefix: string
): readonly number[] {
  return steps.flatMap((step, index) => {
    const uses = scalarText(mapValue(step, "uses"));
    return uses?.startsWith(prefix) ? [index] : [];
  });
}

/** Returns the first step index that executes pnpm. */
function firstPnpmCommand(steps: readonly YAMLMap[]): number {
  return steps.findIndex((step) => {
    const command = scalarText(mapValue(step, "run"));
    return command !== undefined && PNPM_COMMAND_PATTERN.test(command);
  });
}

/** Returns the action input mapping for one setup step. */
function setupInputs(step: YAMLMap): YAMLMap | undefined {
  const inputs = mapValue(step, "with");
  if (inputs === undefined) {
    return;
  }

  assert.ok(isMap(inputs), "Workflow action inputs must be a mapping");
  return inputs;
}

/** Rejects toolchain versions duplicated in one workflow environment scope. */
function verifyEnvironment(scope: YAMLMap): void {
  const environment = mapValue(scope, "env");
  if (environment === undefined) {
    return;
  }

  assert.ok(isMap(environment), "Workflow environment must be a mapping");

  for (const item of environment.items) {
    const name = scalarText(item.key);
    assert.ok(name !== undefined, "Workflow environment names must be strings");
    assert.equal(
      TOOLCHAIN_ENV_NAMES.has(name),
      false,
      "Workflows must not duplicate Node or pnpm versions"
    );
  }
}

/** Verifies package.json-owned toolchain setup for one pnpm job. */
function verifyPnpmJob(job: YAMLMap): void {
  const steps = jobSteps(job);
  const commandIndex = firstPnpmCommand(steps);
  if (commandIndex === -1) {
    return;
  }

  const pnpmSetups = setupIndexes(steps, PNPM_SETUP_PREFIX);
  const nodeSetups = setupIndexes(steps, NODE_SETUP_PREFIX);
  assert.equal(pnpmSetups.length, 1, "Every pnpm job must set up pnpm once");
  assert.equal(nodeSetups.length, 1, "Every pnpm job must set up Node.js once");

  const [pnpmIndex] = pnpmSetups;
  const [nodeIndex] = nodeSetups;
  assert.ok(pnpmIndex !== undefined, "The pnpm setup step must exist");
  assert.ok(nodeIndex !== undefined, "The Node.js setup step must exist");
  assert.ok(
    pnpmIndex < nodeIndex && nodeIndex < commandIndex,
    "Every pnpm job must set up pnpm, then Node.js, before running pnpm"
  );

  const pnpmStep = steps[pnpmIndex];
  const nodeStep = steps[nodeIndex];
  assert.ok(pnpmStep, "The pnpm setup step must exist");
  assert.ok(nodeStep, "The Node.js setup step must exist");
  assert.equal(
    mapValue(pnpmStep, "if"),
    undefined,
    "The pnpm setup step must run unconditionally"
  );
  assert.equal(
    mapValue(nodeStep, "if"),
    undefined,
    "The Node.js setup step must run unconditionally"
  );

  const pnpmInputs = setupInputs(pnpmStep);
  assert.equal(
    pnpmInputs?.has("version") ?? false,
    false,
    "Workflows must derive the pnpm version from package.json"
  );
  assert.equal(
    pnpmInputs?.has("package_json_file") ?? false,
    false,
    "Workflows must derive pnpm from the root package.json"
  );

  const nodeInputs = setupInputs(nodeStep);
  assert.ok(nodeInputs, "The Node.js setup step must define inputs");
  assert.equal(
    scalarText(mapValue(nodeInputs, "node-version-file")),
    "package.json",
    "Every pnpm job must read the Node version from package.json"
  );
  assert.equal(
    nodeInputs.has("node-version"),
    false,
    "The Node.js setup must not override node-version-file"
  );
}

/** Verifies package.json-owned Node and pnpm setup within every pnpm job. */
export function verifyWorkflowToolchains(workflows: readonly string[]): void {
  for (const source of workflows) {
    const workflow = parseWorkflow(source);
    verifyEnvironment(workflow.root);

    for (const job of workflow.jobs) {
      verifyEnvironment(job);
      for (const step of jobSteps(job)) {
        verifyEnvironment(step);
      }
      verifyPnpmJob(job);
    }
  }
}
