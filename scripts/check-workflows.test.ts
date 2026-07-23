import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  readOptionalWorkflow,
  verifyWorkflows,
  type WorkflowSources,
} from "#scripts/check-workflows";

/** Loads the current non-bootstrap workflow sources for policy tests. */
function currentSources(): Omit<WorkflowSources, "bootstrap" | "state"> {
  return {
    packageProof: readFileSync(".github/workflows/package-proof.yml", "utf8"),
    publish: readFileSync(".github/workflows/publish.yml", "utf8"),
    release: readFileSync(".github/workflows/release.yml", "utf8"),
    version: readFileSync(".github/workflows/version.yml", "utf8"),
  };
}

describe("workflow policy", () => {
  it("reads only an existing optional workflow", () => {
    expect(
      readOptionalWorkflow(
        "bootstrap.yml",
        () => false,
        () => "unused"
      )
    ).toBeUndefined();
    expect(
      readOptionalWorkflow(
        "bootstrap.yml",
        () => true,
        (path) => path
      )
    ).toBe("bootstrap.yml");
  });

  it("accepts the completed bootstrap state without a privileged workflow", () => {
    expect(() =>
      verifyWorkflows({
        ...currentSources(),
        bootstrap: undefined,
        state: { contracts: true },
      })
    ).not.toThrow();
  });

  it("rejects a bootstrap workflow without lost-visibility handling", () => {
    const bootstrap = readFileSync(
      ".github/workflows/bootstrap.yml",
      "utf8"
    ).replace(
      'if [[ "$ready" != "true" ]]; then',
      'if [[ "$ready" == "true" ]]; then'
    );

    expect(() =>
      verifyWorkflows({
        ...currentSources(),
        bootstrap,
        state: { contracts: false },
      })
    ).toThrow(
      "Bootstrap must handle a publish result that is not visible in the registry"
    );
  });
});
