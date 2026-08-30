import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Different pathogen environments can alter selection on immune-gene diversity over evolutionary time.",
        },
        {
          isCorrect: false,
          label: "Migration immediately strengthens every bird's immunity.",
        },
        {
          isCorrect: false,
          label: "Bird migration provides direct medical advice for humans.",
        },
        {
          isCorrect: false,
          label: "Greater MHC-I diversity can have benefits but never costs.",
        },
        {
          isCorrect: false,
          label: "All songbird lineages originated in the Palaearctic.",
        },
      ],
    },
  },
};

export default item;
