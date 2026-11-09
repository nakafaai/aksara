import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "selection",
  },
  stimulus: "estafet",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Fani",
        },
        {
          correct: false,
          label: "Hana",
        },
        {
          correct: false,
          label: "Lusi",
        },
        {
          correct: false,
          label: "Joko",
        },
        {
          correct: true,
          label: "Gilang",
        },
      ],
    },
  },
};

export default item;
