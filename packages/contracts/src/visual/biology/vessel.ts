import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** A pressure in millimetres of mercury, never below zero. */
const PressureSchema = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

/**
 * The blood pressure at the two ends of a capillary, in millimetres of
 * mercury. Blood flows from the arterial end to the venous end, so the
 * pressure falls along it and the arterial end is always the higher.
 */
const EndsSchema = Schema.Struct({
  arterial: PressureSchema,
  venous: PressureSchema,
}).check(
  Schema.makeFilter(({ arterial, venous }) => arterial > venous, {
    message:
      "Expected a higher blood pressure at the arterial end than at the venous end.",
  })
);

/**
 * Props of `CapillaryBedLab`: an arteriole, the capillaries it feeds, the
 * venule they drain into, and a lymph capillary among the tissue cells. Blood
 * enters the capillaries at `pressure.arterial` and leaves at
 * `pressure.venous` millimetres of mercury, against the osmotic pull of the
 * plasma proteins, `oncotic`. The tissue fluid around the cells pushes back
 * with `tissue.pressure` and pulls with `tissue.oncotic`. The tissue fluid's
 * pressure may be below zero, as it is in loose tissue under the skin, where
 * the lymph vessels draw it down to about -3 millimetres of mercury.
 */
function capillaryBedLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        arterial: TextSchema,
        inward: rich,
        lymph: rich,
        oncotic: TextSchema,
        outward: rich,
        parts: Schema.Struct({
          arteriole: rich,
          capillary: rich,
          cell: rich,
          lymph: rich,
          venule: rich,
        }),
        turning: rich,
        view: TextSchema,
      }),
      oncotic: PressureSchema,
      pressure: EndsSchema,
      tissue: Schema.Struct({
        oncotic: PressureSchema,
        pressure: Schema.Finite,
      }),
    })
  );
}

/**
 * The blood vessel labs. Each prop sets up the vessels or names its words;
 * none states the conclusion the lab leads to.
 */
export function vesselVisuals<E>(rich: RichSlot<E>) {
  return { CapillaryBedLab: capillaryBedLab(rich) };
}
