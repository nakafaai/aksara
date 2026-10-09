import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { PublicationScopeSchema } from "#contracts/release/snapshot/scope";
import {
  baseContentSnapshots,
  ContentSnapshotSetSchema,
  ContentSnapshotStateSchema,
  canonicalizeContentSnapshotSet,
  canonicalizeContentSnapshotState,
  EMPTY_SNAPSHOT_ROW_DIGEST,
  hasEmptySnapshotBases,
  hasGitSnapshotModes,
  hasRollbackSnapshotModes,
  hasSameContentSnapshots,
  hasScopedSnapshotTransitions,
  inheritContentSnapshot,
  inheritContentSnapshots,
  invertContentSnapshots,
  replaceContentSnapshot,
  restoreContentSnapshot,
  snapshotRowCount,
} from "#contracts/release/snapshot/spec";
import { encodeJsonText } from "#contracts/text/json";

const first = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const second = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
const rows = Sha256HashSchema.make(`sha256:${"c".repeat(64)}`);

/** Strictly decodes one unknown transition for rejection assertions. */
function decode(input: unknown) {
  return Schema.decodeUnknownExit(ContentSnapshotStateSchema)(input, {
    onExcessProperty: "error",
  });
}

describe("content snapshot state", () => {
  it("constructs fixed inherit, replace, and row-free restore states", () => {
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

    expect(failures.every(Exit.isFailure)).toBe(true);
    const [firstFailure] = failures;
    expect(
      firstFailure !== undefined && Exit.isFailure(firstFailure)
        ? String(firstFailure.cause)
        : ""
    ).toContain("Expected a coherent structured snapshot transition.");
  });

  it("allows an initially absent inherited family and a first replacement", () => {
    const empty = inheritContentSnapshots(null);

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
        rowCount: 1428,
        rowDigest: rows,
      }),
      tryout: replaceContentSnapshot({
        baseSnapshotId: null,
        resultSnapshotId: second,
        rowCount: 894,
        rowDigest: rows,
      }),
    });

    expect(snapshotRowCount(snapshots)).toBe(2322);
    expect(canonicalizeContentSnapshotSet(snapshots)).toEqual(snapshots);
    expect(hasSameContentSnapshots(snapshots, snapshots)).toBe(true);
    expect(
      hasSameContentSnapshots(snapshots, inheritContentSnapshots(null))
    ).toBe(false);
  });

  it("inverts changed families and inherits unchanged families", () => {
    const snapshots = ContentSnapshotSetSchema.make({
      program: inheritContentSnapshot(null),
      quran: replaceContentSnapshot({
        baseSnapshotId: first,
        resultSnapshotId: second,
        rowCount: 1428,
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
    const materialOnly = Schema.decodeSync(PublicationScopeSchema)({
      families: ["material"],
      snapshots: [],
    });
    expect(hasScopedSnapshotTransitions(materialOnly, snapshots)).toBe(false);
    expect(
      hasScopedSnapshotTransitions(
        Schema.decodeSync(PublicationScopeSchema)({
          families: materialOnly.families,
          snapshots: ["quran"],
        }),
        snapshots
      )
    ).toBe(true);
  });

  it("pins the canonical JSON of one replaced snapshot state", () => {
    const state = Schema.decodeSync(ContentSnapshotStateSchema)({
      baseSnapshotId: null,
      mode: "replace",
      resultSnapshotId: first,
      rowCount: 1428,
      rowDigest: rows,
    });

    expect(encodeJsonText(canonicalizeContentSnapshotState(state))).toBe(
      '{"baseSnapshotId":null,"mode":"replace","resultSnapshotId":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","rowCount":1428,"rowDigest":"sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"}'
    );
  });

  it("pins the canonical JSON of every fixed snapshot family", () => {
    const snapshots = Schema.decodeSync(ContentSnapshotSetSchema)({
      program: {
        baseSnapshotId: null,
        mode: "inherit",
        resultSnapshotId: null,
        rowCount: 0,
        rowDigest: EMPTY_SNAPSHOT_ROW_DIGEST,
      },
      quran: {
        baseSnapshotId: null,
        mode: "replace",
        resultSnapshotId: first,
        rowCount: 1428,
        rowDigest: rows,
      },
      tryout: {
        baseSnapshotId: second,
        mode: "restore",
        resultSnapshotId: null,
        rowCount: 0,
        rowDigest: EMPTY_SNAPSHOT_ROW_DIGEST,
      },
    });

    expect(encodeJsonText(canonicalizeContentSnapshotSet(snapshots))).toBe(
      '{"program":{"baseSnapshotId":null,"mode":"inherit","resultSnapshotId":null,"rowCount":0,"rowDigest":"sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f"},"quran":{"baseSnapshotId":null,"mode":"replace","resultSnapshotId":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","rowCount":1428,"rowDigest":"sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"},"tryout":{"baseSnapshotId":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","mode":"restore","resultSnapshotId":null,"rowCount":0,"rowDigest":"sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f"}}'
    );
  });
});
