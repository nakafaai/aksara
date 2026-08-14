import type { FileSystem, Path } from "@effect/platform";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import type { QuestionHead } from "@nakafa/aksara-contracts/release/head";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot/data";
import { ContentSnapshotRowSchema } from "@nakafa/aksara-contracts/release/snapshot/data";
import { verifyContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/verify";
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import type { TryoutCatalogRecord } from "@nakafa/aksara-contracts/tryout/catalog";
import { digestTryoutCatalog } from "@nakafa/aksara-contracts/tryout/catalog-hash";
import { digestTryoutPlacements } from "@nakafa/aksara-contracts/tryout/placement-hash";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import type { TryoutCatalogCounts } from "@nakafa/aksara-contracts/tryout/snapshot/spec";
import { loadTryoutContent } from "@nakafa/aksara-corpus/tryout/content";
import { Effect, Option, type Scope, Stream } from "effect";
import type { inspectQuestionDocument } from "#publisher/question/document";
import type { ReplaySpoolError } from "#publisher/replay/error";
import { createReplaySpool } from "#publisher/replay/spool";
import { bindTryoutHeads } from "#publisher/tryout/bind";
import { bindTryoutContent } from "#publisher/tryout/content";
import type {
  TryoutContentMissingError,
  TryoutHeadBindingError,
} from "#publisher/tryout/error";

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
type TryoutContentError = Effect.Effect.Error<
  ReturnType<typeof loadTryoutContent>
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
  | RendererManifestError
  | ReplaySpoolError
  | SnapshotVerificationError
  | TryoutHeadBindingError<never>
  | TryoutContentError
  | TryoutContentMissingError;

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
  const { entries, projection, sources } = yield* loadTryoutContent(
    input.checkoutRoot
  );
  const bindings = bindTryoutHeads(
    projection.placements,
    input.questionHeads()
  );
  const placements = bindTryoutContent({
    bindings,
    checkoutRoot: input.checkoutRoot,
    entries,
    rendererManifest,
    sources,
  });
  const sourceRows = Stream.fromIterable(projection.catalog).pipe(
    Stream.map(
      (record) =>
        ({
          family: "tryout",
          record,
          rowKind: "catalog",
        }) satisfies ContentSnapshotRow
    ),
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
      activeAppLocales: ACTIVE_APP_LOCALES,
      catalogDigest: catalog.digest,
      counts: countCatalogKinds(projection.catalog),
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
