import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore consumer and industrial chemistry.")],
  title: [text("Industrial chemistry lab")],
};

describe("soap micelle emulsion lab", () => {
  const { props } = assessmentVisuals.SoapMicelleEmulsionLab;
  const lab = {
    ...card,
    labels: {
      mechanism: [text("Cleaning action")],
      outcome: [text("Water effect")],
      parts: {
        fabric: "Fabric fibre",
        greaseDrop: "Grease droplet",
        hydrophilicHead: "Hydrophilic head",
        hydrophobicTail: "Hydrophobic tail",
        waterFlow: "Water stream",
      },
      stage: "Cleaning stage",
      stages: {
        greaseOnFabric: {
          mechanism: [text("Oil clings to hydrophobic cloth.")],
          name: "Grease on cloth",
        },
        micelleLift: {
          mechanism: [text("Negatively charged micelles repel and lift.")],
          name: "Micelle lift",
        },
      },
      view: "3D soap micelle emulsification",
      waterType: "Water hardness",
      waterTypes: {
        hard: {
          name: "Hard water",
          outcome: [text("Ca2+ and Mg2+ precipitate soap scum.")],
        },
        soft: {
          name: "Soft water",
          outcome: [text("Rich lather lifts grease cleanly.")],
        },
      },
    },
    stages: ["greaseOnFabric", "micelleLift"],
    waterTypes: ["soft", "hard"],
  };
  const { mechanism: _m, outcome: _o, ...quiz } = lab.labels;

  it("decodes soap micelle lab and tracks mechanism and outcome as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("SoapMicelleEmulsionLab", lab)).toEqual([
      "labels.mechanism",
      "labels.outcome",
    ]);
    expect(
      answerState("SoapMicelleEmulsionLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched stages or water types", () => {
    expect(failsStrict(props, { ...lab, stages: ["micelleLift"] })).toBe(true);
    expect(failsStrict(props, { ...lab, waterTypes: ["soft"] })).toBe(true);
  });
});

describe("haber ammonia converter lab", () => {
  const { props } = assessmentVisuals.HaberAmmoniaConverterLab;
  const lab = {
    ...card,
    labels: {
      equilibriumYield: [text("Equilibrium yield")],
      parts: {
        compressor: "Compressor",
        coolingCondenser: "Condenser",
        ironCatalystBed: "Iron catalyst bed",
        liquidAmmonia: "Liquid NH3",
        recyclePipe: "Recycle loop",
      },
      pressure: "Pressure (atm)",
      rateNote: [text("Reaction rate")],
      temperature: "Temperature (C)",
      view: "3D Haber-Bosch ammonia converter",
    },
    pressure: { max: 300, min: 50, value: 200 },
    temperature: { max: 600, min: 300, value: 450 },
  };
  const { equilibriumYield: _y, rateNote: _r, ...quiz } = lab.labels;

  it("decodes haber converter lab and tracks equilibriumYield and rateNote as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("HaberAmmoniaConverterLab", lab)).toEqual([
      "labels.equilibriumYield",
      "labels.rateNote",
    ]);
    expect(
      answerState("HaberAmmoniaConverterLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid pressure or temperature sliders", () => {
    expect(
      failsStrict(props, {
        ...lab,
        pressure: { max: 200, min: 200, value: 200 },
      })
    ).toBe(true);
  });
});

describe("saponification kettle lab", () => {
  const { props } = assessmentVisuals.SaponificationKettleLab;
  const lab = {
    ...card,
    labels: {
      chemicalChange: [text("Chemical change")],
      parts: {
        alkaliStream: "NaOH feed",
        kettle: "Boiling kettle",
        saltLayer: "NaCl brine",
        soapCurd: "Soap curd",
        triglyceride: "Vegetable oil",
      },
      purpose: [text("Stage purpose")],
      step: "Production step",
      steps: {
        hydrolysis: {
          chemicalChange: [text("Oil + 3NaOH -> Glycerol + 3Soap")],
          name: "Alkaline hydrolysis",
          purpose: [text("Breaks ester bonds into fatty acid salts.")],
        },
        saltingOut: {
          chemicalChange: [text("NaCl lowers soap solubility.")],
          name: "Salting out",
          purpose: [text("Precipitates solid soap curd.")],
        },
      },
      view: "3D saponification boiling kettle",
    },
    steps: ["hydrolysis", "saltingOut"],
  };
  const { chemicalChange: _c, purpose: _p, ...quiz } = lab.labels;

  it("decodes saponification lab and tracks chemicalChange and purpose as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("SaponificationKettleLab", lab)).toEqual([
      "labels.chemicalChange",
      "labels.purpose",
    ]);
    expect(
      answerState("SaponificationKettleLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched steps", () => {
    expect(failsStrict(props, { ...lab, steps: ["hydrolysis"] })).toBe(true);
  });
});
