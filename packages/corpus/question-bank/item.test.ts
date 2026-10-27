import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Exit, Schema } from "effect";
import { ItemSourceSchema, itemVersions } from "#corpus/question-bank/item";

const decode = Schema.decodeUnknownExit(ItemSourceSchema);
const choice = {
  kind: "choice",
  options: [
    { correct: true, label: "Satu" },
    { correct: false, label: "Dua" },
  ],
};
const matrix = {
  columns: ["Benar", "Salah"],
  kind: "matrix",
  statements: [
    { column: 2, label: "Satu" },
    { column: 1, label: "Dua" },
  ],
};

describe("item source", () => {
  it("lists the languages of an item in locale order", () => {
    const item = Schema.decodeUnknownSync(ItemSourceSchema)({
      versions: { de: matrix, id: matrix },
    });

    expect(itemVersions(item.versions)).toEqual([
      { interaction: matrix, language: "id" },
      { interaction: matrix, language: "de" },
    ]);
  });

  it("accepts a choice of several answers and an item on a shared reading", () => {
    expect(
      Exit.isSuccess(
        decode({
          stimulus: "passage-1",
          versions: {
            en: {
              kind: "choice",
              options: [
                { correct: true, label: "A" },
                { correct: true, label: "B" },
                { correct: false, label: "C" },
              ],
            },
          },
        })
      )
    ).toBe(true);
  });

  it("requires every language to ask the same task", () => {
    for (const versions of [
      {},
      { en: choice, id: matrix },
      {
        en: choice,
        id: { ...choice, options: Arr.reverse(choice.options) },
      },
      { en: matrix, id: { ...matrix, columns: ["A", "B", "C"] } },
      {
        en: matrix,
        id: { ...matrix, statements: Arr.reverse(matrix.statements) },
      },
    ]) {
      expect(Exit.isFailure(decode({ versions }))).toBe(true);
    }
    expect(
      Exit.isSuccess(
        decode({
          versions: {
            en: choice,
            id: {
              ...choice,
              options: [
                { correct: true, label: "Satu (ID)" },
                { correct: false, label: "Dua (ID)" },
              ],
            },
          },
        })
      )
    ).toBe(true);
  });
});
