import { Schema } from "effect";

import { type Sha256Hash, Sha256HashSchema } from "#contracts/ids";

/** Canonical digest for a release that stages no structured snapshot rows. */
export const EMPTY_SNAPSHOT_ROW_DIGEST = Sha256HashSchema.make(
  "sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f"
);

/** Fixed structured families selected by the one global release pointer. */
export const ContentSnapshotKindSchema = Schema.Literal(
  "program",
  "quran",
  "tryout"
);
export type ContentSnapshotKind = typeof ContentSnapshotKindSchema.Type;

const RowCountSchema = Schema.Int.pipe(Schema.nonNegative());

/** One family's immutable snapshot transition authenticated by a release. */
export const ContentSnapshotStateSchema = Schema.Struct({
  baseSnapshotId: Schema.NullOr(Sha256HashSchema),
  mode: Schema.Literal("inherit", "replace", "restore"),
  resultSnapshotId: Schema.NullOr(Sha256HashSchema),
  rowCount: RowCountSchema,
  rowDigest: Sha256HashSchema,
}).pipe(
  Schema.filter(hasCoherentSnapshotState, {
    message: () => "Expected a coherent structured snapshot transition.",
  })
);
export type ContentSnapshotState = typeof ContentSnapshotStateSchema.Type;

/** Fixed snapshot states prevent a release from omitting one owned family. */
export const ContentSnapshotSetSchema = Schema.Struct({
  program: ContentSnapshotStateSchema,
  quran: ContentSnapshotStateSchema,
  tryout: ContentSnapshotStateSchema,
});
export type ContentSnapshotSet = typeof ContentSnapshotSetSchema.Type;

/** Checks inheritance, replacement, and forward restore row semantics. */
export function hasCoherentSnapshotState(state: {
  readonly baseSnapshotId: Sha256Hash | null;
  readonly mode: "inherit" | "replace" | "restore";
  readonly resultSnapshotId: Sha256Hash | null;
  readonly rowCount: number;
  readonly rowDigest: Sha256Hash;
}) {
  const changed = state.baseSnapshotId !== state.resultSnapshotId;
  const empty =
    state.rowCount === 0 && state.rowDigest === EMPTY_SNAPSHOT_ROW_DIGEST;

  if (state.mode === "inherit") {
    return !changed && empty;
  }
  if (state.mode === "replace") {
    return (
      changed &&
      state.resultSnapshotId !== null &&
      state.rowCount > 0 &&
      state.rowDigest !== EMPTY_SNAPSHOT_ROW_DIGEST
    );
  }
  return changed && empty;
}

/** Builds a zero-row transition that preserves one immutable snapshot. */
export function inheritContentSnapshot(
  snapshotId: ContentSnapshotState["resultSnapshotId"]
) {
  return ContentSnapshotStateSchema.make({
    baseSnapshotId: snapshotId,
    mode: "inherit",
    resultSnapshotId: snapshotId,
    rowCount: 0,
    rowDigest: EMPTY_SNAPSHOT_ROW_DIGEST,
  });
}

/** Builds the fixed snapshot set before any structured family is published. */
export function emptyContentSnapshots() {
  return inheritContentSnapshots(null);
}

/** Builds fixed inherited states from the prior release's result identities. */
export function inheritContentSnapshots(previous: ContentSnapshotSet | null) {
  return ContentSnapshotSetSchema.make({
    program: inheritContentSnapshot(previous?.program.resultSnapshotId ?? null),
    quran: inheritContentSnapshot(previous?.quran.resultSnapshotId ?? null),
    tryout: inheritContentSnapshot(previous?.tryout.resultSnapshotId ?? null),
  });
}

/** Reconstructs inherited prior state from one signed transition's base IDs. */
export function baseContentSnapshots(snapshots: ContentSnapshotSet) {
  return ContentSnapshotSetSchema.make({
    program: inheritContentSnapshot(snapshots.program.baseSnapshotId),
    quran: inheritContentSnapshot(snapshots.quran.baseSnapshotId),
    tryout: inheritContentSnapshot(snapshots.tryout.baseSnapshotId),
  });
}

/** Builds a full replacement transition for one prepared snapshot. */
export function replaceContentSnapshot(input: {
  readonly baseSnapshotId: ContentSnapshotState["baseSnapshotId"];
  readonly resultSnapshotId: Exclude<
    ContentSnapshotState["resultSnapshotId"],
    null
  >;
  readonly rowCount: number;
  readonly rowDigest: Sha256Hash;
}) {
  return ContentSnapshotStateSchema.make({
    ...input,
    mode: "replace",
  });
}

/** Builds a zero-copy forward restore to an existing or absent snapshot. */
export function restoreContentSnapshot(
  baseSnapshotId: ContentSnapshotState["baseSnapshotId"],
  resultSnapshotId: ContentSnapshotState["resultSnapshotId"]
) {
  return ContentSnapshotStateSchema.make({
    baseSnapshotId,
    mode: "restore",
    resultSnapshotId,
    rowCount: 0,
    rowDigest: EMPTY_SNAPSHOT_ROW_DIGEST,
  });
}

/** Builds the retained inverse without copying immutable snapshot rows. */
export function invertContentSnapshots(snapshots: ContentSnapshotSet) {
  /** Inverts one changed family and preserves one unchanged family. */
  const invert = (state: ContentSnapshotState) =>
    state.baseSnapshotId === state.resultSnapshotId
      ? inheritContentSnapshot(state.resultSnapshotId)
      : restoreContentSnapshot(state.resultSnapshotId, state.baseSnapshotId);
  return ContentSnapshotSetSchema.make({
    program: invert(snapshots.program),
    quran: invert(snapshots.quran),
    tryout: invert(snapshots.tryout),
  });
}

/** Checks that an initial release does not claim an unstated snapshot base. */
export function hasEmptySnapshotBases(snapshots: ContentSnapshotSet) {
  return Object.values(snapshots).every(
    ({ baseSnapshotId }) => baseSnapshotId === null
  );
}

/** Checks that a rollback only inherits or restores immutable snapshots. */
export function hasRollbackSnapshotModes(snapshots: ContentSnapshotSet) {
  return Object.values(snapshots).every(({ mode }) => mode !== "replace");
}

/** Checks that reviewed Git sources only inherit or replace snapshots. */
export function hasGitSnapshotModes(snapshots: ContentSnapshotSet) {
  return Object.values(snapshots).every(({ mode }) => mode !== "restore");
}

/** Returns the number of rows that must be staged for this release. */
export function snapshotRowCount(snapshots: ContentSnapshotSet) {
  return (
    snapshots.program.rowCount +
    snapshots.quran.rowCount +
    snapshots.tryout.rowCount
  );
}

/** Serializes one snapshot transition with stable signed field order. */
export function canonicalizeContentSnapshotState(state: ContentSnapshotState) {
  return {
    baseSnapshotId: state.baseSnapshotId,
    mode: state.mode,
    resultSnapshotId: state.resultSnapshotId,
    rowCount: state.rowCount,
    rowDigest: state.rowDigest,
  };
}

/** Serializes all fixed snapshot families with stable signed field order. */
export function canonicalizeContentSnapshotSet(snapshots: ContentSnapshotSet) {
  return {
    program: canonicalizeContentSnapshotState(snapshots.program),
    quran: canonicalizeContentSnapshotState(snapshots.quran),
    tryout: canonicalizeContentSnapshotState(snapshots.tryout),
  };
}

/** Compares two fixed snapshot sets through their stable signed form. */
export function hasSameContentSnapshots(
  left: ContentSnapshotSet,
  right: ContentSnapshotSet
) {
  return (
    JSON.stringify(canonicalizeContentSnapshotSet(left)) ===
    JSON.stringify(canonicalizeContentSnapshotSet(right))
  );
}
