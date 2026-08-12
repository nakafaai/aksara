import type { BinaryLike } from "node:crypto";

import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";

import type { QuranV3RowPayload } from "#contracts/quran/v3";
import { hashQuranV3Row } from "#contracts/quran/v3-hash";
import { quranV3RepresentativePayloads } from "#contracts/test/quran-v3";

const failures = vi.hoisted(() => ({ rowHash: false }));

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic failures into current Quran row hashing. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves native binding while intercepting the current row domain. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (
                failures.rowHash &&
                String(data).startsWith("nakafa.aksara.quran-row.v3\n")
              ) {
                throw new TypeError("injected current Quran row hash failure");
              }
              target.update(data);
              return receiver;
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

/** Requires one current surah payload for deterministic hash failures. */
function representativeSurah(): QuranV3RowPayload {
  const payload = quranV3RepresentativePayloads().find(
    (candidate) => candidate.kind === "quran-surah"
  );
  if (payload === undefined) {
    throw new Error("Expected one current Quran surah fixture.");
  }
  return payload;
}

const payload = representativeSurah();

describe("Quran v3 row hashing", () => {
  it("maps current row hashing failures to the typed error", async () => {
    failures.rowHash = true;
    const error = await Effect.runPromise(
      hashQuranV3Row(payload).pipe(Effect.flip)
    );
    failures.rowHash = false;

    expect(error).toMatchObject({ _tag: "QuranHashError", scope: "row" });
  });
});
