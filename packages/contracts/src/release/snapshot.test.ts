import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  baseContentSnapshots,
  ContentSnapshotSetSchema,
  ContentSnapshotStateSchema,
  canonicalizeContentSnapshotSet,
  EMPTY_SNAPSHOT_ROW_DIGEST,
  emptyContentSnapshots,
  hasEmptySnapshotBases,
  hasGitSnapshotModes,
  hasRollbackSnapshotModes,
  hasSameContentSnapshots,
  inheritContentSnapshot,
  inheritContentSnapshots,
  invertContentSnapshots,
  replaceContentSnapshot,
  restoreContentSnapshot,
  snapshotRowCount,
} from "#contracts/release/snapshot";

const first = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const second = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
const rows = Sha256HashSchema.make(`sha256:${"c".repeat(64)}`);

/** Strictly decodes one unknown transition for rejection assertions. */
function decode(input: unknown) {
  return Schema.decodeUnknownEither(ContentSnapshotStateSchema)(input, {
    onExcessProperty: "error",
  });
}

describe("content snapshot state", () => {
  it("constructs fixed inherit, replace, and zero-copy restore states", () => {
    const inherit = inheritContentSnapshot(first);
    const replace = replaceContentSnapshot({
      baseSnapshotId: first,
      resultSnapshotId: second,
      rowCount: 12,
      rowDigest: rows,
    });
    const restore = restoreContentSnapshot(second, null);

    expect([inherit.mode, replace.mode, restore.mode]).toEqual([
      "inherit",
      "replace",
      "restore",
    ]);
    expect([inherit.rowCount, replace.rowCount, restore.rowCount]).toEqual([
      0, 12, 0,
    ]);
  });

  it("rejects contradictory transition modes and excess fields", () => {
    const cases = [
      {
        baseSnapshotId: first,
        mode: "inherit",
        resultSnapshotId: second,
        rowCount: 0,
        rowDigest: EMPTY_SNAPSHOT_ROW_DIGEST,
      },
      {
        baseSnapshotId: first,
        mode: "replace",
        resultSnapshotId: first,
        rowCount: 1,
        rowDigest: rows,
      },
      {
        baseSnapshotId: first,
        mode: "replace",
        resultSnapshotId: second,
        rowCount: 0,
        rowDigest: rows,
      },
      {
        baseSnapshotId: first,
        mode: "replace",
        resultSnapshotId: second,
        rowCount: 1,
        rowDigest: EMPTY_SNAPSHOT_ROW_DIGEST,
      },
      {
        baseSnapshotId: first,
        mode: "restore",
        resultSnapshotId: first,
        rowCount: 0,
        rowDigest: EMPTY_SNAPSHOT_ROW_DIGEST,
      },
      {
        baseSnapshotId: first,
        mode: "restore",
        resultSnapshotId: null,
        rowCount: 1,
        rowDigest: rows,
      },
      {
        baseSnapshotId: first,
        extra: true,
        mode: "inherit",
        resultSnapshotId: first,
        rowCount: 0,
        rowDigest: EMPTY_SNAPSHOT_ROW_DIGEST,
      },
    ];

    const failures = cases.map(decode);

    expect(failures.every(Either.isLeft)).toBe(true);
    const [firstFailure] = failures;
    expect(
      firstFailure !== undefined && Either.isLeft(firstFailure)
        ? String(firstFailure.left)
        : ""
    ).toContain("Expected a coherent structured snapshot transition.");
  });

  it("allows an initially absent inherited family and a first replacement", () => {
    const empty = emptyContentSnapshots();

    expect(empty.program).toMatchObject({
      baseSnapshotId: null,
      resultSnapshotId: null,
    });
    expect(hasEmptySnapshotBases(empty)).toBe(true);
    expect(hasRollbackSnapshotModes(empty)).toBe(true);
    expect(
      replaceContentSnapshot({
        baseSnapshotId: null,
        resultSnapshotId: first,
        rowCount: 1,
        rowDigest: rows,
      })
    ).toMatchObject({ baseSnapshotId: null, resultSnapshotId: first });
  });

  it("counts and canonically serializes every fixed family", () => {
    const snapshots = ContentSnapshotSetSchema.make({
      program: inheritContentSnapshot(null),
      quran: replaceContentSnapshot({
        baseSnapshotId: null,
        resultSnapshotId: first,
        rowCount: 1427,
        rowDigest: rows,
      }),
      tryout: replaceContentSnapshot({
        baseSnapshotId: null,
        resultSnapshotId: second,
        rowCount: 894,
        rowDigest: rows,
      }),
    });

    expect(snapshotRowCount(snapshots)).toBe(2321);
    expect(canonicalizeContentSnapshotSet(snapshots)).toEqual(snapshots);
    expect(hasSameContentSnapshots(snapshots, snapshots)).toBe(true);
    expect(hasSameContentSnapshots(snapshots, emptyContentSnapshots())).toBe(
      false
    );
  });

  it("inverts changed families and inherits unchanged families", () => {
    const snapshots = ContentSnapshotSetSchema.make({
      program: inheritContentSnapshot(null),
      quran: replaceContentSnapshot({
        baseSnapshotId: first,
        resultSnapshotId: second,
        rowCount: 1427,
        rowDigest: rows,
      }),
      tryout: inheritContentSnapshot(first),
    });
    const inverse = invertContentSnapshots(snapshots);

    expect(inverse.program.mode).toBe("inherit");
    expect(inverse.quran).toMatchObject({
      baseSnapshotId: second,
      mode: "restore",
      resultSnapshotId: first,
    });
    expect(inverse.tryout.mode).toBe("inherit");
    expect(hasEmptySnapshotBases(snapshots)).toBe(false);
    expect(hasGitSnapshotModes(snapshots)).toBe(true);
    expect(hasRollbackSnapshotModes(snapshots)).toBe(false);
    expect(hasGitSnapshotModes(inverse)).toBe(false);
    expect(hasRollbackSnapshotModes(inverse)).toBe(true);
    expect(inheritContentSnapshots(snapshots)).toMatchObject({
      program: { resultSnapshotId: null },
      quran: { resultSnapshotId: second },
      tryout: { resultSnapshotId: first },
    });
    expect(baseContentSnapshots(snapshots)).toMatchObject({
      program: { resultSnapshotId: null },
      quran: { resultSnapshotId: first },
      tryout: { resultSnapshotId: first },
    });
  });
});
