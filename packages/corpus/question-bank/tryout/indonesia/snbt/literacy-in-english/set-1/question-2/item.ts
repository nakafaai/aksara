import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "expensive" },
        { correct: false, label: "experimental" },
        {
          correct: false,
          label: "widely available",
        },
        {
          correct: true,
          label: "not equal or consistent",
        },
        {
          correct: false,
          label: "carefully planned",
        },
      ],
    },
  },
};

export default item;
