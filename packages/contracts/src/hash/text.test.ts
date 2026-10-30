// @vitest-environment node
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { hashText } from "#contracts/hash/text";

describe("UTF-8 text hashing", () => {
  it.effect("pins SHA-256 digests of exact UTF-8 text", () =>
    Effect.gen(function* () {
      expect(yield* hashText("")).toBe(
        "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
      );
      expect(yield* hashText("Aksara Web Crypto hash")).toBe(
        "sha256:df94be7c8547260bb1c281c2099e774bfa44bb58d8bd0f5fedfbf0e27063467e"
      );
      expect(yield* hashText("Pecahan Ñandú café 😀")).toBe(
        "sha256:6dd9e8ed6a6239806bb4601a37cc81921ff3958f5d44c16f4a6a46f42cbf4947"
      );
    })
  );

  it.effect("pins the digest of ASCII and multi-line non-ASCII text", () =>
    Effect.gen(function* () {
      expect(yield* hashText("aksara")).toBe(
        "sha256:10d512e0d0ea808078e6e773ca22d06dda9c8255f557674eba033830a07a8732"
      );
      expect(yield* hashText("Pelajaran é ✓ 数学\n\n- satu\n- dua")).toBe(
        "sha256:4f6d1d56c579dfce19f0c186e79bd9dd9ed504ccf9ec1b6048b936489a396583"
      );
    })
  );
});
