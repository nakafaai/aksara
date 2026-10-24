import { Array as Arr } from "effect";
import {
  NODE_SETUP_ACTION,
  TOOLCHAIN_SETUP_ACTION,
} from "#scripts/workflow/toolchain";

/** The Node.js setup step that toolchain tests append to or replace in the checked-in workflow. */
export const NODE_SETUP_STEP = `      - name: Setup Node.js
        uses: ${NODE_SETUP_ACTION} # v7.1.0
        with:
          node-version-file: package.json`;

/** The Bun setup step header, without its inputs, that the input-shape tests replace. */
export const BUN_SETUP_HEADER = `      - name: Setup Bun
        uses: ${TOOLCHAIN_SETUP_ACTION} # v2.2.0`;

/** The Bun setup step that toolchain tests append to or replace in the checked-in workflow. */
export const BUN_SETUP_STEP = `${BUN_SETUP_HEADER}
        with:
          bun-version-file: package.json`;

/** The complete toolchain: the Node.js setup and the Bun setup, in the order the policy requires. */
export const TOOLCHAIN_STEP = `${NODE_SETUP_STEP}\n\n${BUN_SETUP_STEP}`;

/** A job whose environment overrides the workflow Bun value with npm, so its install step runs npm. */
export const NPM_JOB_ENV = Arr.join(
  [
    "env:",
    "  PM: bun",
    "jobs:",
    "  install:",
    "    env:",
    "      PM: npm",
    "    steps:",
    "      - run: $PM install",
  ],
  "\n"
);

/** A job whose environment overrides the workflow npm value with Bun, so its install step runs Bun. */
export const BUN_JOB_ENV = Arr.join(
  [
    "env:",
    "  PM: npm",
    "jobs:",
    "  install:",
    "    env:",
    "      PM: bun",
    "    steps:",
    "      - run: $PM install",
  ],
  "\n"
);

/** Workflow sources that the structure policy rejects, each with the message it must report. */
export const INVALID_WORKFLOW_STRUCTURES: [string, string][] = [
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

/** Bun setup inputs that the policy rejects in any letter case, each with the message it must report. */
export const BUN_INPUT_CASES: [string, string][] = [
  [
    "bun-version: 1.4.4",
    "Workflows must derive the Bun version from package.json",
  ],
  [
    "BUN-DOWNLOAD-URL: https://example.com/bun.zip",
    "Workflows must download Bun only through package.json",
  ],
];

/** Node.js setup inputs that the policy rejects in any letter case, each with the message it must report. */
export const NODE_INPUT_CASES: [string, string][] = [
  [
    "node-version: 24",
    "Workflows must derive the Node.js version from package.json",
  ],
];

/** Commands that replace the Bun version which package.json selects, through bunx, npx, dlx, npm, or bun itself. */
export const REPLACEMENT_COMMANDS = [
  "bunx bun@1.4.5 --version",
  "npx bun@1 --version",
  "npx --yes bun@1.4.5 install",
  "dlx bun --version",
  "npm install -g bun@1",
  "npm install --global bun",
  "bun upgrade",
];

/** Returns the checked-in workflow with each invalid setup input that the policy must reject. */
export function setupInputVariants(workflow: string) {
  return {
    alternateManifest: workflow.replace(
      "          bun-version-file: package.json",
      "          bun-version-file: test/package.json"
    ),
    inlineBun: workflow.replace(
      "          bun-version-file: package.json",
      "          bun-version: 1.4.4\n          bun-version-file: package.json"
    ),
    inlineNode: workflow.replace(
      "          node-version-file: package.json",
      "          node-version: 24\n          node-version-file: package.json"
    ),
    missingBunVersionFile: workflow.replace(
      "          bun-version-file: package.json",
      "          registry-url: https://registry.npmjs.org"
    ),
    noBunInputs: workflow.replace(BUN_SETUP_STEP, BUN_SETUP_HEADER),
  };
}
