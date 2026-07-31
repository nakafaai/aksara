import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { verifyWorkflowToolchains } from "#scripts/workflow-toolchain";

const ci = readFileSync(".github/workflows/ci.yml", "utf8");
const contracts = readFileSync(".github/workflows/contracts.yml", "utf8");
const release = readFileSync(".github/workflows/release.yml", "utf8");
const sources = [ci, contracts, release];
const SETUP_PAIR_PATTERN =
  / {6}- name: Setup pnpm\n {8}uses: pnpm\/action-setup@[^\n]+\n\n {6}- name: Setup Node\.js\n {8}uses: actions\/setup-node@[^\n]+\n {8}with:\n {10}node-version-file: package\.json\n {10}cache: pnpm\n\n/u;

describe("workflow toolchain policy", () => {
  it("accepts package.json-owned toolchains", () => {
    expect(() => verifyWorkflowToolchains(sources)).not.toThrow();
  });

  it("rejects duplicated environment versions", () => {
    expect(() =>
      verifyWorkflowToolchains([...sources, "env:\n  NODE_VERSION: 24"])
    ).toThrow("Workflows must not duplicate Node or pnpm versions");
  });

  it("requires one toolchain setup in every pnpm job", () => {
    const changed = release.replace(SETUP_PAIR_PATTERN, "");
    expect(() => verifyWorkflowToolchains([ci, contracts, changed])).toThrow(
      "Every pnpm job must set up pnpm once"
    );

    const inlineNode = ci.replace(
      "          node-version-file: package.json",
      "          node-version: 24.18.0"
    );
    expect(() => verifyWorkflowToolchains([inlineNode])).toThrow(
      "Every pnpm job must read the Node version from package.json"
    );

    const duplicatedPnpm = ci.replace(
      "      - name: Setup Node.js",
      "      - name: Setup pnpm\n        uses: pnpm/action-setup@0ebf47130e4866e96fce0953f49152a61190b271 # v6.0.9\n\n      - name: Setup Node.js"
    );
    expect(() => verifyWorkflowToolchains([duplicatedPnpm])).toThrow(
      "Every pnpm job must set up pnpm once"
    );
  });

  it("rejects only a pnpm setup version input", () => {
    const inlinePnpm = ci.replace(
      "pnpm/action-setup@0ebf47130e4866e96fce0953f49152a61190b271 # v6.0.9",
      "pnpm/action-setup@0ebf47130e4866e96fce0953f49152a61190b271 # v6.0.9\n        with:\n          version: 11.15.1"
    );
    expect(() => verifyWorkflowToolchains([inlinePnpm])).toThrow(
      "Workflows must derive the pnpm version from package.json"
    );

    const unrelatedVersion = ci.replace(
      "          persist-credentials: false",
      "          persist-credentials: false\n          version: stable"
    );
    expect(() => verifyWorkflowToolchains([unrelatedVersion])).not.toThrow();
  });
});
