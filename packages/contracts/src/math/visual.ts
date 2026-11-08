import { Array as Arr, Effect, Schema } from "effect";

import { decodeContract } from "#contracts/decode";
import { PlaneMathVisualSchema } from "#contracts/math/plane";
import { SpaceMathVisualSchema } from "#contracts/math/space";

/** Pure mathematical scene data shared by Aksara authoring and Nakafa. */
export const MathVisualSchema = Schema.Union([
  PlaneMathVisualSchema,
  SpaceMathVisualSchema,
]);
export type MathVisual = typeof MathVisualSchema.Type;

/** Strictly decodes one untrusted mathematical scene into its stable contract. */
export const decodeMathVisual = Effect.fn("AksaraContracts.decodeMathVisual")(
  (input: unknown) => decodeContract(MathVisualSchema, "MathVisual", input)
);

/**
 * Returns every rich-label key a scene names, once each: its anchors in
 * authored order, then its readouts and its sliders' labels. A readout or a
 * slider may show the same rich label as an anchor.
 */
export function mathVisualLabelKeys(visual: MathVisual) {
  return Arr.dedupe([
    ...Arr.map(visual.labels ?? [], ({ key }) => key),
    ...(visual.space === "plane"
      ? Arr.map(visual.readouts ?? [], ({ key }) => key)
      : []),
    ...Arr.flatMap(visual.parameters ?? [], ({ label }) =>
      label === undefined ? [] : [label]
    ),
  ]);
}
