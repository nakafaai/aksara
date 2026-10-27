import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pernyataan (1) saja cukup untuk menjawab pertanyaan tetapi pernyataan (2) saja tidak cukup.",
        },
        {
          correct: true,
          label:
            "Dua pernyataan bersama-sama cukup untuk menjawab pertanyaan, tetapi satu pernyataan saja tidak cukup.",
        },
        {
          correct: false,
          label:
            "Pernyataan (2) saja cukup untuk menjawab pertanyaan tetapi pernyataan (1) saja tidak cukup.",
        },
        {
          correct: false,
          label:
            "Pernyataan (1) saja cukup untuk menjawab pertanyaan dan pernyataan (2) saja cukup.",
        },
        {
          correct: false,
          label:
            "Pernyataan (1) dan pernyataan (2) tidak cukup untuk menjawab pertanyaan.",
        },
      ],
    },
  },
};

export default item;
