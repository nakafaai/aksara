import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** A count or a measure the lab divides by: a finite number above zero. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/**
 * Props of `PotometerLab`: a bubble potometer at real size. Each leafy shoot
 * names the leaf surfaces its petroleum jelly covers and the water it takes
 * up, in cubic centimetres an hour; `radius` is the capillary's bore radius in
 * millimetres and `minutes` the length of the run.
 */
function potometerLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        distance: rich,
        rate: rich,
        shoot: TextSchema,
        time: TextSchema,
        view: TextSchema,
        volume: rich,
      }),
      minutes: PositiveSchema,
      radius: PositiveSchema,
      shoots: Schema.NonEmptyArray(
        Schema.Struct({
          coat: Schema.Literals(["none", "lower", "upper", "both"]),
          name: TextSchema,
          rate: PositiveSchema,
        })
      ),
    })
  );
}

/**
 * Props of `PhotosynthesisLab`: Hydrilla in a water bath under a bench lamp.
 * Each reading names the lamp's distance in centimetres, the bubbles a minute,
 * and whether sodium hydrogen carbonate was added.
 */
function photosynthesisLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        bubbles: rich,
        carbon: rich,
        carbonSources: Schema.Struct({ added: rich, none: rich }),
        distance: rich,
        intensity: rich,
        reading: TextSchema,
        view: TextSchema,
      }),
      readings: Schema.NonEmptyArray(
        Schema.Struct({
          bicarbonate: Schema.optionalKey(Schema.Boolean),
          bubbles: PositiveSchema,
          distance: PositiveSchema,
        })
      ),
    })
  );
}

/** One seedling of a tropism lab: the letter it goes by and what was done to it. */
function seedling<const Treatments extends readonly [string, ...string[]]>(
  treatments: Treatments
) {
  return Schema.NonEmptyArray(
    Schema.Struct({ name: TextSchema, treatment: Schema.Literals(treatments) })
  );
}

/**
 * Props of `TropismLab`: seedlings lit from the right, each intact, cut,
 * capped or carrying mica on one side, or seedlings laid flat in the dark,
 * left still, on a klinostat or with the root cap removed.
 */
function tropismLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        bend: rich,
        directions: Schema.Struct({ away: rich, straight: rich, toward: rich }),
        far: rich,
        growth: rich,
        hours: TextSchema,
        near: rich,
        root: rich,
        seedling: TextSchema,
        view: TextSchema,
      }),
      setup: Schema.Union([
        Schema.Struct({
          seedlings: seedling(["intact", "cut", "cap", "micaShade", "micaLit"]),
          stimulus: Schema.Literal("light"),
        }),
        Schema.Struct({
          seedlings: seedling(["flat", "klinostat", "decapped"]),
          stimulus: Schema.Literal("gravity"),
        }),
      ]),
    })
  );
}

/** A chromosome count of a plant's body cells: an even whole number, so a gamete gets half. */
const BodyCountSchema = Schema.Int.check(
  Schema.isGreaterThan(0),
  Schema.isMultipleOf(2)
);

/**
 * Props of `FertilisationLab`: double fertilisation in a flower cut
 * lengthwise, for a mother and a father plant whose body cells hold `mother`
 * and `father` chromosomes, with the ovules to turn into seeds when the lesson
 * counts them.
 */
function fertilisationLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      father: BodyCountSchema,
      labels: Schema.Struct({
        embryo: rich,
        endosperm: rich,
        gamete: rich,
        grains: rich,
        progress: TextSchema,
        seedCoat: rich,
        stages: byIds(["pollination", "tube", "entry", "fusion"], TextSchema),
        view: TextSchema,
      }),
      mother: BodyCountSchema,
      ovules: Schema.optionalKey(Schema.Int.check(Schema.isGreaterThan(0))),
    })
  );
}

/**
 * Props of `OsmosisLab`: potato strips in a series of sucrose solutions, each
 * tube's concentration in moles per cubic decimetre and its strip's
 * percentage change in mass, with the starting mass of a strip in grams when
 * the lesson asks for one's final mass.
 */
function osmosisLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        change: rich,
        concentration: TextSchema,
        isotonic: rich,
        mass: rich,
        none: rich,
        solution: rich,
        tonicities: Schema.Struct({
          hypertonic: rich,
          hypotonic: rich,
          isotonic: rich,
        }),
        view: TextSchema,
      }),
      mass: Schema.optionalKey(PositiveSchema),
      strips: Schema.NonEmptyArray(
        Schema.Struct({
          change: Schema.Finite,
          concentration: Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0)),
        })
      ),
    })
  );
}

/**
 * The props of the plant labs. Each prop sets up an apparatus or names its
 * words; none states the conclusion the lab leads to, so none holds answer
 * state.
 */
export function plantVisuals<E>(rich: RichSlot<E>) {
  return {
    FertilisationLab: fertilisationLab(rich),
    OsmosisLab: osmosisLab(rich),
    PhotosynthesisLab: photosynthesisLab(rich),
    PotometerLab: potometerLab(rich),
    TropismLab: tropismLab(rich),
  };
}
