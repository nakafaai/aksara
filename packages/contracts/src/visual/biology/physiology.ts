import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** A measure the lab divides by: a finite number above zero. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/**
 * Props of `MicroscopeLab`: a light microscope, on the bench or down its
 * eyepiece. `field` is a field of view the learner measured, its diameter in
 * millimetres at a total magnification; `graticule` calibrates the eyepiece
 * scale against the stage micrometer at the first objective; `cell` is how
 * long one cell of the specimen is, in micrometres.
 */
function microscopeLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      cell: Schema.optionalKey(PositiveSchema),
      eyepiece: PositiveSchema,
      field: Schema.optionalKey(
        Schema.Struct({
          diameter: PositiveSchema,
          magnification: PositiveSchema,
        })
      ),
      graticule: Schema.optionalKey(
        Schema.Struct({ eyepiece: PositiveSchema, micrometer: PositiveSchema })
      ),
      labels: Schema.Struct({
        across: rich,
        cell: rich,
        division: rich,
        field: rich,
        magnification: rich,
        objective: TextSchema,
        span: rich,
        view: TextSchema,
        views: Schema.Struct({ eyepiece: TextSchema, stand: TextSchema }),
      }),
      objectives: Schema.NonEmptyArray(PositiveSchema),
      specimen: Schema.Literals(["cheek", "onion", "root", "micrometer"]),
    })
  );
}

/**
 * Props of `NephronLab`: one nephron with filtrate flowing through it, the
 * plasma filtered at `filtration` cubic centimetres a minute. `glucose`
 * gives the tubules' reabsorption maximum in milligrams a minute and the
 * plasma concentration the lab opens at, in milligrams per cubic centimetre;
 * `urea` gives its concentration in plasma and urine, in grams per 100 cubic
 * centimetres.
 */
function nephronLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      filtration: PositiveSchema,
      glucose: Schema.optionalKey(
        Schema.Struct({
          maximum: PositiveSchema,
          plasma: Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0)),
        })
      ),
      labels: Schema.Struct({
        daily: rich,
        factor: rich,
        filtrate: rich,
        flow: rich,
        load: rich,
        plasma: TextSchema,
        reabsorbed: rich,
        solute: TextSchema,
        solutes: Schema.Struct({ glucose: TextSchema, urea: TextSchema }),
        threshold: rich,
        urine: rich,
        view: TextSchema,
      }),
      urea: Schema.optionalKey(
        Schema.Struct({ plasma: PositiveSchema, urine: PositiveSchema })
      ),
    })
  );
}

/**
 * Props of `RespirometerLab`: two respirometers of germinating seeds in one
 * water bath, over potassium hydroxide and over water. Over the run of
 * `minutes`, the seeds take in oxygen worth `oxygen` millimetres of the
 * capillary and give off carbon dioxide worth `carbonDioxide` millimetres.
 */
function respirometerLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      carbonDioxide: Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0)),
      labels: Schema.Struct({
        potash: rich,
        quotient: rich,
        substrate: rich,
        substrates: byIds(
          ["fat", "protein", "carbohydrate", "anaerobic"],
          rich
        ),
        time: TextSchema,
        view: TextSchema,
        water: rich,
      }),
      minutes: PositiveSchema,
      oxygen: PositiveSchema,
    })
  );
}

/**
 * The props of the physiology labs. Each prop sets up an instrument or names
 * its words; none states the conclusion the lab leads to, so none holds answer
 * state.
 */
export function physiologyVisuals<E>(rich: RichSlot<E>) {
  return {
    MicroscopeLab: microscopeLab(rich),
    NephronLab: nephronLab(rich),
    RespirometerLab: respirometerLab(rich),
  };
}
