import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Inspect the plant tissue.")],
  title: [text("Plant tissues")],
};

describe("plant tissue anatomy lab", () => {
  const { props } = assessmentVisuals.PlantTissueAnatomyLab;
  const lab = {
    ...card,
    labels: {
      function: [text("Primary role")],
      parts: {
        companion: "Companion cell",
        lignin: "Lignin ring",
        lumen: "Hollow lumen",
        nucleus: "Nucleus",
        sievePlate: "Sieve plate",
        vacuole: "Vacuole",
        wall: "Cell wall",
      },
      status: [text("Cell status")],
      statuses: { dead: "Dead at maturity", living: "Living" },
      tissue: "Tissue",
      tissues: {
        meristem: {
          name: "Meristem",
          role: [text("Active mitosis")],
          wall: [text("Thin cellulose")],
        },
        sclerenchyma: {
          name: "Sclerenchyma",
          role: [text("Rigid support")],
          wall: [text("Thick lignin")],
        },
        xylem: {
          name: "Xylem",
          role: [text("Water transport")],
          wall: [text("Lignified tube")],
        },
      },
      view: "Plant tissue cutaway",
      wall: [text("Cell wall")],
    },
    tissues: ["meristem", "sclerenchyma", "xylem"],
  };
  const { function: _fn, status: _status, ...quiz } = lab.labels;

  it("decodes tissue anatomy lab and marks function and status as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("PlantTissueAnatomyLab", lab)).toEqual([
      "labels.function",
      "labels.status",
    ]);
    expect(
      answerState("PlantTissueAnatomyLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses empty, duplicated, or unnamed tissues", () => {
    expect(failsStrict(props, { ...lab, tissues: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, tissues: ["xylem", "xylem"] })).toBe(
      true
    );
    expect(
      failsStrict(props, { ...lab, tissues: ["meristem", "phloem"] })
    ).toBe(true);
  });
});

describe("root shoot growth zone lab", () => {
  const { props } = assessmentVisuals.RootShootGrowthZoneLab;
  const lab = {
    ...card,
    labels: {
      activity: [text("Cell activity")],
      mode: "Growth mode",
      modes: { primary: "Primary growth", secondary: "Secondary growth" },
      organ: "Organ",
      organs: { root: "Root tip", shoot: "Shoot apex" },
      parts: {
        annualRing: "Annual ring",
        apicalMeristem: "Apical meristem",
        corkCambium: "Cork cambium",
        rootCap: "Root cap",
        rootHair: "Root hair",
        secondaryPhloem: "Secondary phloem",
        secondaryXylem: "Secondary xylem",
        vacuole: "Vacuole",
        vascularCambium: "Vascular cambium",
      },
      position: "Distance from tip",
      rings: [text("Annual rings")],
      view: "Growth zones",
      year: "Stem age",
      zone: [text("Active zone")],
      zones: {
        differentiation: {
          activity: [text("Cells specialise")],
          name: "Differentiation",
        },
        division: {
          activity: [text("Rapid mitosis")],
          name: "Cell division",
        },
        elongation: {
          activity: [text("Vacuoles enlarge")],
          name: "Elongation",
        },
      },
    },
    modes: ["primary", "secondary"],
    organs: ["root", "shoot"],
    years: { max: 6, min: 1, value: 3 },
  };
  const { activity: _activity, rings: _rings, ...quiz } = lab.labels;

  it("decodes growth zone lab and tracks activity and rings as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("RootShootGrowthZoneLab", lab)).toEqual([
      "labels.activity",
      "labels.rings",
    ]);
    expect(
      answerState("RootShootGrowthZoneLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid year sliders or mismatched modes and organs", () => {
    expect(
      failsStrict(props, { ...lab, years: { max: 4, min: 4, value: 4 } })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, years: { max: 6, min: 1, value: 8 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, modes: ["primary"] })).toBe(true);
    expect(failsStrict(props, { ...lab, organs: ["root"] })).toBe(true);
  });
});

describe("plant growth curve lab", () => {
  const { props } = assessmentVisuals.PlantGrowthCurveLab;
  const lab = {
    ...card,
    labels: {
      dryMass: [text("Dry mass")],
      phase: [text("Growth phase")],
      phases: {
        exponential: {
          detail: [text("Rapid mitosis")],
          name: "Exponential",
        },
        lag: {
          detail: [text("Slow start")],
          name: "Lag",
        },
        senescence: {
          detail: [text("Seed dispersal")],
          name: "Senescence",
        },
        slowing: {
          detail: [text("Maturity nears")],
          name: "Slowing",
        },
        stationary: {
          detail: [text("Zero net growth")],
          name: "Stationary",
        },
      },
      rate: [text("Growth rate")],
      time: "Time",
      type: "Life cycle",
      types: {
        annual: "Annual",
        biennial: "Biennial",
        perennial: "Perennial",
      },
      view: "Plant sigmoid curve",
    },
    types: ["annual", "biennial", "perennial"],
  };
  const { phase: _phase, ...quiz } = lab.labels;

  it("decodes growth curve lab and reports phase as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("PlantGrowthCurveLab", lab)).toEqual(["labels.phase"]);
    expect(
      answerState("PlantGrowthCurveLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses empty or mismatched plant life-cycle types", () => {
    expect(failsStrict(props, { ...lab, types: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, types: ["annual"] })).toBe(true);
  });
});
