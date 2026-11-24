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

/** A strictly positive finite upper bound for environmental sliders. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/** A non-negative finite environmental setting. */
const NonNegativeSchema = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

/** A numeric slider whose minimum is strictly below its maximum. */
const SliderSchema = Schema.Struct({
  max: PositiveSchema,
  min: NonNegativeSchema,
  value: NonNegativeSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a slider range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const LEAF_LAYERS = [
  "cuticle",
  "upperEpidermis",
  "palisade",
  "spongy",
  "vascular",
  "lowerEpidermis",
  "stoma",
] as const;

const STOMATA_CONDITIONS = ["light", "dark", "drought"] as const;

const CHLOROPLAST_STAGES = [
  "lightDependent",
  "calvinCycle",
  "compensation",
] as const;

/**
 * Props of `LeafLaminaCrossSectionLab`: a 3D histological leaf lamina slice
 * from waxy cuticle through palisade and spongy mesophyll and vascular bundle
 * to lower epidermis and stoma. Adaptation and chloroplast density readouts
 * show only when named so questions can withhold them.
 */
function leafLaminaCrossSectionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        adaptation: Schema.optionalKey(rich),
        chloroplasts: Schema.optionalKey(rich),
        densities: byIds(["high", "moderate", "guardOnly", "none"], TextSchema),
        layer: TextSchema,
        layers: byPickedIds(
          LEAF_LAYERS,
          Schema.Struct({
            adaptation: rich,
            name: TextSchema,
          })
        ),
        parts: byIds(
          ["xylem", "phloem", "airSpace", "chloroplast", "guardCell"],
          TextSchema
        ),
        view: TextSchema,
      }),
      layers: Schema.NonEmptyArray(Schema.Literals(LEAF_LAYERS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, layers }) => namesEach(layers, labels.layers),
        {
          message:
            "Expected a name and adaptation note for every leaf layer shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "adaptation"], ["labels", "chloroplasts"])
  );
}

/**
 * Props of `StomatalGuardCellLab`: a 3D osmotic pair of kidney-shaped guard
 * cells with thick inner walls that bow open when potassium ions and water
 * enter in light and flatten shut in darkness or drought, tracking carbon
 * dioxide intake and transpiration. Aperture and mechanism readouts are
 * optional answer state.
 */
function stomatalGuardCellLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      conditions: Schema.NonEmptyArray(
        Schema.Literals(STOMATA_CONDITIONS)
      ).check(Schema.isUnique()),
      labels: Schema.Struct({
        aperture: Schema.optionalKey(rich),
        apertures: byIds(["open", "narrow", "closed"], TextSchema),
        co2Intake: rich,
        condition: TextSchema,
        conditions: byPickedIds(STOMATA_CONDITIONS, TextSchema),
        light: TextSchema,
        mechanism: Schema.optionalKey(rich),
        mechanisms: byPickedIds(STOMATA_CONDITIONS, rich),
        parts: byIds(
          [
            "guardCell",
            "thickInnerWall",
            "thinOuterWall",
            "chloroplast",
            "vacuole",
            "pore",
            "potassiumIon",
            "water",
          ],
          TextSchema
        ),
        transpiration: rich,
        turgor: rich,
        turgors: byIds(["turgid", "flaccid"], TextSchema),
        view: TextSchema,
      }),
      light: SliderSchema,
    }).check(
      Schema.makeFilter(
        ({ conditions, labels }) =>
          namesEach(conditions, labels.conditions) &&
          namesEach(conditions, labels.mechanisms),
        {
          message:
            "Expected a name and mechanism note for every stomatal condition shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "aperture"], ["labels", "mechanism"])
  );
}

/**
 * Props of `ChloroplastStageLab`: a 3D chloroplast showing thylakoid grana for
 * the light-dependent reaction and stroma for the Calvin cycle, plus live
 * limiting-factor controls (light, CO2, temperature) and the compensation
 * point where photosynthesis balances respiration. Limiting factor and net gas
 * exchange readouts are optional answer state.
 */
function chloroplastStageLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      co2: SliderSchema,
      labels: Schema.Struct({
        co2: TextSchema,
        factors: byIds(["light", "co2", "temperature", "balanced"], TextSchema),
        gasStates: byIds(
          ["netRelease", "compensation", "netUptake"],
          TextSchema
        ),
        light: TextSchema,
        limitingFactor: Schema.optionalKey(rich),
        netGas: Schema.optionalKey(rich),
        parts: byIds(
          [
            "thylakoid",
            "granum",
            "stroma",
            "water",
            "oxygen",
            "atp",
            "nadph",
            "co2",
            "glucose",
          ],
          TextSchema
        ),
        site: rich,
        sites: byPickedIds(CHLOROPLAST_STAGES, rich),
        stage: TextSchema,
        stages: byPickedIds(CHLOROPLAST_STAGES, TextSchema),
        temperature: TextSchema,
        view: TextSchema,
      }),
      light: SliderSchema,
      stages: Schema.NonEmptyArray(Schema.Literals(CHLOROPLAST_STAGES)).check(
        Schema.isUnique()
      ),
      temperature: SliderSchema,
    }).check(
      Schema.makeFilter(
        ({ labels, stages }) =>
          namesEach(stages, labels.stages) && namesEach(stages, labels.sites),
        {
          message:
            "Expected a name and reaction site note for every chloroplast stage shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "limitingFactor"], ["labels", "netGas"])
  );
}

/**
 * Leaf structure and photosynthesis organellar labs covering leaf lamina
 * anatomy, stomatal guard-cell osmosis, and chloroplast reaction stages.
 */
export function leafVisuals<E>(rich: RichSlot<E>) {
  return {
    ChloroplastStageLab: chloroplastStageLab(rich),
    LeafLaminaCrossSectionLab: leafLaminaCrossSectionLab(rich),
    StomatalGuardCellLab: stomatalGuardCellLab(rich),
  };
}
