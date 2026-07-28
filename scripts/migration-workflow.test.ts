import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { verifyMaterialMigrationWorkflow } from "#scripts/migration-workflow";

/** Reads the exact temporary migration workflow exercised by policy. */
function workflowSource() {
  return readFileSync(".github/workflows/material-migration.yml", "utf8");
}

describe("material migration workflow", () => {
  it("accepts the exact bounded migration operator", () => {
    expect(() =>
      verifyMaterialMigrationWorkflow(workflowSource())
    ).not.toThrow();
  });

  it.each([
    [
      "contracts-v0.3.1",
      "contracts-v0.3.0",
      "Material migration must execute the immutable reviewed 0.3.1 source",
    ],
    [
      "environment: content-production",
      "environment: unprotected",
      "Material migration must use one protected production operation",
    ],
    [
      "Deletion gate: remove this workflow",
      "Permanent migration workflow",
      "Material migration must declare its exact deletion gate",
    ],
    [
      "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1",
      "actions/checkout@main",
      "Material migration action actions/checkout@main must use an exact commit",
    ],
  ])(
    "rejects a weakened migration control",
    (current, replacement, message) => {
      expect(() =>
        verifyMaterialMigrationWorkflow(
          workflowSource().replace(current, replacement)
        )
      ).toThrow(message);
    }
  );

  it("rejects any content scope beyond the exact migration pair", () => {
    expect(() =>
      verifyMaterialMigrationWorkflow(
        workflowSource().replace(
          "          --scope content:material:en:",
          "          --scope content:article:en:articles/education/test\n          --scope content:material:en:"
        )
      )
    ).toThrow(
      "Material migration must publish only the two real Function Concept documents"
    );
  });

  it("requires both jobs to preserve the reviewed checkout after install", () => {
    const source = workflowSource();
    const integrityCheck =
      '          if [[ "$(git -C "$MIGRATION_ROOT" rev-parse --verify HEAD)" != "$MIGRATION_SHA" ]]; then';
    const lastCheck = source.lastIndexOf(integrityCheck);
    const weakened = `${source.slice(0, lastCheck)}${source
      .slice(lastCheck)
      .replace(integrityCheck, "          if false; then")}`;

    expect(() => verifyMaterialMigrationWorkflow(weakened)).toThrow(
      "Material migration operation must preserve post-install checkout integrity"
    );
  });

  it("requires both jobs to remain guarded by main and repository identity", () => {
    expect(() =>
      verifyMaterialMigrationWorkflow(
        workflowSource().replace(
          "      github.ref == 'refs/heads/main'",
          "      github.ref != 'refs/heads/main'"
        )
      )
    ).toThrow("Material migration source proof must run only from main");
  });

  it("keeps workflow identities aligned with the pinned ReleaseIdSchema", () => {
    expect(() =>
      verifyMaterialMigrationWorkflow(
        workflowSource().replace(
          "^[a-z0-9][a-z0-9._-]{0,127}$",
          "^[a-z0-9][a-z0-9-]*[a-z0-9]$"
        )
      )
    ).toThrow(
      "Material migration identities must match the pinned ReleaseIdSchema"
    );
  });

  it("proves the archive against the pinned package manifest", () => {
    expect(() =>
      verifyMaterialMigrationWorkflow(
        workflowSource().replace(
          '            --package "$MIGRATION_ROOT/packages/contracts/package.json" \\\n',
          ""
        )
      )
    ).toThrow(
      "Material migration must verify and prove its source before approval"
    );
  });
});
