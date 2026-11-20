import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Pick an experiment.")],
  title: [text("Lab")],
};

const words = {
  active: [text("Enzymes with an intact active site")],
  collisions: [text("Effective collisions per second")],
  endpoint: [text("Time until the substrate is used up")],
  enzyme: "Experiment",
  never: [text("never reached")],
  parts: {
    bath: "Water bath",
    lens: "Lens on the active site",
    thermometer: "Thermometer",
    tile: "Spotting tile",
    tube: "Test tube",
  },
  rate: [text("Relative rate of reaction")],
  restore: "Back to the best conditions",
  test: [text("Test now")],
  time: "Time",
  view: "A water bath with a test tube",
};

const iodine = {
  noStarch: [text("iodine yellowish-brown")],
  starch: [text("iodine blue-black")],
};
const albumen = {
  clear: [text("suspension now clear")],
  cloudy: [text("suspension still cloudy")],
};

const lab = {
  ...card,
  enzymes: ["amylase", "pepsin"],
  labels: {
    ...words,
    enzymes: { amylase: "Amylase and starch", pepsin: "Pepsin and albumen" },
    ph: "pH of the solution",
    temperature: "Water bath temperature",
    tests: { ...iodine, ...albumen },
  },
  ph: { max: 13, min: 1, value: 7 },
  temperature: { max: 80, min: 0, value: 20 },
};

describe("denature lab", () => {
  const { props } = assessmentVisuals.DenatureLab;

  it("checks both experiments, and amylase alone with only its slider and results", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    const amylase = {
      ...card,
      enzymes: ["amylase"],
      labels: {
        ...words,
        enzymes: { amylase: "Amylase and starch" },
        temperature: "Water bath temperature",
        tests: iodine,
      },
      temperature: { max: 80, min: 0, value: 20 },
    };
    expect(decodeStrict(props, amylase)).toEqual(amylase);
  });

  it("refuses a slider or results for an experiment the lab does not show", () => {
    const { ph: _ph, ...noPh } = lab;
    expect(failsStrict(props, noPh)).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        enzymes: ["amylase"],
        labels: { ...lab.labels, enzymes: { amylase: "Amylase and starch" } },
      })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, labels: { ...lab.labels, tests: iodine } })
    ).toBe(true);
  });

  it("refuses a pH off the scale or a slider starting outside its range", () => {
    expect(
      failsStrict(props, { ...lab, ph: { max: 15, min: 1, value: 7 } })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        temperature: { max: 80, min: 0, value: 90 },
      })
    ).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("DenatureLab", lab)).toEqual([]);
  });
});
