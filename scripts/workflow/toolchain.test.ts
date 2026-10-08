import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import { readSource } from "#scripts/workflow/source";
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
const CI = ".github/workflows/ci.yml";
const RUNTIME_MESSAGE = "Workflows must derive the runtime from package.json";
const TOOLCHAIN_MESSAGE =
  "Workflows must derive the toolchain from the root package.json";
const WORKFLOWS = Effect.all([
  readSource(CI),
  readSource(".github/workflows/cli.yml"),
  readSource(".github/workflows/contracts.yml"),
  readSource(".github/workflows/release.yml"),
]);

/** Expects one workflow text to fail the toolchain policy with the message. */
const rejects = (workflow: string, message: string) =>
  expect(() => verifyWorkflowToolchains([workflow])).toThrow(message);

/** Expects the workflow texts together to satisfy the toolchain policy. */
const accepts = (...workflows: string[]) =>
  expect(() => verifyWorkflowToolchains(workflows)).not.toThrow();

layer(NodeServices.layer)("workflow toolchain policy", (it) => {
  /** Runs one case against the CI workflow text that the case edits. */
  const ciCase = (name: string, test: (ci: string) => void) =>
    it.effect(name, () => readSource(CI).pipe(Effect.map(test)));

  it.effect(
    "accepts package.json-owned toolchains and every YAML job identifier",
    () =>
      Effect.gen(function* () {
        const sources = yield* WORKFLOWS;
        accepts(...sources);
        accepts(sources[0].replace("  checks:\n", '  "Checks_Main":\n'));
      })
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
    accepts(
      "jobs:\n  reusable:\n    uses: nakafaai/workflows/.github/workflows/check.yml@main"
    );
  });

  ciCase(
    "rejects duplicated environment versions at every workflow scope",
    (ci) => {
      rejects(
        ci.replace(
          "permissions:\n",
          "env:\n  NODE_VERSION: 24\n\npermissions:\n"
        ),
        "Workflows must not duplicate Node or pnpm versions"
      );
      rejects(
        ci.replace(
          "  checks:\n",
          '  checks:\n    env: { "PNPM_VERSION" : 11.15.1 }\n'
        ),
        "Workflows must not duplicate Node or pnpm versions"
      );
      rejects(
        ci.replace(
          "      - name: Install dependencies",
          '      - name: Install dependencies\n        env:\n          "NODE_VERSION" : 24'
        ),
        "Workflows must not duplicate Node or pnpm versions"
      );
    }
  );

  it.effect.each<(ci: string) => string>([
    (ci) => ci.replace(`${TOOLCHAIN_STEP}\n\n`, ""),
    (ci) =>
      ci.replace(TOOLCHAIN_STEP, `${TOOLCHAIN_STEP}\n\n${TOOLCHAIN_STEP}`),
  ])("requires exactly one toolchain setup %#", (edit) =>
    readSource(CI).pipe(
      Effect.map((ci) =>
        rejects(edit(ci), "Every pnpm job must set up the toolchain once")
      )
    )
  );

  ciCase("rejects legacy, competing, and unreviewed setup actions", (ci) => {
    rejects(
      ci.replace(
        TOOLCHAIN_SETUP_ACTION,
        "pnpm/action-setup@0ebf47130e4866e96fce0953f49152a61190b271"
      ),
      "Workflows must not use legacy pnpm/action-setup"
    );
    rejects(
      ci.replace(
        TOOLCHAIN_STEP,
        `${TOOLCHAIN_STEP}\n\n      - uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020`
      ),
      "Workflows must not use a second Node.js setup action"
    );
    rejects(
      ci.replace(
        TOOLCHAIN_SETUP_ACTION,
        "pnpm/setup@703c52620218391530e48b9e8870d5c0082e1b9b"
      ),
      "The toolchain setup must use the reviewed pnpm/setup release"
    );
  });

  ciCase("detects pnpm invoked through a workflow environment alias", (ci) => {
    const aliasedPnpm = ci
      .replace("  checks:\n", "  checks:\n    env:\n      PM: pnpm\n")
      .replace("run: pnpm install", "run: $PM install");
    const actionsAlias = aliasedPnpm.replace(
      "run: $PM install",
      Arr.join(["run: $", "{{ env.PM }} install"], "")
    );
    accepts(aliasedPnpm);
    accepts(actionsAlias);
    accepts(
      ci.replace("  checks:\n", "  checks:\n    env:\n      RETRIES: 3\n")
    );
    rejects(
      aliasedPnpm.replace(`${TOOLCHAIN_STEP}\n\n`, ""),
      "Every pnpm job must set up the toolchain once"
    );
    rejects(
      actionsAlias.replace(`${TOOLCHAIN_STEP}\n\n`, ""),
      "Every pnpm job must set up the toolchain once"
    );
  });

  ciCase("requires setup before the first pnpm command", (ci) => {
    rejects(
      ci.replace(
        TOOLCHAIN_STEP,
        `      - name: Premature command\n        run: pnpm --version\n\n${TOOLCHAIN_STEP}`
      ),
      "Every pnpm job must set up the toolchain before running pnpm"
    );
  });

  ciCase("rejects toolchain versions declared by setup inputs", (ci) => {
    rejects(
      ci.replace(
        "          cache: true",
        "          version: 11.20.0\n          cache: true"
      ),
      "Workflows must derive the pnpm version from package.json"
    );
    rejects(
      ci.replace(
        "          cache: true",
        "          package-json-file: test/package.json\n          cache: true"
      ),
      TOOLCHAIN_MESSAGE
    );
    rejects(
      ci.replace(
        "          cache: true",
        "          runtime: node@24.20.0\n          cache: true"
      ),
      RUNTIME_MESSAGE
    );
    rejects(
      ci.replace(`${TOOLCHAIN_STEP}\n`, `${SETUP_HEADER}\n`),
      "The toolchain setup step must define inputs"
    );
    rejects(
      ci.replace("          cache: true", "          cache: false"),
      "The toolchain setup must cache the root pnpm store"
    );
    rejects(
      ci.replace("          install: false", "          install: true"),
      "The toolchain setup must leave the frozen install explicit"
    );
  });

  it.effect.each(["corepack use pnpm@10", "corepack up", "corepack use pnpm"])(
    "rejects pnpm replacement command %s",
    (command) =>
      readSource(CI).pipe(
        Effect.map((ci) =>
          rejects(
            ci.replace(
              "      - name: Install dependencies",
              `      - name: Replace pnpm\n        run: ${command}\n\n      - name: Install dependencies`
            ),
            "Workflows must not replace the package.json-selected pnpm version"
          )
        )
      )
  );

  ciCase("requires every toolchain setup step to run unconditionally", (ci) => {
    rejects(
      ci.replace(TOOLCHAIN_STEP, `${TOOLCHAIN_STEP}\n        if: false`),
      "The toolchain setup step must run unconditionally"
    );
  });

  ciCase("requires every toolchain setup step to stop on failure", (ci) => {
    rejects(
      ci.replace(
        TOOLCHAIN_STEP,
        `${TOOLCHAIN_STEP}\n        continue-on-error: true`
      ),
      "The toolchain setup step must stop on failure"
    );
    accepts(
      ci.replace(
        TOOLCHAIN_STEP,
        `${TOOLCHAIN_STEP}\n        continue-on-error: false`
      )
    );
  });

  ciCase(
    "rejects malformed action inputs without matching unrelated values",
    (ci) => {
      rejects(
        ci.replace(TOOLCHAIN_STEP, `${SETUP_HEADER}\n        with: invalid`),
        "Workflow action inputs must be a mapping"
      );
      accepts(
        ci.replace(
          "          persist-credentials: false",
          "          persist-credentials: false\n          version: stable"
        )
      );
    }
  );

  it.effect.each<readonly [string, string]>([
    ["VERSION: 11", "Workflows must derive the pnpm version from package.json"],
    ["RUNTIME: node@24", RUNTIME_MESSAGE],
    ["NODE-VERSION-FILE: .nvmrc", RUNTIME_MESSAGE],
    ["PACKAGE-JSON-FILE: other/package.json", TOOLCHAIN_MESSAGE],
    ["working-directory: packages/contracts", TOOLCHAIN_MESSAGE],
    ["WORKING-DIRECTORY: packages/contracts", TOOLCHAIN_MESSAGE],
  ])("normalizes pnpm input %s", ([input, message]) =>
    readSource(CI).pipe(
      Effect.map((ci) =>
        rejects(
          ci.replace(
            "          cache: true",
            `          ${input}\n          cache: true`
          ),
          message
        )
      )
    )
  );

  ciCase("normalizes and rejects duplicated input names", (ci) => {
    rejects(
      ci.replace(
        "          cache: true",
        "          CACHE: true\n          cache: true"
      ),
      "Workflow action input cache must not be duplicated case-insensitively"
    );
  });
});
