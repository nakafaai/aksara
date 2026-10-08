import { describe, expect, it } from "@effect/vitest";

import { hashTryoutCanonical } from "#contracts/tryout/canonical";

describe("try-out canonical digest golden vectors", () => {
  it("pins the domain-separated digest of a canonical text with non-ASCII content", () => {
    expect(
      hashTryoutCanonical(
        "nakafa.aksara.tryout-catalog",
        '{"order":1,"title":"Matematika é"}'
      )
    ).toBe(
      "sha256:ea63659e7b50671a5fcb57af5617cfe37767d2086d98f073a0db1f9a4ab7326e"
    );
  });

  it("pins the digest of an empty canonical text under another domain", () => {
    expect(hashTryoutCanonical("nakafa.aksara.tryout-placements", "")).toBe(
      "sha256:19fc8b6596c4e1870e17c644b76047b3e9899fba1f94c53939102055c7d91d32"
    );
  });
});
