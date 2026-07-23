import { Chunk, Effect, Schema, Stream } from "effect";

import {
  type ContentSnapshotKind,
  ContentSnapshotKindSchema,
  type ContentSnapshotSet,
  ContentSnapshotSetSchema,
  inheritContentSnapshots,
  replaceContentSnapshot,
  snapshotRowCount,
} from "#contracts/release/snapshot";
import {
  type ContentSnapshotManifest,
  ContentSnapshotManifestSchema,
  type ContentSnapshotRow,
  ContentSnapshotRowSchema,
} from "#contracts/release/snapshot-data";
import { verifySnapshotRows } from "#contracts/release/snapshot-domain";
import { tryoutSnapshotRowEvidence } from "#contracts/tryout/snapshot-hash";

const StreamIndexSchema = Schema.Int.pipe(Schema.nonNegative());

/** One replacement manifest failed strict wire decoding. */
export class SnapshotManifestDecodeError extends Schema.TaggedError<SnapshotManifestDecodeError>()(
  "SnapshotManifestDecodeError",
  { manifestIndex: StreamIndexSchema }
) {}

/** Replacement manifests are duplicated or outside canonical family order. */
export class SnapshotManifestOrderError extends Schema.TaggedError<SnapshotManifestOrderError>()(
  "SnapshotManifestOrderError",
  {
    actualFamily: ContentSnapshotKindSchema,
    manifestIndex: StreamIndexSchema,
    previousFamily: ContentSnapshotKindSchema,
  }
) {}

/** One structured snapshot row failed strict wire decoding. */
export class SnapshotRowDecodeError extends Schema.TaggedError<SnapshotRowDecodeError>()(
  "SnapshotRowDecodeError",
  { rowIndex: StreamIndexSchema }
) {}

/** A staged row belongs to a family this release does not replace. */
export class SnapshotRowFamilyError extends Schema.TaggedError<SnapshotRowFamilyError>()(
  "SnapshotRowFamilyError",
  {
    family: ContentSnapshotKindSchema,
    rowIndex: StreamIndexSchema,
  }
) {}

/** A replacement manifest cannot form a coherent forward transition. */
export class SnapshotTransitionError extends Schema.TaggedError<SnapshotTransitionError>()(
  "SnapshotTransitionError",
  { family: ContentSnapshotKindSchema }
) {}

/** The staged row stream count differs from all signed family evidence. */
export class SnapshotStagedCountError extends Schema.TaggedError<SnapshotStagedCountError>()(
  "SnapshotStagedCountError",
  {
    actualCount: StreamIndexSchema,
    expectedCount: StreamIndexSchema,
    verifiedCount: StreamIndexSchema,
  }
) {}

/** Fixed verified snapshot state selected by one global release. */
export interface VerifiedContentSnapshots {
  readonly snapshots: ContentSnapshotSet;
  readonly stagedRows: number;
}

const familyOrder: Readonly<Record<ContentSnapshotKind, number>> = {
  program: 0,
  quran: 1,
  tryout: 2,
};

interface ManifestOrderState {
  previous: ContentSnapshotKind | undefined;
}

/** Derives one replacement's aggregate row evidence in its owning runtime. */
function snapshotRowEvidence(snapshot: ContentSnapshotManifest) {
  if (snapshot.family === "program") {
    return {
      rowCount: snapshot.manifest.rowCount,
      rowDigest: snapshot.manifest.rowDigest,
    };
  }
  if (snapshot.family === "quran") {
    return {
      rowCount: snapshot.manifest.projectionCount,
      rowDigest: snapshot.manifest.projectionDigest,
    };
  }
  return tryoutSnapshotRowEvidence(snapshot.manifest);
}

/** Strictly decodes one manifest and advances canonical family order. */
function decodeManifest(
  state: ManifestOrderState,
  source: unknown,
  manifestIndex: number
) {
  return Schema.decodeUnknown(ContentSnapshotManifestSchema)(source, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(() => new SnapshotManifestDecodeError({ manifestIndex })),
    Effect.tap((manifest) => {
      const { previous } = state;
      if (
        previous !== undefined &&
        familyOrder[previous] >= familyOrder[manifest.family]
      ) {
        return Effect.fail(
          new SnapshotManifestOrderError({
            actualFamily: manifest.family,
            manifestIndex,
            previousFamily: previous,
          })
        );
      }
      state.previous = manifest.family;
      return Effect.void;
    })
  );
}

/** Strictly decodes replayable replacement manifests in canonical order. */
export function decodeContentSnapshotManifests<E, R>(
  manifests: Stream.Stream<unknown, E, R>
) {
  return Stream.unwrap(
    Effect.sync(() => {
      const state: ManifestOrderState = { previous: undefined };
      return manifests.pipe(
        Stream.zipWithIndex,
        Stream.mapEffect(([source, manifestIndex]) =>
          decodeManifest(state, source, manifestIndex)
        )
      );
    })
  );
}

/** Strictly decodes replayable structured rows without retaining bodies. */
export function decodeContentSnapshotRows<E, R>(
  rows: Stream.Stream<unknown, E, R>
) {
  return rows.pipe(
    Stream.zipWithIndex,
    Stream.mapEffect(([source, rowIndex]) =>
      Schema.decodeUnknown(ContentSnapshotRowSchema)(source, {
        onExcessProperty: "error",
      }).pipe(Effect.mapError(() => new SnapshotRowDecodeError({ rowIndex })))
    )
  );
}

/** Replaces one inherited family state without weakening schema filters. */
function replaceSnapshotState(
  snapshots: ContentSnapshotSet,
  snapshot: ContentSnapshotManifest
) {
  return Effect.try({
    catch: () => new SnapshotTransitionError({ family: snapshot.family }),
    try: () => {
      const baseSnapshotId = snapshots[snapshot.family].resultSnapshotId;
      const evidence = snapshotRowEvidence(snapshot);
      return ContentSnapshotSetSchema.make({
        ...snapshots,
        [snapshot.family]: replaceContentSnapshot({
          baseSnapshotId,
          resultSnapshotId: snapshot.manifest.snapshotId,
          ...evidence,
        }),
      });
    },
  });
}

/** Derives all fixed family states from prior results and replacements. */
function deriveSnapshotSet(
  previousSnapshots: ContentSnapshotSet | null,
  manifests: readonly ContentSnapshotManifest[]
) {
  return Effect.reduce(
    manifests,
    inheritContentSnapshots(previousSnapshots),
    replaceSnapshotState
  );
}

/** Rejects unowned families while counting the complete staged row stream. */
function countOwnedRows<E, R>(
  rows: Stream.Stream<ContentSnapshotRow, E, R>,
  snapshots: ContentSnapshotSet
) {
  return rows.pipe(
    Stream.zipWithIndex,
    Stream.runFoldEffect(0, (count, [row, rowIndex]) => {
      if (snapshots[row.family].mode !== "replace") {
        return Effect.fail(
          new SnapshotRowFamilyError({ family: row.family, rowIndex })
        );
      }
      return Effect.succeed(count + 1);
    })
  );
}

/** Confirms all replay passes agree with signed staged-row evidence. */
export function verifyStagedSnapshotRows(
  actualRows: number,
  verifiedRows: number,
  expectedRows: number
) {
  if (actualRows === expectedRows && verifiedRows === expectedRows) {
    return Effect.void;
  }
  return Effect.fail(
    new SnapshotStagedCountError({
      actualCount: actualRows,
      expectedCount: expectedRows,
      verifiedCount: verifiedRows,
    })
  );
}

/**
 * Authenticates every replacement through explicit replay factories.
 * Global rows may interleave families; each filtered family order stays signed.
 */
export const verifyContentSnapshots = Effect.fn(
  "AksaraContracts.verifyContentSnapshots"
)(function* <ManifestError, ManifestContext, RowError, RowContext>(input: {
  readonly previousSnapshots: ContentSnapshotSet | null;
  /** Creates one fresh canonical replacement-manifest replay. */
  readonly manifests: () => Stream.Stream<
    unknown,
    ManifestError,
    ManifestContext
  >;
  /** Creates one fresh structured-row replay for every verification pass. */
  readonly rows: () => Stream.Stream<unknown, RowError, RowContext>;
}) {
  const decodedManifests = decodeContentSnapshotManifests(input.manifests());
  const manifests = Chunk.toReadonlyArray(
    yield* decodedManifests.pipe(Stream.runCollect)
  );
  const snapshots = yield* deriveSnapshotSet(
    input.previousSnapshots,
    manifests
  );
  const actualRows = yield* countOwnedRows(
    decodeContentSnapshotRows(input.rows()),
    snapshots
  );
  const verifiedRows = yield* Effect.reduce(manifests, 0, (count, manifest) =>
    verifySnapshotRows(manifest, () =>
      decodeContentSnapshotRows(input.rows())
    ).pipe(Effect.map((verified) => count + verified))
  );
  const expectedRows = snapshotRowCount(snapshots);
  yield* verifyStagedSnapshotRows(actualRows, verifiedRows, expectedRows);
  return {
    snapshots,
    stagedRows: actualRows,
  } satisfies VerifiedContentSnapshots;
});
