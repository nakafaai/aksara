import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, HashSet, Order } from "effect";
import {
  formulaPairs,
  formulaShapes,
} from "#corpus/question-bank/similarity/formula";

const CUBES =
  'Diketahui <InlineMath math="x+y=7" /> dan <InlineMath math="x^2+y^2=29" />. Nilai <InlineMath math="x^3+y^3" /> adalah ....';
const SUMS =
  'Für zwei reelle Zahlen gilt <BlockMath math="x+y=5\\qquad\\text{und}\\qquad x^2+y^2=15." /> Welchen Wert hat <InlineMath math="x^3+y^3" />?';

/** One scanned question of one set, with the formula shapes of its prompt. */
function unit(id: number, set: string, rawMdx: string) {
  return {
    formulas: formulaShapes(rawMdx, []),
    id,
    root: `${set}/question-${id}`,
    set,
  };
}

/** Treats every question as part of the scanned target. */
function everyRoot() {
  return true;
}

describe("formulaShapes", () => {
  it("masks numbers and keeps only shapes with a variable and a relation", () => {
    const shapes = formulaShapes(
      'Diketahui <InlineMath math="x=3" />, <InlineMath math="\\frac{1}{3}" />, <InlineMath math="A(3,2)" />, <InlineMath math="3x+3=7\\quad y=4x-3" />, dan <InlineMath math="\\begin{pmatrix}3\\\\-1\\end{pmatrix}" />.',
      ["$$x+y=12$$", "tanpa rumus"]
    );

    expect(Arr.sort([...shapes], Order.String)).toEqual(["x+y=#", "y=#x-#"]);
  });

  it("finds no shape in a prompt without math", () => {
    expect(HashSet.size(formulaShapes("Tanpa rumus.", []))).toBe(0);
  });
});

describe("formulaPairs", () => {
  it("reports a task asked again in another set and language with new numbers", () => {
    const pairs = formulaPairs(
      [unit(1, "a", CUBES), unit(1, "b", SUMS), unit(2, "c", CUBES)],
      (root) => root.startsWith("b/"),
      0.5
    );

    expect(pairs).toEqual([
      {
        first: "a/question-1",
        score: 1,
        second: "b/question-1",
        shared: ["x+y=#", "x^#+y^#", "x^#+y^#=#"],
      },
      {
        first: "b/question-1",
        score: 1,
        second: "c/question-2",
        shared: ["x+y=#", "x^#+y^#", "x^#+y^#=#"],
      },
    ]);
  });

  it("ignores siblings, pairs sharing two shapes, and pairs under the threshold", () => {
    const twoShared =
      'Hitung <InlineMath math="x+y=4" /> dan <InlineMath math="x^2+y^2=10" /> lalu <InlineMath math="a-b=1" />.';
    const halfShared = `${CUBES} <InlineMath math="p+q=1" /> <InlineMath math="p-q=2" /> <InlineMath math="p^2-q^2=3" />`;

    expect(
      formulaPairs(
        [unit(1, "a", CUBES), unit(2, "a", SUMS), unit(3, "b", twoShared)],
        everyRoot,
        0.5
      )
    ).toEqual([]);
    expect(
      formulaPairs(
        [unit(1, "a", CUBES), unit(2, "b", halfShared)],
        everyRoot,
        0.6
      )
    ).toEqual([]);
  });

  it("ignores shapes that most of the bank shares", () => {
    /** One question per set, every one asking the same task. */
    const units = (count: number) =>
      Arr.map(Arr.range(1, count), (n) => unit(n, `set-${n}`, CUBES));

    expect(formulaPairs(units(3), everyRoot, 0.5)).toHaveLength(3);
    expect(formulaPairs(units(65), everyRoot, 0.5)).toEqual([]);
  });
});
