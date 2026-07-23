import type { BinaryLike } from "node:crypto";

import { Effect, Stream } from "effect";
import { describe, expect, it, vi } from "vitest";

import { Sha256HashSchema } from "#contracts/ids";
import {
  compareProgramRows,
  digestProgramRows,
  hashProgramRow,
  makeProgramSnapshotRow,
} from "#contracts/program/row-hash";
import type { ProgramSnapshotRow } from "#contracts/program/snapshot";
import {
  LearningProgramKeySchema,
  LearningProgramSchema,
} from "#contracts/program/spec";

const failures = vi.hoisted(
  (): {
    construct: boolean;
    domain: string | null;
    stage: "digest" | "first-update" | "later-update" | null;
  } => ({ construct: false, domain: null, stage: null })
);

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic failures into selected program hash stages. */
    createHash(algorithm: string) {
      if (failures.construct) {
        throw new TypeError("injected program hash construction failure");
      }
      const hash = crypto.createHash(algorithm);
      let domain = "";
      let updates = 0;
      return new Proxy(hash, {
        /** Preserves native binding while intercepting selected operations. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              const value = String(data);
              if (domain === "") {
                domain = value.split("\n", 1)[0] ?? "";
              }
              const first = failures.stage === "first-update" && updates === 0;
              const later = failures.stage === "later-update" && updates > 0;
              if (failures.domain === domain && (first || later)) {
                throw new TypeError("injected program hash update failure");
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
              throw new TypeError("injected program digest failure");
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

/** Builds one clearly test-only program row at a stable display position. */
function program(index: number) {
  return LearningProgramSchema.make({
    defaultCoverageStatus: "planned",
    displayOrder: index * 10,
    iconKey: "school",
    key: LearningProgramKeySchema.make(`test-program-${index}`),
    kind: "school-curriculum",
    navigation: {
      levels: ["stage", "subject"],
      model: "curriculum-tree",
    },
    provider: { kind: "nakafa", name: "Nakafa test suite" },
    sources: [
      {
        label: `Test source ${index}`,
        retrievedAt: "2026-01-01",
        type: "nakafa-editorial",
        url: `https://example.test/program-${index}`,
      },
    ],
    translations: {
      en: {
        publicSlug: `test-program-${index}`,
        title: `Test Program ${index}`,
      },
      id: {
        publicSlug: `program-uji-${index}`,
        title: `Program Uji ${index}`,
      },
    },
    version: { label: "Test version" },
  });
}

/** Hashes six technical rows in source-owned display order. */
function records() {
  return Effect.forEach([1, 2, 3, 4, 5, 6], (index) =>
    makeProgramSnapshotRow(program(index))
  );
}

/** Returns one digest failure without a FiberFailure wrapper. */
function reject(rows: Stream.Stream<ProgramSnapshotRow>) {
  return Effect.runPromise(digestProgramRows(rows).pipe(Effect.flip));
}

describe("program row hashing", () => {
  it("authenticates the ordered six-row catalog and comparator", async () => {
    const rows = await Effect.runPromise(records());
    const summary = await Effect.runPromise(
      digestProgramRows(Stream.fromIterable(rows))
    );

    expect(summary).toMatchObject({ rowCount: 6, slugCount: 12 });
    expect(compareProgramRows(program(1), program(2))).toBeLessThan(0);
    const first = program(1);
    const laterKey = {
      ...first,
      key: LearningProgramKeySchema.make("test-program-2"),
    };
    expect(compareProgramRows(first, laterKey)).toBeLessThan(0);
    expect(compareProgramRows(laterKey, first)).toBeGreaterThan(0);
    expect(compareProgramRows(first, first)).toBe(0);
  });

  it("rejects tampered, duplicate, colliding, reversed, and partial rows", async () => {
    const rows = await Effect.runPromise(records());
    const [first, second] = rows;
    if (!(first && second)) {
      throw new Error("Expected six technical program records.");
    }
    const duplicateKey = await Effect.runPromise(
      makeProgramSnapshotRow({ ...second.row, key: first.row.key })
    );
    const duplicateSlug = await Effect.runPromise(
      makeProgramSnapshotRow({
        ...second.row,
        translations: {
          ...second.row.translations,
          en: first.row.translations.en,
        },
      })
    );
    const sameOrder = await Effect.runPromise(
      makeProgramSnapshotRow({
        ...second.row,
        displayOrder: first.row.displayOrder,
      })
    );
    const errors = await Promise.all([
      reject(
        Stream.make({
          ...first,
          rowHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
        })
      ),
      reject(Stream.make(first, duplicateKey)),
      reject(Stream.make(first, duplicateSlug)),
      reject(Stream.make(second, first)),
      reject(Stream.make(first, sameOrder)),
      reject(Stream.fromIterable(rows.slice(0, 5))),
    ]);

    expect(
      errors.map((error) =>
        error._tag === "ProgramDigestError" ? error.code : error._tag
      )
    ).toEqual(["integrity", "key", "slug", "order", "order", "count"]);
  });

  it("maps row, state, update, and digest failures", async () => {
    const row = program(1);
    failures.domain = "nakafa.aksara.program-row.v1";
    failures.stage = "first-update";
    const rowError = await Effect.runPromise(
      hashProgramRow(row).pipe(Effect.flip)
    );
    failures.domain = null;
    failures.stage = null;
    failures.construct = true;
    const stateError = await Effect.runPromise(
      digestProgramRows(Stream.empty).pipe(Effect.flip)
    );
    failures.construct = false;
    const rows = await Effect.runPromise(records());
    failures.domain = "nakafa.aksara.program-rows.v1";
    failures.stage = "later-update";
    const updateError = await Effect.runPromise(
      digestProgramRows(Stream.fromIterable(rows)).pipe(Effect.flip)
    );
    failures.stage = "digest";
    const digestError = await Effect.runPromise(
      digestProgramRows(Stream.fromIterable(rows)).pipe(Effect.flip)
    );
    failures.domain = null;
    failures.stage = null;

    expect(
      [rowError, stateError, updateError, digestError].map(({ _tag }) => _tag)
    ).toEqual([
      "ProgramHashError",
      "ProgramHashError",
      "ProgramHashError",
      "ProgramHashError",
    ]);
  });
});
