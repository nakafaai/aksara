import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, FileSystem, Path, Schema } from "effect";

import { lessonAiDsAiProgrammingMaterial } from "#corpus/material/lesson/ai-ds/ai-programming/source";
import { lessonAiDsLinearMethodsMaterial } from "#corpus/material/lesson/ai-ds/linear-methods/source";
import { lessonBiologyBiodiversityMaterial } from "#corpus/material/lesson/biology/biodiversity/source";
import { lessonBiologyCellOrganisationMaterial } from "#corpus/material/lesson/biology/cell-organisation/source";
import { lessonBiologyClimateChangeMaterial } from "#corpus/material/lesson/biology/climate-change/source";
import { lessonBiologyMembraneTransportMaterial } from "#corpus/material/lesson/biology/membrane-transport/source";
import { lessonBiologyVirusRoleMaterial } from "#corpus/material/lesson/biology/virus-role/source";
import { lessonChemistryAcidBaseSaltMaterial } from "#corpus/material/lesson/chemistry/acid-base-salt/source";
import { lessonChemistryBasicChemistryLawsMaterial } from "#corpus/material/lesson/chemistry/basic-chemistry-laws/source";
import { lessonChemistryChemicalBondMaterial } from "#corpus/material/lesson/chemistry/chemical-bond/source";
import { lessonChemistryChemistryIntroductionMaterial } from "#corpus/material/lesson/chemistry/chemistry-introduction/source";
import { lessonChemistryGreenChemistryMaterial } from "#corpus/material/lesson/chemistry/green-chemistry/source";
import { lessonChemistryManufacturedSubstancesMaterial } from "#corpus/material/lesson/chemistry/manufactured-substances/source";
import { lessonChemistryMoleConceptMaterial } from "#corpus/material/lesson/chemistry/mole-concept/source";
import { lessonChemistryPeriodicGroupsMaterial } from "#corpus/material/lesson/chemistry/periodic-groups/source";
import { lessonChemistryReactionRateMaterial } from "#corpus/material/lesson/chemistry/reaction-rate/source";
import { lessonChemistryRedoxEquilibriumMaterial } from "#corpus/material/lesson/chemistry/redox-equilibrium/source";
import { lessonChemistryStructureMatterMaterial } from "#corpus/material/lesson/chemistry/structure-matter/source";
import { lessonChemistryThermochemistryMaterial } from "#corpus/material/lesson/chemistry/thermochemistry/source";
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
import { lessonPhysicsElectricityMaterial } from "#corpus/material/lesson/physics/electricity/source";
import { lessonPhysicsElectromagnetismMaterial } from "#corpus/material/lesson/physics/electromagnetism/source";
import { lessonPhysicsElectronicsMaterial } from "#corpus/material/lesson/physics/electronics/source";
import { lessonPhysicsGravitationMaterial } from "#corpus/material/lesson/physics/gravitation/source";
import { lessonPhysicsHeatMaterial } from "#corpus/material/lesson/physics/heat/source";
import { lessonPhysicsKinematicsMaterial } from "#corpus/material/lesson/physics/kinematics/source";
import { lessonPhysicsLightOpticsMaterial } from "#corpus/material/lesson/physics/light-optics/source";
import { lessonPhysicsMeasurementMaterial } from "#corpus/material/lesson/physics/measurement/source";
import { lessonPhysicsMomentumMaterial } from "#corpus/material/lesson/physics/momentum/source";
import { lessonPhysicsNuclearPhysicsMaterial } from "#corpus/material/lesson/physics/nuclear-physics/source";
import { lessonPhysicsPressureMaterial } from "#corpus/material/lesson/physics/pressure/source";
import { lessonPhysicsQuantumPhysicsMaterial } from "#corpus/material/lesson/physics/quantum-physics/source";
import { lessonPhysicsRenewableEnergyMaterial } from "#corpus/material/lesson/physics/renewable-energy/source";
import { lessonPhysicsVectorMaterial } from "#corpus/material/lesson/physics/vector/source";
import { lessonPhysicsWavesMaterial } from "#corpus/material/lesson/physics/waves/source";
import type { MaterialEntry } from "#corpus/material/registry";
import { LessonMaterialSourceSchema } from "#corpus/material/schema";

const materialSourcePrograms = [
  lessonAiDsAiProgrammingMaterial,
  lessonAiDsLinearMethodsMaterial,
  lessonBiologyBiodiversityMaterial,
  lessonBiologyCellOrganisationMaterial,
  lessonBiologyClimateChangeMaterial,
  lessonBiologyMembraneTransportMaterial,
  lessonBiologyVirusRoleMaterial,
  lessonChemistryAcidBaseSaltMaterial,
  lessonChemistryBasicChemistryLawsMaterial,
  lessonChemistryChemicalBondMaterial,
  lessonChemistryChemistryIntroductionMaterial,
  lessonChemistryGreenChemistryMaterial,
  lessonChemistryManufacturedSubstancesMaterial,
  lessonChemistryMoleConceptMaterial,
  lessonChemistryPeriodicGroupsMaterial,
  lessonChemistryReactionRateMaterial,
  lessonChemistryRedoxEquilibriumMaterial,
  lessonChemistryStructureMatterMaterial,
  lessonChemistryThermochemistryMaterial,
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
  lessonPhysicsElectricityMaterial,
  lessonPhysicsElectromagnetismMaterial,
  lessonPhysicsElectronicsMaterial,
  lessonPhysicsGravitationMaterial,
  lessonPhysicsHeatMaterial,
  lessonPhysicsKinematicsMaterial,
  lessonPhysicsLightOpticsMaterial,
  lessonPhysicsMeasurementMaterial,
  lessonPhysicsMomentumMaterial,
  lessonPhysicsNuclearPhysicsMaterial,
  lessonPhysicsPressureMaterial,
  lessonPhysicsQuantumPhysicsMaterial,
  lessonPhysicsRenewableEnergyMaterial,
  lessonPhysicsVectorMaterial,
  lessonPhysicsWavesMaterial,
];

/** An injected material source catalog failed strict decoding. */
export class MaterialCatalogError extends Schema.TaggedError<
  MaterialCatalogError,
  { readonly brand: unique symbol }
>()("MaterialCatalogError", { cause: Schema.Unknown }) {}

/** Composes every real source program into one canonical material catalog. */
export const decodeMaterialSources = Effect.fn(
  "AksaraCorpus.decodeMaterialSources"
)(function* (input?: unknown) {
  if (input !== undefined) {
    return yield* Schema.decodeUnknownEffect(
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
export class MaterialReadError extends Schema.TaggedError<
  MaterialReadError,
  { readonly brand: unique symbol }
>()("MaterialReadError", {
  cause: Schema.Unknown,
  sourcePath: CorpusSourcePathSchema,
}) {}

/** The authored MDX body that a material document adds to its registry entry. */
const MaterialDocumentBodySchema = Schema.Struct({ rawMdx: Schema.String });

/** Complete authored material document passed to release preparation. */
export type MaterialDocumentSource = Omit<MaterialEntry, "assetRoot"> &
  typeof MaterialDocumentBodySchema.Type;

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
  const { assetRoot: _assetRoot, ...document } = entry;
  return {
    ...document,
    rawMdx,
  } satisfies MaterialDocumentSource;
});
