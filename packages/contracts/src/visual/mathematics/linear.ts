import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** A non-negative finite number for unit-interval and skew sliders. */
const NonNegativeSchema = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

/** A strictly positive finite upper bound for sliders. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/** A non-negative slider whose minimum sits below its maximum. */
const UnitSliderSchema = Schema.Struct({
  max: PositiveSchema,
  min: NonNegativeSchema,
  value: NonNegativeSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a non-negative slider range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const EIGEN_TRANSFORMS = [
  "stretchShear",
  "symmetricDiag",
  "reflectionScale",
  "anisotropic3D",
] as const;
const PCA_SUBSPACES = ["pc1Line", "pc1Pc2Plane", "full3D"] as const;
const QR_STEPS = [
  "originalBasis",
  "normalizeQ1",
  "orthogonalizeQ2",
  "orthogonalizeQ3",
] as const;

/**
 * Props of `EigenTransform3DLab`: a 3D linear transformation cube showing
 * invariant eigenvector spans and scaling factors as the space morphs from the
 * identity to matrix A. Eigenvalues and determinant readouts are optional
 * answer state.
 */
function eigenTransform3DLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        determinant: Schema.optionalKey(rich),
        eigenvalues: Schema.optionalKey(rich),
        parts: byIds(
          [
            "basisAxes",
            "transformedGrid",
            "eigenvectorOne",
            "eigenvectorTwo",
            "eigenvectorThree",
            "testVector",
          ],
          TextSchema
        ),
        progress: TextSchema,
        transform: TextSchema,
        transforms: byPickedIds(
          EIGEN_TRANSFORMS,
          Schema.Struct({
            formula: rich,
            name: TextSchema,
          })
        ),
        view: TextSchema,
      }),
      progress: UnitSliderSchema,
      transforms: Schema.NonEmptyArray(Schema.Literals(EIGEN_TRANSFORMS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, transforms }) => namesEach(transforms, labels.transforms),
        {
          message:
            "Expected a name and formula for every linear transformation preset shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "eigenvalues"], ["labels", "determinant"])
  );
}

/**
 * Props of `PcaProjection3DLab`: a 3D correlated point cloud with orthogonal
 * principal component axes and residual projection drop-lines onto PC1 or the
 * PC1-PC2 plane. Variance explained and reconstruction error readouts are
 * optional answer state.
 */
function pcaProjection3DLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      correlation: UnitSliderSchema,
      labels: Schema.Struct({
        correlation: TextSchema,
        parts: byIds(
          [
            "pointCloud",
            "pc1Axis",
            "pc2Axis",
            "pc3Axis",
            "projectionPlane",
            "residualLines",
          ],
          TextSchema
        ),
        reconstructionError: Schema.optionalKey(rich),
        subspace: TextSchema,
        subspaces: byPickedIds(
          PCA_SUBSPACES,
          Schema.Struct({
            name: TextSchema,
            summary: rich,
          })
        ),
        varianceExplained: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      subspaces: Schema.NonEmptyArray(Schema.Literals(PCA_SUBSPACES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, subspaces }) => namesEach(subspaces, labels.subspaces),
        {
          message:
            "Expected a name and summary for every PCA projection subspace shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "varianceExplained"], ["labels", "reconstructionError"])
  );
}

/**
 * Props of `QrGramSchmidt3DLab`: a 3D step-by-step Gram-Schmidt
 * orthogonalization turning three skewed column vectors into an orthonormal
 * basis Q with upper-triangular projection coordinates R. Orthogonality check
 * and R-entry readouts are optional answer state.
 */
function qrGramSchmidt3DLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        orthogonalityCheck: Schema.optionalKey(rich),
        parts: byIds(
          [
            "inputVectors",
            "orthonormalBasis",
            "projectionShadow",
            "orthogonalFrame",
            "unitSphere",
          ],
          TextSchema
        ),
        rEntries: Schema.optionalKey(rich),
        skew: TextSchema,
        step: TextSchema,
        steps: byPickedIds(
          QR_STEPS,
          Schema.Struct({
            name: TextSchema,
            summary: rich,
          })
        ),
        view: TextSchema,
      }),
      skew: UnitSliderSchema,
      steps: Schema.NonEmptyArray(Schema.Literals(QR_STEPS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(({ labels, steps }) => namesEach(steps, labels.steps), {
        message:
          "Expected a name and summary for every Gram-Schmidt step shown, and no other.",
      })
    ),
    answerAt(["labels", "orthogonalityCheck"], ["labels", "rEntries"])
  );
}

/**
 * Linear methods 3D labs covering eigen-transformations, principal component
 * projection, and QR Gram-Schmidt orthogonalization.
 */
export function linearVisuals<E>(rich: RichSlot<E>) {
  return {
    EigenTransform3DLab: eigenTransform3DLab(rich),
    PcaProjection3DLab: pcaProjection3DLab(rich),
    QrGramSchmidt3DLab: qrGramSchmidt3DLab(rich),
  };
}
