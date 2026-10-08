import { Schema } from "effect";

import { ContentSnapshotRowSchema } from "#contracts/release/snapshot/data";

/** Test try-out country catalog row. */
export const countryRow = Schema.decodeSync(ContentSnapshotRowSchema)({
  family: "tryout",
  record: {
    row: {
      appLocale: "de",
      countryCode: "ZZ",
      countryKey: "test-country",
      graph: {
        alignmentId:
          "alignment:material:lesson:tryout:material-section:tryout:catalog:country",
        assetId:
          "asset:de:material:lesson:tryout:material-section:tryout:catalog:country",
        conceptId: "concept:material:lesson:tryout:catalog",
        learningObjectId: "lo:material-section:tryout:catalog:country",
        lensId: "lens:material:lesson:tryout",
      },
      kind: "country",
      order: 1,
      publicPath: "try-out/test-country",
      sourceRevision: "2026-08-12",
      title: "Judul uji é",
    },
    rowHash:
      "sha256:5837245a718549d1811a9d3d95a6b163bd51cf88b2682ac35fbbf579f41e53de",
  },
  rowKind: "catalog",
});

/** Test try-out exam catalog row with a description. */
export const examRow = Schema.decodeSync(ContentSnapshotRowSchema)({
  family: "tryout",
  record: {
    row: {
      appLocale: "id",
      countryKey: "test-country",
      description: "Deskripsi ujian é",
      examKey: "test-exam",
      graph: {
        alignmentId:
          "alignment:material:lesson:tryout:material-section:tryout:catalog:exam",
        assetId:
          "asset:id:material:lesson:tryout:material-section:tryout:catalog:exam",
        conceptId: "concept:material:lesson:tryout:catalog",
        learningObjectId: "lo:material-section:tryout:catalog:exam",
        lensId: "lens:material:lesson:tryout",
      },
      kind: "exam",
      order: 1,
      publicPath: "try-out/test-country/test-exam",
      scoringStrategy: "irt",
      sourceRevision: "2026-08-12",
      title: "Ujian uji é",
    },
    rowHash:
      "sha256:4444444444444444444444444444444444444444444444444444444444444444",
  },
  rowKind: "catalog",
});

/** Test try-out track catalog row. */
export const trackRow = Schema.decodeSync(ContentSnapshotRowSchema)({
  family: "tryout",
  record: {
    row: {
      appLocale: "en",
      countryKey: "test-country",
      examKey: "test-exam",
      graph: {
        alignmentId:
          "alignment:material:lesson:tryout:material-section:tryout:catalog:track",
        assetId:
          "asset:en:material:lesson:tryout:material-section:tryout:catalog:track",
        conceptId: "concept:material:lesson:tryout:catalog",
        learningObjectId: "lo:material-section:tryout:catalog:track",
        lensId: "lens:material:lesson:tryout",
      },
      kind: "track",
      order: 1,
      publicPath: "try-out/test-country/test-exam/test-track",
      questionCount: 2,
      sectionCount: 2,
      setCount: 1,
      sourceRevision: "2026-08-12",
      title: "Trek uji é",
      trackKey: "test-track",
      trackKind: "year",
      visibleSectionCount: 0,
    },
    rowHash:
      "sha256:5555555555555555555555555555555555555555555555555555555555555555",
  },
  rowKind: "catalog",
});

/** Test try-out set catalog row with an internal entry section. */
export const setRow = Schema.decodeSync(ContentSnapshotRowSchema)({
  family: "tryout",
  record: {
    row: {
      appLocale: "en",
      countryKey: "test-country",
      examKey: "test-exam",
      graph: {
        alignmentId:
          "alignment:material:lesson:tryout:material-section:tryout:catalog:set",
        assetId:
          "asset:en:material:lesson:tryout:material-section:tryout:catalog:set",
        conceptId: "concept:material:lesson:tryout:catalog",
        learningObjectId: "lo:material-section:tryout:catalog:set",
        lensId: "lens:material:lesson:tryout",
      },
      internalEntrySectionKey: "test-section",
      kind: "set",
      order: 1,
      publicPath: "try-out/test-country/test-exam/test-track/test-set",
      questionCount: 1,
      scoringStrategy: "irt",
      sectionCount: 1,
      setKey: "test-set",
      sourceRevision: "2026-08-12",
      title: "Set uji é",
      trackKey: "test-track",
      visibleSectionCount: 0,
    },
    rowHash:
      "sha256:6666666666666666666666666666666666666666666666666666666666666666",
  },
  rowKind: "catalog",
});

/** Test try-out set catalog row with every section visible. */
export const fullSetRow = Schema.decodeSync(ContentSnapshotRowSchema)({
  family: "tryout",
  record: {
    row: {
      appLocale: "en",
      countryKey: "test-country",
      examKey: "test-exam",
      graph: {
        alignmentId:
          "alignment:material:lesson:tryout:material-section:tryout:catalog:test-set-2",
        assetId:
          "asset:en:material:lesson:tryout:material-section:tryout:catalog:test-set-2",
        conceptId: "concept:material:lesson:tryout:catalog",
        learningObjectId: "lo:material-section:tryout:catalog:test-set-2",
        lensId: "lens:material:lesson:tryout",
      },
      kind: "set",
      order: 2,
      publicPath: "try-out/test-country/test-exam/test-track/test-set-2",
      questionCount: 2,
      scoringStrategy: "penalized",
      sectionCount: 2,
      setKey: "test-set-2",
      sourceRevision: "2026-08-12",
      title: "Set dua é",
      trackKey: "test-track",
      visibleSectionCount: 2,
    },
    rowHash:
      "sha256:7777777777777777777777777777777777777777777777777777777777777777",
  },
  rowKind: "catalog",
});

/** Test visible try-out section catalog row with marks. */
export const markedSectionRow = Schema.decodeSync(ContentSnapshotRowSchema)({
  family: "tryout",
  record: {
    row: {
      appLocale: "en",
      countryKey: "test-country",
      description: "Deskripsi bagian é",
      examKey: "test-exam",
      graph: {
        alignmentId:
          "alignment:material:lesson:tryout:material-section:tryout:catalog:section-visible",
        assetId:
          "asset:en:material:lesson:tryout:material-section:tryout:catalog:section-visible",
        conceptId: "concept:material:lesson:tryout:catalog",
        learningObjectId: "lo:material-section:tryout:catalog:section-visible",
        lensId: "lens:material:lesson:tryout",
      },
      kind: "section",
      marks: { blank: 0, correct: 4, wrong: -1 },
      order: 1,
      publicPath:
        "try-out/test-country/test-exam/test-track/test-set-2/test-section",
      questionCount: 2,
      questionSourcePath:
        "packages/corpus/question-bank/tryout/test-country/test-exam/test-section/test-set-2",
      sectionKey: "test-section",
      setKey: "test-set-2",
      sourceRevision: "2026-08-12",
      timeLimitSeconds: 1800,
      title: "Bagian uji é",
      trackKey: "test-track",
      visibility: "visible",
    },
    rowHash:
      "sha256:8888888888888888888888888888888888888888888888888888888888888888",
  },
  rowKind: "catalog",
});

/** Test internal-entry try-out section catalog row. */
export const entrySectionRow = Schema.decodeSync(ContentSnapshotRowSchema)({
  family: "tryout",
  record: {
    row: {
      appLocale: "de",
      countryKey: "test-country",
      examKey: "test-exam",
      graph: {
        alignmentId:
          "alignment:material:lesson:tryout:material-section:tryout:catalog:section-entry",
        assetId:
          "asset:de:material:lesson:tryout:material-section:tryout:catalog:section-entry",
        conceptId: "concept:material:lesson:tryout:catalog",
        learningObjectId: "lo:material-section:tryout:catalog:section-entry",
        lensId: "lens:material:lesson:tryout",
      },
      kind: "section",
      order: 2,
      questionCount: 1,
      questionSourcePath:
        "packages/corpus/question-bank/tryout/test-country/test-exam/test-section/test-set",
      sectionKey: "test-section",
      setKey: "test-set",
      sourceRevision: "2026-08-12",
      timeLimitSeconds: 60,
      title: "Test-only Abschnitt ü",
      trackKey: "test-track",
      visibility: "internal-entry",
    },
    rowHash:
      "sha256:9999999999999999999999999999999999999999999999999999999999999999",
  },
  rowKind: "catalog",
});
