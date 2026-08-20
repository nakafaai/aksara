import type { BinaryLike } from "node:crypto";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Schema } from "effect";
import { vi } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import { ActiveAppLocaleListSchema, AppLocaleSchema } from "#contracts/locale";
import {
  canonicalizeProgramSnapshot,
  makeProgramSnapshot,
  verifyProgramSnapshotHash,
} from "#contracts/program/snapshot/hash";
import { ProgramSnapshotFactsSchema } from "#contracts/program/snapshot/spec";

const failures = vi.hoisted(() => ({ hash: false }));

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Creates a real hash whose update call supports deterministic failure. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Intercepts update while preserving every other real hash method. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (
                failures.hash &&
                String(data).startsWith(
                  "nakafa.aksara.localized-program-snapshot\n"
                )
              ) {
                throw new TypeError("injected program snapshot hash failure");
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

const facts = Schema.decodeSync(ProgramSnapshotFactsSchema)({
  activeAppLocales: ActiveAppLocaleListSchema.make([
    AppLocaleSchema.make("en"),
    AppLocaleSchema.make("id"),
  ]),
  curriculumRowCount: 390,
  programRowCount: 6,
  rowCount: 396,
  rowDigest: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
  sitemapCount: 52,
  slugCount: 12,
});

describe("program snapshot hashing", () => {
  it("creates and verifies one reproducible snapshot identity", async () => {
    const first = await Effect.runPromise(makeProgramSnapshot(facts));
    const second = await Effect.runPromise(makeProgramSnapshot(facts));
    expect(JSON.parse(canonicalizeProgramSnapshot(facts))).toMatchObject(facts);
    expect(first.snapshotId).toBe(second.snapshotId);
    await expect(
      Effect.runPromise(verifyProgramSnapshotHash(first))
    ).resolves.toBe(first.snapshotId);
  });

  it("maps Node hashing failures to the typed contract error", async () => {
    failures.hash = true;
    const error = await Effect.runPromise(
      makeProgramSnapshot(facts).pipe(Effect.flip)
    );
    failures.hash = false;
    expect(error._tag).toBe("ProgramSnapshotHashError");
  });
});
