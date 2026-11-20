import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Exit, Schema } from "effect";
import {
  ItemSourceSchema,
  itemPoints,
  itemVersions,
  partLabels,
  taskKinds,
  taskPoints,
} from "#corpus/question-bank/item";

const decode = Schema.decodeUnknownExit(ItemSourceSchema);
const choice = {
  kind: "choice",
  options: [
    { correct: true, label: "Satu" },
    { correct: false, label: "Dua" },
  ],
};
const number = { kind: "numericEntry", unit: "hari", value: "12.5" };
const matrix = {
  columns: ["Benar", "Salah"],
  kind: "matrix",
  statements: [
    { column: 2, label: "Satu" },
    { column: 1, label: "Dua" },
  ],
};
const aufgabe = {
  kind: "parts",
  parts: [
    { expression: "2x", kind: "mathEntry", label: "a", points: 2 },
    { kind: "numericEntry", label: "b", points: 1, unit: "cm", value: "4" },
    {
      kind: "extendedText",
      label: "c",
      points: 2,
      rubric: [{ label: "Begründung", met: "Nennt f'(4) = 8 > 0.", points: 2 }],
    },
    { accepted: ["steigt"], kind: "textEntry", label: "d", points: 1 },
  ],
};
/** The parts in English: the same task with its own words. */
const english = {
  kind: "parts",
  parts: [
    aufgabe.parts[0],
    { ...aufgabe.parts[1], unit: "in" },
    {
      ...aufgabe.parts[2],
      rubric: [{ label: "Reason", met: "States f'(4) = 8 > 0.", points: 2 }],
    },
    { ...aufgabe.parts[3], accepted: ["rises", "increases"] },
  ],
};

describe("item source", () => {
  it("lists the languages of an item in locale order", () => {
    const item = Schema.decodeUnknownSync(ItemSourceSchema)({
      versions: { de: matrix, id: matrix },
    });

    expect(itemVersions(item.versions)).toEqual([
      { language: "id", task: matrix },
      { language: "de", task: matrix },
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
      { en: number, id: { ...number, value: "0.5" } },
      { en: number, id: choice },
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

  it("asks a typed number with one canonical value and a unit in each language", () => {
    expect(
      Exit.isSuccess(
        decode({
          versions: {
            de: { ...number, unit: "Tage" },
            en: { ...number, unit: "days" },
            id: number,
          },
        })
      )
    ).toBe(true);
    for (const value of ["0.750", "+3", "3,5", "007", ""]) {
      expect(
        Exit.isFailure(decode({ versions: { id: { ...number, value } } }))
      ).toBe(true);
    }
    expect(
      Exit.isFailure(decode({ versions: { id: { ...number, unit: " " } } }))
    ).toBe(true);
  });

  it("asks the same parts in every language with their own words", () => {
    expect(
      Exit.isSuccess(decode({ versions: { de: aufgabe, en: english } }))
    ).toBe(true);
    const [first, typed, essay] = english.parts;
    const rest = Arr.drop(english.parts, 1);
    for (const changed of [
      { ...english, parts: rest },
      { ...english, parts: [{ ...first, expression: "2" }, ...rest] },
      { ...english, parts: [{ ...first, label: "z" }, ...rest] },
      { ...english, parts: [{ ...first, points: 1 }, ...rest] },
      {
        ...english,
        parts: [first, { ...typed, value: "5" }, ...Arr.drop(rest, 1)],
      },
      {
        ...english,
        parts: [
          ...Arr.take(english.parts, 2),
          {
            ...essay,
            rubric: [
              { label: "Sign", met: "f'(4) > 0", points: 1 },
              { label: "Value", met: "f'(4) = 8", points: 1 },
            ],
          },
          english.parts[3],
        ],
      },
      choice,
    ]) {
      expect(
        Exit.isFailure(decode({ versions: { de: aufgabe, en: changed } }))
      ).toBe(true);
    }
  });

  it("tells the kinds, points, and part labels of a task", () => {
    const parts = Schema.decodeUnknownSync(ItemSourceSchema)({
      versions: { de: aufgabe },
    });
    const single = Schema.decodeUnknownSync(ItemSourceSchema)({
      versions: { id: number },
    });
    /** The kinds and points of each language's task of an item. */
    const tasks = (item: typeof parts) =>
      Arr.map(itemVersions(item.versions), ({ task }) => [
        taskKinds(task),
        taskPoints(task),
      ]);

    expect(tasks(parts)).toEqual([
      [["mathEntry", "numericEntry", "extendedText", "textEntry"], 6],
    ]);
    expect(tasks(single)).toEqual([[["numericEntry"], 1]]);
    expect([itemPoints(parts), itemPoints(single)]).toEqual([6, 1]);
    expect([partLabels(parts), partLabels(single)]).toEqual([
      ["a", "b", "c", "d"],
      [],
    ]);
  });
});
