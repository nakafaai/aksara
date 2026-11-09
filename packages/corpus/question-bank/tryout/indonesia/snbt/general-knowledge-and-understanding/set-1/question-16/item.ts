import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "general-term",
  },
  stimulus: "karang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Parasitisme",
        },
        {
          correct: false,
          label: "Komensalisme",
        },
        {
          correct: true,
          label: "Mutualisme",
        },
        {
          correct: false,
          label: "Predasi",
        },
        {
          correct: false,
          label: "Kompetisi",
        },
      ],
    },
  },
};

export default item;
