import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Everyone should take the largest possible dose of every vitamin.",
        },
        {
          correct: false,
          label: "Supplements always cure an infection after symptoms begin.",
        },
        {
          correct: true,
          label:
            "When nutrient intake is already adequate, taking more supplements usually does not prevent infection or speed recovery.",
        },
        {
          correct: false,
          label:
            "A nutrient deficiency has no effect on normal immune function.",
        },
        {
          correct: false,
          label: "Vitamin and mineral supplements prevent every common cold.",
        },
      ],
    },
  },
};

export default item;
