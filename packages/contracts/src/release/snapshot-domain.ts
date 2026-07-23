import { Effect, Option, Schema, Stream } from "effect";

import type { Sha256Hash } from "#contracts/ids";
import { digestProgramRows } from "#contracts/program/row-hash";
import { hashProgramSnapshot } from "#contracts/program/snapshot-hash";
import { digestQuranRows } from "#contracts/quran/row-digest";
import { hashQuranSnapshot } from "#contracts/quran/snapshot-hash";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "#contracts/release/snapshot-data";
import {
  digestTryoutCatalog,
  digestTryoutPlacements,
} from "#contracts/tryout/row-hash";
import { makeTryoutSnapshot } from "#contracts/tryout/snapshot-hash";
import type {
  TryoutCatalogCounts,
  TryoutCatalogRecord,
} from "#contracts/tryout/spec";

/** Signed snapshot evidence differs from its authenticated row stream. */
export class SnapshotEvidenceError extends Schema.TaggedError<SnapshotEvidenceError>()(
  "SnapshotEvidenceError",
  {
    actual: Schema.String,
    expected: Schema.String,
    family: Schema.Literal("program", "quran", "tryout"),
    field: Schema.String,
  }
) {}

interface TryoutCatalogEvidence {
  readonly counts: TryoutCatalogCounts;
  readonly routeCount: number;
}

type SnapshotRowFactory<E, R> = () => Stream.Stream<ContentSnapshotRow, E, R>;

/** Fails with one field-level mismatch without exposing row bodies. */
function requireEvidence(input: {
  readonly actual: number | Sha256Hash;
  readonly expected: number | Sha256Hash;
  readonly family: "program" | "quran" | "tryout";
  readonly field: string;
}) {
  if (input.actual === input.expected) {
    return Effect.void;
  }
  return Effect.fail(
    new SnapshotEvidenceError({
      actual: String(input.actual),
      expected: String(input.expected),
      family: input.family,
      field: input.field,
    })
  );
}

/** Selects one program row stream while preserving source failures. */
function programRows<E, R>(rows: Stream.Stream<ContentSnapshotRow, E, R>) {
  return rows.pipe(
    Stream.filterMap((row) =>
      row.family === "program" ? Option.some(row.record) : Option.none()
    )
  );
}

/** Selects and binds Quran rows to the manifest's immutable identity. */
function quranRows<E, R>(
  rows: Stream.Stream<ContentSnapshotRow, E, R>,
  snapshotId: Sha256Hash
) {
  return rows.pipe(
    Stream.filterMap((row) =>
      row.family === "quran" ? Option.some(row.record) : Option.none()
    ),
    Stream.mapEffect((record) =>
      requireEvidence({
        actual: record.snapshotId,
        expected: snapshotId,
        family: "quran",
        field: "snapshotId",
      }).pipe(Effect.as(record))
    )
  );
}

/** Selects one try-out hierarchy stream while preserving source failures. */
function tryoutCatalog<E, R>(rows: Stream.Stream<ContentSnapshotRow, E, R>) {
  return rows.pipe(
    Stream.filterMap((row) =>
      row.family === "tryout" && row.rowKind === "catalog"
        ? Option.some(row.record)
        : Option.none()
    )
  );
}

/** Selects one try-out placement stream while preserving source failures. */
function tryoutPlacements<E, R>(rows: Stream.Stream<ContentSnapshotRow, E, R>) {
  return rows.pipe(
    Stream.filterMap((row) =>
      row.family === "tryout" && row.rowKind === "placement"
        ? Option.some(row.record)
        : Option.none()
    )
  );
}

/** Derives signed per-kind and public-route counts from catalog rows. */
function summarizeTryoutCatalog<E, R>(
  records: Stream.Stream<TryoutCatalogRecord, E, R>
) {
  const initial: TryoutCatalogEvidence = {
    counts: { country: 0, exam: 0, section: 0, set: 0, track: 0 },
    routeCount: 0,
  };
  return records.pipe(
    Stream.runFold(initial, (state, { row }) => ({
      counts: {
        ...state.counts,
        [row.kind]: state.counts[row.kind] + 1,
      },
      routeCount: state.routeCount + (row.publicPath === undefined ? 0 : 1),
    }))
  );
}

/** Verifies all program row and snapshot identity evidence. */
const verifyProgramRows = Effect.fn("AksaraContracts.verifyProgramRows")(
  function* <E, R>(
    snapshot: Extract<ContentSnapshotManifest, { family: "program" }>,
    rows: SnapshotRowFactory<E, R>
  ) {
    const summary = yield* digestProgramRows(programRows(rows()));
    yield* requireEvidence({
      actual: summary.rowCount,
      expected: snapshot.manifest.rowCount,
      family: "program",
      field: "rowCount",
    });
    yield* requireEvidence({
      actual: summary.rowDigest,
      expected: snapshot.manifest.rowDigest,
      family: "program",
      field: "rowDigest",
    });
    yield* requireEvidence({
      actual: summary.slugCount,
      expected: snapshot.manifest.slugCount,
      family: "program",
      field: "slugCount",
    });
    const { snapshotId, ...identity } = snapshot.manifest;
    const actualId = yield* hashProgramSnapshot(identity);
    yield* requireEvidence({
      actual: actualId,
      expected: snapshotId,
      family: "program",
      field: "snapshotId",
    });
    return summary.rowCount;
  }
);

/** Verifies all Quran row, digest, binding, and snapshot evidence. */
const verifyQuranRows = Effect.fn("AksaraContracts.verifyQuranRows")(function* <
  E,
  R,
>(
  snapshot: Extract<ContentSnapshotManifest, { family: "quran" }>,
  rows: SnapshotRowFactory<E, R>
) {
  const summary = yield* digestQuranRows(
    quranRows(rows(), snapshot.manifest.snapshotId)
  );
  for (const field of [
    "projectionCount",
    "projectionDigest",
    "runtimeCount",
    "runtimeDigest",
    "searchCount",
    "searchDigest",
  ] as const) {
    yield* requireEvidence({
      actual: summary[field],
      expected: snapshot.manifest[field],
      family: "quran",
      field,
    });
  }
  const { snapshotId, ...identity } = snapshot.manifest;
  const actualId = yield* hashQuranSnapshot(identity);
  yield* requireEvidence({
    actual: actualId,
    expected: snapshotId,
    family: "quran",
    field: "snapshotId",
  });
  return summary.projectionCount;
});

/** Verifies all try-out hashes, digests, counts, routes, and identity. */
const verifyTryoutRows = Effect.fn("AksaraContracts.verifyTryoutRows")(
  function* <E, R>(
    snapshot: Extract<ContentSnapshotManifest, { family: "tryout" }>,
    rows: SnapshotRowFactory<E, R>
  ) {
    const [catalogDigest, placementDigest, catalogEvidence] = yield* Effect.all(
      [
        digestTryoutCatalog(tryoutCatalog(rows())),
        digestTryoutPlacements(tryoutPlacements(rows())),
        summarizeTryoutCatalog(tryoutCatalog(rows())),
      ]
    );
    yield* requireEvidence({
      actual: catalogDigest.digest,
      expected: snapshot.manifest.catalogDigest,
      family: "tryout",
      field: "catalogDigest",
    });
    yield* requireEvidence({
      actual: placementDigest.count,
      expected: snapshot.manifest.placementCount,
      family: "tryout",
      field: "placementCount",
    });
    yield* requireEvidence({
      actual: placementDigest.digest,
      expected: snapshot.manifest.placementDigest,
      family: "tryout",
      field: "placementDigest",
    });
    for (const kind of [
      "country",
      "exam",
      "section",
      "set",
      "track",
    ] as const) {
      yield* requireEvidence({
        actual: catalogEvidence.counts[kind],
        expected: snapshot.manifest.counts[kind],
        family: "tryout",
        field: `${kind}Count`,
      });
    }
    yield* requireEvidence({
      actual: catalogEvidence.routeCount,
      expected: snapshot.manifest.routeCount,
      family: "tryout",
      field: "routeCount",
    });
    const { snapshotId, ...identity } = snapshot.manifest;
    const actualId = makeTryoutSnapshot(identity).snapshotId;
    yield* requireEvidence({
      actual: actualId,
      expected: snapshotId,
      family: "tryout",
      field: "snapshotId",
    });
    return catalogDigest.count + placementDigest.count;
  }
);

/** Authenticates one replacement manifest through fresh structured-row replays. */
export const verifySnapshotRows = Effect.fn(
  "AksaraContracts.verifySnapshotRows"
)(function* <E, R>(
  snapshot: ContentSnapshotManifest,
  rows: SnapshotRowFactory<E, R>
) {
  if (snapshot.family === "program") {
    return yield* verifyProgramRows(snapshot, rows);
  }
  if (snapshot.family === "quran") {
    return yield* verifyQuranRows(snapshot, rows);
  }
  return yield* verifyTryoutRows(snapshot, rows);
});
