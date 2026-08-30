import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Regular activity, a varied diet, and practical stress management work together, while guidance should be adapted and additional help sought when needed.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Eating one high-fiber food prevents disease and removes the need for exercise or stress management.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Vigorous exercise is the only reliable way to protect health, regardless of a person's circumstances.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Healthy living requires expensive food, a gym membership, and the complete absence of uncomfortable feelings.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The same health advice applies to everyone, and people should manage persistent stress without seeking help.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
