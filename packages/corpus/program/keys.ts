import { Schema } from "effect";

const LEARNING_PROGRAM_KEY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

/** Stable language-neutral key for an authored learning program. */
export const LearningProgramKeySchema = Schema.String.pipe(
  Schema.pattern(LEARNING_PROGRAM_KEY_PATTERN, {
    description: "Lowercase kebab-case canonical learning program key.",
    identifier: "LearningProgramKey",
    message: () => "Invalid learning program key.",
  }),
  Schema.brand("@NakafaAI/AksaraLearningProgramKey")
);

/** Program identities referenced by the imported curriculum sources. */
export const LEARNING_PROGRAM_KEYS = {
  cambridgeInternational: LearningProgramKeySchema.make(
    "cambridge-international"
  ),
  merdeka: LearningProgramKeySchema.make("merdeka"),
  singaporeMoe: LearningProgramKeySchema.make("singapore-moe"),
  unitedStates: LearningProgramKeySchema.make("united-states"),
} as const;
