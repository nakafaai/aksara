import { Schema } from "effect";

import { ContentSnapshotRowSchema } from "#contracts/release/snapshot/data";

/** Test Quran search snapshot row. */
export const quranSearchRow = Schema.decodeSync(ContentSnapshotRowSchema)({
  family: "quran",
  record: {
    payload: {
      appLocale: "id",
      graph: {
        alignmentId: "alignment:quran:quran-surah:1",
        assetId: "asset:id:quran:quran-surah:1",
        conceptId: "concept:quran:surah:1",
        learningObjectId: "lo:quran-surah:1",
        lensId: "lens:quran",
      },
      kind: "quran-search",
      route: "quran/1",
      surahNumber: 1,
      text: "Surah pembuka é",
      title: "Al-Fatihah é",
    },
    rowHash:
      "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    snapshotId:
      "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
  },
});
