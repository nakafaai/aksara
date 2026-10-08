import { readFileSync } from "node:fs";
import { NodeServices } from "@effect/platform-node";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { verifyCiWorkflow } from "#scripts/workflow/ci";
import { repositoryTestTargets } from "#scripts/workflow/target";

const DOLLAR = "$";
const MATRIX_COMMAND_STEP = `run: ${DOLLAR}{{ matrix.command }}`;
const STRATEGY_BLOCK_PATTERN = / {4}strategy:[\s\S]*?\n {4}steps:/u;
const source = readFileSync(".github/workflows/ci.yml", "utf8");
const PUBLISHER_LEG = [
  "          - group: publisher",
  "            command: pnpm exec turbo run test --filter=@nakafa/aksara-publisher --filter=@nakafa/aksara-cli --concurrency=1",
].join("\n");

/** Expects the CI policy to reject one workflow source with the given message. */
function rejectsFor(testTargets: readonly string[]) {
  return (ci: string, message: string): void => {
    expect(() => verifyCiWorkflow(ci, testTargets)).toThrow(message);
  };
}

/** Declares one CI policy test whose body receives the repository's test targets. */
function policyTest(
  check: (
    rejects: ReturnType<typeof rejectsFor>,
    targets: readonly string[]
  ) => void,
  name: string
) {
  return it.effect(name, () =>
    repositoryTestTargets().pipe(
      Effect.map((targets) => check(rejectsFor(targets), targets)),
      Effect.provide(NodeServices.layer)
    )
  );
}

describe("CI workflow policy", () => {
  policyTest((_rejects, targets) => {
    expect(() => verifyCiWorkflow(source, targets)).not.toThrow();
  }, "accepts parallel checks and four test groups behind one verify job");
  policyTest((rejects) => {
    rejects(
      source.replace(
        "\n\npermissions:",
        "\n  push:\n    branches: [main]\n\npermissions:"
      ),
      "CI must run only for pull requests and merge queue groups"
    );
  }, "runs CI only for pull requests and merge queue groups");
  policyTest((rejects) => {
    rejects(
      source.replace("\n  test:\n", "\n  tests:\n"),
      "CI must run checks and tests in parallel behind one verify job"
    );
  }, "keeps the exact parallel job set");
  policyTest((rejects) => {
    rejects(
      source.replace("run: pnpm typecheck", "run: pnpm names"),
      "CI must run every repository gate"
    );
  }, "runs every repository gate");
  policyTest((rejects) => {
    const message =
      "CI must compare lesson visuals with the base of the pull request or merge group";
    rejects(
      source.replace('run: pnpm points --base "$BASE_SHA"', "run: pnpm points"),
      message
    );
    rejects(
      source.replace("github.event.merge_group.base_sha", "github.sha"),
      message
    );
    rejects(
      source.replace('run: pnpm points --base "$BASE_SHA"', "run: pnpm names"),
      "CI must run every repository gate"
    );
  }, "compares visuals with the base of the pull request or merge group");
  policyTest((rejects) => {
    rejects(
      source.replace(MATRIX_COMMAND_STEP, "run: pnpm test"),
      "Each CI test group must run only its matrix command"
    );
  }, "runs each test group through its own matrix command");
  policyTest((rejects) => {
    rejects(
      source.replace(
        MATRIX_COMMAND_STEP,
        `${MATRIX_COMMAND_STEP}\n      - name: Extra\n        run: pnpm test`
      ),
      "Each CI test group must run only its matrix command"
    );
  }, "runs no command beyond its matrix command");
  policyTest((rejects) => {
    const message =
      "The test job may carry only the keys that run each test group";
    rejects(
      source.replace(
        "    timeout-minutes: 20\n    strategy:",
        `    timeout-minutes: 20\n    continue-on-error: ${DOLLAR}{{ matrix.group == 'voice' }}\n    strategy:`
      ),
      message
    );
    rejects(
      source.replace(
        MATRIX_COMMAND_STEP,
        `continue-on-error: true\n        ${MATRIX_COMMAND_STEP}`
      ),
      message
    );
    rejects(
      source.replace(
        MATRIX_COMMAND_STEP,
        `if: matrix.group != 'voice'\n        ${MATRIX_COMMAND_STEP}`
      ),
      message
    );
    rejects(
      source.replace(
        MATRIX_COMMAND_STEP,
        `shell: "true {0}"\n        ${MATRIX_COMMAND_STEP}`
      ),
      message
    );
  }, "keeps every test group from passing or being skipped silently");
  policyTest((rejects) => {
    rejects(
      source.replace("fail-fast: false", "fail-fast: true"),
      "Test groups must not cancel one another"
    );
  }, "keeps every test group running after one group fails");
  policyTest((rejects) => {
    rejects(
      source.replace(STRATEGY_BLOCK_PATTERN, "    steps:"),
      "The test job must run one matrix leg per test group"
    );
  }, "requires the test job to run one matrix leg per test group");
  policyTest((rejects) => {
    const message = "CI must run the four test groups, one matrix leg each";
    rejects(source.replace("- group: voice", "- group: voices"), message);
    rejects(source.replace(`${PUBLISHER_LEG}\n`, ""), message);
  }, "keeps exactly the four test groups");
  policyTest((rejects) => {
    const message = "The test job must run one matrix leg per test group";
    rejects(
      source.replace(
        "      matrix:\n        include:",
        "      matrix:\n        exclude:\n          - group: voice\n        include:"
      ),
      message
    );
    rejects(
      source.replace(
        "      matrix:\n        include:",
        "      matrix:\n        shard: [1, 2]\n        include:"
      ),
      message
    );
    rejects(
      source.replace(
        "- group: voice",
        "- group: voice\n            os: ubuntu-latest"
      ),
      message
    );
  }, "rejects matrix keys and leg keys beyond the four groups");
  policyTest((rejects, targets) => {
    expect(() =>
      verifyCiWorkflow(source, [...targets, "@nakafa/aksara-new"])
    ).toThrow(
      "Test target @nakafa/aksara-new must belong to exactly one CI test group"
    );
    rejects(
      source.replace("--filter=@nakafa/aksara-cli ", ""),
      "Test target @nakafa/aksara-cli must belong to exactly one CI test group"
    );
    rejects(
      source.replace(
        "--filter=@nakafa/aksara-publisher ",
        "--filter=@nakafa/aksara-publisher --filter=@nakafa/aksara-corpus "
      ),
      "Test target @nakafa/aksara-corpus must belong to exactly one CI test group"
    );
  }, "runs every test target in exactly one group");
  policyTest((rejects) => {
    const moved = source
      .replace("--filter=@nakafa/aksara-cli ", "")
      .replace(
        "test:lesson-voice --concurrency=1",
        "test:lesson-voice --filter=@nakafa/aksara-cli --concurrency=1"
      );
    rejects(moved, "Each CI test group must run exactly its own test targets");
  }, "keeps each test group to its own test targets");
  policyTest((rejects) => {
    rejects(
      source.replace("--filter=// ", ""),
      "A CI test group that selects root test tasks with package filters must include --filter=//"
    );
  }, "runs root test tasks only with the root package selected");
  policyTest((rejects) => {
    const message =
      "Each CI test group must run through Turbo with --concurrency=1";
    rejects(
      source.replace("test:lesson-voice --concurrency=1", "test:lesson-voice"),
      message
    );
    rejects(
      source.replace(
        "command: pnpm exec turbo run test:lesson-voice",
        "command: pnpm test:lesson-voice"
      ),
      message
    );
  }, "runs every test group through Turbo with one concurrent task");
  policyTest((rejects) => {
    const message =
      "Each CI test group must run through Turbo with --concurrency=1";
    const voice =
      "command: pnpm exec turbo run test:lesson-voice --concurrency=1";
    rejects(
      source.replace(
        voice,
        `${voice} && pnpm exec turbo run test --concurrency=1`
      ),
      message
    );
    rejects(
      source.replace(
        voice,
        "command: pnpm exec turbo run test:lesson-voice --dry=json --concurrency=1"
      ),
      message
    );
    rejects(
      source.replace(
        voice,
        'command: "pnpm exec turbo run test:lesson-voice --concurrency=1\\npnpm test"'
      ),
      message
    );
  }, "runs each test group as one Turbo run that executes tests");
  policyTest((_rejects, targets) => {
    expect(() =>
      verifyCiWorkflow(
        source,
        targets.filter((target) => target !== "@nakafa/aksara-cli")
      )
    ).toThrow("CI test groups must name only repository test targets");
  }, "names only repository test targets");
  policyTest((rejects) => {
    rejects(
      source.replace("needs: [checks, test]", "needs: [checks]"),
      "The verify check must wait for every CI job"
    );
    rejects(
      source.replace("!cancelled()", "success()"),
      "The verify check must report when a CI job fails"
    );
    rejects(
      source.replace(' && test "$TEST" = success', ""),
      "The verify check must fail unless every CI job succeeds"
    );
  }, "derives verify from the result of every CI job");
});
