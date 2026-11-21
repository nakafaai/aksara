import { describe, expect, it } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Array as Arr, Effect } from "effect";

import {
  calibrationProblems,
  decodeCalibration,
} from "#corpus/question-bank/calibration";
import type { ItemSource } from "#corpus/question-bank/item";
import { TEST_ITEM } from "#corpus/test/bank";

/** A criterion of a written part, with the feedback a learner reads. */
const criterion = (label: string) => ({
  feedback: { earned: "Tepat.", missed: "Belum lengkap." },
  label,
  met: `Menunjukkan ${label}.`,
  points: 1,
});

/** An item with a typed part `a` and a written part `b` of two criteria. */
const item: ItemSource = {
  versions: {
    id: {
      kind: "parts",
      parts: [
        { expression: "x", kind: "mathEntry", label: "a", points: 1 },
        {
          kind: "extendedText",
          label: "b",
          points: 2,
          rubric: [criterion("alasan"), criterion("kesimpulan")],
        },
      ],
    },
  },
};

const path = CorpusSourcePathSchema.make(
  "packages/corpus/question-bank/tryout/zz/test/test/set-1/question-1/calibration.json"
);

/** One sample of part `b` with the given id and marked criteria. */
const sample = (id: string, criteria: readonly [number, ...number[]]) => ({
  grade: "partial" as const,
  id,
  marks: Arr.map(criteria, (number) => ({
    criterion: number,
    met: number === 1,
    reason: "Sesuai kunci.",
  })),
  text: "Karena f'(x) < 0.",
});

describe("calibrationProblems", () => {
  it("names labels of no written part, repeated ids, and incomplete marks", () => {
    expect(
      calibrationProblems({ b: [sample("good-1", [2, 1])] }, item)
    ).toEqual([]);
    expect(
      calibrationProblems(
        {
          a: [sample("typed-1", [1])],
          b: [sample("same", [1, 2]), sample("same", [1]), sample("x", [1, 1])],
        },
        item
      )
    ).toEqual([
      "sample same is named twice",
      "a is not a written part of the item",
      "sample same must mark criteria 1 to 2 once each",
      "sample x must mark criteria 1 to 2 once each",
    ]);
    expect(calibrationProblems({ a: [sample("one", [1])] }, TEST_ITEM)).toEqual(
      ["a is not a written part of the item"]
    );
  });
});

describe("decodeCalibration", () => {
  it.effect(
    "decodes a calibration that fits its item, and names what does not",
    () =>
      Effect.gen(function* () {
        expect(
          yield* decodeCalibration(
            '{"b":[{"grade":"good","id":"good-1","marks":[{"criterion":1,"met":true,"reason":"Lengkap."},{"criterion":2,"met":true,"reason":"Tepat."}],"text":"Karena f turun."}]}',
            path,
            item
          )
        ).toEqual({
          b: [
            {
              grade: "good",
              id: "good-1",
              marks: [
                { criterion: 1, met: true, reason: "Lengkap." },
                { criterion: 2, met: true, reason: "Tepat." },
              ],
              text: "Karena f turun.",
            },
          ],
        });
        expect(
          yield* Effect.flip(decodeCalibration("{", path, item))
        ).toMatchObject({ _tag: "CalibrationError", path });
        expect(
          yield* Effect.flip(
            decodeCalibration(
              '{"c":[{"grade":"wrong","id":"w-1","marks":[{"criterion":1,"met":false,"reason":"Salah."}],"text":"Salah."}]}',
              path,
              item
            )
          )
        ).toMatchObject({
          _tag: "CalibrationError",
          problems: ["c is not a written part of the item"],
        });
      })
  );
});
