import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "gudang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bakung, Anggrek, Cempaka",
        },
        {
          correct: true,
          label: "Bakung, Cempaka, Anggrek",
        },
        {
          correct: false,
          label: "Cempaka, Bakung, Anggrek",
        },
        {
          correct: false,
          label: "Cempaka, Anggrek, Bakung",
        },
        {
          correct: false,
          label: "Anggrek, Cempaka, Bakung",
        },
      ],
    },
  },
};

export default item;
