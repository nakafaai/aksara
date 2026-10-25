import { Array as Arr, Effect, type HashMap, Option } from "effect";
import { isScalar, parseDocument, type YAMLMap } from "yaml";
import {
  environmentValues,
  mergeEnvironment,
  usesBunAlias,
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

const BUN_COMMAND_PATTERN = /\bbunx?\b/u;
/** Command shapes that replace the Bun release which package.json selects, through bun upgrade, bun@, npx, dlx, or npm. */
const BUN_SELECTOR_PATTERNS = [
  /\bbun\s+upgrade\b/u,
  /\bbun@/u,
  /\b(?:npx|dlx)\b[^\n]*\bbun\b/u,
  /\bnpm\s+(?:install|i|add)\b[^\n]*\s(?:-g|--global)\b[^\n]*\bbun\b/u,
];
const TOOLCHAIN_SETUP_PREFIX = "oven-sh/setup-bun@";
/** The reviewed oven-sh/setup-bun v2.2.0 commit. A newer release needs a new review. */
export const TOOLCHAIN_SETUP_ACTION =
  "oven-sh/setup-bun@0c5077e51419868618aeaa5fe8019c62421857d6";
/** Setup inputs that would replace the Bun release which the root package.json owns. */
const BUN_PACKAGE_JSON_INPUTS = [
  ["bun-version", "Workflows must derive the Bun version from package.json"],
  ["bun-download-url", "Workflows must download Bun only through package.json"],
] as const;
const NODE_SETUP_PREFIX = "actions/setup-node@";
/** The reviewed actions/setup-node v7.1.0 commit that reads the Node.js line from package.json. */
export const NODE_SETUP_ACTION =
  "actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1";
/** Setup inputs that would replace the Node.js line which the root package.json owns. */
const NODE_PACKAGE_JSON_INPUTS = [
  [
    "node-version",
    "Workflows must derive the Node.js version from package.json",
  ],
] as const;
const PNPM_ACTION_PREFIX = "pnpm/";

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

/** Reports whether one step executes Bun, directly or through an environment alias. */
const runsBun = Effect.fn("AksaraScripts.stepRunsBun")(function* (
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
    (BUN_COMMAND_PATTERN.test(command) || usesBunAlias(command, environment))
  );
});

/** Returns the first step index that executes Bun. Every step's environment is read, so a duplicated version is refused in any step. */
const firstBunCommand = Effect.fn("AksaraScripts.firstBunCommand")(function* (
  steps: readonly YAMLMap[],
  inheritedEnvironment: HashMap.HashMap<string, string>
) {
  const runs = yield* Effect.forEach(steps, (step) =>
    runsBun(step, inheritedEnvironment)
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

/** Reports whether one shell command selects or installs a Bun release by itself. */
function selectsBun(command: string): boolean {
  return Arr.some(BUN_SELECTOR_PATTERNS, (pattern) => pattern.test(command));
}

/** Rejects alternate toolchain owners that replace the package.json-selected Bun release. */
const verifyBunSelectors = Effect.fn("AksaraScripts.verifyBunSelectors")(
  function* (steps: readonly YAMLMap[]) {
    for (const step of steps) {
      const command = scalarText(mapValue(step, "run"));
      yield* ensure(
        !(command !== undefined && selectsBun(command)),
        "Workflows must not replace the package.json-selected Bun version"
      );

      const uses = scalarText(mapValue(step, "uses")) ?? "";
      yield* ensure(
        !uses.startsWith(PNPM_ACTION_PREFIX),
        "Workflows must not use pnpm actions"
      );
    }
  }
);

/** Returns the one setup step with one action prefix, which must run before the first Bun command. */
const requireSetup = Effect.fn("AksaraScripts.requireSetup")(function* (
  steps: readonly YAMLMap[],
  prefix: string,
  commandIndex: number,
  countMessage: string,
  orderMessage: string
) {
  const setups = Arr.flatMap(steps, (step, index) => {
    const uses = scalarText(mapValue(step, "uses"));
    return uses?.startsWith(prefix) ? [{ index, step }] : [];
  });
  yield* ensure(setups.length === 1, countMessage);
  const setup = yield* Effect.fromOption(Arr.head(setups)).pipe(Effect.orDie);
  yield* ensure(setup.index < commandIndex, orderMessage);
  return setup.step;
});

/** Verifies package.json-owned Node.js and Bun setup for one job that runs Bun. */
const verifyBunJob = Effect.fn("AksaraScripts.verifyBunJob")(function* (
  job: YAMLMap,
  environment: HashMap.HashMap<string, string>
) {
  const steps = yield* jobSteps(job);
  const commandIndex = yield* firstBunCommand(steps, environment);
  yield* verifyBunSelectors(steps);
  if (Option.isNone(commandIndex)) {
    return;
  }

  const nodeSetup = yield* requireSetup(
    steps,
    NODE_SETUP_PREFIX,
    commandIndex.value,
    "Every Bun job must set up Node.js once",
    "Every Bun job must set up Node.js before running Bun"
  );
  yield* ensure(
    scalarText(mapValue(nodeSetup, "uses")) === NODE_SETUP_ACTION,
    "The Node.js setup must use the reviewed actions/setup-node release"
  );
  yield* ensure(
    mapValue(nodeSetup, "if") === undefined,
    "The Node.js setup step must run unconditionally"
  );
  yield* ensure(
    stopsOnFailure(nodeSetup),
    "The Node.js setup step must stop on failure"
  );
  const nodeInputs = yield* setupInputs(nodeSetup);
  const nodeVersionFile = yield* actionInput(nodeInputs, "node-version-file");
  yield* ensure(
    isScalar(nodeVersionFile) && nodeVersionFile.value === "package.json",
    "Workflows must derive the Node.js version from package.json"
  );
  for (const [input, message] of NODE_PACKAGE_JSON_INPUTS) {
    yield* ensure(
      (yield* actionInput(nodeInputs, input)) === undefined,
      message
    );
  }

  const bunSetup = yield* requireSetup(
    steps,
    TOOLCHAIN_SETUP_PREFIX,
    commandIndex.value,
    "Every Bun job must set up the toolchain once",
    "Every Bun job must set up the toolchain before running Bun"
  );
  yield* ensure(
    scalarText(mapValue(bunSetup, "uses")) === TOOLCHAIN_SETUP_ACTION,
    "The toolchain setup must use the reviewed oven-sh/setup-bun release"
  );
  yield* ensure(
    mapValue(bunSetup, "if") === undefined,
    "The toolchain setup step must run unconditionally"
  );
  yield* ensure(
    stopsOnFailure(bunSetup),
    "The toolchain setup step must stop on failure"
  );

  const inputs = yield* setupInputs(bunSetup);
  const bunVersionFile = yield* actionInput(inputs, "bun-version-file");
  yield* ensure(
    isScalar(bunVersionFile) && bunVersionFile.value === "package.json",
    "Workflows must derive the Bun version from package.json"
  );
  for (const [input, message] of BUN_PACKAGE_JSON_INPUTS) {
    yield* ensure((yield* actionInput(inputs, input)) === undefined, message);
  }
});

/** Verifies package.json-owned runtime and Bun setup within every job that runs Bun. */
export const verifyWorkflowToolchains = Effect.fn(
  "AksaraScripts.verifyWorkflowToolchains"
)(function* (workflows: readonly string[]) {
  for (const source of workflows) {
    const workflow = yield* parseWorkflow(source);
    const rootEnvironment = yield* environmentValues(workflow.root);

    for (const job of workflow.jobs) {
      const localEnvironment = yield* environmentValues(job);
      yield* verifyBunJob(
        job,
        mergeEnvironment(rootEnvironment, localEnvironment)
      );
    }
  }
});
