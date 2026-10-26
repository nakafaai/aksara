import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A varied, balanced diet supports adequate nutrient intake without guaranteeing immunity from illness.",
        },
        {
          correct: false,
          label: "Vitamin C is the only nutrient involved in immune function.",
        },
        {
          correct: false,
          label:
            "Sugar and vitamin C compete for physical space in white blood cells.",
        },
        {
          correct: false,
          label: "One serving of fruit makes a person immune to infection.",
        },
        {
          correct: false,
          label: "Dietary change is useful only when completed in one day.",
        },
      ],
    },
  },
};

export default item;
