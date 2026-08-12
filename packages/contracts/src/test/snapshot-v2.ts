import { Effect, Schema, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { ActiveAppLocaleListSchema, AppLocaleSchema } from "#contracts/locale";
import { hashProgramSnapshotV4 } from "#contracts/program/snapshot/hash";
import {
  PROGRAM_SNAPSHOT_V4_FORMAT,
  ProgramSnapshotV4Schema,
} from "#contracts/program/snapshot/spec";
import { digestProgramV4Rows } from "#contracts/program/v4-digest";
import {
  makeCurriculumSnapshotV4Row,
  makeProgramSnapshotV4Row,
} from "#contracts/program/v4-hash";
import { hashQuranSnapshotV3 } from "#contracts/quran/snapshot/hash";
import {
  QURAN_SNAPSHOT_FORMAT,
  QURAN_SNAPSHOT_V3_FORMAT,
  QuranSnapshotV3ManifestSchema,
} from "#contracts/quran/snapshot/spec";
import { digestQuranV3Rows } from "#contracts/quran/v3-digest";
import { bindQuranV3Row } from "#contracts/quran/v3-hash";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "#contracts/release/snapshot/data";
import { quranV3TestPayloads } from "#contracts/test/quran-v3";
import { makeSnapshotTestData } from "#contracts/test/snapshot";
import { compareCodeUnits } from "#contracts/text/order";
import {
  digestTryoutCatalogV2,
  makeTryoutCatalogV2Record,
  tryoutCatalogV2Identity,
} from "#contracts/tryout/catalog-hash";
import { compareTryoutPlacementsV2 } from "#contracts/tryout/identity";
import { TryoutPlacementV2Schema } from "#contracts/tryout/placement";
import {
  digestTryoutPlacementsV2,
  makeTryoutPlacementV2Record,
} from "#contracts/tryout/placement-hash";
import { makeTryoutSnapshotV2 } from "#contracts/tryout/snapshot/hash";
import { TRYOUT_SNAPSHOT_V2_FORMAT } from "#contracts/tryout/snapshot/spec";

const reviewDigest = Sha256HashSchema.make(`sha256:${"d".repeat(64)}`);
const activeAppLocales = Schema.decodeUnknownSync(ActiveAppLocaleListSchema)([
  "en",
  "id",
]);

/** Converts one historical placement into explicit v2 language identity. */
function toPlacementV2(
  record: Extract<ContentSnapshotRow, { rowKind: "placement" }>["record"]
) {
  const { locale, ...row } = record.row;
  return makeTryoutPlacementV2Record(
    Schema.decodeUnknownSync(TryoutPlacementV2Schema)({
      ...row,
      answerArtifactLocale: locale,
      appLocale: locale,
      deliveryLanguage: locale,
      questionArtifactLocale: locale,
    })
  );
}

/** Prepares complete en and id v2 manifests over authenticated test rows. */
export const makeSnapshotV2TestData = Effect.fn(
  "AksaraContracts.makeSnapshotV2TestData"
)(function* () {
  const historical = yield* makeSnapshotTestData();
  const historicalProgramRecords = historical.rows.flatMap((row) =>
    row.family === "program" &&
    !("rowKind" in row) &&
    row.record.kind === "program"
      ? [row.record]
      : []
  );
  const historicalCurriculumRecords = historical.rows.flatMap((row) =>
    row.family === "program" &&
    !("rowKind" in row) &&
    row.record.kind === "curriculum"
      ? [row.record]
      : []
  );
  const currentProgramRecords = yield* Effect.forEach(
    historicalProgramRecords,
    (record) =>
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
  const currentCurriculumRecords = yield* Effect.forEach(
    historicalCurriculumRecords,
    (record) =>
      makeCurriculumSnapshotV4Row({
        ...record.row,
        locale: AppLocaleSchema.make(record.row.locale),
      })
  );
  const programRecords = [
    ...currentProgramRecords,
    ...currentCurriculumRecords,
  ];
  const programSummary = yield* digestProgramV4Rows({
    activeAppLocales,
    rows: Stream.fromIterable(programRecords),
  });
  const programIdentity = {
    activeAppLocales,
    editorialReviewDigest: reviewDigest,
    format: PROGRAM_SNAPSHOT_V4_FORMAT,
    ...programSummary,
  } as const;
  const programSnapshotId = yield* hashProgramSnapshotV4(programIdentity);
  const programManifest = ProgramSnapshotV4Schema.make({
    ...programIdentity,
    snapshotId: programSnapshotId,
  });

  const historicalQuran = historical.manifests.find(
    (snapshot) => snapshot.family === "quran"
  );
  if (
    historicalQuran?.family !== "quran" ||
    historicalQuran.manifest.format !== QURAN_SNAPSHOT_FORMAT
  ) {
    return yield* Effect.dieMessage("Expected a historical Quran manifest.");
  }
  const quranPayloads = quranV3TestPayloads();
  const provisionalQuranRecords = yield* Effect.forEach(quranPayloads, (row) =>
    bindQuranV3Row(historicalQuran.manifest.snapshotId, row)
  );
  const quranSummary = yield* digestQuranV3Rows({
    activeAppLocales,
    rows: Stream.fromIterable(provisionalQuranRecords),
  });
  const {
    locales: _locales,
    snapshotId: _snapshotId,
    ...quranFields
  } = historicalQuran.manifest;
  const quranIdentity = {
    ...quranFields,
    activeAppLocales,
    editorialReviewDigest: reviewDigest,
    format: QURAN_SNAPSHOT_V3_FORMAT,
    projectionCount: quranSummary.projectionCount,
    projectionDigest: quranSummary.projectionDigest,
    runtimeCount: quranSummary.runtimeCount,
    runtimeDigest: quranSummary.runtimeDigest,
    searchCount: quranSummary.searchCount,
    searchDigest: quranSummary.searchDigest,
  } as const;
  const quranSnapshotId = yield* hashQuranSnapshotV3(quranIdentity);
  const quranManifest = QuranSnapshotV3ManifestSchema.make({
    ...quranIdentity,
    snapshotId: quranSnapshotId,
  });
  const reboundQuranRecords = yield* Effect.forEach(quranPayloads, (payload) =>
    bindQuranV3Row(quranSnapshotId, payload)
  );

  const catalogRecords = historical.rows
    .flatMap((row) =>
      row.family === "tryout" && row.rowKind === "catalog" ? [row.record] : []
    )
    .map(({ row }) => {
      const { locale, ...catalogRow } = row;
      return makeTryoutCatalogV2Record({
        ...catalogRow,
        appLocale: AppLocaleSchema.make(locale),
      });
    })
    .sort((left, right) =>
      compareCodeUnits(
        tryoutCatalogV2Identity(left.row),
        tryoutCatalogV2Identity(right.row)
      )
    );
  const placementRecords = historical.rows
    .flatMap((row) =>
      row.family === "tryout" && row.rowKind === "placement" ? [row.record] : []
    )
    .map(toPlacementV2)
    .sort((left, right) => compareTryoutPlacementsV2(left.row, right.row));
  const [catalogSummary, placementSummary] = yield* Effect.all([
    digestTryoutCatalogV2(Stream.fromIterable(catalogRecords)),
    digestTryoutPlacementsV2(Stream.fromIterable(placementRecords)),
  ]);
  const tryoutManifest = makeTryoutSnapshotV2({
    activeAppLocales,
    catalogDigest: catalogSummary.digest,
    counts: { country: 2, exam: 2, section: 2, set: 2, track: 2 },
    editorialReviewDigest: reviewDigest,
    format: TRYOUT_SNAPSHOT_V2_FORMAT,
    placementCount: placementSummary.count,
    placementDigest: placementSummary.digest,
    routeCount: 8,
  });

  const manifests: readonly ContentSnapshotManifest[] = [
    { family: "program", manifest: programManifest },
    { family: "quran", manifest: quranManifest },
    { family: "tryout", manifest: tryoutManifest },
  ];
  const rows: readonly ContentSnapshotRow[] = [
    ...programRecords.map(
      (record) =>
        ({ family: "program", record, rowKind: "program-v4" }) as const
    ),
    ...reboundQuranRecords.map(
      (record) => ({ family: "quran", record, rowKind: "quran-v3" }) as const
    ),
    ...catalogRecords.map(
      (record) => ({ family: "tryout", record, rowKind: "catalog-v2" }) as const
    ),
    ...placementRecords.map(
      (record) =>
        ({ family: "tryout", record, rowKind: "placement-v2" }) as const
    ),
  ];
  return { manifests, rows };
});
