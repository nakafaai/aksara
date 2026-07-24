import type { FileSystem, Path } from "@effect/platform";
import type { QuestionHead } from "@nakafa/aksara-contracts/release/head";
import type { ContentSnapshotSet } from "@nakafa/aksara-contracts/release/snapshot";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot-data";
import {
  type ProgramRowError,
  type ProgramSnapshotError,
  prepareProgramSnapshot,
} from "@nakafa/aksara-corpus/program/snapshot";
import {
  type PreparedQuranSnapshot,
  prepareQuranSnapshot,
} from "@nakafa/aksara-corpus/quran/snapshot";
import { Effect, type Scope, Stream } from "effect";
import type { ReplaySpoolError } from "#publisher/replay/error";
import {
  type PrepareTryoutSnapshotError,
  prepareTryoutSnapshot,
} from "#publisher/tryout/snapshot";

/** Exact sources required to prepare structured state for one Git release. */
export interface ReleaseSnapshotInput<E, R> {
  readonly checkoutRoot: string;
  readonly previousSnapshots: ContentSnapshotSet | null;
  /** Replays the complete desired question catalog used by try-out placement. */
  readonly questionHeads: () => Stream.Stream<QuestionHead, E, R>;
  readonly rendererManifest: unknown;
}

/** Replayable changed snapshots selected by one global release. */
export interface PreparedReleaseSnapshots {
  /** Replays changed manifests in canonical program, Quran, try-out order. */
  readonly manifests: () => Stream.Stream<ContentSnapshotManifest>;
  /** Replays only rows owned by changed structured snapshots. */
  readonly rows: () => Stream.Stream<
    ContentSnapshotRow,
    ProgramRowError | PreparedQuranRowError | ReplaySpoolError
  >;
}

type PrepareQuranSnapshotError = Effect.Effect.Error<
  ReturnType<typeof prepareQuranSnapshot>
>;
type PreparedQuranRowError = Stream.Stream.Error<
  ReturnType<PreparedQuranSnapshot["rows"]>
>;

/** Every expected failure before structured release sources are replayable. */
export type PrepareReleaseSnapshotError<E> =
  | E
  | PrepareQuranSnapshotError
  | PrepareTryoutSnapshotError<never>
  | ProgramSnapshotError;

/** Checks whether one desired snapshot differs from the active family result. */
function replacesActiveSnapshot(
  previous: ContentSnapshotSet | null,
  snapshot: ContentSnapshotManifest
) {
  return (
    previous?.[snapshot.family].resultSnapshotId !==
    snapshot.manifest.snapshotId
  );
}

/** Prepares changed Program, Quran, and Try-out snapshots for one release. */
export const prepareReleaseSnapshots: <E, R>(
  input: ReleaseSnapshotInput<E, R>
) => Effect.Effect<
  PreparedReleaseSnapshots,
  PrepareReleaseSnapshotError<E>,
  FileSystem.FileSystem | Path.Path | R | Scope.Scope
> = Effect.fn("AksaraPublisher.prepareReleaseSnapshots")(function* <E, R>(
  input: ReleaseSnapshotInput<E, R>
) {
  const [program, quran, tryout] = yield* Effect.all([
    prepareProgramSnapshot(),
    prepareQuranSnapshot(),
    prepareTryoutSnapshot({
      checkoutRoot: input.checkoutRoot,
      questionHeads: input.questionHeads,
      rendererManifest: input.rendererManifest,
    }),
  ]);
  const programManifest = {
    family: "program",
    manifest: program.manifest,
  } satisfies ContentSnapshotManifest;
  const quranManifest = {
    family: "quran",
    manifest: quran.manifest,
  } satisfies ContentSnapshotManifest;
  const programChanged = replacesActiveSnapshot(
    input.previousSnapshots,
    programManifest
  );
  const quranChanged = replacesActiveSnapshot(
    input.previousSnapshots,
    quranManifest
  );
  const tryoutChanged = replacesActiveSnapshot(
    input.previousSnapshots,
    tryout.manifest
  );
  /** Replays only changed family manifests in signed canonical order. */
  const manifests = () =>
    Stream.fromIterable([
      ...(programChanged ? [programManifest] : []),
      ...(quranChanged ? [quranManifest] : []),
      ...(tryoutChanged ? [tryout.manifest] : []),
    ]);
  /** Replays rows only for replacement manifests owned by this release. */
  const rows = () => {
    const programRows = programChanged
      ? program
          .rows()
          .pipe(
            Stream.map(
              (record) =>
                ({ family: "program", record }) satisfies ContentSnapshotRow
            )
          )
      : Stream.empty;
    const quranRows = quranChanged
      ? quran
          .rows()
          .pipe(
            Stream.map(
              (record) =>
                ({ family: "quran", record }) satisfies ContentSnapshotRow
            )
          )
      : Stream.empty;
    const tryoutRows = tryoutChanged ? tryout.rows() : Stream.empty;
    return programRows.pipe(
      Stream.concat(quranRows),
      Stream.concat(tryoutRows)
    );
  };
  return { manifests, rows };
});
