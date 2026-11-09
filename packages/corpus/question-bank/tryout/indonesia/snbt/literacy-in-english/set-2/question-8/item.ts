import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The songbird species",
        },
        { correct: true, label: "The researchers" },
        {
          correct: false,
          label: "The pathogen communities",
        },
        {
          correct: false,
          label: "The Palaearctic regions",
        },
        {
          correct: false,
          label: "The immune-recognition genes",
        },
      ],
    },
  },
};

export default item;
