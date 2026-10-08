import { expect, layer } from "@effect/vitest";
import { Array as Arr } from "effect";
import {
  sourceTestsOf,
  workflowSourcesLayer,
} from "#scripts/workflow/test/sources";
import {
  TOOLCHAIN_SETUP_ACTION,
  verifyWorkflowToolchains,
} from "#scripts/workflow/toolchain";

const SETUP_HEADER = `      - name: Setup toolchain
        uses: ${TOOLCHAIN_SETUP_ACTION} # v3.0.0`;
const TOOLCHAIN_STEP = `${SETUP_HEADER}
        with:
          cache: true
          install: false`;

layer(workflowSourcesLayer)("workflow toolchain policy", (it) => {
  const sourceTest = sourceTestsOf(it);

  sourceTest(
    "accepts package.json-owned toolchains and every YAML job identifier",
    ({ all: sources, ci }) => {
      const quotedUppercaseJob = ci.replace(
        "  checks:\n",
        '  "Checks_Main":\n'
      );

      expect(() => verifyWorkflowToolchains(sources)).not.toThrow();
      expect(() =>
        verifyWorkflowToolchains([quotedUppercaseJob])
      ).not.toThrow();
    }
  );

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

  sourceTest(
    "rejects duplicated environment versions at every workflow scope",
    ({ ci }) => {
      const workflowEnvironment = ci.replace(
        "permissions:\n",
        "env:\n  NODE_VERSION: 24\n\npermissions:\n"
      );
      expect(() => verifyWorkflowToolchains([workflowEnvironment])).toThrow(
        "Workflows must not duplicate Node or pnpm versions"
      );

      const jobEnvironment = ci.replace(
        "  checks:\n",
        '  checks:\n    env: { "PNPM_VERSION" : 11.15.1 }\n'
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
    }
  );

  it("keeps a job environment value over the workflow value of the same name", () => {
    const npmJob = [
      "env:",
      "  PM: pnpm",
      "jobs:",
      "  install:",
      "    env:",
      "      PM: npm",
      "    steps:",
      "      - run: $PM install",
    ].join("\n");

    expect(() => verifyWorkflowToolchains([npmJob])).not.toThrow();
  });

  it("requires toolchain setup when a job environment value makes it run pnpm", () => {
    const pnpmJob = [
      "env:",
      "  PM: npm",
      "jobs:",
      "  install:",
      "    env:",
      "      PM: pnpm",
      "    steps:",
      "      - run: $PM install",
    ].join("\n");

    expect(() => verifyWorkflowToolchains([pnpmJob])).toThrow(
      "Every pnpm job must set up the toolchain once"
    );
  });

  sourceTest("requires exactly one toolchain setup 0", ({ ci }) => {
    const source = ci.replace(`${TOOLCHAIN_STEP}\n\n`, "");
    expect(() => verifyWorkflowToolchains([source])).toThrow(
      "Every pnpm job must set up the toolchain once"
    );
  });

  sourceTest("requires exactly one toolchain setup 1", ({ ci }) => {
    const source = ci.replace(
      TOOLCHAIN_STEP,
      `${TOOLCHAIN_STEP}\n\n${TOOLCHAIN_STEP}`
    );
    expect(() => verifyWorkflowToolchains([source])).toThrow(
      "Every pnpm job must set up the toolchain once"
    );
  });

  sourceTest(
    "rejects legacy, competing, and unreviewed setup actions",
    ({ ci }) => {
      const legacyPnpm = ci.replace(
        TOOLCHAIN_SETUP_ACTION,
        "pnpm/action-setup@0ebf47130e4866e96fce0953f49152a61190b271"
      );
      const competingNode = ci.replace(
        TOOLCHAIN_STEP,
        `${TOOLCHAIN_STEP}\n\n      - uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020`
      );
      const unreviewed = ci.replace(
        TOOLCHAIN_SETUP_ACTION,
        "pnpm/setup@703c52620218391530e48b9e8870d5c0082e1b9b"
      );

      expect(() => verifyWorkflowToolchains([legacyPnpm])).toThrow(
        "Workflows must not use legacy pnpm/action-setup"
      );
      expect(() => verifyWorkflowToolchains([competingNode])).toThrow(
        "Workflows must not use a second Node.js setup action"
      );
      expect(() => verifyWorkflowToolchains([unreviewed])).toThrow(
        "The toolchain setup must use the reviewed pnpm/setup release"
      );
    }
  );

  sourceTest(
    "detects pnpm invoked through a workflow environment alias",
    ({ ci }) => {
      const aliasedPnpm = ci
        .replace("  checks:\n", "  checks:\n    env:\n      PM: pnpm\n")
        .replace("run: pnpm install", "run: $PM install");
      const actionsAlias = aliasedPnpm.replace(
        "run: $PM install",
        Arr.join(["run: $", "{{ env.PM }} install"], "")
      );
      const numericEnvironment = ci.replace(
        "  checks:\n",
        "  checks:\n    env:\n      RETRIES: 3\n"
      );

      expect(() => verifyWorkflowToolchains([aliasedPnpm])).not.toThrow();
      expect(() => verifyWorkflowToolchains([actionsAlias])).not.toThrow();
      expect(() =>
        verifyWorkflowToolchains([numericEnvironment])
      ).not.toThrow();

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
    }
  );

  sourceTest("requires setup before the first pnpm command", ({ ci }) => {
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

  sourceTest(
    "rejects toolchain versions declared by setup inputs",
    ({ ci }) => {
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
        "          runtime: node@24.20.0\n          cache: true"
      );
      expect(() => verifyWorkflowToolchains([inlineRuntime])).toThrow(
        "Workflows must derive the runtime from package.json"
      );

      const noInputs = ci.replace(`${TOOLCHAIN_STEP}\n`, `${SETUP_HEADER}\n`);
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
    }
  );

  for (const command of [
    "corepack use pnpm@10",
    "corepack up",
    "corepack use pnpm",
  ]) {
    sourceTest(`rejects pnpm replacement command ${command}`, ({ ci }) => {
      const replacement = ci.replace(
        "      - name: Install dependencies",
        `      - name: Replace pnpm\n        run: ${command}\n\n      - name: Install dependencies`
      );

      expect(() => verifyWorkflowToolchains([replacement])).toThrow(
        "Workflows must not replace the package.json-selected pnpm version"
      );
    });
  }

  sourceTest(
    "requires every toolchain setup step to run unconditionally",
    ({ ci }) => {
      const conditionalSetup = ci.replace(
        TOOLCHAIN_STEP,
        `${TOOLCHAIN_STEP}\n        if: false`
      );
      expect(() => verifyWorkflowToolchains([conditionalSetup])).toThrow(
        "The toolchain setup step must run unconditionally"
      );
    }
  );

  sourceTest(
    "requires every toolchain setup step to stop on failure",
    ({ ci }) => {
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
      expect(() =>
        verifyWorkflowToolchains([explicitFailureStop])
      ).not.toThrow();
    }
  );

  sourceTest(
    "rejects malformed action inputs without matching unrelated values",
    ({ ci }) => {
      const malformedInputs = ci.replace(
        TOOLCHAIN_STEP,
        `${SETUP_HEADER}\n        with: invalid`
      );
      expect(() => verifyWorkflowToolchains([malformedInputs])).toThrow(
        "Workflow action inputs must be a mapping"
      );

      const unrelatedVersion = ci.replace(
        "          persist-credentials: false",
        "          persist-credentials: false\n          version: stable"
      );
      expect(() => verifyWorkflowToolchains([unrelatedVersion])).not.toThrow();
    }
  );

  for (const [input, message] of [
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
  ]) {
    sourceTest(`normalizes pnpm input ${input}`, ({ ci }) => {
      const uppercaseInput = ci.replace(
        "          cache: true",
        `          ${input}\n          cache: true`
      );

      expect(() => verifyWorkflowToolchains([uppercaseInput])).toThrow(message);
    });
  }

  sourceTest("normalizes and rejects duplicated input names", ({ ci }) => {
    const duplicateInput = ci.replace(
      "          cache: true",
      "          CACHE: true\n          cache: true"
    );
    expect(() => verifyWorkflowToolchains([duplicateInput])).toThrow(
      "Workflow action input cache must not be duplicated case-insensitively"
    );
  });
});
