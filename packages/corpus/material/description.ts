import { Schema } from "effect";

export const MATERIAL_CARD_DESCRIPTION_MAX_LENGTH = 56;

/** Compact localized description displayed on one material card. */
export const MaterialCardDescriptionSchema = Schema.Trim.pipe(
  Schema.check(Schema.isMinLength(1)),
  Schema.check(Schema.isMaxLength(MATERIAL_CARD_DESCRIPTION_MAX_LENGTH))
);
