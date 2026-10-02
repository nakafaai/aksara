import type { BinaryLike } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { ActiveAppLocaleListSchema, AppLocaleSchema } from "#contracts/locale";
import {
  canonicalizeProgramSnapshot,
  makeCurriculumSnapshotRow,
  makeProgramSnapshot,
  makeProgramSnapshotRow,
  verifyProgramSnapshotHash,
  verifyProgramSnapshotRowHash,
} from "#contracts/program/snapshot/hash";
import { ProgramSnapshotFactsSchema } from "#contracts/program/snapshot/spec";
import {
  makeTestCurriculumRoot,
  makeTestProgram,
} from "#contracts/test/program";

const failures = vi.hoisted(() => ({ hash: false, rowHash: false }));

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
              const text = String(data);
              if (
                failures.hash &&
                text.startsWith("nakafa.aksara.localized-program-snapshot\n")
              ) {
                throw new TypeError("injected program snapshot hash failure");
              }
              if (
                failures.rowHash &&
                text.startsWith("nakafa.aksara.program-row\n")
              ) {
                throw new TypeError("injected program row hash failure");
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
  it.effect("creates and verifies one reproducible snapshot identity", () =>
    Effect.gen(function* () {
      const first = yield* makeProgramSnapshot(facts);
      const second = yield* makeProgramSnapshot(facts);
      expect(JSON.parse(canonicalizeProgramSnapshot(facts))).toMatchObject(
        facts
      );
      expect(first.snapshotId).toBe(second.snapshotId);
      expect(yield* verifyProgramSnapshotHash(first)).toBe(first.snapshotId);
    })
  );

  it.effect("maps Node hashing failures to the typed contract error", () =>
    Effect.gen(function* () {
      yield* Effect.acquireRelease(
        Effect.sync(() => {
          failures.hash = true;
        }),
        () =>
          Effect.sync(() => {
            failures.hash = false;
          })
      );

      const error = yield* makeProgramSnapshot(facts).pipe(Effect.flip);
      expect(error._tag).toBe("ProgramSnapshotHashError");
    })
  );
});

describe("program snapshot row hashing", () => {
  it.effect("creates and verifies both authenticated row kinds", () =>
    Effect.gen(function* () {
      const program = makeTestProgram(1);
      const route = makeTestCurriculumRoot(program, AppLocaleSchema.make("en"));
      const [programRecord, curriculumRecord] = yield* Effect.all([
        makeProgramSnapshotRow(program),
        makeCurriculumSnapshotRow(route),
      ]);

      expect(yield* verifyProgramSnapshotRowHash(programRecord)).toBe(
        programRecord.rowHash
      );
      expect(yield* verifyProgramSnapshotRowHash(curriculumRecord)).toBe(
        curriculumRecord.rowHash
      );
    })
  );

  it.effect("maps row hashing failures to the typed error", () =>
    Effect.gen(function* () {
      yield* Effect.acquireRelease(
        Effect.sync(() => {
          failures.rowHash = true;
        }),
        () =>
          Effect.sync(() => {
            failures.rowHash = false;
          })
      );

      const error = yield* makeProgramSnapshotRow(makeTestProgram(1)).pipe(
        Effect.flip
      );
      expect(error).toMatchObject({
        _tag: "ProgramRowHashError",
        scope: "row",
      });
    })
  );
});
