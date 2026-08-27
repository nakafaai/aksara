import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { verifyWorkflowToolchains } from "#scripts/workflow/toolchain";

const ci = readFileSync(".github/workflows/ci.yml", "utf8");
const contracts = readFileSync(".github/workflows/contracts.yml", "utf8");
const release = readFileSync(".github/workflows/release.yml", "utf8");
const sources = [ci, contracts, release];
const TOOLCHAIN_STEP = `      - name: Setup toolchain
        uses: pnpm/setup@84cb39b217b10273981911c288cd62326dc7c6d2 # v2.0.2
        with:
          cache: true
          install: false`;

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
    ci.replace(`${TOOLCHAIN_STEP}\n\n`, ""),
    ci.replace(TOOLCHAIN_STEP, `${TOOLCHAIN_STEP}\n\n${TOOLCHAIN_STEP}`),
  ])("requires exactly one toolchain setup %#", (source) => {
    expect(() => verifyWorkflowToolchains([source])).toThrow(
      "Every pnpm job must set up the toolchain once"
    );
  });

  it("rejects legacy and competing setup actions", () => {
    const legacyPnpm = ci.replace(
      "pnpm/setup@84cb39b217b10273981911c288cd62326dc7c6d2",
      "pnpm/action-setup@0ebf47130e4866e96fce0953f49152a61190b271"
    );
    const competingNode = ci.replace(
      TOOLCHAIN_STEP,
      `${TOOLCHAIN_STEP}\n\n      - uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020`
    );

    expect(() => verifyWorkflowToolchains([legacyPnpm])).toThrow(
      "Workflows must not use legacy pnpm/action-setup"
    );
    expect(() => verifyWorkflowToolchains([competingNode])).toThrow(
      "Workflows must not use a second Node.js setup action"
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

    const missingSetups = aliasedPnpm.replace(`${TOOLCHAIN_STEP}\n\n`, "");
    expect(() => verifyWorkflowToolchains([missingSetups])).toThrow(
      "Every pnpm job must set up the toolchain once"
    );
    const expressionWithoutSetups = actionsAlias.replace(
      `${TOOLCHAIN_STEP}\n\n`,
      ""
    );
    expect(() => verifyWorkflowToolchains([expressionWithoutSetups])).toThrow(
      "Every pnpm job must set up the toolchain once"
    );
  });

  it("requires setup before the first pnpm command", () => {
    const commandBeforeSetup = ci.replace(
      TOOLCHAIN_STEP,
      `      - name: Premature command
        run: pnpm --version

${TOOLCHAIN_STEP}`
    );
    expect(() => verifyWorkflowToolchains([commandBeforeSetup])).toThrow(
      "Every pnpm job must set up the toolchain before running pnpm"
    );
  });

  it("rejects toolchain versions declared by setup inputs", () => {
    const inlinePnpm = ci.replace(
      "          cache: true",
      "          version: 11.20.0\n          cache: true"
    );
    expect(() => verifyWorkflowToolchains([inlinePnpm])).toThrow(
      "Workflows must derive the pnpm version from package.json"
    );

    const alternateManifest = ci.replace(
      "          cache: true",
      "          package-json-file: test/package.json\n          cache: true"
    );
    expect(() => verifyWorkflowToolchains([alternateManifest])).toThrow(
      "Workflows must derive the toolchain from the root package.json"
    );

    const inlineRuntime = ci.replace(
      "          cache: true",
      "          runtime: node@24.19.0\n          cache: true"
    );
    expect(() => verifyWorkflowToolchains([inlineRuntime])).toThrow(
      "Workflows must derive the runtime from package.json"
    );

    const noInputs = ci.replace(
      `${TOOLCHAIN_STEP}\n`,
      "      - name: Setup toolchain\n        uses: pnpm/setup@84cb39b217b10273981911c288cd62326dc7c6d2 # v2.0.2\n"
    );
    expect(() => verifyWorkflowToolchains([noInputs])).toThrow(
      "The toolchain setup step must define inputs"
    );

    const noCache = ci.replace(
      "          cache: true",
      "          cache: false"
    );
    expect(() => verifyWorkflowToolchains([noCache])).toThrow(
      "The toolchain setup must cache the root pnpm store"
    );

    const hiddenInstall = ci.replace(
      "          install: false",
      "          install: true"
    );
    expect(() => verifyWorkflowToolchains([hiddenInstall])).toThrow(
      "The toolchain setup must leave the frozen install explicit"
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
    const conditionalSetup = ci.replace(
      TOOLCHAIN_STEP,
      `${TOOLCHAIN_STEP}\n        if: false`
    );
    expect(() => verifyWorkflowToolchains([conditionalSetup])).toThrow(
      "The toolchain setup step must run unconditionally"
    );
  });

  it("requires every toolchain setup step to stop on failure", () => {
    const ignoredFailure = ci.replace(
      TOOLCHAIN_STEP,
      `${TOOLCHAIN_STEP}\n        continue-on-error: true`
    );
    expect(() => verifyWorkflowToolchains([ignoredFailure])).toThrow(
      "The toolchain setup step must stop on failure"
    );

    const explicitFailureStop = ci.replace(
      TOOLCHAIN_STEP,
      `${TOOLCHAIN_STEP}\n        continue-on-error: false`
    );
    expect(() => verifyWorkflowToolchains([explicitFailureStop])).not.toThrow();
  });

  it("rejects malformed action inputs without matching unrelated values", () => {
    const malformedInputs = ci.replace(
      TOOLCHAIN_STEP,
      "      - name: Setup toolchain\n        uses: pnpm/setup@84cb39b217b10273981911c288cd62326dc7c6d2 # v2.0.2\n        with: invalid"
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
    ["RUNTIME: node@24", "Workflows must derive the runtime from package.json"],
    [
      "PACKAGE-JSON-FILE: other/package.json",
      "Workflows must derive the toolchain from the root package.json",
    ],
  ])("normalizes pnpm input %s", (input, message) => {
    const uppercaseInput = ci.replace(
      "          cache: true",
      `          ${input}\n          cache: true`
    );

    expect(() => verifyWorkflowToolchains([uppercaseInput])).toThrow(message);
  });

  it("normalizes and rejects duplicated input names", () => {
    const duplicateInput = ci.replace(
      "          cache: true",
      "          CACHE: true\n          cache: true"
    );
    expect(() => verifyWorkflowToolchains([duplicateInput])).toThrow(
      "Workflow action input cache must not be duplicated case-insensitively"
    );
  });
});
