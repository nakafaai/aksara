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
          label: "Citra bertugas di pos utara.",
        },
        {
          correct: true,
          label: "Bima dan Eko bertugas di pos utara.",
        },
        {
          correct: false,
          label: "Dani bertugas di pos utara.",
        },
        {
          correct: false,
          label: "Eko bertugas di pos selatan.",
        },
        {
          correct: false,
          label: "Bima dan Dani bertugas di pos yang sama.",
        },
      ],
    },
  },
};

export default item;
