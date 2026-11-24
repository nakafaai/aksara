import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore vascular transport.")],
  title: [text("Vascular transport lab")],
};

describe("xylem cohesion lab", () => {
  const { props } = assessmentVisuals.XylemCohesionLab;
  const lab = {
    ...card,
    forces: ["rootPressure", "capillary", "transpirationPull"],
    height: { max: 120, min: 1, value: 40 },
    labels: {
      force: "Water-lifting force",
      forces: {
        capillary: {
          mechanism: [text("Adhesion and cohesion in narrow vessels")],
          name: "Capillary action",
        },
        rootPressure: {
          mechanism: [text("Active ion pumping pushes water in")],
          name: "Root pressure",
        },
        transpirationPull: {
          mechanism: [text("Evaporation at leaves pulls the water column")],
          name: "Transpiration pull",
        },
      },
      height: "Tree height (m)",
      mechanism: [text("How it works")],
      parts: {
        cohesionBond: "Hydrogen bond",
        ligninWall: "Lignified wall",
        rootCell: "Root cell",
        stoma: "Stoma",
        waterColumn: "Water column",
      },
      pressureNeeded: [text("Pressure needed")],
      view: "Xylem vessel column lifting water",
    },
  };
  const { mechanism: _m, pressureNeeded: _p, ...quiz } = lab.labels;

  it("decodes xylem cohesion lab and marks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("XylemCohesionLab", lab)).toEqual([
      "labels.mechanism",
      "labels.pressureNeeded",
    ]);
    expect(answerState("XylemCohesionLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses mismatched forces", () => {
    expect(failsStrict(props, { ...lab, forces: ["rootPressure"] })).toBe(true);
  });
});

describe("phloem translocation lab", () => {
  const { props } = assessmentVisuals.PhloemTranslocationLab;
  const lab = {
    ...card,
    labels: {
      barkState: [text("Bark status")],
      mode: "Stem mode",
      modes: {
        intact: {
          name: "Intact bark",
          outcome: [text("Sucrose flows from source to sink")],
        },
        ringed: {
          name: "Ringed bark",
          outcome: [text("Bark swells above the ring as sucrose piles up")],
        },
      },
      parts: {
        companionCell: "Companion cell",
        sievePlate: "Sieve plate",
        sieveTube: "Sieve tube",
        sucrose: "Sucrose",
        xylem: "Xylem",
      },
      pressureDiff: [text("Osmotic pressure difference")],
      sourceSucrose: "Source sucrose (%)",
      view: "Phloem sieve tube and companion cell pressure-flow model",
    },
    modes: ["intact", "ringed"],
    sourceSucrose: { max: 30, min: 2, value: 20 },
  };
  const { barkState: _b, pressureDiff: _p, ...quiz } = lab.labels;

  it("decodes phloem translocation lab and marks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("PhloemTranslocationLab", lab)).toEqual([
      "labels.barkState",
      "labels.pressureDiff",
    ]);
    expect(
      answerState("PhloemTranslocationLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched modes", () => {
    expect(failsStrict(props, { ...lab, modes: ["intact"] })).toBe(true);
  });
});

describe("phytoremediation lab", () => {
  const { props } = assessmentVisuals.PhytoremediationLab;
  const lab = {
    ...card,
    harvests: { max: 20, min: 0, value: 6 },
    labels: {
      harvests: "Harvest cycles",
      medium: [text("Target medium")],
      parts: {
        metalIon: "Heavy metal ion",
        rootZone: "Root zone",
        shoot: "Shoot",
        soilBed: "Soil bed",
        waterChannel: "Water channel",
      },
      plant: "Remediation plant",
      plants: {
        hyacinth: {
          medium: [text("Polluted water")],
          name: "Water hyacinth",
        },
        mustard: {
          medium: [text("Polluted soil")],
          name: "Indian mustard",
        },
      },
      remaining: [text("Heavy metal left")],
      view: "Phytoremediation root uptake across harvest cycles",
    },
    plants: ["mustard", "hyacinth"],
  };
  const { medium: _m, remaining: _r, ...quiz } = lab.labels;

  it("decodes phytoremediation lab and marks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("PhytoremediationLab", lab)).toEqual([
      "labels.medium",
      "labels.remaining",
    ]);
    expect(
      answerState("PhytoremediationLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched plants", () => {
    expect(failsStrict(props, { ...lab, plants: ["mustard"] })).toBe(true);
  });
});
