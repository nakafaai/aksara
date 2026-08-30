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

  it("requires exact transport and protected bootstrap publication", () => {
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
        source.replace("environment: npm-production", "environment: staging")
      )
    ).toThrow(
      "CLI publication must require the protected npm production environment"
    );
    expect(() =>
      verifyCliWorkflow(
        source.replace(
          "    environment: npm-production",
          "    # environment: npm-production"
        )
      )
    ).toThrow(
      "CLI publication must require the protected npm production environment"
    );
    expect(() =>
      verifyCliWorkflow(
        source.replace(
          "secrets.NPM_BOOTSTRAP_TOKEN",
          "secrets.UNPROTECTED_TOKEN"
        )
      )
    ).toThrow(
      "Initial CLI publication must use the protected bootstrap credential"
    );
    expect(() =>
      verifyCliWorkflow(
        source.replace(
          "      - name: Verify stable package version",
          "      - name: Accept any package version"
        )
      )
    ).toThrow("CLI production publication must reject prerelease versions");
    expect(() =>
      verifyCliWorkflow(
        source.replace(
          "      - name: Verify stable package version\n        run: |",
          "      - name: Verify stable package version\n        if: false\n        run: |"
        )
      )
    ).toThrow("CLI production publication must reject prerelease versions");
  });
});
