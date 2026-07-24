import type { BinaryLike } from "node:crypto";

import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";

import {
  canonicalizeProgramSnapshotRow,
  hashCurriculumRow,
  hashProgramRow,
  makeCurriculumSnapshotRow,
  makeProgramSnapshotRow,
} from "#contracts/program/row-hash";
import {
  makeTestCurriculumRoot,
  makeTestProgram,
} from "#contracts/test/program";

const failures = vi.hoisted(
  (): { construct: boolean; kind: "curriculum" | "program" | null } => ({
    construct: false,
    kind: null,
  })
);

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic failures into selected aggregate row hashes. */
    createHash(algorithm: string) {
      if (failures.construct) {
        throw new TypeError("injected program row construction failure");
      }
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves native binding while intercepting selected row bytes. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              const selected = `"kind":"${failures.kind}"`;
              if (failures.kind && String(data).includes(selected)) {
                throw new TypeError("injected program row update failure");
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

describe("aggregate program row hashing", () => {
  it("hashes and canonicalizes both discriminated row kinds", async () => {
    const program = makeTestProgram(1);
    const curriculum = makeTestCurriculumRoot(program, "en");
    const [programRecord, curriculumRecord] = await Effect.runPromise(
      Effect.all([
        makeProgramSnapshotRow(program),
        makeCurriculumSnapshotRow(curriculum),
      ])
    );

    expect(canonicalizeProgramSnapshotRow(programRecord)).toContain(
      '"kind":"program"'
    );
    expect(canonicalizeProgramSnapshotRow(curriculumRecord)).toContain(
      '"kind":"curriculum"'
    );
    expect(programRecord.rowHash).toBe(
      await Effect.runPromise(hashProgramRow(program))
    );
    expect(curriculumRecord.rowHash).toBe(
      await Effect.runPromise(hashCurriculumRow(curriculum))
    );
  });

  it.each(["program", "curriculum"] as const)(
    "maps %s hashing failures to the typed error",
    async (kind) => {
      const program = makeTestProgram(1);
      const row =
        kind === "program"
          ? hashProgramRow(program)
          : hashCurriculumRow(makeTestCurriculumRoot(program, "en"));
      failures.kind = kind;
      const error = await Effect.runPromise(row.pipe(Effect.flip));
      failures.kind = null;

      expect(error).toMatchObject({ _tag: "ProgramHashError", scope: "row" });
    }
  );

  it("maps hash construction failures to the typed error", async () => {
    failures.construct = true;
    const error = await Effect.runPromise(
      hashProgramRow(makeTestProgram(1)).pipe(Effect.flip)
    );
    failures.construct = false;

    expect(error).toMatchObject({ _tag: "ProgramHashError", scope: "row" });
  });
});
