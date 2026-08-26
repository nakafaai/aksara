import type { QuestionHead } from "@nakafa/aksara-contracts/release/head";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot/data";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import type { ContentSnapshotSet } from "@nakafa/aksara-contracts/release/snapshot/spec";
import type { TryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/spec";
import {
  type ProgramRowError,
  type ProgramSnapshotError,
  prepareProgramSnapshot,
} from "@nakafa/aksara-corpus/program/snapshot";
import {
  type PreparedQuranSnapshot,
  prepareQuranSnapshot,
} from "@nakafa/aksara-corpus/quran/snapshot";
import type { FileSystem, Path } from "effect";
import { Effect, type Scope, Stream } from "effect";
import type { ReplaySpoolError } from "#publisher/replay/error";
import {
  type PrepareTryoutSnapshotError,
  prepareTryoutSnapshot,
} from "#publisher/tryout/snapshot";

/** Exact sources required to prepare structured state for one Git release. */
export interface ReleaseSnapshotInput<E, R> {
  readonly checkoutRoot: string;
  readonly families: PublicationScope["snapshots"];
  readonly previousSnapshots: ContentSnapshotSet | null;
  /** Replays the complete desired question catalog used by try-out placement. */
  readonly questionHeads: Stream.Stream<QuestionHead, E, R>;
  /** Rebuilds the inherited try-out snapshot for a new renderer pairing. */
  readonly refreshTryoutRuntimeBundle: boolean;
  readonly rendererManifest: unknown;
}

/** Replayable changed snapshots selected by one global release. */
export interface PreparedReleaseSnapshots {
  /** Replays changed manifests in canonical program, Quran, try-out order. */
  readonly manifests: Stream.Stream<ContentSnapshotManifest>;
  /** Replays only rows owned by changed structured snapshots. */
  readonly rows: Stream.Stream<
    ContentSnapshotRow,
    ProgramRowError | PreparedQuranRowError | ReplaySpoolError
  >;
  /** Exact desired snapshot when this release creates a new runtime pair. */
  readonly tryoutRuntimeSnapshot: TryoutSnapshot | null;
}

type PrepareQuranSnapshotError = Effect.Error<
  ReturnType<typeof prepareQuranSnapshot>
>;
type PreparedQuranRowError = Stream.Error<PreparedQuranSnapshot["rows"]>;
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

/** Prepares only explicitly selected changed structured snapshot families. */
export const prepareReleaseSnapshots: <E, R>(
  input: ReleaseSnapshotInput<E, R>
) => Effect.Effect<
  PreparedReleaseSnapshots,
  PrepareReleaseSnapshotError<E>,
  FileSystem.FileSystem | Path.Path | R | Scope.Scope
> = Effect.fn("AksaraPublisher.prepareReleaseSnapshots")(function* <E, R>(
  input: ReleaseSnapshotInput<E, R>
) {
  const program = input.families.includes("program")
    ? yield* prepareProgramSnapshot()
    : undefined;
  const quran = input.families.includes("quran")
    ? yield* prepareQuranSnapshot({
        checkoutRoot: input.checkoutRoot,
      })
    : undefined;
  const tryout =
    input.families.includes("tryout") || input.refreshTryoutRuntimeBundle
      ? yield* prepareTryoutSnapshot({
          checkoutRoot: input.checkoutRoot,
          questionHeads: input.questionHeads,
          rendererManifest: input.rendererManifest,
        })
      : undefined;
  const programManifest =
    program === undefined
      ? undefined
      : ({
          family: "program",
          manifest: program.manifest,
        } satisfies ContentSnapshotManifest);
  const quranManifest =
    quran === undefined
      ? undefined
      : ({
          family: "quran",
          manifest: quran.manifest,
        } satisfies ContentSnapshotManifest);
  const programChanged =
    programManifest !== undefined &&
    replacesActiveSnapshot(input.previousSnapshots, programManifest);
  const quranChanged =
    quranManifest !== undefined &&
    replacesActiveSnapshot(input.previousSnapshots, quranManifest);
  const tryoutChanged =
    tryout !== undefined &&
    replacesActiveSnapshot(input.previousSnapshots, tryout.manifest);
  const tryoutRuntimeSnapshot =
    tryout !== undefined && (tryoutChanged || input.refreshTryoutRuntimeBundle)
      ? tryout.manifest.manifest
      : null;
  /** Replays only changed family manifests in signed canonical order. */
  const manifests = Stream.fromIterable([
    ...(programChanged && programManifest ? [programManifest] : []),
    ...(quranChanged && quranManifest ? [quranManifest] : []),
    ...(tryoutChanged && tryout ? [tryout.manifest] : []),
  ]);
  /** Replays rows only for replacement manifests owned by this release. */
  const rows = (() => {
    const programRows =
      programChanged && program
        ? program.rows.pipe(
            Stream.map(
              (record) =>
                ({ family: "program", record }) satisfies ContentSnapshotRow
            )
          )
        : Stream.empty;
    const quranRows =
      quranChanged && quran
        ? quran.rows.pipe(
            Stream.map(
              (record) =>
                ({ family: "quran", record }) satisfies ContentSnapshotRow
            )
          )
        : Stream.empty;
    const tryoutRows = tryoutChanged && tryout ? tryout.rows : Stream.empty;
    return programRows.pipe(
      Stream.concat(quranRows),
      Stream.concat(tryoutRows)
    );
  })();
  return { manifests, rows, tryoutRuntimeSnapshot };
});
