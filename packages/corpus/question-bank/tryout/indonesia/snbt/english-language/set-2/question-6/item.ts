import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Ramadan fasting guarantees permanent weight loss.",
        },
        {
          isCorrect: false,
          label:
            "The 2025 review found large permanent losses of muscle and water.",
        },
        {
          isCorrect: true,
          label:
            "The studies show modest, varied, short-term average changes rather than a universal long-term result.",
        },
        {
          isCorrect: false,
          label:
            "Religious fasting and clinical weight treatment have the same purpose.",
        },
        {
          isCorrect: false,
          label:
            "The studies prove that no participant experiences any change.",
        },
      ],
    },
  },
};

export default item;
