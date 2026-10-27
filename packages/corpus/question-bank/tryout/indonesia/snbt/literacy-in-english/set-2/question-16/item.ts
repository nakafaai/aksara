import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "A complete failure",
        },
        {
          correct: false,
          label: "A legal requirement",
        },
        {
          correct: false,
          label: "A historical sequence",
        },
        {
          correct: false,
          label: "A guaranteed advantage",
        },
        {
          correct: true,
          label: "A compromise between competing benefits and costs",
        },
      ],
    },
  },
};

export default item;
