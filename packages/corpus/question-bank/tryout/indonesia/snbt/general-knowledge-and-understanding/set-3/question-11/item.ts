import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "figurative-meaning",
  },
  stimulus: "bunga",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Meradang karena luka",
        },
        {
          correct: false,
          label: "Menjadi lunas",
        },
        {
          correct: false,
          label: "Berkurang sedikit demi sedikit",
        },
        {
          correct: false,
          label: "Tetap seperti semula",
        },
        {
          correct: true,
          label: "Bertambah besar dengan cepat",
        },
      ],
    },
  },
};

export default item;
