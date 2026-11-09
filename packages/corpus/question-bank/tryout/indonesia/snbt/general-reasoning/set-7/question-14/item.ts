import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "grouping",
  },
  stimulus: "pos",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Citra bertugas di pos tengah.",
        },
        {
          correct: false,
          label: "Ayu bertugas di pos utara.",
        },
        {
          correct: false,
          label: "Bima bertugas di pos utara.",
        },
        {
          correct: true,
          label: "Eko tidak bertugas di pos tengah.",
        },
        {
          correct: false,
          label: "Dani bertugas di pos selatan.",
        },
      ],
    },
  },
};

export default item;
