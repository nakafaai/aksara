import { FileSystem, Path } from "@effect/platform";
import type { ContentDeliveryClass } from "@nakafa/aksara-contracts/delivery";
import type { CorpusSourcePath } from "@nakafa/aksara-contracts/ids";
import type { MaterialLessonRoute } from "@nakafa/aksara-contracts/projection/material";
import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, Schema } from "effect";

import { lessonAiDsAiProgrammingMaterial } from "#corpus/material/lesson/ai-ds/ai-programming/source";
import { lessonAiDsLinearMethodsMaterial } from "#corpus/material/lesson/ai-ds/linear-methods/source";
import { lessonBiologyBiodiversityMaterial } from "#corpus/material/lesson/biology/biodiversity/source";
import { lessonBiologyClimateChangeMaterial } from "#corpus/material/lesson/biology/climate-change/source";
import { lessonBiologyVirusRoleMaterial } from "#corpus/material/lesson/biology/virus-role/source";
import { lessonChemistryBasicChemistryLawsMaterial } from "#corpus/material/lesson/chemistry/basic-chemistry-laws/source";
import { lessonChemistryGreenChemistryMaterial } from "#corpus/material/lesson/chemistry/green-chemistry/source";
import { lessonChemistryStructureMatterMaterial } from "#corpus/material/lesson/chemistry/structure-matter/source";
import { lessonMathematicsAnalyticGeometryMaterial } from "#corpus/material/lesson/mathematics/analytic-geometry/source";
import { lessonMathematicsCircleMaterial } from "#corpus/material/lesson/mathematics/circle/source";
import { lessonMathematicsCircleArcSectorMaterial } from "#corpus/material/lesson/mathematics/circle-arc-sector/source";
import { lessonMathematicsCombinatoricsMaterial } from "#corpus/material/lesson/mathematics/combinatorics/source";
import { lessonMathematicsComplexNumberMaterial } from "#corpus/material/lesson/mathematics/complex-number/source";
import { lessonMathematicsDataAnalysisProbabilityMaterial } from "#corpus/material/lesson/mathematics/data-analysis-probability/source";
import { lessonMathematicsDerivativeFunctionMaterial } from "#corpus/material/lesson/mathematics/derivative-function/source";
import { lessonMathematicsExponentialLogarithmMaterial } from "#corpus/material/lesson/mathematics/exponential-logarithm/source";
import { lessonMathematicsFunctionCompositionInverseFunctionMaterial } from "#corpus/material/lesson/mathematics/function-composition-inverse-function/source";
import { lessonMathematicsFunctionModelingMaterial } from "#corpus/material/lesson/mathematics/function-modeling/source";
import { lessonMathematicsFunctionTransformationMaterial } from "#corpus/material/lesson/mathematics/function-transformation/source";
import { lessonMathematicsGeometricTransformationMaterial } from "#corpus/material/lesson/mathematics/geometric-transformation/source";
import { lessonMathematicsIntegralMaterial } from "#corpus/material/lesson/mathematics/integral/source";
import { lessonMathematicsLimitMaterial } from "#corpus/material/lesson/mathematics/limit/source";
import { lessonMathematicsLinearEquationInequalityMaterial } from "#corpus/material/lesson/mathematics/linear-equation-inequality/source";
import { lessonMathematicsMatrixMaterial } from "#corpus/material/lesson/mathematics/matrix/source";
import { lessonMathematicsPolynomialMaterial } from "#corpus/material/lesson/mathematics/polynomial/source";
import { lessonMathematicsProbabilityMaterial } from "#corpus/material/lesson/mathematics/probability/source";
import { lessonMathematicsQuadraticFunctionMaterial } from "#corpus/material/lesson/mathematics/quadratic-function/source";
import { lessonMathematicsSequenceSeriesMaterial } from "#corpus/material/lesson/mathematics/sequence-series/source";
import { lessonMathematicsStatisticsFoundationsMaterial } from "#corpus/material/lesson/mathematics/statistics-foundations/source";
import { lessonMathematicsStatisticsRegressionMaterial } from "#corpus/material/lesson/mathematics/statistics-regression/source";
import { lessonMathematicsTrigonometryMaterial } from "#corpus/material/lesson/mathematics/trigonometry/source";
import { lessonMathematicsVectorOperationsMaterial } from "#corpus/material/lesson/mathematics/vector-operations/source";
import { lessonPhysicsKinematicsMaterial } from "#corpus/material/lesson/physics/kinematics/source";
import { lessonPhysicsMeasurementMaterial } from "#corpus/material/lesson/physics/measurement/source";
import { lessonPhysicsRenewableEnergyMaterial } from "#corpus/material/lesson/physics/renewable-energy/source";
import { lessonPhysicsVectorMaterial } from "#corpus/material/lesson/physics/vector/source";
import type { MaterialEntry } from "#corpus/material/registry";
import { LessonMaterialSourceSchema } from "#corpus/material/schema";

const materialSourcePrograms = [
  lessonAiDsAiProgrammingMaterial,
  lessonAiDsLinearMethodsMaterial,
  lessonBiologyBiodiversityMaterial,
  lessonBiologyClimateChangeMaterial,
  lessonBiologyVirusRoleMaterial,
  lessonChemistryBasicChemistryLawsMaterial,
  lessonChemistryGreenChemistryMaterial,
  lessonChemistryStructureMatterMaterial,
  lessonMathematicsAnalyticGeometryMaterial,
  lessonMathematicsCircleArcSectorMaterial,
  lessonMathematicsCircleMaterial,
  lessonMathematicsCombinatoricsMaterial,
  lessonMathematicsComplexNumberMaterial,
  lessonMathematicsDataAnalysisProbabilityMaterial,
  lessonMathematicsDerivativeFunctionMaterial,
  lessonMathematicsExponentialLogarithmMaterial,
  lessonMathematicsFunctionCompositionInverseFunctionMaterial,
  lessonMathematicsFunctionModelingMaterial,
  lessonMathematicsFunctionTransformationMaterial,
  lessonMathematicsGeometricTransformationMaterial,
  lessonMathematicsIntegralMaterial,
  lessonMathematicsLimitMaterial,
  lessonMathematicsLinearEquationInequalityMaterial,
  lessonMathematicsMatrixMaterial,
  lessonMathematicsPolynomialMaterial,
  lessonMathematicsProbabilityMaterial,
  lessonMathematicsQuadraticFunctionMaterial,
  lessonMathematicsSequenceSeriesMaterial,
  lessonMathematicsStatisticsFoundationsMaterial,
  lessonMathematicsStatisticsRegressionMaterial,
  lessonMathematicsTrigonometryMaterial,
  lessonMathematicsVectorOperationsMaterial,
  lessonPhysicsKinematicsMaterial,
  lessonPhysicsMeasurementMaterial,
  lessonPhysicsRenewableEnergyMaterial,
  lessonPhysicsVectorMaterial,
];

/** An injected material source catalog failed strict decoding. */
export class MaterialCatalogError extends Schema.TaggedError<MaterialCatalogError>()(
  "MaterialCatalogError",
  { cause: Schema.Unknown }
) {}

/** Composes every real source program into one canonical material catalog. */
export const decodeMaterialSources = Effect.fn(
  "AksaraCorpus.decodeMaterialSources"
)(function* (input?: unknown) {
  if (input !== undefined) {
    return yield* Schema.decodeUnknown(
      Schema.Array(LessonMaterialSourceSchema)
    )(input, { onExcessProperty: "error" }).pipe(
      Effect.mapError(
        (cause) =>
          new MaterialCatalogError({
            cause,
          })
      )
    );
  }

  return yield* Effect.all(materialSourcePrograms);
});

/** Reading one reviewed corpus source failed through Effect Platform. */
export class MaterialReadError extends Schema.TaggedError<MaterialReadError>()(
  "MaterialReadError",
  { cause: Schema.Unknown, sourcePath: Schema.String }
) {}

/** Complete authored material document passed to release preparation. */
export interface MaterialDocumentSource {
  readonly delivery: ContentDeliveryClass;
  readonly rawMdx: string;
  readonly rendererDomain: RendererDomain;
  readonly route: MaterialLessonRoute;
  readonly sourcePath: CorpusSourcePath;
}

/** Reads one registry-owned source without escaping the supplied checkout root. */
export const readMaterialDocument = Effect.fn(
  "AksaraCorpus.readMaterialDocument"
)(function* (corpusRoot: string, entry: MaterialEntry) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const absolutePath = path.join(corpusRoot, entry.sourcePath);
  const rawMdx = yield* fileSystem
    .readFileString(absolutePath, "utf8")
    .pipe(
      Effect.mapError(
        (cause) =>
          new MaterialReadError({ cause, sourcePath: entry.sourcePath })
      )
    );
  return {
    delivery: entry.delivery,
    rawMdx,
    rendererDomain: entry.rendererDomain,
    route: entry.route,
    sourcePath: entry.sourcePath,
  } satisfies MaterialDocumentSource;
});
