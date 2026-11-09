import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The anatomy of songbird wings",
        },
        {
          correct: false,
          label: "Methods for treating immune disease in birds",
        },
        {
          correct: false,
          label: "The seasonal routes of every European bird species",
        },
        {
          correct: false,
          label: "Human medical advice based on bird migration",
        },
        {
          correct: true,
          label:
            "The relationship between movement across pathogen regions and the evolution of MHC-I diversity",
        },
      ],
    },
  },
};

export default item;
