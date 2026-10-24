import { expect, layer } from "@effect/vitest";
import { Array as Arr, Effect, Schema } from "effect";
import { WorkflowError } from "#scripts/workflow/requirement";
import { expectRefusal } from "#scripts/workflow/test/failure";
import {
  sourceEffectTestsOf,
  workflowSourcesLayer,
} from "#scripts/workflow/test/sources";
import {
  BUN_INPUT_CASES,
  BUN_JOB_ENV,
  BUN_SETUP_HEADER,
  BUN_SETUP_STEP,
  INVALID_WORKFLOW_STRUCTURES,
  NODE_INPUT_CASES,
  NODE_SETUP_STEP,
  NPM_JOB_ENV,
  REPLACEMENT_COMMANDS,
  setupInputVariants,
  TOOLCHAIN_STEP,
} from "#scripts/workflow/test/toolchain";
import {
  NODE_SETUP_ACTION,
  TOOLCHAIN_SETUP_ACTION,
  verifyWorkflowToolchains,
} from "#scripts/workflow/toolchain";

/** Expects the toolchain policy to refuse one workflow text with the given message. */
const refuses = (source: string, message: string) =>
  expectRefusal(verifyWorkflowToolchains([source]), message);

/** Accepts one workflow text under the toolchain policy. */
const accepts = (source: string) => verifyWorkflowToolchains([source]);

layer(workflowSourcesLayer)("workflow toolchain policy", (layered) => {
  const it = sourceEffectTestsOf(layered);

  it("accepts package.json-owned toolchains and every YAML job identifier", ({
    all: sources,
    cli,
  }) =>
    Effect.gen(function* () {
      const quotedUppercaseJob = cli.replace("  build:\n", '  "Build_Main":\n');

      yield* verifyWorkflowToolchains(sources);
      yield* accepts(quotedUppercaseJob);
    }));

  Arr.forEach(INVALID_WORKFLOW_STRUCTURES, ([source, message], index) => {
    layered.effect(`rejects invalid workflow structure ${index}`, () =>
      refuses(source, message)
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

  layered.effect("ignores jobs that do not execute Bun", () =>
    accepts(
      "jobs:\n  reusable:\n    uses: nakafaai/workflows/.github/workflows/check.yml@main"
    )
  );

  layered.effect("refuses job steps that are not a sequence", () =>
    refuses(
      "jobs:\n  checks:\n    steps: {}\n",
      "Workflow job steps must be a sequence"
    )
  );

  layered.effect("refuses an environment name that is not text", () =>
    refuses(
      "jobs:\n  checks:\n    env:\n      1: value\n    steps:\n      - run: echo ok\n",
      "Workflow environment names must be strings"
    )
  );

  it("rejects duplicated environment versions at every workflow scope", ({
    cli,
  }) =>
    Effect.gen(function* () {
      yield* refuses(
        cli.replace(
          "permissions: {}\n",
          "env:\n  NODE_VERSION: 24\n\npermissions: {}\n"
        ),
        "Workflows must not duplicate Node or Bun versions"
      );
      yield* refuses(
        cli.replace(
          "  build:\n",
          '  build:\n    env: { "BUN_VERSION" : 1.4.4 }\n'
        ),
        "Workflows must not duplicate Node or Bun versions"
      );
      yield* refuses(
        cli.replace(
          "      - name: Install dependencies",
          '      - name: Install dependencies\n        env:\n          "NODE_VERSION" : 24'
        ),
        "Workflows must not duplicate Node or Bun versions"
      );
      yield* refuses(
        cli.replace(
          "      - name: Audit dependencies",
          '      - name: Audit dependencies\n        env:\n          "BUN_VERSION" : 1.4.4'
        ),
        "Workflows must not duplicate Node or Bun versions"
      );
    }));

  layered.effect(
    "keeps a job environment value over the workflow value of the same name",
    () => accepts(NPM_JOB_ENV)
  );

  layered.effect(
    "requires toolchain setup when a job environment value makes it run Bun",
    () => refuses(BUN_JOB_ENV, "Every Bun job must set up Node.js once")
  );

  it("requires exactly one Node.js setup", ({ cli }) =>
    refuses(
      cli.replace(`${TOOLCHAIN_STEP}\n\n`, ""),
      "Every Bun job must set up Node.js once"
    ));

  it("requires exactly one Node.js setup when two are declared", ({ cli }) =>
    refuses(
      cli.replace(TOOLCHAIN_STEP, `${TOOLCHAIN_STEP}\n\n${NODE_SETUP_STEP}`),
      "Every Bun job must set up Node.js once"
    ));

  it("requires exactly one Bun setup", ({ cli }) =>
    refuses(
      cli.replace(`\n\n${BUN_SETUP_STEP}`, ""),
      "Every Bun job must set up the toolchain once"
    ));

  it("rejects pnpm actions and unreviewed setup actions", ({ cli }) =>
    Effect.gen(function* () {
      yield* refuses(
        cli.replace(
          TOOLCHAIN_SETUP_ACTION,
          "pnpm/setup@a0881977cd8ea73b1ed212236c99ca10dcc80cf4"
        ),
        "Workflows must not use pnpm actions"
      );
      yield* refuses(
        cli.replace(
          TOOLCHAIN_SETUP_ACTION,
          "oven-sh/setup-bun@1111111111111111111111111111111111111111"
        ),
        "The toolchain setup must use the reviewed oven-sh/setup-bun release"
      );
      yield* refuses(
        cli.replace(
          NODE_SETUP_ACTION,
          "actions/setup-node@1111111111111111111111111111111111111111"
        ),
        "The Node.js setup must use the reviewed actions/setup-node release"
      );
      yield* refuses(
        cli.replace(
          TOOLCHAIN_STEP,
          `${TOOLCHAIN_STEP}\n\n      - uses: actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1`
        ),
        "Every Bun job must set up Node.js once"
      );
    }));

  it("detects Bun invoked through a workflow environment alias", ({ cli }) =>
    Effect.gen(function* () {
      const aliasedBun = cli
        .replace("  build:\n", "  build:\n    env:\n      PM: bun\n")
        .replace("run: bun install", "run: $PM install");
      const actionsAlias = aliasedBun.replace(
        "run: $PM install",
        Arr.join(["run: $", "{{ env.PM }} install"], "")
      );

      yield* accepts(aliasedBun);
      yield* accepts(actionsAlias);
      yield* accepts(
        cli.replace("  build:\n", "  build:\n    env:\n      RETRIES: 3\n")
      );

      yield* refuses(
        aliasedBun.replace(`${TOOLCHAIN_STEP}\n\n`, ""),
        "Every Bun job must set up Node.js once"
      );
      yield* refuses(
        actionsAlias.replace(`${TOOLCHAIN_STEP}\n\n`, ""),
        "Every Bun job must set up Node.js once"
      );
    }));

  it("requires setup before the first Bun command", ({ cli }) =>
    refuses(
      cli.replace(
        TOOLCHAIN_STEP,
        `      - name: Premature command
        run: bun --version

${TOOLCHAIN_STEP}`
      ),
      "Every Bun job must set up Node.js before running Bun"
    ));

  it("rejects toolchain versions declared by setup inputs", ({ cli }) =>
    Effect.gen(function* () {
      const variants = setupInputVariants(cli);

      yield* refuses(
        variants.inlineBun,
        "Workflows must derive the Bun version from package.json"
      );
      yield* refuses(
        variants.alternateManifest,
        "Workflows must derive the Bun version from package.json"
      );
      yield* refuses(
        variants.inlineNode,
        "Workflows must derive the Node.js version from package.json"
      );
      yield* refuses(
        variants.missingBunVersionFile,
        "Workflows must derive the Bun version from package.json"
      );
      yield* refuses(
        variants.noBunInputs,
        "The toolchain setup step must define inputs"
      );
    }));

  for (const command of REPLACEMENT_COMMANDS) {
    it(`rejects Bun replacement command ${command}`, ({ cli }) =>
      refuses(
        cli.replace(
          "      - name: Install dependencies",
          `      - name: Replace Bun\n        run: ${command}\n\n      - name: Install dependencies`
        ),
        "Workflows must not replace the package.json-selected Bun version"
      ));
  }

  it("requires every toolchain setup step to run unconditionally", ({ cli }) =>
    refuses(
      cli.replace(BUN_SETUP_STEP, `${BUN_SETUP_STEP}\n        if: false`),
      "The toolchain setup step must run unconditionally"
    ));

  it("requires every toolchain setup step to stop on failure", ({ cli }) =>
    Effect.gen(function* () {
      yield* refuses(
        cli.replace(
          BUN_SETUP_STEP,
          `${BUN_SETUP_STEP}\n        continue-on-error: true`
        ),
        "The toolchain setup step must stop on failure"
      );
      yield* accepts(
        cli.replace(
          BUN_SETUP_STEP,
          `${BUN_SETUP_STEP}\n        continue-on-error: false`
        )
      );
    }));

  it("rejects malformed action inputs without matching unrelated values", ({
    cli,
  }) =>
    Effect.gen(function* () {
      yield* refuses(
        cli.replace(
          BUN_SETUP_STEP,
          `${BUN_SETUP_HEADER}\n        with: invalid`
        ),
        "Workflow action inputs must be a mapping"
      );
      yield* accepts(
        cli.replace(
          "          persist-credentials: false",
          "          persist-credentials: false\n          version: stable"
        )
      );
    }));

  for (const [input, message] of BUN_INPUT_CASES) {
    it(`normalizes Bun input ${input}`, ({ cli }) =>
      refuses(
        cli.replace(
          "          bun-version-file: package.json",
          `          ${input}\n          bun-version-file: package.json`
        ),
        message
      ));
  }

  for (const [input, message] of NODE_INPUT_CASES) {
    it(`normalizes Node.js input ${input}`, ({ cli }) =>
      refuses(
        cli.replace(
          "          node-version-file: package.json",
          `          ${input}\n          node-version-file: package.json`
        ),
        message
      ));
  }

  it("normalizes and rejects duplicated input names", ({ cli }) =>
    refuses(
      cli.replace(
        "          bun-version-file: package.json",
        "          BUN-VERSION-FILE: package.json\n          bun-version-file: package.json"
      ),
      "Workflow action input bun-version-file must not be duplicated case-insensitively"
    ));
});
