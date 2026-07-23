import type { BinaryLike } from "node:crypto";

import { Effect, Stream } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import { digestQuranRows } from "#contracts/quran/row-digest";
import { hashQuranRow } from "#contracts/quran/row-hash";
import type { QuranRowPayload } from "#contracts/quran/spec";
import { quranTestPayloads } from "#contracts/test/quran";

const failures = vi.hoisted(
  (): {
    domain: string | null;
    stage: "digest" | "first-update" | "later-update" | null;
  } => ({ domain: null, stage: null })
);
const invalidHash = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic failures into one selected Quran hash domain. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      let domain = "";
      let updates = 0;
      return new Proxy(hash, {
        /** Preserves native binding while intercepting explicit test state. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              const value = String(data);
              if (updates === 0) {
                const delimiter = value.indexOf("\n");
                domain = delimiter === -1 ? value : value.slice(0, delimiter);
              }
              const selected = failures.domain === domain;
              const first = failures.stage === "first-update" && updates === 0;
              const later = failures.stage === "later-update" && updates > 0;
              if (selected && (first || later)) {
                throw new TypeError("injected Quran digest update failure");
              }
              updates += 1;
              target.update(data);
              return receiver;
            };
          }
          if (
            property === "digest" &&
            failures.stage === "digest" &&
            failures.domain === domain
          ) {
            return () => {
              throw new TypeError("injected Quran digest failure");
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

/** Hashes technical payloads into the input accepted by the digest stream. */
function hashedRows(payloads: readonly QuranRowPayload[]) {
  return Stream.fromIterable(payloads).pipe(
    Stream.mapEffect((payload) =>
      hashQuranRow(payload).pipe(
        Effect.map((rowHash) => ({ payload, rowHash }))
      )
    )
  );
}

afterEach(() => {
  failures.domain = null;
  failures.stage = null;
});

describe("Quran row digest", () => {
  it("digests the complete authenticated deterministic order", async () => {
    const summary = await Effect.runPromise(
      digestQuranRows(hashedRows(quranTestPayloads()))
    );

    expect(summary).toMatchObject({
      projectionCount: 1427,
      runtimeCount: 1199,
      searchCount: 228,
    });
  }, 30_000);

  it("rejects tampered, duplicated, displaced, and incomplete rows", async () => {
    const payloads = quranTestPayloads();
    const [first, second] = payloads;
    if (!(first && second)) {
      throw new Error("Expected at least two technical Quran rows.");
    }
    const firstRow = await Effect.runPromise(
      hashQuranRow(first).pipe(
        Effect.map((rowHash) => ({ payload: first, rowHash }))
      )
    );
    const errors = await Promise.all([
      Effect.runPromise(
        digestQuranRows(
          Stream.make({ payload: first, rowHash: invalidHash })
        ).pipe(Effect.flip)
      ),
      Effect.runPromise(
        digestQuranRows(Stream.make(firstRow, firstRow)).pipe(Effect.flip)
      ),
      Effect.runPromise(
        digestQuranRows(hashedRows([second])).pipe(Effect.flip)
      ),
      Effect.runPromise(
        digestQuranRows(Stream.make(firstRow)).pipe(Effect.flip)
      ),
    ]);

    expect(errors.map(({ _tag }) => _tag)).toEqual([
      "QuranRowIntegrityError",
      "QuranRowOrderError",
      "QuranRowOrderError",
      "QuranRowOrderError",
    ]);
  });

  it("maps state creation, update, and finalization failures", async () => {
    failures.domain = "nakafa.aksara.quran-runtime.v1";
    failures.stage = "first-update";
    const stateError = await Effect.runPromise(
      digestQuranRows(Stream.empty).pipe(Effect.flip)
    );

    failures.domain = "nakafa.aksara.quran-projection.v1";
    failures.stage = "later-update";
    const [first] = quranTestPayloads();
    if (first === undefined) {
      throw new Error("Expected one technical Quran row.");
    }
    const updateError = await Effect.runPromise(
      digestQuranRows(hashedRows([first])).pipe(Effect.flip)
    );

    failures.stage = "digest";
    const digestError = await Effect.runPromise(
      digestQuranRows(hashedRows(quranTestPayloads())).pipe(Effect.flip)
    );

    expect([stateError._tag, updateError._tag, digestError._tag]).toEqual([
      "QuranHashError",
      "QuranHashError",
      "QuranHashError",
    ]);
  }, 30_000);
});
