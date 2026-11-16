import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Look closely.")], title: [text("Lab")] };

describe("plant labs", () => {
  it("checks a potometer's shoots, bore and run", () => {
    const potometer = {
      ...card,
      labels: {
        distance: [text("Bubble distance")],
        rate: [text("Uptake rate")],
        shoot: "Choose a shoot",
        time: "Time",
        view: "Bubble potometer",
        volume: [text("Water taken up")],
      },
      minutes: 5,
      radius: 0.5,
      shoots: [{ coat: "none", name: "A", rate: 0.42 }],
    };
    const { props } = assessmentVisuals.PotometerLab;

    expect(decodeStrict(props, potometer)).toEqual(potometer);
    expect(failsStrict(props, { ...potometer, shoots: [] })).toBe(true);
    expect(failsStrict(props, { ...potometer, radius: 0 })).toBe(true);
    expect(answerState("PotometerLab", potometer)).toEqual([]);
  });

  it("checks Hydrilla readings, with sodium hydrogen carbonate optional", () => {
    const { props } = assessmentVisuals.PhotosynthesisLab;
    const lab = {
      ...card,
      labels: {
        bubbles: [text("Bubbles a minute")],
        carbon: [text("Carbon dioxide")],
        carbonSources: { added: [text("Added")], none: [text("Water only")] },
        distance: [text("Lamp distance")],
        intensity: [text("Relative intensity")],
        reading: "Choose a reading",
        view: "Hydrilla under a lamp",
      },
      readings: [
        { bubbles: 5, distance: 40 },
        { bicarbonate: true, bubbles: 48, distance: 10 },
      ],
    };

    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(failsStrict(props, { ...lab, readings: [{ bubbles: 5 }] })).toBe(
      true
    );
  });

  it("keeps each tropism stimulus to its own treatments", () => {
    const { props } = assessmentVisuals.TropismLab;
    const labels = {
      bend: [text("Shoot bend")],
      directions: {
        away: [text("away")],
        straight: [text("Straight")],
        toward: [text("towards")],
      },
      far: [text("Shaded side")],
      growth: [text("Growth")],
      hours: "Time",
      near: [text("Lit side")],
      root: [text("Root bend")],
      seedling: "Choose a seedling",
      view: "Seedlings",
    };
    const light = {
      ...card,
      labels,
      setup: {
        seedlings: [{ name: "S", treatment: "micaLit" }],
        stimulus: "light",
      },
    };

    expect(decodeStrict(props, light)).toEqual(light);
    expect(
      failsStrict(props, {
        ...light,
        setup: {
          seedlings: [{ name: "S", treatment: "klinostat" }],
          stimulus: "light",
        },
      })
    ).toBe(true);
  });

  it("asks for even chromosome counts in double fertilisation", () => {
    const { props } = assessmentVisuals.FertilisationLab;
    const lab = {
      ...card,
      father: 24,
      labels: {
        embryo: [text("Embryo")],
        endosperm: [text("Endosperm")],
        gamete: [text("Male gamete")],
        grains: [text("Pollen grains")],
        progress: "Stage",
        seedCoat: [text("Seed coat")],
        stages: {
          entry: "Entry",
          fusion: "Fusion",
          pollination: "Pollination",
          tube: "Tube",
        },
        view: "A cut flower",
      },
      mother: 48,
    };

    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(failsStrict(props, { ...lab, father: 23 })).toBe(true);
  });

  it("checks an osmosis series and its optional strip mass", () => {
    const { props } = assessmentVisuals.OsmosisLab;
    const lab = {
      ...card,
      labels: {
        change: [text("Change in mass")],
        concentration: "Sucrose",
        isotonic: [text("Isotonic")],
        mass: [text("Final mass")],
        none: [text("None in this range")],
        solution: [text("Solution")],
        tonicities: {
          hypertonic: [text("Hypertonic")],
          hypotonic: [text("Hypotonic")],
          isotonic: [text("Isotonic")],
        },
        view: "Potato strips",
      },
      mass: 5,
      strips: [
        { change: 12, concentration: 0 },
        { change: -10, concentration: 0.6 },
      ],
    };

    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(
      failsStrict(props, { ...lab, strips: [{ change: 1, concentration: -1 }] })
    ).toBe(true);
  });
});
