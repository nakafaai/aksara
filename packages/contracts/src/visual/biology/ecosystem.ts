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

/** A strictly positive finite bound for ecological sliders. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/** A positive slider whose minimum sits below its maximum. */
const PositiveSliderSchema = Schema.Struct({
  max: PositiveSchema,
  min: PositiveSchema,
  value: PositiveSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a positive slider range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

/** A positive integer count slider for quadrat sampling. */
const CountSliderSchema = Schema.Struct({
  max: Schema.Int.check(Schema.isGreaterThan(1)),
  min: Schema.Int.check(Schema.isGreaterThanOrEqualTo(1)),
  value: Schema.Int.check(Schema.isGreaterThanOrEqualTo(1)),
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a quadrat count range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const TROPHIC_SCENARIOS = [
  "balanced",
  "removePredator",
  "algalBloom",
  "overharvest",
] as const;
const QUADRAT_ORGANISMS = ["clover", "fern", "moss"] as const;
const SAMPLING_METHODS = ["random", "beltTransect"] as const;
const SUCCESSION_PATHWAYS = ["primary", "secondary"] as const;
const SUCCESSION_STAGES = [
  "bareRock",
  "lichenMoss",
  "grassShrub",
  "youngWoodland",
  "climaxForest",
] as const;

/**
 * Props of `FoodWebTrophicLab`: a 3D trophic energy pyramid and interconnected
 * food web modeling the 10% energy transfer rule and ecosystem disturbances.
 * Energy cascade and ecosystem outcome readouts are optional answer state.
 */
function foodWebTrophicLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      energyInput: PositiveSliderSchema,
      labels: Schema.Struct({
        energyCascade: Schema.optionalKey(rich),
        energyInput: TextSchema,
        outcome: Schema.optionalKey(rich),
        parts: byIds(
          [
            "producer",
            "primaryConsumer",
            "secondaryConsumer",
            "tertiaryConsumer",
            "decomposer",
            "heatLoss",
          ],
          TextSchema
        ),
        scenario: TextSchema,
        scenarios: byPickedIds(
          TROPHIC_SCENARIOS,
          Schema.Struct({
            effect: rich,
            name: TextSchema,
          })
        ),
        view: TextSchema,
      }),
      scenarios: Schema.NonEmptyArray(Schema.Literals(TROPHIC_SCENARIOS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, scenarios }) => namesEach(scenarios, labels.scenarios),
        {
          message:
            "Expected a name and ecological effect note for every trophic scenario shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "energyCascade"], ["labels", "outcome"])
  );
}

/**
 * Props of `QuadratSamplingLab`: a 3D ecological field grid comparing random
 * quadrat throws and belt-transect sampling to estimate population density and
 * percentage ground coverage. Density and coverage readouts are optional answer
 * state.
 */
function quadratSamplingLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        coverage: Schema.optionalKey(rich),
        density: Schema.optionalKey(rich),
        method: TextSchema,
        methods: byPickedIds(SAMPLING_METHODS, TextSchema),
        organism: TextSchema,
        organisms: byPickedIds(
          QUADRAT_ORGANISMS,
          Schema.Struct({
            habit: rich,
            name: TextSchema,
          })
        ),
        parts: byIds(
          ["quadratFrame", "transectLine", "gridPlot", "canopy", "markerFlag"],
          TextSchema
        ),
        quadrats: TextSchema,
        view: TextSchema,
      }),
      methods: Schema.NonEmptyArray(Schema.Literals(SAMPLING_METHODS)).check(
        Schema.isUnique()
      ),
      organisms: Schema.NonEmptyArray(Schema.Literals(QUADRAT_ORGANISMS)).check(
        Schema.isUnique()
      ),
      quadrats: CountSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ labels, methods, organisms }) =>
          namesEach(methods, labels.methods) &&
          namesEach(organisms, labels.organisms),
        {
          message:
            "Expected a name for every sampling method and organism shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "density"], ["labels", "coverage"])
  );
}

/**
 * Props of `EcologicalSuccessionLab`: a 3D landscape diorama progressing
 * through primary and secondary succession from pioneer colonization to climax
 * forest. Soil depth and biodiversity readouts are optional answer state.
 */
function ecologicalSuccessionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        biodiversity: Schema.optionalKey(rich),
        parts: byIds(
          ["bedrock", "topsoil", "pioneerPlant", "shrubLayer", "canopyTree"],
          TextSchema
        ),
        pathway: TextSchema,
        pathways: byPickedIds(SUCCESSION_PATHWAYS, TextSchema),
        soilDepth: Schema.optionalKey(rich),
        stage: TextSchema,
        stages: byPickedIds(
          SUCCESSION_STAGES,
          Schema.Struct({
            name: TextSchema,
            summary: rich,
          })
        ),
        view: TextSchema,
      }),
      pathways: Schema.NonEmptyArray(
        Schema.Literals(SUCCESSION_PATHWAYS)
      ).check(Schema.isUnique()),
      stages: Schema.NonEmptyArray(Schema.Literals(SUCCESSION_STAGES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, pathways, stages }) =>
          namesEach(pathways, labels.pathways) &&
          namesEach(stages, labels.stages),
        {
          message:
            "Expected a name for every succession pathway and stage shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "soilDepth"], ["labels", "biodiversity"])
  );
}

/**
 * Ecosystem biology labs covering trophic pyramids, quadrat field sampling,
 * and ecological succession.
 */
export function ecosystemVisuals<E>(rich: RichSlot<E>) {
  return {
    EcologicalSuccessionLab: ecologicalSuccessionLab(rich),
    FoodWebTrophicLab: foodWebTrophicLab(rich),
    QuadratSamplingLab: quadratSamplingLab(rich),
  };
}
