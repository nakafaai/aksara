import { readFileSync } from "node:fs";
import { describe, expect, it } from "@effect/vitest";
import {
  manifestPaths,
  manifestTestTargets,
  repositoryTestTargets,
  verifyCiWorkflow,
} from "#scripts/workflow/ci";

const DOLLAR = "$";
const MATRIX_COMMAND_STEP = `run: ${DOLLAR}{{ matrix.command }}`;
const STRATEGY_BLOCK_PATTERN = / {4}strategy:[\s\S]*?\n {4}steps:/u;
const source = readFileSync(".github/workflows/ci.yml", "utf8");
const targets = repositoryTestTargets();
const PUBLISHER_LEG = [
  "          - group: publisher",
  "            command: pnpm exec turbo run test --filter=@nakafa/aksara-publisher --filter=@nakafa/aksara-cli --concurrency=1",
].join("\n");

describe("CI workflow policy", () => {
  it("accepts parallel checks and four test groups behind one verify job", () => {
    expect(() => verifyCiWorkflow(source, targets)).not.toThrow();
  });

  it("runs CI only for pull requests and merge queue groups", () => {
    const ci = source.replace(
      "\n\npermissions:",
      "\n  push:\n    branches: [main]\n\npermissions:"
    );
    expect(() => verifyCiWorkflow(ci, targets)).toThrow(
      "CI must run only for pull requests and merge queue groups"
    );
  });

  it("keeps the exact parallel job set", () => {
    expect(() =>
      verifyCiWorkflow(source.replace("\n  test:\n", "\n  tests:\n"), targets)
    ).toThrow("CI must run checks and tests in parallel behind one verify job");
  });

  it("runs every repository gate", () => {
    expect(() =>
      verifyCiWorkflow(
        source.replace("run: pnpm typecheck", "run: pnpm names"),
        targets
      )
    ).toThrow("CI must run every repository gate");
  });

  it("compares visuals with the base of the pull request or merge group", () => {
    const message =
      "CI must compare lesson visuals with the base of the pull request or merge group";
    expect(() =>
      verifyCiWorkflow(
        source.replace(
          'run: pnpm points --base "$BASE_SHA"',
          "run: pnpm points"
        ),
        targets
      )
    ).toThrow(message);
    expect(() =>
      verifyCiWorkflow(
        source.replace("github.event.merge_group.base_sha", "github.sha"),
        targets
      )
    ).toThrow(message);
    expect(() =>
      verifyCiWorkflow(
        source.replace(
          'run: pnpm points --base "$BASE_SHA"',
          "run: pnpm names"
        ),
        targets
      )
    ).toThrow("CI must run every repository gate");
  });

  it("runs each test group through its own matrix command", () => {
    expect(() =>
      verifyCiWorkflow(
        source.replace(MATRIX_COMMAND_STEP, "run: pnpm test"),
        targets
      )
    ).toThrow("Every CI test group must run its own matrix command");
  });

  it("keeps every test group running after one group fails", () => {
    expect(() =>
      verifyCiWorkflow(
        source.replace("fail-fast: false", "fail-fast: true"),
        targets
      )
    ).toThrow("Test groups must not cancel one another");
  });

  it("requires the test job to run one matrix leg per test group", () => {
    const withoutMatrix = source.replace(STRATEGY_BLOCK_PATTERN, "    steps:");
    expect(() => verifyCiWorkflow(withoutMatrix, targets)).toThrow(
      "The test job must run one matrix leg per test group"
    );
  });

  it("keeps exactly the four test groups", () => {
    expect(() =>
      verifyCiWorkflow(
        source.replace("- group: voice", "- group: voices"),
        targets
      )
    ).toThrow("CI must run the four test groups, one matrix leg each");
    expect(() =>
      verifyCiWorkflow(source.replace(`${PUBLISHER_LEG}\n`, ""), targets)
    ).toThrow("CI must run the four test groups, one matrix leg each");
  });

  it("runs every test target in exactly one group", () => {
    expect(() =>
      verifyCiWorkflow(source, [...targets, "@nakafa/aksara-new"])
    ).toThrow(
      "Test target @nakafa/aksara-new must belong to exactly one CI test group"
    );
    expect(() =>
      verifyCiWorkflow(
        source.replace("--filter=@nakafa/aksara-cli ", ""),
        targets
      )
    ).toThrow(
      "Test target @nakafa/aksara-cli must belong to exactly one CI test group"
    );
    expect(() =>
      verifyCiWorkflow(
        source.replace(
          "--filter=@nakafa/aksara-publisher ",
          "--filter=@nakafa/aksara-publisher --filter=@nakafa/aksara-corpus "
        ),
        targets
      )
    ).toThrow(
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
    expect(() => verifyCiWorkflow(moved, targets)).toThrow(
      "Each CI test group must run exactly its own test targets"
    );
  });

  it("runs every test group through Turbo with one concurrent task", () => {
    const message =
      "Each CI test group must run through Turbo with --concurrency=1";
    expect(() =>
      verifyCiWorkflow(
        source.replace(
          "test:lesson-voice --concurrency=1",
          "test:lesson-voice"
        ),
        targets
      )
    ).toThrow(message);
    expect(() =>
      verifyCiWorkflow(
        source.replace(
          "command: pnpm exec turbo run test:lesson-voice",
          "command: pnpm test:lesson-voice"
        ),
        targets
      )
    ).toThrow(message);
  });

  it("names only repository test targets", () => {
    expect(() =>
      verifyCiWorkflow(
        source,
        targets.filter((target) => target !== "@nakafa/aksara-cli")
      )
    ).toThrow("CI test groups must name only repository test targets");
  });

  it("derives verify from the result of every CI job", () => {
    expect(() =>
      verifyCiWorkflow(
        source.replace("needs: [checks, test]", "needs: [checks]"),
        targets
      )
    ).toThrow("The verify check must wait for every CI job");
    expect(() =>
      verifyCiWorkflow(source.replace("!cancelled()", "success()"), targets)
    ).toThrow("The verify check must report when a CI job fails");
    expect(() =>
      verifyCiWorkflow(
        source.replace(' && test "$TEST" = success', ""),
        targets
      )
    ).toThrow("The verify check must fail unless every CI job succeeds");
  });
});

describe("test target discovery", () => {
  it("lists root test:* tasks and workspaces with a test script", () => {
    expect(
      manifestTestTargets(
        "package.json",
        JSON.stringify({
          name: "aksara",
          scripts: { test: "turbo run test", "test:root": "vitest run" },
        })
      )
    ).toEqual(["test:root"]);
    expect(
      manifestTestTargets(
        "packages/corpus/package.json",
        JSON.stringify({
          name: "@nakafa/aksara-corpus",
          scripts: { test: "vitest run" },
        })
      )
    ).toEqual(["@nakafa/aksara-corpus"]);
    expect(
      manifestTestTargets(
        "packages/testing/package.json",
        JSON.stringify({
          name: "@nakafa/testing",
          scripts: { build: "tsc" },
        })
      )
    ).toEqual([]);
  });

  it("lists nothing for a manifest without scripts", () => {
    expect(
      manifestTestTargets(
        "packages/typescript-config/package.json",
        JSON.stringify({ name: "@nakafa/typescript-config" })
      )
    ).toEqual([]);
  });

  it("rejects a file that is not a package manifest", () => {
    expect(() =>
      manifestTestTargets("packages/broken/package.json", "{}")
    ).toThrow("packages/broken/package.json must be a package manifest");
    expect(() =>
      manifestTestTargets("packages/broken/package.json", "{")
    ).toThrow("packages/broken/package.json must be a package manifest");
  });

  it("finds workspaces under any pnpm glob, not only the default layout", () => {
    expect(
      manifestPaths("packages:\n  - tools/*\n", [
        "package.json",
        "apps/www/package.json",
        "tools/lint/package.json",
        "tools/lint/src/package.json",
        "tools/lint/index.ts",
      ])
    ).toEqual(["package.json", "tools/lint/package.json"]);
  });

  it("rejects a workspace glob that is not a plain directory", () => {
    expect(() => manifestPaths("packages:\n  - packages/**\n", [])).toThrow(
      "Workspace glob packages/** must be a plain directory followed by /*, such as apps/*"
    );
  });

  it("rejects a workspace file that is not valid YAML or names no packages", () => {
    expect(() => manifestPaths("packages: [\n", [])).toThrow(
      "pnpm-workspace.yaml must be valid YAML"
    );
    expect(() => manifestPaths("catalog: {}\n", [])).toThrow(
      "pnpm-workspace.yaml must declare its packages"
    );
  });
});
