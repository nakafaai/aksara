import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore carbon compounds and organic synthesis.")],
  title: [text("Organic chemistry lab")],
};

describe("alkane alkene isomer lab", () => {
  const { props } = assessmentVisuals.AlkaneAlkeneIsomerLab;
  const lab = {
    ...card,
    compounds: ["butane", "but1ene"],
    labels: {
      bromineTest: [text("Bromine water test")],
      compound: "Hydrocarbon",
      compounds: {
        but1ene: {
          bromineTest: [text("Decolourises brown bromine water.")],
          formula: [text("C4H8")],
          name: "But-1-ene",
        },
        butane: {
          bromineTest: [text("Remains brown in the dark.")],
          formula: [text("C4H10")],
          name: "Butane",
        },
      },
      formula: [text("Molecular formula")],
      parts: {
        bromineDrop: "Bromine water",
        carbonAtom: "Carbon",
        doubleBond: "C=C double bond",
        hydrogenAtom: "Hydrogen",
        singleBond: "C-C single bond",
      },
      view: "3D C4 isomer and bromine test",
    },
  };
  const { bromineTest: _b, formula: _f, ...quiz } = lab.labels;

  it("decodes isomer lab and tracks bromineTest and formula as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("AlkaneAlkeneIsomerLab", lab)).toEqual([
      "labels.bromineTest",
      "labels.formula",
    ]);
    expect(
      answerState("AlkaneAlkeneIsomerLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched compounds", () => {
    expect(failsStrict(props, { ...lab, compounds: ["butane"] })).toBe(true);
  });
});

describe("esterification reflux lab", () => {
  const { props } = assessmentVisuals.EsterificationRefluxLab;
  const lab = {
    ...card,
    esters: ["ethylEthanoate", "propylEthanoate"],
    labels: {
      aroma: [text("Fruity aroma")],
      equation: [text("Reaction equation")],
      ester: "Ester product",
      esters: {
        ethylEthanoate: {
          aroma: [text("Sweet nail-polish / pear scent.")],
          equation: [text("CH3COOH + C2H5OH -> CH3COOC2H5 + H2O")],
          name: "Ethyl ethanoate",
        },
        propylEthanoate: {
          aroma: [text("Ripe pear scent.")],
          equation: [text("CH3COOH + C3H7OH -> CH3COOC3H7 + H2O")],
          name: "Propyl ethanoate",
        },
      },
      parts: {
        catalystDrop: "Conc. H2SO4",
        condenser: "Reflux condenser",
        esterLayer: "Ester layer",
        roundFlask: "Round-bottom flask",
        waterBath: "Water bath",
      },
      temperature: "Bath temperature (C)",
      view: "3D esterification reflux setup",
    },
    temperature: { max: 95, min: 30, value: 75 },
  };
  const { aroma: _a, equation: _e, ...quiz } = lab.labels;

  it("decodes esterification lab and tracks aroma and equation as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("EsterificationRefluxLab", lab)).toEqual([
      "labels.aroma",
      "labels.equation",
    ]);
    expect(
      answerState("EsterificationRefluxLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid temperature slider or mismatched esters", () => {
    expect(
      failsStrict(props, {
        ...lab,
        temperature: { max: 70, min: 70, value: 70 },
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, esters: ["ethylEthanoate"] })).toBe(
      true
    );
  });
});

describe("fractional distillation lab", () => {
  const { props } = assessmentVisuals.FractionalDistillationLab;
  const lab = {
    ...card,
    fractions: ["petrol", "diesel"],
    labels: {
      boilingRange: [text("Boiling range")],
      fraction: "Crude fraction",
      fractions: {
        diesel: {
          boilingRange: [text("250-350 C")],
          name: "Diesel",
          useNote: [text("Truck and bus fuel.")],
        },
        petrol: {
          boilingRange: [text("40-200 C")],
          name: "Petrol",
          useNote: [text("Car engine fuel.")],
        },
      },
      parts: {
        bubbleCap: "Bubble-cap tray",
        column: "Fractionating column",
        furnace: "Heating furnace",
        outletPipe: "Fraction outlet",
        vaporStream: "Rising vapour",
      },
      useNote: [text("Main use")],
      view: "3D crude-oil fractionating column",
    },
  };
  const { boilingRange: _br, useNote: _u, ...quiz } = lab.labels;

  it("decodes fractional distillation lab and tracks boilingRange and useNote as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("FractionalDistillationLab", lab)).toEqual([
      "labels.boilingRange",
      "labels.useNote",
    ]);
    expect(
      answerState("FractionalDistillationLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched fractions", () => {
    expect(failsStrict(props, { ...lab, fractions: ["petrol"] })).toBe(true);
  });
});
