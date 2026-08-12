import { Effect } from "effect";

import { AppLocaleSchema } from "#contracts/locale";
import type { ProgramSnapshotV4Row } from "#contracts/program/v4";
import {
  makeCurriculumSnapshotV4Row,
  makeProgramSnapshotV4Row,
} from "#contracts/program/v4-hash";
import { makeTestProgramRecords } from "#contracts/test/program";

/** Converts all historical technical program fixtures to current row records. */
export const makeProgramV4TestRecords = Effect.fn(
  "AksaraContracts.makeProgramV4TestRecords"
)(function* () {
  const historical = yield* makeTestProgramRecords();
  const programs = yield* Effect.forEach(historical.programRecords, (record) =>
    makeProgramSnapshotV4Row({
      ...record.row,
      translations: [
        {
          appLocale: AppLocaleSchema.make("en"),
          ...record.row.translations.en,
        },
        {
          appLocale: AppLocaleSchema.make("id"),
          ...record.row.translations.id,
        },
      ],
    })
  );
  const curricula = yield* Effect.forEach(
    historical.curriculumRecords,
    (record) =>
      makeCurriculumSnapshotV4Row({
        ...record.row,
        locale: AppLocaleSchema.make(record.row.locale),
      })
  );
  return [...programs, ...curricula];
});

/** Selects current program catalog records from one complete row fixture. */
export function programV4CatalogRows(records: readonly ProgramSnapshotV4Row[]) {
  return records.filter(
    (record): record is Extract<ProgramSnapshotV4Row, { kind: "program-v4" }> =>
      record.kind === "program-v4"
  );
}

/** Selects current curriculum records from one complete row fixture. */
export function curriculumV4Rows(records: readonly ProgramSnapshotV4Row[]) {
  return records.filter(
    (
      record
    ): record is Extract<ProgramSnapshotV4Row, { kind: "curriculum-v4" }> =>
      record.kind === "curriculum-v4"
  );
}
