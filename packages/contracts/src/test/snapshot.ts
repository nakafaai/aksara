import { Array as Arr, Effect, Stream } from "effect";

import {
  digestAssessmentRows,
  makeAssessmentSnapshot,
} from "#contracts/assessment/snapshot";
import { Sha256HashSchema } from "#contracts/ids";
import { ACTIVE_APP_LOCALES } from "#contracts/locale";
import { digestProgramRows } from "#contracts/program/snapshot/digest";
import { makeProgramSnapshot } from "#contracts/program/snapshot/hash";
import { digestQuranRows } from "#contracts/quran/snapshot/digest";
import { makeQuranSnapshot } from "#contracts/quran/snapshot/hash";
import { bindQuranRow } from "#contracts/quran/snapshot/row/hash";
import { quranSourceFileCount } from "#contracts/quran/source";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "#contracts/release/snapshot/data";
import { makeAssessmentTestRecords } from "#contracts/test/assessment/snapshot";
import { makeProgramTestRecords } from "#contracts/test/program";
import { quranTestPayloads } from "#contracts/test/quran";

const sourceDigest = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const provisionalQuranId = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);

/** Prepares complete current structured snapshot fixtures for all families. */
export const makeSnapshotTestData = Effect.fn(
  "AksaraContracts.makeSnapshotTestData"
)(function* () {
  const programRecords = yield* makeProgramTestRecords();
  const programSummary = yield* digestProgramRows({
    activeAppLocales: ACTIVE_APP_LOCALES,
    rows: Stream.fromIterable(programRecords),
  });
  const programManifest = yield* makeProgramSnapshot({
    activeAppLocales: ACTIVE_APP_LOCALES,
    ...programSummary,
  });

  const quranPayloads = quranTestPayloads();
  const provisionalQuranRecords = yield* Effect.forEach(
    quranPayloads,
    (payload) => bindQuranRow(provisionalQuranId, payload)
  );
  const quranSummary = yield* digestQuranRows({
    activeAppLocales: ACTIVE_APP_LOCALES,
    rows: Stream.fromIterable(provisionalQuranRecords),
  });
  const quranManifest = yield* makeQuranSnapshot({
    activeAppLocales: ACTIVE_APP_LOCALES,
    provenanceDigest: sourceDigest,
    provenanceStatus: "blocked",
    sourceBytes: 13_030_246,
    sourceDigest,
    sourceFileCount: quranSourceFileCount(ACTIVE_APP_LOCALES),
    surahCount: 114,
    tafsirLocales: ["id"],
    verseCount: 6236,
    ...quranSummary,
  });
  const quranRecords = yield* Effect.forEach(quranPayloads, (payload) =>
    bindQuranRow(quranManifest.snapshotId, payload)
  );

  const assessmentRecords = yield* makeAssessmentTestRecords();
  const assessmentSummary = yield* digestAssessmentRows(
    Stream.fromIterable(assessmentRecords)
  );
  const assessmentManifest = yield* makeAssessmentSnapshot({
    activeAppLocales: ACTIVE_APP_LOCALES,
    ...assessmentSummary,
  });

  const manifests: readonly ContentSnapshotManifest[] = [
    { family: "assessment", manifest: assessmentManifest },
    { family: "program", manifest: programManifest },
    { family: "quran", manifest: quranManifest },
  ];
  const rows: readonly ContentSnapshotRow[] = [
    ...Arr.map(
      assessmentRecords,
      (record) => ({ family: "assessment", record }) as const
    ),
    ...Arr.map(
      programRecords,
      (record) => ({ family: "program", record }) as const
    ),
    ...Arr.map(
      quranRecords,
      (record) => ({ family: "quran", record }) as const
    ),
  ];
  return { manifests, rows };
});
