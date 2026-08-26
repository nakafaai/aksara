import type { BinaryLike } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { vi } from "vitest";

import { AppLocaleSchema } from "#contracts/locale";
import {
  makeCurriculumSnapshotRow,
  makeProgramSnapshotRow,
  verifyProgramSnapshotRowHash,
} from "#contracts/program/snapshot/row-hash";
import {
  makeTestCurriculumRoot,
  makeTestProgram,
} from "#contracts/test/program";

const failures = vi.hoisted(() => ({ rowHash: false }));

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
                failures.rowHash &&
                String(data).startsWith("nakafa.aksara.program-row\n")
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
