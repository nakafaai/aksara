import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "arrangement",
  },
  stimulus: "rapat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Dimas duduk di kursi 3.",
        },
        {
          correct: true,
          label: "Hamid duduk di kursi 4.",
        },
        {
          correct: false,
          label: "Asri duduk di kursi 1, dan Fajar duduk di kursi 4.",
        },
        {
          correct: false,
          label: "Fajar berhadapan dengan Cahya.",
        },
        {
          correct: false,
          label: "Hamid duduk di kursi 6.",
        },
      ],
    },
  },
};

export default item;
