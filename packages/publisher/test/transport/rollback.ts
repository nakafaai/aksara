import { ContentProjectionSchema } from "@nakafa/aksara-contracts/projection/spec";
import { Schema } from "effect";

/** Exact historical Question projection retained only for rollback transport proof. */
export const historicalQuestion = Schema.decodeSync(ContentProjectionSchema)({
  artifactLocale: "en",
  bodyKind: "question",
  choices: [
    { label: "A", value: true },
    { label: "B", value: false },
  ],
  contentKey:
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question",
  kind: "question-body",
  metadata: {
    authors: [{ name: "Test Author" }],
    date: "2026-01-01",
    title: "Question 1",
  },
  peerContentKey:
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/answer",
  questionKey:
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1",
  questionNumber: 1,
  setKey: "question-bank/tryout/indonesia/snbt/general-reasoning/set-1",
});
