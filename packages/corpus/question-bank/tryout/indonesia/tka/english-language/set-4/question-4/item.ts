import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "comparison",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The platform is busiest in the evening, while the ground floor is busiest at sunrise.",
        },
        {
          isCorrect: true,
          label:
            "The platform gives a wider view, but birds notice people there more easily.",
        },
        {
          isCorrect: false,
          label:
            "The platform is closer to the hunting herons than the bench downstairs is.",
        },
        {
          isCorrect: false,
          label:
            "The platform stays open in strong wind, while the ground floor then closes.",
        },
        {
          isCorrect: false,
          label:
            "The platform has viewing slits with flaps, while the ground floor has an open rail.",
        },
      ],
    },
  },
  stimulusKey: "egret-hide",
};

export default item;
