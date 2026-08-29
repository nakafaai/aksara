import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { verifyMigrationWorkflow } from "#scripts/workflow/migration";

const migration = readFileSync(".github/workflows/migration.yml", "utf8");
const PUBLICATION_TOKEN_LINE_PATTERN = / {10}AKSARA_PUBLICATION_TOKEN: .+/u;

describe("migration workflow policy", () => {
  it("accepts the exact immutable recovery lifecycle", () => {
    expect(() => verifyMigrationWorkflow(migration)).not.toThrow();
  });

  it("requires the exact reviewed genesis identity", () => {
    expect(() =>
      verifyMigrationWorkflow(
        migration.replace(
          "sha256:6613c0fe37c6fbc94bc88fa59bacf20d664f6568f8da4dab8347396685573bd1",
          `sha256:${"f".repeat(64)}`
        )
      )
    ).toThrow("Genesis signing must bind the exact reviewed runtime payload");
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

  it("requires resumed cleanup to use the immutable release source", () => {
    expect(() =>
      verifyMigrationWorkflow(
        migration.replace(
          '--source-digest "$SOURCE_SHA"',
          '--source-digest "$GITHUB_SHA"'
        )
      )
    ).toThrow(
      "Migration cleanup must reverify the public receipt before deletion"
    );
  });

  it("requires cleanup to reject a new receipt lifecycle", () => {
    expect(() =>
      verifyMigrationWorkflow(
        migration.replace("inputs.operation == 'cleanup'", "false")
      )
    ).toThrow(
      "Migration cleanup must reverify the public receipt before deletion"
    );
  });

  it("requires one canonical cleanup migration identity", () => {
    expect(() =>
      verifyMigrationWorkflow(
        migration.replaceAll("^[a-z0-9][a-z0-9._-]{0,127}$", "^[\\s\\S]+$")
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

  it("rejects a redundant package-script argument delimiter", () => {
    expect(() =>
      verifyMigrationWorkflow(
        migration.replace(
          "migrate\n          --release-id",
          "migrate --\n          --release-id"
        )
      )
    ).toThrow("Migration sealing must produce and attest one exact receipt");
  });

  it("keeps repository code out of the privileged publish job", () => {
    expect(() =>
      verifyMigrationWorkflow(
        migration.replace(
          "      - name: Download signed asset",
          "      - run: node scripts/publish.ts\n      - name: Download signed asset"
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
