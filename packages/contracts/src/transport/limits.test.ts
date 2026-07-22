import { describe, expect, it } from "vitest";
import {
  MAX_ARTIFACT_BATCH_BYTES,
  MAX_ARTIFACT_BATCH_COUNT,
  MAX_ITEM_BATCH_BYTES,
  MAX_ITEM_BATCH_COUNT,
  MAX_PROJECTION_BATCH_BYTES,
  MAX_PROJECTION_BATCH_COUNT,
  MAX_PUBLICATION_REQUEST_BYTES,
  MAX_PUBLICATION_RESPONSE_BYTES,
} from "#contracts/transport/limits";

describe("publication transport limits", () => {
  it("keeps every measured backend and HTTP ceiling explicit", () => {
    expect(MAX_PUBLICATION_REQUEST_BYTES).toBe(5 * 1024 * 1024);
    expect(MAX_PUBLICATION_RESPONSE_BYTES).toBe(5 * 1024 * 1024);
    expect(MAX_ARTIFACT_BATCH_BYTES).toBe(4 * 1024 * 1024);
    expect(MAX_ARTIFACT_BATCH_COUNT).toBe(8);
    expect(MAX_ITEM_BATCH_BYTES).toBe(512 * 1024);
    expect(MAX_ITEM_BATCH_COUNT).toBe(100);
    expect(MAX_PROJECTION_BATCH_BYTES).toBe(4 * 1024 * 1024);
    expect(MAX_PROJECTION_BATCH_COUNT).toBe(100);
  });
});
