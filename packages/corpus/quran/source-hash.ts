import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { QURAN_SOURCE_FILE_COUNT } from "@nakafa/aksara-contracts/quran/source";

/** Total bytes across exact official data artifacts, excluding legal pages. */
export const QURAN_SOURCE_BYTES = 11_506_941;

/**
 * Domain-separated digest over stable acquisition name, byte count, and exact
 * bytes for every official data artifact in canonical source order.
 */
export const QURAN_SOURCE_DIGEST = Sha256HashSchema.make(
  "sha256:73e50fb15aac4cd95c86151cc43f002b5c76986584846e16d171bd0be99f58d7"
);

/** Immutable official byte-bundle identity encoded into Quran snapshots. */
export const quranSourceSummary = {
  bytes: QURAN_SOURCE_BYTES,
  digest: QURAN_SOURCE_DIGEST,
  fileCount: QURAN_SOURCE_FILE_COUNT,
};
