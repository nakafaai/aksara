import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pernyataan (1) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (2) SAJA tidak cukup",
        },
        {
          correct: true,
          label:
            "Pernyataan (2) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (1) SAJA tidak cukup",
        },
        {
          correct: false,
          label:
            "DUA pernyataan BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi SATU pernyataan SAJA tidak cukup",
        },
        {
          correct: false,
          label:
            "Pernyataan (1) SAJA cukup untuk menjawab pertanyaan dan pernyataan (2) SAJA cukup untuk menjawab pertanyaan",
        },
        {
          correct: false,
          label:
            "Pernyataan (1) dan pernyataan (2) tidak cukup untuk menjawab pertanyaan",
        },
      ],
    },
  },
};

export default item;
