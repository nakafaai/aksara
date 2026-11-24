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

/** A strictly positive finite physical quantity. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/** A non-negative finite concentration or rate parameter. */
const NonNegativeSchema = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

/** A slider range with minimum below maximum and starting value inside bounds. */
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

const DYNAMIC_SYSTEMS = [
  "generic",
  "nitrogenDioxide",
  "hydrogenIodide",
] as const;

const LE_CHATELIER_SYSTEMS = ["haber", "nitrogenDioxide", "contact"] as const;

const DISTURBANCES = [
  "pressure",
  "temperature",
  "concentration",
  "catalyst",
] as const;

/**
 * Props of `DynamicEquilibriumLab`: a 3D reversible particle reactor showing
 * forward and reverse reactions occurring simultaneously as forward rate and
 * reverse rate converge to a nonzero steady value while concentrations stay
 * constant. The equilibrium composition readout shows only when
 * `labels.equilibrium` names it.
 */
function dynamicEquilibriumLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      forwardRate: SliderSchema,
      initialReactant: SliderSchema,
      labels: Schema.Struct({
        equilibrium: Schema.optionalKey(rich),
        forwardRate: TextSchema,
        initial: TextSchema,
        rateForward: rich,
        rateReverse: rich,
        reverseRate: TextSchema,
        state: rich,
        states: byIds(["approaching", "balanced"], TextSchema),
        system: TextSchema,
        systems: byPickedIds(
          DYNAMIC_SYSTEMS,
          Schema.Struct({
            equation: rich,
            name: TextSchema,
            product: TextSchema,
            reactant: TextSchema,
          })
        ),
        view: TextSchema,
      }),
      reverseRate: SliderSchema,
      systems: Schema.NonEmptyArray(Schema.Literals(DYNAMIC_SYSTEMS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, systems }) => namesEach(systems, labels.systems),
        {
          message:
            "Expected a name and species labels for every reversible system shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "equilibrium"])
  );
}

/**
 * Props of `EquilibriumQuotientLab`: a 3D reaction vessel coupled to a live
 * reaction quotient scale comparing Q_c against K_c so learners see whether a
 * mixture shifts forward, stays at equilibrium, or shifts in reverse. The
 * quotient and direction readouts are optional answer state.
 */
function equilibriumQuotientLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      kc: PositiveSchema,
      labels: Schema.Struct({
        direction: Schema.optionalKey(rich),
        directions: byIds(["forward", "equilibrium", "reverse"], rich),
        equation: rich,
        kc: rich,
        product: TextSchema,
        quotient: Schema.optionalKey(rich),
        reactant: TextSchema,
        view: TextSchema,
      }),
      product: SliderSchema,
      reactant: SliderSchema,
      stoichiometry: Schema.Literals(["oneToOne", "oneToTwo", "twoToTwo"]),
    }),
    answerAt(["labels", "direction"], ["labels", "quotient"])
  );
}

/**
 * Props of `LeChatelierLab`: a 3D piston-cylinder gas reactor with heating,
 * cooling, species injection, and catalyst controls for gas equilibria such as
 * Haber-Bosch and nitrogen dioxide dimerisation. The shift direction and K_c
 * response readouts show only when named so questions can withhold them.
 */
function leChatelierLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      disturbances: Schema.NonEmptyArray(Schema.Literals(DISTURBANCES)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        catalyst: TextSchema,
        concentration: TextSchema,
        disturbance: TextSchema,
        disturbances: byPickedIds(DISTURBANCES, TextSchema),
        kcChange: Schema.optionalKey(rich),
        kcStates: byIds(["increases", "constant", "decreases"], TextSchema),
        pressure: TextSchema,
        shift: Schema.optionalKey(rich),
        shifts: byIds(["forward", "none", "reverse"], rich),
        system: TextSchema,
        systems: byPickedIds(
          LE_CHATELIER_SYSTEMS,
          Schema.Struct({
            enthalpy: TextSchema,
            equation: rich,
            name: TextSchema,
          })
        ),
        temperature: TextSchema,
        view: TextSchema,
        yield: rich,
      }),
      systems: Schema.NonEmptyArray(
        Schema.Literals(LE_CHATELIER_SYSTEMS)
      ).check(Schema.isUnique()),
    }).check(
      Schema.makeFilter(
        ({ disturbances, labels, systems }) =>
          namesEach(systems, labels.systems) &&
          namesEach(disturbances, labels.disturbances),
        {
          message:
            "Expected labels for every equilibrium system and disturbance shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "shift"], ["labels", "kcChange"])
  );
}

/**
 * Chemical equilibrium labs covering dynamic reversible kinetics, reaction
 * quotient comparisons against K_c, and Le Chatelier disturbances.
 */
export function equilibriumVisuals<E>(rich: RichSlot<E>) {
  return {
    DynamicEquilibriumLab: dynamicEquilibriumLab(rich),
    EquilibriumQuotientLab: equilibriumQuotientLab(rich),
    LeChatelierLab: leChatelierLab(rich),
  };
}
