import { readFileSync } from "node:fs";
import { describe, expect, it } from "@effect/vitest";
import { verifyCiWorkflow } from "#scripts/workflow/ci";
import { repositoryTestTargets } from "#scripts/workflow/target";

const DOLLAR = "$";
const MATRIX_COMMAND_STEP = `run: ${DOLLAR}{{ matrix.command }}`;
const STRATEGY_BLOCK_PATTERN = / {4}strategy:[\s\S]*?\n {4}steps:/u;
const source = readFileSync(".github/workflows/ci.yml", "utf8");
const targets = repositoryTestTargets();
const PUBLISHER_LEG = [
  "          - group: publisher",
  "            command: pnpm exec turbo run test --filter=@nakafa/aksara-publisher --filter=@nakafa/aksara-cli --concurrency=1",
].join("\n");

/** Expects the CI policy to reject one workflow source with the given message. */
function rejects(
  ci: string,
  message: string,
  testTargets: readonly string[] = targets
): void {
  expect(() => verifyCiWorkflow(ci, testTargets)).toThrow(message);
}

describe("CI workflow policy", () => {
  it("accepts parallel checks and four test groups behind one verify job", () => {
    expect(() => verifyCiWorkflow(source, targets)).not.toThrow();
  });

  it("runs CI only for pull requests and merge queue groups", () => {
    rejects(
      source.replace(
        "\n\npermissions:",
        "\n  push:\n    branches: [main]\n\npermissions:"
      ),
      "CI must run only for pull requests and merge queue groups"
    );
  });

  it("keeps the exact parallel job set", () => {
    rejects(
      source.replace("\n  test:\n", "\n  tests:\n"),
      "CI must run checks and tests in parallel behind one verify job"
    );
  });

  it("runs every repository gate", () => {
    rejects(
      source.replace("run: pnpm typecheck", "run: pnpm names"),
      "CI must run every repository gate"
    );
  });

  it("compares visuals with the base of the pull request or merge group", () => {
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
  });

  it("runs each test group through its own matrix command", () => {
    rejects(
      source.replace(MATRIX_COMMAND_STEP, "run: pnpm test"),
      "Each CI test group must run only its matrix command"
    );
  });

  it("runs no command beyond its matrix command", () => {
    rejects(
      source.replace(
        MATRIX_COMMAND_STEP,
        `${MATRIX_COMMAND_STEP}\n      - name: Extra\n        run: pnpm test`
      ),
      "Each CI test group must run only its matrix command"
    );
  });

  it("keeps every test group from passing or being skipped silently", () => {
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
  });

  it("keeps every test group running after one group fails", () => {
    rejects(
      source.replace("fail-fast: false", "fail-fast: true"),
      "Test groups must not cancel one another"
    );
  });

  it("requires the test job to run one matrix leg per test group", () => {
    rejects(
      source.replace(STRATEGY_BLOCK_PATTERN, "    steps:"),
      "The test job must run one matrix leg per test group"
    );
  });

  it("keeps exactly the four test groups", () => {
    const message = "CI must run the four test groups, one matrix leg each";
    rejects(source.replace("- group: voice", "- group: voices"), message);
    rejects(source.replace(`${PUBLISHER_LEG}\n`, ""), message);
  });

  it("rejects matrix keys and leg keys beyond the four groups", () => {
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
  });

  it("runs every test target in exactly one group", () => {
    rejects(
      source,
      "Test target @nakafa/aksara-new must belong to exactly one CI test group",
      [...targets, "@nakafa/aksara-new"]
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
  });

  it("keeps each test group to its own test targets", () => {
    const moved = source
      .replace("--filter=@nakafa/aksara-cli ", "")
      .replace(
        "test:lesson-voice --concurrency=1",
        "test:lesson-voice --filter=@nakafa/aksara-cli --concurrency=1"
      );
    rejects(moved, "Each CI test group must run exactly its own test targets");
  });

  it("runs root test tasks only with the root package selected", () => {
    rejects(
      source.replace("--filter=// ", ""),
      "A CI test group that selects root test tasks with package filters must include --filter=//"
    );
  });

  it("runs every test group through Turbo with one concurrent task", () => {
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
  });

  it("runs each test group as one Turbo run that executes tests", () => {
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
  });

  it("names only repository test targets", () => {
    rejects(
      source,
      "CI test groups must name only repository test targets",
      targets.filter((target) => target !== "@nakafa/aksara-cli")
    );
  });

  it("derives verify from the result of every CI job", () => {
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
  });
});
