import type { BinaryLike } from "node:crypto";
import { describe, expect, it } from "@nakafa/testing/effect";
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
  it("creates and verifies both authenticated row kinds", async () => {
    const program = makeTestProgram(1);
    const route = makeTestCurriculumRoot(program, AppLocaleSchema.make("en"));
    const [programRecord, curriculumRecord] = await Effect.runPromise(
      Effect.all([
        makeProgramSnapshotRow(program),
        makeCurriculumSnapshotRow(route),
      ])
    );
    await expect(
      Effect.runPromise(verifyProgramSnapshotRowHash(programRecord))
    ).resolves.toBe(programRecord.rowHash);
    await expect(
      Effect.runPromise(verifyProgramSnapshotRowHash(curriculumRecord))
    ).resolves.toBe(curriculumRecord.rowHash);
  });

  it("maps row hashing failures to the typed error", async () => {
    failures.rowHash = true;
    const error = await Effect.runPromise(
      makeProgramSnapshotRow(makeTestProgram(1)).pipe(Effect.flip)
    );
    failures.rowHash = false;
    expect(error).toMatchObject({ _tag: "ProgramRowHashError", scope: "row" });
  });
});
