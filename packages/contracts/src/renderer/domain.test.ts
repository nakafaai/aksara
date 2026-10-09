import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Exit, Schema } from "effect";
import {
  RENDERER_DOMAINS,
  RendererDomainSchema,
} from "#contracts/renderer/domain";

describe("renderer domain", () => {
  it("accepts only real canonically ordered Nakafa route domains", () => {
    expect(RENDERER_DOMAINS).toEqual([
      "ai-ds",
      "biology",
      "chemistry",
      "mathematics",
      "physics",
      "politics",
      "site",
      "snbt-general",
      "snbt-math",
      "snbt-plain",
      "snbt-quant",
      "tka-math",
    ]);
    expect(
      Arr.every(RENDERER_DOMAINS, (domain) =>
        Exit.isSuccess(Schema.decodeExit(RendererDomainSchema)(domain))
      )
    ).toBe(true);
    expect(
      Exit.isFailure(
        Schema.decodeUnknownExit(RendererDomainSchema)("material-mathematics")
      )
    ).toBe(true);
  });
});
