import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "arrangement",
  },
  stimulus: "seminar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Eka, Bayu, Citra, Fani",
        },
        {
          correct: false,
          label: "Eka, Galih, Citra, Bayu",
        },
        {
          correct: false,
          label: "Hesti, Fani, Citra, Bayu",
        },
        {
          correct: false,
          label: "Eka, Citra, Fani, Dimas",
        },
        {
          correct: false,
          label: "Citra, Bayu, Dimas, Fani",
        },
      ],
    },
  },
};

export default item;
