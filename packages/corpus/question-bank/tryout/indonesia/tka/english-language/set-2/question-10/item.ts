import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "reader-response",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Anger because the class hid every remaining problem",
        },
        {
          isCorrect: true,
          label:
            "Respect for the class's honest review instead of a claim of perfection",
        },
        {
          isCorrect: false,
          label: "Relief because rain can never affect the next fair",
        },
        {
          isCorrect: false,
          label: "Boredom because no practical change occurred",
        },
        {
          isCorrect: false,
          label: "Fear because the robotics display disappeared",
        },
      ],
    },
  },
  stimulusKey: "accessible-fair",
};

export default item;
