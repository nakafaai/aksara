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

  it.each([
    ["jobs: [", undefined],
    ["name: Empty", "Workflow must define jobs"],
    ["jobs: {}", "Workflow must define at least one job"],
    ["jobs:\n  verify: []", "Every workflow job must be a mapping"],
    [
      "jobs:\n  ? [invalid]\n  : {}",
      "Workflow job identifiers must be strings",
    ],
    [
      "jobs:\n  verify:\n    steps: {}",
      "Workflow job steps must be a sequence",
    ],
    [
      "jobs:\n  verify:\n    steps:\n      - invalid",
      "Every workflow step must be a mapping",
    ],
  ])("rejects invalid workflow structure %#", (source, message) => {
    expect(() => verifyWorkflowToolchains([source])).toThrow(message);
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

  it.each([
    [ci.replace(`${SETUP_PAIR}\n\n`, ""), "pnpm"],
    [ci.replace(`${NODE_STEP}\n\n`, ""), "Node.js"],
    [ci.replace(NODE_STEP, `${PNPM_STEP}\n\n${NODE_STEP}`), "pnpm"],
    [
      ci.replace(
        "      - name: Install dependencies",
        `${NODE_STEP}\n\n      - name: Install dependencies`
      ),
      "Node.js",
    ],
  ])("requires exactly one toolchain setup %#", (source, tool) => {
    expect(() => verifyWorkflowToolchains([source])).toThrow(
      `Every pnpm job must set up ${tool} once`
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

  it.each(["corepack use pnpm@10", "corepack up", "corepack use pnpm"])(
    "rejects pnpm replacement command %s",
    (command) => {
      const replacement = ci.replace(
        "      - name: Install dependencies",
        `      - name: Replace pnpm\n        run: ${command}\n\n      - name: Install dependencies`
      );

      expect(() => verifyWorkflowToolchains([replacement])).toThrow(
        "Workflows must not replace the package.json-selected pnpm version"
      );
    }
  );

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

  it.each([
    ["VERSION: 11", "Workflows must derive the pnpm version from package.json"],
    [
      "PACKAGE_JSON_FILE: other/package.json",
      "Workflows must derive pnpm from the root package.json",
    ],
    [
      "RUN_INSTALL: true",
      "The pnpm setup action must not run a hidden install",
    ],
  ])("normalizes pnpm input %s", (input, message) => {
    const uppercaseInput = ci.replace(
      PNPM_STEP,
      `${PNPM_STEP}\n        with:\n          ${input}`
    );

    expect(() => verifyWorkflowToolchains([uppercaseInput])).toThrow(message);
  });

  it("normalizes the Node version input name", () => {
    const uppercaseInput = ci.replace(
      "          node-version-file: package.json",
      "          node-version-file: package.json\n          NODE-VERSION: 24"
    );
    const duplicateInput = ci.replace(
      "          node-version-file: package.json",
      "          NODE-VERSION-FILE: package.json\n          node-version-file: other/package.json"
    );
    expect(() => verifyWorkflowToolchains([uppercaseInput])).toThrow(
      "The Node.js setup must not override node-version-file"
    );
    expect(() => verifyWorkflowToolchains([duplicateInput])).toThrow(
      "Workflow action input node-version-file must not be duplicated case-insensitively"
    );
  });
});
