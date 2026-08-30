import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { verifyCliWorkflow } from "#scripts/workflow/cli";

const source = readFileSync(".github/workflows/cli.yml", "utf8");

describe("CLI workflow policy", () => {
  it("accepts isolated exact-byte npm publication", () => {
    expect(() => verifyCliWorkflow(source)).not.toThrow();
  });

  it("isolates verification from npm publishing identity", () => {
    expect(() =>
      verifyCliWorkflow(
        source.replace(
          "      contents: read",
          "      contents: read\n      id-token: write"
        )
      )
    ).toThrow("CLI verification must not receive npm publishing identity");
    expect(() =>
      verifyCliWorkflow(`${source}\n      - run: node scripts/publish.ts`)
    ).toThrow(
      "The privileged CLI job must not checkout or execute repository code"
    );
  });

  it("requires exact archive transport and bootstrap authentication", () => {
    expect(() =>
      verifyCliWorkflow(
        source.replaceAll(
          "EXPECTED_PACKAGE_SHA256",
          "UNVERIFIED_PACKAGE_SHA256"
        )
      )
    ).toThrow(
      "CLI publication must transport and reverify the exact built archive"
    );
    expect(() =>
      verifyCliWorkflow(
        source.replace("NPM_CONFIG_USERCONFIG:", "UNCONFIGURED_USERCONFIG:")
      )
    ).toThrow(
      "The initial CLI publication must configure the bootstrap npm credential"
    );
  });
});
