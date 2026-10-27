import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Ramadan fasting guarantees permanent weight loss.",
        },
        {
          correct: true,
          label:
            "The studies show modest, varied, short-term average changes rather than a universal long-term result.",
        },
        {
          correct: false,
          label:
            "The $$2025$$ review found large permanent losses of muscle and water.",
        },
        {
          correct: false,
          label:
            "Religious fasting and clinical weight treatment have the same purpose.",
        },
        {
          correct: false,
          label:
            "The studies prove that no participant experiences any change.",
        },
      ],
    },
  },
};

export default item;
