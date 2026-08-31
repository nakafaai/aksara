import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Eating one high-fiber food prevents disease and removes the need for exercise or stress management.",
        },
        {
          isCorrect: true,
          label:
            "Regular activity, a varied diet, and practical stress management work together, while guidance should be adapted and additional help sought when needed.",
        },
        {
          isCorrect: false,
          label:
            "Vigorous exercise is the only reliable way to protect health, regardless of a person's circumstances.",
        },
        {
          isCorrect: false,
          label:
            "Healthy living requires expensive food, a gym membership, and the complete absence of uncomfortable feelings.",
        },
        {
          isCorrect: false,
          label:
            "The same health advice applies to everyone, and people should manage persistent stress without seeking help.",
        },
      ],
    },
  },
};

export default item;
