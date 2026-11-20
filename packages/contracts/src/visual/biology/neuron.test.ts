import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Look closely.")], title: [text("Lab")] };

describe("neuron labs", () => {
  const { props } = assessmentVisuals.NeuronImpulseLab;
  const lab = {
    ...card,
    fibres: [
      { diameter: 12, myelinated: true, name: "Myelinated" },
      { diameter: 1, myelinated: false, name: "Unmyelinated" },
    ],
    labels: {
      fibre: "Fibre",
      parts: {
        axon: "Axon",
        dendrite: "Dendrite",
        myelin: "Myelin sheath",
        node: "Node of Ranvier",
        soma: "Cell body",
        terminal: "Axon terminal",
      },
      potential: [text("Membrane potential")],
      speed: [text("Impulse speed")],
      time: [text("Time over the length")],
      view: "A motor neuron",
    },
    length: 1,
  };

  it("checks a neuron with fibres to compare and names its parts", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(failsStrict(props, { ...lab, fibres: [] })).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        fibres: [{ diameter: 0, myelinated: true, name: "Myelinated" }],
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, length: -1 })).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        labels: { ...lab.labels, parts: { ...lab.labels.parts, node: "" } },
      })
    ).toBe(true);
  });

  it("holds the travel time as answer state, and nothing without it", () => {
    const { time: _time, ...untimed } = lab.labels;
    expect(answerState("NeuronImpulseLab", lab)).toEqual(["labels.time"]);
    expect(
      answerState("NeuronImpulseLab", { ...lab, labels: untimed })
    ).toEqual([]);
  });
});
