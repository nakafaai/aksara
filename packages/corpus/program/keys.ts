import { LearningProgramKeySchema } from "@nakafa/aksara-contracts/program/spec";

/** Exact program identities referenced by curriculum and assessment sources. */
export const LEARNING_PROGRAM_KEYS = {
  cambridgeInternational: LearningProgramKeySchema.make(
    "cambridge-international"
  ),
  merdeka: LearningProgramKeySchema.make("merdeka"),
  singaporeMoe: LearningProgramKeySchema.make("singapore-moe"),
  snbt: LearningProgramKeySchema.make("snbt"),
  tka: LearningProgramKeySchema.make("tka"),
  unitedStates: LearningProgramKeySchema.make("united-states"),
} as const;
