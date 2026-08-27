import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { verifyMigrationWorkflow } from "#scripts/workflow/migration";

const migration = readFileSync(".github/workflows/migration.yml", "utf8");
const PUBLICATION_TOKEN_LINE_PATTERN = / {10}AKSARA_PUBLICATION_TOKEN: .+/u;

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

  it("requires abort to use its protected exact-revision operation", () => {
    expect(() =>
      verifyMigrationWorkflow(
        migration.replace("migrate:abort", "migrate:unsafe")
      )
    ).toThrow("Migration abort must use the protected exact-revision path");
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

  it("keeps signing credentials out of staging abort", () => {
    expect(() =>
      verifyMigrationWorkflow(
        migration.replace(
          PUBLICATION_TOKEN_LINE_PATTERN,
          "          AKSARA_SIGNING_PRIVATE_KEY: unsafe"
        )
      )
    ).toThrow("Migration abort must not receive signing credentials");
  });

  it("rejects fixed release propagation waits", () => {
    expect(() =>
      verifyMigrationWorkflow(`${migration}\n      - run: sleep 5`)
    ).toThrow("Migration must not rely on fixed propagation waits");
  });
});
