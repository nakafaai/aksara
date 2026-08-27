import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { verifyMigrationWorkflow } from "#scripts/workflow/migration";

const migration = readFileSync(".github/workflows/migration.yml", "utf8");

describe("migration workflow policy", () => {
  it("accepts the exact immutable receipt lifecycle", () => {
    expect(() => verifyMigrationWorkflow(migration)).not.toThrow();
  });

  it("requires cleanup to download the durable public release", () => {
    expect(() =>
      verifyMigrationWorkflow(
        migration.replace(
          'gh release download "$RELEASE_TAG"',
          'gh artifact download "$RELEASE_TAG"'
        )
      )
    ).toThrow(
      "Migration cleanup must reverify the public receipt before deletion"
    );
  });

  it("keeps repository code out of the privileged publish job", () => {
    expect(() =>
      verifyMigrationWorkflow(
        migration.replace(
          "      - name: Download signed receipt",
          "      - run: node scripts/publish.ts\n      - name: Download signed receipt"
        )
      )
    ).toThrow("Migration publication must not execute repository code");
  });

  it("keeps signing credentials out of destructive cleanup", () => {
    expect(() =>
      verifyMigrationWorkflow(
        `${migration}\n          AKSARA_SIGNING_PRIVATE_KEY: unsafe`
      )
    ).toThrow("Migration cleanup must not receive signing credentials");
  });

  it("rejects fixed release propagation waits", () => {
    expect(() =>
      verifyMigrationWorkflow(`${migration}\n      - run: sleep 5`)
    ).toThrow("Migration must not rely on fixed propagation waits");
  });
});
