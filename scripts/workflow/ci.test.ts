import { readFileSync } from "node:fs";
import { describe, expect, it } from "@effect/vitest";
import { verifyCiWorkflow } from "#scripts/workflow/ci";

const source = readFileSync(".github/workflows/ci.yml", "utf8");

describe("CI workflow policy", () => {
  it("accepts parallel checks and tests behind one verify job", () => {
    expect(() => verifyCiWorkflow(source)).not.toThrow();
  });

  it("runs CI only for pull requests and merge queue groups", () => {
    const ci = source.replace(
      "\n\npermissions:",
      "\n  push:\n    branches: [main]\n\npermissions:"
    );
    expect(() => verifyCiWorkflow(ci)).toThrow(
      "CI must run only for pull requests and merge queue groups"
    );
  });

  it("keeps the exact parallel job set", () => {
    expect(() =>
      verifyCiWorkflow(source.replace("\n  test:\n", "\n  tests:\n"))
    ).toThrow("CI must run checks and tests in parallel behind one verify job");
  });

  it("runs every repository gate and workspace test", () => {
    expect(() =>
      verifyCiWorkflow(source.replace("run: pnpm typecheck", "run: pnpm names"))
    ).toThrow("CI must run every repository gate");
    expect(() =>
      verifyCiWorkflow(source.replace("run: pnpm test", "run: pnpm test:root"))
    ).toThrow("CI must run every workspace test");
  });

  it("derives verify from the result of every CI job", () => {
    expect(() =>
      verifyCiWorkflow(
        source.replace("needs: [checks, test]", "needs: [checks]")
      )
    ).toThrow("The verify check must wait for every CI job");
    expect(() =>
      verifyCiWorkflow(source.replace("!cancelled()", "success()"))
    ).toThrow("The verify check must report when a CI job fails");
    expect(() =>
      verifyCiWorkflow(source.replace(' && test "$TEST" = success', ""))
    ).toThrow("The verify check must fail unless every CI job succeeds");
  });
});
