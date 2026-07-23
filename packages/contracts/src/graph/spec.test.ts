import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  canonicalizeLearningGraphIdentity,
  LearningGraphIdentitySchema,
} from "#contracts/graph/spec";

const identity = {
  alignmentId: "alignment:article:politics:article:politics:policy",
  assetId: "asset:en:article:politics:article:politics:policy",
  conceptId: "concept:article:politics",
  learningObjectId: "lo:article:politics:policy",
  lensId: "lens:article:politics",
} as const;

describe("learning graph contract", () => {
  it("decodes and serializes exact route projection identities", () => {
    const decoded = Schema.decodeUnknownSync(LearningGraphIdentitySchema)(
      identity
    );

    expect(canonicalizeLearningGraphIdentity(decoded)).toEqual(identity);
  });

  it.each([
    { ...identity, assetId: "concept:article:politics" },
    { ...identity, conceptId: "concept:Article:politics" },
    { ...identity, lensId: "lens:" },
  ])("rejects invalid or cross-owned graph IDs", (input) => {
    const result = Schema.decodeUnknownEither(LearningGraphIdentitySchema)(
      input
    );

    expect(Either.isLeft(result)).toBe(true);
    expect(String(result)).toContain("Expected");
  });
});
