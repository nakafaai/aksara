import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

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
 * The props of the electronics labs. Each prop is a value from the item the lab
 * draws, never the conclusion it leads to, so none holds answer state.
 */
export function electronicsVisuals<E>(rich: RichSlot<E>) {
  return {
    TransistorBiasLab: transistorBiasLab(rich),
    LogicGateLab: logicGateLab(rich),
    TransistorSwitchLab: transistorSwitchLab(rich),
  };
}
