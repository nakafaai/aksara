import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Eating one high-fiber food prevents disease and removes the need for exercise or stress management.",
        },
        {
          correct: true,
          label:
            "Regular activity, a varied diet, and practical stress management work together, while guidance should be adapted and additional help sought when needed.",
        },
        {
          correct: false,
          label:
            "Vigorous exercise is the only reliable way to protect health, regardless of a person's circumstances.",
        },
        {
          correct: false,
          label:
            "Healthy living requires expensive food, a gym membership, and the complete absence of uncomfortable feelings.",
        },
        {
          correct: false,
          label:
            "The same health advice applies to everyone, and people should manage persistent stress without seeking help.",
        },
      ],
    },
  },
};

export default item;
