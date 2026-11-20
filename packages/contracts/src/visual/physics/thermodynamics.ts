import { Array as Arr, Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** The four processes of an ideal gas the lab can run. */
const GAS_PROCESSES = [
  "isobaric",
  "isochoric",
  "isothermal",
  "adiabatic",
] as const;

/** A quantity of the gas that must be above zero: an amount, a pressure, a volume or a temperature. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/**
 * The starting state: its volume with either its pressure or its
 * temperature, in kPa, L and K. The lab works the third out from pV = nRT.
 */
const StartSchema = Schema.Union([
  Schema.Struct({ pressure: PositiveSchema, volume: PositiveSchema }),
  Schema.Struct({ temperature: PositiveSchema, volume: PositiveSchema }),
]);

/** Where the end of a process starts, and how far the learner may drag it. */
const EndRangeSchema = Schema.Struct({
  end: PositiveSchema,
  max: PositiveSchema,
  min: PositiveSchema,
});

/**
 * One process the toolbar offers: the end's volume for isobaric, isothermal
 * and adiabatic, and the end's pressure for isochoric, where the volume holds.
 */
const SetupSchema = Schema.Union([
  Schema.Struct({
    process: Schema.Literals(["isobaric", "isothermal", "adiabatic"]),
    volume: EndRangeSchema,
  }),
  Schema.Struct({
    pressure: EndRangeSchema,
    process: Schema.Literal("isochoric"),
  }),
]);

type Setup = typeof SetupSchema.Type;

/** The range a process's end moves through: its pressure when isochoric, else its volume. */
function rangeOf(setup: Setup) {
  return setup.process === "isochoric" ? setup.pressure : setup.volume;
}

/** Whether each process is offered once, and each end starts inside a range that has room to move. */
function isProcessList(processes: readonly Setup[]) {
  const names = Arr.map(processes, ({ process }) => process);
  return (
    Arr.dedupe(names).length === names.length &&
    Arr.every(processes, (setup) => {
      const { end, max, min } = rangeOf(setup);
      return min < max && min <= end && end <= max;
    })
  );
}

/**
 * Props of `GasProcessLab`: `moles` of an ideal gas in a cylinder under a
 * piston, beside a p-V diagram. The learner picks one of the offered
 * `processes` and drags point 2 along that process's own path; the rig shows
 * what holds the process (a weight, pins, a water bath or a foam jacket), the
 * thermometer and the piston follow, and the footer's Q, W and ΔU bars share
 * one scale, W being the work done by the gas. `gamma` is the gas's heat
 * capacity ratio, 5/3 unless set. With `showValues`, the bars read signed
 * joules and the first law is worked with the numbers, so it is answer state.
 */
function gasProcessLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      gamma: Schema.optionalKey(Schema.Finite.check(Schema.isGreaterThan(1))),
      labels: Schema.Struct({
        endPressure: TextSchema,
        endState: rich,
        endVolume: TextSchema,
        energy: TextSchema,
        heat: rich,
        internal: rich,
        law: rich,
        pressureAxis: rich,
        process: TextSchema,
        processes: byIds(GAS_PROCESSES, TextSchema),
        startState: rich,
        viewLabel: TextSchema,
        volumeAxis: rich,
        work: rich,
      }),
      moles: PositiveSchema,
      processes: Schema.NonEmptyArray(SetupSchema),
      showValues: Schema.optionalKey(Schema.Boolean),
      start: StartSchema,
    }).check(
      Schema.makeFilter(({ processes }) => isProcessList(processes), {
        message:
          "Expected each process once, and each end inside a range whose minimum is below its maximum.",
      })
    ),
    answerAt(["showValues"])
  );
}

/** The thermodynamics labs, where a gas exchanges heat and work. */
export function thermodynamicsVisuals<E>(rich: RichSlot<E>) {
  return { GasProcessLab: gasProcessLab(rich) };
}
