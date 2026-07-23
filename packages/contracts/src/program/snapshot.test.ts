import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  PROGRAM_ROW_COUNT,
  PROGRAM_SLUG_COUNT,
  PROGRAM_SNAPSHOT_FORMAT,
  ProgramSnapshotInputSchema,
  ProgramSnapshotSchema,
} from "#contracts/program/snapshot";

const digest = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const snapshotId = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);

/** Returns complete technical snapshot facts for contract tests. */
function snapshotInput() {
  return {
    format: PROGRAM_SNAPSHOT_FORMAT,
    locales: ["en", "id"],
    rowCount: PROGRAM_ROW_COUNT,
    rowDigest: digest,
    slugCount: PROGRAM_SLUG_COUNT,
  };
}

describe("program snapshot contract", () => {
  it("accepts the complete six-row en/id snapshot", () => {
    const input = Schema.decodeUnknownSync(ProgramSnapshotInputSchema)(
      snapshotInput()
    );
    const snapshot = Schema.decodeUnknownSync(ProgramSnapshotSchema)({
      ...input,
      snapshotId,
    });

    expect(snapshot).toMatchObject({
      locales: ["en", "id"],
      rowCount: 6,
      slugCount: 12,
    });
  });

  it("rejects incomplete snapshot inputs and manifests", () => {
    const inputResults = [{ rowCount: 5 }, { slugCount: 11 }].map((change) =>
      Schema.decodeUnknownEither(ProgramSnapshotInputSchema)({
        ...snapshotInput(),
        ...change,
      })
    );
    const manifestResults = [{ rowCount: 7 }, { slugCount: 13 }].map((change) =>
      Schema.decodeUnknownEither(ProgramSnapshotSchema)({
        ...snapshotInput(),
        ...change,
        snapshotId,
      })
    );

    for (const result of [...inputResults, ...manifestResults]) {
      expect(Either.isLeft(result)).toBe(true);
      expect(String(result)).toContain(
        "Expected six program rows with complete en/id public slugs."
      );
    }
  });
});
