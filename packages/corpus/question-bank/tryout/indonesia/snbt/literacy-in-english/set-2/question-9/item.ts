import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "An individual bird immediately loses immune genes when it migrates.",
        },
        {
          correct: false,
          label:
            "The analysis included $$1{,}311$$ Afro-Palaearctic songbird species.",
        },
        {
          correct: false,
          label:
            "Colonization from a higher- to a lower-pathogen region was more frequent.",
        },
        {
          correct: false,
          label: "MHC-I genes are involved in pathogen recognition.",
        },
        {
          correct: false,
          label: "High MHC-I diversity may involve both benefits and costs.",
        },
      ],
    },
  },
};

export default item;
