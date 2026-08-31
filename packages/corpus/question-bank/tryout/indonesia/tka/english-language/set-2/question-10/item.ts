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
          label:
            "Frustration because the class documented barriers that its revisions had not resolved",
        },
        {
          isCorrect: false,
          label:
            "Relief because the revised route is likely to remain usable during the next rain",
        },
        {
          isCorrect: false,
          label:
            "Disappointment because the revisions did not remove the remaining barriers",
        },
        {
          isCorrect: false,
          label: "Fear because the robotics display disappeared",
        },
        {
          isCorrect: true,
          label:
            "Respect for the class's honest review instead of a claim of perfection",
        },
      ],
    },
  },
  stimulusKey: "accessible-fair",
};

export default item;
