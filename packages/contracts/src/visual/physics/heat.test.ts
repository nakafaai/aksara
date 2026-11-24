import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Measure thermal energy and gas behaviour.")],
  title: [text("Thermal physics lab")],
};

describe("specific heat calorimeter lab", () => {
  const { props } = assessmentVisuals.SpecificHeatCalorimeterLab;
  const lab = {
    ...card,
    labels: {
      energy: [text("Electrical energy supplied")],
      mass: "Sample mass (kg)",
      material: "Material",
      materials: { aluminium: "Aluminium", copper: "Copper", water: "Water" },
      parts: {
        heater: "Immersion heater",
        insulation: "Lagging",
        sample: "Sample block",
        stirrer: "Stirrer",
        thermometer: "Thermometer",
      },
      power: "Heater power (W)",
      specificHeat: [text("Specific heat capacity")],
      temperatureRise: [text("Temperature rise")],
      time: "Heating time (min)",
      view: "Insulated electrical calorimeter",
    },
    mass: { max: 2, min: 0.2, value: 1 },
    materials: ["water", "aluminium", "copper"],
    minutes: { max: 10, min: 1, value: 5 },
    power: { max: 200, min: 20, value: 100 },
  };
  const { specificHeat: _heat, temperatureRise: _rise, ...quiz } = lab.labels;

  it("decodes calorimeter lab and marks specificHeat and temperatureRise as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("SpecificHeatCalorimeterLab", lab)).toEqual([
      "labels.specificHeat",
      "labels.temperatureRise",
    ]);
    expect(
      answerState("SpecificHeatCalorimeterLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid thermal sliders or mismatched material names", () => {
    expect(
      failsStrict(props, { ...lab, mass: { max: 1, min: 1, value: 1 } })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, power: { max: 200, min: 20, value: 250 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, materials: ["water"] })).toBe(true);
  });
});

describe("gas law thermal lab", () => {
  const { props } = assessmentVisuals.GasLawThermalLab;
  const lab = {
    ...card,
    labels: {
      collisions: [text("Wall collision frequency")],
      constant: [text("Held constant")],
      law: "Gas law",
      laws: {
        boyle: { name: "Boyle's law", relation: [text("PV stays constant")] },
        charles: {
          name: "Charles's law",
          relation: [text("V/T stays constant")],
        },
        gayLussac: {
          name: "Gay-Lussac's law",
          relation: [text("P/T stays constant")],
        },
      },
      parts: {
        cylinder: "Cylinder",
        gauge: "Pressure gauge",
        heater: "Thermal bath",
        molecules: "Gas molecules",
        piston: "Movable piston",
      },
      pressure: [text("Gas pressure")],
      temperature: "Temperature (K)",
      view: "Piston cylinder gas chamber",
      volume: "Volume (L)",
    },
    laws: ["boyle", "charles", "gayLussac"],
    temperature: { max: 600, min: 200, value: 300 },
    volume: { max: 10, min: 1, value: 4 },
  };
  const { collisions: _col, pressure: _pres, ...quiz } = lab.labels;

  it("decodes gas law thermal lab and marks collisions and pressure as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("GasLawThermalLab", lab)).toEqual([
      "labels.collisions",
      "labels.pressure",
    ]);
    expect(answerState("GasLawThermalLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses invalid volume ranges or mismatched gas laws", () => {
    expect(
      failsStrict(props, { ...lab, volume: { max: 2, min: 5, value: 3 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, laws: ["boyle"] })).toBe(true);
  });
});
