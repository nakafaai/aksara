import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * Props of `PredatorPreyLab`: a rice field seen from above, with the rats that
 * eat its grain and the barn owls that hunt them, as the Lotka-Volterra model
 * runs them over 20 years.
 */
function predatorPreyLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      capacity: Schema.optionalKey(Schema.Finite),
      labels: Schema.Struct({
        peak: rich,
        predators: rich,
        prey: rich,
        start: TextSchema,
        viewLabel: TextSchema,
        year: rich,
      }),
    })
  );
}

/**
 * Props of `EpidemicSpreadLab`: a town square of 60 m by 40 m where people
 * stroll past a fountain while a virus spreads.
 */
function epidemicSpreadLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseRoute: Schema.optionalKey(TextSchema),
        distancing: Schema.optionalKey(TextSchema),
        immune: rich,
        infected: rich,
        masks: Schema.optionalKey(TextSchema),
        peak: rich,
        recovered: rich,
        reproduction: rich,
        routes: Schema.optionalKey(Schema.Struct({ air: rich, touch: rich })),
        susceptible: rich,
        vaccinated: Schema.optionalKey(TextSchema),
        viewLabel: TextSchema,
        washing: Schema.optionalKey(TextSchema),
      }),
      measures: Schema.Array(
        Schema.Literals(["masks", "washing", "vaccinated", "distancing"])
      ),
      routes: Schema.optionalKey(
        Schema.Array(Schema.Literals(["air", "touch"]))
      ),
    })
  );
}

/** Props of `HyphaeDecayLab`: tempeh in the making, seen from above. */
function hyphaeDecayLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        cover: rich,
        hours: TextSchema,
        length: rich,
        time: rich,
        tips: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `AntibodyNeutralizeLab`: SARS-CoV-2 virions about 100 nm across
 * drift down to a cell whose surface carries ACE2 receptors.
 */
function antibodyNeutralizeLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        blocked: rich,
        chance: rich,
        choose: Schema.optionalKey(TextSchema),
        covered: rich,
        day: Schema.optionalKey(TextSchema),
        level: rich,
        people: Schema.optionalKey(
          Schema.Struct({ unvaccinated: rich, vaccinated: rich })
        ),
        viewLabel: TextSchema,
      }),
      mode: Schema.Literals(["days", "vaccine"]),
    })
  );
}

/**
 * The props of the ecology and disease labs. No prop states the conclusion a
 * lab leads to, so none holds answer state.
 */
export function ecologyVisuals<E>(rich: RichSlot<E>) {
  return {
    PredatorPreyLab: predatorPreyLab(rich),
    EpidemicSpreadLab: epidemicSpreadLab(rich),
    HyphaeDecayLab: hyphaeDecayLab(rich),
    AntibodyNeutralizeLab: antibodyNeutralizeLab(rich),
  };
}
