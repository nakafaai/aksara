import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "the architectural history of UNESCO's offices.",
        },
        {
          isCorrect: false,
          label: "a list of the capitals of UNESCO Member States.",
        },
        {
          isCorrect: true,
          label:
            "a current UNESCO initiative that puts its mission into practice.",
        },
        {
          isCorrect: false,
          label: "an unrelated comparison of national budgets.",
        },
        {
          isCorrect: false,
          label: "a personal biography of one UNESCO employee.",
        },
      ],
    },
  },
};

export default item;
