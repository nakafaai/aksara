import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "source-checking",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Trace a claim to its source.",
        },
        {
          correct: true,
          label: "Match checking effort to possible harm.",
        },
        {
          correct: false,
          label:
            "Treat professional design as evidence that the source has already been verified.",
        },
        {
          correct: true,
          label: "Use source checking across different subjects.",
        },
      ],
    },
  },
};

export default item;
