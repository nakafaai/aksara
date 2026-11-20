import { LearningProgramKeySchema } from "@nakafa/aksara-contracts/program/spec";

/** Exact program identities referenced by curriculum and assessment sources. */
export const LEARNING_PROGRAM_KEYS = {
  cambridgeInternational: LearningProgramKeySchema.make(
    "cambridge-international"
  ),
  gymnasialeOberstufe: LearningProgramKeySchema.make("gymnasiale-oberstufe"),
  kssm: LearningProgramKeySchema.make("kssm"),
  merdeka: LearningProgramKeySchema.make("merdeka"),
  singaporeMoe: LearningProgramKeySchema.make("singapore-moe"),
  studienkolleg: LearningProgramKeySchema.make("studienkolleg"),
  snbt: LearningProgramKeySchema.make("snbt"),
  tka: LearningProgramKeySchema.make("tka"),
  unitedStates: LearningProgramKeySchema.make("united-states"),
} as const;
