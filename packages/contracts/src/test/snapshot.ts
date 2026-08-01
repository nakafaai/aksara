import { Effect, Schema, Stream } from "effect";

import { type ContentLocale, ContentLocaleSchema } from "#contracts/content";
import { Sha256HashSchema } from "#contracts/ids";
import { digestProgramRows } from "#contracts/program/row-digest";
import {
  PROGRAM_SNAPSHOT_FORMAT,
  ProgramSnapshotSchema,
} from "#contracts/program/snapshot";
import { hashProgramSnapshot } from "#contracts/program/snapshot-hash";
import type {
  ContentSnapshotManifest,
  ContentSnapshotRow,
} from "#contracts/release/snapshot-data";
import { makeTestProgramRecords } from "#contracts/test/program";
import { makeQuranTestData } from "#contracts/test/quran";
import {
  compareTryoutCatalog,
  compareTryoutPlacements,
} from "#contracts/tryout/identity";
import {
  digestTryoutCatalog,
  digestTryoutPlacements,
  makeTryoutCatalogRecord,
  makeTryoutPlacementRecord,
} from "#contracts/tryout/row-hash";
import { makeTryoutSnapshot } from "#contracts/tryout/snapshot-hash";
import {
  TryoutCatalogRowSchema,
  TryoutContentHashSchema,
  TryoutPlacementSchema,
} from "#contracts/tryout/spec";

const sourceHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const contentHash = TryoutContentHashSchema.make("c".repeat(64));

/** Builds a test-owned graph identity for one try-out hierarchy row. */
function tryoutGraph(locale: ContentLocale, kind: string) {
  return {
    alignmentId: `alignment:tryout:test:${kind}`,
    assetId: `asset:${locale}:tryout:test:${kind}`,
    conceptId: `concept:tryout:test:${kind}`,
    learningObjectId: `lo:tryout-test-${kind}`,
    lensId: "lens:tryout:test",
  };
}

/** Builds both locale variants for every try-out hierarchy kind. */
function tryoutCatalog() {
  const rows = ContentLocaleSchema.literals.flatMap((locale) => {
    const root = locale === "en" ? "try-out" : "uji-coba";
    const common = {
      locale,
      sourceRevision: "test-revision",
      title: "Test-only title",
    };
    return [
      {
        ...common,
        countryCode: "ID",
        countryKey: "indonesia",
        graph: tryoutGraph(locale, "country"),
        kind: "country",
        order: 1,
        publicPath: `${root}/indonesia`,
      },
      {
        ...common,
        countryKey: "indonesia",
        examKey: "snbt",
        graph: tryoutGraph(locale, "exam"),
        kind: "exam",
        order: 1,
        publicPath: `${root}/indonesia/snbt`,
        scoringStrategy: "irt",
      },
      {
        ...common,
        countryKey: "indonesia",
        examKey: "snbt",
        graph: tryoutGraph(locale, "track"),
        kind: "track",
        order: 1,
        publicPath: `${root}/indonesia/snbt/2027`,
        questionCount: 1,
        sectionCount: 1,
        setCount: 1,
        trackKey: "2027",
        trackKind: "year",
        visibleSectionCount: 0,
      },
      {
        ...common,
        countryKey: "indonesia",
        examKey: "snbt",
        graph: tryoutGraph(locale, "set"),
        internalEntrySectionKey: "quantitative-knowledge",
        kind: "set",
        order: 1,
        publicPath: `${root}/indonesia/snbt/2027/set-1`,
        questionCount: 1,
        scoringStrategy: "irt",
        sectionCount: 1,
        setKey: "set-1",
        trackKey: "2027",
        visibleSectionCount: 0,
      },
      {
        ...common,
        countryKey: "indonesia",
        examKey: "snbt",
        graph: tryoutGraph(locale, "section"),
        kind: "section",
        order: 1,
        questionCount: 1,
        questionSourcePath:
          "packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1",
        sectionKey: "quantitative-knowledge",
        setKey: "set-1",
        timeLimitSeconds: 60,
        trackKey: "2027",
        visibility: "internal-entry",
      },
    ];
  });
  return Schema.decodeUnknownSync(Schema.Array(TryoutCatalogRowSchema))(rows);
}

/** Builds one localized, artifact-bound test placement. */
function tryoutPlacement(locale: ContentLocale) {
  return Schema.decodeUnknownSync(TryoutPlacementSchema)({
    answerArtifactHash: sourceHash,
    answerContentKey:
      "question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/answer",
    choices: [
      {
        isCorrect: true,
        label: "Test-only choice",
        optionKey: "option-1",
        order: 1,
      },
    ],
    contentHash,
    countryKey: "indonesia",
    examKey: "snbt",
    locale,
    questionArtifactHash: sourceHash,
    questionContentKey:
      "question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/question",
    questionOrder: 1,
    questionSourcePath:
      "packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1",
    rendererDomain: "snbt-quant",
    scope: "server",
    sectionKey: "quantitative-knowledge",
    setKey: "set-1",
    sourceRevision: "test-revision",
    title: "Test-only question",
    trackKey: "2027",
  });
}

/** Prepares complete test-only manifests and authenticated rows. */
export const makeSnapshotTestData = Effect.fn(
  "AksaraContracts.makeSnapshotTestData"
)(function* () {
  const { curriculumRecords, programRecords } = yield* makeTestProgramRecords();
  const aggregateRecords = [...programRecords, ...curriculumRecords];
  const programSummary = yield* digestProgramRows(
    Stream.fromIterable(aggregateRecords)
  );
  const programInput = {
    format: PROGRAM_SNAPSHOT_FORMAT,
    locales: ContentLocaleSchema.literals,
    ...programSummary,
  } as const;
  const programId = yield* hashProgramSnapshot(programInput);
  const programManifest = ProgramSnapshotSchema.make({
    ...programInput,
    snapshotId: programId,
  });

  const quran = yield* makeQuranTestData();

  const catalogRecords = tryoutCatalog()
    .map(makeTryoutCatalogRecord)
    .sort((left, right) => compareTryoutCatalog(left.row, right.row));
  const placementRecords = ContentLocaleSchema.literals
    .map(tryoutPlacement)
    .map(makeTryoutPlacementRecord)
    .sort((left, right) => compareTryoutPlacements(left.row, right.row));
  const [catalogSummary, placementSummary] = yield* Effect.all([
    digestTryoutCatalog(Stream.fromIterable(catalogRecords)),
    digestTryoutPlacements(Stream.fromIterable(placementRecords)),
  ]);
  const tryoutManifest = makeTryoutSnapshot({
    catalogDigest: catalogSummary.digest,
    counts: { country: 2, exam: 2, section: 2, set: 2, track: 2 },
    format: "tryout-v1",
    locales: ContentLocaleSchema.literals,
    placementCount: placementSummary.count,
    placementDigest: placementSummary.digest,
    routeCount: 8,
  });

  const manifests: readonly ContentSnapshotManifest[] = [
    { family: "program", manifest: programManifest },
    { family: "quran", manifest: quran.manifest },
    { family: "tryout", manifest: tryoutManifest },
  ];
  const rows: readonly ContentSnapshotRow[] = [
    ...aggregateRecords.map(
      (record) =>
        ({
          family: "program",
          record,
        }) as const
    ),
    ...quran.records.map((record) => ({ family: "quran", record }) as const),
    ...catalogRecords.map(
      (record) => ({ family: "tryout", record, rowKind: "catalog" }) as const
    ),
    ...placementRecords.map(
      (record) => ({ family: "tryout", record, rowKind: "placement" }) as const
    ),
  ];
  return { manifests, rows };
});
