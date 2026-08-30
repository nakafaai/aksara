import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "It produces identical weight loss for every person who fasts.",
        },
        {
          isCorrect: false,
          label:
            "It is designed primarily as a clinical treatment for obesity.",
        },
        {
          isCorrect: true,
          label:
            "Its short-term average effects do not by themselves establish lasting weight loss.",
        },
        {
          isCorrect: false,
          label: "It permanently reduces fat-free mass and total body water.",
        },
        {
          isCorrect: false,
          label: "It always reduces calorie intake by a fixed amount.",
        },
      ],
    },
  },
};

export default item;
