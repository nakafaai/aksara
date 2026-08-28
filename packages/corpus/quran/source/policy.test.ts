import { describe, expect, it } from "vitest";

import { QURAN_SOURCE_POLICY } from "#corpus/quran/source/policy";

describe("Quran source policy", () => {
  it("pins one canonical official byte inventory", () => {
    expect(QURAN_SOURCE_POLICY.tafsir.artifact).toEqual({
      byteCount: 6_584_353,
      digest:
        "sha256:39bb758c581712487be03215057cfa697280baf6245d8feb760d86df8361172b",
      fileCount: 114,
    });
    expect(QURAN_SOURCE_POLICY.evidence.germanPublication).toEqual({
      artifact: {
        byteCount: 3485,
        digest:
          "sha256:df3b2437afa0f52c3621c8c611384c45b00169e00a259a4f205a7ccd9150f645",
        fileCount: 1,
      },
      name: "islamhouse-german-bubenheim.json",
      path: "german/publication.json",
    });
    expect(Object.keys(QURAN_SOURCE_POLICY.evidence)).toEqual([
      "germanPublication",
      "kemenagPublication",
    ]);
    expect(Object.keys(QURAN_SOURCE_POLICY.terms)).toEqual([
      "islamhouse",
      "kemenag",
      "quranenc",
      "tanzil",
    ]);
  });
});
