import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Everyone should take the largest possible dose of every vitamin.",
        },
        {
          isCorrect: true,
          label:
            "When nutrient intake is already adequate, taking more supplements usually does not prevent infection or speed recovery.",
        },
        {
          isCorrect: false,
          label: "Supplements always cure an infection after symptoms begin.",
        },
        {
          isCorrect: false,
          label:
            "A nutrient deficiency has no effect on normal immune function.",
        },
        {
          isCorrect: false,
          label: "Vitamin and mineral supplements prevent every common cold.",
        },
      ],
    },
  },
};

export default item;
