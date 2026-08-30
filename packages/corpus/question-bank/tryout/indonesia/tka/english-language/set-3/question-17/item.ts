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
          isCorrect: true,
          label:
            "Focus and prepare, exchange and restate, widen participation, revise, then review the process.",
        },
        {
          isCorrect: false,
          label: "Choose a winner, remove the question, and count every word.",
        },
        {
          isCorrect: false,
          label:
            "Start with interruptions, skip evidence, and end without reflection.",
        },
        {
          isCorrect: false,
          label: "Let two speakers respond only to each other until time ends.",
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
