import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The relationship between movement across pathogen regions and the evolution of MHC-I diversity",
        },
        {
          isCorrect: false,
          label: "The anatomy of songbird wings",
        },
        {
          isCorrect: false,
          label: "Methods for treating immune disease in birds",
        },
        {
          isCorrect: false,
          label: "The seasonal routes of every European bird species",
        },
        {
          isCorrect: false,
          label: "Human medical advice based on bird migration",
        },
      ],
    },
  },
};

export default item;
