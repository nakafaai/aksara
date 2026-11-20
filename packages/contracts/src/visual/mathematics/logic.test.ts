import { describe, expect, it } from "@effect/vitest";
import { RichTextSchema } from "#contracts/assessment/inline";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState } from "#contracts/visual/catalog";
import { logicVisuals } from "#contracts/visual/mathematics/logic";

const logic = logicVisuals(RichTextSchema);

describe("SwitchLogicLab", () => {
  const lab = {
    description: [
      text("Close a switch and watch the lamp. A lit lamp means true."),
    ],
    labels: {
      compounds: {
        and: [text("p and q")],
        not: [text("not p")],
        or: [text("p or q")],
      },
      false: "False",
      mode: "Circuit",
      modes: {
        and: "In a row: p and q",
        not: "Across the lamp: not p",
        or: "Side by side: p or q",
      },
      p: [text("p: switch P is closed")],
      q: [text("q: switch Q is closed")],
      switches: "Switches",
      true: "True",
      viewLabel: "A battery, two switches and a lamp on a pegboard",
    },
    modes: ["and", "or", "not"],
    showTable: true,
    startMode: "or",
    title: [text("Two switches and a lamp")],
  };
  /** Whether the lab refuses its props with one change applied. */
  const fails = (change: object) =>
    failsStrict(logic.SwitchLogicLab.props, { ...lab, ...change });

  it("takes the circuits to offer, the opening circuit and the labels", () => {
    expect(decodeStrict(logic.SwitchLogicLab.props, lab)).toEqual(lab);
    const { startMode: _startMode, ...opensOnFirst } = lab;
    expect(decodeStrict(logic.SwitchLogicLab.props, opensOnFirst)).toEqual(
      opensOnFirst
    );
  });

  it("refuses no circuit, a repeated circuit, an unknown circuit and an opening circuit not offered", () => {
    expect(fails({ modes: [] })).toBe(true);
    expect(fails({ modes: ["and", "and"] })).toBe(true);
    expect(fails({ modes: ["xor"] })).toBe(true);
    expect(fails({ modes: ["and", "not"] })).toBe(true);
  });

  it("holds the full truth table as answer state", () => {
    expect(answerState("SwitchLogicLab", lab)).toEqual(["showTable"]);
    expect(answerState("SwitchLogicLab", { ...lab, showTable: false })).toEqual(
      []
    );
  });
});
