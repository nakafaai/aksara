import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "analogy",
  },
  stimulus: "cabai",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "nilai mata kuliah : IPK",
        },
        {
          correct: false,
          label: "berat badan : timbangan",
        },
        {
          correct: false,
          label: "SKS : mata kuliah",
        },
        {
          correct: false,
          label: "dosis : khasiat obat",
        },
        {
          correct: true,
          label: "SKS : IPK",
        },
      ],
    },
  },
};

export default item;
