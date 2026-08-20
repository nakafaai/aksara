import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import {
  digestProgramRows,
  type ProgramDigestError,
} from "@nakafa/aksara-contracts/program/snapshot/digest";
import {
  makeProgramSnapshot,
  type ProgramSnapshotHashError,
} from "@nakafa/aksara-contracts/program/snapshot/hash";
import type { ProgramSnapshotRow } from "@nakafa/aksara-contracts/program/snapshot/row";
import {
  makeCurriculumSnapshotRow,
  makeProgramSnapshotRow,
  type ProgramRowHashError,
} from "@nakafa/aksara-contracts/program/snapshot/row-hash";
import {
  type ProgramCounts,
  ProgramCountsSchema,
  type ProgramSnapshot,
  ProgramSnapshotFactsSchema,
} from "@nakafa/aksara-contracts/program/snapshot/spec";
import { Effect, Stream } from "effect";

import { projectCurriculumRoutes } from "#corpus/curriculum/route";
import { decodeCurriculumCatalog } from "#corpus/curriculum/source";
import { decodeMaterialDomains } from "#corpus/material/domain";
import { decodeMaterialSources } from "#corpus/material/source";
import { decodeProgramCatalog } from "#corpus/program/catalog";

/** Resolves exact source catalogs before replaying aggregate program rows. */
const prepareProgramSources = Effect.fn("AksaraCorpus.prepareProgramSources")(
  function* (programInput?: unknown, programLocaleInput?: unknown) {
    const [curricula, domains, materials, programs] = yield* Effect.all([
      decodeCurriculumCatalog(),
      decodeMaterialDomains(),
      decodeMaterialSources(),
      decodeProgramCatalog(programInput, programLocaleInput),
    ]);
    const routes = yield* projectCurriculumRoutes({
      curricula,
      domains,
      materials,
      programs,
    });
    return { programs, routes };
  }
);

type PreparedProgramSources = Effect.Success<
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
    slugCount: programRowCount * ACTIVE_APP_LOCALES.length,
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
  | Effect.Error<ReturnType<typeof prepareProgramSources>>
  | ProgramRowHashError;

/** Failures emitted while deriving the aggregate manifest and row stream. */
export type ProgramSnapshotError =
  | ProgramDigestError
  | ProgramRowError
  | ProgramSnapshotHashError;

/** Replayable aggregate snapshot prepared from reviewed programs and curricula. */
export interface PreparedProgramSnapshot {
  readonly manifest: ProgramSnapshot;
  /** Replays all catalog rows followed by canonical localized route rows. */
  readonly rows: Stream.Stream<ProgramSnapshotRow, ProgramRowError>;
}

/** Streams catalog rows followed by canonical localized curriculum rows. */
export function streamProgramRows(
  programInput?: unknown,
  programLocaleInput?: unknown
) {
  return Stream.fromEffect(
    prepareProgramSources(programInput, programLocaleInput)
  ).pipe(Stream.flatMap(streamPreparedProgramRows));
}

/** Prepares the complete aggregate program snapshot selected by a release. */
export const prepareProgramSnapshot = Effect.fn(
  "AksaraCorpus.prepareProgramSnapshot"
)(function* (
  input: {
    readonly programInput?: unknown;
    readonly programLocaleInput?: unknown;
  } = {}
) {
  const sources = yield* prepareProgramSources(
    input.programInput,
    input.programLocaleInput
  );
  /** Replays the same decoded source rows used to derive the manifest. */
  const rows = streamPreparedProgramRows(sources);
  const summary = yield* digestProgramRows({
    activeAppLocales: ACTIVE_APP_LOCALES,
    expected: programSourceCounts(sources),
    rows,
  });
  const facts = ProgramSnapshotFactsSchema.make({
    activeAppLocales: ACTIVE_APP_LOCALES,
    ...summary,
  });
  const manifest = yield* makeProgramSnapshot(facts);
  return { manifest, rows };
});
