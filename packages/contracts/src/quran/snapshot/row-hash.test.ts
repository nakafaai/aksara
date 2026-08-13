import type { BinaryLike } from "node:crypto";

import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";

import type { QuranRowPayload } from "#contracts/quran/snapshot/row";
import { hashQuranRow } from "#contracts/quran/snapshot/row-hash";
import { quranRepresentativePayloads } from "#contracts/test/quran";

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
                String(data).startsWith("nakafa.aksara.quran-row\n")
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
function representativeSurah(): QuranRowPayload {
  const payload = quranRepresentativePayloads().find(
    (candidate) => candidate.kind === "quran-surah"
  );
  if (payload === undefined) {
    throw new Error("Expected one current Quran surah fixture.");
  }
  return payload;
}

const payload = representativeSurah();

describe("Quran row hashing", () => {
  it("maps current row hashing failures to the typed error", async () => {
    failures.rowHash = true;
    const error = await Effect.runPromise(
      hashQuranRow(payload).pipe(Effect.flip)
    );
    failures.rowHash = false;

    expect(error).toMatchObject({ _tag: "QuranRowHashError", scope: "row" });
  });
});
