import { describe, expect, it } from "@effect/vitest";
import { RichTextSchema } from "#contracts/assessment/inline";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { lightVisuals } from "#contracts/visual/physics/light";

const light = lightVisuals(RichTextSchema);

describe("ApparentDepthLab", () => {
  const lab = {
    description: [text("A coin under oil and water.")],
    labels: {
      apparent: [text("Apparent depth")],
      image: [text("Image above the floor")],
      liquids: {
        alcohol: [text("Alcohol")],
        glycerine: [text("Glycerine")],
        oil: [text("Oil")],
        water: [text("Water")],
      },
      real: [text("Real depth")],
      top: "Top layer",
      viewLabel: "A coin under liquids",
    },
    layers: [
      { index: 1.5, liquid: "oil", thickness: 6 },
      { index: 4 / 3, liquid: "water", thickness: 12 },
    ],
    title: [text("Apparent depth")],
  };

  it("takes the poured layers from the top down", () => {
    expect(decodeStrict(light.ApparentDepthLab.props, lab)).toEqual(lab);
  });

  it("refuses an empty container and a liquid it cannot draw", () => {
    expect(
      failsStrict(light.ApparentDepthLab.props, { ...lab, layers: [] })
    ).toBe(true);
    expect(
      failsStrict(light.ApparentDepthLab.props, {
        ...lab,
        layers: [{ index: 1.36, liquid: "ethanol", thickness: 5 }],
      })
    ).toBe(true);
  });
});
