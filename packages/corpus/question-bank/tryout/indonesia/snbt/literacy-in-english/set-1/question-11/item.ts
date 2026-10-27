import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "the architectural history of UNESCO's offices.",
        },
        {
          correct: false,
          label: "a list of the capitals of UNESCO Member States.",
        },
        {
          correct: false,
          label: "an unrelated comparison of national budgets.",
        },
        {
          correct: false,
          label: "a personal biography of one UNESCO employee.",
        },
        {
          correct: true,
          label:
            "a current UNESCO initiative that puts its mission into practice.",
        },
      ],
    },
  },
};

export default item;
