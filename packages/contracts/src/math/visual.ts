import { Effect, Schema } from "effect";

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

/** Returns every rich-label key in authored anchor order. */
export function mathVisualLabelKeys(visual: MathVisual) {
  return (visual.labels ?? []).map(({ key }) => key);
}
