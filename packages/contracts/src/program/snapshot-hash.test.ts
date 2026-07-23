import type { BinaryLike } from "node:crypto";

import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  PROGRAM_SNAPSHOT_FORMAT,
  ProgramSnapshotInputSchema,
} from "#contracts/program/snapshot";
import {
  canonicalizeProgramSnapshot,
  hashProgramSnapshot,
} from "#contracts/program/snapshot-hash";

const failures = vi.hoisted((): { enabled: boolean } => ({ enabled: false }));

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects one deterministic failure into the program snapshot domain. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves native binding while intercepting the selected update. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (
                failures.enabled &&
                String(data).startsWith("nakafa.aksara.program-snapshot.v1\n")
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

const input = ProgramSnapshotInputSchema.make({
  format: PROGRAM_SNAPSHOT_FORMAT,
  locales: ["en", "id"],
  rowCount: 6,
  rowDigest: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
  slugCount: 12,
});

describe("program snapshot hashing", () => {
  it("hashes canonical complete snapshot facts reproducibly", async () => {
    const first = await Effect.runPromise(hashProgramSnapshot(input));
    const second = await Effect.runPromise(hashProgramSnapshot(input));

    expect(canonicalizeProgramSnapshot(input)).toBe(JSON.stringify(input));
    expect(first).toBe(second);
  });

  it("maps Node hashing failures to the typed contract error", async () => {
    failures.enabled = true;
    const error = await Effect.runPromise(
      hashProgramSnapshot(input).pipe(Effect.flip)
    );
    failures.enabled = false;

    expect(error._tag).toBe("ProgramSnapshotHashError");
  });
});
