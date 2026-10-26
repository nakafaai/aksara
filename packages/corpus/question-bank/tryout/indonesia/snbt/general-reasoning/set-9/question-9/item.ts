import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Memperkuat Pernyataan B",
        },
        {
          correct: false,
          label: "Memperkuat Pernyataan A",
        },
        {
          correct: false,
          label: "Memperlemah Pernyataan A",
        },
        {
          correct: false,
          label: "Memperlemah Pernyataan B",
        },
        {
          correct: false,
          label: "Tidak relevan dengan kedua pernyataan",
        },
      ],
    },
  },
};

export default item;
