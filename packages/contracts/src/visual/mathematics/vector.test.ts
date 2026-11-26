import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Inspect 3D vector products, projections, and volumes.")],
  footer: [text("Rotate the scene to confirm orthogonality and volume.")],
  title: [text("3D vector lab")],
};

describe("vector 3D cross product lab", () => {
  const { props } = assessmentVisuals.Vector3DCrossProductLab;
  const lab = {
    ...card,
    angle: { max: 180, min: 0, value: 60 },
    labels: {
      angle: "Angle (deg)",
      crossMagnitude: [text("|u x v| = 2.60")],
      directionRule: [text("Right-hand thumb up (+y)")],
      order: "Order",
      orders: {
        uCrossV: "u x v",
        vCrossU: "v x u",
      },
      parts: {
        coordinateAxes: "3D axes",
        crossVector: "Normal vector",
        curlArc: "Right-hand curl",
        parallelogram: "Spanned parallelogram",
        vectorU: "Vector u",
        vectorV: "Vector v",
      },
      view: "3D cross product parallelogram",
    },
    orders: ["uCrossV", "vCrossU"],
  };
  const { crossMagnitude: _c, directionRule: _d, ...quiz } = lab.labels;

  it("decodes cross product lab and tracks magnitude and directionRule", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("Vector3DCrossProductLab", lab)).toEqual([
      "labels.crossMagnitude",
      "labels.directionRule",
    ]);
    expect(
      answerState("Vector3DCrossProductLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid angle range or mismatched orders", () => {
    expect(
      failsStrict(props, { ...lab, angle: { max: 10, min: 90, value: 45 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, orders: ["uCrossV"] })).toBe(true);
  });
});

describe("dot product projection 3D lab", () => {
  const { props } = assessmentVisuals.DotProductProjection3DLab;
  const lab = {
    ...card,
    angle: { max: 180, min: 0, value: 45 },
    labels: {
      angle: "Angle (deg)",
      dotValue: [text("u . v = 2.12")],
      parts: {
        angleArc: "Angle arc",
        coordinateAxes: "3D axes",
        dropLine: "Orthogonal drop",
        projectionVector: "Projection onto v",
        vectorU: "Vector u",
        vectorV: "Vector v",
      },
      preset: "Preset",
      presets: {
        acute: "Acute (<90)",
        obtuse: "Obtuse (>90)",
        orthogonal: "Orthogonal (90)",
      },
      projectionLength: [text("1.06")],
      view: "3D orthogonal vector projection",
    },
    presets: ["acute", "orthogonal", "obtuse"],
  };
  const { dotValue: _d, projectionLength: _p, ...quiz } = lab.labels;

  it("decodes dot product projection lab and tracks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("DotProductProjection3DLab", lab)).toEqual([
      "labels.dotValue",
      "labels.projectionLength",
    ]);
    expect(
      answerState("DotProductProjection3DLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched presets", () => {
    expect(failsStrict(props, { ...lab, presets: ["acute"] })).toBe(true);
  });
});

describe("vector parallelepiped lab", () => {
  const { props } = assessmentVisuals.VectorParallelepipedLab;
  const lab = {
    ...card,
    configurations: ["orthogonalBox", "coplanarFlat"],
    elevation: { max: 90, min: 0, value: 60 },
    labels: {
      configuration: "Configuration",
      configurations: {
        coplanarFlat: {
          name: "Coplanar",
          summary: [text("Zero volume in base plane")],
        },
        orthogonalBox: {
          name: "Orthogonal box",
          summary: [text("Maximum volume")],
        },
      },
      coplanarityNote: [text("Linearly independent")],
      elevation: "Elevation angle (deg)",
      parts: {
        altitudeLine: "Altitude h",
        baseParallelogram: "Base u x v",
        parallelepipedMesh: "Parallelepiped volume",
        vectorU: "Vector u",
        vectorV: "Vector v",
        vectorW: "Vector w",
      },
      tripleVolume: [text("|w . (u x v)| = 4.50")],
      view: "3D parallelepiped volume",
    },
  };
  const { coplanarityNote: _c, tripleVolume: _t, ...quiz } = lab.labels;

  it("decodes parallelepiped lab and tracks tripleVolume and coplanarityNote", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("VectorParallelepipedLab", lab)).toEqual([
      "labels.tripleVolume",
      "labels.coplanarityNote",
    ]);
    expect(
      answerState("VectorParallelepipedLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched configurations", () => {
    expect(
      failsStrict(props, { ...lab, configurations: ["orthogonalBox"] })
    ).toBe(true);
  });
});
