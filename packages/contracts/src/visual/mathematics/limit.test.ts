import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore limit definitions, asymptotes, and squeezing.")],
  footer: [text("Shrink tolerances and probes to inspect limiting behavior.")],
  title: [text("Limit lab")],
};

describe("epsilon-delta band lab", () => {
  const { props } = assessmentVisuals.EpsilonDeltaBandLab;
  const lab = {
    ...card,
    epsilon: { max: 1, min: 0.05, value: 0.35 },
    functions: ["removableHole", "steepLinear"],
    labels: {
      deltaBound: [text("delta = 0.175")],
      epsilon: "Tolerance epsilon",
      functionLabel: "Function",
      functions: {
        removableHole: {
          formula: [text("(x^2-1)/(x-1)")],
          name: "Removable hole",
        },
        steepLinear: { formula: [text("2x + 0.5")], name: "Steep linear" },
      },
      limitVerdict: [text("Inside epsilon corridor")],
      parts: {
        curvePath: "Graph f(x)",
        deltaBand: "Delta band",
        epsilonBand: "Epsilon band",
        holePoint: "Open point at a",
        limitTarget: "Limit L",
      },
      view: "3D epsilon-delta bands",
    },
  };
  const { deltaBound: _d, limitVerdict: _l, ...quiz } = lab.labels;

  it("decodes epsilon-delta lab and tracks deltaBound and limitVerdict", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("EpsilonDeltaBandLab", lab)).toEqual([
      "labels.deltaBound",
      "labels.limitVerdict",
    ]);
    expect(
      answerState("EpsilonDeltaBandLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid epsilon range or mismatched functions", () => {
    expect(
      failsStrict(props, {
        ...lab,
        epsilon: { max: 0.1, min: 0.5, value: 0.2 },
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, functions: ["removableHole"] })).toBe(
      true
    );
  });
});

describe("asymptote behavior lab", () => {
  const { props } = assessmentVisuals.AsymptoteBehaviorLab;
  const lab = {
    ...card,
    curves: ["reciprocalPole", "rationalHorizontal"],
    labels: {
      approachValue: [text("f(x) -> +infinity")],
      asymptoteSummary: [text("VA: x = 0, HA: y = 0")],
      curve: "Rational curve",
      curves: {
        rationalHorizontal: {
          formula: [text("(2x)/(x-1)")],
          name: "Horizontal + vertical",
        },
        reciprocalPole: { formula: [text("1 / x")], name: "Reciprocal pole" },
      },
      parts: {
        curveBranches: "Curve branches",
        horizontalAsymptote: "Horizontal asymptote",
        leftProbe: "Left probe",
        rightProbe: "Right probe",
        verticalAsymptote: "Vertical asymptote",
      },
      probeX: "Probe x",
      view: "3D asymptote behavior",
    },
    probeX: { max: 3, min: -3, value: 0.6 },
  };
  const { approachValue: _a, asymptoteSummary: _s, ...quiz } = lab.labels;

  it("decodes asymptote lab and tracks summary and approach value", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("AsymptoteBehaviorLab", lab)).toEqual([
      "labels.asymptoteSummary",
      "labels.approachValue",
    ]);
    expect(
      answerState("AsymptoteBehaviorLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid probeX or mismatched curves", () => {
    expect(
      failsStrict(props, { ...lab, probeX: { max: -2, min: 2, value: 0 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, curves: ["reciprocalPole"] })).toBe(
      true
    );
  });
});

describe("squeeze theorem wave lab", () => {
  const { props } = assessmentVisuals.SqueezeTheoremWaveLab;
  const lab = {
    ...card,
    envelopes: ["quadraticSine", "linearDamped"],
    labels: {
      boundSpread: [text("2r^2 = 0.32")],
      envelope: "Envelope pair",
      envelopes: {
        linearDamped: {
          formula: [text("|x| sin(1/x)")],
          name: "Linear envelope",
        },
        quadraticSine: {
          formula: [text("x^2 sin(1/x)")],
          name: "Quadratic envelope",
        },
      },
      parts: {
        lowerBound: "Lower bound",
        pinchPoint: "Pinch limit",
        squeezedWave: "Trapped wave",
        upperBound: "Upper bound",
        windowFrame: "Zoom window",
      },
      radius: "Window radius r",
      squeezedLimit: [text("lim = 0")],
      view: "3D squeeze theorem wave",
    },
    radius: { max: 1.5, min: 0.1, value: 0.6 },
  };
  const { boundSpread: _b, squeezedLimit: _s, ...quiz } = lab.labels;

  it("decodes squeeze theorem lab and tracks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("SqueezeTheoremWaveLab", lab)).toEqual([
      "labels.boundSpread",
      "labels.squeezedLimit",
    ]);
    expect(
      answerState("SqueezeTheoremWaveLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched envelopes", () => {
    expect(failsStrict(props, { ...lab, envelopes: ["quadraticSine"] })).toBe(
      true
    );
  });
});
