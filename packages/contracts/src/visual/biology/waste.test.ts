import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  math,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick an item.")], title: [text("Lab")] };

describe("waste sort lab", () => {
  const { props } = assessmentVisuals.WasteSortLab;
  const lab = {
    ...card,
    items: ["culture", "blade", "salt"],
    labels: {
      autoclave: [
        text("Steam at "),
        math("121^\\circ\\text{C}"),
        text(" for 15 minutes"),
      ],
      destination: [text("Where it goes")],
      destinations: {
        biohazard: [text("Biohazard bag, then the autoclave")],
        chemical: [text("Labelled chemical waste bottle")],
        glassBox: [text("Broken glass box")],
        sharps: [text("Sharps container")],
        sink: [text("Sink, with plenty of running water")],
      },
      item: "Item",
      items: {
        blade: "Used scalpel blade",
        culture: "Petri dish with a culture",
        salt: "Dilute salt solution",
      },
      reason: [text("Why")],
      reasons: {
        blade: [text("A blade can pierce a bag.")],
        culture: [text("The bacteria are still alive.")],
        salt: [text("It dissolves and is not toxic.")],
      },
      view: "A lab waste station",
    },
  };
  const { reason: _reason, reasons: _reasons, ...unexplained } = lab.labels;

  it("checks a tray with its reasons, and one without them", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    const quiz = { ...lab, labels: unexplained };
    expect(decodeStrict(props, quiz)).toEqual(quiz);
  });

  it("refuses an empty tray, an unknown item, an unnamed item, or a missing place", () => {
    expect(failsStrict(props, { ...lab, items: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, items: ["battery"] })).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        items: ["culture", "blade", "salt", "glove"],
      })
    ).toBe(true);
    const { sink: _sink, ...destinations } = lab.labels.destinations;
    expect(
      failsStrict(props, { ...lab, labels: { ...lab.labels, destinations } })
    ).toBe(true);
  });

  it("refuses reasons that miss an item, or reasons without their heading", () => {
    const { salt: _salt, ...reasons } = lab.labels.reasons;
    expect(
      failsStrict(props, { ...lab, labels: { ...lab.labels, reasons } })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        labels: { ...unexplained, reasons: lab.labels.reasons },
      })
    ).toBe(true);
  });

  it("reads the reasons as answer state", () => {
    expect(answerState("WasteSortLab", lab)).toEqual(["labels.reasons"]);
    expect(
      answerState("WasteSortLab", { ...lab, labels: unexplained })
    ).toEqual([]);
  });
});
