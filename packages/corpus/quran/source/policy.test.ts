import { describe, expect, it } from "vitest";

import { QURAN_SOURCE_POLICY } from "#corpus/quran/source/policy";

describe("Quran source policy", () => {
  it("pins one canonical official byte inventory", () => {
    expect(QURAN_SOURCE_POLICY.tafsir.artifact).toEqual({
      byteCount: 6_584_353,
      digest:
        "sha256:b46b730418767dfacdf34ac35cec4277822a019b631910d603def280c3d56364",
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
    expect(QURAN_SOURCE_POLICY.evidence.mokhtasar).toMatchObject({
      de: {
        artifact: {
          digest:
            "sha256:f09f13815cfbd9f0faa70dd260ecb2dda1c04481d5a6969eb677efdeb2d61dca",
        },
      },
      en: {
        artifact: {
          digest:
            "sha256:48da8b01b00a20a536b11924a9d78466744b789f3f5039cf0747b3f1362eb7b8",
        },
      },
    });
  });
});
