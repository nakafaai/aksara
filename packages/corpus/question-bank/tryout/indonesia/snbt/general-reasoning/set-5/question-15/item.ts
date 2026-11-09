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
          correct: true,
          label: "Gilang, Joko, dan Lusi",
        },
        {
          correct: false,
          label: "Gilang, Kiki, dan Lusi",
        },
        {
          correct: false,
          label: "Fani, Gilang, dan Joko",
        },
        {
          correct: false,
          label: "Gilang, Hana, dan Joko",
        },
        {
          correct: false,
          label: "Fani, Gilang, dan Lusi",
        },
      ],
    },
  },
};

export default item;
