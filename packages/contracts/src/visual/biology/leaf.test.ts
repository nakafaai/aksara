import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore leaf structure.")],
  title: [text("Leaf organ")],
};

describe("leaf lamina cross-section lab", () => {
  const { props } = assessmentVisuals.LeafLaminaCrossSectionLab;
  const lab = {
    ...card,
    labels: {
      adaptation: [text("Structural adaptation")],
      chloroplasts: [text("Chloroplast density")],
      densities: {
        guardOnly: "Guard cells only",
        high: "Very high",
        moderate: "Moderate",
        none: "None",
      },
      layer: "Leaf layer",
      layers: {
        cuticle: {
          adaptation: [text("Waterproof wax cuts evaporation")],
          name: "Waxy cuticle",
        },
        palisade: {
          adaptation: [text("Packed upright cells trap light")],
          name: "Palisade mesophyll",
        },
        spongy: {
          adaptation: [text("Air spaces speed CO2 diffusion")],
          name: "Spongy mesophyll",
        },
      },
      parts: {
        airSpace: "Air space",
        chloroplast: "Chloroplast",
        guardCell: "Guard cell",
        phloem: "Phloem",
        xylem: "Xylem",
      },
      view: "Leaf lamina cross-section",
    },
    layers: ["cuticle", "palisade", "spongy"],
  };
  const {
    adaptation: _adaptation,
    chloroplasts: _chloroplasts,
    ...quiz
  } = lab.labels;

  it("decodes leaf lamina lab and reports adaptation and chloroplasts as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("LeafLaminaCrossSectionLab", lab)).toEqual([
      "labels.adaptation",
      "labels.chloroplasts",
    ]);
    expect(
      answerState("LeafLaminaCrossSectionLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses empty, duplicated, or unnamed leaf layers", () => {
    expect(failsStrict(props, { ...lab, layers: [] })).toBe(true);
    expect(
      failsStrict(props, { ...lab, layers: ["palisade", "palisade"] })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, layers: ["cuticle", "stoma"] })).toBe(
      true
    );
  });
});

describe("stomatal guard cell lab", () => {
  const { props } = assessmentVisuals.StomatalGuardCellLab;
  const lab = {
    ...card,
    conditions: ["light", "dark", "drought"],
    labels: {
      aperture: [text("Stomatal pore")],
      apertures: { closed: "Closed", narrow: "Narrow", open: "Open" },
      co2Intake: [text("CO2 intake")],
      condition: "Condition",
      conditions: { dark: "Dark", drought: "Drought", light: "Bright light" },
      light: "Light intensity",
      mechanism: [text("Osmotic mechanism")],
      mechanisms: {
        dark: [text("K+ leaves guard cells")],
        drought: [text("ABA closes stoma")],
        light: [text("K+ enters and water follows")],
      },
      parts: {
        chloroplast: "Chloroplast",
        guardCell: "Guard cell",
        pore: "Stomatal pore",
        potassiumIon: "K+ ion",
        thickInnerWall: "Thick inner wall",
        thinOuterWall: "Thin outer wall",
        vacuole: "Vacuole",
        water: "Water",
      },
      transpiration: [text("Transpiration")],
      turgor: [text("Guard cell state")],
      turgors: { flaccid: "Flaccid", turgid: "Turgid" },
      view: "Stomatal guard cells",
    },
    light: { max: 100, min: 0, value: 80 },
  };
  const { aperture: _aperture, mechanism: _mechanism, ...quiz } = lab.labels;

  it("decodes stomatal lab and tracks aperture and mechanism as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("StomatalGuardCellLab", lab)).toEqual([
      "labels.aperture",
      "labels.mechanism",
    ]);
    expect(
      answerState("StomatalGuardCellLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid light slider or mismatched conditions and mechanisms", () => {
    expect(
      failsStrict(props, { ...lab, light: { max: 10, min: 20, value: 15 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, conditions: ["light"] })).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        labels: {
          ...lab.labels,
          mechanisms: { light: [text("Only light")] },
        },
      })
    ).toBe(true);
  });
});

describe("chloroplast stage lab", () => {
  const { props } = assessmentVisuals.ChloroplastStageLab;
  const lab = {
    ...card,
    co2: { max: 1000, min: 0, value: 400 },
    labels: {
      co2: "CO2 concentration",
      factors: {
        balanced: "Balanced",
        co2: "CO2",
        light: "Light",
        temperature: "Temperature",
      },
      gasStates: {
        compensation: "Compensation point",
        netRelease: "Net O2 release",
        netUptake: "Net O2 uptake",
      },
      light: "Light intensity",
      limitingFactor: [text("Limiting factor")],
      netGas: [text("Net gas exchange")],
      parts: {
        atp: "ATP",
        co2: "CO2",
        glucose: "Glucose",
        granum: "Granum",
        nadph: "NADPH",
        oxygen: "O2",
        stroma: "Stroma",
        thylakoid: "Thylakoid",
        water: "H2O",
      },
      site: [text("Reaction site")],
      sites: {
        calvinCycle: [text("Stroma")],
        compensation: [text("Whole leaf")],
        lightDependent: [text("Thylakoid membrane")],
      },
      stage: "Stage",
      stages: {
        calvinCycle: "Calvin cycle",
        compensation: "Compensation point",
        lightDependent: "Light-dependent",
      },
      temperature: "Temperature",
      view: "Chloroplast stages",
    },
    light: { max: 100, min: 0, value: 60 },
    stages: ["lightDependent", "calvinCycle", "compensation"],
    temperature: { max: 50, min: 5, value: 28 },
  };
  const { limitingFactor: _lf, netGas: _netGas, ...quiz } = lab.labels;

  it("decodes chloroplast stage lab and marks limitingFactor and netGas as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("ChloroplastStageLab", lab)).toEqual([
      "labels.limitingFactor",
      "labels.netGas",
    ]);
    expect(
      answerState("ChloroplastStageLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses out-of-range environmental sliders or mismatched stage sites", () => {
    expect(
      failsStrict(props, {
        ...lab,
        temperature: { max: 50, min: 5, value: 60 },
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, stages: ["lightDependent"] })).toBe(
      true
    );
    expect(
      failsStrict(props, {
        ...lab,
        labels: {
          ...lab.labels,
          sites: { lightDependent: [text("Thylakoid")] },
        },
      })
    ).toBe(true);
  });
});
