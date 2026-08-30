import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Vitamin C is the only nutrient involved in immune function.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sugar and vitamin C compete for physical space in white blood cells.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "One serving of fruit makes a person immune to infection.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "A varied, balanced diet supports adequate nutrient intake without guaranteeing immunity from illness.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dietary change is useful only when completed in one day.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
