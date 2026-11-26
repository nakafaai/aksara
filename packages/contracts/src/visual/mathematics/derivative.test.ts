import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Inspect instantaneous rate of change in 3D.")],
  footer: [
    text("Compare secant slopes, tangent lines, and stationary points."),
  ],
  title: [text("Derivative lab")],
};

describe("secant to tangent lab", () => {
  const { props } = assessmentVisuals.SecantToTangentLab;
  const lab = {
    ...card,
    curves: ["quadratic", "cubic"],
    labels: {
      curve: "Function",
      curves: {
        cubic: { formula: [text("f(x) = 0.25x^3")], name: "Cubic" },
        quadratic: { formula: [text("f(x) = 0.5x^2")], name: "Quadratic" },
      },
      parts: {
        anchorPoint: "Anchor P(a, f(a))",
        curveRibbon: "Function curve",
        movingPoint: "Moving Q(a+h, f(a+h))",
        secantLine: "Secant line",
        slopeTriangle: "Rise / run triangle",
        tangentLine: "Tangent line",
      },
      secantSlope: [text("m_sec = 1.40")],
      stepH: "Step size h",
      tangentSlope: [text("f'(a) = 1.00")],
      view: "3D secant to tangent convergence",
    },
    stepH: { max: 2, min: 0.05, value: 0.8 },
  };
  const { secantSlope: _s, tangentSlope: _t, ...quiz } = lab.labels;

  it("decodes secant lab and tracks secantSlope and tangentSlope", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("SecantToTangentLab", lab)).toEqual([
      "labels.secantSlope",
      "labels.tangentSlope",
    ]);
    expect(answerState("SecantToTangentLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses invalid stepH range or mismatched curves", () => {
    expect(
      failsStrict(props, { ...lab, stepH: { max: 0.5, min: 1, value: 0.5 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, curves: ["quadratic"] })).toBe(true);
  });
});

describe("derivative slope field lab", () => {
  const { props } = assessmentVisuals.DerivativeSlopeFieldLab;
  const lab = {
    ...card,
    curves: ["cubicWave", "quarticWell"],
    labels: {
      curve: "Function",
      curves: {
        cubicWave: {
          formula: [text("f(x) = 0.3x^3 - 0.9x")],
          name: "Cubic wave",
        },
        quarticWell: {
          formula: [text("f(x) = 0.15x^4 - 0.6x^2")],
          name: "Quartic well",
        },
      },
      monotonicity: [text("Increasing")],
      parts: {
        criticalPoints: "Critical points",
        derivativeCurve: "Derivative f'(x)",
        functionCurve: "Function f(x)",
        probeMarker: "Probe x",
        slopeNeedles: "Slope needles",
      },
      probeX: "Probe x",
      slopeValue: [text("f'(x) = 0.45")],
      view: "3D function and derivative pair",
    },
    probeX: { max: 2.2, min: -2.2, value: 0 },
  };
  const { monotonicity: _m, slopeValue: _s, ...quiz } = lab.labels;

  it("decodes derivative slope field lab and tracks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("DerivativeSlopeFieldLab", lab)).toEqual([
      "labels.slopeValue",
      "labels.monotonicity",
    ]);
    expect(
      answerState("DerivativeSlopeFieldLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid probeX or mismatched curves", () => {
    expect(
      failsStrict(props, { ...lab, probeX: { max: -1, min: 1, value: 0 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, curves: ["cubicWave"] })).toBe(true);
  });
});

describe("optimization box 3D lab", () => {
  const { props } = assessmentVisuals.OptimizationBox3DLab;
  const lab = {
    ...card,
    cutout: { max: 2.8, min: 0.2, value: 1 },
    labels: {
      boxVolume: [text("16.0 cm^3")],
      cutout: "Corner cut x",
      derivativeNote: [text("V'(x) = 0 at optimum")],
      parts: {
        basePlate: "Box base",
        cornerCutouts: "Corner cutouts",
        optimalMarker: "Optimal peak",
        sideFlaps: "Folded walls",
        volumeCurve: "Volume curve V(x)",
      },
      sheet: "Sheet size",
      sheets: {
        squareSheet: { dimensions: [text("6 x 6")], name: "Square 6x6" },
        wideSheet: { dimensions: [text("8 x 6")], name: "Wide 8x6" },
      },
      view: "3D folded box volume optimizer",
    },
    sheets: ["squareSheet", "wideSheet"],
  };
  const { boxVolume: _b, derivativeNote: _d, ...quiz } = lab.labels;

  it("decodes optimization box lab and tracks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("OptimizationBox3DLab", lab)).toEqual([
      "labels.boxVolume",
      "labels.derivativeNote",
    ]);
    expect(
      answerState("OptimizationBox3DLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched sheets", () => {
    expect(failsStrict(props, { ...lab, sheets: ["squareSheet"] })).toBe(true);
  });
});
