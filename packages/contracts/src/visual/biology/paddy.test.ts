import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Look closely.")], title: [text("Lab")] };

const lab = {
  ...card,
  atp: 36,
  labels: {
    damaged: [text("damaged")],
    ethanol: [text("Ethanol in the root")],
    fermentation: [text("Root energy from fermentation")],
    healthy: [text("healthy")],
    oxygen: [text("Soil oxygen at the roots")],
    parts: {
      aerenchyma: "Aerenchyma",
      mud: "Mud",
      root: "Root",
      water: "Floodwater",
    },
    plant: "Plant",
    plants: { dryland: "Dryland crop", rice: "Rice" },
    roots: [text("Root condition")],
    view: "A paddy field with an X-ray view of the rice roots in the mud",
    water: "Field",
    waters: { drained: "Drained", flooded: "Waterlogged" },
  },
  plants: ["rice", "dryland"],
};

describe("paddy lab", () => {
  it("checks a paddy with rice and a dryland crop and holds no answer state", () => {
    const { props } = assessmentVisuals.PaddyRootLab;

    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, plants: ["rice"] })).toEqual({
      ...lab,
      plants: ["rice"],
    });
    expect(answerState("PaddyRootLab", lab)).toEqual([]);
  });

  it("refuses an unknown crop, no crop, and a fractional ATP yield", () => {
    const { props } = assessmentVisuals.PaddyRootLab;

    expect(failsStrict(props, { ...lab, plants: ["maize"] })).toBe(true);
    expect(failsStrict(props, { ...lab, plants: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, atp: 36.5 })).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        labels: { ...lab.labels, waters: { flooded: "Flooded" } },
      })
    ).toBe(true);
  });
});
