import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

describe("water bond lab", () => {
  const { props } = assessmentVisuals.WaterBondLab;
  const lab = {
    ...card,
    heat: { max: 4000, min: 500, value: 1000 },
    labels: {
      ethanol: [text("Ethanol rises")],
      heat: "Heat added",
      parts: {
        bond: "Hydrogen bond",
        hydrogen: "Hydrogen",
        oxygen: "Oxygen",
        wall: "Xylem wall",
      },
      properties: { cohesion: "Cohesion", heat: "Specific heat" },
      property: "Property",
      radius: "Vessel radius",
      rise: [text("Height reached")],
      view: "Water molecules",
      water: [text("Water rises")],
    },
    mass: 50,
    properties: ["cohesion", "heat"],
    radius: { max: 100, min: 5, value: 50 },
  };
  const { ethanol: _ethanol, rise: _rise, water: _water, ...quiz } = lab.labels;

  it("checks a lab with its readouts named, and one with them left out", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
  });

  it("refuses no property, a property named twice, or a property without its name", () => {
    expect(failsStrict(props, { ...lab, properties: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, properties: ["heat", "heat"] })).toBe(
      true
    );
    expect(
      failsStrict(props, {
        ...lab,
        properties: ["cohesion", "heat", "adhesion"],
      })
    ).toBe(true);
  });

  it("refuses no mass, or a slider turned around or started outside its range", () => {
    expect(failsStrict(props, { ...lab, mass: 0 })).toBe(true);
    expect(
      failsStrict(props, { ...lab, heat: { max: 500, min: 4000, value: 1000 } })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, radius: { max: 100, min: 5, value: 200 } })
    ).toBe(true);
  });

  it("reads the named readouts as answer state", () => {
    expect(answerState("WaterBondLab", lab)).toEqual([
      "labels.water",
      "labels.ethanol",
      "labels.rise",
    ]);
    expect(answerState("WaterBondLab", { ...lab, labels: quiz })).toEqual([]);
  });
});
