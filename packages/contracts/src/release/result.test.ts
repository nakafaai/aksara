import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  EMPTY_RESULT_CATALOG_DIGEST,
  RESULT_CATALOG_DIGEST_DOMAIN,
} from "#contracts/release/result";

describe("result catalog root", () => {
  it("exports the canonical domain-separated empty digest", () => {
    const digest = createHash("sha256")
      .update(RESULT_CATALOG_DIGEST_DOMAIN)
      .update("\n")
      .digest("hex");

    expect(EMPTY_RESULT_CATALOG_DIGEST).toBe(`sha256:${digest}`);
  });
});
