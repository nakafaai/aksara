import type { ActiveAppLocaleList } from "@nakafa/aksara-contracts/locale";
import {
  type QuranProvenanceRecord,
  QuranProvenanceRecordSchema,
  type QuranProvenanceScope,
  quranProvenanceScopes,
} from "@nakafa/aksara-contracts/quran/provenance";
import { Effect } from "effect";

import { quranSourceAttributionFor } from "#corpus/quran/attribution";
import { authoringQuranSourceAttribution } from "#corpus/quran/attribution/source";
import { germanQuranProvenanceRecord } from "#corpus/quran/provenance/german";

const arabicTextRecord = QuranProvenanceRecordSchema.make({
  attribution: authoringQuranSourceAttribution("tanzil-text"),
  evidence:
    "The pinned Uthmani v1.1 bytes are generated and published verbatim with the required Tanzil attribution, update link, license notice, and unchanged raw copyright block.",
  scope: "arabic-text",
  status: "approved",
});
const englishTranslationRecord = QuranProvenanceRecordSchema.make({
  attribution: authoringQuranSourceAttribution("quranenc-english"),
  evidence:
    "The official exact XML transcript, publisher, v1.0.19-xml.1 identifier, republishing terms, and update endpoint are pinned without modifying content.",
  scope: "en-translation",
  status: "approved",
});
const indonesianTranslationRecord = QuranProvenanceRecordSchema.make({
  attribution: authoringQuranSourceAttribution("quranenc-indonesian"),
  evidence:
    "The official exact XML transcript, publisher, v1.0.1-xml.1 identifier, republishing terms, and update endpoint are pinned without modifying content.",
  scope: "id-translation",
  status: "approved",
});
const indonesianTafsirRecord = QuranProvenanceRecordSchema.make({
  attribution: authoringQuranSourceAttribution("quranenc-tafsir"),
  evidence:
    "All 114 official API responses are pinned as one domain-separated byte bundle; v1.0.0 publisher and republishing terms are preserved without short or long reconstruction.",
  scope: "id-tafsir",
  status: "approved",
});
const metadataRecord = QuranProvenanceRecordSchema.make({
  attribution: authoringQuranSourceAttribution("tanzil-metadata"),
  evidence:
    "Surah identity, verse counts, revelation order and place, partitions, and sajda markers come only from the pinned official metadata v1.0 bytes declaring cc-by.",
  scope: "metadata",
  status: "approved",
});

const provenanceRecordByScope: Record<
  QuranProvenanceScope,
  QuranProvenanceRecord
> = {
  "arabic-text": arabicTextRecord,
  "de-translation": germanQuranProvenanceRecord,
  "en-translation": englishTranslationRecord,
  "id-tafsir": indonesianTafsirRecord,
  "id-translation": indonesianTranslationRecord,
  metadata: metadataRecord,
};

/** Selects exact ordered evidence and localized attribution copy for publication. */
export const quranProvenanceRecordsFor = Effect.fn(
  "AksaraCorpus.quranProvenanceRecordsFor"
)(function* (activeAppLocales: ActiveAppLocaleList) {
  return yield* Effect.forEach(
    quranProvenanceScopes(activeAppLocales),
    (scope) =>
      Effect.gen(function* () {
        const record = provenanceRecordByScope[scope];
        const attribution = yield* quranSourceAttributionFor(
          record.attribution.id,
          activeAppLocales
        );
        return QuranProvenanceRecordSchema.make({ ...record, attribution });
      }),
    { concurrency: "unbounded" }
  );
});
