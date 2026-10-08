import { Array as Arr } from "effect";
import { TOOLCHAIN_SETUP_ACTION } from "#scripts/workflow/toolchain";

/** The setup step header that toolchain tests append to or replace in the checked-in workflow. */
export const SETUP_HEADER = `      - name: Setup toolchain
        uses: ${TOOLCHAIN_SETUP_ACTION} # v3.0.0`;

/** A complete setup step with the cache input and the explicit frozen install the policy requires. */
export const TOOLCHAIN_STEP = `${SETUP_HEADER}
        with:
          cache: true
          install: false`;

/** A job whose environment overrides the workflow pnpm value with npm, so its install step runs npm. */
export const NPM_JOB_ENV = Arr.join(
  [
    "env:",
    "  PM: pnpm",
    "jobs:",
    "  install:",
    "    env:",
    "      PM: npm",
    "    steps:",
    "      - run: $PM install",
  ],
  "\n"
);

/** A job whose environment overrides the workflow npm value with pnpm, so its install step runs pnpm. */
export const PNPM_JOB_ENV = Arr.join(
  [
    "env:",
    "  PM: npm",
    "jobs:",
    "  install:",
    "    env:",
    "      PM: pnpm",
    "    steps:",
    "      - run: $PM install",
  ],
  "\n"
);

/** Workflow sources that the structure policy rejects, each with the message it must report. */
export const INVALID_WORKFLOW_STRUCTURES: [string, string | undefined][] = [
  ["jobs: [", undefined],
  ["name: Empty", "Workflow must define jobs"],
  ["jobs: {}", "Workflow must define at least one job"],
  ["jobs:\n  verify: []", "Every workflow job must be a mapping"],
  ["jobs:\n  ? [invalid]\n  : {}", "Workflow job identifiers must be strings"],
  ["jobs:\n  verify:\n    steps: {}", "Workflow job steps must be a sequence"],
  [
    "jobs:\n  verify:\n    steps:\n      - invalid",
    "Every workflow step must be a mapping",
  ],
];

/** Pnpm inputs that the setup policy rejects in any letter case, each with the message it must report. */
export const PNPM_INPUT_CASES: [string, string][] = [
  ["VERSION: 11", "Workflows must derive the pnpm version from package.json"],
  ["RUNTIME: node@24", "Workflows must derive the runtime from package.json"],
  [
    "NODE-VERSION-FILE: .nvmrc",
    "Workflows must derive the runtime from package.json",
  ],
  [
    "PACKAGE-JSON-FILE: other/package.json",
    "Workflows must derive the toolchain from the root package.json",
  ],
  [
    "working-directory: packages/contracts",
    "Workflows must derive the toolchain from the root package.json",
  ],
  [
    "WORKING-DIRECTORY: packages/contracts",
    "Workflows must derive the toolchain from the root package.json",
  ],
];

/** Commands that replace the pnpm version which package.json selects. */
export const REPLACEMENT_COMMANDS = [
  "corepack use pnpm@10",
  "corepack up",
  "corepack use pnpm",
];

/** Returns the checked-in workflow with each invalid setup input that the policy must reject. */
export function setupInputVariants(ci: string) {
  return {
    alternateManifest: ci.replace(
      "          cache: true",
      "          package-json-file: test/package.json\n          cache: true"
    ),
    hiddenInstall: ci.replace(
      "          install: false",
      "          install: true"
    ),
    inlinePnpm: ci.replace(
      "          cache: true",
      "          version: 11.20.0\n          cache: true"
    ),
    inlineRuntime: ci.replace(
      "          cache: true",
      "          runtime: node@24.20.0\n          cache: true"
    ),
    noCache: ci.replace("          cache: true", "          cache: false"),
    noInputs: ci.replace(`${TOOLCHAIN_STEP}\n`, `${SETUP_HEADER}\n`),
  };
}
