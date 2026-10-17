import { expect, layer } from "@effect/vitest";
import { Array as Arr, Effect, Schema } from "effect";
import { WorkflowError } from "#scripts/workflow/requirement";
import { expectRefusal } from "#scripts/workflow/test/failure";
import {
  sourceEffectTestsOf,
  workflowSourcesLayer,
} from "#scripts/workflow/test/sources";
import {
  INVALID_WORKFLOW_STRUCTURES,
  NPM_JOB_ENV,
  PNPM_INPUT_CASES,
  PNPM_JOB_ENV,
  REPLACEMENT_COMMANDS,
  SETUP_HEADER,
  setupInputVariants,
  TOOLCHAIN_STEP,
} from "#scripts/workflow/test/toolchain";
import {
  TOOLCHAIN_SETUP_ACTION,
  verifyWorkflowToolchains,
} from "#scripts/workflow/toolchain";

layer(workflowSourcesLayer)("workflow toolchain policy", (layered) => {
  const it = sourceEffectTestsOf(layered);

  it("accepts package.json-owned toolchains and every YAML job identifier", ({
    all: sources,
    ci,
  }) =>
    Effect.gen(function* () {
      const quotedUppercaseJob = ci.replace(
        "  checks:\n",
        '  "Checks_Main":\n'
      );

      yield* verifyWorkflowToolchains(sources);
      yield* verifyWorkflowToolchains([quotedUppercaseJob]);
    }));

  Arr.forEach(INVALID_WORKFLOW_STRUCTURES, ([source, message], index) => {
    layered.effect(`rejects invalid workflow structure ${index}`, () =>
      expectRefusal(verifyWorkflowToolchains([source]), message)
    );
  });

  layered.effect("rejects malformed YAML as a typed workflow refusal", () =>
    Effect.gen(function* () {
      const refusal = yield* verifyWorkflowToolchains(["jobs: ["]).pipe(
        Effect.flip
      );

      expect(Schema.is(WorkflowError)(refusal)).toBe(true);
    })
  );

  layered.effect("ignores jobs that do not execute pnpm", () =>
    verifyWorkflowToolchains([
      "jobs:\n  reusable:\n    uses: nakafaai/workflows/.github/workflows/check.yml@main",
    ])
  );

  layered.effect("refuses job steps that are not a sequence", () =>
    expectRefusal(
      verifyWorkflowToolchains(["jobs:\n  checks:\n    steps: {}\n"]),
      "Workflow job steps must be a sequence"
    )
  );

  layered.effect("refuses an environment name that is not text", () =>
    expectRefusal(
      verifyWorkflowToolchains([
        "jobs:\n  checks:\n    env:\n      1: value\n    steps:\n      - run: echo ok\n",
      ]),
      "Workflow environment names must be strings"
    )
  );

  it("rejects duplicated environment versions at every workflow scope", ({
    ci,
  }) =>
    Effect.gen(function* () {
      const workflowEnvironment = ci.replace(
        "permissions:\n",
        "env:\n  NODE_VERSION: 24\n\npermissions:\n"
      );
      yield* expectRefusal(
        verifyWorkflowToolchains([workflowEnvironment]),
        "Workflows must not duplicate Node or pnpm versions"
      );

      const jobEnvironment = ci.replace(
        "  checks:\n",
        '  checks:\n    env: { "PNPM_VERSION" : 11.15.1 }\n'
      );
      yield* expectRefusal(
        verifyWorkflowToolchains([jobEnvironment]),
        "Workflows must not duplicate Node or pnpm versions"
      );

      const stepEnvironment = ci.replace(
        "      - name: Install dependencies",
        '      - name: Install dependencies\n        env:\n          "NODE_VERSION" : 24'
      );
      yield* expectRefusal(
        verifyWorkflowToolchains([stepEnvironment]),
        "Workflows must not duplicate Node or pnpm versions"
      );
    }));

  layered.effect(
    "keeps a job environment value over the workflow value of the same name",
    () => verifyWorkflowToolchains([NPM_JOB_ENV])
  );

  layered.effect(
    "requires toolchain setup when a job environment value makes it run pnpm",
    () =>
      expectRefusal(
        verifyWorkflowToolchains([PNPM_JOB_ENV]),
        "Every pnpm job must set up the toolchain once"
      )
  );

  it("requires exactly one toolchain setup 0", ({ ci }) => {
    const source = ci.replace(`${TOOLCHAIN_STEP}\n\n`, "");
    return expectRefusal(
      verifyWorkflowToolchains([source]),
      "Every pnpm job must set up the toolchain once"
    );
  });

  it("requires exactly one toolchain setup 1", ({ ci }) => {
    const source = ci.replace(
      TOOLCHAIN_STEP,
      `${TOOLCHAIN_STEP}\n\n${TOOLCHAIN_STEP}`
    );
    return expectRefusal(
      verifyWorkflowToolchains([source]),
      "Every pnpm job must set up the toolchain once"
    );
  });

  it("rejects legacy, competing, and unreviewed setup actions", ({ ci }) =>
    Effect.gen(function* () {
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

      yield* expectRefusal(
        verifyWorkflowToolchains([legacyPnpm]),
        "Workflows must not use legacy pnpm/action-setup"
      );
      yield* expectRefusal(
        verifyWorkflowToolchains([competingNode]),
        "Workflows must not use a second Node.js setup action"
      );
      yield* expectRefusal(
        verifyWorkflowToolchains([unreviewed]),
        "The toolchain setup must use the reviewed pnpm/setup release"
      );
    }));

  it("detects pnpm invoked through a workflow environment alias", ({ ci }) =>
    Effect.gen(function* () {
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

      yield* verifyWorkflowToolchains([aliasedPnpm]);
      yield* verifyWorkflowToolchains([actionsAlias]);
      yield* verifyWorkflowToolchains([numericEnvironment]);

      const missingSetups = aliasedPnpm.replace(`${TOOLCHAIN_STEP}\n\n`, "");
      yield* expectRefusal(
        verifyWorkflowToolchains([missingSetups]),
        "Every pnpm job must set up the toolchain once"
      );
      const expressionWithoutSetups = actionsAlias.replace(
        `${TOOLCHAIN_STEP}\n\n`,
        ""
      );
      yield* expectRefusal(
        verifyWorkflowToolchains([expressionWithoutSetups]),
        "Every pnpm job must set up the toolchain once"
      );
    }));

  it("requires setup before the first pnpm command", ({ ci }) => {
    const commandBeforeSetup = ci.replace(
      TOOLCHAIN_STEP,
      `      - name: Premature command
        run: pnpm --version

${TOOLCHAIN_STEP}`
    );
    return expectRefusal(
      verifyWorkflowToolchains([commandBeforeSetup]),
      "Every pnpm job must set up the toolchain before running pnpm"
    );
  });

  it("rejects toolchain versions declared by setup inputs", ({ ci }) =>
    Effect.gen(function* () {
      const variants = setupInputVariants(ci);

      yield* expectRefusal(
        verifyWorkflowToolchains([variants.inlinePnpm]),
        "Workflows must derive the pnpm version from package.json"
      );
      yield* expectRefusal(
        verifyWorkflowToolchains([variants.alternateManifest]),
        "Workflows must derive the toolchain from the root package.json"
      );
      yield* expectRefusal(
        verifyWorkflowToolchains([variants.inlineRuntime]),
        "Workflows must derive the runtime from package.json"
      );
      yield* expectRefusal(
        verifyWorkflowToolchains([variants.noInputs]),
        "The toolchain setup step must define inputs"
      );
      yield* expectRefusal(
        verifyWorkflowToolchains([variants.noCache]),
        "The toolchain setup must cache the root pnpm store"
      );
      yield* expectRefusal(
        verifyWorkflowToolchains([variants.hiddenInstall]),
        "The toolchain setup must leave the frozen install explicit"
      );
    }));

  for (const command of REPLACEMENT_COMMANDS) {
    it(`rejects pnpm replacement command ${command}`, ({ ci }) => {
      const replacement = ci.replace(
        "      - name: Install dependencies",
        `      - name: Replace pnpm\n        run: ${command}\n\n      - name: Install dependencies`
      );

      return expectRefusal(
        verifyWorkflowToolchains([replacement]),
        "Workflows must not replace the package.json-selected pnpm version"
      );
    });
  }

  it("requires every toolchain setup step to run unconditionally", ({ ci }) => {
    const conditionalSetup = ci.replace(
      TOOLCHAIN_STEP,
      `${TOOLCHAIN_STEP}\n        if: false`
    );
    return expectRefusal(
      verifyWorkflowToolchains([conditionalSetup]),
      "The toolchain setup step must run unconditionally"
    );
  });

  it("requires every toolchain setup step to stop on failure", ({ ci }) =>
    Effect.gen(function* () {
      const ignoredFailure = ci.replace(
        TOOLCHAIN_STEP,
        `${TOOLCHAIN_STEP}\n        continue-on-error: true`
      );
      yield* expectRefusal(
        verifyWorkflowToolchains([ignoredFailure]),
        "The toolchain setup step must stop on failure"
      );

      const explicitFailureStop = ci.replace(
        TOOLCHAIN_STEP,
        `${TOOLCHAIN_STEP}\n        continue-on-error: false`
      );
      yield* verifyWorkflowToolchains([explicitFailureStop]);
    }));

  it("rejects malformed action inputs without matching unrelated values", ({
    ci,
  }) =>
    Effect.gen(function* () {
      const malformedInputs = ci.replace(
        TOOLCHAIN_STEP,
        `${SETUP_HEADER}\n        with: invalid`
      );
      yield* expectRefusal(
        verifyWorkflowToolchains([malformedInputs]),
        "Workflow action inputs must be a mapping"
      );

      const unrelatedVersion = ci.replace(
        "          persist-credentials: false",
        "          persist-credentials: false\n          version: stable"
      );
      yield* verifyWorkflowToolchains([unrelatedVersion]);
    }));

  for (const [input, message] of PNPM_INPUT_CASES) {
    it(`normalizes pnpm input ${input}`, ({ ci }) => {
      const uppercaseInput = ci.replace(
        "          cache: true",
        `          ${input}\n          cache: true`
      );

      return expectRefusal(verifyWorkflowToolchains([uppercaseInput]), message);
    });
  }

  it("normalizes and rejects duplicated input names", ({ ci }) => {
    const duplicateInput = ci.replace(
      "          cache: true",
      "          CACHE: true\n          cache: true"
    );
    return expectRefusal(
      verifyWorkflowToolchains([duplicateInput]),
      "Workflow action input cache must not be duplicated case-insensitively"
    );
  });
});
