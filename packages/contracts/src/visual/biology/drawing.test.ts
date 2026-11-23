import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Move the slider.")], title: [text("Lab")] };

describe("specimen drawing lab", () => {
  const { props } = assessmentVisuals.SpecimenDrawingLab;
  const lab = {
    ...card,
    actual: 50,
    drawing: { max: 80, min: 20, value: 40 },
    labels: {
      drawing: "Drawing size",
      faults: {
        arrows: [text("Label lines cross and end in arrowheads.")],
        shading: [text("Shading hides the boundary.")],
        sketchy: [text("Doubled lines blur the boundary.")],
        title: [text("No title and no magnification.")],
      },
      magnification: [text("Magnification")],
      parts: {
        cytoplasm: "Cytoplasm",
        membrane: "Plasma membrane",
        nucleus: "Nucleus",
      },
      size: [text("Actual cell size")],
      version: "Drawing version",
      versions: { correct: "Correct", faulty: "Faulty" },
      view: "A microscope's view next to drawing paper",
    },
    specimen: "cheek",
  };
  const onion = {
    ...lab,
    actual: 250,
    labels: {
      ...lab.labels,
      parts: { cytoplasm: "Cytoplasm", nucleus: "Nucleus", wall: "Cell wall" },
    },
    specimen: "onion",
  };

  it("checks a cheek cell and an onion cell, each with its own boundary", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, onion)).toEqual(onion);
  });

  it("refuses a cheek cell with a wall or without its membrane, and an onion cell without its wall", () => {
    expect(
      failsStrict(props, {
        ...lab,
        labels: {
          ...lab.labels,
          parts: { ...lab.labels.parts, wall: "Cell wall" },
        },
      })
    ).toBe(true);
    const { membrane: _membrane, ...bare } = lab.labels.parts;
    expect(
      failsStrict(props, { ...lab, labels: { ...lab.labels, parts: bare } })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...onion,
        labels: { ...onion.labels, parts: lab.labels.parts },
      })
    ).toBe(true);
  });

  it("refuses a size of zero, a drawing range turned around, or a start outside it", () => {
    expect(failsStrict(props, { ...lab, actual: 0 })).toBe(true);
    expect(
      failsStrict(props, { ...lab, drawing: { max: 20, min: 80, value: 40 } })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, drawing: { max: 80, min: 20, value: 90 } })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, drawing: { max: 400, min: 20, value: 40 } })
    ).toBe(true);
  });

  it("refuses a missing fault", () => {
    const { title: _title, ...faults } = lab.labels.faults;
    expect(
      failsStrict(props, { ...lab, labels: { ...lab.labels, faults } })
    ).toBe(true);
  });

  it("reads the magnification readout as answer state", () => {
    expect(answerState("SpecimenDrawingLab", lab)).toEqual([
      "labels.magnification",
    ]);
    const { magnification: _magnification, ...hidden } = lab.labels;
    expect(
      answerState("SpecimenDrawingLab", { ...lab, labels: hidden })
    ).toEqual([]);
  });
});
