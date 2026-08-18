import { QuranProvenanceRecordSchema } from "@nakafa/aksara-contracts/quran/provenance";

import { germanQuranSourceAttribution } from "#corpus/quran/attribution/german";

/** Reviewed provenance decision for the pinned German Quran translation. */
export const germanQuranProvenanceRecord = QuranProvenanceRecordSchema.make({
  attribution: germanQuranSourceAttribution,
  evidence:
    "The exact Bubenheim XML transcript, named translators, v1.1.4-xml.1 identifier, QuranEnc republication terms and update endpoint, and the official IslamHouse publication record are pinned. Content bytes remain unmodified.",
  scope: "de-translation",
  status: "approved",
});
