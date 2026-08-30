import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Water exercise can be helpful for some people with arthritis.",
        },
        {
          isCorrect: false,
          label: "Water exercise may improve older adults' quality of life.",
        },
        {
          isCorrect: true,
          label: "Swimming has health benefits and therefore carries no risks.",
        },
        {
          isCorrect: false,
          label: "Swimming may improve mood for some people.",
        },
        {
          isCorrect: false,
          label: "A balanced decision includes suitable safety measures.",
        },
      ],
    },
  },
};

export default item;
