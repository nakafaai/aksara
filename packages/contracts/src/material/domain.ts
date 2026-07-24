import { Schema } from "effect";

/** Material domains present in Nakafa's reviewed lesson corpus. */
export const MaterialDomainSchema = Schema.Literal(
  "ai-ds",
  "biology",
  "chemistry",
  "mathematics",
  "physics"
);
export type MaterialDomain = typeof MaterialDomainSchema.Type;
