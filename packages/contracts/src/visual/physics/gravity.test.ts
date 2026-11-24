import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Sweep equal areas along an elliptical orbit.")],
  title: [text("Kepler orbit lab")],
};

describe("Kepler orbit period lab", () => {
  const { props } = assessmentVisuals.KeplerOrbitPeriodLab;
  const lab = {
    ...card,
    bodies: ["earth", "mars", "comet"],
    eccentricity: { max: 0.75, min: 0, value: 0.2 },
    labels: {
      bodies: { comet: "Comet", earth: "Earth", mars: "Mars" },
      body: "Orbiting body",
      eccentricity: "Eccentricity",
      parts: {
        aphelion: "Aphelion",
        areaSector: "Equal-area sweep",
        focus: "Empty focus",
        perihelion: "Perihelion",
        planet: "Orbiting body",
        sun: "Sun",
      },
      period: [text("Orbital period")],
      radius: [text("Semi-major axis")],
      ratio: [text("Kepler ratio")],
      speed: [text("Orbital speed")],
      view: "Heliocentric elliptical orbit model",
    },
  };
  const { period: _period, speed: _speed, ...quiz } = lab.labels;

  it("decodes Kepler orbit lab and marks period and speed as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("KeplerOrbitPeriodLab", lab)).toEqual([
      "labels.period",
      "labels.speed",
    ]);
    expect(
      answerState("KeplerOrbitPeriodLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid eccentricity ranges or mismatched body labels", () => {
    expect(
      failsStrict(props, {
        ...lab,
        eccentricity: { max: 0.95, min: 0, value: 0.2 },
      })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        eccentricity: { max: 0.5, min: 0.5, value: 0.5 },
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, bodies: ["earth"] })).toBe(true);
  });
});
