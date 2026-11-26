import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Visualize definite integrals and volumes in 3D.")],
  footer: [text("Watch sums and revolved slices converge to exact values.")],
  title: [text("Integral lab")],
};

describe("Riemann sum convergence lab", () => {
  const { props } = assessmentVisuals.RiemannSumConvergenceLab;
  const lab = {
    ...card,
    curves: ["parabola", "sineArch"],
    labels: {
      approxArea: [text("2.64")],
      curve: "Integrand",
      curves: {
        parabola: { formula: [text("f(x) = 0.5x^2 + 0.4")], name: "Parabola" },
        sineArch: { formula: [text("f(x) = 1.6 sin(x)")], name: "Sine arch" },
      },
      exactIntegral: [text("2.67")],
      method: "Rule",
      methods: {
        left: "Left sum",
        midpoint: "Midpoint",
      },
      partitions: "Subintervals n",
      parts: {
        baseAxis: "Integration interval",
        curveSurface: "Integrand curve",
        exactArea: "Exact region",
        riemannPrisms: "Riemann prisms",
        samplePoints: "Sample points",
      },
      view: "3D Riemann sum stage",
    },
    methods: ["left", "midpoint"],
    partitions: { max: 40, min: 4, value: 12 },
  };
  const { approxArea: _a, exactIntegral: _e, ...quiz } = lab.labels;

  it("decodes Riemann lab and tracks approxArea and exactIntegral", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("RiemannSumConvergenceLab", lab)).toEqual([
      "labels.approxArea",
      "labels.exactIntegral",
    ]);
    expect(
      answerState("RiemannSumConvergenceLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid partitions or mismatched curves/methods", () => {
    expect(
      failsStrict(props, { ...lab, partitions: { max: 4, min: 10, value: 5 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, curves: ["parabola"] })).toBe(true);
    expect(failsStrict(props, { ...lab, methods: ["left"] })).toBe(true);
  });
});

describe("solid of revolution lab", () => {
  const { props } = assessmentVisuals.SolidOfRevolutionLab;
  const lab = {
    ...card,
    labels: {
      parts: {
        crossSectionDisk: "Disk / washer slice",
        profileCurve: "Profile curve",
        radiusArrow: "Radius R(x)",
        revolvedShell: "Revolved surface",
        rotationAxis: "x-axis",
      },
      profile: "Profile",
      profiles: {
        paraboloid: { formula: [text("y = sqrt(x)")], name: "Paraboloid" },
        washerBowl: { formula: [text("R=1.2, r=0.5")], name: "Washer bowl" },
      },
      sliceArea: [text("pi R^2 = 3.14")],
      sweepAngle: "Sweep angle (deg)",
      totalVolume: [text("4.5 pi")],
      view: "3D solid of revolution",
    },
    profiles: ["paraboloid", "washerBowl"],
    sweepAngle: { max: 360, min: 30, value: 270 },
  };
  const { sliceArea: _s, totalVolume: _t, ...quiz } = lab.labels;

  it("decodes solid of revolution lab and tracks sliceArea and totalVolume", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("SolidOfRevolutionLab", lab)).toEqual([
      "labels.sliceArea",
      "labels.totalVolume",
    ]);
    expect(
      answerState("SolidOfRevolutionLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid sweepAngle or mismatched profiles", () => {
    expect(
      failsStrict(props, {
        ...lab,
        sweepAngle: { max: 30, min: 60, value: 45 },
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, profiles: ["paraboloid"] })).toBe(true);
  });
});

describe("area between curves lab", () => {
  const { props } = assessmentVisuals.AreaBetweenCurvesLab;
  const lab = {
    ...card,
    labels: {
      enclosedArea: [text("1.33")],
      heightGap: [text("f(x) - g(x) = 0.75")],
      pair: "Curve pair",
      pairs: {
        lineAndParabola: {
          formula: [text("y = x and y = x^2")],
          name: "Line & parabola",
        },
        twoParabolas: {
          formula: [text("y = 2-x^2 and y = x^2")],
          name: "Two parabolas",
        },
      },
      parts: {
        intersectionPins: "Intersections",
        lowerCurve: "Lower g(x)",
        shadedRibbon: "Enclosed area",
        upperCurve: "Upper f(x)",
        verticalStrip: "Vertical strip",
      },
      upperBound: "Upper bound b",
      view: "3D area between curves",
    },
    pairs: ["lineAndParabola", "twoParabolas"],
    upperBound: { max: 2, min: 0.2, value: 1.5 },
  };
  const { enclosedArea: _e, heightGap: _h, ...quiz } = lab.labels;

  it("decodes area between curves lab and tracks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("AreaBetweenCurvesLab", lab)).toEqual([
      "labels.enclosedArea",
      "labels.heightGap",
    ]);
    expect(
      answerState("AreaBetweenCurvesLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched pairs", () => {
    expect(failsStrict(props, { ...lab, pairs: ["lineAndParabola"] })).toBe(
      true
    );
  });
});
