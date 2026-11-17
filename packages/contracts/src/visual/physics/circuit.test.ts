import { describe, expect, it } from "@effect/vitest";
import { RichTextSchema } from "#contracts/assessment/inline";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { circuitVisuals } from "#contracts/visual/physics/circuit";

const circuit = circuitVisuals(RichTextSchema);

describe("InternalResistanceLab", () => {
  const lab = {
    description: [text("Two readings fix the cell.")],
    labels: {
      current: [text("Current")],
      emf: [text("E.m.f.")],
      internal: [text("Internal resistance")],
      resistor: "Resistor",
      terminal: [text("Terminal voltage")],
      viewLabel: "A cell driving a resistor",
    },
    readings: [
      { resistance: 5, voltage: 2.5 },
      { resistance: 2, voltage: 2 },
    ],
    title: [text("Cell")],
    trial: 1,
  };

  it("takes the two readings that fix a cell and the resistor to predict", () => {
    expect(decodeStrict(circuit.InternalResistanceLab.props, lab)).toEqual(lab);
  });

  it("refuses a single reading, which cannot fix both the e.m.f. and the internal resistance", () => {
    expect(
      failsStrict(circuit.InternalResistanceLab.props, {
        ...lab,
        readings: [{ resistance: 5, voltage: 2.5 }],
      })
    ).toBe(true);
  });
});

describe("BulbNetworkLab", () => {
  it("refuses a parallel group of one bulb, which is no parallel group", () => {
    expect(
      failsStrict(circuit.BulbNetworkLab.props, {
        description: [text("Three bulbs.")],
        emf: 6,
        group: [6],
        labels: {
          broken: [text("Broken")],
          intact: [text("Working")],
          state: "Bulb",
          viewLabel: "Bulbs",
        },
        series: 4,
        title: [text("Bulbs")],
      })
    ).toBe(true);
  });
});
