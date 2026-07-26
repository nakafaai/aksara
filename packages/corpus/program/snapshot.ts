import { ContentLocaleSchema } from "@nakafa/aksara-contracts/content";
import {
  digestProgramRows,
  type ProgramDigestError,
} from "@nakafa/aksara-contracts/program/row-digest";
import {
  makeCurriculumSnapshotRow,
  makeProgramSnapshotRow,
  type ProgramHashError,
} from "@nakafa/aksara-contracts/program/row-hash";
import {
  PROGRAM_SNAPSHOT_FORMAT,
  type ProgramCounts,
  ProgramCountsSchema,
  type ProgramSnapshot,
  ProgramSnapshotInputSchema,
  type ProgramSnapshotRow,
  ProgramSnapshotSchema,
} from "@nakafa/aksara-contracts/program/snapshot";
import {
  hashProgramSnapshot,
  type ProgramSnapshotHashError,
} from "@nakafa/aksara-contracts/program/snapshot-hash";
import { Effect, Stream } from "effect";

import { projectCurriculumRoutes } from "#corpus/curriculum/route";
import { decodeCurriculumCatalog } from "#corpus/curriculum/source";
import { decodeMaterialSources } from "#corpus/material/source";
import { decodeProgramCatalog } from "#corpus/program/catalog";

/** Resolves exact source catalogs before replaying aggregate program rows. */
const prepareProgramSources = Effect.fn("AksaraCorpus.prepareProgramSources")(
  function* (programInput?: unknown) {
    const [curricula, materials, programs] = yield* Effect.all([
      decodeCurriculumCatalog(),
      decodeMaterialSources(),
      decodeProgramCatalog(programInput),
    ]);
    const routes = yield* projectCurriculumRoutes({
      curricula,
      materials,
      programs,
    });
    return { programs, routes };
  }
);

type PreparedProgramSources = Effect.Effect.Success<
  ReturnType<typeof prepareProgramSources>
>;

/** Derives exact expected row counts from the decoded source inventory. */
function programSourceCounts({
  programs,
  routes,
}: PreparedProgramSources): ProgramCounts {
  const curriculumRowCount = routes.length;
  const programRowCount = programs.length;
  return ProgramCountsSchema.make({
    curriculumRowCount,
    programRowCount,
    rowCount: curriculumRowCount + programRowCount,
    sitemapCount: routes.filter(({ sitemap }) => sitemap).length,
    slugCount: programRowCount * ContentLocaleSchema.literals.length,
  });
}

/** Streams rows from one already-decoded immutable source snapshot. */
function streamPreparedProgramRows({
  programs,
  routes,
}: PreparedProgramSources) {
  return Stream.fromIterable(programs).pipe(
    Stream.mapEffect(makeProgramSnapshotRow),
    Stream.concat(
      Stream.fromIterable(routes).pipe(
        Stream.mapEffect(makeCurriculumSnapshotRow)
      )
    )
  );
}

/** Errors emitted while replaying source-decoded aggregate program records. */
export type ProgramRowError =
  | Effect.Effect.Error<ReturnType<typeof prepareProgramSources>>
  | ProgramHashError;

/** Failures emitted while deriving the aggregate manifest and row stream. */
export type ProgramSnapshotError =
  | ProgramDigestError
  | ProgramRowError
  | ProgramSnapshotHashError;

/** Replayable aggregate snapshot prepared from reviewed programs and curricula. */
export interface PreparedProgramSnapshot {
  readonly manifest: ProgramSnapshot;
  /** Replays all catalog rows followed by canonical localized route rows. */
  readonly rows: () => Stream.Stream<ProgramSnapshotRow, ProgramRowError>;
}

/** Streams catalog rows followed by canonical localized curriculum rows. */
export function streamProgramRows(programInput?: unknown) {
  return Stream.fromEffect(prepareProgramSources(programInput)).pipe(
    Stream.flatMap(streamPreparedProgramRows)
  );
}

/** Prepares the complete aggregate program snapshot selected by a release. */
export const prepareProgramSnapshot: (
  input?: unknown
) => Effect.Effect<PreparedProgramSnapshot, ProgramSnapshotError> = Effect.fn(
  "AksaraCorpus.prepareProgramSnapshot"
)(function* (input) {
  const sources = yield* prepareProgramSources(input);
  /** Replays the same decoded source rows used to derive the manifest. */
  const rows = () => streamPreparedProgramRows(sources);
  const summary = yield* digestProgramRows(
    rows(),
    programSourceCounts(sources)
  );
  const identity = ProgramSnapshotInputSchema.make({
    format: PROGRAM_SNAPSHOT_FORMAT,
    locales: ContentLocaleSchema.literals,
    ...summary,
  });
  const snapshotId = yield* hashProgramSnapshot(identity);
  const manifest = ProgramSnapshotSchema.make({ ...identity, snapshotId });
  return { manifest, rows };
});
