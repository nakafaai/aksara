import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore collision theory and catalysis.")],
  title: [text("Reaction rate lab")],
};

describe("collision theory energy lab", () => {
  const { props } = assessmentVisuals.CollisionTheoryEnergyLab;
  const lab = {
    ...card,
    concentration: { max: 2, min: 0.2, value: 1 },
    labels: {
      activationEnergy: [text("Activation energy")],
      collisionFreq: [text("Collision frequency")],
      concentration: "Concentration (mol/dm3)",
      effectiveRate: [text("Effective collisions")],
      parts: {
        activationLine: "Activation energy threshold",
        products: "Product molecules",
        reactants: "Reactant molecules",
        shadedArea: "Particles above Ea",
        vessel: "Reaction vessel",
      },
      surface: "Solid form",
      surfaces: { granules: "Granules", lump: "Lump", powder: "Powder" },
      temperature: "Temperature (°C)",
      view: "3D reaction vessel and Maxwell-Boltzmann curve",
    },
    surfaces: ["lump", "granules", "powder"],
    temperature: { max: 80, min: 15, value: 35 },
  };
  const { collisionFreq: _freq, effectiveRate: _rate, ...quiz } = lab.labels;

  it("decodes collision theory lab and tracks collisionFreq and effectiveRate as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("CollisionTheoryEnergyLab", lab)).toEqual([
      "labels.collisionFreq",
      "labels.effectiveRate",
    ]);
    expect(
      answerState("CollisionTheoryEnergyLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid kinetics sliders or mismatched solid forms", () => {
    expect(
      failsStrict(props, {
        ...lab,
        temperature: { max: 30, min: 30, value: 30 },
      })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        concentration: { max: 2, min: 0.2, value: 3 },
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, surfaces: ["powder"] })).toBe(true);
  });
});

describe("catalyst pathway lab", () => {
  const { props } = assessmentVisuals.CatalystPathwayLab;
  const lab = {
    ...card,
    labels: {
      activationEnergy: [text("Activation energy")],
      catalyst: "Catalyst",
      catalystStates: { absent: "Uncatalysed", present: "Catalysed" },
      enthalpyChange: [text("Enthalpy change")],
      parts: {
        catalysedPeak: "Catalysed transition state",
        catalystSurface: "Catalyst surface",
        productLevel: "Products energy",
        reactantLevel: "Reactants energy",
        uncatalysedPeak: "Uncatalysed peak",
      },
      pathway: [text("Alternative route")],
      reaction: "Reaction type",
      reactions: { endothermic: "Endothermic", exothermic: "Exothermic" },
      view: "Reaction coordinate energy profile",
    },
    reactions: ["exothermic", "endothermic"],
  };
  const { activationEnergy: _ea, enthalpyChange: _dh, ...quiz } = lab.labels;

  it("decodes catalyst pathway lab and tracks activationEnergy and enthalpyChange as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("CatalystPathwayLab", lab)).toEqual([
      "labels.activationEnergy",
      "labels.enthalpyChange",
    ]);
    expect(answerState("CatalystPathwayLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses empty or mismatched reaction types", () => {
    expect(failsStrict(props, { ...lab, reactions: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, reactions: ["exothermic"] })).toBe(
      true
    );
  });
});
