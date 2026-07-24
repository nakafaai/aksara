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
    curriculumRowCount: 390,
    format: PROGRAM_SNAPSHOT_FORMAT,
    locales: ["en", "id"],
    programRowCount: PROGRAM_ROW_COUNT,
    rowCount: 396,
    rowDigest: digest,
    sitemapCount: 52,
    slugCount: PROGRAM_SLUG_COUNT,
  };
}

describe("program snapshot contract", () => {
  it("accepts complete program and curriculum evidence", () => {
    const input = Schema.decodeUnknownSync(ProgramSnapshotInputSchema)(
      snapshotInput()
    );
    const snapshot = Schema.decodeUnknownSync(ProgramSnapshotSchema)({
      ...input,
      snapshotId,
    });

    expect(snapshot).toMatchObject({
      curriculumRowCount: 390,
      locales: ["en", "id"],
      programRowCount: 6,
      rowCount: 396,
      sitemapCount: 52,
      slugCount: 12,
    });
  });

  it("rejects incomplete snapshot inputs and manifests", () => {
    const changes = [
      { curriculumRowCount: 0 },
      { programRowCount: 5 },
      { rowCount: 395 },
      { sitemapCount: 391 },
      { slugCount: 11 },
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
        "Expected six program rows and a complete aggregate curriculum route set."
      );
    }
  });
});
