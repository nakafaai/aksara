import { describe, expect, it } from "@effect/vitest";
import { RichTextSchema } from "#contracts/assessment/inline";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState } from "#contracts/visual/catalog";
import { chanceVisuals } from "#contracts/visual/mathematics/chance";

const chance = chanceVisuals(RichTextSchema);

describe("MarbleDrawLab", () => {
  const lab = {
    description: [text("Draw two marbles, one after the other.")],
    event: { first: "red", second: "blue" },
    labels: {
      both: [text("Red, then blue")],
      first: [text("First draw red")],
      frequency: [text("Share of trials")],
      rule: "After the first draw",
      rules: { keep: "Keep it out", replace: "Put it back" },
      second: [text("Second draw blue")],
      trials: [text("Trials")],
      viewLabel: "A jar of marbles",
    },
    marbles: [
      { color: "red", count: 5 },
      { color: "blue", count: 3 },
      { color: "green", count: 2 },
    ],
    rule: "keep",
    title: [text("Two draws from a jar")],
  };

  it("takes a jar of distinct colours and the event a lesson counts", () => {
    expect(decodeStrict(chance.MarbleDrawLab.props, lab)).toEqual(lab);
  });

  it("refuses a repeated colour, an empty colour, and a jar too full", () => {
    expect(
      failsStrict(chance.MarbleDrawLab.props, {
        ...lab,
        marbles: [
          { color: "red", count: 2 },
          { color: "red", count: 3 },
        ],
      })
    ).toBe(true);
    expect(
      failsStrict(chance.MarbleDrawLab.props, {
        ...lab,
        marbles: [{ color: "red", count: 0 }],
      })
    ).toBe(true);
    expect(
      failsStrict(chance.MarbleDrawLab.props, {
        ...lab,
        marbles: [
          { color: "red", count: 13 },
          { color: "blue", count: 12 },
        ],
      })
    ).toBe(true);
  });

  it("holds the event's probabilities as answer state", () => {
    expect(answerState("MarbleDrawLab", lab)).toEqual(["event"]);
    const { event: _event, ...prompt } = lab;
    expect(decodeStrict(chance.MarbleDrawLab.props, prompt)).toEqual(prompt);
    expect(answerState("MarbleDrawLab", prompt)).toEqual([]);
  });
});

describe("GaltonBoardLab", () => {
  const lab = {
    description: [text("Each pin sends a ball right with probability p.")],
    labels: {
      balls: [text("Balls landed")],
      expected: [text("Chance of the most likely bin")],
      mean: [text("Mean bin")],
      rows: "Rows of pins",
      spread: [text("Standard deviation")],
      tilt: "Lean of the board",
      viewLabel: "A Galton board",
    },
    probability: 0.5,
    rows: 8,
    showExpected: true,
    title: [text("A Galton board")],
  };

  it("takes the rows of pins and one of the board's three leans", () => {
    expect(decodeStrict(chance.GaltonBoardLab.props, lab)).toEqual(lab);
  });

  it("refuses a lean the board cannot take and rows beyond its frame", () => {
    expect(
      failsStrict(chance.GaltonBoardLab.props, { ...lab, probability: 0.6 })
    ).toBe(true);
    expect(failsStrict(chance.GaltonBoardLab.props, { ...lab, rows: 13 })).toBe(
      true
    );
    expect(failsStrict(chance.GaltonBoardLab.props, { ...lab, rows: 3 })).toBe(
      true
    );
  });

  it("holds the expected counts as answer state", () => {
    expect(answerState("GaltonBoardLab", lab)).toEqual(["showExpected"]);
    const { showExpected: _shown, ...prompt } = lab;
    expect(answerState("GaltonBoardLab", prompt)).toEqual([]);
  });
});

describe("DiceRollLab", () => {
  const lab = {
    description: [text("Roll two dice and count the sevens.")],
    dice: 2,
    labels: {
      frequency: [text("Relative frequency")],
      hits: [text("Rolls with sum 7")],
      probability: [text("Probability")],
      trials: [text("Rolls")],
      viewLabel: "Two dice in a tray",
    },
    target: 7,
    title: [text("Rolling a sum of seven")],
  };

  it("takes one or two dice and an outcome they can show", () => {
    expect(decodeStrict(chance.DiceRollLab.props, lab)).toEqual(lab);
    expect(
      decodeStrict(chance.DiceRollLab.props, { ...lab, dice: 1, target: 6 })
    ).toEqual({ ...lab, dice: 1, target: 6 });
  });

  it("refuses an outcome the dice cannot show and a third die", () => {
    expect(
      failsStrict(chance.DiceRollLab.props, { ...lab, dice: 1, target: 7 })
    ).toBe(true);
    expect(failsStrict(chance.DiceRollLab.props, { ...lab, target: 1 })).toBe(
      true
    );
    expect(failsStrict(chance.DiceRollLab.props, { ...lab, dice: 3 })).toBe(
      true
    );
  });

  it("holds the target's counts and probability as answer state", () => {
    expect(answerState("DiceRollLab", lab)).toEqual(["target"]);
    const { target: _target, ...prompt } = lab;
    expect(decodeStrict(chance.DiceRollLab.props, prompt)).toEqual(prompt);
    expect(answerState("DiceRollLab", prompt)).toEqual([]);
  });
});
