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

const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));
const NonNegativeSchema = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

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

const VARIATION_KINDS = ["continuous", "discontinuous"] as const;
const MEIOSIS_STAGES = [
  "crossingOver",
  "independentAssortment",
  "randomFertilisation",
] as const;
const MUTATION_KINDS = [
  "deletion",
  "duplication",
  "inversion",
  "translocation",
  "nondisjunction",
] as const;

/**
 * Props of `VariationDistributionLab`: a 3D population trait histogram
 * contrasting polygenic continuous variation (smooth bell curve influenced by
 * environment) against single-gene discontinuous variation (distinct bars).
 * Genetic basis and curve shape readouts are optional answer state.
 */
function variationDistributionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      genePairs: SliderSchema,
      kinds: Schema.NonEmptyArray(Schema.Literals(VARIATION_KINDS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        basis: Schema.optionalKey(rich),
        genePairs: TextSchema,
        kind: TextSchema,
        kinds: byPickedIds(
          VARIATION_KINDS,
          Schema.Struct({
            basis: rich,
            name: TextSchema,
            shape: rich,
          })
        ),
        parts: byIds(
          ["bellCurve", "discreteBars", "meanLine", "environment"],
          TextSchema
        ),
        shape: Schema.optionalKey(rich),
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(({ kinds, labels }) => namesEach(kinds, labels.kinds), {
        message:
          "Expected a name, basis, and shape note for every variation kind shown, and no other.",
      })
    ),
    answerAt(["labels", "basis"], ["labels", "shape"])
  );
}

/**
 * Props of `MeiosisShufflingLab`: a 3D homologous chromosome model showing
 * crossing-over at chiasmata during prophase I, independent assortment at
 * metaphase I, and random fertilisation multiplying gamete combinations.
 * Combination count and mechanism readouts are optional answer state.
 */
function meiosisShufflingLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      chromosomePairs: SliderSchema,
      labels: Schema.Struct({
        chromosomePairs: TextSchema,
        combinations: Schema.optionalKey(rich),
        mechanism: Schema.optionalKey(rich),
        parts: byIds(
          [
            "maternalChromatid",
            "paternalChromatid",
            "chiasma",
            "centromere",
            "gamete",
          ],
          TextSchema
        ),
        stage: TextSchema,
        stages: byPickedIds(
          MEIOSIS_STAGES,
          Schema.Struct({
            mechanism: rich,
            name: TextSchema,
          })
        ),
        view: TextSchema,
      }),
      stages: Schema.NonEmptyArray(Schema.Literals(MEIOSIS_STAGES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, stages }) => namesEach(stages, labels.stages),
        {
          message:
            "Expected a name and mechanism note for every meiosis shuffling stage shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "combinations"], ["labels", "mechanism"])
  );
}

/**
 * Props of `ChromosomeMutationLab`: a 3D banded chromosome model comparing
 * structural mutations (deletion, duplication, inversion, translocation) and
 * numerical nondisjunction (trisomy). Structural change and genetic effect
 * readouts are optional answer state.
 */
function chromosomeMutationLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        change: Schema.optionalKey(rich),
        effect: Schema.optionalKey(rich),
        mutation: TextSchema,
        mutations: byPickedIds(
          MUTATION_KINDS,
          Schema.Struct({
            change: rich,
            effect: rich,
            name: TextSchema,
          })
        ),
        parts: byIds(
          ["normalArm", "brokenSegment", "centromere", "extraCopy"],
          TextSchema
        ),
        view: TextSchema,
      }),
      mutations: Schema.NonEmptyArray(Schema.Literals(MUTATION_KINDS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, mutations }) => namesEach(mutations, labels.mutations),
        {
          message:
            "Expected a name, change, and effect note for every chromosomal mutation shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "change"], ["labels", "effect"])
  );
}

/**
 * Variation and mutation labs covering continuous vs discontinuous trait
 * distributions, meiotic allele shuffling, and chromosomal mutations.
 */
export function variationVisuals<E>(rich: RichSlot<E>) {
  return {
    ChromosomeMutationLab: chromosomeMutationLab(rich),
    MeiosisShufflingLab: meiosisShufflingLab(rich),
    VariationDistributionLab: variationDistributionLab(rich),
  };
}
