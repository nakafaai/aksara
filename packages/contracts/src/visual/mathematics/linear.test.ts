import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore 3D linear transformations and subspaces.")],
  footer: [text("Track how basis vectors and variance axes align in 3D.")],
  title: [text("Linear methods lab")],
};

describe("eigen transform 3D lab", () => {
  const { props } = assessmentVisuals.EigenTransform3DLab;
  const lab = {
    ...card,
    labels: {
      determinant: [text("det(A) = 2.4")],
      eigenvalues: [text("2.0, 1.2, 1.0")],
      parts: {
        basisAxes: "Standard axes",
        eigenvectorOne: "Eigenvector v1",
        eigenvectorThree: "Eigenvector v3",
        eigenvectorTwo: "Eigenvector v2",
        testVector: "General vector",
        transformedGrid: "Transformed cube",
      },
      progress: "Interpolation t",
      transform: "Matrix",
      transforms: {
        stretchShear: {
          formula: [text("A = [[2,1,0],[0,1,0],[0,0,1]]")],
          name: "Stretch + shear",
        },
        symmetricDiag: {
          formula: [text("A = diag(2, 1.2, 0.7)")],
          name: "Diagonal scale",
        },
      },
      view: "3D eigenvector transformation",
    },
    progress: { max: 1, min: 0, value: 1 },
    transforms: ["stretchShear", "symmetricDiag"],
  };
  const { determinant: _d, eigenvalues: _e, ...quiz } = lab.labels;

  it("decodes eigen transform lab and tracks eigenvalues and determinant", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("EigenTransform3DLab", lab)).toEqual([
      "labels.eigenvalues",
      "labels.determinant",
    ]);
    expect(
      answerState("EigenTransform3DLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid progress range or mismatched transforms", () => {
    expect(
      failsStrict(props, { ...lab, progress: { max: 1, min: 1, value: 1 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, transforms: ["stretchShear"] })).toBe(
      true
    );
  });
});

describe("PCA projection 3D lab", () => {
  const { props } = assessmentVisuals.PcaProjection3DLab;
  const lab = {
    ...card,
    correlation: { max: 0.95, min: 0.1, value: 0.8 },
    labels: {
      correlation: "Feature correlation",
      parts: {
        pc1Axis: "PC1 axis",
        pc2Axis: "PC2 axis",
        pc3Axis: "PC3 axis",
        pointCloud: "Data cloud",
        projectionPlane: "Subspace plane",
        residualLines: "Residuals",
      },
      reconstructionError: [text("MSE = 0.08")],
      subspace: "Projection",
      subspaces: {
        pc1Line: {
          name: "1D (PC1)",
          summary: [text("Captures dominant axis")],
        },
        pc1Pc2Plane: {
          name: "2D (PC1-PC2)",
          summary: [text("Retains two leading components")],
        },
      },
      varianceExplained: [text("92% variance")],
      view: "3D PCA projection",
    },
    subspaces: ["pc1Line", "pc1Pc2Plane"],
  };
  const {
    reconstructionError: _r,
    varianceExplained: _v,
    ...quiz
  } = lab.labels;

  it("decodes PCA lab and tracks variance and error as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("PcaProjection3DLab", lab)).toEqual([
      "labels.varianceExplained",
      "labels.reconstructionError",
    ]);
    expect(answerState("PcaProjection3DLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses mismatched subspaces", () => {
    expect(failsStrict(props, { ...lab, subspaces: ["pc1Line"] })).toBe(true);
  });
});

describe("QR Gram-Schmidt 3D lab", () => {
  const { props } = assessmentVisuals.QrGramSchmidt3DLab;
  const lab = {
    ...card,
    labels: {
      orthogonalityCheck: [text("Q^T Q = I")],
      parts: {
        inputVectors: "Input basis A",
        orthogonalFrame: "Right-angle frame",
        orthonormalBasis: "Orthonormal Q",
        projectionShadow: "Projection shadow",
        unitSphere: "Unit sphere",
      },
      rEntries: [text("R12 = 0.65")],
      skew: "Basis skew",
      step: "Step",
      steps: {
        normalizeQ1: {
          name: "1. Normalize q1",
          summary: [text("Unit length")],
        },
        originalBasis: {
          name: "0. Input A",
          summary: [text("Skewed columns")],
        },
      },
      view: "3D Gram-Schmidt QR decomposition",
    },
    skew: { max: 1, min: 0, value: 0.6 },
    steps: ["originalBasis", "normalizeQ1"],
  };
  const { orthogonalityCheck: _o, rEntries: _r, ...quiz } = lab.labels;

  it("decodes QR lab and tracks orthogonality and R entries", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("QrGramSchmidt3DLab", lab)).toEqual([
      "labels.orthogonalityCheck",
      "labels.rEntries",
    ]);
    expect(answerState("QrGramSchmidt3DLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses mismatched steps", () => {
    expect(failsStrict(props, { ...lab, steps: ["originalBasis"] })).toBe(true);
  });
});
