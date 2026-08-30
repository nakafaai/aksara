import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The analysis included 1,311 Afro-Palaearctic songbird species.",
        },
        {
          isCorrect: false,
          label:
            "Colonization from a higher- to a lower-pathogen region was more frequent.",
        },
        {
          isCorrect: false,
          label: "MHC-I genes are involved in pathogen recognition.",
        },
        {
          isCorrect: true,
          label:
            "An individual bird immediately loses immune genes when it migrates.",
        },
        {
          isCorrect: false,
          label: "High MHC-I diversity may involve both benefits and costs.",
        },
      ],
    },
  },
};

export default item;
