import type { BinaryLike } from "node:crypto";

import { Effect, Stream } from "effect";
import { describe, expect, it, vi } from "vitest";

import { streamQuranRegistry } from "#corpus/quran/registry";
import {
  digestQuranSource,
  QURAN_SOURCE_BYTES,
  QURAN_SOURCE_DIGEST,
} from "#corpus/quran/source-hash";

const failures = vi.hoisted(
  (): {
    stage: "close" | "create" | "digest" | "update" | null;
  } => ({ stage: null })
);

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic source-hash failures at one explicit stage. */
    createHash(algorithm: string) {
      if (failures.stage === "create") {
        throw new TypeError("injected Quran source hash creation failure");
      }
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves native binding while intercepting explicit test state. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              const value = String(data);
              if (
                (failures.stage === "update" && value.startsWith("{")) ||
                (failures.stage === "close" && value === "]")
              ) {
                throw new TypeError(
                  "injected Quran source hash update failure"
                );
              }
              target.update(data);
              return receiver;
            };
          }
          if (property === "digest" && failures.stage === "digest") {
            return () => {
              throw new TypeError("injected Quran source digest failure");
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

describe("Quran source hash", () => {
  it("reproduces the exact reviewed decomposition proof", async () => {
    const summary = await Effect.runPromise(
      digestQuranSource(streamQuranRegistry())
    );

    expect(summary).toEqual({
      bytes: QURAN_SOURCE_BYTES,
      digest: QURAN_SOURCE_DIGEST,
    });
  });

  it("rejects an incomplete source with exact expected proof", async () => {
    const error = await Effect.runPromise(
      digestQuranSource(streamQuranRegistry().pipe(Stream.take(1))).pipe(
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "QuranSourceIntegrityError",
      expectedBytes: QURAN_SOURCE_BYTES,
      expectedDigest: QURAN_SOURCE_DIGEST,
    });
  });

  it("maps creation, update, close, and digest failures", async () => {
    failures.stage = "create";
    const creation = await Effect.runPromise(
      digestQuranSource(Stream.empty).pipe(Effect.flip)
    );
    failures.stage = "update";
    const update = await Effect.runPromise(
      digestQuranSource(streamQuranRegistry().pipe(Stream.take(1))).pipe(
        Effect.flip
      )
    );
    failures.stage = "close";
    const close = await Effect.runPromise(
      digestQuranSource(Stream.empty).pipe(Effect.flip)
    );
    failures.stage = "digest";
    const digest = await Effect.runPromise(
      digestQuranSource(Stream.empty).pipe(Effect.flip)
    );
    failures.stage = null;

    expect([creation._tag, update._tag, close._tag, digest._tag]).toEqual([
      "QuranSourceHashError",
      "QuranSourceHashError",
      "QuranSourceHashError",
      "QuranSourceHashError",
    ]);
  });
});
