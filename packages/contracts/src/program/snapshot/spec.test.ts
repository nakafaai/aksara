import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  PROGRAM_SNAPSHOT_FORMAT,
  ProgramSnapshotInputSchema,
  ProgramSnapshotSchema,
} from "#contracts/program/snapshot/spec";

const digest = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const snapshotId = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);

/** Returns complete technical snapshot facts for contract tests. */
function snapshotInput() {
  return {
    curriculumRowCount: 5,
    format: PROGRAM_SNAPSHOT_FORMAT,
    locales: ["en", "id"],
    programRowCount: 3,
    rowCount: 8,
    rowDigest: digest,
    sitemapCount: 4,
    slugCount: 6,
  };
}

describe("program snapshot contract", () => {
  it("accepts source-derived program and curriculum evidence", () => {
    const input = Schema.decodeUnknownSync(ProgramSnapshotInputSchema)(
      snapshotInput()
    );
    const snapshot = Schema.decodeUnknownSync(ProgramSnapshotSchema)({
      ...input,
      snapshotId,
    });

    expect(snapshot).toMatchObject({
      curriculumRowCount: 5,
      locales: ["en", "id"],
      programRowCount: 3,
      rowCount: 8,
      sitemapCount: 4,
      slugCount: 6,
    });
  });

  it("rejects internally inconsistent snapshot inputs and manifests", () => {
    const changes = [
      { programRowCount: 0 },
      { rowCount: 7 },
      { sitemapCount: 6 },
      { slugCount: 5 },
    ];
    const inputResults = changes.map((change) =>
      Schema.decodeUnknownEither(ProgramSnapshotInputSchema)({
        ...snapshotInput(),
        ...change,
      })
    );
    const manifestResults = changes.map((change) =>
      Schema.decodeUnknownEither(ProgramSnapshotSchema)({
        ...snapshotInput(),
        ...change,
        snapshotId,
      })
    );

    for (const result of [...inputResults, ...manifestResults]) {
      expect(Either.isLeft(result)).toBe(true);
      expect(String(result)).toContain(
        "Expected self-consistent program and curriculum snapshot counts."
      );
    }
  });
});
