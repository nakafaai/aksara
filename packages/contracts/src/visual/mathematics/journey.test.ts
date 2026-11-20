import { describe, expect, it } from "@effect/vitest";
import { RichTextSchema } from "#contracts/assessment/inline";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState } from "#contracts/visual/catalog";
import { journeyVisuals } from "#contracts/visual/mathematics/journey";

const journey = journeyVisuals(RichTextSchema);

describe("JourneyGraphLab", () => {
  const lab = {
    bus: {
      legs: [
        { change: 12, minutes: 15 },
        { change: 0, minutes: 10 },
        { change: 8, minutes: 20 },
        { change: 0, minutes: 15 },
        { change: -20, minutes: 30 },
      ],
      name: "Bus",
    },
    description: [text("Pick a part of the journey and read its speed.")],
    labels: {
      average: [text("Average speed for the whole journey")],
      axes: { distance: "Distance (km)", time: "Time (min)" },
      distance: [text("Distance from the station")],
      meeting: [text("When and where they meet")],
      motion: {
        away: [text("the bus moves away from the station")],
        back: [text("the bus heads back to the station")],
        still: [text("the bus stands still")],
      },
      parts: "Part of the journey",
      speed: [text("Speed")],
      time: "Time since the bus left",
      units: { distance: "km", speed: "km/h", time: "min" },
      viewLabel: "A model road with a bus, beside a sheet of graph paper",
      whole: "All",
    },
    second: {
      depart: 25,
      from: 20,
      legs: [{ change: -20, minutes: 50 }],
      name: "Motorbike",
    },
    showMeeting: true,
    showSpeeds: true,
    stops: [
      { at: 0, name: "Station" },
      { at: 12, name: "Market" },
      { at: 20, name: "School" },
    ],
    title: [text("A bus journey on a distance-time graph")],
  };
  /** Whether the lab refuses its props with one change applied. */
  const fails = (change: object) =>
    failsStrict(journey.JourneyGraphLab.props, { ...lab, ...change });

  it("takes a bus's legs, its stops and a second traveller", () => {
    expect(decodeStrict(journey.JourneyGraphLab.props, lab)).toEqual(lab);
  });

  it("takes a bus alone, without stops or a meeting label", () => {
    const { meeting: _meeting, ...labels } = lab.labels;
    const { second: _second, stops: _stops, ...alone } = lab;
    expect(
      decodeStrict(journey.JourneyGraphLab.props, { ...alone, labels })
    ).toEqual({ ...alone, labels });
  });

  it("refuses a bus that never moves, more than five legs, or minutes that are not whole and positive", () => {
    expect(
      fails({ bus: { legs: [{ change: 0, minutes: 10 }], name: "Bus" } })
    ).toBe(true);
    expect(
      fails({
        bus: {
          legs: [...lab.bus.legs, { change: 0, minutes: 5 }],
          name: "Bus",
        },
      })
    ).toBe(true);
    expect(
      fails({ bus: { legs: [{ change: 4, minutes: 2.5 }], name: "Bus" } })
    ).toBe(true);
    expect(
      fails({ bus: { legs: [{ change: 4, minutes: 0 }], name: "Bus" } })
    ).toBe(true);
  });

  it("refuses changes finer than a tenth of a kilometre, and a traveller behind the start", () => {
    expect(
      fails({ bus: { legs: [{ change: 1.25, minutes: 5 }], name: "Bus" } })
    ).toBe(true);
    expect(
      fails({
        bus: {
          legs: [
            { change: 4, minutes: 5 },
            { change: -5, minutes: 5 },
          ],
          name: "Bus",
        },
      })
    ).toBe(true);
    expect(
      fails({
        second: { ...lab.second, legs: [{ change: -21, minutes: 50 }] },
      })
    ).toBe(true);
  });

  it("refuses a second traveller without a meeting label, or setting off where the bus is", () => {
    const { meeting: _meeting, ...labels } = lab.labels;
    expect(fails({ labels })).toBe(true);
    expect(fails({ second: { ...lab.second, depart: 45 } })).toBe(true);
    expect(fails({ second: { ...lab.second, depart: 0, from: 0 } })).toBe(true);
  });

  it("refuses two stops at one place, or a stop past the bus's farthest point", () => {
    expect(fails({ stops: [...lab.stops, { at: 12, name: "Park" }] })).toBe(
      true
    );
    expect(fails({ stops: [{ at: 21, name: "Farm" }] })).toBe(true);
  });

  it("reads the speeds and the meeting as answer state", () => {
    expect(
      answerState("JourneyGraphLab", { showMeeting: true, showSpeeds: true })
    ).toEqual(["showSpeeds", "showMeeting"]);
  });
});
