import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** One measured reading of a cell: the external resistance in ohms and the terminal voltage in volts. */
const ReadingSchema = Schema.Struct({
  resistance: Schema.Finite,
  voltage: Schema.Finite,
});

/** Props of `BulbNetworkLab`: a battery lights one bulb in series with a group of bulbs in parallel, each glowing with its own power on a wooden board. */
function bulbNetworkLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      emf: Schema.Finite,
      group: Schema.TupleWithRest(
        Schema.Tuple([Schema.Finite, Schema.Finite]),
        [Schema.Finite]
      ),
      labels: Schema.Struct({
        broken: rich,
        intact: rich,
        state: TextSchema,
        viewLabel: TextSchema,
      }),
      series: Schema.Finite,
    })
  );
}

/** Props of `InternalResistanceLab`: a dry cell with a voltmeter across its terminals drives one resistor at a time. */
function internalResistanceLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        current: rich,
        emf: rich,
        internal: rich,
        resistor: TextSchema,
        terminal: rich,
        viewLabel: TextSchema,
      }),
      readings: Schema.TupleWithRest(
        Schema.Tuple([ReadingSchema, ReadingSchema]),
        [ReadingSchema]
      ),
      trial: Schema.Finite,
    })
  );
}

/** Props of `HeaterSupplyLab`: a heater whose label gives its voltage and power, plugged into a supply of another voltage. */
function heaterSupplyLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      hours: Schema.Finite,
      labels: Schema.Struct({
        energy: rich,
        power: rich,
        resistance: rich,
        supply: rich,
        supplyName: TextSchema,
        viewLabel: TextSchema,
      }),
      ratedPower: Schema.Finite,
      ratedVoltage: Schema.Finite,
      supplyVoltage: Schema.Finite,
    })
  );
}

/** Props of `WireResistanceLab`: two nichrome wires on the same fixed voltage, drawn to scale. */
function wireResistanceLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      diameterRatio: Schema.Finite,
      labels: Schema.Struct({
        diameter: rich,
        diameterName: TextSchema,
        length: rich,
        lengthName: TextSchema,
        power: rich,
        resistance: rich,
        viewLabel: TextSchema,
      }),
      lengthRatio: Schema.Finite,
    })
  );
}

/**
 * The props of the electricity labs. Each prop is a value from the item the lab
 * draws, never the conclusion it leads to, so none holds answer state.
 */
export function circuitVisuals<E>(rich: RichSlot<E>) {
  return {
    BulbNetworkLab: bulbNetworkLab(rich),
    InternalResistanceLab: internalResistanceLab(rich),
    HeaterSupplyLab: heaterSupplyLab(rich),
    WireResistanceLab: wireResistanceLab(rich),
  };
}
