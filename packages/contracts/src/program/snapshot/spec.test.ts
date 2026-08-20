import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  PROGRAM_SNAPSHOT_FORMAT,
  ProgramSnapshotFactsSchema,
  ProgramSnapshotSchema,
} from "#contracts/program/snapshot/spec";

const digest = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const facts = {
  activeAppLocales: ["en", "id"],
  curriculumRowCount: 5,
  programRowCount: 3,
  rowCount: 8,
  rowDigest: digest,
  sitemapCount: 4,
  slugCount: 6,
};

describe("program snapshot contract", () => {
  it("accepts source-derived current snapshot evidence", () => {
    const decoded = Schema.decodeUnknownSync(ProgramSnapshotFactsSchema)(facts);
    const snapshot = Schema.decodeUnknownSync(ProgramSnapshotSchema)({
      ...facts,
      format: PROGRAM_SNAPSHOT_FORMAT,
      snapshotId: digest,
    });
    expect(decoded.activeAppLocales).toEqual(["en", "id"]);
    expect(snapshot.format).toBe("localized-program-snapshot");
  });

  it("rejects internally inconsistent facts and snapshots", () => {
    for (const change of [
      { programRowCount: 0 },
      { rowCount: 7 },
      { sitemapCount: 6 },
      { slugCount: 5 },
    ]) {
      const factResult = Schema.decodeUnknownExit(ProgramSnapshotFactsSchema)({
        ...facts,
        ...change,
      });
      const snapshotResult = Schema.decodeUnknownExit(ProgramSnapshotSchema)({
        ...facts,
        ...change,
        format: PROGRAM_SNAPSHOT_FORMAT,
        snapshotId: digest,
      });
      expect(Exit.isFailure(factResult)).toBe(true);
      expect(Exit.isFailure(snapshotResult)).toBe(true);
    }
    expect(
      String(
        Schema.decodeUnknownExit(ProgramSnapshotFactsSchema)({
          ...facts,
          programRowCount: 0,
        })
      )
    ).toContain(
      "Expected self-consistent program and curriculum snapshot counts."
    );
    expect(
      String(
        Schema.decodeUnknownExit(ProgramSnapshotSchema)({
          ...facts,
          format: PROGRAM_SNAPSHOT_FORMAT,
          rowCount: 7,
          snapshotId: digest,
        })
      )
    ).toContain(
      "Expected self-consistent program and curriculum snapshot counts."
    );
  });
});
