import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot/data";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import type { ContentSnapshotSet } from "@nakafa/aksara-contracts/release/snapshot/spec";
import {
  type ProgramRowError,
  type ProgramSnapshotError,
  prepareProgramSnapshot,
} from "@nakafa/aksara-corpus/program/snapshot";
import {
  type PreparedQuranSnapshot,
  prepareQuranSnapshot,
} from "@nakafa/aksara-corpus/quran/snapshot";
import { loadTryoutContent } from "@nakafa/aksara-corpus/tryout/content";
import type { FileSystem, Path } from "effect";
import { Array as Arr, Effect, type Scope, Stream } from "effect";
import { prepareAssessmentSnapshot } from "#publisher/assessment/snapshot";

/** Exact sources required to prepare structured state for one Git release. */
export interface ReleaseSnapshotInput {
  readonly checkoutRoot: string;
  readonly families: PublicationScope["snapshots"];
  readonly previousSnapshots: ContentSnapshotSet | null;
}

/** Replayable changed snapshots selected by one global release. */
export interface PreparedReleaseSnapshots {
  /** Replays changed manifests in canonical assessment, program, Quran order. */
  readonly manifests: Stream.Stream<ContentSnapshotManifest>;
  /** Replays only rows owned by changed structured snapshots. */
  readonly rows: Stream.Stream<
    ContentSnapshotRow,
    ProgramRowError | PreparedQuranRowError
  >;
}

type PrepareQuranSnapshotError = Effect.Error<
  ReturnType<typeof prepareQuranSnapshot>
>;
type PreparedQuranRowError = Stream.Error<PreparedQuranSnapshot["rows"]>;
/** Every expected failure before structured release sources are replayable. */
type PrepareReleaseSnapshotError =
  | PrepareQuranSnapshotError
  | Effect.Error<ReturnType<typeof prepareAssessmentSnapshot>>
  | Effect.Error<ReturnType<typeof loadTryoutContent>>
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
export const prepareReleaseSnapshots: (
  input: ReleaseSnapshotInput
) => Effect.Effect<
  PreparedReleaseSnapshots,
  PrepareReleaseSnapshotError,
  FileSystem.FileSystem | Path.Path | Scope.Scope
> = Effect.fn("AksaraPublisher.prepareReleaseSnapshots")(function* (
  input: ReleaseSnapshotInput
) {
  const program = Arr.contains(input.families, "program")
    ? yield* prepareProgramSnapshot()
    : undefined;
  const quran = Arr.contains(input.families, "quran")
    ? yield* prepareQuranSnapshot({
        checkoutRoot: input.checkoutRoot,
      })
    : undefined;
  const assessment = Arr.contains(input.families, "assessment")
    ? yield* prepareAssessmentSnapshot({
        checkoutRoot: input.checkoutRoot,
        content: yield* loadTryoutContent(input.checkoutRoot),
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
  const assessmentChanged =
    assessment !== undefined &&
    replacesActiveSnapshot(input.previousSnapshots, assessment.manifest);
  /** Replays only changed family manifests in signed canonical order. */
  const manifests = Stream.fromIterable([
    ...(assessmentChanged && assessment ? [assessment.manifest] : []),
    ...(programChanged && programManifest ? [programManifest] : []),
    ...(quranChanged && quranManifest ? [quranManifest] : []),
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
    const assessmentRows =
      assessmentChanged && assessment ? assessment.rows : Stream.empty;
    return assessmentRows.pipe(
      Stream.concat(programRows),
      Stream.concat(quranRows)
    );
  })();
  return { manifests, rows };
});
