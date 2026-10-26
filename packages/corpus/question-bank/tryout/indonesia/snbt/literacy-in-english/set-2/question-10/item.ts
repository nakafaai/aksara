import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Migration immediately strengthens every bird's immunity.",
        },
        {
          correct: true,
          label:
            "Different pathogen environments can alter selection on immune-gene diversity over evolutionary time.",
        },
        {
          correct: false,
          label: "Bird migration provides direct medical advice for humans.",
        },
        {
          correct: false,
          label: "Greater MHC-I diversity can have benefits but never costs.",
        },
        {
          correct: false,
          label: "All songbird lineages originated in the Palaearctic.",
        },
      ],
    },
  },
};

export default item;
