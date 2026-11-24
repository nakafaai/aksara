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

/** A strictly positive finite measure for rectifier frequency and voltage. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/** A strictly positive slider whose minimum sits below its maximum. */
const PositiveSliderSchema = Schema.Struct({
  max: PositiveSchema,
  min: PositiveSchema,
  value: PositiveSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a positive frequency range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const RECTIFIER_MODES = ["halfWave", "fullWave", "smoothed"] as const;

/** Props of `TransistorBiasLab`: an npn transistor with a base resistor and a collector resistor. */
function transistorBiasLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      base: Schema.Finite,
      baseSupply: Schema.Finite,
      collector: Schema.Finite,
      collectorSupply: Schema.Finite,
      gain: Schema.Finite,
      labels: Schema.Struct({
        base: rich,
        baseCurrent: rich,
        baseName: TextSchema,
        collectorCurrent: rich,
        collectorEmitter: rich,
        viewLabel: TextSchema,
      }),
      threshold: Schema.Finite,
    })
  );
}

/** Props of `LogicGateLab`: a logic trainer with an unknown gate P feeding a NAND gate together with input C. */
function logicGateLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      gate: Schema.Literals(["AND", "OR", "NAND", "NOR", "XOR"]),
      labels: Schema.Struct({
        gate: TextSchema,
        matches: rich,
        viewLabel: TextSchema,
      }),
      rows: Schema.Array(
        Schema.Struct({
          a: Schema.Finite,
          b: Schema.Finite,
          c: Schema.Finite,
          q: Schema.Finite,
        })
      ),
    })
  );
}

/** Props of `TransistorSwitchLab`: an automatic lamp: a fixed resistor above a light-dependent resistor shares the supply, and the share across the LDR drives the transistor's base. */
function transistorSwitchLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        base: rich,
        ldr: rich,
        light: rich,
        lightName: TextSchema,
        resistor: rich,
        resistorName: TextSchema,
        switching: rich,
        viewLabel: TextSchema,
      }),
      resistor: Schema.Finite,
      supply: Schema.Finite,
      threshold: Schema.Finite,
    })
  );
}

/**
 * Props of `RectifierDiodeLab`: a 3D AC-to-DC rectifier bench contrasting
 * half-wave, full-wave four-diode bridge, and capacitor-smoothed rectification
 * with live oscilloscope waveforms. Conduction path and ripple readouts are
 * optional answer state.
 */
function rectifierDiodeLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      frequency: PositiveSliderSchema,
      labels: Schema.Struct({
        conduction: Schema.optionalKey(rich),
        frequency: TextSchema,
        inputWave: rich,
        mode: TextSchema,
        modes: byPickedIds(RECTIFIER_MODES, TextSchema),
        outputWave: rich,
        parts: byIds(
          [
            "acSource",
            "diodeBridge",
            "capacitor",
            "loadResistor",
            "oscilloscope",
          ],
          TextSchema
        ),
        ripple: Schema.optionalKey(rich),
        view: TextSchema,
      }),
      modes: Schema.NonEmptyArray(Schema.Literals(RECTIFIER_MODES)).check(
        Schema.isUnique()
      ),
      peakVoltage: PositiveSchema,
    }).check(
      Schema.makeFilter(({ labels, modes }) => namesEach(modes, labels.modes), {
        message:
          "Expected a name for every rectifier mode shown, and no other.",
      })
    ),
    answerAt(["labels", "conduction"], ["labels", "ripple"])
  );
}

/**
 * The props of the electronics labs covering transistor circuits, logic gates,
 * and diode rectification.
 */
export function electronicsVisuals<E>(rich: RichSlot<E>) {
  return {
    LogicGateLab: logicGateLab(rich),
    RectifierDiodeLab: rectifierDiodeLab(rich),
    TransistorBiasLab: transistorBiasLab(rich),
    TransistorSwitchLab: transistorSwitchLab(rich),
  };
}
