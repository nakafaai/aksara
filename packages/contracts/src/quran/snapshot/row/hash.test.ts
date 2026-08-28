import type { BinaryLike } from "node:crypto";
import { it as effectIt } from "@effect/vitest";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";

import {
  canonicalizeQuranRow,
  hashQuranRow,
} from "#contracts/quran/snapshot/row/hash";
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

describe("Quran row hashing", () => {
  it("signs the source locale and text of a surah name meaning", () => {
    const payload = quranRepresentativePayloads().find(
      (candidate) => candidate.kind === "quran-surah"
    );

    expect(payload && canonicalizeQuranRow(payload)).toContain(
      '"meaning":{"de":"Technische Sure 1","en":"Test Surah 1","id":"Surah Teknis 1"}'
    );
  });

  effectIt.effect("maps current row hashing failures to the typed error", () =>
    Effect.gen(function* () {
      const payload = yield* Effect.fromNullishOr(
        quranRepresentativePayloads().find(
          (candidate) => candidate.kind === "quran-surah"
        )
      );
      yield* Effect.acquireRelease(
        Effect.sync(() => {
          failures.rowHash = true;
        }),
        () =>
          Effect.sync(() => {
            failures.rowHash = false;
          })
      );

      const error = yield* hashQuranRow(payload).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "QuranRowHashError",
        scope: "row",
      });
    })
  );
});
