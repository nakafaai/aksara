import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Adjust the controls.")],
  title: [text("Equilibrium")],
};

describe("dynamic equilibrium lab", () => {
  const { props } = assessmentVisuals.DynamicEquilibriumLab;
  const lab = {
    ...card,
    forwardRate: { max: 2, min: 0.1, value: 0.6 },
    initialReactant: { max: 2, min: 0.2, value: 1 },
    labels: {
      equilibrium: [text("Equilibrium ratio")],
      forwardRate: "Forward rate constant",
      initial: "Initial concentration",
      rateForward: [text("Forward rate")],
      rateReverse: [text("Reverse rate")],
      reverseRate: "Reverse rate constant",
      state: [text("State")],
      states: { approaching: "Approaching", balanced: "Dynamic equilibrium" },
      system: "System",
      systems: {
        generic: {
          equation: [text("A <-> B")],
          name: "A <-> B",
          product: "B",
          reactant: "A",
        },
        nitrogenDioxide: {
          equation: [text("N2O4 <-> 2NO2")],
          name: "N2O4 / NO2",
          product: "NO2",
          reactant: "N2O4",
        },
      },
      view: "Reversible reactor",
    },
    reverseRate: { max: 2, min: 0.1, value: 0.4 },
    systems: ["generic", "nitrogenDioxide"],
  };
  const { equilibrium: _equilibrium, ...quiz } = lab.labels;

  it("checks a dynamic equilibrium lab with and without equilibrium answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("DynamicEquilibriumLab", lab)).toEqual([
      "labels.equilibrium",
    ]);
    expect(
      answerState("DynamicEquilibriumLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid sliders, empty systems, duplicates, or mismatched system labels", () => {
    expect(failsStrict(props, { ...lab, systems: [] })).toBe(true);
    expect(
      failsStrict(props, { ...lab, systems: ["generic", "generic"] })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, systems: ["generic", "hydrogenIodide"] })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        forwardRate: { max: 0.5, min: 1, value: 0.6 },
      })
    ).toBe(true);
  });
});

describe("equilibrium quotient lab", () => {
  const { props } = assessmentVisuals.EquilibriumQuotientLab;
  const lab = {
    ...card,
    kc: 4,
    labels: {
      direction: [text("Shift direction")],
      directions: {
        equilibrium: [text("At equilibrium")],
        forward: [text("Shifts right")],
        reverse: [text("Shifts left")],
      },
      equation: [text("N2O4 <-> 2NO2")],
      kc: [text("Kc")],
      product: "Product concentration",
      quotient: [text("Qc")],
      reactant: "Reactant concentration",
      view: "Quotient balance",
    },
    product: { max: 4, min: 0, value: 1 },
    reactant: { max: 4, min: 0.1, value: 1 },
    stoichiometry: "oneToTwo",
  };
  const { direction: _direction, quotient: _quotient, ...quiz } = lab.labels;

  it("decodes quotient lab and tracks direction and quotient as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("EquilibriumQuotientLab", lab)).toEqual([
      "labels.direction",
      "labels.quotient",
    ]);
    expect(
      answerState("EquilibriumQuotientLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses non-positive Kc or out-of-range concentrations", () => {
    expect(failsStrict(props, { ...lab, kc: 0 })).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        product: { max: 4, min: 0, value: 5 },
      })
    ).toBe(true);
  });
});

describe("le chatelier lab", () => {
  const { props } = assessmentVisuals.LeChatelierLab;
  const lab = {
    ...card,
    disturbances: ["pressure", "temperature", "catalyst"],
    labels: {
      catalyst: "Catalyst",
      concentration: "Concentration",
      disturbance: "Disturbance",
      disturbances: {
        catalyst: "Catalyst",
        pressure: "Pressure",
        temperature: "Temperature",
      },
      kcChange: [text("Effect on Kc")],
      kcStates: {
        constant: "Constant",
        decreases: "Decreases",
        increases: "Increases",
      },
      pressure: "Piston pressure",
      shift: [text("Equilibrium shift")],
      shifts: {
        forward: [text("Shifts forward")],
        none: [text("No shift")],
        reverse: [text("Shifts reverse")],
      },
      system: "Reaction",
      systems: {
        haber: {
          enthalpy: "Exothermic",
          equation: [text("N2 + 3H2 <-> 2NH3")],
          name: "Haber-Bosch",
        },
        nitrogenDioxide: {
          enthalpy: "Endothermic",
          equation: [text("N2O4 <-> 2NO2")],
          name: "N2O4 / NO2",
        },
      },
      temperature: "Temperature",
      view: "Piston gas reactor",
      yield: [text("Product yield")],
    },
    systems: ["haber", "nitrogenDioxide"],
  };
  const { kcChange: _kcChange, shift: _shift, ...quiz } = lab.labels;

  it("decodes Le Chatelier lab and reports shift and kcChange as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("LeChatelierLab", lab)).toEqual([
      "labels.shift",
      "labels.kcChange",
    ]);
    expect(answerState("LeChatelierLab", { ...lab, labels: quiz })).toEqual([]);
  });

  it("refuses unnamed disturbances or systems", () => {
    expect(
      failsStrict(props, {
        ...lab,
        disturbances: ["pressure", "concentration"],
      })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        systems: ["haber", "contact"],
      })
    ).toBe(true);
  });
});
