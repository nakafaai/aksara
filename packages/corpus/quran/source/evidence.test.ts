import { QURAN_SOURCE_FILE_COUNT } from "@nakafa/aksara-contracts/quran/source";
import { describe, expect, it } from "vitest";

import {
  QURAN_SOURCE_BYTES,
  QURAN_SOURCE_DIGEST,
  quranSourceSummary,
} from "#corpus/quran/source/evidence";

describe("Quran source hash", () => {
  it("pins the exact domain-separated official byte bundle", () => {
    expect(quranSourceSummary).toEqual({
      bytes: QURAN_SOURCE_BYTES,
      digest: QURAN_SOURCE_DIGEST,
      fileCount: QURAN_SOURCE_FILE_COUNT,
    });
    expect(quranSourceSummary).toEqual({
      bytes: 11_506_941,
      digest:
        "sha256:73e50fb15aac4cd95c86151cc43f002b5c76986584846e16d171bd0be99f58d7",
      fileCount: 118,
    });
  });
});
