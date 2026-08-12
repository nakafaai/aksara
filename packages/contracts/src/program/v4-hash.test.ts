import type { BinaryLike } from "node:crypto";

import { Effect, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";

import { CurriculumRouteV4Schema } from "#contracts/program/curriculum";
import { LearningProgramV4Schema } from "#contracts/program/v4";
import {
  makeCurriculumSnapshotV4Row,
  makeProgramSnapshotV4Row,
  verifyProgramSnapshotV4RowHash,
} from "#contracts/program/v4-hash";
import {
  makeTestCurriculumRoot,
  makeTestProgram,
} from "#contracts/test/program";

const failures = vi.hoisted(() => ({ rowHash: false }));

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic failures into current program row hashing. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves native binding while intercepting the current row domain. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (
                failures.rowHash &&
                String(data).startsWith("nakafa.aksara.program-row.v4\n")
              ) {
                throw new TypeError("injected current program hash failure");
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

/** Converts one historical test program into explicit current translations. */
function currentProgram() {
  const program = makeTestProgram(1);
  return Schema.decodeUnknownSync(LearningProgramV4Schema)({
    ...program,
    translations: [
      { appLocale: "en", ...program.translations.en },
      { appLocale: "id", ...program.translations.id },
    ],
  });
}

describe("program v4 row hashing", () => {
  it("creates and verifies both authenticated row kinds", async () => {
    const program = currentProgram();
    const route = Schema.decodeUnknownSync(CurriculumRouteV4Schema)(
      makeTestCurriculumRoot(makeTestProgram(1), "en")
    );
    const [programRecord, curriculumRecord] = await Effect.runPromise(
      Effect.all([
        makeProgramSnapshotV4Row(program),
        makeCurriculumSnapshotV4Row(route),
      ])
    );

    await expect(
      Effect.runPromise(verifyProgramSnapshotV4RowHash(programRecord))
    ).resolves.toBe(programRecord.rowHash);
    await expect(
      Effect.runPromise(verifyProgramSnapshotV4RowHash(curriculumRecord))
    ).resolves.toBe(curriculumRecord.rowHash);
  });

  it("maps current row hashing failures to the typed error", async () => {
    failures.rowHash = true;
    const error = await Effect.runPromise(
      makeProgramSnapshotV4Row(currentProgram()).pipe(Effect.flip)
    );
    failures.rowHash = false;

    expect(error).toMatchObject({ _tag: "ProgramHashError", scope: "row" });
  });
});
