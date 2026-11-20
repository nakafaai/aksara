import { describe, expect, it } from "@effect/vitest";
import { RichTextSchema } from "#contracts/assessment/inline";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState } from "#contracts/visual/catalog";
import { networkVisuals } from "#contracts/visual/mathematics/network";

const network = networkVisuals(RichTextSchema);

describe("RouteNetworkLab", () => {
  const lab = {
    description: [
      text("Count the roads at each town, then find the shortest way."),
    ],
    end: "C",
    labels: {
      degreeSum: [text("All the degrees added up")],
      length: [text("How long this route is")],
      mode: "What to look at",
      modes: { degrees: "Degrees", route: "Shortest route" },
      route: "Route",
      shortest: [text("The shortest route")],
      town: "Town",
      trip: [text("The van's route")],
      twiceRoads: [text("Twice the roads")],
      viewLabel: "A model map of three towns joined by roads",
    },
    mode: "route",
    roads: [
      { from: "A", length: 12, to: "B" },
      { from: "B", length: 4, to: "C" },
      { from: "C", length: 9, to: "A" },
    ],
    showShortest: true,
    start: "A",
    title: [text("Roads between three towns")],
    towns: [
      { id: "A", name: "Alor" },
      { id: "B", name: "Bukit" },
      { id: "C", name: "Cempaka" },
    ],
  };
  /** Whether the lab refuses its props with one change applied. */
  const fails = (change: object) =>
    failsStrict(network.RouteNetworkLab.props, { ...lab, ...change });

  it("takes towns, weighted roads and the two ends of a trip", () => {
    expect(decodeStrict(network.RouteNetworkLab.props, lab)).toEqual(lab);
  });

  it("refuses a repeated town, a loop, a road to an unlisted town, and a repeated road", () => {
    expect(fails({ towns: [...lab.towns, { id: "A", name: "Again" }] })).toBe(
      true
    );
    expect(
      fails({ roads: [...lab.roads, { from: "A", length: 2, to: "A" }] })
    ).toBe(true);
    expect(
      fails({ roads: [...lab.roads, { from: "A", length: 2, to: "Z" }] })
    ).toBe(true);
    expect(
      fails({ roads: [...lab.roads, { from: "Z", length: 2, to: "A" }] })
    ).toBe(true);
    expect(
      fails({ roads: [...lab.roads, { from: "B", length: 3, to: "A" }] })
    ).toBe(true);
  });

  it("refuses a network in two pieces and a trip that does not join two listed towns", () => {
    expect(
      fails({
        roads: [{ from: "A", length: 12, to: "B" }],
        towns: [...lab.towns],
      })
    ).toBe(true);
    expect(fails({ end: "A" })).toBe(true);
    expect(fails({ start: "Z" })).toBe(true);
    expect(fails({ end: "Z" })).toBe(true);
    expect(fails({ towns: [{ id: "A", name: "Alor" }] })).toBe(true);
  });

  it("holds the shortest route as answer state", () => {
    expect(answerState("RouteNetworkLab", lab)).toEqual(["showShortest"]);
    expect(
      answerState("RouteNetworkLab", { ...lab, showShortest: false })
    ).toEqual([]);
  });
});
