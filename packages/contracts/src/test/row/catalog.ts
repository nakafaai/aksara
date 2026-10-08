import { Schema } from "effect";

import { ContentSnapshotRowSchema } from "#contracts/release/snapshot/data";

/** Test try-out country catalog row. */
export const countryRow = Schema.decodeSync(ContentSnapshotRowSchema)({
  family: "tryout",
  record: {
    row: {
      appLocale: "de",
      countryCode: "ID",
      countryKey: "indonesia",
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
      publicPath: "try-out/indonesia",
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
      countryKey: "indonesia",
      description: "Deskripsi ujian é",
      examKey: "snbt",
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
      publicPath: "try-out/indonesia/snbt",
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
      countryKey: "indonesia",
      examKey: "snbt",
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
      publicPath: "try-out/indonesia/snbt/2027",
      questionCount: 2,
      sectionCount: 2,
      setCount: 1,
      sourceRevision: "2026-08-12",
      title: "Trek uji é",
      trackKey: "2027",
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
      countryKey: "indonesia",
      examKey: "snbt",
      graph: {
        alignmentId:
          "alignment:material:lesson:tryout:material-section:tryout:catalog:set",
        assetId:
          "asset:en:material:lesson:tryout:material-section:tryout:catalog:set",
        conceptId: "concept:material:lesson:tryout:catalog",
        learningObjectId: "lo:material-section:tryout:catalog:set",
        lensId: "lens:material:lesson:tryout",
      },
      internalEntrySectionKey: "quantitative-knowledge",
      kind: "set",
      order: 1,
      publicPath: "try-out/indonesia/snbt/2027/set-1",
      questionCount: 1,
      scoringStrategy: "irt",
      sectionCount: 1,
      setKey: "set-1",
      sourceRevision: "2026-08-12",
      title: "Set uji é",
      trackKey: "2027",
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
      countryKey: "indonesia",
      examKey: "snbt",
      graph: {
        alignmentId:
          "alignment:material:lesson:tryout:material-section:tryout:catalog:set-2",
        assetId:
          "asset:en:material:lesson:tryout:material-section:tryout:catalog:set-2",
        conceptId: "concept:material:lesson:tryout:catalog",
        learningObjectId: "lo:material-section:tryout:catalog:set-2",
        lensId: "lens:material:lesson:tryout",
      },
      kind: "set",
      order: 2,
      publicPath: "try-out/indonesia/snbt/2027/set-2",
      questionCount: 2,
      scoringStrategy: "penalized",
      sectionCount: 2,
      setKey: "set-2",
      sourceRevision: "2026-08-12",
      title: "Set dua é",
      trackKey: "2027",
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
      countryKey: "indonesia",
      description: "Deskripsi bagian é",
      examKey: "snbt",
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
      publicPath: "try-out/indonesia/snbt/2027/set-2/quantitative-knowledge",
      questionCount: 2,
      questionSourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-2",
      sectionKey: "quantitative-knowledge",
      setKey: "set-2",
      sourceRevision: "2026-08-12",
      timeLimitSeconds: 1800,
      title: "Bagian uji é",
      trackKey: "2027",
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
      countryKey: "indonesia",
      examKey: "snbt",
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
        "packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1",
      sectionKey: "quantitative-knowledge",
      setKey: "set-1",
      sourceRevision: "2026-08-12",
      timeLimitSeconds: 60,
      title: "Test-only Abschnitt ü",
      trackKey: "2027",
      visibility: "internal-entry",
    },
    rowHash:
      "sha256:9999999999999999999999999999999999999999999999999999999999999999",
  },
  rowKind: "catalog",
});
