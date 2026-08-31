import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rank the first responses, narrow the question, and let the highest-ranked speaker conclude.",
        },
        {
          isCorrect: false,
          label:
            "Start with interruptions, skip evidence, and end without reflection.",
        },
        {
          isCorrect: false,
          label:
            "Let the two most active speakers test each other's claims before inviting others.",
        },
        {
          isCorrect: true,
          label:
            "Focus and prepare, exchange and restate, widen participation, revise, then review the process.",
        },
        {
          isCorrect: false,
          label:
            "Hide key terms and prevent participants from correcting restatements.",
        },
      ],
    },
  },
  stimulusKey: "fair-discussion",
};

export default item;
