import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rank the first responses, narrow the question, and let the highest-ranked speaker conclude.",
        },
        {
          correct: false,
          label:
            "Start with interruptions, skip evidence, and end without reflection.",
        },
        {
          correct: false,
          label:
            "Let the two most active speakers test each other's claims before inviting others.",
        },
        {
          correct: true,
          label:
            "Focus and prepare, exchange and restate, widen participation, revise, then review the process.",
        },
        {
          correct: false,
          label:
            "Hide key terms and prevent participants from correcting restatements.",
        },
      ],
    },
  },
  stimulus: "fair-discussion",
};

export default item;
