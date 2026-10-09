import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import { ACTIVE_APP_LOCALES } from "#contracts/locale";
import { ActiveCatalogIdentitySchema } from "#contracts/release/identity";
import { EMPTY_SNAPSHOT_ROW_DIGEST } from "#contracts/release/snapshot/spec";

const inheritedSnapshot = {
  baseSnapshotId: null,
  mode: "inherit",
  resultSnapshotId: null,
  rowCount: 0,
  rowDigest: EMPTY_SNAPSHOT_ROW_DIGEST,
} as const;

const identity = {
  activeAppLocales: ACTIVE_APP_LOCALES,
  manifestHash: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
  releaseId: ReleaseIdSchema.make("test-release"),
  resultCount: 2,
  resultDigest: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  snapshots: {
    program: inheritedSnapshot,
    quran: inheritedSnapshot,
    tryout: inheritedSnapshot,
  },
};

describe("active catalog identity", () => {
  it("decodes the complete identity that production readers share", () => {
    expect(Schema.decodeSync(ActiveCatalogIdentitySchema)(identity)).toEqual(
      identity
    );
  });

  it("requires the integer result count that every release count uses", () => {
    expect(
      Exit.isFailure(
        Schema.decodeExit(ActiveCatalogIdentitySchema)({
          ...identity,
          resultCount: 1.5,
        })
      )
    ).toBe(true);
  });
});
