import { Schema } from "effect";

/** Access boundary enforced before any published artifact body is returned. */
export const ContentDeliveryClassSchema = Schema.Literals([
  "public",
  "authenticated",
  "entitled",
]);
export type ContentDeliveryClass = typeof ContentDeliveryClassSchema.Type;

/** Delivery classes whose artifact bodies need a product-authorized runtime read. */
export const ProtectedContentDeliverySchema = Schema.Literals([
  "authenticated",
  "entitled",
]);
export type ProtectedContentDelivery =
  typeof ProtectedContentDeliverySchema.Type;
