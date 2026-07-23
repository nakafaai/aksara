import { Schema } from "effect";

/** Material domains present in the imported Nakafa lesson corpus. */
export const MaterialDomainSchema = Schema.Literal(
  "ai-ds",
  "biology",
  "chemistry",
  "mathematics",
  "physics"
);
