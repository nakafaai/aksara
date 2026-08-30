import assert from "node:assert/strict";
import { isMap, isScalar, isSeq, parseDocument, type YAMLMap } from "yaml";

const PNPM_COMMAND_PATTERN = /\bpnpm\b/u;
const PNPM_SELECTOR_PATTERN =
  /\b(?:corepack\s+up\b|corepack\s+(?:install\s+--global|prepare|use)\s+pnpm(?:@|\b)|pnpm\s+env\s+use)\b/u;
const TOOLCHAIN_SETUP_PREFIX = "pnpm/setup@";
const LEGACY_PNPM_SETUP_PREFIX = "pnpm/action-setup@";
const NODE_SETUP_PREFIX = "actions/setup-node@";
const TOOLCHAIN_ENV_NAMES = new Set(["NODE_VERSION", "PNPM_VERSION"]);
const ENVIRONMENT_ALIAS_PATTERNS = [
  /\$\{\{\s*env\.([A-Za-z_][A-Za-z0-9_]*)\s*\}\}/gu,
  /\$(?:\{([A-Za-z_][A-Za-z0-9_]*)\}|([A-Za-z_][A-Za-z0-9_]*))/gu,
] as const;

interface WorkflowDocument {
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
function parseWorkflow(workflow: string): WorkflowDocument {
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

/** Returns environment values declared by one workflow scope. */
function environmentValues(scope: YAMLMap): ReadonlyMap<string, string> {
  const environment = mapValue(scope, "env");
  if (environment === undefined) {
    return new Map();
  }

  assert.ok(isMap(environment), "Workflow environment must be a mapping");

  const values = new Map<string, string>();
  for (const item of environment.items) {
    const name = scalarText(item.key);
    assert.ok(name !== undefined, "Workflow environment names must be strings");
    assert.equal(
      TOOLCHAIN_ENV_NAMES.has(name),
      false,
      "Workflows must not duplicate Node or pnpm versions"
    );

    const value = scalarText(item.value);
    if (value !== undefined) {
      values.set(name, value);
    }
  }

  return values;
}

/** Merges inherited and local workflow environment values. */
function mergeEnvironment(
  inherited: ReadonlyMap<string, string>,
  local: ReadonlyMap<string, string>
): ReadonlyMap<string, string> {
  return new Map([...inherited, ...local]);
}

/** Reports whether one shell command executes pnpm through an environment alias. */
function usesPnpmAlias(
  command: string,
  environment: ReadonlyMap<string, string>
): boolean {
  for (const pattern of ENVIRONMENT_ALIAS_PATTERNS) {
    for (const match of command.matchAll(pattern)) {
      const name = match[1] ?? match[2];
      if (name !== undefined && environment.get(name) === "pnpm") {
        return true;
      }
    }
  }

  return false;
}

/** Returns the first step index that executes pnpm. */
function firstPnpmCommand(
  steps: readonly YAMLMap[],
  inheritedEnvironment: ReadonlyMap<string, string>
): number {
  return steps.findIndex((step) => {
    const command = scalarText(mapValue(step, "run"));
    const environment = mergeEnvironment(
      inheritedEnvironment,
      environmentValues(step)
    );
    return (
      command !== undefined &&
      (PNPM_COMMAND_PATTERN.test(command) ||
        usesPnpmAlias(command, environment))
    );
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

/** Returns one case-insensitive action input value. */
function actionInput(inputs: YAMLMap, key: string): unknown {
  const matches = inputs.items.filter(
    (item) => scalarText(item.key)?.toLowerCase() === key
  );
  assert.ok(
    matches.length <= 1,
    `Workflow action input ${key} must not be duplicated case-insensitively`
  );
  return matches[0]?.value;
}

/** Reports whether one setup action must stop the job when it fails. */
function stopsOnFailure(step: YAMLMap): boolean {
  const value = mapValue(step, "continue-on-error");
  return value === undefined || (isScalar(value) && value.value === false);
}

/** Rejects alternate or legacy toolchain owners. */
function verifyPnpmSelectors(
  steps: readonly YAMLMap[],
  hasPnpmCommand: boolean
): void {
  for (const step of steps) {
    const command = scalarText(mapValue(step, "run"));
    assert.equal(
      command !== undefined && PNPM_SELECTOR_PATTERN.test(command),
      false,
      "Workflows must not replace the package.json-selected pnpm version"
    );

    const uses = scalarText(mapValue(step, "uses")) ?? "";
    assert.equal(
      uses.startsWith(LEGACY_PNPM_SETUP_PREFIX),
      false,
      "Workflows must not use legacy pnpm/action-setup"
    );
    assert.equal(
      hasPnpmCommand && uses.startsWith(NODE_SETUP_PREFIX),
      false,
      "Workflows must not use a second Node.js setup action"
    );
  }
}

/** Verifies package.json-owned toolchain setup for one pnpm job. */
function verifyPnpmJob(
  job: YAMLMap,
  environment: ReadonlyMap<string, string>
): void {
  const steps = jobSteps(job);
  const commandIndex = firstPnpmCommand(steps, environment);
  verifyPnpmSelectors(steps, commandIndex !== -1);
  if (commandIndex === -1) {
    return;
  }

  const setupSteps = steps.flatMap((step, index) => {
    const uses = scalarText(mapValue(step, "uses"));
    return uses?.startsWith(TOOLCHAIN_SETUP_PREFIX) ? [index] : [];
  });
  assert.equal(
    setupSteps.length,
    1,
    "Every pnpm job must set up the toolchain once"
  );

  const [setupIndex] = setupSteps;
  assert.ok(setupIndex !== undefined, "The toolchain setup step must exist");
  assert.ok(
    setupIndex < commandIndex,
    "Every pnpm job must set up the toolchain before running pnpm"
  );

  const setupStep = steps[setupIndex];
  assert.ok(setupStep, "The toolchain setup step must exist");
  assert.equal(
    mapValue(setupStep, "if"),
    undefined,
    "The toolchain setup step must run unconditionally"
  );
  assert.ok(
    stopsOnFailure(setupStep),
    "The toolchain setup step must stop on failure"
  );

  const inputs = setupInputs(setupStep);
  assert.ok(inputs, "The toolchain setup step must define inputs");
  assert.equal(
    actionInput(inputs, "version"),
    undefined,
    "Workflows must derive the pnpm version from package.json"
  );
  assert.equal(
    actionInput(inputs, "runtime"),
    undefined,
    "Workflows must derive the runtime from package.json"
  );
  assert.equal(
    actionInput(inputs, "package-json-file"),
    undefined,
    "Workflows must derive the toolchain from the root package.json"
  );
  const cache = actionInput(inputs, "cache");
  assert.ok(
    isScalar(cache) && cache.value === true,
    "The toolchain setup must cache the root pnpm store"
  );
  const install = actionInput(inputs, "install");
  assert.ok(
    isScalar(install) && install.value === false,
    "The toolchain setup must leave the frozen install explicit"
  );
}

/** Verifies package.json-owned runtime and pnpm setup within every pnpm job. */
export function verifyWorkflowToolchains(workflows: readonly string[]): void {
  for (const source of workflows) {
    const workflow = parseWorkflow(source);
    const rootEnvironment = environmentValues(workflow.root);

    for (const job of workflow.jobs) {
      const jobEnvironment = mergeEnvironment(
        rootEnvironment,
        environmentValues(job)
      );
      verifyPnpmJob(job, jobEnvironment);
    }
  }
}
