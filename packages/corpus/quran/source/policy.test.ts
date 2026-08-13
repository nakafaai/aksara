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
  });
});
