import { describe, expect, it } from "@effect/vitest";

import {
  GraphPointInteractionSchema,
  HotspotAreaSchema,
  HotspotInteractionSchema,
} from "#contracts/assessment/graphic";
import { failsStrict } from "#contracts/test/assessment/document";
import {
  bodyImage,
  graphPointInteraction,
  hotspotInteraction,
} from "#contracts/test/assessment/interaction";

/** Builds one area of a shape with the given coordinates. */
function area(shape: string, coords?: readonly number[]) {
  return coords === undefined
    ? { id: "area-1", label: "Heart", shape }
    : { coords, id: "area-1", label: "Heart", shape };
}

describe("hotspot areas", () => {
  it("accepts the five shapes that QTI allows, each with the coordinates it needs", () => {
    for (const input of [
      area("rect", [10, 20, 100, 160]),
      area("circle", [120, 80, 30]),
      area("ellipse", [120, 80, 30, 20]),
      area("poly", [0, 0, 50, 0, 25, 40]),
      area("poly", [0, 0, 50, 0, 50, 40, 0, 40]),
      area("default"),
    ]) {
      expect(failsStrict(HotspotAreaSchema, input)).toBe(false);
    }
  });

  it("rejects coordinates that do not make the shape", () => {
    for (const input of [
      area("rect", [100, 20, 10, 160]),
      area("rect", [10, 160, 100, 20]),
      area("rect", [10, 20, 100]),
      area("circle", [120, 80, 0]),
      area("circle", [120, 80]),
      area("ellipse", [120, 80, 0, 20]),
      area("ellipse", [120, 80, 30, 0]),
      area("poly", [0, 0, 50, 0]),
      area("poly", [0, 0, 50, 0, 25, 40, 10]),
      area("default", [1, 2, 3]),
      area("rect", [-10, 20, 100, 160]),
      area("triangle", [0, 0, 1, 1, 2, 2]),
    ]) {
      expect(failsStrict(HotspotAreaSchema, input)).toBe(true);
    }
  });

  it("labels every area in words, so no area is told apart by looks alone", () => {
    expect(
      failsStrict(HotspotAreaSchema, {
        coords: [120, 80, 30],
        id: "area-1",
        shape: "circle",
      })
    ).toBe(true);
    expect(
      failsStrict(HotspotAreaSchema, {
        ...area("circle", [120, 80, 30]),
        label: " ",
      })
    ).toBe(true);
  });
});

describe("hotspot interactions", () => {
  it("needs an image with a text alternative and two areas with their own identifiers", () => {
    const [heart] = hotspotInteraction.areas;
    const { alt: _alt, ...withoutAlt } = bodyImage;

    expect(failsStrict(HotspotInteractionSchema, hotspotInteraction)).toBe(
      false
    );
    expect(
      failsStrict(HotspotInteractionSchema, {
        ...hotspotInteraction,
        image: withoutAlt,
      })
    ).toBe(true);
    expect(
      failsStrict(HotspotInteractionSchema, {
        ...hotspotInteraction,
        areas: [heart],
      })
    ).toBe(true);
    expect(
      failsStrict(HotspotInteractionSchema, {
        ...hotspotInteraction,
        areas: [heart, heart],
      })
    ).toBe(true);
  });

  it("selects within the number of areas", () => {
    for (const bounds of [
      { maxChoices: 2, minChoices: 0 },
      { maxChoices: 1, minChoices: 1 },
    ]) {
      expect(
        failsStrict(HotspotInteractionSchema, {
          ...hotspotInteraction,
          ...bounds,
        })
      ).toBe(false);
    }
    for (const bounds of [
      { maxChoices: 1, minChoices: 2 },
      { maxChoices: 3, minChoices: 1 },
    ]) {
      expect(
        failsStrict(HotspotInteractionSchema, {
          ...hotspotInteraction,
          ...bounds,
        })
      ).toBe(true);
    }
  });
});

describe("graph point interactions", () => {
  it("places points or lines on a plane, with or without a snap step", () => {
    const { snap: _snap, ...free } = graphPointInteraction;

    expect(
      failsStrict(GraphPointInteractionSchema, graphPointInteraction)
    ).toBe(false);
    expect(failsStrict(GraphPointInteractionSchema, free)).toBe(false);
    expect(
      failsStrict(GraphPointInteractionSchema, {
        ...graphPointInteraction,
        placing: "lines",
      })
    ).toBe(false);
  });

  it("rejects a plane that does not run upward, and counts and steps that are not above zero", () => {
    for (const change of [
      {
        frame: {
          kind: "cartesian",
          x: { max: -5, min: 5 },
          y: { max: 5, min: -5 },
        },
      },
      { count: 0 },
      { snap: 0 },
      { placing: "curves" },
    ]) {
      expect(
        failsStrict(GraphPointInteractionSchema, {
          ...graphPointInteraction,
          ...change,
        })
      ).toBe(true);
    }
  });
});
