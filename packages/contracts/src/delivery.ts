import { Schema } from "effect";

/** Access boundary enforced before any published artifact body is returned. */
export const ContentDeliveryClassSchema = Schema.Literals([
  "public",
  "authenticated",
  "entitled",
]);
export type ContentDeliveryClass = typeof ContentDeliveryClassSchema.Type;
