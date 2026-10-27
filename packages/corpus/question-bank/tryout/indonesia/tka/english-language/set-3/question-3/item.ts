import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "main-idea-purpose",
  },
  stimulus: "rain-market",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The market closes whenever a shallow channel contains water.",
        },
        {
          correct: false,
          label:
            "The passage mainly describes how the cooking row changes after rain.",
        },
        {
          correct: true,
          label:
            "The market adapts its layout and equipment to continue safely after rain.",
        },
        {
          correct: false,
          label:
            "The market's main challenge is replacing information signs damaged by rain.",
        },
        {
          correct: false,
          label: "The market is designed mainly for a dry afternoon.",
        },
      ],
    },
  },
};

export default item;
