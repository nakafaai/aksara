import { Array as Arr, Effect, type HashMap, Option } from "effect";
import { isScalar, parseDocument, type YAMLMap } from "yaml";
import {
  environmentValues,
  mergeEnvironment,
  usesPnpmAlias,
} from "#scripts/workflow/environment";
import {
  ensure,
  mapValue,
  requireMap,
  requireSeq,
  requireText,
  scalarText,
  WorkflowError,
} from "#scripts/workflow/requirement";

const PNPM_COMMAND_PATTERN = /\bpnpm\b/u;
/** Command shapes that replace the pnpm release which package.json selects, through corepack, pnpm, npx, dlx, or npm. */
const PNPM_SELECTOR_PATTERNS = [
  /\bcorepack\s+up\b/u,
  /\bcorepack\s+(?:install\s+--global|prepare|use)\s+pnpm(?:@|\b)/u,
  /\bpnpm\s+env\s+use\b/u,
  /\bpnpm\s+self-update\b/u,
  /\bpnpm@/u,
  /\b(?:npx|dlx)\b[^\n]*\bpnpm\b/u,
  /\bnpm\s+(?:install|i|add)\b[^\n]*\s(?:-g|--global)\b[^\n]*\bpnpm\b/u,
];
const TOOLCHAIN_SETUP_PREFIX = "pnpm/setup@";
/** The reviewed pnpm/setup v3.0.0 commit. A newer release needs a new review. */
export const TOOLCHAIN_SETUP_ACTION =
  "pnpm/setup@fbda4c85fc2e1e08721cd8763afea8f48d60f024";
/** Setup inputs that would replace the toolchain the root package.json owns. */
const PACKAGE_JSON_INPUTS = [
  ["version", "Workflows must derive the pnpm version from package.json"],
  ["runtime", "Workflows must derive the runtime from package.json"],
  ["node-version-file", "Workflows must derive the runtime from package.json"],
  [
    "package-json-file",
    "Workflows must derive the toolchain from the root package.json",
  ],
  [
    "working-directory",
    "Workflows must derive the toolchain from the root package.json",
  ],
] as const;
const LEGACY_PNPM_SETUP_PREFIX = "pnpm/action-setup@";
const NODE_SETUP_PREFIX = "actions/setup-node@";

/** Returns every step mapping declared by one workflow job. */
const jobSteps = Effect.fn("AksaraScripts.workflowJobSteps")(function* (
  job: YAMLMap
) {
  const steps = mapValue(job, "steps");
  if (steps === undefined) {
    return [];
  }

  const sequence = yield* requireSeq(
    steps,
    "Workflow job steps must be a sequence"
  );
  return yield* Effect.forEach(sequence.items, (step) =>
    requireMap(step, "Every workflow step must be a mapping")
  );
});

/** Parses one workflow and every top-level job mapping it owns. */
const parseWorkflow = Effect.fn("AksaraScripts.parseWorkflow")(function* (
  workflow: string
) {
  const document = parseDocument(workflow);
  yield* ensure(
    document.errors.length === 0,
    document.errors[0]?.message ?? "Workflow YAML must parse"
  );
  const root = yield* requireMap(
    document.contents,
    "Workflow must be a mapping"
  );

  const jobs = yield* requireMap(
    mapValue(root, "jobs"),
    "Workflow must define jobs"
  );
  yield* ensure(jobs.items.length > 0, "Workflow must define at least one job");

  const jobMaps = yield* Effect.forEach(jobs.items, (item) =>
    Effect.gen(function* () {
      yield* requireText(item.key, "Workflow job identifiers must be strings");
      return yield* requireMap(
        item.value,
        "Every workflow job must be a mapping"
      );
    })
  );

  return { jobs: jobMaps, root };
});

/** Reports whether one step executes pnpm, directly or through an environment alias. */
const runsPnpm = Effect.fn("AksaraScripts.stepRunsPnpm")(function* (
  step: YAMLMap,
  inheritedEnvironment: HashMap.HashMap<string, string>
) {
  const command = scalarText(mapValue(step, "run"));
  const environment = mergeEnvironment(
    inheritedEnvironment,
    yield* environmentValues(step)
  );
  return (
    command !== undefined &&
    (PNPM_COMMAND_PATTERN.test(command) || usesPnpmAlias(command, environment))
  );
});

/** Returns the first step index that executes pnpm. Every step's environment is read, so a duplicated version is refused in any step. */
const firstPnpmCommand = Effect.fn("AksaraScripts.firstPnpmCommand")(function* (
  steps: readonly YAMLMap[],
  inheritedEnvironment: HashMap.HashMap<string, string>
) {
  const runs = yield* Effect.forEach(steps, (step) =>
    runsPnpm(step, inheritedEnvironment)
  );
  return Arr.findFirstIndex(runs, (run) => run);
});

/** Returns the action input mapping for one setup step. */
const setupInputs = Effect.fn("AksaraScripts.setupInputs")(function* (
  step: YAMLMap
) {
  const inputs = mapValue(step, "with");
  if (inputs === undefined) {
    return yield* new WorkflowError({
      message: "The toolchain setup step must define inputs",
    });
  }

  return yield* requireMap(inputs, "Workflow action inputs must be a mapping");
});

/** Returns one case-insensitive action input value. */
const actionInput = Effect.fn("AksaraScripts.actionInput")(function* (
  inputs: YAMLMap,
  key: string
) {
  const matches = Arr.filter(
    inputs.items,
    (item) => scalarText(item.key)?.toLowerCase() === key
  );
  yield* ensure(
    matches.length <= 1,
    `Workflow action input ${key} must not be duplicated case-insensitively`
  );
  return matches[0]?.value;
});

/** Reports whether one setup action must stop the job when it fails. */
function stopsOnFailure(step: YAMLMap): boolean {
  const value = mapValue(step, "continue-on-error");
  return value === undefined || (isScalar(value) && value.value === false);
}

/** Reports whether one shell command selects or installs a pnpm release by itself. */
function selectsPnpm(command: string): boolean {
  return Arr.some(PNPM_SELECTOR_PATTERNS, (pattern) => pattern.test(command));
}

/** Rejects alternate or legacy toolchain owners. */
const verifyPnpmSelectors = Effect.fn("AksaraScripts.verifyPnpmSelectors")(
  function* (steps: readonly YAMLMap[], hasPnpmCommand: boolean) {
    for (const step of steps) {
      const command = scalarText(mapValue(step, "run"));
      yield* ensure(
        !(command !== undefined && selectsPnpm(command)),
        "Workflows must not replace the package.json-selected pnpm version"
      );

      const uses = scalarText(mapValue(step, "uses")) ?? "";
      yield* ensure(
        !uses.startsWith(LEGACY_PNPM_SETUP_PREFIX),
        "Workflows must not use legacy pnpm/action-setup"
      );
      yield* ensure(
        !(hasPnpmCommand && uses.startsWith(NODE_SETUP_PREFIX)),
        "Workflows must not use a second Node.js setup action"
      );
    }
  }
);

/** Verifies package.json-owned toolchain setup for one pnpm job. */
const verifyPnpmJob = Effect.fn("AksaraScripts.verifyPnpmJob")(function* (
  job: YAMLMap,
  environment: HashMap.HashMap<string, string>
) {
  const steps = yield* jobSteps(job);
  const commandIndex = yield* firstPnpmCommand(steps, environment);
  yield* verifyPnpmSelectors(steps, Option.isSome(commandIndex));
  if (Option.isNone(commandIndex)) {
    return;
  }

  const setups = Arr.flatMap(steps, (step, index) => {
    const uses = scalarText(mapValue(step, "uses"));
    return uses?.startsWith(TOOLCHAIN_SETUP_PREFIX) ? [{ index, step }] : [];
  });
  yield* ensure(
    setups.length === 1,
    "Every pnpm job must set up the toolchain once"
  );
  const setup = yield* Effect.fromOption(Arr.head(setups)).pipe(Effect.orDie);
  yield* ensure(
    setup.index < commandIndex.value,
    "Every pnpm job must set up the toolchain before running pnpm"
  );

  const setupStep = setup.step;
  yield* ensure(
    scalarText(mapValue(setupStep, "uses")) === TOOLCHAIN_SETUP_ACTION,
    "The toolchain setup must use the reviewed pnpm/setup release"
  );
  yield* ensure(
    mapValue(setupStep, "if") === undefined,
    "The toolchain setup step must run unconditionally"
  );
  yield* ensure(
    stopsOnFailure(setupStep),
    "The toolchain setup step must stop on failure"
  );

  const inputs = yield* setupInputs(setupStep);
  for (const [input, message] of PACKAGE_JSON_INPUTS) {
    yield* ensure((yield* actionInput(inputs, input)) === undefined, message);
  }
  const cache = yield* actionInput(inputs, "cache");
  yield* ensure(
    isScalar(cache) && cache.value === true,
    "The toolchain setup must cache the root pnpm store"
  );
  const install = yield* actionInput(inputs, "install");
  yield* ensure(
    isScalar(install) && install.value === false,
    "The toolchain setup must leave the frozen install explicit"
  );
});

/** Verifies package.json-owned runtime and pnpm setup within every pnpm job. */
export const verifyWorkflowToolchains = Effect.fn(
  "AksaraScripts.verifyWorkflowToolchains"
)(function* (workflows: readonly string[]) {
  for (const source of workflows) {
    const workflow = yield* parseWorkflow(source);
    const rootEnvironment = yield* environmentValues(workflow.root);

    for (const job of workflow.jobs) {
      const localEnvironment = yield* environmentValues(job);
      yield* verifyPnpmJob(
        job,
        mergeEnvironment(rootEnvironment, localEnvironment)
      );
    }
  }
});
