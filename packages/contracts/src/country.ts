import { Schema } from "effect";

const COUNTRY_CODE_PATTERN = /^[A-Z]{2}$/u;

/** ISO 3166-1 alpha-2 code shared by country-owned content domains. */
export const CountryCodeSchema = Schema.String.pipe(
  Schema.check(
    Schema.isPattern(COUNTRY_CODE_PATTERN, {
      description: "Uppercase ISO 3166-1 alpha-2 country code.",
      identifier: "CountryCode",
      message: "Invalid country code.",
    })
  )
);
export type CountryCode = typeof CountryCodeSchema.Type;
