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
          label: "Memperkuat pernyataan B",
        },
        {
          correct: false,
          label: "Memperlemah pernyataan B",
        },
        {
          correct: true,
          label: "Tidak relevan dengan pernyataan A dan B",
        },
      ],
    },
  },
};

export default item;
