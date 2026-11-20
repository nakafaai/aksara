import { Array as Arr, Schema } from "effect";
import {
  givenWhen,
  pickedFrom,
  sliderOf,
} from "#contracts/visual/biology/control";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * The two experiments: salivary amylase digesting starch in a water bath
 * whose temperature the learner sets, and pepsin digesting a cloudy albumen
 * suspension at 37 degrees Celsius in a solution whose pH the learner sets.
 * Each enzyme's optimum and the ranges where it slows or denatures are cited
 * facts the renderer knows.
 */
const ENZYMES = ["amylase", "pepsin"] as const;

/** A water bath temperature in degrees Celsius, from freezing to boiling. */
const TemperatureSchema = Schema.Finite.check(
  Schema.isBetween({ maximum: 100, minimum: 0 })
);

/** A pH on the scale from 0 to 14. */
const PhSchema = Schema.Finite.check(
  Schema.isBetween({ maximum: 14, minimum: 0 })
);

/**
 * Props of `DenatureLab`: a water bath with a test tube, a spotting tile and
 * a lens on one enzyme's active site. The learner picks one of `enzymes`
 * (each once, in toggle order): amylase runs over the `temperature` slider
 * and is tested with iodine, pepsin runs over the `ph` slider and clears its
 * suspension. Each slider and its words are given exactly when its
 * experiment is shown. The readouts give the test result, the time until the
 * substrate is used up, the relative rate, the share of intact active sites
 * and the effective collisions per second.
 */
function denatureLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      enzymes: pickedFrom(ENZYMES),
      labels: Schema.Struct({
        active: rich,
        collisions: rich,
        endpoint: rich,
        enzyme: TextSchema,
        enzymes: byPickedIds(ENZYMES, TextSchema),
        never: rich,
        parts: byIds(
          ["bath", "tube", "tile", "thermometer", "lens"],
          TextSchema
        ),
        ph: Schema.optionalKey(TextSchema),
        rate: rich,
        restore: TextSchema,
        temperature: Schema.optionalKey(TextSchema),
        test: rich,
        tests: Schema.Struct({
          clear: Schema.optionalKey(rich),
          cloudy: Schema.optionalKey(rich),
          noStarch: Schema.optionalKey(rich),
          starch: Schema.optionalKey(rich),
        }),
        time: TextSchema,
        view: TextSchema,
      }),
      ph: Schema.optionalKey(sliderOf(PhSchema)),
      temperature: Schema.optionalKey(sliderOf(TemperatureSchema)),
    }).check(
      Schema.makeFilter(
        ({ enzymes, labels, ph, temperature }) =>
          namesEach(enzymes, labels.enzymes) &&
          givenWhen(Arr.contains(enzymes, "amylase"), [
            temperature,
            labels.temperature,
            labels.tests.starch,
            labels.tests.noStarch,
          ]) &&
          givenWhen(Arr.contains(enzymes, "pepsin"), [
            ph,
            labels.ph,
            labels.tests.cloudy,
            labels.tests.clear,
          ]),
        {
          message:
            "Expected a name for every experiment shown, the temperature slider and the iodine results exactly when amylase is shown, and the pH slider and the albumen results exactly when pepsin is shown.",
        }
      )
    )
  );
}

/** The denaturation lab. The learner finds each optimum by trying, so none is answer state. */
export function denatureVisuals<E>(rich: RichSlot<E>) {
  return { DenatureLab: denatureLab(rich) };
}
