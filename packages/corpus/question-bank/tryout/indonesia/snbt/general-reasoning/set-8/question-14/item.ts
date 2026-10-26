import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Memperkuat pernyataan A",
        },
        {
          correct: false,
          label: "Memperlemah pernyataan A",
        },
        {
          correct: false,
          label: "Memperlemah pernyataan B",
        },
        {
          correct: false,
          label: "Tidak relevan dengan pernyataan A dan B",
        },
        {
          correct: true,
          label: "Memperkuat pernyataan B",
        },
      ],
    },
  },
};

export default item;
