import { describe, expect, it } from "vitest";
import {
  MAX_CANONICAL_PAYLOAD_BYTES,
  MAX_COMPILED_CODE_BYTES,
  MAX_PLAIN_TEXT_BYTES,
  MAX_RAW_MDX_BYTES,
  MAX_SIGNED_ARTIFACT_BYTES,
} from "#contracts/limits";

describe("content byte limits", () => {
  it("keeps every bounded layer below its next storage boundary", () => {
    expect(MAX_RAW_MDX_BYTES).toBe(128 * 1024);
    expect(MAX_COMPILED_CODE_BYTES).toBe(256 * 1024);
    expect(MAX_PLAIN_TEXT_BYTES).toBe(128 * 1024);
    expect(MAX_CANONICAL_PAYLOAD_BYTES).toBe(448 * 1024);
    expect(MAX_SIGNED_ARTIFACT_BYTES).toBe(480 * 1024);
    expect(MAX_CANONICAL_PAYLOAD_BYTES).toBeLessThan(MAX_SIGNED_ARTIFACT_BYTES);
  });
});
