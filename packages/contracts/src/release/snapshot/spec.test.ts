import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { ContentKeySchema, Sha256HashSchema } from "#contracts/ids";
import { ArtifactLocaleSchema } from "#contracts/locale";
import {
  baseContentSnapshots,
  ContentSnapshotSetSchema,
  ContentSnapshotStateSchema,
  canonicalizeContentSnapshotSet,
  canonicalizePublicationScope,
  EMPTY_SNAPSHOT_ROW_DIGEST,
  hasEmptySnapshotBases,
  hasGitSnapshotModes,
  hasRollbackSnapshotModes,
  hasSameContentSnapshots,
  hasScopedSnapshotTransitions,
  inheritContentSnapshot,
  inheritContentSnapshots,
  invertContentSnapshots,
  PublicationScopeSchema,
  publicationScopeContainsContent,
  publicationScopeSelectsSnapshot,
  replaceContentSnapshot,
  restoreContentSnapshot,
  snapshotRowCount,
} from "#contracts/release/snapshot/spec";

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
  it("decodes only non-empty canonical unique publication scopes", () => {
    const scope = Schema.decodeUnknownSync(PublicationScopeSchema)({
      content: [
        { artifactLocale: "en", contentKey: "test:a", family: "material" },
        { artifactLocale: "id", contentKey: "test:a", family: "material" },
      ],
      families: ["article"],
      snapshots: ["program", "tryout"],
    });
    const [english] = scope.content;
    expect(english).toBeDefined();
    if (english === undefined) {
      return;
    }
    expect(canonicalizePublicationScope(scope)).toEqual(scope);
    expect(publicationScopeContainsContent(scope, english)).toBe(true);
    expect(
      publicationScopeContainsContent(scope, {
        artifactLocale: ArtifactLocaleSchema.make("en"),
        contentKey: ContentKeySchema.make("test:family"),
        family: "article",
      })
    ).toBe(true);
    expect(
      publicationScopeContainsContent(scope, {
        ...english,
        artifactLocale: ArtifactLocaleSchema.make("id"),
      })
    ).toBe(true);
    expect(publicationScopeSelectsSnapshot(scope, "program")).toBe(true);
    expect(publicationScopeSelectsSnapshot(scope, "quran")).toBe(false);

    const failures = [
      { content: [], families: [], snapshots: [] },
      {
        content: [
          { artifactLocale: "en", contentKey: "test:a", family: "material" },
          { artifactLocale: "en", contentKey: "test:a", family: "material" },
        ],
        families: [],
        snapshots: [],
      },
      {
        content: [
          { artifactLocale: "en", contentKey: "test:b", family: "material" },
          { artifactLocale: "en", contentKey: "test:a", family: "material" },
        ],
        families: [],
        snapshots: [],
      },
      { content: [], families: ["material", "material"], snapshots: [] },
      { content: [], families: ["question", "article"], snapshots: [] },
      {
        content: [
          { artifactLocale: "en", contentKey: "test:a", family: "material" },
        ],
        families: ["material"],
        snapshots: [],
      },
      { content: [], families: ["unknown"], snapshots: [] },
      { content: [], families: [], snapshots: ["program", "program"] },
      { content: [], families: [], snapshots: ["tryout", "quran"] },
      { content: [], families: [], snapshots: ["unknown"] },
    ].map((invalid) =>
      Schema.decodeUnknownEither(PublicationScopeSchema)(invalid)
    );
    expect(failures.every(Either.isLeft)).toBe(true);
    const [emptyFailure] = failures;
    if (emptyFailure !== undefined && Either.isLeft(emptyFailure)) {
      expect(String(emptyFailure.left)).toContain(
        "Expected a non-empty publication scope in canonical unique order."
      );
    }
  });

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

    expect(failures.every(Either.isLeft)).toBe(true);
    const [firstFailure] = failures;
    expect(
      firstFailure !== undefined && Either.isLeft(firstFailure)
        ? String(firstFailure.left)
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
    const materialOnly = Schema.decodeUnknownSync(PublicationScopeSchema)({
      content: [
        { artifactLocale: "en", contentKey: "test:a", family: "material" },
      ],
      families: [],
      snapshots: [],
    });
    expect(hasScopedSnapshotTransitions(materialOnly, snapshots)).toBe(false);
    expect(
      hasScopedSnapshotTransitions(
        Schema.decodeUnknownSync(PublicationScopeSchema)({
          content: materialOnly.content,
          families: [],
          snapshots: ["quran"],
        }),
        snapshots
      )
    ).toBe(true);
  });
});
