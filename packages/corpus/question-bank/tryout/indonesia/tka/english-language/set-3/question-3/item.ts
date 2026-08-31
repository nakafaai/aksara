import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "main-idea-purpose",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The market closes whenever a shallow channel contains water.",
        },
        {
          isCorrect: false,
          label:
            "The passage mainly describes how the cooking row changes after rain.",
        },
        {
          isCorrect: true,
          label:
            "The market adapts its layout and equipment to continue safely after rain.",
        },
        {
          isCorrect: false,
          label:
            "The market's main challenge is replacing information signs damaged by rain.",
        },
        {
          isCorrect: false,
          label: "The market is designed mainly for a dry afternoon.",
        },
      ],
    },
  },
  stimulusKey: "rain-market",
};

export default item;
