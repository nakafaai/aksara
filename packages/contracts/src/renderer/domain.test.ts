import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  RENDERER_DOMAINS,
  RendererDomainSchema,
} from "#contracts/renderer/domain";

describe("renderer domain", () => {
  it("accepts only real canonically ordered Nakafa route domains", () => {
    expect(RENDERER_DOMAINS).toEqual([
      "material-chemistry",
      "material-mathematics",
    ]);
    expect(
      RENDERER_DOMAINS.every((domain) =>
        Either.isRight(Schema.decodeUnknownEither(RendererDomainSchema)(domain))
      )
    ).toBe(true);
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(RendererDomainSchema)("material-physics")
      )
    ).toBe(true);
  });
});
