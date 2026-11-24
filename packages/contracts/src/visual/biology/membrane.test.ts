import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore membrane transport.")],
  title: [text("Membrane transport lab")],
};

describe("active transport pump lab", () => {
  const { props } = assessmentVisuals.ActiveTransportPumpLab;
  const lab = {
    ...card,
    gradient: { max: 100, min: 0, value: 60 },
    labels: {
      atpUse: [text("ATP requirement")],
      direction: [text("Movement direction")],
      directions: {
        againstGradient: "Against gradient",
        downGradient: "Down gradient",
      },
      gradient: "Concentration gradient (%)",
      mode: "Transport mode",
      modes: {
        activePump: {
          mechanism: [text("Carrier protein uses ATP")],
          name: "Active transport",
        },
        facilitated: {
          mechanism: [text("Channel protein assists passive flow")],
          name: "Facilitated diffusion",
        },
        simpleDiffusion: {
          mechanism: [text("Small nonpolar solutes cross bilayer")],
          name: "Simple diffusion",
        },
      },
      parts: {
        adp: "ADP + Pi",
        atp: "ATP",
        bilayer: "Phospholipid bilayer",
        carrierPump: "Carrier pump",
        channelProtein: "Channel protein",
        solute: "Solute molecule",
      },
      view: "Phospholipid bilayer transport model",
    },
    modes: ["simpleDiffusion", "facilitated", "activePump"],
  };
  const { atpUse: _atp, direction: _dir, ...quiz } = lab.labels;

  it("decodes active transport lab and marks atpUse and direction as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("ActiveTransportPumpLab", lab)).toEqual([
      "labels.atpUse",
      "labels.direction",
    ]);
    expect(
      answerState("ActiveTransportPumpLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid gradient ranges or mismatched transport modes", () => {
    expect(
      failsStrict(props, { ...lab, gradient: { max: 50, min: 50, value: 50 } })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, gradient: { max: 100, min: 0, value: 120 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, modes: ["activePump"] })).toBe(true);
  });
});

describe("plasmolysis cell lab", () => {
  const { props } = assessmentVisuals.PlasmolysisCellLab;
  const lab = {
    ...card,
    cells: ["plant", "redBlood"],
    labels: {
      cell: "Cell type",
      cells: { plant: "Plant cell", redBlood: "Red blood cell" },
      outcome: [text("Cell state")],
      outcomes: {
        crenated: "Crenated",
        haemolysed: "Haemolysed",
        normal: "Normal",
        plasmolysed: "Plasmolysed",
        turgid: "Turgid",
      },
      parts: {
        cellWall: "Cell wall",
        cytoplasm: "Cytoplasm",
        membrane: "Plasma membrane",
        vacuole: "Vacuole",
        waterArrow: "Net water flow",
      },
      solution: "External solution",
      solutions: {
        hypertonic: "Hypertonic",
        hypotonic: "Hypotonic",
        isotonic: "Isotonic",
      },
      view: "Plant and red blood cell osmosis model",
      waterFlow: [text("Net water movement")],
    },
    solutions: ["hypotonic", "isotonic", "hypertonic"],
  };
  const { outcome: _out, waterFlow: _flow, ...quiz } = lab.labels;

  it("decodes plasmolysis cell lab and marks outcome and waterFlow as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("PlasmolysisCellLab", lab)).toEqual([
      "labels.outcome",
      "labels.waterFlow",
    ]);
    expect(answerState("PlasmolysisCellLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses mismatched cell kinds or tonicity solutions", () => {
    expect(failsStrict(props, { ...lab, cells: ["plant"] })).toBe(true);
    expect(failsStrict(props, { ...lab, solutions: ["hypotonic"] })).toBe(true);
  });
});
