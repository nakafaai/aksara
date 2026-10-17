import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { hashText } from "#contracts/hash/text";
import {
  EMPTY_RESULT_CATALOG_DIGEST,
  RESULT_CATALOG_DIGEST_DOMAIN,
} from "#contracts/release/result/spec";

describe("result catalog root", () => {
  it.effect("exports the canonical domain-separated empty digest", () =>
    Effect.gen(function* () {
      expect(EMPTY_RESULT_CATALOG_DIGEST).toBe(
        yield* hashText(`${RESULT_CATALOG_DIGEST_DOMAIN}\n`)
      );
    })
  );
});
