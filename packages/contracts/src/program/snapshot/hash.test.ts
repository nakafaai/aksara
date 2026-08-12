import type { BinaryLike } from "node:crypto";

import { Effect, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  canonicalizeProgramSnapshot,
  canonicalizeProgramSnapshotV4,
  hashProgramSnapshot,
  hashProgramSnapshotV4,
} from "#contracts/program/snapshot/hash";
import {
  PROGRAM_SNAPSHOT_FORMAT,
  PROGRAM_SNAPSHOT_V4_FORMAT,
  ProgramSnapshotInputSchema,
  ProgramSnapshotV4InputSchema,
} from "#contracts/program/snapshot/spec";

const failures = vi.hoisted((): { domain: string | null } => ({
  domain: null,
}));

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
                failures.domain !== null &&
                String(data).startsWith(`${failures.domain}\n`)
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
  curriculumRowCount: 390,
  format: PROGRAM_SNAPSHOT_FORMAT,
  locales: ["en", "id"],
  programRowCount: 6,
  rowCount: 396,
  rowDigest: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
  sitemapCount: 52,
  slugCount: 12,
});

const inputV4 = Schema.decodeUnknownSync(ProgramSnapshotV4InputSchema)({
  activeAppLocales: ["en", "id", "de"],
  curriculumRowCount: input.curriculumRowCount,
  editorialReviewDigest: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  format: PROGRAM_SNAPSHOT_V4_FORMAT,
  programRowCount: input.programRowCount,
  rowCount: input.rowCount,
  rowDigest: input.rowDigest,
  sitemapCount: input.sitemapCount,
  slugCount: 18,
});

describe("program snapshot hashing", () => {
  it("hashes canonical complete snapshot facts reproducibly", async () => {
    const first = await Effect.runPromise(hashProgramSnapshot(input));
    const second = await Effect.runPromise(hashProgramSnapshot(input));

    expect(canonicalizeProgramSnapshot(input)).toBe(
      JSON.stringify({
        curriculumRowCount: input.curriculumRowCount,
        format: input.format,
        locales: input.locales,
        programRowCount: input.programRowCount,
        rowCount: input.rowCount,
        rowDigest: input.rowDigest,
        sitemapCount: input.sitemapCount,
        slugCount: input.slugCount,
      })
    );
    expect(first).toBe(second);
  });

  it("maps Node hashing failures to the typed contract error", async () => {
    failures.domain = "nakafa.aksara.program-snapshot.v3";
    const error = await Effect.runPromise(
      hashProgramSnapshot(input).pipe(Effect.flip)
    );
    failures.domain = null;

    expect(error._tag).toBe("ProgramSnapshotHashError");
  });

  it("binds active locales and editorial review identity in v4", async () => {
    const hash = await Effect.runPromise(hashProgramSnapshotV4(inputV4));
    expect(JSON.parse(canonicalizeProgramSnapshotV4(inputV4))).toEqual(inputV4);
    expect(hash).not.toBe(await Effect.runPromise(hashProgramSnapshot(input)));
  });

  it("maps v4 hashing failures to the stable typed error", async () => {
    failures.domain = "nakafa.aksara.program-snapshot.v4";
    const error = await Effect.runPromise(
      hashProgramSnapshotV4(inputV4).pipe(Effect.flip)
    );
    failures.domain = null;

    expect(error._tag).toBe("ProgramSnapshotHashError");
  });
});
