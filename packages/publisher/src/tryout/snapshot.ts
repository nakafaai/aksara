import type { FileSystem, Path } from "@effect/platform";
import type { QuestionHead } from "@nakafa/aksara-contracts/release/head";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot-data";
import { ContentSnapshotRowSchema } from "@nakafa/aksara-contracts/release/snapshot-data";
import { verifyContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot-verify";
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import {
  digestTryoutCatalog,
  digestTryoutPlacements,
} from "@nakafa/aksara-contracts/tryout/row-hash";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot-hash";
import type {
  TryoutCatalogCounts,
  TryoutCatalogRecord,
} from "@nakafa/aksara-contracts/tryout/spec";
import { decodeQuestionRegistry } from "@nakafa/aksara-corpus/question-bank/registry";
import { loadTryoutProjection } from "@nakafa/aksara-corpus/tryout/projection";
import { Effect, Option, type Scope, Stream } from "effect";
import type { inspectQuestionDocument } from "#publisher/question/document";
import type { ReplaySpoolError } from "#publisher/replay/error";
import { createReplaySpool } from "#publisher/replay/spool";
import { bindTryoutHeads } from "#publisher/tryout/bind";
import type {
  TryoutHeadBindingError,
  TryoutTitleMissingError,
} from "#publisher/tryout/error";
import { bindTryoutTitles } from "#publisher/tryout/title";

/** Exact-Git inputs required to prepare one complete try-out snapshot. */
export interface TryoutSnapshotPreparationInput<E, R> {
  readonly checkoutRoot: string;
  /** Replays the complete desired question-head catalog in canonical order. */
  readonly questionHeads: () => Stream.Stream<QuestionHead, E, R>;
  readonly rendererManifest: unknown;
}

type TryoutManifest = Extract<
  ContentSnapshotManifest,
  { readonly family: "tryout" }
>;

/** Replayable verified rows and manifest selected by one global release. */
export interface PreparedTryoutSnapshot {
  readonly manifest: TryoutManifest;
  /** Replays immutable catalog rows followed by artifact-bound placements. */
  readonly rows: () => Stream.Stream<ContentSnapshotRow, ReplaySpoolError>;
}

type RendererManifestError = Effect.Effect.Error<
  ReturnType<typeof validateRendererManifestHash>
>;
type TryoutProjectionError = Effect.Effect.Error<
  ReturnType<typeof loadTryoutProjection>
>;
type QuestionRegistryError = Effect.Effect.Error<
  ReturnType<typeof decodeQuestionRegistry>
>;
type QuestionInspectionError = Effect.Effect.Error<
  ReturnType<typeof inspectQuestionDocument>
>;
type SnapshotVerificationError = Effect.Effect.Error<
  ReturnType<
    typeof verifyContentSnapshots<never, never, ReplaySpoolError, never>
  >
>;

/** Every expected failure before a try-out snapshot can enter a release. */
export type PrepareTryoutSnapshotError<E> =
  | E
  | QuestionInspectionError
  | QuestionRegistryError
  | RendererManifestError
  | ReplaySpoolError
  | SnapshotVerificationError
  | TryoutHeadBindingError<never>
  | TryoutProjectionError
  | TryoutTitleMissingError;

/** Selects immutable hierarchy records from a complete snapshot replay. */
function selectCatalogRows(
  rows: Stream.Stream<ContentSnapshotRow, ReplaySpoolError>
) {
  return rows.pipe(
    Stream.filterMap((row) =>
      row.family === "tryout" && row.rowKind === "catalog"
        ? Option.some(row.record)
        : Option.none()
    )
  );
}

/** Selects immutable placement records from a complete snapshot replay. */
function selectPlacementRows(
  rows: Stream.Stream<ContentSnapshotRow, ReplaySpoolError>
) {
  return rows.pipe(
    Stream.filterMap((row) =>
      row.family === "tryout" && row.rowKind === "placement"
        ? Option.some(row.record)
        : Option.none()
    )
  );
}

/** Counts exact hierarchy kinds from source-validated catalog records. */
function countCatalogKinds(records: readonly TryoutCatalogRecord[]) {
  const counts = {
    country: 0,
    exam: 0,
    section: 0,
    set: 0,
    track: 0,
  };
  for (const { row } of records) {
    counts[row.kind] += 1;
  }
  return counts satisfies TryoutCatalogCounts;
}

/** Prepares and verifies the exact active try-out hierarchy and placements. */
export const prepareTryoutSnapshot: <E, R>(
  input: TryoutSnapshotPreparationInput<E, R>
) => Effect.Effect<
  PreparedTryoutSnapshot,
  PrepareTryoutSnapshotError<E>,
  FileSystem.FileSystem | Path.Path | R | Scope.Scope
> = Effect.fn("AksaraPublisher.prepareTryoutSnapshot")(function* <E, R>(
  input: TryoutSnapshotPreparationInput<E, R>
) {
  const rendererManifest = yield* validateRendererManifestHash(
    input.rendererManifest
  );
  const projection = yield* loadTryoutProjection(input.checkoutRoot);
  const entries = yield* decodeQuestionRegistry(input.checkoutRoot);
  const bindings = bindTryoutHeads(
    projection.placements,
    input.questionHeads()
  );
  const placements = bindTryoutTitles({
    bindings,
    checkoutRoot: input.checkoutRoot,
    entries,
    rendererManifest,
  });
  const sourceRows = Stream.fromIterable(projection.catalog)
    .pipe(
      Stream.map(
        (record) =>
          ({
            family: "tryout",
            record,
            rowKind: "catalog",
          }) satisfies ContentSnapshotRow
      )
    )
    .pipe(
      Stream.concat(
        placements.pipe(
          Stream.map(
            (record) =>
              ({
                family: "tryout",
                record,
                rowKind: "placement",
              }) satisfies ContentSnapshotRow
          )
        )
      )
    );
  const spool = yield* createReplaySpool({
    prefix: "aksara-tryout-",
    schema: ContentSnapshotRowSchema,
    stream: sourceRows,
  });
  /** Replays the sealed rows used by every digest and release operation. */
  const rows = () => spool.replay();
  const [catalog, placement] = yield* Effect.all([
    digestTryoutCatalog(selectCatalogRows(rows())),
    digestTryoutPlacements(selectPlacementRows(rows())),
  ]);
  const manifest = {
    family: "tryout",
    manifest: makeTryoutSnapshot({
      catalogDigest: catalog.digest,
      counts: countCatalogKinds(projection.catalog),
      format: "tryout-v1",
      locales: ["en", "id"],
      placementCount: placement.count,
      placementDigest: placement.digest,
      routeCount: projection.routeCount,
    }),
  } satisfies TryoutManifest;
  yield* verifyContentSnapshots({
    manifests: () => Stream.make(manifest),
    previousSnapshots: null,
    rows,
  });
  return { manifest, rows } satisfies PreparedTryoutSnapshot;
});
