import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";

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
    const decoded = Schema.decodeSync(LearningGraphIdentitySchema)(identity);

    expect(canonicalizeLearningGraphIdentity(decoded)).toEqual(identity);
  });

  it.each([
    { ...identity, assetId: "concept:article:politics" },
    { ...identity, conceptId: "concept:Article:politics" },
    { ...identity, lensId: "lens:" },
  ])("rejects invalid or cross-owned graph IDs", (input) => {
    const result = Schema.decodeExit(LearningGraphIdentitySchema)(input);

    expect(Exit.isFailure(result)).toBe(true);
    expect(String(result)).toContain("Expected");
  });
});
