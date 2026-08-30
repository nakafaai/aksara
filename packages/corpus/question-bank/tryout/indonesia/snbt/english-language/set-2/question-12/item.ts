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
              text: "Everyone should take the largest possible dose of every vitamin.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Supplements always cure an infection after symptoms begin.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "A nutrient deficiency has no effect on normal immune function.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Vitamin and mineral supplements prevent every common cold.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "When nutrient intake is already adequate, taking more supplements usually does not prevent infection or speed recovery.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
