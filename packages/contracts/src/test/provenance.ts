import { Array as Arr, Schema } from "effect";

import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocaleList,
} from "#contracts/locale";
import {
  QuranProvenanceRecordSchema,
  type QuranProvenanceScope,
  quranProvenanceScopes,
  quranSourceForProvenanceScope,
} from "#contracts/quran/provenance";
import { QuranSourceAttributionSchema } from "#contracts/quran/source";

const goldenText = Schema.decodeSync(QuranSourceAttributionSchema)({
  artifact: {
    byteCount: 1234,
    digest: `sha256:${"a".repeat(64)}`,
    fileCount: 2,
  },
  copy: [
    { appLocale: "en", notice: "Reviewed notice é", title: "Arabic text" },
  ],
  id: "tanzil-text",
  kind: "embedded",
  publisher: "Technical publisher for tanzil-text.",
  retrievedAt: "2026-07-24T17:57:50Z",
  sourceUrl: "https://example.test/tanzil-text",
  terms: {
    artifact: {
      byteCount: 99,
      digest: `sha256:${"b".repeat(64)}`,
      fileCount: 1,
    },
    url: "https://example.test/terms-text",
  },
  updateUrl: "https://example.test/update-text",
  version: "1.0",
});
const goldenMetadata = Schema.decodeSync(QuranSourceAttributionSchema)({
  artifact: {
    byteCount: 2345,
    digest: `sha256:${"c".repeat(64)}`,
    fileCount: 3,
  },
  copy: [
    { appLocale: "en", notice: "Metadata notice", title: "Surah names é" },
  ],
  id: "tanzil-metadata",
  kind: "embedded",
  publisher: "Technical publisher for tanzil-metadata.",
  retrievedAt: "2026-07-24T17:57:50Z",
  sourceUrl: "https://example.test/tanzil-metadata",
  terms: {
    artifact: {
      byteCount: 98,
      digest: `sha256:${"d".repeat(64)}`,
      fileCount: 1,
    },
    url: "https://example.test/terms-metadata",
  },
  updateUrl: "https://example.test/update-metadata",
  version: "1.1",
});
const goldenEnglish = Schema.decodeSync(QuranSourceAttributionSchema)({
  artifact: {
    byteCount: 3456,
    digest: `sha256:${"e".repeat(64)}`,
    fileCount: 4,
  },
  copy: [{ appLocale: "en", notice: "Translation notice", title: "English é" }],
  id: "quranenc-english",
  kind: "embedded",
  publisher: "Technical publisher for quranenc-english.",
  retrievedAt: "2026-07-24T17:57:50Z",
  sourceUrl: "https://example.test/quranenc-english",
  terms: {
    artifact: {
      byteCount: 97,
      digest: `sha256:${"f".repeat(64)}`,
      fileCount: 1,
    },
    url: "https://example.test/terms-english-translation",
  },
  updateUrl: "https://example.test/update-english-translation",
  version: "1.2",
});
const goldenMokhtasar = Schema.decodeSync(QuranSourceAttributionSchema)({
  copy: [
    { appLocale: "en", notice: "Link only é", title: "Mokhtasar English" },
  ],
  id: "mokhtasar-english",
  kind: "external",
  publisher: "Technical publisher for mokhtasar-english.",
  retrievedAt: "2026-07-24T17:57:50Z",
  sourceUrl: "https://example.test/mokhtasar-english",
  terms: { access: "link-only", url: "https://example.test/terms-english" },
  updateUrl: "https://example.test/update-english",
  version: "2.0",
});
export const goldenArabicRecord = Schema.decodeSync(
  QuranProvenanceRecordSchema
)({
  attribution: goldenText,
  evidence: "Bukti é",
  scope: "arabic-text",
  status: "approved",
});
export const goldenRecords = [
  goldenArabicRecord,
  Schema.decodeSync(QuranProvenanceRecordSchema)({
    attribution: goldenMetadata,
    evidence: "Nama surah",
    scope: "en-surah-name",
    status: "approved",
  }),
  Schema.decodeSync(QuranProvenanceRecordSchema)({
    attribution: goldenEnglish,
    evidence: "Terjemahan",
    scope: "en-translation",
    status: "approved",
  }),
  Schema.decodeSync(QuranProvenanceRecordSchema)({
    attribution: goldenMokhtasar,
    evidence: "Tafsir",
    scope: "en-tafsir-access",
    status: "approved",
  }),
  Schema.decodeSync(QuranProvenanceRecordSchema)({
    attribution: goldenMetadata,
    evidence: "Metadata",
    scope: "metadata",
    status: "approved",
  }),
];

/** Builds one exact technical provenance record. */
export function record(
  scope: QuranProvenanceScope,
  status: "approved" | "blocked",
  activeAppLocales: ActiveAppLocaleList = ACTIVE_APP_LOCALES
) {
  const source = quranSourceForProvenanceScope(scope);
  const common = {
    copy: Arr.map(activeAppLocales, (appLocale) => ({
      appLocale,
      notice: `Reviewed ${appLocale} notice ${source}.`,
      title: `Reviewed ${appLocale} title ${source}.`,
    })),
    publisher: `Reviewed publisher ${source}.`,
    retrievedAt: "2026-07-24T17:57:50Z",
    sourceUrl: `https://example.com/source/${source}`,
    updateUrl: `https://example.com/update/${source}`,
    version: "test-source-version",
  };
  const attribution =
    source === "mokhtasar-english" || source === "mokhtasar-german"
      ? {
          ...common,
          id: source,
          kind: "external",
          terms: {
            access: "link-only",
            url: `https://example.com/terms/${source}`,
          },
        }
      : {
          artifact: {
            byteCount: 1,
            digest: `sha256:${"a".repeat(64)}`,
            fileCount: 1,
          },
          ...common,
          id: source,
          kind: "embedded",
          terms: {
            artifact: {
              byteCount: 1,
              digest: `sha256:${"b".repeat(64)}`,
              fileCount: 1,
            },
            url: `https://example.com/terms/${source}`,
          },
        };
  return Schema.decodeUnknownSync(QuranProvenanceRecordSchema)({
    attribution,
    evidence: "Reviewed source statement.",
    scope,
    status,
  });
}

/** Builds complete provenance for one exact active application locale set. */
export function records(
  status: "approved" | "blocked",
  activeAppLocales: ActiveAppLocaleList = ACTIVE_APP_LOCALES
) {
  return Arr.map(quranProvenanceScopes(activeAppLocales), (scope) =>
    record(scope, status, activeAppLocales)
  );
}
