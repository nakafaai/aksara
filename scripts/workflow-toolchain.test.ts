import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { verifyWorkflowToolchains } from "#scripts/workflow-toolchain";

const ci = readFileSync(".github/workflows/ci.yml", "utf8");
const contracts = readFileSync(".github/workflows/contracts.yml", "utf8");
const release = readFileSync(".github/workflows/release.yml", "utf8");
const sources = [ci, contracts, release];
const PNPM_STEP = `      - name: Setup pnpm
        uses: pnpm/action-setup@0ebf47130e4866e96fce0953f49152a61190b271 # v6.0.9`;
const NODE_STEP = `      - name: Setup Node.js
        uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7.0.0
        with:
          node-version-file: package.json
          cache: "pnpm"`;
const SETUP_PAIR = `${PNPM_STEP}

${NODE_STEP}`;

describe("workflow toolchain policy", () => {
  it("accepts package.json-owned toolchains and every YAML job identifier", () => {
    const quotedUppercaseJob = ci.replace("  verify:\n", '  "Verify_Main":\n');

    expect(() => verifyWorkflowToolchains(sources)).not.toThrow();
    expect(() => verifyWorkflowToolchains([quotedUppercaseJob])).not.toThrow();
  });

  it("rejects invalid workflow and job structures", () => {
    expect(() => verifyWorkflowToolchains(["jobs: ["])).toThrow();
    expect(() => verifyWorkflowToolchains(["name: Empty"])).toThrow(
      "Workflow must define jobs"
    );
    expect(() => verifyWorkflowToolchains(["jobs: {}"])).toThrow(
      "Workflow must define at least one job"
    );
    expect(() => verifyWorkflowToolchains(["jobs:\n  verify: []"])).toThrow(
      "Every workflow job must be a mapping"
    );
    expect(() =>
      verifyWorkflowToolchains(["jobs:\n  ? [invalid]\n  : {}"])
    ).toThrow("Workflow job identifiers must be strings");
    expect(() =>
      verifyWorkflowToolchains(["jobs:\n  verify:\n    steps: {}"])
    ).toThrow("Workflow job steps must be a sequence");
    expect(() =>
      verifyWorkflowToolchains([
        "jobs:\n  verify:\n    steps:\n      - invalid",
      ])
    ).toThrow("Every workflow step must be a mapping");
  });

  it("ignores jobs that do not execute pnpm", () => {
    expect(() =>
      verifyWorkflowToolchains([
        "jobs:\n  reusable:\n    uses: nakafaai/workflows/.github/workflows/check.yml@main",
      ])
    ).not.toThrow();
  });

  it("rejects duplicated environment versions at every workflow scope", () => {
    const workflowEnvironment = ci.replace(
      "permissions:\n",
      "env:\n  NODE_VERSION: 24\n\npermissions:\n"
    );
    expect(() => verifyWorkflowToolchains([workflowEnvironment])).toThrow(
      "Workflows must not duplicate Node or pnpm versions"
    );

    const jobEnvironment = ci.replace(
      "  verify:\n",
      '  verify:\n    env: { "PNPM_VERSION" : 11.15.1 }\n'
    );
    expect(() => verifyWorkflowToolchains([jobEnvironment])).toThrow(
      "Workflows must not duplicate Node or pnpm versions"
    );

    const stepEnvironment = ci.replace(
      "      - name: Install dependencies",
      '      - name: Install dependencies\n        env:\n          "NODE_VERSION" : 24'
    );
    expect(() => verifyWorkflowToolchains([stepEnvironment])).toThrow(
      "Workflows must not duplicate Node or pnpm versions"
    );
  });

  it("requires one pnpm and Node.js setup in every pnpm job", () => {
    const missingSetups = ci.replace(`${SETUP_PAIR}\n\n`, "");
    expect(() => verifyWorkflowToolchains([missingSetups])).toThrow(
      "Every pnpm job must set up pnpm once"
    );

    const missingNode = ci.replace(`${NODE_STEP}\n\n`, "");
    expect(() => verifyWorkflowToolchains([missingNode])).toThrow(
      "Every pnpm job must set up Node.js once"
    );

    const duplicatedPnpm = ci.replace(
      NODE_STEP,
      `${PNPM_STEP}\n\n${NODE_STEP}`
    );
    expect(() => verifyWorkflowToolchains([duplicatedPnpm])).toThrow(
      "Every pnpm job must set up pnpm once"
    );

    const duplicatedNode = ci.replace(
      "      - name: Install dependencies",
      `${NODE_STEP}\n\n      - name: Install dependencies`
    );
    expect(() => verifyWorkflowToolchains([duplicatedNode])).toThrow(
      "Every pnpm job must set up Node.js once"
    );
  });

  it("detects pnpm invoked through a workflow environment alias", () => {
    const aliasedPnpm = ci
      .replace("  verify:\n", "  verify:\n    env:\n      PM: pnpm\n")
      .replace("run: pnpm install", "run: $PM install");
    const actionsAlias = aliasedPnpm.replace(
      "run: $PM install",
      ["run: $", "{{ env.PM }} install"].join("")
    );
    const numericEnvironment = ci.replace(
      "  verify:\n",
      "  verify:\n    env:\n      RETRIES: 3\n"
    );

    expect(() => verifyWorkflowToolchains([aliasedPnpm])).not.toThrow();
    expect(() => verifyWorkflowToolchains([actionsAlias])).not.toThrow();
    expect(() => verifyWorkflowToolchains([numericEnvironment])).not.toThrow();

    const missingSetups = aliasedPnpm.replace(`${SETUP_PAIR}\n\n`, "");
    expect(() => verifyWorkflowToolchains([missingSetups])).toThrow(
      "Every pnpm job must set up pnpm once"
    );
    const expressionWithoutSetups = actionsAlias.replace(
      `${SETUP_PAIR}\n\n`,
      ""
    );
    expect(() => verifyWorkflowToolchains([expressionWithoutSetups])).toThrow(
      "Every pnpm job must set up pnpm once"
    );
  });

  it("requires setup before the first pnpm command", () => {
    const wrongOrder = ci.replace(SETUP_PAIR, `${NODE_STEP}\n\n${PNPM_STEP}`);
    expect(() => verifyWorkflowToolchains([wrongOrder])).toThrow(
      "Every pnpm job must set up pnpm, then Node.js, before running pnpm"
    );

    const commandBeforeSetup = ci.replace(
      PNPM_STEP,
      `      - name: Premature command
        run: pnpm --version

${PNPM_STEP}`
    );
    expect(() => verifyWorkflowToolchains([commandBeforeSetup])).toThrow(
      "Every pnpm job must set up pnpm, then Node.js, before running pnpm"
    );
  });

  it("rejects toolchain versions declared by setup inputs", () => {
    const inlinePnpm = ci.replace(
      PNPM_STEP,
      `${PNPM_STEP}\n        with:\n          version: 11.15.1`
    );
    expect(() => verifyWorkflowToolchains([inlinePnpm])).toThrow(
      "Workflows must derive the pnpm version from package.json"
    );

    const alternateManifest = ci.replace(
      PNPM_STEP,
      `${PNPM_STEP}\n        with:\n          package_json_file: test/package.json`
    );
    expect(() => verifyWorkflowToolchains([alternateManifest])).toThrow(
      "Workflows must derive pnpm from the root package.json"
    );

    const noNodeInputs = ci.replace(
      `${NODE_STEP}\n`,
      "      - name: Setup Node.js\n        uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7.0.0\n"
    );
    expect(() => verifyWorkflowToolchains([noNodeInputs])).toThrow(
      "The Node.js setup step must define inputs"
    );

    const inlineNode = ci.replace(
      "          node-version-file: package.json",
      "          node-version: 24.18.0"
    );
    expect(() => verifyWorkflowToolchains([inlineNode])).toThrow(
      "Every pnpm job must read the Node version from package.json"
    );

    const competingNode = ci.replace(
      "          node-version-file: package.json",
      "          node-version-file: package.json\n          node-version: 24.18.0"
    );
    expect(() => verifyWorkflowToolchains([competingNode])).toThrow(
      "The Node.js setup must not override node-version-file"
    );
  });

  it("rejects hidden installs inside pnpm setup", () => {
    const hiddenInstall = ci.replace(
      PNPM_STEP,
      `${PNPM_STEP}\n        with:\n          run_install: true`
    );

    expect(() => verifyWorkflowToolchains([hiddenInstall])).toThrow(
      "The pnpm setup action must not run a hidden install"
    );
  });

  it("rejects commands that replace the selected pnpm version", () => {
    const competingSelector = ci.replace(
      "      - name: Install dependencies",
      "      - name: Replace pnpm\n        run: corepack use pnpm@10\n\n      - name: Install dependencies"
    );
    const corepackUpdate = ci.replace(
      "      - name: Install dependencies",
      "      - name: Update pnpm\n        run: corepack up\n\n      - name: Install dependencies"
    );

    expect(() => verifyWorkflowToolchains([competingSelector])).toThrow(
      "Workflows must not replace the package.json-selected pnpm version"
    );
    expect(() => verifyWorkflowToolchains([corepackUpdate])).toThrow(
      "Workflows must not replace the package.json-selected pnpm version"
    );
  });

  it("requires every toolchain setup step to run unconditionally", () => {
    const conditionalPnpm = ci.replace(
      PNPM_STEP,
      `${PNPM_STEP}\n        if: false`
    );
    expect(() => verifyWorkflowToolchains([conditionalPnpm])).toThrow(
      "The pnpm setup step must run unconditionally"
    );

    const conditionalNode = ci.replace(
      NODE_STEP,
      `${NODE_STEP}\n        if: \${{ matrix.enabled }}`
    );
    expect(() => verifyWorkflowToolchains([conditionalNode])).toThrow(
      "The Node.js setup step must run unconditionally"
    );
  });

  it("requires every toolchain setup step to stop on failure", () => {
    const ignoredPnpmFailure = ci.replace(
      PNPM_STEP,
      `${PNPM_STEP}\n        continue-on-error: true`
    );
    expect(() => verifyWorkflowToolchains([ignoredPnpmFailure])).toThrow(
      "The pnpm setup step must stop on failure"
    );

    const ignoredNodeFailure = ci.replace(
      NODE_STEP,
      `${NODE_STEP}\n        continue-on-error: \${{ matrix.experimental }}`
    );
    expect(() => verifyWorkflowToolchains([ignoredNodeFailure])).toThrow(
      "The Node.js setup step must stop on failure"
    );

    const explicitFailureStop = ci
      .replace(PNPM_STEP, `${PNPM_STEP}\n        continue-on-error: false`)
      .replace(NODE_STEP, `${NODE_STEP}\n        continue-on-error: false`);
    expect(() => verifyWorkflowToolchains([explicitFailureStop])).not.toThrow();
  });

  it("rejects malformed action inputs without matching unrelated values", () => {
    const malformedInputs = ci.replace(
      NODE_STEP,
      "      - name: Setup Node.js\n        uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7.0.0\n        with: invalid"
    );
    expect(() => verifyWorkflowToolchains([malformedInputs])).toThrow(
      "Workflow action inputs must be a mapping"
    );

    const unrelatedVersion = ci.replace(
      "          persist-credentials: false",
      "          persist-credentials: false\n          version: stable"
    );
    expect(() => verifyWorkflowToolchains([unrelatedVersion])).not.toThrow();
  });
});
