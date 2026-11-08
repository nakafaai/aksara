import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "analogy",
  },
  stimulus: "bunga",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "setoran awal",
        },
        {
          correct: false,
          label: "kartu kredit",
        },
        {
          correct: false,
          label: "tagihan",
        },
        {
          correct: true,
          label: "saldo terbaru",
        },
        {
          correct: false,
          label: "bank",
        },
      ],
    },
  },
};

export default item;
